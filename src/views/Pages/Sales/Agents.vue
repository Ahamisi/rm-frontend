<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Agents" class="px-6" />
    
    <!-- contents -->
    <div class="px-6 py-6">
      <Datatable
        :items="agents"
        :columns="agentColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Agents"
      >
        <template #header_actions>
          <div class="flex items-center gap-3">
            <!-- Assign Dropdown -->
            <div class="relative">
              <Button class="gray-btn" @click="toggleAssignDropdown">
                <div class="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#44546F"/>
                    <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#44546F"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#44546F"/>
                    <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#44546F"/>
                  </svg>
                  <span>Assign</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </Button>
              <!-- Assign Dropdown Menu -->
              <teleport to="body">
                <div v-if="showAssignDropdown" 
                     class="fixed bg-white border border-gray-200 rounded shadow-lg min-w-48 z-50"
                     :style="assignDropdownStyle"
                     @click.stop>
                  <ul class="text-sm text-gray-700 divide-y divide-gray-200">
                    <li @click="assignAgentsToLineManager(); closeAssignDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#44546F"/>
                        <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#44546F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#44546F"/>
                        <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#44546F"/>
                      </svg>
                      Assign Agents to Line Manager
                    </li>
                    <li @click="assignAgentsToCustomer(); closeAssignDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#44546F"/>
                        <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#44546F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#44546F"/>
                        <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#44546F"/>
                      </svg>
                      Assign Agents to Customer
                    </li>
                  </ul>
                </div>
              </teleport>
            </div>
            <!-- Create Agent Button -->
            <Button type="blue-btn" @click="createAgent">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
                </svg>
                <span>Create Agent</span>
              </div>
            </Button>
          </div>
        </template>
        <template #column="col">
          <!-- Agent Column with Icon -->
          <span v-if="col.props?.column?.field === 'agent'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.agent || '' }}</span>
            </div>
          </span>

          <!-- Line Manager Column with Icon -->
          <span v-else-if="col.props?.column?.field === 'line_manager'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.line_manager || '' }}</span>
            </div>
          </span>

          <!-- Status Column -->
          <span v-else-if="col.props?.column?.field === 'status'">
            <Pill 
              :text="(col.props?.formattedRow as any)?.status || ''" 
              :type="(col.props?.formattedRow as any)?.status === 'Enabled' ? 'success' : 'danger'"
            />
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View Agent -->
                <li @click="viewAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                  </svg>
                  View Agent
                </li>
                
                <!-- Edit Agent -->
                <li @click="editAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                  </svg>
                  Edit Agent
                </li>
                
                <!-- Disable Agent -->
                <li @click="disableAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#E56910" fill-opacity="0.2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="#E56910" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#E56910" stroke-width="2"/>
                  </svg>
                  Disable Agent
                </li>
                
                <!-- Transfer Customers -->
                <li @click="transferCustomers(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 13L22 8L17 3" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 8H2C1.46957 8 0.960859 8.21071 0.585786 8.58579C0.210714 8.96086 0 9.46957 0 10V15C0 15.5304 0.210714 16.0391 0.585786 16.4142C0.960859 16.7893 1.46957 17 2 17H13" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Transfer Customers
                </li>
                
                <!-- Reset Password -->
                <li @click="resetPassword(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17V12M12 12V7M12 12H17M12 12H7" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Reset Password
                </li>
                
                <!-- Delete -->
                <li @click="deleteAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#626F86"/>
                  </svg>
                  Delete
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

    <!-- Assign Agents to Line Manager Modal -->
    <SideBarModal
      :isOpen="showAssignToLineManagerModal"
      width="small"
      @close="handleCloseAssignToLineManager"
    >
      <template #header>
        <SideBarHead title="Assign Agents to Line Manager" />
      </template>

      <template #default="{ closeModal }">
        <div class="px-6 py-4 space-y-6">
          <!-- Manager Type -->
          <div>
            <label>Manager Type</label>
            <SelectField
              v-model="assignToLineManagerForm.managerType"
              :options="managerTypeOptions"
              placeholder="Select a manager type"
            />
          </div>

          <!-- Manager -->
          <div>
            <label>Manager</label>
            <SelectField
              v-model="assignToLineManagerForm.manager"
              :options="filteredManagers"
              placeholder="Select a manager"
            />
          </div>

          <!-- Agent(s) -->
          <div>
            <label>Agent(s)</label>
            <CustomMultiSelect
              v-model="assignToLineManagerForm.agents"
              :options="agentOptions"
              placeholder="Select agent(s)"
              label-field="name"
            />
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" @click="handleCancelAssignToLineManager(closeModal)">Cancel</Button>
          <Button type="blue-btn" @click="handleAssignToLineManager(closeModal)">Assign</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Assign Agents to Customer Modal -->
    <SideBarModal
      :isOpen="showAssignToCustomerModal"
      width="small"
      @close="handleCloseAssignToCustomer"
    >
      <template #header>
        <SideBarHead title="Assign Agents to Customer" />
      </template>

      <template #default="{ closeModal }">
        <div class="px-6 py-4 space-y-6">
          <!-- Agent(s) -->
          <div>
            <label>Agent(s)</label>
            <CustomMultiSelect
              v-model="assignToCustomerForm.agents"
              :options="agentOptions"
              placeholder="Select agent(s)"
              label-field="name"
            />
          </div>

          <!-- Customer(s) -->
          <div>
            <label>Customer(s)</label>
            <CustomMultiSelect
              v-model="assignToCustomerForm.customers"
              :options="customerOptions"
              placeholder="Select customer(s)"
              label-field="name"
            />
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" @click="handleCancelAssignToCustomer(closeModal)">Cancel</Button>
          <Button type="blue-btn" @click="handleAssignToCustomer(closeModal)">Assign</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :isVisible="showWarningModal"
      @confirm="handleWarningConfirm"
      @cancel="showWarningModal = false"
    />

    <!-- Success Toast -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import Button from "@/views/Components/ui/Button.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SideBarHead from "@/views/Components/ui/SideBarHead.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import CustomMultiSelect from "@/views/Components/CustomMultiSelect.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { TableColumn, Option } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Assign dropdown state
const showAssignDropdown = ref(false);
const assignDropdownStyle = ref({ top: '0px', left: '0px' });

// Column definitions for Agents
const agentColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Agent', field: 'agent', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'Agent Type', field: 'agent_type', sortable: true },
  { label: 'Line Manager', field: 'line_manager', sortable: true },
  { label: 'No. of Orders', field: 'num_orders', sortable: true },
  { label: 'No. of Customers', field: 'num_customers', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for Agents
const agents = ref([
  { id: 87, agent: 'Babajide Raji', phone: '+234 899 9999 999', agent_type: 'Medical Sales Representative', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 54, agent: 'Daniel Makinde', phone: '+234 899 9999 999', agent_type: 'Sales Associate', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 25, agent: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Medical Sales Representative', line_manager: 'Olamide Lawal', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 30, agent: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Sales Associate', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 51, agent: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', line_manager: 'Ajenifuja Timi', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 21, agent: 'Femi Babalola', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', line_manager: 'Ukeme Ekpo', num_orders: 21, num_customers: 21, status: 'Disabled' },
  { id: 35, agent: 'Femi Babalola', phone: '+234 899 9999 999', agent_type: 'Sales Associate', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 23, agent: 'Sarah Badmus', phone: '+234 899 9999 999', agent_type: 'Medical Sales Representative', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 33, agent: 'Sarah Badmus', phone: '+234 899 9999 999', agent_type: 'Sales Associate', line_manager: 'Olamide Lawal', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 87, agent: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', line_manager: 'Ajenifuja Timi', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 88, agent: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Sales Associate', line_manager: 'Esther Joel', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 81, agent: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Account Manager', line_manager: 'Olamide Lawal', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 80, agent: 'System Admin', phone: '+234 899 9999 999', agent_type: 'System Admin', line_manager: '-', num_orders: 21, num_customers: 21, status: 'Enabled' }
]);

// Modal States
const showAssignToLineManagerModal = ref(false);
const showAssignToCustomerModal = ref(false);
const showWarningModal = ref(false);
const warningCallback = ref<(() => void) | null>(null);

// Assign to Line Manager Form
const assignToLineManagerForm = ref({
  managerType: null as Option | null,
  manager: null as Option | null,
  agents: [] as Option[]
});

// Assign to Customer Form
const assignToCustomerForm = ref({
  agents: [] as Option[],
  customers: [] as Option[]
});

// Track initial form state for change detection
const initialAssignToLineManagerForm = ref({
  managerType: null as Option | null,
  manager: null as Option | null,
  agents: [] as Option[]
});

const initialAssignToCustomerForm = ref({
  agents: [] as Option[],
  customers: [] as Option[]
});

// Options for dropdowns
const managerTypeOptions: Option[] = [
  { id: 1, name: 'National Manager' },
  { id: 2, name: 'Area Sales Manager' },
  { id: 3, name: 'Account Manager' },
  { id: 4, name: 'Sales Canvasser' }
];

const managerOptions: Option[] = [
  { id: 1, name: 'Ukeme Ekpo', type: 'National Manager' },
  { id: 2, name: 'Ajenifuja Timi', type: 'Area Sales Manager' },
  { id: 3, name: 'Olamide Lawal', type: 'Account Manager' },
  { id: 4, name: 'Esther Joel', type: 'Sales Canvasser' }
];

const filteredManagers = computed(() => {
  if (!assignToLineManagerForm.value.managerType) {
    return managerOptions;
  }
  return managerOptions.filter(
    m => m.type === assignToLineManagerForm.value.managerType?.name
  );
});

const agentOptions: Option[] = agents.value.map(agent => ({
  id: agent.id,
  name: agent.agent
}));

const customerOptions: Option[] = [
  { id: 1, name: 'Emeka Pharmacy' },
  { id: 2, name: 'Emma Bros Pharmacy' },
  { id: 3, name: 'ASON MEDICAL CENTER' },
  { id: 4, name: 'MEDICEYO PHARMACY' },
  { id: 5, name: 'Bid pearlz Rx' },
  { id: 6, name: 'Dona, bonitas pharmacy' }
];

// Check if form has unsaved changes
const hasUnsavedChanges = (form: any, initialForm: any): boolean => {
  if (form.managerType?.id !== initialForm.managerType?.id) return true;
  if (form.manager?.id !== initialForm.manager?.id) return true;
  if (form.agents?.length !== initialForm.agents?.length) return true;
  if (form.customers?.length !== initialForm.customers?.length) return true;
  
  // Deep check for agents array
  if (form.agents && initialForm.agents) {
    const formAgentIds = form.agents.map((a: Option) => a.id).sort();
    const initialAgentIds = initialForm.agents.map((a: Option) => a.id).sort();
    if (JSON.stringify(formAgentIds) !== JSON.stringify(initialAgentIds)) return true;
  }
  
  // Deep check for customers array
  if (form.customers && initialForm.customers) {
    const formCustomerIds = form.customers.map((c: Option) => c.id).sort();
    const initialCustomerIds = initialForm.customers.map((c: Option) => c.id).sort();
    if (JSON.stringify(formCustomerIds) !== JSON.stringify(initialCustomerIds)) return true;
  }
  
  return false;
};

// Assign Dropdown Functions
const toggleAssignDropdown = (event: Event) => {
  const target = event.target as HTMLElement;
  const button = target.closest('button') || target;
  const rect = button.getBoundingClientRect();
  
  assignDropdownStyle.value = {
    top: `${rect.bottom + window.scrollY + 5}px`,
    left: `${rect.left + window.scrollX}px`
  };
  
  showAssignDropdown.value = !showAssignDropdown.value;
};

const closeAssignDropdown = () => {
  showAssignDropdown.value = false;
};

// Handle click outside dropdown
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative') && showAssignDropdown.value) {
    closeAssignDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Assign Agents to Line Manager
const assignAgentsToLineManager = () => {
  // Reset form
  assignToLineManagerForm.value = {
    managerType: null,
    manager: null,
    agents: []
  };
  initialAssignToLineManagerForm.value = {
    managerType: null,
    manager: null,
    agents: []
  };
  showAssignToLineManagerModal.value = true;
};

// Handle Close Assign to Line Manager
const handleCloseAssignToLineManager = () => {
  if (hasUnsavedChanges(assignToLineManagerForm.value, initialAssignToLineManagerForm.value)) {
    warningCallback.value = () => {
      showAssignToLineManagerModal.value = false;
      assignToLineManagerForm.value = {
        managerType: null,
        manager: null,
        agents: []
      };
      initialAssignToLineManagerForm.value = {
        managerType: null,
        manager: null,
        agents: []
      };
    };
    showWarningModal.value = true;
  } else {
    showAssignToLineManagerModal.value = false;
    assignToLineManagerForm.value = {
      managerType: null,
      manager: null,
      agents: []
    };
    initialAssignToLineManagerForm.value = {
      managerType: null,
      manager: null,
      agents: []
    };
  }
};

// Handle Cancel Assign to Line Manager
const handleCancelAssignToLineManager = (closeModal: () => void) => {
  if (hasUnsavedChanges(assignToLineManagerForm.value, initialAssignToLineManagerForm.value)) {
    warningCallback.value = () => {
      closeModal();
      assignToLineManagerForm.value = {
        managerType: null,
        manager: null,
        agents: []
      };
      initialAssignToLineManagerForm.value = {
        managerType: null,
        manager: null,
        agents: []
      };
    };
    showWarningModal.value = true;
  } else {
    closeModal();
    assignToLineManagerForm.value = {
      managerType: null,
      manager: null,
      agents: []
    };
    initialAssignToLineManagerForm.value = {
      managerType: null,
      manager: null,
      agents: []
    };
  }
};

// Handle Assign to Line Manager
const handleAssignToLineManager = (closeModal: () => void) => {
  console.log('Assigning agents to line manager:', assignToLineManagerForm.value);
  // TODO: Implement API call
  toastMessage.value = 'Agents assigned to Line Manager successfully';
  showToast.value = true;
  closeModal();
  assignToLineManagerForm.value = {
    managerType: null,
    manager: null,
    agents: []
  };
  initialAssignToLineManagerForm.value = {
    managerType: null,
    manager: null,
    agents: []
  };
};

// Assign Agents to Customer
const assignAgentsToCustomer = () => {
  // Reset form
  assignToCustomerForm.value = {
    agents: [],
    customers: []
  };
  initialAssignToCustomerForm.value = {
    agents: [],
    customers: []
  };
  showAssignToCustomerModal.value = true;
};

// Handle Close Assign to Customer
const handleCloseAssignToCustomer = () => {
  if (hasUnsavedChanges(assignToCustomerForm.value, initialAssignToCustomerForm.value)) {
    warningCallback.value = () => {
      showAssignToCustomerModal.value = false;
      assignToCustomerForm.value = {
        agents: [],
        customers: []
      };
      initialAssignToCustomerForm.value = {
        agents: [],
        customers: []
      };
    };
    showWarningModal.value = true;
  } else {
    showAssignToCustomerModal.value = false;
    assignToCustomerForm.value = {
      agents: [],
      customers: []
    };
    initialAssignToCustomerForm.value = {
      agents: [],
      customers: []
    };
  }
};

// Handle Cancel Assign to Customer
const handleCancelAssignToCustomer = (closeModal: () => void) => {
  if (hasUnsavedChanges(assignToCustomerForm.value, initialAssignToCustomerForm.value)) {
    warningCallback.value = () => {
      closeModal();
      assignToCustomerForm.value = {
        agents: [],
        customers: []
      };
      initialAssignToCustomerForm.value = {
        agents: [],
        customers: []
      };
    };
    showWarningModal.value = true;
  } else {
    closeModal();
    assignToCustomerForm.value = {
      agents: [],
      customers: []
    };
    initialAssignToCustomerForm.value = {
      agents: [],
      customers: []
    };
  }
};

// Handle Assign to Customer
const handleAssignToCustomer = (closeModal: () => void) => {
  console.log('Assigning agents to customer:', assignToCustomerForm.value);
  // TODO: Implement API call
  toastMessage.value = 'Agents assigned to Customer successfully';
  showToast.value = true;
  closeModal();
  assignToCustomerForm.value = {
    agents: [],
    customers: []
  };
  initialAssignToCustomerForm.value = {
    agents: [],
    customers: []
  };
};

// Handle Warning Confirm
const handleWarningConfirm = () => {
  if (warningCallback.value) {
    warningCallback.value();
    warningCallback.value = null;
  }
  showWarningModal.value = false;
};

// Agent Actions
const viewAgent = (agent: any) => {
  console.log('View agent:', agent);
  // TODO: Navigate to agent detail page or open modal
};

const editAgent = (agent: any) => {
  console.log('Edit agent:', agent);
  // TODO: Open edit modal
};

const disableAgent = (agent: any) => {
  console.log('Disable agent:', agent);
  // TODO: Show confirmation modal
};

const transferCustomers = (agent: any) => {
  console.log('Transfer customers:', agent);
  // TODO: Open transfer customers modal
};

const resetPassword = (agent: any) => {
  console.log('Reset password:', agent);
  // TODO: Show confirmation modal
};

const deleteAgent = (agent: any) => {
  console.log('Delete agent:', agent);
  // TODO: Show confirmation modal
};

const createAgent = () => {
  console.log('Create agent');
  // TODO: Open create agent modal
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

