<template>
  <div class="flex-1 flex flex-col min-h-0">
    <Datatable 
      :items="orders" 
      :filterByDate="false" 
      :filterFields="filterFields" 
      :columns="columns" 
      pageName="Awaiting Shipment Orders"
    >
      <template #column="col">
        <!-- Tags Column -->
        <span v-if="col.props?.column?.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in col.props.formattedRow[col.props.column.field]" :key="tag" 
                  :class="getTagClass(tag)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
              {{ tag }}
            </span>
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
        <!-- Default Column -->
        <span v-else>
          {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
        </span>
      </template>
    </Datatable>
  </div>

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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue'
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Emits
const emit = defineEmits<{
  'view-order': [order: any]
}>()

// Modal states
const isOrderDetailsModalOpen = ref(false)
const showTimeTrackerModal = ref(false)
const selectedOrder = ref<any>({})
const modalActiveTab = ref('details')

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
])

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
])

// Time Tracker Stages - Department-based workflow
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'New Order → Order Confirmed', time: '1-2 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Order Confirmed → Order Confirmed', time: '1 minute', color: '#1D7AFC' },
  { id: 3, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '2 minutes', color: '#1D7AFC' },
  { id: 4, department: 'Inventory', process: 'Being Processed → Awaiting Shipment', time: '2 minutes', color: '#1D7AFC' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 seconds', color: '#22A06B' }
])

// Mock data for awaiting shipment orders
const orders = ref([
  {
    id: 1,
    orderNo: 'RHPO-1651244 250',
    customerName: 'Fidson Healthcare',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/18/2024',
    deliveryDate: '5/24/2024',
    totalAmount: '₦1,255,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: 'Esther Joel'
  },
  {
    id: 2,
    orderNo: 'RHPO-1651244 251',
    customerName: 'EVANS THERAPEUTICS L..',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/18/2024',
    deliveryDate: '5/24/2024',
    totalAmount: '₦1,155,043.00',
    tags: ['Cash and Carry', 'Hospital'],
    assigned: 'Femi Babalola'
  }
])

// Table columns
const columns = ref<TableColumn[]>([
  {
    label: 'Order No.',
    field: 'orderNo',
    sortable: true
  },
  {
    label: 'Customer Name',
    field: 'customerName',
    sortable: true
  },
  {
    label: 'Store Name',
    field: 'storeName',
    sortable: true
  },
  {
    label: 'State',
    field: 'state',
    sortable: true
  },
  {
    label: 'Payment',
    field: 'payment',
    sortable: true
  },
  {
    label: 'Order Date',
    field: 'orderDate',
    sortable: true
  },
  {
    label: 'Delivery Date',
    field: 'deliveryDate',
    sortable: true
  },
  {
    label: 'Total Amount',
    field: 'totalAmount',
    sortable: true
  },
  {
    label: 'Tags',
    field: 'tags',
    sortable: false
  },
  {
    label: 'Assigned',
    field: 'assigned',
    sortable: true
  },
  {
    label: 'Action',
    field: 'action',
    sortable: false
  }
])

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
  orderNo: {
    type: 'text',
    label: 'Order No.',
    placeholder: 'Search by order number'
  },
  customerName: {
    type: 'text',
    label: 'Customer Name',
    placeholder: 'Search by customer name'
  },
  storeName: {
    type: 'text',
    label: 'Store Name',
    placeholder: 'Search by store name'
  }
})

// Methods
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

const getTagClass = (tag: string) => {
  const tagClasses: { [key: string]: string } = {
    'Cash and Carry': 'bg-green-100 text-green-800',
    'Controlled': 'bg-purple-100 text-purple-800',
    'Hospital': 'bg-blue-100 text-blue-800'
  }
  return tagClasses[tag] || 'bg-gray-100 text-gray-800'
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
</script>

<style scoped>

</style>