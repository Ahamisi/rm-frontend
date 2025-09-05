<template>
    <SideBarModal 
      :is-open="isOpen" 
      width="xl"
      @close="$emit('close')"
    >
      <template #header>
        <OrderHeader 
          title="Order Details" 
          :reference="`REF: ${orderData?.order_no || ''}`"
          titleSize="md"
        />
      </template>
      
      <!-- Tab Navigation -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex gap-x-2 px-6">
          <button 
            v-for="tab in orderTabs" 
            :key="tab.id" 
            @click="activeTab = tab.id"
            :class="[
              'px-1 py-3 -mb-px text-sm font-medium border-b-2 transition-colors tab_text',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
  
      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto pb-[250px] px-6">
        <!-- Details Tab -->
        <div v-if="activeTab === 'details'" class="space-y-6">
          <!-- Order Information Grid -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="key">Customer's Name</span>
              <span class="value">{{ orderData?.customer_name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Customer Type</span>
              <span class="value">{{ orderData?.customer_type || 'Pharmacy' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Order By</span>
              <span class="value">{{ orderData?.customer_name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Agent Name</span>
              <span class="value">{{ orderData?.assigned }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Phone</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ orderData?.phone || '+234 809 123 4567' }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Store</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ orderData?.store_name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Loan Limit</span>
              <span class="value">₦2,000,000.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Amount to Reach Loan Limit</span>
              <span class="value">₦0.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Outstanding Loan</span>
              <span class="value">₦0.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Date</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ formatDate(orderData?.order_date) }}</span>
              </div>
            </div>
          </div>
  
          <hr class="border-gray-200">
  
          <!-- Order Summary -->
          <div class="mt-8">
            <h3 class="mb-4 text-lg font-medium text-[#44546F]">Order Summary</h3>
  
            <!-- Datatable -->
            <div class="order-summary-table">
              <Datatable 
                :items="orderItems" 
                :columns="orderProductColumns"
                :searchable="false"
                :sortable="false"
                :filterByDate="false"
                :exportable="false"
                :printable="false"
                :showPagination="false"
                pageName="OrderSummary"
              >
                <template #column="col">
                  <span v-if="col.props.column.field === 'product_name'">
                    <div class="font-medium">{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}</div>
                    <div class="text-xs text-gray-500">SKU: {{ (col.props.formattedRow as any)['sku'] || '' }}</div>
                  </span>
                  <span v-else-if="col.props.column.field === 'tags'">
                    <div class="flex flex-wrap gap-1">
                      <Pill 
                        v-if="typeof (col.props.formattedRow as any)[col.props.column.field || ''] === 'string'"
                        :type="getPillType((col.props.formattedRow as any)[col.props.column.field || ''])"
                        :text="(col.props.formattedRow as any)[col.props.column.field || '']"
                      />
                      <Pill 
                        v-else
                        v-for="tag in (col.props.formattedRow as any)[col.props.column.field || '']" 
                        :key="tag"
                        :type="getPillType(tag)"
                        :text="tag"
                      />
                    </div>
                  </span>
                  <span v-else-if="col.props.column.field === 'unit_price'">
                    ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                  </span>
                  <span v-else-if="col.props.column.field === 'price_total'">
                    ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                  </span>
                  <span v-else>{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}</span>
                </template>
              </Datatable>
            </div>
          </div>
        </div>
  
        <!-- Activities Tab -->
        <div v-else-if="activeTab === 'activities'" class="">
          <Activities :activities="orderActivities" :order-ref="orderData?.order_no || ''" />
        </div>
      </div>
  
      <!-- Fixed Totals Section - Only show on Details tab -->
      <div v-if="activeTab === 'details'" class="totals-section">
        <div class="space-y-2 px-6">
          <div class="flex justify-between items-center">
            <span class="text-[12px] text-[#44546F]">Subtotal:</span>
            <span class="text-[12px] text-[#44546F]">₦17,250.00</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[12px] text-[#44546F]">Tax:</span>
            <span class="text-[12px] text-[#44546F]">₦1,725.00</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[12px] text-[#44546F]">Shipping:</span>
            <span class="text-[12px] text-[#44546F]">₦500.00</span>
          </div>
          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
            <span class="text-[16px] font-medium text-[#44546F]">Total:</span>
            <span class="text-[16px] font-medium text-[#44546F]">₦187,000.00</span>
          </div>
        </div>
      </div>
  
  
  
      <!-- Footer buttons -->
      <template #footer="{ closeModal }">
        <div class="flex justify-end space-x-3">
          <button @click="closeModal" type="button" class="approve_btn">
            Close
          </button>
        </div>
      </template>
    </SideBarModal>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import SideBarModal from '@/views/Components/SideBarModal.vue';
  import OrderHeader from '@/views/Components/ui/OrderHeader.vue';
  import Activities from '@/views/Components/Activities.vue';
  import Pill from '@/views/Components/ui/Pill.vue';
  import Datatable from '@/views/Components/Datatable/Datatable.vue';
  import dayjs from 'dayjs';
  
  interface Props {
    isOpen: boolean;
    orderData: any;
    orderItems?: any[];
    orderActivities?: any[];
    initialActiveTab?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    orderItems: () => [],
    orderActivities: () => [],
    initialActiveTab: 'details'
  });
  
  const emit = defineEmits<{
    close: []
  }>();
  
  // Tab state
  const activeTab = ref(props.initialActiveTab);
  const orderTabs = [
    { id: 'details', label: 'Details' },
    { id: 'activities', label: 'Activities' }
  ];
  
  // Watch for changes to initialActiveTab prop
  watch(() => props.initialActiveTab, (newTab) => {
    if (newTab) {
      activeTab.value = newTab;
    }
  });
  
  // Order products table columns
  const orderProductColumns = ref([
    { field: 'product_name', label: 'Product', sortable: false },
    { field: 'tags', label: 'Tags', sortable: false },
    { field: 'quantity_delivered', label: 'Quantity', sortable: false },
    { field: 'unit_price', label: 'Unit Price', sortable: false },
    { field: 'price_total', label: 'Total', sortable: false }
  ]);
  
  // Utility functions
  const formatDate = (date: string) => {
    return dayjs(date).format('M/D/YYYY');
  };
  
  const getPillType = (tag: string) => {
    switch (tag) {
      case 'Cash and Carry':
        return 'cash-and-carry';
      case 'Controlled':
        return 'controlled';
      case 'Hospital':
        return 'hospital';
      default:
        return 'hospital';
    }
  };
  </script>
  
  <style scoped>
  /* Modal styles */
  .key {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
  }
  
  .value {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
  }
  
  .order-summary-table {
    font-size: 12px;
    color: #172B4D;
  }
  
  .order-summary-table table {
    font-size: 12px;
  }
  
  .order-summary-table th,
  .order-summary-table td {
    font-size: 12px !important;
    color: #172B4D !important;
  }
  
  .order-summary-table .bg-gray-100 {
    background-color: #f8f9fa !important;
  }
  
  .totals-section {
    background-color: #F7F8F9;
    border-top: 1px solid #091E4224;
    border-bottom: 1px solid #091E4224;
    margin: 0 -24px;
    padding: 16px 24px;
    position: sticky;
    bottom: 0;
    z-index: 10;
    margin-top: 24px;
  }
  
  .tab_text {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.25px;
  }
  
  .approve_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(12, 102, 228, 1);
    color: white;
  }
  </style>