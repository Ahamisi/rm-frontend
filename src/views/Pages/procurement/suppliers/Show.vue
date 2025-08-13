<template>
    <div v-if="disableForm" class="fixed flex items-center justify-center h-screen loading_overlay">
        <LoadingState></LoadingState>
    </div>
    <div class="px-6 erp_dashboard_wrapper">

        <!-- Header -->
        <PageTitle :title="getTitle" />

        <div class="flex flex-wrap items-center gap-2 mb-2 md:justify-between create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Back</span>
            </a>

            <div class="flex items-center gap-2">
                <h3>View Purchase Order</h3>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.91933 0.833313C2.45725 0.833313 2.0835 1.20498 2.0835 1.66248V8.33748C2.08493 8.5581 2.17366 8.76918 2.33029 8.92456C2.48692 9.07994 2.6987 9.16698 2.91933 9.16665H7.081C7.54308 9.16665 7.91683 8.7954 7.91683 8.33748V1.66248C7.91683 1.20748 7.54266 0.833313 7.081 0.833313H2.91933ZM3.75016 2.49998H6.25016C6.48028 2.49998 6.66683 2.68653 6.66683 2.91665C6.66683 3.14676 6.48028 3.33331 6.25016 3.33331H3.75016C3.52004 3.33331 3.3335 3.14676 3.3335 2.91665C3.3335 2.68653 3.52004 2.49998 3.75016 2.49998ZM6.25016 3.74998H3.75016C3.52004 3.74998 3.3335 3.93653 3.3335 4.16665C3.3335 4.39676 3.52004 4.58331 3.75016 4.58331H6.25016C6.48028 4.58331 6.66683 4.39676 6.66683 4.16665C6.66683 3.93653 6.48028 3.74998 6.25016 3.74998ZM3.75016 4.99998H4.5835C4.81362 4.99998 5.00016 5.18653 5.00016 5.41665C5.00016 5.64676 4.81362 5.83331 4.5835 5.83331H3.75016C3.52004 5.83331 3.3335 5.64676 3.3335 5.41665C3.3335 5.18653 3.52004 4.99998 3.75016 4.99998Z"
                        fill="#44546F" />
                </svg>
                <span class="font-light upper">{{ purchaseOrder?.order_no }} - {{ supplier_name }}</span>
            </div>
            <div></div>
        </div>

        <!-- supplier information -->
        <div class="p-4 mb-4 rounded-xl supplier_information">
            <h3 class="mb-4">Supplier's Information</h3>
            <div class="grid items-baseline gap-2 md:grid-cols-5 sm:grid-cols-1">
                <div class="w-full supplier_content">
                    <label>Supplier</label>
                    <v-select v-model="purchaseOrder.supplier_id" :options="suppliers" label="name"
                        placeholder="Search Purchase Order..." :loading="purchase_orders_loading"
                        :reduce="supplier => supplier.id" :disabled="true" />
                </div>
                <div class="relative w-full supplier_content">
                    <label>Purchase date</label>
                    <input type="date" class="w-full p-2 pr-7 form-input focus:outline-none"
                        v-model="purchaseOrder.purchase_date" readonly />
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="absolute right-1 top-8">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.1952 5H19.2052C20.3072 5 21.2002 5.895 21.2002 6.994V19.006C21.2002 19.2679 21.1486 19.5273 21.0483 19.7693C20.948 20.0113 20.8011 20.2312 20.6158 20.4163C20.4305 20.6015 20.2106 20.7484 19.9686 20.8485C19.7265 20.9487 19.4671 21.0001 19.2052 21H5.1952C4.66626 21 4.15898 20.7899 3.78487 20.416C3.41076 20.0421 3.20046 19.5349 3.2002 19.006V6.994C3.2002 5.893 4.0922 5 5.1952 5ZM5.2002 9V18C5.2002 18.2652 5.30555 18.5196 5.49309 18.7071C5.68063 18.8946 5.93498 19 6.2002 19H18.2002C18.4654 19 18.7198 18.8946 18.9073 18.7071C19.0948 18.5196 19.2002 18.2652 19.2002 18V9H5.2002ZM6.2002 4C6.2002 3.73478 6.30555 3.48043 6.49309 3.29289C6.68063 3.10536 6.93498 3 7.2002 3C7.46541 3 7.71977 3.10536 7.9073 3.29289C8.09484 3.48043 8.2002 3.73478 8.2002 4V5H6.2002V4ZM16.2002 4C16.2002 3.73478 16.3056 3.48043 16.4931 3.29289C16.6806 3.10536 16.935 3 17.2002 3C17.4654 3 17.7198 3.10536 17.9073 3.29289C18.0948 3.48043 18.2002 3.73478 18.2002 4V5H16.2002V4ZM7.2002 13V10.999H9.2002V13H7.2002ZM15.2002 13V10.999H17.2002V13H15.2002ZM11.2002 13V10.999H13.2012V13H11.2002ZM7.2002 17V15H9.2002V17H7.2002ZM11.2002 17V15H13.2012V17H11.2002ZM15.2002 17V15H17.2002V17H15.2002Z"
                            fill="#44546F" />
                    </svg>

                </div>
                <div class="relative w-full supplier_content">
                    <label>Delivery date</label>
                    <input type="date" class="w-full p-2 pr-7 form-input focus:outline-none"
                        v-model="purchaseOrder.delivery_date" readonly />
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="absolute right-1 top-8">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.1952 5H19.2052C20.3072 5 21.2002 5.895 21.2002 6.994V19.006C21.2002 19.2679 21.1486 19.5273 21.0483 19.7693C20.948 20.0113 20.8011 20.2312 20.6158 20.4163C20.4305 20.6015 20.2106 20.7484 19.9686 20.8485C19.7265 20.9487 19.4671 21.0001 19.2052 21H5.1952C4.66626 21 4.15898 20.7899 3.78487 20.416C3.41076 20.0421 3.20046 19.5349 3.2002 19.006V6.994C3.2002 5.893 4.0922 5 5.1952 5ZM5.2002 9V18C5.2002 18.2652 5.30555 18.5196 5.49309 18.7071C5.68063 18.8946 5.93498 19 6.2002 19H18.2002C18.4654 19 18.7198 18.8946 18.9073 18.7071C19.0948 18.5196 19.2002 18.2652 19.2002 18V9H5.2002ZM6.2002 4C6.2002 3.73478 6.30555 3.48043 6.49309 3.29289C6.68063 3.10536 6.93498 3 7.2002 3C7.46541 3 7.71977 3.10536 7.9073 3.29289C8.09484 3.48043 8.2002 3.73478 8.2002 4V5H6.2002V4ZM16.2002 4C16.2002 3.73478 16.3056 3.48043 16.4931 3.29289C16.6806 3.10536 16.935 3 17.2002 3C17.4654 3 17.7198 3.10536 17.9073 3.29289C18.0948 3.48043 18.2002 3.73478 18.2002 4V5H16.2002V4ZM7.2002 13V10.999H9.2002V13H7.2002ZM15.2002 13V10.999H17.2002V13H15.2002ZM11.2002 13V10.999H13.2012V13H11.2002ZM7.2002 17V15H9.2002V17H7.2002ZM11.2002 17V15H13.2012V17H11.2002ZM15.2002 17V15H17.2002V17H15.2002Z"
                            fill="#44546F" />
                    </svg>
                </div>
                <div class="relative w-full supplier_content">
                    <label>Discount (%)</label>
                    <input type="number" class="w-full p-2 pr-7 form-input focus:outline-none"
                        v-model="purchaseOrder.discount" readonly />
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="absolute right-1 top-8">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.8327 5.42802L7.62568 6.02802C7.1972 6.08953 6.80024 6.2884 6.49442 6.59476C6.1886 6.90112 5.99043 7.29843 5.92968 7.72702L5.32968 11.934C5.30741 12.0876 5.32121 12.2443 5.36998 12.3917C5.41876 12.539 5.50116 12.673 5.61068 12.783L12.5057 19.677C12.5985 19.77 12.7087 19.8437 12.83 19.894C12.9513 19.9443 13.0813 19.9702 13.2127 19.9702C13.344 19.9702 13.4741 19.9443 13.5954 19.894C13.7167 19.8437 13.8269 19.77 13.9197 19.677L19.5767 14.02C19.7641 13.8325 19.8695 13.5782 19.8695 13.313C19.8695 13.0479 19.7641 12.7935 19.5767 12.606L12.6817 5.71002C12.572 5.60002 12.4381 5.51715 12.2907 5.46802C12.1433 5.41889 11.9865 5.40485 11.8327 5.42702V5.42802ZM11.1857 11.285C11.0314 11.4418 10.8477 11.5665 10.645 11.6519C10.4424 11.7374 10.2248 11.7818 10.0048 11.7827C9.7849 11.7836 9.56697 11.741 9.3636 11.6572C9.16023 11.5735 8.97546 11.4503 8.81994 11.2948C8.66443 11.1392 8.54124 10.9545 8.45749 10.7511C8.37374 10.5477 8.33109 10.3298 8.332 10.1099C8.3329 9.88993 8.37735 9.67235 8.46276 9.46968C8.54818 9.26701 8.67289 9.08325 8.82968 8.92902C9.14224 8.61646 9.56615 8.44087 10.0082 8.44087C10.4502 8.44087 10.8741 8.61646 11.1867 8.92902C11.4992 9.24158 11.6748 9.6655 11.6748 10.1075C11.6748 10.5495 11.4992 10.9735 11.1867 11.286"
                            fill="#44546F" />
                    </svg>

                </div>
                <div class="w-full supplier_content">
                    <label>Type</label>
                    <v-select :options="types" label="name" v-model="purchaseOrder.type" :reduce="type => type.id"
                        :disabled="true"></v-select>
                </div>
            </div>
        </div>

        <div class="p-4 rounded-xl items_wrapper">
            <div class="flex justify-between gap-4 mb-4">
                <h3 class="">All Items</h3>
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
                                    Purchased Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Returned QTY
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
                                    Total Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="item, index in purchaseOrder.items" :key="item.id" class="hover:bg-gray-50">
                                <td class="tracking-wider text-left w-[10%] cursor-help">
                                    <Tooltip :text="item.product_name">
                                        <span class="tracking-wider text-left cursor-help">
                                            {{ truncateText(item.product_name, 25) }}
                                        </span>
                                    </Tooltip>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.quantity) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.returned) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.purchase_price) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.unit_cost) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.discount + '%' }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    ₦{{ toLocale(((item.quantity - item.returned) * item.unit_cost) - ((item.discount /
                                        100) *
                                        ((item.quantity - item.returned) * item.unit_cost))) }}
                                </td>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useToast } from "vue-toastification";
import Tooltip from "@/views/Components/Tooltip.vue";
import { toLocale } from "@/views/helpers/useLocale.js";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import Tabs from "@/views/Components/Tabs.vue";


const supplier_name = computed(() => suppliers.value.find((supplier) => purchaseOrder.value.supplier_id == supplier.id)?.name);
const getTitle = computed(() => `All Supplier / ${supplier_name.value} /`)
const route = useRoute();
const toast = useToast();
const activeTab = ref('Awaiting PO Approval')
// const loading = ref(true);
const approvePage = ref(route.query.approve ? true : false);

const id = route.params.id;
const purchaseOrder = ref({
    id: route.params.id,
    supplier_id: '',
    purchase_date: '',
    delivery_date: '',
    discount: 0,
    items: [],
    type: 'trade',
    order_no: ''
});
const suppliers = ref([]);
const purchase_orders_loading = ref(false);
const types = ref([
    { id: 'trade', name: 'Trade' },
    { id: 'sundry', 'name': 'Sundry' }
]);

const disableForm = ref(false);


onMounted(() => {
    getPurchaseOrder();
    getSuppliers();
});

// watch(
//   () => formData.value.selectedProduct,
//   (product) => {
//     if (product) {
//       formData.value.product_id = product.id;
//       formData.value.product_name = product.name;
//       formData.value.unit_cost = product.unit_cost;
//       formData.value.purchase_price = product.price_per_pack;
//       products.value = [item.product, ...products.value.filter(p => p.id !== item.id)];
//     } else {
//       formData.value.product_id = null;
//       formData.value.product_name = '';
//       formData.value.unit_cost = null;
//       formData.value.purchase_price = null;
//     }
//   }
// );

const getPurchaseOrder = () => {
    purchase_orders_loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `purchase_orders/${id}`)
        .then(response => {
            purchaseOrder.value = response.data.purchaseOrder;
            purchaseOrder.value.delivery_date = purchaseOrder.value.delivery_date_form;
            purchaseOrder.value.purchase_date = purchaseOrder.value.purchase_date_form;
            purchase_orders_loading.value = false;
        })
        .catch(error => {
            error(error);
            purchase_orders_loading.value = false;
        });
};

const getSuppliers = () => {
    axios.get(import.meta.env.VITE_API_URL + 'suppliers?fields=id,name').then(res => {
        var data = res.data;
        if (Array.isArray(data[0])) {
            for (let index = 0; index < data.length; index++) {
                suppliers.value.concat(data[index]);
            }
        } else suppliers.value = res.data
    }).catch(err => {
        error(err);
    });
}


const truncateText = (text, maxLength = 20) => {
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
    border-radius: 8px;
    border: 2px solid rgba(9, 30, 66, 0.14);
    background: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
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

.loading_overlay {
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999999999;
}
</style>