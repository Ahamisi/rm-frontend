<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div>
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <Datatable :url="shelf_update_url" :filterByDate="false" :filterFields="filterFields" :columns="productColumns"
            :key="childKey" pageName="shelf_update">
            <template #column="col">
                <span v-if="col.props.column.field == 'shelf'" class="">
                    <input v-model="col.props.row.quantity" @blur="editSubProduct(col.props.row)"
                        v-if="allowedBatchEdit.includes(authStore.user.email)" type="number"
                        class="bg-transparent border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    <div class="form-group">
                        <v-select multiple :options="shelves.map(shelve => shelve.name)"
                            v-model="col.props.row.warehouse_shelf" @input="editSubProduct(col.props.row)" required />
                    </div>
                    <!--<button type="button" class="p-2 text-gray-700 bg-gray-100 border border-gray-200 rounded hover:bg-white" @click="editSubProduct(col.props.row)">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</button>-->
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
import { TableColumn, FilterField, FilterFields } from "@/types";
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import dayjs from 'dayjs';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';




onMounted(() => {
    getShelves();
})

const showToast = ref(false)
const toastMessage = ref("Batch shelf update successful")

const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}

const authStore = useAuthStore();
const toast = useToast();
const allowedBatchEdit = ref(['chukwudi@remedialhealth.com', 'omotolaawokunle@gmail.com', 'captajo@yahoo.com', 'okoyepeter039@gmail.com']);
const shelf_update_url = computed(() => import.meta.env.VITE_API_URL + 'admin/subproducts');
const childKey = ref(1000);
const loading = ref(false);
const productColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Product Name',
        field: 'product.name',
        sortable: true,
    },
    {
        label: 'Batch No.',
        field: 'batch_no',
        sortable: true,
    },
    {
        label: 'Batch Expiry Date',
        field: 'expiry_date',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY'),
    },
    {
        label: 'Last Updated',
        field: 'updated_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY'),
    },
    {
        label: 'Shelf Location',
        field: 'shelf',
        sortable: false,
    },
]);

const shelves = ref([]);

const diffTime = computed(() => {
    return (date) => {
        let seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (seconds >= 86400) return dayjs(date).format('DD/MM/YYYY');
        if (seconds >= 3600) {
            let hours = Math.round(seconds / 3600);
            return hours + 'h ago';
        }
        if (seconds >= 60) {
            let minutes = Math.round(seconds / 60);
            return minutes + 'm ago';
        }
        return Math.round(seconds) + 's ago';
    }
})

const getComputedShelves = computed(() => shelves.value.map(shelf => ({
    id: shelf.name,
    name: shelf.name
})))

const filterFields = ref<FilterFields<FilterField>>({
    "subproducts": {
        label: "Shelves",
        field: "warehouse_shelf",
        type: "select",
        get options() {
            return getComputedShelves.value
        }
    },
});

const editSubProduct = (subproduct) => {
    loading.value = true
    axios.put(import.meta.env.VITE_API_URL + `admin/subproducts/${subproduct.id}/quantity_update`, subproduct).then((res) => {
        showSuccess("Batch quantity updated successfully");
    }).catch(err => error(err))
        .finally(() => loading.value = false)
}

const getShelves = () => {
    axios.get(import.meta.env.VITE_API_URL + 'shelves?type=all').then(res => {
        shelves.value = res.data;
    }).catch((err) => {
        toast.error("Error loading warehouse shelves!");
    });
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
</script>

<style></style>