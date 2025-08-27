<template>
  <div class="erp_dashboard_wrapper">
    <!-- Breadcrumb -->
    <div class="bg-white px-6 py-4">
      <nav class="text-[#626F86] text-sm space-x-2">
        <!-- <router-link :to="{ name: 'outbound.dashboard' }" class="hover:text-gray-800">Dashboard</router-link>
        <span>/</span> -->
        <router-link :to="{ name: 'outbound.stock-count' }" class="hover:text-gray-800">Stock Count</router-link>
        <span>/</span>
        <span class="">Stock Count Teams</span>
      </nav>
    </div>

    

    <!-- Content -->
    <div class="p-6 pt-0 bg-white min-h-screen">
      <!-- Teams Datatable -->
      <Datatable
        :items="teams"
        :columns="teamColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="StockCountTeams"
        :key="childKey"
      >
        <template #header_actions>
          <button 
            @click="showCreateModal = true"
            class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Create Team
          </button>
        </template>
        <template #column="col">
          <!-- Action column -->
          <span v-if="col.props?.column?.field === 'action'">
            <div class="flex items-center gap-2">
              <button @click="editTeam(col.props.row)" class="text-blue-600 hover:text-blue-800">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                </svg>
              </button>
              <button @click="deleteTeam(col.props.row)" class="text-red-600 hover:text-red-800">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_10070_16669)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_10070_16669">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </span>
          
          <!-- Default -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Create/Edit Team SideBarModal -->
    <SideBarModal
      :isOpen="showCreateModal"
      @update:isOpen="showCreateModal = $event"
      @close="resetForm"
      :title="editingTeamId ? 'Edit Stock Count Team' : 'Create Stock Count Team'"
      width="md"
    >
      <div class="space-y-6">
        <!-- Team Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
          <input 
            v-model="newTeam.name"
            type="text" 
            placeholder="Enter a team name"
            class="w-full text-[#172B4D]"
          />
        </div>

        <!-- Admins -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Admins</label>
          <CustomMultiSelect
            v-model="newTeam.admins"
            :options="availableAdmins"
            labelField="name"
            placeholder="Select team admins"
          />
        </div>

        <!-- Warehouse Shelves -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Shelves</label>
          <CustomMultiSelect
            v-model="newTeam.shelves"
            :options="availableShelves"
            labelField="name"
            placeholder="Select stock count shelves"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <!-- Delete button (only show when editing) -->
          <button 
            v-if="editingTeamId"
            @click="deleteTeamFromModal"
            class="flex items-center justify-center w-10 h-10 bg-[#C9372C] rounded-md hover:text-[#44546F]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
            </svg>
          </button>
          <div v-else></div>
          
          <!-- Cancel and Create/Update buttons -->
          <div class="flex items-center gap-3">
            <button 
              @click="showCreateModal = false"
              class="cancel_btn"
            >
              Cancel
            </button>
            <button 
              @click="createTeam"
              class="create_btn"
            >
              {{ editingTeamId ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Team Creation/Update Success Modal -->
    <SuccessModal
      :show="showCreateSuccessModal"
      :title="editingTeamId ? 'Stock Count Team Updated' : 'Stock Count Team Created'"
      :message="createSuccessMessage"
      @close="closeCreateSuccessModal"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :confirm-text="'Delete Team'"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="'Stock Count Team Deleted'"
      :message="successMessage"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import CustomMultiSelect from '@/views/Components/CustomMultiSelect.vue'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue';
import SuccessModal from '@/views/Components/ui/SuccessModal.vue';

const router = useRouter()

// Reactive state
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)
const showCreateSuccessModal = ref(false)
const createSuccessMessage = ref('')
const childKey = ref(0)
const editingTeamId = ref(null)
const teamToDelete = ref<any>(null)
const deletedTeamName = ref('')

// Teams data with mock admin and shelf assignments
const teams = ref([
  { 
    id: 15, 
    name: 'Team A (Azeez)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 14, 
    name: 'Team B (David)', 
    users: 4, 
    shelves: 2,
    admins: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ],
    assignedShelves: [
      { id: 1, name: 'Shelf A1' },
      { id: 2, name: 'Shelf A2' }
    ]
  },
  { 
    id: 13, 
    name: 'Team C (Sam)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 12, 
    name: 'Team D (Osas)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 11, 
    name: 'Team E (Bruno)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 10, 
    name: 'Team F (Ade)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 9, 
    name: 'Team E (Stella)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 8, 
    name: 'Team F (Tunji)', 
    users: 1, 
    shelves: 1,
    admins: [
      { id: 3, name: 'Mike Johnson' }
    ],
    assignedShelves: [
      { id: 3, name: 'Shelf B1' }
    ]
  },
  { 
    id: 7, 
    name: 'Team G (Mariam)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 6, 
    name: 'Team H (Dale)', 
    users: 1, 
    shelves: 1,
    admins: [
      { id: 4, name: 'Sarah Wilson' }
    ],
    assignedShelves: [
      { id: 4, name: 'Shelf B2' }
    ]
  },
  { 
    id: 5, 
    name: 'Team I (Joseph)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 4, 
    name: 'Team J (Harrison)', 
    users: 1, 
    shelves: 1,
    admins: [
      { id: 1, name: 'John Doe' }
    ],
    assignedShelves: [
      { id: 5, name: 'Shelf C1' }
    ]
  },
  { 
    id: 3, 
    name: 'Team K (Chukwudi)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  },
  { 
    id: 2, 
    name: 'Team L (Victor)', 
    users: 1, 
    shelves: 1,
    admins: [
      { id: 2, name: 'Jane Smith' }
    ],
    assignedShelves: [
      { id: 1, name: 'Shelf A1' }
    ]
  },
  { 
    id: 1, 
    name: 'Team M (Emmanuel)', 
    users: 0, 
    shelves: 0,
    admins: [],
    assignedShelves: []
  }
])

// New team form data
const newTeam = ref({
  name: '',
  admins: [],
  shelves: []
})

// Column definitions
const teamColumns = ref([
  {
    field: 'id',
    label: 'ID',
    width: '10%',
    sortable: true
  },
  {
    field: 'name',
    label: 'Team Name',
    width: '30%',
    sortable: true
  },
  {
    field: 'users',
    label: 'Users',
    width: '15%',
    sortable: true
  },
  {
    field: 'shelves',
    label: 'Shelves',
    width: '15%',
    sortable: true
  },
  {
    field: 'action',
    label: 'Action',
    width: '30%',
    sortable: false
  }
])

// Mock data for dropdowns

const availableAdmins = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'Sarah Wilson' }
])

const availableShelves = ref([
  { id: 1, name: 'Shelf A1' },
  { id: 2, name: 'Shelf A2' },
  { id: 3, name: 'Shelf B1' },
  { id: 4, name: 'Shelf B2' },
  { id: 5, name: 'Shelf C1' }
])

// Computed properties for modal messages
const deleteMessage = computed(() => {
  return teamToDelete.value 
    ? `You are about to delete this stock count team "${teamToDelete.value.name}".`
    : ''
})

const successMessage = computed(() => {
  return deletedTeamName.value 
    ? `The stock count team "${deletedTeamName.value}" has been successfully deleted from the system.`
    : ''
})

// Functions
const goBack = () => {
  router.push({ name: 'outbound.stock-count' })
}

const resetForm = () => {
  newTeam.value = {
    name: '',
    admins: [],
    shelves: []
  }
  editingTeamId.value = null
}

const createTeam = () => {
  if (editingTeamId.value) {
    // Edit mode - update existing team
    const teamIndex = teams.value.findIndex(t => t.id === editingTeamId.value)
    if (teamIndex > -1) {
      teams.value[teamIndex] = {
        ...teams.value[teamIndex],
        name: newTeam.value.name,
        admins: newTeam.value.admins,
        assignedShelves: newTeam.value.shelves,
        users: newTeam.value.admins.length,
        shelves: newTeam.value.shelves.length
      }
    }
    console.log('Updating team:', editingTeamId.value, newTeam.value)
    createSuccessMessage.value = `The stock count team "${newTeam.value.name}" has been successfully updated.`
  } else {
    // Create mode - create new team
    const newId = Math.max(...teams.value.map(t => t.id)) + 1
    teams.value.unshift({
      id: newId,
      name: newTeam.value.name,
      users: newTeam.value.admins.length,
      shelves: newTeam.value.shelves.length,
      admins: newTeam.value.admins,
      assignedShelves: newTeam.value.shelves
    })
    console.log('Creating team:', newTeam.value)
    createSuccessMessage.value = `The stock count team "${newTeam.value.name}" has been successfully added to the system.`
  }
  
  // Store the team name for success message before resetting
  const teamName = newTeam.value.name
  
  // Reset form and editing state
  newTeam.value = {
    name: '',
    admins: [],
    shelves: []
  }
  editingTeamId.value = null
  
  // Close modal
  showCreateModal.value = false
  
  // Refresh datatable
  childKey.value++
  
  // Show success modal with correct team name
  createSuccessMessage.value = editingTeamId.value 
    ? `The stock count team "${teamName}" has been successfully updated.`
    : `The stock count team "${teamName}" has been successfully added to the system.`
  showCreateSuccessModal.value = true
}

const editTeam = (team: any) => {
  // Populate form with team data for editing
  newTeam.value = {
    name: team.name,
    admins: team.admins || [],
    shelves: team.assignedShelves || []
  }
  
  // Set editing mode
  editingTeamId.value = team.id
  showCreateModal.value = true
  
  console.log('Edit team:', team)
  console.log('Populated form data:', newTeam.value)
}

const deleteTeam = (team: any) => {
  teamToDelete.value = team
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (teamToDelete.value) {
    // Store the team name for success message
    deletedTeamName.value = teamToDelete.value.name
    
    // Remove team from array
    const teamIndex = teams.value.findIndex(t => t.id === teamToDelete.value.id)
    if (teamIndex > -1) {
      teams.value.splice(teamIndex, 1)
    }
    
    // Close delete modal
    showDeleteModal.value = false
    
    // Show success modal
    showSuccessModal.value = true
    
    // Refresh datatable
    childKey.value++
    
    // Reset team to delete
    teamToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  teamToDelete.value = null
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  deletedTeamName.value = ''
}

const closeCreateSuccessModal = () => {
  showCreateSuccessModal.value = false
  createSuccessMessage.value = ''
}

const deleteTeamFromModal = () => {
  // Find the team being edited
  const team = teams.value.find(t => t.id === editingTeamId.value)
  if (team) {
    teamToDelete.value = team
    showCreateModal.value = false // Close edit modal first
    showDeleteModal.value = true
  }
}
</script>
