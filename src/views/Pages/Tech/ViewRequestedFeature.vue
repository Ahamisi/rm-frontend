<template>
  <div class="erp_dashboard_wrapper bg-white">
    <PageTitle :title="`Requested Features / #${request?.request_no || ''}`" class="px-6" />

    <div class="px-6 py-6 w-[80%] mx-auto">
      <div class="flex gap-6">
        <!-- Main Content (Left) -->
        <div class="flex-1">
          <!-- Back Button -->
          <button @click="goBack" class="flex items-center gap-2 px-3 py-2 mb-6 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z" fill="#44546F"/>
            </svg>
            Back
          </button>

          <!-- Header Section -->
          <div class="bg-[#F2F4F7] rounded-lg p-6 mb-6">
            <!-- Title -->
            <h1 class="text-2xl font-bold text-gray-900 mb-4">
              #{{ request?.request_no }} - {{ request?.title }}
            </h1>

            <!-- Submission Info -->
            <p class="text-sm text-gray-600 mb-4">
              Submitted by: {{ request?.requester }} • {{ request?.department }} Team • {{ request?.submitted_time }} • {{ request?.submitted_date }}
            </p>

            <!-- Status, Priority, and Actions -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Pill :type="getStatusPillType(request?.status)" :text="request?.status" />
                <button class="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <span class="w-2 h-2 rounded-full bg-gray-700"></span>
                  Set Priority
                </button>
              </div>

              <div class="flex items-center gap-2">
                <Button type="blue-btn" :onClick="handleApprove">Approve</Button>
                <Button type="red-btn" :onClick="handleReject">Reject</Button>
                <TableActionDropdown
                  :rowData="request"
                  :menuItems="actionMenuItems"
                  @menuAction="handleMenuAction"
                />
              </div>
            </div>
          </div>

          <!-- Request Details Section -->
          <div class=" rounded-lg p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            <div class="prose max-w-none text-gray-700">
              <p class="mb-4">{{ request?.description_paragraph1 }}</p>
              <ul class="list-disc list-inside mb-4 space-y-2">
                <li v-for="(requirement, index) in request?.requirements" :key="index">{{ requirement }}</li>
              </ul>
              <p>{{ request?.description_paragraph2 }}</p>
            </div>
          </div>

          <!-- Admin Notes Section -->
          <div class="bg-white rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h2>
            <textarea
              v-model="adminNotes"
              placeholder="Add internal notes about this request.."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="6"
            ></textarea>
          </div>
        </div>

        <!-- Comments Sidebar (Right) -->
        <div class="w-80">
          <div class=" rounded-lg p-6 sticky top-6 border border-[#D0D5DD]">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
            <div class="space-y-4">
              <div v-for="(comment, index) in comments" :key="index" class="pb-4 border-b border-gray-200 last:border-0">
                <div class="flex items-start gap-3">
                  <img :src="comment.avatar" :alt="comment.name" class="w-8 h-8 rounded-full" />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-sm font-medium text-gray-900">{{ comment.name }}</span>
                      <span class="text-xs text-gray-500">•</span>
                      <span class="text-xs text-gray-500">{{ comment.team }}</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-2">Posted: {{ comment.posted_time }} • {{ comment.posted_date }}</p>
                    <p class="text-sm text-gray-700">{{ comment.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import Button from "@/views/Components/ui/Button.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import { h } from 'vue';
import type { MenuItem } from '@/types';

const route = useRoute();
const router = useRouter();

// Mock data - in real app, fetch from API using route.params.id
const mockRequests: any[] = [
  { 
    id: 2, 
    request_no: 'RHT-24891', 
    title: 'Add bulk stock update feature with CSV import for faster inventory processing', 
    department: 'Inbound', 
    requester: 'Sarah Abiodun', 
    votes: 1, 
    comment: 1, 
    status: 'Pending', 
    priority: '--', 
    date: '5/21/2024',
    submitted_time: '2:45 PM',
    submitted_date: 'Jan 17, 2025',
    description_paragraph1: 'Currently, updating stock quantities for multiple products requires individual updates through the interface, which is time-consuming and prone to errors when processing large inbound shipments. It would be extremely helpful to have a feature that allows us to:',
    requirements: [
      'Upload a CSV file containing multiple product IDs and their corresponding new stock quantities',
      'Preview the changes before confirming the update',
      'Have a simple template we can download that matches our product database format',
      'Get a summary report after the upload showing successful updates and any errors'
    ],
    description_paragraph2: 'This would save our team significant time when processing large deliveries, especially since we often receive 50+ different products in a single shipment. Right now, updating these manually takes about 45 minutes of careful data entry, but with a bulk update feature, we could complete the same task in under 5 minutes.'
  }
];

const request = ref<any>(null);
const adminNotes = ref('');
const showSuccessModal = ref(false);
const showDeleteModal = ref(false);
const successModalTitle = ref('');
const successModalMessage = ref('');
const deleteMessage = ref('');

const comments = ref([
  {
    name: 'Emmanuel Tokina',
    team: 'Inbound',
    avatar: '/src/assets/images/avatarImage.png',
    posted_time: '3:45 PM',
    posted_date: 'Jan 17, 2025',
    text: 'Hey Sarah, great idea! What if we also included an option to automatically notify the purchasing team when certain stock levels are updated via the CSV import? This could streamline our ordering process even further.'
  }
]);

// Icon components using h() function
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

const actionMenuItems: MenuItem[] = [
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

const goBack = () => {
  router.push({ name: 'tech.requested-features' });
};

const handleApprove = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Request Approved';
  successModalMessage.value = `Request '${request.value?.title}' has been approved.`;
  showSuccessModal.value = true;
};

const handleReject = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Request Rejected';
  successModalMessage.value = `Request '${request.value?.title}' has been rejected.`;
  showSuccessModal.value = true;
};

const handleMenuAction = (action: string, row: any) => {
  if (action === 'delete') {
    deleteMessage.value = `You are about to delete this feature request "${row.title}".`;
    showDeleteModal.value = true;
  }
};

const confirmDeleteRequest = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Request Deleted';
  successModalMessage.value = `Request '${request.value?.title}' has been successfully deleted.`;
  showDeleteModal.value = false;
  showSuccessModal.value = true;
  // Navigate back after deletion
  setTimeout(() => {
    router.push({ name: 'tech.requested-features' });
  }, 1500);
};

onMounted(() => {
  // In real app, fetch request by ID from API
  const requestId = route.params.id;
  request.value = mockRequests.find(r => r.request_no === requestId) || mockRequests[0];
});
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>
