<template>

    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="More Actions / Supplier's Return" />
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <div class=" min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="true" :columns="columns" pageName="Supplier's Returns" :key="childKey">
                <template v-slot:header_actions>
                    <router-link :to="{ name: 'inbound.suppliers.returns.index.create' }"
                        class="flex items-center gap-x-1 px-2 py-1.5 rounded text-white create_btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                                fill="white" />
                        </svg>

                        <span class="text-xs">Create Supplier's Return</span>
                    </router-link>
                </template>

                <template #column="col">
                    <span v-if="col.props.column.field == 'actions'">
                        <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                            <template #default="{ selectedItem, closeDropdown }">
                                <router-link
                                    :to="{ name: 'inbound.suppliers.returns.index.show', params: { id: selectedItem.id } }"
                                    @click="closeDropdown()" as="li"
                                    class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                            fill="#626F86" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                            fill="#626F86" />
                                    </svg>

                                    View
                                </router-link>
                                <router-link
                                    :to="{ name: 'inbound.suppliers.returns.index.edit', params: { id: selectedItem.id } }"
                                    @click="closeDropdown()" as="li"
                                    class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z"
                                            fill="#626F86" />
                                    </svg>

                                    Edit
                                </router-link>
                                <a :href="getDownloadUrl(selectedItem.id)" target="__blank" @click="closeDropdown()"
                                    as="li"
                                    class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                                            fill="#626F86" />
                                        <path
                                            d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                                            fill="#626F86" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                                            fill="#626F86" />
                                    </svg>

                                    Download Supplier's Return
                                </a>
                                <a :href="getReceiptUrl(selectedItem.id)" target="__blank" @click="closeDropdown()"
                                    as="li"
                                    class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path
                                            d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240zM192 448L192 384C192 366.3 206.3 352 224 352L416 352C433.7 352 448 366.3 448 384L448 448C448 465.7 433.7 480 416 480L224 480C206.3 480 192 465.7 192 448zM216 128L264 128C277.3 128 288 138.7 288 152C288 165.3 277.3 176 264 176L216 176C202.7 176 192 165.3 192 152C192 138.7 202.7 128 216 128zM216 224L264 224C277.3 224 288 234.7 288 248C288 261.3 277.3 272 264 272L216 272C202.7 272 192 261.3 192 248C192 234.7 202.7 224 216 224z" />
                                    </svg>

                                    Receipt
                                </a>

                                <li @click="closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z"
                                            fill="#626F86" />
                                        <path
                                            d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z"
                                            fill="#626F86" />
                                        <path
                                            d="M11 15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15Z"
                                            fill="#626F86" />
                                    </svg>
                                    Activity Logs
                                </li>
                                <!-- <li @click="handleDelete(selectedItem); closeDropdown()"
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z"
                                            fill="#626F86" />
                                    </svg>

                                    Delete
                                </li> -->
                            </template>
                        </TableActionDropdown>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>

            <!-- discard delete supplier's return modal -->
            <UniversalCenteredModal :show="supplierReturnDeleteDialog" @close="supplierReturnDeleteDialog = false">
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
                        You are about to delete this supplier's return <strong>“{{
                            supplierReturnDeleteFormData?.invoice?.doc_no }}”</strong>. This
                        action will permanently remove it from the system.
                    </p>
                </template>

                <template #footer>
                    <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                        <button @click="supplierReturnDeleteDialog = false" type="button" class="cancel_btn">
                            Cancel
                        </button>
                        <button @click="deleteSupplierReturn" type="button" class="text-white delete_btn">
                            Delete Supplier's Return
                        </button>
                    </div>
                </template>
            </UniversalCenteredModal>
        </div>
    </div>

</template>

<script setup lang="ts">
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import { ref, computed } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import dayjs from 'dayjs'
import { TableColumn } from "@/types";
import { useToast } from 'vue-toastification';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import { toLocale } from '@/views/helpers/useLocale.js';
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";



const showToast = ref(false)
const toastMessage = ref("")

const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}

const loading = ref(false)
const authStore = useAuthStore()
const toast = useToast()
const url = computed(() => {
    return import.meta.env.VITE_API_URL + "supplier_returns"
})

const supplierReturnDeleteFormData = ref(null);
const supplierReturnDeleteDialog = ref(false);

const childKey = ref(111);

const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Supplier Name',
        field: 'invoice.purchase_order.supplier.name',
        sortable: false,
    },
    {
        label: 'Invoice No.',
        field: 'invoice.doc_no',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'return_date',
        sortable: true,
        format: (value) => {
            return dayjs(value).format('DD/MM/YYYY');
        }
    },
    {
        label: 'Total',
        field: 'total_amount',
        sortable: false,
        format: (value) => {
            return "₦" + toLocale(value);
        }
    },
    {
        label: 'Actions',
        field: 'actions',
        sortable: false,
    },
])

const getDownloadUrl = (id) => {
    return import.meta.env.VITE_API_URL + "admin/order/return/" + id + "/receipt/" + authStore.user.id;
}

const handleDelete = (supplier_returns) => {
    supplierReturnDeleteFormData.value = supplier_returns;
    supplierReturnDeleteDialog.value = true;
}

const deleteSupplierReturn = () => {
    if (!supplierReturnDeleteFormData || supplierReturnDeleteFormData.value?.id) {
        toast.error("Supplier Return Not Found!");
        return;
    }
    supplierReturnDeleteDialog.value = false;
    loading.value = true;

    axios.delete(import.meta.env.VITE_API_URL + "supplier_returns/" + supplierReturnDeleteFormData.value.id)
        .then(response => {
            showSuccess("Supplier Return Deleted Successfully");
            childKey.value++
        }).catch(err => {
            let errorMessage = "";
            if (err.response.data.error != undefined) {
                errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
            } else errorMessage = "Error deleting supplier return!"
            toast.error(errorMessage);
        })
        .finally(() => loading.value = false)
}

const getReceiptUrl = (id) => {
    return import.meta.env.VITE_API_URL + "admin/order/return/" + id + "/receipt/" + authStore.user?.id;
}

</script>

<style>
.tab_actions button:not(.grey_field) {
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

.discard_merge_alert_footer .delete_btn {
    background: rgb(245, 71, 71);
    color: white;
}
</style>
