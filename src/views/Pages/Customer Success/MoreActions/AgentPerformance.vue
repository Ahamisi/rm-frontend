<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-[#172B4D]">Overall Agent Performance</h1>
          <div class="flex items-center gap-2 text-[#626F86]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V15C17.5 15.663 17.2366 16.2989 16.7678 16.7678C16.2989 17.2366 15.663 17.5 15 17.5H5C4.33696 17.5 3.70107 17.2366 3.23223 16.7678C2.76339 16.2989 2.5 15.663 2.5 15V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm">Today, Feb 19, 2025</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- KPI Cards -->
    <div class="px-6 mt-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Stores Visited Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-[12px] text-[#626F86]">Stores Visited</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">2</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_stores)"/>
                <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_stores" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A06B" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <!-- Orders Placed Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-[12px] text-[#626F86]">Orders Placed</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">271</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_orders)"/>
                <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_orders" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A06B" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Datatable -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-490px)]">
      <Datatable
        :items="agentPerformance"
        :columns="agentColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="AgentPerformance"
      >
        <template #header_actions>
          <Button 
            type="blue-btn" 
            :onClick="downloadReport"
            classStyle="px-6 py-2 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2.5V12.5M10 12.5L6.25 8.75M10 12.5L13.75 8.75M4.16667 15.8333H15.8333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Download Report
          </Button>
        </template>

        <template #column="col">
          <!-- Agent Name Column with Icon -->
          <span v-if="col.props?.column?.field === 'agent_name'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.agent_name || '' }}</span>
            </div>
          </span>

          <!-- Line Manager Column with Icon -->
          <span v-else-if="col.props?.column?.field === 'line_manager'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.line_manager || '' }}</span>
            </div>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <button 
              @click="viewAgentDetails(col.props?.formattedRow)"
              class="text-gray-500 hover:text-[#172B4D]"
              title="View Details"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 14.1667L14.1667 5.83333M14.1667 5.83333H9.16667M14.1667 5.83333V10.8333" stroke="#44546F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Transfer Customers Modal -->
    <SideBarModal
      v-if="showTransferModal"
      :isOpen="showTransferModal"
      width="medium"
      @close="closeTransferModal"
    >
      <template #header>
        <h2 class="text-lg font-semibold text-[#172B4D]">Transfer Customers</h2>
      </template>

      <div class="px-6 py-4 space-y-6">
        <!-- Transferring From and Transfer To - Same Line -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Transferring From -->
          <div>
            <label class="block text-sm font-medium text-[#44546F] mb-2">Transferring From:</label>
            <input 
              type="text" 
              :value="selectedAgent?.agent_name || ''" 
              disabled
              class="w-full bg-gray-50 cursor-not-allowed opacity-75"
            />
          </div>

          <!-- Transfer To -->
          <div>
            <label class="block text-sm font-medium text-[#44546F] mb-2">Transfer To:</label>
            <SelectField
              v-model="transferToAgent"
              :options="targetAgentOptions"
              placeholder="Select a target agent"
            />
          </div>
        </div>

        <!-- Select Customers to Transfer -->
        <div>
          <h3 class="text-sm font-semibold text-[#172B4D] mb-4">Select Customers to Transfer</h3>

          <!-- Custom Search Bar -->
          <div class="flex items-center gap-3 mb-4">
            <div class="relative flex-1">
              <input 
                type="text" 
                v-model="customerSearchTerm"
                placeholder="      Search customers..."
                class="w-full pl-[42px] pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-[#172B4D] placeholder:text-[#626F86]"
              />
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-[#626F86]"
                >
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <span class="text-sm text-[#626F86] whitespace-nowrap">Selected: {{ selectedCustomers.length }}</span>
          </div>

          <!-- Customers Datatable -->
          <div class="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
            <Datatable
              :items="filteredCustomers"
              :columns="customerColumns"
              :searchable="false"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :showHeader="false"
              :showPagination="false"
              pageName="TransferCustomers"
            >

              <template #tableHeader>
                <th class="w-[60px] px-4 py-3 text-center" style="width: 60px;">
                  <input 
                    type="checkbox" 
                    :checked="allCustomersSelected"
                    @change="toggleSelectAll"
                    class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    ref="selectAllCheckbox"
                  />
                </th>
                <th class="px-4 py-3 text-left">
                  Customer Name
                </th>
              </template>

              <template #column="col">
                <!-- Checkbox Column -->
                <span v-if="col.props?.column?.field === 'select'" class="flex justify-center">
                  <input 
                    type="checkbox" 
                    :checked="isCustomerSelected(col.props?.row)"
                    @change="toggleCustomerSelection(col.props?.row)"
                    class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </span>

                <!-- Customer Name Column -->
                <span v-else>
                  {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeTransferModal"
            classStyle="px-6 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="transferCustomers"
            :disabled="selectedCustomers.length === 0 || transferToAgent === null"
            classStyle="px-6 py-2"
          >
            Transfer {{ selectedCustomers.length }} Customer{{ selectedCustomers.length !== 1 ? 's' : '' }}
          </Button>
        </div>
      </template>
    </SideBarModal>

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
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import { ref, computed, watch, nextTick } from 'vue';
import type { TableColumn, Option } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Transfer Modal state
const showTransferModal = ref(false);
const selectedAgent = ref<any>(null);
const transferToAgent = ref<Option | null>(null);
const selectedCustomers = ref<any[]>([]);
const selectAllCheckbox = ref<HTMLInputElement | null>(null);
const customerSearchTerm = ref('');

// Column definitions for Agent Performance
const agentColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Agent Name', field: 'agent_name', sortable: true },
  { label: 'Agent Type', field: 'agent_type', sortable: true },
  { label: 'Line Manager', field: 'line_manager', sortable: true },
  { label: 'No. of Stores Visited', field: 'stores_visited', sortable: true },
  { label: 'No. of Orders', field: 'orders', sortable: true },
  { label: 'No. of Inactive Customers', field: 'inactive_customers', sortable: true },
  { label: 'No. Buying Customers', field: 'buying_customers', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock Agent Performance data
const agentPerformance = ref([
  {
    id: 87,
    agent_name: 'Babajide Raji',
    agent_type: 'Sales Canvasser',
    line_manager: 'Babajide Raji',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 54,
    agent_name: 'Daniel Makinde',
    agent_type: 'Sales Canvasser',
    line_manager: 'Daniel Makinde',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 32,
    agent_name: 'Michael Raymond',
    agent_type: 'Sales Canvasser',
    line_manager: 'Michael Raymond',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 19,
    agent_name: 'Esther Joel',
    agent_type: 'Area Sales Manager',
    line_manager: 'Esther Joel',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 51,
    agent_name: 'Esther Joel',
    agent_type: 'Area Sales Manager',
    line_manager: 'Esther Joel',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 67,
    agent_name: 'Femi Babalola',
    agent_type: 'Sales Canvasser',
    line_manager: 'Femi Babalola',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 43,
    agent_name: 'Sarah Badmus',
    agent_type: 'Sales Canvasser',
    line_manager: 'Sarah Badmus',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 28,
    agent_name: 'Josh Michael',
    agent_type: 'Area Sales Manager',
    line_manager: 'Josh Michael',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 91,
    agent_name: 'Dave Free',
    agent_type: 'Sales Canvasser',
    line_manager: 'Dave Free',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  },
  {
    id: 75,
    agent_name: 'Emeka Kalu',
    agent_type: 'Sales Canvasser',
    line_manager: 'Emeka Kalu',
    stores_visited: 21,
    orders: 21,
    inactive_customers: 21,
    buying_customers: 21
  }
]);

// Download function
const downloadReport = () => {
  toastMessage.value = 'Download Report Successful';
  showToast.value = true;
};

// Column definitions for Customer Transfer
const customerColumns: TableColumn[] = [
  { label: '', field: 'select', sortable: false },
  { label: 'Customer Name', field: 'customer_name', sortable: true }
];

// Mock customer data
const customers = ref([
  { id: 1, customer_name: 'Oluwatosin Adegboye' },
  { id: 2, customer_name: 'Janet Adeajayi' },
  { id: 3, customer_name: 'Henry Christopher' },
  { id: 4, customer_name: 'Oluwatosin Adegboye' },
  { id: 5, customer_name: 'Janet Adeajayi' },
  { id: 6, customer_name: 'Henry Christopher' },
  { id: 7, customer_name: 'Oluwatosin Adegboye' },
  { id: 8, customer_name: 'Janet Adeajayi' },
  { id: 9, customer_name: 'Henry Christopher' },
  { id: 10, customer_name: 'Oluwatosin Adegboye' },
  { id: 11, customer_name: 'Janet Adeajayi' },
  { id: 12, customer_name: 'Henry Christopher' }
]);

// Target agent options (excluding selected agent)
const targetAgentOptions = computed(() => {
  if (!selectedAgent.value) return [];
  return agentPerformance.value
    .filter(agent => agent.id !== selectedAgent.value.id)
    .map(agent => ({
      id: agent.id,
      name: agent.agent_name
    }));
});

// Filtered customers based on search
const filteredCustomers = computed(() => {
  if (!customerSearchTerm.value) {
    return customers.value;
  }
  return customers.value.filter(customer =>
    customer.customer_name.toLowerCase().includes(customerSearchTerm.value.toLowerCase())
  );
});

// Check if customer is selected
const isCustomerSelected = (customer: any) => {
  return selectedCustomers.value.some(c => c.id === customer.id);
};

// Toggle customer selection
const toggleCustomerSelection = (customer: any) => {
  const index = selectedCustomers.value.findIndex(c => c.id === customer.id);
  if (index > -1) {
    selectedCustomers.value.splice(index, 1);
  } else {
    selectedCustomers.value.push(customer);
  }
};

// Check if all visible customers are selected
const allCustomersSelected = computed(() => {
  if (filteredCustomers.value.length === 0) return false;
  return filteredCustomers.value.every(customer => 
    selectedCustomers.value.some(c => c.id === customer.id)
  );
});

// Check if some (but not all) customers are selected (for indeterminate state)
const someCustomersSelected = computed(() => {
  const selectedCount = filteredCustomers.value.filter(customer => 
    selectedCustomers.value.some(c => c.id === customer.id)
  ).length;
  return selectedCount > 0 && selectedCount < filteredCustomers.value.length;
});

// Toggle select all
const toggleSelectAll = () => {
  if (allCustomersSelected.value) {
    // Deselect all visible (filtered) customers
    const customerIds = filteredCustomers.value.map(c => c.id);
    selectedCustomers.value = selectedCustomers.value.filter(
      c => !customerIds.includes(c.id)
    );
  } else {
    // Select all visible (filtered) customers (add only if not already selected)
    filteredCustomers.value.forEach(customer => {
      if (!selectedCustomers.value.some(c => c.id === customer.id)) {
        selectedCustomers.value.push(customer);
      }
    });
  }
};

// Watch for indeterminate state
watch([someCustomersSelected, showTransferModal], async () => {
  await nextTick();
  if (selectAllCheckbox.value) {
    selectAllCheckbox.value.indeterminate = someCustomersSelected.value;
  }
}, { immediate: true });

// Open transfer modal
const openTransferModal = (agent: any) => {
  selectedAgent.value = agent;
  transferToAgent.value = null;
  selectedCustomers.value = [];
  customerSearchTerm.value = '';
  showTransferModal.value = true;
};

// Close transfer modal
const closeTransferModal = () => {
  showTransferModal.value = false;
  selectedAgent.value = null;
  transferToAgent.value = null;
  selectedCustomers.value = [];
  customerSearchTerm.value = '';
};

// Transfer customers
const transferCustomers = () => {
  if (selectedCustomers.value.length === 0 || !transferToAgent.value) {
    return;
  }
  
  console.log('Transferring customers:', {
    from: selectedAgent.value?.agent_name,
    to: transferToAgent.value.name,
    customers: selectedCustomers.value
  });
  
  toastMessage.value = `Successfully transferred ${selectedCustomers.value.length} customer${selectedCustomers.value.length !== 1 ? 's' : ''} to ${transferToAgent.value.name}`;
  showToast.value = true;
  closeTransferModal();
};

// View agent details - now opens transfer modal
const viewAgentDetails = (agent: any) => {
  openTransferModal(agent);
};

</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  padding-top: 1rem;
}

/* Transfer Customers Modal - Column Widths */
.datatable-container table thead th:first-child {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
}

.datatable-container table tbody td:first-child {
  width: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
}

.datatable-container table thead th:last-child {
  width: auto !important;
}

.datatable-container table tbody td:last-child {
  width: auto !important;
}
</style>
