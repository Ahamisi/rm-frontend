<template>
  <main>
    <div class="flex justify-between items-center px-4">
      <Search :modelValue="searchTerm" @update:modelValue="searchTerm = $event"
        @filterModalOpen="isFilterModalOpen = true" @filterOpen="isFilterOpen = true">
        <template #filter-modal>
          <UiFilterModal :isOpen="isFilterModalOpen" @close="isFilterModalOpen = false" @apply="handleFilterApply" />
        </template>
        <template #filter-dropdown>
          <UiFilterDropdown :isOpen="isFilterOpen" @close="isFilterOpen = false" />
        </template>
      </Search>
      <button @click="$emit('createPurchaseOrder')"
        class="bg-blue-600 text-white px-4 py-1.5 cursor-pointer rounded-lg hover:bg-blue-700">
        <span class="text-base"> + </span>
        <span class="text-xs"> Create Purchase Order </span>
      </button>
    </div>
    <div class="mt-4">
      <div v-if="fetchPurchaseStatus == 'loading'" class="h-[500px]">
        <StateLoadingState> </StateLoadingState>
      </div>
      <PurchaseOrderTable v-else :headers="headers" :data="formattedPurchaseOrders" />
      <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
    </div>
  </main>
</template>


<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { usePurchaseOrders } from "@/views/Composables/procurement/usePurchaseOrders";
import Search from "@/views/Components/procurement/Search.vue";
import UiFilterModal from "@/views/Components/ui/FilterModal.vue";
import UiFilterDropdown from "@/views/Components/ui/FilterDropdown.vue";
import CustomPagination from "@/views/Components/customPagination.vue";
import PurchaseOrderTable from "@/views/Components/purchase/orderTable.vue";
import { LucideEllipsisVertical } from "lucide-vue-next";
import StateLoadingState from "@/views/Components/state/LoadingState.vue";

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
    console.error("Error fetching suppliers:", error);
    fetchPurchaseStatus.value = "error";
  }
});

const page = ref(1);
const searchTerm = ref("");
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
  [page, searchTerm, appliedFilters],
  () => {
    fetchPurchaseOrders({
      page: page.value,
      searchTerm: searchTerm.value,
      fromDate: appliedFilters.value.fromDate,
      toDate: appliedFilters.value.toDate,
    });
  },
  { immediate: true }
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

<!-- <script setup lang="ts">
import defaultAvatar from "../../assets/images/avatarImage.png";
import femiAvater from "../../assets/images/femiImg.png"
import joshAvater from "../../assets/images/joshImg.png"
import janeAvater from "../../assets/images/janeImg.png"
import { ref, computed } from "vue";
import { useModal } from "@/views/Composables/useModal";
import { usePagination } from "@/views/Composables/usePagination";
import { useRouter, useRoute } from "vue-router";
import { useDropdown } from "@/views/Composables/useDropdown";
import { useFilterModal } from "@/views/Composables/useFilterModal";
import {useModalOpen} from "@/views/Composables/useModalOpen"
import UiFilterModal from "@/views/Components/ui/FilterModal.vue"
import UiFilterDropdown from "@/views/Components/ui/FilterDropdown.vue"
import Search from '@/views/Components/Search.vue'
import {LucideEllipsisVertical} from 'lucide-vue-next'
import PurchaseOrderTable from '@/views/Components/purchase/orderTable.vue'
import CustomPagination from '@/views/Components/customPagination.vue'


const router = useRouter();
const { showModal, openModal, closeModal } = useModal();
const search = ref("");
const isAscending = ref(false);
const selectedStatus = ref("");

interface TableHeader {
    label: string;
    value: keyof TableRow;
    sortable?: boolean;
}

interface AssignedPerson {
    name: string;
    image: string | null;
}

interface TableRow {
    orderNo: string;
    supplierName: string;
    type: string;
    date: string;
    totalAmount: number;
    assigned: AssignedPerson;
    action?: string;
}

const headers: TableHeader[] = [
    { label: "Order No.", value: "orderNo" },
    { label: "Supplier Name", value: "supplierName", sortable: true },
    { label: "Type", value: "type" },
    { label: "Date", value: "date", sortable: true },
    { label: "Total Amount", value: "totalAmount", sortable: true },
    { label: "Assigned", value: "assigned" },
    { label: "Action", value: "action" }
];

const tableData: TableRow[] = [
    { orderNo: "RHPO-1651244214", supplierName: "Fidson Healthcare", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Unassigned", image: null } },
    { orderNo: "RHPO-1651244214", supplierName: "EVANS THERAPEUTICS LTD", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Femi Babalola", image: defaultAvatar  } },
    { orderNo: "RHPO-1651244214", supplierName: "EVANS THERAPEUTICS LTD", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Esther Joel", image: defaultAvatar  } },
    { orderNo: "RHPO-1651244214", supplierName: "Fidson Healthcare", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Esther Joel", image: defaultAvatar  } },
    { orderNo: "RHPO-1651244214", supplierName: "Emzor Pharmaceuticals", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Esther Joel", image: defaultAvatar  } },
    { orderNo: "RHPO-1651244214", supplierName: "Fidson Healthcare", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Femi Babalola", image: femiAvater } },
    { orderNo: "RHPO-1651244214", supplierName: "Emzor Pharmaceuticals", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Femi Babalola", image: femiAvater } },
    { orderNo: "RHPO-1651244214", supplierName: "Fidson Healthcare", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Sarah Badmus", image: janeAvater } },
    { orderNo: "RHPO-1651244214", supplierName: "Emzor Pharmaceuticals", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Sarah Badmus", image: janeAvater } },
    { orderNo: "RHPO-1651244214", supplierName: "Fidson Healthcare", type: "Trade", date: "5/21/2024", totalAmount: 2055043, assigned: { name: "Josh Michael", image: joshAvater } },
];

const filteredData = computed(() => {
    if (!search.value) return tableData;
    return tableData.filter(row =>
        row.supplierName.toLowerCase().includes(search.value.toLowerCase())
    );
});

const formatCurrency = (amount: number | string): string => {
    const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₦${numericAmount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const { page, paginatedItems, totalPages } = usePagination(filteredData, 10);

const emit = defineEmits(["createPurchaseOrder"]);

const openCreatePurchaseOrder = () => {
    router.push({ query: { ...router.currentRoute.value.query, create: "true" } });
    emit("createPurchaseOrder");
};

const {isOpen, toggle} = useDropdown()
const {isModalOpen, toggleModal} = useModalOpen()
const handleFilterSelection = (filter: string) => {
  console.log("Selected filter:", filter);
};

const handleFilterApply = (filters: any) => {
  console.log("Filters Applied:", filters);
};
</script> -->
