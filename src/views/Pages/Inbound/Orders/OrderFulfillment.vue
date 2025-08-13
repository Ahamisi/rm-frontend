<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <SideBarModal title="Fulfillment Details" :is-open="isViewOrderFulfillmentModalOpen" width="xl"
        ref="orderFulFillmentModal" @update:is-open="isViewOrderFulfillmentModalOpen = $event"
        :initial-form-data="orderGroup" @close="isViewOrderFulfillmentModalOpen = false" :extraHeader="getExtraHeader">
        <!-- Main content -->
        <template #default>
            <div class="space-y-6">
                <div class="flex flex-wrap gap-4 fulfillment_summary sm:justify-between">
                    <div class="flex flex-1 user_detail_summary gap-x-3">
                        <img :src="orderGroup.user.picture_url" alt="" v-if="orderGroup.user.picture_url"
                            class="user_image">
                        <svg v-else width="44" height="44" viewBox="0 0 44 44" fill="none"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path
                                d="M0 6C0 2.68629 2.68629 0 6 0H38C41.3137 0 44 2.68629 44 6V38C44 41.3137 41.3137 44 38 44H6C2.68629 44 0 41.3137 0 38V6Z"
                                fill="#DCDFE4" />
                            <circle cx="22" cy="22" r="12" fill="url(#pattern0_8591_53397)" />
                            <defs>
                                <pattern id="pattern0_8591_53397" patternContentUnits="objectBoundingBox" width="1"
                                    height="1">
                                    <use xlink:href="#image0_8591_53397" transform="scale(0.0078125)" />
                                </pattern>
                                <image id="image0_8591_53397" width="128" height="128" preserveAspectRatio="none"
                                    xlink:href="data:image/png;base64,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" />
                            </defs>
                        </svg>

                        <div class="flex-1 user_contact">
                            <h6 class="mb-1 capitalize">{{ orderGroup.user.name || 'New Customer' }}</h6>
                            <div class="flex flex-wrap items-baseline gap-x-3">
                                <span class="flex items-center gap-x-1 phone_number">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5.83464 1.66669C4.91416 1.66669 4.16797 2.41288 4.16797 3.33335V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33335C15.8346 2.41288 15.0884 1.66669 14.168 1.66669H5.83464ZM14.168 3.33335H5.83464V14.1667H14.168V3.33335ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z"
                                            fill="#091E42" fill-opacity="0.31" />
                                    </svg>
                                    <span class="">{{ orderGroup.user.phone || 'No phone' }}</span>
                                </span>
                                <span class="flex items-center gap-x-1 phone_number">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    <span class="">{{ orderGroup.user.email || 'No email' }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- status -->
                    <div class="status_summary">
                        <div class="flex">
                            <div class="pr-3 total_count">
                                <h6>Total Request</h6>
                                <span class="count_value">{{ totalRequest }}</span>
                            </div>
                            <div class="px-3 total_count">
                                <h6>Request Delivered</h6>
                                <span class="count_value">{{ requestDelivered }}</span>
                            </div>
                            <div class="pl-3 total_count">
                                <h6>Fulfillment</h6>
                                <span class="count_value">{{ fulfillmentPercentage }}%</span>
                            </div>
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
                                    <th class="text-left w-[30%]">
                                        Product Name
                                    </th>
                                    <th class="text-left w-[17.5%]">
                                        Requested Qty
                                    </th>
                                    <th class="text-left w-[17.5%] ">
                                        Qty Delivered
                                    </th>
                                    <th class="text-left w-[17.5%] ">
                                        Unit Price
                                    </th>
                                    <th class="text-left w-[17.5%]">
                                        Price Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in orderGroup.orders" :key="'orders_' + index"
                                    class="hover:bg-gray-50">
                                    <td class="w-[30%]">
                                        <div v-if="item.product">
                                            <Tooltip :text="`${item.product.name} (${item.product.generic_name})`">
                                                {{ truncateText(`${item.product.name} (${item.product.generic_name})`,
                                                    20) }}
                                            </Tooltip>
                                        </div>
                                        <div v-else>
                                            <p class="mb-0 ">Deleted Product</p>
                                        </div>
                                    </td>
                                    <td class="w-[17.5%]">
                                        {{ item.requested_quantity }}
                                    </td>
                                    <td class="w-[17.5%]">
                                        {{ item.quantity }}

                                    </td>
                                    <td class="w-[17.5%]">₦{{ toLocale(item.price_on_purchase) }}</td>
                                    <td class="w-[17.5%]">₦{{ toLocale(item.quantity * item.price_on_purchase) }}</td>
                                </tr>

                                <tr v-for="(item, index) in orderGroup.deleted_orders" :key="'deleted_orders_' + index"
                                    class="hover:bg-gray-50">
                                    <td class="w-[30%]">
                                        <div v-if="item.product">
                                            <Tooltip :text="`${item.product.name} (${item.product.generic_name})`">
                                                {{ truncateText(`${item.product.name} (${item.product.generic_name})`,
                                                    20) }}
                                            </Tooltip>
                                        </div>
                                        <div v-else>
                                            <p class="mb-0 ">Deleted Product</p>
                                        </div>
                                    </td>
                                    <td class="w-[17.5%]">
                                        {{ item.quantity }}
                                    </td>
                                    <td class="w-[17.5%]">
                                        0
                                    </td>
                                    <td class="w-[17.5%]">₦{{ toLocale(item.price_on_purchase) }}</td>
                                    <td class="w-[17.5%]">₦0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Total -->
                    <!-- <div class="grid grid-cols-2 gap-3 mt-4 order_total">
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
                    </div> -->
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
        picture_url: string | null,
        user_type: string,
        loan_limit: number,
        loan_balance: number,
        email: string,
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
                generic_name: string,
            },
            partner_order_group_id: number | null,
            requested_quantity: number,
            returned: number,
            cost_on_purchase: number,
            total_amount: number,
            deal_id: null | number,
            deal_extra_quantity: number

        },
    ],
    deleted_orders: [
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
                generic_name: string,
            },
            partner_order_group_id: number | null,
            requested_quantity: number,
            returned: number,
            cost_on_purchase: number,
            total_amount: number,
            deal_id: null | number,
            deal_extra_quantity: number

        }
    ]
    delivery_type: {
        pivot: {
            delivery_price: number
        }
    } | null
}

const props = defineProps<Props>();
const toast = useToast();


const loading = ref(false);
const isViewOrderFulfillmentModalOpen = ref(false);
const orderGroup = ref<null | OrderInterface>(null)

watch(() => props.orderId, async (newVal) => {
    if (newVal > 0) {
        getOrderGroup();
    }
}, { immediate: true })




const getExtraHeader = computed(() => {
    return `<span class="flex items-center">
                <span class="return_ref">REF: ${orderGroup.value?.ref_no}</span>
            </span>`;
})

const totalRequest = computed(() => {
    let deleted = orderGroup.value.deleted_orders ? orderGroup.value.deleted_orders.reduce((total, order) => total + order.quantity, 0) : 0
    let requested = orderGroup.value.orders ? orderGroup.value.orders.reduce((total, order) => total + order.requested_quantity, 0) : 0
    return deleted + requested;
});

const requestDelivered = computed(() => {
    return orderGroup.value.orders ? orderGroup.value.orders.reduce((total, order) => total + order.quantity, 0) : 0
})

const totalPrice = computed(() => {
    return orderGroup.value.orders ? orderGroup.value.orders.reduce((total, order) => total + (order.quantity * order.price_on_purchase), 0) : 0
})

const fulfillmentPercentage = computed(() => {
    return ((requestDelivered.value / totalRequest.value) * 100).toFixed(2)
});

const getOrderGroup = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/orders/${props.orderId}`)
        .then(res => {
            orderGroup.value = res.data.order
            isViewOrderFulfillmentModalOpen.value = true;
        })
        .catch(err => {
            console.log(err);
            toast.error("Error fetching order group data");
        })
        .finally(() => {
            loading.value = false;
        })
}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<style>
.customer_summary {
    padding: 16px;
    border-radius: 6px;
    background: rgba(247, 248, 249, 1);
}

.customer_summary .user_image {
    width: 44px;
    height: 44px;
    background: rgba(220, 223, 228, 1);
    border-radius: 6px;
}

.user_contact h6 {
    color: rgba(68, 84, 111, 1);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
}

.user_contact .phone_number {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}

.status_summary {
    padding: 4px 12px;
    border-radius: 6px;
    background: white;

}

.status_summary .total_count h6 {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: rgba(98, 111, 134, 1);
}

.status_summary .total_count:not(:last-child) {
    border-right: 1px solid rgba(9, 30, 66, 0.14);
}

.status_summary .total_count .count_value {
    background: rgba(9, 30, 66, 0.06);
    padding: 4px 6px;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: rgba(68, 84, 111, 1);
    border-radius: 4px;
}

.content_tabs {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    border-color: rgba(9, 30, 66, 0.14);
}

.content_tabs nav button.active {
    color: rgba(12, 102, 228, 1);
    border-color: rgba(12, 102, 228, 1)
}

.title {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
    margin-bottom: 0.3em;
}

.value {
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px;
    color: rgba(98, 111, 134, 1);
}

.customer_type .header {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
    padding: 16px 0px;
    margin-bottom: 16px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.fulfillment_summary {
    background: rgba(247, 248, 249, 1);
    border-radius: 6px;
    padding: 16px;
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
</style>