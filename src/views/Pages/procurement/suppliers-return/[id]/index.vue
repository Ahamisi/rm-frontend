<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import {
  LucideChevronLeft,
  LucideCheck,
  LucidePencil,
  LucideTrash2,
} from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { useReturns } from "@/views/Composables/procurement/useReturns";
import { useSuppliers } from "@/views/Composables/procurement/useSuppliers";
import SelectWithSearchField, {
  type Option,
} from "@/views/Components/procurement/ui/SelectWithSearchField.vue";

const route = useRoute();
const router = useRouter();
const { fetchReturn } = useReturns();
const { fetchAllSuppliers, fetchSupplierGRNs } = useSuppliers();

const suppliers = ref<Option[]>([]);
const grns = ref<Option[]>([]);
const s_return = ref<any>(null);
const copy = ref(false);

const selectedSupplier = ref<Option | null>(null);
const selectedGrn = ref<Option | null>(null);

const returnData = reactive({
  return_date: "",
});

const formatPrice = (amount: number) =>
  `₦${amount?.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) || "0.00"
  }`;

watch(selectedSupplier, async (newSupplier) => {
  if (newSupplier) {
    const fetchedGRNs = await fetchSupplierGRNs({ id: newSupplier.id });
    grns.value = fetchedGRNs.map((g: any) => ({ id: g.id, name: g.orderNo }));
    if (s_return.value?.grnId) {
      selectedGrn.value =
        grns.value.find((g) => g.id === s_return.value.grnId) || null;
    }
  }
});

onMounted(async () => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  if (!id) {
    close();
    return;
  }
  s_return.value = await fetchReturn({ id });

  const fetchedSuppliers = await fetchAllSuppliers();
  suppliers.value = fetchedSuppliers.map((s: any) => ({
    id: s.id,
    name: s.name,
  }));

  if (s_return.value?.supplierId) {
    selectedSupplier.value =
      suppliers.value.find((s) => s.id === s_return.value.supplierId) || null;
  }

  returnData.return_date = s_return.value.returnDate;
});

const close = () => router.push("/suppliers-return");
</script>

<template>
  <main class="px-12 py-4 bg-white">
    <!-- Breadcrumb -->
    <nav class="text-[#626F86] mb-6 text-sm space-x-2">
      <router-link to="/suppliers-return" class="hover:underline">Supplier's Return</router-link>
      <span>/</span>
      <span class="underline uppercase cursor-pointer crumb-text">{{
        s_return?.orderNo || "Unavailable"
      }}</span>
      <span> - </span>
      <span class="underline uppercase cursor-pointer crumb-text">{{
        s_return?.supplierName || "Unavailable"
      }}</span>
    </nav>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2 cursor-pointer text-xs text-[#44546F]" @click="close">
        <LucideChevronLeft class="w-5 h-5 text-[#44546F]"> </LucideChevronLeft>
        <span>Back</span>
      </div>
      <div class="flex items-center gap-2">
        <p class="page-title-text text-[#172B4D]">View Supplier's Return</p>
        <img src="@/views/Pages/procurement/redesign/copy.svg" v-if="!copy" alt="copy" class="w-6 h-6 cursor-pointer"
          @click="copy = !copy" />
        <LucideCheck class="w-4 h-4 text-text-subtlest" v-else></LucideCheck>
        <div class="">
          <span class="underline uppercase cursor-pointer crumb-text">{{
            s_return?.orderNo || "Unavailable"
          }}</span>
          <span> - </span>
          <span class="underline uppercase cursor-pointer crumb-text">{{
            s_return?.supplierName || "Unavailable"
          }}</span>
        </div>
      </div>
    </div>

    <!-- Supplier's Information -->
    <section class="bg-[#F7F8F9] rounded-lg p-6 mb-6">
      <h3 class="page-title-text text-[#172B4D] mb-4">
        Supplier's Information
      </h3>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Supplier</label>
          <SelectWithSearchField v-model="selectedSupplier" :options="suppliers"
            placeholder="Type to search for a supplier" />
        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">GRN</label>
          <SelectWithSearchField v-model="selectedGrn" :options="grns" placeholder="Type to search for a GRN" />
        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Return Date</label>
          <input type="date" v-model="returnData.return_date"
            class="medium-text text-text-default w-full p-2 border-[2px] bg-white border-[#091E4224] rounded-lg" />
        </div>
      </div>
    </section>

    <!-- All Items -->
    <section class="bg-[#F7F8F9] rounded-lg p-6">
      <div class="overflow-auto rounded-lg border border-[#D0D4D7]">
        <table class="w-full bg-white">
          <thead class="bg-[#F1F3F5] border-b border-[#D0D4D7] text-left text-xs text-[#44546F]">
            <tr>
              <th class="px-4 py-3"><input type="checkbox" /></th>
              <th class="px-4 py-3">Item</th>
              <th class="px-4 py-3">Batch No</th>
              <th class="px-4 py-3">Quantity Supplied</th>
              <th class="px-4 py-3">Quantity to Return</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3">Discount (%)</th>
              <th class="px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody class="text-left text-xs text-[#44546F]">
            <tr v-for="(item, index) in s_return?.items || []" :key="index" class="border-t text-sm text-[#626F86]">
              <td class="px-4 py-3"><input type="checkbox" /></td>
              <td class="px-4 py-3">{{ item.name || "Unavailable" }}</td>
              <td class="px-4 py-3">{{ item.batch_no }}</td>
              <td class="px-4 py-3">{{ item.quantity_supplied }}</td>
              <td class="px-4 py-3">{{ item.quantity_to_return }}</td>
              <td class="px-4 py-3">{{ formatPrice(item.price) }}</td>
              <td class="px-4 py-3">{{ item.discount || "--" }}</td>
              <td class="px-4 py-3">{{ formatPrice(item.total_amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
