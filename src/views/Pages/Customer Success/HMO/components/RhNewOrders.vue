<template>
  <div>
    <Datatable
      :items="rhNewOrders"
      :columns="rhNewOrderColumns"
      :searchable="true"
      :filterByDate="false"
      :printable="false"
      :exportable="false"
      :filterFields="{}"
      pageName="RhNewOrders"
      :key="childKey"
    >
      <template #column="col">
        <!-- Action Column -->
        <span v-if="col.props?.column?.field === 'action'">
          <div class="relative">
            <button 
              @click="toggleActionMenu(col.props?.formattedRow)"
              class="text-gray-500 hover:text-gray-700"
              title="More actions"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <!-- Action Dropdown Menu -->
            <div v-if="showActionMenu && selectedOrderForMenu?.order_no === col.props?.formattedRow?.order_no" 
                 class="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div class="py-1">
                <button @click="viewOrder(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  View Order
                </button>
                <button @click="changeStatus(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Change Status
                </button>
                <button @click="activityLog(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Activity Log
                </button>
              </div>
            </div>
          </div>
        </span>

        <!-- Default Column -->
        <span v-else>
          {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
        </span>
      </template>
    </Datatable>

    <!-- Side Bar Modal for Order Details -->
    <SideBarModal
      :isOpen="showOrderModal"
      title="Order Details"
      @update:isOpen="closeOrderModal"
      @close="closeOrderModal"
    >
      <div v-if="selectedOrder" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Order No.</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.order_no }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">HMO Name</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.hmo_name }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Store Name</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.store_name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">State</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.state }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Order Date</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.order_date }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Delivery Type</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.delivery_type }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Cost Price</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.total_cost_price }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Selling Price</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.total_selling_price }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Warehouse</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.warehouse }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Warehouse State</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.warehouse_state }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Warehouse LGA</label>
          <p class="text-sm text-gray-900">{{ selectedOrder.warehouse_lga }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <button @click="closeOrderModal" class="cancel_btn">Close</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Activities Component -->
    <Activities 
      :isOpen="showActivities" 
      @close="showActivities = false"
      :activities="orderActivities"
      title="Order Activities"
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
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Activities from "@/views/Components/Activities.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import { ref, onMounted, onUnmounted } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showOrderModal = ref(false);
const showActivities = ref(false);
const showActionMenu = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const selectedOrder = ref<any>(null);
const selectedOrderForMenu = ref<any>(null);

// Column definitions
const rhNewOrderColumns = ref<TableColumn[]>([
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

// Mock RH new orders data
const rhNewOrders = ref([
  {
    order_no: 'RHPO-1651244214',
    hmo_name: 'Oluwatosin HMO',
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
    order_no: 'RHPO-1651244214',
    hmo_name: 'Reliance Health',
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
    order_no: 'RHPO-1651244214',
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
    order_no: 'RHPO-1651244214',
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
    order_no: 'RHPO-1651244214',
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
  }
]);

// Mock activities data
const orderActivities = ref([
  {
    id: 1,
    title: 'Order Created',
    description: 'RH Order RHPO-1651244214 was created',
    timestamp: '2024-05-21 10:30:00',
    user: 'System',
    type: 'created'
  },
  {
    id: 2,
    title: 'Order Confirmed',
    description: 'Order confirmed by admin',
    timestamp: '2024-05-21 11:00:00',
    user: 'Admin User',
    type: 'confirmed'
  }
]);

// Methods
const toggleActionMenu = (order: any) => {
  if (selectedOrderForMenu.value?.order_no === order.order_no) {
    showActionMenu.value = !showActionMenu.value;
  } else {
    selectedOrderForMenu.value = order;
    showActionMenu.value = true;
  }
};

const viewOrder = (order: any) => {
  selectedOrder.value = order;
  showOrderModal.value = true;
  showActionMenu.value = false;
};

const changeStatus = (order: any) => {
  toastMessage.value = `Status changed for order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const activityLog = (order: any) => {
  selectedOrder.value = order;
  showActivities.value = true;
  showActionMenu.value = false;
};

const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedOrder.value = null;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showActionMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
/* Add any specific styles for RH New Orders */
</style>
