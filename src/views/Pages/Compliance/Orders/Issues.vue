<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / Inventory Order Issues" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="orderIssues"
        :filterByDate="true" 
        :searchable="true"
        :sortable="true"
        :exportable="false"
        :printable="false"
        :columns="issueColumns" 
        pageName="ComplianceOrderIssues"
        :filterFields="filterFields"
        :key="datatableKey"
      >
        <template #header_actions>
          <!-- <Button 
            type="blue-btn"
            :onClick="openCreateIssueModal"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
            Report Issue
          </Button> -->
        </template>

        <template #column="col">
        <!-- Tags Column -->
        <span v-if="col.props?.column?.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <Pill 
              v-for="tag in col.props.formattedRow[col.props.column.field]" 
              :key="tag" 
              :type="getPillType(tag)"
              :text="tag"
              :showIcon="false"
            />
          </div>
          </span>

        <!-- Assigned Column -->
          <span v-else-if="col.props?.column?.field === 'assigned'">
          <div v-if="col.props.formattedRow[col.props.column.field]" class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                 :style="{ backgroundColor: getAvatarColor(col.props.formattedRow[col.props.column.field]), color: 'white' }">
              {{ getInitials(col.props.formattedRow[col.props.column.field]) }}
              </div>
            <span>{{ col.props.formattedRow[col.props.column.field] }}</span>
            </div>
            <span v-else class="text-gray-400">Unassigned</span>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
          <TableActionDropdown :rowData="col.props.formattedRow">
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
              
              <!-- Unassign -->
              <li v-if="selectedItem.assigned" @click="unassignOrder(selectedItem); closeDropdown()" 
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
    </div>

    <!-- Create/Edit Issue Modal -->
    <SideBarModal
      :isOpen="showCreateModal || showEditModal"
      :title="showEditModal ? 'Edit Issue' : 'Report New Issue'"
      @update:isOpen="handleSideBarUpdate"
      @close="handleSideBarClose"
      width="45vw"
    >
      <div class="space-y-4 px-6 mt-4">
        <!-- Order Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
          <input
            type="text"
            v-model="form.orderNumber"
            placeholder="Enter order number"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600"
            style="border-color: #091E4224; color: #172B4D !important;"
          />
        </div>

        <!-- Issue Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
          <SelectField
            v-model="form.issueType"
            :options="issueTypeOptions"
            labelField="name"
            valueField="id"
            placeholder="Select issue type"
          />
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <SelectField
            v-model="form.priority"
            :options="priorityOptions"
            labelField="name"
            valueField="id"
            placeholder="Select priority"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="form.description"
            placeholder="Describe the issue in detail"
            rows="4"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
            style="border-color: #091E4224; color: #172B4D !important;"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" :onClick="handleCancel">Cancel</Button>
          <Button type="blue-btn" :onClick="saveIssue">
            {{ showEditModal ? 'Update' : 'Report' }}
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Issue Details Modal -->
    <SideBarModal
      v-if="isIssueDetailsModalOpen"
      :isOpen="isIssueDetailsModalOpen"
      width="xl"
      title="Issue Details"
      @update:isOpen="isIssueDetailsModalOpen = false"
      @close="isIssueDetailsModalOpen = false"
    >
      <IssueDetails 
        :issue="selectedIssue" 
        @close="isIssueDetailsModalOpen = false"
        @issue-updated="handleIssueUpdate"
      />
    </SideBarModal>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="modalActiveTab"
      @close="isOrderDetailsModalOpen = false"
    />

    <!-- Time Tracker Modal -->
    <TimeTrackerModal
      :isOpen="showTimeTrackerModal"
      :orderRef="selectedOrder.orderNo || '1656493689-254'"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />

    <!-- Update Order Status Modal -->
    <UniversalCenteredModal
      :show="showStatusUpdateModal"
      @close="showStatusUpdateModal = false"
    >
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Update Order Status</h3>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <SelectField
              v-model="selectedStatus"
              :options="statusOptions"
              labelField="name"
              valueField="id"
              placeholder="Select a status"
            />
          </div>
        </div>
      </template>
      
      <template #footer>
        <Button type="gray-btn" :onClick="() => showStatusUpdateModal = false">Cancel</Button>
        <Button type="blue-btn" :onClick="updateOrderStatus">Update</Button>
      </template>
    </UniversalCenteredModal>

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
import { ref, computed } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import Button from '@/views/Components/ui/Button.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue'
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue'
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue'
import Pill from '@/views/Components/ui/Pill.vue'
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'
import IssueDetails from './components/IssueDetails.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'
import dayjs from 'dayjs'

// Reactive data
const datatableKey = ref(0)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const isIssueDetailsModalOpen = ref(false)
const selectedIssue = ref<any>(null)

// Modal states
const isOrderDetailsModalOpen = ref(false)
const showTimeTrackerModal = ref(false)
const showStatusUpdateModal = ref(false)
const selectedOrder = ref<any>({})
const modalActiveTab = ref('details')
const selectedStatus = ref<any>(null)

// Toast states
const showToast = ref(false)
const toastMessage = ref('')

// API URL for issues
const issuesUrl = '/compliance/orders/issues'

// Filter fields for additional filtering options
const filterFields = ref<FilterFields<FilterField>>({
  status: {
    field: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { id: 'Open', name: 'Open' },
      { id: 'In Progress', name: 'In Progress' },
      { id: 'Resolved', name: 'Resolved' },
      { id: 'Closed', name: 'Closed' }
    ]
  },
  priority: {
    field: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'Low', name: 'Low' },
      { id: 'Medium', name: 'Medium' },
      { id: 'High', name: 'High' },
      { id: 'Critical', name: 'Critical' }
    ]
  }
})

// Form data
interface FormData {
  orderNumber: string;
  issueType: { id: number; name: string } | null;
  priority: { id: number; name: string } | null;
  description: string;
}

const form = ref<FormData>({
  orderNumber: '',
  issueType: null,
  priority: null,
  description: ''
})

// Table columns configuration
const issueColumns = ref<TableColumn[]>([
  { field: 'orderNo', label: 'Order No.', sortable: true },
  { field: 'customerName', label: 'Customer Name', sortable: true },
  { field: 'storeName', label: 'Store Name', sortable: true },
  { field: 'state', label: 'State', sortable: true },
  { field: 'payment', label: 'Payment', sortable: true },
  { field: 'orderDate', label: 'Order Date', sortable: true },
  { field: 'deliveryDate', label: 'Delivery Date', sortable: true },
  { field: 'totalAmount', label: 'Total Amount', sortable: true },
  { field: 'tags', label: 'Tags', sortable: false },
  { field: 'assigned', label: 'Assigned', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
])

// Options
const issueTypeOptions = ref([
  { id: 1, name: 'Inventory Shortage' },
  { id: 2, name: 'Product Damage' },
  { id: 3, name: 'Delivery Delay' },
  { id: 4, name: 'Quality Issue' },
  { id: 5, name: 'System Error' }
])

const priorityOptions = ref([
  { id: 1, name: 'Low' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'High' },
  { id: 4, name: 'Critical' }
])

const statusOptions = ref([
  { id: 1, name: 'New' },
  { id: 2, name: 'Confirmed' },
  { id: 3, name: 'Being Processed' },
  { id: 4, name: 'Picked & Packed' },
  { id: 5, name: 'Awaiting Shipment' },
  { id: 6, name: 'Shipped to Hub' },
  { id: 7, name: 'At Hub' },
  { id: 8, name: 'Shipped via Third Party' },
  { id: 9, name: 'Shipped to Customer' },
  { id: 10, name: 'Delivered' },
  { id: 11, name: 'Cancelled' }
])

// Mock data for order issues
const orderIssues = ref([
  {
    id: 1,
    orderNo: 'RHPO-1651244 214',
    customerName: 'Fidson Healthcare',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: null as string | null
  },
  {
    id: 2,
    orderNo: 'RHPO-1651244 215',
    customerName: 'EVANS THERAPEUTICS L..',
    storeName: 'Emma Bros Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Hospital'],
    assigned: null as string | null
  },
  {
    id: 3,
    orderNo: 'RHPO-1651244 216',
    customerName: 'Emzor Pharmaceuticals',
    storeName: 'Xela pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: 'Esther Joel' as string | null
  },
  {
    id: 4,
    orderNo: 'RHPO-1651244 217',
    customerName: 'Fidson Healthcare',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: 'Sarah Badmus' as string | null
  },
  {
    id: 5,
    orderNo: 'RHPO-1651244 218',
    customerName: 'EVANS THERAPEUTICS L..',
    storeName: 'Emma Bros Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Hospital'],
    assigned: 'Josh Michael' as string | null
  },
  {
    id: 6,
    orderNo: 'RHPO-1651244 219',
    customerName: 'Emzor Pharmaceuticals',
    storeName: 'Xela pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: 'Femi Babalola' as string | null
  }
])

// Methods
const openCreateIssueModal = () => {
  resetForm()
  showCreateModal.value = true
}

const viewIssue = (issue: any) => {
  selectedIssue.value = issue
  isIssueDetailsModalOpen.value = true
}

const editIssue = (issue: any) => {
  selectedIssue.value = issue
  // Pre-fill form with issue data
  form.value = {
    orderNumber: issue.orderNumber,
    issueType: issueTypeOptions.value.find(t => t.name === issue.issueType) || null,
    priority: priorityOptions.value.find(p => p.name === issue.priority) || null,
    description: issue.description || ''
  }
  showEditModal.value = true
}

const saveIssue = () => {
  if (showEditModal.value && selectedIssue.value) {
    // Update existing issue
    const index = orderIssues.value.findIndex(i => i.id === selectedIssue.value!.id)
    if (index !== -1) {
      orderIssues.value[index] = {
        ...orderIssues.value[index],
        orderNumber: form.value.orderNumber,
        issueType: form.value.issueType?.name || '',
        priority: form.value.priority?.name || '',
        description: form.value.description
      }
    }
  } else {
    // Create new issue
    const newIssue = {
      id: Math.max(...orderIssues.value.map(i => i.id)) + 1,
      orderNumber: form.value.orderNumber,
      issueType: form.value.issueType?.name || '',
      priority: form.value.priority?.name || '',
      status: 'Open',
      assigned: null as string | null,
      createdDate: new Date().toLocaleDateString('en-GB'),
      description: form.value.description
    }
    orderIssues.value.unshift(newIssue)
  }
  
  showCreateModal.value = false
  showEditModal.value = false
  selectedIssue.value = null
  resetForm()
  datatableKey.value++
}

const resetForm = () => {
  form.value = {
    orderNumber: '',
    issueType: null,
    priority: null,
    description: ''
  }
}

const handleIssueUpdate = () => {
  isIssueDetailsModalOpen.value = false
  datatableKey.value++
}

const handleSideBarUpdate = (isOpen: boolean) => {
  if (!isOpen) {
    showCreateModal.value = false
    showEditModal.value = false
    resetForm()
  }
}

const handleSideBarClose = () => {
  showCreateModal.value = false
  showEditModal.value = false
  resetForm()
}

const handleCancel = () => {
  showCreateModal.value = false
  showEditModal.value = false
  resetForm()
}

const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    'Open': 'bg-red-100 text-red-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority: string) => {
  const priorityClasses: { [key: string]: string } = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
}

const getAvatarColor = (name: string) => {
  const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash % colors.length)
  return colors[index]
}

const getInitials = (name: string) => {
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}

const changeStatus = (order: any) => {
  selectedOrder.value = order
  selectedStatus.value = null
  showStatusUpdateModal.value = true
}

const updateOrderStatus = () => {
  if (selectedStatus.value) {
    console.log('Updating order status:', selectedOrder.value.orderNo, 'to', selectedStatus.value.name)
    // TODO: Implement actual status update logic
    showStatusUpdateModal.value = false
    selectedStatus.value = null
  }
}

const unassignOrder = (order: any) => {
  console.log('Unassign order:', order)
  toastMessage.value = 'Order unassigned successfully'
  showToast.value = true
}

const viewOrder = (order: any) => {
  selectedOrder.value = order
  modalActiveTab.value = 'details'
  isOrderDetailsModalOpen.value = true
}

const openTimeTracker = (order: any) => {
  selectedOrder.value = order
  showTimeTrackerModal.value = true
}

const openActivityLog = (order: any) => {
  selectedOrder.value = order
  modalActiveTab.value = 'activities'
  isOrderDetailsModalOpen.value = true
}

// Mock data for modals
const orderItems = ref([
  {
    id: 1,
    productName: 'Paracetamol 500mg',
    quantity: 100,
    unitPrice: 50.00,
    totalPrice: 5000.00
  },
  {
    id: 2,
    productName: 'Amoxicillin 250mg',
    quantity: 50,
    unitPrice: 75.00,
    totalPrice: 3750.00
  }
])

const orderActivities = ref([
  {
    id: 1,
    action: 'Order Created',
    user: 'System',
    timestamp: '2024-05-21 10:30:00',
    details: 'Order was created in the system'
  },
  {
    id: 2,
    action: 'Payment Confirmed',
    user: 'John Doe',
    timestamp: '2024-05-21 10:35:00',
    details: 'Payment has been confirmed'
  }
])

const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'New Order → Order Confirmed', time: '1-2 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#1D7AFC' },
  { id: 3, department: 'Inventory', process: 'Being Processed → Picked and Packed', time: '2 minutes', color: '#1D7AFC' },
  { id: 4, department: 'Inventory', process: 'Picked and Packed → Awaiting Shipment', time: '2 minutes', color: '#1D7AFC' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 seconds', color: '#22A06B' }
])

// Utility functions
const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}

const getPillType = (tag: string) => {
  const tagTypeMap: { [key: string]: string } = {
    'Cash and Carry': 'cash-and-carry',
    'Controlled': 'controlled',
    'Hospital': 'hospital',
    'Unassigned': 'pending-tier'
  }
  return tagTypeMap[tag] || 'cash-and-carry'
}
</script>

<style scoped>
.erp_dashboard_wrapper > div:last-child {
  height: calc(100vh - 190px) !important;
  overflow: hidden !important;
}
</style>