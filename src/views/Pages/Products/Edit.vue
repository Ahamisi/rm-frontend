<template>
    <div v-if="disableForm"
        class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 loading_overlay">
        <LoadingState />
    </div>
    <!-- Static container -->
    <div class="fixed inset-0 z-50 pointer-events-none">
        <!-- Fading overlay -->
        <transition name="fade">
            <div v-if="isOpen" class="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto"
                @click.self="closeModal"></div>
        </transition>

        <!-- Sliding modal -->
        <transition name="slide">
            <div v-if="isOpen" class="absolute inset-y-0 right-0 flex justify-end w-full max-w-2xl pointer-events-auto">
                <div class="w-full h-screen overflow-hidden bg-white shadow-xl">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-4 border-b border-gray-200">
                        <div class="flex items-center flex-1 space-x-4">
                            <h2 class="mr-auto modal_title">Edit Product</h2>
                            <div class="text-xs text-gray-500">Step {{ currentStep }} of {{ totalSteps }}</div>

                            <!-- Progress Bar -->
                            <!-- <div class="px-6 py-4 ml-auto bg-gray-50">
                        <div class="h-2 m-24 bg-gray-200 rounded-full ">
                            <div class="h-2 transition-all duration-300 bg-blue-600 rounded-full"
                                :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
                        </div>
                    </div> -->

                            <div class="w-32 h-2 bg-gray-200 rounded-full">
                                <div class="h-2 transition-all duration-300 bg-green-600 rounded-full"
                                    :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
                            </div>
                        </div>
                        <button @click="closeModal" class="p-1 text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>
                    </div>


                    <!-- Form Content -->
                    <div class="p-6 overflow-y-auto max-h-[85vh] h-[85vh]">
                        <!-- Step 1: Product Information -->
                        <div v-if="currentStep === 1" class="space-y-6">
                            <h3 class="header_text">Product Information</h3>

                            <!-- Product Name -->
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                                <v-select v-model="selectedProduct" :options="products" :searchable="true"
                                    :clearable="true" :placeholder="'Enter a product name'" @search="onSearch"
                                    @option:selected="onProductSelect" @search:input="onSearchInput" label="name"
                                    :loading="product_loading" :taggable="true" :create-option="createOption"
                                    :reduce="product => product" />
                                <!-- <input v-model="formData.name" type="text" placeholder="Enter a product name"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md" /> -->
                            </div>

                            <!-- Product Formulation -->
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Product
                                        formulation</label>
                                    <div class="relative">
                                        <v-select :options="productTypes" label="display_name"
                                            v-model="formData.product_type_id" :reduce="type => type.id">
                                        </v-select>
                                    </div>
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Category</label>
                                    <div class="relative">
                                        <v-select :options="categories" label="display_name"
                                            v-model="formData.category_id" :reduce="category => category.id">
                                        </v-select>
                                    </div>
                                </div>
                            </div>

                            <!-- Pack Style and Generic Name -->
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Pack Style</label>
                                    <div class="relative">
                                        <select v-model="formData.pack_style"
                                            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md appearance-none">
                                            <option value="" disabled selected>Pack Style</option>
                                            <option value="roll">Roll</option>
                                            <option value="box">Box</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Generic Name</label>
                                    <input v-model="formData.generic_name" type="text" placeholder="Enter generic name"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <!-- Product Strength and Manufacturer -->
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Product Strength</label>
                                    <input v-model="formData.strength" type="text" placeholder="Enter product strength"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Manufacturer</label>
                                    <div class="relative">
                                        <v-select :options="manufacturers" label="display_name"
                                            v-model="formData.manufacturer_id"
                                            :reduce="manufacturer => manufacturer.id"></v-select>
                                    </div>
                                </div>
                            </div>

                            <h3 class="header_text">Price Information</h3>
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label class="">Unit Cost</label>
                                    <div class="relative">
                                        <span class="absolute text-base text-gray-500 left-3 top-[5px]">₦</span>
                                        <input v-model="formData.unit_cost" type="number" placeholder="0.00"
                                            class="w-full py-2 pl-6 pr-3 border border-gray-300 rounded-md price" />
                                    </div>
                                </div>
                                <div>
                                    <label class="">Price Per Pack</label>
                                    <div class="relative">
                                        <span class="absolute text-base text-gray-500 left-3 top-[5px]">₦</span>
                                        <input v-model="formData.price_per_pack" type="number" placeholder="0.00"
                                            class="w-full py-2 pl-6 pr-3 border border-gray-300 rounded-md price" />
                                    </div>
                                </div>
                            </div>

                            <!-- Quantity Section -->
                            <div class="space-y-4">
                                <h4 class="header_text">Quantity</h4>

                                <!-- Quantity Per Pack and Per Carton -->
                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Quantity Per
                                            Pack</label>
                                        <input v-model.number="formData.quantity_per_pack" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Quantity Per
                                            Carton</label>
                                        <input v-model.number="formData.quantity_per_carton" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Discount on Carton
                                            (%)</label>
                                        <input v-model.number="formData.discount_on_carton" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Quantity Per
                                            Roll/Box</label>
                                        <input v-model.number="formData.quantity_per_roll" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                </div>

                                <!-- Quantity Available and To Warn -->
                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Quantity
                                            Available</label>
                                        <input v-model.number="formData.quantity_available" type="number" min="0"
                                            placeholder="0" class="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            readonly />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Quantity to
                                            Warn</label>
                                        <input v-model.number="formData.quantity_to_warn" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                </div>

                                <!-- Dispensation -->
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Dispensation</label>
                                    <input v-model.number="formData.dispensation" type="number" min="1" placeholder="1"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <!-- Store Information -->
                            <div class="space-y-4">
                                <h4 class="header_text">Store Information</h4>
                                <!-- Add store information fields here if needed -->
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Warehouse
                                        Locations</label>
                                    <div class="relative">
                                        <v-select :options="warehouses" label="name" v-model="formData.warehouse_id"
                                            :reduce="warehouse => warehouse.id"></v-select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Product Image & Sales Rules -->
                        <div v-if="currentStep === 2" class="space-y-6">
                            <!-- Product Image -->
                            <div>
                                <h3 class="mb-4 header_text">Product Image</h3>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-700">Upload Product
                                        Image</label>
                                    <FileUploader :maxFileSize="maxFilesize" fileType="image/*"
                                        @update:files="handleSelectedFiles" />

                                    <!-- node_modules/primevue/resources/themes/ -->
                                </div>
                            </div>

                            <!-- Sales Rules -->
                            <div>
                                <h3 class="mb-4 header_text">Sales Rules</h3>

                                <!-- Max Quantity Fields -->
                                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Max Quantity per
                                            Sale</label>
                                        <input v-model.number="formData.max_quantity_per_sale" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Max Quantity per
                                            Sale in
                                            Days</label>
                                        <input v-model.number="formData.max_quantity_days" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <!-- Min Quantity to Reorder -->
                                    <div class="">
                                        <label class="block mb-2 text-sm font-medium text-gray-700">Min. Quantity to
                                            Reorder</label>
                                        <input v-model.number="formData.min_reorder" type="number" min="0"
                                            placeholder="0"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                </div>


                                <!-- Checkboxes -->
                                <div class="flex items-center justify-between gap-3 space-y-3">
                                    <div class="flex items-center">
                                        <input id="cashAndCarry" :checked="formData.cash_and_carry" type="checkbox"
                                            class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            @change="formData.cash_and_carry = !formData.cash_and_carry" />
                                        <label for="cashAndCarry" class="ml-2 text-sm text-gray-700">
                                            Make Cash and Carry
                                        </label>
                                    </div>
                                    <div class="flex items-center" style="margin: 0;">
                                        <input id="flatFee" :checked="formData.is_controlled" type="checkbox"
                                            class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            @change="formData.is_controlled = !formData.is_controlled" />
                                        <label for="flatFee" class="ml-2 text-sm text-gray-700">
                                            Is Controlled
                                        </label>
                                    </div>
                                    <div class="flex items-center" style="margin: 0;">
                                        <input id="flatFee" :checked="formData.use_flat_fee" type="checkbox"
                                            class="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            @change="formData.use_flat_fee = !formData.use_flat_fee" />
                                        <label for="flatFee" class="ml-2 text-sm text-gray-700">
                                            Use Flat Fee (for Distributor)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="flex items-center justify-between p-4 border-t border-gray-200">
                        <button @click="previousStep" :disabled="currentStep === 1"
                            class="px-4 py-2 disabled:cursor-not-allowed previous_btn">
                            Previous
                        </button>
                        <div class="flex space-x-3">
                            <button @click="handleShowDiscardCreateProductModal" class="px-4 py-2 cancel_btn">
                                Cancel
                            </button>
                            <button v-if="currentStep < totalSteps" @click="nextStep" class="px-4 py-2 approve_btn">
                                Next
                            </button>
                            <button v-if="currentStep === totalSteps" @click="submitForm" class="px-4 py-2 approve_btn">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

    <!-- discard create product warning Modal -->
    <UniversalCenteredModal :show="showDiscardEditProductModal" @close="showDiscardEditProductModal = false">
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
                You are about to leave the <strong>"Update New Product"</strong> process. Any unsaved
                information
                will
                be lost.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showDiscardEditProductModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="handleDiscardEditProduct" type="button" class="discard_btn">
                    Discard Changes?
                </button>
            </div>
        </template>
    </UniversalCenteredModal>

    <!-- create product success Modal -->
    <UniversalCenteredModal :show="showCreateProductSuccessModal" @close="showCreateProductSuccessModal = false">
        <template #body>
            <div class="flex justify-center my-4">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.7867 21.5635C11.4707 21.2275 11.0349 21.0298 10.5739 21.0134C10.113 20.997 9.66419 21.1632 9.32517 21.476C8.98614 21.7887 8.78429 22.2226 8.7635 22.6834C8.74271 23.1442 8.90467 23.5945 9.21415 23.9365L15.5352 30.7947C16.4749 31.7152 17.8749 31.7152 18.7447 30.8472L19.3817 30.219C21.6821 27.9566 23.9798 25.6915 26.2749 23.4237L26.3449 23.3537C28.4899 21.2399 30.6237 19.1147 32.7464 16.9785C33.0637 16.6463 33.2376 16.2028 33.2307 15.7435C33.2238 15.2842 33.0366 14.8461 32.7096 14.5236C32.3825 14.2011 31.9417 14.0202 31.4824 14.0198C31.0231 14.0194 30.582 14.1996 30.2544 14.5215C28.1416 16.6466 26.0182 18.7612 23.8844 20.8652L23.8144 20.9352C21.6151 23.1093 19.413 25.2804 17.2082 27.4487L11.7867 21.5635Z"
                        fill="white" />
                </svg>
            </div>
            <h4 class="text-center">Product Updated Successfully</h4>
            <p class="discard_merge_alert_body_text">
                The product <strong>“{{ formData.name }}”</strong> has been successfully updated in the system.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="handleDiscardEditProduct" type="button" class="approve_btn">
                    Done
                </button>
            </div>
        </template>
    </UniversalCenteredModal>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import FileUploader from '@/views/Components/FileUploader.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';

interface Props {
    isOpen: boolean;
    productId: number
}

const props = defineProps<Props>()

// Types
interface ProductFormData {
    name: string
    description: string,
    category_id: number | ''
    subcategory_id: number | ''
    product_type_id: string
    pack_style: string
    quantity_per_pack: number
    quantity_per_carton: number
    quantity_available: number
    quantity_to_warn: number
    max_quantity_per_sale: number
    max_quantity_days: number
    price_per_pack: string
    discount_on_carton: number | ''
    images: any[]
    generic_name: string
    strength: string
    quantity_per_roll: number
    manufacturer_id: number | ''
    pack_size: string
    unit_cost: string
    warehouse_id: number | ''
    batches: any[]
    min_reorder: number
    for_chemist: boolean
    is_controlled: boolean
    cash_and_carry: boolean
    use_flat_fee: boolean
    dispensation: number,
    barcode: string
}

onUnmounted(() => {
    if (props.isOpen) {
        restoreBodyScroll();
    }
});

watch(() => props.isOpen, async (newValue) => {
    if (newValue) {
        preventBodyScroll();
        // Wait for DOM update before triggering animation
        await nextTick()
    } else {
        // Wait for animation to complete before restoring scroll
        setTimeout(() => {
            restoreBodyScroll();
        }, 300)
    }
})

const toast = useToast();
const currentStep = ref(1)
const totalSteps = ref(2)
const fileInput = ref<HTMLInputElement>();
const categories = ref<any[]>([]);
const manufacturers = ref<any[]>([]);
const productTypes = ref<any[]>([]);
const products = ref<any[]>([]);
const warehouses = ref([]);
const images = ref<any[]>([]);
const accept = ref('image/gif,image/jpeg,image/png,image/jpg');
const childKey = ref(10000);
const maxFilesize = ref(102400); // 100kb
const formData = ref<Partial<ProductFormData>>({
    name: "",
    description: "",
    category_id: "",
    subcategory_id: "",
    product_type_id: "",
    pack_style: "",
    quantity_per_pack: 0,
    quantity_per_carton: 0,
    quantity_available: 0,
    quantity_to_warn: 0,
    max_quantity_per_sale: 0,
    max_quantity_days: 0,
    price_per_pack: "",
    discount_on_carton: "",
    images: [],
    generic_name: "",
    strength: "",
    quantity_per_roll: 0,
    manufacturer_id: "",
    pack_size: "",
    unit_cost: "",
    warehouse_id: '',
    batches: [],
    min_reorder: 1,
    for_chemist: true,
    is_controlled: false,
    cash_and_carry: false,
    use_flat_fee: false,
    dispensation: 1,
    barcode: ''
})
let debounceTimeout: ReturnType<typeof setTimeout>;
const product_loading = ref(false);
const selectedProduct = ref(null);
const showDiscardEditProductModal = ref(false);
const showCreateProductSuccessModal = ref(false);
const disableForm = ref(false);
// Store original body style to restore later
const originalBodyStyle = ref('')

const { hasChanged, reset } = useDataChangeTracker(formData);

const handleShowDiscardCreateProductModal = () => {
    if (hasChanged.value) {
        showDiscardEditProductModal.value = true;
    } else {
        handleDiscardEditProduct();
    }
}


const preventBodyScroll = () => {
    const body = document.body;
    originalBodyStyle.value = body.style.cssText;

    body.classList.add('modal-open');
    // Additional styles for better mobile support
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.left = '0';
    body.style.right = '0';
    body.style.bottom = '0';
}

const restoreBodyScroll = () => {
    const body = document.body;
    body.classList.remove('modal-open');

    // Restore original styles
    if (originalBodyStyle.value) {
        body.style.cssText = originalBodyStyle.value;
    } else {
        // Fallback: remove the styles we added
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.bottom = '';
    }
}

const handleDiscardEditProduct = async () => {
    formData.value = {
        name: "",
        description: "",
        category_id: "",
        subcategory_id: "",
        product_type_id: "",
        pack_style: "",
        quantity_per_pack: 0,
        quantity_per_carton: 0,
        quantity_available: 0,
        quantity_to_warn: 0,
        max_quantity_per_sale: 0,
        max_quantity_days: 0,
        price_per_pack: "",
        discount_on_carton: "",
        images: [],
        generic_name: "",
        strength: "",
        quantity_per_roll: 0,
        manufacturer_id: "",
        pack_size: "",
        unit_cost: "",
        warehouse_id: '',
        batches: [],
        min_reorder: 1,
        for_chemist: true,
        is_controlled: false,
        cash_and_carry: false,
        use_flat_fee: false,
        dispensation: 1,
        barcode: ''
    }
    await nextTick(); // Wait for DOM update before closing modal
    reset();
    showDiscardEditProductModal.value = false;
    closeModal();

}

// Emits
const emit = defineEmits<{
    close: []
    submit: [data: ProductFormData]
}>()

onMounted(() => {
    getCategories();
    getProductTypes();
    getManufacturers();
    getWarehouses();
})

watch(
    () => props.productId,
    (newId) => {
        if (newId && Number(newId) > 0) {
            getProduct(Number(newId));
        }
    },
    { immediate: true }
);


// Methods

const $toBase64 = async (url, callback, index, type = "") => {
    await axios
        .post(import.meta.env.VITE_API_URL + "image/convert", { url: url })
        .then((res) => {
            callback && type == ""
                ? callback(index, res.data)
                : callback(index, res.data, type);
        })
        .catch((err) => { });
}

const setPath = (index, path) => {
    formData.value.images[index].path = path;
}

const getProduct = async (id) => {
    try {
        disableForm.value = true;

        const resp = await axios.get(import.meta.env.VITE_API_URL + 'admin/products/' + id);
        const data = resp.data;

        formData.value = {
            ...formData.value,
            name: data.name,
            description: data.description,
            category_id: data.category_id,
            product_type_id: data.product_type_id,
            pack_style: data.pack_style,
            quantity_per_pack: data.quantity_per_pack ?? 0,
            quantity_per_carton: data.quantity_per_carton ?? 0,
            quantity_available: data.quantity_available ?? 0,
            quantity_to_warn: data.quantity_to_warn ?? 0,
            max_quantity_per_sale: data.max_quantity_per_sale ?? 0,
            max_quantity_days: data.max_quantity_days ?? 0,
            price_per_pack: data.price_per_pack,
            discount_on_carton: data.discount_on_carton,
            generic_name: data.generic_name,
            strength: data.strength,
            quantity_per_roll: data.quantity_per_roll ?? 0,
            manufacturer_id: data.manufacturer_id,
            pack_size: data.pack_size,
            unit_cost: data.unit_cost,
            warehouse_id: data.warehouse_id,
            subcategory_id: data.subcategory_id ?? '',
            min_reorder: data.min_reorder,
            for_chemist: data.for_chemist,
            cash_and_carry: data.cash_and_carry,
            barcode: data.barcode,
            is_controlled: data.is_controlled,
            use_flat_fee: data.use_flat_fee,
            dispensation: data.dispensation,
            images: data.product_images,
            batches: data.subproducts.map(sub => ({
                ...sub,
                expiry_date: sub.expiry_date_form,
            })),
        };

        // Convert image URLs to base64
        formData.value.images.forEach((image, index) => {
            $toBase64(image.url, setPath, index);
        });

        await nextTick();
        reset();

        selectedProduct.value = data;
        products.value = [data];
    } catch (err) {
        error(err);
    } finally {
        disableForm.value = false;
    }
};


const nextStep = (): void => {
    if (currentStep.value < totalSteps.value) {
        currentStep.value++
    }
}

const previousStep = (): void => {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

const closeModal = (): void => {
    emit('close')
}

const cancelForm = (): void => {

}

const submitForm = (): void => {
    disableForm.value = true;

    if (formData.value.subcategory_id === "") {
        formData.value.subcategory_id = null;
    }
    /*if(this.product.batches.length == 0){
        this.$toast.error("Batch information is required!", {
                position: "top-right"
        });
        this.disableForm = false;
    }else{*/
    axios({ url: import.meta.env.VITE_API_URL + 'products/' + props.productId, data: formData.value, method: 'PUT' })
        .then(resp => {
            // formData.value = {
            //     name: "",
            //     description: "",
            //     category_id: "",
            //     subcategory_id: "",
            //     product_type_id: "",
            //     pack_style: "",
            //     quantity_per_pack: 0,
            //     quantity_per_carton: 0,
            //     quantity_available: 0,
            //     quantity_to_warn: 0,
            //     max_quantity_per_sale: 0,
            //     max_quantity_days: 0,
            //     price_per_pack: "",
            //     discount_on_carton: "",
            //     images: [],
            //     generic_name: "",
            //     strength: "",
            //     quantity_per_roll: 0,
            //     manufacturer_id: "",
            //     pack_size: "",
            //     unit_cost: "",
            //     warehouse_id: '',
            //     batches: [],
            //     min_reorder: 1,
            //     for_chemist: true,
            //     is_controlled: false,
            //     cash_and_carry: false,
            //     use_flat_fee: false,
            //     dispensation: 1,
            // }
            showCreateProductSuccessModal.value = true;
        })
        .catch((err) => {
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
        })
        .finally(() => {
            disableForm.value = false;
        });
}

const handleSelectedFiles = (files: File[]) => {
    formData.value.images = files;
};

const getCategories = () => {
    axios.get(import.meta.env.VITE_API_URL + "categories?all=1").then(response => {
        categories.value = response.data
    })
}

const getProductTypes = () => {
    axios.get(import.meta.env.VITE_API_URL + "product_types").then(response => {
        productTypes.value = response.data
    })
}

const getManufacturers = () => {
    axios.get(import.meta.env.VITE_API_URL + "manufacturers").then(response => {
        manufacturers.value = response.data
    })
}

const getWarehouses = () => {
    axios.get(import.meta.env.VITE_API_URL + "warehouses?type=all").then(res => {
        warehouses.value = res.data;
    });
}

// Replace your existing onSearch and onInput functions with these:
const onSearch = (query: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        if (query.length >= 3) {
            product_loading.value = true;
            let fields = `name,description,category_id,subcategory_id,product_type_id,pack_style,quantity_per_pack,quantity_per_carton,quantity_available,quantity_to_warn,max_quantity_per_sale,max_quantity_days,price_per_pack,discount_on_carton,generic_name,strength,quantity_per_roll,manufacturer_id,pack_size,unit_cost,warehouse_id,min_reorder,for_chemist,is_controlled,cash_and_carry,use_flat_fee,dispensation`
            axios.get(import.meta.env.VITE_API_URL + `search_products_typeahead?q=${query}&fields=${fields}`)
                .then(res => {
                    products.value = res.data;
                })
                .catch(err => error(err))
                .finally(() => product_loading.value = false);
        } else {
            products.value = [];
        }
    }, 500);
};

// This handles when user selects an option from dropdown
const onProductSelect = (selected) => {
    if (selected && typeof selected === 'object') {
        // Selected an existing product from the list
        selectedProduct.value = selected;
        formData.value = {
            ...formData.value,
            ...selected
        };
    } else if (selected && typeof selected === 'string') {
        // User created a new product name
        selectedProduct.value = null;
        formData.value.name = selected;
    } else if (!selected) {
        // Cleared selection
        selectedProduct.value = null;
        formData.value.name = "";
    }
};

// This handles the search input (when user types)
const onSearchInput = (query: string) => {
    // Update form data with current search input
    formData.value.name = query;
};

// Add this function to handle custom product names
const createOption = (option) => {
    return {
        id: null,
        name: option,
        isNew: true
    };
};

const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

</script>

<style scoped>
/* Sidebar slide animation */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
}

.slide-enter-to {
    transform: translateX(0);
}

.slide-leave-from {
    transform: translateX(0);
}

.slide-leave-to {
    transform: translateX(100%);
}

/* Fade animation for backdrop */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.modal_title {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.header_text {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
    padding-bottom: 12px;
}

label {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
}

input,
select {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(98, 111, 134, 1);
}

input:focus,
select:focus {
    outline: none;
}

.previous_btn,
.cancel_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
    border-radius: 6px;
}

button.previous_btn:disabled {
    background: rgba(9, 30, 66, 0.03);
    color: rgba(9, 30, 66, 0.31);
}

.approve_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    background: rgba(12, 102, 228, 1);
    color: white;
    border-radius: 6px;
}

.loading_overlay {
    z-index: 999999999;
    background: rgba(0, 0, 0, 0.5);
    color: white
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

/* Overlay fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* Modal slide */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0%);
}
</style>