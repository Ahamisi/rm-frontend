<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / Held Orders" class="px-6" />

      <!-- Datatable -->
      <div class="px-6">
        <Datatable
          :items="heldOrdersList" 
          :filterByDate="true"
          :searchable="true"
          :sortable="true"
          :exportable="false"
          :printable="false"
          :columns="heldColumns" 
          :key="childKey"
          pageName="AccountingHeldOrders" 
        >
          <template #column="col">
            <!-- Order No -->
            <span v-if="col.props?.column?.field === 'order_no'">
              <span class="font-medium">{{ (col.props?.formattedRow as any)?.['order_no'] || col.props?.row?.order_no || '' }}</span>
            </span>
            
            <!-- Customer Name -->
            <span v-else-if="col.props?.column?.field === 'customer_name'">
              <span>{{ (col.props?.formattedRow as any)?.['customer_name'] || col.props?.row?.customer_name || '' }}</span>
            </span>
            
            <!-- Store Name -->
            <span v-else-if="col.props?.column?.field === 'store_name'">
              <span class="text-gray-700">{{ (col.props?.formattedRow as any)?.['store_name'] || col.props?.row?.store_name || '' }}</span>
            </span>

            <!-- State -->
            <span v-else-if="col.props?.column?.field === 'state'">
              <span class="text-gray-700">{{ (col.props?.formattedRow as any)?.['state'] || col.props?.row?.state || '' }}</span>
            </span>

            <!-- Payment -->
            <span v-else-if="col.props?.column?.field === 'payment'">
              <span class="text-gray-700">{{ (col.props?.formattedRow as any)?.['payment'] || col.props?.row?.payment || '' }}</span>
            </span>

            <!-- Order Date -->
            <span v-else-if="col.props?.column?.field === 'order_date'">
              <span class="text-gray-700">{{ formatDate((col.props?.formattedRow as any)?.['order_date'] || col.props?.row?.order_date || '') }}</span>
            </span>
            
            <!-- Delivery Date -->
            <span v-else-if="col.props?.column?.field === 'delivery_date'">
              <span class="text-gray-700">{{ formatDate((col.props?.formattedRow as any)?.['delivery_date'] || col.props?.row?.delivery_date || '') }}</span>
            </span>

            <!-- Total Amount -->
            <span v-else-if="col.props?.column?.field === 'total_amount'">
              <span class="font-medium">{{ (col.props?.formattedRow as any)?.['total_amount'] || col.props?.row?.total_amount || '' }}</span>
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
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#626F86"/>
                      <path d="M19 13H16V16H14V13H11V11H14V8H16V11H19V13Z" fill="#626F86"/>
                    </svg>
                    Assign to me
                  </li>
                  
                  <!-- Release Order -->
                  <li @click="releaseOrder(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#626F86"/>
                    </svg>
                    Release Order
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
                  <li @click="viewOrderActivities(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#626F86"/>
                      <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16Z" fill="#626F86"/>
                    </svg>
                    Activity Log
                  </li>
                </template>
              </TableActionDropdown>
            </span>

            <!-- Default -->
            <span v-else class="text-xs">
              {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
            </span>
          </template>
        </Datatable>
      </div>
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
      :is-open="showTimeTrackerModal" 
      :order-ref="selectedOrder.order_no || 'RHPO-1651244214'"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />

    <!-- Success Toast for Assign to Me -->
    <SuccessAlertToast 
      :isVisible="showAssignToast" 
      message="Held Order Assigned to You Successfully" 
      @close="showAssignToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import dayjs from 'dayjs';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);

// Modal states
const isOrderDetailsModalOpen = ref(false);
const showTimeTrackerModal = ref(false);
const showAssignToast = ref(false);

// Selected data
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

// Table columns
const heldColumns: TableColumn[] = [
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Payment', field: 'payment', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Delivery Date', field: 'delivery_date', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Assigned', field: 'assigned', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for held orders
const heldOrdersList = ref([
  { id: 1, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Unassigned' },
  { id: 2, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Unassigned' },
  { id: 3, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Sarah Badmus' },
  { id: 4, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emma Bros Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Josh Michael' },
  { id: 5, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Femi Babalola' },
  { id: 6, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emma Bros Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Esther Joel' },
  { id: 7, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Xela pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Unassigned' },
  { id: 8, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Xela pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Sarah Badmus' },
  { id: 9, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Xela pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Josh Michael' },
  { id: 10, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Femi Babalola' },
  { id: 11, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emma Bros Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Esther Joel' },
  { id: 12, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Unassigned' },
  { id: 13, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emma Bros Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Sarah Badmus' },
  { id: 14, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Xela pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Josh Michael' },
  { id: 15, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', payment: 'Cheque', order_date: '2025-01-16', delivery_date: '2025-01-16', total_amount: '₦47,400.00', assigned: 'Femi Babalola' }
]);

// Mock data for order details
const orderItems = ref([
  {
    id: 1,
    product_name: 'Paracetamol 500mg',
    tags: 'Controlled',
    quantity_delivered: 100,
    unit_price: 50.00,
    price_total: 5000.00
  },
  {
    id: 2,
    product_name: 'Ibuprofen 200mg',
    tags: 'Hospital',
    quantity_delivered: 50,
    unit_price: 70.00,
    price_total: 3500.00
  },
  {
    id: 3,
    product_name: 'Amoxicillin 250mg',
    tags: 'Cash and Carry',
    quantity_delivered: 75,
    unit_price: 116.67,
    price_total: 8750.00
  }
]);

const orderActivities = ref([
  {
    id: 1,
    action: 'New order assigned',
    description: 'Order assigned to John Doe',
    user: 'System',
    time: '2024-01-15 09:30:00',
    details: 'Automatic assignment based on workload'
  },
  {
    id: 2,
    action: 'New order status changed',
    description: 'Status changed from Picked & Packed to Delivered',
    user: 'John Doe',
    time: '2024-01-15 10:15:00',
    details: 'Order successfully delivered to customer'
  },
  {
    id: 3,
    action: 'Order delivered',
    description: 'Order delivered successfully',
    user: 'John Doe',
    time: '2024-01-15 11:00:00',
    details: 'Customer signature obtained'
  }
]);

// Time Tracker Stages
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'New Order → Order Confirmed', time: '1-2 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#0C66E4' },
  { id: 3, department: 'Inventory', process: 'Order is Being Processed → Order has been Picked and Packed', time: '2 minutes', color: '#0C66E4' },
  { id: 4, department: 'Inventory', process: 'Order has been Picked and Packed → Order is Awaiting Shipment', time: '2 minutes', color: '#0C66E4' },
  { id: 5, department: 'Logistics', process: 'Order is Awaiting Shipment → Items have been Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Items have been Shipped for Delivery → Items Delivered', time: '2 seconds', color: '#22A06B' }
]);

// Helper function
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return dayjs(dateString).format('D/M/YYYY');
};

// Actions
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

const assignToMe = (order: any) => {
  // Update order assignment
  const orderIndex = heldOrdersList.value.findIndex(o => o.id === order.id);
  if (orderIndex !== -1) {
    heldOrdersList.value[orderIndex].assigned = 'You';
  }
  // Show success toast
  showAssignToast.value = true;
  childKey.value++;
};

const releaseOrder = (order: any) => {
  console.log('Release order:', order);
  // Implement release order logic
};

const openTimeTracker = (order: any) => {
  selectedOrder.value = order;
  showTimeTrackerModal.value = true;
};

const viewOrderActivities = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};
</script>

