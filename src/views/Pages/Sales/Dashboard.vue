<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <!-- Page Title -->
    <PageTitle title="Dashboard" class="px-6" />

    <!-- Overall Agent Performance Section -->
    <div class="px-6 py-6">
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-0 border-b-0 rounded-b-none">
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-xl font-semibold text-gray-900">Overall Agent Performance</h1>
          <DateFilter @dateFiltered="handleDateFilter" />
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Stores Visited Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Stores Visited</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-semibold text-gray-900">2</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_stores)"/>
                <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_stores" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A06B" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <!-- Orders Placed Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6 border-t-0">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Orders Placed</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-semibold text-gray-900">271</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_orders)"/>
                <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_orders" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A06B" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Agents Datatable -->
      <div class="bg-white rounded-lg shadow-sm border p-6 border-t-0 rounded-t-none">
        <Datatable
        :items="agentData"
        :columns="agentColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        pageName="Sales Agents"
      >
        <template #header_actions>
          <Button type="blue-btn" :onClick="downloadReport" classStyle="px-4 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
            </svg>
            Download Report
          </Button>
        </template>

        <template #column="col">
          <!-- Agent Name Column -->
          <span v-if="col.props?.column?.field === 'agentName'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.agentName || '' }}</span>
            </div>
          </span>

          <!-- Line Manager Column -->
          <span v-else-if="col.props?.column?.field === 'lineManager'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>{{ (col.props?.formattedRow as any)?.lineManager || '' }}</span>
            </div>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View Agent -->
                <li @click="viewAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                  </svg>
                  View Agent
                </li>
                
                <!-- Edit Agent -->
                <li @click="editAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                  </svg>
                  Edit Agent
                </li>
                
                <!-- Disable Agent -->
                <li @click="disableAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#E56910" fill-opacity="0.2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="#E56910" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#E56910" stroke-width="2"/>
                  </svg>
                  Disable Agent
                </li>
                
                <!-- Transfer Customers -->
                <li @click="transferCustomers(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7L12 3L16 7M12 21V3" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Transfer Customers
                </li>
                
                <!-- Reset Password -->
                <li @click="resetPassword(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M14 7L18 11L14 15" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="12" y="3" width="8" height="4" rx="1" fill="#626F86"/>
                    <rect x="12" y="17" width="8" height="4" rx="1" fill="#626F86"/>
                  </svg>
                  Reset Password
                </li>
                
                <!-- Delete -->
                <li @click="deleteAgent(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#626F86"/>
                  </svg>
                  Delete
                </li>
              </template>
            </TableActionDropdown>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
        </Datatable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import DateFilter from "@/views/Components/Dashboards/DateFilter.vue";
import Button from "@/views/Components/ui/Button.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Agent columns
const agentColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Agent Name', field: 'agentName', sortable: true },
  { label: 'Agent Type', field: 'agentType', sortable: true },
  { label: 'Line Manager', field: 'lineManager', sortable: true },
  { label: 'No. of Stores Visited', field: 'storesVisited', sortable: true },
  { label: 'No. of Orders', field: 'orders', sortable: true },
  { label: 'No. of Inactive Customers', field: 'inactiveCustomers', sortable: true },
  { label: 'No. Buying Customers', field: 'buyingCustomers', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Mock agent data
const agentData = ref([
  { id: 87, agentName: 'Babajide Raji', agentType: 'Sales Canvasser', lineManager: 'Babajide Raji', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 },
  { id: 54, agentName: 'Daniel Makinde', agentType: 'Sales Canvasser', lineManager: 'Daniel Makinde', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 },
  { id: 25, agentName: 'Esther Joel', agentType: 'Sales Canvasser', lineManager: 'Esther Joel', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 },
  { id: 30, agentName: 'Femi Babalola', agentType: 'Area Sales Manager', lineManager: 'Femi Babalola', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 },
  { id: 51, agentName: 'Sarah Badmus', agentType: 'Sales Canvasser', lineManager: 'Sarah Badmus', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 },
  { id: 21, agentName: 'Josh Michael', agentType: 'Area Sales Manager', lineManager: 'Josh Michael', storesVisited: 21, orders: 21, inactiveCustomers: 21, buyingCustomers: 21 }
]);

const handleDateFilter = (dates: any) => {
  console.log('Date filter applied:', dates);
};

const downloadReport = () => {
  console.log('Download report');
};

const viewAgent = (agent: any) => {
  console.log('View agent:', agent);
};

const editAgent = (agent: any) => {
  console.log('Edit agent:', agent);
};

const disableAgent = (agent: any) => {
  console.log('Disable agent:', agent);
};

const transferCustomers = (agent: any) => {
  console.log('Transfer customers:', agent);
};

const resetPassword = (agent: any) => {
  console.log('Reset password:', agent);
};

const deleteAgent = (agent: any) => {
  console.log('Delete agent:', agent);
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>
