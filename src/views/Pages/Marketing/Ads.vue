<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Ads" class="px-6" />
    
   

    <!-- Contents -->
    <div class="px-6 py-6">
      <Datatable
        v-if="activeTab === 'Ads'"
        :items="ads"
        :columns="adColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="Ads"
      >
        <template #header_actions>
          <Button type="blue-btn" @click="createAd">
            <div class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
              </svg>
              <span>Create Ad</span>
            </div>
          </Button>
        </template>

        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <div class="flex items-center gap-2">
              <button 
                @click="editAd(col.props?.formattedRow)"
                class="text-gray-500 hover:text-blue-600"
                title="Edit Ad"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="currentColor"/>
                </svg>
              </button>
              <button 
                @click="deleteAd(col.props?.formattedRow)"
                class="text-gray-500 hover:text-red-600"
                title="Delete Ad"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>

      <!-- All Customers Tab -->
      <div v-else-if="activeTab === 'All Customers'">
        <div class="flex items-center justify-center h-64">
          <button 
            @click="navigateToAllCustomers"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to All Customers Page
          </button>
        </div>
      </div>
    </div>

    <!-- Create Ad Modal -->
    <SideBarModal
      :isOpen="showCreateAdModal"
      width="small"
      @close="handleCloseCreateAd"
    >
      <template #header>
        <SideBarHead title="Create Ad" />
      </template>

      <template #default="{ closeModal }">
        <div class="px-6 py-4 space-y-6">
          <!-- Upload Ad Image -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Upload Ad Image</label>
            <div
              @drop="handleDrop"
              @dragover.prevent
              @dragenter="isDragging = true"
              @dragleave="isDragging = false"
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              :class="{ 'border-blue-500 bg-blue-50': isDragging }"
              @click="triggerFileInput"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="handleFileSelect"
              />
              <div v-if="!adImage" class="flex flex-col items-center">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1775 12.6208L12.5802 15.2384C12.3284 15.4921 12.1871 15.835 12.1871 16.1924C12.1871 16.5499 12.3284 16.8928 12.5802 17.1465C12.7039 17.2716 12.8512 17.371 13.0136 17.4388C13.176 17.5066 13.3502 17.5416 13.5261 17.5416C13.7021 17.5416 13.8763 17.5066 14.0387 17.4388C14.201 17.371 14.3483 17.2716 14.472 17.1465L16.2189 15.3847L18.0281 17.2088C18.1517 17.334 18.2989 17.4335 18.4612 17.5014C18.6235 17.5694 18.7977 17.6044 18.9737 17.6045C19.1496 17.6047 19.3239 17.5699 19.4863 17.5022C19.6487 17.4344 19.7961 17.3352 19.9198 17.2101C20.1708 16.9563 20.3116 16.6139 20.3118 16.257C20.3121 15.9002 20.1717 15.5576 19.9212 15.3034L17.2603 12.6222C17.1243 12.4841 16.9622 12.3745 16.7835 12.2996C16.6048 12.2247 16.413 12.186 16.2192 12.1859C16.0254 12.1858 15.8335 12.2242 15.6547 12.2988C15.4759 12.3735 15.3137 12.4829 15.1775 12.6208Z" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8959 13.5511L14.8972 27.0739C14.8972 27.8281 15.5039 28.4389 16.2514 28.4375C17.0003 28.4375 17.6056 27.8281 17.6056 27.0739L17.6042 13.5498C17.6042 12.7982 16.9975 12.1875 16.25 12.1875C15.5025 12.1875 14.8945 12.7982 14.8959 13.5511Z" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7494 7.42219C10.4016 7.36527 10.0497 7.33674 9.69723 7.33688C5.89879 7.33823 2.70837 10.3187 2.70837 14.2174C2.70837 18.1567 5.93806 21.6667 9.61462 21.6667H13.516V18.9678H9.61462C7.37077 18.9678 5.39639 16.7158 5.39639 14.2174C5.39639 11.8097 7.38567 10.0371 9.59973 10.0371H9.61598C10.1427 10.0371 10.5449 10.1061 10.9295 10.2402L11.1597 10.3255C11.979 10.6614 12.3446 9.9924 12.3446 9.9924L12.5477 9.63083C13.5363 7.80677 15.5283 6.7925 17.5798 6.76135C18.9408 6.7749 20.2503 7.28305 21.2641 8.19101C22.278 9.09897 22.927 10.3447 23.0899 11.6959L23.1522 12.1564C23.1522 12.1564 23.2484 12.8673 24.0527 12.8673C24.0704 12.8673 24.069 12.8741 24.0839 12.8741H24.4279C25.9662 12.8741 27.1037 14.1727 27.1037 15.7964C27.1037 17.4308 25.7671 18.9678 24.3006 18.9678H18.9326V21.6667H24.3006C27.2256 21.6667 29.7917 18.8974 29.7917 15.7964C29.7917 13.0894 28.015 10.836 25.5423 10.2795C24.5849 6.61375 21.4081 4.11531 17.5717 4.0625C14.8972 4.09094 12.2891 5.2826 10.7494 7.42219Z" fill="#44546F"/>
                </svg>
                <p class="text-sm text-gray-600 mb-2">
                  or <span class="text-blue-600 cursor-pointer hover:underline">browse</span>
                </p>
                <p class="text-xs text-gray-500">Drag and drop your image here, Supports: JPG, PNG (max 5mb)</p>
              </div>
              <div v-else class="flex flex-col items-center">
                <img :src="adImage" alt="Ad Image" class="max-h-48 mb-2 rounded" />
                <button
                  @click.stop="removeImage"
                  class="text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            </div>
          </div>

          <!-- Title -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="createAdForm.title"
              type="text"
              placeholder="Enter a title for your ad"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Type -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Type</label>
            <SelectField
              v-model="createAdForm.type"
              :options="adTypeOptions"
              placeholder="Choose ad type"
            />
          </div>

          <!-- Start Date and End Date in same row -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Start Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
              <DateInput
                v-model="createAdForm.startDate"
                placeholder="dd/mm/yy"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">End Date</label>
              <DateInput
                v-model="createAdForm.endDate"
                placeholder="dd/mm/yy"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" @click="handleCancelCreateAd(closeModal)">Cancel</Button>
          <Button type="blue-btn" @click="handleCreateAd(closeModal)">Create</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Ad Modal -->
    <SideBarModal
      :isOpen="showEditAdModal"
      width="small"
      @close="handleCloseEditAd"
    >
      <template #header>
        <SideBarHead :title="'Edit Ad'" :subtitle="selectedAd?.title" />
      </template>

      <template #default="{ closeModal }">
        <div class="px-6 py-4 space-y-6">
          <!-- Upload Ad Image -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Upload Ad Image</label>
            <div
              @drop="handleEditDrop"
              @dragover.prevent
              @dragenter="isEditDragging = true"
              @dragleave="isEditDragging = false"
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              :class="{ 'border-blue-500 bg-blue-50': isEditDragging }"
              @click="triggerEditFileInput"
            >
              <input
                ref="editFileInput"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="handleEditFileSelect"
              />
              <div v-if="!editAdImage" class="flex flex-col items-center">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1775 12.6208L12.5802 15.2384C12.3284 15.4921 12.1871 15.835 12.1871 16.1924C12.1871 16.5499 12.3284 16.8928 12.5802 17.1465C12.7039 17.2716 12.8512 17.371 13.0136 17.4388C13.176 17.5066 13.3502 17.5416 13.5261 17.5416C13.7021 17.5416 13.8763 17.5066 14.0387 17.4388C14.201 17.371 14.3483 17.2716 14.472 17.1465L16.2189 15.3847L18.0281 17.2088C18.1517 17.334 18.2989 17.4335 18.4612 17.5014C18.6235 17.5694 18.7977 17.6044 18.9737 17.6045C19.1496 17.6047 19.3239 17.5699 19.4863 17.5022C19.6487 17.4344 19.7961 17.3352 19.9198 17.2101C20.1708 16.9563 20.3116 16.6139 20.3118 16.257C20.3121 15.9002 20.1717 15.5576 19.9212 15.3034L17.2603 12.6222C17.1243 12.4841 16.9622 12.3745 16.7835 12.2996C16.6048 12.2247 16.413 12.186 16.2192 12.1859C16.0254 12.1858 15.8335 12.2242 15.6547 12.2988C15.4759 12.3735 15.3137 12.4829 15.1775 12.6208Z" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8959 13.5511L14.8972 27.0739C14.8972 27.8281 15.5039 28.4389 16.2514 28.4375C17.0003 28.4375 17.6056 27.8281 17.6056 27.0739L17.6042 13.5498C17.6042 12.7982 16.9975 12.1875 16.25 12.1875C15.5025 12.1875 14.8945 12.7982 14.8959 13.5511Z" fill="#44546F"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7494 7.42219C10.4016 7.36527 10.0497 7.33674 9.69723 7.33688C5.89879 7.33823 2.70837 10.3187 2.70837 14.2174C2.70837 18.1567 5.93806 21.6667 9.61462 21.6667H13.516V18.9678H9.61462C7.37077 18.9678 5.39639 16.7158 5.39639 14.2174C5.39639 11.8097 7.38567 10.0371 9.59973 10.0371H9.61598C10.1427 10.0371 10.5449 10.1061 10.9295 10.2402L11.1597 10.3255C11.979 10.6614 12.3446 9.9924 12.3446 9.9924L12.5477 9.63083C13.5363 7.80677 15.5283 6.7925 17.5798 6.76135C18.9408 6.7749 20.2503 7.28305 21.2641 8.19101C22.278 9.09897 22.927 10.3447 23.0899 11.6959L23.1522 12.1564C23.1522 12.1564 23.2484 12.8673 24.0527 12.8673C24.0704 12.8673 24.069 12.8741 24.0839 12.8741H24.4279C25.9662 12.8741 27.1037 14.1727 27.1037 15.7964C27.1037 17.4308 25.7671 18.9678 24.3006 18.9678H18.9326V21.6667H24.3006C27.2256 21.6667 29.7917 18.8974 29.7917 15.7964C29.7917 13.0894 28.015 10.836 25.5423 10.2795C24.5849 6.61375 21.4081 4.11531 17.5717 4.0625C14.8972 4.09094 12.2891 5.2826 10.7494 7.42219Z" fill="#44546F"/>
                </svg>
                <p class="text-sm text-gray-600 mb-2">
                  or <span class="text-blue-600 cursor-pointer hover:underline">browse</span>
                </p>
                <p class="text-xs text-gray-500">Drag and drop your image here, Supports: JPG, PNG (max 5mb)</p>
              </div>
              <div v-else class="flex flex-col items-center">
                <img :src="editAdImage" alt="Ad Image" class="max-h-48 mb-2 rounded" />
                <button
                  @click.stop="removeEditImage"
                  class="text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            </div>
          </div>

          <!-- Title -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="editAdForm.title"
              type="text"
              placeholder="Enter a title for your ad"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Type -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Type</label>
            <SelectField
              v-model="editAdForm.type"
              :options="adTypeOptions"
              placeholder="Choose ad type"
            />
          </div>

          <!-- Campaign Type -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Campaign Type</label>
            <SelectField
              v-model="editAdForm.campaignType"
              :options="campaignTypeOptions"
              placeholder="Choose campaign type"
            />
          </div>

          <!-- Start Date and End Date in same row -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Start Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
              <DateInput
                v-model="editAdForm.startDate"
                placeholder="dd/mm/yy"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">End Date</label>
              <DateInput
                v-model="editAdForm.endDate"
                placeholder="dd/mm/yy"
              />
            </div>
          </div>

          <!-- Product(s) -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Product(s)</label>
            <CustomMultiSelect
              v-model="editAdForm.products"
              :options="productOptions"
              placeholder="Select product(s)"
              label-field="name"
            />
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex items-center justify-between w-full">
          <button 
            @click="deleteAdFromEdit"
            class="flex items-center gap-2 p-2 rounded bg-[#C9372C] text-white"
            title="Delete Ad"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#fff"/>
            </svg>
          </button>
          <div class="flex gap-3">
            <Button type="gray-btn" @click="handleCancelEditAd(closeModal)">Cancel</Button>
            <Button type="blue-btn" @click="handleUpdateAd(closeModal)">Update</Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteModalMessage"
      confirm-text="Delete Ad"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="successModalTitle"
      :message="successModalMessage"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SideBarHead from "@/views/Components/ui/SideBarHead.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import DateInput from "@/views/Components/ui/DateInput.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import CustomMultiSelect from "@/views/Components/CustomMultiSelect.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumn, Option } from '@/types';

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Tabs
const tabs = ref(['Ads', 'All Customers']);
const activeTab = ref('Ads');

// Create Ad Modal State
const showCreateAdModal = ref(false);
const showSuccessModal = ref(false);
const successModalTitle = ref('');
const successModalMessage = ref('');
const adImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

// Edit Ad Modal State
const showEditAdModal = ref(false);
const showDeleteModal = ref(false);
const selectedAd = ref<any>(null);
const editAdImage = ref<string | null>(null);
const editFileInput = ref<HTMLInputElement | null>(null);
const isEditDragging = ref(false);
const deleteModalMessage = ref('');

// Create Ad Form
const createAdForm = ref({
  title: '',
  type: null as Option | null,
  startDate: '',
  endDate: ''
});

// Ad Type Options
const adTypeOptions: Option[] = [
  { id: 1, name: 'Campaign' },
  { id: 2, name: 'Deal' }
];

// Campaign Type Options
const campaignTypeOptions: Option[] = [
  { id: 1, name: 'Product' },
  { id: 2, name: 'Category' },
  { id: 3, name: 'Brand' },
  { id: 4, name: 'N/A' }
];

// Product Options (mock data)
const productOptions: Option[] = [
  { id: 1, name: 'KESSINGTON KESARTEM TABLET 80/480X6' },
  { id: 2, name: 'ACIPRO (CIPROFLOXACIN) TABLET X 10' },
  { id: 3, name: 'PARACETAMOL TABLET 500MG' },
  { id: 4, name: 'AMOXICILLIN CAPSULE 250MG' },
  { id: 5, name: 'IBUPROFEN TABLET 400MG' }
];

// Edit Ad Form
const editAdForm = ref({
  title: '',
  type: null as Option | null,
  campaignType: null as Option | null,
  startDate: '',
  endDate: '',
  products: [] as Option[]
});

// Column definitions for Ads
const adColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Title', field: 'title', sortable: true },
  { label: 'Ad Type', field: 'ad_type', sortable: true },
  { label: 'Campaign Type', field: 'campaign_type', sortable: true },
  { label: 'Start Date', field: 'start_date', sortable: true },
  { label: 'End Date', field: 'end_date', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for Ads
const ads = ref([
  { id: 87, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Product', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 54, title: 'World Health Week', ad_type: 'Campaign', campaign_type: 'Product', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 25, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Product', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 30, title: 'World Health Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 51, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Category', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 21, title: 'World Health Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 35, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Category', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 23, title: 'Polio Awareness Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 33, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Category', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 87, title: 'World Health Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 88, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Brand', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 81, title: 'Polio Awareness Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 80, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Brand', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 5, title: 'Polio Awareness Week', ad_type: 'Deal', campaign_type: 'N/A', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' },
  { id: 55, title: 'Workers Day Campaign', ad_type: 'Campaign', campaign_type: 'Brand', start_date: '16/01/2025', end_date: '16/01/2025', date_created: '16/01/2025' }
]);

// File Upload Functions
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toastMessage.value = 'File size must be less than 5MB';
      showToast.value = true;
      return;
    }
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toastMessage.value = 'Only JPG and PNG images are supported';
      showToast.value = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      adImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toastMessage.value = 'File size must be less than 5MB';
      showToast.value = true;
      return;
    }
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toastMessage.value = 'Only JPG and PNG images are supported';
      showToast.value = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      adImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  adImage.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Create Ad Functions
const createAd = () => {
  // Reset form
  createAdForm.value = {
    title: '',
    type: null,
    startDate: '',
    endDate: ''
  };
  adImage.value = null;
  showCreateAdModal.value = true;
};

const handleCloseCreateAd = () => {
  showCreateAdModal.value = false;
  // Reset form on close
  createAdForm.value = {
    title: '',
    type: null,
    startDate: '',
    endDate: ''
  };
  adImage.value = null;
};

const handleCancelCreateAd = (closeModal: () => void) => {
  closeModal();
  // Reset form
  createAdForm.value = {
    title: '',
    type: null,
    startDate: '',
    endDate: ''
  };
  adImage.value = null;
};

const handleCreateAd = (closeModal: () => void) => {
  // Validation
  if (!createAdForm.value.title) {
    toastMessage.value = 'Please enter a title';
    showToast.value = true;
    return;
  }
  if (!createAdForm.value.type) {
    toastMessage.value = 'Please select an ad type';
    showToast.value = true;
    return;
  }
  if (!createAdForm.value.startDate) {
    toastMessage.value = 'Please select a start date';
    showToast.value = true;
    return;
  }
  if (!createAdForm.value.endDate) {
    toastMessage.value = 'Please select an end date';
    showToast.value = true;
    return;
  }

  // Format dates for display (dd/mm/yyyy)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Create new ad
  const newAd = {
    id: Math.floor(Math.random() * 1000),
    title: createAdForm.value.title,
    ad_type: createAdForm.value.type.name,
    campaign_type: 'N/A', // Default, can be updated later
    start_date: formatDate(createAdForm.value.startDate),
    end_date: formatDate(createAdForm.value.endDate),
    date_created: formatDate(new Date().toISOString())
  };

  // Add to ads list
  ads.value.unshift(newAd);

  // Show success modal
  successModalTitle.value = 'Ad Created';
  successModalMessage.value = `The ad "${createAdForm.value.title}" has been successfully added to the system.`;
  showSuccessModal.value = true;

  // Close modal and reset form
  closeModal();
  createAdForm.value = {
    title: '',
    type: null,
    startDate: '',
    endDate: ''
  };
  adImage.value = null;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

// Edit Ad Functions
const editAd = (ad: any) => {
  selectedAd.value = ad;
  
  // Pre-fill form with ad data
  editAdForm.value = {
    title: ad.title || '',
    type: adTypeOptions.find(opt => opt.name === ad.ad_type) || null,
    campaignType: campaignTypeOptions.find(opt => opt.name === ad.campaign_type) || null,
    startDate: ad.start_date ? convertDateToInput(ad.start_date) : '',
    endDate: ad.end_date ? convertDateToInput(ad.end_date) : '',
    products: [] // Can be populated from ad data if available
  };
  
  editAdImage.value = null; // Reset image
  showEditAdModal.value = true;
};

const convertDateToInput = (dateStr: string) => {
  // Convert dd/mm/yyyy to yyyy-mm-dd for date input
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return '';
};

const handleCloseEditAd = () => {
  showEditAdModal.value = false;
  selectedAd.value = null;
  editAdForm.value = {
    title: '',
    type: null,
    campaignType: null,
    startDate: '',
    endDate: '',
    products: []
  };
  editAdImage.value = null;
};

const handleCancelEditAd = (closeModal: () => void) => {
  closeModal();
  editAdForm.value = {
    title: '',
    type: null,
    campaignType: null,
    startDate: '',
    endDate: '',
    products: []
  };
  editAdImage.value = null;
};

const handleUpdateAd = (closeModal: () => void) => {
  // Validation
  if (!editAdForm.value.title) {
    toastMessage.value = 'Please enter a title';
    showToast.value = true;
    return;
  }
  if (!editAdForm.value.type) {
    toastMessage.value = 'Please select an ad type';
    showToast.value = true;
    return;
  }
  if (!editAdForm.value.startDate) {
    toastMessage.value = 'Please select a start date';
    showToast.value = true;
    return;
  }
  if (!editAdForm.value.endDate) {
    toastMessage.value = 'Please select an end date';
    showToast.value = true;
    return;
  }

  // Format dates for display (dd/mm/yyyy)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Update ad in list
  if (selectedAd.value) {
    const index = ads.value.findIndex(a => a.id === selectedAd.value.id);
    if (index !== -1) {
      ads.value[index] = {
        ...ads.value[index],
        title: editAdForm.value.title,
        ad_type: editAdForm.value.type.name,
        campaign_type: editAdForm.value.campaignType?.name || 'N/A',
        start_date: formatDate(editAdForm.value.startDate),
        end_date: formatDate(editAdForm.value.endDate)
      };
    }
  }

  // Show success modal
  successModalTitle.value = 'Ad Updated';
  successModalMessage.value = `The ad "${editAdForm.value.title}" has been successfully updated.`;
  showSuccessModal.value = true;

  // Close modal and reset form
  closeModal();
  editAdForm.value = {
    title: '',
    type: null,
    campaignType: null,
    startDate: '',
    endDate: '',
    products: []
  };
  editAdImage.value = null;
  selectedAd.value = null;
};

// Edit Ad Image Upload Functions
const triggerEditFileInput = () => {
  editFileInput.value?.click();
};

const handleEditFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toastMessage.value = 'File size must be less than 5MB';
      showToast.value = true;
      return;
    }
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toastMessage.value = 'Only JPG and PNG images are supported';
      showToast.value = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      editAdImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleEditDrop = (event: DragEvent) => {
  isEditDragging.value = false;
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toastMessage.value = 'File size must be less than 5MB';
      showToast.value = true;
      return;
    }
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toastMessage.value = 'Only JPG and PNG images are supported';
      showToast.value = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      editAdImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeEditImage = () => {
  editAdImage.value = null;
  if (editFileInput.value) {
    editFileInput.value.value = '';
  }
};

// Delete Ad Functions
const deleteAd = (ad: any) => {
  selectedAd.value = ad;
  deleteModalMessage.value = `You are about to delete this ad "${ad.title}".`;
  showDeleteModal.value = true;
};

const deleteAdFromEdit = () => {
  if (selectedAd.value) {
    deleteModalMessage.value = `You are about to delete this ad "${selectedAd.value.title}".`;
    showDeleteModal.value = true;
  }
};

const handleDeleteConfirm = () => {
  if (selectedAd.value) {
    // Remove ad from list
    const index = ads.value.findIndex(a => a.id === selectedAd.value.id);
    if (index !== -1) {
      ads.value.splice(index, 1);
    }
    
    // Close modals
    showDeleteModal.value = false;
    showEditAdModal.value = false;
    selectedAd.value = null;
    
    // Show success toast
    toastMessage.value = 'Ad deleted successfully';
    showToast.value = true;
  }
};

const handleDeleteCancel = () => {
  showDeleteModal.value = false;
};

// Navigation
const router = useRouter();
const navigateToAllCustomers = () => {
  router.push({ name: 'marketing.all-customers' });
};

</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>

