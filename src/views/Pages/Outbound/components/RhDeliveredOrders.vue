<template>
  <div>
    <Datatable
      :items="rhDeliveredOrders"
      :columns="rhDeliveredOrderColumns"
      :searchable="true"
      :filterByDate="false"
      :printable="false"
      :exportable="false"
      :filterFields="{}"
      pageName="RhDeliveredOrders"
      :key="childKey"
    >
      <template #column="col">
        <!-- Action Column -->
        <span v-if="col.props?.column?.field === 'action'">
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
        </span>

        <!-- Default Column -->
        <span v-else>
          {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
        </span>
      </template>
    </Datatable>

    <!-- Order Details Modal -->
    <SideBarModal
      v-if="isOrderDetailsModalOpen"
      :isOpen="isOrderDetailsModalOpen"
      :title="modalTitle"
      width="50vw"
      @close="isOrderDetailsModalOpen = false"
    >
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          v-for="tab in orderTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-[#172B4D] hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Details Tab -->
        <div v-if="activeTab === 'details'" class="space-y-6">
          <!-- HMO Information -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">HMO Name</span>
              <span class="text-sm text-[#44546F]">{{ selectedOrder?.hmo_name }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Customer Type</span>
              <span class="text-sm text-[#44546F]">HMO</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Phone</span>
              <span class="text-sm text-[#44546F] flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                +234 809 123 4567
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Store</span>
              <span class="text-sm text-[#44546F] flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                {{ selectedOrder?.store_name }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Loan Limit</span>
              <span class="text-sm text-[#44546F]">₦2,000,000.00</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Amount to Reach Loan Limit</span>
              <span class="text-sm text-[#44546F]">₦0.00</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Outstanding Loan</span>
              <span class="text-sm text-[#44546F]">₦0.00</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-[#172B4D]">Date</span>
              <span class="text-sm text-[#44546F] flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                {{ selectedOrder?.order_date }} - 11:13 AM
              </span>
            </div>
          </div>

          <!-- Delivery Details -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-[#44546F] mb-4">Delivery Details</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-[#172B4D]">Patient's Name</span>
                <span class="text-sm text-[#44546F]">Esther Kalu</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-[#172B4D]">Patient's Phone</span>
                <span class="text-sm text-[#44546F] flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                  </svg>
                  +234 809 123 4567
                </span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium text-[#172B4D]">Patient's Address</span>
                <span class="text-sm text-[#44546F] text-right flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 17.5C8.1 17.5 5 10.2617 5 7.5C5 6.17392 5.52678 4.90215 6.46447 3.96447C7.40215 3.02678 8.67392 2.5 10 2.5C11.3261 2.5 12.5979 3.02678 13.5355 3.96447C14.4732 4.90215 15 6.17392 15 7.5C15 10.2617 11.9 17.5 10 17.5ZM10 10C10.3187 10 10.6342 9.93723 10.9286 9.81528C11.2231 9.69333 11.4906 9.51458 11.7159 9.28925C11.9412 9.06391 12.12 8.7964 12.2419 8.50198C12.3639 8.20756 12.4267 7.89201 12.4267 7.57333C12.4267 7.25466 12.3639 6.9391 12.2419 6.64469C12.12 6.35027 11.9412 6.08276 11.7159 5.85742C11.4906 5.63208 11.2231 5.45334 10.9286 5.33139C10.6342 5.20943 10.3187 5.14667 10 5.14667C9.35641 5.14667 8.73918 5.40233 8.28409 5.85742C7.829 6.31251 7.57333 6.92974 7.57333 7.57333C7.57333 8.21693 7.829 8.83416 8.28409 9.28925C8.73918 9.74433 9.35641 10 10 10Z" fill="#091E42" fill-opacity="0.31"/>
                  </svg>
                  302b Abisogun Leigh St. Ogba, Ikeja 101233, Lagos, Nigeria
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-[#172B4D]">State</span>
                <span class="text-sm text-[#44546F]">Lagos State</span>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-[#44546F] mb-4">Order Summary</h3>
            
            <!-- Products Table -->
            <div class="mb-6">
              <Datatable
                :items="orderProducts"
                :columns="orderProductColumns"
                :searchable="false"
                :filterByDate="false"
                :printable="false"
                :exportable="false"
                :showActions="false"
                :showPagination="false"
                class="order-summary-table"
              >
                <template #column="{ props }">
                  <div v-if="props.column.field === 'tags'">
                    <Pill 
                      v-if="props.row.tags"
                      :type="getPillType(props.row.tags)"
                      :text="props.row.tags"
                    />
                  </div>
                  <span v-else>
                    {{ props.row[props.column.field] }}
                  </span>
                </template>
              </Datatable>
            </div>

            <!-- Totals -->
            <div class="sticky-totals-section">
              <div class="space-y-4 px-4 py-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Total Cost Price</span>
                  <span class="text-sm text-[#44546F]">₦187,000.00</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Total Selling Price</span>
                  <span class="text-sm text-[#44546F]">₦187,000.00</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Shipping Fee</span>
                  <span class="text-sm text-[#44546F]">₦0.00</span>
                </div>
                <div class="flex justify-between items-center border-t pt-4" style="border-color: #091E4224;">
                  <span class="text-lg font-semibold text-[#44546F]">Total</span>
                  <span class="text-lg font-semibold text-[#44546F]">₦187,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Tab -->
        <div v-if="activeTab === 'activities'" class="space-y-4">
          <Activities :activities="orderActivities" :order-ref="selectedOrder?.order_no || ''" />
        </div>
      </div>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import Activities from '@/views/Components/Activities.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);

// Modal states
const isOrderDetailsModalOpen = ref(false);
interface Order {
  order_no: string;
  hmo_name: string;
  store_name: string;
  state: string;
  order_date: string;
  processing_date: string;
  delivery_type: string;
  total_cost_price: string;
  total_selling_price: string;
  warehouse: string;
  warehouse_state: string;
  warehouse_lga: string;
}

const selectedOrder = ref<Order | null>(null);
const activeTab = ref('details');

// Tab management
const orderTabs = ref([
  { id: 'details', label: 'Details' },
  { id: 'activities', label: 'Activities' }
]);

// Column definitions
const rhDeliveredOrderColumns = ref<TableColumn[]>([
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
]);

// Mock data
const rhDeliveredOrders = ref([
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
  }
]);

// Order products for the summary table
const orderProductColumns = ref([
  { label: 'Product Name', field: 'product_name', sortable: false },
  { label: 'Tags', field: 'tags', sortable: false },
  { label: 'Quantity Delivered', field: 'quantity_delivered', sortable: false },
  { label: 'Unit Price', field: 'unit_price', sortable: false },
  { label: 'Price Total', field: 'price_total', sortable: false }
]);

const orderProducts = ref([
  {
    product_name: 'Paracetamol 500mg Tablets',
    tags: 'OTC',
    quantity_delivered: 100,
    unit_price: '₦250.00',
    price_total: '₦25,000.00'
  },
  {
    product_name: 'Amoxicillin 250mg Capsules',
    tags: 'Prescription',
    quantity_delivered: 50,
    unit_price: '₦450.00',
    price_total: '₦22,500.00'
  },
  {
    product_name: 'Ibuprofen 400mg Tablets',
    tags: 'OTC',
    quantity_delivered: 75,
    unit_price: '₦320.00',
    price_total: '₦24,000.00'
  }
]);

const orderActivities = ref([
  {
    action: 'Order delivered',
    user: 'Delivery Team',
    time: 'Today 2:30 PM',
  },
  {
    action: 'Order status changed',
    user: 'System',
    time: 'Today 2:25 PM',
  },
  {
    action: 'Order dispatched',
    user: 'Warehouse Team',
    time: 'Today 8:00 AM',
  }
]);

// Computed modal title
const modalTitle = computed(() => {
  return selectedOrder.value?.order_no ? `Order Details REF: ${selectedOrder.value.order_no}` : 'Order Details';
});

// Methods
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

const viewOrder = (order: any) => {
  selectedOrder.value = order;
  isOrderDetailsModalOpen.value = true;
  activeTab.value = 'details';
};

</script>

<style scoped>
/* Order Summary Table Styling */
.order-summary-table {
  font-size: 12px;
  color: #172B4D;
}

.order-summary-table table {
  font-size: 12px;
}

.order-summary-table th,
.order-summary-table td {
  font-size: 12px !important;
  color: #172B4D !important;
}

.order-summary-table .bg-gray-100 {
  background-color: #f8f9fa !important;
}

/* Sticky Totals Section */
.sticky-totals-section {
  position: sticky;
  bottom: 0;
  background-color: #F7F8F9;
  border-top: 1px solid #091E4224;
  border-bottom: 1px solid #091E4224;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: -24px;
  z-index: 10;
}
</style>

<style scoped>
/* Add any specific styles for RH Delivered Orders */
</style>
