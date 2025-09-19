<template>
  <div class="flex-1 flex flex-col min-h-0">
    <Datatable 
      :items="orders" 
      :filterByDate="false" 
      :filterFields="filterFields" 
      :columns="columns" 
      pageName="New Orders"
    >
      <template #column="col">
        <!-- Tags Column -->
        <span v-if="col.props?.column?.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in col.props.formattedRow[col.props.column.field]" :key="tag" 
                  :class="getTagClass(tag)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
              {{ tag }}
            </span>
          </div>
        </span>
        <!-- Assigned Column -->
        <span v-else-if="col.props?.column?.field === 'assigned'">
          <div v-if="col.props.formattedRow[col.props.column.field]" class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                 :style="{ backgroundColor: getAvatarColor(col.props.formattedRow[col.props.column.field]), color: 'white' }">
              {{ getInitials(col.props.formattedRow[col.props.column.field]) }}
            </div>
            <span>{{ col.props.formattedRow[col.props.column.field] }}</span>
          </div>
          <span v-else class="text-gray-400">Unassigned</span>
        </span>
        <!-- Action Column -->
        <span v-else-if="col.props?.column?.field === 'action'">
          <button @click="viewOrder(col.props.formattedRow)" class="text-blue-600 hover:text-blue-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Props
defineProps<{
  // Add any props if needed
}>()

// Emits
const emit = defineEmits<{
  'view-order': [order: any]
}>()

// Mock data
const orders = ref([
  {
    id: 1,
    orderNo: 'RHPO-1651244 214',
    customerName: 'Fidson Healthcare',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled', 'Hospital'],
    assigned: null
  },
  {
    id: 2,
    orderNo: 'RHPO-1651244 215',
    customerName: 'EVANS THERAPEUTICS L..',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry', 'Controlled'],
    assigned: 'Esther Joel'
  },
  {
    id: 3,
    orderNo: 'RHPO-1651244 216',
    customerName: 'KESSINGTON KESARTEM',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: [],
    assigned: 'Femi Babalola'
  },
  {
    id: 4,
    orderNo: 'RHPO-1651244 217',
    customerName: 'ABIDEC MULTIVITAMIN',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Cash and Carry'],
    assigned: 'Sarah Badmus'
  },
  {
    id: 5,
    orderNo: 'RHPO-1651244 218',
    customerName: 'ABONIKI BALM',
    storeName: 'Emeka Pharmacy',
    state: 'Lagos',
    payment: 'Trade',
    orderDate: '5/21/2024',
    deliveryDate: '5/21/2024',
    totalAmount: '₦2,055,043.00',
    tags: ['Controlled', 'Hospital'],
    assigned: 'Josh Michael'
  }
])

// Table columns
const columns = ref<TableColumn[]>([
  {
    label: 'Order No.',
    field: 'orderNo',
    sortable: true
  },
  {
    label: 'Customer Name',
    field: 'customerName',
    sortable: true
  },
  {
    label: 'Store Name',
    field: 'storeName',
    sortable: true
  },
  {
    label: 'State',
    field: 'state',
    sortable: true
  },
  {
    label: 'Payment',
    field: 'payment',
    sortable: true
  },
  {
    label: 'Order Date',
    field: 'orderDate',
    sortable: true
  },
  {
    label: 'Delivery Date',
    field: 'deliveryDate',
    sortable: true
  },
  {
    label: 'Total Amount',
    field: 'totalAmount',
    sortable: true
  },
  {
    label: 'Tags',
    field: 'tags',
    sortable: false
  },
  {
    label: 'Assigned',
    field: 'assigned',
    sortable: true
  },
  {
    label: 'Action',
    field: 'action',
    sortable: false
  }
])

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
  orderNo: {
    type: 'text',
    label: 'Order No.',
    placeholder: 'Search by order number'
  },
  customerName: {
    type: 'text',
    label: 'Customer Name',
    placeholder: 'Search by customer name'
  },
  storeName: {
    type: 'text',
    label: 'Store Name',
    placeholder: 'Search by store name'
  }
})

// Methods
const viewOrder = (order: any) => {
  emit('view-order', order)
}

const getTagClass = (tag: string) => {
  const tagClasses: { [key: string]: string } = {
    'Cash and Carry': 'bg-green-100 text-green-800',
    'Controlled': 'bg-purple-100 text-purple-800',
    'Hospital': 'bg-blue-100 text-blue-800'
  }
  return tagClasses[tag] || 'bg-gray-100 text-gray-800'
}

const getAvatarColor = (name: string) => {
  const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash % colors.length)
  return colors[index]
}

const getInitials = (name: string) => {
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}
</script>
