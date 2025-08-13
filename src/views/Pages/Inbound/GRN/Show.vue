<template>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-screen" v-if="loading">
        <LoadingState />
    </div>
    <div v-else class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Purchase Order / Approved PO / Create GRN" />

        <div class="flex flex-wrap items-center gap-2 mb-8 md:justify-between create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Cancel</span>
            </a>

            <div class="flex items-center gap-2">
                <h3>View GRN</h3>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.91933 0.833313C2.45725 0.833313 2.0835 1.20498 2.0835 1.66248V8.33748C2.08493 8.5581 2.17366 8.76918 2.33029 8.92456C2.48692 9.07994 2.6987 9.16698 2.91933 9.16665H7.081C7.54308 9.16665 7.91683 8.7954 7.91683 8.33748V1.66248C7.91683 1.20748 7.54266 0.833313 7.081 0.833313H2.91933ZM3.75016 2.49998H6.25016C6.48028 2.49998 6.66683 2.68653 6.66683 2.91665C6.66683 3.14676 6.48028 3.33331 6.25016 3.33331H3.75016C3.52004 3.33331 3.3335 3.14676 3.3335 2.91665C3.3335 2.68653 3.52004 2.49998 3.75016 2.49998ZM6.25016 3.74998H3.75016C3.52004 3.74998 3.3335 3.93653 3.3335 4.16665C3.3335 4.39676 3.52004 4.58331 3.75016 4.58331H6.25016C6.48028 4.58331 6.66683 4.39676 6.66683 4.16665C6.66683 3.93653 6.48028 3.74998 6.25016 3.74998ZM3.75016 4.99998H4.5835C4.81362 4.99998 5.00016 5.18653 5.00016 5.41665C5.00016 5.64676 4.81362 5.83331 4.5835 5.83331H3.75016C3.52004 5.83331 3.3335 5.64676 3.3335 5.41665C3.3335 5.18653 3.52004 4.99998 3.75016 4.99998Z"
                        fill="#44546F" />
                </svg>
                <span class="font-light upper">{{ invoice?.purchase_order?.order_no }}</span>
            </div>

            <div></div>
        </div>

        <!-- supplier information -->
        <div class="p-4 mb-4 rounded-xl supplier_information">
            <h3 class="mb-4">Supplier's Information</h3>
            <div class="flex flex-wrap gap-4 md:flex-nowrap">
                <div class="w-full supplier_content">
                    <label>Purchase Order</label>
                    <input type="text" class="w-full form-input" :value="invoice.purchase_order?.order_no" readonly />
                </div>
                <div class="w-full supplier_content">
                    <label>Due Date</label>
                    <input type="date" class="w-full form-input" v-model="invoice.due_date" />
                </div>
            </div>
        </div>

        <div class="p-4 rounded-xl items_wrapper">
            <div class="flex justify-between gap-4 mb-4">
                <h3 class="">All Items</h3>
                <div></div>
            </div>

            <div class="overflow-hidden bg-white shadow-sm rounded-xl table_wrapper">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Item name
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Batch No.
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Warehouse Shelf
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Purchased Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Received Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Variance
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Return Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Expiry Date
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Inbound Type
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Price
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Unit Cost
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Discount (%)
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Total
                                </th>
                                <!-- <th class="px-2 py-3 tracking-wider">Action</th> -->
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="item, index in invoice.items" :key="item.id" class="hover:bg-gray-50">
                                <td class="tracking-wider text-left w-[10%] cursor-help">
                                    <Tooltip :text="item.product_name" class="">
                                        <button class="tracking-wider text-left cursor-help">
                                            {{ truncateText(item.product_name, 25) }}
                                        </button>
                                    </Tooltip>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.batch_no }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.warehouse_shelf?.join(', ') }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.purchased_quantity) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.quantity) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.purchased_quantity - item.quantity }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.returned) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.expiry_date }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.inbound_type }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.purchase_price) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.unit_cost) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.discount }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(((item.quantity - item.returned) * item.unit_cost) - ((item.discount /
                                        100) * ((item.quantity - item.returned) * item.unit_cost))) }}
                                </td>
                                <!-- <td class="px-2 py-3 tracking-wider text-left">
                                    <div class="flex space-x-2">
                                        <button @click="editItem(item, index)"
                                            class="text-blue-600 transition-colors hover:text-blue-800" title="Edit">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z"
                                                    fill="#44546F" />
                                            </svg>
                                        </button>

                                        <button @click="deleteItem(index)"
                                            class="text-red-600 transition-colors hover:text-red-800" title="Delete">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                                                    fill="#44546F" />
                                            </svg>
                                        </button>

                                        <button @click="duplicateItem(index)"
                                            class="text-green-600 transition-colors hover:text-green-800"
                                            title="Duplicate">
                                            <i class="fas fa-copy"></i>
                                        </button>

                                    </div>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Tooltip from "@/views/Components/Tooltip.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { toLocale } from "@/views/helpers/useLocale.js";



// loading purchase orders
onMounted(() => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + "invoices/" + route.params.id).then(res => {
        invoice.value = res.data.invoice;
        invoice.value.due_date = res.data.invoice.due_date_form;
        // purchaseOrder.value = res.data.invoice.purchase_order;
        // invoice.value.items =
    }).catch(err => {
        error(err);
    }).finally(() => loading.value = false)
    fetchInboundType();
});

const authStore = useAuthStore();
const route = useRoute();
const loading = ref(false);
const toast = useToast();

// Refs
const purchaseOrder = ref<any>({ order_no: '', items: [] });
const inbound_types = ref([]);

const invoice = ref({
    purchase_order_id: '',
    due_date: '',
    purchase_order: null,
    items: [],
});

const fetchInboundType = () => {
    axios.get(import.meta.env.VITE_API_URL + 'invoices/inbound_types').then(res => {
        inbound_types.value = res.data;
    }).catch(err => {
        error(err);
    });
}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

</script>

<style>
.create_grn_header_wrapper {
    font-size: 14px;
    font-style: normal;
    font-weight: 450;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.supplier_information,
.items_wrapper,
.items_wrapper table thead {
    background: rgb(239 239 239 / 82%);
}

.supplier_information h3,
.items_wrapper h3 {
    color: rgba(23, 43, 77, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.form-input {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
    border: 1px solid rgba(9, 30, 66, 0.14);
    border-radius: 8px;
    backdrop-filter: #fff;
    padding: 8px;
}

.vs--searchable .vs__dropdown-toggle {
    padding: 4px;
}

.erp_dashboard_wrapper .supplier_information label {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.items_wrapper .add_item_btn {
    border: 1px solid rgba(9, 30, 66, 0.14);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.items_wrapper .table_wrapper {
    border: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr,
.items_wrapper table tbody tr:not(:last-child) {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr th {
    font-size: 12px;
    font-style: normal;
    font-weight: 450;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.items_wrapper table tbody tr td {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
}
</style>
