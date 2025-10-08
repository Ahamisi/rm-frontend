<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg bg-[#f9fafb]">
      <!-- Header -->
      <PageTitle title="Drivers" class="px-6" />
      
      <!-- Content -->
      <div class="px-6 py-6">
        <div class="h-full flex flex-col">
          <!-- Datatable -->
          <div class="flex-1 flex flex-col min-h-0">
            <Datatable 
              :items="mockDrivers" 
              :filterByDate="false" 
              :searchable="true"
              :sortable="true"
              :exportable="false"
              :printable="false"
              :columns="driverColumns" 
              pageName="LogisticsDrivers"
              :key="datatableKey"
            >
              <template #column="col">
                <!-- ID -->
                <span v-if="col.props.column.field === 'id'">
                  <span class="font-medium">{{ col.props.row.id }}</span>
                </span>
                
                <!-- Driver -->
                <span v-else-if="col.props.column.field === 'driver'">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">{{ col.props.row.driver }}</span>
                  </div>
                </span>
                
                <!-- Average Ratings -->
                <span v-else-if="col.props.column.field === 'average_ratings'">
                  <div class="flex items-center">
                    <div class="flex">
                      <svg v-for="i in 5" :key="i" 
                           width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Filled star -->
                        <path v-if="i <= col.props.row.average_ratings" fill-rule="evenodd" clip-rule="evenodd" d="M12.4718 17.284L8.56679 19.337C8.40164 19.4238 8.2155 19.4627 8.0294 19.4493C7.8433 19.4358 7.66468 19.3706 7.51372 19.2609C7.36276 19.1513 7.24549 19.0016 7.17517 18.8287C7.10485 18.6559 7.08428 18.4669 7.11579 18.283L7.86079 13.934L4.70179 10.854C4.56838 10.7237 4.47404 10.5587 4.42943 10.3777C4.38482 10.1967 4.39172 10.0068 4.44934 9.82944C4.50695 9.65211 4.613 9.49442 4.75551 9.37418C4.89801 9.25394 5.07129 9.17593 5.25579 9.14897L9.62179 8.51397L11.5748 4.55797C11.6573 4.3905 11.7851 4.24948 11.9436 4.15087C12.1021 4.05226 12.2851 4 12.4718 4C12.6585 4 12.8415 4.05226 13 4.15087C13.1585 4.24948 13.2863 4.3905 13.3688 4.55797L15.3208 8.51397L19.6868 9.14897C19.8714 9.17578 20.0448 9.25367 20.1874 9.37385C20.33 9.49403 20.4362 9.6517 20.4939 9.82906C20.5517 10.0064 20.5587 10.1964 20.5141 10.3775C20.4695 10.5586 20.3752 10.7236 20.2418 10.854L17.0818 13.934L17.8278 18.283C17.8592 18.4667 17.8385 18.6556 17.7683 18.8283C17.698 19.001 17.5808 19.1505 17.43 19.2602C17.2792 19.3698 17.1008 19.435 16.9149 19.4486C16.7289 19.4622 16.5429 19.4235 16.3778 19.337L12.4718 17.284Z" fill="#E56910"/>
                        <!-- Unfilled star -->
                        <path v-else d="M12.3996 16.3729L16.3796 18.5659L15.6196 13.9109L18.8956 10.5639L14.3716 9.87394L12.3996 5.68694L10.4276 9.87594L5.90365 10.5649L9.17965 13.9099L8.41765 18.5649L12.3996 16.3729ZM12.3996 18.6559L9.38365 20.3179C9.05499 20.4991 8.682 20.5841 8.30732 20.5632C7.93264 20.5424 7.57137 20.4166 7.26481 20.2002C6.95825 19.9837 6.71877 19.6854 6.57374 19.3393C6.42871 18.9932 6.38397 18.6133 6.44465 18.2429L7.04365 14.5869L4.47365 11.9629C4.21597 11.6999 4.0359 11.3708 3.95331 11.012C3.87071 10.6531 3.88879 10.2784 4.00554 9.92922C4.12229 9.57999 4.3332 9.26977 4.615 9.03276C4.89681 8.79574 5.23858 8.64112 5.60265 8.58594L9.07265 8.05794L10.5906 4.83394C10.7524 4.4909 11.0083 4.20092 11.3286 3.99782C11.6489 3.79473 12.0204 3.68689 12.3996 3.68689C12.7789 3.68689 13.1504 3.79473 13.4707 3.99782C13.791 4.20092 14.0469 4.4909 14.2086 4.83394L15.7276 8.05794L19.1976 8.58594C19.5616 8.64142 19.9031 8.79626 20.1846 9.0334C20.4662 9.27054 20.6768 9.58079 20.7934 9.92997C20.9099 10.2791 20.9278 10.6537 20.8451 11.0124C20.7624 11.3711 20.5823 11.7 20.3246 11.9629L17.7556 14.5869L18.3546 18.2429C18.4155 18.6134 18.3708 18.9935 18.2257 19.3398C18.0806 19.686 17.841 19.9845 17.5343 20.2009C17.2276 20.4174 16.8661 20.5432 16.4913 20.5639C16.1164 20.5846 15.7433 20.4993 15.4146 20.3179L12.3996 18.6559Z" fill="#626F86"/>
                      </svg>
                    </div>
                  </div>
                </span>
                
                <!-- Phone -->
                <span v-else-if="col.props.column.field === 'phone'">
                  <span class="text-gray-700">{{ col.props.row.phone }}</span>
                </span>
                
                <!-- Assigned Hub -->
                <span v-else-if="col.props.column.field === 'assigned_hub'">
                  <span class="text-gray-700">{{ col.props.row.assigned_hub }}</span>
                </span>
                
                <!-- Status -->
                <span v-else-if="col.props.column.field === 'status'">
                  <Pill 
                    :type="col.props.row.status === 'Enabled' ? 'success' : 'grey'"
                    :text="col.props.row.status"
                  />
                </span>
                
                <!-- Fines -->
                <span v-else-if="col.props.column.field === 'fines'">
                  <span>{{ formatCurrency(col.props.row.fines) }}</span>
                </span>
                
                <!-- Action -->
                <span v-else-if="col.props.column.field === 'action'">
                  <TableActionDropdown :rowData="col.props.row">
                    <template #default="{ selectedItem, closeDropdown }">
                      <!-- View Driver -->
                      <li @click="viewDriver(selectedItem); closeDropdown()" 
                          class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                        </svg>
                        View Driver
                      </li>
                      
                      <!-- Activity Log -->
                      <li @click="openActivityLog(selectedItem); closeDropdown()" 
                          class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z" fill="#626F86"/>
                          <path d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z" fill="#626F86"/>
                          <path d="M11 15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15Z" fill="#626F86"/>
                        </svg>
                        Activity Log
                      </li>
                    </template>
                  </TableActionDropdown>
                </span>
                
                <!-- Default -->
                <span v-else>
                  {{ col.props.row[col.props.column.field] }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Order Details Modal -->
  <OrderDetailsModal
    :isOpen="isOrderDetailsModalOpen"
    :orderData="selectedDriver"
    :orderItems="orderItems"
    :orderActivities="orderActivities"
    :initialActiveTab="modalActiveTab"
    @close="isOrderDetailsModalOpen = false"
  />
</template>

<script setup lang="ts">
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import type { TableColumn } from '@/types';
import { ref } from 'vue';

// Loading state
const datatableKey = ref(0);

// Mock drivers data
const mockDrivers = ref([
  {
    id: 87,
    driver: 'Babajide Raji',
    average_ratings: 5,
    phone: '+234 899 9999 999',
    assigned_hub: 'Abuja Hub',
    status: 'Enabled',
    fines: 2055043.00
  },
  {
    id: 54,
    driver: 'Daniel Makinde',
    average_ratings: 5,
    phone: '+234 899 9999 999',
    assigned_hub: 'Asaba Hub',
    status: 'Enabled',
    fines: 2055043.00
  },
  {
    id: 25,
    driver: 'Esther Joel',
    average_ratings: 5,
    phone: '+234 899 9999 999',
    assigned_hub: 'Kano Hub',
    status: 'Enabled',
    fines: 2055043.00
  },
  {
    id: 30,
    driver: 'Femi Babalola',
    average_ratings: 2,
    phone: '+234 899 9999 999',
    assigned_hub: 'Abuja Hub',
    status: 'Enabled',
    fines: 2055043.00
  },
  {
    id: 51,
    driver: 'Sarah Badmus',
    average_ratings: 2,
    phone: '+234 899 9999 999',
    assigned_hub: 'Asaba Hub',
    status: 'Enabled',
    fines: 2055043.00
  },
  {
    id: 21,
    driver: 'Josh Michael',
    average_ratings: 4,
    phone: '+234 899 9999 999',
    assigned_hub: 'Kano Hub',
    status: 'Pending',
    fines: 2055043.00
  },
  {
    id: 87,
    driver: 'Josh Michael',
    average_ratings: 4,
    phone: '+234 899 9999 999',
    assigned_hub: 'Kano Hub',
    status: 'Pending',
    fines: 2055043.00
  },
  {
    id: 81,
    driver: 'System Admin',
    average_ratings: 5,
    phone: '+234 899 9999 999',
    assigned_hub: 'Abuja Hub',
    status: 'Enabled',
    fines: 2055043.00
  }
]);

// Table columns configuration
const driverColumns = ref<TableColumn[]>([
  { field: 'id', label: 'ID', sortable: true },
  { field: 'driver', label: 'Driver', sortable: true },
  { field: 'average_ratings', label: 'Average Ratings', sortable: true },
  { field: 'phone', label: 'Phone', sortable: false },
  { field: 'assigned_hub', label: 'Assigned Hub', sortable: false },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'fines', label: 'Fines', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
]);

// Order Details Modal
const isOrderDetailsModalOpen = ref(false);
const selectedDriver = ref<any>({});
const modalActiveTab = ref('details');

// Mock order items for details view
const orderItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 20,
    unit_price: 47400.00,
    price_total: 47400.00
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    tags: 'Controlled',
    quantity_delivered: 10,
    unit_price: 47400.00,
    price_total: 47400.00
  }
]);

// Mock order activities
const orderActivities = ref([
  { action: 'New order assigned', user: 'Oreva Emamoro', time: 'Yesterday 10:45pm' },
  { action: 'New order status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Confirmed order assigned', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Confirmed order status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order being processed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order being processed status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order has been picked and packed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order has been picked and packed status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' }
]);

// Action handlers
const viewDriver = (driver: any) => {
  selectedDriver.value = driver;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

const openActivityLog = (driver: any) => {
  selectedDriver.value = driver;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
}

.grey_bg {
  min-height: 100vh;
}
</style>
