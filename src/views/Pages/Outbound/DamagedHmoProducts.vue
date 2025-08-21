<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="HMO - Pharm / Damaged HMO Products" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="damagedProducts"
        :columns="damagedProductColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="DamagedHmoProducts"
        :key="childKey"
      >
        <template #header_actions>
          <button 
            @click="openCreateModal"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
          </svg>

            Create Damaged Product
          </button>
        </template>

        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <div class="flex items-center gap-2">
              <!-- Edit Action -->
              <button 
                @click="editProduct(col.props?.formattedRow)"
                class="p-1 hover:bg-gray-50 rounded"
                title="Edit"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_10070_16669)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z" fill="#44546F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_10070_16669">
                      <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              
              <!-- Delete Action -->
              <button 
                @click="deleteProduct(col.props?.formattedRow)"
                class="p-1 hover:bg-gray-50 rounded"
                title="Delete"
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="#44546F"/>
                </svg>
              </button>
            </div>
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
      :title="showEditModal ? 'Edit Damaged HMO Products' : 'Create Damaged HMO Products'"
      @update:isOpen="closeModal"
      @close="closeModal"
      width="45vw"
    >
      <div class="space-y-4">
        <!-- Select Product and Quantity (Row) -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
            <v-select
              v-model="form.product"
              :options="productOptions"
              label="name"
              placeholder="Type to search for product"
              :searchable="true"
              :clearable="true"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              v-model="form.quantity"
              placeholder="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Date Damaged and Product Batch Number (Row) -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Damaged</label>
            <input
              type="date"
              v-model="form.date_damaged"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Batch Number</label>
            <v-select
              v-model="form.batch_number"
              :options="batchOptions"
              label="name"
              placeholder="Select a product batch no"
              :searchable="true"
              :clearable="true"
            />
          </div>
        </div>

        <!-- Cause of Damage -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cause of Damage</label>
          <input
            type="text"
            v-model="form.damage_cause"
            placeholder="Enter a specific cause of damage"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Comment -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            v-model="form.comment"
            placeholder="Add additional details or notes about the damage"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Is the product returnable? -->
        <div class="flex items-center">
          <input
            id="returnable"
            type="checkbox"
            v-model="form.returnable"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label for="returnable" class="ml-2 text-sm font-medium text-gray-900">
            Is the product returnable?
          </label>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between">
          <!-- Delete button (only in edit mode) -->
          <button 
            v-if="showEditModal"
            @click="confirmDelete"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="white"/>
            </svg>
          </button>
          <div v-else></div>

          <!-- Cancel and Save/Update buttons -->
          <div class="flex space-x-3">
            <button @click="closeModal" class="cancel_btn">Cancel</button>
            <button @click="saveProduct" class="create_btn">
              {{ showEditModal ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#C9372C"/>
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Delete</h3>
          </div>
          <button @click="cancelDelete" class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="mb-6">
          <p class="text-sm text-gray-600">
            You are about to delete this damaged HMO product 
            <strong>"{{ selectedProduct?.product_name }}"</strong>. This action will permanently remove it from the system.
          </p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3">
          <button @click="cancelDelete" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button @click="executeDelete" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
            Delete Damaged HMO Products
          </button>
        </div>
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
// @ts-ignore
import vSelect from "vue-select";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

// Modal states
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedProduct = ref<any>(null);

// Form data
const form = ref({
  product: null,
  quantity: '',
  date_damaged: '',
  batch_number: null,
  damage_cause: '',
  comment: '',
  returnable: false
});

// Column definitions
const damagedProductColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Product Name', field: 'product_name', sortable: true },
  { label: 'Quantity', field: 'quantity', sortable: true },
  { label: 'Date Damaged', field: 'date_damaged', sortable: true },
  { label: 'Damage Cause', field: 'damage_cause', sortable: true },
  { label: 'Batch No.', field: 'batch_no', sortable: true },
  { label: 'Returnable', field: 'returnable', sortable: true },
  { label: 'Comment', field: 'comment', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Mock product options
const productOptions = ref([
  { id: 1, name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 1...' },
  { id: 2, name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1X 100' },
  { id: 3, name: 'ABF 3 CREAM 20G' },
  { id: 4, name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML' },
  { id: 5, name: 'ABONIKI BALM 25G' },
  { id: 6, name: 'ACCU CHEK ACTIVE GLUCOMETER' },
  { id: 7, name: 'ACCU CHEK TEST STRIP X 50' },
  { id: 8, name: 'MEDIKLIN ACCU-CHEK 200 LANCET' }
]);

// Mock batch options
const batchOptions = ref([
  { id: 1, name: '211115' },
  { id: 2, name: '211116' },
  { id: 3, name: '211117' },
  { id: 4, name: '211118' }
]);

// Mock damaged products data
const damagedProducts = ref([
  {
    id: 87,
    product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 100',
    quantity: 12,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 54,
    product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1X 100',
    quantity: 18,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 25,
    product_name: 'ABF 3 CREAM 20G',
    quantity: 29,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 30,
    product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML',
    quantity: 16,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 51,
    product_name: 'ABONIKI BALM 25G',
    quantity: 9,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 21,
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    quantity: 43,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 35,
    product_name: 'ACCU CHEK TEST STRIP X 50',
    quantity: 23,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  },
  {
    id: 23,
    product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET',
    quantity: 31,
    date_damaged: '01/12/2024',
    damage_cause: '--',
    batch_no: '211115',
    returnable: '--',
    comment: '--',
    date_created: '16/01/2025'
  }
]);

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
    quantity: product.quantity.toString(),
    date_damaged: product.date_damaged.split('/').reverse().join('-'), // Convert to YYYY-MM-DD
    batch_number: batchOptions.value.find(b => b.name === product.batch_no) || null,
    damage_cause: product.damage_cause === '--' ? '' : product.damage_cause,
    comment: product.comment === '--' ? '' : product.comment,
    returnable: product.returnable !== '--'
  };
  showEditModal.value = true;
};

const deleteProduct = (product: any) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
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
    quantity: '',
    date_damaged: '',
    batch_number: null,
    damage_cause: '',
    comment: '',
    returnable: false
  };
};

const saveProduct = () => {
  if (showEditModal.value) {
    // Update existing product
    const index = damagedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
    if (index !== -1) {
      damagedProducts.value[index] = {
        ...damagedProducts.value[index],
        product_name: form.value.product?.name || '',
        quantity: parseInt(form.value.quantity),
        date_damaged: form.value.date_damaged.split('-').reverse().join('/'), // Convert back to DD/MM/YYYY
        batch_no: form.value.batch_number?.name || '',
        damage_cause: form.value.damage_cause || '--',
        comment: form.value.comment || '--',
        returnable: form.value.returnable ? 'Yes' : '--'
      };
    }
    toastMessage.value = 'Damaged Product Updated Successfully';
  } else {
    // Create new product
    const newProduct = {
      id: Math.max(...damagedProducts.value.map(p => p.id)) + 1,
      product_name: form.value.product?.name || '',
      quantity: parseInt(form.value.quantity),
      date_damaged: form.value.date_damaged.split('-').reverse().join('/'), // Convert to DD/MM/YYYY
      damage_cause: form.value.damage_cause || '--',
      batch_no: form.value.batch_number?.name || '',
      returnable: form.value.returnable ? 'Yes' : '--',
      comment: form.value.comment || '--',
      date_created: new Date().toLocaleDateString('en-GB')
    };
    damagedProducts.value.unshift(newProduct);
    toastMessage.value = 'Damaged Product Created Successfully';
  }
  
  showToast.value = true;
  closeModal();
  childKey.value++;
};

const confirmDelete = () => {
  showEditModal.value = false;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  if (selectedProduct.value) {
    showEditModal.value = true;
  }
};

const executeDelete = () => {
  const index = damagedProducts.value.findIndex(p => p.id === selectedProduct.value.id);
  if (index !== -1) {
    damagedProducts.value.splice(index, 1);
  }
  
  toastMessage.value = 'Damaged Product Deleted Successfully';
  showToast.value = true;
  showDeleteModal.value = false;
  selectedProduct.value = null;
  childKey.value++;
};

</script>

<style>
@import "vue-select/dist/vue-select.css";

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

/* Vue Select Styling */
.vs__dropdown-toggle {
  border: 2px solid rgba(9, 30, 66, 0.14);
  border-radius: 8px;
  padding: 4px 8px;
  min-height: 40px;
}

.vs__dropdown-menu {
  border: 2px solid rgba(9, 30, 66, 0.14);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.vs__dropdown-option {
  padding: 8px 12px;
  font-size: 14px;
  color: rgba(98, 111, 134, 1);
}

.vs__dropdown-option--highlight {
  background: rgba(12, 102, 228, 0.1);
  color: rgba(12, 102, 228, 1);
}

.vs__search {
  font-size: 14px;
  color: rgba(98, 111, 134, 1);
}

.vs__search::placeholder {
  color: rgba(98, 111, 134, 0.7);
}
</style>
