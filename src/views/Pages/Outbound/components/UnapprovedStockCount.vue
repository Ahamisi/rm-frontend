<template>
  <div class="mt-4">
    <Datatable
      :items="unapprovedStockItems"
      :columns="stockCountColumns"
      :searchable="true"
      :filterByDate="false"
      :printable="false"
      :exportable="false"
      :filterFields="{}"
      pageName="UnapprovedStockCount"
      :key="childKey"
    >
      <template #header_actions>
        <button 
          @click="downloadUnapprovedStockCount"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
            <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
          </svg>
          Download Unapproved Stock Count
        </button>
      </template>
      <template #column="col">
        <!-- Action Column -->
        <span v-if="col.props?.column?.field === 'action'">
          <div class="flex items-center gap-2">
            <!-- Approve Action -->
            <button 
              @click="approveItem(col.props?.formattedRow)"
              class="p-1 hover:bg-gray-50 rounded"
              title="Approve"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.23439 12.322C7.05385 12.13 6.8048 12.0171 6.5414 12.0077C6.278 11.9983 6.02156 12.0933 5.82783 12.272C5.6341 12.4507 5.51876 12.6987 5.50688 12.962C5.495 13.2253 5.58754 13.4826 5.76439 13.678L9.37639 17.597C9.91339 18.123 10.7134 18.123 11.2104 17.627L11.5744 17.268C12.8889 15.9753 14.2019 14.6809 15.5134 13.385L15.5534 13.345C16.7791 12.1371 17.9984 10.9228 19.2114 9.70205C19.3927 9.51225 19.4921 9.25878 19.4881 8.99634C19.4842 8.73391 19.3772 8.48354 19.1903 8.29926C19.0034 8.11499 18.7516 8.01158 18.4891 8.01135C18.2266 8.01113 17.9746 8.1141 17.7874 8.29805C16.5801 9.51239 15.3667 10.7207 14.1474 11.923L14.1074 11.963C12.8507 13.2053 11.5923 14.446 10.3324 15.685L7.23439 12.322Z" fill="#44546F"/>
              </svg>
            </button>
            
            <!-- Reject Action -->
            <button 
              @click="rejectItem(col.props?.formattedRow)"
              class="p-1 hover:bg-gray-50 rounded"
              title="Reject"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6846 7.4L12.5006 10.585L9.31464 7.399C9.21938 7.30584 9.09127 7.25393 8.95803 7.25449C8.82478 7.25505 8.69712 7.30804 8.60264 7.402L7.90264 8.103C7.85472 8.14897 7.81652 8.20409 7.7903 8.2651C7.76408 8.3261 7.75038 8.39175 7.75001 8.45815C7.74963 8.52455 7.7626 8.59035 7.78813 8.65165C7.81366 8.71295 7.85124 8.7685 7.89864 8.815L11.0836 11.999L7.89964 15.185C7.80661 15.2804 7.75488 15.4086 7.75563 15.5418C7.75638 15.6751 7.80955 15.8027 7.90364 15.897L8.60364 16.597C8.80964 16.804 9.11964 16.797 9.31564 16.601L12.5016 13.416L15.6856 16.601C15.781 16.694 15.9092 16.7458 16.0425 16.745C16.1757 16.7443 16.3033 16.6911 16.3976 16.597L17.0986 15.897C17.1465 15.851 17.1846 15.7958 17.2108 15.7347C17.2369 15.6737 17.2505 15.608 17.2508 15.5416C17.2511 15.4752 17.238 15.4095 17.2124 15.3482C17.1868 15.2869 17.1491 15.2314 17.1016 15.185L13.9156 11.999L17.1016 8.815C17.1948 8.71974 17.2467 8.59163 17.2462 8.45838C17.2456 8.32514 17.1926 8.19748 17.0986 8.103L16.3986 7.403C16.3517 7.35497 16.2958 7.31672 16.234 7.29046C16.1722 7.2642 16.1058 7.25045 16.0386 7.25C15.9728 7.25054 15.9078 7.26407 15.8472 7.28981C15.7866 7.31555 15.7317 7.35299 15.6856 7.4H15.6846Z" fill="#44546F"/>
              </svg>
            </button>
          </div>
        </span>

        <!-- Counted By Column -->
        <span v-else-if="col.props?.column?.field === 'counted_by'">
          <div class="flex items-center gap-2">
            <img 
              :src="getUserAvatar(col.props?.formattedRow?.counted_by)" 
              :alt="col.props?.formattedRow?.counted_by"
              class="w-6 h-6 rounded-full"
            >
            <span class="text-sm">{{ col.props?.formattedRow?.counted_by }}</span>
          </div>
        </span>

        <!-- Default Column -->
        <span v-else>
          {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
        </span>
      </template>
    </Datatable>

    <!-- Approve Stock Count SideBarModal -->
    <SideBarModal
      :isOpen="showApproveModal"
      title="Approve Stock Count"
      @update:isOpen="showApproveModal = $event"
      @close="closeApproveModal"
    >
      <div class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <SelectBox
            v-model="approveForm.product_name"
            :options="productOptions"
            placeholder="Select product"
          />
        </div>

        <!-- Batch -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Batch</label>
          <SelectBox
            v-model="approveForm.batch_no"
            :options="batchOptions"
            placeholder="Select batch"
          />
        </div>

        <!-- Warehouse Shelf -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Shelf</label>
          <SelectBox
            v-model="approveForm.warehouse_shelf"
            :options="warehouseShelfOptions"
            placeholder="Select warehouse shelf"
          />
        </div>

        <!-- Expiry Date and Quantity Row -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="date"
              v-model="approveForm.expiry_date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              v-model="approveForm.quantity"
              placeholder="200"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Barcode -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
          <div class="relative">
            <input
              type="text"
              v-model="approveForm.barcode"
              placeholder="A211082"
              class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="scanBarcode"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Click camera icon to scan</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button 
            @click="closeApproveModal"
            class="cancel_btn"
          >
            Cancel
          </button>
          <button 
            @click="confirmApprove"
            class="approve_btn"
          >
            Approve
          </button>
        </div>
      </template>
    </SideBarModal>

    <!-- Reject Stock Count Modal -->
    <RejectConfirmationModal
      :show="showRejectModal"
      :message="rejectMessage"
      confirm-text="Reject Stock Count"
      @confirm="confirmReject"
      @cancel="closeRejectModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import SelectBox from '@/views/Components/procurement/SelectBox.vue';
import RejectConfirmationModal from '@/views/Components/ui/RejectConfirmationModal.vue';

const childKey = ref(0);

// Modal states
const showApproveModal = ref(false);
const showRejectModal = ref(false);
const itemToApprove = ref<any>(null);
const itemToReject = ref<any>(null);

// Approve form data
const approveForm = ref({
  product_name: '',
  batch_no: '',
  warehouse_shelf: '',
  expiry_date: '',
  quantity: '',
  barcode: ''
});

// Mock data for unapproved stock count items
const unapprovedStockItems = ref([
  {
    id: 15,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE...',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025'
  },
  {
    id: 14,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE...',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 200,
    stock_count: 200,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025'
  },
  {
    id: 13,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE...',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025'
  },
  {
    id: 12,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025'
  },
  {
    id: 11,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025'
  },
  {
    id: 10,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Femi Babalola',
    date_counted: '16/01/2025'
  },
  {
    id: 9,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Femi Babalola',
    date_counted: '16/01/2025'
  },
  {
    id: 8,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 1,
    stock_count: 1,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Sarah Badmus',
    date_counted: '16/01/2025'
  },
  {
    id: 7,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 0,
    stock_count: 0,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Sarah Badmus',
    date_counted: '16/01/2025'
  },
  {
    id: 6,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    erp_expiry_date: '16/01/2025',
    new_expiry_date: '16/01/2025',
    erp_quantity: 1,
    stock_count: 1,
    erp_warehouse_shelf: 'EC008',
    new_warehouse_shelf: 'EC008',
    counted_by: 'Josh Michael',
    date_counted: '16/01/2025'
  }
]);

// Dropdown options
const productOptions = ref([
  { value: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE...', label: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGE...' },
  { value: 'LUMAREAL TABLET 20/120 X 12 ()', label: 'LUMAREAL TABLET 20/120 X 12 ()' }
]);

const batchOptions = ref([
  { value: '211115', label: '211115' },
  { value: '211116', label: '211116' }
]);

const warehouseShelfOptions = ref([
  { value: 'EC008', label: 'EC008' },
  { value: 'EC009', label: 'EC009' },
  { value: 'EC010', label: 'EC010' }
]);

// Computed properties
const rejectMessage = computed(() => {
  return itemToReject.value 
    ? `You are about to reject this product stock count "${itemToReject.value.product_name}". This action will permanently delete this stock count from the system.`
    : '';
});

// Column definitions
const stockCountColumns = ref([
  {
    field: 'id',
    label: 'ID',
    width: '5%',
    sortable: true
  },
  {
    field: 'product_name',
    label: 'Product Name',
    width: '20%',
    sortable: true
  },
  {
    field: 'batch_no',
    label: 'Batch No.',
    width: '8%',
    sortable: true
  },
  {
    field: 'erp_expiry_date',
    label: 'ERP Expiry Date',
    width: '10%',
    sortable: true
  },
  {
    field: 'new_expiry_date',
    label: 'New Expiry Date',
    width: '10%',
    sortable: true
  },
  {
    field: 'erp_quantity',
    label: 'ERP Quantity',
    width: '8%',
    sortable: true
  },
  {
    field: 'stock_count',
    label: 'Stock Count',
    width: '8%',
    sortable: true
  },
  {
    field: 'erp_warehouse_shelf',
    label: 'ERP Warehouse Shelf',
    width: '10%',
    sortable: true
  },
  {
    field: 'new_warehouse_shelf',
    label: 'New Warehouse Shelf',
    width: '10%',
    sortable: true
  },
  {
    field: 'counted_by',
    label: 'Counted By',
    width: '8%',
    sortable: true
  },
  {
    field: 'date_counted',
    label: 'Date Counted',
    width: '8%',
    sortable: true
  },
  {
    field: 'action',
    label: 'Action',
    width: '8%',
    sortable: false
  }
]);

// Helper function to get user avatar
const getUserAvatar = (userName: string) => {
  // Mock avatar mapping - in real app this would come from user data
  const avatarMap: { [key: string]: string } = {
    'Esther Joel': '/src/assets/images/profileImg.png',
    'Femi Babalola': '/src/assets/images/femiImg.png',
    'Sarah Badmus': '/src/assets/images/avatarImage.png',
    'Josh Michael': '/src/assets/images/joshImg.png'
  };
  return avatarMap[userName] || '/src/assets/images/avatarImage.png';
};

// Action functions
const downloadUnapprovedStockCount = () => {
  console.log('Download Unapproved Stock Count');
  // Trigger download functionality
};

const approveItem = (item: any) => {
  itemToApprove.value = item;
  // Pre-fill form with item data
  approveForm.value = {
    product_name: item.product_name,
    batch_no: item.batch_no,
    warehouse_shelf: item.erp_warehouse_shelf,
    expiry_date: item.erp_expiry_date,
    quantity: item.stock_count.toString(),
    barcode: 'A211082' // Default barcode
  };
  showApproveModal.value = true;
};

const rejectItem = (item: any) => {
  itemToReject.value = item;
  showRejectModal.value = true;
};

// Modal functions
const closeApproveModal = () => {
  showApproveModal.value = false;
  itemToApprove.value = null;
  approveForm.value = {
    product_name: '',
    batch_no: '',
    warehouse_shelf: '',
    expiry_date: '',
    quantity: '',
    barcode: ''
  };
};

const closeRejectModal = () => {
  showRejectModal.value = false;
  itemToReject.value = null;
};

const confirmApprove = () => {
  if (itemToApprove.value) {
    // Remove from unapproved list
    const index = unapprovedStockItems.value.findIndex(i => i.id === itemToApprove.value.id);
    if (index > -1) {
      unapprovedStockItems.value.splice(index, 1);
      childKey.value++;
    }
  }
  closeApproveModal();
};

const confirmReject = () => {
  if (itemToReject.value) {
    // Remove from unapproved list
    const index = unapprovedStockItems.value.findIndex(i => i.id === itemToReject.value.id);
    if (index > -1) {
      unapprovedStockItems.value.splice(index, 1);
      childKey.value++;
    }
  }
  closeRejectModal();
};

const scanBarcode = () => {
  // Simulate barcode scanning
  approveForm.value.barcode = 'A211082';
  console.log('Barcode scanned:', approveForm.value.barcode);
};
</script>
