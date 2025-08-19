<template>
  <div v-if="loading" class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <LoadingState />
  </div>
  
  <div class="erp_dashboard_wrapper">
    <!-- Simple breadcrumb only -->
    <div class="px-6 py-4 bg-gray-50">
      <h1 class="text-sm text-gray-600">Dashboard</h1>
    </div>
    
    <!-- Main Content -->
    <div class="px-6 py-4 bg-[#f9fafb] min-h-[calc(100vh-120px)]">

      <!-- Two Column Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Daily Fulfillment Stats (2/3 width) -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Daily Fulfillment Stats</h2>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z" fill="#626F86"/>
                </svg>
                Today, Feb 19, 2025
              </div>
            </div>

            <!-- Datatable with integrated search and filter -->
            <Datatable 
              :url="fulfillmentStatsUrl" 
              :filterByDate="true" 
              :searchable="true"
              :columns="fulfillmentColumns" 
              pageName="OutboundFulfillmentStats"
              :filterFields="filterFields"
            >
              <template #column="col">
                <span v-if="col.props.column.field === 'agent_name'">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-blue-600">{{ col.props.row.agent_name.charAt(0) }}</span>
                    </div>
                    <span>{{ col.props.row.agent_name }}</span>
                  </div>
                </span>
                <span v-else-if="col.props.column.field === 'check_in_time'">
                  {{ formatTime(col.props.row.check_in_time) }}
                </span>
                <span v-else-if="col.props.column.field === 'check_out_time'">
                  {{ formatTime(col.props.row.check_out_time) }}
                </span>
                <span v-else-if="col.props.column.field === 'productivity_score'">
                  {{ col.props.row.productivity_score }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>

        <!-- Right Column - Order Time Tracker (1/3 width) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border card attention-container p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Order Time Tracker</h3>
              <div class="relative">
                <select 
                  v-model="selectedYear" 
                  class="appearance-none px-3 py-2 pr-8 text-sm bg-white rounded-md focus:outline-none cursor-pointer"
                  style="border: 2px solid #091E4224;"
                >
                  <option v-for="option in yearOptions" :key="option.id" :value="option">
                    {{ option.name }}
                  </option>
                </select>
                <!-- Custom caret down icon -->
                <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29207 10.2929C8.10526 10.4818 8.00049 10.7368 8.00049 11.0024C8.00049 11.2681 8.10526 11.523 8.29207 11.7119L11.2311 14.6769C11.4491 14.8919 11.7311 14.9989 12.0101 14.9989C12.2891 14.9989 12.5661 14.8919 12.7791 14.6769L15.7091 11.7219C15.8956 11.5329 16.0002 11.278 16.0002 11.0124C16.0002 10.7469 15.8956 10.492 15.7091 10.3029C15.6172 10.2098 15.5078 10.1358 15.3871 10.0853C15.2664 10.0347 15.1369 10.0087 15.0061 10.0087C14.8752 10.0087 14.7457 10.0347 14.625 10.0853C14.5043 10.1358 14.3949 10.2098 14.3031 10.3029L12.0051 12.6199L9.69807 10.2929C9.60603 10.2001 9.49652 10.1264 9.37586 10.0762C9.25521 10.0259 9.12578 10 8.99507 10C8.86435 10 8.73493 10.0259 8.61427 10.0762C8.49361 10.1264 8.38411 10.2001 8.29207 10.2929Z" fill="#44546F"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Time Tracker Stages -->
            <div class="space-y-0">
              <div v-for="(stage, index) in timeTrackerStages" :key="stage.id" 
                   class="relative" 
                   :style="{ marginBottom: index < timeTrackerStages.length - 1 ? '70px' : '0' }">
                <!-- Vertical connecting line (except for last item) - with 8px gap from icons -->
                <div v-if="index < timeTrackerStages.length - 1" 
                     class="absolute left-4 w-px bg-gray-300 z-0"
                     :style="{ top: '40px', height: '54px' }"></div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <!-- Department Icon -->
                    <div class="w-8 h-8 rounded-full flex items-center justify-center z-10 relative" 
                         :style="{ backgroundColor: stage.color }">
                      <div v-html="getDepartmentIcon(stage.department)" class="w-4 h-4"></div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-800">{{ stage.department }}</div>
                      <div class="text-xs text-gray-500">{{ stage.process }}</div>
                    </div>
                  </div>
                  <div class="text-sm font-semibold text-gray-700">{{ stage.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DateFilter from "@/views/Components/Dashboards/DateFilter.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SelectField from "@/views/Components/procurement/ui/SelectField.vue";
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { toLocale } from '@/views/helpers/useLocale';
import dayjs from 'dayjs';
import type { TableColumn, FilterFields, FilterField } from "@/types";

onMounted(() => {
  fetchOutboundDashboardStats();
  document.title = 'Outbound Dashboard - RM Frontend';
})

const loading = ref(false);
const selectedYear = ref({ id: 2025, name: '2025' });
const dateFilter = ref({
  from_date: '',
  to_date: ''
})
const authStore = useAuthStore();
const toast = useToast();

// Year options for dropdown
const yearOptions = ref([
  { id: 2024, name: '2024' },
  { id: 2025, name: '2025' },
  { id: 2026, name: '2026' }
]);

// Mock URL for fulfillment stats (since no API exists yet)
const fulfillmentStatsUrl = computed(() => 
  import.meta.env.VITE_API_URL + `outbound/fulfillment/stats?current_branch=${authStore.selectedBranch?.id}`
);


// Empty filter fields - only date filtering is needed (via filterByDate: true)
const filterFields = ref<FilterFields<FilterField>>({});



// Table columns for fulfillment stats (no sorting icons)
const fulfillmentColumns = ref<TableColumn[]>([
  {
    label: "ID",
    field: "id",
    sortable: false,
  },
  {
    label: "Agent Name",
    field: "agent_name",
    sortable: false,
  },
  {
    label: "No. of Orders",
    field: "orders_count",
    sortable: false,
  },
  {
    label: "No. of Items",
    field: "items_count",
    sortable: false,
  },
  {
    label: "Check In Time",
    field: "check_in_time",
    sortable: false,
  },
  {
    label: "Check Out Time",
    field: "check_out_time",
    sortable: false,
  },
  {
    label: "Productivity Score",
    field: "productivity_score",
    sortable: false,
  },
]);

// Removed tab functionality as Outbound dashboard doesn't use tabs

// Mock data for agents
const agents = ref([
  { id: 15, agent_name: 'Babajide Raji', orders_count: 20, items_count: 20, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 95 },
  { id: 14, agent_name: 'Daniel Makinde', orders_count: 10, items_count: 10, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 78 },
  { id: 13, agent_name: 'Esther Joel', orders_count: 8, items_count: 12, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 85 },
  { id: 12, agent_name: 'Femi Babalola', orders_count: 15, items_count: 18, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 92 },
  { id: 11, agent_name: 'Sarah Badmus', orders_count: 6, items_count: 8, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 72 },
  { id: 10, agent_name: 'Josh Michael', orders_count: 12, items_count: 15, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 88 },
  { id: 9, agent_name: 'Kemi Adebayo', orders_count: 9, items_count: 11, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 80 },
  { id: 8, agent_name: 'Tunde Okafor', orders_count: 14, items_count: 16, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 90 },
  { id: 7, agent_name: 'Adunni Lawal', orders_count: 7, items_count: 9, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 75 },
  { id: 6, agent_name: 'Chike Okonkwo', orders_count: 11, items_count: 13, check_in_time: '2025-02-19T10:49:00Z', check_out_time: '2025-02-19T18:49:00Z', productivity_score: 86 }
]);

// Stats data
const stats = ref({
  total_orders: 1250,
  pending_orders: 45,
  delivered_orders: 1205,
  total_revenue: 15750000,
})

// Time tracker stages
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'Order Pending → Order Confirmed', time: '0 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Account Confirmed → Order Confirmed', time: '1 minute', color: '#1D7AFC' },
  { id: 3, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#1D7AFC' },
  { id: 4, department: 'Inventory', process: 'Being Processed → Awaiting Shipment', time: '2 minutes', color: '#1D7AFC' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 hours', color: '#22A06B' }
])

// Methods
const formatTime = (timeString: string) => {
  return dayjs(timeString).format('h:mm a');
};

const getScoreClass = (score: number) => {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 80) return 'bg-blue-100 text-blue-800';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getDepartmentIcon = (department: string) => {
  const icons: Record<string, string> = {
    'Accounting': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.342 11.3334H12.6753V7.33337H3.342V11.3334ZM3.342 6.00004H12.6753V4.66671H3.342V6.00004ZM12.6667 3.33337H3.33333C2.6 3.33337 2 3.93337 2 4.66671V11.3334C2 12.0667 2.6 12.6667 3.33333 12.6667H12.6667C13.4 12.6667 14 12.0667 14 11.3334V4.66671C14 3.93337 13.4 3.33337 12.6667 3.33337Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67533 10H6.00867V8.66671H4.67533V10Z" fill="white"/>
    </svg>`,
    'Inventory': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.342 11.3334H12.6753V7.33337H3.342V11.3334ZM3.342 6.00004H12.6753V4.66671H3.342V6.00004ZM12.6667 3.33337H3.33333C2.6 3.33337 2 3.93337 2 4.66671V11.3334C2 12.0667 2.6 12.6667 3.33333 12.6667H12.6667C13.4 12.6667 14 12.0667 14 11.3334V4.66671C14 3.93337 13.4 3.33337 12.6667 3.33337Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67533 10H6.00867V8.66671H4.67533V10Z" fill="white"/>
    </svg>`,
    'Logistics': `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.38937 0.16268C7.736 0.0514369 8.10642 0.036915 8.4607 0.12068L8.6107 0.16268L12.9667 1.56001C13.0934 1.60201 13.2074 1.68068 13.2907 1.79068L13.3374 1.86068L15.1707 5.02535C15.2171 5.10528 15.2463 5.19399 15.2566 5.28584C15.2669 5.37768 15.2579 5.47065 15.2303 5.55886C15.2027 5.64706 15.1571 5.72857 15.0964 5.7982C15.0356 5.86783 14.961 5.92407 14.8774 5.96335L14.7974 5.99468L13.43 6.43335V9.32001C13.4299 9.58393 13.3515 9.84188 13.2047 10.0612C13.0579 10.2805 12.8493 10.4513 12.6054 10.552L12.504 10.5893L8.6107 11.8373C8.26407 11.9486 7.89364 11.9631 7.53937 11.8793L7.38937 11.838L3.49603 10.5893C3.24468 10.5086 3.02294 10.3551 2.85892 10.1482C2.6949 9.94138 2.59598 9.69049 2.5747 9.42735L2.57003 9.31935V6.43335L1.2027 5.99468C1.11477 5.96646 1.03365 5.92028 0.964508 5.85906C0.895361 5.79785 0.839686 5.72293 0.801014 5.63907C0.762341 5.55521 0.741515 5.46422 0.739854 5.37189C0.738193 5.27955 0.755735 5.18788 0.791366 5.10268L0.829366 5.02535L2.6627 1.86068C2.73142 1.74211 2.83501 1.6476 2.95937 1.59001L3.0327 1.56001L7.38937 0.16268ZM8.6667 6.20335V10.4193L12.0967 9.31935V6.86135L10.0367 7.52201C9.90459 7.56439 9.76255 7.56449 9.63039 7.5223C9.49822 7.48012 9.3825 7.39775 9.29937 7.28668L9.2567 7.22135L8.6667 6.20335ZM7.33337 6.20335L6.74337 7.22135C6.66713 7.3529 6.54821 7.45443 6.40635 7.50912C6.26448 7.56381 6.10818 7.56836 5.96337 7.52201L3.90337 6.86135V9.31935L7.33337 10.42V6.20335ZM3.5467 2.99335L2.39803 4.97801L5.8587 6.08868L7.0087 4.10401L3.5467 2.99335ZM12.4534 2.99335L8.99137 4.10401L10.1407 6.08868L13.602 4.97801L12.4534 2.99335ZM8.20337 1.43201C8.09783 1.39831 7.98556 1.39143 7.8767 1.41201L7.7967 1.43201L5.42003 2.19468L8.00003 3.02201L10.58 2.19468L8.20337 1.43201Z" fill="white"/>
    </svg>`
  };
  
  return icons[department] || icons['Inventory']; // Default to inventory icon
};

const fetchOutboundDashboardStats = () => {
  loading.value = true;

  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(dateFilter.value).filter(([_, v]) => v !== ''))
  ).toString();

  axios.get(import.meta.env.VITE_API_URL + `outbound/dashboard/stats?${queryString}&current_branch=${authStore.selectedBranch?.id}`)
    .then((res) => {
      stats.value = res.data
    }).catch(err => {
      toast.error('Error loading dashboard stats!');
    })
    .finally(() => loading.value = false)
};

const filtered = (dateRange: any) => {
  dateFilter.value = dateRange;
  fetchOutboundDashboardStats();
}
</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #f8f9fa;
}

.erp_dashboard_wrapper .card {
  border: 1px solid rgba(9, 30, 66, 0.06);
  padding: 16px 24px;
}

.erp_dashboard_wrapper .attention-container .title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}

.erp_dashboard_wrapper .attention-container .invoice_stats_title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container {
  border: 1px solid rgba(9, 30, 66, 0.14);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container .invoice_stat {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container .invoice_stat:not(:last-child) {
  border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.medium-text {
  font-size: 14px;
  font-weight: 500;
}

.text-text-default {
  color: rgba(23, 43, 77, 1);
}
</style> 