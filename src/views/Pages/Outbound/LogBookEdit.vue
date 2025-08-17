<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 mt-2">
      <!-- Left: Back button and text -->
      <div class="flex items-center gap-3">
        <button @click="goBack" class="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z" fill="#44546F"/>
          </svg>
          <span class="text-sm font-medium">Back</span>
        </button>
      </div>
      
      <!-- Center: Edit Log Book title with icon -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-900">Edit Log Book</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="3.75" fill="#F7F8F9"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91884 5.83337C7.45676 5.83337 7.08301 6.20504 7.08301 6.66254V13.3375C7.08444 13.5582 7.17317 13.7692 7.3298 13.9246C7.48643 14.08 7.69821 14.167 7.91884 14.1667H12.0805C12.5426 14.1667 12.9163 13.7955 12.9163 13.3375V6.66254C12.9163 6.20754 12.5422 5.83337 12.0805 5.83337H7.91884ZM8.74967 7.50004H11.2497C11.4798 7.50004 11.6663 7.68659 11.6663 7.91671C11.6663 8.14683 11.4798 8.33337 11.2497 8.33337H8.74967C8.51956 8.33337 8.33301 8.14683 8.33301 7.91671C8.33301 7.68659 8.51956 7.50004 8.74967 7.50004ZM11.2497 8.75004H8.74967C8.51956 8.75004 8.33301 8.93659 8.33301 9.16671C8.33301 9.39683 8.51956 9.58337 8.74967 9.58337H11.2497C11.4798 9.58337 11.6663 9.39683 11.6663 9.16671C11.6663 8.93659 11.4798 8.75004 11.2497 8.75004ZM8.74967 10H9.58301C9.81313 10 9.99967 10.1866 9.99967 10.4167C9.99967 10.6468 9.81313 10.8334 9.58301 10.8334H8.74967C8.51956 10.8334 8.33301 10.6468 8.33301 10.4167C8.33301 10.1866 8.51956 10 8.74967 10Z" fill="#44546F"/>
        </svg>
        <span class="text-sm text-gray-500">JANET ADEAJAYI</span>
      </div>
      
      <!-- Right: Update button -->
      <button 
        @click="updateLogBook"
        class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80"
      >
        Update
      </button>
    </div>

    <!-- Success Toast Modal -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />

    <!-- Warehouse Rep Sign off Input -->
    <div class="mb-6 bg-[#F7F8F9] p-4 rounded-lg">
      <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Rep. Sign off</label>
      <input 
        v-model="warehouseRepSignOff"
        type="text" 
        class="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your full name"
      />
    </div>

    <!-- Customer List -->
    <div class="bg-[#F7F8F9] rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Customer List</h3>
      
      <!-- Use Datatable Component with disabled features -->
      <Datatable
        :url="'/outbound/log-books/' + $route.params.id + '/orders'"
        :columns="customerColumns"
        :searchable="false"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
      >
        <template #column="col">
          <!-- Checkbox -->
          <span v-if="col.props.column.field === 'checkbox'">
            <input 
              type="checkbox" 
              :checked="selectedOrders.includes(col.props.row.id)"
              @change="toggleOrderSelection(col.props.row.id)"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </span>
          
          <!-- Default -->
          <span v-else>
            {{ col.props.formattedRow[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'

const router = useRouter()
const route = useRoute()

// Reactive state
const loading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const warehouseRepSignOff = ref('')
const selectedOrders = ref<number[]>([])

// Customer table columns
const customerColumns = ref([
  {
    field: 'checkbox',
    label: '',
    width: '5%',
    sortable: false
  },
  {
    field: 'order_number',
    label: 'Order Number',
    width: '20%',
    sortable: false
  },
  {
    field: 'customer_name',
    label: 'Customer Name',
    width: '20%',
    sortable: false
  },
  {
    field: 'store_name',
    label: 'Store Name',
    width: '15%',
    sortable: false
  },
  {
    field: 'driver_name',
    label: 'Driver Name',
    width: '15%',
    sortable: false
  },
  {
    field: 'package_type',
    label: 'Package Type',
    width: '10%',
    sortable: false
  },
  {
    field: 'quantity',
    label: 'Quantity',
    width: '8%',
    sortable: false
  },
  {
    field: 'warehouse_rep_sign_off',
    label: 'Warehouse Rep. Sign off',
    width: '12%',
    sortable: false
  },
  {
    field: 'logistics_rep_sign_off',
    label: 'Logistics Rep. Sign off',
    width: '12%',
    sortable: false
  },
  {
    field: 'vehicle_reg_no',
    label: 'Vehicle Reg. No.',
    width: '10%',
    sortable: false
  }
])

// Functions
const goBack = () => {
  router.push({ name: 'outbound.log-book' })
}

const toggleOrderSelection = (orderId: number) => {
  const index = selectedOrders.value.indexOf(orderId)
  if (index > -1) {
    selectedOrders.value.splice(index, 1)
  } else {
    selectedOrders.value.push(orderId)
  }
}

const updateLogBook = () => {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    toastMessage.value = 'Log Book Update Successful'
    showToast.value = true
    
    // Navigate back after success
    setTimeout(() => {
      router.push({ name: 'outbound.log-book' })
    }, 2000)
  }, 1000)
}

// Load log book data on mount
onMounted(() => {
  // Load existing warehouse rep sign off
  warehouseRepSignOff.value = ''
})
</script>
