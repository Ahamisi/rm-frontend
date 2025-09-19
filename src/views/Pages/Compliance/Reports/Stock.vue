<template>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Report / Stock Quantity Report" />

        <!-- Data Table -->
        <div class="min-h-[calc(100vh-190px)]">
            <Datatable 
                :items="stockData" 
                :filterByDate="false" 
                :filterFields="filterFields" 
                :columns="columns" 
                pageName="Stock Quantity Report"
                :key="childKey"
            >
                <template #column="col">
                    <!-- Product Image Column -->
                    <span v-if="col.props?.column?.field === 'productImage'">
                        <div class="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img 
                                :src="col.props.formattedRow[col.props.column.field]" 
                                :alt="col.props.formattedRow.productName"
                                class="w-4 h-4 object-cover rounded"
                                @error="handleImageError"
                            />
                        </div>
                    </span>
                    <!-- Default Column -->
                    <span v-else>
                        {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                    </span>
                </template>
            </Datatable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Types
interface StockData {
    id: number
    productImage: string
    productName: string
    quantityAvailable: number
}

// Mock stock data
const stockData = ref<StockData[]>([
    { id: 87, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 54, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 25, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 30, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 51, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 21, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 35, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 23, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 33, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 88, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 81, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 80, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 5, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 55, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 12, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 67, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 89, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 },
    { id: 43, productImage: "/images/products/bunto.jpg", productName: "Bunto", quantityAvailable: 4 },
    { id: 76, productImage: "/images/products/sivocid.jpg", productName: "Sivocid", quantityAvailable: 4 },
    { id: 91, productImage: "/images/products/augmentin.jpg", productName: "Augmentin 228 syrup", quantityAvailable: 4 }
])

// Table columns
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Product Image',
        field: 'productImage',
        sortable: false
    },
    {
        label: 'Product Name',
        field: 'productName',
        sortable: true
    },
    {
        label: 'Quantity Available',
        field: 'quantityAvailable',
        sortable: true
    }
])

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
    productName: {
        type: 'text',
        label: 'Product Name',
        placeholder: 'Search by product name'
    },
    quantityAvailable: {
        type: 'number',
        label: 'Quantity',
        placeholder: 'Filter by quantity'
    }
})

// Key for refreshing table
const childKey = ref(111)

// Handle image loading errors
const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    // Fallback to a placeholder image or hide the image
    img.style.display = 'none';
};
</script>
