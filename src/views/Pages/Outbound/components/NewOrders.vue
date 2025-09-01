<template>
  <div>

    <!-- Loading State -->
    <div v-if="loading" class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <LoadingState />
    </div>

            <!-- Datatable -->
        <Datatable 
          :url="ordersUrl" 
          :filterByDate="true" 
          :searchable="true"
          :sortable="true"
          :exportable="false"
          :printable="false"
          :columns="orderColumns" 
          pageName="OutboundNewOrders"
          :filterFields="filterFields"
          :key="datatableKey"
          
        >
      <template #column="col">
        <!-- Order No -->
        <span v-if="col.props.column.field === 'order_no'">
          <span class="font-medium">{{ col.props.row.order_no }}</span>
        </span>
        
        <!-- Customer Name -->
        <span v-else-if="col.props.column.field === 'customer_name'">
          <span>{{ col.props.row.customer_name }}</span>
        </span>
        
        <!-- Store Name -->
        <span v-else-if="col.props.column.field === 'store_name'">
          <span class="text-gray-700">{{ col.props.row.store_name }}</span>
        </span>
        
        <!-- State -->
        <span v-else-if="col.props.column.field === 'state'">
          <span class="text-gray-700">{{ col.props.row.state }}</span>
        </span>
        
        <!-- Payment -->
        <span v-else-if="col.props.column.field === 'payment'">
          <span class="text-gray-700">{{ col.props.row.payment }}</span>
        </span>
        
        <!-- Order Date -->
        <span v-else-if="col.props.column.field === 'order_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.order_date) }}</span>
        </span>
        
        <!-- Delivery Date -->
        <span v-else-if="col.props.column.field === 'delivery_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.delivery_date) }}</span>
        </span>
        
        <!-- Total Amount -->
        <span v-else-if="col.props.column.field === 'total_amount'">
          <span>{{ formatCurrency(col.props.row.total_amount) }}</span>
        </span>
        
        <!-- Tags -->
        <span v-else-if="col.props.column.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <Pill 
              v-for="tag in col.props.row.tags" 
              :key="tag"
              :type="getPillType(tag)"
              :text="tag"
            />
          </div>
        </span>
        
        <!-- Assigned -->
        <span v-else-if="col.props.column.field === 'assigned'">
          <div v-if="col.props.row.assigned" class="flex items-center gap-2">
            <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600">{{ col.props.row.assigned.charAt(0) }}</span>
            </div>
            <span class="text-sm text-gray-700">{{ col.props.row.assigned }}</span>
          </div>
          <span v-else class="text-red-600 text-sm">Unassigned</span>
        </span>
        
                            <!-- Action -->
                    <span v-else-if="col.props.column.field === 'action'">
                      <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" @click="viewOrder(col.props.row)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#44546F"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#44546F"/>
                        </svg>
                      </button>
                    </span>
      </template>
    </Datatable>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      @close="isOrderDetailsModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
// Eye icon is now inline SVG
import type { TableColumn, FilterFields, FilterField } from '@/types';
import dayjs from 'dayjs';
import { ref, computed } from 'vue';

// Loading state
const loading = ref(false);
const datatableKey = ref(0);

// API URL for new orders
const ordersUrl = '/outbound/orders';

// Filter fields for additional filtering options
const filterFields = ref<FilterFields<FilterField>>({
  state: {
    field: 'state',
    label: 'State',
    type: 'select',
    options: [
      { id: 'Lagos', name: 'Lagos' },
      { id: 'Abuja', name: 'Abuja' },
      { id: 'Rivers', name: 'Rivers' },
      { id: 'Ogun', name: 'Ogun' },
      { id: 'Kano', name: 'Kano' },
      { id: 'Kaduna', name: 'Kaduna' },
      { id: 'Anambra', name: 'Anambra' },
      { id: 'Oyo', name: 'Oyo' },
      { id: 'Delta', name: 'Delta' }
    ]
  },
  payment: {
    field: 'payment',
    label: 'Payment Type',
    type: 'select',
    options: [
      { id: 'Trade', name: 'Trade' },
      { id: 'Credit', name: 'Credit' },
      { id: 'Cash', name: 'Cash' }
    ]
  }
});



// Table columns - all sortable except tags and action
const orderColumns = ref<TableColumn[]>([
  {
    field: 'order_no',
    label: 'Order No.',
    sortable: true
  },
  {
    field: 'customer_name',
    label: 'Customer Name',
    sortable: true
  },
  {
    field: 'store_name',
    label: 'Store Name',
    sortable: true
  },
  {
    field: 'state',
    label: 'State',
    sortable: true
  },
  {
    field: 'payment',
    label: 'Payment',
    sortable: true
  },
  {
    field: 'order_date',
    label: 'Order Date',
    sortable: true
  },
  {
    field: 'delivery_date',
    label: 'Delivery Date',
    sortable: true
  },
  {
    field: 'total_amount',
    label: 'Total Amount',
    sortable: true
  },
  {
    field: 'tags',
    label: 'Tags',
    sortable: false
  },
  {
    field: 'assigned',
    label: 'Assigned',
    sortable: true
  },
  {
    field: 'action',
    label: 'Action',
    sortable: false
  }
]);

// Utility functions
const formatDate = (date: string) => {
  return dayjs(date).format('M/D/YYYY');
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

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

// Modal state
const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<any>({});

// Mock order items and activities
const orderItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 20,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 10,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  }
]);

const orderActivities = ref([
  {
    id: 1,
    action: 'New order assigned',
    description: 'Order assigned to Oreva Emamoro',
    user: 'System',
    time: 'Yesterday 10:45pm',
    details: 'Automatic assignment based on workload'
  },
  {
    id: 2,
    action: 'Status changed',
    description: 'Status changed from New to Confirmed',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm',
    details: 'Order confirmed by agent'
  },
  {
    id: 3,
    action: 'Order updated',
    description: 'Order details updated',
    user: 'Oreva Emamoro',
    time: 'Today 12:46pm',
    details: 'Updated delivery address'
  }
]);

// Modal title with order reference (plain text)
// Modal reference data is now handled by OrderHeader component



const viewOrder = (order: any) => {
  console.log('View order:', order);
  selectedOrder.value = order;
  isOrderDetailsModalOpen.value = true;
};
</script>

<style scoped>
</style> 