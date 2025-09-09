<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Log Book" />
    
    <!-- Success Toast Modal -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />

    <div class="min-h-[calc(100vh-190px)]">
      <Datatable 
        :url="logBookUrl" 
        :filterByDate="true" 
        :filterFields="filterFields"
        :columns="logBookColumns" 
        pageName="LogBook"
        :key="childKey"
      >
        <template v-slot:header_actions>
          <Button 
            type="blue-btn"
            :onClick="downloadLogBooks"
            classStyle="flex items-center gap-x-2 px-4 py-2 rounded text-white bg-[#0C66E4] hover:bg-[#0C66E4]/80"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-sm">Download Log Books</span>
          </Button>
        </template>

        <template #column="col">
          <!-- Driver Name -->
          <span v-if="col.props.column.field === 'driver_name'">
            <span>{{ col.props.row.driver_name }}</span>
          </span>
          
          <!-- Order Count -->
          <span v-else-if="col.props.column.field === 'order_count'">
            <span class="text-center">{{ col.props.row.order_count }}</span>
          </span>
          
          <!-- State -->
          <span v-else-if="col.props.column.field === 'state'">
            <span class="text-gray-700">{{ col.props.row.state }}</span>
          </span>
          
          <!-- Delivery Timeline -->
          <span v-else-if="col.props.column.field === 'delivery_timeline'">
            <span class="text-gray-700">{{ col.props.row.delivery_timeline }}</span>
          </span>
          
          <!-- Action -->
          <span v-else-if="col.props.column.field === 'action'">
            <div class="flex items-center gap-2">
              <!-- View -->
              <button 
                @click="viewLogBook(col.props.row)"
                class="p-1 text-gray-600 hover:text-gray-800"
                title="View Log Book"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 18C7.964 18 4.501 13.74 4.501 12C4.501 9.999 7.96 6 12.501 6C16.877 6 20.499 9.973 20.499 12C20.499 13.74 17.037 18 12.501 18H12.5ZM12.501 4C6.98 4 2.5 8.841 2.5 12C2.5 15.086 7.076 20 12.5 20C17.923 20 22.5 15.086 22.5 12C22.5 8.841 18.02 4 12.5 4" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.477 13.984C11.374 13.984 10.477 13.087 10.477 11.984C10.477 10.881 11.374 9.984 12.477 9.984C13.581 9.984 14.477 10.881 14.477 11.984C14.477 13.087 13.581 13.984 12.477 13.984ZM12.477 7.984C10.271 7.984 8.477 9.778 8.477 11.984C8.477 14.19 10.271 15.984 12.477 15.984C14.684 15.984 16.477 14.19 16.477 11.984C16.477 9.778 14.684 7.984 12.477 7.984Z" fill="#44546F"/>
                </svg>
              </button>
              
              <!-- Edit -->
              <button 
                @click="editLogBook(col.props.row)"
                class="p-1 text-gray-600 hover:text-gray-800"
                title="Edit Log Book"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                </svg>
              </button>
            </div>
          </span>
          
          <!-- Default -->
          <span v-else>
            {{ col.props.formattedRow?.[col.props.column.field] || col.props.row?.[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Log Book Detail Modal -->
    <SideBarModal 
      :is-open="showLogBookModal" 
      width="70%" 
      @close="showLogBookModal = false"
    >
      <template #header>
        <OrderHeader 
          title="Log Book" 
          :reference="getLogBookExtraHeader"
          titleSize="md"
        />
      </template>
      
      <!-- Driver Info -->
      <div class="space-y-3 mb-6 px-6 mt-4">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Driver</span>
          <span class="text-sm text-gray-900">{{ selectedLogBook.driver_name || 'Janet Adeajayi' }}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">State</span>
          <span class="text-sm text-gray-900">{{ selectedLogBook.state || 'Lagos State' }}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Delivery Timeline</span>
          <span class="text-sm text-gray-900">{{ selectedLogBook.delivery_timeline || '16/01/2025 - 16:34:54s' }}</span>
        </div>
      </div>

      <!-- Horizontal Divider -->
      <hr class="border-t border-gray-200 my-6">

      <!-- Customer List -->
      <div class="px-6">
        <h3 class="mb-4 text-lg font-medium text-gray-900">Customer List</h3>
        
        <!-- Customer List Datatable -->
        <div class="-mx-6 px-6">
          <Datatable
            :items="customerList"
            :columns="customerListColumns"
            :searchable="true"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :showActions="false"
            :showPagination="true"
            pageName="LogBookCustomers"
          >
            <template #column="{ props }">
              <!-- Customer Name with blue styling -->
              <span v-if="props.column.field === 'customer_name'">
                <span class="text-blue-600 hover:text-blue-800 cursor-pointer">{{ props.row.customer_name }}</span>
              </span>
              
              <!-- Default column rendering -->
              <span v-else>
                {{ props.row[props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>
      </div>
      
      <!-- Footer with Close button -->
      <template #footer>
        <div class="flex justify-end">
          <Button 
            type="blue-btn"
                :onClick="() => showLogBookModal = false"
            classStyle="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </Button>
             
        </div>
      </template>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageTitle from "@/views/Components/header/PageTitle.vue"
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue'
import OrderHeader from '@/views/Components/ui/OrderHeader.vue'
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'
import type { TableColumn } from '@/types'
import Button from '@/views/Components/ui/Button.vue'

const router = useRouter()

// Reactive state
const loading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const childKey = ref(1)
const showLogBookModal = ref(false)
const selectedLogBook = ref<any>({})

// API URL
const logBookUrl = '/outbound/log-books'

// Filter fields
const filterFields = ref([
  { label: 'State', field: 'state', type: 'select', options: ['Lagos', 'Abuja', 'Kano'] }
])

// Table columns
const logBookColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Driver Name', field: 'driver_name', sortable: true },
  { label: 'Order Count', field: 'order_count', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Delivery Timeline', field: 'delivery_timeline', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])

// Customer list table columns
const customerListColumns = ref<TableColumn[]>([
  { label: 'Order Number', field: 'order_number', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Package Type', field: 'package_type', sortable: true },
  { label: 'Quantity', field: 'quantity', sortable: true },
  { label: 'Warehouse Rep. Sign off', field: 'warehouse_rep_sign_off', sortable: true },
  { label: 'Logistics Rep. Sign off', field: 'logistics_rep_sign_off', sortable: true },
  { label: 'Vehicle Reg. No.', field: 'vehicle_reg_no', sortable: true }
])

// Mock customer list data - Enhanced with realistic data
const customerList = ref([
  {
    id: 1,
    order_number: 'ORD-2025-001',
    customer_name: 'Emeka Pharmacy',
    package_type: 'Standard Box',
    quantity: 25,
    warehouse_rep_sign_off: 'John Doe',
    logistics_rep_sign_off: 'Jane Smith',
    vehicle_reg_no: 'LAG-123-ABC'
  },
  {
    id: 2,
    order_number: 'ORD-2025-002',
    customer_name: 'Mercy Medical Store',
    package_type: 'Cold Chain',
    quantity: 12,
    warehouse_rep_sign_off: 'John Doe',
    logistics_rep_sign_off: 'Jane Smith',
    vehicle_reg_no: 'LAG-123-ABC'
  },
  {
    id: 3,
    order_number: 'ORD-2025-003',
    customer_name: 'Sunrise Healthcare',
    package_type: 'Fragile',
    quantity: 8,
    warehouse_rep_sign_off: 'Mike Johnson',
    logistics_rep_sign_off: 'Sarah Wilson',
    vehicle_reg_no: 'LAG-123-ABC'
  },
  {
    id: 4,
    order_number: 'ORD-2025-004',
    customer_name: 'City General Hospital',
    package_type: 'Bulk Order',
    quantity: 45,
    warehouse_rep_sign_off: 'David Brown',
    logistics_rep_sign_off: 'Lisa Davis',
    vehicle_reg_no: 'LAG-123-ABC'
  },
  {
    id: 5,
    order_number: 'ORD-2025-005',
    customer_name: 'Wellness Pharmacy',
    package_type: 'Standard Box',
    quantity: 18,
    warehouse_rep_sign_off: 'Peter Green',
    logistics_rep_sign_off: 'Anna Taylor',
    vehicle_reg_no: 'LAG-123-ABC'
  }
])

// Computed extra header
const getLogBookExtraHeader = computed(() => {
  return selectedLogBook.value.driver_name ? `${selectedLogBook.value.driver_name.toUpperCase()}` : 'JANET ADEAJAYI'
})

// Functions
const viewLogBook = (logBook: any) => {
  selectedLogBook.value = logBook
  showLogBookModal.value = true
}

const editLogBook = (logBook: any) => {
  // Navigate to edit page
  router.push({ name: 'outbound.log-book.edit', params: { id: logBook.id } })
}

const downloadLogBooks = () => {
  toastMessage.value = 'Log Book Update Successful'
  showToast.value = true
}
</script>
