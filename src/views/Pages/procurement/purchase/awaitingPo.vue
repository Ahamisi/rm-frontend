<template>
  <main>
    <!-- Desktop Header -->
    <div class="md:flex justify-between items-center px-4 mb-4 hidden">
      <div class="relative h-auto w-[23%]">
        <Search :modelValue="searchTerm" @update:modelValue="searchTerm = $event"
          @filterModalOpen="isFilterModalOpen = true" @filterOpen="isFilterOpen = true">
          <template #filter-modal>
            <UiFilterModal :isOpen="isFilterModalOpen" @close="isFilterModalOpen = false" @apply="handleFilterApply" />
          </template>
          <template #filter-dropdown>
            <UiFilterDropdown :isOpen="isFilterOpen" @close="isFilterOpen = false" @select="handleFilterSelection"
              :sort-order="sortOrder" :sort-field="sortField" />
          </template>
        </Search>
      </div>

      <button @click="$emit('createPurchaseOrder')"
        class="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">
        <span class="text-base"> + </span>
        <span class="text-xs"> Create Purchase Order </span>
      </button>
    </div>

    <!-- Mobile Header-->
    <div class="flex flex-col gap-3 mb-4 md:hidden">
      <div class="relative w-full">
        <Search :modelValue="searchTerm" @update:modelValue="searchTerm = $event"
          @filterModalOpen="isFilterModalOpen = true" @filterOpen="isFilterOpen = true">
          <template #filter-modal>
            <UiFilterModal :isOpen="isFilterModalOpen" @close="isFilterModalOpen = false" @apply="handleFilterApply" />
          </template>
          <template #filter-dropdown>
            <UiFilterDropdown :isOpen="isFilterOpen" @close="isFilterOpen = false" @select="handleFilterSelection"
              :sort-order="sortOrder" :sort-field="sortField" />
          </template>
        </Search>
      </div>

      <!-- Create Button -->
      <div class="w-full">
        <button @click="$emit('createPurchaseOrder')"
          class="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Create Purchase Order
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="fetchPurchaseStatus == 'loading'" class="h-[500px]">
      <StateLoadingState />
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block">
      <PurchaseOrderTable :headers="headers" :data="formattedPurchaseOrders" />
    </div>

    <!-- Mobile Table (horizontal scroll) -->
    <div class="block md:hidden">
      <div class="overflow-x-auto -mx-4">
        <PurchaseOrderTable :headers="headers" :data="formattedPurchaseOrders" />
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 overflow-x-auto">
      <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
    </div>
  </main>
</template>


<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { usePurchaseOrders } from "@/views/Composables/procurement/usePurchaseOrders";
import Search from "@/views/Components/procurement/Search.vue";
import UiFilterModal from "@/views/Components/procurement/ui/FilterModal.vue";
import UiFilterDropdown from "@/views/Components/procurement/ui/FilterDropdown.vue";
import CustomPagination from "@/views/Components/procurement/customPagination.vue";
import PurchaseOrderTable from "@/views/Components/procurement/purchase/orderTable.vue";
import { LucideEllipsisVertical } from "lucide-vue-next";
import StateLoadingState from "@/views/Components/procurement/state/LoadingState.vue";

defineEmits(["createPurchaseOrder"]);
const { fetchPurchaseOrders, totalPages, isLoading } = usePurchaseOrders();
const purchaseOrders = ref<any[]>([]);
const fetchPurchaseStatus = ref<"pending" | "loading" | "success" | "error">(
  "pending"
);
onMounted(async () => {
  try {
    fetchPurchaseStatus.value = "loading";
    purchaseOrders.value = await fetchPurchaseOrders();
    fetchPurchaseStatus.value = "success";
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    fetchPurchaseStatus.value = "error";
  }
});

const page = ref(1);
const searchTerm = ref("");
const sortField = ref("created_at");
const sortOrder = ref("desc");

const handleFilterSelection = (value: string) => {
  if (value === "asc" || value === "desc") {
    sortOrder.value = value;
  } else {
    sortField.value = value;
  }
};

const appliedFilters = ref({
  fromDate: "",
  toDate: "",
});

// Transform API data for the table
const formattedPurchaseOrders = computed(() => {
  return purchaseOrders.value.map((order) => ({
    id: order.id,
    orderNo: order.orderNo,
    supplierName: order.supplierName || "N/A",
    type: order.type || "N/A",
    date: order.date || "N/A",
    totalAmount: order.totalAmount || 0,
    assigned: order.assigned.image || order.assigned.name,
  }));
});

watch(
  [page, searchTerm, appliedFilters, sortOrder, sortField],
  async () => {
    fetchPurchaseStatus.value = "loading";
    try {
      purchaseOrders.value = await fetchPurchaseOrders({
        page: page.value,
        searchTerm: searchTerm.value,
        fromDate: appliedFilters.value.fromDate,
        toDate: appliedFilters.value.toDate,
      });
      fetchPurchaseStatus.value = "success";
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      fetchPurchaseStatus.value = "error";
    }
  },
  { deep: true }
);

const handleFilterApply = (filters: any) => {
  appliedFilters.value = filters;
  page.value = 1;
};

const isFilterOpen = ref(false);
const isFilterModalOpen = ref(false);

const headers = [
  { label: "Order No.", value: "orderNo" },
  { label: "Supplier Name", value: "supplierName", sortable: true },
  { label: "Type", value: "type" },
  { label: "Date", value: "date", sortable: true },
  { label: "Total Amount", value: "totalAmount", sortable: true },
  { label: "Assigned", value: "assigned" },
  { label: "Action", value: "action" },
];
</script>
