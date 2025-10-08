<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg bg-[#f9fafb]">
      <!-- Header -->
      <PageTitle title="Hub Management / Hubs" class="px-6" />
      
      <!-- Content -->
      <div class="px-6 pb-6">
        <!-- Hubs Datatable -->
        <Datatable 
          :items="hubs" 
          :columns="hubColumns" 
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :showActions="false"
          :showPagination="true"
          pageName="Hubs"
        >
          <template #header_actions>
            <Button 
              type="blue-btn"
              :onClick="openCreateModal"
              classStyle="flex items-center gap-2 px-4 py-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
              </svg>
              Create Hub
            </Button>
          </template>
          <template #column="col">
            <!-- Action Column -->
            <span v-if="col.props.column.field === 'action'">
              <div class="flex items-center gap-2">
                <!-- Edit Button -->
                <button 
                  @click="openEditModal(col.props.row)"
                  class="p-1 text-gray-600 hover:text-gray-800"
                  title="Edit Hub"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                  </svg>
                </button>
                
                <!-- Delete Button -->
                <button 
                  @click="openDeleteModal(col.props.row)"
                  class="p-1 text-gray-600 hover:text-red-600"
                  title="Delete Hub"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                  </svg>
                </button>
              </div>
            </span>
            
            <!-- Default Column -->
            <span v-else>
              {{ col.props.row[col.props.column.field] }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Create Hub SideBarModal -->
    <SideBarModal 
      :is-open="showCreateModal" 
      title="Create Hub"
      width="small"
      @close="closeCreateModal"
    >
      <template #default="slotProps">
        <div class="space-y-4 px-6 py-2">
          <!-- Hub Name -->
          <div>
            <label>Hub Name</label>
            <input 
              v-model="newHub.hubName"
              type="text" 
              placeholder="Enter a hub name"
              class="w-full"
            />
          </div>

          <!-- State -->
          <div>
            <label>State</label>
            <SelectField
              v-model="newHub.state"
              :options="stateOptions"
              placeholder="Select a state"
            />
          </div>

          <!-- Local Government -->
          <div>
            <label>Local Government</label>
            <SelectField
              v-model="newHub.localGovernment"
              :options="localGovernmentOptions"
              placeholder="Select a local government"
            />
          </div>
        </div>
      </template>

      <template #footer="slotProps">
        <div class="flex items-center justify-end gap-3">
            <Button 
              type="gray-btn"
              :onClick="slotProps.closeModal"
              classStyle="cancel_btn"
            >
            Cancel
          </Button>
          <Button 
            type="blue-btn"
            :onClick="createHub"
            classStyle="create_btn"
          >
            Create
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Hub SideBarModal -->
    <SideBarModal 
      :is-open="showEditModal" 
      title="Edit Hub"
      width="small"
      @close="closeEditModal"
    >
      <template #header>
        <SideBarHead 
          title="Edit Hub" 
          :subtitle="editingHub.hubName"
        >
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <template #default="slotProps">
        <div class="space-y-4 px-6 py-2">
          <!-- Hub Name -->
          <div>
            <label>Hub Name</label>
            <input 
              v-model="editingHub.hubName"
              type="text"
              class="w-full"
            />
          </div>

          <!-- State -->
          <div>
            <label>State</label>
            <SelectField
              v-model="editingHub.state"
              :options="stateOptions"
              placeholder="Select a state"
            />
          </div>

          <!-- Local Government -->
          <div>
            <label>Local Government</label>
            <SelectField
              v-model="editingHub.localGovernment"
              :options="localGovernmentOptions"
              placeholder="Select a local government"
            />
          </div>
        </div>
      </template>

      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <!-- Delete Button -->
          <Button 
            type="red-btn"
            :onClick="() => openDeleteModal(editingHub)"
            classStyle="w-10 h-10 p-0 flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
            </svg>
          </Button>

          <!-- Cancel and Update Buttons -->
          <div class="flex items-center gap-3">
            <Button 
              type="gray-btn"
              :onClick="slotProps.closeModal"
              classStyle="cancel_btn"
            >
              Cancel
            </Button>
            <Button 
              type="blue-btn"
              :onClick="updateHub"
              classStyle="create_btn"
            >
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="`You are about to delete this hub '${hubToDelete?.hubName}'.`"
      confirmText="Delete Hub"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningModal"
      title="Discard Changes?"
      :message="`You are about to leave the '${warningProcessName}' process. Any unsaved information will be lost.`"
      confirmText="Discard Changes"
      @confirm="confirmDiscard"
      @close="closeWarningModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SideBarHead from '@/views/Components/ui/SideBarHead.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import Button from '@/views/Components/ui/Button.vue'
import type { TableColumn, Option } from '@/types'

// Types
interface Hub {
  id?: number
  hubName: string
  state: { id: number; name: string } | null
  localGovernment: { id: number; name: string } | null
}

// Reactive state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showWarningModal = ref(false)
const warningProcessName = ref('')

// Change tracking
const originalNewHub = ref<Hub>({ hubName: '', state: null, localGovernment: null })
const originalEditingHub = ref<Hub>({ hubName: '', state: null, localGovernment: null })

const hasUnsavedChanges = (currentHub: any) => {
  if (showCreateModal.value) {
    return currentHub.hubName !== originalNewHub.value.hubName ||
           JSON.stringify(currentHub.state) !== JSON.stringify(originalNewHub.value.state) ||
           JSON.stringify(currentHub.localGovernment) !== JSON.stringify(originalNewHub.value.localGovernment)
  } else if (showEditModal.value) {
    return currentHub.hubName !== originalEditingHub.value.hubName ||
           JSON.stringify(currentHub.state) !== JSON.stringify(originalEditingHub.value.state) ||
           JSON.stringify(currentHub.localGovernment) !== JSON.stringify(originalEditingHub.value.localGovernment)
  }
  return false
}

// Hub data
const hubs = ref([
  { id: 87, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 54, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 25, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 30, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 51, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 21, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 35, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 23, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 33, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 88, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 81, hubName: 'Abia', state: 'Abia State', localGovernment: 'Abia South' },
  { id: 80, hubName: 'Abuja', state: 'FCT', localGovernment: 'Abia South' }
])

// Form data
const newHub = ref({
  hubName: '',
  state: null as Option | null,
  localGovernment: null as Option | null
})

const editingHub = ref({
  id: 0,
  hubName: '',
  state: null as Option | null,
  localGovernment: null as Option | null
})

const hubToDelete = ref<any>(null)

// Options for SelectField components
const stateOptions = ref<Option[]>([
  { id: 1, name: 'Abia State' },
  { id: 2, name: 'FCT' },
  { id: 3, name: 'Lagos State' },
  { id: 4, name: 'Kano State' },
  { id: 5, name: 'Rivers State' }
])

const localGovernmentOptions = ref<Option[]>([
  { id: 1, name: 'Abia South' },
  { id: 2, name: 'Abia North' },
  { id: 3, name: 'Abia Central' },
  { id: 4, name: 'Ikeja' },
  { id: 5, name: 'Victoria Island' }
])

// Table columns
const hubColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Hub Name', field: 'hubName', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Local Government', field: 'localGovernment', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])

// Modal functions
const openCreateModal = () => {
  resetNewHub()
  originalNewHub.value = { ...newHub.value }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  if (hasUnsavedChanges(newHub.value)) {
    warningProcessName.value = 'Create Hub'
    showWarningModal.value = true
  } else {
    showCreateModal.value = false
  }
}

const openEditModal = (hub: any) => {
  editingHub.value = {
    id: hub.id,
    hubName: hub.hubName,
    state: stateOptions.value.find(s => s.name === hub.state) || null,
    localGovernment: localGovernmentOptions.value.find(lg => lg.name === hub.localGovernment) || null
  }
  originalEditingHub.value = { ...editingHub.value }
  showEditModal.value = true
}

const closeEditModal = () => {
  if (hasUnsavedChanges(editingHub.value)) {
    warningProcessName.value = 'Edit Hub'
    showWarningModal.value = true
  } else {
    showEditModal.value = false
  }
}

const openDeleteModal = (hub: any) => {
  hubToDelete.value = hub
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  hubToDelete.value = null
  showDeleteModal.value = false
}

const closeWarningModal = () => {
  showWarningModal.value = false
  warningProcessName.value = ''
}

// Helper functions
const resetNewHub = () => {
  newHub.value = {
    hubName: '',
    state: null,
    localGovernment: null
  }
}

// CRUD operations
const createHub = () => {
  if (!newHub.value.hubName.trim() || !newHub.value.state || !newHub.value.localGovernment) {
    alert('Please fill in all fields')
    return
  }

  const newId = Math.max(...hubs.value.map(h => h.id)) + 1
  const newHubData = {
    id: newId,
    hubName: newHub.value.hubName.trim(),
    state: newHub.value.state.name,
    localGovernment: newHub.value.localGovernment.name
  }

  hubs.value.unshift(newHubData)
  showCreateModal.value = false
  resetNewHub()
}

const updateHub = () => {
  if (!editingHub.value.hubName.trim() || !editingHub.value.state || !editingHub.value.localGovernment) {
    alert('Please fill in all fields')
    return
  }

  const index = hubs.value.findIndex(h => h.id === editingHub.value.id)
  if (index !== -1) {
    hubs.value[index] = {
      id: editingHub.value.id,
      hubName: editingHub.value.hubName.trim(),
      state: editingHub.value.state.name,
      localGovernment: editingHub.value.localGovernment.name
    }
  }

  showEditModal.value = false
}

const confirmDelete = () => {
  if (hubToDelete.value) {
    const index = hubs.value.findIndex(h => h.id === hubToDelete.value.id)
    if (index !== -1) {
      hubs.value.splice(index, 1)
    }
  }
  closeDeleteModal()
}

const confirmDiscard = () => {
  if (warningProcessName.value === 'Create Hub') {
    showCreateModal.value = false
    resetNewHub()
  } else if (warningProcessName.value === 'Edit Hub') {
    showEditModal.value = false
  }
  closeWarningModal()
}
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
}

.grey_bg {
  min-height: 100vh;
}
</style>
