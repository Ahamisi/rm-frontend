<template>
  <div v-if="loading" class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <LoadingState />
  </div>
  
  <div class="erp_dashboard_wrapper">
    <!-- Page Title -->
    <PageTitle title="Dashboard" class="px-6" :style="{ backgroundColor: '#f9fafb' }" />
    
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
              <div class="w-24">
                <SelectField
                  v-model="selectedYear"
                  :options="yearOptions"
                  placeholder="2025"
                />
              </div>
            </div>

            <!-- Time Tracker Stages -->
            <TimeTrackerContent :stages="timeTrackerStages" :noPadding="true" />
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
import PageTitle from "@/views/Components/header/PageTitle.vue";
import TimeTrackerContent from "@/views/Components/TimeTrackerContent.vue";
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