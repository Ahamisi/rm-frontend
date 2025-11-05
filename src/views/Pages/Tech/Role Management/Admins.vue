<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Role Management / Admins" class="px-6" />

    <div class="px-6 py-6">
      <!-- Admins Datatable -->
      <Datatable
        :items="admins"
        :columns="columns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Admins"
      >
        <template #header_actions>
          <Button type="blue-btn" :onClick="openCreateModal">
            + Create Admin
          </Button>
        </template>
        <template #column="col">
          <!-- Admin Name Column -->
          <span v-if="col.props?.column?.field === 'admin_name'">
            <div class="flex items-center gap-2">
              <img 
                :src="getAdminAvatar((col.props?.formattedRow as any)?.admin_name)" 
                :alt="(col.props?.formattedRow as any)?.admin_name"
                class="w-6 h-6 rounded-full"
              >
              <span class="text-sm">{{ (col.props?.formattedRow as any)?.admin_name }}</span>
            </div>
          </span>
          <!-- Roles Column - Just show comma-separated text -->
          <span v-else-if="col.props?.column?.field === 'roles'">
            {{ (col.props?.formattedRow as any)?.roles || '' }}
          </span>
          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown
              :rowData="col.props?.row"
              :menuItems="actionMenuItems"
              @menuAction="handleMenuAction"
            />
          </span>
          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Create Admin Modal -->
    <SideBarModal
      title="Create Admin"
      :is-open="showCreateModal"
      @update:isOpen="showCreateModal = $event"
      @close="handleCloseCreateModal"
      width="medium"
    >
      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Profile Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  <img 
                    v-if="adminForm.profileImage" 
                    :src="adminForm.profileImage" 
                    alt="Profile" 
                    class="w-full h-full object-cover"
                  >
                  <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#9CA3AF"/>
                  </svg>
                </div>
                <input
                  type="file"
                  ref="fileInputRef"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                >
                <button
                  @click="fileInputRef?.click()"
                  class="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700"
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.994C2 5.893 2.898 5 3.99 5H20.01C21.108 5 22 5.895 22 6.994V19.006C21.9992 19.5339 21.7894 20.04 21.4165 20.4137C21.0436 20.7873 20.5379 20.9981 20.01 21H3.99C3.46185 20.9989 2.9557 20.7884 2.58261 20.4146C2.20953 20.0407 2 19.5341 2 19.006V6.994ZM12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17ZM17 9C17 9.556 17.448 10 18 10C18.556 10 19 9.552 19 9C19 8.444 18.552 8 18 8C17.444 8 17 8.448 17 9ZM8 4C8 3.448 8.453 3 8.997 3H15.003C15.553 3 16 3.444 16 4V5H8V4Z" fill="#44546F"/>
<path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" fill="#44546F"/>
</svg>


                </button>
              </div>
              <div class="flex-1 flex flex-col justify-center">
                <p class="text-sm text-gray-600">Add a profile image for this admin</p>
                <button
                  @click="fileInputRef?.click()"
                  class="mt-2 text-sm text-blue-600 hover:text-blue-700 text-left"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>

          <!-- Admin Name and Phone Number (same row) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
              <input 
                v-model="adminForm.adminName"
                type="text" 
                placeholder="Enter an admin name"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                v-model="adminForm.phoneNumber"
                type="tel" 
                placeholder="Enter a phone number"
                class="w-full"
              />
            </div>
          </div>

          <!-- Email and Branch (same row) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="adminForm.email"
                type="email" 
                placeholder="Enter email address"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <SelectField
                v-model="adminForm.branch"
                :options="branchOptions"
                placeholder="Select a branch"
              />
            </div>
          </div>

          <!-- Roles -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Roles</label>
            <CustomMultiSelect
              v-model="adminForm.roles"
              :options="roleOptions"
              labelField="name"
              placeholder="Select roles"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseCreateModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleCreateAdmin">Create</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Admin Modal -->
    <SideBarModal
      :title="`Edit Admin`"
      :is-open="showEditModal"
      @update:isOpen="showEditModal = $event"
      @close="handleCloseEditModal"
      width="medium"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h2>Edit Admin</h2>
          <div class="flex items-center gap-2">
            <img 
              :src="getAdminAvatar(editingAdmin?.admin_name)" 
              :alt="editingAdmin?.admin_name"
              class="w-8 h-8 rounded-full"
            >
            <span class="font-medium">{{ editingAdmin?.admin_name?.toUpperCase() }}</span>
          </div>
        </div>
      </template>

      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Profile Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  <img 
                    v-if="adminForm.profileImage" 
                    :src="adminForm.profileImage" 
                    alt="Profile" 
                    class="w-full h-full object-cover"
                  >
                  <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#9CA3AF"/>
                  </svg>
                </div>
                <input
                  type="file"
                  ref="editFileInputRef"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                >
                <button
                  @click="editFileInputRef?.click()"
                  class="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer "
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.994C2 5.893 2.898 5 3.99 5H20.01C21.108 5 22 5.895 22 6.994V19.006C21.9992 19.5339 21.7894 20.04 21.4165 20.4137C21.0436 20.7873 20.5379 20.9981 20.01 21H3.99C3.46185 20.9989 2.9557 20.7884 2.58261 20.4146C2.20953 20.0407 2 19.5341 2 19.006V6.994ZM12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17ZM17 9C17 9.556 17.448 10 18 10C18.556 10 19 9.552 19 9C19 8.444 18.552 8 18 8C17.444 8 17 8.448 17 9ZM8 4C8 3.448 8.453 3 8.997 3H15.003C15.553 3 16 3.444 16 4V5H8V4Z" fill="#44546F"/>
<path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" fill="#44546F"/>
</svg>

                </button>
              </div>
              <div class="flex-1 flex flex-col justify-center">
                <p class="text-sm text-gray-600">Add a profile image for this admin</p>
                <button
                  @click="editFileInputRef?.click()"
                  class="mt-2 text-sm text-blue-600 hover:text-blue-700 text-left"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>

          <!-- Admin Name and Phone Number (same row) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
              <input 
                v-model="adminForm.adminName"
                type="text" 
                placeholder="Enter an admin name"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                v-model="adminForm.phoneNumber"
                type="tel" 
                placeholder="Enter a phone number"
                class="w-full"
              />
            </div>
          </div>

          <!-- Email and Branch (same row) -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="adminForm.email"
                type="email" 
                placeholder="Enter email address"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <SelectField
                v-model="adminForm.branch"
                :options="branchOptions"
                placeholder="Select a branch"
              />
            </div>
          </div>

          <!-- Roles -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Roles</label>
            <CustomMultiSelect
              v-model="adminForm.roles"
              :options="roleOptions"
              labelField="name"
              placeholder="Select roles"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-between">
          <Button type="red-btn" :onClick="handleDeleteAdmin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="currentColor"/>
            </svg>
          </Button>
          <div class="flex items-center gap-3">
            <Button type="gray-btn" :onClick="handleCloseEditModal">Cancel</Button>
            <Button type="blue-btn" :onClick="handleUpdateAdmin">Update</Button>
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

    <!-- Reset Password Confirmation Modal -->
    <WarningConfirmationModal
      :show="showResetPasswordModal"
      title="Reset Password?"
      :message="resetPasswordMessage"
      confirm-text="Reset Password"
      confirm-button-type="yellow-btn"
      @close="showResetPasswordModal = false"
      @confirm="handleResetPassword"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :sub-message="'This action will permanently remove this admin from the system. This action cannot be undone.'"
      confirm-text="Delete Admin"
      @cancel="showDeleteModal = false"
      @confirm="confirmDeleteAdmin"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Button from "@/views/Components/ui/Button.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import CustomMultiSelect from "@/views/Components/CustomMultiSelect.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import { ref, computed, h } from 'vue';
import type { TableColumn, MenuItem } from '@/types';

// Icon components using h() function
const EditIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z',
    fill: '#626F86'
  })
]);

const ResetPasswordIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M5 11.009C5 9.899 5.897 9 7.006 9H16.994C17.5262 9.00106 18.0363 9.21316 18.4123 9.58977C18.7884 9.96639 18.9997 10.4768 19 11.009V18.991C19 20.101 18.103 21 16.994 21H7.006C6.4737 20.9992 5.96347 20.7872 5.58736 20.4105C5.21125 20.0338 5 19.5233 5 18.991V11.009ZM7 11V19H17V11H7Z',
    fill: '#626F86'
  }),
  h('path', {
    d: 'M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z',
    fill: '#626F86'
  }),
  h('path', {
    d: 'M8 6.002C8.00053 4.94111 8.42206 3.9238 9.17204 3.17345C9.92201 2.4231 10.9391 2.00106 12 2C12.5255 2 13.0458 2.10353 13.5312 2.30467C14.0166 2.50582 14.4577 2.80063 14.8291 3.17228C15.2006 3.54393 15.4952 3.98512 15.6961 4.47065C15.897 4.95619 16.0003 5.47654 16 6.002V6.5H14V6.002C14.0001 5.73922 13.9485 5.479 13.8481 5.23617C13.7476 4.99335 13.6003 4.77269 13.4146 4.58679C13.2289 4.40088 13.0084 4.25338 12.7657 4.1527C12.523 4.05202 12.2628 4.00013 12 4C10.898 4 10 4.898 10 6.002V11H8V6.002ZM14 6.5H16C16 6.76522 15.8946 7.01957 15.7071 7.20711C15.5196 7.39464 15.2652 7.5 15 7.5C14.7348 7.5 14.4804 7.39464 14.2929 7.20711C14.1054 7.01957 14 6.76522 14 6.5Z',
    fill: '#626F86'
  })
]);

const DeleteIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z',
    fill: '#626F86'
  })
]);

const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Admin Name', field: 'admin_name', sortable: true },
  { label: 'Roles', field: 'roles', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
];

const admins = ref([
  { id: 87, admin_name: 'Josh Michael', roles: 'Super Admin', action: '' },
  { id: 54, admin_name: 'Sarah Badmus', roles: 'Inventory, Inbound Inventory', action: '' },
  { id: 25, admin_name: 'Esther Joel', roles: 'Super Admin', action: '' },
  { id: 30, admin_name: 'Esther Joel', roles: 'Inventory, Inbound Inventory', action: '' },
  { id: 51, admin_name: 'Esther Joel', roles: 'Super Admin', action: '' },
  { id: 21, admin_name: 'Femi Babalola', roles: 'Inventory, Inbound Inventory', action: '' },
  { id: 35, admin_name: 'Femi Babalola', roles: 'Super Admin', action: '' },
  { id: 23, admin_name: 'Sarah Badmus', roles: 'Inventory, Inbound Inventory', action: '' },
  { id: 33, admin_name: 'Sarah Badmus', roles: 'Super Admin', action: '' },
  { id: 87, admin_name: 'Josh Michael', roles: 'CSO, Branch Switcher, Report Manager', action: '' },
  { id: 88, admin_name: 'Josh Michael', roles: 'Super Admin', action: '' },
  { id: 81, admin_name: 'Josh Michael', roles: 'CSO, Branch Switcher, Report Manager', action: '' },
  { id: 80, admin_name: 'Femi Babalola', roles: 'Super Admin', action: '' },
  { id: 5, admin_name: 'Esther Joel', roles: 'CSO, Branch Switcher, Report Manager', action: '' },
  { id: 55, admin_name: 'Femi Babalola', roles: 'Super Admin', action: '' }
]);

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showSuccessModal = ref(false);
const showDeleteModal = ref(false);
const showResetPasswordModal = ref(false);
const editingAdmin = ref<any>(null);
const successModalTitle = ref('');
const successModalMessage = ref('');
const deleteMessage = ref('');
const resetPasswordMessage = ref('');
const fileInputRef = ref<HTMLInputElement | null>(null);
const editFileInputRef = ref<HTMLInputElement | null>(null);

const adminForm = ref({
  profileImage: '',
  adminName: '',
  phoneNumber: '',
  email: '',
  branch: null as any,
  roles: [] as any[]
});

const branchOptions = [
  { name: 'Lagos', id: 'lagos' },
  { name: 'Abuja', id: 'abuja' },
  { name: 'Port Harcourt', id: 'ph' },
];

const roleOptions = [
  { name: 'Super Admin', id: 'super-admin' },
  { name: 'Inventory', id: 'inventory' },
  { name: 'Inbound Inventory', id: 'inbound-inventory' },
  { name: 'CSO', id: 'cso' },
  { name: 'Branch Switcher', id: 'branch-switcher' },
  { name: 'Report Manager', id: 'report-manager' },
];

const actionMenuItems: MenuItem[] = [
  { 
    id: 'edit',
    label: 'Edit', 
    action: 'edit', 
    icon: EditIcon,
    iconClass: ''
  },
  { 
    id: 'reset-password',
    label: 'Reset Password', 
    action: 'reset-password', 
    icon: ResetPasswordIcon,
    iconClass: ''
  },
  { 
    id: 'delete',
    label: 'Delete', 
    action: 'delete', 
    icon: DeleteIcon,
    iconClass: ''
  },
];

const getAdminAvatar = (adminName: string) => {
  const avatarMap: { [key: string]: string } = {
    'Esther Joel': '/src/assets/images/profileImg.png',
    'Femi Babalola': '/src/assets/images/femiImg.png',
    'Sarah Badmus': '/src/assets/images/avatarImage.png',
    'Josh Michael': '/src/assets/images/joshImg.png'
  };
  return avatarMap[adminName] || '/src/assets/images/avatarImage.png';
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      adminForm.value.profileImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const resetForm = () => {
  adminForm.value = {
    profileImage: '',
    adminName: '',
    phoneNumber: '',
    email: '',
    branch: null,
    roles: []
  };
};

const openCreateModal = () => {
  resetForm();
  showCreateModal.value = true;
};

const handleCloseCreateModal = () => {
  showCreateModal.value = false;
  resetForm();
};

const handleCreateAdmin = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Admin Created';
  successModalMessage.value = 'The new admin has been successfully added to the system.';
  showCreateModal.value = false;
  showSuccessModal.value = true;
  resetForm();
};

const handleMenuAction = (action: string, row: any) => {
  if (action === 'edit') {
    editingAdmin.value = row;
    adminForm.value = {
      profileImage: getAdminAvatar(row.admin_name),
      adminName: row.admin_name,
      phoneNumber: '+234 809 123 4567',
      email: 'sleeknne4u1@gmail.com',
      branch: { name: 'Lagos', id: 'lagos' },
      roles: row.roles?.split(', ').map((role: string) => ({
        name: role,
        id: role.toLowerCase().replace(/\s+/g, '-')
      })) || []
    };
    showEditModal.value = true;
  } else if (action === 'delete') {
    editingAdmin.value = row;
    deleteMessage.value = `You are about to delete this admin '${row.admin_name}'.`;
    showDeleteModal.value = true;
  } else if (action === 'reset-password') {
    editingAdmin.value = row;
    resetPasswordMessage.value = `You are about to reset password for this admin "${row.admin_name}". This will invalidate their current password, and they will be required to create a new one.`;
    showResetPasswordModal.value = true;
  }
};

const handleCloseEditModal = () => {
  showEditModal.value = false;
  editingAdmin.value = null;
  resetForm();
};

const handleUpdateAdmin = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Admin Updated';
  successModalMessage.value = `The details for "${adminForm.value.adminName}" have been successfully updated.`;
  showEditModal.value = false;
  showSuccessModal.value = true;
  resetForm();
};

const handleDeleteAdmin = () => {
  if (editingAdmin.value) {
    deleteMessage.value = `You are about to delete this admin '${editingAdmin.value.admin_name}'.`;
    showDeleteModal.value = true;
  }
};

const confirmDeleteAdmin = () => {
  // TODO: Implement API call
  if (editingAdmin.value) {
    const index = admins.value.findIndex(a => a.id === editingAdmin.value.id);
    if (index !== -1) {
      admins.value.splice(index, 1);
    }
    successModalTitle.value = 'Admin Deleted';
    successModalMessage.value = `The admin "${editingAdmin.value.admin_name}" has been successfully deleted.`;
    showDeleteModal.value = false;
    showEditModal.value = false;
    showSuccessModal.value = true;
    editingAdmin.value = null;
    resetForm();
  }
};

const removeRole = (index: number) => {
  adminForm.value.roles.splice(index, 1);
};

const handleResetPassword = () => {
  // TODO: Implement API call
  if (editingAdmin.value) {
    successModalTitle.value = 'Password Reset';
    successModalMessage.value = `A password reset link has been sent to ${editingAdmin.value.admin_name}.`;
    showResetPasswordModal.value = false;
    showSuccessModal.value = true;
    editingAdmin.value = null;
  }
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>

