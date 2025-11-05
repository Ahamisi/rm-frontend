<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle :title="pageTitle" class="px-6 mb-4" />

      <!-- Tabs -->
      <Tabs :tabs="productTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <template #default>
          <div class="flex items-center gap-3 ml-auto mb-1">
            <div class="relative" ref="downloadDropdownRef">
              <button
                @click="toggleDownloadDropdown"
                class="flex items-center gray-btn gap-2 px-4 py-2 rounded text-sm font-medium bg-[#091E420F]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                    <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                </svg>

                <span>Download</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="#44546F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <!-- Download Dropdown -->
              <div
                v-if="showDownloadDropdown"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
              >
                <div class="py-1">
                  <button
                    @click="downloadReport('csv')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download Stock Report
                  </button>
                  <button
                    @click="downloadReport('excel')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Download Active Stock Report
                  </button>
               
                </div>
              </div>
            </div>
          </div>
        </template>
      </Tabs>
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <!-- Active Products Tab -->
      <Datatable
        v-if="activeTab === 'Active Products'"
        :items="activeProducts"
        :columns="activeProductColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="ActiveProducts"
      >
        <template #column="col">
          <!-- Product Image Column -->
          <span v-if="col.props?.column?.field === 'product_image'">
            <img 
              :src="(col.props?.formattedRow as any)?.product_image || '/supplier-placeholder.png'"
              :alt="(col.props?.formattedRow as any)?.product_name"
              class="w-10 h-10 object-cover rounded"
            />
          </span>

          <!-- Currency Columns -->
          <span v-else-if="col.props?.column?.field === 'hmo_price' || col.props?.column?.field === 'pharmacy_price'">
            {{ formatCurrency((col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || 0) }}
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <button 
              @click="viewProduct(col.props?.formattedRow)"
              class="text-gray-500 hover:text-[#172B4D]"
              title="View Product"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9974 15C6.2174 15 3.33156 11.45 3.33156 10C3.33156 8.33254 6.21406 5.00004 9.99823 5.00004C13.6449 5.00004 16.6632 8.31087 16.6632 10C16.6632 11.45 13.7782 15 9.99823 15H9.9974ZM9.99823 3.33337C5.3974 3.33337 1.66406 7.36754 1.66406 10C1.66406 12.5717 5.4774 16.6667 9.9974 16.6667C14.5166 16.6667 18.3307 12.5717 18.3307 10C18.3307 7.36754 14.5974 3.33337 9.9974 3.33337" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97823 11.6534C9.05906 11.6534 8.31156 10.9059 8.31156 9.98671C8.31156 9.06754 9.05906 8.32004 9.97823 8.32004C10.8982 8.32004 11.6449 9.06754 11.6449 9.98671C11.6449 10.9059 10.8982 11.6534 9.97823 11.6534ZM9.97823 6.65337C8.1399 6.65337 6.6449 8.14837 6.6449 9.98671C6.6449 11.825 8.1399 13.32 9.97823 13.32C11.8174 13.32 13.3116 11.825 13.3116 9.98671C13.3116 8.14837 11.8174 6.65337 9.97823 6.65337Z" fill="#44546F"/>
              </svg>
            </button>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>

      <!-- Inactive Products Tab -->
      <Datatable
        v-else-if="activeTab === 'Inactive Products'"
        :items="inactiveProducts"
        :columns="activeProductColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="InactiveProducts"
      >
        <template #column="col">
          <!-- Product Image Column -->
          <span v-if="col.props?.column?.field === 'product_image'">
            <img
              :src="(col.props?.formattedRow as any)?.product_image || '/supplier-placeholder.png'"
              :alt="(col.props?.formattedRow as any)?.product_name"
              class="w-10 h-10 object-cover rounded"
            />
          </span>

          <!-- Currency Columns -->
          <span v-else-if="col.props?.column?.field === 'hmo_price' || col.props?.column?.field === 'pharmacy_price'">
            {{ formatCurrency((col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || 0) }}
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <button
              @click="viewProduct(col.props?.formattedRow)"
              class="text-gray-500 hover:text-[#172B4D]"
              title="View Product"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9974 15C6.2174 15 3.33156 11.45 3.33156 10C3.33156 8.33254 6.21406 5.00004 9.99823 5.00004C13.6449 5.00004 16.6632 8.31087 16.6632 10C16.6632 11.45 13.7782 15 9.99823 15H9.9974ZM9.99823 3.33337C5.3974 3.33337 1.66406 7.36754 1.66406 10C1.66406 12.5717 5.4774 16.6667 9.9974 16.6667C14.5166 16.6667 18.3307 12.5717 18.3307 10C18.3307 7.36754 14.5974 3.33337 9.9974 3.33337" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97823 11.6534C9.05906 11.6534 8.31156 10.9059 8.31156 9.98671C8.31156 9.06754 9.05906 8.32004 9.97823 8.32004C10.8982 8.32004 11.6449 9.06754 11.6449 9.98671C11.6449 10.9059 10.8982 11.6534 9.97823 11.6534ZM9.97823 6.65337C8.1399 6.65337 6.6449 8.14837 6.6449 9.98671C6.6449 11.825 8.1399 13.32 9.97823 13.32C11.8174 13.32 13.3116 11.825 13.3116 9.98671C13.3116 8.14837 11.8174 6.65337 9.97823 6.65337Z" fill="#44546F"/>
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
import Tabs from "@/views/Components/Tabs.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumn } from '@/types';
import { onClickOutside } from '@vueuse/core';

const router = useRouter();

const activeTab = ref('Active Products');
const showDownloadDropdown = ref(false);
const downloadDropdownRef = ref<HTMLElement | null>(null);
const showToast = ref(false);
const toastMessage = ref('');

// Dynamic page title based on active tab
const pageTitle = computed(() => {
  return `Business Development / Products Management / All HMO Products / ${activeTab.value}`;
});

const productTabs = ref([
  'Active Products',
  'Inactive Products'
]);

// Columns for Active/Inactive Products
const activeProductColumns: TableColumn[] = [
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
];

// Mock data for Active Products
const activeProducts = ref([
  {
    id: 87,
    product_image: '/supplier-placeholder.png',
    product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 100',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 54,
    product_image: '/supplier-placeholder.png',
    product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1 X 100',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 25,
    product_image: '/supplier-placeholder.png',
    product_name: 'KESSINGTON KESARTEM TABLET 80/480X6',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 30,
    product_image: '/supplier-placeholder.png',
    product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 51,
    product_image: '/supplier-placeholder.png',
    product_name: 'ABONIKI BALM 25G',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 21,
    product_image: '/supplier-placeholder.png',
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 35,
    product_image: '/supplier-placeholder.png',
    product_name: 'ACCU CHEK TEST STRIP X 50',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 23,
    product_image: '/supplier-placeholder.png',
    product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 33,
    product_image: '/supplier-placeholder.png',
    product_name: 'ACEPOL (PARACETAMOL) SUSPENSION 100ML',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  },
  {
    id: 87,
    product_image: '/supplier-placeholder.png',
    product_name: 'ACIPRO (CIPROFLOXACIN) TABLET 500MG X 10',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    hmo_price: 96700.00,
    pharmacy_price: 96700.00,
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    shelf_location: 'HA006'
  }
]);

// Mock data for Inactive Products (same structure)
const inactiveProducts = ref([
  ...activeProducts.value.map(p => ({ ...p, id: p.id + 100 }))
]);

// Removed stockReports - Product Stock Reports tab removed

// Format currency to Nigerian Naira
const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Handle tab change
const handleTabChange = (tab: string | { name: string }, index: number) => {
  const tabName = typeof tab === 'string' ? tab : tab.name;
  activeTab.value = tabName;
};

// Toggle download dropdown
const toggleDownloadDropdown = () => {
  showDownloadDropdown.value = !showDownloadDropdown.value;
};

// Download report
const downloadReport = (format: string) => {
  console.log(`Downloading ${activeTab.value} as ${format}`);
  toastMessage.value = `Downloaded ${activeTab.value} as ${format.toUpperCase()}`;
  showToast.value = true;
  showDownloadDropdown.value = false;
};

// View product
const viewProduct = (product: any) => {
  // Navigate to product dashboard page
  router.push({
    name: 'tech-business-dev.products-management.view-hmo-product',
    params: { id: product.id },
    query: { name: product.product_name }
  });
};

// Close dropdown when clicking outside
onClickOutside(downloadDropdownRef, () => {
  showDownloadDropdown.value = false;
});

</script>

<style>
.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  padding-top: 1rem;
}
</style>

