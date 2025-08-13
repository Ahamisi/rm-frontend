<script setup lang="ts">
import Grn from "@/views/Components/purchase/Grn.vue";
import SuppliersPageCrumbs from "@/views/Components/suppliers/PageCrumbs.vue";
import StateLoadingState from "@/views/Components/state/LoadingState.vue";
import SupplierForm from "@/views/Components/suppliers/SupplierForm.vue";
import SupplierDeleteModal from "@/views/Components/suppliers/DeleteModal.vue";

import { onMounted, ref } from "vue";
import { LucideMapPin, LucideMail } from "lucide-vue-next";
import { truncate } from "@/views/helpers/truncate";

import { useRoute, useRouter } from "vue-router";
import { Supplier } from "@/types";
import { useSuppliers } from "@/views/Composables/useSuppliers";
const route = useRoute();
const router = useRouter();
const supplierId = route.params.id;
const id = Array.isArray(supplierId) ? supplierId[0] : supplierId;

const { fetchSupplier, deleteSuppliers } = useSuppliers();
const supplier = ref<Supplier>();
const fetchSupplierStatus = ref<"pending" | "loading" | "success" | "error">(
  "pending"
);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

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
    count: 12,
  },
  {
    name: "Returns",
    count: 0,
  },
]);

const handleDelete = async () => {
  await deleteSuppliers({ id });
  router.push({ name: "suppliers" });
};

onMounted(async () => {
  try {
    fetchSupplierStatus.value = "loading";
    const response = await fetchSupplier({ id });
    supplier.value = response;
    fetchSupplierStatus.value = "success";
  } catch (error) {
    fetchSupplierStatus.value = "error";
  }
});
</script>

<template>
  <div v-if="fetchSupplierStatus === 'loading' && !supplier">
    <StateLoadingState></StateLoadingState>
  </div>
  <div v-else-if="supplier" class="flex flex-col gap-4 py-8">
    <SuppliersPageCrumbs :title="supplier.supplierName" :supplierId="supplier.id" @edit="isEditModalOpen = true"
      @delete="isDeleteModalOpen = true"></SuppliersPageCrumbs>

    <div class="bg-white border border-gray-200 rounded-lg flex md:w-2/3 py-4 mx-6">
      <div v-for="(total, index) in totals" :key="total.name" class="flex-1 p-4"
        :class="{ 'border-r border-gray-200': index < totals.length - 1 }">
        <div class="flex items-center justify-between">
          <p class="medium-text text-text-subtlest">{{ total.name }}</p>
          <span v-if="total.amount" class="bg-gray-100 agg-count-text text-text-default px-2 py-0.5 rounded-md">{{
            total.count }}</span>
        </div>

        <p class="text-lg agg-amount-text text-text-default mt-2">
          {{ total.amount ? total.amount : total.count }}
        </p>
      </div>
    </div>

    <Grn />
    <SupplierForm v-model="isEditModalOpen" :selected-supplier="supplier" @refresh="fetchSupplier({ id })" />
  </div>
  <SupplierDeleteModal :isOpen="isDeleteModalOpen" :supplierName="supplier?.supplierName"
    @close="isDeleteModalOpen = false" @confirm="handleDelete" />
</template>
