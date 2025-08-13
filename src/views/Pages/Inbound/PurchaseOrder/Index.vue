<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Purchase Order / Product Price Update" class="px-6" />

      <!-- tabs -->
      <Tabs :tabs="purchasingTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />
    </div>
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <div class="" v-if="activeTab === 'Approved Purchase Order'">
        <AllPurchaseOrder />
      </div>
      <div class="" v-else-if="activeTab === 'Unconfirmed GRN'">
        <Unconfirmed />
      </div>
      <div class="" v-else-if="activeTab === 'Confirmed GRN'">
        <h3>Confirmed GRN Content</h3>
      </div>
      <div class="" v-else-if="activeTab === 'Price Confirmation'">
        <PriceConfirmation />
      </div>
      <div class="" v-else-if="activeTab === 'Completed PO'">
        <CompletedPurchaseOrder />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Tabs from "@/views/Components/Tabs.vue";
import { ref } from 'vue';
import Unconfirmed from '@/views/Pages/Inbound/GRN/Unconfirmed.vue';
import PriceConfirmation from '@/views/Pages/Inbound/GRN/PriceConfirmation.vue';
import CompletedPurchaseOrder from './CompletedPurchaseOrder.vue';
import AllPurchaseOrder from './AllPurchaseOrder.vue';

const activeTab = ref('Approved PO');


const purchasingTabs = ref([
  'Approved Purchase Order',
  'Unconfirmed GRN',
  // 'Confirmed GRN',
  'Price Confirmation',
  'Completed PO'
]);

const handleTabChange = (tab: string, index: number) => {
  // Handle tab change logic here
  activeTab.value = tab;
};
</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.erp_dashboard_wrapper .create_grn_btn {
  padding: 4px 7px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.25px;

}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}
</style>