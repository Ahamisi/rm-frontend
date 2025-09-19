<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Compliance / Quarantined Products" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="quarantinedProducts"
        :columns="quarantinedProductColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="ComplianceQuarantinedProducts"
        :key="childKey"
      >
        <template #header_actions>
          <Button 
            type="blue-btn"
            :onClick="openCreateModal"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
            Create Quarantine Product
          </Button>
        </template>

        <template #column="col">
          <!-- Reported By Column with Avatar -->
          <span v-if="col.props?.column?.field === 'reported_by'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                   :style="{ backgroundColor: getAvatarColor(col.props?.formattedRow?.reported_by), color: 'white' }">
                {{ getInitials(col.props?.formattedRow?.reported_by) }}
              </div>
              <span>{{ col.props?.formattedRow?.reported_by }}</span>
            </div>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props?.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- Edit -->
                <li @click="editProduct(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                  </svg>
                  Edit
                </li>
                
                <!-- Return to Stock -->
                <li @click="returnToStock(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.793 6.29304C11.7001 6.38583 11.6263 6.49603 11.576 6.61735C11.5257 6.73866 11.4998 6.86871 11.4998 7.00004C11.4998 7.13138 11.5257 7.26142 11.576 7.38274C11.6263 7.50405 11.7001 7.61425 11.793 7.70704L15.586 11.5H6C5.73478 11.5 5.48043 11.6054 5.29289 11.7929C5.10536 11.9805 5 12.2348 5 12.5C5 12.7653 5.10536 13.0196 5.29289 13.2071C5.48043 13.3947 5.73478 13.5 6 13.5H15.586L11.793 17.293C11.7001 17.3858 11.6263 17.496 11.576 17.6173C11.5257 17.7387 11.4998 17.8687 11.4998 18C11.4998 18.1314 11.5257 18.2614 11.576 18.3827C11.6263 18.504 11.7001 18.6143 11.793 18.707C12.183 19.097 12.817 19.097 13.208 18.707L18.707 13.207C18.8881 13.0266 18.993 12.7836 19 12.528V12.471C18.9928 12.2158 18.888 11.9731 18.707 11.793L13.208 6.29304C13.1151 6.20007 13.0048 6.12631 12.8834 6.07598C12.762 6.02566 12.6319 5.99976 12.5005 5.99976C12.3691 5.99976 12.239 6.02566 12.1176 6.07598C11.9962 6.12631 11.8859 6.20007 11.793 6.29304Z" fill="#626F86"/>
                  </svg>
                  Return to Stock
                </li>
                
                <!-- Return to Damaged Products -->
                <li @click="returnToDamaged(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.793 6.29304C11.7001 6.38583 11.6263 6.49603 11.576 6.61735C11.5257 6.73866 11.4998 6.86871 11.4998 7.00004C11.4998 7.13138 11.5257 7.26142 11.576 7.38274C11.6263 7.50405 11.7001 7.61425 11.793 7.70704L15.586 11.5H6C5.73478 11.5 5.48043 11.6054 5.29289 11.7929C5.10536 11.9805 5 12.2348 5 12.5C5 12.7653 5.10536 13.0196 5.29289 13.2071C5.48043 13.3947 5.73478 13.5 6 13.5H15.586L11.793 17.293C11.7001 17.3858 11.6263 17.496 11.576 17.6173C11.5257 17.7387 11.4998 17.8687 11.4998 18C11.4998 18.1314 11.5257 18.2614 11.576 18.3827C11.6263 18.504 11.7001 18.6143 11.793 18.707C12.183 19.097 12.817 19.097 13.208 18.707L18.707 13.207C18.8881 13.0266 18.993 12.7836 19 12.528V12.471C18.9928 12.2158 18.888 11.9731 18.707 11.793L13.208 6.29304C13.1151 6.20007 13.0048 6.12631 12.8834 6.07598C12.762 6.02566 12.6319 5.99976 12.5005 5.99976C12.3691 5.99976 12.239 6.02566 12.1176 6.07598C11.9962 6.12631 11.8859 6.20007 11.793 6.29304Z" fill="#626F86"/>
                  </svg>
                  Move to Damaged Products
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

    <!-- Create/Edit Modal -->
    <SideBarModal
      :isOpen="showCreateModal || showEditModal"
      :title="showEditModal ? 'Edit Quarantine Product' : 'Create Quarantine Product'"
      @update:isOpen="handleSideBarUpdate"
      @close="handleSideBarClose"
      width="45vw"
    >
      <div class="space-y-4 px-6 mt-4">
        <!-- Product Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product</label>
          <SelectField
            v-model="form.product"
            :options="productOptions"
            labelField="name"
            valueField="id"
            placeholder="Select a product"
          />
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

        <!-- Batch Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Batch</label>
          <SelectField
            v-model="form.batch"
            :options="batchOptions"
            labelField="name"
            valueField="id"
            placeholder="Select a batch"
          />
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            v-model="form.quantity"
            placeholder="0"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
            style="border-color: #091E4224; color: #172B4D !important;"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <!-- Delete button (only in edit mode) -->
          <!-- <button 
            v-if="showEditModal"
            @click="confirmDelete"
            class="flex items-center justify-center w-10 h-10 bg-[#C9372C] rounded-md hover:bg-[#A92E24] transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
            </svg>
          </button>
          <div v-else></div> -->

          <!-- Cancel and Save/Update buttons -->
          <div class="flex space-x-3">
            <Button type="gray-btn" :onClick="() => showDiscardModal = true">Cancel</Button>
            <Button type="blue-btn" :onClick="saveProduct">
              {{ showEditModal ? 'Update' : 'Create' }}
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :confirmText="'Delete Product'"
      @confirm="executeDelete"
      @cancel="cancelDelete"
    />

    <!-- Return to Stock Confirmation Modal -->
    <WarningConfirmationModal
      :show="showReturnToStockModal"
      title="Return to Stock?"
      :message="`You are about to return '${selectedProduct?.product_name}' to stock. This action will move the product from quarantine back to available inventory.`"
      confirmText="Return to Stock"
      @close="showReturnToStockModal = false"
      @confirm="executeReturnToStock"
    />

    <!-- Move to Damaged Products Modal -->
    <SideBarModal
      :isOpen="showMoveToDamagedModal"
      title="Move to Damaged Products"
      @update:isOpen="handleSideBarUpdate"
      @close="handleSideBarClose"
      width="45vw"
    >
      <div class="space-y-4 px-6 mt-4">
        <!-- Date Damaged -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Damaged</label>
          <DateInput
            v-model="moveToDamagedForm.date_damaged"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <!-- Cause of Damage -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cause of Damage</label>
          <input
            type="text"
            v-model="moveToDamagedForm.damage_cause"
            placeholder="Enter a specific cause of damage"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
            style="border-color: #091E4224; color: #172B4D !important;"
          />
        </div>

        <!-- Comment -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            v-model="moveToDamagedForm.comment"
            placeholder="Add additional details or notes about the damage"
            rows="3"
            class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
            style="border-color: #091E4224; color: #172B4D !important;"
          ></textarea>
        </div>

        <!-- Returnable Checkbox -->
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="moveToDamagedForm.returnable"
            id="returnable"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label for="returnable" class="text-sm font-medium text-gray-700">Is the product returnable?</label>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" :onClick="() => showMoveToDamagedModal = false">Cancel</Button>
          <Button type="blue-btn" :onClick="executeMoveToDamaged">Move</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Discard Changes Modal -->
    <WarningConfirmationModal
      :show="showDiscardModal"
      title="Discard Changes?"
      :processName="modalProcessName"
      confirm-text="Discard Changes"
      @close="showDiscardModal = false"
      @confirm="handleDiscardConfirm"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="successTitle"
      :message="successMessage"
      @close="closeSuccessModal"
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
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import DateInput from "@/views/Components/ui/DateInput.vue";
import Button from "@/views/Components/ui/Button.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { ref, computed } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

// Modal states
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showReturnToStockModal = ref(false);
const showReturnToDamagedModal = ref(false);
const showMoveToDamagedModal = ref(false);
const showSuccessModal = ref(false);
const showDiscardModal = ref(false);
const isDiscarding = ref(false);
const selectedProduct = ref<any>(null);

// Success modal content
const successTitle = ref('');
const successMessage = ref('');

// Computed properties
const deleteMessage = computed(() => {
  return selectedProduct.value 
    ? `You are about to delete this quarantined product '${selectedProduct.value.product_name}'.`
    : 'You are about to delete this quarantined product.';
});

const modalProcessName = computed(() => {
  return showEditModal.value ? 'Edit Quarantine Product' : 'Create Quarantine Product';
});

// Form data
interface FormData {
  product: { id: number; name: string } | null;
  reason: { id: number; name: string } | null;
  batch: { id: number; name: string } | null;
  quantity: string;
}

const form = ref<FormData>({
  product: null,
  reason: null,
  batch: null,
  quantity: ''
});

// Move to Damaged Products form data
interface MoveToDamagedFormData {
  date_damaged: string;
  damage_cause: string;
  comment: string;
  returnable: boolean;
}

const moveToDamagedForm = ref<MoveToDamagedFormData>({
  date_damaged: '',
  damage_cause: '',
  comment: '',
  returnable: false
});

// Column definitions
const quarantinedProductColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Product Name', field: 'product_name', sortable: true },
  { label: 'Batch No.', field: 'batch_no', sortable: true },
  { label: 'Quantity', field: 'quantity', sortable: true },
  { label: 'Reason', field: 'reason', sortable: true },
  { label: 'Reported By', field: 'reported_by', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Mock product options
const productOptions = ref([
  { id: 1, name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 100' },
  { id: 2, name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1 X 100' },
  { id: 3, name: 'KESSINGTON KESARTEM TABLET 80/480X6' },
  { id: 4, name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML' },
  { id: 5, name: 'ABONIKI BALM 25G' },
  { id: 6, name: 'ACCU CHEK ACTIVE GLUCOMETER' },
  { id: 7, name: 'ACCU CHEK TEST STRIP X 50' },
  { id: 8, name: 'MEDIKLIN ACCU-CHEK 200 LANCET' },
  { id: 9, name: 'ACEPOL (PARACETAMOL) SUSPENSION 60ML' },
  { id: 10, name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10' }
]);

// Mock reason options
const reasonOptions = ref([
  { id: 1, name: 'Customer Error' },
  { id: 2, name: 'Quality Issue' },
  { id: 3, name: 'Expired Product' },
  { id: 4, name: 'Damaged Packaging' },
  { id: 5, name: 'Wrong Product' }
]);

// Mock batch options
const batchOptions = ref([
  { id: 1, name: '211115' },
  { id: 2, name: '211116' },
  { id: 3, name: '211117' },
  { id: 4, name: '211118' }
]);

// Mock quarantined products data - matching the image examples
const quarantinedProducts = ref([
  {
    id: 87,
    product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 100',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Babajide Raji'
  },
  {
    id: 54,
    product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1 X 100',
    batch_no: '211115',
    quantity: 2,
    reason: 'Customer Error',
    reported_by: 'Daniel Makinde'
  },
  {
    id: 25,
    product_name: 'KESSINGTON KESARTEM TABLET 80/480X6',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Esther Joel'
  },
  {
    id: 30,
    product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Esther Joel'
  },
  {
    id: 51,
    product_name: 'ABONIKI BALM 25G',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Esther Joel'
  },
  {
    id: 21,
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Femi Babalola'
  },
  {
    id: 35,
    product_name: 'ACCU CHEK TEST STRIP X 50',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Femi Babalola'
  },
  {
    id: 23,
    product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Sarah Badmus'
  },
  {
    id: 33,
    product_name: 'ACEPOL (PARACETAMOL) SUSPENSION 60ML',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Sarah Badmus'
  },
  {
    id: 87,
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Josh Michael'
  },
  {
    id: 88,
    product_name: 'ABONIKI BALM 25G',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Josh Michael'
  },
  {
    id: 81,
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Josh Michael'
  },
  {
    id: 80,
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Femi Babalola'
  },
  {
    id: 5,
    product_name: 'ABONIKI BALM 25G',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'System Admin'
  },
  {
    id: 55,
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    batch_no: '211115',
    quantity: 17,
    reason: 'Customer Error',
    reported_by: 'Femi Babalola'
  }
]);

// Helper functions for avatars
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
  const index = name.length % colors.length;
  return colors[index];
};

// Modal functions
const openCreateModal = () => {
  resetForm();
  showCreateModal.value = true;
};

const editProduct = (product: any) => {
  selectedProduct.value = product;
  // Pre-fill form with product data
  form.value = {
    product: productOptions.value.find(p => p.name === product.product_name) || null,
    reason: reasonOptions.value.find(r => r.name === product.reason) || null,
    batch: batchOptions.value.find(b => b.name === product.batch_no) || null,
    quantity: product.quantity.toString()
  };
  showEditModal.value = true;
};

const deleteProduct = (product: any) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};

const returnToStock = (product: any) => {
  selectedProduct.value = product;
  showReturnToStockModal.value = true;
};

const returnToDamaged = (product: any) => {
  selectedProduct.value = product;
  resetMoveToDamagedForm();
  showMoveToDamagedModal.value = true;
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  selectedProduct.value = null;
  resetForm();
};

const resetForm = () => {
  form.value = {
    product: null,
    reason: null,
    batch: null,
    quantity: ''
  };
};

const resetMoveToDamagedForm = () => {
  moveToDamagedForm.value = {
    date_damaged: '',
    damage_cause: '',
    comment: '',
    returnable: false
  };
};

const saveProduct = () => {
  if (showEditModal.value) {
    // Update existing product
    const index = quarantinedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
    if (index !== -1) {
      quarantinedProducts.value[index] = {
        ...quarantinedProducts.value[index],
        product_name: form.value.product?.name || '',
        reason: form.value.reason?.name || '',
        batch_no: form.value.batch?.name || '',
        quantity: parseInt(form.value.quantity)
      };
    }
    toastMessage.value = 'Quarantine Product Updated Successfully';
  } else {
    // Create new product
    const newProduct = {
      id: Math.max(...quarantinedProducts.value.map(p => p.id)) + 1,
      product_name: form.value.product?.name || '',
      reason: form.value.reason?.name || '',
      batch_no: form.value.batch?.name || '',
      quantity: parseInt(form.value.quantity),
      reported_by: 'Current User' // This would come from auth context
    };
    quarantinedProducts.value.unshift(newProduct);
    toastMessage.value = 'Quarantine Product Created Successfully';
  }
  
  showToast.value = true;
  closeModal();
  childKey.value++;
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  selectedProduct.value = null;
};

const executeDelete = () => {
  const index = quarantinedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
  if (index !== -1) {
    quarantinedProducts.value.splice(index, 1);
  }
  
  toastMessage.value = 'Quarantine Product Deleted Successfully';
  showToast.value = true;
  showDeleteModal.value = false;
  selectedProduct.value = null;
  childKey.value++;
  closeModal();
};

const executeReturnToStock = () => {
  const index = quarantinedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
  if (index !== -1) {
    quarantinedProducts.value.splice(index, 1);
  }
  
  // Show success modal
  successTitle.value = 'Quarantine Product Returned to Stock';
  successMessage.value = `The quarantined product "${selectedProduct.value.product_name}" has been successfully returned to stock.`;
  showReturnToStockModal.value = false;
  showSuccessModal.value = true;
  selectedProduct.value = null;
  childKey.value++;
};

const executeMoveToDamaged = () => {
  const index = quarantinedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
  if (index !== -1) {
    quarantinedProducts.value.splice(index, 1);
  }
  
  // Show success modal
  successTitle.value = 'Product Moved to Damaged Products';
  successMessage.value = `The quarantined product "${selectedProduct.value.product_name}" has been successfully moved to damaged products.`;
  showMoveToDamagedModal.value = false;
  showSuccessModal.value = true;
  selectedProduct.value = null;
  childKey.value++;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  successTitle.value = '';
  successMessage.value = '';
};

// Handle discard confirm - close both modals
const handleDiscardConfirm = () => {
  isDiscarding.value = true;
  showDiscardModal.value = false;
  closeModal();
  setTimeout(() => {
    isDiscarding.value = false;
  }, 500);
};

// Handle sidebar close - only show discard modal if not already processing
const handleSideBarClose = () => {
  if (!isDiscarding.value) {
    showDiscardModal.value = true;
  }
};

// Handle sidebar update:isOpen event
const handleSideBarUpdate = (isOpen: boolean) => {
  if (!isOpen && !isDiscarding.value) {
    // Handle modal close
  }
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
input[type="number"],
input[type="date"] {
  height: 38px;
  color: #172B4D !important;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus {
  color: #172B4D !important;
}

/* Ensure input values are visible */
input:not(:placeholder-shown) {
  color: #172B4D !important;
}
</style>
