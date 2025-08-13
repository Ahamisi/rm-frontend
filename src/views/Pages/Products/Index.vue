<template>
    <div v-if="disableForm"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="erp_dashboard_wrapper">
        <div class="grey_bg">
            <!-- Header -->
            <PageTitle :title="getPageTitle" class="px-6" />

            <!-- tabs -->
            <Tabs :tabs="tabs" @tabChanged="handleTabChange" :defaultTab="activeTab">
                <div class="flex flex-wrap items-center gap-3 mb-1 ml-auto tab_actions">
                    <!-- upload -->
                    <div class="relative">
                        <button @click.stop="toggleUpload"
                            class="flex items-center gap-x-1 p-1 py-1.5 rounded grey_field">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.208 9.32L9.29 11.253C9.10405 11.4403 8.9997 11.6936 8.9997 11.9575C8.9997 12.2214 9.10405 12.4747 9.29 12.662C9.38133 12.7544 9.4901 12.8278 9.61001 12.8779C9.72991 12.928 9.85856 12.9538 9.9885 12.9538C10.1184 12.9538 10.2471 12.928 10.367 12.8779C10.4869 12.8278 10.5957 12.7544 10.687 12.662L11.977 11.361L13.313 12.708C13.4043 12.8005 13.513 12.874 13.6329 12.9241C13.7527 12.9743 13.8813 13.0002 14.0113 13.0003C14.1412 13.0004 14.2699 12.9747 14.3898 12.9247C14.5098 12.8747 14.6186 12.8014 14.71 12.709C14.8953 12.5216 14.9993 12.2687 14.9995 12.0052C14.9997 11.7417 14.896 11.4887 14.711 11.301L12.746 9.321C12.6456 9.21904 12.5259 9.13806 12.3939 9.08275C12.262 9.02744 12.1203 8.99891 11.9772 8.99881C11.8341 8.99872 11.6924 9.02707 11.5604 9.0822C11.4283 9.13734 11.3085 9.21817 11.208 9.32Z"
                                    fill="#44546F" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11 10.007L11.001 19.993C11.001 20.55 11.449 21.001 12.001 21C12.554 21 13.001 20.55 13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 10.999 9.451 11 10.007Z"
                                    fill="#44546F" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.938 5.481C7.68114 5.43897 7.42128 5.4179 7.161 5.418C4.356 5.419 2 7.62 2 10.499C2 13.408 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.463 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.993C13.987 5.003 14.954 5.37825 15.7027 6.04875C16.4514 6.71924 16.9306 7.63919 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.666 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.021 9.075 3.901 7.938 5.481Z"
                                    fill="#44546F" />
                            </svg>
                            <span>Upload</span>|
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.29158 10.293C8.10477 10.4819 8 10.7368 8 11.0025C8 11.2682 8.10477 11.5231 8.29158 11.712L11.2306 14.677C11.4486 14.892 11.7306 14.999 12.0096 14.999C12.2886 14.999 12.5656 14.892 12.7786 14.677L15.7086 11.722C15.8951 11.533 15.9998 11.2781 15.9998 11.0125C15.9998 10.7469 15.8951 10.492 15.7086 10.303C15.6167 10.2098 15.5073 10.1358 15.3866 10.0853C15.2659 10.0348 15.1364 10.0088 15.0056 10.0088C14.8748 10.0088 14.7452 10.0348 14.6245 10.0853C14.5039 10.1358 14.3944 10.2098 14.3026 10.303L12.0046 12.62L9.69758 10.293C9.60554 10.2002 9.49604 10.1265 9.37538 10.0762C9.25472 10.0259 9.1253 10.0001 8.99458 10.0001C8.86386 10.0001 8.73444 10.0259 8.61378 10.0762C8.49312 10.1265 8.38362 10.2002 8.29158 10.293Z"
                                    fill="#44546F" />
                            </svg>
                        </button>
                        <div v-if="uploadOpen"
                            class="absolute left-0 z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
                            <ul class="py-1 text-xs text-gray-700">
                                <li @click="openBulkProductUploadModal"
                                    class="block p-3 cursor-pointer hover:bg-gray-100">
                                    Bulk Products Upload
                                </li>
                                <li @click="openBulkProductTransferModal"
                                    class="block p-3 cursor-pointer hover:bg-gray-100">
                                    Bulk Products Transfer
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- download -->
                    <div class="relative">
                        <button @click.stop="toggleDownload"
                            class="flex items-center gap-x-1 p-1 py-1.5 rounded grey_field">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.208 9.32L9.29 11.253C9.10405 11.4403 8.9997 11.6936 8.9997 11.9575C8.9997 12.2214 9.10405 12.4747 9.29 12.662C9.38133 12.7544 9.4901 12.8278 9.61001 12.8779C9.72991 12.928 9.85856 12.9538 9.9885 12.9538C10.1184 12.9538 10.2471 12.928 10.367 12.8779C10.4869 12.8278 10.5957 12.7544 10.687 12.662L11.977 11.361L13.313 12.708C13.4043 12.8005 13.513 12.874 13.6329 12.9241C13.7527 12.9743 13.8813 13.0002 14.0113 13.0003C14.1412 13.0004 14.2699 12.9747 14.3898 12.9247C14.5098 12.8747 14.6186 12.8014 14.71 12.709C14.8953 12.5216 14.9993 12.2687 14.9995 12.0052C14.9997 11.7417 14.896 11.4887 14.711 11.301L12.746 9.321C12.6456 9.21904 12.5259 9.13806 12.3939 9.08275C12.262 9.02744 12.1203 8.99891 11.9772 8.99881C11.8341 8.99872 11.6924 9.02707 11.5604 9.0822C11.4283 9.13734 11.3085 9.21817 11.208 9.32Z"
                                    fill="#44546F" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11 10.007L11.001 19.993C11.001 20.55 11.449 21.001 12.001 21C12.554 21 13.001 20.55 13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 10.999 9.451 11 10.007Z"
                                    fill="#44546F" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.938 5.481C7.68114 5.43897 7.42128 5.4179 7.161 5.418C4.356 5.419 2 7.62 2 10.499C2 13.408 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.463 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.993C13.987 5.003 14.954 5.37825 15.7027 6.04875C16.4514 6.71924 16.9306 7.63919 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.666 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.021 9.075 3.901 7.938 5.481Z"
                                    fill="#44546F" />
                            </svg>
                            <span>Download</span>|
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.29158 10.293C8.10477 10.4819 8 10.7368 8 11.0025C8 11.2682 8.10477 11.5231 8.29158 11.712L11.2306 14.677C11.4486 14.892 11.7306 14.999 12.0096 14.999C12.2886 14.999 12.5656 14.892 12.7786 14.677L15.7086 11.722C15.8951 11.533 15.9998 11.2781 15.9998 11.0125C15.9998 10.7469 15.8951 10.492 15.7086 10.303C15.6167 10.2098 15.5073 10.1358 15.3866 10.0853C15.2659 10.0348 15.1364 10.0088 15.0056 10.0088C14.8748 10.0088 14.7452 10.0348 14.6245 10.0853C14.5039 10.1358 14.3944 10.2098 14.3026 10.303L12.0046 12.62L9.69758 10.293C9.60554 10.2002 9.49604 10.1265 9.37538 10.0762C9.25472 10.0259 9.1253 10.0001 8.99458 10.0001C8.86386 10.0001 8.73444 10.0259 8.61378 10.0762C8.49312 10.1265 8.38362 10.2002 8.29158 10.293Z"
                                    fill="#44546F" />
                            </svg>
                        </button>
                        <div v-if="downloadOpen"
                            class="absolute left-0 z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
                            <ul class="py-1 text-xs text-gray-700">
                                <li>
                                    <a :href="download_url" target="_blank"
                                        class="block p-3 cursor-pointer hover:bg-gray-100">
                                        Download Stock Report
                                    </a>
                                </li>
                                <li>
                                    <a :href="download_url + '&active=1'" target="_blank"
                                        class="block p-3 cursor-pointer hover:bg-gray-100">
                                        Download Active Stock Report
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button class="flex items-center p-1 py-2 rounded gap-x-1 grey_field"
                        @click="isMergeProductModalOpen = true">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V5H16C16.5304 5 17.0391 5.21071 17.4142 5.58579C17.7893 5.96086 18 6.46957 18 7V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H7C6.46957 18 5.96086 17.7893 5.58579 17.4142C5.21071 17.0391 5 16.5304 5 16V13H2C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V2ZM7 13V16H16V7H13V11C13 11.5304 12.7893 12.0391 12.4142 12.4142C12.0391 12.7893 11.5304 13 11 13H7ZM11 7V11H7V7H11ZM11 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V11H2V2H11V5Z"
                                fill="#44546F" />
                        </svg>
                        <span>Merge Products</span>
                    </button>
                    <button class="flex items-center gap-x-1 pl-1 pr-2 py-1.5 rounded text-white"
                        @click="isCreateProductModalOpen = true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>
                        <span>Create Product</span>
                    </button>
                </div>
            </Tabs>
        </div>

        <!-- contents -->
        <div class="min-h-[calc(100vh - 190px)] px-6 mt-0 bg-white tab_contents">
            <div class="" v-if="activeTab === 'Active Products'">
                <ActiveProducts :product_types="productTypes" :categories="categories" :manufacturers="manufacturers" />
            </div>
            <div class="" v-if="activeTab === 'Inactive Products'">
                <InactiveProducts :product_types="productTypes" :categories="categories"
                    :manufacturers="manufacturers" />
            </div>
            <div class="" v-if="activeTab === 'Product Stock Reports'">
                <ProductStockReport :product_types="productTypes" :categories="categories" />
            </div>
        </div>

        <!-- merge products modal -->
        <SideBarModal title="Merge Products" :is-open="isMergeProductModalOpen" width="lg" ref="mergeProductModal"
            :initial-form-data="mergeProductFormData" @update:is-open="isMergeProductModalOpen = $event"
            @close="handleClose" @form-data-change="handleMergeProductFormDataChange"
            :show-discard-warning="showDiscardMergeProductModal"
            @showDiscardWarning="showDiscardMergeProductModal = true" class="merge_product">
            <!-- Main content -->
            <template #default>
                <div class="space-y-6">
                    <!-- Item Name -->
                    <div>
                        <label class="">Primary Product</label>
                        <div class="relative">
                            <v-select v-model="mergeProductFormData.primary_id" :options="primeProducts" label="name"
                                placeholder="Type to search for product..." @search="onSearchMergePrimeProduct"
                                :loading="prime_product_loading" :reduce="product => product.id" />
                            <p class="mt-1 text-xs text-gray-500">Other products will be merged into this</p>
                        </div>
                    </div>
                    <MultiSelect :url="mergeProductSearchUrl" label="name" placeholder="Type to search for product..."
                        tag="products" @update:model-value="onMergeProductsUpdate"
                        :excludeId="mergeProductFormData.primary_id">
                        <template #label>
                            <label class="">Other Product</label>
                        </template>
                        <template #description>
                            <p class="mt-1 text-xs text-gray-500">You can select up to 3 products</p>
                        </template>
                    </MultiSelect>
                    <!-- <div>
                        <label class="">Other Product</label>
                        <div class="relative">
                            <v-select multiple v-model="mergeProductFormData.secondary_id" :options="otherProducts"
                                label="name" placeholder="Type to search for product..."
                                @search="onSearchMergeOtherProduct" :loading="other_product_loading"
                                :reduce="product => product.id" />
                            <p class="mt-1 text-xs text-gray-500">You can select up to 3 products </p>
                        </div>
                    </div> -->


                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="handleShowDiscardMergeProduct" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="mergeProduct(mergeProductFormData)" type="button" class="approve_btn">
                        Merge
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- Bulk Products Upload Modal -->
        <SideBarModal title="Bulk Product Upload" :is-open="isBulkProductUploadModalOpen" width="lg"
            ref="bulkProductUploadModal" :initial-form-data="bulkProductUploadFormData"
            :show-discard-warning="showDiscardBulkProductUploadModal"
            @update:is-open="isBulkProductUploadModalOpen = $event" @close="handleClose"
            @form-data-change="handleBulkProductUploadFormDataChange"
            @showDiscardWarning="showDiscardBulkProductUploadModal = true" class="bulk_upload">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">
                    <!-- Excel File Upload -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Excel File</label>
                        <div class="flex items-center gap-2">
                            <input type="file" accept=".xlsx,.xls,.csv" @change="handleBulkProductExcelUpload"
                                class="hidden w-full" ref="bulkUploadExcelInput" />
                            <input type="text" v-model="bulkUploadExcelFileName" class="w-full focus:outline-none"
                                readonly placeholder="Choose file to upload" />

                            <button type="button" @click="triggerBulkUploadExcelFileInput"
                                class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 upload_file">
                                Upload
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">.xlsx, .xls, .csv max 10mb</p>
                    </div>

                    <!-- Sheet Name -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Sheet Name</label>
                        <input type="text" v-model="bulkProductUploadFormData.sheet_name"
                            placeholder="Enter a sheet name" class="w-full focus:outline-none" />
                    </div>

                    <!-- Upload Type -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Upload Type</label>
                        <select v-model="bulkProductUploadFormData.type" class="w-full focus:outline-none">
                            <option value="" disabled>Select an upload type</option>
                            <option value="create">Create New Products</option>
                            <option value="update">Update Products</option>
                        </select>
                    </div>

                    <!-- Zip Images Upload -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Zip Images</label>
                        <div class="flex items-center gap-2">
                            <input type="file" accept=".zip" @change="handleZipUpload" class="hidden w-full"
                                ref="bulkUploadZipInput" />
                            <input type="text" v-model="bulkUploadZipFileName" placeholder="Choose file to upload"
                                class="w-full focus:outline-none" readonly />
                            <button type="button" @click="triggerBulkUploadZipFileInput"
                                class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 upload_zip">
                                Upload
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">JPG, PNG, WebP max 100mb</p>
                    </div>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="handleShowDiscardBulkProductUpload" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleBulkUpload(formData)" type="button" class="approve_btn">
                        Upload
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- Bulk Products Transfer Modal -->
        <SideBarModal title="Bulk Products Transfer" :is-open="isBulkProductTransferModalOpen" width="lg"
            ref="bulkProductTransferModal" :initial-form-data="bulkProductTransferFormData"
            :show-discard-warning="showDiscardBulkProductTransferModal"
            @update:is-open="isBulkProductTransferModalOpen = $event" @close="handleClose"
            @form-data-change="handleBulkProductTransferFormDataChange"
            @showDiscardWarning="showDiscardBulkProductTransferModal = true" class="bulk_transfer">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">
                    <div class="p-4 my-3 bulk_products_transfer_alert">
                        Please <a class="text-blue-700" @click.prevent="getTransferTemplate" href="#">click here</a> to
                        download the bulk product upload template.
                    </div>

                    <!-- Excel File Upload -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Excel File</label>
                        <div class="flex items-center gap-2">
                            <input type="file" accept=".xlsx,.xls,.csv" @change="handleBulkProductExcelTransfer"
                                class="hidden w-full" ref="bulkTransferExcelInput" />
                            <input type="text" v-model="bulkTransferExcelFileName" class="w-full focus:outline-none"
                                readonly placeholder="Choose file to upload" />

                            <button type="button" @click="triggerBulkTransferExcelFileInput"
                                class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 upload_file">
                                Upload
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">.xlsx, .xls, .csv max 10mb</p>
                    </div>

                    <!-- Branch to transfer to-->
                    <div>
                        <label class="">Branch</label>
                        <div class="relative">
                            <v-select v-model="bulkProductTransferFormData.to_branch" :options="branches" label="name"
                                placeholder="Type to search for branch..." :reduce="branch => branch.id" />
                        </div>
                    </div>

                    <!-- Batch with errors -->
                    <div v-if="errorRows.batches.length > 0" class="my-3 rounded-md">
                        <div class="text-sm text-red-700 alert alert-danger">
                            There are some issues with the uploaded sheet.
                        </div>
                        <section class="overflow-x-auto text-xs">
                            <div class="grid grid-cols-7 gap-3 font-bold item_header">
                                <span class="py-3 text-gray-700">Product ID</span>
                                <h6 class="py-3 text-gray-700">Batch No.</h6>
                                <h6 class="py-3 text-gray-700">Exp. Date</h6>
                                <h6 class="py-3 text-gray-700">Warehouse Shelf</h6>
                                <h6 class="py-3 text-gray-700">Qty Avail.</h6>
                                <h6 class="py-3 text-gray-700">Qty to Transfer</h6>
                                <h6 class="py-3 text-gray-700">Reason</h6>
                            </div>
                            <div class="grid items-center grid-cols-7 gap-3 border-b-2 border-gray-200"
                                v-for="batch, index in errorRows.batches" :key="'item' + index">
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.product_id }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.batch_no }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.expiry_date }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.shelf }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.quantity }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.quantity_to_transfer }}
                                </span>
                                <span class="py-3 text-xs text-gray-700">
                                    {{ batch.reason }}
                                </span>
                            </div>
                        </section>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="handleShowDiscardBulkProductTransfer" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="createTransfer" type="button" class="approve_btn">
                        Transfer
                    </button>
                </div>
            </template>
        </SideBarModal>


        <!-- merge products discard warning Modal -->
        <UniversalCenteredModal :show="showDiscardMergeProductModal" @close="showDiscardMergeProductModal = false">
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
                    You are about to leave the <strong>"Merge Products"</strong> process. Any unsaved information will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardMergeProductModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardMergeProduct" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- bulk products upload warning Modal -->
        <UniversalCenteredModal :show="showDiscardBulkProductUploadModal"
            @close="showDiscardBulkProductUploadModal = false">
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
                    You are about to leave the <strong>"Bulk Products Upload"</strong> process. Any unsaved information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardBulkProductUploadModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardBulkProductUpload" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- bulk products transfer warning Modal -->
        <UniversalCenteredModal :show="showDiscardBulkProductTransferModal"
            @close="showDiscardBulkProductTransferModal = false">
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
                    You are about to leave the <strong>"Bulk Products Transfer"</strong> process. Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardBulkProductTransferModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardBulkProductTransfer" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- create product modal -->
        <Create :isOpen="isCreateProductModalOpen" @close="isCreateProductModalOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import Tabs from "@/views/Components/Tabs.vue";
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { useRoute } from 'vue-router'
import ActiveProducts from './ActiveProducts.vue';
import InactiveProducts from './InactiveProducts.vue';
import ProductStockReport from './ProductStockReport.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import Create from './Create.vue';
import MultiSelect from '@/views/Components/MultiSelect.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';
import { useGlobalStore } from '@/stores/global';


const globalStore = useGlobalStore();
const authStore = useAuthStore();
const mergeProductModal = ref(null);
const bulkProductTransferModal = ref(null)
const bulkProductUploadModal = ref(null)
const isCreateProductModalOpen = ref(false);
const prime_product_loading = ref(false)
const other_product_loading = ref(false)
const activeTab = ref('');
const tabs = ref(['Active Products', 'Inactive Products', 'Product Stock Reports']);
const title = ref('Products Management / All Products');
const route = useRoute();
const toast = useToast();
const productTypes = ref([]);
const categories = ref([]);
const manufacturers = ref([]);
const isMergeProductModalOpen = ref(false);
const mergeProductFormData = ref({
    primary_id: null,
    secondary_id: []
})
const branches = ref([]);
const primeProducts = ref([]);
const product_loading = ref(false);
const otherProducts = ref([]);
const showDiscardMergeProductModal = ref(false);
const showDiscardBulkProductUploadModal = ref(false);
const showDiscardBulkProductTransferModal = ref(false);
const disableForm = ref(false);
const download_url = ref('');
let debounceTimeout: ReturnType<typeof setTimeout>;
const isBulkProductUploadModalOpen = ref(false)
const isBulkProductTransferModalOpen = ref(false)
const bulkProductTransferFormData = ref({
    excel_file: null as File | null,
    to_branch: null as number | null
})
const errorRows = ref({
    batches: []
})

const bulkProductUploadFormData = ref({
    excel_file: null as File | null,
    zip_file: null as File | null,
    sheet_name: '',
    type: ''
})

const { hasChanged: hasMergeFormDataChanged, reset: resetMergeFromData } = useDataChangeTracker(mergeProductFormData);
const { hasChanged: hasBulkProductTransferFormData, reset: resetBulkProductTransferFormData } = useDataChangeTracker(bulkProductTransferFormData);
const { hasChanged: hasBulkProductUploadFormData, reset: resetBulkProductUploadFormData } = useDataChangeTracker(bulkProductUploadFormData);
const uploadOpen = computed(() => globalStore.openDropdownId === 'productUploadDropDown');
const downloadOpen = computed(() => globalStore.openDropdownId === 'productUploadDownload');

const handleShowDiscardMergeProduct = () => {
    if (hasMergeFormDataChanged.value) {
        showDiscardMergeProductModal.value = true;
    } else {
        mergeProductModal.value?.closeModal();
        resetMergeFromData();
    }
}

const handleShowDiscardBulkProductTransfer = () => {
    if (hasBulkProductTransferFormData.value) {
        showDiscardBulkProductTransferModal.value = true;
    } else {
        bulkProductTransferModal.value?.closeModal();
        resetBulkProductTransferFormData();
    }
}

const handleShowDiscardBulkProductUpload = () => {
    if (hasBulkProductUploadFormData.value) {
        showDiscardBulkProductUploadModal.value = true;
    } else {
        bulkProductUploadModal.value?.closeModal();
        resetBulkProductUploadFormData();
    }
}

const openBulkProductUploadModal = () => {
    isBulkProductUploadModalOpen.value = true;
    globalStore.closeDropdown()
    bulkProductUploadFormData.value = {
        excel_file: null,
        zip_file: null,
        sheet_name: '',
        type: ''
    };
}

const openBulkProductTransferModal = () => {
    isBulkProductTransferModalOpen.value = true;
    globalStore.closeDropdown()
    bulkProductTransferFormData.value = {
        excel_file: null,
        to_branch: null
    };
}

const bulkUploadExcelInput = ref<HTMLInputElement | null>(null);
const bulkUploadExcelFileName = ref('');
const bulkUploadZipInput = ref<HTMLInputElement | null>(null);
const bulkUploadZipFileName = ref('');
const bulkTransferExcelInput = ref<HTMLInputElement | null>(null);
const bulkTransferExcelFileName = ref('');

const handleBulkProductUploadFormDataChange = (data) => {
    bulkProductUploadFormData.value = data
}

const handleBulkProductTransferFormDataChange = (data) => {
    bulkProductTransferFormData.value = data
}

const handleBulkProductExcelUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null
    bulkProductUploadFormData.value.excel_file = file
    if (file) bulkUploadExcelFileName.value = file.name;
}
const handleBulkProductExcelTransfer = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null
    bulkProductTransferFormData.value.excel_file = file
    if (file) bulkTransferExcelFileName.value = file.name
}

const handleZipUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null
    bulkProductUploadFormData.value.zip_file = file
    if (file) bulkUploadZipFileName.value = file.name;
}

const handleBulkUpload = (formData) => {
    console.log('Final Upload', formData)
    uploadBulkProduct();
}

onMounted(() => {
    activeTab.value = localStorage.getItem('product_tab') ?? 'All Products';
    document.addEventListener('click', handleDocumentClick);
    getProductTypes();
    getCategories();
    getManufacturers();
    getProductDownloadUrl();
    getBranches();
});

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
});

const handleMergeProductFormDataChange = (data: any) => {
    mergeProductFormData.value = data;
};

const getProductDownloadUrl = () => {
    axios.get(import.meta.env.VITE_API_URL + "products/download/get").then(response => {
        download_url.value = response.data + `?current_branch=${authStore.selectedBranch.id}`;
    }).catch(err => {
        toast.error("Error getting stock report download link");
    });
}

const handleClose = (data) => {
    console.log('Modal closed with data:', data);
};

const mergeProductSearchUrl = computed(() => {
    return import.meta.env.VITE_API_URL + `products/all`;
});

const fetchProducts = async (query: string, referenceData, loading, exceptionId: number | string = 0, preserveIds: (string | number)[] = []) => {
    loading.value = true;
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + `products/all?searchTerm=${query}&current_branch=${authStore.selectedBranch.id}`
        );

        // Always preserve previously selected items
        const selectedItems = referenceData.value.filter(item =>
            preserveIds.includes(item.id)
        );

        // Filter out duplicates and the exceptionId
        const newItems = res.data.filter(
            product =>
                product.id !== exceptionId &&
                !preserveIds.includes(product.id)
        );

        referenceData.value = [...selectedItems, ...newItems];
        // referenceData.value = [...referenceData.value, ...res.data.filter((product) => product.id !== exceptionId)];
    } catch (error) {
        error(error);
    } finally {
        loading.value = false;
    }
};

const onSearchMergePrimeProduct = (query: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        if (query.length >= 3) {
            fetchProducts(
                query,
                primeProducts,
                prime_product_loading,
                0,
                [mergeProductFormData.value.primary_id]
            );
        }
    }, 500);
};

const onSearchMergeOtherProduct = (query: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        if (query.length >= 3) {
            fetchProducts(
                query,
                otherProducts,
                other_product_loading,
                mergeProductFormData.value.primary_id,
                mergeProductFormData.value.secondary_id
            );
        }
    }, 500);
};

const mergeProduct = (data) => {
    if (disableForm.value) return;
    if (!mergeProductFormData.value.primary_id || mergeProductFormData.value.secondary_id.length === 0) {
        toast.error("Please select a primary product and at least one secondary product to merge.");
        return;
    }
    disableForm.value = true;
    axios.post(import.meta.env.VITE_API_URL + 'admin/products/merge', mergeProductFormData.value)
        .then(res => {
            toast.success("Products merged successfully");
            window.location.reload();
        })
        .catch(err => {
            error(err);
        }).finally(() => {
            disableForm.value = false;
        });
}

const uploadBulkProduct = () => {
    if (!bulkProductUploadFormData.value.excel_file || (bulkProductUploadFormData.value.type == 'create' && !bulkProductUploadFormData.value.zip_file)) {
        toast.error('Upload file and zip file are required for creating new products!');
        return;
    }

    disableForm.value = true;

    const data = new FormData();
    data.append('excel_file', bulkProductUploadFormData.value.excel_file);
    data.append('zip_file', bulkProductUploadFormData.value.zip_file)
    data.append('sheet_name', bulkProductUploadFormData.value.sheet_name)
    data.append('type', bulkProductUploadFormData.value.type)

    axios.post(import.meta.env.VITE_API_URL + 'bulk_products_upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(resp => {
            if (isBulkProductUploadModalOpen.value) bulkProductUploadModal.value?.closeModal();
            window.location.reload();
            toast.success("Product " + bulkProductUploadFormData.value.type == 'create' ? 'Created' : 'Updated' + " Successfully",);
        })
        .catch(err => {
            error(err)
        })
        .finally(() => {
            disableForm.value = false;
        })

}

const getProductTypes = () => {
    axios.get(import.meta.env.VITE_API_URL + "product_types").then(response => {
        productTypes.value = response.data;
    })
        .catch(err => toast.error('Error fetching product types'));
}

const getCategories = () => {
    axios.get(import.meta.env.VITE_API_URL + "categories").then(response => {
        categories.value = response.data;
    })
        .catch(err => toast.error('Error fetching categories'));
}

const getManufacturers = () => {
    axios.get(import.meta.env.VITE_API_URL + "manufacturers").then(response => {
        manufacturers.value = response.data;
    })
        .catch(err => toast.error('Error fetching manufacturers'));
}

const getPageTitle = computed(() => {
    return `${title.value} / ${activeTab.value}`;
});

const handleTabChange = (tab, index) => {
    localStorage.setItem('product_tab', tab);
    activeTab.value = tab;
}

const handleDiscardMergeProduct = async () => {
    mergeProductFormData.value = {
        primary_id: null,
        secondary_id: []
    };
    await nextTick();
    resetMergeFromData();
    showDiscardMergeProductModal.value = false;
    if (isMergeProductModalOpen.value) mergeProductModal.value?.closeModal();
}

const handleDiscardBulkProductUpload = async () => {
    bulkProductUploadFormData.value = {
        excel_file: null,
        zip_file: null,
        sheet_name: '',
        type: ''
    };
    await nextTick();
    resetBulkProductUploadFormData();
    showDiscardBulkProductUploadModal.value = false;
    if (isBulkProductUploadModalOpen.value) bulkProductUploadModal.value?.closeModal();
}

const handleDiscardBulkProductTransfer = async () => {
    bulkProductTransferFormData.value = {
        excel_file: null,
        to_branch: null
    };
    await nextTick();
    resetBulkProductTransferFormData()
    showDiscardBulkProductTransferModal.value = false;
    if (bulkProductTransferModal.value) bulkProductTransferModal.value?.closeModal()
}

const onFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
        bulkProductTransferFormData.value.excel_file = null;
        return;
    }
    bulkProductTransferFormData.value.excel_file = files[0];
}

const getTransferTemplate = () => {
    axios.get(import.meta.env.VITE_API_URL + 'pending/products/bulk/transfer/template').then(res => {
        // window.location.href = res.data.path;
        let a = document.createElement('a');
        a.href = res.data.path;
        a.download = "bulk-transfer-product.xlsx";
        a.target = '_blank';
        a.setAttribute('id', 'quick-download-898');
        document.body.appendChild(a);
        setTimeout(() => {
            document.getElementById('quick-download-898').click();
            document.getElementById('quick-download-898').parentElement.removeChild(document.getElementById('quick-download-898'));
        }, 500);
    });
}

const getBranches = () => {
    axios.get(import.meta.env.VITE_API_URL + 'branches?type=all').then(res => {
        branches.value = res.data;
    });
}

const createTransfer = () => {
    if (!bulkProductTransferFormData.value.excel_file) {
        toast.error("Please upload the document before submitting");
    }
    if (!bulkProductTransferFormData.value.to_branch) {
        toast.error("Please select the branch you are uploading too");
    }


    disableForm.value = true;
    const data = new FormData();
    data.append('excel_file', bulkProductTransferFormData.value.excel_file);
    data.append('to_branch', bulkProductTransferFormData.value.to_branch)

    axios({ url: import.meta.env.VITE_API_URL + 'pending/products/bulk/transfer', data: data, method: 'POST' })
        .then(resp => {
            if (isBulkProductTransferModalOpen.value) bulkProductTransferModal.value?.closeModal();
            // bulkProductTransferFormData.value = {
            //     excel_file: null as File | null,
            //     to_branch: null as number | null
            // };
            toast.success("Products transfer request created successfully");
            window.location.reload();
        })
        .catch(err => {
            let errorMessage = '';
            if (err.response.data.error != undefined) {
                const errorMsg = err.response.data.error;
                if (Array.isArray(errorMsg)) {
                    errorMessage = "<p>" + errorMsg.join("</p><p>") + "</p>";
                } else {
                    errorMessage = "<p>" + errorMsg.message + "</p>";
                }
                // console.log(errorMsg.batches);
                errorRows.value.batches = errorMsg.batches;
                if (errorMsg.batches && errorMsg.batches.length > 0) {
                    isBulkProductTransferModalOpen.value = true;
                }
            }
            else {
                errorMessage = "<p>" + err.response.data.error + "</p>";
            }
            toast.error(errorMessage);
        })
        .finally(() => {
            disableForm.value = false;
        })
}

const triggerDiscardMergeWarning = () => {
    showDiscardMergeProductModal.value = true;
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

const triggerBulkTransferExcelFileInput = () => {
    bulkTransferExcelInput.value?.click();
}

const triggerBulkUploadExcelFileInput = () => {
    bulkUploadExcelInput.value?.click();
}

const triggerBulkUploadZipFileInput = () => {
    bulkUploadZipInput.value?.click();
}

const onMergeProductsUpdate = ($event) => {
    mergeProductFormData.value.secondary_id = $event.map(product => product.id)
}

const toggleUpload = () => {
    globalStore.toggleDropdown('productUploadDropDown');
}

const toggleDownload = () => {
    globalStore.toggleDropdown('productUploadDownload');
}

const handleDocumentClick = (event: Event) => {
    globalStore.closeDropdown();
};

</script>

<style>
.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.erp_dashboard_wrapper .create_grn_btn {
    padding: 4px 7px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.25px;

}

.tab_actions {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.tab_actions .grey_field {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
}

.tab_actions button:not(.grey_field) {
    background: rgba(12, 102, 228, 1);
}

.bulk_upload input:not(.vs__search),
.bulk_transfer input:not(.vs__search),
.bulk_transfer select,
.vs__dropdown-toggle,
.bulk_upload select {
    border: 2px solid rgba(9, 30, 66, 0.14);
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.vs__search {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(98, 111, 134, 1);
}

.bulk_upload .upload_file,
.bulk_transfer .upload_file,
.bulk_transfer .upload_zip,
.bulk_upload .upload_zip {
    height: 40px;
    min-height: 32px;
    padding: 0px 12px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_body_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
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

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.bulk_products_transfer_alert {
    background: rgba(204, 224, 255, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border-radius: 8px;
}

.grey_bg {
    background: rgba(247, 248, 249, 1);
}
</style>
