<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="All Orders / New" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="mainTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Download Buttons in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <button 
            @click="downloadTimeTrackerReport"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Time Tracker Report
          </button>
          <button 
            @click="downloadReport"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Report
          </button>
        </div>
      </Tabs>
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <div class="" v-if="activeTab === 'New'">
        <NewOrders @view-order="viewOrder" />
      </div>
      <div class="" v-else-if="activeTab === 'Confirmed Orders'">
        <ConfirmedOrders @view-order="viewOrder" />
      </div>
      <div class="" v-else-if="activeTab === 'Being Processed'">
        <BeingProcessed @view-order="viewOrder" />
      </div>
      <div class="" v-else-if="activeTab === 'Picked & Packed'">
        <PickedPacked @view-order="viewOrder" />
      </div>
    </div>

    <!-- Order Details Modal -->
    <SideBarModal
      v-if="isOrderDetailsModalOpen"
      :isOpen="isOrderDetailsModalOpen"
      :title="modalTitle"
      width="xl"
      @close="isOrderDetailsModalOpen = false"
    >
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          v-for="tab in modalTabs"
          :key="tab.id"
          @click="modalActiveTab = tab.id"
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            modalActiveTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Details Tab -->
        <div v-if="modalActiveTab === 'details'" class="space-y-6">
          <!-- Order Information Grid -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="key">Customer's Name</span>
              <span class="value">{{ selectedOrder?.customer_name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Customer Type</span>
              <span class="value">{{ selectedOrder?.customer_type || 'Pharmacy' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Order By</span>
              <span class="value">{{ selectedOrder?.customer_name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Agent Name</span>
              <span class="value">{{ selectedOrder?.assigned }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Phone</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ selectedOrder?.phone || '+234 809 123 4567' }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Store</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ selectedOrder?.store_name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Loan Limit</span>
              <span class="value">₦2,000,000.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Amount to Reach Loan Limit</span>
              <span class="value">₦0.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Outstanding Loan</span>
              <span class="value">₦0.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Date</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ formatDate(selectedOrder?.order_date) }}</span>
              </div>
            </div>
          </div>

          <hr>

          <!-- Order Summary -->
          <div class="mt-8">
            <h3 class="mb-4 text-lg font-medium text-[#44546F]">Order Summary</h3>

            <!-- Products Table -->
            <Datatable
              :items="orderItems"
              :columns="orderProductColumns"
              :searchable="false"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :showActions="false"
              :showPagination="false"
              class="order-summary-table"
            >
              <template #column="{ props }">
                <div v-if="props.column.field === 'tags'">
                  <Pill 
                    v-if="props.row.tags"
                    :type="getPillType(props.row.tags)"
                    :text="props.row.tags"
                  />
                </div>
                <span v-else>
                  {{ props.row[props.column.field] }}
                </span>
              </template>
            </Datatable>

            <!-- Totals -->
            <div class="totals-section">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Total Cost Price</span>
                  <span class="text-sm text-[#44546F]">₦187,000.00</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Total Selling Price</span>
                  <span class="text-sm text-[#44546F]">₦187,000.00</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-[#172B4D]">Shipping Fee</span>
                  <span class="text-sm text-[#44546F]">₦0.00</span>
                </div>
                <div class="flex justify-between items-center border-t pt-4" style="border-color: #091E4224;">
                  <span class="text-lg font-semibold text-[#44546F]">Total</span>
                  <span class="text-lg font-semibold text-[#44546F]">₦187,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Tab -->
        <div v-else-if="modalActiveTab === 'activities'" class="space-y-4">
          <Activities :activities="orderActivities" :order-ref="selectedOrder?.order_no || ''" />
        </div>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end">
          <button @click="isOrderDetailsModalOpen = false" class="px-6 py-2 text-white font-medium bg-[#0C66E4] rounded-[6px]">Close</button>
        </div>
      </template>
    </SideBarModal>

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
import Tabs from "@/views/Components/Tabs.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Activities from "@/views/Components/Activities.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import { ref, computed } from 'vue';
import NewOrders from './components/NewOrders.vue';
import ConfirmedOrders from './components/ConfirmedOrders.vue';
import BeingProcessed from './components/BeingProcessedOrders.vue';
import PickedPacked from './components/PickedPackedOrders.vue';

const activeTab = ref('New');

const mainTabs = ref([
  { name: 'New', count: 25 },
  { name: 'Confirmed Orders', count: 25 }, 
  { name: 'Being Processed', count: 25 },
  { name: 'Picked & Packed', count: 25 }
]);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  // Handle tab change logic here
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
};

// Download functions
const downloadTimeTrackerReport = () => {
  toastMessage.value = 'Download Time Tracker Report Successful';
  showToast.value = true;
};

const downloadReport = () => {
  toastMessage.value = 'Download Order Report Successful';
  showToast.value = true;
};

// Order Details Modal
const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

const modalTabs = ref([
  { id: 'details', label: 'Details' },
  { id: 'activities', label: 'Activities' }
]);

// Modal title with order reference
const modalTitle = computed(() => {
  return selectedOrder.value?.order_no ? `Order Details REF: ${selectedOrder.value.order_no}` : 'Order Details';
});

// Order products table columns
const orderProductColumns = ref([
  { label: 'Product Name', field: 'product_name', sortable: false },
  { label: 'Tags', field: 'tags', sortable: false },
  { label: 'Quantity Delivered', field: 'quantity', sortable: false },
  { label: 'Unit Price', field: 'unit_price', sortable: false },
  { label: 'Price Total', field: 'total_price', sortable: false }
]);

// Mock order items
const orderItems = ref([
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity: 20,
    unit_price: 47400.00,
    total_price: 47400.00
  },
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity: 10,
    unit_price: 47400.00,
    total_price: 47400.00
  }
]);

// Mock order activities
const orderActivities = ref([
  {
    action: 'New order assigned',
    user: 'Oreva Emamoro',
    time: 'Yesterday 10:45pm'
  },
  {
    action: 'New order status changed',
    user: 'Oreva Emamoro',
    time: 'Today 10:45pm'
  },
  {
    action: 'Confirmed order assigned',
    user: 'Oreva Emamoro',
    time: 'Today 12:45pm'
  }
]);

// Helper functions
const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getPillType = (tag: string) => {
  switch (tag) {
    case 'Cash and Carry':
      return 'cash-and-carry';
    case 'Controlled':
      return 'controlled';
    case 'Hospital':
      return 'hospital';
    default:
      return 'hospital';
  }
};

// View order handler
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};
</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.bg-gray-light {
  background-color: #091E420F;
}

.key {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.value {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
}

.order-summary-table {
  font-size: 12px;
  color: #172B4D;
}

.order-summary-table table {
  font-size: 12px;
}

.order-summary-table th,
.order-summary-table td {
  font-size: 12px !important;
  color: #172B4D !important;
}

.order-summary-table .bg-gray-100 {
  background-color: #f8f9fa !important;
}

.totals-section {
  background-color: #F7F8F9;
  border-top: 1px solid #091E4224;
  border-bottom: 1px solid #091E4224;
  margin: 0 -24px;
  padding: 16px 24px;
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style> 