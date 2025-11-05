<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <div class="px-6 pt-4 pb-2">
      <PageTitle :title="pageTitle" />
    </div>

    <!-- White Container for Overview Tab -->
    <div class="m-4 bg-white rounded-lg shadow-sm mb-0 mt-4" v-if="activeTab === 'Overview'">
      <!-- Tabs -->
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>

      <!-- Controls and Actions -->
      <div class="px-6 py-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <button @click="toggleFilterDropdown"
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.99999 13H17L18 11H5.99999L6.99999 13ZM3.99299 6C3.44499 6 3.20299 6.405 3.44699 6.895L3.99999 8H20L20.553 6.895C20.8 6.4 20.555 6 20.007 6H3.99299ZM10.778 17.556C10.8509 17.6861 10.9561 17.7953 11.0834 17.8731C11.2107 17.9508 11.3559 17.9945 11.505 18H12.495C12.774 18 13.1 17.8 13.222 17.556L14 16H9.99999L10.778 17.556Z"
                  fill="#44546F" />
              </svg>
              Filter
            </button>
            <div class="flex items-center gap-1 text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5Z"
                  fill="#626F86" />
              </svg>
              <span class="text-sm">This month: February, 2025</span>
            </div>
          </div>
          <Button type="blue-btn" :onClick="handleDownloadReport">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
          <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
          </svg>

            Download Report
          </Button>
        </div>

        <!-- Main Content with Sidebar -->
        <div class="flex gap-6">
          <!-- Left Sidebar - Sections Navigation -->
          <div class="w-64 flex-shrink-0">
            <div class="bg-white rounded-lg shadow-sm border p-4 sticky" style="top: 120px;">
              <h3 class="text-sm font-semibold text-gray-900 mb-4">Sections</h3>
              <nav class="space-y-2">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  @click="scrollToSection(section.id)"
                  :class="[
                    'block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  ]"
                >
                  {{ section.label }}
                </a>
              </nav>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="flex-1">
            <!-- Sales & Customer Section -->
            <section
              id="sales-customer"
              ref="salesCustomerRef"
              class="mb-6"
              style="scroll-margin-top: 200px;"
            >
              <h2 class="text-md font-semibold text-gray-900 mb-4">Sales & Customer</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPICard title="Customer Sign Ups" :value="2" :percentage="12.95" />
                <KPICard title="Customer Orders" :value="0" :percentage="12.95" />
                <KPICard title="Sales" :value="25" :percentage="12.95" />
                <KPICard title="Delivered Sales" :value="271" :percentage="12.95" />
                <KPICard title="Total Customers" :value="0" :percentage="12.95" />
                <KPICard title="Hospitals" :value="0" :percentage="12.95" />
                <KPICard title="Pharmacies" :value="0" :percentage="12.95" />
                <KPICard title="Chemists" :value="0" :percentage="12.95" />
                <KPICard title="Distributor" :value="0" :percentage="12.95" />
                <KPICard title="Mega Distributor" :value="0" :percentage="12.95" />
                <KPICard title="Super Distributor" :value="0" :percentage="12.95" />
              </div>
            </section>

            <!-- Orders Section -->
            <section
              id="orders"
              ref="ordersRef"
              class="mb-6"
              style="scroll-margin-top: 200px;"
            >
              <h2 class="text-md font-semibold text-gray-900 mb-4">Orders</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPICard title="Orders" :value="0" :percentage="12.95" />
                <KPICard title="Pending Orders" :value="0" :percentage="12.95" />
                <KPICard title="Delivered Orders" :value="25" :percentage="12.95" />
                <KPICard title="Cancelled Orders" :value="271" :percentage="12.95" />
                <KPICard title="Average Basket Value" :value="0" :percentage="12.95" />
                <KPICard title="Average Basket Size" :value="0" :percentage="12.95" />
                <KPICard title="Average Margin (%)" :value="0" :percentage="12.95" />
              </div>
            </section>

            <!-- Inventory & Store Section -->
            <section
              id="inventory-store"
              ref="inventoryStoreRef"
              class="mb-6"
              style="scroll-margin-top: 200px;"
            >
              <h2 class="text-md font-semibold text-gray-900 mb-4">Inventory & Store</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPICard title="Stores" :value="0" :percentage="12.95" />
                <KPICard title="Pending Stores" :value="25" :percentage="12.95" />
                <KPICard title="Total Products" :value="0" :percentage="12.95" />
                <KPICard title="Total Stock Value" :value="271" :percentage="12.95" />
                <KPICard title="Total In-Stock Products" :value="0" :percentage="12.95" />
              </div>
            </section>

            <!-- Personnel Section -->
            <section
              id="personnel"
              ref="personnelRef"
              class="mb-6"
              style="scroll-margin-top: 200px;"
            >
              <h2 class="text-md font-semibold text-gray-900 mb-4">Personnel</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPICard title="Total Agents" :value="0" :percentage="12.95" />
                <KPICard title="Total Drivers" :value="25" :percentage="12.95" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Overview Tab -->

    <!-- Pending Stores Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Pending Stores'">
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="pendingStores"
          :columns="storeColumns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="PendingStores"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Pending Orders Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Pending Orders'">
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="pendingOrders"
          :columns="orderColumns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="PendingOrders"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Product Sales Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Product Sales'">
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="productSales"
          :columns="productSalesColumns"
          :searchable="true"
          :filterByDate="true"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="ProductSales"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Agent Sales Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Agent Sales'">
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="agentSales"
          :columns="agentSalesColumns"
          :searchable="true"
          :filterByDate="true"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="AgentSales"
        >
          <template #column="col">
            <span v-if="col.props?.column?.field === 'agent_name'">
              <div class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#626F86"/>
                  <path d="M8 9C5.23858 9 3 11.2386 3 14V15H13V14C13 11.2386 10.7614 9 8 9Z" fill="#626F86"/>
                </svg>
                {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
              </div>
            </span>
            <span v-else>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- State Sales Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'State Sales'">
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="stateSales"
          :columns="stateSalesColumns"
          :searchable="true"
          :filterByDate="true"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="StateSales"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Download Report Modal -->
    <UniversalCenteredModal
      :show="showDownloadReportModal"
      @close="showDownloadReportModal = false"
    >
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Download Report</h3>
      </template>

      <template #body>
        <div class="space-y-6">
          <!-- Date Range -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From</label>
              <DateInput
                v-model="downloadReportForm.fromDate"
                placeholder="Select date"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">To</label>
              <DateInput
                v-model="downloadReportForm.toDate"
                placeholder="Select date"
              />
            </div>
          </div>

          <!-- Include in Report Dropdown -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Include in Report</label>
            <SelectField
              v-model="downloadReportForm.includeInReport"
              :options="includeInReportOptions"
              placeholder="None"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <Button type="gray-btn" :onClick="() => showDownloadReportModal = false">Cancel</Button>
        <Button type="blue-btn" :onClick="handleDownloadReportSubmit">Download</Button>
      </template>
    </UniversalCenteredModal>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import NavlinkTab from "@/views/Components/procurement/NavlinkTab.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";
import DateInput from "@/views/Components/ui/DateInput.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import { ref, computed, onMounted, onUnmounted, nextTick, defineComponent, h } from 'vue';
import type { TableColumn, Option } from '@/types';

const activeTab = ref('Overview');
const isFilterDropdownOpen = ref(false);
const activeSection = ref('sales-customer');
const showDownloadReportModal = ref(false);

// Download Report Form
const downloadReportForm = ref({
  fromDate: '',
  toDate: '',
  includeInReport: null as Option | null
});

const includeInReportOptions: Option[] = [
  { id: 1, name: 'None' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Orders' },
  { id: 4, name: 'Customers' },
  { id: 5, name: 'Inventory' }
];

const tabLinks = [
  { label: 'Overview', value: 'Overview' },
  { label: 'Pending Stores', value: 'Pending Stores', count: 25 },
  { label: 'Pending Orders', value: 'Pending Orders', count: 0 },
  { label: 'Product Sales', value: 'Product Sales' },
  { label: 'Agent Sales', value: 'Agent Sales' },
  { label: 'State Sales', value: 'State Sales' }
];

const sections = [
  { id: 'sales-customer', label: 'Sales & Customer' },
  { id: 'orders', label: 'Orders' },
  { id: 'inventory-store', label: 'Inventory & Store' },
  { id: 'personnel', label: 'Personnel' }
];

const pageTitle = computed(() => {
  return `Dashboard / ${activeTab.value}`;
});

const handleTabChange = (value: string) => {
  activeTab.value = value;
};

const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

const handleDownloadReport = () => {
  showDownloadReportModal.value = true;
};

const handleDownloadReportSubmit = () => {
  // Handle download report submission
  console.log('Download report with:', downloadReportForm.value);
  // Reset form
  downloadReportForm.value = {
    fromDate: '',
    toDate: '',
    includeInReport: null
  };
  showDownloadReportModal.value = false;
  // Show success toast or modal
};

// Section refs
const salesCustomerRef = ref<HTMLElement | null>(null);
const ordersRef = ref<HTMLElement | null>(null);
const inventoryStoreRef = ref<HTMLElement | null>(null);
const personnelRef = ref<HTMLElement | null>(null);

const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  
  nextTick(() => {
    let targetElement: HTMLElement | null = null;
    
    if (sectionId === 'sales-customer' && salesCustomerRef.value) {
      targetElement = salesCustomerRef.value;
    } else if (sectionId === 'orders' && ordersRef.value) {
      targetElement = ordersRef.value;
    } else if (sectionId === 'inventory-store' && inventoryStoreRef.value) {
      targetElement = inventoryStoreRef.value;
    } else if (sectionId === 'personnel' && personnelRef.value) {
      targetElement = personnelRef.value;
    }
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      setTimeout(() => {
        const rect = targetElement!.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        // Account for header, navigation, page title, and tabs
        const headerOffset = 200;
        const offsetPosition = elementTop - headerOffset;
        
        if (offsetPosition > 0) {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  });
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + 150;

  if (personnelRef.value) {
    const rect = personnelRef.value.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    if (scrollPosition >= top - 150) {
      if (activeSection.value !== 'personnel') {
        activeSection.value = 'personnel';
      }
      return;
    }
  }
  
  if (inventoryStoreRef.value) {
    const rect = inventoryStoreRef.value.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    if (scrollPosition >= top - 150) {
      if (activeSection.value !== 'inventory-store') {
        activeSection.value = 'inventory-store';
      }
      return;
    }
  }
  
  if (ordersRef.value) {
    const rect = ordersRef.value.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    if (scrollPosition >= top - 150) {
      if (activeSection.value !== 'orders') {
        activeSection.value = 'orders';
      }
      return;
    }
  }
  
  if (salesCustomerRef.value) {
    const rect = salesCustomerRef.value.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    if (scrollPosition >= top - 150) {
      if (activeSection.value !== 'sales-customer') {
        activeSection.value = 'sales-customer';
      }
      return;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// KPI Card Component
const KPICard = defineComponent({
  props: {
    title: String,
    value: [Number, String],
    percentage: Number
  },
  setup(props) {
    return () => {
      const uniqueId = `graph_${Math.random().toString(36).substr(2, 9)}`;
      return h('div', {
        class: 'bg-white rounded-lg shadow-sm border p-6'
      }, [
        h('div', {
          class: 'flex items-start justify-between mb-4'
        }, [
          h('h3', {
            class: 'text-sm font-medium text-gray-700'
          }, props.title)
        ]),
        h('div', {
          class: 'flex items-baseline justify-between'
        }, [
          h('div', [
            h('div', {
              class: 'flex items-center gap-2'
            }, [
              h('p', {
                class: 'text-xl text-gray-900'
              }, String(props.value)),
              h('div', {
                class: 'flex items-center gap-1'
              }, [
                h('svg', {
                  width: '16',
                  height: '16',
                  viewBox: '0 0 16 16',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg'
                }, [
                  h('path', {
                    'fill-rule': 'evenodd',
                    'clip-rule': 'evenodd',
                    d: 'M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z',
                    fill: '#216E4E'
                  })
                ]),
                h('span', {
                  class: 'text-sm font-medium text-green-600'
                }, `↑ ${props.percentage}%`)
              ])
            ]),
            h('p', {
              class: 'text-xs text-gray-600 mt-1'
            }, 'Compared to last month')
          ]),
          h('div', {
            class: 'w-10 h-7'
          }, [
            h('svg', {
              width: '41',
              height: '29',
              viewBox: '0 0 41 29',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg'
            }, [
              h('path', {
                d: 'M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z',
                fill: `url(#paint0_linear_${uniqueId})`
              }),
              h('path', {
                d: 'M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1',
                stroke: '#22A06B'
              }),
              h('defs', [
                h('linearGradient', {
                  id: `paint0_linear_${uniqueId}`,
                  x1: '20.5',
                  y1: '1',
                  x2: '20.5',
                  y2: '29',
                  gradientUnits: 'userSpaceOnUse'
                }, [
                  h('stop', {
                    'stop-color': '#22A06B',
                    'stop-opacity': '0.2'
                  }),
                  h('stop', {
                    offset: '1',
                    'stop-color': '#22A06B',
                    'stop-opacity': '0'
                  })
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});

// Store Columns
const storeColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'State', field: 'state', sortable: true },
  { label: 'LGA', field: 'lga', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Order Columns
const orderColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Amount', field: 'amount', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Status', field: 'status', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
];

// Product Sales Columns
const productSalesColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Product Name', field: 'product_name', sortable: true },
  { label: 'No. of Sales (in packs)', field: 'sales_count', sortable: true }
];

// Agent Sales Columns
const agentSalesColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Agent Name', field: 'agent_name', sortable: true },
  { label: 'Total Sales', field: 'total_sales', sortable: true },
  { label: 'Total Revenue', field: 'total_revenue', sortable: true }
];

// State Sales Columns
const stateSalesColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Total Sales', field: 'total_sales', sortable: true },
  { label: 'Total Revenue', field: 'total_revenue', sortable: true }
];

// Mock data for Pending Stores
const pendingStores = ref([
  { id: 1, store_name: 'Emeka Pharmacy', customer_name: 'Emeka Kalu', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 2, store_name: 'Emma Bros Pharmacy', customer_name: 'Emmanuel Aba', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 3, store_name: 'Xela pharmacy', customer_name: 'Nyerhovwo Omuvwie', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 4, store_name: 'Emeka Pharmacy', customer_name: 'Emeka Kalu', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 5, store_name: 'Emma Bros Pharmacy', customer_name: 'Emmanuel Aba', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' }
]);

// Mock data for Pending Orders
const pendingOrders = ref([
  { id: 1, order_no: 'ORD-001', customer_name: 'Emeka Kalu', store_name: 'Emeka Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 2, order_no: 'ORD-002', customer_name: 'Emmanuel Aba', store_name: 'Emma Bros Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 3, order_no: 'ORD-003', customer_name: 'Nyerhovwo Omuvwie', store_name: 'Xela pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 4, order_no: 'ORD-004', customer_name: 'Emeka Kalu', store_name: 'Emeka Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 5, order_no: 'ORD-005', customer_name: 'Emmanuel Aba', store_name: 'Emma Bros Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' }
]);

// Mock data for Product Sales
const productSales = ref([
  { id: 87, product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE 21G X 100', sales_count: 21 },
  { id: 54, product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE 21G 1 X 100', sales_count: 21 },
  { id: 25, product_name: 'KESSINGTON KESARTEM TABLET 80/480X6', sales_count: 21 },
  { id: 30, product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25ML', sales_count: 21 },
  { id: 51, product_name: 'ABONIKI BALM 25G', sales_count: 21 },
  { id: 21, product_name: 'ACCU CHEK ACTIVE GLUCOMETER', sales_count: 21 },
  { id: 35, product_name: 'ACCU CHEK TEST STRIP X 50', sales_count: 21 },
  { id: 23, product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET', sales_count: 21 },
  { id: 33, product_name: 'ACEPOL (PARACETAMOL) SUSPENSION 60ML', sales_count: 21 },
  { id: 87, product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10', sales_count: 21 },
  { id: 88, product_name: 'ABONIKI BALM 25G', sales_count: 21 },
  { id: 81, product_name: 'ACCU CHEK ACTIVE GLUCOMETER', sales_count: 21 },
  { id: 80, product_name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10', sales_count: 21 }
]);

// Mock data for Agent Sales
const agentSales = ref([
  { id: 87, agent_name: 'Babajide Raji', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 54, agent_name: 'Daniel Makinde', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 25, agent_name: 'Esther Joel', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 30, agent_name: 'Esther Joel', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 51, agent_name: 'Esther Joel', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 21, agent_name: 'Femi Babalola', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 35, agent_name: 'Femi Babalola', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 23, agent_name: 'Sarah Badmus', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 33, agent_name: 'Sarah Badmus', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 87, agent_name: 'Josh Michael', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 88, agent_name: 'Josh Michael', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 81, agent_name: 'Josh Michael', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 80, agent_name: 'Femi Babalola', total_sales: 21, total_revenue: '₦2,055,043.00' }
]);

// Mock data for State Sales
const stateSales = ref([
  { id: 87, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 54, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 25, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 30, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 51, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 21, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 35, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 23, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 33, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 87, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 88, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 81, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' },
  { id: 80, state: 'Abia State', total_sales: 21, total_revenue: '₦2,055,043.00' }
]);
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>
