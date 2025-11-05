<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <!-- Header -->
    <PageTitle title="Business Development / Customers Owed" class="px-6" />
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="customersOwed"
        :columns="columns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="CustomersOwed"
      >
        <template #column="col">
          <!-- Amount Owed Column -->
          <span v-if="col.props?.column?.field === 'amount_owed'">
            {{ formatCurrency((col.props?.formattedRow as any)?.amount_owed || 0) }}
          </span>

          <!-- Default Column -->
          <span v-else>
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

// Column definitions
const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'Amount Owed', field: 'amount_owed', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true }
];

// Mock data for Customers Owed
const customersOwed = ref([
  {
    id: 87,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 54,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 25,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 30,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 51,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 21,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 35,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 23,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 33,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 87,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 88,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 81,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 80,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 5,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  },
  {
    id: 55,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: 47400.00,
    date_created: '16/01/2025'
  }
]);

// Format currency to Nigerian Naira
const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
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

