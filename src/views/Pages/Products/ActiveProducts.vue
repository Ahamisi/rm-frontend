<template>
  <div class="fixed flex items-center justify-center w-full h-full top-0 left-0 z-[9999999]" v-show="loading">
    <LoadingState />
  </div>
  <div>
    <Datatable :url="active_product_url" :filterByDate="true" :columns="activeProductColumns" :key="childKey"
      :filterFields="activeProductFilterFields" pageName="ActiveProducts">
      <template #column="col">
        <span v-if="col.props.column.field === 'product_images'">
          <span v-html="getImage(col.props.row.product_images)"></span>
        </span>
        <span v-else-if="col.props.column.field === 'action'">
          <TableActionDropdown @actionOpened="emit('actionOpened')" :rowData="col.props.row" :key="col.props.row.id">
            <template #default="{ selectedItem, closeDropdown }">
              <li @click="
                setComboProduct(col.props.row.id);
              closeDropdown();
              " class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                    fill="#626F86" />
                </svg>
                Add Combo Product
              </li>
              <li @click="setBranchTransferProduct(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.793 6.29304C11.7001 6.38583 11.6263 6.49603 11.576 6.61735C11.5257 6.73866 11.4998 6.86871 11.4998 7.00004C11.4998 7.13138 11.5257 7.26142 11.576 7.38274C11.6263 7.50405 11.7001 7.61425 11.793 7.70704L15.586 11.5H6C5.73478 11.5 5.48043 11.6054 5.29289 11.7929C5.10536 11.9805 5 12.2348 5 12.5C5 12.7653 5.10536 13.0196 5.29289 13.2071C5.48043 13.3947 5.73478 13.5 6 13.5H15.586L11.793 17.293C11.7001 17.3858 11.6263 17.496 11.576 17.6173C11.5257 17.7387 11.4998 17.8687 11.4998 18C11.4998 18.1314 11.5257 18.2614 11.576 18.3827C11.6263 18.504 11.7001 18.6143 11.793 18.707C12.183 19.097 12.817 19.097 13.208 18.707L18.707 13.207C18.8881 13.0266 18.993 12.7836 19 12.528V12.471C18.9928 12.2158 18.888 11.9731 18.707 11.793L13.208 6.29304C13.1151 6.20007 13.0048 6.12631 12.8834 6.07598C12.762 6.02566 12.6319 5.99976 12.5005 5.99976C12.3691 5.99976 12.239 6.02566 12.1176 6.07598C11.9962 6.12631 11.8859 6.20007 11.793 6.29304Z"
                    fill="#626F86" />
                </svg>
                Transfer to other Branch
              </li>
              <li @click="setHmoTransferProduct(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.793 6.29304C11.7001 6.38583 11.6263 6.49603 11.576 6.61735C11.5257 6.73866 11.4998 6.86871 11.4998 7.00004C11.4998 7.13138 11.5257 7.26142 11.576 7.38274C11.6263 7.50405 11.7001 7.61425 11.793 7.70704L15.586 11.5H6C5.73478 11.5 5.48043 11.6054 5.29289 11.7929C5.10536 11.9805 5 12.2348 5 12.5C5 12.7653 5.10536 13.0196 5.29289 13.2071C5.48043 13.3947 5.73478 13.5 6 13.5H15.586L11.793 17.293C11.7001 17.3858 11.6263 17.496 11.576 17.6173C11.5257 17.7387 11.4998 17.8687 11.4998 18C11.4998 18.1314 11.5257 18.2614 11.576 18.3827C11.6263 18.504 11.7001 18.6143 11.793 18.707C12.183 19.097 12.817 19.097 13.208 18.707L18.707 13.207C18.8881 13.0266 18.993 12.7836 19 12.528V12.471C18.9928 12.2158 18.888 11.9731 18.707 11.793L13.208 6.29304C13.1151 6.20007 13.0048 6.12631 12.8834 6.07598C12.762 6.02566 12.6319 5.99976 12.5005 5.99976C12.3691 5.99976 12.239 6.02566 12.1176 6.07598C11.9962 6.12631 11.8859 6.20007 11.793 6.29304Z"
                    fill="#626F86" />
                </svg>
                Transfer to HMO Products
              </li>
              <li @click="editProduct(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z"
                    fill="#626F86" />
                </svg>
                Edit
              </li>
              <router-link :to="{ name: 'admin.products.changes', params: { id: col.props.row.id } }"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 4.5C7.588 4.5 4 8.088 4 12.5C4 16.912 7.588 20.5 12 20.5C16.412 20.5 20 16.912 20 12.5C20 8.088 16.412 4.5 12 4.5ZM12 18.722C10.3505 18.7199 8.76911 18.0637 7.60272 16.8973C6.43633 15.7309 5.78012 14.1495 5.778 12.5C5.78012 10.8505 6.43633 9.26911 7.60272 8.10272C8.76911 6.93633 10.3505 6.28012 12 6.278C13.6495 6.28012 15.2309 6.93633 16.3973 8.10272C17.5637 9.26911 18.2199 10.8505 18.222 12.5C18.2199 14.1495 17.5637 15.7309 16.3973 16.8973C15.2309 18.0637 13.6495 18.7199 12 18.722ZM12.889 12.132V8.948C12.889 8.459 12.489 8.059 12 8.059C11.511 8.059 11.111 8.459 11.111 8.949V12.504C11.111 12.752 11.214 12.975 11.379 13.137L13.574 15.331C13.741 15.4972 13.9669 15.5904 14.2025 15.5904C14.4381 15.5904 14.664 15.4972 14.831 15.331C14.9969 15.1641 15.0899 14.9383 15.0899 14.703C15.0899 14.4677 14.9969 14.2419 14.831 14.075L12.889 12.132Z"
                    fill="#44546F" />
                </svg>
                View Changes
              </router-link>
              <li @click="openDisableProductWarningModal(col.props.row); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5ZM10.5918 12.5154L9.117 13.999C9.02179 14.0915 8.94595 14.2021 8.89392 14.3242C8.84188 14.4464 8.81469 14.5776 8.81393 14.7104C8.81317 14.8432 8.83885 14.9747 8.88948 15.0975C8.9401 15.2202 9.01466 15.3316 9.10881 15.4252C9.20295 15.5189 9.31479 15.5928 9.43781 15.6427C9.56083 15.6927 9.69256 15.7176 9.82531 15.7161C9.95807 15.7146 10.0892 15.6866 10.211 15.6339C10.3329 15.5812 10.443 15.5047 10.535 15.409L12.0027 13.9325L13.442 15.378C13.6291 15.5661 13.8833 15.6721 14.1485 15.6727C14.4138 15.6734 14.6685 15.5686 14.8565 15.3815C15.0445 15.1944 15.1505 14.9403 15.1512 14.675C15.1519 14.4097 15.0471 14.1551 14.86 13.967L13.4127 12.5141L14.895 11.023C15.0767 10.8339 15.1768 10.581 15.1738 10.3187C15.1709 10.0565 15.065 9.80595 14.879 9.62104C14.6931 9.43612 14.4419 9.33166 14.1797 9.33016C13.9174 9.32865 13.6651 9.43022 13.477 9.61298L12.0015 11.0973L10.5 9.59002C10.3118 9.40742 10.0594 9.30606 9.79717 9.30776C9.53495 9.30947 9.28389 9.4141 9.09807 9.59913C8.91225 9.78416 8.80655 10.0348 8.80373 10.297C8.80091 10.5592 8.90121 10.812 9.083 11.001L10.5918 12.5154Z"
                    fill="#E56910" />
                </svg>
                Disable Product
              </li>
              <li @click="openDeleteProductWarningModal(col.props.row); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z"
                    fill="#626F86" />
                </svg>
                Delete
              </li>
            </template>
          </TableActionDropdown>
        </span>
        <span v-else-if="col.props.column.field === 'name'">
          <Tooltip :text="col.props.row.name">
            <router-link :to="{
              name: 'admin.products.show',
              params: { id: col.props.row.id },
            }" class="medium-text hover:underline">
              {{ truncateText(col.props.row.name, 20) }}
            </router-link>
          </Tooltip>
        </span>
        <span v-else>
          {{ col.props.formattedRow[col.props.column.field] }}
        </span>
      </template>
    </Datatable>

    <AddCombo :comboProductId="comboProductId" />
    <TransferToBranch :productId="branchTransferProductId" />
    <TransferToHmoProducts :productId="hmoTransferProductId" />
    <Edit :isOpen="isEditProductModalOpen" @close="isEditProductModalOpen = false" :productId="editProductId" />

    <!-- disable product warning modal -->
    <UniversalCenteredModal :show="showDisableProductWarningModal" @close="showDisableProductWarningModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.0626 4.96699C11.5786 3.99299 12.4206 3.98899 12.9386 4.96699L20.0626 18.425C20.5786 19.399 20.1076 20.196 19.0056 20.196H4.99556C3.89356 20.196 3.42056 19.403 3.93856 18.425L11.0626 4.96699ZM11.2935 14.7071C11.481 14.8946 11.7353 15 12.0006 15C12.2658 15 12.5201 14.8946 12.7077 14.7071C12.8952 14.5196 13.0006 14.2652 13.0006 14V8.99998C13.0006 8.73477 12.8952 8.48041 12.7077 8.29288C12.5201 8.10534 12.2658 7.99998 12.0006 7.99998C11.7353 7.99998 11.481 8.10534 11.2935 8.29288C11.1059 8.48041 11.0006 8.73477 11.0006 8.99998V14C11.0006 14.2652 11.1059 14.5196 11.2935 14.7071ZM11.2935 17.7071C11.481 17.8946 11.7353 18 12.0006 18C12.2658 18 12.5201 17.8946 12.7077 17.7071C12.8952 17.5196 13.0006 17.2652 13.0006 17C13.0006 16.7348 12.8952 16.4804 12.7077 16.2929C12.5201 16.1053 12.2658 16 12.0006 16C11.7353 16 11.481 16.1053 11.2935 16.2929C11.1059 16.4804 11.0006 16.7348 11.0006 17C11.0006 17.2652 11.1059 17.5196 11.2935 17.7071Z"
              fill="#E56910" />
          </svg>
          <h3>Disable Product?</h3>
        </span>
      </template>

      <template #body>
        <p class="discard_merge_alert_body_text">
          You are about to disable this product <strong>"{{ disableProductFormData.name }}"</strong>. This action will
          make this product inactive.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showDisableProductWarningModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="disableProduct" type="button" class="discard_btn">
            Disable Product?
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- delete product warning modal -->
    <UniversalCenteredModal :show="showDeleteProductWarningModal" @close="showDeleteProductWarningModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
              fill="#C9372C" />
          </svg>

          <h3>Delete Product?</h3>
        </span>
      </template>

      <template #body>
        <p class="discard_merge_alert_body_text">
          You are about to delete this product <strong>"{{ deleteProductFormData.name }}"</strong>. This action will
          remove this product from the system and can't be reversed.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showDeleteProductWarningModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="deleteProduct" type="button" class="delete_btn">
            Delete Product
          </button>
        </div>
      </template>
    </UniversalCenteredModal>
  </div>
</template>

<script setup lang="ts">
import Edit from './Edit.vue';
import { ref, computed } from "vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from "@/views/helpers/useLocale.js";
import { useToast } from "vue-toastification";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { FilterField, FilterFields, TableColumn } from "@/types";
import axios from "axios";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import AddCombo from "./AddCombo.vue";
import TransferToBranch from "./TransferToBranch.vue";
import TransferToHmoProducts from "./TransferToHmoProducts.vue";
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';


type PartialOption = Partial<{ id: string; name: string, display_name: string }>;

interface Props {
  product_types: PartialOption[]
  categories: PartialOption[]
  manufacturers: PartialOption[]
}
const props = defineProps<Props>();

const emit = defineEmits(['actionOpened']);

const isEditProductModalOpen = ref(false);
const showDisableProductWarningModal = ref(false);
const showDeleteProductWarningModal = ref(false);
const editProductId = ref(0);
const toast = useToast();
const active_product_url = import.meta.env.VITE_API_V2_URL + "products";
const loading = ref<boolean>(false);
const assigning = ref<boolean>(false);
const childKey = ref<number>(11111);
const comboProductId = ref(0);
const branchTransferProductId = ref(0);
const hmoTransferProductId = ref(0);
const disableProductFormData = ref({
  id: 0,
  name: "",
});

const deleteProductFormData = ref({
  id: 0,
  name: "",
});

const activeProductFilterFields = computed<FilterFields<FilterField>>(() => ({
  product_type_id: {
    label: "Product Type",
    field: "product_type_id",
    type: "select",
    options: (props.product_types || []).map((type) => ({
      id: type.id,
      name: type.display_name || type.name,
    })),
  },
  category_id: {
    label: "Category",
    field: "category_id",
    type: "select",
    options: (props.categories || []).map((category) => ({
      id: category.id,
      name: category.display_name || category.name,
    })),
  },
  manufacturer_id: {
    label: "Manufacturer",
    field: "manufacturer_id",
    type: "select",
    options: (props.manufacturers || []).map((manufacturer) => ({
      id: manufacturer.id,
      name: manufacturer.display_name || manufacturer.name,
    })),
  },
  loss_making_items: {
    label: "Loss Making Items",
    field: "loss_making_items",
    type: "select",
    options: [
      { name: "All", id: "" },
      { name: "Yes", id: 1 },
      { name: "No", id: 0 },
    ],
  },
}));

const activeProductColumns = ref<TableColumn[]>([
  {
    label: "ID",
    field: "id",
    sortable: true,
  },
  {
    label: "Product Image",
    field: "product_images",
    sortable: false,
  },
  {
    label: "Product Name",
    field: "name",
    sortable: true,
  },
  {
    label: "Category",
    field: "category.display_name",
    sortable: false,
  },
  {
    label: "Product Formulation",
    field: "product_type.display_name",
    sortable: false,
  },
  {
    label: "Selling Price",
    field: "price_per_pack",
    sortable: true,
    format: (value) => "₦" + toLocale(value),
  },
  {
    label: "Cost Price",
    field: "unit_cost",
    sortable: true,
    format: (value) => "₦" + toLocale(value),
  },
  {
    label: "Quantity Avail.",
    field: "quantity_available",
    sortable: true,
    format: (value) => toLocale(value),
  },
  {
    label: "In Stock",
    field: "stock_count",
    sortable: true,
    format: (value) => toLocale(value),
  },
  {
    label: "Sold Qty",
    field: "total_quantity_sold",
    sortable: true,
    format: (value) => toLocale(value),
  },
  {
    label: "Shelf Locations",
    field: "shelves",
    sortable: false,
    format: (value) => value.join("\n"),
  },
  {
    label: "Action",
    field: "action",
    sortable: false,
  },
]);

const getImage = (images: []) => {
  let src = "";
  if (images.length == 0) {
    src =
      "https://cdn.remedial.health/product_images/aS8Waps1DreNT6f72jhOzHw2ArXvES9gjJd0jgBm147551.webp";
  } else {
    src = images.find((img) => img.default)?.url || images[0].url;
  }
  return `<img src="${src}" class="object-cover w-8 h-8 rounded" alt="Product Image">`;
};

const truncateText = (text, maxLength = 25) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const setComboProduct = (productId) => {
  comboProductId.value = productId;
}

const setBranchTransferProduct = (productId) => {
  branchTransferProductId.value = productId;
}

const setHmoTransferProduct = (productId) => {
  hmoTransferProductId.value = productId;
}

const deleteProduct = (id) => {
  loading.value = true;
  showDeleteProductWarningModal.value = false;
  axios.delete(import.meta.env.VITE_API_URL + "products/" + deleteProductFormData.value.id).then(response => {
    toast.success("Product Deleted Successfully");
    childKey.value++;
  }).catch(err => {
    error(err);
  }).finally(() => {
    loading.value = false;
  });
}


const disableProduct = () => {
  showDisableProductWarningModal
  loading.value = true;
  axios.get(import.meta.env.VITE_API_URL + "products/" + disableProductFormData.value.id + "/disable").then(response => {
    toast.success("Product disabled Successfully");
    childKey.value++;
  }).catch(err => {
    error(err);
  }).finally(() => loading.value = false);
}

const editProduct = (id) => {
  editProductId.value = id;
  isEditProductModalOpen.value = true;
}

const openDisableProductWarningModal = (product) => {
  disableProductFormData.value = product;
  showDisableProductWarningModal.value = true;
};

const openDeleteProductWarningModal = (product) => {
  deleteProductFormData.value = product;
  showDeleteProductWarningModal.value = true;
};

const error = (err) => {
  let errorMessage = "";
  if (Array.isArray(err.response.data.error)) {
    errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
  } else {
    errorMessage =
      err.response.data.error != undefined
        ? "<p>" + err.response.data.error + "</p>"
        : "<p>" + err.response.data.message + "</p>";
  }
  toast.error(errorMessage);
};
</script>

<style>
.discard_merge_alert_footer button.delete_btn {
  background-color: #c9372c;
  color: white;
}
</style>