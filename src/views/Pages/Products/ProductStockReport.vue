<template>
    <div>
        <Datatable :url="product_stock_report_url" :filterByDate="true" :columns="productStockReportColumns"
            :key="childKey" :filterFields="productStockReportFilterFields" pageName="ActiveProducts">
            <template #column="col">
                <span v-if="col.props.column.field === 'product_images'">
                    <span v-html="getImage(col.props.row.product_images)"></span>
                </span>
                <span v-else-if="col.props.column.field === 'name'">
                    <Tooltip :text="col.props.row.name">
                        <router-link :to="{ name: 'admin.products.show', params: { id: col.props.row.id } }"
                            class="medium-text hover:underline">
                            {{ truncateText(col.props.row.name, 20) }}
                        </router-link>
                    </Tooltip>
                </span>
                <span v-else>
                    {{ col.props.formattedRow[col.props.column.field] }}
                </span>
            </template>
        </Datatable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from '@/views/helpers/useLocale.js';
import { FilterField, FilterFields, TableColumn } from "@/types";



type PartialOption = Partial<{ id: string; name: string, display_name: string }>;

interface Props {
    product_types: PartialOption[]
    categories: PartialOption[]
}

const props = defineProps<Props>()
const product_stock_report_url = import.meta.env.VITE_API_V2_URL + 'admin/products/out_of_stocks';
const childKey = ref<number>(11111);

// Use computed property to make it reactive to props changes
const productStockReportFilterFields = computed<FilterFields<FilterField>>(() => ({
    'product_type_id': {
        label: "Product Type",
        field: 'product_type_id',
        type: 'select',
        options: (props.product_types || []).map(type => ({
            id: type.id,
            name: type.display_name || type.name
        }))
    },
    'category_id': {
        label: "Category",
        field: 'category_id',
        type: 'select',
        options: (props.categories || []).map(category => ({
            id: category.id,
            name: category.display_name || category.name
        }))
    },
    'loss_making_items': {
        label: "Loss Making Items",
        field: 'loss_making_items',
        type: 'select',
        options: [
            { name: "All", id: "" },
            { name: "Yes", id: 1 },
            { name: "No", id: 0 },
        ]
    },
}));

const productStockReportColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Product Image',
        field: 'product_images',
        sortable: false,
    },
    {
        label: 'Product Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'Category',
        field: 'category.display_name',
        sortable: false,
    },
    {
        label: 'Product Formulation',
        field: 'product_type.display_name',
        sortable: false,
    },
    {
        label: 'Available Qty',
        field: 'quantity_available',
        sortable: true,
        format: (value) => toLocale(value)
    },
    {
        label: 'Qty To Warn',
        field: 'quantity_to_warn',
        sortable: true,
        format: (value) => toLocale(value)
    },
    {
        label: 'Shelf Location',
        field: 'shelves',
        sortable: false,
        format: (value) => value.join("\n")
    },
]);

const getImage = (images: []) => {
    let src = '';
    if (images.length == 0) {
        src = "https://cdn.remedial.health/product_images/aS8Waps1DreNT6f72jhOzHw2ArXvES9gjJd0jgBm147551.webp";
    } else {
        src = images.find(img => img.default)?.url || images[0].url;
    }
    return `<img src="${src}" class="object-cover w-8 h-8 rounded" alt="Product Image">`;
}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
</script>