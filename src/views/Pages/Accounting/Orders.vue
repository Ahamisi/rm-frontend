<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / New" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="mainTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Download Button in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <Button 
            type="gray-btn"
            :onClick="downloadTimeTrackerReport"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Time Tracker Report
          </Button>
        </div>
      </Tabs>
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents h-[calc(100vh-190px)] flex flex-col">
      <div class="flex-1 flex flex-col min-h-0">
        <!-- New Tab -->
        <div class="flex-1 flex flex-col min-h-0">
          <Datatable 
            :items="newOrdersList" 
            :filterByDate="true" 
            :searchable="true"
            :sortable="true"
            :exportable="false"
            :printable="false"
            :columns="orderColumns" 
            pageName="AccountingNewOrders"
          >
            <template #column="col">
              <!-- Order No -->
              <span v-if="col.props?.column?.field === 'order_no'">
                {{ (col.props?.formattedRow as any)?.['order_no'] || col.props?.row?.order_no || '' }}
              </span>
              
              <!-- Customer Name -->
              <span v-else-if="col.props?.column?.field === 'customer_name'">
                {{ (col.props?.formattedRow as any)?.['customer_name'] || col.props?.row?.customer_name || '' }}
              </span>
              
              <!-- Store Name -->
              <span v-else-if="col.props?.column?.field === 'store_name'">
                {{ (col.props?.formattedRow as any)?.['store_name'] || col.props?.row?.store_name || '' }}
              </span>
              
              <!-- State -->
              <span v-else-if="col.props?.column?.field === 'state'">
                {{ (col.props?.formattedRow as any)?.['state'] || col.props?.row?.state || '' }}
              </span>
              
              <!-- Payment -->
              <span v-else-if="col.props?.column?.field === 'payment'">
                {{ (col.props?.formattedRow as any)?.['payment'] || col.props?.row?.payment || '' }}
              </span>
              
              <!-- Order Date -->
              <span v-else-if="col.props?.column?.field === 'order_date'">
                {{ formatDate((col.props?.formattedRow as any)?.['order_date'] || col.props?.row?.order_date || '') }}
              </span>
              
              <!-- Delivery Date -->
              <span v-else-if="col.props?.column?.field === 'delivery_date'">
                {{ formatDate((col.props?.formattedRow as any)?.['delivery_date'] || col.props?.row?.delivery_date || '') }}
              </span>
              
              <!-- Total Amount -->
              <span v-else-if="col.props?.column?.field === 'total_amount'">
                {{ formatCurrency((col.props?.formattedRow as any)?.['total_amount'] || col.props?.row?.total_amount || 0) }}
              </span>
              
              <!-- Tags -->
              <span v-else-if="col.props?.column?.field === 'tags'">
                <div class="flex flex-wrap gap-1">
                  <Pill 
                    v-for="tag in (col.props?.row?.tags || [])" 
                    :key="tag"
                    :type="getPillType(tag)"
                    :text="tag"
                  />
                </div>
              </span>
              
              <!-- Assigned -->
              <span v-else-if="col.props?.column?.field === 'assigned'">
                <div v-if="col.props?.row?.assigned && col.props?.row?.assigned !== 'Unassigned'" class="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#626F86"/>
                    <path d="M8 9C5.23858 9 3 11.2386 3 14V15H13V14C13 11.2386 10.7614 9 8 9Z" fill="#626F86"/>
                  </svg>
                  <span>{{ col.props?.row?.assigned }}</span>
                </div>
                <span v-else class="text-red-600">Unassigned</span>
              </span>
              
              <!-- Action -->
              <span v-else-if="col.props?.column?.field === 'action'">
                <TableActionDropdown :rowData="col.props?.row">
                  <template #default="{ selectedItem, closeDropdown }">
                    <!-- View Order -->
                    <li @click="viewOrder(selectedItem); closeDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                      </svg>
                      View Order
                    </li>
                    
                    <!-- Assign to me - only show if order is unassigned -->
                    <li v-if="!selectedItem.assigned || selectedItem.assigned === 'Unassigned'"
                        @click="assignToMe(selectedItem); closeDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#626F86"/>
                        <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#626F86"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#626F86"/>
                        <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#626F86"/>
                      </svg>
                      Assign to me
                    </li>

                    <!-- Change Status - disabled -->
                    <li @click="closeDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-not-allowed text-gray-400 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6.003V8.998C8 9.26322 8.10535 9.51757 8.29289 9.70511C8.48043 9.89264 8.73478 9.998 9 9.998C9.26521 9.998 9.51957 9.89264 9.7071 9.70511C9.89464 9.51757 10 9.26322 10 8.998V5.102C10 4.494 9.507 4 8.9 4H5C4.73438 4 4.47965 4.10551 4.29183 4.29333C4.10401 4.48115 3.9985 4.73589 3.9985 5.0015C3.9985 5.26711 4.10401 5.52185 4.29183 5.70967C4.47965 5.89748 4.73438 6.003 5 6.003H8Z" fill="#9CA3AF"/>
                        <path d="M9.428 18.018C7.351 16.989 6 14.807 6 12.37C6 10.104 7.167 8.051 9.02 6.945C9.5 6.659 9.666 6.023 9.391 5.524C9.32915 5.40677 9.24414 5.30331 9.14112 5.21991C9.03811 5.13651 8.91922 5.0749 8.79169 5.0388C8.66415 5.00271 8.53061 4.99289 8.39916 5.00994C8.26772 5.027 8.14111 5.07056 8.027 5.138C5.557 6.611 4 9.35 4 12.37C4 15.618 5.802 18.528 8.57 19.899C9.068 20.146 9.665 19.925 9.902 19.406C10.139 18.886 9.927 18.265 9.428 18.018Z" fill="#9CA3AF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 15.002V18.898C14 19.506 14.493 20 15.1 20H19C19.2656 20 19.5203 19.8945 19.7082 19.7067C19.896 19.5188 20.0015 19.2641 20.0015 18.9985C20.0015 18.7329 19.896 18.4782 19.7082 18.2903C19.5203 18.1025 19.2656 17.997 19 17.997H16V15.002C16 14.7368 15.8946 14.4824 15.7071 14.2949C15.5196 14.1074 15.2652 14.002 15 14.002C14.7348 14.002 14.4804 14.1074 14.2929 14.2949C14.1054 14.4824 14 14.7368 14 15.002Z" fill="#9CA3AF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.097 4.596C13.86 5.116 14.072 5.736 14.571 5.983C16.648 7.012 17.999 9.193 17.999 11.63C17.999 13.896 16.832 15.95 14.978 17.055C14.7456 17.1988 14.5776 17.4265 14.5087 17.6909C14.4398 17.9553 14.4753 18.2361 14.608 18.475C14.882 18.975 15.493 19.148 15.972 18.862C18.442 17.389 19.999 14.65 19.999 11.63C19.999 8.382 18.197 5.472 15.429 4.102C15.2965 4.03537 15.1503 4.00045 15.002 4C14.8098 4.00188 14.6223 4.05909 14.4618 4.16479C14.3013 4.27049 14.1746 4.4202 14.097 4.596Z" fill="#9CA3AF"/>
                      </svg>
                      Change Status
                    </li>
                    
                    <!-- Time Tracker -->
                    <li @click="openTimeTracker(selectedItem); closeDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM12.889 11.632V8.448C12.889 7.959 12.489 7.559 12 7.559C11.511 7.559 11.111 7.959 11.111 8.449V12.004C11.111 12.252 11.214 12.475 11.379 12.637L13.574 14.831C13.741 14.9972 13.9669 15.0904 14.2025 15.0904C14.4381 15.0904 14.664 14.9972 14.831 14.831C14.9969 14.6641 15.0899 14.4383 15.0899 14.203C15.0899 13.9677 14.9969 13.7419 14.831 13.575L12.889 11.632Z" fill="#626F86"/>
                      </svg>
                      Time Tracker
                    </li>
                    
                    <!-- Activity Log -->
                    <li @click="openActivityLog(selectedItem); closeDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z" fill="#626F86"/>
                        <path d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z" fill="#626F86"/>
                        <path d="M11 15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15Z" fill="#626F86"/>
                      </svg>
                      Activity Log
                    </li>
                  </template>
                </TableActionDropdown>
              </span>
            </template>
          </Datatable>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <SideBarModal
      v-if="isOrderDetailsModalOpen"
      :isOpen="isOrderDetailsModalOpen"
      width="xl"
      @close="isOrderDetailsModalOpen = false"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Order Details</h2>
            <p class="text-sm text-gray-600">REF: {{ selectedOrder?.order_no || '' }}</p>
          </div>
        </div>
      </template>

      <template #default>
        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-6">
          <button
            @click="modalActiveTab = 'details'"
            :class="[
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              modalActiveTab === 'details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Details
          </button>
          <button
            @click="modalActiveTab = 'activities'"
            :class="[
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              modalActiveTab === 'activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Activities
          </button>
        </div>

        <!-- Tab Content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Details Tab -->
          <div v-if="modalActiveTab === 'details'" class="space-y-6">
            <!-- Order Information -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Customer's Name</span>
                <span class="text-sm text-gray-900">{{ selectedOrder?.customer_name || '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Store Name</span>
                <span class="text-sm text-gray-900">{{ selectedOrder?.store_name || '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">State</span>
                <span class="text-sm text-gray-900">{{ selectedOrder?.state || '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Payment</span>
                <span class="text-sm text-gray-900">{{ selectedOrder?.payment || '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Order Date</span>
                <span class="text-sm text-gray-900">{{ formatDate(selectedOrder?.order_date || '') }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Delivery Date</span>
                <span class="text-sm text-gray-900">{{ formatDate(selectedOrder?.delivery_date || '') }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Total Amount</span>
                <span class="text-sm text-gray-900">{{ formatCurrency(selectedOrder?.total_amount || 0) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Assigned</span>
                <span class="text-sm text-gray-900">{{ selectedOrder?.assigned || 'Unassigned' }}</span>
              </div>
            </div>
          </div>

          <!-- Activities Tab -->
          <div v-else-if="modalActiveTab === 'activities'" class="space-y-4">
            <Activities :activities="orderActivities" :order-ref="selectedOrder?.order_no || ''" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end">
          <Button type="blue-btn" :onClick="() => isOrderDetailsModalOpen = false" classStyle="px-6 py-2">Close</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Time Tracker Modal -->
    <TimeTrackerModal
      :isOpen="showTimeTrackerModal"
      :orderRef="selectedOrder?.order_no || ''"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />

    <!-- Success Toast -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Tabs from "@/views/Components/Tabs.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Button from "@/views/Components/ui/Button.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import Activities from "@/views/Components/Activities.vue";
import TimeTrackerModal from "@/views/Components/TimeTrackerModal.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';
import dayjs from 'dayjs';

const activeTab = ref('New');

const mainTabs = ref([
  { name: 'New', count: 25 }
]);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
};

// Download functions
const downloadTimeTrackerReport = () => {
  toastMessage.value = 'Download Time Tracker Report Successful';
  showToast.value = true;
};

// Order Details Modal
const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

// Time Tracker Modal
const showTimeTrackerModal = ref(false);

// Toast state for assign
const showAssignToast = ref(false);

// View order handler
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

// Assign to me handler
const assignToMe = (order: any) => {
  selectedOrder.value = order;
  // Update the order in the list
  const newOrderIndex = newOrdersList.value.findIndex(o => o.id === order.id);
  if (newOrderIndex !== -1) {
    newOrdersList.value[newOrderIndex].assigned = 'Current User'; // Replace with actual user name
  }
  toastMessage.value = 'Order has been assigned to you successfully';
  showToast.value = true;
  showAssignToast.value = true;
};

// Open Time Tracker handler
const openTimeTracker = (order: any) => {
  selectedOrder.value = order;
  showTimeTrackerModal.value = true;
};

// Open Activity Log handler - opens modal with Activities tab
const openActivityLog = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};

// Table columns
const orderColumns: TableColumn[] = [
  { label: 'Order No.', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Payment', field: 'payment', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Delivery Date', field: 'delivery_date', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Tags', field: 'tags', sortable: false },
  { label: 'Assigned', field: 'assigned', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Utility functions
const formatDate = (date: string) => {
  if (!date) return '';
  return dayjs(date).format('M/D/YYYY');
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

const getPillType = (tag: string) => {
  switch (tag) {
    case 'Cash and Carry':
      return 'cash-and-carry';
    case 'Controlled':
      return 'controlled';
    case 'Hospital':
      return 'hospital';
    default:
      return 'hospital';
  }
};

// Mock data for New Orders
const newOrdersList = ref([
  { id: 1, order_no: 'RHPO-1651244220', customer_name: 'Fidson Healthcare', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Trade', order_date: '2024-05-21', delivery_date: '2024-05-21', total_amount: 2055043.00, tags: ['Cash and Carry', 'Controlled', 'Hospital'], assigned: 'Unassigned' },
  { id: 2, order_no: 'RHPO-1651244221', customer_name: 'Fidson Healthcare', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Trade', order_date: '2024-05-21', delivery_date: '2024-05-21', total_amount: 2055043.00, tags: ['Controlled', 'Hospital'], assigned: 'Unassigned' },
  { id: 3, order_no: 'RHPO-1651244222', customer_name: 'EVANS THERAPEUTICS L...', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Trade', order_date: '2024-05-21', delivery_date: '2024-05-21', total_amount: 2055043.00, tags: ['Cash and Carry', 'Controlled'], assigned: 'Esther Joel' },
  { id: 4, order_no: 'RHPO-1651244223', customer_name: 'Emeka Kalu', store_name: 'Emma Bros Pharmacy', state: 'Lagos', payment: 'Trade', order_date: '2024-05-21', delivery_date: '2024-05-21', total_amount: 2055043.00, tags: ['Hospital'], assigned: 'Femi Babalola' },
  { id: 5, order_no: 'RHPO-1651244224', customer_name: 'Emmanuel Aba', store_name: 'Xela pharmacy', state: 'Lagos', payment: 'Trade', order_date: '2024-05-21', delivery_date: '2024-05-21', total_amount: 2055043.00, tags: ['Cash and Carry'], assigned: 'Sarah Badmus' }
]);

// Mock order activities
const orderActivities = ref([
  {
    action: 'New order assigned',
    user: 'Oreva Emamoro',
    time: 'Yesterday 10:45pm'
  },
  {
    action: 'New order status changed',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  },
  {
    action: 'Confirmed order assigned',
    user: 'Oreva Emamoro',
    time: 'Today 12:45pm'
  }
]);

// Mock time tracker stages - matching TimeTrackerModal structure
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'Order Created', time: '2 hours', color: '#0C66E4' },
  { id: 2, department: 'Inventory', process: 'Order Confirmed', time: '1 hour', color: '#0C66E4' },
  { id: 3, department: 'Logistics', process: 'Being Processed', time: '3 hours', color: '#0C66E4' },
  { id: 4, department: 'Logistics', process: 'Picked & Packed', time: '2 hours', color: '#0C66E4' },
  { id: 5, department: 'Logistics', process: 'Delivered', time: 'Pending', color: '#9CA3AF' }
]);
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}

.tab_contents {
  background-color: white;
}
</style>

