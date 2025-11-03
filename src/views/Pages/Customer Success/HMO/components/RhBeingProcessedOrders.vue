<template>
  <div>
    <Datatable
      :items="rhBeingProcessedOrders"
      :columns="rhBeingProcessedOrderColumns"
      :searchable="true"
      :filterByDate="false"
      :printable="false"
      :exportable="false"
      :filterFields="{}"
      pageName="RhBeingProcessedOrders"
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
                <button @click="unassignOrder(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Unassign
                </button>
                <button @click="changeStatus(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Change Status
                </button>
                <button @click="timeTracker(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Time Tracker
                </button>
                <button @click="activityLog(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Activity Log
                </button>
                <button @click="downloadPickingList(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Download Picking List
                </button>
                <button @click="pickOrder(selectedOrderForMenu)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Pick Order
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
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import { ref, onMounted, onUnmounted } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showActionMenu = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const selectedOrderForMenu = ref<any>(null);

// Column definitions
const rhBeingProcessedOrderColumns = ref<TableColumn[]>([
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
const rhBeingProcessedOrders = ref([
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
  toastMessage.value = `Viewing order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const unassignOrder = (order: any) => {
  toastMessage.value = `Order ${order.order_no} unassigned successfully`;
  showToast.value = true;
  showActionMenu.value = false;
};

const changeStatus = (order: any) => {
  toastMessage.value = `Status changed for order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const timeTracker = (order: any) => {
  toastMessage.value = `Time tracker opened for order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const activityLog = (order: any) => {
  toastMessage.value = `Activity log opened for order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const downloadPickingList = (order: any) => {
  toastMessage.value = `Picking list downloaded for order ${order.order_no}`;
  showToast.value = true;
  showActionMenu.value = false;
};

const pickOrder = (order: any) => {
  toastMessage.value = `Order ${order.order_no} picked successfully`;
  showToast.value = true;
  showActionMenu.value = false;
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
/* Add any specific styles for RH Being Processed Orders */
</style>
