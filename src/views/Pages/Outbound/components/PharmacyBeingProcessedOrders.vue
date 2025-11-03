<template>
  <div class="flex-1 flex flex-col min-h-0">
    <!-- Loading State -->
    <LoadingState v-if="loading" />

    <!-- Datatable -->
    <Datatable
      v-else
      :key="datatableKey"
      :url="ordersUrl"
      :columns="columns"
      :filterFields="filterFields"
      :searchable="true"
      :filterByDate="true"
      :printable="true"
      :exportable="true"
      :showActions="true"
      :showPagination="true"
      @view-order="viewOrder"
    >
      <!-- Custom column rendering -->
      <template #column="{ props: slotProps }">
        <!-- Status Column -->
        <template v-if="slotProps.column.field === 'status'">
          <Pill 
            :type="getPillType(slotProps.row.status)" 
            :text="slotProps.row.status" 
          />
        </template>
        
        <!-- Actions Column -->
        <template v-else-if="slotProps.column.field === 'actions'">
          <div class="flex items-center gap-2">
            <!-- View Order Button -->
            <button
              @click="viewOrder(slotProps.row)"
              class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Order Details"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="currentColor"/>
              </svg>
            </button>
            
            <!-- Pack Order Button -->
            <button
              @click="packOrder(slotProps.row)"
              class="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Pack Order"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4ZM4 1C2.34315 1 1 2.34315 1 4V6C1 7.65685 2.34315 9 4 9H16C17.6569 9 19 7.65685 19 6V4C19 2.34315 17.6569 1 16 1H4ZM4 11C3.44772 11 3 11.4477 3 12V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11H4ZM1 12C1 10.3431 2.34315 9 4 9H16C17.6569 9 19 10.3431 19 12V16C19 17.6569 17.6569 19 16 19H4C2.34315 19 1 17.6569 1 16V12Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </template>
        
        <!-- Default for other columns -->
        <template v-else>
          {{ slotProps.formattedRow[slotProps.column.field] }}
        </template>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import type { TableColumn, FilterFields, FilterField } from '@/types';
import { ref, computed } from 'vue';

// Emits
const emit = defineEmits<{
  'view-order': [order: any]
}>();

// Loading state
const loading = ref(false);
const datatableKey = ref(0);

// API URL for pharmacy being processed orders
const ordersUrl = '/pharmacy/orders/processing';

// Filter fields for additional filtering options
const filterFields = ref<FilterFields<FilterField>>({
  pharmacy: {
    field: 'pharmacy_name',
    label: 'Pharmacy',
    type: 'select',
    options: [
      { value: 'emeka-pharmacy', label: 'Emeka Pharmacy' },
      { value: 'emma-bros-pharmacy', label: 'Emma Bros Pharmacy' },
      { value: 'xela-pharmacy', label: 'Xela Pharmacy' },
      { value: 'medplus-pharmacy', label: 'MedPlus Pharmacy' }
    ]
  },
  customer_type: {
    field: 'customer_type',
    label: 'Customer Type',
    type: 'select',
    options: [
      { value: 'individual', label: 'Individual' },
      { value: 'hmo', label: 'HMO' },
      { value: 'corporate', label: 'Corporate' }
    ]
  }
});

// Table columns
const columns = ref<TableColumn[]>([
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Pharmacy', field: 'pharmacy_name', sortable: true },
  { label: 'Customer Type', field: 'customer_type', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Processing Date', field: 'processing_date', sortable: true },
  { label: 'Actions', field: 'actions', sortable: false }
]);

// Helper functions
const getPillType = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'new':
      return 'new';
    case 'confirmed':
      return 'success';
    case 'processing':
      return 'processing';
    case 'delivered':
      return 'delivered';
    case 'cancelled':
      return 'cancelled';
    default:
      return 'default';
  }
};

// Methods
const viewOrder = (order: any) => {
  emit('view-order', order);
};

const packOrder = (order: any) => {
  // Handle order packing logic
  console.log('Packing order:', order);
  // You can emit an event or call an API here
};
</script>

<style scoped>
/* Force custom styling for this page's datatable buttons */
:deep(table tbody td button) {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
  line-height: inherit !important;
}

/* Force the view button styling */
:deep(table tbody td button[title="View Order Details"]) {
  background-color: white !important;
  color: #44546F !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid #e5e7eb !important;
  transition: all 0.2s !important;
}

:deep(table tbody td button[title="View Order Details"]:hover) {
  background-color: #f0f9ff !important;
  border-color: #0ea5e9 !important;
  color: #0ea5e9 !important;
}

/* Force the pack button styling */
:deep(table tbody td button[title="Pack Order"]) {
  background-color: white !important;
  color: #44546F !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid #e5e7eb !important;
  transition: all 0.2s !important;
}

:deep(table tbody td button[title="Pack Order"]:hover) {
  background-color: #faf5ff !important;
  border-color: #9333ea !important;
  color: #9333ea !important;
}

/* Ensure button SVGs are visible */
:deep(table tbody td button svg) {
  display: block !important;
  visibility: visible !important;
}
</style>
