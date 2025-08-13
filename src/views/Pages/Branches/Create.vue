<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- create branch modal -->
    <SideBarModal title="Create Branch" :is-open="isCreateBranchModalOpen" width="lg"
        :initial-form-data="createBranchFormData" @close="closeModal" @update:is-open="isCreateBranchModalOpen = $event"
        ref="createBranchModal">

        <!-- Main content -->
        <template #default="{ formData, updateFormData, isEditItem }">
            <div class="space-y-6">

                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">Branch Name</label>
                    <input type="text" v-model="createBranchFormData.name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Enter a branch name">
                </div>
                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">Address</label>
                    <input type="text" v-model="createBranchFormData.address"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Enter a branch address">
                </div>

                <!-- Select State -->
                <MultiSelect :options="states" label="name" placeholder="Type to search for state..." tag="States"
                    @update:model-value="statesUpdated">
                    <template #label>
                        <label class="block mb-1 text-xs font-medium text-gray-700">State</label>
                    </template>
                </MultiSelect>
                <!-- <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">State</label>
                    <v-select :options="states" label="name" v-model="createBranchFormData.states"
                        :reduce="state => state.id" multiple placeholder="Select a state">
                    </v-select>
                </div> -->


                <div class="flex items-center gap-2">
                    <input type="checkbox" v-model="createBranchFormData.use_order_fulfilment"
                        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" id="order_fulfilment">
                    <label for="order_fulfilment" class="text-xs font-medium text-gray-700" style="margin: 0;">Use Order
                        Fulfillment</label>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" v-model="createBranchFormData.has_barcode"
                        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" id="barcode_scanning">
                    <label for="barcode_scanning" class="text-xs font-medium text-gray-700" style="margin: 0;">Use
                        Barcode
                        Scanning</label>
                </div>



            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="handleShowDiscardWarningModal" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="createBranch" type="button" class="approve_btn">
                    Create
                </button>
            </div>
        </template>
    </SideBarModal>


    <!-- discard create branch modal -->
    <UniversalCenteredModal :show="showDiscardCreateBranchModal" @close="showDiscardCreateBranchModal = false">
        <template #header>
            <span class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0606 4.96699C11.5766 3.99299 12.4186 3.98899 12.9366 4.96699L20.0606 18.425C20.5766 19.399 20.1056 20.196 19.0036 20.196H4.99361C3.89161 20.196 3.41861 19.403 3.93661 18.425L11.0606 4.96699ZM11.2915 14.7071C11.479 14.8946 11.7334 15 11.9986 15C12.2638 15 12.5182 14.8946 12.7057 14.7071C12.8933 14.5196 12.9986 14.2652 12.9986 14V8.99998C12.9986 8.73477 12.8933 8.48041 12.7057 8.29288C12.5182 8.10534 12.2638 7.99998 11.9986 7.99998C11.7334 7.99998 11.479 8.10534 11.2915 8.29288C11.104 8.48041 10.9986 8.73477 10.9986 8.99998V14C10.9986 14.2652 11.104 14.5196 11.2915 14.7071ZM11.2915 17.7071C11.479 17.8946 11.7334 18 11.9986 18C12.2638 18 12.5182 17.8946 12.7057 17.7071C12.8933 17.5196 12.9986 17.2652 12.9986 17C12.9986 16.7348 12.8933 16.4804 12.7057 16.2929C12.5182 16.1053 12.2638 16 11.9986 16C11.7334 16 11.479 16.1053 11.2915 16.2929C11.104 16.4804 10.9986 16.7348 10.9986 17C10.9986 17.2652 11.104 17.5196 11.2915 17.7071Z"
                        fill="#E56910" />
                </svg>


                <h3>Discard Changes?</h3>
            </span>
        </template>

        <template #body>
            <p class="discard_merge_alert_body_text">
                You are about to leave the <strong>"Create Branch"</strong> process. Any unsaved information will be
                lost.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showDiscardCreateBranchModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="discardChanges" type="button" class="discard_btn">
                    Discard Changes
                </button>
            </div>
        </template>
    </UniversalCenteredModal>

    <!-- created branch success message modal -->
    <UniversalCenteredModal :show="showCreateBranchSuccessModal" @close="closeBranchCreatedSuccessModal">
        <template #body>
            <div class="flex justify-center my-6">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
                        fill="#22A06B" />
                    <path
                        d="M18.7827 28.5635C18.4668 28.2275 18.031 28.0298 17.57 28.0134C17.1091 27.997 16.6603 28.1632 16.3213 28.476C15.9822 28.7887 15.7804 29.2226 15.7596 29.6834C15.7388 30.1442 15.9008 30.5945 16.2102 30.9365L22.5312 37.7947C23.471 38.7152 24.871 38.7152 25.7407 37.8472L26.3777 37.219C28.6782 34.9566 30.9759 32.6915 33.271 30.4237L33.341 30.3537C35.486 28.2399 37.6198 26.1147 39.7425 23.9785C40.0597 23.6463 40.2337 23.2028 40.2268 22.7435C40.2199 22.2842 40.0327 21.8461 39.7056 21.5236C39.3786 21.2011 38.9378 21.0202 38.4785 21.0198C38.0192 21.0194 37.5781 21.1996 37.2505 21.5215C35.1377 23.6466 33.0143 25.7612 30.8805 27.8652L30.8105 27.9352C28.6112 30.1093 26.4091 32.2804 24.2042 34.4487L18.7827 28.5635Z"
                        fill="white" />
                </svg>
            </div>
            <h3 class="text-center">Branch Created</h3>
            <p class="text-center discard_merge_alert_body_text">
                The branch <strong>“{{ createBranchFormData.name }}”</strong> has been successfully added to the
                system.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">

                <button @click="closeBranchCreatedSuccessModal" type="button" class="text-white approve_btn">
                    Done
                </button>
            </div>
        </template>
    </UniversalCenteredModal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'

import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import axios from 'axios';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import MultiSelect from '@/views/Components/MultiSelect.vue';
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';


interface Props {
    isOpen: boolean
}

onMounted(() => {
    getStates();
})

const props = defineProps<Props>();
const emit = defineEmits(['created', 'close', 'discarded']);

watch(() => props.isOpen, (newVal, oldVal) => {
    isCreateBranchModalOpen.value = newVal
});

const isCreateBranchModalOpen = ref(false);
const showCreateBranchSuccessModal = ref(false);
const showDiscardCreateBranchModal = ref(false);
const createBranchModal = ref(null)
// const showCreateBranchSuccessModal = ref(false);
const authStore = useAuthStore();
const toast = useToast();
const createBranchFormData = ref({
    name: '',
    address: '',
    states: [],
    use_order_fulfilment: false,
    has_barcode: false
})
const loading = ref(false);
const states = ref([]);

const { hasChanged, reset } = useDataChangeTracker(createBranchFormData);

const handleShowDiscardWarningModal = () => {
    if (hasChanged.value) {
        showDiscardCreateBranchModal.value = true;
    } else {
        discardChanges();
    }
}

const closeBranchCreatedSuccessModal = async () => {
    createBranchFormData.value = {
        name: '',
        address: '',
        states: [],
        use_order_fulfilment: false,
        has_barcode: false
    };
    await nextTick();
    reset();
    showDiscardCreateBranchModal.value = false;
    showCreateBranchSuccessModal.value = false;
    loading.value = false
    if (isCreateBranchModalOpen.value) {
        createBranchModal.value?.closeModal();
    }

}

const closeModal = () => {
    isCreateBranchModalOpen.value = false;
    emit('close')
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

const createBranch = () => {
    loading.value = true;
    axios.post(import.meta.env.VITE_API_URL + 'branches?current_branch=' + authStore.selectedBranch?.id, createBranchFormData.value)
        .then(res => {
            showCreateBranchSuccessModal.value = true;
            emit('created')
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const getStates = () => {
    axios.get(import.meta.env.VITE_API_URL + "states").then(res => {
        states.value = res.data;
    }).catch(err => {
        toast.error('Error loading states!');
    });
}

const discardChanges = async () => {
    showDiscardCreateBranchModal.value = false;
    createBranchFormData.value = {
        name: '',
        address: '',
        states: [],
        use_order_fulfilment: false,
        has_barcode: false
    }
    await nextTick();
    reset();
    loading.value = false;
    if (isCreateBranchModalOpen.value) {
        createBranchModal.value?.closeModal();
    }
    emit('discarded')
}

const statesUpdated = (selectedStates) => {
    createBranchFormData.value.states = selectedStates.map(state => state.id);
}
</script>

<style>
.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .approve_btn {
    background: rgba(12, 102, 228, 1);
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
</style>
