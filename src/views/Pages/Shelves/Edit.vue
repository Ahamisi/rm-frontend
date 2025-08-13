<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>

    <!-- edit shelve modal -->
    <SideBarModal title="Edit Shelve" :is-open="isEditShelveModalOpen" width="lg" ref="editShelfModal"
        @update:is-open="isEditShelveModalOpen = $event" :initial-form-data="editShelveFormData" @close="closeModal">

        <!-- Main content -->
        <template #default>
            <div class="space-y-6">

                <div>
                    <label class="block mb-1 text-xs font-medium text-gray-700">Shelf Name</label>
                    <input type="text" v-model="editShelveFormData.name" placeholder="Enter a shelf name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
                </div>

                <div v-if="authStore.hasBarcodeScanning">
                    <label class="">Barcode</label>
                    <div class="relative">
                        <input v-model="editShelveFormData.barcode" type="text" placeholder="Scan barcode"
                            :readonly="!scanning" @keypress="handlePress" id="shelve_barcode"
                            class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <button @click="scanBarcode" type="button" v-if="!scanning"
                            class="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2 6.994C2 5.893 2.898 5 3.99 5H20.01C21.108 5 22 5.895 22 6.994V19.006C21.9992 19.5339 21.7894 20.04 21.4165 20.4137C21.0436 20.7873 20.5379 20.9981 20.01 21H3.99C3.46185 20.9989 2.9557 20.7884 2.58261 20.4146C2.20953 20.0407 2 19.5341 2 19.006V6.994ZM4 7V19H20V7H4Z"
                                    fill="#44546F" />
                                <path
                                    d="M12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17ZM12 15C11.4696 15 10.9609 14.7893 10.5858 14.4142C10.2107 14.0391 10 13.5304 10 13C10 12.4696 10.2107 11.9609 10.5858 11.5858C10.9609 11.2107 11.4696 11 12 11C12.5304 11 13.0391 11.2107 13.4142 11.5858C13.7893 11.9609 14 12.4696 14 13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15Z"
                                    fill="#44546F" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8 4C8 3.448 8.453 3 8.997 3H15.003C15.553 3 16 3.444 16 4V5H8V4Z"
                                    fill="#44546F" />
                                <path
                                    d="M19 9C19 8.44772 18.5523 8 18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9Z"
                                    fill="#44546F" />
                            </svg>

                        </button>
                        <button @click="scanBarcode" type="button" v-else
                            class="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                            </svg>

                        </button>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">
                        Click camera icon to scan
                    </p>
                </div>


            </div>
        </template>

        <!-- Footer buttons -->
        <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
            <div class="flex justify-end space-x-3">
                <button @click="handleShowDiscardShelfWarningModal" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="editShelve" type="button" class="approve_btn">
                    Update
                </button>
            </div>
        </template>
    </SideBarModal>


    <!-- discard create shelve modal -->
    <UniversalCenteredModal :show="showDiscardEditShelveModal" @close="showDiscardEditShelveModal = false">
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
                You are about to leave the <strong>"Edit Shelve"</strong> process. Any unsaved information will be
                lost.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                <button @click="showDiscardEditShelveModal = false" type="button" class="cancel_btn">
                    Cancel
                </button>
                <button @click="discardChanges" type="button" class="discard_btn">
                    Discard Changes
                </button>
            </div>
        </template>
    </UniversalCenteredModal>

    <!-- created shelve success message modal -->
    <UniversalCenteredModal :show="showCreateShelveSuccessModal" @close="closeShelveUpdatedSuccessModal">
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
            <h3 class="text-center">Shelve Updated</h3>
            <p class="text-center discard_merge_alert_body_text">
                The shelve <strong>“{{ editShelveFormData.name }}”</strong> has been successfully updated in the
                system.
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3 discard_merge_alert_footer">

                <button @click="closeShelveUpdatedSuccessModal" type="button" class="text-white approve_btn">
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
import { useDataChangeTracker } from '@/views/Composables/useDataChangeTracker.ts';

interface Props {
    isOpen: boolean,
    shelve: {
        id: number,
        name: string
        barcode: string | null
    }
}

const emit = defineEmits(['updated', 'close', 'discarded']);

const props = defineProps<Props>();

watch(() => props.isOpen, (newVal, oldVal) => {
    Object.assign(isEditShelveModalOpen.value, newVal)
});

watch(() => props.shelve, async (newVal, oldVal) => {
    if (newVal.id) {
        editShelveFormData.value = newVal;
        await nextTick();
        reset()
    }
});

const authStore = useAuthStore();
const toast = useToast();
const editShelfModal = ref(null)
const scanning = ref(false);
const loading = ref(false)
const isEditShelveModalOpen = ref(false)
const showDiscardEditShelveModal = ref(false)
const showCreateShelveSuccessModal = ref(false)
const editShelveFormData = ref({
    id: 0,
    name: '',
    barcode: ''
})

const { hasChanged, reset } = useDataChangeTracker(editShelveFormData);

const handleShowDiscardShelfWarningModal = () => {
    if (hasChanged.value) {
        showDiscardEditShelveModal.value = true;
    } else {
        discardChanges()
    }
}

const discardChanges = async () => {
    if (isEditShelveModalOpen.value) editShelfModal.value?.closeModal();
    showDiscardEditShelveModal.value = false;
    editShelveFormData.value = {
        id: 0,
        name: '',
        barcode: ''
    }
    await nextTick();
    reset()
    loading.value = false;
    emit('discarded');
}

const closeModal = () => {
    if (isEditShelveModalOpen.value) editShelfModal.value?.closeModal();
    emit('close');
}

const scanBarcode = () => {
    scanning.value = true;
    let input = document.getElementById('shelve_barcode');
    input.focus();
}

const closeShelveUpdatedSuccessModal = async () => {
    editShelveFormData.value = {
        id: 0,
        name: '',
        barcode: ''
    };
    await nextTick();
    reset()
    showDiscardEditShelveModal.value = false;
    showCreateShelveSuccessModal.value = false;
    loading.value = false
    if (isEditShelveModalOpen.value) editShelfModal.value?.closeModal();
}

const editShelve = () => {
    if (!editShelveFormData.value.id) return;
    loading.value = true;
    axios.put(import.meta.env.VITE_API_URL + `shelves/${editShelveFormData.value.id}?current_branch=${authStore.selectedBranch?.id}`, editShelveFormData.value)
        .then(res => {
            showCreateShelveSuccessModal.value = true;
            emit('updated')
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}



const handlePress = (e) => {
    if (scanning.value && e.key === 'Enter') {
        e.preventDefault();
        stopBarcodeScan();
    }
}

const stopBarcodeScan = () => {
    scanning.value = false;
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
