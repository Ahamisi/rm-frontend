<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Role Management / Permissions" class="px-6" />

    <div class="px-6 py-6">
      <!-- Permissions Datatable -->
      <Datatable
        :items="permissions"
        :columns="columns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Permissions"
      >
        <template #column="col">
          <!-- Default Column -->
          <span>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Permission Name', field: 'permission_name', sortable: true },
  { label: 'Description', field: 'description', sortable: false }
];

const permissions = ref([
  { id: 1, permission_name: 'create_customers', description: 'Permission to create customers' },
  { id: 2, permission_name: 'edit_customers', description: 'Permission to edit customers' },
  { id: 3, permission_name: 'delete_customers', description: 'Permission to delete customers' },
  { id: 4, permission_name: 'view_customers', description: 'Permission to view customers' },
  { id: 5, permission_name: 'create_orders', description: 'Permission to create orders' },
  { id: 6, permission_name: 'edit_orders', description: 'Permission to edit orders' },
  { id: 7, permission_name: 'delete_orders', description: 'Permission to delete orders' },
  { id: 8, permission_name: 'view_orders', description: 'Permission to view orders' },
  { id: 9, permission_name: 'download_orders_invoice', description: 'Permission to download order invoices' },
  { id: 10, permission_name: 'download_orders_waybill', description: 'Permission to download order waybills' },
  { id: 11, permission_name: 'downloading_picking_list', description: 'Permission to download picking lists' },
  { id: 12, permission_name: 'create_products', description: 'Permission to create products' },
  { id: 13, permission_name: 'edit_products', description: 'Permission to edit products' },
  { id: 14, permission_name: 'delete_products', description: 'Permission to delete products' },
  { id: 15, permission_name: 'view_products', description: 'Permission to view products' },
  { id: 16, permission_name: 'edit_subproducts', description: 'Permission to edit subproducts' },
  { id: 17, permission_name: 'create_agents', description: 'Permission to create agents' },
  { id: 18, permission_name: 'edit_agents', description: 'Permission to edit agents' },
  { id: 19, permission_name: 'delete_agents', description: 'Permission to delete agents' },
  { id: 20, permission_name: 'view_agents', description: 'Permission to view agents' },
  { id: 21, permission_name: 'create_suppliers', description: 'Permission to create suppliers' },
  { id: 22, permission_name: 'edit_suppliers', description: 'Permission to edit suppliers' },
  { id: 23, permission_name: 'delete_suppliers', description: 'Permission to delete suppliers' },
  { id: 24, permission_name: 'view_suppliers', description: 'Permission to view suppliers' },
  { id: 25, permission_name: 'create_stores', description: 'Permission to create stores' },
  { id: 26, permission_name: 'edit_stores', description: 'Permission to edit stores' },
  { id: 27, permission_name: 'delete_stores', description: 'Permission to delete stores' },
  { id: 28, permission_name: 'view_stores', description: 'Permission to view stores' },
  { id: 29, permission_name: 'create_drivers', description: 'Permission to create drivers' },
  { id: 30, permission_name: 'edit_drivers', description: 'Permission to edit drivers' },
  { id: 31, permission_name: 'delete_drivers', description: 'Permission to delete drivers' },
  { id: 32, permission_name: 'view_drivers', description: 'Permission to view drivers' },
  { id: 33, permission_name: 'create_loans', description: 'Permission to create loans' },
  { id: 34, permission_name: 'edit_loans', description: 'Permission to edit loans' },
  { id: 35, permission_name: 'delete_loans', description: 'Permission to delete loans' },
  { id: 36, permission_name: 'view_loans', description: 'Permission to view loans' },
  { id: 37, permission_name: 'view_reports', description: 'Permission to view reports' },
  { id: 38, permission_name: 'download_reports', description: 'Permission to download reports' },
  { id: 39, permission_name: 'create_warehouses', description: 'Permission to create warehouses' },
  { id: 40, permission_name: 'edit_warehouses', description: 'Permission to edit warehouses' },
  { id: 41, permission_name: 'delete_warehouses', description: 'Permission to delete warehouses' },
  { id: 42, permission_name: 'view_warehouses', description: 'Permission to view warehouses' },
  { id: 43, permission_name: 'view_logs', description: 'Permission to view activity logs' },
  { id: 44, permission_name: 'create_deals', description: 'Permission to create deals' },
  { id: 45, permission_name: 'edit_deals', description: 'Permission to edit deals' },
  { id: 46, permission_name: 'delete_deals', description: 'Permission to delete deals' },
  { id: 47, permission_name: 'view_deals', description: 'Permission to view deals' }
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