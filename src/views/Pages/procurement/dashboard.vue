<template>
  <div class="px-4 md:px-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <LoadingState />
    </div>
    <div v-else>
      <DownloadSuccess :text="'Download Success'" :visibility="download" />

      <!-- Header -->
      <div class="my-4 px-2">
        <h1 class="text-text-subtlest title-text">Dashboard</h1>
      </div>

      <!-- Top Controls -->
      <div class="flex justify-between items-center mb-6 px-2 relative">
        <SearchDropdown :isOpen="modalTypeOpen == 'filter'" :toggle="() => toggleModal('filter')" :alignLeft="true">
          <!-- @click="() => toggleModal('filter')" -->
          <template #trigger>
            <button
              class="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:bg-gray-100 transition">
              <ListFilter class="h-5 w-5 text-gray-700" />
              <span class="font-medium text-xs">Filter</span>
            </button>
          </template>
          <template #default>
            <UiDateFilterModal :isOpen="modalTypeOpen == 'filter'" @apply="handleFilterApply" />
          </template>
        </SearchDropdown>

        <button @click="beginDownload"
          class="active:bg-blue-900 flex items-center bg-blue-600 text-white rounded px-3 py-2 text-xs">
          <CloudDownload class="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>

      <!-- Desktop Layout -->
      <section class="hidden md:flex justify-between gap-x-8 px-2">
        <!-- Metric Grid -->
        <div class="grid grid-cols-2 gap-4 w-[823px] grow">
          <MetricCard title="Received Suppliers" :value="stats.receivedSuppliers.value"
            :change="stats.receivedSuppliers.change" :trend="stats.receivedSuppliers.change > 0 ? 'up' : 'down'"
            :showCompared="true" />
          <MetricCard title="Received Products Qty" :value="stats.receivedProductsQty.value"
            :change="stats.receivedProductsQty.change" :trend="stats.receivedProductsQty.change > 0 ? 'up' : 'down'"
            :showCompared="true" />
          <MetricCard title="Value of Received Products" :value="stats.valueReceivedProducts.value"
            :change="stats.valueReceivedProducts.change" valuePrefix="₦"
            :trend="stats.valueReceivedProducts.change > 0 ? 'up' : 'down'" :showCompared="true" />
          <MetricCard title="Orders Pending Arrival" :value="stats.ordersPendingArrival.value" :showTrend="false"
            :skip-canvas="true" />
          <MetricCard title="Orders Passed Delivery Date" :value="stats.ordersPassedDelivery.value" :showTrend="false"
            :skip-canvas="true" />
          <MetricCard title="Average Processing Time" :value="stats.avgProcessingTime.value" :change="0" trend="up"
            :isRawValue="true" />

          <!-- Shelf Life Analysis -->
          <div class="bg-white rounded-lg shadow p-6 col-span-2 lg:col-span-1">
            <h3 class="text-gray-800 font-medium mb-2">Shelf Life Analysis</h3>
            <p class="text-sm text-gray-600 mb-4">
              Ratio of received products with expiry less than 18 months
            </p>
            <div class="flex justify-center">
              <PieChart :data="[
                stats.shelfLifeAnalysis.less_than_18_months,
                stats.shelfLifeAnalysis.others,
              ]" :colors="['#f87171', '#6c88ff']" />
            </div>
          </div>

          <!-- Storage Space -->
          <div class="bg-white rounded-lg shadow p-6 col-span-2 lg:col-span-1">
            <h3 class="text-gray-800 font-medium mb-2">Storage Space</h3>
            <p class="text-sm text-gray-600 mb-4">
              Ratio of used vs free storage space
            </p>
            <div class="flex justify-center">
              <DonutChart :data="[stats.storageSpace.used, stats.storageSpace.free]" :colors="['#6c88ff', '#fff']"
                :label="`${stats.storageSpace.used}%`" />
            </div>
          </div>
        </div>

        <!-- Sidebar Lists -->
        <div class="flex flex-col gap-2 bg-white md:w-[389px] grow-0 overflow-y-auto rounded-lg p-6 space-y-6">
          <TopList title="Top Suppliers" :items="stats.topSuppliers" valuePrefix="₦" />
          <div class="border-b-[2px] border-light-500 w-full"></div>
          <TopList title="Top Products" :items="stats.topProducts" />
        </div>
      </section>

      <!-- Mobile Layout -->
      <section class="flex flex-col gap-4 md:hidden px-2">
        <MetricCard title="Received Suppliers" :value="stats.receivedSuppliers.value"
          :change="stats.receivedSuppliers.change" :trend="stats.receivedSuppliers.change > 0 ? 'up' : 'down'"
          :showCompared="true" />
        <MetricCard title="Received Products Qty" :value="stats.receivedProductsQty.value"
          :change="stats.receivedProductsQty.change" :trend="stats.receivedProductsQty.change > 0 ? 'up' : 'down'"
          :showCompared="true" />
        <MetricCard title="Value of Received Products" :value="stats.valueReceivedProducts.value"
          :change="stats.valueReceivedProducts.change" valuePrefix="₦"
          :trend="stats.valueReceivedProducts.change > 0 ? 'up' : 'down'" :showCompared="true" />
        <MetricCard title="Orders Pending Arrival" :value="stats.ordersPendingArrival.value" :showTrend="false"
          :skip-canvas="true" />
        <MetricCard title="Orders Passed Delivery Date" :value="stats.ordersPassedDelivery.value" :showTrend="false"
          :skip-canvas="true" />
        <MetricCard title="Average Processing Time" :value="stats.avgProcessingTime.value" :change="0" trend="up"
          :isRawValue="true" />

        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-gray-800 font-medium mb-2">Shelf Life Analysis</h3>
          <p class="text-sm text-gray-600 mb-4">
            Ratio of received products with expiry less than 18 months
          </p>
          <div class="flex justify-center">
            <PieChart :data="[
              stats.shelfLifeAnalysis.less_than_18_months,
              stats.shelfLifeAnalysis.others,
            ]" :colors="['#f87171', '#6c88ff']" />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-gray-800 font-medium mb-2">Storage Space</h3>
          <p class="text-sm text-gray-600 mb-4">
            Ratio of used vs free storage space
          </p>
          <div class="flex justify-center">
            <DonutChart :data="[stats.storageSpace.used, stats.storageSpace.free]" :colors="['#6c88ff', '#fff']"
              :label="`${stats.storageSpace.used}%`" />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <TopList title="Top Suppliers" :items="stats.topSuppliers" valuePrefix="₦" />
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <TopList title="Top Products" :items="stats.topProducts" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Filter, Download, CloudDownload, ListFilter } from "lucide-vue-next";
import { useDashboard } from "@/views/Composables/useDashboard";
import { useFilterModal } from "@/views/Composables/procurement/useFilterModal";
import MetricCard from "@/views/Components/procurement/dashboard/MetricCard.vue";
import DonutChart from "@/views/Components/procurement/dashboard/DonutChart.vue";
import PieChart from "@/views/Components/procurement/dashboard/PieChart.vue";
import TopList from "@/views/Components/procurement/dashboard/TopList.vue";
import DownloadSuccess from "@/views/Components/procurement/ui/DownloadSuccess.vue";
import UiDateFilterModal from "@/views/Components/procurement/ui/DateFilterModal.vue";
import SearchDropdown from "@/views/Components/procurement/SearchDropdown.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { onMounted, reactive, ref } from "vue";

const emit = defineEmits(["filterModalOpen"]);

const download = ref(false);
const { modalTypeOpen, close, toggleModal } = useFilterModal();
const { fetchProcurementStats, isLoading } = useDashboard();

const loading = ref(true);
const stats = reactive({
  receivedSuppliers: { value: 0, change: 0 },
  receivedProductsQty: { value: 0, change: 0 },
  valueReceivedProducts: { value: 0, change: 0 },
  ordersPendingArrival: { value: 0 },
  ordersPassedDelivery: { value: 0 },
  avgProcessingTime: { value: "0d | 0h | 0m" },
  shelfLifeAnalysis: { less_than_18_months: 0, others: 100 },
  storageSpace: { used: 0, free: 100 },
  topSuppliers: [],
  topProducts: [],
});

const beginDownload = () => {
  download.value = true;
  setTimeout(() => {
    download.value = false;
  }, 3000);
};

const handleFilterApply = async (filters: any) => {
  loading.value = true;
  try {
    console.log("Filters Applied:", filters);
    const data = await fetchProcurementStats(
      filters.from_date,
      filters.to_date
    );
    if (data) {
      stats.receivedSuppliers = data.receivedSuppliers;
      stats.receivedProductsQty = data.receivedProductsQty;
      stats.valueReceivedProducts = data.valueReceivedProducts;
      stats.ordersPendingArrival = data.ordersPendingArrival;
      stats.ordersPassedDelivery = data.ordersPassedDelivery;
      stats.avgProcessingTime = data.avgProcessingTime;
      stats.shelfLifeAnalysis = data.shelfLifeAnalysis;
      stats.storageSpace = data.storageSpace;
      stats.topSuppliers = data.topSuppliers;
      stats.topProducts = data.topProducts;
    }
  } catch (error) {
    console.error("Failed to apply filters:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const data = await fetchProcurementStats();
    if (data) {
      stats.receivedSuppliers = data.receivedSuppliers;
      stats.receivedProductsQty = data.receivedProductsQty;
      stats.valueReceivedProducts = data.valueReceivedProducts;
      stats.ordersPendingArrival = data.ordersPendingArrival;
      stats.ordersPassedDelivery = data.ordersPassedDelivery;
      stats.avgProcessingTime = data.avgProcessingTime;
      stats.shelfLifeAnalysis = data.shelfLifeAnalysis;
      stats.storageSpace = data.storageSpace;
      stats.topSuppliers = data.topSuppliers;
      stats.topProducts = data.topProducts;
    }
  } catch (error) {
    console.error("Failed to fetch initial stats:", error);
  } finally {
    loading.value = false;
  }
});
</script>
