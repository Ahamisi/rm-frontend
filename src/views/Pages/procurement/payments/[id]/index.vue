<script setup lang="ts">
import Grn from "@/views/Components/procurement/purchase/Grn.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);

const totals = ref([
  {
    name: "Purchase Order",
    count: 40,
    amount: "₦5,250,000",
  },
  {
    name: "GRNs",
    count: 20,
    amount: "₦5,250,000",
  },
  {
    name: "Payments",
    count: 25,
    amount: "₦5,250,000",
  },
  {
    name: "Purchase Qty",
    count: 25,
    // amount: "₦5,250,000"
  },
  {
    name: "Returns",
    count: 25,
    // amount: "₦5,250,000"
  },
]);

// Dummy Purchase Order Data
const purchaseOrders = ref([
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Unassigned",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Rejected",
    assigned: "Unassigned",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Esther Joel",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Femi Babalola",
  },
]);
</script>

<template>
  <div class="p-6 space-y-6 bg-gray-100">
    <SuppliersPageCrumbs :title="`Fidson Healthcare`"></SuppliersPageCrumbs>
    <!-- Supplier, Contact, and Bank Info -->
    <div class="flex w-1/2 gap-1 py-6 text-xs">
      <!-- Supplier Info -->
      <div class="w-1/6 px-4 grow-0">
        <img src="@/views/Pages/procurement/redesign/fidson-logo.png" alt="Fidson Logo" class="w-10 h-10 mb-2" />
      </div>
      <div class="w-1/6 grow">
        <h3 class="font-semibold text-gray-500">Supplier Info</h3>
        <p class="text-gray-600">
          <img src="" alt="" class="inline w-4 h-4" />
          Fidson Healthcare
        </p>
        <p class="text-gray-500 text-balance">
          <LucideMapPin class="inline w-4 h-4 stroke-gray-400"></LucideMapPin>
          4, Road 56, Lagos, Nigeria
        </p>
      </div>

      <!-- Contact Info -->
      <div class="w-1/6 grow">
        <h3 class="font-semibold text-gray-500">Contact Info</h3>
        <!-- <LucideMapPin class="inline w-4 h-4"></LucideMapPin> -->
        <p class="flex items-center gap-2 text-gray-500">
          <LucideMail class="inline w-4 h-4 stroke-gray-400"></LucideMail>
          musa@example.com
        </p>
        <p class="flex items-center gap-2 text-gray-500">
          <img src="" alt="" class="inline w-4 h-4" />

          +234 801 234 5678
        </p>
      </div>

      <!-- Bank Info -->
      <div class="w-1/6 grow">
        <h3 class="font-semibold text-gray-500">Bank Info</h3>
        <p class="flex items-center gap-2 text-gray-500">
          <img src="" alt="" class="inline w-4 h-4" />
          First Bank Plc
        </p>
        <p class="flex items-center gap-2 text-gray-500">
          <img src="" alt="" class="inline w-4 h-4" />

          -----
        </p>
      </div>
    </div>

    <!-- Purchase Order Stats -->
    <div class="grid w-1/2 grid-cols-5 gap-1 p-2 text-xs border bg-gray-50">
      <div v-for="(total, id) in totals" :key="total.name + id" :class="id == 4 ? '' : ' border-r '"
        class="p-2 text-center text-gray-500 border-gray-200 rounded-lg">
        <div class="flex items-center justify-center gap-2">
          <h4 class="text-xs text-gray-500">{{ total.name }}</h4>
          <p class="p-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md">
            {{ total.count }}
          </p>
        </div>
        <p v-if="total.amount" class="font-semibold text-gray-700">
          {{ total.amount }}
        </p>
      </div>
    </div>

    <!-- Tabs -->

    <!-- Search & Filter -->
  </div>
  <Grn> </Grn>
</template>
