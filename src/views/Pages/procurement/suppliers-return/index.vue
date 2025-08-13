<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useReturns } from "@/views/Composables/procurement/useReturns";
import Search from "@/views/Components/procurement/Search.vue";
import UiFilterModal from "@/views/Components/procurement/ui/FilterModal.vue";
import UiFilterDropdown from "@/views/Components/procurement/ui/FilterDropdown.vue";
import CustomPagination from "@/views/Components/procurement/customPagination.vue";
import SupplierReturnsTable from "@/views/Components/procurement/suppliers-return/ReturnTable.vue";
import ReturnDetails from "@/views/Components/procurement/suppliers-return/ReturnDetails.vue";
import StateLoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { useRouter } from "vue-router";

const { fetchReturns, isLoading, totalPages, totalReturns, error } =
  useReturns();
const returns = ref<any[]>([]);
const fetchReturnsStatus = ref<"pending" | "loading" | "success" | "error">(
  "pending"
);

const router = useRouter();

const selectedReturn = ref<any>(null);
const viewMode = ref<"list" | "details">("list");

const page = ref(1);
const searchTerm = ref("");
const sortField = ref("date");
const sortOrder = ref("desc");

const handleSortChange = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};

const isFilterOpen = ref(false);
const isFilterModalOpen = ref(false);

const appliedFilters = ref({
  fromDate: "",
  toDate: "",
  status: "",
});

const handleFilterApply = (filters: any) => {
  appliedFilters.value = filters;
  page.value = 1; // Reset to first page
};

const handleFilterSelection = (value: string) => {
  if (value === "asc" || value === "desc") {
    sortOrder.value = value;
  } else {
    sortField.value = value;
  }
};

const createNewReturn = () => {
  //   console.log("Dropdown Filter:", filter);
  router.push({
    name: "supplier-return-details",
    params: {
      id: 2,
    },
  });
};

const handleViewReturn = (s_return: any) => {
  selectedReturn.value = s_return;
  viewMode.value = "details";
};

const handleCloseDetails = () => {
  selectedReturn.value = null;
  viewMode.value = "list";
};

watch(
  [page, searchTerm, sortField, sortOrder, appliedFilters],
  async () => {
    if (viewMode.value === "list") {
      fetchReturnsStatus.value = "loading";
      try {
        returns.value = await fetchReturns({
          page: page.value,
          searchTerm: searchTerm.value,
          sortField: sortField.value,
          sortOrder: sortOrder.value,
          fromDate: appliedFilters.value.fromDate,
          toDate: appliedFilters.value.toDate,
          status: appliedFilters.value.status,
        });
        fetchReturnsStatus.value = "success";
      } catch (error) {
        console.error("Error fetching returns:", error);
        fetchReturnsStatus.value = "error";
      }
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="flex">
    <div v-if="viewMode === 'details' && selectedReturn" class="w-full">
      <ReturnDetails :s_return="selectedReturn" @close="handleCloseDetails" />
    </div>
    <div v-else class="flex-1 px-4 md:px-10">
      <div class="py-4">
        <h1 class="title-text text-text-subtlest">Supplier Returns</h1>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center justify-between">
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
        <button @click="createNewReturn()"
          class="max-w-fit bg-blue-600 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 medium-text">
          <span class="text-base"> + </span>
          <span class="text-xs"> Create Supplier's Return</span>
        </button>
      </div>

      <div>
        <div v-if="isLoading" class="h-[500px]">
          <StateLoadingState />
        </div>
        <SupplierReturnsTable v-else :returns="returns" v-model:search="searchTerm" :isLoading="isLoading" :page="page"
          @sort="handleSortChange" @view-return="handleViewReturn" />
        <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
      </div>
    </div>
  </div>
</template>
