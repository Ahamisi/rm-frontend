<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="product_overview_wrapper">
        <div class="px-6 py-4 bg-white">
            <DateFilter @dateFiltered="filtered" />

            <!-- <button class="flex items-center gap-1 download_btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                        fill="white" />
                    <path
                        d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                        fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                        fill="white" />
                </svg>
                <span>Download Report</span>
            </button> -->
        </div>

        <div class="flex flex-col gap-4 p-6 xl:flex-row sm:gap-6 bg-[#f9fafb]">
            <div class="flex-wrap flex-1">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <!-- Overview -->
                    <div class="bg-white rounded-lg card-overview">
                        <div class="card-details">
                            <div class="mb-3 card-header">Overview</div>
                            <div class="overview">
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Actual Quantity</span>
                                    <span class="min-w-12">{{ toLocale(report.overview.quantity) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Expected Quantity</span>
                                    <span class="min-w-12">{{ toLocale(expected_quantity) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Quantity Difference</span>
                                    <span class="min-w-12">{{ toLocale(expected_quantity - report.overview.quantity)
                                    }}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Orders & Transfers -->
                    <div class="bg-white rounded-lg card-overview">
                        <div class="card-details">
                            <div class="mb-3 card-header">Orders & Transfers</div>
                            <div class="overview">
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Orders</span>
                                    <span class="min-w-12">{{ toLocale(report.order_and_transfer.orders) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Transfer In</span>
                                    <span class="min-w-12">{{ toLocale(report.order_and_transfer.transferIn) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Transfer Out</span>
                                    <span class="min-w-12">{{ toLocale(report.order_and_transfer.transferOut) }}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Other Metrics -->
                    <div class="bg-white rounded-lg card-overview">
                        <div class="card-details">
                            <div class="mb-3 card-header">Other Metrics</div>
                            <div class="overview">
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Damages</span>
                                    <span class="min-w-12">{{ toLocale(report.other_metrics.damages) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Expired</span>
                                    <span class="min-w-12">{{ toLocale(report.other_metrics.expired) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Debts</span>
                                    <span class="min-w-12">0</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Returns -->
                    <div class="bg-white rounded-lg card-overview">
                        <div class="card-details">
                            <div class="mb-3 card-header">Returns</div>
                            <div class="overview">
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Product Returns</span>
                                    <span class="min-w-12">{{ toLocale(report.returns.productReturns) }}</span>
                                </div>
                                <div class="flex justify-between gap-x-2 values">
                                    <span>Supplier Returns</span>
                                    <span class="min-w-12">{{ toLocale(report.returns.supplierReturns) }}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Expected vs Actual Inventory -->
                    <div class="bg-white rounded-lg card-overview md:col-span-3">
                        <div class="card-details">
                            <div class="flex flex-wrap justify-between mb-3">
                                <div class="card-header">Expected vs Actual Inventory</div>

                                <div class="flex items-center gap-2">
                                    <label>Year: </label>
                                    <select name="" id="" v-model="graphYear" @change="fetchGraphData"
                                        class="w-16 px-3 py-2 text-xs border rounded h-fit">
                                        <option v-for="(year, index) in rangeOfYears()" :key="`sale_year_${index}`"
                                            :value="year">
                                            {{ year }}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- graph -->
                            <div class="relative h-96">
                                <canvas ref="inventoryChart" class="w-full h-96"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import DateFilter from '@/views/Components/Dashboards/DateFilter.vue';
import { toLocale } from '@/views/helpers/useLocale.js';
import * as Chart from 'chart.js';
import { useRoute } from 'vue-router';

// Register Chart.js components
Chart.Chart.register(...Chart.registerables);

onMounted(() => {
    fetchProductOverview()
    fetchGraphData()
})

const inventoryChart = ref<HTMLCanvasElement | null>(null);
let chartInstance = null;

const graphYear = ref(new Date().getFullYear())
const rangeOfYears = () => {
    let currentYear = new Date().getFullYear();
    return [...Array(currentYear).keys()].map(i => i + (currentYear - 5)).filter(i => i >= currentYear - 5 && i <= currentYear);
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const expectedQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const actualQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const diffInQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const renderInventoryChart = () => {
    if (!inventoryChart.value) return;

    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = inventoryChart.value.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Expected Quantity',
                    data: expectedQuantities.value,
                    backgroundColor: '#e5e7eb',
                    borderRadius: 8,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                },
                {
                    label: 'Actual Quantity',
                    data: actualQuantities.value,
                    backgroundColor: '#d8b4fe',
                    borderRadius: 8,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: context => `${context[0].label} 2025`,
                        label: context => {
                            const expected = expectedQuantities.value[context.dataIndex];
                            const actual = actualQuantities.value[context.dataIndex];
                            const diff = diffInQuantities.value[context.dataIndex];
                            return [
                                `Expected Quantity: ${expected.toLocaleString()}`,
                                `Actual Quantity: ${actual.toLocaleString()}`,
                                `Difference: ${diff.toLocaleString()}`
                            ];
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#6b7280'
                    },
                    title: {
                        display: true,
                        text: 'Quantity',
                        color: '#374151'
                    },
                    grid: {
                        color: '#f3f4f6'
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280'
                    },
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#374151'
                    },
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
};


watch([expectedQuantities, actualQuantities, diffInQuantities], renderInventoryChart);

onBeforeUnmount(() => {
    if (chartInstance) chartInstance.destroy();
});

const loading = ref(false);
const toast = useToast();
const dateFilter = ref({
    from_date: '',
    to_date: ''
})
const route = useRoute();
const report = ref({
    overview: {
        inbound: [],
        outbound: [],
        quantity: 0
    },
    order_and_transfer: {
        orders: 0,
        transferIn: 0,
        transferOut: 0
    },
    other_metrics: {
        damages: 0,
        expired: 0
    },
    returns: {
        productReturns: 0,
        supplierReturns: 0
    },
})

const expected_quantity = computed(() => {
    let inbound = 0;
    let outbound = 0;
    for (const [key, value] of Object.entries(report.value.overview.inbound)) {
        inbound += value;
    }
    for (const [key, value] of Object.entries(report.value.overview.outbound)) {
        outbound += value;
    }
    return inbound - outbound;
})

const filtered = (dateRange) => {
    dateFilter.value = dateRange;
    // fetchProductMetrics();
}

const fetchProductOverview = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/overview`, {
        params: {
            from_date: dateFilter.value.from_date,
            to_date: dateFilter.value.to_date
        }
    })
        .then(response => {
            report.value = response.data;
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to fetch product overview data');
        })
        .finally(() => {
            loading.value = false;
        });

}

const fetchGraphData = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${route.params.id}/quantity_graph?year=${graphYear.value}`)
        .then(response => {
            expectedQuantities.value = response.data.expected;
            actualQuantities.value = response.data.actual;
            diffInQuantities.value = response.data.diff;
        })
        .catch(error => {
            console.error(error);
            toast.error('Failed to fetch graph data');
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<style>
.product_overview_wrapper .card-overview {
    padding: 16px;
}

.product_overview_wrapper .card-overview .card-header {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.product_overview_wrapper .card-overview .overview {
    border: 1px solid rgba(9, 30, 66, 0.14);
    border-radius: 8px;
}

.product_overview_wrapper .card-overview .overview .values:not(:last-child) {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.product_overview_wrapper .card-overview .overview span {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
    padding: 0.75em;
}
</style>