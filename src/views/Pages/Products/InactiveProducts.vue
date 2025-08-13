<template>
  <div class="fixed top-0 left-0  z-[99999999] flex items-center justify-center w-full h-full" v-if="loading">
    <LoadingState />
  </div>
  <div>
    <Datatable :url="product_url" :filterByDate="true" :columns="Columns" :key="childKey"
      :filterFields="activeProductFilterFields" pageName="InactiveProducts">
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
              <li @click="openEnableProductWarningModal(col.props.row); closeDropdown()"
                class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5ZM9.3824 11.5689C9.50441 11.6213 9.61475 11.6975 9.707 11.793L11 13.086L14.293 9.79302C14.3852 9.69751 14.4956 9.62133 14.6176 9.56892C14.7396 9.51651 14.8708 9.48892 15.0036 9.48777C15.1364 9.48662 15.2681 9.51192 15.391 9.5622C15.5138 9.61248 15.6255 9.68673 15.7194 9.78063C15.8133 9.87452 15.8875 9.98617 15.9378 10.1091C15.9881 10.232 16.0134 10.3636 16.0122 10.4964C16.0111 10.6292 15.9835 10.7604 15.9311 10.8824C15.8787 11.0044 15.8025 11.1148 15.707 11.207L11.707 15.207C11.5195 15.3945 11.2652 15.4998 11 15.4998C10.7348 15.4998 10.4805 15.3945 10.293 15.207L8.293 13.207C8.19749 13.1148 8.1213 13.0044 8.0689 12.8824C8.01649 12.7604 7.9889 12.6292 7.98775 12.4964C7.98659 12.3636 8.0119 12.232 8.06218 12.1091C8.11246 11.9862 8.18671 11.8745 8.2806 11.7806C8.3745 11.6867 8.48615 11.6125 8.60904 11.5622C8.73194 11.5119 8.86362 11.4866 8.9964 11.4878C9.12918 11.4889 9.2604 11.5165 9.3824 11.5689Z"
                    fill="#22A06B" />
                </svg>
                Enable Product
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
            <!-- <template #default="{ selectedItem, closeDropdown }">
              <router-link :to="{ name: 'inbound.purchase_orders.edit', params: { id: selectedItem.id } }"
                @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucidePen class="w-4 h-4" />
                Edit Purchase Order
              </router-link>
              <router-link :to="{ name: 'inbound.purchase_orders.edit', params: { id: selectedItem.id }, query: { approve: 1 } }"
                @click="closeDropdown()" as="li"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideCheck class="w-4 h-4" />
                Approve
              </router-link>
              <li @click="deletePurchaseOrder(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <LucideTrash class="w-4 h-4" />
                Delete
              </li>
              <li v-if="col.props.row.assigned_to == null" @click="assign(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6.5C20 5.94772 19.5523 5.5 19 5.5C18.4477 5.5 18 5.94772 18 6.5V10.5C18 11.0523 18.4477 11.5 19 11.5C19.5523 11.5 20 11.0523 20 10.5V6.5Z" fill="#626F86"/>
                  <path d="M21 7.5H17C16.4477 7.5 16 7.94772 16 8.5C16 9.05228 16.4477 9.5 17 9.5H21C21.5523 9.5 22 9.05228 22 8.5C22 7.94772 21.5523 7.5 21 7.5Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z" fill="#626F86"/>
                  <path d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z" fill="#626F86"/>
                </svg>
                Assign to me
              </li>
              <li v-if="col.props.row.assigned_to != null" @click="assign(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer hover:bg-gray-100 medium-text border-y">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.99 6.5C20.9909 6.62978 20.9661 6.75846 20.917 6.8786C20.8679 6.99874 20.7955 7.10798 20.704 7.2L19.371 8.469L20.655 9.769C20.7934 9.88673 20.8964 10.0406 20.9526 10.2133C21.0088 10.3861 21.0159 10.5711 20.9732 10.7477C20.9305 10.9243 20.8396 11.0856 20.7107 11.2137C20.5818 11.3417 20.4199 11.4315 20.243 11.473C20.0663 11.5152 19.8814 11.5079 19.7085 11.452C19.5357 11.3961 19.3815 11.2937 19.263 11.156L17.287 9.187C17.1034 9.00291 17.0003 8.75351 17.0003 8.4935C17.0003 8.23349 17.1034 7.98409 17.287 7.8L19.322 5.772C19.463 5.63804 19.6403 5.54858 19.8319 5.51479C20.0234 5.481 20.2207 5.50437 20.399 5.582C20.764 5.742 20.996 6.104 20.99 6.5ZM5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z" fill="#626F86"/>
                  <path d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z" fill="#626F86"/>
                </svg>
                Unassign
              </li>
              <li v-if="col.props.row.invoice_status != 'Invoiced' && col.props.row.status" @click="assign(col.props.row.id); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 border-b border-gray-400 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="#626F86"/>
                </svg>
                Add GRN
              </li>
              <li @click="openActivityLogModal(col.props.row); closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.505V19.5H7V5.5H12.99V7.99C12.99 8.38782 13.148 8.76936 13.4293 9.05066C13.7106 9.33196 14.0922 9.49 14.49 9.49H18.99V8.968C18.99 8.671 18.858 8.39 18.631 8.2L13.557 3.964C13.197 3.664 12.744 3.5 12.275 3.5H7C6.46957 3.5 5.96086 3.71071 5.58579 4.08579C5.21071 4.46086 5 4.96957 5 5.5V19.5C5 20.0304 5.21071 20.5391 5.58579 20.9142C5.96086 21.2893 6.46957 21.5 7 21.5H17C17.5304 21.5 18.0391 21.2893 18.4142 20.9142C18.7893 20.5391 19 20.0304 19 19.5V10.505H17Z" fill="#626F86"/>
                  <path d="M15 12.5H9C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H15C15.5523 14.5 16 14.0523 16 13.5C16 12.9477 15.5523 12.5 15 12.5Z" fill="#626F86"/>
                  <path d="M11 15.5H9C8.44772 15.5 8 15.9477 8 16.5C8 17.0523 8.44772 17.5 9 17.5H11C11.5523 17.5 12 17.0523 12 16.5C12 15.9477 11.5523 15.5 11 15.5Z" fill="#626F86"/>
                </svg>
                Activity Log
              </li>
              <a :href="col.props.row.download_url" target="__blank" @click="closeDropdown()"
                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.687 17.792C10.5956 17.6997 10.4868 17.6264 10.3669 17.5764C10.247 17.5264 10.1184 17.5007 9.9885 17.5007C9.8586 17.5007 9.72998 17.5264 9.61009 17.5764C9.49019 17.6264 9.3814 17.6997 9.29 17.792C9.10466 17.9792 9.0007 18.232 9.0007 18.4955C9.0007 18.759 9.10466 19.0118 9.29 19.199L11.254 21.179C11.3546 21.2807 11.4744 21.3613 11.6064 21.4164C11.7384 21.4715 11.88 21.4998 12.023 21.4998C12.166 21.4998 12.3076 21.4715 12.4396 21.4164C12.5716 21.3613 12.6914 21.2807 12.792 21.179L14.711 19.246C14.8966 19.0587 15.0008 18.8057 15.0008 18.542C15.0008 18.2783 14.8966 18.0253 14.711 17.838C14.6196 17.7455 14.5107 17.6721 14.3907 17.622C14.2708 17.5719 14.142 17.5462 14.012 17.5462C13.882 17.5462 13.7532 17.5719 13.6333 17.622C13.5133 17.6721 13.4044 17.7455 13.313 17.838L12.023 19.138L10.687 17.792Z" fill="#626F86"/>
                  <path d="M13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 11 9.95 11 10.507L11.001 20.494C11.001 21.049 11.449 21.5 12.001 21.5C12.553 21.5 13.001 21.05 13.001 20.493Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.98C7.68111 5.9383 7.42125 5.91757 7.161 5.918C4.356 5.918 2 8.12 2 10.998C2 13.909 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.962 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.492C13.9871 5.50203 14.9543 5.87742 15.703 6.54812C16.4517 7.21882 16.9309 8.13901 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.165 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.52 9.075 4.4 7.938 5.98Z" fill="#626F86"/>
                </svg>
                Download Purchase Order
              </a>
            </template> -->
          </TableActionDropdown>
        </span>
        <span v-else-if="col.props.column.field === 'name'">
          <Tooltip :text="col.props.row.name">
            <router-link :to="{ name: 'admin.products.show', params: { id: col.props.row.id } }"
              class="medium-text hover:underline">
              {{ truncateText(col.props.row.name, 20) }}
            </router-link>
          </Tooltip>
        </span>
        <span v-else>
          {{ col.props.formattedRow[col.props.column.field] }}
        </span>
      </template>
    </Datatable>

    <!-- <ActivityLogModal 
      v-model:isOpen="isModalOpen"
      :purchaseOrderId="selectedPurchaseOrderId"
      @close="handleModalClose"
    /> -->
    <AddCombo :comboProductId="comboProductId" />
    <TransferToBranch :productId="branchTransferProductId" />
    <TransferToHmoProducts :productId="hmoTransferProductId" />
    const enableProductFormData = ref({
    id: 0,
    name: ''
    })
    <Edit :isOpen="isEditProductModalOpen" @close="isEditProductModalOpen = false" :productId="editProductId" />

    <!-- enable product warning modal -->
    <UniversalCenteredModal :show="showEnableProductWarningModal" @close="showEnableProductWarningModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.0626 4.96699C11.5786 3.99299 12.4206 3.98899 12.9386 4.96699L20.0626 18.425C20.5786 19.399 20.1076 20.196 19.0056 20.196H4.99556C3.89356 20.196 3.42056 19.403 3.93856 18.425L11.0626 4.96699ZM11.2935 14.7071C11.481 14.8946 11.7353 15 12.0006 15C12.2658 15 12.5201 14.8946 12.7077 14.7071C12.8952 14.5196 13.0006 14.2652 13.0006 14V8.99998C13.0006 8.73477 12.8952 8.48041 12.7077 8.29288C12.5201 8.10534 12.2658 7.99998 12.0006 7.99998C11.7353 7.99998 11.481 8.10534 11.2935 8.29288C11.1059 8.48041 11.0006 8.73477 11.0006 8.99998V14C11.0006 14.2652 11.1059 14.5196 11.2935 14.7071ZM11.2935 17.7071C11.481 17.8946 11.7353 18 12.0006 18C12.2658 18 12.5201 17.8946 12.7077 17.7071C12.8952 17.5196 13.0006 17.2652 13.0006 17C13.0006 16.7348 12.8952 16.4804 12.7077 16.2929C12.5201 16.1053 12.2658 16 12.0006 16C11.7353 16 11.481 16.1053 11.2935 16.2929C11.1059 16.4804 11.0006 16.7348 11.0006 17C11.0006 17.2652 11.1059 17.5196 11.2935 17.7071Z"
              fill="#E56910" />
          </svg>
          <h3>Enable Product?</h3>
        </span>
      </template>

      <template #body>
        <p class="discard_merge_alert_body_text">
          You are about to enable this product <strong>"{{ enableProductFormData.name }}"</strong>. This action will
          make this product active.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showEnableProductWarningModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="enableProduct" type="button" class="discard_btn">
            Enable Product?
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
import { ref, computed } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import Tooltip from "@/views/Components/procurement/ui/Tooltip.vue";
import { toLocale } from '@/views/helpers/useLocale.js';
import { useToast } from "vue-toastification";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { FilterField, FilterFields, TableColumn } from "@/types";
import axios from 'axios';
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import AddCombo from "./AddCombo.vue";
import TransferToBranch from "./TransferToBranch.vue";
import TransferToHmoProducts from "./TransferToHmoProducts.vue";
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
// import ActivityLogModal from './modal/ActivityLogModal.vue';

type PartialOption = Partial<{ id: string; name: string, display_name: string }>;

interface Props {
  product_types: PartialOption[]
  categories: PartialOption[]
  manufacturers: PartialOption[]
}

const props = defineProps<Props>()
const emit = defineEmits(['actionOpened']);

const toast = useToast();
const isEditProductModalOpen = ref(false);
const editProductId = ref(0);
const product_url = import.meta.env.VITE_API_V2_URL + 'admin/products/inactive';
const loading = ref<boolean>(false);
const assigning = ref<boolean>(false);
const showEnableProductWarningModal = ref<boolean>(false);
const showDeleteProductWarningModal = ref(false);
const childKey = ref<number>(11111);
const comboProductId = ref(0);
const branchTransferProductId = ref(0);
const hmoTransferProductId = ref(0);
const enableProductFormData = ref({
  id: 0,
  name: ''
})
const deleteProductFormData = ref({
  id: 0,
  name: "",
});

const activeProductFilterFields = computed<FilterFields<FilterField>>(() => ({
  'product_type_id': {
    label: "Product Type",
    field: 'product_type_id',
    type: 'select',
    options: (props.product_types || []).map(type => ({
      id: type.id,
      name: type.display_name || type.name
    }))
  },
  'category_id': {
    label: "Category",
    field: 'category_id',
    type: 'select',
    options: (props.categories || []).map(category => ({
      id: category.id,
      name: category.display_name || category.name
    }))
  },
  'manufacturer_id': {
    label: "Manufacturer",
    field: 'manufacturer_id',
    type: 'select',
    options: (props.manufacturers || []).map(manufacturer => ({
      id: manufacturer.id,
      name: manufacturer.display_name || manufacturer.name
    }))
  },
  'loss_making_items': {
    label: "Loss Making Items",
    field: 'loss_making_items',
    type: 'select',
    options: [
      { name: "All", id: "" },
      { name: "Yes", id: 1 },
      { name: "No", id: 0 },
    ]
  },
}));

const Columns = ref<TableColumn[]>([
  {
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    label: 'Product Image',
    field: 'product_images',
    sortable: false,
  },
  {
    label: 'Product Name',
    field: 'name',
    sortable: true,
  },
  {
    label: 'Category',
    field: 'category.display_name',
    sortable: false,
  },
  {
    label: 'Product Formulation',
    field: 'product_type.display_name',
    sortable: false,
  },
  {
    label: 'Selling Price',
    field: 'price_per_pack',
    sortable: true,
    format: (value) => '₦' + toLocale(value)
  },
  {
    label: 'Cost Price',
    field: 'unit_cost',
    sortable: true,
    format: (value) => '₦' + toLocale(value)
  },
  {
    label: 'Available Qty',
    field: 'quantity_available',
    sortable: true,
    format: (value) => toLocale(value)
  },
  {
    label: 'In Stock',
    field: 'stock_count',
    sortable: true,
    format: (value) => toLocale(value)
  },
  {
    label: 'Sold Qty',
    field: 'total_quantity_sold',
    sortable: true,
    format: (value) => toLocale(value)
  },
  {
    label: 'Shelf Location',
    field: 'shelves',
    sortable: false,
    format: (value) => value.join("\n")
  },
  {
    label: 'Action',
    field: 'action',
    sortable: false,
  },
]);

const getImage = (images: []) => {
  let src = '';
  if (images.length == 0) {
    src = "https://cdn.remedial.health/product_images/aS8Waps1DreNT6f72jhOzHw2ArXvES9gjJd0jgBm147551.webp";
  } else {
    src = images.find(img => img.default)?.url || images[0].url;
  }
  return `<img src="${src}" class="object-cover w-8 h-8 rounded" alt="Product Image">`;
}

const truncateText = (text, maxLength = 25) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const deletePurchaseOrder = (id: number) => {
  if (confirm("Do you really want to delete this purchase order?")) {
    axios.delete(import.meta.env.VITE_API_URL + "purchase_orders/" + id).then(response => {
      toast.success("Purchase Order Deleted Successfully");
      childKey.value++;
    }).catch(err => {
      let errorMessage = "";
      if (err.response.data.error != undefined) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
      } else errorMessage = "Error deleting purchase order!"
      toast.error(errorMessage);
    })
  }
}

const assign = (id: number) => {
  if (assigning) return;
  assigning.value = true;
  axios.post(import.meta.env.VITE_API_URL + `purchase_orders/${id}/assign`).then(res => {
    childKey.value++;
    toast.success("Purchase order assigned to you successfully!");
  }).catch(err => {
    error(err);
  }).finally(() => assigning.value = false);
}

const unassign = (id: number) => {
  if (assigning) return;
  assigning.value = true;
  axios.get(import.meta.env.VITE_API_URL + `purchase_orders/${id}/unassign`).then(res => {
    childKey.value++;
    toast.success("Purchase Order unassigned successfully!");
  }).catch(err => {
    toast.error("Error unassigning purchase order!");
  }).finally(() => assigning.value = false);
}

// const openActivityLogModal = (id: number) => {
//   const modal = document.getElementById("activity-log-modal");
//   if (modal) {
//     modal.setAttribute("data-id", id.toString());
//     modal.classList.remove("hidden");
//   }
// }

// const handleDelete = (item: any) => {
//   console.log(item);
// };

const error = (err) => {
  let errorMessage = '';
  if (Array.isArray(err.response.data.error)) {
    errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
  } else {
    errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
  }
  toast.error(errorMessage);
}

// activity logs modal control
const isModalOpen = ref(false);
const selectedPurchaseOrderId = ref<number | null>(null);

const setComboProduct = (productId) => {
  comboProductId.value = productId;
}

const setBranchTransferProduct = (productId) => {
  branchTransferProductId.value = productId;
}

const setHmoTransferProduct = (productId) => {
  hmoTransferProductId.value = productId;
  const enableProductFormData = ref({
    id: 0,
    name: ''
  })
}

const openActivityLogModal = (purchase_order): void => {
  selectedPurchaseOrderId.value = purchase_order.id;
  isModalOpen.value = true;
}

const handleModalClose = (): void => {
  console.log('Modal closed');
  selectedPurchaseOrderId.value = null;
}

const openEnableProductWarningModal = (product) => {
  enableProductFormData.value = product;
  showEnableProductWarningModal.value = true;
}

const enableProduct = () => {
  if (enableProductFormData.value.id === 0) return;
  loading.value = true;
  showEnableProductWarningModal.value = false;
  axios.get(import.meta.env.VITE_API_URL + "products/" + enableProductFormData.value.id + "/enable").then(response => {
    toast.success("Product enabled successfully");
    childKey.value++;
  }).catch(err => {
    error(err);
  }).finally(() => loading.value = false);
}

const editProduct = (id) => {
  editProductId.value = id;
  isEditProductModalOpen.value = true;
}

const openDeleteProductWarningModal = (product) => {
  deleteProductFormData.value = product;
  showDeleteProductWarningModal.value = true;
};

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

</script>
<style>
.discard_merge_alert_footer button.delete_btn {
  background-color: #c9372c;
  color: white;
}
</style>