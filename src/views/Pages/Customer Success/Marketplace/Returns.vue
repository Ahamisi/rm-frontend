<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Marketplace / Marketplace Product Returns" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <Datatable
        :items="productReturns"
        :columns="returnColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="ProductReturns"
      >
        <template #header_actions>
          <Button 
            type="blue-btn" 
            :onClick="downloadReturnsReport"
            classStyle="px-6 py-2 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2.5V12.5M10 12.5L6.25 8.75M10 12.5L13.75 8.75M4.16667 15.8333H15.8333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Download Returns Report
          </Button>
        </template>

        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <button 
              @click="printReturn(col.props?.formattedRow)"
              class="p-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              title="Print Return"
            >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8 5V3.56C13.8 2.66392 13.8 2.21587 13.6256 1.87362C13.4722 1.57256 13.2274 1.32779 12.9264 1.17439C12.5841 1 12.1361 1 11.24 1H6.76C5.86392 1 5.41587 1 5.07362 1.17439C4.77256 1.32779 4.52779 1.57256 4.37439 1.87362C4.2 2.21587 4.2 2.66392 4.2 3.56V5M4.2 13.8C3.45602 13.8 3.08403 13.8 2.77883 13.7182C1.95061 13.4963 1.3037 12.8494 1.08178 12.0212C1 11.716 1 11.344 1 10.6V8.84C1 7.49587 1 6.82381 1.26158 6.31042C1.49168 5.85883 1.85883 5.49168 2.31042 5.26158C2.82381 5 3.49587 5 4.84 5H13.16C14.5041 5 15.1762 5 15.6896 5.26158C16.1412 5.49168 16.5083 5.85883 16.7384 6.31042C17 6.82381 17 7.49587 17 8.84V10.6C17 11.344 17 11.716 16.9182 12.0212C16.6963 12.8494 16.0494 13.4963 15.2212 13.7182C14.916 13.8 14.544 13.8 13.8 13.8M11.4 7.8H13.8M6.76 17H11.24C12.1361 17 12.5841 17 12.9264 16.8256C13.2274 16.6722 13.4722 16.4274 13.6256 16.1264C13.8 15.7841 13.8 15.3361 13.8 14.44V13.16C13.8 12.2639 13.8 11.8159 13.6256 11.4736C13.4722 11.1726 13.2274 10.9278 12.9264 10.7744C12.5841 10.6 12.1361 10.6 11.24 10.6H6.76C5.86392 10.6 5.41587 10.6 5.07362 10.7744C4.77256 10.9278 4.52779 11.1726 4.37439 11.4736C4.2 11.8159 4.2 12.2639 4.2 13.16V14.44C4.2 15.3361 4.2 15.7841 4.37439 16.1264C4.52779 16.4274 4.77256 16.6722 5.07362 16.8256C5.41587 17 5.86392 17 6.76 17Z" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Column definitions for Product Returns
const returnColumns: TableColumn[] = [
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
];

// Mock Product Returns data
const productReturns = ref([
  {
    id: 87,
    order_no: 87,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Dave Free'
  },
  {
    id: 1656493689,
    order_no: '1656493689-254',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Michael Raymond'
  },
  {
    id: 25,
    order_no: 25,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  },
  {
    id: 30,
    order_no: 30,
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  },
  {
    id: 45,
    order_no: 45,
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Femi Babalola'
  },
  {
    id: 52,
    order_no: 52,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Sarah Badmus'
  },
  {
    id: 67,
    order_no: 67,
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Josh Michael'
  },
  {
    id: 73,
    order_no: 73,
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Dave Free'
  },
  {
    id: 81,
    order_no: 81,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Michael Raymond'
  },
  {
    id: 94,
    order_no: 94,
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Esther Joel'
  },
  {
    id: 105,
    order_no: 105,
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Femi Babalola'
  },
  {
    id: 112,
    order_no: 112,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Sarah Badmus'
  },
  {
    id: 128,
    order_no: 128,
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Josh Michael'
  },
  {
    id: 135,
    order_no: 135,
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.0...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Dave Free'
  },
  {
    id: 142,
    order_no: 142,
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    product_name: 'UNIQUE 10% DEXTROSE IN WAT...',
    reason: 'Customer Error',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025',
    admin: 'Michael Raymond'
  }
]);

// Download function
const downloadReturnsReport = () => {
  toastMessage.value = 'Return Reports Download Successful';
  showToast.value = true;
};

// Print function
const printReturn = (returnItem: any) => {
  toastMessage.value = 'Print Return Successful';
  showToast.value = true;
};

</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  padding-top: 1rem;
}
</style>