<template>
	<div class="flex items-center justify-between py-4" v-show="isSearchable || isFilterable || isSortable">
		<div class="flex border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm w-[281px] h-[34px]">
			<!-- Search Input -->
			<div class="flex items-center w-full gap-2 px-4 py-2 bg-gray-50" v-show="isSearchable">
				<LucideSearch class="w-4 h-4 text-gray-600" />
				<InputBox :model-value="filters.searchTerm" @update:modelValue="emit('onSearch', $event)"
					placeholder="Search"
					custom-styles="bg-transparent outline-none w-full text-[12px] font-[400] text-[#172B4D] text-medium dataTableSearch" />
			</div>

			<!-- Filter Dropdown -->
			<SearchDropdown :isOpen="modalTypeOpen == 'filter' && filterModalOpen" :toggle="() => toggleModal(`filter`)"
				:alignLeft="true" v-if="isFilterable">
				<template #trigger>
					<div class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50" title="Filter">
						<LucideListFilter class="w-4 h-4 text-gray-600" @click="filterModalOpen = true" />
					</div>
				</template>
				<div class="" @click.stop>
					<div @click.self="filterModalOpen = false" class="modal-container">
						<div class="">
							<h3 class="modal-title">Filter</h3>
						</div>

						<div class="border border-gray-200"></div>
						<div class="px-6 py-4 space-y-4">
							<template v-if="filterByDate">
								<!-- Date Range Filters -->
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<label class="label">From</label>
										<div class="input-container">
											<DateInput v-model="filters.filterValues.from_date" placeholder="dd/mm/yyyy" />
										</div>
									</div>
									<div>
										<label class="label">To</label>
										<div class="input-container">
											<DateInput v-model="filters.filterValues.to_date" placeholder="dd/mm/yyyy" />
										</div>
									</div>
								</div>
							</template>
							<template v-for="filter in filterFields" :key="filter.field">
								<div>
									<label class="label">{{ filter.label }}</label>
									<div class="input-container" v-if="filter.type === 'text'">
										<input type="text" v-model="filters.filterValues[filter.field]"
											class="text-[12px] font-[400] text-[#172B4D] text-medium bg-white input" />
									</div>
									<div class="input-container" v-if="filter.type === 'number'">
										<input type="number" v-model="filters.filterValues[filter.field]"
											class="text-[12px] font-[400] text-[#172B4D] text-medium bg-white input" />
									</div>
									<div class="input-container" v-if="filter.type === 'date'">
										<DateInput v-model="filters.filterValues[filter.field]" placeholder="dd/mm/yyyy" />
									</div>
									<div class="input-container" v-if="filter.type === 'select'">
										<UiSelectField :model-value="filters.filterValues[filter.field]"
											@update:modelValue="filters.filterValues[filter.field] = $event"
											:options="filter.options"
											:placeholder="filter.placeholder ?? `All ${filter.label}`" class="text-[12px] font-[400]"
											:reduce="(option) => option.id" />
									</div>
									<div class="input-container" v-if="filter.type === 'multi-select'">
										<v-select :options="filter.options" :multiple="true" label="name"
											:reduce="(option) => option.id"
											:placeholder="filter.placeholder ?? `All ${filter.label}`" />
									</div>
									<div class="input-container" v-if="filter.type === 'date-range'">
										<div class="grid grid-cols-2 gap-4">
											<div>
												<label class="label">From</label>
												<input type="date" v-model="filters.filterValues[filter.field][0]"
													class="text-[12px] font-[400] text-[#172B4D] text-medium bg-white input" />
											</div>
											<div>
												<label class="label">To</label>
												<input type="date" v-model="filters.filterValues[filter.field][1]"
													class="text-[12px] font-[400] text-[#172B4D] text-medium bg-white input" />
											</div>
										</div>
									</div>
								</div>
							</template>


							<!-- Buttons -->
							<div class="flex justify-between items-center px-6 py-4 border-t border-gray-200 -mx-6 -mb-4 mt-4">
								<button class="btn-reset" @click="resetFilters">Reset all</button>
								<button class="btn-apply" @click="applyFilters">Apply</button>
							</div>
						</div>
					</div>
				</div>
			</SearchDropdown>

			<!-- Sort Dropdown -->
			<SearchDropdown :isOpen="modalTypeOpen == 'sort' && sortModalOpen" :toggle="() => toggleModal(`sort`)"
				:alignLeft="false" v-if="isSortable">
				<template #trigger>
					<div class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50">
						<LucideArrowUpDown class="w-4 h-4 text-gray-600" @click="sortModalOpen = true" />
					</div>
				</template>
				<div ref="sortRef" class="text-xs menu-container">
					<div v-for="(group, index) in filterGroups" :key="index" class="group"
						:class="index == 0 ? 'border-b' : ''">
						<ul class="sort-menu">
							<!-- Show first 4 items -->
							<li v-for="(item, itemIndex) in group.items.slice(0, 4)" class="flex items-center cursor-pointer hover:bg-gray-100 medium-text" :key="item.value"
								@click="selectOption(item.value); sortModalOpen = false;">
								<span class="group-title">
									<svg :style="{
										visibility:
											group.label === 'Sort Order'
												? item.value === filters.sortOrder
													? 'visible'
													: 'hidden'
												: item.value === filters.sortBy
													? 'visible'
													: 'hidden'
									}" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="12.5" r="2" fill="#626F86" />
									</svg>
								</span>
								<span class="medium-text text-[#172B4D]">
									{{ item.label }}
								</span>
							</li>
							<!-- Show "More" option if there are more than 4 items -->
							<li v-if="group.items.length > 4" class="flex items-center cursor-pointer relative hover:bg-gray-100" 
								@click.stop="toggleMoreItems(index)">
								<span class="group-title">
									<svg style="visibility: hidden;" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="12.5" r="2" fill="#626F86" />
									</svg>
								</span>
								<span class="medium-text text-[#172B4D]">
									More ({{ group.items.length - 4 }})
								</span>
								<span class="ml-auto mr-3">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M14.995 10.9949C15.1825 11.1825 15.2878 11.4368 15.2878 11.7019C15.2878 11.9671 15.1825 12.2214 14.995 12.4089L10.402 17.0019C10.2157 17.1845 9.9649 17.2862 9.70407 17.2849C9.44324 17.2835 9.19347 17.1793 9.00903 16.9949C8.8246 16.8105 8.7204 16.5607 8.71908 16.2999C8.71777 16.039 8.81944 15.7882 9.002 15.6019L12.902 11.7019L9.002 7.80195C8.81944 7.61566 8.71777 7.36485 8.71908 7.10402C8.7204 6.84319 8.8246 6.59342 9.00903 6.40898C9.19347 6.22455 9.44324 6.12035 9.70407 6.11903C9.9649 6.11771 10.2157 6.21938 10.402 6.40195L14.995 10.9949Z" fill="#44546F"/>
									</svg>
								</span>
								
								<!-- More items dropdown as separate card -->
								<div v-if="showMoreItems[index]" 
									class="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-md border border-gray-200 py-1 z-50 min-w-[200px]"
									@click.stop>
									<div v-for="item in group.items.slice(4)" :key="item.value"
										class="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text"
										@click="selectOption(item.value); sortModalOpen = false; showMoreItems[index] = false;">
										<span class="group-title mr-2">
											<svg :style="{
												visibility:
													group.label === 'Sort Order'
														? item.value === filters.sortOrder
															? 'visible'
															: 'hidden'
														: item.value === filters.sortBy
															? 'visible'
															: 'hidden'
											}" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="12" cy="12.5" r="2" fill="#626F86" />
											</svg>
										</span>
										<span class="medium-text text-[#172B4D]">
											{{ item.label }}
										</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</SearchDropdown>

			<!-- Print Button -->
			<button type="button" class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50"
				@click="emit('print')" v-if="isPrintable">
				<LucidePrinter class="w-4 h-4 text-gray-600" />
			</button>

			<!-- Export Button -->
			<button type="button" class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50"
				@click="emit('export')" v-if="isExportable">
				<LucideDownload class="w-4 h-4 text-gray-600" />
			</button>

		</div>
		<div class="flex items-center gap-2 mx-2 filter_item_display_container">
			<template v-for="(objKey, index) in Object.keys(getAllFiltersApplied)">
				<!-- Show first 2 filters -->
				<div v-if="index < 2" :key="`filter_${objKey}`" class="w-fit">
					<section class="flex items-center py-[7px] h-full rounded-lg px-2 w-fit filter_item">
						<span class="label" v-if="objKey !== 'date_period'">{{ getLabel(objKey) }}:</span>
						<span class="flex-1 ml-1 mr-2">{{ getAppliedFilterValue(objKey, getAllFiltersApplied[objKey])
						}}</span>
						<button @click="resetFilterValue(objKey)">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M8.00027 7.05739L4.4716 3.52872C4.34587 3.40728 4.17747 3.34009 4.00267 3.3416C3.82787 3.34312 3.66066 3.41324 3.53706 3.53684C3.41345 3.66045 3.34334 3.82766 3.34182 4.00245C3.3403 4.17725 3.4075 4.34565 3.52894 4.47139L7.05761 8.00005L3.52894 11.5287C3.4075 11.6545 3.3403 11.8229 3.34182 11.9977C3.34334 12.1725 3.41345 12.3397 3.53706 12.4633C3.66066 12.5869 3.82787 12.657 4.00267 12.6585C4.17747 12.66 4.34587 12.5928 4.4716 12.4714L8.00027 8.94272L11.5289 12.4714C11.6547 12.5928 11.8231 12.66 11.9979 12.6585C12.1727 12.657 12.3399 12.5869 12.4635 12.4633C12.5871 12.3397 12.6572 12.1725 12.6587 11.9977C12.6602 11.8229 12.593 11.6545 12.4716 11.5287L8.94294 8.00005L12.4716 4.47139C12.5353 4.40989 12.5861 4.33633 12.621 4.25499C12.6559 4.17365 12.6743 4.08617 12.6751 3.99766C12.6759 3.90914 12.659 3.82135 12.6255 3.73942C12.592 3.65749 12.5425 3.58305 12.4799 3.52046C12.4173 3.45786 12.3428 3.40836 12.2609 3.37484C12.179 3.34132 12.0912 3.32445 12.0027 3.32522C11.9142 3.32599 11.8267 3.34438 11.7453 3.37932C11.664 3.41426 11.5904 3.46505 11.5289 3.52872L8.00027 7.05739Z"
									fill="#44546F" />
							</svg>
						</button>
					</section>
				</div>

				<!-- Show "+N more" as a third chip -->
				<div v-else-if="index === 2" :key="'filter_more'" class="w-fit">
					<section class="flex items-center py-[7px] h-full rounded-lg px-2 w-fit filter_item">
						+{{ Object.keys(getAllFiltersApplied).length - 2 }} more
					</section>
				</div>
			</template>
		</div>
		<!-- Button placeholder -->
		<slot name="header-button"></slot>
	</div>
</template>

<script setup lang="ts">
import {
	LucideSearch,
	LucideFilter,
	LucideArrowUpDown,
	LucideListFilter,
	LucidePrinter,
	LucideDownload
} from "lucide-vue-next";
import { defineProps, ref, computed, PropType } from "vue";
import { useDropdown } from "@/views/Composables/procurement/useDropdown";
import InputBox from "@/views/Components/procurement/InputBox.vue";
import { useFilterModal } from "@/views/Composables/procurement/useFilterModal";
import SearchDropdown from "@/views/Components/procurement/SearchDropdown.vue";
import UiSelectField from "@/views/Components/procurement/ui/SelectField.vue";
import DateInput from "@/views/Components/ui/DateInput.vue";
import vSelect from "vue-select";
import { onClickOutside } from "@vueuse/core";
import dayjs from "dayjs";
import type { TableColumn, FilterFields, FilterField, SortParams } from "@/types";

defineOptions({
	name: "DatatableHeader"
});

const props = defineProps({
	searchTerm: {
		type: String,
		default: ""
	},
	sortBy: {
		type: String,
		default: ""
	},
	sortOrder: {
		type: String,
		default: ""
	},
	sortableColumns: {
		type: Array as PropType<TableColumn[]>,
		default: []
	},
	filterFields: {
		type: Object as PropType<FilterFields<FilterField>>,
		default: () => ({})
	},
	filterByDate: {
		type: Boolean,
		default: false
	},
	isSearchable: {
		type: Boolean,
		default: true
	},
	isPrintable: {
		type: Boolean,
		default: false
	},
	isExportable: {
		type: Boolean,
		default: false
	},
	filterValues: {
		type: Object as PropType<Record<string, any>>,
		default: () => ({})
	}
});

const emit = defineEmits([
	"onSearch",
	"onFilterChange",
	"print",
	"export",
	"onSortChange"
]);

const filters = ref({
	searchTerm: props.searchTerm,
	sortBy: props.sortBy,
	sortOrder: props.sortOrder || "asc",
	filterValues: props.filterValues as Record<string, any>
});
const appliedFilters = ref<Record<string, any>>({});

const { isOpen, toggle } = useDropdown();
const { modalTypeOpen, toggleModal, ModalTypes } = useFilterModal();

const isFilterable = computed<boolean>(() => {
	return props.filterByDate || Object.keys(props.filterFields).length > 0;
});

const isSortable = computed<boolean>(() => {
	return props.sortableColumns.length > 0;
});

const filterModalOpen = ref<boolean>(false);
const sortModalOpen = ref<boolean>(false);
const showMoreItems = ref<Record<number, boolean>>({});

const resetFilters = (): void => {
	filters.value.filterValues = {};
	appliedFilters.value = {};
	for (const key in props.filterFields) {
		filters.value.filterValues[key] = ["multi-select", "date-range"].includes(props.filterFields[key].type) ? [] : "";
	}
	emit("onFilterChange", filters.value.filterValues);
}

const applyFilters = (): void => {
	const filterData = { ...filters.value.filterValues };
	appliedFilters.value = filterData; // <- Track applied filters
	emit("onFilterChange", filterData);
};

const sortRef = ref<HTMLElement | null>(null);

const filterGroups = [
	{
		label: "Sort By",
		items: props.sortableColumns.map(column => ({ label: column.label, value: column.field })),
	},
	{
		label: "Sort Order",
		items: [
			{ label: "Ascending", value: "asc" },
			{ label: "Descending", value: "desc" },
		],
	},
];

const selectOption = (value: string): void => {
	if (value === "asc" || value === "desc") {
		filters.value.sortOrder = value;
	} else {
		filters.value.sortBy = value;
	}
	emit('onSortChange', {
		field: filters.value.sortBy,
		type: filters.value.sortOrder
	} as SortParams)
};

const toggleMoreItems = (groupIndex: number): void => {
	showMoreItems.value[groupIndex] = !showMoreItems.value[groupIndex];
};

onClickOutside(sortRef, (): void => {
	sortModalOpen.value = false;
});

const getLabel = (filter_key: string): string => {
	const field = props.filterFields[filter_key];
	if (field) {
		return field.label || filter_key.charAt(0).toUpperCase() + filter_key.slice(1);
	}
	return filter_key.charAt(0).toUpperCase() + filter_key.slice(1);
};

const getAllFiltersApplied = computed(() => {
	const applied = Object.fromEntries(
		Object.entries(appliedFilters.value).filter(
			([_, value]) => value !== undefined && value !== null && value !== ''
		)
	);

	if (applied.from_date || applied.to_date) {
		applied.date_period = {
			from: applied.from_date,
			to: applied.to_date
		};
		delete applied.from_date;
		delete applied.to_date;
	}

	return applied;
});

const getAppliedFilterValue = (key, value) => {
	if (key === 'date_period') {
		if (value.from && value.to) {
			return `Date Period: ${dayjs(value.from).format('DD MMM, YYYY')} to ${dayjs(value.to).format('DD MMM, YYYY')}`;
		} else if (value.from) {
			return `Start Date: ${dayjs(value.from).format('DD MMM, YYYY')}`;
		} else if (value.to) {
			return `End Date: ${dayjs(value.to).format('DD MMM, YYYY')}`;
		}
		return '';
	}

	if (props.filterFields[key]) {
		return props.filterFields[key]?.options?.find(opt => opt.id == value)?.name ?? value;
	}

	return value;
};

const resetFilterValue = (key) => {
	const updated = { ...filters.value.filterValues };

	if (key === 'date_period') {
		updated.from_date = '';
		updated.to_date = '';

		// Remove from appliedFilters as well
		const { from_date, to_date, ...rest } = appliedFilters.value;
		appliedFilters.value = rest;
	} else {
		delete updated[key];

		// Remove key from appliedFilters
		const { [key]: removed, ...rest } = appliedFilters.value;
		appliedFilters.value = rest;
	}

	filters.value.filterValues = updated;

	emit("onFilterChange", { ...updated });
};

</script>

<style scoped>
.modal-overlay {
	/* @apply fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50; */
}

.modal-container {
	background: white;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	width: 24rem;
	padding: 0;
}

.modal-title {
	font-size: 18px;
	font-weight: 600;
	color: rgba(17, 24, 39, 1);
	padding: 16px 24px;
	border-bottom: 1px solid rgba(229, 231, 235, 1);
	margin: 0;
}

.label {
	display: block;
	font-size: 12px;
	font-weight: 500;
	color: #172B4D;
	margin-bottom: 8px;
}

.input {
	width: 100%;
	padding: 8px 12px;
	border: 2px solid #091E4224;
	border-radius: 8px;
	font-size: 12px;
	font-weight: 400;
	color: #44546F;
	background: white;
}

.input:focus {
	border-color: rgba(12, 102, 228, 1);
	outline: none;
	box-shadow: 0 0 0 2px rgba(12, 102, 228, 0.1);
}

.input-container {
	position: relative;
}

.icon {
	position: absolute;
	top: 8px;
	right: 8px;
	color: rgba(107, 114, 128, 1);
	width: 20px;
	height: 20px;
}

.btn-reset {
	background-color: #091E420F;
	padding: 8px 16px;
	border-radius: 8px;
	color: #44546F;
	font-size: 12px;
	font-weight: 500;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s;
}

.btn-reset:hover {
	background-color: rgba(9, 30, 66, 0.1);
}

.btn-apply {
	background-color: rgba(37, 99, 235, 1);
	padding: 8px 16px;
	border-radius: 8px;
	color: white;
	font-size: 12px;
	font-weight: 500;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s;
}

.btn-apply:hover {
	background-color: rgba(29, 78, 216, 1);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.menu-container {
	/* @apply bg-white shadow-lg rounded-md w-fit py-0.5 border border-gray-200; */
	min-width: 12.5em;
}

.group {
	/* @apply py-2; */
}

.group-title {
	/* @apply text-gray-500 font-medium; */
}

ul.sort-menu {
	/* @apply divide-gray-100; */
}

.sort-menu li {
	/* @apply py-2 pr-4 cursor-pointer hover:bg-gray-100; */
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	color: #44546F;
	padding: 11px 0px;
}


.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}


/* .multi_select_item {
    
} */

/* .filter_item_display_container .filter_item .label{
	} */
.filter_item_display_container .filter_item .label {
	color: #172B4D;
	margin-bottom: 0;
}

.filter_item_display_container .filter_item {
	border: 2px solid rgba(9, 30, 66, 0.14);
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: -0.25px;
	color: #626F86;
}
</style>
