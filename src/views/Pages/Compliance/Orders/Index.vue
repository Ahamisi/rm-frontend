<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Orders & Fulfilment / All Orders / New" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="mainTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents h-[calc(100vh-190px)] flex flex-col">
      <div class="flex-1 flex flex-col min-h-0" v-if="activeTab === 'New'">
        <NewOrders @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Confirmed Orders'">
        <ConfirmedOrders @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Being Processed'">
        <BeingProcessed @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Picked & Packed'">
        <PickedPacked @view-order="viewOrder" />
      </div>
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Awaiting Shipment'">
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
      <div class="flex-1 flex flex-col min-h-0" v-else-if="activeTab === 'Cancelled'">
        <Cancelled @view-order="viewOrder" />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Tabs from '@/views/Components/Tabs.vue'
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue'
import NewOrders from '@/views/Pages/Compliance/Orders/components/NewOrders.vue'
import ConfirmedOrders from '@/views/Pages/Compliance/Orders/components/ConfirmedOrders.vue'
import BeingProcessed from '@/views/Pages/Compliance/Orders/components/BeingProcessed.vue'
import PickedPacked from '@/views/Pages/Compliance/Orders/components/PickedPacked.vue'
import AwaitingShipment from '@/views/Pages/Compliance/Orders/components/AwaitingShipment.vue'
import ShippedToHub from '@/views/Pages/Compliance/Orders/components/ShippedToHub.vue'
import AtHub from '@/views/Pages/Compliance/Orders/components/AtHub.vue'
import ShippedViaThirdParty from '@/views/Pages/Compliance/Orders/components/ShippedViaThirdParty.vue'
import ShippedToCustomer from '@/views/Pages/Compliance/Orders/components/ShippedToCustomer.vue'
import Cancelled from '@/views/Pages/Compliance/Orders/components/Cancelled.vue'

// Reactive data
const activeTab = ref('New')
const isOrderDetailsModalOpen = ref(false)
const selectedOrder = ref(null)

// Mock data for order details modal
const orderItems = ref([
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'SKU-001',
    tags: ['Controlled'],
    quantity_delivered: 20,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'SKU-002',
    tags: ['Controlled'],
    quantity_delivered: 10,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  }
])

const orderActivities = ref([
  {
    id: 1,
    action: 'Order Created',
    user: 'System',
    timestamp: '2024-05-21 11:13:00',
    details: 'Order was created and assigned to processing queue'
  },
  {
    id: 2,
    action: 'Order Confirmed',
    user: 'Agent Oreva',
    timestamp: '2024-05-21 11:15:00',
    details: 'Order has been confirmed and is ready for processing'
  }
])

// Tab configuration
const mainTabs = ref([
  { name: 'New', count: 25 },
  { name: 'Confirmed Orders', count: 25 },
  { name: 'Being Processed', count: 25 },
  { name: 'Picked & Packed', count: 25 },
  { name: 'Awaiting Shipment', count: 25 },
  { name: 'Shipped to Hub', count: 25 },
  { name: 'At Hub', count: 25 },
  { name: 'Shipped via Third Party', count: 25 },
  { name: 'Shipped to Customer', count: 25 },
  { name: 'Cancelled', count: 25 }
])

// Methods
const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name
}

const viewOrder = (order: any) => {
  // Transform the order data to match the expected structure for OrderDetailsModal
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
  // Handle order update logic
  isOrderDetailsModalOpen.value = false
}
</script>

<style scoped>
.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.tab_contents {
  height: calc(100vh - 190px) !important;
  overflow: hidden !important;
}
</style>