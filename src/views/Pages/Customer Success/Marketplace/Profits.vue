<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Marketplace / Partner Profits" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <Datatable
        :items="partnerProfits"
        :columns="partnerProfitColumns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="PartnerProfits"
      >
        <template #header_actions>
          <Button 
            type="blue-btn" 
            :onClick="downloadProfitMargin"
            classStyle="px-6 py-2 flex items-center gap-2"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
          <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
          </svg>

            Download Profit Margin
          </Button>
        </template>

        <template #column="col">
          <!-- Status Column -->
          <span v-if="col.props?.column?.field === 'status'">
            <Pill 
              :text="(col.props?.formattedRow as any)?.status || ''" 
              :type="getPillType((col.props?.formattedRow as any)?.status)"
            />
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Success Toast -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import { ref } from 'vue';
import type { TableColumn } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Column definitions for Partner Profits
const partnerProfitColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'MP Order No.', field: 'mp_order_no', sortable: true },
  { label: 'RH Order No.', field: 'rh_order_no', sortable: true },
  { label: 'Partner Name', field: 'partner_name', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Total Profit', field: 'total_profit', sortable: true },
  { label: 'Status', field: 'status', sortable: true }
];

// Mock Partner profits data
const partnerProfits = ref([
  {
    id: 87,
    mp_order_no: 'MP-1651244214',
    rh_order_no: 'RHPO-1651244214',
    partner_name: 'Remedial Partner',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Pending'
  },
  {
    id: 54,
    mp_order_no: 'MP-1651244214',
    rh_order_no: 'RHPO-1651244214',
    partner_name: 'Dave Distro',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 25,
    mp_order_no: 'MP-1651244214',
    rh_order_no: 'RHPO-1651244214',
    partner_name: 'Accupill Pharmacy',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 76,
    mp_order_no: 'MP-1651244214',
    rh_order_no: 'RHPO-1651244214',
    partner_name: 'Medplus Global',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 43,
    mp_order_no: 'MP-1651244215',
    rh_order_no: 'RHPO-1651244215',
    partner_name: 'Remedial Partner',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 32,
    mp_order_no: 'MP-1651244216',
    rh_order_no: 'RHPO-1651244216',
    partner_name: 'Dave Distro',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 19,
    mp_order_no: 'MP-1651244217',
    rh_order_no: 'RHPO-1651244217',
    partner_name: 'Accupill Pharmacy',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 67,
    mp_order_no: 'MP-1651244218',
    rh_order_no: 'RHPO-1651244218',
    partner_name: 'Medplus Global',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 81,
    mp_order_no: 'MP-1651244219',
    rh_order_no: 'RHPO-1651244219',
    partner_name: 'Remedial Partner',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Pending'
  },
  {
    id: 12,
    mp_order_no: 'MP-1651244220',
    rh_order_no: 'RHPO-1651244220',
    partner_name: 'Dave Distro',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 38,
    mp_order_no: 'MP-1651244221',
    rh_order_no: 'RHPO-1651244221',
    partner_name: 'Accupill Pharmacy',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 91,
    mp_order_no: 'MP-1651244222',
    rh_order_no: 'RHPO-1651244222',
    partner_name: 'Medplus Global',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 56,
    mp_order_no: 'MP-1651244223',
    rh_order_no: 'RHPO-1651244223',
    partner_name: 'Remedial Partner',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 24,
    mp_order_no: 'MP-1651244224',
    rh_order_no: 'RHPO-1651244224',
    partner_name: 'Dave Distro',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  },
  {
    id: 73,
    mp_order_no: 'MP-1651244225',
    rh_order_no: 'RHPO-1651244225',
    partner_name: 'Accupill Pharmacy',
    order_date: '5/21/2024',
    total_amount: '₦2,055,043.00',
    total_profit: '₦2,055,043.00',
    status: 'Delivered'
  }
]);

// Download function
const downloadProfitMargin = () => {
  toastMessage.value = 'Download Profit Margin Successful';
  showToast.value = true;
};

// Get pill type based on status
const getPillType = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Pending':
      return 'pending-tier';
    default:
      return 'pending-tier';
  }
};

</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  padding-top: 1rem;
}
</style>