<template>
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
                <h1 class="text-gray-800 ">View Changes</h1>
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

                <span>{{ product.name }}</span>
            </div>
        </div>

        <div class="p-3 ml-5 rounded-lg bg-gray-50 w-fit product_summary_info">
            <div class="flex items-center justify-between">
                <!-- Last Updated Section -->
                <div class="flex flex-col">
                    <h3 class="mb-2 text-sm font-medium text-gray-600">Last Updated</h3>
                    <div class="flex items-center text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0007 3.33331C6.32398 3.33331 3.33398 6.32331 3.33398 9.99998C3.33398 13.6766 6.32398 16.6666 10.0007 16.6666C13.6773 16.6666 16.6673 13.6766 16.6673 9.99998C16.6673 6.32331 13.6773 3.33331 10.0007 3.33331ZM10.0007 15.185C8.62604 15.1832 7.30824 14.6364 6.33625 13.6644C5.36426 12.6924 4.81741 11.3746 4.81565 9.99998C4.81741 8.62537 5.36426 7.30757 6.33625 6.33558C7.30824 5.36359 8.62604 4.81674 10.0007 4.81498C11.3753 4.81674 12.6931 5.36359 13.6651 6.33558C14.637 7.30757 15.1839 8.62537 15.1857 9.99998C15.1839 11.3746 14.637 12.6924 13.6651 13.6644C12.6931 14.6364 11.3753 15.1832 10.0007 15.185ZM10.7415 9.69331V7.03998C10.7415 6.63248 10.4082 6.29915 10.0007 6.29915C9.59315 6.29915 9.25982 6.63248 9.25982 7.04081V10.0033C9.25982 10.21 9.34565 10.3958 9.48315 10.5308L11.3123 12.3591C11.4515 12.4976 11.6398 12.5753 11.8361 12.5753C12.0324 12.5753 12.2207 12.4976 12.3598 12.3591C12.498 12.22 12.5756 12.0319 12.5756 11.8358C12.5756 11.6397 12.498 11.4516 12.3598 11.3125L10.7415 9.69331Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>

                        <span class="text-sm">{{ product ? dayjs(product.updated_at).format('DD/MM/YYYY hh:mm:ssA') : ''
                            }}</span>
                    </div>
                </div>

                <!-- Divider -->
                <div class="w-px h-12 mx-6 bg-gray-300"></div>

                <!-- Batch Quantity Section -->
                <div class="flex flex-col">
                    <h3 class="mb-2 text-sm font-medium text-gray-600">Batch Quantity</h3>
                    <div class="flex items-center text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.78109 1.80331C9.11755 1.7727 9.45672 1.8106 9.77813 1.91473C10.0995 2.01886 10.3965 2.18705 10.6511 2.40915L10.7761 2.52581L17.2944 9.04498C17.743 9.49367 18.0042 10.0961 18.0251 10.7303C18.046 11.3644 17.825 11.9827 17.4069 12.46L17.2944 12.58L12.5803 17.2941C12.1316 17.7427 11.5291 18.004 10.895 18.0249C10.2608 18.0457 9.64249 17.8247 9.16525 17.4066L9.04525 17.2941L2.52525 10.775C2.28648 10.5362 2.09855 10.2516 1.9728 9.9382C1.84705 9.62483 1.78609 9.28923 1.79359 8.95165L1.80275 8.78081L2.19609 4.45998C2.24658 3.90313 2.48229 3.37929 2.86555 2.97217C3.2488 2.56505 3.75747 2.29816 4.31025 2.21415L4.45942 2.19665L8.78109 1.80331ZM9.03775 3.46081L8.93192 3.46331L4.61109 3.85665C4.43389 3.87265 4.26646 3.94494 4.1333 4.06295C4.00015 4.18096 3.90826 4.33849 3.87109 4.51248L3.85692 4.61081L3.46359 8.93165C3.44465 9.14161 3.50599 9.35095 3.63525 9.51748L3.70442 9.59665L10.2236 16.1158C10.3671 16.2593 10.558 16.3455 10.7605 16.3582C10.963 16.371 11.1632 16.3094 11.3236 16.185L11.4019 16.1158L16.1161 11.4016C16.2596 11.2582 16.3458 11.0672 16.3585 10.8647C16.3712 10.6622 16.3096 10.462 16.1853 10.3016L16.1161 10.2233L9.59692 3.70415C9.44797 3.5553 9.24819 3.46836 9.03775 3.46081ZM6.09775 6.09831C6.32992 5.86615 6.60554 5.68198 6.90888 5.55634C7.21222 5.43069 7.53734 5.36602 7.86567 5.36602C8.194 5.36602 8.51912 5.43069 8.82246 5.55634C9.1258 5.68198 9.40142 5.86615 9.63359 6.09831C9.86575 6.33048 10.0499 6.6061 10.1756 6.90944C10.3012 7.21278 10.3659 7.5379 10.3659 7.86623C10.3659 8.19456 10.3012 8.51968 10.1756 8.82302C10.0499 9.12636 9.86575 9.40198 9.63359 9.63415C9.16471 10.103 8.52877 10.3664 7.86567 10.3664C7.20257 10.3664 6.56663 10.103 6.09775 9.63415C5.62887 9.16527 5.36546 8.52933 5.36546 7.86623C5.36546 7.20313 5.62887 6.56719 6.09775 6.09831ZM8.45525 7.27665C8.37788 7.19922 8.28602 7.1378 8.18491 7.09587C8.0838 7.05395 7.97542 7.03235 7.86596 7.03231C7.75651 7.03227 7.64811 7.05379 7.54697 7.09565C7.44583 7.1375 7.35393 7.19886 7.2765 7.27623C7.19908 7.3536 7.13765 7.44546 7.09573 7.54657C7.0538 7.64769 7.03221 7.75606 7.03217 7.86552C7.03213 7.97498 7.05365 8.08337 7.0955 8.18451C7.13735 8.28565 7.19872 8.37756 7.27609 8.45498C7.43234 8.61135 7.64432 8.69924 7.86537 8.69932C8.08643 8.6994 8.29847 8.61165 8.45484 8.4554C8.6112 8.29914 8.69909 8.08717 8.69917 7.86611C8.69925 7.64505 8.61151 7.43302 8.45525 7.27665Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>

                        <span class="text-sm font-medium">{{ product?.quantity_available }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-6">
            <Datatable :columns="newColumns" :url="url" pagename="ProductChanges" :filterByDate="true">
            </Datatable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import axios from 'axios';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { FilterField, FilterFields, TableColumn } from "@/types";
import Datatable from "@/views/Components/Datatable/Datatable.vue";


const url = computed(() => import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/changes`);

const getPageTitle = computed(() => {
    return `${title.value} / ${product.value.name}`;
});

onMounted(() => {
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${route.params.id}`).then(res => {
        product.value = res.data;
    })
})

const title = ref('Products Management / All Products');
const route = useRoute();
const product = ref<Partial<{ name: string }>>({});
const newColumns = ref<TableColumn[]>([
    {
        label: 'User',
        field: 'user.name',
        sortable: false,
    },
    {
        label: 'Batch',
        field: 'subproduct.batch_no',
        sortable: false,
    },
    {
        label: 'Action',
        field: 'description',
        sortable: false,
    },
    {
        label: 'Qty Change',
        field: 'change',
        sortable: false,
    },
    {
        label: 'Old Product Qty',
        field: 'old_product_quantity',
        sortable: false,
    },
    {
        label: 'New Product Qty',
        field: 'new_product_quantity',
        sortable: false,
    },
    {
        label: 'Old Batch Qty',
        field: 'old_batch_quantity',
        sortable: false,
    },
    {
        label: 'New Batch Qty',
        field: 'new_batch_quantity',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'created_at',
        sortable: false,
        format: (value) => dayjs(value).format('DD/MM/YYYY hh:mm:ssA')
    },
]);

const filters = ref({
    from_date: '',
    to_date: '',
})

</script>

<style>
h1 {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
}

.product_summary_info {
    background: rgba(247, 248, 249, 1);
}

.product_summary_info h3 {
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    color: rgba(98, 111, 134, 1)
}

.product_summary_info span {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}
</style>