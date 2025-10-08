<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg bg-[#f9fafb]">
      <!-- Header -->
      <PageTitle :title="dynamicPageTitle" class="px-6" />

      <div class="mt-[16px]">
        <Tabs :tabs="hubTabs" @tab-changed="handleTabChange" :defaultTab="selectedHub">
        </Tabs>
      </div>
      
      <!-- Content -->
      <div class="px-6 pb-6 pt-[16px] bg-white">
        <!-- Hub Filter Tabs -->
     

        <!-- Hub Staff Datatable -->
        <Datatable 
          :items="filteredHubStaff" 
          :columns="hubStaffColumns" 
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :showActions="false"
          :showPagination="true"
          pageName="HubStaff"
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
              Create Hub Staff
            </Button>
          </template>
          <template #column="col">
            <!-- Action Column -->
            <span v-if="col.props.column.field === 'action'">
              <div class="flex items-center gap-2">
                <!-- Edit Button -->
                <button 
                  @click="() => openEditModal(col.props.row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                  </svg>
                </button>

                <!-- Delete Button -->
                <button 
                  @click="() => openDeleteModal(col.props.row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                  </svg>
                </button>
              </div>
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Create Hub Staff Modal -->
    <SideBarModal 
      :is-open="showCreateModal" 
      title="Create Hub Staff"
      width="small"
      @close="closeCreateModal"
    >
      <template #default="slotProps">
        <div class="space-y-4 px-6 py-2">
          <!-- Staff Name -->
          <div>
            <label>Staff Name</label>
            <input 
              v-model="newStaff.staffName"
              type="text" 
              placeholder="Enter a staff name"
              class="w-full"
            />
          </div>

          <!-- Email -->
          <div>
            <label>Email</label>
            <input 
              v-model="newStaff.email"
              type="email" 
              placeholder="Enter email address"
              class="w-full"
            />
          </div>

          <!-- Phone -->
          <div>
            <label>Phone</label>
            <input 
              v-model="newStaff.phone"
              type="tel" 
              placeholder="Enter a phone number"
              class="w-full"
            />
          </div>

          <!-- Hub -->
          <div>
            <label>Hub</label>
            <SelectField
              v-model="newStaff.hub"
              :options="hubOptions"
              placeholder="Select a hub"
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
            :onClick="createStaff"
            classStyle="create_btn"
          >
            Create
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Hub Staff Modal -->
    <SideBarModal 
      :is-open="showEditModal" 
      title="Edit Hub Staff"
      width="small"
      @close="closeEditModal"
    >
      <template #header>
        <SideBarHead 
          title="Edit Hub Staff" 
          :subtitle="editingStaff.staffName"
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
          <!-- Staff Name -->
          <div>
            <label>Staff Name</label>
            <input 
              v-model="editingStaff.staffName"
              type="text"
              class="w-full"
            />
          </div>

          <!-- Email -->
          <div>
            <label>Email</label>
            <input 
              v-model="editingStaff.email"
              type="email"
              class="w-full"
            />
          </div>

          <!-- Phone -->
          <div>
            <label>Phone</label>
            <input 
              v-model="editingStaff.phone"
              type="tel"
              class="w-full"
            />
          </div>

          <!-- Hub -->
          <div>
            <label>Hub</label>
            <SelectField
              v-model="editingStaff.hub"
              :options="hubOptions"
              placeholder="Select a hub"
            />
          </div>
        </div>
      </template>

      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <!-- Delete Button -->
          <Button 
            type="red-btn"
            :onClick="() => openDeleteModal(editingStaff)"
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
              :onClick="updateStaff"
              classStyle="update_btn"
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
      title="Delete Hub Staff"
      message="Are you sure you want to delete this hub staff member? This action cannot be undone."
      confirmText="Delete"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Tabs from '@/views/Components/Tabs.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SideBarHead from '@/views/Components/ui/SideBarHead.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import Button from '@/views/Components/ui/Button.vue'
import type { TableColumn, Option } from '@/types'

// Types
interface HubStaff {
  id?: number
  staffName: string
  email: string
  phone: string
  hub: { id: number; name: string } | null
}

// Reactive state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showWarningModal = ref(false)
const warningProcessName = ref('')

// Change tracking
const originalNewStaff = ref<HubStaff>({ staffName: '', email: '', phone: '', hub: null })
const originalEditingStaff = ref<HubStaff>({ staffName: '', email: '', phone: '', hub: null })

const hasUnsavedChanges = (currentStaff: any) => {
  if (showCreateModal.value) {
    return currentStaff.staffName !== originalNewStaff.value.staffName ||
           currentStaff.email !== originalNewStaff.value.email ||
           currentStaff.phone !== originalNewStaff.value.phone ||
           JSON.stringify(currentStaff.hub) !== JSON.stringify(originalNewStaff.value.hub)
  } else if (showEditModal.value) {
    return currentStaff.staffName !== originalEditingStaff.value.staffName ||
           currentStaff.email !== originalEditingStaff.value.email ||
           currentStaff.phone !== originalEditingStaff.value.phone ||
           JSON.stringify(currentStaff.hub) !== JSON.stringify(originalEditingStaff.value.hub)
  }
  return false
}

// Hub tabs
const selectedHub = ref('All Hubs')
const hubTabs = ref([
  'All Hubs',
  'Abuja Hub', 
  'Asaba Hub',
  'Kano Hub'
])

// Dynamic page title
const dynamicPageTitle = computed(() => {
  return `Hub Management / Hub Staff / ${selectedHub.value}`
})

// Tab change handler
const handleTabChange = (tab: string | any, index: number) => {
  selectedHub.value = typeof tab === 'string' ? tab : tab.name
}

// Hub Staff data
const hubStaff = ref([
  { id: 87, staffName: 'Oluwatosin Adegboye', email: 'sleeknne4u1@gmail.com', phone: '+234 899 9999 999', hub: 'Abuja Hub' },
  { id: 54, staffName: 'Janet Adeajayi', email: 'sleeknne4u1@gmail.com', phone: '+234 899 9999 999', hub: 'Abuja Hub' },
  { id: 25, staffName: 'Henry Christopher', email: 'sleeknne4u1@gmail.com', phone: '+234 899 9999 999', hub: 'Asaba Hub' },
  { id: 30, staffName: 'Oluwatosin Adegboye', email: 'sleeknne4u1@gmail.com', phone: '+234 899 9999 999', hub: 'Abuja Hub' },
  { id: 51, staffName: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+234 899 9999 999', hub: 'Kano Hub' },
  { id: 21, staffName: 'Michael Brown', email: 'michael.brown@email.com', phone: '+234 899 9999 999', hub: 'Asaba Hub' },
  { id: 35, staffName: 'Emily Davis', email: 'emily.davis@email.com', phone: '+234 899 9999 999', hub: 'Abuja Hub' },
  { id: 23, staffName: 'David Wilson', email: 'david.wilson@email.com', phone: '+234 899 9999 999', hub: 'Kano Hub' }
])

// Filtered hub staff based on selected tab
const filteredHubStaff = computed(() => {
  if (selectedHub.value === 'All Hubs') {
    return hubStaff.value
  }
  return hubStaff.value.filter(staff => staff.hub === selectedHub.value)
})

// Form data
const newStaff = ref<HubStaff>({
  staffName: '',
  email: '',
  phone: '',
  hub: null
})

const editingStaff = ref<HubStaff>({
  staffName: '',
  email: '',
  phone: '',
  hub: null
})

const staffToDelete = ref<HubStaff | null>(null)

// Hub options for SelectField
const hubOptions = ref<Option[]>([
  { id: 1, name: 'Abuja Hub' },
  { id: 2, name: 'Asaba Hub' },
  { id: 3, name: 'Kano Hub' }
])

// Table columns
const hubStaffColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Hub Staff Name', field: 'staffName', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Assigned Hub', field: 'hub', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])

// Modal functions
const openCreateModal = () => {
  resetNewStaff()
  originalNewStaff.value = { ...newStaff.value }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  if (hasUnsavedChanges(newStaff.value)) {
    warningProcessName.value = 'Create Hub Staff'
    showWarningModal.value = true
  } else {
    showCreateModal.value = false
  }
}

const openEditModal = (staff: any) => {
  editingStaff.value = {
    id: staff.id,
    staffName: staff.staffName,
    email: staff.email,
    phone: staff.phone,
    hub: hubOptions.value.find(h => h.name === staff.hub) || null
  }
  originalEditingStaff.value = { ...editingStaff.value }
  showEditModal.value = true
}

const closeEditModal = () => {
  if (hasUnsavedChanges(editingStaff.value)) {
    warningProcessName.value = 'Edit Hub Staff'
    showWarningModal.value = true
  } else {
    showEditModal.value = false
  }
}

const openDeleteModal = (staff: HubStaff) => {
  staffToDelete.value = staff
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  staffToDelete.value = null
}

const closeWarningModal = () => {
  showWarningModal.value = false
  warningProcessName.value = ''
}

const confirmDiscard = () => {
  showWarningModal.value = false
  if (warningProcessName.value === 'Create Hub Staff') {
    showCreateModal.value = false
    resetNewStaff()
  } else if (warningProcessName.value === 'Edit Hub Staff') {
    showEditModal.value = false
    resetEditingStaff()
  }
  warningProcessName.value = ''
}

// Helper functions
const resetNewStaff = () => {
  newStaff.value = {
    staffName: '',
    email: '',
    phone: '',
    hub: null
  }
}

const resetEditingStaff = () => {
  editingStaff.value = {
    staffName: '',
    email: '',
    phone: '',
    hub: null
  }
}

// CRUD operations
const createStaff = () => {
  if (!newStaff.value.staffName.trim() || !newStaff.value.email.trim() || !newStaff.value.phone.trim() || !newStaff.value.hub) {
    alert('Please fill in all fields')
    return
  }

  const newId = Math.max(...hubStaff.value.map(s => s.id)) + 1
  const newStaffMember = {
    id: newId,
    staffName: newStaff.value.staffName,
    email: newStaff.value.email,
    phone: newStaff.value.phone,
    hub: newStaff.value.hub?.name || ''
  }

  hubStaff.value.push(newStaffMember)
  showCreateModal.value = false
  resetNewStaff()
}

const updateStaff = () => {
  if (!editingStaff.value.staffName.trim() || !editingStaff.value.email.trim() || !editingStaff.value.phone.trim() || !editingStaff.value.hub) {
    alert('Please fill in all fields')
    return
  }

  const index = hubStaff.value.findIndex(s => s.id === editingStaff.value.id)
  if (index !== -1) {
    hubStaff.value[index] = {
      ...hubStaff.value[index],
      staffName: editingStaff.value.staffName,
      email: editingStaff.value.email,
      phone: editingStaff.value.phone,
      hub: editingStaff.value.hub?.name || ''
    }
  }

  showEditModal.value = false
  resetEditingStaff()
}

const confirmDelete = () => {
  if (staffToDelete.value) {
    const index = hubStaff.value.findIndex(s => s.id === staffToDelete.value?.id)
    if (index !== -1) {
      hubStaff.value.splice(index, 1)
    }
  }
  closeDeleteModal()
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
