<template>
	<main>
		<DatatableTable :columns="columns" :filterFields="filterFields" url="/api/v1/admin/users?deactivated=1"
			pagename="DeactivatedCustomers" :filterByDate="true">
			<template #column="col">
				<span v-if="col.props.column.field === 'action'">
					<Action :data="col.props.row" :key="col.props.row.id" />
				</span>
				<span v-else-if="col.props.column.field === 'name'">
					<router-link :to="{ name: 'customer-success.customers.view', params: { id: col.props.row.id } }"
						class="medium-text hover:underline">
						{{ col.props.row.name }}
					</router-link>
				</span>
				<span v-else-if="col.props.column.field === 'status'">
					<!-- <Tooltip :text="col.props.row.status"> -->
					<span :class="[
						'px-2 py-1 rounded-md medium-text line-clamp-2 w-fit',
						statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
						'bg-gray-100 text-gray-800',
					]">
						{{ col.props.row.status ? 'Enabled' : 'Disabled' }}
					</span>
					<!-- </Tooltip> -->
				</span>
				<span v-else>
					{{ col.props.formattedRow[col.props.column.field] }}
				</span>
			</template>
		</DatatableTable>
	</main>
</template>


<script setup lang="ts">
import { ref } from "vue";
import DatatableTable from "@/views/Components/Datatable/Datatable.vue";
import { FilterField, FilterFields, TableColumn } from "@/types";
import Action from "./Action.vue";
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";

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

const statusClasses = {
	Enabled: "bg-green-100 text-green-800",
	Disabled: "bg-red-100 text-red-800",
};


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
