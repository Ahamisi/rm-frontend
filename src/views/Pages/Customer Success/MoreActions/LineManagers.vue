<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="More Actions / Line Managers" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <Datatable
        :items="lineManagers"
        :columns="lineManagerColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="LineManagers"
      >
        <template #column="col">
          <!-- Line Manager Column with Icon -->
          <span v-if="col.props?.column?.field === 'line_manager'">
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
              @click="viewLineManager(col.props?.formattedRow)"
              class="text-gray-500 hover:text-[#172B4D]"
              title="View Line Manager"
            >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9974 15C6.2174 15 3.33156 11.45 3.33156 10C3.33156 8.33254 6.21406 5.00004 9.99823 5.00004C13.6449 5.00004 16.6632 8.31087 16.6632 10C16.6632 11.45 13.7782 15 9.99823 15H9.9974ZM9.99823 3.33337C5.3974 3.33337 1.66406 7.36754 1.66406 10C1.66406 12.5717 5.4774 16.6667 9.9974 16.6667C14.5166 16.6667 18.3307 12.5717 18.3307 10C18.3307 7.36754 14.5974 3.33337 9.9974 3.33337" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97823 11.6534C9.05906 11.6534 8.31156 10.9059 8.31156 9.98671C8.31156 9.06754 9.05906 8.32004 9.97823 8.32004C10.8982 8.32004 11.6449 9.06754 11.6449 9.98671C11.6449 10.9059 10.8982 11.6534 9.97823 11.6534ZM9.97823 6.65337C8.1399 6.65337 6.6449 8.14837 6.6449 9.98671C6.6449 11.825 8.1399 13.32 9.97823 13.32C11.8174 13.32 13.3116 11.825 13.3116 9.98671C13.3116 8.14837 11.8174 6.65337 9.97823 6.65337Z" fill="#44546F"/>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumn } from '@/types';

const router = useRouter();

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Column definitions for Line Managers
const lineManagerColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Line Manager', field: 'line_manager', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Agent Type', field: 'agent_type', sortable: true },
  { label: 'No. of Agents', field: 'num_agents', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock Line Managers data
const lineManagers = ref([
  {
    id: 87,
    line_manager: 'Babajide Raji',
    phone: '+234 899 9999 999',
    agent_type: 'Medical Sales Representative',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 54,
    line_manager: 'Daniel Makinde',
    phone: '+234 899 9999 999',
    agent_type: 'Sales Associate',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 25,
    line_manager: 'Esther Joel',
    phone: '+234 899 9999 999',
    agent_type: 'Area Sales Manager',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 21,
    line_manager: 'Femi Babalola',
    phone: '+234 899 9999 999',
    agent_type: 'Account Manager',
    num_agents: 21,
    status: 'Disabled'
  },
  {
    id: 67,
    line_manager: 'Sarah Badmus',
    phone: '+234 899 9999 999',
    agent_type: 'Sales Associate',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 43,
    line_manager: 'Josh Michael',
    phone: '+234 899 9999 999',
    agent_type: 'Area Sales Manager',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 91,
    line_manager: 'Dave Free',
    phone: '+234 899 9999 999',
    agent_type: 'Medical Sales Representative',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 75,
    line_manager: 'System Admin',
    phone: '+234 899 9999 999',
    agent_type: 'System Admin',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 32,
    line_manager: 'Michael Raymond',
    phone: '+234 899 9999 999',
    agent_type: 'Account Manager',
    num_agents: 21,
    status: 'Enabled'
  },
  {
    id: 19,
    line_manager: 'Femi Babalola',
    phone: '+234 899 9999 999',
    agent_type: 'Sales Associate',
    num_agents: 21,
    status: 'Enabled'
  }
]);

// View Line Manager - Navigate to new page
const viewLineManager = (manager: any) => {
  const nameSlug = manager.line_manager.toLowerCase().replace(/\s+/g, '-');
  router.push({ 
    name: 'customer-success.more-actions.view-line-manager',
    params: { name: nameSlug }
  });
};

</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  padding-top: 1rem;
}
</style>
