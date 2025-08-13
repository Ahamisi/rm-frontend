<template>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-full loading_wrapper" v-if="loading">
        <LoadingState />
    </div>
    <div>
        <!-- Add Combo Product Modal -->
        <SideBarModal title="Add Combo Product" :is-open="isAddComboProductModalOpen" width="lg"
            ref="addComboProductModal" :initial-form-data="comboProductFormData"
            :show-discard-warning="showDiscardAddComboProductWarningModal"
            @update:is-open="isAddComboProductModalOpen = $event" @close="handleClose"
            @form-data-change="handleAddComboProductFormDataChange"
            @showDiscardWarning="showDiscardAddComboProductWarningModal = true">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div v-for="item, index in comboProductFormData" :key="`p${index}`" class="mb-4 combo_item_wrapper">
                    <!-- Product Selection Forms -->
                    <div class="space-y-6">
                        <!-- First Product Selection -->
                        <div class="">
                            <div class="flex items-start justify-end">

                                <button @click.prevent="removeItem(index)" class="combo_remove_item_btn">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="#FFECEB" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M19.1846 11.4L16.0006 14.585L12.8146 11.399C12.7194 11.3058 12.5913 11.2539 12.458 11.2545C12.3248 11.255 12.1971 11.308 12.1026 11.402L11.4026 12.103C11.3547 12.149 11.3165 12.2041 11.2903 12.2651C11.2641 12.3261 11.2504 12.3918 11.25 12.4582C11.2496 12.5246 11.2626 12.5904 11.2881 12.6517C11.3137 12.7129 11.3512 12.7685 11.3986 12.815L14.5836 15.999L11.3996 19.185C11.3066 19.2804 11.2549 19.4086 11.2556 19.5418C11.2564 19.6751 11.3095 19.8027 11.4036 19.897L12.1036 20.597C12.3096 20.804 12.6196 20.797 12.8156 20.601L16.0016 17.416L19.1856 20.601C19.281 20.694 19.4092 20.7458 19.5425 20.745C19.6757 20.7443 19.8033 20.6911 19.8976 20.597L20.5986 19.897C20.6465 19.851 20.6846 19.7958 20.7108 19.7347C20.7369 19.6737 20.7505 19.608 20.7508 19.5416C20.7511 19.4752 20.738 19.4095 20.7124 19.3482C20.6868 19.2869 20.6491 19.2314 20.6016 19.185L17.4156 15.999L20.6016 12.815C20.6948 12.7197 20.7467 12.5916 20.7462 12.4584C20.7456 12.3251 20.6926 12.1975 20.5986 12.103L19.8986 11.403C19.8517 11.355 19.7958 11.3167 19.734 11.2905C19.6722 11.2642 19.6058 11.2504 19.5386 11.25C19.4728 11.2505 19.4078 11.2641 19.3472 11.2898C19.2866 11.3155 19.2317 11.353 19.1856 11.4H19.1846Z"
                                            fill="#C9372C" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Product Search Dropdown -->
                            <div class="mb-6">
                                <div class="relative">
                                    <label for="">Select Product</label>
                                    <v-select
                                        :options="comboProducts[index].filter(pduct => pduct.id != comboProduct.id)"
                                        label="name" v-model="comboProductFormData[index].other_product_id"
                                        :reduce="pduct => pduct.id" :loading="searchingComboProduct"
                                        @search="searchProducts($event, index)" :key="key">
                                        <template slot="no-options">
                                            Type to search products..
                                        </template>
                                    </v-select>
                                </div>
                            </div>

                            <!-- Ratio Quantities -->
                            <div class="grid items-end grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">
                                        Ratio Quantity for {{ comboProduct.name }}
                                    </label>
                                    <input type="number" :name="`products[${index}][ratio_a]`"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        v-model="comboProductFormData[index].ratio_a" @change="ratioChanged(index)">
                                    <!-- <input v-model.number="products[0].ratioQuantityBase" type="number" min="0"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0" /> -->
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">
                                        Ratio Quantity for Combo Product {{ index + 1 }}
                                    </label>
                                    <input type="number" :name="`products[${index}][ratio_a]`"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        v-model="comboProductFormData[index].ratio_b" @change="ratioChanged(index)">
                                    <!-- <input v-model.number="products[0].ratioQuantityCombo" type="number" min="0"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0" /> -->
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <!-- Add New Product Button -->
                <div class="flex justify-end mt-8">
                    <button @click="addItem" class="px-6 py-3 focus:outline-none combo_add_item_btn">
                        Add New Product
                    </button>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="triggerDiscardWarning()" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="addComboProduct(formData)" type="button" class="approve_btn">
                        Add all Combo Products
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- bulk products transfer warning Modal -->
        <UniversalCenteredModal :show="showDiscardAddComboProductWarningModal"
            @close="showDiscardAddComboProductWarningModal = false">
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
                    You are about to leave the <strong>"Add Product Combo"</strong> process. Any unsaved information
                    will
                    be lost.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardAddComboProductWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="handleDiscardAddComboTransfer" type="button" class="discard_btn">
                        Discard Changes?
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { ref, defineProps, watch } from "vue";
import axios from "axios";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';


// Define an interface for the props
interface Props {
    comboProductId: Number
}

const props = defineProps<Props>();

// Watch for changes to comboProductId
watch(
    () => props.comboProductId,
    (newId) => {
        if (newId && Number(newId) > 0) {
            getComboProductDetails(Number(newId));
        }
    },
    { immediate: true }
);
const showDiscardAddComboProductWarningModal = ref<boolean>(false);
const isAddComboProductModalOpen = ref<boolean>(false);
const comboProductFormData = ref([
    { other_product_id: "", ratio_a: "", ratio_b: "", ratio: "" },
]);
const toast = useToast();
const searchingComboProduct = ref(false);
const addComboProductModal = ref(null);
const comboProduct = ref({});
const loading = ref<boolean>(false);
const comboProducts = ref([[]]);



const handleDiscardAddComboTransfer = () => {
    showDiscardAddComboProductWarningModal.value = false;
    if (isAddComboProductModalOpen.value) addComboProductModal.value?.closeModal();
    comboProductFormData.value = [{ other_product_id: "", ratio_a: "", ratio_b: "", ratio: "" }];
    comboProducts.value = [[]];
    searchingComboProduct.value = false;
    loading.value = false;
    comboProduct.value = {};
}

const getComboProductDetails = (id) => {
    loading.value = true;
    axios
        .get(import.meta.env.VITE_API_URL + `admin/products/${id}?combo=true`)
        .then((res) => {
            comboProduct.value = res.data;
            if (res.data.combo_products.length > 0) {
                comboProducts.value = res.data.combo_products.map((pduct, index) => {
                    if (index >= 1) comboProducts.value.push([]);
                    searchProducts(pduct.pivot.other_product_id, index);
                    return pduct.pivot;
                });
                isAddComboProductModalOpen.value = true;
            }
        })
        .catch((err) => {
            toast.error("Error loading product!");
        })
        .finally(() => {
            loading.value = false;
        });
}

const addItem = () => {
    comboProductFormData.value.push({ other_product_id: '', ratio_a: '', ratio_b: '', ratio: '' });
    comboProducts.value.push([]);
}

const removeItem = (index) => {
    comboProductFormData.value.splice(index, 1);
    comboProducts.value.splice(index, 1);
}
const addComboProduct = (data) => {
    console.log('Adding combo product with data:', data);
    if (comboProductFormData.value.length == 0) {
        toast.error("Please add at least one product to the combo.");
        return;
    }
    if (comboProductFormData.value.some(item => !item.other_product_id || item.ratio_a == '' || item.ratio_b == '')) {
        toast.error("Please fill all fields for each product in the combo.");
        return;
    }
    let formattedData = [];
    for (let index = 0; index < comboProductFormData.value.length; index++) {
        const combo = comboProductFormData.value[index];
        if (combo.ratio_a === 0 || combo.ratio_b === 0) {
            toast.error(`Combo item ${index + 1} ratio can't have a zero value`);
            // Remove the break if you want to process all combos
        } else {
            combo.ratio = combo.ratio_a / combo.ratio_b;
            formattedData.push(combo); // Use push to add to the array
        }
    }
    axios.post(import.meta.env.VITE_API_URL + `admin/products/${comboProduct.value.id}/combo`, { products: formattedData }).then(res => {
        if (isAddComboProductModalOpen.value) addComboProductModal.value?.closeModal();
        toast.success('Combo product(s) added successfully!');
        window.location.reload();
    }).catch(err => {
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
    });
}

const ratioChanged = (index) => {
    if (comboProductFormData.value[index].ratio_a == 0 || comboProductFormData.value[index].ratio_b == 0 || comboProductFormData.value[index].ratio_a == '' || comboProducts[index].ratio_b == '') {
        comboProductFormData.value[index].ratio = null;
        return;
    }
    comboProductFormData.value[index].ratio = comboProductFormData.value[index].ratio_b / comboProductFormData.value[index].ratio_a;
    return;
}

const searchProducts = (search, index) => {
    if (search == '' || search.length < 3) return;
    searchingComboProduct.value = true;
    axios.get(import.meta.env.VITE_API_URL + `search_products_typeahead?q=${search}&fields=id,name`).then(res => {
        comboProducts.value[index] = res.data;

    }).catch(err => {
        toast.error("Error loading products!");
    }).finally(() => searchingComboProduct.value = false);
}

const handleAddComboProductFormDataChange = (formData) => {
    comboProductFormData.value = formData;
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
