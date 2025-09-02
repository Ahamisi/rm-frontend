<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <LoadingState />
    </div>

    <!-- Datatable -->
    <Datatable 
      :url="ordersUrl" 
      :filterByDate="true" 
      :searchable="true"
      :sortable="true"
      :exportable="false"
      :printable="false"
      :columns="orderColumns" 
      pageName="OutboundConfirmedOrders"
      :filterFields="filterFields"
      :key="datatableKey"
    >
      <template #column="col">
        <!-- Order No -->
        <span v-if="col.props.column.field === 'order_no'">
          <span class="font-medium">{{ col.props.row.order_no }}</span>
        </span>
        
        <!-- Customer Name -->
        <span v-else-if="col.props.column.field === 'customer_name'">
          <span>{{ col.props.row.customer_name }}</span>
        </span>
        
        <!-- Store Name -->
        <span v-else-if="col.props.column.field === 'store_name'">
          <span class="text-gray-700">{{ col.props.row.store_name }}</span>
        </span>
        
        <!-- State -->
        <span v-else-if="col.props.column.field === 'state'">
          <span class="text-gray-700">{{ col.props.row.state }}</span>
        </span>
        
        <!-- Payment -->
        <span v-else-if="col.props.column.field === 'payment'">
          <span class="text-gray-700">{{ col.props.row.payment }}</span>
        </span>
        
        <!-- Order Date -->
        <span v-else-if="col.props.column.field === 'order_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.order_date) }}</span>
        </span>
        
        <!-- Delivery Date -->
        <span v-else-if="col.props.column.field === 'delivery_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.delivery_date) }}</span>
        </span>
        
        <!-- Total Amount -->
        <span v-else-if="col.props.column.field === 'total_amount'">
          <span>{{ formatCurrency(col.props.row.total_amount) }}</span>
        </span>
        
        <!-- Tags -->
        <span v-else-if="col.props.column.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <Pill 
              v-for="tag in col.props.row.tags" 
              :key="tag"
              :type="getPillType(tag)"
              :text="tag"
            />
          </div>
        </span>
        
        <!-- Assigned -->
        <span v-else-if="col.props.column.field === 'assigned'">
          <div v-if="col.props.row.assigned" class="flex items-center space-x-2">
            <img :src="col.props.row.avatar" :alt="col.props.row.assigned" class="w-6 h-6 rounded-full">
            <span class="text-gray-700">{{ col.props.row.assigned }}</span>
          </div>
          <span v-else class="text-red-600">Unassigned</span>
        </span>
        
        <!-- Action -->
        <span v-else-if="col.props.column.field === 'action'">
          <TableActionDropdown :rowData="col.props.row">
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
              
              <!-- Edit Order -->
              <li @click="editOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02 19.73C3.98689 19.892 3.99446 20.0597 4.04204 20.218C4.08962 20.3764 4.17572 20.5205 4.29263 20.6374C4.40955 20.7543 4.55363 20.8404 4.71198 20.888C4.87033 20.9355 5.038 20.9431 5.2 20.91L9.01 20.13L4.8 15.92L4.02 19.73ZM9.941 17.11L7.821 14.99L16.306 6.5H16.308L18.429 8.621L9.94 17.111L9.941 17.11ZM19.844 7.207L17.724 5.085C17.5381 4.89908 17.3173 4.7517 17.0743 4.65131C16.8313 4.55092 16.5709 4.4995 16.308 4.5C15.796 4.5 15.284 4.695 14.893 5.085L5.136 14.843L10.086 19.793L19.843 10.035C20.2179 9.65995 20.4286 9.15133 20.4286 8.621C20.4286 8.09068 20.2179 7.58206 19.843 7.207H19.844Z" fill="#626F86"/>
                </svg>
                Edit Order
              </li>
              
              <!-- Assign to me - only show if order is unassigned -->
              <li v-if="!selectedItem.assigned || selectedItem.assigned === 'Unassigned'"
                  @click="assignToMe(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6.5C20 5.94772 19.5523 5.5 19 5.5C18.4477 5.5 18 5.94772 18 6.5V10.5C18 11.0523 18.4477 11.5 19 11.5C19.5523 11.5 20 11.0523 20 10.5V6.5Z" fill="#626F86"/>
                  <path d="M21 7.5H17C16.4477 7.5 16 7.94772 16 8.5C16 9.05228 16.4477 9.5 17 9.5H21C21.5523 9.5 22 9.05228 22 8.5C22 7.94772 21.5523 7.5 21 7.5Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z" fill="#626F86"/>
                  <path d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z" fill="#626F86"/>
                </svg>
                Assign to me
              </li>

              <!-- Unassign - only show if order is assigned -->
              <li v-if="selectedItem.assigned && selectedItem.assigned !== 'Unassigned'"
                  @click="unassignOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.99 6C20.9909 6.12978 20.9661 6.25846 20.917 6.3786C20.8679 6.49874 20.7955 6.60798 20.704 6.7L19.371 7.969L20.655 9.269C20.7934 9.38673 20.8964 9.54055 20.9526 9.71335C21.0088 9.88614 21.0159 10.0711 20.9732 10.2477C20.9305 10.4243 20.8396 10.5856 20.7107 10.7137C20.5818 10.8417 20.4199 10.9315 20.243 10.973C20.0663 11.0152 19.8814 11.0079 19.7085 10.952C19.5357 10.8961 19.3815 10.7937 19.263 10.656L17.287 8.687C17.1034 8.50291 17.0003 8.25351 17.0003 7.9935C17.0003 7.73349 17.1034 7.48409 17.287 7.3L19.322 5.272C19.463 5.13804 19.6403 5.04858 19.8319 5.01479C20.0234 4.981 20.2207 5.00437 20.399 5.082C20.764 5.242 20.996 5.604 20.99 6ZM5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#626F86"/>
                  <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#626F86"/>
                </svg>
                Unassign
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
        
        <!-- Default -->
        <span v-else>
          {{ col.props.row[col.props.column.field] }}
        </span>
      </template>
    </Datatable>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="modalActiveTab"
      @close="isOrderDetailsModalOpen = false"
    />

    <!-- Success Toast -->
    <SuccessAlertToast 
      :isVisible="showUnassignToast" 
      :message="showUnassignToast ? (selectedOrder.assigned ? 'Order has been unassigned successfully' : 'Order has been assigned to you successfully') : ''" 
      @close="showUnassignToast = false"
    />

    <!-- Change Status Modal -->
    <UniversalCenteredModal :show="showChangeStatusModal" @close="showChangeStatusModal = false">
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
          <button @click="showChangeStatusModal = false" type="button" class="cancel_btn">
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

    <!-- Time Tracker Modal -->
    <TimeTrackerModal
      :isOpen="showTimeTrackerModal"
      :orderRef="selectedOrder.order_no || '1656493689-254'"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />

  </div>
</template>

<script setup lang="ts">
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import SuccessModal from '@/views/Components/procurement/ui/SuccessModal.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import type { TableColumn, FilterFields, FilterField, Option } from '@/types';
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Router
const router = useRouter();

// Loading state
const loading = ref(false);
const datatableKey = ref(0);

// Toast state
const showUnassignToast = ref(false);

// Change Status Modal
const showChangeStatusModal = ref(false);
const showStatusSuccessModal = ref(false);

// Time Tracker Modal
const showTimeTrackerModal = ref(false);
const selectedStatus = ref<Option | null>(null);

// Status options for the dropdown
const statusOptions = ref<Option[]>([
  { id: 1, name: 'New' },
  { id: 2, name: 'Confirmed' },
  { id: 3, name: 'Being Processed' },
  { id: 4, name: 'Picked & Packed' },
  { id: 5, name: 'Delivered' }
]);



// API URL for confirmed orders - using same mock data but could be different endpoint
const ordersUrl = '/outbound/orders';

// Filter fields for additional filtering options
const filterFields = ref<FilterFields<FilterField>>({
  state: {
    field: 'state',
    label: 'State',
    type: 'select',
    options: [
      { id: 'Lagos', name: 'Lagos' },
      { id: 'Abuja', name: 'Abuja' },
      { id: 'Rivers', name: 'Rivers' },
      { id: 'Ogun', name: 'Ogun' },
      { id: 'Kano', name: 'Kano' },
    ]
  },
  payment: {
    field: 'payment',
    label: 'Payment Type',
    type: 'select',
    options: [
      { id: 'Trade', name: 'Trade' },
      { id: 'Cash', name: 'Cash' },
      { id: 'Credit', name: 'Credit' },
    ]
  }
});

// Table columns configuration
const orderColumns = ref<TableColumn[]>([
  { field: 'order_no', label: 'Order No.', sortable: true },
  { field: 'customer_name', label: 'Customer Name', sortable: true },
  { field: 'store_name', label: 'Store Name', sortable: true },
  { field: 'state', label: 'State', sortable: false },
  { field: 'payment', label: 'Payment', sortable: false },
  { field: 'order_date', label: 'Order Date', sortable: true },
  { field: 'delivery_date', label: 'Delivery Date', sortable: true },
  { field: 'total_amount', label: 'Total Amount', sortable: true },
  { field: 'tags', label: 'Tags', sortable: false },
  { field: 'assigned', label: 'Assigned', sortable: false },
  { field: 'action', label: 'Action', sortable: false }
]);

// Order Details Modal
const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

// Mock order items for details view
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
  }
]);

// Mock order activities
const orderActivities = ref([
  { action: 'New order assigned', user: 'Oreva Emamoro', time: 'Yesterday 10:45pm' },
  { action: 'New order status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Confirmed order assigned', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Confirmed order status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order being processed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order being processed status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order has been picked and packed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order has been picked and packed status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' }
]);

// Time Tracker Stages - Department-based workflow (same as Dashboard)
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'Order Pending → Order Confirmed', time: '0 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Account Confirmed → Order Confirmed', time: '1 minute', color: '#1D7AFC' },
  { id: 3, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#1D7AFC' },
  { id: 4, department: 'Inventory', process: 'Being Processed → Awaiting Shipment', time: '2 minutes', color: '#1D7AFC' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 hours', color: '#22A06B' }
]);

// Action handlers
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

const editOrder = (order: any) => {
  router.push({ name: 'outbound.orders.edit', params: { id: order.id } });
};

const unassignOrder = (order: any) => {
  console.log('Unassign order:', order);
  // Show success toast
  showUnassignToast.value = true;
};

const assignToMe = (order: any) => {
  console.log('Assign order to me:', order);
  // Show success toast
  showUnassignToast.value = true;
};

const changeStatus = (order: any) => {
  selectedOrder.value = order;
  showChangeStatusModal.value = true;
};

const updateStatus = () => {
  showChangeStatusModal.value = false;
  showStatusSuccessModal.value = true;
};

const openTimeTracker = (order: any) => {
  selectedOrder.value = order;
  showTimeTrackerModal.value = true;
};

const openActivityLog = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};

// Utility functions
const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY');
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
      return 'hospital'; // Default to hospital style
  }
};
</script>

<style scoped>

</style> 