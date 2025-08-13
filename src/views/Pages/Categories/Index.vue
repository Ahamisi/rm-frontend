<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="disableForm">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Product Management / Categories" />
        <div class=" min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="true" :columns="columns" :key="childKey" pageName="Categories">
                <template v-slot:header_actions>
                    <div class="flex gap-3">
                        <button class="flex items-center p-2 text-xs rounded gap-x-1 grey_field"
                            @click="isMergeCategoryModalOpen = true">
                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V5H16C16.5304 5 17.0391 5.21071 17.4142 5.58579C17.7893 5.96086 18 6.46957 18 7V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H7C6.46957 18 5.96086 17.7893 5.58579 17.4142C5.21071 17.0391 5 16.5304 5 16V13H2C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V2ZM7 13V16H16V7H13V11C13 11.5304 12.7893 12.0391 12.4142 12.4142C12.0391 12.7893 11.5304 13 11 13H7ZM11 7V11H7V7H11ZM11 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V11H2V2H11V5Z"
                                    fill="#44546F" />
                            </svg>
                            <span>Merge Category</span>
                        </button>

                        <button @click.prevent="isCreateCategoryModalOpen = true"
                            class="flex items-center gap-x-1 pl-1 pr-2 py-1.5 rounded text-white create_btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                    fill="white" />
                            </svg>

                            <span>Create Category</span>
                        </button>
                    </div>
                </template>
                <template #column="col">
                    <span v-if="col.props.column.field === 'image_url'">
                        <img :src="getImageSrc(col.props.row.image_url)" class="object-cover w-8 h-8 rounded"
                            alt="Category Image" />
                    </span>
                    <span v-else-if="col.props.column.field === 'actions'" class="flex justify-center gap-3">
                        <button type="button" @click.prevent="editCategory(col.props.row)">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z"
                                    fill="#44546F" />
                            </svg>
                        </button>
                        <button type="button" @click.prevent="openDeleteCategoryWarningModal(col.props.row)">
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

        <!-- create category modal -->
        <SideBarModal title="Create Category" :is-open="isCreateCategoryModalOpen" width="lg"
            :initial-form-data="categoryFormData" @update:is-open="isCreateCategoryModalOpen = $event"
            @close="handleClose" @form-data-change="handleCreateCategoryFormDataChange" ref="createCategoryModal"
            :show-discard-warning="showDiscardCategoryModal" @showDiscardWarning="showDiscardCategoryModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <!-- Select Product type -->
                    <div class="md:col-span-2">
                        <label class="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
                        <v-select :options="categories" label="display_name" v-model="categoryFormData.display_name"
                            :reduce="product => product.display_name" @option:selected="onCategorySelected" taggable
                            @tag="addNewCategory">
                            <template slot="no-options">
                                Type to search categories...
                            </template>
                        </v-select>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block mb-1 text-sm font-medium text-gray-700">Category Image</label>
                        <FileUploader :allowMultiple="false" :maxFileSize="maxFilesize" fileType="image/*"
                            @update:files="handleSelectedFiles" />
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardCategoryModal" type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cancel_btn">
                        Cancel
                    </button>
                    <button @click="createCategory" type="button"
                        class="px-4 py-1 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Create
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- edit category modal -->
        <SideBarModal title="Edit Category" :is-open="isEditCategoryModalOpen" width="lg"
            :initial-form-data="categoryFormData" @update:is-open="isEditCategoryModalOpen = $event"
            @close="handleClose" @form-data-change="handleCreateCategoryFormDataChange" ref="editCategoryModal"
            :show-discard-warning="showDiscardCategoryModal" @showDiscardWarning="showDiscardCategoryModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <!-- Select Product type -->
                    <div class="md:col-span-2">
                        <label class="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
                        <v-select :options="categories" label="display_name" v-model="categoryFormData.display_name"
                            :reduce="product => product.display_name" @option:selected="onCategorySelected" taggable
                            @tag="addNewCategory">
                            <template slot="no-options">
                                Type to search categories...
                            </template>
                        </v-select>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block mb-1 text-sm font-medium text-gray-700">Category Image</label>
                        <FileUploader :allowMultiple="false" :maxFileSize="maxFilesize" fileType="image/*"
                            @update:files="handleSelectedFiles" />
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardCategoryModal" type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cancel_btn">
                        Cancel
                    </button>
                    <button @click="updateCategory" type="button"
                        class="px-4 py-1 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Update
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- merge category modal -->
        <SideBarModal title="Merge Category" :is-open="isMergeCategoryModalOpen" width="lg"
            :initial-form-data="mergeCategoryFormData" @update:is-open="isMergeCategoryModalOpen = $event"
            @close="handleClose" @form-data-change="handleMergeCategoryChange" ref="mergeCategoryModal"
            :show-discard-warning="showDiscardCategoryMergeModal"
            @showDiscardWarning="showDiscardCategoryMergeModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">
                    <!-- Select Product type -->
                    <div class="">
                        <label class="block mb-1 text-sm font-medium text-gray-700">Primary Category</label>
                        <v-select :options="categories" label="display_name"
                            v-model="mergeCategoryFormData.primary_category" :reduce="cat => cat.id"
                            placeholder="Select a primary category">
                            <template slot="no-options">
                                Type to search categories..
                            </template>
                        </v-select>
                    </div>
                    <MultiSelect :options="getMergeCategories" label="display_name"
                        placeholder="Select other categories to merge" tag="categories"
                        @update:model-value="otherCategoriesUpdated">
                        <template #label>
                            <label class="">Other Categories</label>
                        </template>
                        <template #description>
                            <p class="text-xs text-gray-500">You can select up to 3 categories</p>
                        </template>

                    </MultiSelect>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardMergeCategoryModal" type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cancel_btn">
                        Cancel
                    </button>
                    <button @click="mergeCategories" type="button"
                        class="px-4 py-1 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Merge
                    </button>
                </div>
            </template>
        </SideBarModal>



        <!-- discard warning Modal -->
        <UniversalCenteredModal :show="showDiscardCategoryModal" @close="showDiscardCategoryModal = false">
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
                <p class="discard_merge_alert_body_text">
                    You are about to leave the <strong>"{{ categoryId ? "Edit" : "Create" }} Category"</strong> process.
                    Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardCategoryModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardCategory" type="button" class="discard_btn">
                        Discard Changes
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- discard merge warning Modal -->
        <UniversalCenteredModal :show="showDiscardCategoryMergeModal" @close="showDiscardCategoryMergeModal = false">
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
                <p class="discard_merge_alert_body_text">
                    You are about to leave the <strong>"Merge Categories"</strong> process.
                    Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardCategoryMergeModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardCategory" type="button" class="discard_btn">
                        Discard Changes
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- discard delete warning Modal -->
        <UniversalCenteredModal :show="showDiscardCategoryDeleteModal" @close="showDiscardCategoryDeleteModal = false">
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
                    You are about to leave the <strong>"{{ deleteCategoryFromData.display_name }}"</strong> process.
                    Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardCategoryDeleteModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteCategory" type="button" class="delete_btn">
                        Delete Category
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import dayjs from 'dayjs'
import { TableColumn } from "@/types";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import FileUploader from '@/views/Components/FileUploader.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import MultiSelect from '@/views/Components/MultiSelect.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';


const url = computed(() => {
    return import.meta.env.VITE_API_URL + 'categories';
});

onMounted(() => {
    getAllCategories();
})

const disableForm = ref(false);
const showDiscardCategoryMergeModal = ref(false);
const showDiscardCategoryDeleteModal = ref(false);
const authStore = useAuthStore();
const toast = useToast();
const categories = ref([]);
const maxFilesize = ref(102400); // 100kb
const createCategoryModal = ref(null);
const editCategoryModal = ref(null);
const mergeCategoryModal = ref(null);
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Category Image',
        field: 'image_url',
        sortable: false,
    },
    {
        label: 'Category Name',
        field: 'display_name',
        sortable: true,
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY'),
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false
    },
]);

const childKey = ref(111);

const categoryFormData = ref<Partial<{
    display_name: string | null,
    image_url: File | null
}>>({
    display_name: null,
    image_url: null,
});

const deleteCategoryFromData = ref<Partial<{
    display_name: string | null,
    image_url: File | null
    id: number | null
}>>({
    id: 0,
    display_name: null,
    image_url: null,
});

const isMergeCategoryModalOpen = ref(false);
const isCreateCategoryModalOpen = ref(false);
const showDiscardCategoryModal = ref(false);
const categoryId = ref(0);
const isEditCategoryModalOpen = ref(false);
const mergeCategoryFormData = ref({
    primary_category: null as number | null,
    merge_categories: []
})

const { hasChanged: hasCategoryFormDataChanged, reset: resetCategoryFromData } = useDataChangeTracker(categoryFormData);
const { hasChanged: hasMergeCategoryFormDataChanged, reset: resetMergeCategoryFromData } = useDataChangeTracker(mergeCategoryFormData);

const handleShowDiscardCategoryModal = () => {
    if (hasCategoryFormDataChanged.value) {
        showDiscardCategoryModal.value = true;
    } else {
        handleDiscardCategory()
    }
}
const handleShowDiscardMergeCategoryModal = () => {
    if (hasMergeCategoryFormDataChanged.value) {
        showDiscardCategoryMergeModal.value = true;
    } else {
        handleDiscardCategory()
    }
}

const getMergeCategories = computed(() => categories.value.filter(cat => cat.id != mergeCategoryFormData.value.primary_category))
const handleSelectedFiles = (files: File[]) => {
    categoryFormData.value.image_url = files[0];
};

const handleClose = (data) => {
    console.log('handleClose', data)
}

const onCategorySelected = (selected) => {
    if (selected && typeof selected === 'object') {
        // select existing product formulation
        categoryFormData.value = {
            ...categoryFormData.value,
            ...selected
        };
    } else if (selected && typeof selected === 'string') {

        categoryFormData.value.display_name = selected;
    } else if (!selected) {
        // Cleared selection
        categoryFormData.value.display_name = "";
    }
}

const getImageSrc = (image: string | null) => {
    return image ? image : "https://cdn.remedial.health/product_images/aS8Waps1DreNT6f72jhOzHw2ArXvES9gjJd0jgBm147551.webp";
};

const handleCreateCategoryFormDataChange = (data) => {
    categoryFormData.value = data;
}

const editCategory = async (cat) => {
    categoryFormData.value = { ...categoryFormData.value, ...cat };
    await nextTick();
    resetCategoryFromData();
    categoryId.value = cat.id;
    isEditCategoryModalOpen.value = true;
}

const deleteCategory = () => {
    disableForm.value = true;
    showDiscardCategoryDeleteModal.value = false;
    axios.delete(import.meta.env.VITE_API_URL + "categories/" + deleteCategoryFromData.value.id).then(response => {
        childKey.value++;
        toast.success("Category Deleted Successfully");
    }).catch(err => {
        error(err);
    })
        .finally(() => {
            disableForm.value = false;
        })

}

const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

const addNewCategory = (newTag) => {
    // Create a new formulation object
    const newFormulation = {
        display_name: newTag,
        id: Date.now()
    };

    // Add to the types array
    categories.value.push(newFormulation);

    // Set as selected value
    categoryFormData.value.display_name = newTag;
}

const handleDiscardCategory = async () => {
    categoryFormData.value = { display_name: '', image_url: null };
    await nextTick();
    resetCategoryFromData();
    categoryId.value = 0;
    showDiscardCategoryModal.value = false;
    mergeCategoryFormData.value = {
        primary_category: null,
        merge_categories: []
    }
    await nextTick();
    resetMergeCategoryFromData();
    showDiscardCategoryMergeModal.value = false;
    if (isCreateCategoryModalOpen.value) createCategoryModal.value?.closeModal()
    if (isEditCategoryModalOpen.value) editCategoryModal.value?.closeModal()
    if (isMergeCategoryModalOpen.value) mergeCategoryModal.value?.closeModal()
}

const createCategory = () => {
    if (categoryFormData.value.display_name.trim() === '') {
        toast.error("Please enter a category name");
        return;
    }

    disableForm.value = true;
    let display_name = categoryFormData.value.display_name;
    let name = display_name.split(' ').join('_').toLowerCase();
    let image = null;
    if (categoryFormData.value.image_url) {
        image = categoryFormData.value.image_url
    }
    axios({ url: import.meta.env.VITE_API_URL + 'categories', data: { name, display_name, image }, method: 'POST' })
        .then(resp => {
            categoryFormData.value = {
                image_url: null,
                display_name: ""
            }
            handleDiscardCategory()
            toast.success("Category Updated Successfully");
            getAllCategories();
        })
        .catch(err => {
            error(err);
        })
        .finally(() => {
            disableForm.value = false;
        })
}

const updateCategory = () => {
    if (categoryFormData.value.display_name.trim() === '') {
        toast.error("Please enter a category name");
        return;
    }
    disableForm.value = true;

    let display_name = categoryFormData.value.display_name;
    let name = display_name.split(' ').join('_').toLowerCase();
    let image_url = null;
    if (categoryFormData.value.image_url) {
        image_url = categoryFormData.value.image_url;
    }
    axios({ url: import.meta.env.VITE_API_URL + 'categories/' + categoryFormData.value.id, data: { name, display_name, image_url }, method: 'PUT' })
        .then(resp => {
            toast.success("Category Updated Successfully");
            handleDiscardCategory()
            getAllCategories();
        })
        .catch(err => {
            error(err);
        })
        .finally(() => {
            disableForm.value = false;
        })
}

const getAllCategories = () => {
    axios.get(import.meta.env.VITE_API_URL + 'categories?all=1').then((response) => {
        categories.value = response.data;
    })
        .catch(err => toast.error('Error getting categories'))
}

const handleMergeCategoryChange = (data) => {
    mergeCategoryFormData.value.merge_categories = data;
}

const mergeCategories = () => {
    if (!mergeCategoryFormData.value.primary_category) {
        toast.error('please select a primary category to merge into')
        return;
    }

    if (mergeCategoryFormData.value.merge_categories.length == 0) {
        toast.error('please select at least one category to merge into the primary category')
        return;
    }

    disableForm.value = true;
    axios.post(import.meta.env.VITE_API_URL + 'categories/merge', { categories: [mergeCategoryFormData.value.primary_category, ...mergeCategoryFormData.value.merge_categories] })
        .then(res => {
            toast.success("Categories merged successfully");
            handleDiscardCategory()
            getAllCategories();
        }).catch(err => {
            error(err);
        }).finally(() => {
            disableForm.value = false;
        });
}

const openDeleteCategoryWarningModal = (category) => {
    deleteCategoryFromData.value = category;
    showDiscardCategoryDeleteModal.value = true;
}

const otherCategoriesUpdated = (selectedCategories) => {
    mergeCategoryFormData.value.merge_categories = selectedCategories.map(cat => cat.id);
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

.grey_field {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.discard_merge_alert_footer .delete_btn {
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

.merge_note {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: rgba(98, 111, 134, 1);
    margin-top: 0.15em;
}
</style>
