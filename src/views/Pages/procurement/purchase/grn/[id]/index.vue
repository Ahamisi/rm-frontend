<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  LucideChevronLeft,
  LucideCheck,
  LucidePencil,
  LucideTrash2,
} from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { usePurchaseOrders } from "@/views/Composables/procurement/usePurchaseOrders";
import { PurchaseOrder, purchaseOrderStatusMap } from "@/types";
import { useSuppliers } from "@/views/Composables/procurement/useSuppliers";

const route = useRoute();
const router = useRouter();
const { fetchPurchaseOrder, approvePurchaseOrder } = usePurchaseOrders();
const { fetchAllSuppliers } = useSuppliers();
const suppliers = ref([]);
// const selectedSupplier = ref("");

const purchase = ref<any>(null);
const approved = ref(false);
const copy = ref(false);
const purchaseData = reactive({
  discount: "",
  type: "",
  date: "",
  deliveryDate: "",
  supplier_id: "",
});

const formatPrice = (amount: number) =>
  amount?.toLocaleString("en-NG", { style: "currency", currency: "NGN" }) ||
  "₦0.00";

onMounted(async () => {
  const id = route.params.id;
  if (!id) {
    close();
    return;
  }
  purchase.value = await fetchPurchaseOrder(id);
  const fetchedSuppliers = await fetchAllSuppliers();

  suppliers.value = fetchedSuppliers.map((s) => ({
    id: s.id,
    name: s.name,
  }));

  // Preselect supplier from query param
  purchaseData.date = purchase.value.date;
  purchaseData.discount = purchase.value.discount;
  purchaseData.deliveryDate = purchase.value.deliveryDate;
  purchaseData.supplier_id = purchase.value.supplierId;
  purchaseData.type = purchase.value.type;
});

const approveOrder = async () => {
  try {
    await approvePurchaseOrder(purchase.value.id);
    approved.value = true;
    close();
  } catch (error) {
  } finally {
  }
};

const close = () => router.push("/purchase");
</script>

<template>
  <main class="bg-white px-12 py-4">
    <!-- Breadcrumb -->
    <nav class="text-[#626F86] mb-6 text-sm space-x-2">
      <router-link to="/purchase" class="hover:underline">Purchase Order</router-link>
      <span>/</span>
      <router-link to="/purchase" class="hover:underline">{{
        route.query?.from || "Awaiting PO Approval"
        }}</router-link>
      <span>/</span>
      <span class="crumb-text cursor-pointer underline uppercase">{{
        purchase?.orderNo || "Unavailable"
        }}</span>
      <span> - </span>
      <span class="crumb-text cursor-pointer underline uppercase">{{
        purchase?.supplierName || "Unavailable"
        }}</span>
    </nav>

    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2 cursor-pointer text-xs text-[#44546F]" @click="close">
        <LucideChevronLeft class="w-5 h-5 text-[#44546F]"> </LucideChevronLeft>
        <span>Back</span>
      </div>
      <div class="flex items-center gap-2">
        <p class="page-title-text text-[#172B4D]">View GRN</p>
        <img src="@/views/Pages/procurement/redesign/copy.svg" v-if="!copy" alt="copy" class="h-6 w-6 cursor-pointer"
          @click="copy = !copy" />
        <LucideCheck class="h-4 w-4 text-text-subtlest" v-else></LucideCheck>
        <div class="">
          <span class="crumb-text cursor-pointer underline uppercase">{{
            purchase?.orderNo || "Unavailable"
            }}</span>
          <span> - </span>
          <span class="crumb-text cursor-pointer underline uppercase">{{
            purchase?.supplierName || "Unavailable"
            }}</span>
        </div>
      </div>

      <button v-if="!approved" @click="approveOrder"
        class="bg-bg-blueBg text-white navigation-text px-5 py-2 rounded flex items-center gap-2">
        Approve
        <LucideCheck class="h-4 w-4"></LucideCheck>
      </button>
    </div>

    <!-- Supplier’s Information -->
    <section class="bg-[#F7F8F9] rounded-lg p-6 mb-6">
      <h3 class="page-title-text text-[#172B4D] mb-4">
        Supplier’s Information
      </h3>
      <div class="grid grid-cols-5 gap-4">
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Supplier</label>
          <select v-model="purchaseData.supplier_id"
            class="medium-text text-text-default appearance-auto w-full p-2.5 border-[2px] bg-white border-[#091E4224] rounded-lg">
            <option value="" disabled>Select supplier</option>
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id"
              class="medium-text text-text-default">
              {{ supplier.name }}
            </option>
          </select>
        </div>
        <!-- <div>
          <label class="block navigation-text text-[#44546F] mb-1"
            >Purchase date</label
          >
          <input
            type="date"
            v-model="purchaseData.date"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg"
          />

        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1"
            >Delivery date</label
          >
          <input
            type="date"
            v-model="purchaseData.deliveryDate"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg"
          />
        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1"
            >Discount (%)</label
          >
          <input
            type="number"
            v-model="purchaseData.discount"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg"
          />
        </div> -->
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Type</label>
          <select v-model="purchaseData.type"
            class="medium-text text-text-default appearance-auto w-full p-2.5 border-[2px] border-[#091E4224] bg-white rounded-lg">
            <option class="medium-text text-text-default" value="" disabled>
              Select a trade type
            </option>
            <option class="medium-text text-text-default" value="trade">
              Trade
            </option>
            <option class="medium-text text-text-default" value="service">
              Service
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- All Items -->
    <section class="bg-[#F7F8F9] rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <p class="page-title-text text-[#172B4D]">All Items</p>
        <button
          class="navigation-text border-[#091E4224] text-text-default bg-white border px-4 py-1 rounded flex items-center gap-1">
          + Add Item
        </button>
      </div>
      <!--
      <table
        class="w-full bg-white rounded-lg overflow-hidden border-2px border-[#D0D4D7]"
      >
        <thead
          class="bg-[#F1F3F5] border border-[#D0D4D7] text-left text-xs text-[#44546F]"
        >
          <tr class="rounded-lg">
            <th class="py-3 px-4">Item name</th>
            <th class="py-3 px-4">Purchased Qty</th>
            <th class="py-3 px-4">Price</th>
            <th class="py-3 px-4">Unit Cost</th>
            <th class="py-3 px-4">Discount (%)</th>
            <th class="py-3 px-4">Total Amount</th>
            <th class="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody class="border border-[#D0D4D7] text-left text-xs text-[#44546F]">
          <tr
            v-for="(item, index) in purchase?.items || []"
            :key="index"
            class="rounded-lg border-t text-sm text-[#626F86]"
          >
            <td class="py-3 px-4">{{ item.item_name || "Unavailable" }}</td>
            <td class="py-3 px-4">{{ item.purchased_quantity }}</td>
            <td class="py-3 px-4">₦{{ formatPrice(item.price) }}</td>
            <td class="py-3 px-4">₦{{ formatPrice(item.unit_cost) }}</td>
            <td class="py-3 px-4">{{ item.discount || 0 }}%</td>
            <td class="py-3 px-4">₦{{ formatPrice(item.total_amount) }}</td>
            <td class="py-3 px-4 flex items-center gap-2">
              <button class="text-text-default">
                <LucidePencil class="w-4 h-4" />
              </button>
              <button class="text-text-default">
                <LucideTrash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table> -->

      <div class="overflow-auto rounded-lg border border-[#D0D4D7]">
        <table class="w-full bg-white">
          <thead class="bg-[#F1F3F5] border-b border-[#D0D4D7] text-left text-xs text-[#44546F]">
            <tr>
              <th class="py-3 px-4">Item name</th>
              <th class="py-3 px-4">Purchased Qty</th>
              <th class="py-3 px-4">Price</th>
              <th class="py-3 px-4">Unit Cost</th>
              <th class="py-3 px-4">Discount (%)</th>
              <th class="py-3 px-4">Total Amount</th>
              <th class="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody class="text-left text-xs text-[#44546F]">
            <tr v-for="(item, index) in purchase?.items || []" :key="index" class="border-t text-sm text-[#626F86]">
              <td class="py-3 px-4">{{ item.item_name || "Unavailable" }}</td>
              <td class="py-3 px-4">{{ item.purchased_quantity }}</td>
              <td class="py-3 px-4">₦{{ formatPrice(item.price) }}</td>
              <td class="py-3 px-4">₦{{ formatPrice(item.unit_cost) }}</td>
              <td class="py-3 px-4">{{ item.discount || 0 }}%</td>
              <td class="py-3 px-4">₦{{ formatPrice(item.total_amount) }}</td>
              <td class="py-3 px-4 flex items-center gap-2">
                <button class="text-text-default">
                  <LucidePencil class="w-4 h-4" />
                </button>
                <button class="text-text-default">
                  <LucideTrash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
