<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Stock Count / Product Stock Count / Unapproved Stock Count" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="stockCountTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Action Buttons in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <button 
            @click="disableProducts"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md "
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16.4996 15.3242C16.4995 15.0124 16.3755 14.7134 16.155 14.493L13.662 12L16.155 9.507C16.2641 9.39788 16.3507 9.26832 16.4098 9.12574C16.4688 8.98316 16.4992 8.83034 16.4992 8.676C16.4992 8.52167 16.4688 8.36885 16.4098 8.22627C16.3507 8.08369 16.2641 7.95413 16.155 7.845C16.0459 7.73588 15.9163 7.64931 15.7737 7.59025C15.6312 7.53119 15.4783 7.50079 15.324 7.50079C15.1697 7.50079 15.0169 7.53119 14.8743 7.59025C14.7317 7.64931 14.6021 7.73588 14.493 7.845L12 10.338L9.506 7.845C9.28299 7.63776 8.98831 7.52507 8.68392 7.53065C8.37953 7.53622 8.08916 7.65962 7.87389 7.87489C7.65862 8.09016 7.53522 8.38053 7.52965 8.68492C7.52407 8.98931 7.63676 9.284 7.844 9.507L10.337 12L7.844 14.493C7.6235 14.7135 7.49962 15.0126 7.49962 15.3245C7.49962 15.6364 7.6235 15.9355 7.844 16.156C7.95292 16.2655 8.0824 16.3524 8.22501 16.4117C8.36763 16.471 8.52055 16.5016 8.675 16.5016C8.82945 16.5016 8.98238 16.471 9.12499 16.4117C8.26761 16.3524 9.39709 16.2655 9.506 16.156L12 13.662L14.493 16.156C14.7135 16.3764 15.0126 16.5002 15.3244 16.5001C15.6361 16.5 15.9351 16.376 16.1555 16.1555C16.3759 15.935 16.4997 15.6359 16.4996 15.3242Z" fill="#44546F"/>
            </svg>
            Disable Products
          </button>
          <button 
            @click="enableProducts"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.707 11.293C9.61475 11.1975 9.50441 11.1213 9.3824 11.0689C9.2604 11.0165 9.12918 10.9889 8.9964 10.9877C8.86362 10.9866 8.73194 11.0119 8.60905 11.0622C8.48615 11.1125 8.3745 11.1867 8.28061 11.2806C8.18671 11.3745 8.11246 11.4861 8.06218 11.609C8.0119 11.7319 7.9866 11.8636 7.98775 11.9964C7.9889 12.1292 8.01649 12.2604 8.0689 12.3824C8.12131 12.5044 8.19749 12.6148 8.293 12.707L10.293 14.707C10.4805 14.8945 10.7348 14.9998 11 14.9998C11.2652 14.9998 11.5195 14.8945 11.707 14.707L15.707 10.707C15.8025 10.6148 15.8787 10.5044 15.9311 10.3824C15.9835 10.2604 16.0111 10.1292 16.0123 9.9964C16.0134 9.86362 15.9881 9.73194 15.9378 9.60905C15.8875 9.48615 15.8133 9.3745 15.7194 9.2806C15.6255 9.18671 15.5139 9.11246 15.391 9.06218C15.2681 9.0119 15.1364 8.98659 15.0036 8.98775C14.8708 8.9889 14.7396 9.01649 14.6176 9.0689C14.4956 9.12131 14.3852 9.19749 14.293 9.293L11 12.586L9.707 11.293Z" fill="#44546F"/>
            </svg>
            Enable Products
          </button>
          <button 
            @click="createNewStockCount"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
            New Stock Count
          </button>
        </div>
      </Tabs>
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <div class="" v-if="activeTab === 'Unapproved Stock Count'">
        <UnapprovedStockCount />
      </div>
      <div class="" v-else-if="activeTab === 'Approved Stock Count'">
        <ApprovedStockCount />
      </div>
    </div>



    <!-- Disable Products Modal -->
    <SideBarModal
      :isOpen="showDisableModal"
      title="Disable Products"
      @update:isOpen="showDisableModal = $event"
      @close="closeDisableModal"
    >
      <div class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <v-select
            v-model="disableForm.product_name"
            :options="productOptions"
            label="name"
            placeholder="Type to search for products"
            :searchable="true"
            :clearable="true"
          />
        </div>

        <!-- Zero Products Checkbox -->
        <div class="flex items-center">
          <input
            id="zero-products"
            type="checkbox"
            v-model="disableForm.zero_products"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label for="zero-products" class="ml-2 text-sm font-medium text-gray-900">
            Zero Products
          </label>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="handleDisableCancel" class="cancel_btn">Cancel</button>
          <button @click="confirmDisableProducts" class="create_btn">Disable</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Enable Products Modal -->
    <SideBarModal
      :isOpen="showEnableModal"
      title="Enable Products"
      @update:isOpen="showEnableModal = $event"
      @close="closeEnableModal"
    >
      <div class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <v-select
            v-model="enableForm.product_name"
            :options="productOptions"
            label="name"
            placeholder="Type to search for products"
            :searchable="true"
            :clearable="true"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="handleEnableCancel" class="cancel_btn">Cancel</button>
          <button @click="confirmEnableProducts" class="create_btn">Enable</button>
        </div>
      </template>
    </SideBarModal>

    <!-- New Stock Count Modal -->
    <SideBarModal
      :isOpen="showCreateStockCountModal"
      title="New Stock Count"
      @update:isOpen="showCreateStockCountModal = $event"
      @close="closeCreateStockCountModal"
    >
      <div class="space-y-6">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <v-select
            v-model="newStockCountForm.product_name"
            :options="productOptions"
            label="name"
            placeholder="Type to search for products"
            :searchable="true"
            :clearable="true"
          />
        </div>

        <!-- Batch -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Batch</label>
          <v-select
            v-model="newStockCountForm.batch"
            :options="batchOptions"
            label="name"
            placeholder="Select a batch"
            :searchable="true"
            :clearable="true"
          />
        </div>

        <!-- Warehouse Shelf -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Shelf</label>
          <v-select
            v-model="newStockCountForm.warehouse_shelf"
            :options="warehouseShelfOptions"
            label="name"
            placeholder="Select a shelf"
            :searchable="true"
            :clearable="true"
          />
        </div>

        <!-- Expiry Date and Quantity -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              v-model="newStockCountForm.expiry_date"
              type="date"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
              v-model="newStockCountForm.quantity"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="handleCreateStockCountCancel" class="cancel_btn">Cancel</button>
          <button @click="confirmCreateStockCount" class="create_btn">Create</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      title="Stock Count Created"
      :message="successMessage"
      @close="closeSuccessModal"
    />

    <!-- Discard Changes Modal -->
    <DiscardModal
      :isOpen="showDiscardModal"
      :action="currentModalAction"
      @close="cancelDiscardChanges"
      @confirm="confirmDiscardChanges"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Tabs from "@/views/Components/Tabs.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DiscardModal from "@/views/Components/procurement/ui/DiscardModal.vue";
// @ts-ignore
import vSelect from "vue-select";
import { ref, computed } from 'vue';
import type { Option } from '@/types';
import UnapprovedStockCount from './components/UnapprovedStockCount.vue';
import ApprovedStockCount from './components/ApprovedStockCount.vue';

const activeTab = ref('Unapproved Stock Count');

const stockCountTabs = ref([
  { name: 'Unapproved Stock Count', count: 0 },
  { name: 'Approved Stock Count', count: 0 }
]);



// Modal states
const showDisableModal = ref(false);
const showEnableModal = ref(false);
const showCreateStockCountModal = ref(false);
const showSuccessModal = ref(false);
const showDiscardModal = ref(false);
const currentModalAction = ref('');

// Form states
const disableForm = ref({
  product_name: null as Option | null,
  zero_products: false
});

const enableForm = ref({
  product_name: null as Option | null
});

const newStockCountForm = ref({
  product_name: null as Option | null,
  batch: null as Option | null,
  warehouse_shelf: null as Option | null,
  expiry_date: '',
  quantity: 0
});

// Mock product options (replace with actual API data)
const productOptions = ref<Option[]>([
  { id: 1, name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE' },
  { id: 2, name: 'LUMAREAL TABLET 20/120 X 12 ()' },
  { id: 3, name: 'PARACETAMOL TABLET 500MG' },
  { id: 4, name: 'IBUPROFEN CAPSULE 200MG' },
  { id: 5, name: 'AMOXICILLIN CAPSULE 250MG' },
  { id: 6, name: 'VITAMIN C TABLET 1000MG' },
  { id: 7, name: 'ASPIRIN TABLET 75MG' },
  { id: 8, name: 'OMEPRAZOLE CAPSULE 20MG' }
]);

// Mock batch options
const batchOptions = ref<Option[]>([
  { id: 1, name: 'BATCH-001' },
  { id: 2, name: 'BATCH-002' },
  { id: 3, name: 'BATCH-003' },
  { id: 4, name: 'BATCH-004' },
  { id: 5, name: 'BATCH-005' }
]);

// Mock warehouse shelf options
const warehouseShelfOptions = ref<Option[]>([
  { id: 1, name: 'Shelf A1' },
  { id: 2, name: 'Shelf A2' },
  { id: 3, name: 'Shelf B1' },
  { id: 4, name: 'Shelf B2' },
  { id: 5, name: 'Shelf C1' }
]);

const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
};

// Computed properties
const successMessage = computed(() => {
  const productName = newStockCountForm.value.product_name?.name || 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16';
  return `The stock count "${productName}" has been successfully added to the system.`;
});

// Action functions
const disableProducts = () => {
  showDisableModal.value = true;
};

const enableProducts = () => {
  showEnableModal.value = true;
};

const createNewStockCount = () => {
  showCreateStockCountModal.value = true;
};

// Modal functions
const closeDisableModal = () => {
  showDisableModal.value = false;
  resetDisableForm();
};

const closeEnableModal = () => {
  showEnableModal.value = false;
  resetEnableForm();
};

const resetDisableForm = () => {
  disableForm.value = {
    product_name: null,
    zero_products: false
  };
};

const resetEnableForm = () => {
  enableForm.value = {
    product_name: null
  };
};

const confirmDisableProducts = () => {
  // Perform disable action
  toastMessage.value = 'Products Disabled Successfully';
  showToast.value = true;
  closeDisableModal();
};

const confirmEnableProducts = () => {
  // Perform enable action
  toastMessage.value = 'Products Enabled Successfully';
  showToast.value = true;
  closeEnableModal();
};

const handleDisableCancel = () => {
  if (disableForm.value.product_name || disableForm.value.zero_products) {
    currentModalAction.value = 'Disable Products';
    showDiscardModal.value = true;
  } else {
    closeDisableModal();
  }
};

const handleEnableCancel = () => {
  if (enableForm.value.product_name) {
    currentModalAction.value = 'Enable Products';
    showDiscardModal.value = true;
  } else {
    closeEnableModal();
  }
};

const confirmDiscardChanges = () => {
  showDiscardModal.value = false;
  if (showDisableModal.value) {
    closeDisableModal();
  } else if (showEnableModal.value) {
    closeEnableModal();
  } else if (showCreateStockCountModal.value) {
    closeCreateStockCountModal();
  }
};

const cancelDiscardChanges = () => {
  showDiscardModal.value = false;
};

// New Stock Count Modal Functions
const closeCreateStockCountModal = () => {
  showCreateStockCountModal.value = false;
  resetNewStockCountForm();
};

const resetNewStockCountForm = () => {
  newStockCountForm.value = {
    product_name: null,
    batch: null,
    warehouse_shelf: null,
    expiry_date: '',
    quantity: 0
  };
};

const confirmCreateStockCount = () => {
  // Perform create action
  const productName = newStockCountForm.value.product_name?.name || 'Unknown Product';
  
  // Close the modal first
  showCreateStockCountModal.value = false;
  
  // Show success modal
  showSuccessModal.value = true;
  
  // Reset form
  resetNewStockCountForm();
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

const handleCreateStockCountCancel = () => {
  const hasFormData = newStockCountForm.value.product_name || 
                     newStockCountForm.value.batch || 
                     newStockCountForm.value.warehouse_shelf || 
                     newStockCountForm.value.expiry_date || 
                     newStockCountForm.value.quantity > 0;
                     
  if (hasFormData) {
    currentModalAction.value = 'New Stock Count';
    showDiscardModal.value = true;
  } else {
    closeCreateStockCountModal();
  }
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