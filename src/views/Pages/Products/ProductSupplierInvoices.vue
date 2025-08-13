<template>
    <div class="px-6 pb-4 bg-white ">
        <Datatable :url="supplierInvoicesUrl" :filterByDate="false" :columns="columns"
            :pagename="`product${$route.params.id}SupplierInvoices`" :key="childKey">
            <template #column="col">
                <span v-if="col.props.column.field == 'actual_quantity'">
                    {{ col.props.row.quantity - col.props.row.returned }}
                </span>
                <span v-else>
                    {{ col.props.formattedRow[col.props.column.field] }}
                </span>
            </template>
        </Datatable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { useRoute } from 'vue-router'
import { TableColumn } from '@/types';
import dayjs from 'dayjs'
import { toLocale } from '@/views/helpers/useLocale.js';

const route = useRoute();
const childKey = ref(111);
const supplierInvoicesUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/supplier_invoices`)

const columns = ref<TableColumn[]>([
    {
        label: 'Invoice No.',
        field: 'invoice.doc_no',
        sortable: false,
    },
    {
        label: 'Supplier Name',
        field: 'invoice.purchase_order.supplier.name',
        sortable: false,
    },
    {
        label: 'Inbounded Quantity',
        field: 'quantity',
        sortable: true,
    },
    {
        label: 'Returned Quantity',
        field: 'returned',
        sortable: true,
    },
    {
        label: 'Actual Quantity',
        field: 'actual_quantity',
        sortable: true,
    },
    {
        label: 'Total Amount',
        field: 'invoice.total',
        sortable: false,
        format: (value) => '₦' + toLocale(value)
    },
    {
        label: 'Invoice Date',
        field: 'purchase_order.invoice.confirmed_at',
        sortable: false,
        format: (value) => value ? dayjs(value).format('DD/MM/YYYY') : 'Not confirmed'
    },
])
</script>

<style></style>