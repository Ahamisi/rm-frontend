<template>
  <main>
    <div v-if="isCreatingPurchaseOrder">
      <PurchaseCreatePurchaseOrder @close="closeCreatePurchaseOrder" :selectedOrder="selectedOrder" />
    </div>

    <div v-else class="py-4">
      <div class="bg-[#F7F8F9] border-b border-[#091E4224] px-8 relative hidden lg:block">
        <!-- Breadcrumb -->
        <div class="text-[#626F86] crumb-text mb-5 space-x-2 px-3">
          <router-link to="/purchase" class="hover:underline">
            <span>Purchase Order</span>
          </router-link>
          <span>/</span>
          <span class="crumb-text cursor-pointer hover:underline">{{
            activeLink.label
            }}</span>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex w-full items-baseline px-3">
          <a v-for="(link, index) in links" :key="index" href="#"
            class="py-3 px-4 navigation-text text-[#44546F] transition-colors duration-300 rounded-t-md relative"
            :class="{
              'bg-white text-[#172B4D] font-medium border border-[#091E4224] border-b-0':
                activeLink.value === link.value,
              'hover:text-[#172B4D] font-semibold text-[#44546F]':
                activeLink.value !== link.value,
              'after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[1px] after:bg-white':
                activeLink.value === link.value,
            }" @click.prevent="toggleView(link)">
            {{ link.label }}
          </a>
        </div>
      </div>
      <!-- Mobile Navigation (visible on mobile only) -->
      <div class="bg-[#F7F8F9] border-b border-[#091E4224] px-4 py-3 relative lg:hidden">
        <!-- Breadcrumb -->
        <div class="text-[#626F86] text-sm mb-3 flex items-center space-x-1">
          <router-link to="/purchase" class="hover:underline">
            <span>Purchase Order</span>
          </router-link>
          <span>/</span>
          <span class="cursor-pointer hover:underline">{{
            activeLink.label
            }}</span>
        </div>

        <!-- Icon-based Tabs -->
        <div class="flex justify-around items-center">
          <button v-for="(link, index) in links" :key="index" @click.prevent="toggleView(link)"
            class="p-2 rounded-lg flex flex-col items-center justify-center transition-colors duration-200" :class="{
              'bg-white text-blue-600 border border-[#091E4224]':
                activeLink.value === link.value,
              'text-[#44546F] hover:text-blue-600':
                activeLink.value !== link.value,
            }">
            <component :is="link.icon" class="w-5 h-5 mb-1"
              :class="{ 'text-blue-600': activeLink.value === link.value }" />
          </button>
        </div>
      </div>

      <section class="bg-white p-6">
        <AwaitingPo v-if="activeLink.value == 'awaiting'" @createPurchaseOrder="showCreatePurchaseOrder" />
        <UnconfirmedGrn v-if="activeLink.value == 'unconfirmed_grn'" @createPurchaseOrder="showCreatePurchaseOrder" />
        <ConfirmedGrn v-if="activeLink.value == 'confirmed_grn'" @createPurchaseOrder="showCreatePurchaseOrder" />
        <CompletedPo v-if="activeLink.value == 'completed'" @createPurchaseOrder="showCreatePurchaseOrder" />
        <PriceConfirmation v-if="activeLink.value == 'price_confirmation'"
          @createPurchaseOrder="showCreatePurchaseOrder" />
        <ApprovedPo v-else-if="activeLink.value == 'approved'" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import AwaitingPo from "@/views/Pages/procurement/purchase/awaitingPo.vue";
import ApprovedPo from "@/views/Pages/procurement/purchase/approvedPo.vue";
import ConfirmedGrn from "@/views/Pages/procurement/purchase/confirmedGRN.vue";
import UnconfirmedGrn from "@/views/Pages/procurement/purchase/unconfirmedGRN.vue";
import PriceConfirmation from "@/views/Pages/procurement/purchase/priceConfirmation.vue";
import CompletedPo from "@/views/Pages/procurement/purchase/compPo.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PurchaseCreatePurchaseOrder from "@/views/Components/procurement/purchase/createPurchaseOrder.vue";
import { usePurchaseOrders } from "@/views/Composables/procurement/usePurchaseOrders";
import {
  FileClock,
  FileCheck2,
  ClipboardX,
  ClipboardCheck,
  BadgeCheck,
  CheckCircle2,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const isCreatingPurchaseOrder = ref(route.query.create === "true");
const { fetchPurchaseOrder } = usePurchaseOrders();
// Define the navigation links

const links = [
  { label: "Awaiting PO Approval", value: "awaiting", icon: FileClock },
  { label: "Approved PO", value: "approved", icon: FileCheck2 },
  { label: "Unconfirmed GRN", value: "unconfirmed_grn", icon: ClipboardX },
  { label: "Confirmed GRN", value: "confirmed_grn", icon: ClipboardCheck },
  {
    label: "Price Confirmation",
    value: "price_confirmation",
    icon: BadgeCheck,
  },
  { label: "Completed PO", value: "completed", icon: CheckCircle2 },
];

// Helper function to find link by value
const findLinkByValue = (value: string) =>
  links.find((link) => link.value === value) || links[0];

// Get active tab from query or default to first link
const activeLink = ref(findLinkByValue(route.query.tab as string));

// Function to switch tabs
const toggleView = (link: { label: string; value: string }) => {
  if (link.value !== activeLink.value.value) {
    activeLink.value = link;
    router.push({ query: { tab: link.value } });
  }
};

// Show CreatePurchaseOrder component
const showCreatePurchaseOrder = () => {
  router.push({ query: { ...route.query, create: "true" } });
};

// Close CreatePurchaseOrder component and update the URL
const closeCreatePurchaseOrder = () => {
  const newQuery = { ...route.query };
  delete newQuery.create;
  router.push({ query: newQuery });
  setTimeout(() => {
    selectedOrder.value = null;
  }, 1000);
};
const selectedOrder = ref(null);

// Watch for route changes and update `activeLink` & `isCreatingPurchaseOrder`
watch(
  () => route.query,
  async (query) => {
    if (route.query.id) {
      selectedOrder.value = await fetchPurchaseOrder(route.query.id);
    }
    activeLink.value =
      links.find((link) => link.value === query.tab) || links[0];
    isCreatingPurchaseOrder.value = query.create === "true";
  }
);
</script>
