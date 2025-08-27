<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="HMO - Pharm / HMO Product Returns" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="productReturns"
        :columns="returnsColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="HmoProductReturns"
        :key="childKey"
      >
        <template #header_actions>
          <div class="flex items-center gap-3">
            <!-- Download Returns Report -->
            <button 
              @click="downloadReport"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3 8V6.56C17.3 5.66392 17.3 5.21587 17.1256 4.87362C16.9722 4.57256 16.7274 4.32779 16.4264 4.17439C16.0841 4 15.6361 4 14.74 4H10.26C9.36392 4 8.91587 4 8.57362 4.17439C8.27256 4.32779 8.02779 4.57256 7.87439 4.87362C7.7 5.21587 7.7 5.66392 7.7 6.56V8M7.7 16.8C6.95602 16.8 6.58403 16.8 6.27883 16.7182C5.45061 16.4963 4.8037 15.8494 4.58178 15.0212C4.5 14.716 4.5 14.344 4.5 13.6V11.84C4.5 10.4959 4.5 9.82381 4.76158 9.31042C4.99168 8.85883 5.35883 8.49168 5.81042 8.26158C6.32381 8 6.99587 8 8.34 8H16.66C18.0041 8 18.6762 8 19.1896 8.26158C19.6412 8.49168 20.0083 8.85883 20.2384 9.31042C20.5 9.82381 20.5 10.4959 20.5 11.84V13.6C20.5 14.344 20.5 14.716 20.4182 15.0212C20.1963 15.8494 19.5494 16.4963 18.7212 16.7182C18.416 16.8 18.044 16.8 17.3 16.8M14.9 10.8H17.3M10.26 20H14.74C15.6361 20 16.0841 20 16.4264 19.8256C16.7274 19.6722 16.9722 19.4274 17.1256 19.1264C17.3 18.7841 17.3 18.3361 17.3 17.44V16.16C17.3 15.2639 17.3 14.8159 17.1256 14.4736C16.9722 14.1726 16.7274 13.9278 16.4264 13.7744C16.0841 13.6 15.6361 13.6 14.74 13.6H10.26C9.36392 13.6 8.91587 13.6 8.57362 13.7744C8.27256 13.9278 8.02779 14.1726 7.87439 14.4736C7.7 14.8159 7.7 15.2639 7.7 16.16V17.44C7.7 18.3361 7.7 18.7841 7.87439 19.1264C8.02779 19.4274 8.27256 19.6722 8.57362 19.8256C8.91587 20 9.36392 20 10.26 20Z" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Download Returns Report
            </button>

            <!-- Create HMO Product Return -->
            <button 
              @click="openCreateModal"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
              </svg>

              Create HMO Product Return
            </button>
          </div>
        </template>

        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <button 
              @click="viewReturn(col.props?.formattedRow)"
              class="p-1 hover:bg-gray-50 rounded"
              title="View"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3 8V6.56C17.3 5.66392 17.3 5.21587 17.1256 4.87362C16.9722 4.57256 16.7274 4.32779 16.4264 4.17439C16.0841 4 15.6361 4 14.74 4H10.26C9.36392 4 8.91587 4 8.57362 4.17439C8.27256 4.32779 8.02779 4.57256 7.87439 4.87362C7.7 5.21587 7.7 5.66392 7.7 6.56V8M7.7 16.8C6.95602 16.8 6.58403 16.8 6.27883 16.7182C5.45061 16.4963 4.8037 15.8494 4.58178 15.0212C4.5 14.716 4.5 14.344 4.5 13.6V11.84C4.5 10.4959 4.5 9.82381 4.76158 9.31042C4.99168 8.85883 5.35883 8.49168 5.81042 8.26158C6.32381 8 6.99587 8 8.34 8H16.66C18.0041 8 18.6762 8 19.1896 8.26158C19.6412 8.49168 20.0083 8.85883 20.2384 9.31042C20.5 9.82381 20.5 10.4959 20.5 11.84V13.6C20.5 14.344 20.5 14.716 20.4182 15.0212C20.1963 15.8494 19.5494 16.4963 18.7212 16.7182C18.416 16.8 18.044 16.8 17.3 16.8M14.9 10.8H17.3M10.26 20H14.74C15.6361 20 16.0841 20 16.4264 19.8256C16.7274 19.6722 16.9722 19.4274 17.1256 19.1264C17.3 18.7841 17.3 18.3361 17.3 17.44V16.16C17.3 15.2639 17.3 14.8159 17.1256 14.4736C16.9722 14.1726 16.7274 13.9278 16.4264 13.7744C16.0841 13.6 15.6361 13.6 14.74 13.6H10.26C9.36392 13.6 8.91587 13.6 8.57362 13.7744C8.27256 13.9278 8.02779 14.1726 7.87439 14.4736C7.7 14.8159 7.7 15.2639 7.7 16.16V17.44C7.7 18.3361 7.7 18.7841 7.87439 19.1264C8.02779 19.4274 8.27256 19.6722 8.57362 19.8256C8.91587 20 9.36392 20 10.26 20Z" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </span>

          <!-- Admin Column with Avatar -->
          <span v-else-if="col.props?.column?.field === 'admin'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#666"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#666"/>
                </svg>
              </div>
              <span class="text-sm">{{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}</span>
            </div>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Create Modal -->
    <SideBarModal
      :isOpen="showCreateModal"
      title="Create a New HMO Product Return"
      @update:isOpen="closeCreateModal"
      @close="closeCreateModal"
      width="70%"
    >
      <div class="space-y-6">
        <!-- Customer and Order Number Row -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <SelectField
              v-model="form.customer"
              :options="customerOptions"
              labelField="name"
              valueField="id"
              placeholder="Type to search for a customer"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
            <SelectField
              v-model="form.orderNumber"
              :options="orderOptions"
              labelField="name"
              valueField="id"
              placeholder="Type or paste to search for order number"
            />
          </div>
        </div>

        <!-- Reason for Return -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Return</label>
          <SelectField
            v-model="form.reason"
            :options="reasonOptions"
            labelField="name"
            valueField="id"
            placeholder="Select a reason for your return"
          />
        </div>

        <!-- Products Table -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-gray-700">Products</h3>
          <Datatable
            :items="availableProducts"
            :columns="availableProductsColumns"
            :searchable="false"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :showActions="false"
          >
            <template #column="{ props }">
              <div v-if="props.column.field === 'select'">
                <input 
                  type="checkbox" 
                  v-model="props.row.selected" 
                  class="rounded"
                  @change="updateSelectedProducts"
                >
              </div>
              <!-- <div v-else-if="props.column.field === 'returnQuantity'">
                <input 
                  type="number" 
                  v-model="props.row.returnQuantity"
                  :max="props.row.supplied"
                  min="0"
                  class="w-20 px-3 py-2 border-2 rounded-lg text-sm text-[#44546F] focus:outline-none focus:border-blue-600 text-center"
                  style="border-color: #091E4224;"
                  :disabled="!props.row.selected"
                >
              </div> -->
              <span v-else>
                {{ props.row[props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="closeCreateModal" class="cancel_btn">Cancel</button>
          <button @click="showConfirmation" class="create_btn">Create Product Return</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0606 4.96699C11.5766 3.99299 12.4186 3.98899 12.9366 4.96699L20.0606 18.425C20.5766 19.399 20.1056 20.196 19.0036 20.196H4.99361C3.89161 20.196 3.41861 19.403 3.93661 18.425L11.0606 4.96699ZM11.2915 14.7071C11.479 14.8946 11.7334 15 11.9986 15C12.2638 15 12.5182 14.8946 12.7057 14.7071C12.8933 14.5196 12.9986 14.2652 12.9986 14V8.99998C12.9986 8.73477 12.8933 8.48041 12.7057 8.29288C12.5182 8.10534 12.2638 7.99998 11.9986 7.99998C11.7334 7.99998 11.479 8.10534 11.2915 8.29288C11.104 8.48041 10.9986 8.73477 10.9986 8.99998V14C10.9986 14.2652 11.104 14.5196 11.2915 14.7071ZM11.2915 17.7071C11.479 17.8946 11.7334 18 11.9986 18C12.2638 18 12.5182 17.8946 12.7057 17.7071C12.8933 17.5196 12.9986 17.2652 12.9986 17C12.9986 16.7348 12.8933 16.4804 12.7057 16.2929C12.5182 16.1053 12.2638 16 11.9986 16C11.7334 16 11.479 16.1053 11.2915 16.2929C11.104 16.4804 10.9986 16.7348 10.9986 17C10.9986 17.2652 11.104 17.5196 11.2915 17.7071Z" fill="#E56910"/>
            </svg>

            <h3 class="text-lg font-medium text-gray-900">Create HMO Product Return?</h3>
          </div>
          <button @click="cancelConfirmation" class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="mb-6">
          <p class="text-sm text-gray-600">
            You're about to create an HMO product return for 
            <strong>"{{ selectedOrderNumber }}"</strong>. Once confirmed, this action can't be undone, and the returned quantity will go back into inventory.
          </p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3">
          <button @click="cancelConfirmation" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button @click="createReturn" class="px-4 py-2 text-sm font-medium text-[#172B4D] bg-yellow-500 rounded-md hover:bg-yellow-600">
            Create Product Return
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
        <!-- Success Icon -->
        <div class="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#22A06B"/>
<path d="M18.7867 28.5635C18.4707 28.2275 18.0349 28.0298 17.5739 28.0134C17.113 27.997 16.6642 28.1632 16.3252 28.476C15.9861 28.7887 15.7843 29.2226 15.7635 29.6834C15.7427 30.1442 15.9047 30.5945 16.2142 30.9365L22.5352 37.7947C23.4749 38.7152 24.8749 38.7152 25.7447 37.8472L26.3817 37.219C28.6821 34.9566 30.9798 32.6915 33.2749 30.4237L33.3449 30.3537C35.4899 28.2399 37.6237 26.1147 39.7464 23.9785C40.0637 23.6463 40.2376 23.2028 40.2307 22.7435C40.2238 22.2842 40.0366 21.8461 39.7096 21.5236C39.3825 21.2011 38.9417 21.0202 38.4824 21.0198C38.0231 21.0194 37.582 21.1996 37.2544 21.5215C35.1416 23.6466 33.0182 25.7612 30.8844 27.8652L30.8144 27.9352C28.6151 30.1093 26.413 32.2804 24.2082 34.4487L18.7867 28.5635Z" fill="white"/>
</svg>

        </div>

        <!-- Title -->
        <h3 class="text-lg font-medium text-gray-900 mb-2">HMO Product Return Created</h3>

        <!-- Message -->
        <p class="text-sm text-gray-600 mb-6">
          The HMO product return <strong>"{{ selectedOrderNumber }}"</strong> has been successfully added to the system.
        </p>

        <!-- Done Button -->
        <button @click="closeSuccessModal" class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Done
        </button>
      </div>
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
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import { ref, computed } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

// Modal states
const showCreateModal = ref(false);
const showConfirmModal = ref(false);
const showSuccessModal = ref(false);

interface FormOption {
  id: number;
  name: string;
}

// Form data
const form = ref<{
  customer: FormOption | null;
  orderNumber: FormOption | null;
  reason: FormOption | null;
}>({
  customer: null,
  orderNumber: null,
  reason: null
});

// Column definitions
const returnsColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Product Name', field: 'product_name', sortable: true },
  { label: 'Reason', field: 'reason', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Admin', field: 'admin', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Available products table columns
const availableProductsColumns = ref<TableColumn[]>([
  { label: '', field: 'select', sortable: false },
  { label: 'Product Name', field: 'name', sortable: false },
  { label: 'Batch No.', field: 'batch', sortable: false },
  { label: 'Quantity Supplied', field: 'supplied', sortable: false },
  { label: 'Quantity to Return', field: 'returnQuantity', sortable: false }
]);

// Mock options
const customerOptions = ref([
  { id: 1, name: 'Emeka Kalu' },
  { id: 2, name: 'Emmanuel Aba' },
  { id: 3, name: 'Nyerhowo Omuvwie' }
]);

const orderOptions = ref([
  { id: 1, name: '87' },
  { id: 2, name: '1656493689-254' },
  { id: 3, name: '25' },
  { id: 4, name: '30' }
]);

const reasonOptions = ref([
  { id: 1, name: 'Customer Error' },
  { id: 2, name: 'Product Defect' },
  { id: 3, name: 'Wrong Product' },
  { id: 4, name: 'Expired Product' }
]);

// Available products for return
const availableProducts = ref([
  {
    id: 1,
    name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch: 'LW377 | 01/08/2024',
    supplied: 189,
    returnQuantity: 0,
    selected: false
  },
  {
    id: 2,
    name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch: 'LW377 | 01/08/2024',
    supplied: 1189,
    returnQuantity: 0,
    selected: false
  },
  {
    id: 3,
    name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch: 'LW377 | 01/08/2024',
    supplied: 11,
    returnQuantity: 0,
    selected: false
  }
]);

// Mock returns data
const productReturns = ref([
  {
    id: 87,
    order_no: '87',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025',
    admin: 'Dave Free'
  },
  {
    id: 54,
    order_no: '1656493689-254',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025',
    admin: 'Michael Raymond'
  },
  {
    id: 25,
    order_no: '25',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  },
  {
    id: 30,
    order_no: '30',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: N813.0...',
    reason: 'Customer Error',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  },
  {
    id: 51,
    order_no: '51',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  }
]);

// Computed
const selectedOrderNumber = computed(() => {
  return form.value.orderNumber?.name || '';
});

// Methods
const openCreateModal = () => {
  resetForm();
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    customer: null,
    orderNumber: null,
    reason: null
  };
  availableProducts.value.forEach(product => {
    product.selected = false;
    product.returnQuantity = 0;
  });
};



const updateSelectedProducts = () => {
  // Update logic if needed
};

const showConfirmation = () => {
  if (!form.value.customer || !form.value.orderNumber || !form.value.reason) {
    toastMessage.value = 'Please fill in all required fields';
    showToast.value = true;
    return;
  }
  
  const selectedProducts = availableProducts.value.filter(p => p.selected);
  if (selectedProducts.length === 0) {
    toastMessage.value = 'Please select at least one product to return';
    showToast.value = true;
    return;
  }
  
  showCreateModal.value = false;
  showConfirmModal.value = true;
};

const cancelConfirmation = () => {
  showConfirmModal.value = false;
  showCreateModal.value = true;
};

const createReturn = () => {
  // Create new return
  const newReturn = {
    id: Math.max(...productReturns.value.map(r => r.id)) + 1,
    order_no: form.value.orderNumber?.name || '',
    customer_name: form.value.customer?.name || '',
    store_name: form.value.customer?.name + ' Pharmacy',
    product_name: availableProducts.value.find(p => p.selected)?.name || '',
    reason: form.value.reason?.name || '',
    total_amount: 'N47,400.00',
    date_created: new Date().toLocaleDateString('en-GB'),
    admin: 'Current User'
  };
  
  productReturns.value.unshift(newReturn);
  
  showConfirmModal.value = false;
  showSuccessModal.value = true;
  childKey.value++;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  resetForm();
};

const downloadReport = () => {
  toastMessage.value = 'Returns Report Downloaded Successfully';
  showToast.value = true;
};

const viewReturn = (returnItem: any) => {
  console.log('View return:', returnItem);
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

/* Input Field Styling */
input[type="text"],
input[type="number"] {
  height: 38px;
  font-size: 14px;
  color: #44546F;
}

input[type="text"]::placeholder,
input[type="number"]::placeholder {
  color: rgba(98, 111, 134, 0.7);
}

/* Checkbox Styling */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 2px solid #091E4224;
  border-radius: 4px;
}
</style>
