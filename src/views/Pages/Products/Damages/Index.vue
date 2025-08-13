<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="disableForm">
        <LoadingState />
    </div>
    <div class="erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Product Management / Damaged Products" class="px-6" />
        <div class="px-6 min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="true" :searchable="true" :columns="newColumns"
                pageName="DamagedProducts" :key="childKey">
                <template v-slot:header_actions>
                    <button @click.prevent="isCreateDamageProductModalOpen = true"
                        class="flex items-center gap-x-1 pl-1 pr-2 py-1.5 rounded text-white create_btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>

                        <span>Create Damaged Product</span>
                    </button>
                </template>
                <template #column="col">
                    <span v-if="col.props.column.field === 'action'" class="flex justify-center gap-3">
                        <button type="button" @click.prevent="editDamage(col.props.row)">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z"
                                    fill="#44546F" />
                            </svg>
                        </button>
                        <button type="button" @click.prevent="openDeleteWarningModal(col.props.row)">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z"
                                    fill="#44546F" />
                            </svg>
                        </button>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>

        <!-- create product damage modal -->
        <SideBarModal title="Create Damaged Products" :is-open="isCreateDamageProductModalOpen" width="lg"
            ref="createProductDamageModal" :initial-form-data="createDamagedProductFormData"
            @update:is-open="isCreateDamageProductModalOpen = $event" @close="handleClose"
            @form-data-change="handleCreateDamageProductFormDataChange"
            :show-discard-warning="showDiscardCreateDamageProductModal"
            @showDiscardWarning="showDiscardCreateDamageProductModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <div class="grid items-end grid-cols-1 gap-4 md:grid-cols-2">
                        <!-- Select Product -->
                        <div class="md:col-span-2">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Select Product</label>
                            <v-select :options="products" label="name" v-model="createDamagedProductFormData.product_id"
                                :reduce="product => product.id" @search="searchProducts"
                                @update:modelValue="getSubproduct" :loading="products_loading">
                                <template slot="no-options">
                                    Type to search products..
                                </template>
                            </v-select>
                        </div>
                        <!-- Product Batch Number -->
                        <div class="md:col-span-2">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Product Batch Number</label>
                            <v-select :options="subproducts.filter(val => val.quantity > 0)" label="batch_no"
                                v-model="createDamagedProductFormData.batch_no"
                                :reduce="subproduct => subproduct.batch_no" :loading="subproducts_loading">
                            </v-select>
                        </div>

                        <!-- Quantity -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" v-model.number="createDamagedProductFormData.quantity" min="0"
                                class="w-full px-3 py-2 text-xs border rounded focus:outline-none" />
                        </div>

                        <!-- Date Damaged -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date Damaged</label>
                            <input type="date" v-model="createDamagedProductFormData.damage_at"
                                class="w-full px-3 py-2 border rounded focus:outline-none" />
                        </div>

                    </div>

                    <!-- Cause of Damage -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Cause of Damage</label>
                        <input type="text" v-model="createDamagedProductFormData.damage_cause"
                            placeholder="Enter a specific cause of damage"
                            class="w-full px-3 py-2 border rounded focus:outline-none" />
                    </div>

                    <!-- Comment -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Comment</label>
                        <textarea v-model="createDamagedProductFormData.comment"
                            placeholder="Add additional details or notes about the damage" rows="4"
                            class="w-full px-3 py-2 text-xs text-gray-500 border rounded resize-none focus:outline-none"></textarea>
                    </div>

                    <!-- Returnable Checkbox -->
                    <div class="flex items-center space-x-2">
                        <input id="returnable" type="checkbox" v-model="createDamagedProductFormData.returnable"
                            class="mr-1 border-gray-300 rounded focus:ring-primary-500" />
                        <label for="returnable" class="m-0 text-sm text-gray-700" :style="{ margin: '0' }">Is the
                            product
                            returnable?</label>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardProductModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="createDamage(formData)" type="button" class="approve_btn">
                        Create
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- edit product damage modal -->
        <SideBarModal title="Edit Damaged Products" :is-open="isEditDamageProductModalOpen" width="lg"
            ref="editProductDamageModal" :initial-form-data="createDamagedProductFormData"
            @update:is-open="isEditDamageProductModalOpen = $event" @close="handleClose"
            @form-data-change="handleCreateDamageProductFormDataChange"
            :show-discard-warning="showDiscardCreateDamageProductModal"
            @showDiscardWarning="showDiscardCreateDamageProductModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <div class="grid items-end grid-cols-1 gap-4 md:grid-cols-2">
                        <!-- Select Product -->
                        <div class="md:col-span-2">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Select Product</label>
                            <v-select :options="products" label="name" v-model="createDamagedProductFormData.product_id"
                                :reduce="product => product.id" @search="searchProducts"
                                @update:modelValue="getSubproduct" :loading="products_loading">
                                <template slot="no-options">
                                    Type to search products..
                                </template>
                            </v-select>
                        </div>
                        <!-- Product Batch Number -->
                        <div class="md:col-span-2">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Product Batch Number</label>
                            <v-select :options="subproducts.filter(val => val.quantity > 0)" label="batch_no"
                                v-model="createDamagedProductFormData.batch_no"
                                :reduce="subproduct => subproduct.batch_no" :loading="subproducts_loading">
                            </v-select>
                        </div>

                        <!-- Quantity -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" v-model.number="createDamagedProductFormData.quantity" min="0"
                                class="w-full px-3 py-2 text-xs border rounded focus:outline-none" />
                        </div>

                        <!-- Date Damaged -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Date Damaged</label>
                            <input type="date" v-model="createDamagedProductFormData.damage_at"
                                class="w-full px-3 py-2 border rounded focus:outline-none" />
                        </div>

                    </div>

                    <!-- Cause of Damage -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Cause of Damage</label>
                        <input type="text" v-model="createDamagedProductFormData.damage_cause"
                            placeholder="Enter a specific cause of damage"
                            class="w-full px-3 py-2 border rounded focus:outline-none" />
                    </div>

                    <!-- Comment -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Comment</label>
                        <textarea v-model="createDamagedProductFormData.comment"
                            placeholder="Add additional details or notes about the damage" rows="4"
                            class="w-full px-3 py-2 text-xs text-gray-500 border rounded resize-none focus:outline-none"></textarea>
                    </div>

                    <!-- Returnable Checkbox -->
                    <div class="flex items-center space-x-2">
                        <input id="returnable" type="checkbox" v-model="createDamagedProductFormData.returnable"
                            class="mr-1 border-gray-300 rounded focus:ring-primary-500" />
                        <label for="returnable" class="m-0 text-sm text-gray-700" :style="{ margin: '0' }">Is the
                            product
                            returnable?</label>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardProductModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="updateDamage" type="button" class="approve_btn">
                        Update
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- discard warning Modal -->
        <UniversalCenteredModal :show="showDiscardCreateDamageProductModal"
            @close="showDiscardCreateDamageProductModal = false" :style="{ 'max-width': '450px;' }">
            <template #header>
                <span class="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.0626 4.96699C11.5786 3.99299 12.4206 3.98899 12.9386 4.96699L20.0626 18.425C20.5786 19.399 20.1076 20.196 19.0056 20.196H4.99556C3.89356 20.196 3.42056 19.403 3.93856 18.425L11.0626 4.96699ZM11.2935 14.7071C11.481 14.8946 11.7353 15 12.0006 15C12.2658 15 12.5201 14.8946 12.7077 14.7071C12.8952 14.5196 13.0006 14.2652 13.0006 14V8.99998C13.0006 8.73477 12.8952 8.48041 12.7077 8.29288C12.5201 8.10534 12.2658 7.99998 12.0006 7.99998C11.7353 7.99998 11.481 8.10534 11.2935 8.29288C11.1059 8.48041 11.0006 8.73477 11.0006 8.99998V14C11.0006 14.2652 11.1059 14.5196 11.2935 14.7071ZM11.2935 17.7071C11.481 17.8946 11.7353 18 12.0006 18C12.2658 18 12.5201 17.8946 12.7077 17.7071C12.8952 17.5196 13.0006 17.2652 13.0006 17C13.0006 16.7348 12.8952 16.4804 12.7077 16.2929C12.5201 16.1053 12.2658 16 12.0006 16C11.7353 16 11.481 16.1053 11.2935 16.2929C11.1059 16.4804 11.0006 16.7348 11.0006 17C11.0006 17.2652 11.1059 17.5196 11.2935 17.7071Z"
                            fill="#E56910" />
                    </svg>
                    <h3>Discard Changes?</h3>
                </span>
            </template>

            <template #body>
                <p class="text-sm text-gray-700 discard_merge_alert_body_text">
                    You are about to leave the <strong>"{{ damageId ? "Edit" : "Create" }} Damaged Products"</strong>
                    process. Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardCreateDamageProductModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardProductDamage" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- discard delete warning Modal -->
        <UniversalCenteredModal :show="showDiscardDeleteDamageProductModal"
            @close="showDiscardDeleteDamageProductModal = false" :style="{ 'max-width': '450px;' }">
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
                    You are about to delete this category <strong>“{{ damageProductToDelete?.product?.name }}”</strong>.
                    This action will permanently remove it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardDeleteDamageProductModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteDamage" type="button" class="delete_btn">
                        Delete Damaged Product
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import dayjs from 'dayjs'
import { TableColumn } from "@/types";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';


const childKey = ref(11111);
const authStore = useAuthStore();
const url = computed(() => import.meta.env.VITE_API_URL + 'products_damages');
const isCreateDamageProductModalOpen = ref(false)
const isEditDamageProductModalOpen = ref(false)
const newColumns = ref<TableColumn[]>([
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
        label: 'Quantity',
        field: 'quantity',
        sortable: true
    },
    {
        label: 'Date Damaged',
        field: 'damage_at',
        sortable: true,
        format: (value) => dayjs(value).format('MMM DD, YYYY')
    },
    {
        label: 'Damage Cause',
        field: 'damage_cause',
        sortable: true,
    },
    {
        label: 'Batch No.',
        field: 'batch_no',
        sortable: true,
    },
    {
        label: 'Returnable',
        field: 'returnable',
        sortable: true,
        format: (value) => value ? 'Yes' : '--'
    },
    {
        label: 'Comment',
        field: 'comment',
        sortable: false,
        format: (value) => value ? value : '--'
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('MMM DD, YYYY')
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false,
    },
]);

const damageId = ref(0);
const toast = useToast();
const showDiscardCreateDamageProductModal = ref(false);
const createDamagedProductFormData = ref({
    product_id: '',
    quantity: 0,
    damage_at: '',
    damage_cause: '',
    batch_no: '',
    returnable: false,
    comment: ''
})
const products = ref([]);
const subproducts = ref([]);
const disableForm = ref(false);
const createProductDamageModal = ref(null);
const editProductDamageModal = ref(null);
const subproducts_loading = ref(false);
const products_loading = ref(false);
const damageProductToDelete = ref(null);
const showDiscardDeleteDamageProductModal = ref(false);

const { hasChanged: hasCreateDamageFromDataChanged, reset: resetCreateDamageFromData } = useDataChangeTracker(createDamagedProductFormData);

const handleShowDiscardProductModal = () => {
    if (hasCreateDamageFromDataChanged.value) {
        showDiscardCreateDamageProductModal.value = true;
    } else {
        handleDiscardProductDamage();
    }
}

const handleCreateDamageProductFormDataChange = (data) => {
    createDamagedProductFormData.value = data;
}

const handleClose = (data) => {
    console.log('create damage product form closed', data)
}

const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
    toast.error("Error creating product damage!");
}

const createDamage = (data) => {
    disableForm.value = true;
    axios.post(import.meta.env.VITE_API_URL + `products_damages?current_branch=${authStore.selectedBranch.id}`, createDamagedProductFormData.value)
        .then(response => {
            toast.success("Product Damage created successfully");
            handleDiscardProductDamage()
            // isCreateDamageProductModalOpen.value = false;
            // createDamagedProductFormData.value = {
            //     product_id: '',
            //     quantity: 0,
            //     damage_at: '',
            //     damage_cause: '',
            //     batch_no: '',
            //     returnable: false,
            //     comment: ''
            // }
            childKey.value++;
        }).catch(err => {
            error(err)
        }).finally(() => {
            disableForm.value = false
        })
}

const editDamage = async (damage) => {
    createDamagedProductFormData.value = { ...createDamagedProductFormData.value, ...{ ...damage, ...{ returnable: damage.returnable ? true : false } } };
    await nextTick();
    resetCreateDamageFromData();
    isEditDamageProductModalOpen.value = true;
    damageId.value = damage.id;
    products.value.push(damage.product)
    getSubproduct(damage.product.id);
}

const updateDamage = () => {
    disableForm.value = true;
    axios.patch(import.meta.env.VITE_API_URL + `products_damages/${damageId.value}?current_branch=${authStore.selectedBranch.id}`, createDamagedProductFormData.value)
        .then(response => {
            toast.success("Product Damage updated successfully");
            childKey.value++;
            damageId.value = 0;
            handleDiscardProductDamage()
        }).catch(err => {
            error(err)
        }).finally(() => {
            disableForm.value = false
        })
}

const searchProducts = (search, loading) => {
    if (search == '' || search.length < 3) return;
    products_loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `search_products_typeahead?q=${search}&fields=id,name,price_per_pack,unit_cost,min_reorder&status=all`).then(res => {
        products.value = res.data;
    }).catch(err => {
        error(err);
    }).finally(() => {
        products_loading.value = false;
    });
}

const getSubproduct = (value) => {
    subproducts_loading.value = true;
    if (value == "" || value == null || value == undefined) return;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${value}/subproducts`).then(res => {
        subproducts.value = res.data;
    }).catch(err => {
        toast.error("Error loading product batches!");
    })
        .finally(() => subproducts_loading.value = false);
}

const deleteDamage = () => {
    showDiscardDeleteDamageProductModal.value = false;
    if (!damageProductToDelete.value) {
        toast.error("No product damage selected for deletion!");
        return;
    }

    disableForm.value = true;

    axios.delete(import.meta.env.VITE_API_URL + `products_damages/${damageProductToDelete.value?.id}?current_branch=${authStore.selectedBranch.id}`).then(response => {
        toast.success("Product Damage Deleted Successfully");
        childKey.value++;
    }).catch(err => {
        let errorMessage = "";
        if (err.response.data.error != undefined) {
            errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
        } else errorMessage = "Error deleting product damage!"
        toast.error(errorMessage);
    })
        .finally(() => disableForm.value = false);

}

const handleDiscardProductDamage = async () => {

    createDamagedProductFormData.value = {
        product_id: '',
        quantity: 0,
        damage_at: '',
        damage_cause: '',
        batch_no: '',
        returnable: false,
        comment: ''
    }

    await nextTick();
    resetCreateDamageFromData()
    damageId.value = 0;
    if (isCreateDamageProductModalOpen.value) createProductDamageModal.value?.closeModal();
    if (isEditDamageProductModalOpen.value) editProductDamageModal.value?.closeModal();
    showDiscardCreateDamageProductModal.value = false;
}

const openDeleteWarningModal = (damage) => {
    damageProductToDelete.value = damage
    showDiscardDeleteDamageProductModal.value = true
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

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.footer .discard_merge_alert_footer .delete_btn,
.footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
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

.bulk_products_transfer_alert {
    background: rgba(204, 224, 255, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border-radius: 8px;
}
</style>
