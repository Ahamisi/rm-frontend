<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Page Title -->

        <div>
            <PageTitle :title="breadcrumbTitle" class="px-6" />
        </div>

        <!-- Page Header -->
        <PageHeader 
            title="Deal Analytics" 
            :subtitle="dealData?.title || 'Loading...'"
            :showIcon="false"
        />

        <!-- Summary Cards and Chart -->
        <div class="px-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
                <!-- Left Column - Summary Cards -->
                <div class="flex flex-col space-y-6">
                    <!-- First Row - Two Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Total Remaining -->
                        <div class="p-6 rounded-lg border flex-1 flex flex-col justify-center" style="border-color: #091E420F; min-height: 120px;">
                            <p class="text-sm  text-gray-600">Total Remaining</p>
                            <p class="text-md text-gray-900">{{ dealAnalytics.totalRemaining }}</p>
                        </div>

                        <!-- Total Sold -->
                        <div class="p-6 rounded-lg border flex-1 flex flex-col justify-center" style="border-color: #091E420F; min-height: 120px;">
                            <p class="text-sm  text-gray-600">Total Sold</p>
                            <p class="text-md text-gray-900">{{ dealAnalytics.totalSold }}</p>
                        </div>
                    </div>

                    <!-- Second Row - Full Width Card -->
                    <div class="p-6 rounded-lg border flex-1 flex flex-col justify-center" style="border-color: #091E420F; min-height: 120px;">
                        <p class="text-sm  text-gray-600">Total Quantity</p>
                        <p class="text-md text-gray-900">{{ dealAnalytics.totalQuantity }}</p>
                    </div>
                </div>

                <!-- Right Column - Chart -->
                <div class="p-6 rounded-lg border h-full flex flex-col" style="border-color: #091E420F;">
                <h3 class="text-md text-gray-900 mb-2">Deal Stock</h3>
                <p class="text-sm text-gray-600 mb-6">Ratio of sold vs available deal stock</p>
                
                <!-- Donut Chart SVG -->
                <div class="flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200" class="transform -rotate-90">
                        <!-- Define pattern for striped shredded effect -->
                        <defs>
                            <pattern id="shreddedPattern" x="0" y="0" width="4" height="20" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="2" height="20" fill="#B8C4FF" opacity="0.8"/>
                                <rect x="2" y="0" width="2" height="20" fill="transparent"/>
                            </pattern>
                        </defs>
                        
                        <!-- Sold segment (40%) - left side -->
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#6C88FF"
                            stroke-width="30"
                            stroke-dasharray="201 503"
                            stroke-dashoffset="0"
                        />
                        
                        <!-- Available segment (60%) with striped pattern - right side -->
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#shreddedPattern)"
                            stroke-width="30"
                            stroke-dasharray="302 503"
                            stroke-dashoffset="-201"
                        />
                        
                        <!-- Percentage label in center -->
                        <text x="100" y="105" text-anchor="middle" class="transform rotate-90" fill="#6C88FF" font-size="24" font-weight="bold">40%</text>
                    </svg>
                </div>
                
                <!-- Chart Legend - Centered -->
                <div class="mt-6 flex justify-center">
                    <div class="flex items-center space-x-6">
                        <div class="flex items-center">
                            <div class="w-4 h-4 rounded-full mr-2" style="background-color: #6C88FF;"></div>
                            <span class="text-sm text-gray-700">Sold</span>
                        </div>
                        <div class="flex items-center">
                            <div class="w-4 h-4 rounded-full mr-2" style="background-color: #B8C4FF; opacity: 0.8;"></div>
                            <span class="text-sm text-gray-700">Available</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <!-- Transaction Table -->
        <div class="px-6">
                <div class="max-h-96 overflow-y-auto">
                    <Datatable 
                        :items="transactions" 
                        :filterByDate="false" 
                        :filterFields="filterFields" 
                        :columns="transactionColumns" 
                        pageName="Deal Transactions"
                    />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import PageHeader from '@/views/Components/PageHeader.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Types
interface DealData {
    id: number
    title: string
    description: string
    product: {
        id: number
        name: string
    }
    type_text: string
    status: number
    qty_set_aside: number
    qty_sold: number
    created_at: string
    updated_at: string
}

interface DealAnalytics {
    totalRemaining: number
    totalSold: number
    totalQuantity: number
    soldPercentage: number
    availablePercentage: number
}

interface Transaction {
    id: number
    orderNo: string
    user: string
    quantity: number
    date: string
}

// Route and data
const route = useRoute()
const dealData = ref<DealData | null>(null)

// Breadcrumb title
const breadcrumbTitle = computed(() => {
  return `Business Programs / Deals / ${dealData.value?.title || 'Deal Analytics'}`
})

// Analytics data
const dealAnalytics = ref<DealAnalytics>({
    totalRemaining: 10,
    totalSold: 50,
    totalQuantity: 60,
    soldPercentage: 83,
    availablePercentage: 17
})

// Mock transaction data
const transactions = ref<Transaction[]>([
    { id: 87, orderNo: 'RHPO-1651244214', user: 'Arogundade Aminat', quantity: 189, date: '15/01/2025' },
    { id: 54, orderNo: 'RHPO-1651244214', user: 'Samuel Adegoke', quantity: 1189, date: '15/01/2025' },
    { id: 25, orderNo: 'RHPO-1651244214', user: 'Arogundade Aminat', quantity: 11, date: '15/01/2025' },
    { id: 30, orderNo: 'RHPO-1651244214', user: 'Samuel Adegoke', quantity: 189, date: '15/01/2025' },
    { id: 51, orderNo: 'RHPO-1651244214', user: 'Samuel Adegoke', quantity: 189, date: '15/01/2025' },
    { id: 21, orderNo: 'RHPO-1651244214', user: 'Arogundade Aminat', quantity: 189, date: '15/01/2025' }
])

// Table configuration
const transactionColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Order No.',
        field: 'orderNo',
        sortable: true
    },
    {
        label: 'User',
        field: 'user',
        sortable: true
    },
    {
        label: 'Quantity',
        field: 'quantity',
        sortable: true
    },
    {
        label: 'Date',
        field: 'date',
        sortable: true
    }
])

const filterFields = ref<FilterFields<FilterField>>({})

// Computed - removed filteredTransactions since Datatable handles filtering internally

// Methods
const loadDealData = () => {
    // In a real app, this would fetch from API using route.params.id
    // For now, we'll use mock data
    dealData.value = {
        id: 54,
        title: "Get 1 pack of IICARE CAPSULE free",
        description: "Buy 2 get 1 free",
        product: { id: 2, name: "IICARE (LUTEIN & BILBERRY EXTRACT) CAPSULE 3 X 10" },
        type_text: "Buy x get x free",
        status: 1,
        qty_set_aside: 12,
        qty_sold: 12,
        created_at: "2024-01-14",
        updated_at: "2024-01-14"
    }
}

// Lifecycle
onMounted(() => {
    loadDealData()
})
</script>
