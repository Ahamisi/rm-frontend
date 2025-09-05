<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="HMO - Pharm / All HMO Products" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="hmoProducts"
        :columns="hmoProductColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="filterFields"
        pageName="AllHmoProducts"
        :key="childKey"
      >
        <template #header_actions>
          <button 
            @click="downloadStockReport"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
            </svg>
            Download Stock Report
          </button>
        </template>

        <template #column="col">
          <!-- Product Image Column -->
          <span v-if="col.props?.column?.field === 'product_image'">
            <img 
              @click="navigateToProduct(col.props?.formattedRow)"
              :src="(col.props?.formattedRow as any)?.product_image || '/placeholder-product.png'" 
              alt=""
              class="w-7 h-7 object-cover rounded-md cursor-pointer hover:opacity-80 flex-shrink-0"
            >
          </span>

          <!-- Action Column (unchanged) -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <button 
              @click="viewProduct(col.props?.formattedRow)"
              class="p-2 hover:bg-gray-50 rounded-md"
              title="Transfer to Inventory"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_10070_3912)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8268 6.82754C11.7494 6.90486 11.6879 6.9967 11.646 7.09779C11.6041 7.19889 11.5825 7.30726 11.5825 7.4167C11.5825 7.52615 11.6041 7.63452 11.646 7.73561C11.6879 7.83671 11.7494 7.92855 11.8268 8.00587L14.9877 11.1667H6.99935C6.77834 11.1667 6.56637 11.2545 6.41009 11.4108C6.25381 11.5671 6.16602 11.779 6.16602 12C6.16602 12.221 6.25381 12.433 6.41009 12.5893C6.56637 12.7456 6.77834 12.8334 6.99935 12.8334H14.9877L11.8268 15.9942C11.7494 16.0715 11.6879 16.1634 11.646 16.2645C11.6041 16.3656 11.5825 16.4739 11.5825 16.5834C11.5825 16.6928 11.6041 16.8012 11.646 16.9023C11.6879 17.0034 11.7494 17.0952 11.8268 17.1725C12.1518 17.4975 12.6802 17.4975 13.006 17.1725L17.5885 12.5892C17.7394 12.4389 17.8268 12.2363 17.8327 12.0234V11.9759C17.8267 11.7632 17.7393 11.5609 17.5885 11.4109L13.006 6.82754C12.9286 6.75006 12.8367 6.68859 12.7355 6.64665C12.6344 6.60472 12.5259 6.58313 12.4164 6.58313C12.3069 6.58313 12.1985 6.60472 12.0973 6.64665C11.9962 6.68859 11.9042 6.75006 11.8268 6.82754Z" fill="#44546F"/>
                </g>
                <defs>
                  <clipPath id="clip0_10070_3912">
                    <rect width="20" height="20" fill="white" transform="translate(2 2)"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </span>

          <!-- Shelf Location Column (Pill) -->
          <span v-else-if="col.props?.column?.field === 'shelf_location'">
            <span class="inline-flex items-center px-[6px] py-[4px] rounded-[4px] text-[10px] font-medium bg-[#091E420F] cursor-pointer hover:text-blue-600"
                  @click="navigateToProduct(col.props?.formattedRow)">
              {{ (col.props?.formattedRow as any)?.shelf_location || '' }}
            </span>
          </span>

          <!-- Other Clickable Columns (ID to Available Qty, Sold Qty) -->
          <span v-else-if="isClickableColumn(col.props?.column?.field)"
                @click="navigateToProduct(col.props?.formattedRow)"
                class="cursor-pointer hover:text-blue-600 truncate block">
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Success Toast -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />

    <!-- Transfer Information Modal -->
    <SideBarModal
      :isOpen="showTransferModal"
      :title="`Transfer Information to Inventory - ${selectedProduct?.product_name || ''}`"
      @update:isOpen="showTransferModal = $event"
      @close="closeTransferModal"
      :fullWidth="true"
    >
      <template #header>
        <OrderHeader 
          title="Transfer Information to Inventory" 
          :reference="selectedProduct?.product_name || ''"
          titleSize="md"
        >
          <template #icon>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.6189 0.351782C4.83555 0.282255 5.06706 0.273179 5.28849 0.325532L5.38224 0.351782L8.10474 1.22511C8.1839 1.25136 8.25515 1.30053 8.30724 1.36928L8.3364 1.41303L9.48224 3.39095C9.51122 3.44091 9.5295 3.49635 9.53591 3.55375C9.54233 3.61116 9.53674 3.66927 9.5195 3.72439C9.50226 3.77952 9.47375 3.83046 9.43577 3.87398C9.3978 3.9175 9.35119 3.95265 9.2989 3.9772L9.2489 3.99678L8.39432 4.27095V6.07511C8.39426 6.24006 8.34525 6.40128 8.2535 6.53835C8.16174 6.67543 8.03138 6.78219 7.8789 6.84511L7.81557 6.86845L5.38224 7.64845C5.16559 7.71797 4.93408 7.72705 4.71265 7.6747L4.6189 7.64886L2.18557 6.86845C2.02847 6.818 1.88989 6.72205 1.78737 6.59276C1.68486 6.46347 1.62304 6.30666 1.60974 6.1422L1.60682 6.0747V4.27095L0.752237 3.99678C0.697278 3.97914 0.646584 3.95028 0.603367 3.91202C0.56015 3.87376 0.525353 3.82694 0.501183 3.77453C0.477013 3.72211 0.463996 3.66525 0.462958 3.60754C0.46192 3.54983 0.472883 3.49253 0.495153 3.43928L0.518903 3.39095L1.66474 1.41303C1.70769 1.33893 1.77243 1.27986 1.85015 1.24387L1.89599 1.22511L4.6189 0.351782ZM5.41724 4.1272V6.7622L7.56099 6.0747V4.53845L6.27349 4.95136C6.19092 4.97785 6.10215 4.97791 6.01954 4.95155C5.93693 4.92518 5.86461 4.8737 5.81265 4.80428L5.78599 4.76345L5.41724 4.1272ZM4.5839 4.1272L4.21515 4.76345C4.1675 4.84567 4.09318 4.90913 4.00452 4.94331C3.91585 4.97749 3.81816 4.98033 3.72765 4.95136L2.44015 4.53845V6.0747L4.5839 6.76261V4.1272ZM2.21724 2.12095L1.49932 3.36136L3.66224 4.05553L4.38099 2.81511L2.21724 2.12095ZM7.7839 2.12095L5.62015 2.81511L6.33849 4.05553L8.50182 3.36136L7.7839 2.12095ZM5.12765 1.14511C5.06169 1.12405 4.99152 1.11975 4.92349 1.13261L4.87349 1.14511L3.38807 1.62178L5.00057 2.13886L6.61307 1.62178L5.12765 1.14511Z" fill="#626F86"/>
            </svg>
          </template>
        </OrderHeader>
      </template>
      <!-- Info Alert -->
    

      <div class="bg-[#CCE0FF] p-3 rounded-lg mb-6 mx-6 mt-4">
            <p class="text-sm text-[#172B4D]">
              Please ensure the transfer quantity is a multiple of 2.
            </p>
        </div>

      <!-- Batch Information Table -->
      <div class="overflow-x-auto mx-6">
        <div class="bg-white border text-lightBlack border-[#091E4224] rounded-xl shadow-sm overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="text-center bg-gray-100 medium-text text-text-default">
                <th class="p-2 text-left">
                </th>
                <th class="p-2 text-left">Batch No.</th>
                <th class="p-2 text-left">Expiry Date</th>
                <th class="p-2 text-left">Shelf Location</th>
                <th class="p-2 text-left">Quantity Available</th>
                <th class="p-2 text-left">Quantity to Transfer</th>
              </tr>
            </thead>
            <tbody class="medium-text">
              <tr v-for="(batch, index) in batchData" :key="index" class="relative text-left text-gray-500 border-b hover:bg-gray-50">
                <td class="p-3">
                  <input type="checkbox" class="rounded">
                </td>
                <td class="p-3 text-sm">{{ batch.batch_no }}</td>
                <td class="p-3 text-sm">{{ batch.expiry_date }}</td>
                <td class="p-3 text-sm">{{ batch.shelf_location }}</td>
                <td class="p-3 text-sm">{{ batch.quantity_available }}</td>
                <td class="p-3 text-sm">{{ batch.quantity_to_transfer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="closeTransferModal" class="cancel_btn">Cancel</button>
          <button @click="handleTransfer" class="create_btn">Transfer</button>
        </div>
      </template>
    </SideBarModal>

    <!-- Confirmation Modal -->
    <WarningConfirmationModal
      :show="showConfirmModal"
      title="Transfer Information to Inventory?"
      :message="transferMessage"
      confirmText="Transfer Information"
      cancelText="Cancel"
      @close="cancelTransfer"
      @confirm="confirmTransfer"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      title="Information Transferred"
      :message="successMessage"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import OrderHeader from "@/views/Components/ui/OrderHeader.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumn, FilterFields, FilterField } from '@/types';

// Router
const router = useRouter();

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

// Modal states
const showTransferModal = ref(false);
const showConfirmModal = ref(false);
const showSuccessModal = ref(false);
const selectedProduct = ref<any>(null);
const selectedProductName = ref<string>('');
const isTransitioning = ref(false); // Flag to prevent clearing during modal transitions

// Computed properties
const transferMessage = computed(() => {
  if (!selectedProductName.value) return '';
  return `You are about to transfer the information of this product "${selectedProductName.value}" to inventory. This action will update the ERP quantity of this quantity!`;
});

const successMessage = computed(() => {
  if (!selectedProductName.value) return '';
  return `The product information "${selectedProductName.value}" has been successfully transferred to inventory.`;
});

// Column definitions
const hmoProductColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Product Image', field: 'product_image', sortable: false },
  { label: 'Product Name', field: 'product_name', sortable: true },
  { label: 'Category', field: 'category', sortable: true },
  { label: 'Product Formulation', field: 'product_formulation', sortable: true },
  { label: 'HMO Price', field: 'hmo_price', sortable: true },
  { label: 'Pharmacy Price', field: 'pharmacy_price', sortable: true },
  { label: 'Available Qty', field: 'available_qty', sortable: true },
  { label: 'Sold Qty', field: 'sold_qty', sortable: true },
  { label: 'Shelf Location', field: 'shelf_location', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);



// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
  category: {
    field: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { id: 'all', name: 'All Categories' },
      { id: 'surgicals', name: 'Surgicals' },
      { id: 'creams_ointments', name: 'Creams & Ointments' }
    ],
    placeholder: 'All Categories'
  }
});

// Mock HMO Products data
const hmoProducts = ref([
  {
    id: 87,
    product_image: '/product-placeholder.png',
    product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 1...',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 54,
    product_image: '/product-placeholder.png',
    product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1X 100',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 25,
    product_image: '/product-placeholder.png',
    product_name: 'KESSINGTON KESARTEM TABLET 80/480X6',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 30,
    product_image: '/product-placeholder.png',
    product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 51,
    product_image: '/product-placeholder.png',
    product_name: 'ABONIKI BALM 25G',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 21,
    product_image: '/product-placeholder.png',
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 35,
    product_image: '/product-placeholder.png',
    product_name: 'ACCU CHEK TEST STRIP X 50',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 23,
    product_image: '/product-placeholder.png',
    product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 33,
    product_image: '/product-placeholder.png',
    product_name: 'ACEPOL (PARACETAMOL) SUSPENSION 60ML',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 87,
    product_image: '/product-placeholder.png',
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 88,
    product_image: '/product-placeholder.png',
    product_name: 'ABONIKI BALM 25G',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 81,
    product_image: '/product-placeholder.png',
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 80,
    product_image: '/product-placeholder.png',
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 5,
    product_image: '/product-placeholder.png',
    product_name: 'ABONIKI BALM 25G',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 55,
    product_image: '/product-placeholder.png',
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: '₦96,700.00',
    pharmacy_price: '₦96,700.00',
    available_qty: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  }
]);

// Action functions
const downloadStockReport = () => {
  toastMessage.value = 'Stock Report Downloaded Successfully';
  showToast.value = true;
};

// Mock batch data for transfer modal
const batchData = ref([
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 1189, quantity_to_transfer: 1189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 11, quantity_to_transfer: 11 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 },
  { batch_no: 'LW377 | 01/08/2024', expiry_date: '5/21/2024', shelf_location: 'HA006', quantity_available: 189, quantity_to_transfer: 189 }
]);

const viewProduct = (product: any) => {
  selectedProduct.value = product;
  selectedProductName.value = product?.product_name || '';
  showTransferModal.value = true;
};

// Navigation function for clickable columns
const navigateToProduct = (product: any) => {
  router.push({ name: 'admin.products.show', params: { id: product.id } });
};

// Helper function to determine if a column should be clickable
const isClickableColumn = (field: string | undefined) => {
  const clickableColumns = [
    'id',
    'product_name', 
    'category',
    'product_formulation',
    'hmo_price',
    'pharmacy_price',
    'available_qty',
    'sold_qty',
    'shelf_location'
  ];
  return field && clickableColumns.includes(field);
};

// Modal functions
const closeTransferModal = () => {
  // Don't clear data if we're transitioning to confirmation modal
  if (isTransitioning.value) {
    return;
  }
  
  showTransferModal.value = false;
  selectedProduct.value = null;
  selectedProductName.value = '';
};

const handleTransfer = () => {
  // Set transitioning flag to prevent clearing data
  isTransitioning.value = true;
  showTransferModal.value = false;
  
  // Small delay to ensure modal transition, then show confirmation
  setTimeout(() => {
    showConfirmModal.value = true;
  }, 50);
};

const confirmTransfer = () => {
  showConfirmModal.value = false;
  showSuccessModal.value = true;
  // Reset transition flag when moving to success modal
  isTransitioning.value = false;
};

const cancelTransfer = () => {
  showConfirmModal.value = false;
  showTransferModal.value = true;
  // Reset transition flag when user cancels
  isTransitioning.value = false;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  selectedProduct.value = null;
  selectedProductName.value = '';
  // Reset transition flag when completely done
  isTransitioning.value = false;
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

/* Force consistent row heights for AllHmoProducts table */
#AllHmoProducts-table tbody tr {
  height: 52px !important;
  min-height: 52px !important;
  max-height: 52px !important;
}

#AllHmoProducts-table tbody td {
  height: 52px !important;
  min-height: 52px !important;
  max-height: 52px !important;
  overflow: hidden !important;
  vertical-align: middle !important;
}

/* Truncate long text in product names and other columns */
#AllHmoProducts-table tbody td span {
  display: block !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
}

/* Ensure images don't affect row height */
#AllHmoProducts-table tbody td img {
  flex-shrink: 0 !important;
  width: 28px !important;
  height: 28px !important;
}

/* Remove underlines from clickable items */
#AllHmoProducts-table tbody td .cursor-pointer:hover {
  text-decoration: none !important;
}

/* Shelf Location Pills - preserve styling */
#AllHmoProducts-table tbody td span[class*="bg-[#091E420F]"] {
  background-color: #091E420F !important;
  color: inherit !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  padding: 4px 6px !important;
  border-radius: 4px !important;
  display: inline-flex !important;
  align-items: center !important;
}
</style>
