<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- create product return modal -->
    <SideBarModal title="Create Product Return" :is-open="isCreateProductReturnModalOpen" width="xl"
        ref="createProductReturnModal" @update:is-open="isCreateProductReturnModalOpen = $event"
        :initial-form-data="createProductReturnFromData" @close="closeModal">

        <!-- Main content -->
        <template #default>
            <div class="space-y-6">

                <div class="grid items-end grid-cols-2 gap-4 mb-8">
                    <!-- Select Customer -->
                    <div>
                        <label class="block mb-1 text-xs font-medium text-gray-700">Customer</label>
                        <v-select :options="customers" label="name" v-model="createProductReturnFromData.customer_id"
                            :reduce="customer => customer.id" @search="searchCustomers" :loading="customers_loading"
                            @update:modelValue="resetOrderItems">
                        </v-select>
                    </div>
                    <!-- Select Order Group -->
                    <div>
                        <label class="block mb-1 text-xs font-medium text-gray-700">Order Number</label>
                        <v-select :options="order_groups" label="ref_no"
                            v-model="createProductReturnFromData.order_group_id" :reduce="order_group => order_group.id"
                            :loading="order_groups_loading" @search="searchOrderGroups"
                            @update:modelValue="getOrderGroupItems">
                        </v-select>
                    </div>
                </div>

                <div class="mb-8">
                    <label for="reason" class="block mb-2 text-sm font-medium text-gray-700">
                        Reason for Return
                    </label>
                    <select id="reason" v-model="createProductReturnFromData.reason"
                        class="w-full px-3 py-2 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none">
                        <option value="">~ Select a reason ~</option>
                        <option>Pricing Issues</option>
                        <option>Customer Error</option>
                        <option>Incomplete Supply</option>
                        <option>Cancelled Order</option>
                        <option>Short-dated</option>
                        <option>Late Delivery</option>
                        <option>Wrong Supply</option>
                        <option>Product Damage</option>
                        <option>Product Defect</option>
                        <option>Unsupplied Product</option>
                        <option>Other</option>
                    </select>
                    <input v-if="createProductReturnFromData.reason == 'Other'" v-model="otherReason" type="text"
                        class="mt-2 bg-transparent border h-10 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Give more detail on reason for Return" required>
                </div>

                <!-- order items -->
                <div class="overflow-x-auto">
                    <table class="w-full border-separate order_summary" style="border-spacing: 0">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="text-left"></th>
                                <th class="text-left">
                                    Product Name
                                </th>
                                <th class="text-left">
                                    Batch No.
                                </th>
                                <th class="text-left">
                                    Qty Supplied
                                </th>
                                <th class="text-left">
                                    Qty to Return
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in productReturnItems" :key="index">
                                <td class="">
                                    <input type="checkbox" class="rounded text-secondary create_item_checkbox"
                                        @change="toggleCheck" :value="item.sub_product_id" :data-index="index" />
                                </td>
                                <td class="">
                                    {{ item.product.name }}
                                </td>
                                <td class="">
                                    {{ item.subproduct.batch_no + " | " +
                                        dayjs(item.subproduct.expiry_date).format('DD/MM/YYYY') }}
                                </td>
                                <td class="">
                                    {{ item.qty_supplied }}
                                </td>
                                <td class="">
                                    <span v-if="getItemIndex(item.order_id, item.sub_product_id, index) === -1">
                                        0
                                    </span>
                                    <div v-else>
                                        <div class="inline-flex">
                                            <input type="number" class="form-control form-control-sm"
                                                :max="item.qty_supplied"
                                                :value="getSubProductQuantity(item.order_id, item.sub_product_id, index)"
                                                @input="onQuantityChange($event, item.order_id, item.sub_product_id, index)" />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="handleShowDiscardModal" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="showConfirmReturnedCreationWarningModal = true" type="button" class="approve_btn">
                    Create
                </button>
            </div>
        </template>
    </SideBarModal>

    <!-- confirm products return creation warning Modal -->
    <UniversalCenteredModal :show="showConfirmReturnedCreationWarningModal"
        @close="showConfirmReturnedCreationWarningModal = false">
        <template #header>
            <span class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0606 4.96711C11.5766 3.99311 12.4186 3.98911 12.9366 4.96711L20.0606 18.4251C20.5766 19.3991 20.1056 20.1961 19.0036 20.1961H4.99361C3.89161 20.1961 3.41861 19.4031 3.93661 18.4251L11.0606 4.96711ZM11.2915 14.7072C11.479 14.8947 11.7334 15.0001 11.9986 15.0001C12.2638 15.0001 12.5182 14.8947 12.7057 14.7072C12.8933 14.5197 12.9986 14.2653 12.9986 14.0001V9.00011C12.9986 8.73489 12.8933 8.48054 12.7057 8.293C12.5182 8.10546 12.2638 8.00011 11.9986 8.00011C11.7334 8.00011 11.479 8.10546 11.2915 8.293C11.104 8.48054 10.9986 8.73489 10.9986 9.00011V14.0001C10.9986 14.2653 11.104 14.5197 11.2915 14.7072ZM11.2915 17.7072C11.479 17.8948 11.7334 18.0001 11.9986 18.0001C12.2638 18.0001 12.5182 17.8948 12.7057 17.7072C12.8933 17.5197 12.9986 17.2653 12.9986 17.0001C12.9986 16.7349 12.8933 16.4805 12.7057 16.293C12.5182 16.1055 12.2638 16.0001 11.9986 16.0001C11.7334 16.0001 11.479 16.1055 11.2915 16.293C11.104 16.4805 10.9986 16.7349 10.9986 17.0001C10.9986 17.2653 11.104 17.5197 11.2915 17.7072Z"
                        fill="#E56910" />
                </svg>


                <h3>Create Product Return?</h3>
            </span>
        </template>

        <template #body>
            <p class="discard_merge_alert_body_text">
                You are about to create this product return. This will take effect immediately.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showConfirmReturnedCreationWarningModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="createReturn" type="button" class="discard_btn">
                    Confirm Product Return
                </button>
            </div>
        </template>
    </UniversalCenteredModal>

    <!-- discard products return creation warning Modal -->
    <UniversalCenteredModal :show="showDiscardReturnedCreationWarningModal"
        @close="showDiscardReturnedCreationWarningModal = false">
        <template #header>
            <span class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0606 4.96711C11.5766 3.99311 12.4186 3.98911 12.9366 4.96711L20.0606 18.4251C20.5766 19.3991 20.1056 20.1961 19.0036 20.1961H4.99361C3.89161 20.1961 3.41861 19.4031 3.93661 18.4251L11.0606 4.96711ZM11.2915 14.7072C11.479 14.8947 11.7334 15.0001 11.9986 15.0001C12.2638 15.0001 12.5182 14.8947 12.7057 14.7072C12.8933 14.5197 12.9986 14.2653 12.9986 14.0001V9.00011C12.9986 8.73489 12.8933 8.48054 12.7057 8.293C12.5182 8.10546 12.2638 8.00011 11.9986 8.00011C11.7334 8.00011 11.479 8.10546 11.2915 8.293C11.104 8.48054 10.9986 8.73489 10.9986 9.00011V14.0001C10.9986 14.2653 11.104 14.5197 11.2915 14.7072ZM11.2915 17.7072C11.479 17.8948 11.7334 18.0001 11.9986 18.0001C12.2638 18.0001 12.5182 17.8948 12.7057 17.7072C12.8933 17.5197 12.9986 17.2653 12.9986 17.0001C12.9986 16.7349 12.8933 16.4805 12.7057 16.293C12.5182 16.1055 12.2638 16.0001 11.9986 16.0001C11.7334 16.0001 11.479 16.1055 11.2915 16.293C11.104 16.4805 10.9986 16.7349 10.9986 17.0001C10.9986 17.2653 11.104 17.5197 11.2915 17.7072Z"
                        fill="#E56910" />
                </svg>


                <h3>Discard Changes?</h3>
            </span>
        </template>

        <template #body>
            <p class="discard_merge_alert_body_text">
                You are about to discard all changes made. This action will clear all data and will not be able to be
                recovered. Are you sure you want to discard these changes?
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showDiscardReturnedCreationWarningModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="discardChanges" type="button" class="discard_btn">
                    Discard Changes
                </button>
            </div>
        </template>
    </UniversalCenteredModal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import axios from 'axios';
import dayjs from 'dayjs';
import { useToast } from 'vue-toastification';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useAuthStore } from '@/stores/auth';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';

interface Props {
    isOpen: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['created', 'discarded', 'close'])

onMounted(() => {
    dayjs.extend(LocalizedFormat);
})

watch(() => props.isOpen, (value) => {
    if (value) {
        isCreateProductReturnModalOpen.value = value;
        createProductReturnFromData.value = {
            reason: '',
            return_to_stock: true,
            items: [],
            customer_id: null as null | number,
            order_group_id: null as null | number,
        };
        productReturnItems.value = [];

    }
})

const authStore = useAuthStore()
const createProductReturnModal = ref(null);
const showDiscardReturnedCreationWarningModal = ref(false);
const showConfirmReturnedCreationWarningModal = ref(false);
const toast = useToast();
const loading = ref(false);
const customers_loading = ref(false);
const order_groups_loading = ref(false);
const isCreateProductReturnModalOpen = ref(false);
const customers = ref([]);
const order_groups = ref([]);
const otherReason = ref('');
const productReturnItems = ref([]);
const createProductReturnFromData = ref({
    reason: '',
    return_to_stock: true,
    items: [],
    customer_id: null as null | number,
    order_group_id: null as null | number,
})

const { hasChanged, reset } = useDataChangeTracker(createProductReturnFromData);

const handleShowDiscardModal = () => {
    if (hasChanged.value) {
        showDiscardReturnedCreationWarningModal.value = true
    } else {
        discardChanges()
    }
}

const searchCustomers = (search) => {
    if (search == '' || search.length < 3) return;
    customers_loading.value = true;
    customers.value = [];
    axios.get(import.meta.env.VITE_API_URL + 'admin/order/customers?searchTerm=' + search + '&perPage=10').then(res => {
        customers.value = res.data.data;
    }).catch(err => {
        error(err);
    }).finally(() => {
        customers_loading.value = false;
    });
}

const searchOrderGroups = (search) => {
    if (search == '' || search.length < 3) return;
    if (!createProductReturnFromData.value.customer_id) {
        toast.error('please select a customer first');
        return;
    }
    order_groups_loading.value = true;
    order_groups.value = [];
    axios.get(import.meta.env.VITE_API_URL + `users/${createProductReturnFromData.value.customer_id}/orders?search=${search}`).then(res => {
        order_groups.value = res.data;
    }).catch(err => {
        error(err);
    }).finally(() => {
        order_groups_loading.value = false;
    });
}

const getSubproductQty = (total, subproducts) => {
    if (subproducts.length == 0) return total;
    subproducts.forEach(subp => {
        total -= subp.pivot.quantity;
    });
    return total;
}

const getOrderGroupItems = (order_group_id) => {
    loading.value = true;
    createProductReturnFromData.value.items = [];
    productReturnItems.value = [];
    axios.get(import.meta.env.VITE_API_URL + `order_groups/${order_group_id}`).then(res => {
        res.data.orders.forEach(order => {
            if (order.subproduct) {
                if (!order.subproduct.partner_id) productReturnItems.value.push({ sub_product_id: order.subproduct.id, subproduct: order.subproduct, product: order.product, quantity: 0, qty_supplied: getSubproductQty(order.quantity, order.subproducts), order_id: order.id });
            }
            if (order.subproducts.length > 0) {
                order.subproducts.forEach(subp => {
                    if (!subp.partner_id) productReturnItems.value.push({ sub_product_id: subp.id, subproduct: subp, product: order.product, quantity: 0, qty_supplied: subp.pivot.quantity, order_id: order.id });
                })
            }
        })
    }).catch(err => {
        toast.error("Error loading order items!");
    }).finally(() => loading.value = false);
}

const toggleCheck = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    const idx = parseInt(input.dataset.index || '0');
    const subProductId = input.value;

    const order = productReturnItems.value.find(item => item.sub_product_id == subProductId);
    if (!order) return;

    const itemIndex = hasOrder(order.order_id);
    const subExists = hasItem(order.order_id, order.sub_product_id, idx);

    if (isChecked) {
        if (itemIndex === false) {
            createProductReturnFromData.value.items.push({
                order_id: order.order_id,
                sub_products: [{ quantity: 0, id: order.sub_product_id, index: idx }],
                images: []
            });
        } else if (subExists === false && typeof itemIndex === 'number') {
            createProductReturnFromData.value.items[itemIndex].sub_products.push({
                quantity: 0,
                id: order.sub_product_id,
                index: idx
            });
        }
    } else {
        if (typeof itemIndex === 'number' && typeof subExists === 'number') {
            const subProducts = createProductReturnFromData.value.items[itemIndex].sub_products;
            const filtered = subProducts.filter(
                sub => !(sub.id === order.sub_product_id && sub.index === idx)
            );

            if (filtered.length > 0) {
                createProductReturnFromData.value.items[itemIndex].sub_products = filtered;
            } else {
                createProductReturnFromData.value.items.splice(itemIndex, 1);
            }
        }
    }
};


const getSubProductQuantity = (order_id: number, sub_product_id: number, index: number): number => {
    const itemIndex = getItemIndex(order_id, sub_product_id, index);
    if (itemIndex === -1) return 0;

    const subProduct = createProductReturnFromData.value.items[itemIndex].sub_products.find(
        sub => sub.id === sub_product_id && sub.index === index
    );
    return subProduct?.quantity ?? 0;
};

const onQuantityChange = (event: Event, order_id: number, sub_product_id: number, index: number) => {
    let value = parseInt((event.target as HTMLInputElement).value);
    if (isNaN(value)) value = 0;

    const itemIndex = getItemIndex(order_id, sub_product_id, index);
    if (itemIndex === -1) return;

    const subProduct = createProductReturnFromData.value.items[itemIndex].sub_products.find(
        sub => sub.id === sub_product_id && sub.index === index
    );

    if (subProduct) {
        subProduct.quantity = value;
    }
};

const getItemIndex = (order_id, sub_product_id, selected_index) => {
    let index = -1;
    createProductReturnFromData.value.items.forEach((item, itemIndex) => {
        // if (item.order_id == order_id && item.sub_product_id == sub_product_id) index = itemIndex;
        if (item.order_id == order_id && item.sub_products.findIndex((sub_product) => sub_product.id == sub_product_id && selected_index == sub_product.index) > -1) index = itemIndex;
    })
    return index;
}

const hasOrder = (order_id: number): number | false => {
    return createProductReturnFromData.value.items.findIndex(item => item.order_id === order_id) > -1 ? createProductReturnFromData.value.items.findIndex(item => item.order_id === order_id) : false;
};

const hasItem = (order_id, sub_product_id, index = -1) => {
    const orderIdx = hasOrder(order_id);
    if (orderIdx === false) return false;

    const item = createProductReturnFromData.value.items[orderIdx];
    if (!item || !item.sub_products) return false;

    const subIndex = item.sub_products.findIndex(
        (sub) => sub.id === sub_product_id && (index === -1 || sub.index === index)
    );

    return subIndex > -1 ? orderIdx : false;
};

const resetOrderItems = (resetAllValue = 0) => {
    productReturnItems.value = [];
    if (!resetAllValue) {
        createProductReturnFromData.value.items = [];
    } else {
        createProductReturnFromData.value = {
            reason: '',
            return_to_stock: true,
            items: [],
            customer_id: null,
            order_group_id: null,
        }
        reset();
    }
    order_groups.value = []
}

const createReturn = () => {
    const reason = createProductReturnFromData.value.reason;

    // unique case - other
    if (createProductReturnFromData.value.reason.toLocaleLowerCase() == 'other') {
        if (!otherReason.value) {
            toast.error("Please enter detail of reason for the return to proceed");
            return;
        }

        createProductReturnFromData.value.reason = createProductReturnFromData.value.reason + ' - ' + otherReason.value;
    }

    // if (createProductReturnFromData.value.items.filter(item => item.images.length == 0).length > 0) {
    //     toast.error("<p>Please select at least one images for each item to proceed</p>", {
    //         position: "top-right"
    //     });
    //     loading.value = false;
    //     return;
    // }

    showConfirmReturnedCreationWarningModal.value = false
    loading.value = true;
    // Create FormData
    const formData = new FormData();

    formData.append('reason', createProductReturnFromData.value.reason);
    formData.append('return_to_stock', createProductReturnFromData.value.return_to_stock ? 1 : 0);

    // Append items
    createProductReturnFromData.value.items.forEach((item, itemIndex) => {
        formData.append(`items[${itemIndex}][order_id]`, item.order_id);

        item.sub_products.forEach((sub, subIndex) => {
            formData.append(`items[${itemIndex}][sub_products][${subIndex}][id]`, sub.id);
            formData.append(`items[${itemIndex}][sub_products][${subIndex}][quantity]`, sub.quantity);
        });

        // Append images
        // item.images.forEach((img, imgIndex) => {
        //     formData.append(`items[${itemIndex}][images][${imgIndex}]`, img.file);
        // });
    });

    axios.post(import.meta.env.VITE_API_URL + 'product_returns?current_branch=' + authStore.selectedBranch.id, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => {
            resetOrderItems(1);
            if (isCreateProductReturnModalOpen.value) createProductReturnModal.value?.closeModal();
            customers.value = [];
            toast.success('Product return created successfully!!!');
            emit('created');
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const discardChanges = () => {
    resetOrderItems(1);
    if (isCreateProductReturnModalOpen.value) createProductReturnModal.value?.closeModal();
    customers.value = [];
    showDiscardReturnedCreationWarningModal.value = false;
    showConfirmReturnedCreationWarningModal.value = false;
    loading.value = false;
    customers_loading.value = false;
    customers.value = [];
    order_groups.value = [];
    order_groups_loading.value = false;
    emit('discarded')
}

const closeModal = () => {
    if (isCreateProductReturnModalOpen.value) createProductReturnModal.value?.closeModal();
    emit('close');
}

const error = (err) => {
    let errorMessage = '';
    if (err.response.data.error != undefined) {
        if (Array.isArray(err.response.data.error)) {
            errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
        } else {
            errorMessage = "<p>" + err.response.data.error + "</p>";
        }
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}
</script>

<style>
.return_ref {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    /* 133.333% */
    text-transform: uppercase;
    color: rgba(98, 111, 134, 1);
}

.return_status {
    border-radius: 4px;
    background: rgba(9, 30, 66, 0.06);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: rgba(68, 84, 111, 1);
}

.pending_status,
.approved_status,
.rejected_status,
.pending_transit_status,
.collected_transit_status,
.returned_transit_status {
    border-radius: 3px;
    padding: 1px 8px;
}

.pending_status,
.pending_transit_status {
    color: #3858CF;
    border: 1px solid #3858CF;
}

.approved_status,
.returned_transit_status {
    color: #56cf38;
    border: 1px solid #56cf38;
}

.rejected_status {
    color: #cf3838;
    border: 1px solid #cf3838;
}

.key {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.value {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}



.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.erp_dashboard_wrapper .create_grn_btn {
    padding: 4px 7px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.25px;

}

.tab_actions {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.tab_actions .grey_field {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
}

.tab_actions button:not(.grey_field) {
    background: rgba(12, 102, 228, 1);
}

.discard_merge_alert_body_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer button,
.cancel_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn,
.cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.discard_merge_alert_footer .approve_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(201, 55, 44, 1);
    color: white;
}

.bulk_products_transfer_alert {
    background: rgba(204, 224, 255, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border-radius: 8px;
}

.order_summary {
    border: 1px solid rgba(9, 30, 66, 0.14);
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
    /* Remove border-radius from here */
}

.order_summary thead tr,
.order_summary thead tr th,
.order_summary tbody tr:not(:last-child),
.order_summary tbody tr:not(:last-child) td {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.order_summary tbody tr td {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
    padding: 8px;
}

.order_summary thead tr th {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
    padding: 8px;
    background: rgba(247, 248, 249, 1);
}

.order_summary thead tr th:first-child {
    border-top-left-radius: 8px;
}

.order_summary thead tr th:last-child {
    border-top-right-radius: 8px;
}

.transit_data {
    background: rgba(233, 242, 255, 1);
    padding: 4px;
    border-radius: 3px;
    color: rgba(0, 85, 204, 1);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
}

.lightbox {
    display: flex;
    position: fixed;
    z-index: 99999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    max-width: 80%;
    max-height: 80%;
}

.close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    cursor: pointer;
}

.prev,
.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    padding: 10px;
    cursor: pointer;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

.order_total {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
    background: rgba(247, 248, 249, 1);
    padding: 16px 0;
}
</style>
