<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <!-- view product return print note modal -->
    <SideBarModal title="Print Return Note" :is-open="isViewProductReturnPrintNoteModalOpen" width="xl"
        ref="viewProductReturnPrintNoteModal" @update:is-open="isViewProductReturnPrintNoteModalOpen = $event"
        :initial-form-data="productReturn" @close="isViewProductReturnPrintNoteModalOpen = false"
        :extra-header="getModalExtraHeader">

        <!-- Main content -->
        <template #default>
            <div class="space-y-6 print_note">
                <div class="flex items-center justify-between mb-4">
                    <!-- logo -->
                    <svg width="273" height="61" viewBox="0 0 273 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M30.2513 55.4589C44.1735 55.4589 55.4596 44.1727 55.4596 30.2506C55.4596 16.3284 44.1735 5.04224 30.2513 5.04224C16.3291 5.04224 5.04297 16.3284 5.04297 30.2506C5.04297 44.1727 16.3291 55.4589 30.2513 55.4589Z"
                            fill="#3858CF" />
                        <path
                            d="M38.4643 33.9385V37.7626C38.4643 38.0147 38.4643 38.2895 38.4291 38.5466C38.2318 40.6632 37.2528 42.6304 35.6833 44.0643C34.1139 45.4981 32.0664 46.2957 29.9406 46.3013C27.8148 46.307 25.7631 45.5203 24.186 44.0949C22.6089 42.6695 21.6195 40.7075 21.4109 38.592C19.5018 38.1776 17.7923 37.1219 16.5669 35.6006C15.3414 34.0792 14.674 32.1841 14.6758 30.2306C14.6776 28.277 15.3484 26.3831 16.5766 24.864C17.8048 23.3448 19.5162 22.2922 21.426 21.8814C22.0149 21.7522 22.6155 21.6846 23.2183 21.6797H24.746C24.6769 22.0241 24.6423 22.3746 24.6426 22.7258V26.6205C24.6426 27.0551 24.47 27.4719 24.1627 27.7791C23.8554 28.0864 23.4386 28.2591 23.0041 28.2591C22.5695 28.2591 22.1527 28.0864 21.8455 27.7791C21.5382 27.4719 21.3655 27.0551 21.3655 26.6205V25.287C20.3595 25.6639 19.4924 26.3389 18.8803 27.2218C18.2682 28.1047 17.9402 29.1535 17.9402 30.2278C17.9402 31.3022 18.2682 32.3509 18.8803 33.2339C19.4924 34.1168 20.3595 34.7918 21.3655 35.1687C21.9562 35.3911 22.5822 35.5047 23.2133 35.5039H25.7341C26.1687 35.5039 26.5855 35.6766 26.8928 35.9839C27.2001 36.2911 27.3727 36.7079 27.3727 37.1425C27.3727 37.577 27.2001 37.9938 26.8928 38.3011C26.5855 38.6084 26.1687 38.781 25.7341 38.781H24.7409C24.9985 40.0636 25.7232 41.2049 26.7744 41.9835C27.8257 42.7621 29.1286 43.1227 30.4306 42.9952C31.7325 42.8677 32.9408 42.2613 33.8211 41.2936C34.7013 40.3259 35.1909 39.0658 35.1948 37.7576V33.9385C35.1948 33.5039 35.3675 33.0872 35.6747 32.7799C35.982 32.4726 36.3988 32.3 36.8334 32.3C37.2679 32.3 37.6847 32.4726 37.992 32.7799C38.2993 33.0872 38.4719 33.5039 38.4719 33.9385H38.4643Z"
                            fill="white" />
                        <path
                            d="M38.4641 22.7361V25.3704C37.8197 25.0974 37.1271 24.9568 36.4273 24.9569H33.8434C33.4088 24.9569 32.9921 24.7843 32.6848 24.477C32.3775 24.1697 32.2049 23.753 32.2049 23.3184C32.2049 22.8838 32.3775 22.4671 32.6848 22.1598C32.9921 21.8525 33.4088 21.6799 33.8434 21.6799H35.0887C34.8438 20.4902 34.1959 19.4215 33.2544 18.6542C32.313 17.8868 31.1356 17.4677 29.921 17.4677C28.7064 17.4677 27.529 17.8868 26.5876 18.6542C25.6461 19.4215 24.9982 20.4902 24.7533 21.6799H23.2181C22.6153 21.6848 22.0146 21.7524 21.4258 21.8815C21.6403 19.7711 22.632 17.8158 24.2079 16.3957C25.7839 14.9757 27.8315 14.1924 29.9529 14.198C32.0742 14.2037 34.1177 14.9979 35.686 16.4263C37.2544 17.8548 38.2356 19.8153 38.4389 21.9269C38.4557 22.1941 38.4641 22.4638 38.4641 22.7361Z"
                            fill="#7CCF24" />
                        <path
                            d="M44.9747 30.2505C44.9721 32.171 44.3246 34.0349 43.1361 35.5433C41.9477 37.0518 40.287 38.1174 38.4205 38.5693C38.4457 38.3172 38.4558 38.05 38.4558 37.7853V35.1032C39.415 34.7014 40.2341 34.0251 40.8102 33.1593C41.3862 32.2934 41.6936 31.2766 41.6936 30.2367C41.6936 29.1967 41.3862 28.1799 40.8102 27.3141C40.2341 26.4483 39.415 25.772 38.4558 25.3702V22.7359C38.4558 22.4637 38.4432 22.194 38.418 21.9268C40.2858 22.3783 41.9476 23.4445 43.1367 24.954C44.3258 26.4636 44.9731 28.3289 44.9747 30.2505Z"
                            fill="#7CCF24" />
                        <path
                            d="M72.6696 32.9425C73.3802 33.5041 73.9687 34.2049 74.3989 35.002C74.9432 36.0616 75.2242 37.2367 75.2181 38.4278V38.8942H72.5108V38.4278C72.5121 37.8521 72.3997 37.2818 72.18 36.7497C71.9603 36.2175 71.6376 35.734 71.2305 35.3269C70.8234 34.9198 70.3399 34.5971 69.8077 34.3774C69.2756 34.1577 68.7053 34.0453 68.1296 34.0466H65.581V38.8942H62.8711V21.6643H69.0723C70.7143 21.6676 72.2881 22.3207 73.4501 23.4807C74.612 24.6408 75.2676 26.2136 75.2736 27.8555C75.2761 28.992 74.9618 30.1067 74.3661 31.0746C73.7737 32.0148 73.209 32.6375 72.6696 32.9425ZM65.581 24.3717V31.3367H69.0723C69.5376 31.3493 70.0006 31.2684 70.434 31.0991C70.8675 30.9297 71.2626 30.6752 71.5961 30.3505C71.9296 30.0259 72.1946 29.6378 72.3756 29.209C72.5566 28.7803 72.6498 28.3196 72.6498 27.8542C72.6498 27.3888 72.5566 26.9282 72.3756 26.4994C72.1946 26.0707 71.9296 25.6825 71.5961 25.3579C71.2626 25.0333 70.8675 24.7788 70.434 24.6094C70.0006 24.44 69.5376 24.3592 69.0723 24.3717H65.581Z"
                            fill="#3858CF" />
                        <path
                            d="M88.8084 36.1746V38.882H78.168V21.6521H88.8084V24.362H80.8753V28.8667H87.2707V31.5766H80.8753V36.1746H88.8084Z"
                            fill="#3858CF" />
                        <path
                            d="M110.225 38.8818H107.427L105.093 29.1514L100.576 40.2431L96.1262 29.169L93.8045 38.8768H91.0039L95.4985 20.2478L100.583 32.9881L105.741 20.2856L110.225 38.8818Z"
                            fill="#3858CF" />
                        <path
                            d="M123.707 36.1746V38.882H113.066V21.6521H123.707V24.362H115.774V28.8667H122.172V31.5766H115.774V36.1746H123.707Z"
                            fill="#3858CF" />
                        <path
                            d="M126.27 38.882V21.6521H132.199C133.353 21.6491 134.495 21.8815 135.556 22.3353C137.616 23.2114 139.255 24.8513 140.132 26.9106C140.685 28.2203 140.906 29.6468 140.775 31.0627C140.643 32.4786 140.163 33.84 139.378 35.0253C138.592 36.2107 137.526 37.1832 136.273 37.8561C135.02 38.5291 133.621 38.8815 132.199 38.882H126.27ZM132.211 36.1746C133.378 36.1724 134.519 35.8243 135.488 35.1744C136.458 34.5245 137.213 33.6018 137.659 32.5229C138.104 31.4441 138.22 30.2573 137.992 29.1126C137.764 27.9679 137.201 26.9166 136.376 26.0913C135.837 25.5337 135.189 25.0925 134.473 24.795C133.756 24.4976 132.987 24.3502 132.211 24.362H128.876V36.1746H132.211Z"
                            fill="#3858CF" />
                        <path d="M143.41 38.882V21.6521H146.12V38.882H143.41Z" fill="#3858CF" />
                        <path
                            d="M162.847 38.882H159.936L158.718 35.857H152.436L151.219 38.882H148.305L155.577 20.8782L162.847 38.882ZM157.624 33.1698L155.575 28.1054L153.52 33.1698H157.624Z"
                            fill="#3858CF" />
                        <path d="M167.756 36.1746H176.142V38.882H165.051V21.6521H167.761L167.756 36.1746Z"
                            fill="#3858CF" />
                        <path
                            d="M196.171 21.6521V38.882H193.461V31.6119H185.586V38.882H182.879V21.6521H185.586V28.902H193.461V21.6521H196.171Z"
                            fill="#3858CF" />
                        <path
                            d="M210.086 36.1746V38.882H199.445V21.6521H210.086V24.362H202.168V28.8667H208.563V31.5766H202.168V36.1746H210.086Z"
                            fill="#3858CF" />
                        <path
                            d="M226.105 38.882H223.191L221.974 35.857H215.692L214.474 38.882H211.562L218.833 20.8782L226.105 38.882ZM220.882 33.1698L218.833 28.1054L216.796 33.1698H220.882Z"
                            fill="#3858CF" />
                        <path d="M231.006 36.1746H239.392V38.882H228.301V21.6521H231.011L231.006 36.1746Z"
                            fill="#3858CF" />
                        <path d="M251.682 21.6521V24.362H245.902V38.882H243.192V24.362H237.344V21.6521H251.682Z"
                            fill="#3858CF" />
                        <path
                            d="M267.205 21.6521V38.882H264.498V31.6119H256.618V38.882H253.91V21.6521H256.618V28.902H264.495V21.6521H267.205Z"
                            fill="#3858CF" />
                    </svg>

                    <div class="text-right header">
                        <h3>Return ID</h3>
                        <p class="mb-4">{{ productReturn.order_group.ref_no }}</p>
                        <h3>Date</h3>
                        <p class="flex items-start">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z"
                                    fill="#091E42" fill-opacity="0.31" />
                            </svg>

                            <span>{{ dayjs(productReturn.created_at).format('DD/MM/YYYY hh:mmA') }}</span>
                        </p>
                    </div>
                </div>

                <div class="order_group_content">
                    <h3 class="mb-4">Product Return Note</h3>
                    <div class="grid grid-cols-3">
                        <div>
                            <h4 class="mb-1">Customer’s Name</h4>
                            <p>{{ productReturn.user.name }}</p>
                        </div>
                        <div>
                            <h4 class="mb-1">Store Name</h4>
                            <p class="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z"
                                        fill="#091E42" fill-opacity="0.31" />
                                </svg>
                                <span>
                                    {{ productReturn.user.name }}
                                </span>
                            </p>
                        </div>
                        <div>
                            <h4 class="mb-1">Reason</h4>
                            <p>{{ productReturn.reason }}</p>
                        </div>
                    </div>
                </div>

                <div class="overflow-hidden border rounded-lg products">
                    <div class="overflow-x-auto">
                        <table class="w-full table-auto">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="p-2 text-left">Product Name</th>
                                    <th class="p-2 text-left">Quantity</th>
                                    <th class="p-2 text-left">Unit Price</th>
                                    <th class="p-2 text-left">Price Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, index in productReturn.items" :key="`return_items_${index}`"
                                    class="border-t">
                                    <td class="p-2">{{ item.order.product.name }}</td>
                                    <td class="p-2">{{ toLocale(item.total_quantity) }}</td>
                                    <td class="p-2">₦{{ toLocale(item.order.price_on_purchase) }}</td>
                                    <td class="p-2">₦{{ toLocale(item.total_quantity * item.order.price_on_purchase) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3">
                                        Total Refund Amount
                                    </td>
                                    <td>₦{{ getTotalAmount }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="closeModal" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="printContent" type="button" class="flex items-center approve_btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Print</span>
                </button>
            </div>
        </template>
    </SideBarModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import dayjs from 'dayjs';
import { toLocale } from '@/views/helpers/useLocale.js';

interface Props {
    productReturnId: number;
}

const emit = defineEmits<{
    printNoteClosed: []
}>()

const props = defineProps<Props>();

watch(() => props.productReturnId, (newVal) => {
    if (newVal > 0) getProductReturn();
})
const isViewProductReturnPrintNoteModalOpen = ref(false);

watch(isViewProductReturnPrintNoteModalOpen, (newVal) => {
    if (!newVal) emit('printNoteClosed');
})

const toast = useToast()
const loading = ref(false);
const productReturn = ref({
    items: [],
    driver: {},
    logs: [],
    order_group: {
        ref_no: ''
    },
    store: {
        name: ''
    },
    user: {
        name: '',
        user_type: '',
        phone: '',
        email: ''
    },
    status_text: '',
    status: -1,
    transit_status: -1,
    transit_status_text: '',
    return_to_stock: 0,
    warehouse: {
        name: ''
    },
    reason: '',
    rejection_reason: '',
    created_at: ''
})

const getModalExtraHeader = computed(() => {
    return `<span class="flex items-center gap-x-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="3.75" fill="#F7F8F9"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91786 5.83325C7.45578 5.83325 7.08203 6.20492 7.08203 6.66242V13.3374C7.08346 13.558 7.1722 13.7691 7.32883 13.9245C7.48546 14.0799 7.69724 14.1669 7.91786 14.1666H12.0795C12.5416 14.1666 12.9154 13.7953 12.9154 13.3374V6.66242C12.9154 6.20742 12.5412 5.83325 12.0795 5.83325H7.91786ZM8.7487 7.49992H11.2487C11.4788 7.49992 11.6654 7.68647 11.6654 7.91659C11.6654 8.1467 11.4788 8.33325 11.2487 8.33325H8.7487C8.51858 8.33325 8.33203 8.1467 8.33203 7.91659C8.33203 7.68647 8.51858 7.49992 8.7487 7.49992ZM11.2487 8.74992H8.7487C8.51858 8.74992 8.33203 8.93647 8.33203 9.16659C8.33203 9.3967 8.51858 9.58325 8.7487 9.58325H11.2487C11.4788 9.58325 11.6654 9.3967 11.6654 9.16659C11.6654 8.93647 11.4788 8.74992 11.2487 8.74992ZM8.7487 9.99992H9.58203C9.81215 9.99992 9.9987 10.1865 9.9987 10.4166C9.9987 10.6467 9.81215 10.8333 9.58203 10.8333H8.7487C8.51858 10.8333 8.33203 10.6467 8.33203 10.4166C8.33203 10.1865 8.51858 9.99992 8.7487 9.99992Z" fill="#44546F"/>
                </svg>
                <span class="return_ref">${productReturn.value?.order_group?.ref_no}</span>
            </span>`
})

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

const getProductReturn = () => {
    loading.value = true;
    axios.get(
        import.meta.env.VITE_API_URL +
        "product_returns/" +
        props.productReturnId + '/show'
    )
        .then(response => {
            productReturn.value = response.data;
            isViewProductReturnPrintNoteModalOpen.value = true;
        }).catch(err => error(err))
        .finally(() => loading.value = false);
}

const getTotalAmount = computed(() => {
    let amount = 0;
    productReturn.value.items.forEach((item, id) => {
        if (item.order != null) {
            if (item.order.product != undefined) {
                amount += item.order.price_on_purchase * item.total_quantity;
            }
        }
    });
    return amount;
})

const printContent = (elementSelector = '.print_note') => {
    // Handle case where event object is passed instead of selector
    if (typeof elementSelector !== 'string') {
        elementSelector = '.print_note';
    }

    const printContent = document.querySelector(elementSelector);
    if (!printContent) {
        console.error('Print content not found');
        return;
    }

    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .print_note { max-width: 800px; margin: 0 auto; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .header h3 { margin: 0 0 5px 0; font-size: 14px; }
        .header p { margin: 0 0 10px 0; font-size: 12px; }
        h3 { font-size: 18px; margin: 20px 0 10px 0; }
        h4 { font-size: 14px; margin: 10px 0 5px 0; }
        p { font-size: 12px; margin: 5px 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .flex { display: flex; align-items: center; gap: 8px; }
        @media print {
          body { margin: 0; }
          .print_note { margin: 0; }
        }
      </style>
    </head>
    <body>
      ${printContent.innerHTML}
    </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
};
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

.print_note {
    background: rgba(247, 248, 249, 1);
    padding: 12px;
    border-radius: 8px;
}

.print_note .header h3 {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.print_note .header p {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}

.print_note .order_group_content h3 {
    font-size: 16px;
    font-style: normal;
    font-weight: 590;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.print_note .order_group_content h4 {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.print_note .order_group_content p {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}

.print_note .products table thead tr th {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.print_note .products {
    border: 1px solid rgba(9, 30, 66, 0.14);
}

.print_note .products table tbody tr:nth-child(odd) {
    background: white;
}

.print_note .products table tbody tr {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.print_note .products table tfoot {
    font-size: 16px;
    font-style: normal;
    font-weight: 590;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.print_note .products table tfoot td {
    padding: 16px 8px;
}
</style>