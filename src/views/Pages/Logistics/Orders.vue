<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <Breadcrumb :items="breadcrumbItems" background="gray" />

      <!-- tabs -->
      <Tabs :tabs="mainTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Download buttons in the tabs slot -->
        <div class="flex items-center gap-3 ml-auto relative">
          <!-- Time Tracker Report Button -->
          <div class="relative">
            <Button type="gray-btn" :onClick="downloadTimeTrackerReport" classStyle="px-4 py-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
              </svg>
              Download Time Tracker Report
            </Button>
            <DownloadTimeTrackerReportDropdown
              :isOpen="isTimeTrackerDropdownOpen"
              @close="isTimeTrackerDropdownOpen = false"
              @download="handleTimeTrackerDownload"
            />
          </div>

          <!-- Download Report Button -->
          <div class="relative">
            <Button type="gray-btn" :onClick="downloadReport" classStyle="px-4 py-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
              </svg>
              Download Report
            </Button>
            <DownloadReportDropdown
              :isOpen="isDownloadReportDropdownOpen"
              @close="isDownloadReportDropdownOpen = false"
              @download="handleReportDownload"
            />
          </div>
        </div>
      </Tabs>
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents h-[calc(100vh-190px)] flex flex-col">
      <div class="flex-1 flex flex-col min-h-0" v-if="activeTab === 'Awaiting Shipment'">
        <AwaitingShipment @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Shipped to Hub'">
        <ShippedToHub @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'At Hub'">
        <AtHub @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Shipped via Third Party'">
        <ShippedViaThirdParty @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Shipped to Customer'">
        <ShippedToCustomer @view-order="viewOrder" />
      </div>
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="'details'"
      @close="isOrderDetailsModalOpen = false"
    />

    <!-- Success Toast -->
    <SuccessAlertToast
      message="Download Success"
      :isVisible="showSuccessToast"
      @close="showSuccessToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Breadcrumb from '@/views/Components/ui/Breadcrumb.vue'
import Tabs from '@/views/Components/Tabs.vue'
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue'
import Button from '@/views/Components/ui/Button.vue'
import DownloadTimeTrackerReportDropdown from '@/views/Components/ui/DownloadTimeTrackerReportDropdown.vue'
import DownloadReportDropdown from '@/views/Components/ui/DownloadReportDropdown.vue'
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'
import AwaitingShipment from '@/views/Pages/Logistics/Orders/components/AwaitingShipment.vue'
import ShippedToHub from '@/views/Pages/Logistics/Orders/components/ShippedToHub.vue'
import AtHub from '@/views/Pages/Logistics/Orders/components/AtHub.vue'
import ShippedViaThirdParty from '@/views/Pages/Logistics/Orders/components/ShippedViaThirdParty.vue'
import ShippedToCustomer from '@/views/Pages/Logistics/Orders/components/ShippedToCustomer.vue'

const activeTab = ref('Awaiting Shipment')
const isOrderDetailsModalOpen = ref(false)
const selectedOrder = ref<any>(null)
const isTimeTrackerDropdownOpen = ref(false)
const isDownloadReportDropdownOpen = ref(false)
const showSuccessToast = ref(false)

const breadcrumbItems = computed(() => [
  { label: 'Logistics' },
  { label: 'Orders' },
  { label: activeTab.value }
])

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
])

const orderActivities = ref([
  { action: 'New order assigned', user: 'Oreva Emamoro', time: 'Yesterday 10:45pm' },
  { action: 'New order status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Confirmed order assigned', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Confirmed order status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order being processed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order being processed status changed', user: 'Oreva Emamoro', time: 'Today 12:45pm' },
  { action: 'Order has been picked and packed assigned', user: 'Oreva Emamoro', time: 'Today 10:45pm' },
  { action: 'Order has been picked and packed status changed', user: 'Oreva Emamoro', time: 'Today 10:45pm' }
])

const mainTabs = ref([
  { name: 'Awaiting Shipment', count: 25 },
  { name: 'Shipped to Hub', count: 25 },
  { name: 'At Hub', count: 25 },
  { name: 'Shipped via Third Party', count: 25 },
  { name: 'Shipped to Customer', count: 25 }
])

const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name
}

const viewOrder = (order: any) => {
  selectedOrder.value = {
    order_no: order.orderNo,
    customer_name: order.customerName,
    customer_type: 'Pharmacy',
    assigned: order.assigned || 'Agent Oreva',
    phone: '+234 809 123 4567',
    store_name: order.storeName,
    order_date: order.orderDate,
    total_amount: order.totalAmount
  }
  isOrderDetailsModalOpen.value = true
}

const handleOrderUpdate = () => {
  isOrderDetailsModalOpen.value = false
}

const downloadTimeTrackerReport = () => {
  isTimeTrackerDropdownOpen.value = !isTimeTrackerDropdownOpen.value
  isDownloadReportDropdownOpen.value = false // Close other dropdown
}

const downloadReport = () => {
  isDownloadReportDropdownOpen.value = !isDownloadReportDropdownOpen.value
  isTimeTrackerDropdownOpen.value = false // Close other dropdown
}

const handleTimeTrackerDownload = (data: { from: string; to: string; status: string }) => {
  console.log('Downloading Time Tracker Report:', data)
  showSuccessToast.value = true
  // TODO: Implement actual download functionality
}

const handleReportDownload = (data: { from: string; to: string; status: string }) => {
  console.log('Downloading Report:', data)
  showSuccessToast.value = true
  // TODO: Implement actual download functionality
}
</script>

<style scoped>

</style>
