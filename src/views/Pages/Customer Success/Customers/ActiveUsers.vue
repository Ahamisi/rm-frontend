<template>
	<main>
		<DatatableTable :columns="columns" :filterFields="filterFields" :url="url" pagename="ActiveCustomers"
			:filterByDate="true">
			<template #column="col">
				<span v-if="col.props.column.field === 'action'">
					<div class="flex" v-if="activeDepartment == 'inbound'">
						<button @click="customerId = col.props.row.id; isInboundViewOpen = true"
							class="rounded hover:bg-gray-200">
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12.5 18C7.964 18 4.501 13.74 4.501 12C4.501 9.999 7.96 6 12.501 6C16.877 6 20.499 9.973 20.499 12C20.499 13.74 17.037 18 12.501 18H12.5ZM12.501 4C6.98 4 2.5 8.841 2.5 12C2.5 15.086 7.076 20 12.5 20C17.923 20 22.5 15.086 22.5 12C22.5 8.841 18.02 4 12.5 4"
									fill="#44546F" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M12.477 13.984C11.374 13.984 10.477 13.087 10.477 11.984C10.477 10.881 11.374 9.984 12.477 9.984C13.581 9.984 14.477 10.881 14.477 11.984C14.477 13.087 13.581 13.984 12.477 13.984ZM12.477 7.984C10.271 7.984 8.477 9.778 8.477 11.984C8.477 14.19 10.271 15.984 12.477 15.984C14.684 15.984 16.477 14.19 16.477 11.984C16.477 9.778 14.684 7.984 12.477 7.984Z"
									fill="#44546F" />
							</svg>
						</button>
					</div>
					<Action :data="col.props.row" :key="col.props.row.id" v-else />
				</span>
				<span v-else-if="col.props.column.field === 'name'">
					<a href="#" @click.prevent="customerId = col.props.row.id; isInboundViewOpen = true"
						class="medium-text hover:underline">
						{{ col.props.row.name }}
					</a>
				</span>
				<span v-else-if="col.props.column.field === 'status'">
					<!-- <Tooltip :text="`${col.props.row.status}`"> -->
					<span :class="[
						'px-2 py-1 rounded-md medium-text line-clamp-2 w-fit',
						statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
						'bg-gray-100 text-gray-800',
					]">
						{{ col.props.row.status ? 'Enabled' : 'Disabled' }}
					</span>
					<!-- </Tooltip> -->
				</span>
				<span v-else-if="col.props.column.field === 'warning_tags'">
					<button v-if="col.props.row.warning_tags" class="p-2 text-sm text-white bg-red-900 rounded"
						type="button">View warning(s)</button>
					<span v-else>N/A</span>
				</span>
				<span v-else>
					{{ col.props.formattedRow[col.props.column.field] }}
				</span>
			</template>
		</DatatableTable>
		<InboundView :customerId="customerId" />
	</main>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import DatatableTable from "@/views/Components/Datatable/Datatable.vue";
import { FilterField, FilterFields, TableColumn } from "@/types";
import Action from "./Action.vue";
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { useAuthStore } from "@/stores/auth";
import InboundView from "./InboundView.vue";

const authStore = useAuthStore();
const customerId = ref(0)
const url = computed(() => import.meta.env.VITE_API_URL + "admin/users?activated=1")
const activeDepartment = computed(() => authStore.selectedDepartment ? authStore.selectedDepartment.toLowerCase() : '')

const statusClasses = {
	Enabled: "bg-green-100 text-green-800",
	Disabled: "bg-red-100 text-red-800",
};

const filterFields = ref<FilterFields<FilterField>>({
	"status": {
		label: "Status",
		field: "status",
		type: "select",
		options: [
			{ name: "All", id: "" },
			{ name: "Enabled", id: 1 },
			{ name: "Disabled", id: 0 },
		]
	},
	"user_type": {
		label: "Customer Type",
		field: "user_type",
		type: "select",
		options: [
			{ name: "All", id: "" },
			{ name: "Hospital", id: "hospital" },
			{ name: "Pharmacy", id: "pharmacy" },
			{ name: "Chemist", id: "chemist" },
			{ name: "Distributor", id: "distributor" },
			{ name: "Mega Distributor", id: "mega distributor" },
			{ name: "Super Distributor", id: "super distributor" },
		]
	}
});


const columns = ref<TableColumn[]>([
	{ label: "ID", field: "id", sortable: true },
	{ label: "Customer Name", field: "name", sortable: true },
	{
		label: "Store Name", field: "stores", sortable: true, format: (value: any) => {
			if (value.length < 1) return "No stores";
			return value.map((store: any) => store.name).join(", ");
		}
	},
	{ label: "Customer Type", field: "user_type", sortable: false, format: (value: any) => value != null ? value.charAt(0).toUpperCase() + value.slice(1) : value },
	{ label: "Email", field: "email", sortable: false },
	{ label: "Phone", field: "phone", sortable: false },
	{ label: "Status", field: "status", sortable: false },
	{ label: "Warning Tags", field: "warning_tags", sortable: false },
	{ label: "Action", field: "action", sortable: false },
]);
</script>
