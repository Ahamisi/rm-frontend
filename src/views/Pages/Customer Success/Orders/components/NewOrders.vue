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
          <TableActionDropdown :rowData="col.props.formattedRow" :key="col.props.formattedRow.id">
            <template #default="{ selectedItem, closeDropdown }">
              <!-- View Order -->
              <li @click="viewOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
                View Order
              </li>
              
              <!-- Hold Order -->
              <li @click="holdOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="#626F86"/>
                </svg>
                Hold Order
              </li>
              
              <!-- Edit Order -->
              <li @click="editOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#626F86"/>
                </svg>
                Edit Order
              </li>
              
              <!-- Unassign -->
              <li @click="unassignOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#626F86"/>
                  <path d="M15 9L9 15M9 9L15 15" stroke="#626F86" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Unassign
              </li>
              
              <!-- Change Status -->
              <li @click="changeStatus(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#626F86"/>
                  <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="#626F86"/>
                </svg>
                Change Status
              </li>
              
              <!-- Time Tracker -->
              <li @click="openTimeTracker(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM12.889 11.632V8.448C12.889 7.959 12.489 7.559 12 7.559C11.511 7.559 11.111 7.959 11.111 8.449V12.004C11.111 12.252 11.214 12.475 11.379 12.637L13.574 14.831C13.741 14.9972 13.9669 15.0904 14.2025 15.0904C14.4381 15.0904 14.664 14.9972 14.831 14.831C14.9969 14.6641 15.0899 14.4383 15.0899 14.203C15.0899 13.9677 14.9969 13.7419 14.831 13.575L12.889 11.632Z" fill="#626F86"/>
                </svg>
                Time Tracker
              </li>
              
              <!-- Activity Log -->
              <li @click="viewActivityLog(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#626F86"/>
                  <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16Z" fill="#626F86"/>
            </svg>
                Activity Log
              </li>
            </template>
          </TableActionDropdown>
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
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
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

const holdOrder = (order: any) => {
  console.log('Hold order:', order)
  // Implement hold order logic
}

const editOrder = (order: any) => {
  console.log('Edit order:', order)
  // Implement edit order logic
}

const unassignOrder = (order: any) => {
  console.log('Unassign order:', order)
  // Implement unassign order logic
}

const changeStatus = (order: any) => {
  console.log('Change status:', order)
  // Implement change status logic
}

const openTimeTracker = (order: any) => {
  console.log('Open time tracker:', order)
  // Implement time tracker logic
}

const viewActivityLog = (order: any) => {
  console.log('View activity log:', order)
  // Implement activity log logic
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
