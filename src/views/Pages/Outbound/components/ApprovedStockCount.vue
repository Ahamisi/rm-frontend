<template>
  <div class="mt-4 h-full flex flex-col">
    <div class="flex-1 flex flex-col min-h-0">
      <Datatable
        :items="approvedStockItems"
        :columns="approvedStockCountColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="ApprovedStockCount"
        :key="childKey"
      >
      <template #header_actions>
        <button 
          @click="downloadApprovedStockCount"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
            <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
          </svg>
          Download Approved Stock Count
        </button>
      </template>
      <template #column-counted_by="col">
        <div class="flex items-center gap-2">
          <img 
            :src="getUserAvatar(col.props?.formattedRow?.counted_by)" 
            :alt="col.props?.formattedRow?.counted_by"
            class="w-6 h-6 rounded-full"
          >
          <span class="text-sm">{{ col.props?.formattedRow?.counted_by }}</span>
        </div>
      </template>

      <template #column-approved_by="col">
        <div class="flex items-center gap-2">
          <img 
            :src="getUserAvatar(col.props?.formattedRow?.approved_by)" 
            :alt="col.props?.formattedRow?.approved_by"
            class="w-6 h-6 rounded-full"
          >
          <span class="text-sm">{{ col.props?.formattedRow?.approved_by }}</span>
        </div>
      </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';

const childKey = ref(0);

// Mock data for approved stock count items (matching screenshot data)
const approvedStockItems = ref([
  {
    id: 15,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  },
  {
    id: 14,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch_no: '211115',
    stock_count: 200,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  },
  {
    id: 13,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  },
  {
    id: 12,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  },
  {
    id: 11,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  },
  {
    id: 10,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Femi Babalola',
    date_counted: '16/01/2025',
    approved_by: 'Femi Babalola',
    date_approved: '16/01/2025'
  },
  {
    id: 9,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Femi Babalola',
    date_counted: '16/01/2025',
    approved_by: 'Femi Babalola',
    date_approved: '16/01/2025'
  },
  {
    id: 8,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 1,
    warehouse_shelf: 'EC008',
    counted_by: 'Sarah Badmus',
    date_counted: '16/01/2025',
    approved_by: 'Sarah Badmus',
    date_approved: '16/01/2025'
  },
  {
    id: 7,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Sarah Badmus',
    date_counted: '16/01/2025',
    approved_by: 'Sarah Badmus',
    date_approved: '16/01/2025'
  },
  {
    id: 6,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 1,
    warehouse_shelf: 'EC008',
    counted_by: 'Josh Michael',
    date_counted: '16/01/2025',
    approved_by: 'Josh Michael',
    date_approved: '16/01/2025'
  },
  {
    id: 5,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Josh Michael',
    date_counted: '16/01/2025',
    approved_by: 'Josh Michael',
    date_approved: '16/01/2025'
  },
  {
    id: 4,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 1,
    warehouse_shelf: 'EC008',
    counted_by: 'Josh Michael',
    date_counted: '16/01/2025',
    approved_by: 'Josh Michael',
    date_approved: '16/01/2025'
  },
  {
    id: 3,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 0,
    warehouse_shelf: 'EC008',
    counted_by: 'Femi Babalola',
    date_counted: '16/01/2025',
    approved_by: 'Femi Babalola',
    date_approved: '16/01/2025'
  },
  {
    id: 2,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    batch_no: '211115',
    stock_count: 1,
    warehouse_shelf: 'EC008',
    counted_by: 'Esther Joel',
    date_counted: '16/01/2025',
    approved_by: 'Esther Joel',
    date_approved: '16/01/2025'
  }
]);

// Column definitions for approved stock count (simplified as per screenshot)
const approvedStockCountColumns = ref([
  {
    field: 'id',
    label: 'ID',
    width: '8%',
    sortable: true
  },
  {
    field: 'product_name',
    label: 'Product Name',
    width: '25%',
    sortable: true
  },
  {
    field: 'batch_no',
    label: 'Batch No.',
    width: '10%',
    sortable: true
  },
  {
    field: 'stock_count',
    label: 'Stock Count',
    width: '10%',
    sortable: true
  },
  {
    field: 'warehouse_shelf',
    label: 'Warehouse Shelf',
    width: '12%',
    sortable: true
  },
  {
    field: 'counted_by',
    label: 'Counted By',
    width: '12%',
    sortable: true
  },
  {
    field: 'date_counted',
    label: 'Date Counted',
    width: '10%',
    sortable: true
  },
  {
    field: 'approved_by',
    label: 'Approved By',
    width: '12%',
    sortable: true
  },
  {
    field: 'date_approved',
    label: 'Date Approved',
    width: '10%',
    sortable: true
  }
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

// Action functions
const downloadApprovedStockCount = () => {
  console.log('Download Approved Stock Count');
  // Trigger download functionality
};
</script>
