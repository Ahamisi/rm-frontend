<template>
    <div class="h-full px-6 pb-4 bg-white">
        <Datatable :url="batchUrl" :filterByDate="false" :columns="columns"
            :pagename="`product${$route.params.id}Batches`" :key="childKey">
            <template #column="col">
                <span v-if="col.props.column.field == 'action'">
                    <router-link :to="{ name: 'products.batches.history', params: { id: col.props.row.id } }"
                        class="hover:bg-gray-100 h-fit">
                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.5 4C8.088 4 4.5 7.588 4.5 12C4.5 16.412 8.088 20 12.5 20C16.912 20 20.5 16.412 20.5 12C20.5 7.588 16.912 4 12.5 4ZM12.5 18.222C10.8505 18.2199 9.26911 17.5637 8.10272 16.3973C6.93633 15.2309 6.28012 13.6495 6.278 12C6.28012 10.3505 6.93633 8.76911 8.10272 7.60272C9.26911 6.43633 10.8505 5.78012 12.5 5.778C14.1495 5.78012 15.7309 6.43633 16.8973 7.60272C18.0637 8.76911 18.7199 10.3505 18.722 12C18.7199 13.6495 18.0637 15.2309 16.8973 16.3973C15.7309 17.5637 14.1495 18.2199 12.5 18.222ZM13.389 11.632V8.448C13.389 7.959 12.989 7.559 12.5 7.559C12.011 7.559 11.611 7.959 11.611 8.449V12.004C11.611 12.252 11.714 12.475 11.879 12.637L14.074 14.831C14.241 14.9972 14.4669 15.0904 14.7025 15.0904C14.9381 15.0904 15.164 14.9972 15.331 14.831C15.4969 14.6641 15.5899 14.4383 15.5899 14.203C15.5899 13.9677 15.4969 13.7419 15.331 13.575L13.389 11.632Z"
                                fill="#44546F" />
                        </svg>
                    </router-link>
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
const batchUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/batches`)

const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Batch No.',
        field: 'batch_no',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'quantity',
        sortable: true,
    },
    {
        label: 'Expiry date',
        field: 'expiry_date',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Warehouse Shelf',
        field: 'warehouse_shelf',
        sortable: false,
        format: (value) => Array.isArray(value) ? value.join(", ") : value
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false,
    },
])
</script>

<style></style>