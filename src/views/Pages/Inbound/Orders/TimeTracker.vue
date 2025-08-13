<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <SideBarModal title="Time Tracker" :is-open="isViewOrderTimingModalOpen" width="xl" :initial-form-data="orderGroup"
        @close="isViewOrderTimingModalOpen = false" :extraHeader="getExtraHeader">
        <!-- Main content -->
        <template #default>
            <div class="space-y-6">
                <div class="" v-for="(data, department) in timing" :key="department">
                    <div class="flex gap-x-3" v-for="(time, stage) in data.stages" :key="stage">

                        <svg v-if="department.toLowerCase() == 'accounting'" width="24" height="72" viewBox="0 0 24 72"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
                                fill="#E56910" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.342 15.3333H16.6753V11.3333H7.342V15.3333ZM7.342 9.99998H16.6753V8.66665H7.342V9.99998ZM16.6667 7.33331H7.33333C6.6 7.33331 6 7.93331 6 8.66665V15.3333C6 16.0666 6.6 16.6666 7.33333 16.6666H16.6667C17.4 16.6666 18 16.0666 18 15.3333V8.66665C18 7.93331 17.4 7.33331 16.6667 7.33331Z"
                                fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67533 14H10.0087V12.6666H8.67533V14Z"
                                fill="white" />
                            <rect x="11.5" y="32" width="1" height="40" rx="0.5" fill="#091E42" fill-opacity="0.14" />
                        </svg>

                        <svg v-if="department.toLowerCase() == 'inventory'" width="24" height="72" viewBox="0 0 24 72"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
                                fill="#0C66E4" />
                            <path
                                d="M14.0026 7.99998H10.0026C9.63441 7.99998 9.33594 8.29846 9.33594 8.66665C9.33594 9.03484 9.63441 9.33331 10.0026 9.33331H14.0026C14.3708 9.33331 14.6693 9.03484 14.6693 8.66665C14.6693 8.29846 14.3708 7.99998 14.0026 7.99998Z"
                                fill="white" />
                            <path
                                d="M14.0026 9.99998H10.0026C9.63441 9.99998 9.33594 10.2985 9.33594 10.6666C9.33594 11.0348 9.63441 11.3333 10.0026 11.3333H14.0026C14.3708 11.3333 14.6693 11.0348 14.6693 10.6666C14.6693 10.2985 14.3708 9.99998 14.0026 9.99998Z"
                                fill="white" />
                            <path
                                d="M11.3359 12H10.0026C9.63441 12 9.33594 12.2985 9.33594 12.6666C9.33594 13.0348 9.63441 13.3333 10.0026 13.3333H11.3359C11.7041 13.3333 12.0026 13.0348 12.0026 12.6666C12.0026 12.2985 11.7041 12 11.3359 12Z"
                                fill="white" />
                            <path
                                d="M8.66927 6.66665V17.3333H15.3359V6.66665H8.66927ZM7.33594 6.65998C7.33594 5.92798 7.93394 5.33331 8.67327 5.33331H15.3319C16.0706 5.33331 16.6693 5.93198 16.6693 6.65998V17.34C16.6693 18.0726 16.0713 18.6666 15.3319 18.6666H8.67327C8.32027 18.6672 7.98142 18.5279 7.73081 18.2793C7.4802 18.0307 7.33823 17.693 7.33594 17.34V6.65998Z"
                                fill="white" />
                            <rect x="11.5" y="32" width="1" height="40" rx="0.5" fill="#091E42" fill-opacity="0.14" />
                        </svg>

                        <svg v-if="department.toLowerCase() == 'logistics'" width="24" height="72" viewBox="0 0 24 72"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
                                fill="#22A06B" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.3918 6.16268C11.7384 6.05144 12.1089 6.03692 12.4631 6.12068L12.6131 6.16268L16.9691 7.56001C17.0958 7.60201 17.2098 7.68068 17.2931 7.79068L17.3398 7.86068L19.1731 11.0253C19.2195 11.1053 19.2488 11.194 19.259 11.2858C19.2693 11.3777 19.2603 11.4707 19.2328 11.5589C19.2052 11.6471 19.1596 11.7286 19.0988 11.7982C19.038 11.8678 18.9635 11.9241 18.8798 11.9633L18.7998 11.9947L17.4325 12.4333V15.32C17.4324 15.5839 17.354 15.8419 17.2072 16.0612C17.0604 16.2805 16.8518 16.4513 16.6078 16.552L16.5065 16.5893L12.6131 17.8373C12.2665 17.9486 11.8961 17.9631 11.5418 17.8793L11.3918 17.838L7.49847 16.5893C7.24712 16.5086 7.02538 16.3551 6.86136 16.1482C6.69734 15.9414 6.59842 15.6905 6.57714 15.4273L6.57247 15.3193V12.4333L5.20514 11.9947C5.11721 11.9665 5.0361 11.9203 4.96695 11.8591C4.8978 11.7978 4.84213 11.7229 4.80346 11.6391C4.76478 11.5552 4.74396 11.4642 4.7423 11.3719C4.74063 11.2796 4.75818 11.1879 4.79381 11.1027L4.83181 11.0253L6.66514 7.86068C6.73386 7.74211 6.83745 7.6476 6.96181 7.59001L7.03514 7.56001L11.3918 6.16268ZM12.6691 12.2033V16.4193L16.0991 15.3193V12.8613L14.0391 13.522C13.907 13.5644 13.765 13.5645 13.6328 13.5223C13.5007 13.4801 13.3849 13.3978 13.3018 13.2867L13.2591 13.2213L12.6691 12.2033ZM11.3358 12.2033L10.7458 13.2213C10.6696 13.3529 10.5507 13.4544 10.4088 13.5091C10.2669 13.5638 10.1106 13.5684 9.96581 13.522L7.90581 12.8613V15.3193L11.3358 16.42V12.2033ZM7.54914 8.99335L6.40047 10.978L9.86114 12.0887L11.0111 10.104L7.54914 8.99335ZM16.4558 8.99335L12.9938 10.104L14.1431 12.0887L17.6045 10.978L16.4558 8.99335ZM12.2058 7.43201C12.1003 7.39831 11.988 7.39143 11.8791 7.41201L11.7991 7.43201L9.42247 8.19468L12.0025 9.02201L14.5825 8.19468L12.2058 7.43201Z"
                                fill="white" />
                            <rect x="11.5" y="32" width="1" height="40" rx="0.5" fill="#091E42" fill-opacity="0.14" />
                        </svg>


                        <div class="flex-1 content">
                            <h3 class="capitalize department">{{ department }}</h3>
                            <div class="flex items-start justify-between gap-2">
                                <div class="flex items-center flex-1 gap-x-2">
                                    <span class="stage">{{ stage.replace("to", "→") }}</span>
                                </div>
                                <div class="time">
                                    <span class="label">Time Taken:</span>

                                    <span class="value">{{ format(time) }}</span>
                                </div>
                            </div>
                        </div>
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
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';

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

const loading = ref(false);
const orderGroup = ref<null | OrderInterface>(null);
const isViewOrderTimingModalOpen = ref(false);
const timing = ref([])
const toast = useToast();


watch(() => props.orderId, async (newVal) => {
    if (newVal > 0) {
        getOrderTimings();
    }
}, { immediate: true })

const getOrderTimings = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/order_groups/${props.orderId}/timing`).then(res => {
        timing.value = res.data.timing_data;
        orderGroup.value = res.data.order_group;
        isViewOrderTimingModalOpen.value = true;
    }).catch(err => {
        toast.error("Error getting order timing data");
    })
        .finally(() => {
            loading.value = false;
        })
}

const rangeOfYears = computed(() => {
    let currentYear = new Date().getFullYear();
    return [...Array(currentYear).keys()].map(i => i + (currentYear - 5)).filter(i => i >= currentYear - 5 && i <= currentYear);
})

const showData = computed(() => {
    return (stages) => {
        if (Array.isArray(stages) && stages.length > 0) return true;
        else if (Object.keys(stages).length > 0) return true;
        else return false;
    }
})

const getExtraHeader = computed(() => {
    return `<span class="flex items-center">
                <span class="return_ref">REF: ${orderGroup.value?.ref_no}</span>
            </span>`;
})

const format = (time_in_seconds) => {
    if (time_in_seconds > 0 && time_in_seconds < 60) return time_in_seconds + ` second(s)`;
    if (time_in_seconds >= 60 && time_in_seconds < 3600) return Math.round(time_in_seconds / 60) + ` minute(s)`;
    if (time_in_seconds >= 3600 && time_in_seconds < 86400) return Math.round(time_in_seconds / (60 * 60)) + ` hour(s)`;
    if (time_in_seconds >= 86400) return Math.round(time_in_seconds / (60 * 60 * 24)) + ` day(s)`;
    if (time_in_seconds == 0) return 'Pending';
}

</script>

<style>
.content .department {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.content .stage {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(68, 84, 111, 1);
}

.content .time .label {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(98, 111, 134, 1);
}

.content .time .value {
    color: rgb(35, 40, 49);
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    margin-left: 0.3em;
}
</style>