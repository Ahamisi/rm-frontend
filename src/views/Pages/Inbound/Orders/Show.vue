<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- view product returns modal -->
    <SideBarModal title="Order Details" :is-open="isViewOrderDetailModalOpen" width="xl" :initial-form-data="orderGroup"
        @update:is-open="isViewOrderDetailModalOpen = $event" @close="isViewOrderDetailModalOpen = false"
        :extra-header="getExtraHeader">

        <!-- Main content -->
        <template #default>
            <div class="space-y-6">

                <!-- Tab Navigation -->
                <div class="mb-6 border-b border-gray-200">
                    <div class="flex">
                        <button v-for="view_tab in viewOrderTabs" :key="view_tab" @click="activeViewTab = view_tab"
                            :class="[
                                'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
                                activeViewTab === view_tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            ]">
                            {{ view_tab }}
                        </button>
                    </div>
                </div>

                <!-- Order Details Content -->
                <div v-if="activeViewTab === 'Details'" class="space-y-6">
                    <!-- Order Information Grid -->

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="key">Customer's Name</span>
                            <span class="value">{{ orderGroup.user.name }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Customer Type</span>
                            <span class="value">{{ orderGroup.user.user_type }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Order By</span>
                            <span class="value">{{ orderGroup.order_by ?? 'Nil' }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Agent</span>
                            <span class="value">{{ orderGroup.user.agent ? orderGroup.user.agent.name : 'Nil' }}</span>
                        </div>
                        <!-- <div class="flex items-center justify-between">
                            <span class="key">Phone</span>
                            <div class="flex items-center space-x-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z"
                                        fill="#091E42" fill-opacity="0.31" />
                                </svg>

                                <span class="value">{{ orderGroup.user.phone }}</span>
                            </div>
                        </div> -->

                        <div class="flex items-center justify-between">
                            <span class="key">Phone</span>
                            <div class="flex items-center space-x-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z"
                                        fill="#091E42" fill-opacity="0.31" />
                                </svg>

                                <span class="value">{{ orderGroup.user.phone }}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Store</span>
                            <div class="flex items-center space-x-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z"
                                        fill="#091E42" fill-opacity="0.31" />
                                </svg>

                                <span class="value">{{ orderGroup.store.name }}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Loan Limit</span>
                            <span class="value">{{ displayLoanLimit }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Amount to Reach Loan Limit</span>
                            <span class="value">₦{{ toLocale(orderGroup.user.loan_limit - orderGroup.user.loan_balance)
                            }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Outstanding Loan</span>
                            <span class="value">₦{{ toLocale(orderGroup.user.loan_balance) }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="key">Date</span>
                            <div class="flex items-center space-x-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z"
                                        fill="#091E42" fill-opacity="0.31" />
                                </svg>

                                <span class="value">{{ dayjs(orderGroup.created_at).format('DD/MM/YYYY - h:ma')
                                }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- Order Summary -->
                    <div class="mt-8">
                        <h3 class="mb-4 text-lg font-medium text-gray-900">Order Summary</h3>

                        <!-- Table -->
                        <div class="overflow-x-auto">
                            <table class="w-full border-separate order_summary" style="border-spacing: 0">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="text-left w-[27.5%]">
                                            Product
                                        </th>
                                        <th class="text-left w-[27.5%]">
                                            Tags
                                        </th>
                                        <th class="text-left w-[15%] ">
                                            Qty Delivered
                                        </th>
                                        <th class="text-left w-[15%] ">
                                            Unit Price</th>
                                        <th class="text-left w-[15%]">
                                            Price Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- st -->
                                    <!-- :class="{ 'bg-green-200': item.order.product.cash_and_carry, 'item': !item.order.product.cash_and_carry }" -->
                                    <tr v-for="(item, index) in orderGroup.orders" :key="'orders_' + index"
                                        class="hover:bg-gray-50">
                                        <td class="w-[27.5%]">
                                            <div v-if="item.product != null">
                                                <Tooltip :text="item.product.name">
                                                    {{ truncateText(item.product.name, 20) }}
                                                </Tooltip>
                                            </div>
                                            <div v-else>
                                                <p class="mb-0 ">Deleted Product</p>
                                            </div>
                                        </td>
                                        <td class="w-[27.5%]">
                                            <span v-if="item.deal_id != null" class="tags deal">Deal</span>
                                            <span v-if="item.product.is_controlled"
                                                class="tags controlled">Controlled</span>
                                            <span v-if="item.product.cash_and_carry" class="tags cash_and_carry">Cash
                                                and Carry</span>
                                        </td>
                                        <td class="w-[15%]">
                                            <span>
                                                {{ item.quantity }}
                                                <span v-if="item.deal_extra_quantity"> (+{{ item.deal_extra_quantity
                                                }})</span>
                                            </span>

                                        </td>
                                        <td class="w-[15%]">₦{{ toLocale(item.price_on_purchase) }}</td>
                                        <td class="w-[15%]">₦{{ toLocale(item.quantity * item.price_on_purchase) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Total -->
                        <div class="grid grid-cols-2 gap-3 mt-4 order_total">
                            <span class="text-xs">Payment Status</span>
                            <span class="text-xs text-right capitalize">{{ orderGroup.payment_method.display_name
                            }}</span>
                            <span class="text-xs">Discount</span>
                            <span class="text-xs text-right ">{{ orderGroup.user_promo_discount ?
                                orderGroup.user_promo_discount.discount + "%" : '' }}</span>
                            <span class="text-xs">Sub Total</span>
                            <span v-if="orderGroup.user_promo_discount" class="text-xs text-right">₦{{
                                orderGroup.user_promo_discount ? toLocale(orderGroup.total_amount_without_delivery -
                                    (orderGroup.total_amount_without_delivery * (orderGroup.user_promo_discount.discount /
                                        100))) : '' }} <del class="text-gray-500">{{
                                    toLocale(orderGroup.total_amount_without_delivery) }}</del></span>
                            <span v-else class="text-xs text-right">₦{{
                                toLocale(orderGroup.total_amount_without_delivery) }}</span>
                            <span class="text-xs">Delivery Fee</span>
                            <span class="text-xs text-right">₦{{ orderGroup.delivery_type ?
                                toLocale(orderGroup.delivery_type.pivot.delivery_price) : '' }}</span>
                            <span class="text-sm">Total</span>
                            <span class="text-sm text-right">₦{{ toLocale(orderGroup.total_amount) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Activities Tab -->
                <div v-else-if="activeViewTab === 'Activities'" class="space-y-6">
                    <h3 class="text-xs font-medium text-gray-500">Recent</h3>

                    <div class="space-y-4">
                        <DatatableTable :columns="logColumns" :url="logs_url" pagename="DeliveredOrdersLogs"
                            :filterByDate="true">
                        </DatatableTable>
                    </div>
                </div>

            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="closeModal" type="button" class="approve_btn">
                    Close
                </button>
            </div>
        </template>
    </SideBarModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { toLocale } from '@/views/helpers/useLocale.js'
import dayjs from 'dayjs';
import DatatableTable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn } from '@/types';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";

interface Props {
    orderId: number
}

interface OrderInterface {
    id: number,
    ref_no: string,
    status: number,
    total_amount: number,
    order_by: string,
    created_at: string,
    payment_method_id: number,
    user_promo_discount_id: null | number,
    user_id: number,
    store_id: number,
    has_cash_and_carry: boolean,
    has_is_controlled: boolean,
    total_amount_without_delivery: number,
    is_delivery_paid: 1 | 0,
    delivery_payment_confirmed_at: null | string,
    applied: 1 | 0,
    user_promo_discount: {
        discount: number,
        target: number
    },
    user: {
        id: number,
        name: number,
        phone: string,
        user_type: string,
        loan_limit: number,
        loan_balance: number,

        agent: {
            id: number,
            name: string
        }
    },
    store: {
        id: number,
        name: string,
    },
    payment_method: {
        id: number,
        display_name: string
    },
    orders: [
        {
            id: number,
            quantity: number,
            price_on_purchase: number,
            order_group_id: number,
            product_id: number,
            product: {
                id: number,
                name: string,
                is_controlled: 1 | 0,
                cash_and_carry: 1 | 0,
            },
            partner_order_group_id: number | null,
            requested_quantity: number,
            returned: number,
            cost_on_purchase: number,
            total_amount: number,
            deal_id: null | number,
            deal_extra_quantity: number

        }
    ],
    delivery_type: {
        pivot: {
            delivery_price: number
        }
    } | null
}

const props = defineProps<Props>();
const toast = useToast();

watch(() => props.orderId, async (newVal) => {
    if (newVal > 0) {
        getOrderGroup();
    }
}, { immediate: true })

const loading = ref(false)
const isViewOrderDetailModalOpen = ref(false)
const orderGroup = ref<null | OrderInterface>(null)

const activeViewTab = ref('Details');
const viewOrderTabs = ['Details', 'Activities'];

const logs_url = computed(() => import.meta.env.VITE_API_URL + `admin/order_groups/${props.orderId}/users`)
const logColumns = ref<TableColumn[]>([
    {
        label: 'User',
        field: 'user.name',
        sortable: true,
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('')
    },
])

const sortedOrders = computed(() => {
    if (orderGroup.value.orders == undefined) return [];
    try {
        return orderGroup.value.orders.sort((a, b) => {
            if (a.product == null) return 0;
            if (b.product == null) return -1;
            return (a.product.name > b.product.name) ? 1 : ((b.product.name > a.product.name) ? -1 : 0);
        });
    } catch (error) {
        return orderGroup.value.orders;
    }
});

const displayLoanLimit = computed(() => {
    if (orderGroup.value) return '₦' + toLocale(orderGroup.value.user.loan_limit);
    return 'N/A'
})

const getExtraHeader = computed(() => {
    return `
            <span class="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="3.75" fill="#F7F8F9" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.91786 5.83325C7.45578 5.83325 7.08203 6.20492 7.08203 6.66242V13.3374C7.08346 13.558 7.1722 13.7691 7.32883 13.9245C7.48546 14.0799 7.69724 14.1669 7.91786 14.1666H12.0795C12.5416 14.1666 12.9154 13.7953 12.9154 13.3374V6.66242C12.9154 6.20742 12.5412 5.83325 12.0795 5.83325H7.91786ZM8.7487 7.49992H11.2487C11.4788 7.49992 11.6654 7.68647 11.6654 7.91659C11.6654 8.1467 11.4788 8.33325 11.2487 8.33325H8.7487C8.51858 8.33325 8.33203 8.1467 8.33203 7.91659C8.33203 7.68647 8.51858 7.49992 8.7487 7.49992ZM11.2487 8.74992H8.7487C8.51858 8.74992 8.33203 8.93647 8.33203 9.16659C8.33203 9.3967 8.51858 9.58325 8.7487 9.58325H11.2487C11.4788 9.58325 11.6654 9.3967 11.6654 9.16659C11.6654 8.93647 11.4788 8.74992 11.2487 8.74992ZM8.7487 9.99992H9.58203C9.81215 9.99992 9.9987 10.1865 9.9987 10.4166C9.9987 10.6467 9.81215 10.8333 9.58203 10.8333H8.7487C8.51858 10.8333 8.33203 10.6467 8.33203 10.4166C8.33203 10.1865 8.51858 9.99992 8.7487 9.99992Z"
                        fill="#44546F" />
                </svg>
                <span class="return_ref">REF: ${orderGroup.value?.ref_no}</span>
            </span>
        `;
})


const getOrderGroup = () => {
    loading.value = true;
    axios
        .get(
            import.meta.env.VITE_API_URL +
            "admin/orders/" +
            props.orderId
        )
        .then(response => {
            orderGroup.value = response.data.order;
            isViewOrderDetailModalOpen.value = true;
        })
        .catch(err => toast.error('Error fetching order details!'))
        .finally(() => loading.value = false)

}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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

.discard_merge_alert_footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn {
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
    font-weight: 500;
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
    padding: 10px 8px;
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
    padding: 16px 24px;
}

.tags {
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.controlled {
    color: rgba(94, 77, 178, 1);
    background: rgba(243, 240, 255, 1);
}

.cash_and_carry {
    color: rgb(178, 77, 77);
    background: rgb(255, 240, 240);
}

.deal {
    color: rgb(77, 178, 87);
    background: rgb(240, 255, 240);
}

.order_total .text-right {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}

.order_total .text-sm.text-right,
.order_total .text-sm {
    font-size: 16px;
    font-style: normal;
    font-weight: 590;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}
</style>