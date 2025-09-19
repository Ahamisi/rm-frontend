<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / Inventory Order Issues" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable 
        :url="issuesUrl" 
        :filterByDate="true" 
        :searchable="true"
        :sortable="true"
        :exportable="false"
        :printable="false"
        :columns="issueColumns" 
        pageName="ComplianceOrderIssues"
        :filterFields="filterFields"
        :key="datatableKey"
      >
        <template #header_actions>
          <Button 
            type="blue-btn"
            :onClick="openCreateIssueModal"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
            Report Issue
          </Button>
        </template>

      <template #column="col">
        <!-- ID -->
        <span v-if="col.props.column.field === 'id'">
          <span class="font-medium">{{ col.props.row.id }}</span>
        </span>
        
        <!-- Order Number -->
        <span v-else-if="col.props.column.field === 'orderNumber'">
          <span>{{ col.props.row.orderNumber }}</span>
        </span>
        
        <!-- Issue Type -->
        <span v-else-if="col.props.column.field === 'issueType'">
          <span class="text-gray-700">{{ col.props.row.issueType }}</span>
        </span>
        
        <!-- Priority -->
        <span v-else-if="col.props.column.field === 'priority'">
          <span :class="getPriorityClass(col.props.row.priority)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ col.props.row.priority }}
          </span>
        </span>
        
        <!-- Status -->
        <span v-else-if="col.props.column.field === 'status'">
          <span :class="getStatusClass(col.props.row.status)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ col.props.row.status }}
          </span>
        </span>
        
        <!-- Assigned -->
        <span v-else-if="col.props.column.field === 'assigned'">
          <div v-if="col.props.row.assigned" class="flex items-center space-x-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                 :style="{ backgroundColor: getAvatarColor(col.props.row.assigned), color: 'white' }">
              {{ getInitials(col.props.row.assigned) }}
            </div>
            <span class="text-gray-700">{{ col.props.row.assigned }}</span>
          </div>
          <span v-else class="text-red-600">Unassigned</span>
        </span>
        
        <!-- Created Date -->
        <span v-else-if="col.props.column.field === 'createdDate'">
          <span class="text-gray-700">{{ formatDate(col.props.row.createdDate) }}</span>
        </span>
        
        <!-- Action -->
        <span v-else-if="col.props.column.field === 'action'">
          <TableActionDropdown :rowData="col.props.row">
            <template #default="{ selectedItem, closeDropdown }">
              <!-- View Issue -->
              <li @click="viewIssue(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
                View Issue
              </li>
              
              <!-- Edit Issue -->
              <li @click="editIssue(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02 19.73C3.98689 19.892 3.99446 20.0597 4.04204 20.218C4.08962 20.3764 4.17572 20.5205 4.29263 20.6374C4.40955 20.7543 4.55363 20.8404 4.71198 20.888C4.87033 20.9355 5.038 20.9431 5.2 20.91L9.01 20.13L4.8 15.92L4.02 19.73ZM9.941 17.11L7.821 14.99L16.306 6.5H16.308L18.429 8.621L9.94 17.111L9.941 17.11ZM19.844 7.207L17.724 5.085C17.5381 4.89908 17.3173 4.7517 17.0743 4.65131C16.8313 4.55092 16.5709 4.4995 16.308 4.5C15.796 4.5 15.284 4.695 14.893 5.085L5.136 14.843L10.086 19.793L19.843 10.035C20.2179 9.65995 20.4286 9.15133 20.4286 8.621C20.4286 8.09068 20.2179 7.58206 19.843 7.207H19.844Z" fill="#626F86"/>
                </svg>
                Edit Issue
              </li>
              
              <!-- Change Status -->
              <li @click="changeStatus(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6.003V8.998C8 9.26322 8.10535 9.51757 8.29289 9.70511C8.48043 9.89264 8.73478 9.998 9 9.998C9.26521 9.998 9.51957 9.89264 9.7071 9.70511C9.89464 9.51757 10 9.26322 10 8.998V5.102C10 4.494 9.507 4 8.9 4H5C4.73438 4 4.47965 4.10551 4.29183 4.29333C4.10401 4.48115 3.9985 4.73589 3.9985 5.0015C3.9985 5.26711 4.10401 5.52185 4.29183 5.70967C4.47965 5.89748 4.73438 6.003 5 6.003H8Z" fill="#626F86"/>
                  <path d="M9.428 18.018C7.351 16.989 6 14.807 6 12.37C6 10.104 7.167 8.051 9.02 6.945C9.5 6.659 9.666 6.023 9.391 5.524C9.32915 5.40677 9.24414 5.30331 9.14112 5.21991C9.03811 5.13651 8.91922 5.0749 8.79169 5.0388C8.66415 5.00271 8.53061 4.99289 8.39916 5.00994C8.26772 5.027 8.14111 5.07056 8.027 5.138C5.557 6.611 4 9.35 4 12.37C4 15.618 5.802 18.528 8.57 19.899C9.068 20.146 9.665 19.925 9.902 19.406C10.139 18.886 9.927 18.265 9.428 18.018Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 15.002V18.898C14 19.506 14.493 20 15.1 20H19C19.2656 20 19.5203 19.8945 19.7082 19.7067C19.896 19.5188 20.0015 19.2641 20.0015 18.9985C20.0015 18.7329 19.896 18.4782 19.7082 18.2903C19.5203 18.1025 19.2656 17.997 19 17.997H16V15.002C16 14.7368 15.8946 14.4824 15.7071 14.2949C15.5196 14.1074 15.2652 14.002 15 14.002C14.7348 14.002 14.4804 14.1074 14.2929 14.2949C14.1054 14.4824 14 14.7368 14 15.002Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.097 4.596C13.86 5.116 14.072 5.736 14.571 5.983C16.648 7.012 17.999 9.193 17.999 11.63C17.999 13.896 16.832 15.95 14.978 17.055C14.7456 17.1988 14.5776 17.4265 14.5087 17.6909C14.4398 17.9553 14.4753 18.2361 14.608 18.475C14.882 18.975 15.493 19.148 15.972 18.862C18.442 17.389 19.999 14.65 19.999 11.63C19.999 8.382 18.197 5.472 15.429 4.102C15.2965 4.03537 15.1503 4.00045 15.002 4C14.8098 4.00188 14.6223 4.05909 14.4618 4.16479C14.3013 4.27049 14.1746 4.4202 14.097 4.596Z" fill="#626F86"/>
                </svg>
                Change Status
              </li>
              
              <!-- Assign/Unassign -->
              <li @click="toggleAssign(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#626F86"/>
                </svg>
                {{ selectedItem.assigned ? 'Unassign' : 'Assign' }}
              </li>
            </template>
          </TableActionDropdown>
        </span>
        
        <!-- Default -->
        <span v-else>
          {{ col.props.row[col.props.column.field] }}
        </span>
      </template>
      </Datatable>
    </div>

    <!-- Create/Edit Issue Modal -->
    <SideBarModal
      :isOpen="showCreateModal || showEditModal"
      :title="showEditModal ? 'Edit Issue' : 'Report New Issue'"
      @update:isOpen="handleSideBarUpdate"
      @close="handleSideBarClose"
      width="45vw"
    >
      <div class="space-y-4 px-6 mt-4">
        <!-- Order Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
          <input
            type="text"
            v-model="form.orderNumber"
            placeholder="Enter order number"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600"
            style="border-color: #091E4224; color: #172B4D !important;"
          />
        </div>

        <!-- Issue Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
          <SelectField
            v-model="form.issueType"
            :options="issueTypeOptions"
            labelField="name"
            valueField="id"
            placeholder="Select issue type"
          />
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <SelectField
            v-model="form.priority"
            :options="priorityOptions"
            labelField="name"
            valueField="id"
            placeholder="Select priority"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="form.description"
            placeholder="Describe the issue in detail"
            rows="4"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
            style="border-color: #091E4224; color: #172B4D !important;"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" :onClick="handleCancel">Cancel</Button>
          <Button type="blue-btn" :onClick="saveIssue">
            {{ showEditModal ? 'Update' : 'Report' }}
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Issue Details Modal -->
    <SideBarModal
      v-if="isIssueDetailsModalOpen"
      :isOpen="isIssueDetailsModalOpen"
      width="xl"
      title="Issue Details"
      @update:isOpen="isIssueDetailsModalOpen = false"
      @close="isIssueDetailsModalOpen = false"
    >
      <IssueDetails 
        :issue="selectedIssue" 
        @close="isIssueDetailsModalOpen = false"
        @issue-updated="handleIssueUpdate"
      />
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import Button from '@/views/Components/ui/Button.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import IssueDetails from './components/IssueDetails.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'
import dayjs from 'dayjs'

// Reactive data
const datatableKey = ref(0)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const isIssueDetailsModalOpen = ref(false)
const selectedIssue = ref<any>(null)

// API URL for issues
const issuesUrl = '/compliance/orders/issues'

// Filter fields for additional filtering options
const filterFields = ref<FilterFields<FilterField>>({
  status: {
    field: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { id: 'Open', name: 'Open' },
      { id: 'In Progress', name: 'In Progress' },
      { id: 'Resolved', name: 'Resolved' },
      { id: 'Closed', name: 'Closed' }
    ]
  },
  priority: {
    field: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'Low', name: 'Low' },
      { id: 'Medium', name: 'Medium' },
      { id: 'High', name: 'High' },
      { id: 'Critical', name: 'Critical' }
    ]
  }
})

// Form data
interface FormData {
  orderNumber: string;
  issueType: { id: number; name: string } | null;
  priority: { id: number; name: string } | null;
  description: string;
}

const form = ref<FormData>({
  orderNumber: '',
  issueType: null,
  priority: null,
  description: ''
})

// Table columns configuration
const issueColumns = ref<TableColumn[]>([
  { field: 'id', label: 'ID', sortable: true },
  { field: 'orderNumber', label: 'Order No.', sortable: true },
  { field: 'issueType', label: 'Issue Type', sortable: true },
  { field: 'priority', label: 'Priority', sortable: false },
  { field: 'status', label: 'Status', sortable: false },
  { field: 'assigned', label: 'Assigned', sortable: false },
  { field: 'createdDate', label: 'Created Date', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
])

// Options
const issueTypeOptions = ref([
  { id: 1, name: 'Inventory Shortage' },
  { id: 2, name: 'Product Damage' },
  { id: 3, name: 'Delivery Delay' },
  { id: 4, name: 'Quality Issue' },
  { id: 5, name: 'System Error' }
])

const priorityOptions = ref([
  { id: 1, name: 'Low' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'High' },
  { id: 4, name: 'Critical' }
])

// Mock data for order issues
const orderIssues = ref([
  {
    id: 1,
    orderNumber: 'RHPO-1651244 100',
    issueType: 'Inventory Shortage',
    priority: 'High',
    status: 'Open',
    assigned: 'Esther Joel' as string | null,
    createdDate: '5/20/2024',
    description: 'Product out of stock in warehouse'
  },
  {
    id: 2,
    orderNumber: 'RHPO-1651244 101',
    issueType: 'Product Damage',
    priority: 'Medium',
    status: 'In Progress',
    assigned: 'Femi Babalola' as string | null,
    createdDate: '5/19/2024',
    description: 'Package arrived damaged'
  },
  {
    id: 3,
    orderNumber: 'RHPO-1651244 102',
    issueType: 'Delivery Delay',
    priority: 'Critical',
    status: 'Open',
    assigned: null as string | null,
    createdDate: '5/18/2024',
    description: 'Delivery delayed due to weather conditions'
  },
  {
    id: 4,
    orderNumber: 'RHPO-1651244 103',
    issueType: 'Quality Issue',
    priority: 'High',
    status: 'Resolved',
    assigned: 'Sarah Badmus' as string | null,
    createdDate: '5/17/2024',
    description: 'Product quality below standards'
  },
  {
    id: 5,
    orderNumber: 'RHPO-1651244 104',
    issueType: 'System Error',
    priority: 'Low',
    status: 'Closed',
    assigned: 'Josh Michael' as string | null,
    createdDate: '5/16/2024',
    description: 'System error during order processing'
  }
])

// Methods
const openCreateIssueModal = () => {
  resetForm()
  showCreateModal.value = true
}

const viewIssue = (issue: any) => {
  selectedIssue.value = issue
  isIssueDetailsModalOpen.value = true
}

const editIssue = (issue: any) => {
  selectedIssue.value = issue
  // Pre-fill form with issue data
  form.value = {
    orderNumber: issue.orderNumber,
    issueType: issueTypeOptions.value.find(t => t.name === issue.issueType) || null,
    priority: priorityOptions.value.find(p => p.name === issue.priority) || null,
    description: issue.description || ''
  }
  showEditModal.value = true
}

const saveIssue = () => {
  if (showEditModal.value && selectedIssue.value) {
    // Update existing issue
    const index = orderIssues.value.findIndex(i => i.id === selectedIssue.value!.id)
    if (index !== -1) {
      orderIssues.value[index] = {
        ...orderIssues.value[index],
        orderNumber: form.value.orderNumber,
        issueType: form.value.issueType?.name || '',
        priority: form.value.priority?.name || '',
        description: form.value.description
      }
    }
  } else {
    // Create new issue
    const newIssue = {
      id: Math.max(...orderIssues.value.map(i => i.id)) + 1,
      orderNumber: form.value.orderNumber,
      issueType: form.value.issueType?.name || '',
      priority: form.value.priority?.name || '',
      status: 'Open',
      assigned: null as string | null,
      createdDate: new Date().toLocaleDateString('en-GB'),
      description: form.value.description
    }
    orderIssues.value.unshift(newIssue)
  }
  
  showCreateModal.value = false
  showEditModal.value = false
  selectedIssue.value = null
  resetForm()
  datatableKey.value++
}

const resetForm = () => {
  form.value = {
    orderNumber: '',
    issueType: null,
    priority: null,
    description: ''
  }
}

const handleIssueUpdate = () => {
  isIssueDetailsModalOpen.value = false
  datatableKey.value++
}

const handleSideBarUpdate = (isOpen: boolean) => {
  if (!isOpen) {
    showCreateModal.value = false
    showEditModal.value = false
    resetForm()
  }
}

const handleSideBarClose = () => {
  showCreateModal.value = false
  showEditModal.value = false
  resetForm()
}

const handleCancel = () => {
  showCreateModal.value = false
  showEditModal.value = false
  resetForm()
}

const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    'Open': 'bg-red-100 text-red-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority: string) => {
  const priorityClasses: { [key: string]: string } = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
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

const changeStatus = (issue: any) => {
  console.log('Change status for issue:', issue)
  // TODO: Implement status change modal
}

const toggleAssign = (issue: any) => {
  console.log('Toggle assign for issue:', issue)
  // TODO: Implement assign/unassign functionality
}

// Utility functions
const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}
</script>

<style scoped>
.erp_dashboard_wrapper > div:last-child {
  height: calc(100vh - 190px) !important;
  overflow: hidden !important;
}
</style>