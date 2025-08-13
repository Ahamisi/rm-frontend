<script setup lang="ts">
import Grn from "@/views/Components/procurement/purchase/Grn.vue";
import SuppliersPageCrumbs from "@/views/Components/procurement/suppliers/PageCrumbs.vue";
import StateLoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import SupplierForm from "@/views/Components/procurement/suppliers/SupplierForm.vue";
import SupplierDeleteModal from "@/views/Components/procurement/suppliers/DeleteModal.vue";
import LocationIcon from "@/views/Components/procurement/icons/LocationIcon.vue";
import EmailIcon from "@/views/Components/procurement/icons/EmailIcon.vue";
import MobileIcon from "@/views/Components/procurement/icons/MobileIcon.vue";
import MarketIcon from "@/views/Components/procurement/icons/MarketIcon.vue";
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";

import { onMounted, ref } from "vue";
import { LucideMapPin, LucideMail } from "lucide-vue-next";
import { truncate } from "@/views/helpers/truncate";

import { useRoute, useRouter } from "vue-router";
import { Supplier } from "@/types";
import { useSuppliers } from "@/views/Composables/procurement/useSuppliers";
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
  <div v-else-if="supplier" class="flex flex-col gap-4 py-8 mx-6">
    <SuppliersPageCrumbs :title="supplier.supplierName" :supplierId="supplier.id" @edit="isEditModalOpen = true"
      @delete="isDeleteModalOpen = true"></SuppliersPageCrumbs>

    <div class="px-6">
      <div class="">
        <div class="flex justify-between items-start gap-2 md:w-[75%]">
          <img :src="supplier.logo || '/images/default.png'" alt="Supplier Logo"
            class="w-16 h-16 object-contain border rounded-md" />
          <div class="grid md:grid-cols-3 gap-4 flex-1">
            <div>
              <h3 class="navigation-text text-text-default">Supplier Info</h3>
              <div class="flex items-start gap-2 mt-1">
                <MarketIcon class="w-4 h-4" />
                <Tooltip :text="supplier.supplierName">
                  <span class="navigation-text text-text-subtle">
                    {{ supplier.supplierName }}
                  </span>
                </Tooltip>
              </div>
              <div class="flex items-start gap-2 mt-1">
                <LocationIcon class="w-4 h-4 flex-shrink-0" />
                <Tooltip :text="supplier.address">
                  <span class="navigation-text text-text-subtle">
                    {{ supplier.address }}
                  </span>
                </Tooltip>
              </div>
            </div>

            <div>
              <h3 class="navigation-text text-text-default">Contact Info</h3>
              <div class="flex items-center gap-2 mt-2">
                <EmailIcon class="w-4 h-4" />
                <Tooltip :text="supplier.email">
                  <span class="navigation-text text-text-subtle">
                    {{ supplier.email }}
                  </span>
                </Tooltip>
              </div>
              <div class="flex items-center gap-2 mt-1 text-gray-600">
                <MobileIcon class="w-4 h-4" />
                <Tooltip :text="supplier.phone">
                  <span class="navigation-text text-text-subtle">
                    {{ supplier.phone }}
                  </span>
                </Tooltip>
              </div>
            </div>

            <div>
              <h3 class="navigation-text text-text-default">Bank Info</h3>
              <div class="flex items-center gap-2 mt-2 text-text-subtle navigation-text">
                <MarketIcon class="w-4 h-4" />
                <Tooltip :text="supplier.bankName">
                  <span class="navigation-text text-text-subtle">
                    {{ supplier.bankName }}
                  </span>
                </Tooltip>
              </div>
              <div class="flex items-center gap-2 mt-1 text-text-subtle navigation-text">
                <!-- <span class="w-4 h-4"></span> -->
                <MobileIcon class="w-4 h-4" />
                <span class="navigation-text text-text-subtle">-----</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <!-- <div class="mx-6">
      <div
        class="bg-white border border-gray-200 rounded-lg flex md:w-2/3 py-4"
      >
        <div class="flex items-start gap-2"></div>
      </div>
    </div> -->
  </div>
  <Grn />
  <SupplierForm v-model="isEditModalOpen" :selected-supplier="supplier" @refresh="fetchSupplier({ id })" />
  <SupplierDeleteModal :isOpen="isDeleteModalOpen" :supplierName="supplier?.supplierName"
    @close="isDeleteModalOpen = false" @confirm="handleDelete" />
</template>
