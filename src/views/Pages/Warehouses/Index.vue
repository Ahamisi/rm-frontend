<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Location / Warehouse" class="px-6" />

        <div class=" min-h-[calc(100vh-190px)] px-6 bg-white">
            <Datatable :url="url" :filterByDate="false" :filterFields="filterFields" :columns="columns"
                pageName="Warehouses" :key="childKey">
                <template v-slot:header_actions>
                    <button @click.prevent="isCreateWarehouseModalOpen = true"
                        class="flex items-center gap-x-1 pl-1 pr-2 py-1.5 rounded text-white create_btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>

                        <span>Create Warehouse</span>
                    </button>
                </template>
                <template #column="col">
                    <span v-if="col.props.column.field == 'actions'">
                        <div class="flex items-center justify-center gap-3">
                            <button type="button" @click.prevent="editWarehouse(col.props.row)">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z"
                                        fill="#44546F" />
                                </svg>
                            </button>
                            <button type="button" @click.prevent="openConfirmDeleteWarehouse(col.props.row)">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z"
                                        fill="#44546F" />
                                </svg>
                            </button>
                        </div>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>

        <!-- discard delete warehouse modal -->
        <UniversalCenteredModal :show="showDiscardDeleteWarehouseModal"
            @close="showDiscardDeleteWarehouseModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                            fill="#C9372C" />
                    </svg>

                    <h3>Delete</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to delete this warehouse <strong>“{{ deleteWarehouseFormData.name }}”</strong>. This
                    action will permanently remove it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardDeleteWarehouseModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteWarehouse" type="button" class="text-white delete_btn">
                        Delete Warehouse
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- deleted warehouse success message modal -->
        <UniversalCenteredModal :show="showDeletedWarehouseSuccessModal" @close="closeDeleteWarehouseSuccessModal">
            <template #body>
                <div class="flex justify-center my-6">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
                            fill="#22A06B" />
                        <path
                            d="M18.7827 28.5635C18.4668 28.2275 18.031 28.0298 17.57 28.0134C17.1091 27.997 16.6603 28.1632 16.3213 28.476C15.9822 28.7887 15.7804 29.2226 15.7596 29.6834C15.7388 30.1442 15.9008 30.5945 16.2102 30.9365L22.5312 37.7947C23.471 38.7152 24.871 38.7152 25.7407 37.8472L26.3777 37.219C28.6782 34.9566 30.9759 32.6915 33.271 30.4237L33.341 30.3537C35.486 28.2399 37.6198 26.1147 39.7425 23.9785C40.0597 23.6463 40.2337 23.2028 40.2268 22.7435C40.2199 22.2842 40.0327 21.8461 39.7056 21.5236C39.3786 21.2011 38.9378 21.0202 38.4785 21.0198C38.0192 21.0194 37.5781 21.1996 37.2505 21.5215C35.1377 23.6466 33.0143 25.7612 30.8805 27.8652L30.8105 27.9352C28.6112 30.1093 26.4091 32.2804 24.2042 34.4487L18.7827 28.5635Z"
                            fill="white" />
                    </svg>
                </div>
                <h3 class="text-center">Warehouse Deleted</h3>
                <p class="text-center discard_merge_alert_body_text">
                    The warehouse <strong>“{{ deleteWarehouseFormData.name }}”</strong> has been successfully deleted
                    from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">

                    <button @click="closeDeleteWarehouseSuccessModal" type="button" class="text-white approve_btn">
                        Done
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <Create :isOpen="isCreateWarehouseModalOpen" @created="childKey++; isCreateWarehouseModalOpen = false"
            @discarded="isCreateWarehouseModalOpen = false" @close="isCreateWarehouseModalOpen = false" />
        <Edit :isOpen="isEditWarehouseModalOpen" :warehouse="editWarehouseFormData"
            @updated="childKey++; isEditWarehouseModalOpen = false" @discarded="isEditWarehouseModalOpen = false"
            @close="isEditWarehouseModalOpen = false" />
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { useAuthStore } from "@/stores/auth";
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn, FilterField, FilterFields } from '@/types';
import Create from './Create.vue';
import Edit from './Edit.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';


onMounted(async () => {
    await Promise.all([
        fetchLGAs(),
        fetchStates()
    ])
})


const loading = ref(false);
const toast = useToast();
const isCreateWarehouseModalOpen = ref(false);
const isEditWarehouseModalOpen = ref(false);
const showDiscardDeleteWarehouseModal = ref(false);
const showDeletedWarehouseSuccessModal = ref(false);
const states = ref([]);
const lgas = ref([]);
const editWarehouseFormData = ref({
    id: 0,
    name: '',
    state_id: 0,
    lga_id: 0
});
const deleteWarehouseFormData = ref({
    id: '',
    name: ''
});

const authStore = useAuthStore();
const childKey = ref(111);
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Warehouse Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'State',
        field: 'state.name',
        sortable: true,
    },
    {
        label: 'Local Government',
        field: 'lga.name',
        sortable: true,
    },
    {
        label: 'Actions',
        field: 'actions',
        sortable: false,
    },
])

const url = computed(() => import.meta.env.VITE_API_URL + 'warehouses');
const getStates = computed(() => states.value);
const getLGAs = computed(() => lgas.value);
const filterFields = ref<FilterFields<FilterField>>({
    "state": {
        label: "Status",
        field: "state_id",
        type: "select",
        get options() {
            return getStates.value
        }
    },
    "lga": {
        label: "Local Government",
        field: "lga_id",
        type: "select",
        get options() {
            return getLGAs.value
        }
    },
});

const editWarehouse = (warehouse) => {
    editWarehouseFormData.value = warehouse;
    isEditWarehouseModalOpen.value = true;
}

const openConfirmDeleteWarehouse = (warehouse) => {
    deleteWarehouseFormData.value = warehouse;
    showDiscardDeleteWarehouseModal.value = true;
}

const deleteWarehouse = () => {
    showDiscardDeleteWarehouseModal.value = false;
    if (!deleteWarehouseFormData.value?.id) {
        toast.error('Please select a warehouse to delete')
        return;
    }
    loading.value = true;
    axios.delete(import.meta.env.VITE_API_URL + "warehouses/" + deleteWarehouseFormData.value.id).then(response => {
        showDeletedWarehouseSuccessModal.value = true
    }).catch(err => {
        let errorMessage = '';
        if (err.response.data.error != undefined) {
            if (Array.isArray(err.response.data.error)) {
                errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
            } else {
                errorMessage = "<p>" + err.response.data.error + "</p>";
            }
        } else {
            errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
        }
        toast.error(errorMessage);
    })
        .finally(() => loading.value = true)
}

const closeDeleteWarehouseSuccessModal = () => {
    deleteWarehouseFormData.value = {
        id: '',
        name: ''
    }
    showDeletedWarehouseSuccessModal.value = false;
    loading.value = false;
    childKey.value++;
}

const fetchStates = () => {
    axios.get(import.meta.env.VITE_API_URL + 'states')
        .then(res => {
            states.value = res.data
        })
}

const fetchLGAs = () => {
    axios.get(import.meta.env.VITE_API_URL + 'lgas')
        .then(res => {
            lgas.value = res.data
        })
}


</script>

<style>
.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    height: fit-content;
}


.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .approve_btn {
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.discard_merge_alert_footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}
</style>