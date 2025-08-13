<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- create customer modal -->
    <SideBarModal title="Customer Details" :is-open="isViewCustomerModalOpen" width="xl" :initial-form-data="user"
        @close="closeModal" :extraHeader="getExtraHeader">

        <!-- Main content -->
        <template #default="{ formData, updateFormData, isEditItem }">
            <div class="mb-4 space-y-6">
                <!-- Customer Header -->
                <div class="flex flex-wrap gap-4 customer_summary sm:justify-between">
                    <div class="flex flex-1 user_detail_summary gap-x-3">
                        <img :src="formData.picture_url" alt="" v-if="formData.picture_url" class="user_image">
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
                                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAV+SURBVHgB7Z0/aBVZFMaPu4qbNLsYMSwh7sK6uzYRIhhEEQstBEURG4ld7CRgZylWgtimVRv/gYooCpFYKJoUsYiYxj9pTEhhiKKIRiudb56johZPncmc757vB48JkfB87/7uuXfu3HvOgr79h9+ZCMsvJkIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYKz0ALQ2rLYOjvarbvrP1u65Pf8Z/yuteW3/N9fz72xp89eZNe3Njn9xMbGH9qDiUmLwIKUN4T8v2K5re9ZlTX8vx8bu1kgxdj4IxsevZe0DEkKgIbfsWVDfi0DCHDm4pBNTc9YaiQlAMI6Gn7zxjVWBcOj43Z58JbNZsNFKiQzB8C43r93Vz7GV8X6nq48qhwdOJWMBEncBWCcP9DfW2njF+A9jhzcl8uQAvQRAI3f17vV5pu+3m35FcMCM9QRAOG4jsYvgARlTTTrglYAhOKiF9ZJ1fOOqqEVAI3v4YvH+oIHEX8USgGK2bgXGgtOnJNCSgG2Z/f63ti9c3O+DsEGnQDoaR7HXAwFVS1AVQmdAB57f8Hq7GETG1QCYKz1POPGaiTbbSGVAN0EPUwCVMjyrId5Z+WKv4wJuiHAO50dy4wJGgE6CXo/wN0A08ogjQBM99htEqB8vndLV51IgApgXGVjgEYA7Nhl4SnRbiEaAVLah+cJGgHm5t4YC1PTT4wFqgjwmkAC/B+ZhiuqhaAHE1PmHbZDJFQC3J94bN7BsTImqAQYIdiBqwhQIRhfPX/B6P1sdyt0G0IuDd4yrwzdvGNs0AmACOAxCmB+wniKmHJTqMcocOL0VWOEUgD0NE/h9hLxiWHagyFnL153EXKx6nd58LaxQn028PjpK7X2PLz3wLELxgy1AGiAus7q1/neZUKfH6COhkDYTyVJxK/dazcdMnLw8AWrhIsWLbR//u6wKsHkE0PPi5evLAWSSRGDVUJMDNE7cXqo7I2Z6O1o+NQyhiWXJxAZO/DCGcIyRIBY6PXXsxfTY95mSTZRZCECThMhTyCuzW4sbeQIfJj/feoJI5NOFPklOFvQyBS67KvIgBCPvXyT0zNUO3p+lhCpYgvQsFMfUsGKBkoWHRwJEBwJEBwJEBy3k0DM0pEFFEfCMWtnOhsIcCuJ7OKoP4A1BK/Lxu5uA9HwWMBJJRdvgddM464iAO7TkfSZrbc3Q5HbcODYeVd1B9zMAVJu/AJEtwP9e1xlEXEhAL4Y5NxNufEL8BkhgZcsIi4EqOLpnWcgATKLeqB2ARqz/bQmfM2Ah1MehoLaBWBMr1oWHvIe1i4AQ+6/qvCQU7B2Adjy6pWJhgDjyv5VNh4+u54FBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBKd2ARiqgVaFh89euwAM1UCrwkMa2toFGLo5alHxkLHUQQTwWQaualBmbthBJVQXk8C6a//MN/isXsrMuRAglfo7zeDts7q5DSy+mJRTtSPsexPdVc0gVOS4MTKWX/9sb0smdwBu985fuWEnz11zV3XEZapYpFa9m82Q1/V05eliWTOIMZSbcV8xpLVlcZ5MCTJ4yKnTDAj1Y+OPbGT0nvs6Q1QlYxAJkG7Vmwzo6ZN5JRKORv8cqpIxmDzNfigGBRqZxNvzK+SYr4xjs8+e52sXRX0hvFgriiVXNKooDNWWvYorhhFMKHEFS5f88c2/RcN++rlRRAoNi5/n8l4+k/3ueVLl45IrGlX0SNEcehwcHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQnPeNKiSCDjkSyAAAAABJRU5ErkJggg==" />
                            </defs>
                        </svg>

                        <div class="flex-1 user_contact">
                            <h6 class="mb-1 capitalize">{{ formData.name || 'New Customer' }}</h6>
                            <div class="flex flex-wrap items-baseline gap-x-3">
                                <span class="flex items-center gap-x-1 phone_number">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5.83464 1.66669C4.91416 1.66669 4.16797 2.41288 4.16797 3.33335V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33335C15.8346 2.41288 15.0884 1.66669 14.168 1.66669H5.83464ZM14.168 3.33335H5.83464V14.1667H14.168V3.33335ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z"
                                            fill="#091E42" fill-opacity="0.31" />
                                    </svg>
                                    <span class="">{{ formData.phone || 'No phone' }}</span>
                                </span>
                                <span class="flex items-center gap-x-1 phone_number">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    <span class="">{{ formData.email || 'No email' }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- status -->
                    <div class="status_summary">
                        <h6 class="mb-2">Status</h6>
                        <div class="flex gap-x-3">
                            <span class="enabled" v-if="formData.status === 1">
                                Enabled</span>
                            <span class="disabled" v-else>
                                Disabled</span>

                            <span class="flex items-center gap-x-1 tier">
                                Verified: Tier {{ formData.kyc_level }}
                                <svg width="13" height="13" viewBox="0 0 10 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_8591_69653)">
                                        <path
                                            d="M4.9987 6.25002C6.60953 6.25002 7.91536 4.94418 7.91536 3.33335C7.91536 1.72252 6.60953 0.416687 4.9987 0.416687C3.38787 0.416687 2.08203 1.72252 2.08203 3.33335C2.08203 4.94418 3.38787 6.25002 4.9987 6.25002Z"
                                            stroke="#0055CC" stroke-width="0.833333" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M3.42214 5.78749L2.91797 9.58332L5.0013 8.33332L7.08463 9.58332L6.58047 5.78333"
                                            stroke="#0055CC" stroke-width="0.833333" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8591_69653">
                                            <rect width="10" height="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="border-b content_tabs">
                <nav class="flex space-x-8">
                    <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="getTabClass(tab)"
                        class="py-2 text-sm font-medium transition-colors border-b-2 tab">
                        {{ tab }}
                    </button>
                </nav>
            </div>

            <!-- Summary Tab Content -->
            <div v-if="activeTab === 'Summary'" class="space-y-6">
                <div class="grid gap-4 my-2 sm:grid-cols-2 grid-col-1">
                    <div>
                        <p class="title">Name</p>
                        <p class="value">{{ formData.name }}</p>
                    </div>
                    <div>
                        <p class="title">Email</p>
                        <p class="value">{{ formData.email ?? 'Nil' }}</p>
                    </div>
                    <div>
                        <p class="title">Phone</p>
                        <p class="value">{{ formData.phone ?? 'Nil' }}</p>
                    </div>
                    <div>
                        <span class="title">Agent</span>
                        <span class="flex items-center gap-x-2 value" v-if="formData.agent">
                            <img :src="formData.agent.picture_url" alt="" v-if="formData.agent.picture_url">
                            <svg v-else width="30" height="30" viewBox="0 0 44 44" fill="none"
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
                            <span>
                                <span class="text-xs">Name: {{ formData.agent.name }}</span> <br>
                                <span class="text-xs">Phone: {{ formData.agent.phone ?? 'Nil' }}</span>
                            </span>
                        </span>
                        <span class="value" v-else>Nil</span>
                    </div>
                    <div class="sm:col-span-2">
                        <p class="title">Date of Account Creation</p>
                        <p class="flex items-center value gap-x-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z"
                                    fill="#626F86" />
                            </svg>

                            <span>{{ dayjs(formData.created_at).format('DD/MM/YYYY') }}</span>
                        </p>
                    </div>
                </div>

                <!-- customer type -->
                <div class="customer_type">
                    <h3 class="header">Customer Type</h3>

                    <div class="flex items-center gap-x-2">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7.5" r="7" fill="#091E42" fill-opacity="0.03" />
                            <circle cx="7" cy="7.5" r="6" stroke="#091E42" stroke-opacity="0.06" stroke-width="2" />
                            <circle cx="7" cy="7.5" r="2" fill="#091E42" fill-opacity="0.31" />
                        </svg>
                        <span class="capitalize value">{{ formData.user_type }}</span>
                    </div>
                </div>

                <!-- bank account type -->
                <div class="customer_type">
                    <h3 class="header">Bank Details</h3>
                    <div class="grid gap-4 my-2 sm:grid-cols-2 grid-col-1"
                        v-for="account, index in formData.monnify_account" :key="`account-${index}`">
                        <div>
                            <p class="title">Account Number</p>
                            <p class="value">{{ account.account_number }}</p>
                        </div>
                        <div>
                            <p class="title">Bank</p>
                            <p class="flex items-center capitalize value gap-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
                                        fill="#44546F" />
                                </svg>

                                <span>{{ account.bank_name }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Kyc Level type -->
                <div class="customer_type">
                    <h3 class="header">KYC Verification</h3>
                    <!-- Progress Line -->
                    <KycLevelProgress ref="kycRef" :initial-kyc-level="formData.kyc_level" />
                </div>
            </div>
            <div v-if="activeTab === 'Stores'" class="space-y-6">
                <DatatableTable :columns="userStoresColumns" :url="storesUrl" :filterByDate="false"
                    pagename="CustomerStores">
                    <template #column="col">
                        <span v-if="col.props.column.field === 'status'">
                            <!-- <Tooltip :text="`${col.props.row.status}`"> -->
                            <span :class="[
                                'px-2 py-1 rounded-md medium-text line-clamp-2 w-fit',
                                statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
                                'bg-gray-100 text-gray-800',
                            ]">
                                {{ col.props.row.status ? 'Enabled' : 'Disabled' }}
                            </span>
                            <!-- </Tooltip> -->
                        </span>
                        <span v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </DatatableTable>
            </div>
            <div v-if="activeTab === 'Orders'" class="space-y-6">
                <DatatableTable :columns="userOrdersColumns" :url="ordersUrl" :filterByDate="false"
                    pagename="CustomerOrders">

                </DatatableTable>
            </div>
            <div v-if="activeTab === 'Discount'" class="space-y-6">
                <DatatableTable :columns="userDiscountsColumns" :url="discountUrl" :filterByDate="false"
                    pagename="CustomerDiscounts">

                </DatatableTable>
            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <!-- <button @click="showDiscardCreateCustomerModal = true" type="button" class="cancel_btn">
                    Cancel
                </button> -->
                <button @click="isViewCustomerModalOpen = false" type="button" class="approve_btn">
                    Close
                </button>
            </div>
        </template>
    </SideBarModal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, toRef } from 'vue'
import dayjs from 'dayjs';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import axios from 'axios';
import KycLevelProgress from './KycLevelProgress.vue';
import DatatableTable from "@/views/Components/Datatable/Datatable.vue";
import { TableColumn } from '@/types';
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from '@/views/helpers/useLocale.js'

interface Props {
    customerId: number
}
const statusClasses = {
    Enabled: "bg-green-100 text-green-800",
    Disabled: "bg-red-100 text-red-800",
};
const props = defineProps<Props>();

onMounted(() => {
    getAgents();
    getPlans();
});

const customerId = toRef(props, 'customerId');


watch(customerId, async (newVal, oldVal) => {
    if (newVal > 0) {
        try {
            loading.value = true;
            await getCustomer();
            await getBalances();
            loading.value = false;
            isViewCustomerModalOpen.value = true;
        } catch (err) {
            console.error('Failed to load customer or balances', err);
            loading.value = false;
        }
    }
}, { immediate: false });

const userStoresColumns = ref<TableColumn[]>([
    { label: "ID", field: "id", sortable: true },
    { label: "Store Name", field: "name", sortable: true },
    { label: "Status", field: "status", sortable: true },
    { label: "Address", field: "address", sortable: true },
])

const userDiscountsColumns = ref<TableColumn[]>([
    { label: "discount", field: "discount", sortable: true, format: (value) => value + '%' },
    { label: "Start Date", field: "start_date", sortable: true, format: (value) => dayjs(value).format('DD/MM/YYYY') },
    { label: "End Date", field: "end_date", sortable: true, format: (value) => dayjs(value).format('DD/MM/YYYY') },
    { label: "Target", field: "target", sortable: true, format: (value) => '₦' + value },
    { label: "Status", field: "status_text", sortable: false },
    { label: "Orders", field: "order_groups", sortable: false, format: (value) => value.map(order => order.ref_no).join(", \n") },
    { label: "Created At", field: "created_at", sortable: true, format: (value) => dayjs(value).format('DD/MM/YYYY') },
])


const userOrdersColumns = ref<TableColumn[]>([

    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Store',
        field: 'store.name',
        sortable: false,
    },
    {
        label: 'Item(s)',
        field: 'orders_count',
        sortable: false,
    },
    {
        label: 'Reference',
        field: 'ref_no',
        sortable: true,
    },
    {
        label: 'Payment',
        field: 'payment_method.display_name',
        sortable: false,
    },
    {
        label: 'Amount',
        field: 'total_amount',
        sortable: false,
        format: (value) => "₦" + toLocale(value)
    },
    {
        label: 'Order Date',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Status',
        field: 'status_text',
        sortable: false,
    },
])

const storesUrl = computed(() => import.meta.env.VITE_API_URL + 'admin/users/' + customerId.value + '/paginated_stores')
const ordersUrl = computed(() => import.meta.env.VITE_API_URL + 'admin/users/orders/' + customerId.value)
const discountUrl = computed(() => import.meta.env.VITE_API_URL + 'admin/users/' + customerId.value + '/paginated_promo_discounts')

const url = computed(() => import.meta.env.VITE_API_V2_URL + 'users/' + customerId.value + '?kyc_verification');
const getUserType = computed(() => user.value.user_type ? user.value.user_type.toLowerCase() : user.value.user_type);

const toast = useToast();

// Reactive variables
const loading = ref(false);
const isViewCustomerModalOpen = ref(false);
const activeTab = ref('Summary');
const agents = ref([]);
const balances = ref({
    loan_balance: 0,
    wallet_balance: 0,
})
const user = ref({
    credit_option_id: '',
    user_type: '',
    agent_id: '',
    status: 0,
    picture_url: '',
    is_external: 0,
    credit_limit: 0,
    kyc_level: 1,
    credit_option: [],
    warning_tags: [],
    name: ''
});

const plans = ref([])

// Constants
const tabs = ['Summary', 'Stores', 'Orders', 'Discount'];

const getExtraHeader = computed(() => {
    return `<span class="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="3.75" fill="#F7F8F9" />
                    <g clip-path="url(#clip0_8591_68747)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.1654 9.99998C14.1654 12.3012 12.2999 14.1666 9.9987 14.1666C7.69751 14.1666 5.83203 12.3012 5.83203 9.99998C5.83203 7.69879 7.69751 5.83331 9.9987 5.83331C12.2999 5.83331 14.1654 7.69879 14.1654 9.99998ZM11.2487 8.74998C11.2487 9.44034 10.6891 9.99998 9.9987 9.99998C9.30834 9.99998 8.7487 9.44034 8.7487 8.74998C8.7487 8.05962 9.30834 7.49998 9.9987 7.49998C10.6891 7.49998 11.2487 8.05962 11.2487 8.74998ZM9.9987 13.3333C9.24115 13.3344 8.50601 13.0764 7.91536 12.6021V11.25C7.91536 10.7896 8.28495 10.4166 8.7487 10.4166H11.2487C11.7091 10.4166 12.082 10.7854 12.082 11.25V12.6021C11.5112 13.0596 10.787 13.3333 9.9987 13.3333Z"
                            fill="#44546F" />
                    </g>
                    <defs>
                        <clipPath id="clip0_8591_68747">
                            <rect width="10" height="10" fill="white" transform="translate(5 5)" />
                        </clipPath>
                    </defs>
                </svg>

                <span class="ml-1 text-sm name_tag">${user.value?.name}</span>
            </span>`
})

const getTabClass = (tab: string) => {
    if (activeTab.value === tab) {
        return 'active';
    }
    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
};


const closeModal = () => {
    isViewCustomerModalOpen.value = false;
};


const getAgents = () => {
    axios.get(`${import.meta.env.VITE_API_URL}agents/all`).then(res => {
        agents.value = res.data.agents;
    }).catch(err => {
        toast.error("Error getting agents!");
    })
}

const getBalances = () => {
    let url = import.meta.env.VITE_API_URL + 'users/' + customerId.value;
    axios.get(url + '/balances').then(res => {
        balances.value = {
            loan_balance: res.data.loan_balance,
            wallet_balance: res.data.wallet_balance,
        };
    }).catch(err => {
        toast.error("Error getting balances!")
    })
}

const getCustomer = () => {

    axios.get(url.value).then(res => {
        user.value = res.data;
        user.value.user_type = getUserType.value;
        if (user.value.credit_option) user.value.credit_option_id = user.value.credit_option.id;
        else user.value.credit_option_id = "";
    }).catch(err => {
        toast.error("Error getting customer!")
    })
}


const getPlans = () => {
    axios.get(import.meta.env.VITE_API_URL + 'credit_options').then(res => {
        plans.value = res.data;
    }).catch(err => {
        toast.error("Error loading plans");
    })
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
    padding: 2px 12px;
    border-radius: 6px;
    background: white;

}

.status_summary h6 {
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    color: rgba(98, 111, 134, 1);
}

.status_summary .enabled,
.status_summary .disabled,
.status_summary .tier {
    padding: 4px 6px;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 4px;
    border: 1px solid;
}

.status_summary .enabled {
    color: rgba(33, 110, 78, 1);
    background: rgba(220, 255, 241, 1);
    border-color: rgba(186, 243, 219, 1);
}

.status_summary .disabled {
    color: rgb(110, 33, 33);
    background: rgb(255, 220, 220);
    border: rgb(243, 186, 186);
}

.status_summary .tier {
    color: rgba(0, 85, 204, 1);
    background: rgba(233, 242, 255, 1);
    border-color: rgba(204, 224, 255, 1);
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

.modal_content div.space-y-6>div.customer_type {
    margin-top: 0;
}

.customer_type .header {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
    padding: 16px 0px;
    margin-bottom: 18px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.name_tag {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    /* 133.333% */
    text-transform: uppercase;
    color: rgba(98, 111, 134, 1);
}
</style>
