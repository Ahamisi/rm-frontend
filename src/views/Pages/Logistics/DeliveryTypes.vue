<template>
  <div class="px-6 erp_dashboard_wrapper">
      <!-- Header -->
    <PageTitle title="Delivery Types" />

    <!-- Main Content -->
    <div class="min-h-[calc(100vh-190px)]">
      <Datatable 
        :items="mockDeliveryTypes"
        :columns="deliveryTypeColumns" 
        :searchable="true"
        :sortable="true"
        pageName="DeliveryTypes"
      >
        <template #header_actions>
          <Button 
            type="blue-btn"
            :onClick="createDeliveryType"
            classStyle="flex items-center gap-2 px-4 py-2 rounded text-white bg-[#0C66E4] hover:bg-[#0C66E4]/80"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
            <span class="text-sm">Create Delivery Type</span>
          </Button>
        </template>

        <template #column="col">
          <!-- Action -->
          <span v-if="col.props.column.field === 'action'">
            <div class="flex items-center gap-2">
              <!-- Edit -->
              <button 
                @click="editDeliveryType(col.props.row as DeliveryType)"
                class="p-1 text-gray-600 hover:text-gray-800"
                title="Edit Delivery Type"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                </svg>
              </button>
              
              <!-- Delete -->
              <button 
                @click="deleteDeliveryType(col.props.row as DeliveryType)"
                class="p-1 text-gray-600 hover:text-gray-800"
                title="Delete Delivery Type"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C17.8946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 17.8946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.48043 7.10536 6.73478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.7072 10.1324 17.2539 10.1922C17.8007 10.2521 17.8332 10.3218 17.8489 10.3961C17.8647 10.4704 17.8634 10.5473 17.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
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

    <!-- Create/Edit Delivery Type Modal -->
    <SideBarModal 
      :is-open="showDeliveryTypeModal" 
      width="small"
      @close="closeDeliveryTypeModal"
    >
      <template #header>
        <SideBarHead :title="isEditing ? 'Edit Delivery Type' : 'Create Delivery Type'">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <div class="p-6 space-y-4">
        <!-- Delivery Type Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Type Name</label>
          <input 
            v-model="deliveryTypeForm.name"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a delivery type name"
          />
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <NairaInput
            v-model="deliveryTypeForm.price"
            placeholder="0.00"
          />
        </div>

        <!-- Use Percentage -->
        <div class="flex items-center">
          <input 
            v-model="deliveryTypeForm.usePercentage"
            type="checkbox" 
            id="usePercentage"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label for="usePercentage" class="ml-2 text-sm font-medium text-gray-700">Use Percentage</label>
        </div>

        <!-- Available Days -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Available Day(s)</label>
          <CustomMultiSelect
            v-model="deliveryTypeForm.availableDays"
            :options="dayOptions"
            placeholder="Select available day(s)"
            labelField="name"
          />
        </div>

        <!-- State -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
          <SelectField
            v-model="deliveryTypeForm.state"
            :options="stateOptions"
            placeholder="Select a state"
          />
        </div>

        <!-- Cutoff Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cutoff Time (in hours)</label>
          <input 
            v-model="deliveryTypeForm.cutoffTime"
            type="number" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <!-- Delete button (only show when editing) -->
          <Button 
            v-if="isEditing"
            type="red-btn"
            :onClick="deleteDeliveryTypeFromEdit"
            classStyle="flex items-center gap-2 px-4 py-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="white"/>
            </svg>
          </Button>
          <div v-else></div>

          <div class="flex items-center gap-3">
            <Button 
              type="gray-btn"
              :onClick="closeDeliveryTypeModal"
              classStyle="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="blue-btn"
              :onClick="saveDeliveryType"
              classStyle="px-4 py-2"
            >
              {{ isEditing ? 'Update' : 'Create' }}
            </Button>
      </div>
    </div>
      </template>
    </SideBarModal>

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="successModalTitle"
      :message="successModalMessage"
      @close="showSuccessModal = false"
    />

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningModal"
      title="Discard Changes"
      message=""
      :processName="warningProcessName"
      confirmText="Discard Changes"
      @confirm="confirmDiscard"
      @close="closeWarningModal"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      confirmText="Delete Delivery Type"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SideBarHead from '@/views/Components/ui/SideBarHead.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import CustomMultiSelect from '@/views/Components/CustomMultiSelect.vue'
import NairaInput from '@/views/Components/ui/NairaInput.vue'
import Button from '@/views/Components/ui/Button.vue'
import SuccessModal from '@/views/Components/ui/SuccessModal.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue'
import type { TableColumn, Option } from '@/types'

// Interface for Delivery Type
interface DeliveryType {
  id: number
  name: string
  daysAvailable: string
  state: string
  cutoffTime: string
  price?: number
  usePercentage?: boolean
}

// Reactive state
const showDeliveryTypeModal = ref(false)
const showSuccessModal = ref(false)
const showWarningModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const deliveryTypeToDelete = ref<DeliveryType | null>(null)
const warningProcessName = ref('')

// Success modal content
const successModalTitle = ref('')
const successModalMessage = ref('')

// Form data
const deliveryTypeForm = ref({
  name: '',
  price: 0,
  usePercentage: false,
  availableDays: [] as Option[],
  state: null as Option | null,
  cutoffTime: 0
})

// Original form data for change tracking
const originalFormData = ref({
  name: '',
  price: 0,
  usePercentage: false,
  availableDays: [] as Option[],
  state: null as Option | null,
  cutoffTime: 0
})

// Mock data
const mockDeliveryTypes = ref<DeliveryType[]>([
  {
    id: 87,
    name: 'Express',
    daysAvailable: '-',
    state: 'Lagos State',
    cutoffTime: '-'
  },
  {
    id: 54,
    name: 'Regular',
    daysAvailable: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    state: 'Lagos State',
    cutoffTime: '12 hours'
  },
  {
    id: 25,
    name: 'Regular',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Abia State',
    cutoffTime: '72 hours'
  },
  {
    id: 30,
    name: 'Regular',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Imo State',
    cutoffTime: '72 hours'
  },
  {
    id: 51,
    name: 'Regular',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Ogun State',
    cutoffTime: '24 hours'
  },
  {
    id: 21,
    name: 'Express',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Oyo State',
    cutoffTime: '-'
  },
  {
    id: 35,
    name: 'Regular',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Kwara State',
    cutoffTime: '24 hours'
  },
  {
    id: 23,
    name: 'Express',
    daysAvailable: 'Tuesday, Thursday, Saturday',
    state: 'Ekiti State',
    cutoffTime: '-'
  }
])

// Options for SelectField components
const dayOptions = ref<Option[]>([
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 7, name: 'Sunday' }
])

const stateOptions = ref<Option[]>([
  { id: 1, name: 'Lagos State' },
  { id: 2, name: 'Abia State' },
  { id: 3, name: 'Imo State' },
  { id: 4, name: 'Ogun State' },
  { id: 5, name: 'Oyo State' },
  { id: 6, name: 'Kwara State' },
  { id: 7, name: 'Ekiti State' },
  { id: 8, name: 'Kano State' },
  { id: 9, name: 'Rivers State' },
  { id: 10, name: 'Delta State' }
])

// Table columns
const deliveryTypeColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Delivery Type Name', field: 'name', sortable: true },
  { label: 'Days Available', field: 'daysAvailable', sortable: false },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Cutoff Time', field: 'cutoffTime', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])

// Computed property to check if form has unsaved changes
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(deliveryTypeForm.value) !== JSON.stringify(originalFormData.value)
})

// Computed property for delete message
const deleteMessage = computed(() => {
  return `You are about to delete this delivery type "${deliveryTypeToDelete.value?.name || ''}".`
})


// Functions
const createDeliveryType = () => {
  resetForm()
  isEditing.value = false
  showDeliveryTypeModal.value = true
}

const editDeliveryType = (deliveryType: DeliveryType) => {
  // Parse available days from string
  const availableDaysArray: Option[] = []
  if (deliveryType.daysAvailable && deliveryType.daysAvailable !== '-') {
    const dayNames = deliveryType.daysAvailable.split(', ')
    dayNames.forEach(dayName => {
      const day = dayOptions.value.find(d => d.name === dayName.trim())
      if (day) {
        availableDaysArray.push(day)
      }
    })
  }
  
  // Populate form with existing data
  deliveryTypeForm.value = {
    name: deliveryType.name,
    price: deliveryType.price || 0,
    usePercentage: deliveryType.usePercentage || false,
    availableDays: availableDaysArray,
    state: stateOptions.value.find(state => state.name === deliveryType.state) || null,
    cutoffTime: parseInt(deliveryType.cutoffTime) || 0
  }
  
  // Store original data for change tracking
  originalFormData.value = { ...deliveryTypeForm.value }
  
  isEditing.value = true
  showDeliveryTypeModal.value = true
}

const deleteDeliveryType = (deliveryType: DeliveryType) => {
  deliveryTypeToDelete.value = deliveryType
  showDeleteModal.value = true
}

const saveDeliveryType = () => {
  // Simulate save operation
  setTimeout(() => {
    showDeliveryTypeModal.value = false
    
    // Show success modal
    successModalTitle.value = isEditing.value ? 'Delivery Type Updated' : 'Delivery Type Created'
    successModalMessage.value = isEditing.value 
      ? `The delivery type "${deliveryTypeForm.value.name}" has been successfully updated.`
      : `The delivery type "${deliveryTypeForm.value.name}" has been successfully added to the system.`
    
    showSuccessModal.value = true
  }, 500)
}

const deleteDeliveryTypeFromEdit = () => {
  // Find the delivery type being edited
  const editingDeliveryType = mockDeliveryTypes.value.find(dt => dt.name === deliveryTypeForm.value.name)
  if (editingDeliveryType) {
    deliveryTypeToDelete.value = editingDeliveryType
    showDeleteModal.value = true
  }
}

const confirmDelete = () => {
  // Simulate delete operation
  setTimeout(() => {
    showDeleteModal.value = false
    showDeliveryTypeModal.value = false
    
    // Show success modal
    successModalTitle.value = 'Delivery Type Deleted'
    successModalMessage.value = `The delivery type "${deliveryTypeToDelete.value?.name || ''}" has been successfully deleted.`
    showSuccessModal.value = true
  }, 500)
}

const closeDeliveryTypeModal = () => {
  if (hasUnsavedChanges.value && !showSuccessModal.value) {
    warningProcessName.value = isEditing.value ? 'Edit Delivery Type' : 'Create Delivery Type'
    showWarningModal.value = true
  } else {
    showDeliveryTypeModal.value = false
  }
}

const confirmDiscard = () => {
  showWarningModal.value = false
  showDeliveryTypeModal.value = false
  resetForm()
}

const closeWarningModal = () => {
  showWarningModal.value = false
}


const resetForm = () => {
  deliveryTypeForm.value = {
    name: '',
    price: 0,
    usePercentage: false,
    availableDays: [],
    state: null,
    cutoffTime: 0
  }
  originalFormData.value = { ...deliveryTypeForm.value }
}
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}
</style>
