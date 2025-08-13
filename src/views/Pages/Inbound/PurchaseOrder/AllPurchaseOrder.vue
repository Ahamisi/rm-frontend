<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    v-if="loading">
    <LoadingState />
  </div>
  <div>
    <!-- Success Toast Modal -->
    <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

    <Datatable :url="all_purchase_order_url" :filterByDate="true" :columns="allPurchaseOrderColumns" :key="childKey"
      pageName="AllPurchaseOrders" :filterFields="filterField">
      <template #column="col">
        <span v-if="col.props.column.field === 'is_invoiced'">
          <!-- <Tooltip :text="`'${col.props.row.is_invoiced}'`"> -->
          <span :class="[
            'rounded-md line-clamp-2 w-fit status',
            statusClasses[
            col.props.row.is_invoiced
              ? 'Enabled'
              : 'Disabled'
            ] || 'bg-gray-100 text-gray-800',
          ]">
            {{
              col.props.row.is_invoiced
                ? "Invoiced"
                : "Not Invoiced"
            }}
          </span>
          <!-- </Tooltip> -->
        </span>
        <span v-else-if="col.props.column.field === 'status'" class="text-center">
          <!-- <Tooltip :text="`'${col.props.row.status}'`"> -->
          <span :class="[
            'rounded-md line-clamp-2 w-fit status',
            statusClasses[
            col.props.row.status
              ? 'Enabled'
              : 'Disabled'
            ] || 'bg-gray-100 text-gray-800',
          ]">
            {{
              col.props.row.status
                ? "Approved"
                : "Not Approved"
            }}
          </span>
          <!-- </Tooltip> -->
        </span>
        <span v-else-if="col.props.column.field === 'assigned_to'">
          <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
          <span v-else class="flex items-center">
            <img v-if="
              col.props.row.assigned_to &&
              col.props.row.assigned &&
              col.props.row.assigned.picture_url
            " :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
              <defs>
                <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                </pattern>
                <image id="image0_8145_14006" width="128" height="128" preserveAspectRatio="none"
                  xlink:href="data:image/png;base64,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" />
              </defs>
            </svg>
            <span class="ml-2">{{
              col.props.row.assigned?.name
            }}</span>
          </span>
        </span>
        <span v-else-if="col.props.column.field === 'actions'">
          <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
            <template #default="{ selectedItem, closeDropdown }">
              <router-link v-if="!selectedItem.is_invoiced" :to="{
                name: 'inbound.purchase_orders.edit',
                params: { id: selectedItem.id },
              }" @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucidePen class="w-4 h-4" />
                Edit Purchase Order
              </router-link>
              <router-link :to="{
                name: 'inbound.purchase_orders.show',
                params: { id: selectedItem.id },
              }" @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideEye class="w-4 h-4" />
                View Purchase Order
              </router-link>
              <router-link :to="{
                name: 'inbound.purchase_orders.edit',
                params: { id: selectedItem.id },
                query: { approve: 1 },
              }" v-if="!selectedItem.status" @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideCheck class="w-4 h-4" />
                Approve
              </router-link>
              <li @click="
                openDeletePurchaseOrderWarningModal(col.props.row);
              closeDropdown();
              " class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideTrash class="w-4 h-4" />
                Delete
              </li>
              <li v-if="col.props.row.assigned_to == null" @click="
                assign(col.props.row.id);
              closeDropdown();
              "
                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6.5C20 5.94772 19.5523 5.5 19 5.5C18.4477 5.5 18 5.94772 18 6.5V10.5C18 11.0523 18.4477 11.5 19 11.5C19.5523 11.5 20 11.0523 20 10.5V6.5Z"
                    fill="#626F86" />
                  <path
                    d="M21 7.5H17C16.4477 7.5 16 7.94772 16 8.5C16 9.05228 16.4477 9.5 17 9.5H21C21.5523 9.5 22 9.05228 22 8.5C22 7.94772 21.5523 7.5 21 7.5Z"
                    fill="#626F86" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                    fill="#626F86" />
                  <path
                    d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                    fill="#626F86" />
                </svg>
                Assign to me
              </li>
              <!-- <li v-if="col.props.row.assigned_to != null && (!col.props.row.is_invoiced || !col.props.row.status)" -->
              <li v-if="col.props.row.assigned_to != null" @click="
                unassign(col.props.row.id);
              closeDropdown();
              "
                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer hover:bg-gray-100 medium-text border-y">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.99 6.5C20.9909 6.62978 20.9661 6.75846 20.917 6.8786C20.8679 6.99874 20.7955 7.10798 20.704 7.2L19.371 8.469L20.655 9.769C20.7934 9.88673 20.8964 10.0406 20.9526 10.2133C21.0088 10.3861 21.0159 10.5711 20.9732 10.7477C20.9305 10.9243 20.8396 11.0856 20.7107 11.2137C20.5818 11.3417 20.4199 11.4315 20.243 11.473C20.0663 11.5152 19.8814 11.5079 19.7085 11.452C19.5357 11.3961 19.3815 11.2937 19.263 11.156L17.287 9.187C17.1034 9.00291 17.0003 8.75351 17.0003 8.4935C17.0003 8.23349 17.1034 7.98409 17.287 7.8L19.322 5.772C19.463 5.63804 19.6403 5.54858 19.8319 5.51479C20.0234 5.481 20.2207 5.50437 20.399 5.582C20.764 5.742 20.996 6.104 20.99 6.5ZM5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                    fill="#626F86" />
                  <path
                    d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                    fill="#626F86" />
                </svg>
                Unassign
              </li>
              <router-link as="li" :to="{ name: 'inbound.purchase_order.grn.create', params: { id: selectedItem.id } }"
                v-if="!col.props.row.is_invoiced && col.props.row.status" @click="closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 border-b border-gray-400 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                    fill="#626F86" />
                </svg>
                Add GRN
              </router-link>
              <li @click="
                openActivityLogModal(col.props.row);
              closeDropdown();
              " class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17 10.505V19.5H7V5.5H12.99V7.99C12.99 8.38782 13.148 8.76936 13.4293 9.05066C13.7106 9.33196 14.0922 9.49 14.49 9.49H18.99V8.968C18.99 8.671 18.858 8.39 18.631 8.2L13.557 3.964C13.197 3.664 12.744 3.5 12.275 3.5H7C6.46957 3.5 5.96086 3.71071 5.58579 4.08579C5.21071 4.46086 5 4.96957 5 5.5V19.5C5 20.0304 5.21071 20.5391 5.58579 20.9142C5.96086 21.2893 6.46957 21.5 7 21.5H17C17.5304 21.5 18.0391 21.2893 18.4142 20.9142C18.7893 20.5391 19 20.0304 19 19.5V10.505H17Z"
                    fill="#626F86" />
                  <path
                    d="M15 12.5H9C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H15C15.5523 14.5 16 14.0523 16 13.5C16 12.9477 15.5523 12.5 15 12.5Z"
                    fill="#626F86" />
                  <path
                    d="M11 15.5H9C8.44772 15.5 8 15.9477 8 16.5C8 17.0523 8.44772 17.5 9 17.5H11C11.5523 17.5 12 17.0523 12 16.5C12 15.9477 11.5523 15.5 11 15.5Z"
                    fill="#626F86" />
                </svg>
                Activity Log
              </li>
              <a :href="col.props.row.download_url" target="__blank" @click="closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.687 17.792C10.5956 17.6997 10.4868 17.6264 10.3669 17.5764C10.247 17.5264 10.1184 17.5007 9.9885 17.5007C9.8586 17.5007 9.72998 17.5264 9.61009 17.5764C9.49019 17.6264 9.3814 17.6997 9.29 17.792C9.10466 17.9792 9.0007 18.232 9.0007 18.4955C9.0007 18.759 9.10466 19.0118 9.29 19.199L11.254 21.179C11.3546 21.2807 11.4744 21.3613 11.6064 21.4164C11.7384 21.4715 11.88 21.4998 12.023 21.4998C12.166 21.4998 12.3076 21.4715 12.4396 21.4164C12.5716 21.3613 12.6914 21.2807 12.792 21.179L14.711 19.246C14.8966 19.0587 15.0008 18.8057 15.0008 18.542C15.0008 18.2783 14.8966 18.0253 14.711 17.838C14.6196 17.7455 14.5107 17.6721 14.3907 17.622C14.2708 17.5719 14.142 17.5462 14.012 17.5462C13.882 17.5462 13.7532 17.5719 13.6333 17.622C13.5133 17.6721 13.4044 17.7455 13.313 17.838L12.023 19.138L10.687 17.792Z"
                    fill="#626F86" />
                  <path
                    d="M13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 11 9.95 11 10.507L11.001 20.494C11.001 21.049 11.449 21.5 12.001 21.5C12.553 21.5 13.001 21.05 13.001 20.493Z"
                    fill="#626F86" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.938 5.98C7.68111 5.9383 7.42125 5.91757 7.161 5.918C4.356 5.918 2 8.12 2 10.998C2 13.909 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.962 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.492C13.9871 5.50203 14.9543 5.87742 15.703 6.54812C16.4517 7.21882 16.9309 8.13901 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.165 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.52 9.075 4.4 7.938 5.98Z"
                    fill="#626F86" />
                </svg>
                Download Purchase Order
              </a>
            </template>
          </TableActionDropdown>
        </span>
        <span v-else>
          {{ col.props.formattedRow[col.props.column.field] }}
        </span>
      </template>
    </Datatable>

    <ActivityLogModal v-model:isOpen="isModalOpen" :purchaseOrderId="selectedPurchaseOrderId"
      @close="handleModalClose" />

    <!-- delete purchase order warning modal -->
    <UniversalCenteredModal :show="showDeletePurchaseOrderWarningModal"
      @close="showDeletePurchaseOrderWarningModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
              fill="#C9372C" />
          </svg>

          <h3>Delete Purchase Order?</h3>
        </span>
      </template>

      <template #body>
        <p class="discard_merge_alert_body_text">
          You are about to delete this purchase order <strong>"{{ deletePurchaseOrderFormData.order_no }}"</strong>.
          This action will
          remove this purchase order from the system and can't be reversed.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showDeletePurchaseOrderWarningModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="deletePurchaseOrder" type="button" class="delete_btn">
            Delete Purchase Order
          </button>
        </div>
      </template>
    </UniversalCenteredModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import dayjs from "dayjs";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from "@/views/helpers/useLocale.js";
import { useToast } from "vue-toastification";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { TableColumn, FilterField, FilterFieldOption, FilterFields } from "@/types";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import axios from "axios";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import ActivityLogModal from "./modal/ActivityLogModal.vue";
import { useAuthStore } from "@/stores/auth";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";
import { LucidePen, LucideEye, LucideCheck, LucideTrash } from "lucide-vue-next";

onMounted(() => {
  fetchInboundType();
})

const toast = useToast();
const toastMessage = ref("");
const showToast = ref(false);
const showDeletePurchaseOrderWarningModal = ref(false);
const all_purchase_order_url = import.meta.env.VITE_API_URL + "purchase_orders/all";
const loading = ref<boolean>(false);
const assigning = ref<boolean>(false);
const childKey = ref<number>(11111);
const authStore = useAuthStore();
const filterField = ref<FilterFields<FilterField>>({
  "status": {
    label: "Status",
    field: "status",
    type: "select",
    options: [
      { id: 0, name: "Pending Approval" },
      { id: 1, name: "Approved" },
    ]
  },
  "invoice_status": {
    label: "GRN Status",
    field: "invoice_status",
    type: "select",
    options: [
      { id: 0, name: "Not Invoiced" },
      { id: 1, name: "Partially Invoiced" },
      { id: 2, name: "Invoiced" },
    ]
  },
  "type": {
    label: "Type",
    field: "type",
    type: "select",
    options: [
      { id: 'sundry', name: 'sundry' },
      { id: 'trade', name: 'trade' }
    ]
    // get options () {
    //   return getTypes.value
    // }
  }
});
const allPurchaseOrderColumns = ref<TableColumn[]>([
  {
    label: "Order No.",
    field: "order_no",
    sortable: false,
  },
  {
    label: "Supplier Name",
    field: "supplier.name",
    sortable: false,
  },
  {
    label: "Type",
    field: "type",
    sortable: false,
  },
  {
    label: "Date",
    field: "purchase_date",
    sortable: true,
    format: (value) => dayjs(value).format("DD/MM/YYYY")
  },
  {
    label: "Total",
    field: "total_amount",
    sortable: false,
    format: (value) => "₦" + toLocale(value)
  },
  {
    label: "Approval Status",
    field: "status",
    sortable: false,
  },
  {
    label: "Invoice Status",
    field: "is_invoiced",
    sortable: false,
  },
  {
    label: "Assigned",
    field: "assigned_to",
    sortable: false,
  },
  {
    label: "Actions",
    field: "actions",
    sortable: false,
  },
]);
const inbound_types = ref([]);
const getTypes = computed(() => inbound_types.value.map(type => ({
  id: type,
  name: type
})))
const statusClasses = {
  Enabled: "bg-green-100 text-green-800",
  Disabled: "bg-red-100 text-red-800",
};

const deletePurchaseOrderFormData = ref({
  id: 0,
  order_no: "",
})


const deletePurchaseOrder = () => {
  if (!deletePurchaseOrderFormData.value.id) return;
  loading.value = true;
  showDeletePurchaseOrderWarningModal.value = false;
  axios
    .delete(import.meta.env.VITE_API_URL + `purchase_orders/${deletePurchaseOrderFormData.value.id}?current_branch=${authStore.selectedBranch.id}`)
    .then((response) => {
      showSuccess("Purchase Order Deleted Successfully");
      // toast.success("Purchase Order Deleted Successfully");
      childKey.value++;
    })
    .catch((err) => {
      error(err)
    })
    .finally(() => loading.value = false);
};

const assign = (id: number) => {
  if (assigning.value) return;
  assigning.value = true;
  loading.value = true;
  axios
    .post(import.meta.env.VITE_API_URL + `purchase_orders/${id}/assign?current_branch=${authStore.selectedBranch.id}`)
    .then((res) => {
      childKey.value++;
      showSuccess("Purchase order assigned to you successfully!");
      // toast.success("Purchase order assigned to you successfully!");
    })
    .catch((err) => {
      error(err);
    })
    .finally(() => {
      assigning.value = false;
      loading.value = false;
    });
};

const unassign = (id: number) => {
  if (assigning.value) return;
  assigning.value = true;
  loading.value = true;
  axios
    .post(import.meta.env.VITE_API_URL + `purchase_orders/${id}/unassign?current_branch=${authStore.selectedBranch.id}`)
    .then((res) => {
      childKey.value++;
      showSuccess("Purchase Order unassigned successfully!");
      // toast.success("Purchase Order unassigned successfully!");
    })
    .catch((err) => {
      toast.error("Error unassigning purchase order!");
    })
    .finally(() => {
      assigning.value = false
      loading.value = false;
    });
};

const error = (err) => {
  let errorMessage = "";
  if (Array.isArray(err.response.data.error)) {
    errorMessage = err.response.data.error.join("</p><p>");
  } else {
    errorMessage =
      err.response.data.error != undefined
        ? err.response.data.error
        : err.response.data.message;
  }
  toast.error(errorMessage);
};

// activity logs modal control
const isModalOpen = ref(false);
const selectedPurchaseOrderId = ref<number | null>(null);
const openActivityLogModal = (purchase_order): void => {
  selectedPurchaseOrderId.value = purchase_order.id;
  isModalOpen.value = true;
};

const handleModalClose = (): void => {
  selectedPurchaseOrderId.value = null;
};

const showSuccess = (msg: string) => {
  toastMessage.value = msg;
  showToast.value = true;
};

const fetchInboundType = () => {
  axios.get(import.meta.env.VITE_API_URL + 'invoices/inbound_types').then(res => {
    inbound_types.value = res.data;
  }).catch(err => {
    toast.error("Error loading inbound types!");
  });
}

const openDeletePurchaseOrderWarningModal = (purchaseOrder) => {
  deletePurchaseOrderFormData.value = purchaseOrder;
  showDeletePurchaseOrderWarningModal.value = true;
}

</script>
<style>
.status {
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  padding: 4px;
  border-radius: 3px;
}

.discard_merge_alert_footer button.delete_btn {
  background-color: #c9372c;
  color: white;
}
</style>
