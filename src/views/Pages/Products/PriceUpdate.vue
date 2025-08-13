<template>
    <div>
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <div class="flex items-center justify-end py-6">
            <div class="flex items-center gap-6 form-group">
                <label for="batch" class="flex items-center gap-2">
                    <input type="checkbox" v-model="updateAllPrices" class="form-check" id="batch" />
                    <span class="text-sm">Update All Batch Prices</span>
                </label>
                <label for="cost" class="flex items-center gap-2">
                    <input type="checkbox" v-model="updateAllCost" class="form-check" id="cost" />
                    <span class="text-sm">Update All Cost Prices</span>
                </label>
            </div>
        </div>
        <Datatable :url="price_update_url" :filterByDate="false" :filterFields="filterFields" :columns="productColumns"
            :key="childKey" pageName="price_update">
            <template #column="col">
                <span v-if="col.props.column.field == 'price_per_pack'" class="relative flex items-center space-x-2">
                    <input v-model="col.props.row.price_per_pack" @blur="editProduct(col.props.row)" type="number"
                        class="bg-transparent border pl-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    <span class="absolute">₦</span>
                </span>
                <span v-else-if="col.props.column.field == 'unit_cost'" class="relative flex items-center space-x-2">
                    <input v-model="col.props.row.unit_cost" @blur="editProductCost(col.props.row)" type="number"
                        class="bg-transparent border pl-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    <span class="absolute">₦</span>
                </span>
                <span v-else>
                    {{ col.props.formattedRow[col.props.column.field] }}
                </span>
            </template>
        </Datatable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn, FilterFields, FilterField } from "@/types";
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';

onMounted(async () => {
    await Promise.all([
        fetchCategories(),
        fetchProductFormulations()
    ])
})


const showToast = ref(false)
const toastMessage = ref("Batch shelf update successful")
const categories = ref([]);
const productFormulations = ref([]);
const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}


const updateAllPrices = ref(false);
const updateAllCost = ref(false);
const childKey = ref(111);
const authStore = useAuthStore();
const toast = useToast();
const getCategories = computed(() => categories.value);
const getProductFormulations = computed(() => productFormulations.value);
const price_update_url = computed(() => import.meta.env.VITE_API_URL + `admin/products/bulk?current_branch=${authStore.selectedBranch.id}`);
const productColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Product Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'Category',
        field: 'category.display_name',
        sortable: true,
    },
    {
        label: 'Product Formulation',
        field: 'product_type.display_name',
        sortable: true,
    },
    {
        label: 'Cost Price',
        field: 'unit_cost',
        sortable: true,
    },
    {
        label: 'Price',
        field: 'price_per_pack',
        sortable: true,
    }
]);

const filterFields = ref<FilterFields<FilterField>>({
    "category_id": {
        label: "Categories",
        field: "category_id",
        type: "select",
        get options() {
            return getCategories.value;
        }
    },
    "product_type_id": {
        label: "Product Formulation",
        field: "product_type_id",
        type: "select",
        get options() {
            return getProductFormulations.value;
        }
    }
});


const editProductCost = (product) => {
    axios.put(import.meta.env.VITE_API_URL + `admin/products/${product.id}/cost_update?all=${updateAllCost.value ? 1 : 0}`, product)
        .then((res) => {
            showSuccess("Product cost price updated successfully!");
        }).catch(err => error(err))
}

const editProduct = (product) => {

    axios.put(import.meta.env.VITE_API_URL + `admin/products/${product.id}/price_update?all=${updateAllPrices.value ? 1 : 0}`, product).then((res) => {
        showSuccess("Product price updated successfully!");
        //this.$toast.success("Product price updated successfully!", {position: 'top-right'});
    }).catch(err => error(err))
    //.finally(()=>this.$store.commit('finishedLoading'))
}

const error = (err) => {
    let errorMessage = '';
    if (err.response.data.error != undefined) {
        if (Array.isArray(err.response.data.error)) {
            errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
        } else {
            errorMessage = "<p>" + err.response.data.error + "</p>";
        }
    }
    else {
        errorMessage = "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

const fetchCategories = async () => {
    await axios.get(import.meta.env.VITE_API_URL + 'categories')
        .then(res => {
            categories.value = res.data
        })
        .catch(err => {
            toast.error('Error fetching categories!')
        })
}

const fetchProductFormulations = async () => {
    await axios.get(import.meta.env.VITE_API_URL + 'product_types')
        .then(res => productFormulations.value = res.data)
        .catch(err => toast.error('Error fetching product formulations'))
}

const formattedAmount = computed(() =>
    rawAmount.value != null
        ? rawAmount.value.toLocaleString('en-US')
        : ''
);

const updateAmount = (value: string) => {
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    rawAmount.value = isNaN(numeric) ? null : numeric;
}
</script>

<style></style>