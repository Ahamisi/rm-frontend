<template>
    <div class="erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="More Actions / All Suppliers" class="px-6" bgColor="white" />


        <div class=" min-h-[calc(100vh-190px)] px-6 bg-white">
            <Datatable :url="url" :filterByDate="false" :filterFields="filterFields" :columns="newColumns"
                pageName="InboundSupplier" :key="childKey">
                <template #column="col">
                    <span v-if="col.props.column.field === 'status'" class="text-xs">
                        <!-- <Tooltip :text="`${col.props.row.status}`"> -->
                        <span :class="[
                            'status rounded-md medium-text line-clamp-2 w-fit',
                            statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
                            'bg-gray-100 text-gray-800',
                        ]">
                            {{ col.props.row.status ? 'Active' : 'Inactive' }}
                        </span>
                        <!-- </Tooltip> -->
                    </span>
                    <span v-else-if="col.props.column.field === 'actions'">
                        <div class="inline-flex gap-2 h-fit">
                            <router-link :to="{ name: 'inbound.suppliers.show', params: { id: col.props.row.id } }"
                                class="px-1 rounded hover:bg-gray-200">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.5 18C7.964 18 4.501 13.74 4.501 12C4.501 9.999 7.96 6 12.501 6C16.877 6 20.499 9.973 20.499 12C20.499 13.74 17.037 18 12.501 18H12.5ZM12.501 4C6.98 4 2.5 8.841 2.5 12C2.5 15.086 7.076 20 12.5 20C17.923 20 22.5 15.086 22.5 12C22.5 8.841 18.02 4 12.5 4"
                                        fill="#44546F" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12.477 13.984C11.374 13.984 10.477 13.087 10.477 11.984C10.477 10.881 11.374 9.984 12.477 9.984C13.581 9.984 14.477 10.881 14.477 11.984C14.477 13.087 13.581 13.984 12.477 13.984ZM12.477 7.984C10.271 7.984 8.477 9.778 8.477 11.984C8.477 14.19 10.271 15.984 12.477 15.984C14.684 15.984 16.477 14.19 16.477 11.984C16.477 9.778 14.684 7.984 12.477 7.984Z"
                                        fill="#44546F" />
                                </svg>

                            </router-link>
                        </div>
                    </span>
                    <span v-else class="text-xs">
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { FilterField, FilterFields, TableColumn } from '@/types';
import Tooltip from '@/views/Components/procurement/ui/Tooltip.vue';



const url = computed(() => import.meta.env.VITE_API_URL + "suppliers/all");
const newColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Supplier Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'Category',
        field: 'category',
        sortable: false,
    },
    {
        label: 'Contact Person',
        field: 'contact_name',
        sortable: false,
    },
    {
        label: 'Phone',
        field: 'phone',
        sortable: false,
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true,
    },
    {
        label: 'Actions',
        field: 'actions',
        sortable: false,
    },
])

const childKey = ref(111);

const statusClasses = {
    Enabled: "bg-green-100 text-green-800",
    Disabled: "bg-red-100 text-red-800",
};

const filterFields = ref<FilterFields<FilterField>>({
    "Category": {
        label: "Category",
        field: "category",
        type: "select",
        options: [
            { name: "All", id: "" },
            { name: "Local Supplier", id: 'Local Supplier' },
            { name: "Overseas Supplier", id: 'Overseas Supplier' },
        ]
    },
    "status": {
        label: "Status",
        field: "status",
        type: "select",
        options: [
            { name: "All", id: "" },
            { name: "Active", id: 1 },
            { name: "Inactive", id: 0 },
        ]
    },
})

</script>

<style>
.status {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    padding: 4px;
    border-radius: 3px;
}
</style>