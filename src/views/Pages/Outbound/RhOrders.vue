<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="HMO - Pharm / Remedial Store HMO Orders / New" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="rhOrderTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Download Buttons in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <button 
            @click="downloadTimeTrackerReport"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#172B4D] bg-gray-200 rounded-md hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Time Tracker Report
          </button>
          <button 
            @click="downloadReport"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#172B4D] bg-gray-200 rounded-md hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Report
          </button>
        </div>
      </Tabs>
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <Datatable
        :items="rhOrders"
        :columns="rhOrderColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="RhOrders"
        :key="`rhorders-${activeTab}-${childKey}`"
      >
        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <!-- Simple View Action for Delivered and Cancelled -->
            <div v-if="activeTab === 'Delivered' || activeTab === 'Cancelled'">
              <button 
                @click="viewOrder(col.props?.formattedRow)"
                class="text-gray-500 hover:text-[#172B4D]"
                title="View Order"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0013 16.9999C8.2213 16.9999 5.33547 13.4499 5.33547 11.9999C5.33547 10.3324 8.21797 6.99992 12.0021 6.99992C15.6488 6.99992 18.6671 10.3108 18.6671 11.9999C18.6671 13.4499 15.7821 16.9999 12.0021 16.9999H12.0013ZM12.0021 5.33325C7.4013 5.33325 3.66797 9.36742 3.66797 11.9999C3.66797 14.5716 7.4813 18.6666 12.0013 18.6666C16.5205 18.6666 20.3346 14.5716 20.3346 11.9999C20.3346 9.36742 16.6013 5.33325 12.0013 5.33325" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9821 13.6533C11.063 13.6533 10.3155 12.9058 10.3155 11.9866C10.3155 11.0674 11.063 10.3199 11.9821 10.3199C12.9021 10.3199 13.6488 11.0674 13.6488 11.9866C13.6488 12.9058 12.9021 13.6533 11.9821 13.6533ZM11.9821 8.65325C10.1438 8.65325 8.6488 10.1483 8.6488 11.9866C8.6488 13.8249 10.1438 15.3199 11.9821 15.3199C13.8213 15.3199 15.3155 13.8249 15.3155 11.9866C15.3155 10.1483 13.8213 8.65325 11.9821 8.65325Z" fill="#44546F"/>
                </svg>
              </button>
            </div>
            
            <!-- Full Action Dropdown for Other Tabs -->
            <div v-else>
              <TableActionDropdown :rowData="col.props?.formattedRow">
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
                  
                  <!-- Change Status -->
                  <li @click="changeStatus(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6.003V8.998C8 9.26322 8.10535 9.51757 8.29289 9.70511C8.48043 9.89264 8.73478 9.998 9 9.998C9.26521 9.998 9.51957 9.89264 9.7071 9.70511C9.89464 9.51757 10 9.26322 10 8.998V5.102C10 4.494 9.507 4 8.9 4H5C4.73438 4 4.47965 4.10551 4.29183 4.29333C4.10401 4.48115 3.9985 4.73589 3.9985 5.0015C3.9985 5.26711 4.10401 5.52185 4.29183 5.70967C4.47965 5.89748 4.73438 6.003 5 6.003H8Z" fill="#626F86"/>
                      <path d="M9.428 18.018C7.351 16.989 6 14.807 6 12.37C6 10.104 7.167 8.051 9.02 6.945C9.5 6.659 9.666 6.023 9.391 5.524C9.32915 5.40677 9.24414 5.30331 9.14112 5.21991C9.03811 5.13651 8.91922 5.0749 8.79169 5.0388C8.66415 5.00271 8.53061 4.99289 8.39916 5.00994C8.26772 5.027 8.14111 5.07056 8.027 5.138C5.557 6.611 4 9.35 4 12.37C4 15.618 5.802 18.528 8.57 19.899C9.068 20.146 9.665 19.925 9.902 19.406C10.139 18.886 9.927 18.265 9.428 18.018Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 15.002V18.898C14 19.506 14.493 20 15.1 20H19C19.2656 20 19.5203 19.8945 19.7082 19.7067C19.896 19.5188 20.0015 19.2641 20.0015 18.9985C20.0015 18.7329 19.896 18.4782 19.7082 18.2903C19.5203 18.1025 19.2656 17.997 19 17.997H16V15.002C16 14.7368 15.8946 14.4824 15.7071 14.2949C15.5196 14.1074 15.2652 14.002 15 14.002C14.7348 14.002 14.4804 14.1074 14.2929 14.2949C14.1054 14.4824 14 14.7368 14 15.002Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.097 4.596C13.86 5.116 14.072 5.736 14.571 5.983C16.648 7.012 17.999 9.193 17.999 11.63C17.999 13.896 16.832 15.95 14.978 17.055C14.7456 17.1988 14.5776 17.4265 14.5087 17.6909C14.4398 17.9553 14.4753 18.2361 14.608 18.475C14.882 18.975 15.493 19.148 15.972 18.862C18.442 17.389 19.999 14.65 19.999 11.63C19.999 8.382 18.197 5.472 15.429 4.102C15.2965 4.03537 15.1503 4.00045 15.002 4C14.8098 4.00188 14.6223 4.05909 14.4618 4.16479C14.3013 4.27049 14.1746 4.4202 14.097 4.596Z" fill="#626F86"/>
                    </svg>
                    Change Status
                  </li>
                  
                  <!-- Activity Log -->
                  <li @click="activityLog(selectedItem); closeDropdown()" 
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
            </div>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="showOrderModal"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="modalActiveTab"
      @close="showOrderModal = false"
    />

    <!-- Change Status Modal -->
    <UniversalCenteredModal :show="showStatusModal" @close="showStatusModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <h3 class="font-medium">Update Order Status</h3>
        </span>
      </template>

      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <SelectField
              v-model="selectedStatus"
              :options="statusOptions"
              placeholder="Select a status"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showStatusModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="updateStatus" :disabled="!selectedStatus" type="button" class="px-4 py-2 text-sm approve_btn" style="color: white">
            Update
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- Status Success Modal -->
    <SuccessModal
      v-model="showStatusSuccessModal"
      title="Status Updated!"
      message="Order status has been updated successfully."
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
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import OrderDetailsModal from "@/views/Components/ui/OrderDetailsModal.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessModal from "@/views/Components/procurement/ui/SuccessModal.vue";
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import type { TableColumn } from '@/types';

const activeTab = ref('New');
const childKey = ref(0);

const rhOrderTabs = ref([
  { name: 'New', count: 25 },
  { name: 'Confirmed Orders', count: 25 }, 
  { name: 'Being Processed', count: 25 },
  { name: 'Awaiting Shipment', count: 25 },
  { name: 'En Route', count: 25 },
  { name: 'Delivered', count: 25 },
  { name: 'Cancelled', count: 25 }
]);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');


// Modal states
const showOrderModal = ref(false);
const showStatusModal = ref(false);
const showStatusSuccessModal = ref(false);
const selectedOrder = ref<any>(null);
const modalActiveTab = ref('details');

// Status modal data
const selectedStatus = ref<any>(null);

// Status options (matching ConfirmedOrders structure)
const statusOptions = ref([
  { id: 1, name: 'New' },
  { id: 2, name: 'Confirmed' },
  { id: 3, name: 'Being Processed' },
  { id: 4, name: 'Awaiting Shipment' },
  { id: 5, name: 'En Route' },
  { id: 6, name: 'Delivered' },
  { id: 7, name: 'Cancelled' }
]);


// Order items for OrderDetailsModal (matching ConfirmedOrders structure)
const orderItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 20,
    unit_price: 47400.00,
    price_total: 47400.00
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 10,
    unit_price: 47400.00,
    price_total: 47400.00
  },
  {
    id: 3,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 1,
    unit_price: 47400.00,
    price_total: 47400.00
  },
  {
    id: 4,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    tags: 'Controlled',
    quantity_delivered: 1,
    unit_price: 47400.00,
    price_total: 47400.00
  },
  {
    id: 5,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    tags: '',
    quantity_delivered: 1,
    unit_price: 47400.00,
    price_total: 47400.00
  }
]);

// Base column definitions
const baseColumns: TableColumn[] = [
  { label: 'Order No.', field: 'order_no', sortable: true },
  { label: 'HMO Name', field: 'hmo_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Delivery Type', field: 'delivery_type', sortable: true },
  { label: 'Total Cost Price', field: 'total_cost_price', sortable: true },
  { label: 'Total Selling Price', field: 'total_selling_price', sortable: true },
  { label: 'Warehouse', field: 'warehouse', sortable: true },
  { label: 'Warehouse State', field: 'warehouse_state', sortable: true },
  { label: 'Warehouse LGA', field: 'warehouse_lga', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Dynamic column definitions based on active tab
const rhOrderColumns = computed<TableColumn[]>(() => {
  const columns = [...baseColumns];
  
  // For "Being Processed" tab, replace "Order Date" with "Processing Date"
  if (activeTab.value === 'Being Processed') {
    // Find and replace the Order Date column with Processing Date
    const orderDateIndex = columns.findIndex(col => col.field === 'order_date');
    if (orderDateIndex !== -1) {
      columns[orderDateIndex] = { label: 'Processing Date', field: 'processing_date', sortable: true };
    }
  }
  
  return columns;
});

// Mock RH orders data
const rhOrders = ref([
  {
    order_no: 'RHPO-1651244214',
    hmo_name: 'Oluwatosin HMO',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    processing_date: '5/22/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244215',
    hmo_name: 'Reliance Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    processing_date: '5/22/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244216',
    hmo_name: 'NEM Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244217',
    hmo_name: 'Oluwatosin Adegboye',
    store_name: 'Emma Bros Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244218',
    hmo_name: 'NEM Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244219',
    hmo_name: 'Reliance Health',
    store_name: 'Emma Bros Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244220',
    hmo_name: 'Oluwatosin Adegboye',
    store_name: 'Xela pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244221',
    hmo_name: 'NEM Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244222',
    hmo_name: 'Reliance Health',
    store_name: 'Emma Bros Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244223',
    hmo_name: 'Oluwatosin Adegboye',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244224',
    hmo_name: 'NEM Health',
    store_name: 'Emma Bros Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244225',
    hmo_name: 'Reliance Health',
    store_name: 'Xela pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  }
]);

// Mock activities data
const orderActivities = ref([
  {
    action: 'New order assigned',
    user: 'System',
    time: 'Today 10:30am'
  },
  {
    action: 'New order status changed',
    user: 'Admin User',
    time: 'Today 11:00am'
  },
  {
    action: 'Confirmed order assigned',
    user: 'Processing Team',
    time: 'Today 12:00pm'
  },
  {
    action: 'Order being processed assigned',
    user: 'Warehouse Team',
    time: 'Today 1:00pm'
  }
]);

const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  // Handle tab change logic here
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
  
  // Force reactivity update for columns
  nextTick(() => {
    childKey.value += 1;
  });
};

// Download functions
const downloadTimeTrackerReport = () => {
  toastMessage.value = 'Download Time Tracker Report Successful';
  showToast.value = true;
};

const downloadReport = () => {
  toastMessage.value = 'Download RH Order Report Successful';
  showToast.value = true;
};

// Action handlers
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  showOrderModal.value = true;
};

const changeStatus = (order: any) => {
  selectedOrder.value = order;
  showStatusModal.value = true;
};

const activityLog = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  showOrderModal.value = true;
};

// Modal methods
const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedOrder.value = null;
  modalActiveTab.value = 'details';
};

const updateStatus = () => {
  showStatusModal.value = false;
  showStatusSuccessModal.value = true;
  selectedStatus.value = null;
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
      return 'hospital'; // Default to hospital style
  }
};

</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.bg-gray-light {
  background-color: #091E420F;
}

</style>
