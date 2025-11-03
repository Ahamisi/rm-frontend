<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="HMO & Pharmacy / Pharmacies Owed" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents h-[calc(100vh-190px)] flex flex-col">
      <Datatable
        :items="pharmaciesOwedData"
        :columns="columns"
        :pageName="'pharmacies-owed'"
        :searchable="true"
        :filterByDate="true"
        :showActions="false"
        :showPagination="true"
        @onSearch="handleSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import type { TableColumn } from '@/types';

// Table columns
const columns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'customer_name', label: 'Customer Name', sortable: true },
  { field: 'phone', label: 'Phone', sortable: false },
  { field: 'amount_owed', label: 'Amount Owed', sortable: true },
  { field: 'date_created', label: 'Date Created', sortable: true }
];

// Mock data for pharmacies owed
const pharmaciesOwedData = ref([
  {
    id: 87,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 54,
    customer_name: 'Emeka Kalu',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 30,
    customer_name: 'Emmanuel Aba',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 35,
    customer_name: 'Nyerhovwo Omuvwie',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 42,
    customer_name: 'Sarah Johnson',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 18,
    customer_name: 'Michael Brown',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 73,
    customer_name: 'Jennifer Davis',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 29,
    customer_name: 'David Wilson',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 91,
    customer_name: 'Lisa Anderson',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 56,
    customer_name: 'Robert Taylor',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 14,
    customer_name: 'Maria Garcia',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 67,
    customer_name: 'James Martinez',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 83,
    customer_name: 'Patricia Lee',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 25,
    customer_name: 'Christopher White',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 48,
    customer_name: 'Amanda Harris',
    phone: '+234 899 9999 999',
    amount_owed: '₦47,400.00',
    date_created: '16/01/2025'
  }
]);

const handleSearch = (searchTerm: string) => {
  console.log('Searching pharmacies owed:', searchTerm);
};
</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.bg-gray-light {
  background-color: #091E420F;
}

.key {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
}

.value {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}
</style>
