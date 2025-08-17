<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="HMO - Pharm / Remedial Store HMO Orders / New" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="rhOrderTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
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
      <Datatable
        :items="rhOrders"
        :columns="rhOrderColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="RhOrders"
        :key="childKey"
      >
        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <div class="relative">
              <button 
                @click="toggleActionMenu(col.props?.formattedRow)"
                class="text-gray-500 hover:text-gray-700"
                title="More actions"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              
              <!-- Action Dropdown Menu -->
              <div v-if="showActionMenu && selectedOrderForMenu?.order_no === col.props?.formattedRow?.order_no" 
                   class="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div class="py-1">
                  <button @click="viewOrder(selectedOrderForMenu)" class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                    </svg>
                    View Order
                  </button>
                  <button @click="changeStatus(selectedOrderForMenu)" class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.0015 6.503V9.498C8.0015 9.76322 8.10686 10.0176 8.29439 10.2051C8.48193 10.3926 8.73628 10.498 9.0015 10.498C9.26672 10.498 9.52107 10.3926 9.70861 10.2051C9.89614 10.0176 10.0015 9.76322 10.0015 9.498V5.602C10.0015 4.994 9.5085 4.5 8.9015 4.5H5.0015C4.73589 4.5 4.48115 4.60551 4.29333 4.79333C4.10551 4.98115 4 5.23589 4 5.5015C4 5.76711 4.10551 6.02185 4.29333 6.20967C4.48115 6.39748 4.73589 6.503 5.0015 6.503H8.0015Z" fill="#626F86"/>
                      <path d="M9.4295 18.518C7.3525 17.489 6.0015 15.307 6.0015 12.87C6.0015 10.604 7.1685 8.551 9.0215 7.445C9.5015 7.159 9.6675 6.523 9.3925 6.024C9.33065 5.90677 9.24564 5.80331 9.14263 5.71991C9.03961 5.63651 8.92073 5.5749 8.79319 5.5388C8.66565 5.50271 8.53211 5.49289 8.40067 5.50994C8.26922 5.527 8.14261 5.57056 8.0285 5.638C5.5585 7.111 4.0015 9.85 4.0015 12.87C4.0015 16.118 5.8035 19.028 8.5715 20.399C9.0695 20.646 9.6665 20.425 9.9035 19.906C10.1405 19.386 9.9285 18.765 9.4295 18.518Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0015 15.502V19.398C14.0015 20.006 14.4945 20.5 15.1015 20.5H19.0015C19.2671 20.5 19.5219 20.3945 19.7097 20.2067C19.8975 20.0188 20.003 19.7641 20.003 19.4985C20.003 19.2329 19.8975 18.9782 19.7097 18.7903C19.5219 18.6025 19.2671 18.497 19.0015 18.497H16.0015V15.502C16.0015 15.2368 15.8961 14.9824 15.7086 14.7949C15.5211 14.6074 15.2667 14.502 15.0015 14.502C14.7363 14.502 14.4819 14.6074 14.2944 14.7949C14.1069 14.9824 14.0015 15.2368 14.0015 15.502Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0985 5.096C13.8615 5.616 14.0735 6.236 14.5725 6.483C16.6495 7.512 18.0005 9.693 18.0005 12.13C18.0005 14.396 16.8335 16.45 14.9795 17.555C14.7471 17.6988 14.5791 17.9265 14.5102 18.1909C14.4413 18.4553 14.4768 18.7361 14.6095 18.975C14.8835 19.475 15.4945 19.648 15.9735 19.362C18.4435 17.889 20.0005 15.15 20.0005 12.13C20.0005 8.882 18.1985 5.972 15.4305 4.602C15.298 4.53537 15.1518 4.50045 15.0035 4.5C14.8113 4.50188 14.6238 4.55909 14.4633 4.66479C14.3028 4.77049 14.1761 4.9202 14.0985 5.096Z" fill="#626F86"/>
                    </svg>
                    Change Status
                  </button>
                  <button @click="activityLog(selectedOrderForMenu)" class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.505V19.5H7V5.5H12.99V7.99C12.99 8.38782 13.148 8.76936 13.4293 9.05066C13.7106 9.33196 14.0922 9.49 14.49 9.49H18.99V8.968C18.99 8.671 18.858 8.39 18.631 8.2L13.557 3.964C13.197 3.664 12.744 3.5 12.275 3.5H7C6.46957 3.5 5.96086 3.71071 5.58579 4.08579C5.21071 4.46086 5 4.96957 5 5.5V19.5C5 20.0304 5.21071 20.5391 5.58579 20.9142C5.96086 21.2893 6.46957 21.5 7 21.5H17C17.5304 21.5 18.0391 21.2893 18.4142 20.9142C18.7893 20.5391 19 20.0304 19 19.5V10.505H17Z" fill="#626F86"/>
                      <path d="M15 12.5H9C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H15C15.5523 14.5 16 14.0523 16 13.5C16 12.9477 15.5523 12.5 15 12.5Z" fill="#626F86"/>
                      <path d="M11 15.5H9C8.44772 15.5 8 15.9477 8 16.5C8 17.0523 8.44772 17.5 9 17.5H11C11.5523 17.5 12 17.0523 12 16.5C12 15.9477 11.5523 15.5 11 15.5Z" fill="#626F86"/>
                    </svg>
                    Activity Log
                  </button>
                </div>
              </div>
            </div>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- View Order Modal -->
    <SideBarModal
      :isOpen="showOrderModal"
      title="Order Details"
      @update:isOpen="closeOrderModal"
      @close="closeOrderModal"
    >
      <div v-if="selectedOrder" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Order No.</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.order_no }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">HMO Name</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.hmo_name }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Store Name</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.store_name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">State</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.state }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Order Date</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.order_date }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Delivery Type</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.delivery_type }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Cost Price</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.total_cost_price }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Selling Price</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.total_selling_price }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Warehouse</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.warehouse }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Warehouse State</label>
            <p class="text-sm text-gray-900">{{ selectedOrder.warehouse_state }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Warehouse LGA</label>
          <p class="text-sm text-gray-900">{{ selectedOrder.warehouse_lga }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <button @click="closeOrderModal" class="cancel_btn">Close</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Change Status Modal -->
    <UniversalCenteredModal
      :show="showStatusModal"
      @close="closeStatusModal"
    >
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Update Order Status</h3>
      </template>

      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="statusForm.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a status</option>
              <option value="new">New</option>
              <option value="confirmed">Confirmed</option>
              <option value="being_processed">Being Processed</option>
              <option value="awaiting_shipment">Awaiting Shipment</option>
              <option value="en_route">En Route</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="closeStatusModal" class="cancel_btn">Cancel</button>
          <button @click="updateStatus" class="create_btn">Update</button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- Activity Log Modal -->
    <UniversalCenteredModal
      :show="showActivities"
      @close="showActivities = false"
    >
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Order Activities</h3>
        <p class="text-sm text-gray-500 mt-1">REF: {{ selectedOrder?.order_no || '' }}</p>
      </template>

      <template #body>
        <div class="space-y-4">
          <Activities 
            :activities="orderActivities"
            :orderRef="selectedOrder?.order_no || ''"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end">
          <button @click="showActivities = false" class="cancel_btn">Close</button>
        </div>
      </template>
    </UniversalCenteredModal>

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
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";
import Activities from "@/views/Components/Activities.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

const activeTab = ref('New');

const rhOrderTabs = ref([
  { name: 'New', count: 25 },
  { name: 'Confirmed Orders', count: 25 }, 
  { name: 'Being Processed', count: 25 },
  { name: 'Awaiting Shipment', count: 25 },
  { name: 'En Route', count: 25 },
  { name: 'Delivered', count: 25 },
  { name: 'Cancelled', count: 25 }
]);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Action menu state
const showActionMenu = ref(false);
const selectedOrderForMenu = ref<any>(null);
const childKey = ref(0);

// Modal states
const showOrderModal = ref(false);
const showStatusModal = ref(false);
const showActivities = ref(false);
const selectedOrder = ref<any>(null);

// Form data
const statusForm = ref({
  status: ''
});

// Column definitions
const rhOrderColumns = ref<TableColumn[]>([
  { label: 'Order No.', field: 'order_no', sortable: true },
  { label: 'HMO Name', field: 'hmo_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Delivery Type', field: 'delivery_type', sortable: true },
  { label: 'Total Cost Price', field: 'total_cost_price', sortable: true },
  { label: 'Total Selling Price', field: 'total_selling_price', sortable: true },
  { label: 'Warehouse', field: 'warehouse', sortable: true },
  { label: 'Warehouse State', field: 'warehouse_state', sortable: true },
  { label: 'Warehouse LGA', field: 'warehouse_lga', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Mock RH orders data
const rhOrders = ref([
  {
    order_no: 'RHPO-1651244214',
    hmo_name: 'Oluwatosin HMO',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244215',
    hmo_name: 'Reliance Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  },
  {
    order_no: 'RHPO-1651244216',
    hmo_name: 'NEM Health',
    store_name: 'Emeka Pharmacy',
    state: 'Lagos',
    order_date: '5/21/2024',
    delivery_type: 'Pick Up',
    total_cost_price: '₦2,055,043.00',
    total_selling_price: '₦2,055,043.00',
    warehouse: 'LOS-HMO',
    warehouse_state: 'Lagos',
    warehouse_lga: 'Ikeja'
  }
]);

// Mock activities data
const orderActivities = ref([
  {
    action: 'New order assigned',
    user: 'System',
    time: 'Today 10:30am'
  },
  {
    action: 'New order status changed',
    user: 'Admin User',
    time: 'Today 11:00am'
  },
  {
    action: 'Confirmed order assigned',
    user: 'Processing Team',
    time: 'Today 12:00pm'
  },
  {
    action: 'Order being processed assigned',
    user: 'Warehouse Team',
    time: 'Today 1:00pm'
  }
]);

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
  toastMessage.value = 'Download RH Order Report Successful';
  showToast.value = true;
};

// Action menu methods
const toggleActionMenu = (order: any) => {
  if (selectedOrderForMenu.value?.order_no === order.order_no) {
    showActionMenu.value = !showActionMenu.value;
  } else {
    selectedOrderForMenu.value = order;
    showActionMenu.value = true;
  }
};

const viewOrder = (order: any) => {
  selectedOrder.value = order;
  showOrderModal.value = true;
  showActionMenu.value = false;
};

const changeStatus = (order: any) => {
  selectedOrder.value = order;
  showStatusModal.value = true;
  showActionMenu.value = false;
};

const activityLog = (order: any) => {
  selectedOrder.value = order;
  showActivities.value = true;
  showActionMenu.value = false;
};

// Modal methods
const closeOrderModal = () => {
  showOrderModal.value = false;
  selectedOrder.value = null;
};

const closeStatusModal = () => {
  showStatusModal.value = false;
  statusForm.value.status = '';
};

const updateStatus = () => {
  if (!statusForm.value.status) {
    toastMessage.value = 'Please select a status';
    showToast.value = true;
    return;
  }
  
  toastMessage.value = `Order status updated to ${statusForm.value.status}`;
  showToast.value = true;
  closeStatusModal();
  childKey.value++;
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
</style>
