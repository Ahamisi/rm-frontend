<template>
  <main class="px-6 py-2">
    <div class="mx-4">
      <p class="text-text-subtlest title-text">Product Requests</p>
      <div class="mt-4">
        <div class="relative h-auto w-[23%]">
          <Search :modelValue="searchTerm" @update:modelValue="searchTerm = $event"
            @filterModalOpen="isFilterModalOpen = true" @filterOpen="isFilterOpen = true">
            <template #filter-modal>
              <UiFilterModal :isOpen="isFilterModalOpen" @close="isFilterModalOpen = false"
                @apply="handleFilterApply" />
            </template>
            <template #filter-dropdown>
              <UiFilterDropdown :isOpen="isFilterOpen" @close="isFilterOpen = false" @select="handleFilterSelection"
                :sort-order="sortOrder" :sort-field="sortField" />
            </template>
          </Search>
        </div>
      </div>
    </div>

    <!-- Table Component -->
    <div class="mt-6">
      <div v-if="fetchProductRequestsStatus === 'loading'" class="h-[500px]">
        <StateLoadingState />
      </div>
      <ProductRequestTable v-else :headers="headers" :data="productRequests" @sort="handleSortChange" />
    </div>

    <!-- Pagination Component -->
    <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  LucideEllipsisVertical,
  LucideEye,
  LucideBell,
  LucideTrash2,
} from "lucide-vue-next";
import Search from "@/views/Components/procurement/Search.vue";
import ProductRequestTable from "@/views/Components/procurement/product-requests/requestTable.vue";
import CustomPagination from "@/views/Components/procurement/customPagination.vue";
import { useproductRequests } from "@/views/Composables/procurement/useProductRequests";
import UiFilterDropdown from "@/views/Components/procurement/ui/FilterDropdown.vue";
import UiFilterModal from "@/views/Components/procurement/ui/FilterModal.vue";
import StateLoadingState from "@/views/Components/procurement/state/LoadingState.vue";

const router = useRouter();
const search = ref("");
const activeDropdown = ref<string | number | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const { productRequests, fetchProductRequests, totalPages, isLoading } =
  useproductRequests();

const fetchProductRequestsStatus = ref<
  "pending" | "loading" | "success" | "error"
>("pending");

onMounted(async () => {
  try {
    fetchProductRequestsStatus.value = "loading";
    await fetchProductRequests();
    fetchProductRequestsStatus.value = "success";
  } catch (error) {
    console.error("Error fetching product requests:", error);
    fetchProductRequestsStatus.value = "error";
  }
});

const page = ref(1);
const searchTerm = ref("");
const sortField = ref("date");
const sortOrder = ref("desc");
const appliedFilters = ref({
  fromDate: "",
  toDate: "",
});

const handleSortChange = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};

watch(
  [page, searchTerm, appliedFilters, sortField, sortOrder],
  async () => {
    fetchProductRequestsStatus.value = "loading";
    try {
      await fetchProductRequests({
        page: page.value,
        searchTerm: searchTerm.value,
        fromDate: appliedFilters.value.fromDate,
        toDate: appliedFilters.value.toDate,
      });
      fetchProductRequestsStatus.value = "success";
    } catch (error) {
      console.error("Error fetching product requests:", error);
      fetchProductRequestsStatus.value = "error";
    }
  },
  { deep: true }
);
const toggleDropdown = (id: string | number) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

const isFilterOpen = ref(false);
const isFilterModalOpen = ref(false);

const handleFilterApply = (filters: any) => {
  appliedFilters.value = filters;
  page.value = 1; // Reset to the first page
};

const handleFilterSelection = (value: string) => {
  if (value === "asc" || value === "desc") {
    sortOrder.value = value;
  } else {
    sortField.value = value;
  }
};
// **Handle clicking outside**
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const viewRequest = (id: string | number) => {
  console.log("View Request:", id);
  activeDropdown.value = null;
};

const notifyRequester = (id: string | number) => {
  console.log("Notify Requester:", id);
  activeDropdown.value = null;
};

const deleteRequest = (id: string | number) => {
  console.log("Delete Request:", id);
  activeDropdown.value = null;
};

interface TableHeader {
  label: string;
  value: keyof TableRow;
  sortable?: boolean;
}

interface TableRow {
  id: string | number;
  itemRequest: string;
  requesterName: string;
  date: string;
  action?: string;
}

const headers: TableHeader[] = [
  { label: "ID", value: "id" },
  { label: "Item Request", value: "itemRequest", sortable: true },
  { label: "Requester's Name", value: "requesterName", sortable: true },
  { label: "Date Requested", value: "date", sortable: true },
  { label: "Action", value: "action" },
];
</script>
