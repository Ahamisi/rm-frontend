<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle :title="getTitle" />

        <div class="flex flex-wrap items-center gap-2 mb-8 md:justify-between create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Back</span>
            </a>

            <div class="flex">
                <h3>View Supplier's Return</h3>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="3.75" fill="#F7F8F9" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.91786 5.83325C7.45578 5.83325 7.08203 6.20492 7.08203 6.66242V13.3374C7.08346 13.558 7.1722 13.7691 7.32883 13.9245C7.48546 14.0799 7.69724 14.1669 7.91786 14.1666H12.0795C12.5416 14.1666 12.9154 13.7953 12.9154 13.3374V6.66242C12.9154 6.20742 12.5412 5.83325 12.0795 5.83325H7.91786ZM8.7487 7.49992H11.2487C11.4788 7.49992 11.6654 7.68647 11.6654 7.91659C11.6654 8.1467 11.4788 8.33325 11.2487 8.33325H8.7487C8.51858 8.33325 8.33203 8.1467 8.33203 7.91659C8.33203 7.68647 8.51858 7.49992 8.7487 7.49992ZM11.2487 8.74992H8.7487C8.51858 8.74992 8.33203 8.93647 8.33203 9.16659C8.33203 9.3967 8.51858 9.58325 8.7487 9.58325H11.2487C11.4788 9.58325 11.6654 9.3967 11.6654 9.16659C11.6654 8.93647 11.4788 8.74992 11.2487 8.74992ZM8.7487 9.99992H9.58203C9.81215 9.99992 9.9987 10.1865 9.9987 10.4166C9.9987 10.6467 9.81215 10.8333 9.58203 10.8333H8.7487C8.51858 10.8333 8.33203 10.6467 8.33203 10.4166C8.33203 10.1865 8.51858 9.99992 8.7487 9.99992Z"
                        fill="#44546F" />
                </svg>

                <span>{{ invoice_title }}</span>
            </div>

            <div></div>

            <!-- <button @click="showConfirmUpdateModal = true"
                class="flex items-center px-3 py-2 text-white gap-x-1 create_btn">
                <span class="text-xs">Update</span>
            </button> -->
        </div>

        <!-- supplier information -->
        <div class="p-4 mb-4 rounded-xl supplier_information">
            <h3 class="mb-4">Supplier's Information</h3>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="w-full supplier_content">
                    <label>Supplier</label>
                    <v-select :options="suppliers" label="name" @update:modelValue="changeSupplier"
                        v-model="supplier_id" :reduce="supplier => supplier.id" :loading="loading"
                        :disabled="true"></v-select>
                </div>
                <div class="w-full supplier_content">
                    <label>GRN</label>
                    <v-select :options="invoices" @update:modelValue="changeInvoice" label="doc_no"
                        v-model="supplierReturn.invoice_id" :reduce="invoice => invoice.id" :disabled="true"></v-select>
                </div>
                <div class="w-full supplier_content">
                    <label>Return Date</label>
                    <input type="date" v-model="supplierReturn.return_date"
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none" readonly />
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
                                    Item
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Batch No.
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    QTY SUPPLIED
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    QTY RETURNED
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

                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    <Tooltip :text="item.product_name">
                                        {{ truncateText(item.product_name, 20) }}
                                    </Tooltip>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.batch_no }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.quantity }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    <span>
                                        {{ supplierReturn.items[getItemIndex(item.id)].quantity }}
                                    </span>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.purchase_price }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.discount + "%" }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{
                                        ((item.quantity * item.purchase_price) - ((item.quantity * item.purchase_price) *
                                            (item.discount / 100))) -
                                        ((supplierReturn.items[getItemIndex(item.id)].quantity *
                                            item.purchase_price))
                                    }}
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
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import Tooltip from "@/views/Components/Tooltip.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";


onMounted(async () => {
    loading.value = true;
    // get suppliers
    await axios.get(import.meta.env.VITE_API_URL + 'suppliers?fields=id,name').then(res => {
        var data = res.data;
        if (Array.isArray(data[0])) {
            for (let index = 0; index < data.length; index++) {
                suppliers.value.concat(data[index]);
            }
        } else suppliers.value = res.data;
    }).catch(err => {
        toast.error("Error loading suppliers!");
    });

    await axios.get(import.meta.env.VITE_API_URL + "supplier_returns/" + route.params.id).then(res => {
        supplierReturn.value = res.data.return;
        supplierReturn.value.items = supplierReturn.value.items.map(item => ({
            ...item, ...{ purchase_order_item_id: item.invoice_item_id }
        }));

    }).catch(err => {
        toast.error("Error loading return!");
    })

    await axios.get(import.meta.env.VITE_API_URL + "invoices/" + supplierReturn.value.invoice_id).then(res => {
        invoice.value = res.data.invoice;
        if (supplier_id.value == 0) {
            supplier_id.value = invoice.value.purchase_order?.supplier_id;
        }
    }).catch(err => {
        toast.error("Error loading invoice!");
    })
    await changeSupplier(supplier_id.value);

    loading.value = false;
})

const getTitle = computed(() => `More Action / Supplier's Return / ${invoice_title.value}`)
const invoice_title = computed(() => `${invoice.value?.doc_no} - ${suppliers.value.find((sup) => sup.id == invoice.value?.purchase_order?.supplier_id)?.name}`)
const authStore = useAuthStore();
// const getSupplier = computed(() => suppliers.value.find((sup) => sup.id == invoice.value?.purchase_order?.supplier_id))

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
const showConfirmUpdateModal = ref(false);
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

const updateReturn = () => {
    loading.value = true;
    showConfirmUpdateModal.value = false
    axios.put(import.meta.env.VITE_API_URL + 'supplier_returns/' + supplierReturn.value.id, supplierReturn.value)
        .then(res => {
            supplierReturn.value = {
                invoice_id: 0,
                return_date: '',
                items: []
            };

            toast.success("Supplier Return updated successfully");
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
const changeInvoice = (invoice_id) => {
    loading.value = true;
    for (let index = 0; index < invoices.value.length; index++) {
        if (invoices.value[index].id == invoice_id) {
            axios.get(import.meta.env.VITE_API_URL + "invoices/" + invoice_id).then(res => {
                invoice.value = res.data.invoice;
                if (supplier_id.value == 0) {
                    supplier_id.value = invoice.value.purchase_order?.supplier_id;
                }
            }).catch(err => {
                toast.error("Error loading invoice!");
            })
                .finally(() => loading.value = false)

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
    });
}

const getItemIndex = (id) => {
    let index = -1;
    supplierReturn.value.items.forEach((item, itemIndex) => {
        if (item.invoice_item_id == id) index = itemIndex;
    })
    return index;
}
const checkItem = (event, index) => {
    let item = invoice.value.items.filter(item => item.id == event.target.value)[0];
    console.log('checkItem', item, event.target)
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
