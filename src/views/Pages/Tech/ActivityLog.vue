<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Activity Log" class="px-6" />

    <div class="px-6 py-6">
      <!-- Activity Log Datatable -->
      <Datatable
        :items="activityLogs"
        :columns="columns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="ActivityLog"
      >
        <template #column="col">
          <!-- User Column -->
          <span v-if="col.props?.column?.field === 'user'">
            <div class="flex items-center gap-2">
              <img 
                :src="getUserAvatar((col.props?.formattedRow as any)?.user)" 
                :alt="(col.props?.formattedRow as any)?.user"
                class="w-6 h-6 rounded-full"
              >
              <span class="text-sm">{{ (col.props?.formattedRow as any)?.user }}</span>
            </div>
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

const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true, width: '8%' },
  { label: 'User', field: 'user', sortable: true, width: '25%' },
  { label: 'Action', field: 'action', sortable: true, width: '45%' },
  { label: 'Date', field: 'date', sortable: true, width: '22%' }
];

const activityLogs = ref([
  { id: 87, user: 'Josh Michael', action: 'Changed order status', date: '5/21/2024' },
  { id: 54, user: 'Sarah Badmus', action: 'Changed order status', date: '5/21/2024' },
  { id: 25, user: 'Esther Joel', action: 'Changed order status', date: '5/21/2024' },
  { id: 30, user: 'Femi Babalola', action: 'Changed order status', date: '5/21/2024' },
  { id: 51, user: 'Josh Michael', action: 'Changed order status', date: '5/21/2024' },
  { id: 21, user: 'Sarah Badmus', action: 'Changed order status', date: '5/21/2024' },
  { id: 35, user: 'Esther Joel', action: 'Changed order status', date: '5/21/2024' },
  { id: 23, user: 'Femi Babalola', action: 'Changed order status', date: '5/21/2024' },
  { id: 33, user: 'Josh Michael', action: 'Changed order status', date: '5/21/2024' },
  { id: 87, user: 'Sarah Badmus', action: 'Changed order status', date: '5/21/2024' },
  { id: 88, user: 'Esther Joel', action: 'Changed order status', date: '5/21/2024' },
  { id: 81, user: 'Femi Babalola', action: 'Changed order status', date: '5/21/2024' },
  { id: 80, user: 'Josh Michael', action: 'Changed order status', date: '5/21/2024' },
  { id: 5, user: 'Sarah Badmus', action: 'Changed order status', date: '5/21/2024' },
  { id: 55, user: 'Esther Joel', action: 'Changed order status', date: '5/21/2024' }
]);

// Helper function to get user avatar
const getUserAvatar = (userName: string) => {
  // Mock avatar mapping - in real app this would come from user data
  const avatarMap: { [key: string]: string } = {
    'Esther Joel': '/src/assets/images/profileImg.png',
    'Femi Babalola': '/src/assets/images/femiImg.png',
    'Sarah Badmus': '/src/assets/images/avatarImage.png',
    'Josh Michael': '/src/assets/images/joshImg.png'
  };
  return avatarMap[userName] || '/src/assets/images/avatarImage.png';
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

