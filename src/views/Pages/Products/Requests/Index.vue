<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="disableForm">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <!-- Header -->
        <PageTitle title="Product Movement / Product Requests" />

        <div class="min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="true" :columns="columns" :key="childKey" pageName="ProductRequests">
                <template #column="col">
                    <span v-if="col.props.column.field == 'actions'">
                        <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                            <template #default="{ selectedItem, closeDropdown }">
                                <li @click="viewProductRequest(col.props.row); closeDropdown();"
                                    class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                            fill="#626F86" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                            fill="#626F86" />
                                    </svg>
                                    View Request
                                </li>
                                <li @click="closeDropdown()"
                                    class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.58597 17.829C6.7717 18.0148 6.99221 18.1622 7.23492 18.2628C7.47762 18.3633 7.73776 18.4151 8.00047 18.4151C8.26318 18.4151 8.52332 18.3633 8.76602 18.2628C9.00873 18.1622 9.22924 18.0148 9.41497 17.829L6.58497 15C6.39917 15.1857 6.25178 15.4062 6.15122 15.6489C6.05065 15.8917 5.9989 16.1518 5.9989 16.4145C5.9989 16.6772 6.05065 16.9374 6.15122 17.1801C6.25178 17.4228 6.39917 17.6433 6.58497 17.829H6.58597ZM11.384 5.478C11.8524 5.00875 12.4089 4.63663 13.0216 4.383C13.6342 4.12937 14.2909 3.99921 14.954 4C15.926 4 16.899 4.28 17.742 4.839C17.762 4.813 17.785 4.789 17.808 4.765C17.9043 4.66644 18.0197 4.58862 18.1472 4.53633C18.2747 4.48405 18.4116 4.45841 18.5493 4.46099C18.6871 4.46357 18.8229 4.49432 18.9484 4.55134C19.0738 4.60837 19.1863 4.69046 19.2788 4.79256C19.3713 4.89467 19.442 5.01463 19.4864 5.14507C19.5309 5.27551 19.5482 5.41366 19.5372 5.55103C19.5263 5.68839 19.4873 5.82206 19.4228 5.94382C19.3583 6.06558 19.2695 6.17284 19.162 6.259C19.8046 7.22976 20.0919 8.3928 19.9752 9.55112C19.8586 10.7094 19.3452 11.7918 18.522 12.615L17.797 13.34C17.015 14.123 15.984 15.55 15.485 16.547L13.976 19.563C13.727 20.063 13.203 20.147 12.805 19.75L4.24897 11.195C3.85197 10.798 3.94097 10.271 4.43597 10.023L7.45297 8.515C8.44197 8.021 9.87297 6.989 10.659 6.203L11.384 5.478ZM14.123 15.108C14.64 14.133 15.691 12.712 16.477 11.926L17.202 11.2C17.6984 10.7032 18.0081 10.0502 18.0786 9.35144C18.1491 8.65266 17.9762 7.95096 17.589 7.365C17.399 7.079 16.871 6.599 16.73 6.505C16.2308 6.17484 15.6454 5.99918 15.047 6C14.6466 5.99937 14.25 6.07785 13.88 6.23093C13.51 6.384 13.1739 6.60866 12.891 6.892L11.941 7.843C11.157 8.628 9.72197 9.663 8.73997 10.154L6.99997 11.024L13.07 17.093L14.123 15.108Z"
                                            fill="#626F86" />
                                    </svg>

                                    Notify Requester
                                </li>
                                <li @click="showDeleteWarning(col.props.row); closeDropdown()"
                                    class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z"
                                            fill="#626F86" />
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

        <!-- product request detail modal -->
        <SideBarModal title="Product Request Details" :is-open="isViewProductRequestModalOpen" width="xl"
            @update:is-open="isViewProductRequestModalOpen = $event" :initial-form-data="productRequestFormData"
            @close="isViewProductRequestModalOpen = false">
            <!-- Main content -->
            <template #default="{ formData, updateFormData }">
                <div class="space-y-6">

                    <div class="grid grid-cols-2 gap-3">
                        <span class="key">Item Request</span>
                        <span class="capitalize value">{{ formData.description }}</span>
                        <span class="key">Requester’s Name</span>
                        <span class="capitalize value">{{ formData.user.name }}</span>
                        <span class="key">Phone</span>
                        <span class="flex items-center capitalize value" v-if="formData.user.phone">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z"
                                    fill="#091E42" fill-opacity="0.31" />
                            </svg>

                            {{ formData.user.phone }}
                        </span>
                        <span v-else class="value">N/A</span>
                        <span class="key">Email</span>
                        <span class="capitalize value">{{ formData.user.phone ?? 'N/A' }}</span>
                        <span class="key">Date</span>
                        <span class="capitalize value">{{ dayjs(formData.created_at).format('DD/MM/YYYY') }}</span>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click.prevent="closeModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="notifyRequester(formData)" type="button"
                        class="flex items-center approve_btn gap-x-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.58597 17.829C6.7717 18.0148 6.99221 18.1622 7.23492 18.2628C7.47762 18.3633 7.73776 18.4151 8.00047 18.4151C8.26318 18.4151 8.52332 18.3633 8.76602 18.2628C9.00873 18.1622 9.22924 18.0148 9.41497 17.829L6.58497 15C6.39917 15.1857 6.25178 15.4062 6.15122 15.6489C6.05065 15.8917 5.9989 16.1518 5.9989 16.4145C5.9989 16.6772 6.05065 16.9374 6.15122 17.1801C6.25178 17.4228 6.39917 17.6433 6.58497 17.829H6.58597ZM11.384 5.478C11.8524 5.00875 12.4089 4.63663 13.0216 4.383C13.6342 4.12937 14.2909 3.99921 14.954 4C15.926 4 16.899 4.28 17.742 4.839C17.762 4.813 17.785 4.789 17.808 4.765C17.9043 4.66644 18.0197 4.58862 18.1472 4.53633C18.2747 4.48405 18.4116 4.45841 18.5493 4.46099C18.6871 4.46357 18.8229 4.49432 18.9484 4.55134C19.0738 4.60837 19.1863 4.69046 19.2788 4.79256C19.3713 4.89467 19.442 5.01463 19.4864 5.14507C19.5309 5.27551 19.5482 5.41366 19.5372 5.55103C19.5263 5.68839 19.4873 5.82206 19.4228 5.94382C19.3583 6.06558 19.2695 6.17284 19.162 6.259C19.8046 7.22976 20.0919 8.3928 19.9752 9.55112C19.8586 10.7094 19.3452 11.7918 18.522 12.615L17.797 13.34C17.015 14.123 15.984 15.55 15.485 16.547L13.976 19.563C13.727 20.063 13.203 20.147 12.805 19.75L4.24897 11.195C3.85197 10.798 3.94097 10.271 4.43597 10.023L7.45297 8.515C8.44197 8.021 9.87297 6.989 10.659 6.203L11.384 5.478ZM14.123 15.108C14.64 14.133 15.691 12.712 16.477 11.926L17.202 11.2C17.6984 10.7032 18.0081 10.0502 18.0786 9.35144C18.1491 8.65266 17.9762 7.95096 17.589 7.365C17.399 7.079 16.871 6.599 16.73 6.505C16.2308 6.17484 15.6454 5.99918 15.047 6C14.6466 5.99937 14.25 6.07785 13.88 6.23093C13.51 6.384 13.1739 6.60866 12.891 6.892L11.941 7.843C11.157 8.628 9.72197 9.663 8.73997 10.154L6.99997 11.024L13.07 17.093L14.123 15.108Z"
                                fill="white" />
                        </svg>

                        Notify Requester
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- delete product request warning confirmation -->
        <UniversalCenteredModal :show="showDeleteProductRequestWarningModal"
            @close="showDeleteProductRequestWarningModal = false">
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
                    You are about to delete this product request <strong>“{{ deleteProductRequestFormData.description
                        }}”</strong>. This action will permanently remove it from the system.

                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDeleteProductRequestWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteRequest" type="button" class="delete_btn">
                        Delete Product Request
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import dayjs from 'dayjs'
import { TableColumn } from "@/types";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';



const toast = useToast();
const childKey = ref(111);
const disableForm = ref(false);
const showDeleteProductRequestWarningModal = ref(false);
const url = computed(() => import.meta.env.VITE_API_URL + 'product_requests')
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Item Request',
        field: 'description',
        sortable: false,
    },
    {
        label: 'Requester\'s Name',
        field: 'user.name',
        sortable: false,

    },
    {
        label: 'Date Requested',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Actions',
        field: 'actions',
        sortable: false,
    }
]);
const isViewProductRequestModalOpen = ref(false);
const productRequestFormData = ref({
    description: "",
    created_at: "",
    user: {
        name: "",
        user_type: "",
        phone: "",
        email: ""
    }
});

const deleteProductRequestFormData = ref({
    id: 0,
    description: "",
    created_at: "",
    user: {
        name: "",
        user_type: "",
        phone: "",
        email: ""
    }
});
const showToast = ref(false)
const toastMessage = ref("Batch shelf update successful")

const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}

const notifyRequester = (product_request) => {
    console.log('notifyRequester', product_request);
}
const showDeleteWarning = (productRequest) => {
    deleteProductRequestFormData.value = productRequest;
    showDeleteProductRequestWarningModal.value = true;
}

const deleteRequest = (id) => {
    if (deleteProductRequestFormData.value.id <= 0) {
        toast.error("No product request selected for deletion")
        return;
    }

    disableForm.value = true;
    axios.delete(import.meta.env.VITE_API_URL + "product_requests/" + deleteProductRequestFormData.value.id).then(response => {
        showSuccess("Product request Deleted Successfully");
        childKey.value++;
    }).catch(err => {
        let errorMessage = '';
        if (err.response.data.error != undefined) {
            if (Array.isArray(err.response.data.error)) {
                errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
            } else {
                errorMessage = "<p>" + err.response.data.error + "</p>";
            }
        } else {
            errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
        }
        toast.error(errorMessage);
    })
        .finally(() => disableForm.value = false)
}

const viewProductRequest = (product_request) => {
    productRequestFormData.value = product_request;
    isViewProductRequestModalOpen.value = true;
}
</script>

<style>
.key {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.value {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
    text-align: right;
}

.grey_field {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
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
