<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Requested Features" class="px-6" />

    <div class="px-6 py-6">
      <!-- Requested Features Datatable -->
      <Datatable
        :items="requestedFeatures"
        :columns="columns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Requested Features"
      >
        <template #column="col">
          <!-- Status Column -->
          <span v-if="col.props?.column?.field === 'status'">
            <Pill :type="getStatusPillType((col.props?.row as any)?.status)" :text="(col.props?.row as any)?.status" />
          </span>
          <!-- Priority Column -->
          <span v-else-if="col.props?.column?.field === 'priority'">
            <div v-if="(col.props?.row as any)?.priority && (col.props?.row as any)?.priority !== '--'" class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-orange-500"></div>
              <span class="text-sm text-gray-700">{{ (col.props?.row as any)?.priority }}</span>
            </div>
            <span v-else class="text-gray-400">--</span>
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
      :sub-message="'This action cannot be undone and all associated comments and attachments will be permanently removed.'"
      confirm-text="Delete Request"
      @cancel="showDeleteModal = false"
      @confirm="confirmDeleteRequest"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import { ref, h } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumn, MenuItem } from '@/types';

const router = useRouter();

// Icon components using h() function
const ViewIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z',
    fill: '#626F86'
  })
]);

const ApproveIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z',
    fill: '#626F86'
  })
]);

const RejectIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    d: 'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z',
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
  { label: 'Request No.', field: 'request_no', sortable: true },
  { label: 'Title', field: 'title', sortable: true },
  { label: 'Department', field: 'department', sortable: true },
  { label: 'Requester', field: 'requester', sortable: true },
  { label: 'Votes', field: 'votes', sortable: true },
  { label: 'Comment', field: 'comment', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Priority', field: 'priority', sortable: true },
  { label: 'Date', field: 'date', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

const requestedFeatures = ref([
  { 
    id: 1, 
    request_no: 'RHT-24891', 
    title: 'Automated email notifications for low stock', 
    department: 'Inbound', 
    requester: 'John Osaretin', 
    votes: 8, 
    comment: 0, 
    status: 'Approved', 
    priority: 'Medium', 
    date: '5/21/2024' 
  },
  { 
    id: 2, 
    request_no: 'RHT-36402', 
    title: 'Add bulk stock update feature with CSV import for faster inventory processing', 
    department: 'Logistics', 
    requester: 'Sarah Abiodun', 
    votes: 1, 
    comment: 1, 
    status: 'Pending', 
    priority: '--', 
    date: '5/21/2024' 
  },
  { 
    id: 3, 
    request_no: 'RHT-15073', 
    title: 'Mobile scanning capability for warehouse', 
    department: 'Outbound', 
    requester: 'Damilola Jesutofunmi', 
    votes: 15, 
    comment: 0, 
    status: 'Rejected', 
    priority: '--', 
    date: '5/21/2024' 
  },
  { 
    id: 4, 
    request_no: 'RHT-36402', 
    title: 'Exactly what I wanted', 
    department: 'Emmanuel Aba', 
    requester: 'Emmanuel Aba', 
    votes: 30, 
    comment: 30, 
    status: 'Completed', 
    priority: '--', 
    date: '5/21/2024' 
  }
]);

const showSuccessModal = ref(false);
const showDeleteModal = ref(false);
const editingRequest = ref<any>(null);
const successModalTitle = ref('');
const successModalMessage = ref('');
const deleteMessage = ref('');

const actionMenuItems: MenuItem[] = [
  { 
    id: 'view',
    label: 'View request', 
    action: 'view', 
    icon: ViewIcon,
    iconClass: ''
  },
  { 
    id: 'approve',
    label: 'Approve request', 
    action: 'approve', 
    icon: ApproveIcon,
    iconClass: ''
  },
  { 
    id: 'reject',
    label: 'Reject request', 
    action: 'reject', 
    icon: RejectIcon,
    iconClass: ''
  },
  { 
    id: 'delete',
    label: 'Delete', 
    action: 'delete', 
    icon: DeleteIcon,
    iconClass: ''
  }
];

const getStatusPillType = (status: string): 'success' | 'grey' | 'danger' | 'hospital' => {
  switch (status) {
    case 'Approved':
      return 'hospital'; // Blue background
    case 'Pending':
      return 'grey'; // Grey background
    case 'Rejected':
      return 'danger'; // Red background
    case 'Completed':
      return 'success'; // Green background
    default:
      return 'grey';
  }
};

const handleMenuAction = (action: string, row: any) => {
  editingRequest.value = row;
  
  if (action === 'view') {
    router.push({ name: 'tech.requested-features.view', params: { id: row.request_no } });
  } else if (action === 'approve') {
    // TODO: Implement approve request
    console.log('Approve request:', row);
    successModalTitle.value = 'Request Approved';
    successModalMessage.value = `Request '${row.title}' has been approved.`;
    showSuccessModal.value = true;
  } else if (action === 'reject') {
    // TODO: Implement reject request
    console.log('Reject request:', row);
    successModalTitle.value = 'Request Rejected';
    successModalMessage.value = `Request '${row.title}' has been rejected.`;
    showSuccessModal.value = true;
  } else if (action === 'delete') {
    deleteMessage.value = `You are about to delete this feature request "${row.title}".`;
    showDeleteModal.value = true;
  }
};

const confirmDeleteRequest = () => {
  // TODO: Implement API call
  if (editingRequest.value) {
    console.log('Deleting request:', editingRequest.value.id);
    requestedFeatures.value = requestedFeatures.value.filter(req => req.id !== editingRequest.value.id);
    successModalTitle.value = 'Request Deleted';
    successModalMessage.value = `Request '${editingRequest.value.title}' has been successfully deleted.`;
    showDeleteModal.value = false;
    showSuccessModal.value = true;
    editingRequest.value = null;
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
