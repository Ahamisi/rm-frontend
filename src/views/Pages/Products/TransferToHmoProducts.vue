<template>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-full loading_wrapper" v-if="loading">
        <LoadingState />
    </div>
    <div>
        <!-- Transfer Product to HMO Product Modal -->
        <SideBarModal title="Transfer Information to HMO Products" :extraHeader="getTitle"
            :is-open="isTransferProductModalOpen" width="xl" :initial-form-data="transfer"
            ref="transferProductToHmoModal" :show-discard-warning="showDiscardTransferProductWarningModal"
            @update:is-open="isTransferProductModalOpen = $event" @close="handleClose"
            @form-data-change="handleAddComboProductFormDataChange"
            @showDiscardWarning="showDiscardTransferProductWarningModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <!-- batches -->
                    <!-- Inventory Table -->
                    <div class="relative border border-gray-200 rounded-lg bg-gray-50">
                        <div class="overflow-x-auto">
                            <div class="absolute top-0 left-0 right-0 z-10 bg-gray-100 border-b border-gray-200">
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th class="flex items-center h-12 px-4 py-3">
                                                <input type="checkbox" @change="toggleCheck"
                                                    class="text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                            </th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700 w-[18%]">Batch
                                                No.</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700 w-[18%]">Expiry
                                                Date</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700 w-[18%]">Shelf
                                                Location</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700 w-[18%]">Qty
                                                Available</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700 w-[18%]">Qty to
                                                Transfer</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="h-screen overflow-y-auto" style="padding-top: 45px;">
                                <table class="w-full">
                                    <!-- <thead>
                                        <tr class="bg-gray-100 border-b border-gray-200">
                                            <th class="p-2 text-left ">
                                                <input type="checkbox"  @change="toggleCheck"
                                                    class="text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                            </th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700">Batch No.</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700">Expiry Date
                                            </th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700">Shelf Location
                                            </th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700">Qty
                                                Available</th>
                                            <th class="p-2 text-xs font-medium text-left text-gray-700">Qty to
                                                Transfer</th>
                                        </tr>
                                    </thead> -->

                                    <tbody>
                                        <tr v-for="(batch, index) in product.batches" :key="batch.id"
                                            class="bg-white border-b border-gray-200 hover:bg-gray-50">
                                            <td class="px-4 py-3 w-[10%]">
                                                <input type="checkbox" class="rounded check text-secondary"
                                                    :name="`check${index}`" id="" :value="batch.id"
                                                    @change="checkItem($event, batch.id)">
                                            </td>
                                            <td class="p-2 text-xs text-gray-900 w-[18%]">{{ batch.batch_no }}</td>
                                            <td class="p-2 text-xs text-gray-900 w-[18%]">{{
                                                dayjs(batch.expiry_date).format('DD/MM/YYYY') }}</td>
                                            <td class="p-2 text-xs text-gray-900 w-[18%]">{{
                                                batch.warehouse_shelf.join(", ") }}</td>
                                            <td class="p-2 text-xs text-gray-900 w-[18%]">{{ batch.quantity }}</td>
                                            <td class="p-2 text-xs text-gray-900 w-[18%]">
                                                <span v-if="getItemIndex(batch.id) == -1">
                                                    {{ batch.quantity }}
                                                </span>
                                                <input type="number" v-else
                                                    class="w-1/2 text-xs border border-gray-300 rounded focus:outline-none"
                                                    v-model="transfer.batches[getItemIndex(batch.id)].quantity"
                                                    :max="batch.quantity" style="padding: 0.25em;">
                                                <!-- <input type="number" v-model.number="batch.quantityToTransfer"
                                                    :max="batch.quantityAvailable" min="0"
                                                    class="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="triggerDiscardWarning()" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="createTransfer(formData)" type="button" class="approve_btn">
                        Transfer
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- product branch transfer warning Modal -->
        <UniversalCenteredModal :show="showDiscardTransferProductWarningModal"
            @close="showDiscardTransferProductWarningModal = false">
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
                    You are about to leave the <strong>"Product Transfer To Hmo Products"</strong> process. Any unsaved
                    information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardTransferProductWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardProductTransfer" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { ref, defineProps, watch, onMounted, computed } from "vue";
import axios from "axios";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import dayjs from "dayjs";


// Define an interface for the props
interface Props {
    productId: Number
}

interface Product {
    id: number,
    name: string,
    branch_id: number
}

const props = defineProps<Props>();

// Watch for changes to productId
watch(
    () => props.productId,
    (newId) => {
        if (newId && Number(newId) > 0) {
            getProductAndBatches(Number(newId));
        }
    },
    { immediate: true }
);

onMounted(() => {
    getBranches()
});

const getTitle = computed(() => `
    <span class="flex items-center gap-2 text-xs text-gray-500">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="3.75" fill="#F7F8F9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6189 6.35172C9.83555 6.28219 10.0671 6.27312 10.2885 6.32547L10.3822 6.35172L13.1047 7.22505C13.1839 7.2513 13.2552 7.30047 13.3072 7.36922L13.3364 7.41297L14.4822 9.39089C14.5112 9.44085 14.5295 9.49629 14.5359 9.55369C14.5423 9.6111 14.5367 9.6692 14.5195 9.72433C14.5023 9.77946 14.4737 9.8304 14.4358 9.87392C14.3978 9.91744 14.3512 9.95259 14.2989 9.97714L14.2489 9.99672L13.3943 10.2709V12.0751C13.3943 12.24 13.3452 12.4012 13.2535 12.5383C13.1617 12.6754 13.0314 12.7821 12.8789 12.8451L12.8156 12.8684L10.3822 13.6484C10.1656 13.7179 9.93408 13.727 9.71265 13.6746L9.6189 13.6488L7.18557 12.8684C7.02847 12.8179 6.88989 12.722 6.78737 12.5927C6.68486 12.4634 6.62304 12.3066 6.60974 12.1421L6.60682 12.0746V10.2709L5.75224 9.99672C5.69728 9.97908 5.64658 9.95022 5.60337 9.91196C5.56015 9.8737 5.52535 9.82688 5.50118 9.77447C5.47701 9.72205 5.464 9.66519 5.46296 9.60748C5.46192 9.54977 5.47288 9.49247 5.49515 9.43922L5.5189 9.39089L6.66474 7.41297C6.70769 7.33886 6.77243 7.27979 6.85015 7.2438L6.89599 7.22505L9.6189 6.35172ZM10.4172 10.1271V12.7621L12.561 12.0746V10.5384L11.2735 10.9513C11.1909 10.9778 11.1021 10.9778 11.0195 10.9515C10.9369 10.9251 10.8646 10.8736 10.8127 10.8042L10.786 10.7634L10.4172 10.1271ZM9.5839 10.1271L9.21515 10.7634C9.1675 10.8456 9.09318 10.9091 9.00452 10.9432C8.91585 10.9774 8.81816 10.9803 8.72765 10.9513L7.44015 10.5384V12.0746L9.5839 12.7626V10.1271ZM7.21724 8.12089L6.49932 9.3613L8.66224 10.0555L9.38099 8.81505L7.21724 8.12089ZM12.7839 8.12089L10.6202 8.81505L11.3385 10.0555L13.5018 9.3613L12.7839 8.12089ZM10.1277 7.14505C10.0617 7.12399 9.99152 7.11969 9.92349 7.13255L9.87349 7.14505L8.38807 7.62172L10.0006 8.1388L11.6131 7.62172L10.1277 7.14505Z" fill="#626F86"/>
        </svg>
        <small>${product.value.name}</small>
    </span>
`)


const showDiscardTransferProductWarningModal = ref<boolean>(false);
const isTransferProductModalOpen = ref<boolean>(false);
const transferProductToHmoModal = ref(null);

const toast = useToast();
const product = ref({
    id: 0,
    name: "",
    branch_id: 0,
    batches: [],
} as Partial<Product>);
const loading = ref<boolean>(false);
const transfer = ref({
    batches: [],
});
const branches = ref([]);




const getBranches = () => {
    axios.get(import.meta.env.VITE_API_URL + 'branches?type=all').then(res => {
        branches.value = res.data;
    });
}

const getProductAndBatches = (product_id) => {
    loading.value = true;
    axios({ url: import.meta.env.VITE_API_URL + 'admin/products/' + product_id, method: 'GET' })
        .then(res => {
            product.value = res.data;
            product.value.batches = res.data.subproducts;
            transfer.value = {
                batches: []
            }
            isTransferProductModalOpen.value = true;
        })
        .catch(err => {
            toast.error('Error loading product!');
        })
        .finally(() => {
            loading.value = false;
        });
}


const handleDiscardProductTransfer = () => {
    showDiscardTransferProductWarningModal.value = false;
    if (isTransferProductModalOpen.value) transferProductToHmoModal.value?.closeModal();
    loading.value = false;
    transfer.value = {
        batches: []
    }
}

const createTransfer = () => {
    loading.value = true;
    axios.post(import.meta.env.VITE_API_URL + `hmo_products/${product.value.id}/transfer`, transfer.value)
        .then(res => {
            toast.success('Transfer created successfully!');
            if (isTransferProductModalOpen.value) transferProductToHmoModal.value?.closeModal();
            transfer.value = {
                batches: []
            }
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const getItemIndex = (batch_id) => {
    let index = -1;
    transfer.value.batches.forEach((item, itemIndex) => {
        if (item.sub_product_id == batch_id) index = itemIndex;
    })
    return index;
}

const checkItem = (event, id) => {
    let batch = product.value.batches.filter(bt => bt.id == id)[0];
    console.log(batch);
    if (event.target.checked) {
        transfer.value.batches.push({ quantity: batch.quantity, sub_product_id: batch.id });
    } else {
        if (hasItem(batch.id) !== false) {
            let index = hasItem(batch.id);
            if (index !== -1 && index !== false) transfer.value.batches.splice(index, 1);
        }
    }
}
const hasItem = (batch_id: number): number | false => {
    let has: number | boolean = false;
    transfer.value.batches.forEach((item, index) => {
        if (item.sub_product_id == batch_id) has = index;
    })
    return has;
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
const toggleCheck = (event) => {
    document.querySelectorAll('input[type="checkbox"].check').forEach(element => {
        element.checked = event.target.checked;
        let batch = product.value.batches.filter(batch => batch.id == element.value)[0];
        if (batch != undefined) {
            if (element.checked) {
                transfer.value.batches.push({ quantity: batch.quantity, sub_product_id: batch.id });
            } else {
                if (hasItem(batch.id) !== false) {
                    let index = hasItem(batch.id);
                    if (index !== -1 && index !== false)
                        transfer.value.batches.splice(index, 1);
                }
            }
        }
    });
}

const handleAddComboProductFormDataChange = (formData) => {
    transfer.value = formData;
};


const handleClose = (data) => {
    console.log('Modal closed with data:', data);
    // Reset form data when modal closes
    // mergeProductFormData.value = {
    //     primary_id: '',
    //     secondary_id: []
    // };
};

</script>


<style>
.combo_item_wrapper {
    background: #F7F8F9;
    border-radius: 8px;
    padding: 20px;
    color: #44546F;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.combo_add_item_btn {
    background: rgba(9, 30, 66, 0.06);
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.loading_wrapper {
    z-index: 99999;
    background: rgba(0, 0, 0, 0.4);
}

.cancel_btn {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
    /* border-radius: 6px;
    padding: 4px 12px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
     */
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
</style>
