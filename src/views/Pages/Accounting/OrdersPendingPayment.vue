<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / Orders Pending Payment" class="px-6" />

      <!-- Datatable -->
      <div class="px-6">
        <Datatable
          :items="pendingPaymentOrdersList" 
          :filterByDate="true"
          :searchable="true"
          :sortable="true"
          :exportable="false"
          :printable="false"
          :columns="pendingPaymentColumns" 
          :key="childKey"
          pageName="AccountingOrdersPendingPayment" 
        >
          <template #header_actions>
            <div class="flex items-center gap-3">
              <Button 
                type="gray-btn"
                :onClick="downloadReport"
                classStyle="px-4 py-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                  <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                </svg>
                Download Report
              </Button>
            </div>
          </template>
          
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

            <!-- Order Date -->
            <span v-else-if="col.props?.column?.field === 'order_date'">
              <span class="text-gray-700">{{ formatDate((col.props?.formattedRow as any)?.['order_date'] || col.props?.row?.order_date || '') }}</span>
            </span>

            <!-- Total Amount -->
            <span v-else-if="col.props?.column?.field === 'total_amount'">
              <span class="font-medium">{{ (col.props?.formattedRow as any)?.['total_amount'] || col.props?.row?.total_amount || '' }}</span>
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
                  
                  <!-- Confirm Order Payment -->
                  <li @click="openConfirmPaymentModal(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM10.3824 11.0689C10.5044 11.1213 10.6148 11.1975 10.707 11.293L12 12.586L15.293 9.29302C15.3852 9.19751 15.4956 9.12133 15.6176 9.06892C15.7396 9.01651 15.8708 8.98892 16.0036 8.98777C16.1364 8.98662 16.2681 9.01192 16.391 9.0622C16.5138 9.11248 16.6255 9.18673 16.7194 9.28063C16.8133 9.37452 16.8875 9.48617 16.9378 9.60907C16.9881 9.73196 17.0134 9.86364 17.0122 9.99642C17.0111 10.1292 16.9835 10.2604 16.9311 10.3824C16.8787 10.5044 16.8025 10.6148 16.707 10.707L12.707 14.707C12.5195 14.8945 12.2652 14.9998 12 14.9998C11.7348 14.9998 11.4805 14.8945 11.293 14.707L9.293 12.707C9.19749 12.6148 9.1213 12.5044 9.0689 12.3824C9.01649 12.2604 8.9889 12.1292 8.98775 11.9964C8.98659 11.8636 9.0119 11.732 9.06218 11.6091C9.11246 11.4862 9.18671 11.3745 9.2806 11.2806C9.3745 11.1867 9.48615 11.1125 9.60904 11.0622C9.73194 11.0119 9.86362 10.9866 9.9964 10.9878C10.1292 10.9889 10.2604 11.0165 10.3824 11.0689Z" fill="#626F86"/>
                    </svg>
                    Confirm Order Payment
                  </li>
                  
                  <!-- Cancel Order -->
                  <li @click="openCancelOrderModal(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0616 4.96699C11.5776 3.99299 12.4196 3.98899 12.9376 4.96699L20.0616 18.425C20.5776 19.399 20.1066 20.196 19.0046 20.196H4.99458C3.89258 20.196 3.41958 19.403 3.93758 18.425L11.0616 4.96699ZM11.2925 14.7071C11.48 14.8946 11.7344 15 11.9996 15C12.2648 15 12.5192 14.8946 12.7067 14.7071C12.8942 14.5196 12.9996 14.2652 12.9996 14V8.99998C12.9996 8.73477 12.8942 8.48041 12.7067 8.29288C12.5192 8.10534 12.2648 7.99998 11.9996 7.99998C11.7344 7.99998 11.48 8.10534 11.2925 8.29288C11.1049 8.48041 10.9996 8.73477 10.9996 8.99998V14C10.9996 14.2652 11.1049 14.5196 11.2925 14.7071ZM11.2925 17.7071C11.48 17.8946 11.7344 18 11.9996 18C12.2648 18 12.5192 17.8946 12.7067 17.7071C12.8942 17.5196 12.9996 17.2652 12.9996 17C12.9996 16.7348 12.8942 16.4804 12.7067 16.2929C12.5192 16.1053 12.2648 16 11.9996 16C11.7344 16 11.48 16.1053 11.2925 16.2929C11.1049 16.4804 10.9996 16.7348 10.9996 17C10.9996 17.2652 11.1049 17.5196 11.2925 17.7071Z" fill="#626F86"/>
                    </svg>
                    Cancel Order
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

    <!-- Confirm Order Payment Modal -->
    <WarningConfirmationModal
      :show="showConfirmPaymentModal"
      title="Confirm Order Payment"
      :message="confirmPaymentMessage"
      confirmText="Confirm Payment"
      cancelText="Cancel"
      confirmButtonType="yellow-btn"
      @close="showConfirmPaymentModal = false"
      @confirm="confirmOrderPayment"
    />

    <!-- Cancel Order Modal -->
    <WarningConfirmationModal
      :show="showCancelOrderModal"
      title="Cancel Order"
      :message="cancelOrderMessage"
      confirmText="Cancel Order"
      cancelText="Cancel"
      confirmButtonType="yellow-btn"
      @close="showCancelOrderModal = false"
      @confirm="cancelOrder"
    />

    <!-- Success Toast for Download Report -->
    <SuccessAlertToast 
      :isVisible="showDownloadToast" 
      message="Report downloaded successfully" 
      @close="showDownloadToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import dayjs from 'dayjs';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);

// Modal states
const isOrderDetailsModalOpen = ref(false);
const showConfirmPaymentModal = ref(false);
const showCancelOrderModal = ref(false);
const showDownloadToast = ref(false);

// Selected data
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

// Table columns
const pendingPaymentColumns: TableColumn[] = [
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for pending payment orders
const pendingPaymentOrdersList = ref([
  { id: 1, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 2, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 3, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 4, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emma Bros Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 5, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 6, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emma Bros Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 7, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Xela pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 8, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Xela pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 9, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Xela pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 10, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 11, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Emma Bros Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 12, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 13, order_no: 'RHPO-1651244214', customer_name: 'Oluwatosin Adegboye', store_name: 'Emma Bros Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 14, order_no: 'RHPO-1651244214', customer_name: 'Janet Adeajayi', store_name: 'Xela pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' },
  { id: 15, order_no: 'RHPO-1651244214', customer_name: 'Henry Christopher', store_name: 'Emeka Pharmacy', state: 'Lagos', order_date: '2025-01-16', total_amount: '₦47,400.00' }
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

// Computed messages
const confirmPaymentMessage = computed(() => {
  return `You are about to confirm payment for order "#REF: ${selectedOrder.value.order_no || '1656493689-254'}". This action will complete the order and begin fulfillment.`;
});

const cancelOrderMessage = computed(() => {
  return `You are about to cancel this order "#REF: ${selectedOrder.value.order_no || '1656493689-254'}". This action will stop the order process. You may be able to resume this order later.`;
});

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

const viewOrderActivities = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};

const openConfirmPaymentModal = (order: any) => {
  selectedOrder.value = order;
  showConfirmPaymentModal.value = true;
};

const confirmOrderPayment = () => {
  console.log('Confirm payment for order:', selectedOrder.value);
  // Implement confirm payment logic
  showConfirmPaymentModal.value = false;
  childKey.value++;
};

const openCancelOrderModal = (order: any) => {
  selectedOrder.value = order;
  showCancelOrderModal.value = true;
};

const cancelOrder = () => {
  console.log('Cancel order:', selectedOrder.value);
  // Implement cancel order logic
  showCancelOrderModal.value = false;
  childKey.value++;
};

const downloadReport = () => {
  showDownloadToast.value = true;
};
</script>

