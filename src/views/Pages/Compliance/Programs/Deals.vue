<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Business Programs / Deals" />

        <div class=" min-h-[calc(100vh-190px)]">
            <Datatable :items="mockDeals" :filterByDate="false" :filterFields="filterFields" :columns="columns" pageName="Deals"
                :key="childKey">
                <template v-slot:header_actions>
                    <Button type="blue-btn" :onClick="() => isCreateDealModalOpen = true" classStyle="px-3 py-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>
                        Create Deal
                    </Button>
                </template>

                <template #column="col">
                    <span v-if="col.props.column.field === 'action'">
                        <TableActionDropdown :rowData="col.props.formattedRow">
                            <template #default="{ selectedItem, closeDropdown }">
                                <!-- View Deal Analytics -->
                                <li @click="viewDealAnalytics(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                                    </svg>
                                    View Deal Analytics
                                </li>
                                
                                <!-- Edit -->
                                <li @click="openEditModal(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                                    </svg>
                                    Edit
                                </li>
                                
                                <!-- Delete -->
                                <li @click="openDeleteWarningModal(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                                    </svg>
                                    Delete
                                </li>
                            </template>
                        </TableActionDropdown>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>

        <!-- Delete Deal Confirmation Modal -->
        <DeleteConfirmationModal 
            :show="isDeleteDealWarningModalOpen"
            :message="deleteMessage"
            confirmText="Delete Deal"
            @confirm="handleDeleteConfirm"
            @cancel="isDeleteDealWarningModalOpen = false"
        />

        <!-- Create Deal Modal -->
        <SideBarModal :isOpen="isCreateDealModalOpen" @close="isCreateDealModalOpen = false" title="Create Deal" width="45vw">
            <form @submit.prevent="createDeal" class="space-y-6 p-6">
                    <!-- Deal Details -->
                    <div class="space-y-4">
                        
                        <!-- Title (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input 
                                v-model="dealFromData.title"
                                type="text" 
                                placeholder="Enter a deal title"
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                style="border-color: #091E4224; color: #172B4D !important;"
                                required
                            />
                        </div>

                        <!-- Deal Type and Product (Two Columns) -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Deal Type</label>
                                <SelectField
                                    :modelValue="dealTypeOptions.find(opt => opt.id === dealFromData.type) || null"
                                    :options="dealTypeOptions"
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select deal type"
                                    @update:modelValue="(val: any) => dealFromData.type = val?.id || 0"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Product</label>
                                <SelectField
                                    :modelValue="productOptions.find(opt => opt.id.toString() === dealFromData.product_id) || null"
                                    :options="productOptions"
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select a product"
                                    @update:modelValue="(val: any) => dealFromData.product_id = val?.id?.toString() || ''"
                                />
                            </div>
                        </div>

                        <!-- Product Batch (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Product Batch</label>
                                <SelectField
                                    :modelValue="batchOptions.find(opt => opt.id.toString() === dealFromData.batch_id) || null"
                                    :options="batchOptions"
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select a product batch"
                                    @update:modelValue="(val: any) => dealFromData.batch_id = val?.id?.toString() || ''"
                                />
                        </div>

                        <!-- Description (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea 
                                v-model="dealFromData.description"
                                rows="4"
                                placeholder="Add additional details or notes about the deal, including terms, benefits, and any special conditions."
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
                                style="border-color: #091E4224; color: #172B4D !important;"
                            ></textarea>
                        </div>
                    </div>

                    <!-- Product Quantity -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Product Quantity</h3>
                        
                        <!-- Quantity fields in two columns -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity to Buy</label>
                                <input 
                                    v-model.number="dealFromData.buy"
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                    style="border-color: #091E4224; color: #172B4D !important;"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity to Set Aside for Deal</label>
                                <input 
                                    v-model.number="dealFromData.quantity"
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                    style="border-color: #091E4224; color: #172B4D !important;"
                                    required
                                />
                            </div>
                        </div>

                        <!-- Min Required Quantity (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Min. Required Quantity</label>
                            <input 
                                v-model.number="dealFromData.get"
                                type="number" 
                                min="0"
                                placeholder="0"
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                style="border-color: #091E4224; color: #172B4D !important;"
                                required
                            />
                        </div>

                        <!-- Set Active Checkbox -->
                        <div class="flex items-center">
                            <input 
                                v-model="dealFromData.status"
                                type="checkbox" 
                                id="setActive"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label for="setActive" class="ml-2 text-sm font-medium text-gray-900">Set Active</label>
                        </div>
                    </div>
            </form>

            <template #footer>
                <div class="flex justify-end space-x-3">
                    <Button 
                        type="gray-btn" 
                        :onClick="() => isCreateDealModalOpen = false"
                        classStyle="px-4 py-2"
                        htmlType="button"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="blue-btn" 
                        :onClick="createDeal"
                        :disabled="loading"
                        classStyle="px-4 py-2"
                        htmlType="button"
                    >
                        {{ loading ? 'Creating...' : 'Create' }}
                    </Button>
                </div>
            </template>
        </SideBarModal>

        <!-- Edit Deal Modal -->
        <SideBarModal :isOpen="isEditDealModalOpen" @close="isEditDealModalOpen = false" :title="editingDealId ? `Edit Deal - ${dealFromData.title}` : 'Edit Deal'" width="45vw">
            <form @submit.prevent="updateDeal" class="space-y-6 p-6">
                    <!-- Deal Details -->
                    <div class="space-y-4">
                        <!-- Title (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input 
                                v-model="dealFromData.title"
                                type="text" 
                                placeholder="Enter a deal title"
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                style="border-color: #091E4224; color: #172B4D !important;"
                                required
                            />
                        </div>

                        <!-- Deal Type and Product (Two Columns) -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Deal Type</label>
                                <SelectField
                                    :modelValue="dealTypeOptions.find(opt => opt.id === dealFromData.type) || null"
                                    :options="dealTypeOptions"
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select deal type"
                                    @update:modelValue="(val: any) => dealFromData.type = val?.id || 0"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Product</label>
                                <SelectField
                                    :modelValue="productOptions.find(opt => opt.id.toString() === dealFromData.product_id) || null"
                                    :options="productOptions"
                                    labelField="name"
                                    valueField="id"
                                    placeholder="Select a product"
                                    @update:modelValue="(val: any) => dealFromData.product_id = val?.id?.toString() || ''"
                                />
                            </div>
                        </div>

                        <!-- Product Batch (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Product Batch</label>
                            <SelectField
                                :modelValue="batchOptions.find(opt => opt.id.toString() === dealFromData.batch_id) || null"
                                :options="batchOptions"
                                labelField="name"
                                valueField="id"
                                placeholder="Select a product batch"
                                @update:modelValue="(val: any) => dealFromData.batch_id = val?.id?.toString() || ''"
                            />
                        </div>

                        <!-- Description (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea 
                                v-model="dealFromData.description"
                                rows="4"
                                placeholder="Add additional details or notes about the deal, including terms, benefits, and any special conditions."
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
                                style="border-color: #091E4224; color: #172B4D !important;"
                            ></textarea>
                        </div>
                    </div>

                    <!-- Product Quantity -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Product Quantity</h3>
                        
                        <!-- Quantity fields in two columns -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity to Buy</label>
                                <input 
                                    v-model.number="dealFromData.buy"
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                    style="border-color: #091E4224; color: #172B4D !important;"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Quantity to Set Aside for Deal</label>
                                <input 
                                    v-model.number="dealFromData.quantity"
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                    style="border-color: #091E4224; color: #172B4D !important;"
                                    required
                                />
                            </div>
                        </div>

                        <!-- Min Required Quantity (Full Width) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Min. Required Quantity</label>
                            <input 
                                v-model.number="dealFromData.get"
                                type="number" 
                                min="0"
                                placeholder="0"
                                class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
                                style="border-color: #091E4224; color: #172B4D !important;"
                                required
                            />
                        </div>

                        <!-- Set Active Checkbox -->
                        <div class="flex items-center">
                            <input 
                                v-model="dealFromData.status"
                                type="checkbox" 
                                id="setActiveEdit"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label for="setActiveEdit" class="ml-2 text-sm font-medium text-gray-900">Set Active</label>
                        </div>
                    </div>
            </form>

            <template #footer>
                <div class="flex justify-between">
                    <Button 
                        type="red-btn" 
                        :onClick="() => isDeleteDealWarningModalOpen = true"
                        classStyle=""
                        htmlType="button"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
                        </svg>
                    </Button>
                    <div class="flex space-x-3">
                        <Button 
                            type="gray-btn" 
                            :onClick="() => isEditDealModalOpen = false"
                            classStyle="px-4 py-2"
                            htmlType="button"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="blue-btn" 
                            :onClick="updateDeal"
                            :disabled="loading"
                            classStyle="px-4 py-2"
                            htmlType="button"
                        >
                            {{ loading ? 'Updating...' : 'Update' }}
                        </Button>
                    </div>
                </div>
            </template>
        </SideBarModal>

        <!-- Success Modal -->
        <SuccessModal 
            :show="isSuccessModalOpen" 
            :title="successTitle"
            :message="successMessage"
            @close="isSuccessModalOpen = false" 
        />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import dayjs from 'dayjs'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue'
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue'
import SuccessModal from '@/views/Components/ui/SuccessModal.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import Button from '@/views/Components/ui/Button.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import DateInput from '@/views/Components/ui/DateInput.vue'
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker'
import type { TableColumn, FilterFields, FilterField } from '@/types'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue'

// Mock data for demonstration
const mockDeals = ref([
    {
        id: 87,
        title: "Get 5 packs of AMLONG 5 CAPSULE free",
        description: "Buy 10 get 5 free",
        product: { id: 1, name: "AMLONG 5 (AMLODIPINE) CAPSULE 3 X 10" },
        type_text: "Buy x get x free",
        status: 1,
        qty_set_aside: 12,
        qty_sold: 12,
        created_at: "2024-01-15",
        updated_at: "2024-01-15"
    },
    {
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
    },
    {
        id: 25,
        title: "Get 5 packs of AMLONG 5 CAPSULE free",
        description: "Buy 10 get 5 free",
        product: { id: 1, name: "AMLONG 5 (AMLODIPINE) CAPSULE 3 X 10" },
        type_text: "Buy x get x free",
        status: 1,
        qty_set_aside: 12,
        qty_sold: 12,
        created_at: "2024-01-13",
        updated_at: "2024-01-13"
    },
    {
        id: 30,
        title: "Get 1 pack of IICARE CAPSULE free",
        description: "Buy 2 get 1 free",
        product: { id: 2, name: "IICARE (LUTEIN & BILBERRY EXTRACT) CAPSULE 3 X 10" },
        type_text: "Buy x get x free",
        status: 1,
        qty_set_aside: 12,
        qty_sold: 12,
        created_at: "2024-01-12",
        updated_at: "2024-01-12"
    }
])

// Options for form dropdowns
interface Option {
    id: number;
    name: string;
}

const dealTypeOptions = ref([
    { id: 0, name: 'Select deal type' },
    { id: 1, name: 'Buy X Get X Free' },
    { id: 2, name: 'Buy X Get X Discount' }
])

const productOptions = ref([
    { id: 1, name: 'AMLONG 5 (AMLODIPINE) CAPSULE 3 X 10' },
    { id: 2, name: 'IICARE (LUTEIN & BILBERRY EXTRACT) CAPSULE 3 X 10' }
])

const batchOptions = ref([
    { id: 1, name: 'Batch 001' },
    { id: 2, name: 'Batch 002' }
])

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const loading = ref(false)
const childKey = ref(111)

// Modal states
const isCreateDealModalOpen = ref(false)
const isEditDealModalOpen = ref(false)
const isDeleteDealWarningModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const successMessage = ref('')
const successTitle = ref('')
const editingDealId = ref<number | undefined>(undefined)

// Deal form data
interface DealFormData {
    id?: number;
    title: string;
    description: string;
    type: number;
    buy: number;
    get: number;
    product_id: string;
    batch_id: string;
    start_at: string;
    end_at: string;
    discount: number;
    quantity: number;
    status: boolean;
}

const dealFromData = ref<DealFormData>({
    title: "",
    description: "",
    type: 0,
    buy: 0,
    get: 0,
    product_id: "",
    batch_id: "",
    start_at: "",
    end_at: "",
    discount: 0,
    quantity: 0,
    status: false,
})

const deleteDealFromData = ref<Deal | undefined>(undefined)

// Table configuration
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
        label: 'Qty Set Aside',
        field: 'qty_set_aside',
        sortable: true
    },
    {
        label: 'Qty Sold',
        field: 'qty_sold',
        sortable: true
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false
    },
])

const filterFields = ref<FilterFields<FilterField>>({})


// For now, use mock data instead of API
const url = computed(() => {
    // Return mock data URL or actual API endpoint
    return null // We'll use static data
})

const deleteMessage = computed(() => {
    return `You are about to delete this Deal "${deleteDealFromData.value?.title || ''}"`
})

// Functions
interface Deal {
    id: number;
    title: string;
    description: string;
    product: {
        id: number;
        name: string;
    };
    type_text: string;
    status: number;
    qty_set_aside: number;
    qty_sold: number;
    created_at: string;
    updated_at: string;
}

const viewDealAnalytics = (deal: Deal) => {
    // Navigate to deal analytics page
    router.push(`/compliance/programs/deals/${deal.id}/analytics`)
}

const openEditModal = async (deal: Deal) => {
    console.log('openEditModal called with deal:', deal)
    
    // Find the actual deal from mockDeals using the id
    const actualDeal = mockDeals.value.find(d => d.id === deal.id)
    console.log('Found actual deal:', actualDeal)
    
    // Safety check
    if (!actualDeal) {
        console.error('Could not find deal with id:', deal.id)
        return
    }
    
    // Set editing mode first
    editingDealId.value = actualDeal.id
    
    // Populate form with existing deal data
    dealFromData.value = { 
        id: actualDeal.id,
        title: actualDeal.title,
        description: actualDeal.description,
        type: actualDeal.type_text === "Buy x get x free" ? 1 : 2,
        buy: 0, // Default values since not in mock data
        get: 0,
        product_id: actualDeal.product.id.toString(),
        batch_id: "", // Default since not in mock data
        start_at: dayjs(actualDeal.created_at).format("YYYY-MM-DD"),
        end_at: dayjs(actualDeal.updated_at).format("YYYY-MM-DD"),
        discount: 0,
        quantity: actualDeal.qty_set_aside,
        status: actualDeal.status == 1 ? true : false
    }
    
    await nextTick()
    isEditDealModalOpen.value = true
}

const openDeleteWarningModal = (deal: Deal) => {
    deleteDealFromData.value = deal
    isDeleteDealWarningModalOpen.value = true
}

const handleDeleteConfirm = () => {
    const dealToDelete = deleteDealFromData.value
    if (!dealToDelete) return

    // Close both modals immediately
    isEditDealModalOpen.value = false
    isDeleteDealWarningModalOpen.value = false

    // Simulate API call
    setTimeout(() => {
        const index = mockDeals.value.findIndex(deal => deal.id === dealToDelete.id)
        if (index > -1) {
            mockDeals.value.splice(index, 1)
        }
        
        // Reset data
        deleteDealFromData.value = undefined
        
        // Show success modal
        successTitle.value = "Deal Deleted"
        successMessage.value = `Deal "${dealToDelete.title}" has been successfully deleted.`
        isSuccessModalOpen.value = true
        
        // Refresh table
        childKey.value++
    }, 500)
}

const showSuccess = (message: string) => {
    successTitle.value = "Success"
    successMessage.value = message
    isSuccessModalOpen.value = true
}

const createDeal = () => {
    loading.value = true
    // Simulate API call
    setTimeout(() => {
        const newDeal = {
            id: Math.max(...mockDeals.value.map(d => d.id)) + 1,
            title: dealFromData.value.title,
            description: dealFromData.value.description,
            product: { 
                id: parseInt(dealFromData.value.product_id), 
                name: dealFromData.value.product_id === '1' 
                    ? "AMLONG 5 (AMLODIPINE) CAPSULE 3 X 10" 
                    : "IICARE (LUTEIN & BILBERRY EXTRACT) CAPSULE 3 X 10"
            },
            type_text: dealFromData.value.type === 1 ? "Buy x get x free" : "Buy x get x discount",
            status: dealFromData.value.status ? 1 : 0,
            qty_set_aside: dealFromData.value.quantity,
            qty_sold: 0,
            created_at: dayjs().format("YYYY-MM-DD"),
            updated_at: dayjs().format("YYYY-MM-DD")
        }
        
        mockDeals.value.unshift(newDeal)
        
        // Show success modal with bolded deal title BEFORE resetting form
        successMessage.value = `The deal "${dealFromData.value.title}" has been successfully added to the system.`
        isSuccessModalOpen.value = true
        
        isCreateDealModalOpen.value = false
        resetDealForm()
        childKey.value++
        loading.value = false
    }, 1000)
}

const updateDeal = () => {
    loading.value = true
    // Simulate API call
    setTimeout(() => {
        const index = mockDeals.value.findIndex(deal => deal.id === editingDealId.value)
        if (index > -1) {
            mockDeals.value[index] = {
                ...mockDeals.value[index],
                title: dealFromData.value.title,
                description: dealFromData.value.description,
                product: { 
                    id: parseInt(dealFromData.value.product_id), 
                    name: dealFromData.value.product_id === '1' 
                        ? "AMLONG 5 (AMLODIPINE) CAPSULE 3 X 10" 
                        : "IICARE (LUTEIN & BILBERRY EXTRACT) CAPSULE 3 X 10"
                },
                type_text: dealFromData.value.type === 1 ? "Buy x get x free" : "Buy x get x discount",
                status: dealFromData.value.status ? 1 : 0,
                qty_set_aside: dealFromData.value.quantity,
                updated_at: dayjs().format("YYYY-MM-DD")
            }
        }
        
        // Show success modal with bolded deal title BEFORE resetting form
        successMessage.value = `The deal "${dealFromData.value.title}" has been successfully updated.`
        isSuccessModalOpen.value = true
        
        isEditDealModalOpen.value = false
        resetDealForm()
        editingDealId.value = undefined
        childKey.value++
        loading.value = false
    }, 1000)
}

const resetDealForm = () => {
    dealFromData.value = {
        title: "",
        description: "",
        type: 0,
        buy: 0,
        get: 0,
        product_id: "",
        batch_id: "",
        start_at: "",
        end_at: "",
        discount: 0,
        quantity: 0,
        status: false,
    }
    editingDealId.value = undefined
}

interface ErrorResponse {
    response?: {
        data?: {
            error?: string | string[];
            message?: string;
        };
    };
}

const error = (err: ErrorResponse) => {
    let errorMessage = ''
    if (Array.isArray(err.response?.data?.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>"
    } else {
        errorMessage = err.response?.data?.error !== undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + (err.response?.data?.message || "Unknown error") + "</p>"
    }
    toast.error(errorMessage)
}
</script>
