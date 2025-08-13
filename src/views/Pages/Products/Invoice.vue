<template>
    <div class="h-full px-6 pb-4 bg-white">
        <Datatable :url="invoicesUrl" :filterByDate="false" :columns="columns"
            :pageName="`Product${route.params.id}Invoices`" :key="childKey">
            <template #column="col">
                <span v-if="col.props.column.field == 'action'">
                    <div class="flex items-center justify-center gap-3">
                        <router-link :to="{ name: 'products.batches.history', params: { id: col.props.row.id } }"
                            class="px-3 py-2 hover:bg-gray-100">
                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12.5 4C8.088 4 4.5 7.588 4.5 12C4.5 16.412 8.088 20 12.5 20C16.912 20 20.5 16.412 20.5 12C20.5 7.588 16.912 4 12.5 4ZM12.5 18.222C10.8505 18.2199 9.26911 17.5637 8.10272 16.3973C6.93633 15.2309 6.28012 13.6495 6.278 12C6.28012 10.3505 6.93633 8.76911 8.10272 7.60272C9.26911 6.43633 10.8505 5.78012 12.5 5.778C14.1495 5.78012 15.7309 6.43633 16.8973 7.60272C18.0637 8.76911 18.7199 10.3505 18.722 12C18.7199 13.6495 18.0637 15.2309 16.8973 16.3973C15.7309 17.5637 14.1495 18.2199 12.5 18.222ZM13.389 11.632V8.448C13.389 7.959 12.989 7.559 12.5 7.559C12.011 7.559 11.611 7.959 11.611 8.449V12.004C11.611 12.252 11.714 12.475 11.879 12.637L14.074 14.831C14.241 14.9972 14.4669 15.0904 14.7025 15.0904C14.9381 15.0904 15.164 14.9972 15.331 14.831C15.4969 14.6641 15.5899 14.4383 15.5899 14.203C15.5899 13.9677 15.4969 13.7419 15.331 13.575L13.389 11.632Z"
                                    fill="#44546F" />
                            </svg>

                        </router-link>
                    </div>
                </span>
                <span v-else-if="col.props.column.field == 'total_cost_on_purchase'">
                    ₦{{ col.props.formattedRow[col.props.column.field] / col.props.row.quantity }}
                </span>
                <span v-else-if="col.props.column.field == 'deal_id'">
                    <span v-if="col.props.row.deal_id" class="deal_tag">Deal</span>
                    <span v-else class="default_tag">No Deal</span>
                </span>
                <span v-else-if="col.props.column.field == 'order_group.status_text'">
                    <span class="default_tag">{{ col.props.formattedRow[col.props.column.field] }}</span>
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

const route = useRoute();
const childKey = ref(111);
const invoicesUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/invoices`)

const columns = ref<TableColumn[]>([
    {
        label: 'Order No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Customer Name',
        field: 'order_group.user.name',
        sortable: false,
    },
    {
        label: 'Store Name',
        field: 'order_group.store.name',
        sortable: false,
    },
    {
        label: 'Payment',
        field: 'order_group.payment_method.display_name',
        sortable: false,
    },
    {
        label: 'Deal',
        field: 'deal_id',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'quantity',
        sortable: true,
    },
    {
        label: 'Unit Cost',
        field: 'total_cost_on_purchase',
        sortable: true,
    },
    {
        label: 'Purchase Price',
        field: 'price_on_purchase',
        sortable: true,
        format: (value) => '₦' + value,
    },
    {
        label: 'Total Amount',
        field: 'total_amount',
        sortable: true,
        format: (value) => '₦' + value,
    },
    {
        label: 'Status',
        field: 'order_group.status_text',
        sortable: true,
    },
    {
        label: 'Order Date',
        field: 'created_at',
        sortable: false,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Processing Date',
        field: 'order_group.delivery_type.pivot.processing_date',
        sortable: false,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
])
</script>

<style>
.default_tag,
.deal_tag {
    padding: 4px;
    border-radius: 3px;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
}

.default_tag {

    background: rgba(9, 30, 66, 0.06);

    color: rgba(68, 84, 111, 1);
}

.deal_tag {
    background: rgba(243, 240, 255, 1);
    color: rgba(94, 77, 178, 1);
}
</style>