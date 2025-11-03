<template>
  <div class="flex-1 flex flex-col min-h-0">
    <Datatable
      :items="confirmedOrders"
      :columns="columns"
      :pageName="'pharmacy-orders-confirmed'"
      :searchable="true"
      :filterByDate="true"
      :showActions="true"
      :showPagination="true"
      @onSearch="handleSearch"
    >
      <!-- Actions Column Slot -->
      <template #column="col">
        <!-- Action Column -->
        <span v-if="col.props?.column?.field === 'action'">
          <TableActionDropdown :rowData="col.props?.formattedRow">
            <template #default="{ selectedItem, closeDropdown }">
              <!-- View Order -->
              <li @click="viewOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
                View Order
              </li>
              
              <!-- Assign to Store -->
              <li @click="assignToStore(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H6V16H4V11ZM4.556 3.888C4.801 3.398 5.45 3 6.006 3H17.993C18.549 3 19.199 3.398 19.443 3.888L21 7H3L4.556 3.888ZM3 7H21V8H3V7ZM18 11H20V16H18V11ZM3 8C3.14 9.128 4.094 10 5.25 10C6.406 10 7.36 9.128 7.5 8H3ZM7.5 8C7.64 9.128 8.594 10 9.75 10C10.906 10 11.86 9.128 12 8H7.5ZM12 8C12.14 9.128 13.094 10 14.25 10C15.406 10 16.36 9.128 16.5 8H12ZM16.5 8C16.64 9.128 17.594 10 18.75 10C19.906 10 20.86 9.128 21 8H16.5ZM4 16H20V18.995C20.0013 19.5253 19.792 20.0343 19.4181 20.4103C19.0442 20.7863 18.5363 20.9984 18.006 21H5.994C5.73133 20.9996 5.47131 20.9474 5.22885 20.8464C4.98639 20.7453 4.76624 20.5975 4.58101 20.4112C4.39579 20.225 4.24912 20.004 4.14943 19.761C4.04973 19.518 3.99895 19.2577 4 18.995V16Z" fill="#626F86"/>
</svg>
              
                Assign to Store
              </li>
              
              <!-- Assign to Warehouse -->
              <li @click="assignToWarehouse(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12938_124042)">
<path d="M22.875 17.2494H22.5V6.10534L23.1103 5.97502C23.2568 5.94634 23.3962 5.88878 23.5203 5.8057C23.6443 5.72261 23.7506 5.61566 23.8329 5.49108C23.9152 5.3665 23.9719 5.22678 23.9996 5.08007C24.0274 4.93336 24.0256 4.7826 23.9945 4.63656C23.9634 4.49053 23.9036 4.35215 23.8184 4.22949C23.7333 4.10683 23.6246 4.00235 23.4986 3.92213C23.3727 3.84191 23.2321 3.78756 23.0849 3.76225C22.9378 3.73694 22.7871 3.74118 22.6416 3.77471L1.64156 8.27471C1.37042 8.33321 1.13045 8.48982 0.967735 8.71446C0.805019 8.93911 0.73103 9.21594 0.759977 9.49181C0.788924 9.76767 0.918766 10.0231 1.12457 10.2091C1.33037 10.3951 1.59762 10.4985 1.875 10.4994C1.9547 10.4996 2.03419 10.4914 2.11219 10.475L2.25094 10.445V17.2494H1.875C1.57663 17.2494 1.29048 17.3679 1.0795 17.5789C0.868526 17.7899 0.75 18.076 0.75 18.3744C0.75 18.6728 0.868526 18.9589 1.0795 19.1699C1.29048 19.3809 1.57663 19.4994 1.875 19.4994H22.875C23.1734 19.4994 23.4595 19.3809 23.6705 19.1699C23.8815 18.9589 24 18.6728 24 18.3744C24 18.076 23.8815 17.7899 23.6705 17.5789C23.4595 17.3679 23.1734 17.2494 22.875 17.2494ZM4.5 9.96221L20.25 6.58721V17.2494H18.375V11.6244C18.375 11.326 18.2565 11.0399 18.0455 10.8289C17.8345 10.6179 17.5484 10.4994 17.25 10.4994H7.5C7.20163 10.4994 6.91548 10.6179 6.7045 10.8289C6.49353 11.0399 6.375 11.326 6.375 11.6244V17.2494H4.5V9.96221ZM16.125 13.8744H8.625V12.7494H16.125V13.8744ZM8.625 16.1244H16.125V17.2494H8.625V16.1244Z" fill="#626F86"/>
</g>
<defs>
<clipPath id="clip0_12938_124042">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

                Assign to Warehouse
              </li>
              
              <!-- Activity Log -->
              <li @click="activityLog(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z" fill="#626F86"/>
                  <path d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z" fill="#626F86"/>
                  <path d="M15 16H9C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16Z" fill="#626F86"/>
                </svg>
                Activity Log
              </li>
            </template>
          </TableActionDropdown>
        </span>
        
        <!-- Default for other columns -->
        <span v-else>
          {{ col.props?.formattedRow[col.props?.column?.field] }}
        </span>
      </template>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import type { TableColumn } from '@/types';

const emit = defineEmits<{
  'view-order': [order: any]
  'assign-to-store': [order: any]
  'assign-to-warehouse': [order: any]
  'activity-log': [order: any]
}>();

// Table columns
const columns: TableColumn[] = [
  { field: 'order_no', label: 'Order No', sortable: true },
  { field: 'pharmacy_name', label: 'Pharmacy Name', sortable: true },
  { field: 'pharmacist_name', label: 'Pharmacist', sortable: true },
  { field: 'prescription_no', label: 'Prescription No', sortable: true },
  { field: 'total_amount', label: 'Total Amount', sortable: true },
  { field: 'confirmed_date', label: 'Confirmed Date', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
];

// Mock data for confirmed pharmacy orders
const confirmedOrders = ref([
  {
    id: 4,
    order_no: 'PO-2025-004',
    pharmacy_name: 'MedPlus Pharmacy',
    pharmacist_name: 'Dr. Sarah Johnson',
    prescription_no: 'RX-2025-004',
    total_amount: '₦67,200.00',
    confirmed_date: '2025-01-15',
    status: 'Confirmed'
  },
  {
    id: 5,
    order_no: 'PO-2025-005',
    pharmacy_name: 'Health Plus',
    pharmacist_name: 'Dr. Michael Brown',
    prescription_no: 'RX-2025-005',
    total_amount: '₦23,800.00',
    confirmed_date: '2025-01-15',
    status: 'Confirmed'
  },
  {
    id: 6,
    order_no: 'PO-2025-006',
    pharmacy_name: 'Wellness Pharmacy',
    pharmacist_name: 'Dr. Jennifer Davis',
    prescription_no: 'RX-2025-006',
    total_amount: '₦89,500.00',
    confirmed_date: '2025-01-14',
    status: 'Confirmed'
  }
]);

const handleSearch = (searchTerm: string) => {
  console.log('Searching confirmed pharmacy orders:', searchTerm);
};

const viewOrder = (order: any) => {
  emit('view-order', order);
};

const assignToStore = (order: any) => {
  emit('assign-to-store', order);
};

const assignToWarehouse = (order: any) => {
  emit('assign-to-warehouse', order);
};

const activityLog = (order: any) => {
  emit('activity-log', order);
};
</script>
