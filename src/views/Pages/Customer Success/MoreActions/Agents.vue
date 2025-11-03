<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="More Actions / Agents" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
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
            <Button class="gray-btn" @click="assignAgentsToLineManager">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#44546F"/>
                <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#44546F"/>
                <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#44546F"/>
                </svg>
                <span>Assign Agents to Line Manager</span>
              </div>
            </Button>
            <Button class="gray-btn" @click="assignAgentsToCustomer">
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6C20 5.44772 19.5523 5 19 5C18.4477 5 18 5.44772 18 6V10C18 10.5523 18.4477 11 19 11C19.5523 11 20 10.5523 20 10V6Z" fill="#44546F"/>
                <path d="M21 7H17C16.4477 7 16 7.44772 16 8C16 8.55228 16.4477 9 17 9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#44546F"/>
                <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#44546F"/>
                </svg>
                <span>Assign Agents to Customer</span>
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
            <button 
              @click="viewAgent(col.props?.formattedRow)"
              class="text-gray-500 hover:text-[#172B4D]"
              title="View Agent"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14L14 10L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 10H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
import { ref, computed } from 'vue';
import type { TableColumn, Option } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

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

// View Agent
const viewAgent = (agent: any) => {
  console.log('View agent:', agent);
  // TODO: Navigate to agent detail page or open modal
};

</script>

