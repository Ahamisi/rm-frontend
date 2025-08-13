<template>
    <div class="px-6 pb-4 bg-white ">
        <Datatable :url="damagesUrl" :filterByDate="false" :columns="columns"
            :pagename="`product${$route.params.id}Damages`" :key="childKey">

        </Datatable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { useRoute } from 'vue-router'
import { TableColumn } from '@/types';

const route = useRoute();
const childKey = ref(111);
const damagesUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/damages`)

const columns = ref<TableColumn[]>([
    {
        label: 'Reason',
        field: 'damage_cause',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'quantity',
        sortable: true,
    },
    {
        label: 'Total Amount',
        field: 'total',
        sortable: false,
    },
])
</script>

<style></style>