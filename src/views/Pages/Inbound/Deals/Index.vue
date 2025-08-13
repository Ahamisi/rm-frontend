<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="More Actions / Deals" />
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <div class=" min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="false" :filterFields="filterFields" :columns="columns" pageName="Deals"
                :key="childKey">
                <template v-slot:header_actions>
                    <button @click.prevent="isCreateDealModalOpen = true"
                        class="flex items-center gap-x-1 px-2 py-1.5 rounded text-white create_btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>

                        <span class="text-xs">Create Deal</span>
                    </button>
                </template>

                <template #column="col">
                    <span v-if="col.props.column.field === 'action'">
                        <div class="flex justify-center gap-2">
                            <button @click="openEditModal(col.props.row)" class="p-1 rounded hover:bg-gray-200">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.52026 19.23C4.48715 19.392 4.49472 19.5597 4.5423 19.718C4.58988 19.8764 4.67598 20.0205 4.79289 20.1374C4.90981 20.2543 5.05389 20.3404 5.21224 20.388C5.37059 20.4355 5.53826 20.4431 5.70026 20.41L9.51026 19.63L5.30026 15.42L4.52026 19.23ZM10.4413 16.61L8.32126 14.49L16.8063 6H16.8083L18.9293 8.121L10.4403 16.611L10.4413 16.61ZM20.3443 6.707L18.2243 4.585C18.0384 4.39908 17.8176 4.2517 17.5746 4.15131C17.3316 4.05092 17.0712 3.9995 16.8083 4C16.2963 4 15.7843 4.195 15.3933 4.585L5.63626 14.343L10.5863 19.293L20.3433 9.535C20.7182 9.15995 20.9288 8.65133 20.9288 8.121C20.9288 7.59068 20.7182 7.08206 20.3433 6.707H20.3443Z"
                                        fill="#44546F" />
                                </svg>
                            </button>
                            <button @click="openDeleteWarningModal(col.props.row)"
                                class="p-1 rounded hover:bg-gray-200">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z"
                                        fill="#44546F" />
                                </svg>
                            </button>
                        </div>
                    </span>
                    <span v-else-if="col.props.column.field === 'status'">
                        <!-- <Tooltip :text="`${col.props.row.status}`"> -->
                        <span :class="[
                            'status rounded-md medium-text line-clamp-2 w-fit',
                            statusClasses[col.props.row.status ? 'Active' : 'Inactive'] ||
                            'bg-gray-100 text-gray-800',
                        ]">
                            {{ col.props.row.status ? 'Active' : 'Inactive' }}
                        </span>
                        <!-- </Tooltip> -->
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>

        <!-- discard delete deal modal -->
        <UniversalCenteredModal :show="isDeleteDealWarningModalOpen" @close="isDeleteDealWarningModalOpen = false">
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
                    You are about to delete this deal <strong>“{{ deleteDealFromData.title }}”</strong>. This
                    action will permanently remove it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="isDeleteDealWarningModalOpen = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteDeal" type="button" class="text-white delete_btn">
                        Delete Deal
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- discard delete deal  success modal -->
        <UniversalCenteredModal :show="isDeleteDealSuccessModalOpen" @close="closeDeleteDealSuccessModal">
            <template #body>
                <div class="flex justify-center my-4">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
                            fill="#22A06B" />
                        <path
                            d="M18.7867 28.5635C18.4707 28.2275 18.0349 28.0298 17.5739 28.0134C17.113 27.997 16.6642 28.1632 16.3252 28.476C15.9861 28.7887 15.7843 29.2226 15.7635 29.6834C15.7427 30.1442 15.9047 30.5945 16.2142 30.9365L22.5352 37.7947C23.4749 38.7152 24.8749 38.7152 25.7447 37.8472L26.3817 37.219C28.6821 34.9566 30.9798 32.6915 33.2749 30.4237L33.3449 30.3537C35.4899 28.2399 37.6237 26.1147 39.7464 23.9785C40.0637 23.6463 40.2376 23.2028 40.2307 22.7435C40.2238 22.2842 40.0366 21.8461 39.7096 21.5236C39.3825 21.2011 38.9417 21.0202 38.4824 21.0198C38.0231 21.0194 37.582 21.1996 37.2544 21.5215C35.1416 23.6466 33.0182 25.7612 30.8844 27.8652L30.8144 27.9352C28.6151 30.1093 26.413 32.2804 24.2082 34.4487L18.7867 28.5635Z"
                            fill="white" />
                    </svg>
                </div>
                <h4 class="text-center">Deal Deleted</h4>
                <p class="discard_merge_alert_body_text">
                    The deal <strong>“{{ deleteDealFromData.title }}”</strong> has been successfully deleted from the
                    system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="closeDeleteDealSuccessModal" type="button" class="text-white delete_btn">
                        Delete Deal
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>


        <!-- create deal modal -->
        <SideBarModal title="Create Deal" :is-open="isCreateDealModalOpen" width="xl" :initial-form-data="dealFromData"
            ref="createDealModal" @update:is-open="isCreateDealModalOpen = $event" @close="handleDiscardDeal">

            <!-- Main content -->
            <template #default="{ formData, updateFormData, isEditItem }">
                <div class="space-y-6">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Title</label>
                            <input type="text" v-model="dealFromData.title"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="Enter a deal title">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Deal Type</label>
                            <select v-model="dealFromData.type"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" id="type"
                                required>
                                <option value="" disabled>Choose a Deal Type</option>
                                <option v-for="type, id in types" :value="id" :key="`type-${id}`">{{ type }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Start Date</label>
                            <input type="date" v-model="dealFromData.start_at"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Edn Date</label>
                            <input type="date" v-model="dealFromData.end_at"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Product</label>
                            <v-select :options="products" label="name" v-model="dealFromData.product_id"
                                :reduce="product => product.id" @option:selected="setSubproduct"
                                @search="searchProducts" placeholder="Select a product">
                                <template slot="no-options">
                                    Type to search products..
                                </template>
                            </v-select>
                            <p v-if="subproduct" class="mb-2 text-gray-700">
                                Stock Count: {{ subproduct.quantity }} &nbsp;/&nbsp; Expires: {{
                                    subproduct.expiry_date_form }}
                            </p>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Product Batch</label>
                            <v-select :options="subproducts" label="batch_no" v-model="dealFromData.sub_product_id"
                                :reduce="subp => subp.id" placeholder="Select a product batch"></v-select>
                        </div>
                        <div class="md:col-span-2">
                            <label>Description</label>
                            <textarea v-model="dealFromData.description" type="text"
                                placeholder="Add additional details or notes about the deal, including terms, benefits, and any special conditions."
                                required
                                class="w-full h-40 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"></textarea>
                        </div>
                    </div>

                    <h6 style="margin: 16px 0;">Product Quantity</h6>
                    <hr style="margin: 0;">

                    <div style="margin-top: 16px">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to Buy</label>
                        <input type="text" v-model="dealFromData.buy"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div v-show="dealFromData.type == 1">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to Get</label>
                        <input type="text" v-model="dealFromData.get"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div v-show="dealFromData.type == 2">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Discount to Get (in %)</label>
                        <input type="text" v-model="dealFromData.discount"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to set aside for
                                deal</label>
                            <input type="text" v-model="dealFromData.quantity"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Minimum required
                                quantity</label>
                            <input type="text" :value="minQuantity" readonly
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="">
                        </div>

                    </div>


                    <div class="flex items-center gap-2">
                        <input id="status" type="checkbox" v-model="dealFromData.status"
                            class="border border-gray-300 rounded-md focus:outline-none">
                        <label style="margin-bottom: 0;" class="text-xs font-medium text-gray-700" for="status">Set
                            Active</label>
                    </div>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="handleShowCreateDealDiscardModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="createDeal" type="button" class="approve_btn">
                        Create
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- discard create deal warning Modal -->
        <UniversalCenteredModal :show="showDiscardCreateDealModal" @close="showDiscardCreateDealModal = false">
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
                    You are about to leave the <strong>"Create Deal"</strong> process. Any unsaved information will be
                    lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardCreateDealModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardDeal" type="button" class="discard_btn">
                        Discard Changes
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- edit deal modal -->
        <SideBarModal title="Edit Deal" :is-open="isEditDealModalOpen" width="xl" :initial-form-data="dealFromData"
            ref="editDealModal" @update:is-open="isEditDealModalOpen = $event" @close="handleDiscardDeal"
            :extraHeader="getExtraHeader">

            <!-- Main content -->
            <template #default="{ formData, updateFormData, isEditItem }">
                <div class="space-y-6">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Title</label>
                            <input type="text" v-model="dealFromData.title"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="Enter a deal title">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Deal Type</label>
                            <select v-model="dealFromData.type"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" id="type"
                                required>
                                <option value="" disabled>Choose a Deal Type</option>
                                <option v-for="type, id in types" :value="id" :key="`type-${id}`">{{ type }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Start Date</label>
                            <input type="date" v-model="dealFromData.start_at"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Edn Date</label>
                            <input type="date" v-model="dealFromData.end_at"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Product</label>
                            <v-select :options="products" label="name" v-model="dealFromData.product_id"
                                :reduce="product => product.id" @option:selected="setSubproduct"
                                @search="searchProducts" placeholder="Select a product">
                                <template slot="no-options">
                                    Type to search products..
                                </template>
                            </v-select>
                            <p v-if="subproduct" class="mb-2 text-gray-700">
                                Stock Count: {{ subproduct.quantity }} &nbsp;/&nbsp; Expires: {{
                                    subproduct.expiry_date_form }}
                            </p>
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Product Batch</label>
                            <v-select :options="subproducts" label="batch_no" v-model="dealFromData.sub_product_id"
                                :reduce="subp => subp.id" placeholder="Select a product batch"></v-select>
                        </div>
                        <div class="md:col-span-2">
                            <label>Description</label>
                            <textarea v-model="dealFromData.description" type="text"
                                placeholder="Add additional details or notes about the deal, including terms, benefits, and any special conditions."
                                required
                                class="w-full h-40 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"></textarea>
                        </div>
                    </div>

                    <h6 style="margin: 16px 0;">Product Quantity</h6>
                    <hr style="margin: 0;">

                    <div style="margin-top: 16px">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to Buy</label>
                        <input type="text" v-model="dealFromData.buy"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div v-show="dealFromData.type == 1">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to Get</label>
                        <input type="text" v-model="dealFromData.get"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div v-show="dealFromData.type == 2">
                        <label class="block mb-1 text-xs font-medium text-gray-700">Discount to Get (in %)</label>
                        <input type="text" v-model="dealFromData.discount"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Quantity to set aside for
                                deal</label>
                            <input type="text" v-model="dealFromData.quantity"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="">
                        </div>
                        <div>
                            <label class="block mb-1 text-xs font-medium text-gray-700">Minimum required
                                quantity</label>
                            <input type="text" :value="minQuantity" readonly
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="">
                        </div>

                    </div>

                    <div class="flex items-center gap-2">
                        <input id="status" type="checkbox" v-model="dealFromData.status"
                            class="border border-gray-300 rounded-md focus:outline-none">
                        <label style="margin-bottom: 0;" class="text-xs font-medium text-gray-700" for="status">Set
                            Active</label>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="handleShowUpdateDealDiscardModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="updateDeal" type="button" class="approve_btn">
                        Update
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- discard edit deal warning Modal -->
        <UniversalCenteredModal :show="showDiscardEditDealModal" @close="showDiscardEditDealModal = false">
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
                    You are about to leave the <strong>"Edit Deal"</strong> process. Any unsaved information will be
                    lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardEditDealModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardDeal" type="button" class="discard_btn">
                        Discard Changes
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

    </div>

</template>

<script setup lang="ts">
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import { ref, onMounted, computed, nextTick } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import dayjs from 'dayjs'
import { FilterField, FilterFields, TableColumn } from "@/types";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import Tooltip from '@/views/Components/procurement/ui/Tooltip.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';


const product = computed(() => {
    let product = products.value.filter(product => product.id == dealFromData.value.product_id);
    if (product[0] != undefined) return product[0];
    return false;
});

const showToast = ref(false)
const toastMessage = ref("")

const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}

const subproduct = computed(() => {
    let subproduct = subproducts.value.filter(sproduct => sproduct.id == dealFromData.value.sub_product_id);
    if (subproduct[0] != undefined) return subproduct[0];
    return false;
});

const minQuantity = computed(() => {
    if (dealFromData.value.buy == 0) return 0;
    return parseInt(dealFromData.value.quantity) + parseInt(Math.round((dealFromData.value.quantity / dealFromData.value.buy) * dealFromData.value.get));
})

const authStore = useAuthStore();
const types = ref({ 1: 'Buy X Get X Free', 2: 'Buy X Get X Discount' })
const products = ref([]);
const subproducts = ref([]);
const childKey = ref(111);
const url = computed(() => import.meta.env.VITE_API_URL + `deals?current_branch=${authStore.selectedBranch.id}`);
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Title',
        field: 'title',
        sortable: true
    },
    {
        label: 'Description',
        field: 'description',
        sortable: false
    },
    {
        label: 'Product',
        field: 'product.name',
        sortable: true
    },
    {
        label: 'Type',
        field: 'type_text',
        sortable: false
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false
    },

])

const filterFields = ref<FilterFields<FilterField>>({
    "status": {
        label: "Status",
        field: "status",
        type: "select",
        options: [
            { name: "All", id: "" },
            { name: "Active", id: 1 },
            { name: "Inactive", id: 0 },
        ]
    },
})

const toast = useToast();
const loading = ref(false);
const createDealModal = ref(null);
const editDealModal = ref(null);
const showDiscardEditDealModal = ref(false);
const isCreateDealModalOpen = ref(false);
const isEditDealModalOpen = ref(false);
const isDeleteDealWarningModalOpen = ref(false);
const isDeleteDealSuccessModalOpen = ref(false);
const showDiscardCreateDealModal = ref(false);

const dealFromData = ref({
    title: "",
    description: "",
    type: 0,
    buy: 0,
    get: 0,
    sub_product_id: "",
    product_id: "",
    start_at: "",
    end_at: "",
    discount: 0,
    quantity: 0,
    status: false,
});

const { hasChanged, reset } = useDataChangeTracker(dealFromData);

const deleteDealFromData = ref(null);

const statusClasses = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
};

const handleShowCreateDealDiscardModal = () => {
    if (hasChanged.value) {
        showDiscardCreateDealModal.value = true;
    } else {
        showDiscardCreateDealModal.value = false;
        createDealModal.value?.closeModal();
    }
}

const handleShowUpdateDealDiscardModal = () => {
    if (hasChanged.value) {
        showDiscardEditDealModal.value = true;
    } else {
        showDiscardEditDealModal.value = false;
        editDealModal.value?.closeModal();
    }
}

const openEditModal = async (deal) => {
    dealFromData.value = { ...deal, ...{ status: deal.status == 1 ? true : false, product_id: deal.product.id, start_at: dayjs(deal.start_at).format("YYYY-MM-DD"), end_at: dayjs(deal.end_at).format("YYYY-MM-DD") } };
    await nextTick();
    reset();
    isEditDealModalOpen.value = true;
    products.value.push(deal.product);
    setSubproduct(deal.product);
}

const openDeleteWarningModal = (deal) => {
    deleteDealFromData.value = deal;
    isDeleteDealWarningModalOpen.value = true;
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

const deleteDeal = () => {
    if (deleteDealFromData.value?.id) {
        toast.error('Please select a deal to delete');
        return;
    }
    isDeleteDealWarningModalOpen.value = false;
    loading.value = true;
    axios.delete(import.meta.env.VITE_API_URL + `deals/${deleteDealFromData.value?.id}`)
        .then((response) => {
            isDeleteDealSuccessModalOpen.value = true;
        })
        .catch((err) => {
            error(err)
        })
        .finally(() => loading.value = false);
}

const closeDeleteDealSuccessModal = () => {
    childKey.value++;
    isDeleteDealSuccessModalOpen.value = false;
    dealFromData.value = {
        title: "",
        description: "",
        type: 0,
        buy: 0,
        get: 0,
        sub_product_id: "",
        product_id: "",
        start_at: "",
        end_at: "",
        discount: 0,
        quantity: 0,
        status: false,
    };
}

const handleDiscardDeal = () => {
    showDiscardEditDealModal.value = false;
    showDiscardCreateDealModal.value = false;

    dealFromData.value = {
        title: "",
        description: "",
        type: 0,
        buy: 0,
        get: 0,
        sub_product_id: "",
        product_id: "",
        start_at: "",
        end_at: "",
        discount: 0,
        quantity: 0,
        status: false,
    };
    if (isEditDealModalOpen.value) editDealModal.value?.closeModal();
    if (isCreateDealModalOpen.value) createDealModal.value?.closeModal();
}

const getExtraHeader = computed(() => {
    return `<span class="flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.91536 1.66669C2.69435 1.66669 2.48239 1.75448 2.32611 1.91076C2.16983 2.06704 2.08203 2.27901 2.08203 2.50002V8.33335L3.54036 7.50002L4.9987 8.33335L6.45703 7.50002L7.91536 8.33335V2.50002C7.91536 2.27901 7.82757 2.06704 7.67129 1.91076C7.51501 1.75448 7.30304 1.66669 7.08203 1.66669H2.91536ZM3.95703 2.91669C3.79127 2.91669 3.6323 2.98253 3.51509 3.09975C3.39788 3.21696 3.33203 3.37593 3.33203 3.54169C3.33203 3.70745 3.39788 3.86642 3.51509 3.98363C3.6323 4.10084 3.79127 4.16669 3.95703 4.16669C4.12279 4.16669 4.28176 4.10084 4.39897 3.98363C4.51618 3.86642 4.58203 3.70745 4.58203 3.54169C4.58203 3.37593 4.51618 3.21696 4.39897 3.09975C4.28176 2.98253 4.12279 2.91669 3.95703 2.91669ZM6.54328 3.03877C6.46514 2.96066 6.35918 2.91678 6.2487 2.91678C6.13821 2.91678 6.03225 2.96066 5.95411 3.03877L3.45411 5.53877C3.41432 5.57721 3.38258 5.62318 3.36074 5.67402C3.3389 5.72485 3.32741 5.77953 3.32693 5.83485C3.32645 5.89018 3.33699 5.94504 3.35794 5.99625C3.37889 6.04746 3.40983 6.09398 3.44895 6.1331C3.48807 6.17222 3.53459 6.20316 3.5858 6.22411C3.63701 6.24506 3.69187 6.25561 3.7472 6.25512C3.80252 6.25464 3.8572 6.24315 3.90803 6.22131C3.95887 6.19948 4.00484 6.16773 4.04328 6.12794L6.54328 3.62794C6.62139 3.5498 6.66528 3.44384 6.66528 3.33335C6.66528 3.22287 6.62139 3.11691 6.54328 3.03877ZM6.04036 5.00002C5.8746 5.00002 5.71563 5.06587 5.59842 5.18308C5.48121 5.30029 5.41536 5.45926 5.41536 5.62502C5.41536 5.79078 5.48121 5.94975 5.59842 6.06696C5.71563 6.18417 5.8746 6.25002 6.04036 6.25002C6.20612 6.25002 6.3651 6.18417 6.48231 6.06696C6.59952 5.94975 6.66536 5.79078 6.66536 5.62502C6.66536 5.45926 6.59952 5.30029 6.48231 5.18308C6.3651 5.06587 6.20612 5.00002 6.04036 5.00002Z" fill="#44546F"/>
                </svg>
                <span class="text-xs font-semibold text-gray-600 uppercase return_ref">${dealFromData.value?.title}</span>
            </span>`;
})


const createDeal = () => {
    loading.value = true;
    if (dealFromData.value.type == 1) {
        dealFromData.value.discount = null;
    } else {
        dealFromData.value.get = null;
    }
    axios.post(import.meta.env.VITE_API_URL + 'deals?current_branch=' + authStore.selectedBranch.id, dealFromData.value)
        .then(res => {
            showSuccess("Deal created successfully");
            childKey.value++;
            dealFromData.value = {
                title: "",
                description: "",
                type: 0,
                buy: 0,
                get: 0,
                sub_product_id: "",
                product_id: "",
                start_at: "",
                end_at: "",
                discount: 0,
                quantity: 0,
                status: false,
            }
            handleDiscardDeal()
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const updateDeal = () => {
    loading.value = true;
    if (dealFromData.value.type == 1) {
        dealFromData.value.discount = null;
    } else {
        dealFromData.value.get = null;
    }
    axios.put(import.meta.env.VITE_API_URL + `deals/${dealFromData.value.id}?current_branch=${authStore.selectedBranch.id}`, dealFromData.value)
        .then(res => {
            showSuccess('Deal updated successfully')
            handleDiscardDeal()
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const setSubproduct = (product) => {
    if (product == null) return;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${product.id}/subproducts`).then((res) => {
        subproducts.value = res.data;
    }).catch(err => {
        error(err);
    })
}

const searchProducts = (search, loading) => {
    if (search == '' || search.length < 3) return;
    if (loading != undefined) loading(true)
    axios.get(import.meta.env.VITE_API_URL + `search_products_typeahead?q=${search}&fields=id,name,price_per_pack,stock_count,quantity_available`).then(res => {
        products.value = res.data;
    }).catch(err => {
        toast.error("Error loading products!");
    }).finally(() => {
        if (loading != undefined) loading(false)
    });
}
</script>

<style>
.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .approve_btn {
    background: rgba(12, 102, 228, 1);
}

.discard_merge_alert_footer .delete_btn {
    background: rgb(228, 12, 12);
    color: white;
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

.discard_merge_alert_footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.status {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    padding: 4px;
    border-radius: 3px;
}
</style>
