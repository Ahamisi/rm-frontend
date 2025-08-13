<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- edit warehouse modal -->
    <SideBarModal title="Edit Warehouse" :is-open="isEditWarehouseModalOpen" width="lg" ref="editWarehouseModal"
        @update:is-open="isEditWarehouseModalOpen = $event" :initial-form-data="editWarehouseFormData"
        @close="closeModal">

        <!-- Main content -->
        <template #default>
            <div class="space-y-6">
                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">Warehouse Name</label>
                    <input type="text" v-model="editWarehouseFormData.name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Enter a warehouse name">
                </div>

                <!-- Select State -->
                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">State</label>
                    <v-select :options="states" label="name" v-model="editWarehouseFormData.state_id"
                        :reduce="state => state.id" placeholder="Select a state"
                        @update:modelValue="editWarehouseFormData.lga_id = null">
                    </v-select>
                </div>
                <!-- Select LGA -->
                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">Local Government</label>
                    <v-select :options="lgas" label="name" v-model="editWarehouseFormData.lga_id"
                        :reduce="lga => lga.id" placeholder="Select a local government">
                    </v-select>
                </div>


            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="handleShowDiscardWarehouseWarningModal" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="editWarehouse" type="button" class="approve_btn">
                    Update
                </button>
            </div>
        </template>
    </SideBarModal>


    <!-- discard create warehouse modal -->
    <UniversalCenteredModal :show="showDiscardEditWarehouseModal" @close="showDiscardEditWarehouseModal = false">
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
                You are about to leave the <strong>"Edit Warehouse"</strong> process. Any unsaved information will be
                lost.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showDiscardEditWarehouseModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="discardChanges" type="button" class="discard_btn">
                    Discard Changes
                </button>
            </div>
        </template>
    </UniversalCenteredModal>

    <!-- created warehouse success message modal -->
    <UniversalCenteredModal :show="showCreateWarehouseSuccessModal" @close="closeWarehouseUpdatedSuccessModal">
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
            <h3 class="text-center">Warehouse Updated</h3>
            <p class="text-center discard_merge_alert_body_text">
                The warehouse <strong>“{{ editWarehouseFormData.name }}”</strong> has been successfully updated in the
                system.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">

                <button @click="closeWarehouseUpdatedSuccessModal" type="button" class="text-white approve_btn">
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
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker';

interface Props {
    isOpen: boolean,
    warehouse: {
        id: number,
        name: string,
        state_id: number,
        lga_id: number
    }
}

const emit = defineEmits(['updated', 'discarded', 'close']);

const props = defineProps<Props>();

onMounted(() => {
    getStates();
})

watch(() => props.isOpen, (newVal, oldVal) => {
    isEditWarehouseModalOpen.value = newVal;
});

watch(() => props.warehouse, async (newVal, oldVal) => {
    if (newVal.id) {
        editWarehouseFormData.value = newVal;
        await nextTick()
        reset()
    }
});

const authStore = useAuthStore();
const toast = useToast();
const loading = ref(false)
const editWarehouseModal = ref(null)
const isEditWarehouseModalOpen = ref(false)
const showDiscardEditWarehouseModal = ref(false)
const showCreateWarehouseSuccessModal = ref(false)
const states = ref([]);
const editWarehouseFormData = ref({
    id: 0,
    name: '',
    state_id: 0,
    lga_id: 0
})

const { hasChanged, reset } = useDataChangeTracker(editWarehouseFormData);

const handleShowDiscardWarehouseWarningModal = () => {
    if (hasChanged.value) {
        showDiscardEditWarehouseModal.value = true;
    } else {
        discardChanges()
    }
}

const lgas = computed(() => {
    if (editWarehouseFormData.value.state_id) {
        return states.value.find(state => state.id == editWarehouseFormData.value.state_id)?.lgas ?? [];
    }
    return [];
})

const discardChanges = async () => {
    if (isEditWarehouseModalOpen.value) editWarehouseModal.value?.closeModal();
    showDiscardEditWarehouseModal.value = false;
    editWarehouseFormData.value = {
        id: 0,
        name: '',
        state_id: 0,
        lga_id: 0
    }
    await nextTick();
    reset();
    loading.value = false;
    // lgas.value = [];
    emit('discarded')
}

const getStates = () => {
    axios.get(import.meta.env.VITE_API_URL + "states").then(res => {
        states.value = res.data;
    }).catch(err => {
        toast.error('Error loading states!');
    });
}

const closeModal = () => {
    if (isEditWarehouseModalOpen.value) editWarehouseModal.value?.closeModal()
    emit('close')
}

const closeWarehouseUpdatedSuccessModal = async () => {
    editWarehouseFormData.value = {
        id: 0,
        name: '',
        state_id: 0,
        lga_id: 0
    };
    await nextTick();
    reset()
    showDiscardEditWarehouseModal.value = false;
    showCreateWarehouseSuccessModal.value = false;
    loading.value = false
    if (isEditWarehouseModalOpen) editWarehouseModal.value?.closeModal()
}

const editWarehouse = () => {
    if (!editWarehouseFormData.value.id) return;
    loading.value = true;
    axios.put(import.meta.env.VITE_API_URL + `warehouses/${editWarehouseFormData.value.id}?current_branch=${authStore.selectedBranch?.id}`, editWarehouseFormData.value)
        .then(res => {
            showCreateWarehouseSuccessModal.value = true;
            emit('updated')
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
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

// const stateChanged = (state_id) => {
//     for (let index = 0; index < states.value.length; index++) {
//         if (states.value[index].id == state_id) {
//             lgas.value = states.value[index].lgas;
//             break;
//         }
//     }
// }
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
