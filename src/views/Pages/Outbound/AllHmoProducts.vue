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
              :src="(col.props?.formattedRow as any)?.product_image || '/placeholder-product.png'" 
              :alt="(col.props?.formattedRow as any)?.product_name"
              class="w-12 h-12 object-cover rounded-md"
            >
          </span>

          <!-- Action Column -->
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
      <!-- Info Alert -->
      <div class="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm text-blue-800">
          Please ensure the transfer quantity is a multiple of 2.
        </p>
      </div>

      <!-- Batch Information Table -->
      <div class="overflow-x-auto">
        <div class="bg-white border text-lightBlack border-[#091E4224] rounded-xl shadow-sm overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="text-center bg-gray-100 medium-text text-text-default">
                <th class="p-2 text-left">
                  <input type="checkbox" class="rounded">
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
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0626 4.96699C11.5786 3.99299 12.4206 3.98899 12.9386 4.96699L20.0626 18.425C20.5786 19.399 20.1076 20.196 19.0056 20.196H4.99556C3.89356 20.196 3.42056 19.403 3.93856 18.425L11.0626 4.96699ZM11.2935 14.7071C11.481 14.8946 11.7353 15 12.0006 15C12.2658 15 12.5201 14.8946 12.7077 14.7071C12.8952 14.5196 13.0006 14.2652 13.0006 14V8.99998C13.0006 8.73477 12.8952 8.48041 12.7077 8.29288C12.5201 8.10534 12.2658 7.99998 12.0006 7.99998C11.7353 7.99998 11.481 8.10534 11.2935 8.29288C11.1059 8.48041 11.0006 8.73477 11.0006 8.99998V14C11.0006 14.2652 11.1059 14.5196 11.2935 14.7071ZM11.2935 17.7071C11.481 17.8946 11.7353 18 12.0006 18C12.2658 18 12.5201 17.8946 12.7077 17.7071C12.8952 17.5196 13.0006 17.2652 13.0006 17C13.0006 16.7348 12.8952 16.4804 12.7077 16.2929C12.5201 16.1053 12.2658 16 12.0006 16C11.7353 16 11.481 16.1053 11.2935 16.2929C11.1059 16.4804 11.0006 16.7348 11.0006 17C11.0006 17.2652 11.1059 17.5196 11.2935 17.7071Z" fill="#E56910"/>
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Transfer Information to Inventory?</h3>
          </div>
          <button @click="cancelTransfer" class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="mb-6">
          <p class="text-sm text-gray-600">
            You are about to transfer the information of this product 
            <strong>"{{ selectedProduct?.product_name }}"</strong> to inventory.
            This action will update the ERP quantity of this quantity!
          </p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3">
          <button @click="cancelTransfer" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button @click="confirmTransfer" class="px-4 py-2 text-sm font-medium text-black rounded-md hover:opacity-90" style="background-color: #F5CD47;">
            Transfer Information
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
        <!-- Success Icon -->
        <div class="mb-4 flex justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#22A06B"/>
            <path d="M18.7867 28.5635C18.4707 28.2275 18.0349 28.0298 17.5739 28.0134C17.113 27.997 16.6642 28.1632 16.3252 28.476C15.9861 28.7887 15.7843 29.2226 15.7635 29.6834C15.7427 30.1442 15.9047 30.5945 16.2142 30.9365L22.5352 37.7947C23.4749 38.7152 24.8749 38.7152 25.7447 37.8472L26.3817 37.219C28.6821 34.9566 30.9798 32.6915 33.2749 30.4237L33.3449 30.3537C35.4899 28.2399 37.6237 26.1147 39.7464 23.9785C40.0637 23.6463 40.2376 23.2028 40.2307 22.7435C40.2238 22.2842 40.0366 21.8461 39.7096 21.5236C39.3825 21.2011 38.9417 21.0202 38.4824 21.0198C38.0231 21.0194 37.582 21.1996 37.2544 21.5215C35.1416 23.6466 33.0182 25.7612 30.8844 27.8652L30.8144 27.9352C28.6151 30.1093 26.413 32.2804 24.2082 34.4487L18.7867 28.5635Z" fill="white"/>
          </svg>
        </div>

        <!-- Title and Message -->
        <h3 class="text-lg font-medium text-gray-900 mb-2">Information Transferred</h3>
        <p class="text-sm text-gray-600 mb-6">
          The product information <strong>"{{ selectedProduct?.product_name }}"</strong> has been 
          successfully been transferred to inventory.
        </p>

        <!-- Footer -->
        <button @click="closeSuccessModal" class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import { ref } from 'vue';
import type { TableColumn, FilterFields, FilterField } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');

// Modal states
const showTransferModal = ref(false);
const showConfirmModal = ref(false);
const showSuccessModal = ref(false);
const selectedProduct = ref<any>(null);

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
  showTransferModal.value = true;
};

// Modal functions
const closeTransferModal = () => {
  showTransferModal.value = false;
  selectedProduct.value = null;
};

const handleTransfer = () => {
  showTransferModal.value = false;
  showConfirmModal.value = true;
};

const confirmTransfer = () => {
  showConfirmModal.value = false;
  showSuccessModal.value = true;
};

const cancelTransfer = () => {
  showConfirmModal.value = false;
  showTransferModal.value = true;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  selectedProduct.value = null;
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
