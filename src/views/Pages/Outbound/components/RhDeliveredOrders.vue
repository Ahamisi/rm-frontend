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
            class="text-gray-500 hover:text-gray-700"
            title="More actions"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

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
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  }
]);

// Methods
const viewOrder = (order: any) => {
  toastMessage.value = `Viewing order ${order.order_no}`;
  showToast.value = true;
};

</script>

<style scoped>
/* Add any specific styles for RH Delivered Orders */
</style>
