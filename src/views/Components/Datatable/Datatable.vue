<template>
	<div class="flex flex-col h-full">
		<div class="flex-shrink-0">
			<div class="flex flex-wrap items-baseline justify-between gap-3">
				<div class="flex flex-wrap">
					<slot name="header_search"></slot>
					<DatatableHeader :key="childKey" v-bind="headerProps" @onSearch="onSearchWithEmit"
						@onFilterChange="onFilterChangeWithEmit" @print="handlePrint" @export="handleDownload"
						@onSortChange="onSortChangeWithEmit" />
				</div>
				<slot name="header_actions"></slot>
			</div>
		</div>

		<div class="flex-1 flex flex-col min-h-0">
			<div class="flex-1 flex flex-col min-h-0">
				<!-- <div v-if="loading" class="h-[500px]">
					<LoadingState></LoadingState>
				</div> -->
				<!-- <div v-else> -->
				<div class="flex-1 flex flex-col min-h-0">
					<div class="flex-1 overflow-auto datatable-container">
						<DatatableTable :items="items" :columns="columns" :server-params="serverParams" :loading="loading"
							:page-name="pageName" :table-id="`table-${_uid}`" @sort="sort">
							<template #tableHeader>
								<slot name="tableHeader" />
							</template>
							<template #tableRow="{ row }">
								<slot name="tableRow" :row="row" />
							</template>
							<template #column="slotProps">
								<slot name="column" v-bind="slotProps" />
							</template>
						</DatatableTable>
						<div class="flex-shrink-0">
							<CustomPagination v-model:currentPage="currentPage" :totalPages="pagination.total" :key="childKey"
								@update:current-page="navigate" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import DatatableHeader from "./Header.vue";
import { ref, computed, type PropType, onMounted, useId, watch } from "vue";
import type { TableColumn, FilterFields, FilterField } from "@/types";
import { useToast } from "vue-toastification";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
// @ts-ignore
import CustomPagination from "@/views/Components/procurement/customPagination.vue";
import { useDatatable } from "@/views/Composables/useDatatable";
import { useTableFilters } from "@/views/Composables/useTableFilters";
import { TableExporter } from "@/views/Composables/tableExporter";
import DatatableTable from "./Table.vue";

defineOptions({
	name: "Datatable"
});

const props = defineProps({
	filterByDate: {
		type: Boolean,
		default: false
	},
	searchable: {
		type: Boolean,
		default: true
	},
	printable: {
		type: Boolean,
		default: false
	},
	exportable: {
		type: Boolean,
		default: false
	},
	columns: {
		type: Array as PropType<TableColumn[]>,
		default: () => []
	},
	filterFields: {
		type: Object as PropType<FilterFields<FilterField>>,
		default: () => ({})
	},
	pageName: {
		type: String,
		default: ""
	},
	url: {
		type: String,
		required: false
	},
	items: {
		type: Array as PropType<Record<string, any>[]>,
		default: undefined
	}
});

const emit = defineEmits(['loaded', 'onSearch', 'onFilter', 'onSort']);

const childKey = ref(21111);
const toast = useToast();
const _uid = useId();

// Use composables conditionally
const useApiMode = computed(() => !!props.url);

// For API mode
const apiComposable = useApiMode.value ? useDatatable(props.url!, props.pageName) : null;

// For static mode
const staticItems = ref(props.items || []);
const staticLoading = ref(false);
const staticPagination = ref({ total: 1, current_page: 1, per_page: 10 });
const staticCurrentPage = ref(1);
const staticServerParams = ref({
	searchTerm: '',
	sort: { field: '', type: 'asc' as 'asc' | 'desc' },
	filters: {},
	page: 1,
	perPage: 10
});
const staticCurrentFilters = ref({});

// Expose the right composable based on mode
const loading = useApiMode.value ? apiComposable!.loading : staticLoading;
const items = useApiMode.value ? apiComposable!.items : staticItems;
const pagination = useApiMode.value ? apiComposable!.pagination : staticPagination;
const currentPage = useApiMode.value ? apiComposable!.currentPage : staticCurrentPage;
const serverParams = useApiMode.value ? apiComposable!.serverParams : staticServerParams;
const currentFilters = useApiMode.value ? apiComposable!.currentFilters : staticCurrentFilters;

const loadItems = useApiMode.value ? apiComposable!.loadItems : () => Promise.resolve();
const updateParams = useApiMode.value ? apiComposable!.updateParams : () => {};
const loadFromStorage = useApiMode.value ? apiComposable!.loadFromStorage : () => {};
const navigate = useApiMode.value ? apiComposable!.navigate : () => {};

// Table filters - only use for API mode
const tableFilters = useApiMode.value ? useTableFilters(serverParams, updateParams, loadItems) : null;

const onSearch = useApiMode.value ? tableFilters!.onSearch : (value: string) => {
	staticServerParams.value.searchTerm = value;
	// Filter static items based on search
	const itemsToFilter = props.items || [];
	if (value) {
		staticItems.value = itemsToFilter.filter(item => 
			Object.values(item).some(val => 
				String(val).toLowerCase().includes(value.toLowerCase())
			)
		);
	} else {
		staticItems.value = itemsToFilter;
	}
};

const onFilterChange = useApiMode.value ? tableFilters!.onFilterChange : (filters: any) => {
	staticCurrentFilters.value = filters;
	// Apply filters to static items if needed
};

const onSortChange = useApiMode.value ? tableFilters!.onSortChange : (sortParams: any) => {
	staticServerParams.value.sort = sortParams;
	// Sort static items if needed
};

const sort = useApiMode.value ? tableFilters!.sort : (column: any) => {
	// Handle static sorting if needed
};

// Computed props for header
const sortableColumns = computed(() => {
	return props.columns.filter(column => column.sortable);
});

const headerProps = computed(() => ({
	searchTerm: serverParams.value.searchTerm,
	sortBy: serverParams.value.sort?.field || '',
	sortOrder: serverParams.value.sort?.type || 'asc',
	sortableColumns: sortableColumns.value,
	filterFields: props.filterFields,
	filterByDate: props.filterByDate,
	isSearchable: props.searchable,
	isPrintable: props.printable,
	isExportable: props.exportable,
	filterValues: currentFilters.value
}));

// Handlers
const handlePrint = () => {
	TableExporter.print(`table-${_uid}`);
};

const handleDownload = async () => {
	try {
		if (props.url) {
			await TableExporter.downloadData(props.url, serverParams.value, props.pageName);
		}
	} catch (error) {
		toast.error("Error downloading data! " + TableExporter.onError(error));
	}
};

// Enhanced loadItems with emit
const loadItemsWithEmit = async () => {
	try {
		await loadItems();
		childKey.value++;
		emit('loaded');
	} catch (error) {
		toast.error("Error loading data! " + TableExporter.onError(error));
	}
};

// Override the loadItems from composable to include emit
const originalOnSearch = useApiMode.value ? onSearch : (value: string) => {};
const originalOnFilterChange = useApiMode.value ? onFilterChange : (filters: any) => {};
const originalOnSortChange = useApiMode.value ? onSortChange : (sortParams: any) => {};

const onSearchWithEmit = (value: string) => {
	originalOnSearch(value);
	emit('onSearch', value);
};

const onFilterChangeWithEmit = (filterValues: any) => {
	originalOnFilterChange(filterValues);
	emit('onFilter', filterValues);
};

const onSortChangeWithEmit = (sortParams: any) => {
	originalOnSortChange(sortParams);
	emit('onSort', sortParams);
};

// Watch for changes in props.items when in static mode
watch(() => props.items, (newItems) => {
	if (!useApiMode.value) {
		const items = newItems || [];
		staticItems.value = items;
	}
}, { immediate: true });

onMounted(() => {
	if (useApiMode.value) {
		loadFromStorage(props.filterFields, props.searchable, props.filterByDate);
		loadItemsWithEmit();
	} else {
		// For static mode, just set the items
		staticItems.value = props.items || [];
	}
});
</script>
<style>
/* Standardized Datatable Typography */
table.w-full.table-auto thead tr {
	text-align: left;
	font-size: 12px;
	font-weight: 500;
	line-height: 16px;
	color: #172B4D;
}

table.w-full.table-auto thead tr th {
	font-size: 12px;
	font-weight: 500;
	color: #172B4D;
}

table.w-full.table-auto tbody tr {
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	color: #44546F;
}

table.w-full.table-auto tbody tr td {
	text-align: left;
	font-size: 12px;
	font-weight: 400;
	color: #44546F;
}
</style>
