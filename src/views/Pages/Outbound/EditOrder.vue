<template>
  <div class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle :title="getTitle" />

    <div class="flex flex-wrap items-center gap-2 mb-8 md:justify-between create_grn_header_wrapper pt-[12px]">
      <button @click="goBack" class="flex items-center rounded hover:bg-gray-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
            fill="#44546F" />
        </svg>
        <span class="text-xs">Back</span>
      </button>

      <div class="flex items-center gap-2">
        <h3>Edit Order</h3>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.91933 0.833313C2.45725 0.833313 2.0835 1.20498 2.0835 1.66248V8.33748C2.08493 8.5581 2.17366 8.76918 2.33029 8.92456C2.48692 9.07994 2.6987 9.16698 2.91933 9.16665H7.081C7.54308 9.16665 7.91683 8.7954 7.91683 8.33748V1.66248C7.91683 1.20748 7.54266 0.833313 7.081 0.833313H2.91933ZM3.75016 2.49998H6.25016C6.48028 2.49998 6.66683 2.68653 6.66683 2.91665C6.66683 3.14676 6.48028 3.33331 6.25016 3.33331H3.75016C3.52004 3.33331 3.3335 3.14676 3.3335 2.91665C3.3335 2.68653 3.52004 2.49998 3.75016 2.49998ZM6.25016 3.74998H3.75016C3.52004 3.74998 3.3335 3.93653 3.3335 4.16665C3.3335 4.39676 3.52004 4.58331 3.75016 4.58331H6.25016C6.48028 4.58331 6.66683 4.39676 6.66683 4.16665C6.66683 3.93653 6.48028 3.74998 6.25016 3.74998ZM3.75016 4.99998H4.5835C4.81362 4.99998 5.00016 5.18653 5.00016 5.41665C5.00016 5.64676 4.81362 5.83331 4.5835 5.83331H3.75016C3.52004 5.83331 3.3335 5.64676 3.3335 5.41665C3.3335 5.18653 3.52004 4.99998 3.75016 4.99998Z"
            fill="#44546F" />
        </svg>
        <span class="font-light upper">{{ order?.order_no }}2444134331</span>
      </div>

        <div class="flex items-center gap-2">
         
          <button @click="goBack" class="px-3 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 text-xs">Cancel</button>
          <button @click="showConfirmUpdate = true" class="flex items-center px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 gap-x-1">
            <span class="text-xs">Update</span>
          </button>
        </div>
    </div>

    <!-- Combined Delivery Price and Products Section -->
    <div class="p-4 rounded-xl items_wrapper">
      <!-- Header with actions -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="mb-4">Delivery Price</h3>
          <div class="w-full max-w-xs">
            <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Price</label> -->
            <div class="relative">
              <span class="absolute left-3 top-1.5 text-gray-500 text-lg">₦</span>
              <input 
                v-model="order.delivery_price" 
                type="number" 
                step="0.01"
                placeholder="0.00"
                class="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <GrayButton @click="showAddBatchModal = true" size="sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z" fill="currentColor"/>
            </svg>
            <span class="text-xs">Add Batch</span>
          </GrayButton>
          <GrayButton size="sm">
            <span class="text-xs">Reset Delivery Price</span>
          </GrayButton>
          <GrayButton size="sm">
            <span class="text-xs">Set Delivery Price to Zero</span>
          </GrayButton>
        </div>
      </div>


      <div class="overflow-hidden bg-white shadow-sm rounded-xl table_wrapper">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 border-gray-200">
              <tr class="bg-gray-50">
                <th class="px-2 py-3 tracking-wider text-left">ID</th>
                <th class="px-2 py-3 tracking-wider text-left w-1/3">Product Name</th>
                <th class="px-2 py-3 tracking-wider text-left w-1/3">Quantity</th>
                <th class="px-2 py-3 tracking-wider text-center bg-gray-50 border-l border-gray-200 w-32">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in order.items" :key="item.id" class="bg-gray-50">
                <!-- Normal row -->
                <template v-if="itemUnavailableIndex !== index && returnToStockIndex !== index">
                  <td class="px-2 py-3 tracking-wider text-left">{{ item.id }}</td>
                  <td class="px-2 py-3 tracking-wider text-left">
                    <Tooltip :text="item.product_name" class="">
                      <button class="tracking-wider text-left cursor-help">
                        {{ truncateText(item.product_name, 25) }}
                      </button>
                    </Tooltip>
                  </td>
                  <td class="px-2 py-3 tracking-wider text-left">
                    <!-- Normal quantity display -->
                    <span v-if="editingQuantity !== index" @click="startEditQuantity(index)" class="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                      {{ item.quantity }}
                    </span>
                    
                    <!-- Editing quantity with input -->
                    <input 
                      v-else
                      v-model="item.quantity" 
                      type="number" 
                      min="1"
                      class="w-[60%] px-2 pb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      @keyup.enter="updateQuantity(index)"
                      @keyup.escape="cancelEditQuantity(index)"
                      :id="`quantityInput-${index}`"
                    />
                  </td>
                  <td class="px-2 py-3 tracking-wider text-center bg-gray-50 border-l border-gray-200">
                    <!-- Normal actions -->
                    <div v-if="editingQuantity !== index" class="flex space-x-2 justify-center">
                      <button @click="editItem(item, index)" class="text-blue-600 transition-colors hover:text-blue-800" title="Edit Order Quantity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02001 19.23C3.9869 19.392 3.99447 19.5597 4.04205 19.718C4.08963 19.8764 4.17573 20.0205 4.29265 20.1374C4.40956 20.2543 4.55364 20.3404 4.71199 20.388C4.87034 20.4355 5.03802 20.4431 5.20001 20.41L9.01001 19.63L4.80001 15.42L4.02001 19.23ZM9.94101 16.61L7.82101 14.49L16.306 6H16.308L18.429 8.121L9.94001 16.611L9.94101 16.61ZM19.844 6.707L17.724 4.585C17.5381 4.39908 17.3173 4.2517 17.0743 4.15131C16.8314 4.05092 16.5709 3.9995 16.308 4C15.796 4 15.284 4.195 14.893 4.585L5.13601 14.343L10.086 19.293L19.843 9.535C20.218 9.15995 20.4286 8.65133 20.4286 8.121C20.4286 7.59068 20.218 7.08206 19.843 6.707H19.844Z" fill="#44546F"/>
                        </svg>
                      </button>

                      <button @click="deleteItem(index)" class="text-red-600 transition-colors hover:text-red-800" title="Item Unavailable">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9984_17053)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1849 7.4L12.0009 10.585L8.81489 7.399C8.71962 7.30584 8.59151 7.25393 8.45827 7.25449C8.32503 7.25505 8.19736 7.30804 8.10289 7.402L7.40289 8.103C7.35497 8.14897 7.31676 8.20409 7.29055 8.2651C7.26433 8.3261 7.25063 8.39175 7.25025 8.45815C7.24988 8.52455 7.26284 8.59035 7.28837 8.65165C7.31391 8.71295 7.35149 8.7685 7.39889 8.815L10.5839 11.999L7.39989 15.185C7.30686 15.2804 7.25512 15.4086 7.25587 15.5418C7.25662 15.6751 7.30979 15.8027 7.40389 15.897L8.10389 16.597C8.30989 16.804 8.61989 16.797 8.81589 16.601L12.0019 13.416L15.1859 16.601C15.2813 16.694 15.4095 16.7458 15.5427 16.745C15.676 16.7443 15.8035 16.6911 15.8979 16.597L16.5989 15.897C16.6467 15.851 16.6849 15.7958 16.711 15.7347C16.7371 15.6737 16.7507 15.608 16.751 15.5416C16.7513 15.4752 16.7382 15.4095 16.7126 15.3482C16.687 15.2869 16.6494 15.2314 16.6019 15.185L13.4159 11.999L16.6019 8.815C16.695 8.71974 16.747 8.59163 16.7464 8.45838C16.7458 8.32514 16.6928 8.19748 16.5989 8.103L15.8989 7.403C15.852 7.35497 15.796 7.31672 15.7342 7.29046C15.6724 7.2642 15.606 7.25045 15.5389 7.25C15.4731 7.25054 15.408 7.26407 15.3474 7.28981C15.2869 7.31555 15.232 7.35299 15.1859 7.4H15.1849Z" fill="#44546F"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_9984_17053">
                              <rect width="24" height="24" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>

                      <button @click="returnToStock(item, index)" class="text-green-600 transition-colors hover:text-green-800" title="Return to Stock">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_9984_17058)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="#44546F"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_9984_17058">
                              <rect width="24" height="24" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>

                    <!-- Edit mode actions - Update and X buttons -->
                    <div v-else class="flex space-x-2 justify-center">
                      <!-- <span class="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">Edit Order Quantity</span> -->
                      <button @click="updateQuantity(index)" class="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                        Update
                      </button>
                      <button @click="cancelEditQuantity(index)" class="px-1 py-1 text-gray-500 hover:text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </template>

                <!-- Item Unavailable warning row (REPLACES the normal row) -->
                <template v-else-if="itemUnavailableIndex === index">
                  <td colspan="3" class="px-4 py-3 bg-red-50">
                    <div class="flex items-center text-sm text-[#44546F] text-center justify-center">
                      
                      You are about to delete without returning this item back to stock <strong>"{{ itemToDelete?.product_name }}"</strong>.
                    </div>
                  </td>
                  <td class="px-2 py-3 text-center bg-red-50 border-l border-gray-200">
                    <div class="flex space-x-2 justify-center">
                      <!-- <span class="px-2 py-1 text-xs text-white text-[#44546F] rounded">Item Unavailable</span> -->
                      <button @click="confirmItemUnavailable" class="px-2 py-1 text-xs text-white text-[#44546F] bg-red-700 rounded hover:bg-red-700">
                        Confirm
                      </button>
                      <button @click="cancelItemUnavailable" class="px-1 py-1 text-gray-500 hover:text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </template>

                <!-- Return to Stock warning row (REPLACES the normal row) -->
                <template v-else-if="returnToStockIndex === index">
                  <td colspan="3" class="px-4 py-3 bg-red-50 text-center justify-center items-center">
                    <div class="flex items-center text-sm text-[#44546F] text-center justify-center">
                     
                      You are about to delete and return this item back to stock <strong>"{{ itemToReturn?.product_name }}"</strong>.
                    </div>
                  </td>
                  <td class="px-2 py-3 text-center bg-red-50 border-l border-gray-200">
                    <div class="flex space-x-2 justify-center">
                      <!-- <span class="px-2 py-1 text-xs text-white bg-blue-600 rounded">Return to Stock</span> -->
                      <button @click="confirmReturnToStock" class="px-2 py-1 text-xs text-white text-[#44546F] bg-red-700 rounded hover:bg-red-700">
                        Confirm
                      </button>
                      <button @click="cancelReturnToStock" class="px-1 py-1 text-gray-500 hover:text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Batch Modal -->
    <SideBarModal
      :isOpen="showAddBatchModal"
      title="Add Product to Order"
      @close="showAddBatchModal = false"
      width="small"
    >
      <div class="space-y-6 px-6 mt-4">
        <!-- Select Product -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
          <SelectField
            v-model="addBatchForm.selectedProduct"
            :options="productOptions"
            labelField="name"
            valueField="id"
            placeholder="Type to search for product"
          />
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            v-model="addBatchForm.quantity"
            type="number"
            min="1"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button @click="showAddBatchModal = false" class="cancel_btn">
            Cancel
          </button>
          <button @click="addBatch" class="create_btn">
            Add
          </button>
        </div>
      </template>
    </SideBarModal>



    <!-- Confirm Update Modal -->
    <UniversalCenteredModal :show="showConfirmUpdate" @close="showConfirmUpdate = false">
      <template #header>
        <span class="flex items-center gap-2">
          <h3 class="font-medium">Update Order</h3>
        </span>
      </template>

      <template #body>
        <p class="discard_merge_alert_body_text">
          You are about to update this order <strong>"{{ order?.order_no }}"</strong>. This action will update it in the system.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showConfirmUpdate = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="updateOrder" type="button" class="px-4 py-2 text-sm approve_btn" style="color: white">
            Update Order
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- Success Modal -->
    <SuccessModal
      v-model="showSuccessModal"
      title="Order Updated!"
      message="Order has been updated successfully."
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { ref, onMounted, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Tooltip from "@/views/Components/Tooltip.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import SuccessModal from "@/views/Components/procurement/ui/SuccessModal.vue";
import GrayButton from "@/views/Components/ui/GrayButton.vue";
import { api } from "@/api";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const loading = ref(false);

// Order data
const order = ref({
  id: '',
  order_no: '',
  delivery_price: 0,
  items: []
});

// Modal states
const showAddBatchModal = ref(false);
const showConfirmUpdate = ref(false);
const showSuccessModal = ref(false);

// Form data
const addBatchForm = ref({
  selectedProduct: null,
  quantity: 0
});

// Product options for the dropdown
const productOptions = ref([
  { id: 1, name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16' },
  { id: 2, name: 'PARACETAMOL 500MG TABLETS' },
  { id: 3, name: 'IBUPROFEN 400MG TABLETS' },
  { id: 4, name: 'AMOXICILLIN 250MG CAPSULES' },
  { id: 5, name: 'VITAMIN C 1000MG TABLETS' }
]);
const editingQuantity = ref(null);
const originalQuantity = ref(null);
const itemUnavailableIndex = ref(null);
const returnToStockIndex = ref(null);
const itemToDelete = ref(null);
const itemToReturn = ref(null);

const getTitle = computed(() => `All Orders / Confirmed Orders / ${order.value?.order_no}`);

// Load order data
onMounted(async () => {
  loading.value = true;
  try {
    // Mock data for now - in real app would fetch from API
    const mockOrder = {
      id: route.params.id,
      order_no: `RHPO-${route.params.id}`,
      delivery_price: 0,
      items: [
        {
          id: 1678158,
          product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
          quantity: 71
        }
      ]
    };
    order.value = mockOrder;
  } catch (error) {
    toast.error('Failed to load order data');
  } finally {
    loading.value = false;
  }
});

const truncateText = (text: string, maxLength = 25) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const startEditQuantity = (index: number) => {
  editingQuantity.value = index;
  originalQuantity.value = order.value.items[index].quantity;
  // Focus the specific quantity input after Vue updates the DOM
  nextTick(() => {
    const input = document.getElementById(`quantityInput-${index}`) as HTMLInputElement;
    if (input) {
      input.focus();
      input.select(); // Select all text for easy editing
    }
  });
};

const updateQuantity = (index: number) => {
  editingQuantity.value = null;
  originalQuantity.value = null;
  toast.success('Quantity updated successfully');
};

const cancelEditQuantity = (index: number) => {
  // Restore original quantity
  if (originalQuantity.value !== null) {
    order.value.items[index].quantity = originalQuantity.value;
  }
  editingQuantity.value = null;
  originalQuantity.value = null;
};

const editItem = (item: any, index: number) => {
  startEditQuantity(index);
};

const deleteItem = (index: number) => {
  itemToDelete.value = order.value.items[index];
  itemUnavailableIndex.value = index;
};

const cancelItemUnavailable = () => {
  itemUnavailableIndex.value = null;
  itemToDelete.value = null;
};

const returnToStock = (item: any, index: number) => {
  itemToReturn.value = item;
  returnToStockIndex.value = index;
};

const cancelReturnToStock = () => {
  returnToStockIndex.value = null;
  itemToReturn.value = null;
};

const confirmReturnToStock = () => {
  if (returnToStockIndex.value !== null) {
    order.value.items.splice(returnToStockIndex.value, 1);
    toast.success('Item returned to stock');
    returnToStockIndex.value = null;
    itemToReturn.value = null;
  }
};

const confirmItemUnavailable = () => {
  if (itemUnavailableIndex.value !== null) {
    order.value.items.splice(itemUnavailableIndex.value, 1);
    toast.success('Item marked as unavailable');
    itemUnavailableIndex.value = null;
    itemToDelete.value = null;
  }
};

const addBatch = () => {
  if (addBatchForm.value.selectedProduct && addBatchForm.value.quantity > 0) {
    const selectedProduct = productOptions.value.find(p => p.id === addBatchForm.value.selectedProduct);
    
    // Add the new product to the order items
    const newItem = {
      id: Date.now(), // Simple ID generation
      product_name: selectedProduct?.name || '',
      quantity: addBatchForm.value.quantity
    };
    
    order.value.items.push(newItem);
    
    toast.success('Product added to order successfully');
    
    // Reset form
    addBatchForm.value = {
      selectedProduct: null,
      quantity: 0
    };
    
    showAddBatchModal.value = false;
  } else {
    toast.error('Please select a product and enter a valid quantity');
  }
};

const goBack = () => {
  router.push({ name: 'outbound.orders' });
};

const updateOrder = () => {
  showConfirmUpdate.value = false;
  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    showSuccessModal.value = true;
    
    // Navigate back after success
    setTimeout(() => {
      router.push({ name: 'outbound.orders' });
    }, 2000);
  }, 1000);
};
</script>

<style>
.create_grn_header_wrapper {
  font-size: 14px;
  font-style: normal;
  font-weight: 450;
  line-height: 16px;
  color: rgba(23, 43, 77, 1);
}

.supplier_information,
.items_wrapper,
.items_wrapper table thead {
  background: rgb(239 239 239 / 82%);
}

.supplier_information h3,
.items_wrapper h3 {
  color: rgba(23, 43, 77, 1);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}

.items_wrapper .table_wrapper {
  border: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr,
.items_wrapper table tbody tr:not(:last-child) {
  border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr th {
  font-size: 12px;
  font-style: normal;
  font-weight: 450;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.items_wrapper table tbody tr td {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
}

.discard_merge_alert_footer button,
.footer button {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn,
.footer .cancel_btn {
  background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer button.approve_btn,
.footer button.approve_btn {
  background: rgba(12, 102, 228, 1);
  color: white;
}

.discard_merge_alert_body_text {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: rgba(68, 84, 111, 1);
  line-height: 20px;
}
</style> 