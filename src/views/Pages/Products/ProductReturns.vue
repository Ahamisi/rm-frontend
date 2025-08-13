<template>
    <div class="px-6 pb-4 bg-white ">
        <Datatable :url="returnUrl" :filterByDate="false" :columns="columns"
            :pagename="`product${$route.params.id}Returns`" :key="childKey">
            <template #column="col">
                <span v-if="col.props.column.field == 'total'">
                    ₦{{ toLocale(col.props.row.total_quantity * col.props.row.order.price_on_purchase) }}
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
import { toLocale } from '@/views/helpers/useLocale.js'

const route = useRoute();
const childKey = ref(111);
const returnUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/returns`)

const columns = ref<TableColumn[]>([
    {
        label: 'Order No.',
        field: 'order.order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Customer Name',
        field: 'order.order_group.user.name',
        sortable: false,
    },
    {
        label: 'Reason',
        field: 'product_return.reason',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'total_quantity',
        sortable: true,
    },
    {
        label: 'Total Amount',
        field: 'total',
        sortable: false,
    },
    {
        label: 'Return Date',
        field: 'created_at',
        sortable: false,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
])
</script>

<style></style>