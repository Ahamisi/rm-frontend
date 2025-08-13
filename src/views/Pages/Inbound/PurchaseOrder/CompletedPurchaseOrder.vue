<template>
  <div>
    <Datatable :url="completed_purchase_order_url" :filterByDate="true" :searchable="true"
      :columns="completedPurchaseOrderColumns" pageName="CompletedPurchaseOrders">
      <template #column="col">
        <span v-if="col.props.column.field === 'is_invoiced'">
          <!-- <Tooltip :text="`${col.props.row.is_invoiced}`"> -->
          <span :class="[
            'status rounded-md line-clamp-2 w-fit',
            statusClasses[col.props.row.is_invoiced ? 'Enabled' : 'Disabled'] ||
            'bg-gray-100 text-gray-800',
          ]">
            {{ col.props.row.is_invoiced ? 'Invoiced' : 'Not Invoiced' }}
          </span>
          <!-- </Tooltip> -->
        </span>
        <span v-else-if="col.props.column.field === 'status'">
          <!-- <Tooltip :text="`${col.props.row.status}`"> -->
          <span :class="[
            'status rounded-md line-clamp-2 w-fit',
            statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
            'bg-gray-100 text-gray-800',
          ]">
            {{ col.props.row.status ? 'Approved' : 'Not Approved' }}
          </span>
          <!-- </Tooltip> -->
        </span>
        <span v-else-if="col.props.column.field === 'assigned_to'">
          <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
          <span v-else class="flex items-center">
            <img v-if="col.props.row.assigned_to && col.props.row.assigned && col.props.row.assigned.picture_url"
              :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
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
            <span class="ml-2">{{ col.props.row.assigned.name }}</span>
          </span>
        </span>
        <span v-else-if="col.props.column.field === 'actions'">
          <TableActionDropdown :rowData="col.props.row">
            <template #default="{ selectedItem, closeDropdown }">
              <router-link :to="{ name: 'inbound.grn.show', params: { id: selectedItem.id } }" @click="closeDropdown()"
                as="li" class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideEye class="w-4 h-4" />
                View GRN
              </router-link>
              <router-link
                :to="{ name: 'inbound.purchase_orders.show', params: { id: selectedItem.purchase_order_id } }"
                @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideEye class="w-4 h-4" />
                View Purchase Order
              </router-link>

              <!-- <li v-if="col.props.row.assigned_to == null"
                                @click="assign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
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
                            <li v-if="col.props.row.assigned_to != null"
                                @click="assign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer hover:bg-gray-100 medium-text border-y">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M20.99 6.5C20.9909 6.62978 20.9661 6.75846 20.917 6.8786C20.8679 6.99874 20.7955 7.10798 20.704 7.2L19.371 8.469L20.655 9.769C20.7934 9.88673 20.8964 10.0406 20.9526 10.2133C21.0088 10.3861 21.0159 10.5711 20.9732 10.7477C20.9305 10.9243 20.8396 11.0856 20.7107 11.2137C20.5818 11.3417 20.4199 11.4315 20.243 11.473C20.0663 11.5152 19.8814 11.5079 19.7085 11.452C19.5357 11.3961 19.3815 11.2937 19.263 11.156L17.287 9.187C17.1034 9.00291 17.0003 8.75351 17.0003 8.4935C17.0003 8.23349 17.1034 7.98409 17.287 7.8L19.322 5.772C19.463 5.63804 19.6403 5.54858 19.8319 5.51479C20.0234 5.481 20.2207 5.50437 20.399 5.582C20.764 5.742 20.996 6.104 20.99 6.5ZM5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                                        fill="#626F86" />
                                </svg>
                                Unassign
                            </li> -->
              <!-- <router-link :to="{ name: 'inbound.grn.edit', params: { id: selectedItem.id } }" @click="closeDropdown()"
                as="li" class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.01977 19.73C3.98666 19.892 3.99423 20.0597 4.04181 20.218C4.08939 20.3764 4.17549 20.5205 4.29241 20.6374C4.40932 20.7543 4.5534 20.8404 4.71175 20.888C4.8701 20.9355 5.03777 20.9431 5.19977 20.91L9.00977 20.13L4.79977 15.92L4.01977 19.73ZM9.94077 17.11L7.82077 14.99L16.3058 6.5H16.3078L18.4288 8.621L9.93977 17.111L9.94077 17.11ZM19.8438 7.207L17.7238 5.085C17.5379 4.89908 17.3171 4.7517 17.0741 4.65131C16.8311 4.55092 16.5707 4.4995 16.3078 4.5C15.7958 4.5 15.2838 4.695 14.8928 5.085L5.13577 14.843L10.0858 19.793L19.8428 10.035C20.2177 9.65995 20.4283 9.15133 20.4283 8.621C20.4283 8.09068 20.2177 7.58206 19.8428 7.207H19.8438Z"
                    fill="#626F86" />
                </svg>
                Edit
              </router-link> -->
              <a :href="selectedItem.download_url" target="__blank" @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                Download GRN
              </a>
              <a :href="selectedItem.purchase_order?.download_url" target="__blank" @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                Download Purchase Order
              </a>
              <!-- <li @click="showDeleteWarning(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                    fill="#626F86" />
                </svg>

                Delete
              </li> -->
              <!-- <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideBell class="w-4 h-4" />
                Notify
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideLogIn class="w-4 h-4" />
                Login to Account
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideAlertTriangle class="w-4 h-4" />
                Add Warning Tags
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideDownloadCloud class="w-4 h-4" />
                Download Transactions
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideDownloadCloud class="w-4 h-4" />
                Download Partner Transactions
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideUnlock class="w-4 h-4" />
                Reset Password
              </li>
              <li v-if="selectedItem.activated_at" @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideXCircle class="w-4 h-4 text-red-600" />
                Deactivate Customer
              </li>
              <li v-else @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideCheckCircle class="w-4 h-4 text-green-600" />
                Activate Customer
              </li>
              <li @click="handleDelete(selectedItem); closeDropdown()"
                class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideTrash class="w-4 h-4" />
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
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from '@/views/helpers/useLocale.js';
import { useToast } from "vue-toastification";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { TableColumn } from '@/types';
import { LucidePen, LucideEye, LucideCheck, LucideTrash } from "lucide-vue-next";

const toast = useToast();

const completed_purchase_order_url = import.meta.env.VITE_API_URL + 'invoices?type=completed';

const completedPurchaseOrderColumns = ref<TableColumn[]>([
  {
    label: 'Order No.',
    field: 'purchase_order.order_no',
    sortable: false,
  },
  {
    label: 'Doc No.',
    field: 'doc_no',
    sortable: false,
  },
  {
    label: 'Supplier Name',
    field: 'purchase_order.supplier.name',
    sortable: false,
  },
  // {
  //   label: 'Order No.',
  //   field: 'purchase_order.order_no',
  //   sortable: false,
  // },
  {
    label: "Type",
    field: "type",
    sortable: false,
  },
  {
    label: 'Date',
    field: 'created_at',
    sortable: true,
    format: (value) => {
      return dayjs(value).format('DD/MM/YYYY');
    }
  },
  {
    label: 'Total',
    field: 'total',
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
]);

const statusClasses = {
  Enabled: "bg-green-100 text-green-800",
  Disabled: "bg-red-100 text-red-800",
};

const assigning = ref(false);
const handleDelete = (item: any) => {
  console.log(item);
};

const deletePurchaseOrder = (id: number) => {
  // if(confirm("Do you really want to delete this purchase order?")){
  //   axios.delete(import.meta.env.VITE_API_URL + "purchase_orders/" + id).then(response => {
  //       this.$toast.success("Purchase Order Deleted Successfully", {
  //           position: "top-right"
  //       });
  //   }).catch(err => {
  //         let errorMessage = "";
  //         if(err.response.data.error != undefined){
  //           errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
  //         } else errorMessage = "Error deleting purchase order!"
  //         $toast.error(errorMessage, {
  //             position: "top-right"
  //         });
  //       })
  // }
}
const assign = (id) => {
  // if (this.assigning) return;
  // this.assigning = true;
  // axios.post(import.meta.env.VITE_API_URL + `purchase_orders/${id}/assign`).then(res => {
  // 	this.$toast.success("Purchase order assigned to you successfully!", { position: 'top-right' });
  // 	this.$emit('assigned');
  // }).catch(err => {
  // 	this.error(err);
  // }).finally(() => this.assigning = false);
}
const unassign = (id) => {
  // if (this.assigning) return;
  // this.assigning = true;
  // axios.get(import.meta.env.VITE_API_URL + `purchase_orders/${id}/unassign`).then(res => {
  //   this.$toast.success("Purchase Order unassigned successfully!", { position: 'top-right' });
  //   this.$emit('assigned');
  // }).catch(err => {
  //   this.$toast.error("Error unassigning purchase order!", { position: 'top-right' });
  // }).finally(() => assigning = false);
}

const error = (err) => {
  let errorMessage = '';
  if (Array.isArray(err.response.data.error)) {
    errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
  } else {
    errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
  }
  // this.$toast.error(errorMessage, {
  // 	position: "top-right"
  // });
}

</script>
<style></style>