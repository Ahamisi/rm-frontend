<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Role Management / Roles" class="px-6" />

    <div class="px-6 py-6">
      <!-- Roles Datatable -->
      <Datatable
        :items="roles"
        :columns="columns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Roles"
      >
        <template #header_actions>
          <Button type="blue-btn" :onClick="openCreateModal">
            + Create Role
          </Button>
        </template>
        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <div class="flex items-center gap-3">
              <button
                @click="handleEdit((col.props?.row as any))"
                class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Edit Role"
              >
                <EditIcon />
              </button>
              <button
                @click="handleDelete((col.props?.row as any))"
                class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                title="Delete Role"
              >
                <DeleteIcon />
              </button>
            </div>
          </span>
          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Create Role Modal -->
    <SideBarModal
      title="Create Role"
      :is-open="showCreateModal"
      @update:isOpen="showCreateModal = $event"
      @close="handleCloseCreateModal"
      width="medium"
    >
      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Role Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
            <input 
              v-model="roleForm.roleName"
              type="text" 
              placeholder="Enter a role name"
              class="w-full"
            />
          </div>

          <!-- Quick Start -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quick start:</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in quickStartCategories"
                :key="category.id"
                @click="toggleQuickStart(category)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedQuickStarts.some(s => s.id === category.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Permissions -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Permission(s)</label>
            <CustomMultiSelect
              v-model="roleForm.permissions"
              :options="permissionOptions"
              labelField="name"
              placeholder="Select permission(s)"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseCreateModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleCreateRole">Create</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Role Modal -->
    <SideBarModal
      title="Edit Role"
      :is-open="showEditModal"
      @update:isOpen="showEditModal = $event"
      @close="handleCloseEditModal"
      width="medium"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h2>Edit Role</h2>
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 16C9.33 16 4 17.34 4 20V22H20V20C20 17.34 14.67 16 12 16Z" fill="#626F86"/>
            </svg>
            <span class="font-medium text-gray-700">{{ editingRole?.role_name?.toUpperCase() }}</span>
          </div>
        </div>
      </template>

      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Role Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
            <input 
              v-model="roleForm.roleName"
              type="text" 
              placeholder="Enter a role name"
              class="w-full"
            />
          </div>

          <!-- Quick Start -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quick start:</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in quickStartCategories"
                :key="category.id"
                @click="toggleQuickStart(category)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedQuickStarts.some(s => s.id === category.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Permissions -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Permission(s)</label>
            <CustomMultiSelect
              v-model="roleForm.permissions"
              :options="permissionOptions"
              labelField="name"
              placeholder="Select permission(s)"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-between">
          <Button type="red-btn" :onClick="handleDeleteFromEdit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="currentColor"/>
            </svg>
          </Button>
          <div class="flex items-center gap-3">
            <Button type="gray-btn" :onClick="handleCloseEditModal">Cancel</Button>
            <Button type="blue-btn" :onClick="handleUpdateRole">Update</Button>
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

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :sub-message="'This action will permanently remove this role from the system. This action cannot be undone.'"
      confirm-text="Delete Role"
      @cancel="showDeleteModal = false"
      @confirm="confirmDeleteRole"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Button from "@/views/Components/ui/Button.vue";
import CustomMultiSelect from "@/views/Components/CustomMultiSelect.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import { ref, computed, h } from 'vue';
import type { TableColumn, Option } from '@/types';

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
  { label: 'Role Name', field: 'role_name', sortable: true },
  { label: 'No. of Permissions', field: 'no_of_permissions', sortable: true },
  { label: 'No. of Users', field: 'no_of_users', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

const roles = ref([
  { id: 87, role_name: 'Super Admin', no_of_permissions: 4, no_of_users: 12 },
  { id: 54, role_name: 'User', no_of_permissions: 0, no_of_users: 0 },
  { id: 25, role_name: 'Super Admin', no_of_permissions: 4, no_of_users: 12 },
  { id: 30, role_name: 'Operations', no_of_permissions: 4, no_of_users: 12 },
  { id: 51, role_name: 'Super Admin', no_of_permissions: 35, no_of_users: 12 },
  { id: 21, role_name: 'Inventory', no_of_permissions: 35, no_of_users: 12 },
  { id: 35, role_name: 'Super Admin', no_of_permissions: 4, no_of_users: 4 },
  { id: 23, role_name: 'Inbound Inventory', no_of_permissions: 4, no_of_users: 4 },
  { id: 33, role_name: 'Super Admin', no_of_permissions: 35, no_of_users: 12 },
  { id: 87, role_name: 'Report Manager', no_of_permissions: 4, no_of_users: 4 },
  { id: 88, role_name: 'Super Admin', no_of_permissions: 35, no_of_users: 12 },
  { id: 81, role_name: 'Branch Switcher', no_of_permissions: 4, no_of_users: 12 },
  { id: 80, role_name: 'Super Admin', no_of_permissions: 35, no_of_users: 12 },
  { id: 5, role_name: 'CSO', no_of_permissions: 4, no_of_users: 35 },
  { id: 55, role_name: 'Super Admin', no_of_permissions: 4, no_of_users: 12 }
]);

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showSuccessModal = ref(false);
const showDeleteModal = ref(false);
const editingRole = ref<any>(null);
const successModalTitle = ref('');
const successModalMessage = ref('');
const deleteMessage = ref('');
const selectedQuickStarts = ref<Option[]>([]);

const roleForm = ref({
  roleName: '',
  permissions: [] as Option[]
});

const quickStartCategories: Option[] = [
  { id: 1, name: 'Customer' },
  { id: 2, name: 'Role' },
  { id: 3, name: 'Order' },
  { id: 4, name: 'Product' },
  { id: 5, name: 'Agent' },
  { id: 6, name: 'Supplier' },
  { id: 7, name: 'Store' },
  { id: 8, name: 'Driver' },
  { id: 9, name: 'Loan' },
  { id: 10, name: 'Report' },
  { id: 11, name: 'Warehouse' },
  { id: 12, name: 'Log' },
  { id: 13, name: 'Deal' }
];

const permissionOptions: Option[] = [
  { id: 1, name: 'edit_subproducts' },
  { id: 2, name: 'download_orders_invoice' },
  { id: 3, name: 'download_orders_waybill' },
  { id: 4, name: 'downloading_picking_list' },
  { id: 5, name: 'view_orders' },
  { id: 6, name: 'create_orders' },
  { id: 7, name: 'edit_orders' },
  { id: 8, name: 'delete_orders' },
  { id: 9, name: 'view_products' },
  { id: 10, name: 'create_products' },
  { id: 11, name: 'edit_products' },
  { id: 12, name: 'delete_products' },
  { id: 13, name: 'view_customers' },
  { id: 14, name: 'create_customers' },
  { id: 15, name: 'edit_customers' },
  { id: 16, name: 'delete_customers' }
];

const toggleQuickStart = (category: Option) => {
  const index = selectedQuickStarts.value.findIndex(s => s.id === category.id);
  if (index > -1) {
    selectedQuickStarts.value.splice(index, 1);
  } else {
    selectedQuickStarts.value.push(category);
  }
};

const openCreateModal = () => {
  resetForm();
  showCreateModal.value = true;
};

const handleCreateRole = () => {
  // TODO: Implement API call
  console.log('Creating role:', roleForm.value);
  successModalTitle.value = 'Role Created';
  successModalMessage.value = `Role '${roleForm.value.roleName}' has been successfully created.`;
  showCreateModal.value = false;
  showSuccessModal.value = true;
  resetForm();
};

const handleCloseCreateModal = () => {
  showCreateModal.value = false;
  resetForm();
};

const handleEdit = (role: any) => {
  editingRole.value = role;
  roleForm.value.roleName = role.role_name;
  // Mock permissions - in real app, fetch from API
  roleForm.value.permissions = permissionOptions.slice(0, role.no_of_permissions);
  // Mock selected quick starts
  selectedQuickStarts.value = quickStartCategories.slice(0, 2);
  showEditModal.value = true;
};

const handleUpdateRole = () => {
  // TODO: Implement API call
  if (editingRole.value) {
    console.log('Updating role:', editingRole.value.id, roleForm.value);
    successModalTitle.value = 'Role Updated';
    successModalMessage.value = `Role '${roleForm.value.roleName}' has been successfully updated.`;
    showEditModal.value = false;
    showSuccessModal.value = true;
    editingRole.value = null;
    resetForm();
  }
};

const handleCloseEditModal = () => {
  showEditModal.value = false;
  editingRole.value = null;
  resetForm();
};

const handleDelete = (role: any) => {
  editingRole.value = role;
  deleteMessage.value = `You are about to delete this role '${role.role_name}'.`;
  showDeleteModal.value = true;
};

const handleDeleteFromEdit = () => {
  if (editingRole.value) {
    deleteMessage.value = `You are about to delete this role '${editingRole.value.role_name}'.`;
    showEditModal.value = false;
    showDeleteModal.value = true;
  }
};

const confirmDeleteRole = () => {
  // TODO: Implement API call
  if (editingRole.value) {
    console.log('Deleting role:', editingRole.value.id);
    roles.value = roles.value.filter(role => role.id !== editingRole.value.id);
    successModalTitle.value = 'Role Deleted';
    successModalMessage.value = `Role '${editingRole.value.role_name}' has been successfully deleted.`;
    showDeleteModal.value = false;
    showEditModal.value = false; // Close edit modal if open
    showSuccessModal.value = true;
    editingRole.value = null;
    resetForm();
  }
};

const resetForm = () => {
  roleForm.value = {
    roleName: '',
    permissions: []
  };
  selectedQuickStarts.value = [];
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