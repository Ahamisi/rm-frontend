<script setup lang="ts">
import { usePayments } from "@/views/Composables/procurement/usePayments";
import { ref, watch } from "vue";
import { useModal } from "@/views/Composables/procurement/useModal";
import UiFilterModal from "@/views/Components/procurement/ui/FilterModal.vue";
import UiFilterDropdown from "@/views/Components/procurement/ui/FilterDropdown.vue";
import PaymentsPaymentTable from "@/views/Components/procurement/payments/PaymentTable.vue";
import PaymentModal from "@/views/Components/procurement/payments/PaymentModal.vue";
import CustomPagination from "@/views/Components/procurement/customPagination.vue";
import Search from "@/views/Components/procurement/Search.vue";
import StateLoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import SuccessModal from "@/views/Components/procurement/ui/SuccessModal.vue";
import ErrorModal from "@/views/Components/procurement/ui/ErrorModal.vue";
import { useRoute, useRouter } from "vue-router";
import { Payment } from "@/types";

const { totalPages, fetchPayments, deletePayment: dP } = usePayments();

const { showModal, openModal, closeModal } = useModal();

const router = useRouter();
const route = useRoute();

const isFilterOpen = ref(false);
const payments = ref<any[]>([]);
const isFilterModalOpen = ref(false);
const searchTerm = ref("");
const page = ref(1);
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
const fetchPaymentsStatus = ref<"pending" | "loading" | "success" | "error">(
  "pending"
);

watch(
  [page, searchTerm, appliedFilters, sortField, sortOrder],
  async () => {
    try {
      fetchPaymentsStatus.value = "loading";
      payments.value = await fetchPayments({
        page: page.value,
        searchTerm: searchTerm.value,
        fromDate: appliedFilters.value.fromDate,
        toDate: appliedFilters.value.toDate,
      });
      fetchPaymentsStatus.value = "success";
    } catch (error) {
      console.error("Error fetching payments:", error);
      fetchPaymentsStatus.value = "error";
    }
  },
  { deep: true, immediate: true }
);

const handleFilterApply = (filters: any) => {
  appliedFilters.value = filters;
  page.value = 1;
};

const selectedPayment = ref(null);

const openPaymentForm = (payment: Payment | null = null) => {
  selectedPayment.value = payment;
  openModal();
};

const handleSave = async (data: any) => {
  if (data.id) {
    console.log("Updating payment:", data);
  } else {
    console.log("Creating payment:", data);
  }
  closeModal();
};

const isSuccessModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");

const deletePayment = async (paymentId: number) => {
  try {
    await dP({ id: paymentId });
    modalTitle.value = "Payment Deleted";
    modalMessage.value = "The payment has been successfully deleted.";
    isSuccessModalOpen.value = true;
    await fetchPayments({ page: page.value });
  } catch (error: any) {
    modalTitle.value = "Failed to delete";
    modalMessage.value =
      error.response?.data?.error || "An unexpected error occurred.";
    isErrorModalOpen.value = true;
  }
};

const handleSuccessModalClose = () => {
  isSuccessModalOpen.value = false;
  closeModal();
};

// For query param flow
const isNewPaymentModalOpen = ref(false);
watch(
  () => route.query,
  (query) => {
    if (query.create === "true") {
      const paymentData: { supplierId?: string; id?: string } = {};
      if (typeof query.supplierId === "string") {
        paymentData.supplierId = query.supplierId;
      }
      if (typeof query.id === "string") {
        paymentData.id = query.id;
      }
      selectedPayment.value = Object.keys(paymentData).length
        ? paymentData
        : null;
      isNewPaymentModalOpen.value = true;
    } else {
      isNewPaymentModalOpen.value = false;
    }
  },
  { immediate: true }
);

watch(isNewPaymentModalOpen, (isOpen) => {
  if (!isOpen && route.query.create) {
    const newQuery = { ...route.query };
    delete newQuery.create;
    delete newQuery.supplierId;
    delete newQuery.id;
    router.push({ query: newQuery });
  }
});

const handleNewPaymentSave = (data: any) => {
  console.log("Creating payment from query flow:", data);
  isNewPaymentModalOpen.value = false;
};
</script>

<template>
  <div class="flex">
    <div class="flex-1">
      <div class="px-8 hidden md:block">
        <div class="my-2 px-2">
          <h1 class="text-text-subtlest title-text">Payments</h1>
        </div>
        <div class="flex items-center justify-between p-2">
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

          <button @click="openPaymentForm()"
            class="bg-blue-600 text-white px-4 py-1.5 cursor-pointer rounded-lg hover:bg-blue-700">
            <span class="text-base"> + </span>
            <span class="text-xs"> Create Payment </span>
          </button>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="px-4 md:hidden">
        <div class="py-3">
          <h1 class="text-lg font-semibold text-text-subtlest">Payments</h1>
        </div>

        <div class="flex flex-col gap-3">
          <div class="relative w-full">
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

          <button @click="openPaymentForm()"
            class="max-w-fit bg-blue-600 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 medium-text">
            <span class="text-base"> + </span>
            <span class="text-xs"> Create Payment </span>
          </button>
        </div>
      </div>
      <!-- Table -->
      <div class="px-4 md:px-8">
        <div v-if="fetchPaymentsStatus == 'loading'" class="h-[500px]">
          <StateLoadingState> </StateLoadingState>
        </div>
        <div class="py-2 px-2" v-else>
          <PaymentsPaymentTable :payments="payments" v-model:search="searchTerm" @editPayment="openPaymentForm"
            @delete:payment="deletePayment" @sort="handleSortChange" :page="page" />
        </div>
        <div class="px-8">
          <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
        </div>
      </div>
      <PaymentModal v-model="showModal" :selectedPayment="selectedPayment" @save="handleSave" @delete="deletePayment" />
    </div>
  </div>

  <SuccessModal :modelValue="isSuccessModalOpen" @update:modelValue="handleSuccessModalClose" :title="modalTitle"
    :message="modalMessage" />

  <ErrorModal v-model="isErrorModalOpen" :title="modalTitle" :message="modalMessage" />

  <!-- This modal is for the query param flow -->
  <PaymentModal v-model="isNewPaymentModalOpen" :selected-payment="selectedPayment" @save="handleNewPaymentSave" />
</template>
