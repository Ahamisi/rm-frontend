<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Returned Products" />

    <!-- Initial Search Screen -->
    <div class="flex items-center justify-center min-h-[calc(100vh-190px)]" v-if="!hasSearched">
      <div class="intro_search_wrapper">
        <div class="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
              fill="#0C66E4" />
          </svg>
          <h3>Let's Find Your Returned Products</h3>
        </div>
        <p class="my-4 text-center">Please search by Order Ref No, Customer Name or Store Name to load returned products</p>
        <div class="relative grid items-baseline grid-cols-1 gap-2 md:grid-cols-8 search_content">
          <div class="md:col-span-3">
            <CustomSelectDropdown 
              v-model="selectedSearchBy"
              :options="searchByOptions"
              placeholder="Select search type"
            />
          </div>
          <div class="relative p-0 m-0 md:col-span-4">
            <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M14.1965 12.5708L17.4798 15.9125C17.6269 16.0715 17.7063 16.2815 17.7012 16.498C17.6961 16.7145 17.6069 16.9206 17.4525 17.0725C17.2982 17.2244 17.0907 17.3102 16.8741 17.3117C16.6575 17.3133 16.4489 17.2305 16.2923 17.0808L13.0106 13.7425C11.7444 14.6964 10.163 15.1334 8.58669 14.9652C7.01035 14.7969 5.55684 14.036 4.52048 12.8363C3.48411 11.6367 2.94234 10.0881 3.00487 8.50399C3.06739 6.91993 3.72953 5.41881 4.85722 4.3046C5.98491 3.19038 7.49388 2.54632 9.07858 2.50284C10.6633 2.45936 12.2053 3.0197 13.3924 4.07041C14.5795 5.12111 15.3229 6.58366 15.4722 8.16192C15.6215 9.74017 15.1655 11.3162 14.1965 12.5708ZM9.2498 13.3333C10.4654 13.3333 11.6312 12.8505 12.4907 11.9909C13.3502 11.1314 13.8331 9.96558 13.8331 8.75C13.8331 7.53443 13.3502 6.36864 12.4907 5.5091C11.6312 4.64956 10.4654 4.16667 9.2498 4.16667C8.03422 4.16667 6.86843 4.64956 6.00889 5.5091C5.14935 6.36864 4.66646 7.53443 4.66646 8.75C4.66646 9.96558 5.14935 11.1314 6.00889 11.9909C6.86843 12.8505 8.03422 13.3333 9.2498 13.3333Z"
                fill="#626F86" />
            </svg>
            <input type="text" v-model="search" class="w-full pr-3 pl-10 py-2 border-2 border-gray-300 rounded-md focus:outline-none special-input" style="height: 38px;">
          </div>
          <Button type="blue-btn" :onClick="performSearch" classStyle="px-4 py-2" style="height: 38px;">Search</Button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="min-h-[calc(100vh-190px)]" v-else>
      <Datatable 
        :items="returnedData" 
        :filterByDate="true" 
        :columns="returnedColumns" 
        :key="childKey"
        pageName="ReturnedProducts" 
        @onSearch="updateSearch"
      >
        <template #header_search>
          <div class="flex items-center gap-2 mr-3">
            <label for="sort_by" class="sort_by_label">Search By</label>
            <div class="w-40 h-[34px]">
              <CustomSelectDropdown 
                v-model="selectedSearchBy"
                :options="searchByOptions"
                placeholder="Select search type"
                customHeight="34px"
              />
            </div>
          </div>
        </template>
        
        <template #column="col">
          <!-- ID -->
          <span v-if="col.props.column.field === 'id'">
            <span class="font-medium">{{ col.props.row.id }}</span>
          </span>
          
          <!-- Order No -->
          <span v-else-if="col.props.column.field === 'order_no'">
            <span class="font-medium">{{ col.props.row.order_no }}</span>
          </span>
          
          <!-- Warehouse -->
          <span v-else-if="col.props.column.field === 'warehouse'">
            <span class="text-gray-700">{{ col.props.row.warehouse }}</span>
          </span>
          
          <!-- Customer Name -->
          <span v-else-if="col.props.column.field === 'customer_name'">
            <span>{{ col.props.row.customer_name }}</span>
          </span>
          
          <!-- Store Name -->
          <span v-else-if="col.props.column.field === 'store_name'">
            <span class="text-gray-700">{{ col.props.row.store_name }}</span>
          </span>
          
          <!-- Driver -->
          <span v-else-if="col.props.column.field === 'driver'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6B7280"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#6B7280"/>
                </svg>
              </div>
              <span class="text-gray-700">{{ col.props.row.driver }}</span>
            </div>
          </span>
          
          <!-- Reason -->
          <span v-else-if="col.props.column.field === 'reason'">
            <span class="text-gray-700">{{ col.props.row.reason }}</span>
          </span>
          
          <!-- Items -->
          <span v-else-if="col.props.column.field === 'items'">
            <span class="text-gray-700">{{ col.props.row.items }}</span>
          </span>
          
          <!-- Transit Status -->
          <span v-else-if="col.props.column.field === 'transit_status'">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ col.props.row.transit_status }}
            </span>
          </span>
          
          <!-- Total Amount -->
          <span v-else-if="col.props.column.field === 'total_amount'">
            <span class="font-medium">{{ col.props.row.total_amount }}</span>
          </span>
          
          <!-- Date Created -->
          <span v-else-if="col.props.column.field === 'date_created'">
            <span class="text-gray-700">{{ col.props.row.date_created }}</span>
          </span>
          
          <!-- Action -->
          <span v-else-if="col.props.column.field === 'actions'">
            <div class="flex items-center gap-2">
              <!-- View Return -->
              <button @click="viewReturn(col.props.row)" 
                      class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      title="View Return">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
              </button>
              
              <!-- Print Return -->
              <button @click="printReturn(col.props.row)" 
                      class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      title="Print Return">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </span>
          
          <!-- Default -->
          <span v-else class="text-xs">
            {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Product Return Details Modal -->
    <OrderDetailsModal
      :isOpen="showReturnDetailsModal"
      :orderData="selectedReturn"
      :orderItems="returnItems"
      :orderActivities="returnActivities"
      :initialActiveTab="returnDetailsTab"
      @close="showReturnDetailsModal = false"
    />

    <!-- Success Toast for Print Return -->
    <SuccessAlertToast 
      :isVisible="showDownloadReturnToast" 
      message="Return document printed successfully" 
      @close="showDownloadReturnToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import CustomSelectDropdown from '@/views/Components/procurement/ui/CustomSelectDropdown.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import { useDebounceFn } from '@vueuse/core';
import type { TableColumn } from '@/types';

const SEARCH_DEBOUNCE_DELAY = 300;

// Reactive state
const childKey = ref(111);
const search = ref('');
const hasSearched = ref(false);
const loading = ref(false);

// Modal states
const showDownloadReturnToast = ref(false);
const showReturnDetailsModal = ref(false);

// Selected data
const selectedReturn = ref<any>({});
const returnDetailsTab = ref('details');

// Search By options
const searchByOptions = ref([
  { value: 'order', label: 'Order Ref No' },
  { value: 'customer', label: 'Customer Name' },
  { value: 'store', label: 'Store Name' }
]);

const selectedSearchBy = ref<string>('order');

// Computed URL for returned products
const returned_url = computed(() => {
  const params = new URLSearchParams({
    search_by: selectedSearchBy.value || 'order',
    search: search.value.trim(),
    filter: JSON.stringify({ state: 'Returned' })
  });
  return `/compliance/products/returned?${params.toString()}`;
});

// Mock data for returned products
const returnedData = ref([
  {
    id: 87,
    order_no: '87',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Dave Free',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 54,
    order_no: '1656493689-254',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Michael Raymond',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 25,
    order_no: '25',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 30,
    order_no: '30',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 51,
    order_no: '51',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 21,
    order_no: '21',
    warehouse: 'LOS-WH2',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 35,
    order_no: '35',
    warehouse: 'LOS-WH1',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 23,
    order_no: '23',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Sarah Badmus',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 33,
    order_no: '33',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Sarah Badmus',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 87,
    order_no: '87',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 88,
    order_no: '88',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 81,
    order_no: '81',
    warehouse: 'LOS-WH2',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 80,
    order_no: '80',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 5,
    order_no: '05',
    warehouse: 'LOS-WH1',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 55,
    order_no: '55',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  }
]);

// Mock data for return items in the modal
const returnItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-001',
    tags: 'Controlled',
    quantity_delivered: 20,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-002',
    tags: 'Controlled',
    quantity_delivered: 10,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 3,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-003',
    tags: 'Controlled',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 4,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    sku: 'LUM-001',
    tags: 'Hospital',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 5,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    sku: 'LUM-002',
    tags: 'Hospital',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  }
]);

// Mock data for return activities
const returnActivities = ref([
  {
    id: 1,
    action: 'Return Request Created',
    description: 'Return request was created by customer',
    user: 'Customer',
    time: '2024-05-21 11:13:00',
    details: 'Customer initiated return request for order items'
  },
  {
    id: 2,
    action: 'Return Approved',
    description: 'Return was approved by compliance team',
    user: 'Compliance Team',
    time: '2024-05-21 11:45:00',
    details: 'Return request reviewed and approved for processing'
  },
  {
    id: 3,
    action: 'Return Processed',
    description: 'Return items have been processed and restocked',
    user: 'Warehouse Team',
    time: '2024-05-21 12:30:00',
    details: 'Items received, inspected, and restocked in inventory'
  }
]);

// Table columns
const returnedColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Warehouse', field: 'warehouse', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Driver', field: 'driver', sortable: true },
  { label: 'Reason', field: 'reason', sortable: true },
  { label: 'Items', field: 'items', sortable: true },
  { label: 'Transit Status', field: 'transit_status', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'actions', sortable: false }
]);

// Watch selectedSearchBy changes
watch(selectedSearchBy, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    childKey.value++;
  }
});

// Helper function
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
  search.value = searchTerm;
  childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

// Actions
const performSearch = () => {
  hasSearched.value = true;
};

const viewReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  returnDetailsTab.value = 'details';
  showReturnDetailsModal.value = true;
};

const printReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  console.log('Print return:', returnItem);
  // TODO: Implement print functionality
  showDownloadReturnToast.value = true;
};

// Prevent body scroll when component is mounted
onMounted(() => {
  document.body.style.overflowY = 'hidden';
});

// Restore body scroll when component is unmounted
onUnmounted(() => {
  document.body.style.overflowY = 'auto';
});
</script>

<style>
/* Reuse the same styles from DeliveredOrders.vue */
.intro_search_wrapper {
  border-radius: 12px;
  color: rgba(98, 111, 134, 1);
  background: white;
  padding: 24px;
  width: 33em;
  box-shadow: 0px 2px 4px 0px #E5E2E9;
}

.intro_search_wrapper h3 {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.intro_search_wrapper p {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: rgba(68, 84, 111, 1);
  padding: 0 6.5em;
}

.intro_search_wrapper .search_content {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.data_table_select,
.intro_search_wrapper .search_content select,
.intro_search_wrapper .search_content input {
  border: 2px solid rgba(9, 30, 66, 0.14);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.intro_search_wrapper .search_content button {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  background: rgba(12, 102, 228, 1);
  padding: 0.825em 0.4em;
  border-radius: 6px;
}

.sort_by_label {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}

</style>
