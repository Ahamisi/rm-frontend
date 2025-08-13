<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
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
import EditIcon from "@/views/Pages/procurement/redesign/edit.svg";
import TrashIcon from "@/views/Pages/procurement/redesign/trash.svg";
import PaymentItemForm from "@/views/Components/procurement/purchase/PaymentItemForm.vue";
import SuccessModal from "@/views/Components/procurement/ui/SuccessModal.vue";
import ErrorModal from "@/views/Components/procurement/ui/ErrorModal.vue";
import AssignIcon from "@/views/Pages/procurement/redesign/assign.svg";

const route = useRoute();
const router = useRouter();
const {
  fetchPurchaseOrder,
  approvePurchaseOrder,
  assignOrder: aO,
} = usePurchaseOrders();
const { fetchAllSuppliers } = useSuppliers();
const suppliers = ref([]);
const isItemFormOpen = ref(false);
const selectedItem = ref(null);

const isSuccessModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");

const isAssignMode = computed(() => route.query.assign === "true");

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
    modalTitle.value = "Approval Successful";
    modalMessage.value = "The purchase order has been approved.";
    isSuccessModalOpen.value = true;
  } catch (error: any) {
    modalTitle.value = "Approval Failed";
    modalMessage.value =
      error.response?.data?.error || "An unexpected error occurred.";
    isErrorModalOpen.value = true;
  }
};

const assignOrder = async () => {
  try {
    await aO(purchase.value.id);
    modalTitle.value = "Assignment Successful";
    modalMessage.value = "The purchase order has been assigned to you.";
    isSuccessModalOpen.value = true;
  } catch (error: any) {
    modalTitle.value = "Assignment Failed";
    modalMessage.value =
      error.response?.data?.error || "An unexpected error occurred.";
    isErrorModalOpen.value = true;
  }
};

const handleAddItem = () => {
  selectedItem.value = null;
  isItemFormOpen.value = true;
};

const handleEditItem = (item: any) => {
  selectedItem.value = item;
  isItemFormOpen.value = true;
};

const saveItem = (itemData: any) => {
  if (!purchase.value?.items) {
    purchase.value.items = [];
  }

  const existingItemIndex = purchase.value.items.findIndex(
    (i: any) => i.id === itemData.id
  );

  const newItem = {
    id: itemData.id || itemData.itemId, // Use existing id or new item id
    item_name: itemData.name,
    purchased_quantity: itemData.quantity,
    price: itemData.price_per_pack,
    unit_cost: itemData.unit_cost,
    discount: itemData.discount,
    total_amount:
      itemData.quantity *
      itemData.price_per_pack *
      (1 - itemData.discount / 100),
  };

  if (existingItemIndex > -1) {
    // Update existing item
    purchase.value.items[existingItemIndex] = newItem;
  } else {
    // Add new item
    purchase.value.items.push(newItem);
  }
};

const handleSuccessModalClose = () => {
  isSuccessModalOpen.value = false;
  close();
};

const close = () => router.push("/purchase");
</script>

<template>
  <main class="px-8 py-4 bg-white">
    <!-- Breadcrumb -->
    <nav class="text-[#626F86] mb-6 text-sm space-x-2 mx-3">
      <router-link to="/purchase" class="hover:underline">Purchase Order</router-link>
      <span>/</span>
      <router-link to="/purchase" class="hover:underline">{{
        route.query?.from || "Awaiting PO Approval"
        }}</router-link>
      <span>/</span>
      <span class="underline uppercase cursor-pointer crumb-text">{{
        purchase?.orderNo || "Unavailable"
        }}</span>
      <span> - </span>
      <span class="underline uppercase cursor-pointer crumb-text">{{
        purchase?.supplierName || "Unavailable"
        }}</span>
    </nav>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2 cursor-pointer text-xs text-[#44546F]" @click="close">
        <LucideChevronLeft class="w-5 h-5 text-[#44546F]"> </LucideChevronLeft>
        <span>Back</span>
      </div>
      <div class="flex items-center gap-2">
        <p class="page-title-text text-[#172B4D]">View Purchase Order</p>
        <img src="@/views/Pages/procurement/redesign/copy.svg" v-if="!copy" alt="copy" class="w-6 h-6 cursor-pointer"
          @click="copy = !copy" />
        <LucideCheck class="w-4 h-4 text-text-subtlest" v-else></LucideCheck>
        <div class="">
          <span class="underline uppercase cursor-pointer crumb-text">{{
            purchase?.orderNo || "Unavailable"
            }}</span>
          <span> - </span>
          <span class="underline uppercase cursor-pointer crumb-text">{{
            purchase?.supplierName || "Unavailable"
            }}</span>
        </div>
      </div>

      <button v-if="isAssignMode" @click="assignOrder"
        class="flex items-center gap-2 px-5 py-2 text-white rounded bg-bg-blueBg navigation-text">
        <AssignIcon class="w-4 h-4 stroke-1 fill-white" />
        Assign to Me
      </button>
      <button v-else-if="!approved" @click="approveOrder"
        class="flex items-center gap-2 px-5 py-2 text-white rounded bg-bg-blueBg navigation-text">
        Approve
        <LucideCheck class="w-4 h-4"></LucideCheck>
      </button>
    </div>

    <!-- Supplier's Information -->
    <section class="bg-[#F7F8F9] rounded-lg p-6 mb-6">
      <h3 class="page-title-text text-[#172B4D] mb-4">
        Supplier's Information
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
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Purchase date</label>
          <input type="date" v-model="purchaseData.date"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg" />
          <!-- <div class="bg-white border border-[#D0D4D7] rounded-lg p-2">
            {{ purchase?.purchase_date }}
          </div> -->
        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Delivery date</label>
          <input type="date" v-model="purchaseData.deliveryDate"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg" />
        </div>
        <div>
          <label class="block navigation-text text-[#44546F] mb-1">Discount (%)</label>
          <input type="number" v-model="purchaseData.discount"
            class="medium-text text-text-default w-full p-2 border-[2px] border-[#091E4224] rounded-lg" />
        </div>
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
      <div class="flex items-center justify-between mb-4">
        <p class="page-title-text text-[#172B4D]">All Items</p>
        <button @click="handleAddItem"
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
            <th class="px-4 py-3">Item name</th>
            <th class="px-4 py-3">Purchased Qty</th>
            <th class="px-4 py-3">Price</th>
            <th class="px-4 py-3">Unit Cost</th>
            <th class="px-4 py-3">Discount (%)</th>
            <th class="px-4 py-3">Total Amount</th>
            <th class="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody class="border border-[#D0D4D7] text-left text-xs text-[#44546F]">
          <tr
            v-for="(item, index) in purchase?.items || []"
            :key="index"
            class="rounded-lg border-t text-sm text-[#626F86]"
          >
            <td class="px-4 py-3">{{ item.item_name || "Unavailable" }}</td>
            <td class="px-4 py-3">{{ item.purchased_quantity }}</td>
            <td class="px-4 py-3">₦{{ formatPrice(item.price) }}</td>
            <td class="px-4 py-3">₦{{ formatPrice(item.unit_cost) }}</td>
            <td class="px-4 py-3">{{ item.discount || 0 }}%</td>
            <td class="px-4 py-3">₦{{ formatPrice(item.total_amount) }}</td>
            <td class="flex items-center gap-2 px-4 py-3">
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
              <th class="px-4 py-3">Item name</th>
              <th class="px-4 py-3">Purchased Qty</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3">Unit Cost</th>
              <th class="px-4 py-3">Discount (%)</th>
              <th class="px-4 py-3">Total Amount</th>
              <th class="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody class="text-left text-xs text-[#44546F]">
            <tr v-for="(item, index) in purchase?.items || []" :key="index" class="border-t text-sm text-[#626F86]">
              <td class="px-4 py-3">{{ item.item_name || "Unavailable" }}</td>
              <td class="px-4 py-3">{{ item.purchased_quantity }}</td>
              <td class="px-4 py-3">₦{{ formatPrice(item.price) }}</td>
              <td class="px-4 py-3">₦{{ formatPrice(item.unit_cost) }}</td>
              <td class="px-4 py-3">{{ item.discount || 0 }}%</td>
              <td class="px-4 py-3">₦{{ formatPrice(item.total_amount) }}</td>
              <td class="py-3 px-4 flex items-center gap-2 border-l border-[#D0D4D7]">
                <button @click="handleEditItem(item)" class="text-text-default">
                  <!-- <LucidePencil class="w-4 h-4" /> -->
                  <EditIcon class="w-4 h-4" />
                </button>
                <button class="text-text-default">
                  <!-- <LucideTrash2 class="w-4 h-4" /> -->
                  <TrashIcon class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
  <PaymentItemForm v-model="isItemFormOpen" :selected-item="selectedItem" @save="saveItem" />
  <SuccessModal :modelValue="isSuccessModalOpen" @update:modelValue="handleSuccessModalClose" :title="modalTitle"
    :message="modalMessage" />

  <ErrorModal v-model="isErrorModalOpen" :title="modalTitle" :message="modalMessage" />
</template>
