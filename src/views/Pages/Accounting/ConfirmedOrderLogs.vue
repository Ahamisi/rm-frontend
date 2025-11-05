<template>
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Confirmed Order Logs" />

    <!-- Contents -->
    <div class="px-0 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <!-- Summary Card - On its own row -->
      <div class="mb-6">
        <div class="w-[20%] border border-gray-300 rounded-lg p-6 bg-transparent mt-4">
          <div class="text-left">
            <h3 class="text-sm text-[#44546F] mb-2">Total Confirmed Orders</h3>
            <p class="text-md  text-[#172B4D] mb-1">10</p>
            <p class="text-sm text-gray-500">Today</p>
          </div>
        </div>
      </div>

      <!-- Datatable - Full width below the card -->
      <div>
        <Datatable 
          :items="confirmedOrderLogs" 
          :columns="orderLogColumns" 
          :searchable="true" 
          :filterByDate="false" 
          :printable="false" 
          :exportable="false" 
          :showActions="false"
          pageName="ConfirmedOrderLogs" 
          :key="childKey"
        >
          <template #column="col">
            <!-- ID -->
            <span v-if="col.props.column.field === 'id'">
              <span class="font-medium">{{ col.props.row.id }}</span>
            </span>
            
            <!-- Order No. -->
            <span v-else-if="col.props.column.field === 'orderNo'">
              <span>{{ col.props.row.orderNo }}</span>
            </span>
            
            <!-- Description -->
            <span v-else-if="col.props.column.field === 'description'">
              <span class="text-gray-700">{{ col.props.row.description }}</span>
            </span>
            
            <!-- User -->
            <span v-else-if="col.props.column.field === 'user'">
              <div class="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#DCDFE4"/>
                  <circle cx="10" cy="7" r="3" fill="#626F86"/>
                  <path d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17V18H4V17Z" fill="#626F86"/>
                </svg>
                <span class="text-gray-700">{{ col.props.row.user }}</span>
              </div>
            </span>
            
            <!-- Date -->
            <span v-else-if="col.props.column.field === 'date'">
              <span class="text-gray-700">{{ col.props.row.date }}</span>
            </span>
            
            <!-- Default -->
            <span v-else class="text-xs">
              {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);

// Mock Confirmed Order Logs data
const confirmedOrderLogs = ref([
  { id: 87, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "System Admin", date: "5/21/2024" },
  { id: 54, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "System Admin", date: "5/21/2024" },
  { id: 25, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Esther Joel", date: "5/21/2024" },
  { id: 30, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Esther Joel", date: "5/21/2024" },
  { id: 51, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Esther Joel", date: "5/21/2024" },
  { id: 21, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Femi Babalola", date: "5/21/2024" },
  { id: 35, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Femi Babalola", date: "5/21/2024" },
  { id: 23, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Sarah Badmus", date: "5/21/2024" },
  { id: 33, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Sarah Badmus", date: "5/21/2024" },
  { id: 88, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Josh Michael", date: "5/21/2024" },
  { id: 81, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Josh Michael", date: "5/21/2024" },
  { id: 89, orderNo: "RHPO-1651244214", description: "Changed status to confirmed order", user: "Josh Michael", date: "5/21/2024" }
]);

// Table columns
const orderLogColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No.', field: 'orderNo', sortable: true },
  { label: 'Description', field: 'description', sortable: true },
  { label: 'User', field: 'user', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];
</script>
