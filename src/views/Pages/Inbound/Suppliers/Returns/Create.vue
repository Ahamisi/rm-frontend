<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="More Action / Supplier's Return / Create Supplier's Return" />

        <div class="flex flex-wrap items-center gap-2 mb-8 md:justify-between create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Cancel</span>
            </a>

            <h3>Create Supplier's Return</h3>

            <button @click="showConfirmCreationModal = true"
                class="flex items-center px-3 py-2 text-white gap-x-1 create_btn">
                <span class="text-xs">Create</span>
            </button>
        </div>

        <!-- supplier information -->
        <div class="p-4 mb-4 rounded-xl supplier_information">
            <h3 class="mb-4">Supplier's Information</h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="w-full supplier_content">
                    <label>Supplier</label>
                    <v-select :options="suppliers" label="name" @update:modelValue="changeSupplier"
                        v-model="supplier_id" :reduce="supplier => supplier.id" :loading="loading"></v-select>
                </div>
                <div class="w-full supplier_content">
                    <label>GRN</label>
                    <v-select :options="invoices" @update:modelValue="changeInvoice" label="doc_no"
                        v-model="supplierReturn.invoice_id" :reduce="invoice => invoice.id"></v-select>
                </div>
                <div class="w-full supplier_content">
                    <label>Return Date</label>
                    <input type="date" v-model="supplierReturn.return_date"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                </div>
            </div>
        </div>

        <div class="p-4 rounded-xl items_wrapper">
            <div class="overflow-hidden bg-white shadow-sm rounded-xl table_wrapper">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    <span class="py-3 text-sm text-gray-700">
                                        <!-- <input type="checkbox" class="rounded text-secondary" @change="toggleCheck"> -->
                                    </span>
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Item
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Batch No.
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    QTY SUPPLIED
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    QTY TO RETURN
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    PRICE
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    DISCOUNT (%)
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    TOTAL
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" v-if="invoice.items != undefined">
                            <tr v-for="item, index in invoice.items" :key="'item' + index" class="hover:bg-gray-50">
                                <td class="px-2 py-3 tracking-wider text-left w-[10%] cursor-help">
                                    <input type="checkbox"
                                        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                        :name="`check${index}`" id="" :value="item.id"
                                        @change="checkItem($event, index)">
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    <Tooltip :text="item.product_name">
                                        {{ truncateText(item.product_name, 20) }}
                                    </Tooltip>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.product_name }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.batch_no }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    <span v-if="getItemIndex(item.id) == -1">
                                        {{ item.quantity }}
                                    </span>
                                    <input type="number" v-else
                                        class="w-full px-3 py-1 text-xs border border-gray-300 rounded-md focus:outline-none"
                                        v-model="supplierReturn.items[getItemIndex(item.id)].quantity"
                                        :max="item.quantity">
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.purchase_price }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.discount + "%" }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ getItemIndex(item.id) == -1 ? (item.quantity * item.purchase_price) -
                                        ((item.discount / 100) * (item.quantity * item.purchase_price)) :
                                        (supplierReturn.items[getItemIndex(item.id)].quantity * item.purchase_price) -
                                        ((item.discount / 100) * (supplierReturn.items[getItemIndex(item.id)].quantity *
                                            item.purchase_price)) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <!-- confirm create modal -->
        <UniversalCenteredModal :show="showConfirmCreationModal" @close="showConfirmCreationModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <h3 class="font-medium">Create Supplier's Return</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to Create this Supplier's Return <strong>“{{ invoice?.doc_no }}”</strong>. This
                    action will add it to the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showConfirmCreationModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="createReturn" type="button" class="px-4 py-2 text-sm create_btn"
                        style="color: white">
                        Create
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import Tooltip from "@/views/Components/Tooltip.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";


onMounted(() => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + 'suppliers?fields=id,name').then(res => {
        var data = res.data;
        if (Array.isArray(data[0])) {
            for (let index = 0; index < data.length; index++) {
                suppliers.value.concat(data[index]);
            }
        } else suppliers.value = res.data;
    }).catch(err => {
        toast.error("Error loading suppliers!");
    }).finally(() => loading.value = false);
    if (route.params.id != undefined) {
        axios.get(import.meta.env.VITE_API_URL + 'invoices?type=all&queries[status]=0').then(res => {
            var data = res.data;
            if (Array.isArray(data[0])) {
                for (let index = 0; index < data.length; index++) {
                    invoices.value.concat(data[index]);
                }
            } else invoices.value = res.data;

            if (route.params.id != undefined) {
                supplierReturn.value.invoice_id = parseInt(route.params.id);
                for (let index = 0; index < invoices.value.length; index++) {
                    if (invoices.value[index].id == route.params.id) {
                        supplier_id.value = invoices.value[index].purchase_order.supplier_id;
                        changeInvoice(supplierReturn.value.invoice_id);
                        break;
                    }
                }
            }
            loading.value = false;
        }).catch(err => {
            toast.error("Error loading invoices!");
        });
    }
})


const authStore = useAuthStore();

const invoices = ref([]);
const supplierReturn = ref({
    invoice_id: 0,
    return_date: '',
    items: []
})
const supplier_id = ref(0)
const invoice = ref({
    items: [],
    purchase_order: {},
    doc_no: ''
})
const suppliers = ref([])

// Refs
const showConfirmCreationModal = ref(false);
const route = useRoute();
const router = useRouter();
const loading = ref(false);


const toast = useToast();


const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error !== undefined ? "<p>" + err.response.data.error + "</p>"
            : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
    toast.error("Error creating invoice!");
}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const createReturn = () => {
    loading.value = true;
    showConfirmCreationModal.value = false
    axios.post(import.meta.env.VITE_API_URL + 'supplier_returns?current_branch=' + authStore.selectedBranch.id, supplierReturn.value)
        .then(res => {
            supplierReturn.value = {
                invoice_id: 0,
                return_date: '',
                items: []
            };

            toast.success("Return created successfully");
            router.push({ name: 'inbound.suppliers.returns.index' });
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}
const getDocNo = (id) => {
    return "RHSP" + ("0".repeat(5 - id.toString().length) + id);
}
const changeInvoice = (value) => {
    for (let index = 0; index < invoices.value.length; index++) {
        if (invoices.value[index].id == value) {
            loading.value = true;
            axios.get(import.meta.env.VITE_API_URL + "invoices/" + value + '?current_branch=' + authStore.selectedBranch.id).then(res => {
                invoice.value = res.data.invoice;
            }).catch(err => {
                toast.error("Error loading invoice!");
            })
                .finally(() => loading.value = false);

            //this.invoice = this.invoices[index];
            break;
        }
    }
}
const changeSupplier = (supplier_id) => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + 'invoices?type=all&queries[status]=0&queries[supplier_id]=' + supplier_id).then(res => {
        var data = res.data;
        if (Array.isArray(data[0])) {
            for (let index = 0; index < data.length; index++) {
                invoices.value.concat(data[index]);
            }
        } else invoices.value = res.data;
    }).catch(err => {
        toast.error("Error loading invoices!");
    })
        .finally(() => loading.value = false);
}

const getItemIndex = (id) => {
    let index = -1;
    supplierReturn.value.items.forEach((item, itemIndex) => {
        if (item.purchase_order_item_id == id) index = itemIndex;
    })
    return index;
}
const checkItem = (event, index) => {
    let item = invoice.value.items.filter(item => item.id == event.target.value)[0];
    if (event.target.checked) {
        supplierReturn.value.items.push({ purchase_order_item_id: item.id, quantity: item.quantity, invoice_item_id: item.id });
    } else {
        if (hasItem(item.id) !== false) {
            supplierReturn.value.items.splice(hasItem(item.id), 1);
        }
    }
}
const hasItem = (item_id) => {
    let has: boolean | number = false;
    supplierReturn.value.items.forEach((item, index) => {
        if (item.purchase_order_item_id == item_id) has = index;
    })
    return has;
}
const toggleCheck = (event) => {
    document.querySelectorAll('input[type="checkbox"].check').forEach(element => {
        element.checked = event.target.checked;
        let item = invoice.value.items.filter(item => item.id == element.value)[0];
        if (item != undefined) {
            if (element.checked) {
                supplierReturn.value.items.push({ purchase_order_item_id: item.id, quantity: item.quantity });
            } else {
                if (hasItem(item.id) !== false) {
                    supplierReturn.value.items.splice(hasItem(item.id), 1);
                }
            }
        }
    });
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

.discard_merge_alert_footer button,
.footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn,
.footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}


.discard_merge_alert_footer button.approve_btn,
.footer button.approve_btn,
.discard_merge_alert_footer button.create_btn,
.footer .approve_btn {
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn,
.footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
}

.discard_merge_alert_footer .discard_btn,
.footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.body,
.discard_merge_alert_body_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: rgba(68, 84, 111, 1);
    line-height: 20px;
}
</style>
