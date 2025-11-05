<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="3rd Party Integrations" class="px-6" />

    <div class="px-6 py-6">
      <!-- Search and Filter Section -->
      

      <!-- Integrations Datatable -->
      <Datatable
        :items="integrations"
        :columns="columns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        :sortable="true"
        pageName="Integrations"
      >
        <template #column="col">
          <span v-if="col.props?.column?.field === 'status'">
            <Pill
              :text="(col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || ''"
              :type="(col.props?.formattedRow as any)?.[col.props?.column?.field || ''] === 'Connected' ? 'success' : 'danger'"
            />
          </span>
          <span v-else-if="col.props?.column?.field === 'action'">
            <div class="flex items-center gap-2">
              <!-- Connect Icon (only for disconnected services) -->
              <button
                v-if="(col.props?.formattedRow as any)?.['status'] !== 'Connected'"
                @click="openConnectModal(col.props?.formattedRow)"
                class="text-gray-500 hover:text-[#172B4D]"
                title="Connect Integration"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_13399_282129)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.721 14.43C13.5394 14.2486 13.2935 14.1464 13.0368 14.1456C12.7802 14.1449 12.5336 14.2457 12.351 14.426L10.263 16.485C10.0834 16.6655 9.86994 16.8085 9.6348 16.906C9.39966 17.0035 9.14754 17.0535 8.893 17.053C8.305 17.053 7.758 16.793 7.368 16.315C6.734 15.538 6.863 14.382 7.571 13.672L8.892 12.35L8.894 12.351L9.582 11.665C9.76452 11.4824 9.86705 11.2347 9.86705 10.9765C9.86705 10.7183 9.76452 10.4707 9.582 10.288L9.58 10.285C9.48973 10.1947 9.38256 10.1231 9.26459 10.0742C9.14663 10.0253 9.02019 10.0001 8.8925 10.0001C8.76481 10.0001 8.63837 10.0253 8.5204 10.0742C8.40244 10.1231 8.29526 10.1947 8.205 10.285L6.137 12.355C5.40928 13.0846 5.00061 14.0731 5.00061 15.1035C5.00061 16.134 5.40928 17.1224 6.137 17.852L6.146 17.862C6.50612 18.2233 6.93412 18.5099 7.40538 18.7052C7.87664 18.9005 8.38187 19.0007 8.892 19C9.40219 19.0006 9.90746 18.9002 10.3787 18.7047C10.85 18.5092 11.278 18.2225 11.638 17.861L13.721 15.776C13.8093 15.6877 13.8794 15.5829 13.9272 15.4675C13.975 15.3521 13.9996 15.2284 13.9996 15.1035C13.9996 14.9786 13.975 14.855 13.9272 14.7396C13.8794 14.6242 13.8093 14.5193 13.721 14.431V14.43ZM10.279 9.57003C10.4606 9.75144 10.7065 9.85367 10.9632 9.85442C11.2198 9.85517 11.4664 9.75438 11.649 9.57403L13.737 7.51603C14.103 7.14903 14.59 6.94603 15.107 6.94603C15.695 6.94603 16.242 7.20603 16.632 7.68503C17.266 8.46203 17.137 9.61803 16.429 10.328L15.108 11.65L15.106 11.649L14.418 12.335C14.2355 12.5177 14.1329 12.7653 14.1329 13.0235C14.1329 13.2817 14.2355 13.5294 14.418 13.712L14.42 13.715C14.8 14.095 15.415 14.095 15.795 13.715L17.863 11.645C18.5907 10.9154 18.9994 9.92701 18.9994 8.89653C18.9994 7.86605 18.5907 6.87763 17.863 6.14803L17.854 6.13803C17.4939 5.77672 17.0659 5.49018 16.5946 5.29487C16.1234 5.09957 15.6181 4.99937 15.108 5.00003C14.5978 4.9995 14.0925 5.09986 13.6213 5.29534C13.15 5.49081 12.722 5.77754 12.362 6.13903L10.279 8.22403C10.1907 8.31234 10.1206 8.41718 10.0728 8.53257C10.025 8.64796 10.0004 8.77163 10.0004 8.89653C10.0004 9.02143 10.025 9.1451 10.0728 9.26049C10.1206 9.37588 10.1907 9.48072 10.279 9.56903V9.57003ZM8.924 4.61803L9.325 5.58603C9.37523 5.70737 9.40107 5.83742 9.40104 5.96875C9.40101 6.10007 9.37511 6.23011 9.32483 6.35143C9.27455 6.47275 9.20086 6.58298 9.10798 6.67582C9.0151 6.76866 8.90484 6.8423 8.7835 6.89253C8.66216 6.94276 8.53211 6.9686 8.40078 6.96857C8.26945 6.96854 8.13942 6.94265 8.0181 6.89236C7.89678 6.84208 7.78655 6.7684 7.69371 6.67551C7.60087 6.58263 7.52723 6.47237 7.477 6.35103L7.077 5.38303C7.02677 5.26169 7.00093 5.13164 7.00096 5.00031C7.00098 4.86899 7.02688 4.73895 7.07716 4.61763C7.17871 4.37262 7.37344 4.17797 7.6185 4.07653C7.86356 3.97508 8.13888 3.97514 8.3839 4.07669C8.62891 4.17825 8.82355 4.37297 8.925 4.61803H8.924ZM5.383 7.07603L6.351 7.47703C6.58592 7.58537 6.76977 7.78045 6.86401 8.02137C6.95825 8.26229 6.95556 8.53034 6.8565 8.76932C6.75744 9.0083 6.56971 9.19965 6.33267 9.30325C6.09562 9.40685 5.82767 9.41465 5.585 9.32503L4.617 8.92503C4.38208 8.81669 4.19823 8.62161 4.10399 8.38069C4.00974 8.13977 4.01244 7.87172 4.11149 7.63274C4.21055 7.39376 4.39828 7.20241 4.63533 7.09881C4.87237 6.99521 5.14032 6.9874 5.383 7.07703V7.07603ZM15.315 17.49C15.0702 17.592 14.8758 17.7867 14.7743 18.0317C14.6727 18.2766 14.6722 18.5518 14.773 18.797L15.175 19.765C15.2252 19.8864 15.2989 19.9966 15.3917 20.0895C15.4846 20.1824 15.5948 20.2561 15.7161 20.3064C15.8374 20.3566 15.9675 20.3825 16.0988 20.3826C16.2301 20.3826 16.3602 20.3568 16.4815 20.3065C16.6028 20.2563 16.7131 20.1827 16.806 20.0898C16.8989 19.997 16.9725 19.8867 17.0228 19.7654C17.0731 19.6441 17.099 19.5141 17.099 19.3827C17.0991 19.2514 17.0732 19.1214 17.023 19L16.622 18.033C16.5718 17.9116 16.4982 17.8012 16.4053 17.7082C16.3125 17.6153 16.2022 17.5415 16.0808 17.4911C15.9594 17.4408 15.8293 17.4149 15.6979 17.4149C15.5665 17.4149 15.4364 17.4407 15.315 17.491V17.49ZM17.491 15.316C17.3896 15.5608 17.3895 15.8359 17.4908 16.0808C17.592 16.3256 17.7863 16.5203 18.031 16.622L19 17.023C19.2427 17.1127 19.5106 17.1048 19.7477 17.0012C19.9847 16.8976 20.1724 16.7063 20.2715 16.4673C20.3706 16.2283 20.3732 15.9603 20.279 15.7194C20.1848 15.4784 20.0009 15.2834 19.766 15.175L18.797 14.775C18.5519 14.6738 18.2767 14.674 18.0318 14.7756C17.7869 14.8772 17.5923 15.072 17.491 15.317V15.316Z" fill="#44546F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_13399_282129">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <!-- Disconnect Icon (only for connected services) -->
              <button
                v-if="(col.props?.formattedRow as any)?.['status'] === 'Connected'"
                @click="openDisconnectModal(col.props?.formattedRow)"
                class="text-gray-500 hover:text-[#172B4D]"
                title="Disconnect Integration"
              >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.21738 11.9309L7.90878 12.5754L7.88535 12.5999L8.59335 13.3069L10.693 15.4075L11.4 16.1145L12.107 15.4075L14.1227 13.3909L12.0807 15.5051L11.398 16.2122L12.7857 17.5999L10.6695 19.7161L10.6471 19.7415C10.37 20.0579 9.74477 20.1302 9.30722 19.6926L6.80038 17.1858H6.79941L6.10703 16.4934L4.30722 14.6926L4.28378 14.6692L4.25839 14.6477L4.20175 14.592C3.93449 14.2935 3.89692 13.7172 4.30722 13.3069L6.42343 11.1897L7.21738 11.9309ZM14.3072 3.20728C14.7447 2.76978 15.37 2.8421 15.6471 3.15845L15.6695 3.18384L20.693 8.20728C21.1303 8.64472 21.058 9.27001 20.7418 9.54712L20.7164 9.56958L18.6002 11.6858L12.2144 5.30005L14.3072 3.20728Z" stroke="#44546F" stroke-width="2"/>
            </svg>

              </button>
              <!-- Delete Icon (for all services) -->
              <button
                @click="openDeleteModal(col.props?.formattedRow)"
                class="text-gray-500 hover:text-red-600"
                title="Delete Integration"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#44546F"/>
                </svg>
              </button>
            </div>
          </span>
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Connect Confirmation Modal -->
    <WarningConfirmationModal
      :show="showConnectModal"
      title="Connect Integration?"
      :message="connectMessage"
      confirm-text="Connect Integration"
      confirm-button-type="yellow-btn"
      @close="showConnectModal = false"
      @confirm="handleConnect"
    />

    <!-- Disconnect Confirmation Modal -->
    <WarningConfirmationModal
      :show="showDisconnectModal"
      title="Disconnect Integration?"
      :message="disconnectMessage"
      confirm-text="Disconnect Integration"
      confirm-button-type="yellow-btn"
      @close="showDisconnectModal = false"
      @confirm="handleDisconnect"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :sub-message="'This action will permanently remove it from the system. This action cannot be undone.'"
      confirm-text="Delete Integration"
      @cancel="showDeleteModal = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import { ref, computed } from 'vue';
import type { TableColumn } from '@/types';

const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Service Name', field: 'service_name', sortable: true },
  { label: 'Status', field: 'status', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
];

const integrations = ref([
  { id: 87, service_name: 'Zoho', status: 'Connected', action: '' },
  { id: 54, service_name: 'Open AI', status: 'Connected', action: '' },
  { id: 25, service_name: 'DeepSeek R1', status: 'Connected', action: '' },
  { id: 21, service_name: 'Open AI', status: 'Disconnected', action: '' },
  { id: 30, service_name: 'Zoho', status: 'Connected', action: '' },
  { id: 51, service_name: 'DeepSeek R1', status: 'Connected', action: '' },
]);

const showConnectModal = ref(false);
const showDisconnectModal = ref(false);
const showDeleteModal = ref(false);
const selectedIntegration = ref<any>(null);

const disconnectMessage = computed(() => {
  if (!selectedIntegration.value) return '';
  return `You are about to disconnect this integration "${selectedIntegration.value.service_name}"? This action will interrupt all activities relying on this integration. Are you sure you want to proceed?`;
});

const connectMessage = computed(() => {
  if (!selectedIntegration.value) return '';
  return `You are about to connect this integration "${selectedIntegration.value.service_name}"? This will enable seamless data exchange and enhance workflow. Do you want to proceed?`;
});

const deleteMessage = computed(() => {
  if (!selectedIntegration.value) return '';
  return `You are about to delete this integration '${selectedIntegration.value.service_name}'.`;
});

const openConnectModal = (integration: any) => {
  selectedIntegration.value = integration;
  showConnectModal.value = true;
};

const connectIntegration = (integration: any) => {
  console.log('Connect integration:', integration);
  // TODO: Implement connect logic
};

const openDisconnectModal = (integration: any) => {
  selectedIntegration.value = integration;
  showDisconnectModal.value = true;
};

const openDeleteModal = (integration: any) => {
  selectedIntegration.value = integration;
  showDeleteModal.value = true;
};

const handleConnect = () => {
  if (selectedIntegration.value) {
    // Update status to connected
    const index = integrations.value.findIndex(i => i.id === selectedIntegration.value.id);
    if (index !== -1) {
      integrations.value[index].status = 'Connected';
    }
    showConnectModal.value = false;
    selectedIntegration.value = null;
    // TODO: Show success toast
  }
};

const handleDisconnect = () => {
  if (selectedIntegration.value) {
    // Update status to disconnected
    const index = integrations.value.findIndex(i => i.id === selectedIntegration.value.id);
    if (index !== -1) {
      integrations.value[index].status = 'Disconnected';
    }
    showDisconnectModal.value = false;
    selectedIntegration.value = null;
    // TODO: Show success toast
  }
};

const handleDelete = () => {
  if (selectedIntegration.value) {
    // Remove integration
    const index = integrations.value.findIndex(i => i.id === selectedIntegration.value.id);
    if (index !== -1) {
      integrations.value.splice(index, 1);
    }
    showDeleteModal.value = false;
    selectedIntegration.value = null;
    // TODO: Show success toast
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

