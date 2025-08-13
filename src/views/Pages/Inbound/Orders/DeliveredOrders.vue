<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="More Actions / Delivered Orders" />

        <div class="flex items-center justify-center  min-h-[calc(100vh-190px)]" v-if="!hasSearched">
            <div class="intro_search_wrapper">
                <div class="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
                            fill="#1D7AFC" />
                    </svg>
                    <h3>Let's Find Your Orders</h3>
                </div>
                <p class="my-4 text-center">Please search by Order Ref No, Customer Name or Store Name to load
                    delivered orders</p>
                <div class="relative grid items-baseline grid-cols-1 gap-2 md:grid-cols-7 search_content">
                    <select name="" v-model="searchBy"
                        class="md:col-span-2 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                        <option value="order">Order Ref No</option>
                        <option value="customer">Customer Name</option>
                        <option value="store">Store Name</option>
                    </select>
                    <div class="relative p-0 m-0 md:col-span-4">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="absolute top-2 left-1">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.1965 12.5708L17.4798 15.9125C17.6269 16.0715 17.7063 16.2815 17.7012 16.498C17.6961 16.7145 17.6069 16.9206 17.4525 17.0725C17.2982 17.2244 17.0907 17.3102 16.8741 17.3117C16.6575 17.3133 16.4489 17.2305 16.2923 17.0808L13.0106 13.7425C11.7444 14.6964 10.163 15.1334 8.58669 14.9652C7.01035 14.7969 5.55684 14.036 4.52048 12.8363C3.48411 11.6367 2.94234 10.0881 3.00487 8.50399C3.06739 6.91993 3.72953 5.41881 4.85722 4.3046C5.98491 3.19038 7.49388 2.54632 9.07858 2.50284C10.6633 2.45936 12.2053 3.0197 13.3924 4.07041C14.5795 5.12111 15.3229 6.58366 15.4722 8.16192C15.6215 9.74017 15.1655 11.3162 14.1965 12.5708ZM9.2498 13.3333C10.4654 13.3333 11.6312 12.8505 12.4907 11.9909C13.3502 11.1314 13.8331 9.96558 13.8331 8.75C13.8331 7.53443 13.3502 6.36864 12.4907 5.5091C11.6312 4.64956 10.4654 4.16667 9.2498 4.16667C8.03422 4.16667 6.86843 4.64956 6.00889 5.5091C5.14935 6.36864 4.66646 7.53443 4.66646 8.75C4.66646 9.96558 5.14935 11.1314 6.00889 11.9909C6.86843 12.8505 8.03422 13.3333 9.2498 13.3333Z"
                                fill="#626F86" />
                        </svg>
                        <input type="text" v-model="search"
                            class="w-full pr-2 pl-7 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <button class="text-white" @click="hasSearched = true">search</button>
                </div>
            </div>
        </div>
        <div class=" min-h-[calc(100vh-190px)]" v-else>
            <DatatableTable :columns="columns" :url="url" pagename="DeliveredOrders" :filterByDate="true"
                :filterFields="filterFields" @onSearch="updateSearch" :key="childKey">
                <template #header_search>
                    <div class="flex items-center gap-2 mr-3">
                        <label for="sort_by" class="sort_by_label">Search By</label>
                        <select name="" id="sort_by" v-model="searchBy"
                            class="data_table_select px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                            <option value="order">Order Ref No</option>
                            <option value="customer">Customer Name</option>
                            <option value="store">Store Name</option>
                        </select>
                    </div>
                </template>
                <template #column="col">
                    <span v-if="col.props.column.field === 'action'">
                        <TableActionDropdown :rowData="col.props.row">
                            <template #default="{ selectedItem, closeDropdown }">
                                <li @click="viewOrderId = selectedItem.id; closeDropdown()" as="li"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                            fill="#626F86" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                            fill="#626F86" />
                                    </svg>

                                    View Order
                                </li>
                                <a @click="closeDropdown()" :href="getInvoiceUrl(selectedItem, 'invoice')"
                                    target="_blank" as="li" v-if="showDownloadInvoice()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                                            fill="#626F86" />
                                        <path
                                            d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                                            fill="#626F86" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                                            fill="#626F86" />
                                    </svg>
                                    Download Invoice
                                </a>
                                <li @click="viewOrderFulfillmentId = selectedItem.id; closeDropdown()" as="li"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6C4 5.73478 3.89465 5.48043 3.70711 5.29289C3.51957 5.10536 3.26522 5 3 5C2.73479 5 2.48043 5.10536 2.2929 5.29289C2.10536 5.48043 2 5.73478 2 6V15.991C1.99868 16.787 2.31335 17.551 2.8749 18.1152C3.43646 18.6794 4.19899 18.9976 4.995 19H21C21.2652 19 21.5196 18.8946 21.7071 18.7071C21.8946 18.5196 22 18.2652 22 18C22 17.7348 21.8946 17.4804 21.7071 17.2929C21.5196 17.1054 21.2652 17 21 17ZM18 9V12C18 12.2652 18.1054 12.5196 18.2929 12.7071C18.4804 12.8946 18.7348 13 19 13C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7H15C14.7348 7 14.4804 7.10536 14.2929 7.29289C14.1054 7.48043 14 7.73478 14 8C14 8.26522 14.1054 8.51957 14.2929 8.70711C14.4804 8.89464 14.7348 9 15 9H18Z"
                                            fill="#626F86" />
                                        <path
                                            d="M13.293 13.707C13.4805 13.8945 13.7348 13.9998 14 13.9998C14.2652 13.9998 14.5195 13.8945 14.707 13.707L18.707 9.707C18.8025 9.61475 18.8787 9.50441 18.9311 9.3824C18.9835 9.2604 19.0111 9.12918 19.0123 8.9964C19.0134 8.86362 18.9881 8.73194 18.9378 8.60905C18.8875 8.48615 18.8133 8.3745 18.7194 8.28061C18.6255 8.18671 18.5139 8.11246 18.391 8.06218C18.2681 8.0119 18.1364 7.9866 18.0036 7.98775C17.8708 7.9889 17.7396 8.01649 17.6176 8.0689C17.4956 8.12131 17.3853 8.19749 17.293 8.293L14 11.586L11.707 9.293C11.5195 9.10553 11.2652 9.00021 11 9.00021C10.7348 9.00021 10.4805 9.10553 10.293 9.293L6.293 13.293C6.11085 13.4816 6.01005 13.7342 6.01233 13.9964C6.01461 14.2586 6.11978 14.5094 6.30519 14.6948C6.49059 14.8802 6.74141 14.9854 7.0036 14.9877C7.2658 14.99 7.5184 14.8892 7.707 14.707L11 11.414L13.293 13.707Z"
                                            fill="#626F86" />
                                    </svg>

                                    Fulfillment Details
                                </li>
                                <li @click="viewOrderTimeTrackerId = selectedItem.id; closeDropdown()" as="li"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM12.889 11.632V8.448C12.889 7.959 12.489 7.559 12 7.559C11.511 7.559 11.111 7.959 11.111 8.449V12.004C11.111 12.252 11.214 12.475 11.379 12.637L13.574 14.831C13.741 14.9972 13.9669 15.0904 14.2025 15.0904C14.4381 15.0904 14.664 14.9972 14.831 14.831C14.9969 14.6641 15.0899 14.4383 15.0899 14.203C15.0899 13.9677 14.9969 13.7419 14.831 13.575L12.889 11.632Z"
                                            fill="#626F86" />
                                    </svg>

                                    Time Tracker
                                </li>
                                <!-- <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideBell class="w-4 h-4" />
                                    Notify
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideLogIn class="w-4 h-4" />
                                    Login to Account
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideAlertTriangle class="w-4 h-4" />
                                    Add Warning Tags
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideDownloadCloud class="w-4 h-4" />
                                    Download Transactions
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideDownloadCloud class="w-4 h-4" />
                                    Download Partner Transactions
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideUnlock class="w-4 h-4" />
                                    Reset Password
                                </li>
                                <li v-if="selectedItem.activated_at"
                                    @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideXCircle class="w-4 h-4 text-red-600" />
                                    Deactivate Customer
                                </li>
                                <li v-else @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideCheckCircle class="w-4 h-4 text-green-600" />
                                    Activate Customer
                                </li>
                                <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <LucideTrash class="w-4 h-4" />
                                    Delete
                                </li> -->
                            </template>
                        </TableActionDropdown>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </DatatableTable>
        </div>

        <Show :orderId="viewOrderId" />
        <OrderFulfillment :orderId="viewOrderFulfillmentId" />
        <TimeTracker :orderId="viewOrderTimeTrackerId" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import DatatableTable from "@/views/Components/Datatable/Datatable.vue";
import { FilterField, FilterFields, TableColumn } from '@/types';
import dayjs from 'dayjs';
import { toLocale } from '@/views/helpers/useLocale';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useDebounceFn } from '@vueuse/core';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import Show from './Show.vue';
import OrderFulfillment from './OrderFulfillment.vue';
import TimeTracker from './TimeTracker.vue';
import { useAuthStore } from '@/stores/auth';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';

interface PaymentMethod {
    id: number;
    display_name: string;
}

interface State {
    id: number;
    name: string;
}

interface OptionItem {
    id: number;
    name: string;
}

const SEARCH_DEBOUNCE_DELAY = 300;
const MIN_SEARCH_LENGTH = {
    order: 11,
    customer: 3,
    store: 3
};


onMounted(async () => {
    await Promise.all([
        getPaymentMethods(),
        getStates()
    ]);
});


const childKey = ref(111);
const search = ref('');
const searchBy = ref<'order' | 'customer' | 'store'>('order');
const hasSearched = ref(false);
const loading = ref(false);
const states = ref<State[]>([]);
const paymentMethods = ref<PaymentMethod[]>([]);
const toast = useToast();
const viewOrderId = ref(0);
const viewOrderFulfillmentId = ref(0);
const viewOrderTimeTrackerId = ref(0);
const authStore = useAuthStore();

const columns = ref<TableColumn[]>([
    {
        label: 'Order ID',
        field: 'ref_no',
        sortable: true,
    },
    {
        label: 'Customer Name',
        field: 'user.name',
        sortable: true,
    },
    {
        label: 'Name of Store',
        field: 'store.name',
        sortable: true,
    },
    {
        label: 'State',
        field: 'store.state.name',
        sortable: true,
    },
    {
        label: 'Payment',
        field: 'payment_method.display_name',
        sortable: true,
    },
    {
        label: 'Order Date',
        field: 'formatted_date',
        sortable: true,
        //formatFn: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Delivery Date',
        field: 'delivery_type.pivot.delivery_date',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Amount',
        field: 'total_amount',
        sortable: false,
        format: (value) => "₦" + toLocale(value)
    },
    // {
    //     label: 'Assigned To',
    //     field: 'assigned_to',
    //     sortable: true,
    // },
    {
        label: 'Action',
        field: 'action',
        sortable: false,
    },
])

watch(searchBy, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        childKey.value++;
    }
});

const url = computed(() => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
        search_by: searchBy.value,
        search: search.value.trim()
    });
    return `${baseUrl}delivered_orders?${params.toString()}`;
});

const minSearchLength = computed(() => MIN_SEARCH_LENGTH[searchBy.value]);

const isSearchValid = computed(() => {
    const trimmedSearch = search.value.trim();
    return trimmedSearch.length >= minSearchLength.value;
});

const filterFields = ref<FilterFields<FilterField>>({
    'state': {
        label: "State",
        field: "store.state.name",
        type: "select",
        options: []
    },
    'payment_method': {
        label: 'Payment Method',
        field: 'payment_method_id',
        type: 'select',
        options: []
    }
});

const getPaymentMethods = async (): Promise<void> => {
    try {
        loading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}payment_methods`);

        paymentMethods.value = response.data;
        filterFields.value.payment_method.options = response.data.map((method: PaymentMethod) => ({
            name: method.display_name,
            id: method.id
        }));
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error('Error fetching payment methods.');
    } finally {
        loading.value = false;
    }
};

const getStates = async (): Promise<void> => {
    try {
        loading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}states`);

        states.value = response.data;
        filterFields.value.state.options = response.data.map((state: State) => ({
            name: state.name,
            id: state.id
        }));
    } catch (error) {
        console.error('Error fetching states:', error);
        toast.error('Error fetching states.');
    } finally {
        loading.value = false;
    }
};

// const debounceTimer = ref(null);

// const updateSearch = (searchTerm) => {
//     clearTimeout(debounceTimer.value);

//     debounceTimer.value = setTimeout(() => {
//         console.log('updateSearch', searchTerm);
//         search.value = searchTerm;
//         childKey.value++;
//     }, 300);
// };

// const updateSearch = (searchTerm) => {
//     console.log('updateSearch', searchTerm);
//     search.value = searchTerm;
//     childKey.value++;
// }

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
    console.log('updateSearch', searchTerm);
    search.value = searchTerm;
    childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

// Event Handlers
const handleInitialSearch = (): void => {
    if (isSearchValid.value) {
        hasSearched.value = true;
    }
};

const getSearchPlaceholder = (): string => {
    const placeholders = {
        order: `Enter order reference (min ${MIN_SEARCH_LENGTH.order} characters)`,
        customer: `Enter customer name (min ${MIN_SEARCH_LENGTH.customer} characters)`,
        store: `Enter store name (min ${MIN_SEARCH_LENGTH.store} characters)`
    };
    return placeholders[searchBy.value];
};

const getInvoiceUrl = (order, type) => {
    return import.meta.env.VITE_API_URL + "admin/orders/" + order.id + "/" + type + '/' + authStore.user.id;
}
const showDownloadInvoice = () => {
    return authStore.user.roles.some((role) => role.name == 'accounts' || role.name == 'Accounts') || authStore.user.is_super_admin;
}

</script>

<style>
.intro_search_wrapper {
    border-radius: 12px;
    color: rgba(98, 111, 134, 1);
    background: white;
    padding: 24px;
    width: 33em;
    box-shadow: 0px 2px 4px 0px #E5E2E9;
}

.intro_search_wrapper h3 {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.intro_search_wrapper p {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(68, 84, 111, 1);
    padding: 0 6.5em;
}

.intro_search_wrapper .search_content {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.data_table_select,
.intro_search_wrapper .search_content select,
.intro_search_wrapper .search_content input {
    border: 2px solid rgba(9, 30, 66, 0.14);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.intro_search_wrapper .search_content button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    background: rgba(12, 102, 228, 1);
    padding: 0.825em 0.4em;
    border-radius: 6px;
}

.sort_by_label {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}
</style>