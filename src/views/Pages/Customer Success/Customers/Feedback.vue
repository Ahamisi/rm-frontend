<template>
    <div class="erp_dashboard_wrapper">
        <div class="">
            <!-- Header -->
            <PageTitle title="Customers / Feedback" class="px-6" />
        </div>
        
        <!-- contents -->
        <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
            <Datatable
                :items="feedbackData"
                :columns="columns"
                :searchable="true"
                :filterByDate="false"
                :printable="false"
                :exportable="false"
                :filterFields="{}"
                pageName="Feedback"
            >
                <template #column="col">
                    <!-- Rating Column with Stars -->
                    <span v-if="col.props?.column?.field === 'rating'">
                        <div class="flex items-center gap-1">
                            <template v-for="star in 5" :key="star">
                                <!-- Filled Star -->
                                <svg
                                    v-if="star <= (col.props?.formattedRow as any)?.rating"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.0714 17.284L8.1664 19.337C8.00125 19.4238 7.81511 19.4627 7.62901 19.4493C7.44291 19.4358 7.26429 19.3706 7.11333 19.2609C6.96237 19.1513 6.8451 19.0016 6.77478 18.8287C6.70446 18.6559 6.68389 18.4669 6.7154 18.283L7.4604 13.934L4.3014 10.854C4.16799 10.7237 4.07365 10.5587 4.02904 10.3777C3.98443 10.1967 3.99133 10.0068 4.04895 9.82944C4.10656 9.65211 4.21261 9.49442 4.35512 9.37418C4.49762 9.25394 4.6709 9.17593 4.8554 9.14897L9.2214 8.51397L11.1744 4.55797C11.2569 4.3905 11.3847 4.24948 11.5432 4.15087C11.7017 4.05226 11.8847 4 12.0714 4C12.2581 4 12.4411 4.05226 12.5996 4.15087C12.7581 4.24948 12.8859 4.3905 12.9684 4.55797L14.9204 8.51397L19.2864 9.14897C19.471 9.17578 19.6444 9.25367 19.787 9.37385C19.9296 9.49403 20.0358 9.6517 20.0936 9.82906C20.1513 10.0064 20.1583 10.1964 20.1137 10.3775C20.0691 10.5586 19.9748 10.7236 19.8414 10.854L16.6814 13.934L17.4274 18.283C17.4588 18.4667 17.4382 18.6556 17.3679 18.8283C17.2976 19.001 17.1804 19.1505 17.0296 19.2602C16.8788 19.3698 16.7004 19.435 16.5145 19.4486C16.3285 19.4622 16.1425 19.4235 15.9774 19.337L12.0714 17.284Z"
                                        fill="#E56910"
                                    />
                                </svg>
                                <!-- Unfilled Star -->
                                <svg
                                    v-else
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.9973 16.3729L15.9773 18.5659L15.2173 13.9109L18.4933 10.5639L13.9693 9.87394L11.9973 5.68694L10.0253 9.87594L5.5013 10.5649L8.7773 13.9099L8.0153 18.5649L11.9973 16.3729ZM11.9973 18.6559L8.98131 20.3179C8.65265 20.4991 8.27966 20.5841 7.90498 20.5632C7.53029 20.5424 7.16903 20.4166 6.86247 20.2002C6.55591 19.9837 6.31643 19.6854 6.1714 19.3393C6.02636 18.9932 5.98163 18.6133 6.0423 18.2429L6.6413 14.5869L4.0713 11.9629C3.81362 11.6999 3.63356 11.3708 3.55096 11.012C3.46837 10.6531 3.48644 10.2784 3.6032 9.92922C3.71995 9.57999 3.93085 9.26977 4.21266 9.03276C4.49446 8.79574 4.83623 8.64112 5.2003 8.58594L8.67031 8.05794L10.1883 4.83394C10.35 4.4909 10.606 4.20092 10.9263 3.99782C11.2466 3.79473 11.618 3.68689 11.9973 3.68689C12.3766 3.68689 12.748 3.79473 13.0683 3.99782C13.3886 4.20092 13.6446 4.4909 13.8063 4.83394L15.3253 8.05794L18.7953 8.58594C19.1592 8.64142 19.5007 8.79626 19.7823 9.0334C20.0638 9.27054 20.2745 9.58079 20.391 9.92997C20.5075 10.2791 20.5254 10.6537 20.4427 11.0124C20.36 11.3711 20.18 11.7 19.9223 11.9629L17.3533 14.5869L17.9523 18.2429C18.0131 18.6134 17.9684 18.9935 17.8234 19.3398C17.6783 19.686 17.4387 19.9845 17.132 20.2009C16.8253 20.4174 16.4638 20.5432 16.0889 20.5639C15.7141 20.5846 15.341 20.4993 15.0123 20.3179L11.9973 18.6559Z"
                                        fill="#626F86"
                                    />
                                </svg>
                            </template>
                        </div>
                    </span>

                    <!-- Default Column -->
                    <span v-else>
                        {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                    </span>
                </template>
            </Datatable>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Column definitions for Feedback
const columns = ref<TableColumn[]>([
    { label: 'ID', field: 'id', sortable: true },
    { label: 'Rating', field: 'rating', sortable: true },
    { label: 'Feedback', field: 'feedback', sortable: true },
    { label: 'Customer Name', field: 'customerName', sortable: true },
    { label: 'Order No', field: 'orderNo', sortable: true }
]);

// Mock feedback data
const feedbackData = ref([
    { id: 87, rating: 5, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emeka Kalu', orderNo: 87 },
    { id: 54, rating: 5, feedback: 'Exactly what I wanted', customerName: 'Emeka Kalu', orderNo: '1656493689-254' },
    { id: 25, rating: 5, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emeka Kalu', orderNo: 25 },
    { id: 30, rating: 5, feedback: 'Exactly what I wanted', customerName: 'Emmanuel Aba', orderNo: 30 },
    { id: 51, rating: 5, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emeka Kalu', orderNo: 51 },
    { id: 21, rating: 1, feedback: 'You didn\'t supply the orders to me', customerName: 'Emmanuel Aba', orderNo: 21 },
    { id: 35, rating: 5, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Nyerhovwo Omuvwie', orderNo: 35 },
    { id: 23, rating: 1, feedback: 'You didn\'t supply the orders to me', customerName: 'Emeka Kalu', orderNo: 23 },
    { id: 33, rating: 4, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emmanuel Aba', orderNo: 33 },
    { id: 88, rating: 4, feedback: 'Exactly what I wanted', customerName: 'Emeka Kalu', orderNo: 87 },
    { id: 81, rating: 4, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emmanuel Aba', orderNo: 88 },
    { id: 80, rating: 4, feedback: 'Exactly what I wanted', customerName: 'Nyerhovwo Omuvwie', orderNo: 81 },
    { id: 5, rating: 3, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emeka Kalu', orderNo: 80 },
    { id: 55, rating: 5, feedback: 'Exactly what I wanted', customerName: 'Nyerhovwo Omuvwie', orderNo: 5 },
    { id: 56, rating: 5, feedback: 'Impressive. I will constantly support remedial Health', customerName: 'Emeka Kalu', orderNo: 55 }
]);
</script>

<style scoped>
.grey_bg {
    background: rgba(247, 248, 249, 1);
}

.tab_contents {
    padding-top: 0;
}
</style>

