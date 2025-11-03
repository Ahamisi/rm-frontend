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
            
            <!-- Ship Order Button -->
            <button
              @click="shipOrder(slotProps.row)"
              class="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Ship Order"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V4H16C16.5523 4 17 4.44772 17 5V15C17 15.5523 16.5523 16 16 16H14V17C14 17.5523 13.5523 18 13 18H3C2.44772 18 2 17.5523 2 17V3ZM4 4V16H12V4H4ZM14 6H15V14H14V6ZM6 6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H7C6.44772 7 6 6.55228 6 6ZM6 10C6 9.44772 6.44772 9 7 9H9C9.55228 9 10 9.44772 10 10C10 10.5523 9.55228 11 9 11H7C6.44772 11 6 10.5523 6 10ZM6 14C6 13.4477 6.44772 13 7 13H9C9.55228 13 10 13.4477 10 14C10 14.5523 9.55228 15 9 15H7C6.44772 15 6 14.5523 6 14Z" fill="currentColor"/>
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

// API URL for pharmacy picked & packed orders
const ordersUrl = '/pharmacy/orders/picked-packed';

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
  { label: 'Packed Date', field: 'packed_date', sortable: true },
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
    case 'picked & packed':
      return 'picked-packed';
    case 'shipped':
      return 'shipped';
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

const shipOrder = (order: any) => {
  // Handle order shipping logic
  console.log('Shipping order:', order);
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

/* Force the ship button styling */
:deep(table tbody td button[title="Ship Order"]) {
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

:deep(table tbody td button[title="Ship Order"]:hover) {
  background-color: #eef2ff !important;
  border-color: #6366f1 !important;
  color: #6366f1 !important;
}

/* Ensure button SVGs are visible */
:deep(table tbody td button svg) {
  display: block !important;
  visibility: visible !important;
}
</style>
