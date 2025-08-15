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
          <span class="font-medium text-gray-900">{{ col.props.row.customer_name }}</span>
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
          <span class="font-medium text-gray-900">{{ formatCurrency(col.props.row.total_amount) }}</span>
        </span>
        
        <!-- Tags -->
        <span v-else-if="col.props.column.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="tag in col.props.row.tags" 
              :key="tag"
              :class="getTagClass(tag)"
              class="px-2 py-1 text-xs font-medium rounded-md"
            >
              {{ tag }}
            </span>
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
    <SideBarModal 
      :title="modalTitle" 
      :is-open="isOrderDetailsModalOpen" 
      width="xl"
      @update:is-open="isOrderDetailsModalOpen = $event" 
      :initial-form-data="selectedOrder"
      @close="isOrderDetailsModalOpen = false"
    >
      <!-- Main content -->
      <template #default>
        <div class="space-y-6">
          <!-- Tab Navigation -->
          <div class="mb-6 border-b border-gray-200">
            <div class="flex gap-x-2">
              <button 
                v-for="tab in orderTabs" 
                :key="tab" 
                @click="activeTab = tab"
                :class="[
                  'px-1 py-3 -mb-px text-sm font-medium border-b-2 transition-colors tab_text',
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Details Tab Content -->
          <div v-if="activeTab === 'Details'" class="space-y-6">
            <!-- Order Information Grid -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="key">Customer's Name</span>
                <span class="value">{{ selectedOrder.customer_name }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Customer Type</span>
                <span class="value">{{ selectedOrder.customer_type || 'Pharmacy' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Order By</span>
                <span class="value">{{ selectedOrder.customer_name }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Agent Name</span>
                <span class="value">{{ selectedOrder.assigned }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Phone</span>
                <div class="flex items-center space-x-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31" />
                  </svg>
                  <span class="value">{{ selectedOrder.phone || '+234 809 123 4567' }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Store</span>
                <div class="flex items-center space-x-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31" />
                  </svg>
                  <span class="value">{{ selectedOrder.store_name }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Loan Limit</span>
                <span class="value">₦2,000,000.00</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Amount to Reach Loan Limit</span>
                <span class="value">₦0.00</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Outstanding Loan</span>
                <span class="value">₦0.00</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="key">Date</span>
                <div class="flex items-center space-x-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31" />
                  </svg>
                  <span class="value">{{ formatDate(selectedOrder.order_date) }}</span>
                </div>
              </div>
            </div>

            <hr>

            <!-- Order Summary -->
            <div class="mt-8">
              <h3 class="mb-4 text-lg font-medium text-gray-900">Order Summary</h3>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full border-separate order_summary" style="border-spacing: 0">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="text-left">Product Name</th>
                      <th class="text-left">Tags</th>
                      <th class="text-left">Quantity Delivered</th>
                      <th class="text-left">Unit Price</th>
                      <th class="text-left">Price Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in orderItems" :key="index" class="hover:bg-gray-50">
                      <td class="">{{ item.product_name }}</td>
                      <td class="">
                        <span v-for="tag in item.tags" :key="tag" :class="getTagClass(tag)" class="px-2 py-1 text-xs rounded-full mr-1">
                          {{ tag }}
                        </span>
                      </td>
                      <td class="">{{ item.quantity }}</td>
                      <td class="">{{ formatCurrency(item.unit_price) }}</td>
                      <td class="">{{ formatCurrency(item.total_price) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Payment Status and Totals -->
              <div class="mt-4 space-y-2">
                <div class="flex items-center justify-between px-6 py-2">
                  <span class="text-sm font-medium">Payment Status</span>
                  <span class="text-sm text-blue-600">{{ selectedOrder.payment }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-2">
                  <span class="text-sm font-medium">Sub Total</span>
                  <span class="text-sm">{{ formatCurrency(selectedOrder.total_amount) }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-2">
                  <span class="text-sm font-medium">Delivery Fee</span>
                  <span class="text-sm">₦0.00</span>
                </div>
                <div class="flex items-center justify-between px-6 py-2 bg-gray-50 order_total">
                  <span class="font-medium">Total</span>
                  <span class="font-bold">{{ formatCurrency(selectedOrder.total_amount) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activities Tab Content -->
          <div v-else-if="activeTab === 'Activities'" class="space-y-6">
            <h3 class="text-xs font-medium text-gray-500">Recent</h3>

            <Activities 
              :activities="orderActivities" 
              :order-ref="selectedOrder.order_no" 
            />
          </div>
        </div>
      </template>

      <!-- Footer buttons -->
      <template #footer="{ closeModal }">
        <div class="flex justify-end space-x-3">
          <button @click="closeModal" type="button" class="approve_btn">
            Close
          </button>
        </div>
      </template>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import Activities from '@/views/Components/Activities.vue';
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

const getTagClass = (tag: string) => {
  const tagClasses: Record<string, string> = {
    'Cash and Carry': 'bg-green-100 text-green-800',
    'Controlled': 'bg-blue-100 text-blue-800',
    'Hospital': 'bg-purple-100 text-purple-800'
  };
  return tagClasses[tag] || 'bg-gray-100 text-gray-800';
};

// Modal state
const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<any>({});
const activeTab = ref('Details');
const orderTabs = ['Details', 'Activities'];

// Mock order items and activities
const orderItems = computed(() => [
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: ['Controlled'],
    quantity: 20,
    unit_price: 47400.00,
    total_price: 47400.00
  },
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: ['Controlled'],
    quantity: 10,
    unit_price: 47400.00,
    total_price: 47400.00
  }
]);

const orderActivities = computed(() => [
  {
    action: 'New order assigned',
    user: 'Oreva Emamoro',
    time: 'Yesterday 10:45pm'
  },
  {
    action: 'New order status changed',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  },
  {
    action: 'Confirmed order assigned',
    user: 'Oreva Emamoro',
    time: 'Today 12:46pm'
  },
  {
    action: 'Confirmed order status changed',
    user: 'Oreva Emamoro',
    time: 'Today 12:45pm'
  },
  {
    action: 'Order being processed assigned',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  },
  {
    action: 'Order being processed status changed',
    user: 'Oreva Emamoro',
    time: 'Today 12:45pm'
  },
  {
    action: 'Order has been picked and packed assigned',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  },
  {
    action: 'Order has been picked and packed status changed',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  }
]);

// Modal title with order reference (plain text)
const modalTitle = computed(() => {
  if (selectedOrder.value?.order_no) {
    return `Order Details REF: ${selectedOrder.value.order_no}`;
  }
  return 'Order Details';
});



const viewOrder = (order: any) => {
  console.log('View order:', order);
  selectedOrder.value = order;
  activeTab.value = 'Details';
  isOrderDetailsModalOpen.value = true;
};
</script>

<style scoped>
.bg-gray-light {
  background-color: #f7f8f9;
}

/* Modal styles from Product Returns */
.key {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.value {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
}

.order_summary {
  border: 1px solid rgba(9, 30, 66, 0.14);
  border-radius: 8px;
}

.order_summary thead tr,
.order_summary thead tr th,
.order_summary tbody tr:not(:last-child),
.order_summary tbody tr:not(:last-child) td {
  border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.order_summary tbody tr td {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
  padding: 8px;
}

.order_summary thead tr th {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(23, 43, 77, 1);
  padding: 8px;
  background: rgba(247, 248, 249, 1);
}

.order_summary thead tr th:first-child {
  border-top-left-radius: 8px;
}

.order_summary thead tr th:last-child {
  border-top-right-radius: 8px;
}

.order_total {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
  background: rgba(247, 248, 249, 1);
  padding: 16px 0;
}

.tab_text {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
}

.approve_btn {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(12, 102, 228, 1);
  color: white;
}
</style> 