<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="bg-white erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle :title="getPageTitle" class="px-6" />

        <div class="flex items-center gap-8 px-5 py-4">
            <div class="flex items-center space-x-4">
                <button @click="$goBack()"
                    class="flex items-center p-2 text-xs text-gray-600 rounded hover:text-gray-800 hover:bg-gray-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>
            <div class="flex items-center justify-center flex-1 space-x-4 text-sm text-gray-600">
                <h1 class="text-gray-800 ">View Batch History</h1>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="20" height="20" rx="3.75" fill="#F7F8F9" />
                    <g clip-path="url(#clip0_5172_209604)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.1189 6.35172C10.3355 6.28219 10.5671 6.27312 10.7885 6.32547L10.8822 6.35172L13.6047 7.22505C13.6839 7.2513 13.7552 7.30047 13.8072 7.36922L13.8364 7.41297L14.9822 9.39089C15.0112 9.44085 15.0295 9.49629 15.0359 9.55369C15.0423 9.6111 15.0367 9.6692 15.0195 9.72433C15.0023 9.77946 14.9737 9.8304 14.9358 9.87392C14.8978 9.91744 14.8512 9.95259 14.7989 9.97714L14.7489 9.99672L13.8943 10.2709V12.0751C13.8943 12.24 13.8452 12.4012 13.7535 12.5383C13.6617 12.6754 13.5314 12.7821 13.3789 12.8451L13.3156 12.8684L10.8822 13.6484C10.6656 13.7179 10.4341 13.727 10.2127 13.6746L10.1189 13.6488L7.68557 12.8684C7.52847 12.8179 7.38989 12.722 7.28737 12.5927C7.18486 12.4634 7.12304 12.3066 7.10974 12.1421L7.10682 12.0746V10.2709L6.25224 9.99672C6.19728 9.97908 6.14658 9.95022 6.10337 9.91196C6.06015 9.8737 6.02535 9.82688 6.00118 9.77447C5.97701 9.72205 5.964 9.66519 5.96296 9.60748C5.96192 9.54977 5.97288 9.49247 5.99515 9.43922L6.0189 9.39089L7.16474 7.41297C7.20769 7.33886 7.27243 7.27979 7.35015 7.2438L7.39599 7.22505L10.1189 6.35172ZM10.9172 10.1271V12.7621L13.061 12.0746V10.5384L11.7735 10.9513C11.6909 10.9778 11.6021 10.9778 11.5195 10.9515C11.4369 10.9251 11.3646 10.8736 11.3127 10.8042L11.286 10.7634L10.9172 10.1271ZM10.0839 10.1271L9.71515 10.7634C9.6675 10.8456 9.59318 10.9091 9.50452 10.9432C9.41585 10.9774 9.31816 10.9803 9.22765 10.9513L7.94015 10.5384V12.0746L10.0839 12.7626V10.1271ZM7.71724 8.12089L6.99932 9.3613L9.16224 10.0555L9.88099 8.81505L7.71724 8.12089ZM13.2839 8.12089L11.1202 8.81505L11.8385 10.0555L14.0018 9.3613L13.2839 8.12089ZM10.6277 7.14505C10.5617 7.12399 10.4915 7.11969 10.4235 7.13255L10.3735 7.14505L8.88807 7.62172L10.5006 8.1388L12.1131 7.62172L10.6277 7.14505Z"
                            fill="#626F86" />
                    </g>
                    <defs>
                        <clipPath id="clip0_5172_209604">
                            <rect width="10" height="10" fill="white" transform="translate(5.5 5)" />
                        </clipPath>
                    </defs>
                </svg>

                <span>{{ batch?.batch_no }}</span>
            </div>
        </div>


        <Datatable :url="historyUrl" :filterByDate="false" :columns="columns"
            :pageName="`ProductBatch${route.params.id}History`" :key="childKey">

        </Datatable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { useRoute } from 'vue-router'
import { TableColumn } from '@/types';
import dayjs from 'dayjs';
import axios from 'axios'
import { useToast } from 'vue-toastification';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { toLocale } from '@/views/helpers/useLocale.js';

onMounted(async () => {
    loading.value = true;
    try {
        await getBatch();
        await getProduct();
    } catch (err) {
        console.log(err);
        toast.error("Something went wrong!");
    } finally {
        loading.value = false;
    }
});

const loading = ref(false)
const route = useRoute();
const childKey = ref(111);
const toast = useToast()
const batch = ref<null | Partial<{
    id: number,
    product_id: number,
    batch_no: string,
}>>(null);
const product = ref<Partial<{ name: string }>>({});
const historyUrl = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/history`)
const getPageTitle = computed(() => {
    return `Products Management / All Products / ${product.value?.name} / ${batch.value?.batch_no}`;
});


const columns = ref<TableColumn[]>([
    {
        label: 'Order Ref No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'quantity',
        sortable: true,
    },
    {
        label: 'Cost on Purchase',
        field: 'cost_on_purchase',
        sortable: true,
        format: (value) => "₦" + toLocale(value)
    },
    {
        label: 'Price on Purchase',
        field: 'price_on_purchase',
        sortable: true,
        format: (value) => "₦" + toLocale(value)
    },
    {
        label: 'Order Date',
        field: 'order_group.created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Total Amount',
        field: 'total',
        sortable: false,
    }
])


const getProduct = async () => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}admin/products/${batch.value?.product_id}`
        );
        product.value = res.data;
    } catch (err) {
        console.log(err);
        toast.error("Error fetching product details!!");
    }
};

const getBatch = async () => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}admin/subproducts/${route.params.id}`
        );
        batch.value = res.data;
    } catch (err) {
        console.log(err);
        toast.error("Error fetching batch details!!");
        throw err; // so onMounted can catch it
    }
};
</script>

<style></style>