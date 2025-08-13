<template>
  <div v-if="loading"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 loading_overlay">
    <LoadingState />
  </div>
  <div class="erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="All Suppliers" class="px-6" bgColor="white" />

    <div class=" min-h-[calc(100vh-190px)] px-6 bg-white">
      <Datatable :url="url" :filterByDate="false" :filterFields="filterFields" :columns="newColumns"
        pageName="ProcurementSupplier" :key="childKey">
        <template v-slot:header_actions>
          <button @click.prevent="isCreateSupplierModalOpen = true"
            class="flex items-center gap-x-1 px-2 py-1.5 rounded text-white create_btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                fill="white" />
            </svg>

            <span class="text-xs">Create Supplier</span>
          </button>
        </template>
        <template #column="col">
          <span v-if="col.props.column.field === 'status'" class="text-xs">
            <!-- <Tooltip :text="`${col.props.row.status}`"> -->
            <span :class="[
              'status rounded-md medium-text line-clamp-2 w-fit',
              statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
              'bg-gray-100 text-gray-800',
            ]">
              {{ col.props.row.status ? 'Active' : 'Inactive' }}
            </span>
            <!-- </Tooltip> -->
          </span>
          <span v-else-if="col.props.column.field === 'actions'">
            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
              <template #default="{ selectedItem, closeDropdown }">
                <router-link v-if="!selectedItem.is_invoiced" :to="{
                  name: 'procurements.suppliers.show',
                  params: { id: selectedItem.id },
                }" @click="closeDropdown()" as="li"
                  class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                      fill="#626F86" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                      fill="#626F86" />
                  </svg>

                  <span>View Supplier Details</span>
                </router-link>
                <li @click="openEditModal(selectedItem); closeDropdown();"
                  class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.02001 19.73C3.9869 19.892 3.99447 20.0597 4.04205 20.218C4.08963 20.3764 4.17573 20.5205 4.29265 20.6374C4.40956 20.7543 4.55364 20.8404 4.71199 20.888C4.87034 20.9355 5.03802 20.9431 5.20001 20.91L9.01001 20.13L4.80001 15.92L4.02001 19.73ZM9.94101 17.11L7.82101 14.99L16.306 6.5H16.308L18.429 8.621L9.94001 17.111L9.94101 17.11ZM19.844 7.207L17.724 5.085C17.5381 4.89908 17.3173 4.7517 17.0743 4.65131C16.8314 4.55092 16.5709 4.4995 16.308 4.5C15.796 4.5 15.284 4.695 14.893 5.085L5.13601 14.843L10.086 19.793L19.843 10.035C20.218 9.65995 20.4286 9.15133 20.4286 8.621C20.4286 8.09068 20.218 7.58206 19.843 7.207H19.844Z"
                      fill="#626F86" />
                  </svg>
                  Edit
                </li>
                <li @click="openDeleteSupplierWarningModal(selectedItem); closeDropdown();"
                  class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z"
                      fill="#626F86" />
                  </svg>
                  Delete
                </li>
              </template>
            </TableActionDropdown>
            <!-- <router-link :to="{ name: 'procurements.suppliers.show', params: { id: col.props.row.id } }"
                class="px-1 rounded hover:bg-gray-200">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.5 18C7.964 18 4.501 13.74 4.501 12C4.501 9.999 7.96 6 12.501 6C16.877 6 20.499 9.973 20.499 12C20.499 13.74 17.037 18 12.501 18H12.5ZM12.501 4C6.98 4 2.5 8.841 2.5 12C2.5 15.086 7.076 20 12.5 20C17.923 20 22.5 15.086 22.5 12C22.5 8.841 18.02 4 12.5 4"
                    fill="#44546F" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.477 13.984C11.374 13.984 10.477 13.087 10.477 11.984C10.477 10.881 11.374 9.984 12.477 9.984C13.581 9.984 14.477 10.881 14.477 11.984C14.477 13.087 13.581 13.984 12.477 13.984ZM12.477 7.984C10.271 7.984 8.477 9.778 8.477 11.984C8.477 14.19 10.271 15.984 12.477 15.984C14.684 15.984 16.477 14.19 16.477 11.984C16.477 9.778 14.684 7.984 12.477 7.984Z"
                    fill="#44546F" />
                </svg>
                <span>View Supplier Details</span>
              </router-link> -->
          </span>
          <span v-else class="text-xs">
            {{ col.props.formattedRow[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- create/edit supplier modal -->
    <SideBarModal :title="`${editSupplierId ? 'Edit' : 'Create'} Supplier`" :is-open="isCreateSupplierModalOpen"
      width="xl" :initial-form-data="supplierFormData" ref="createSupplierModal"
      @update:is-open="isCreateSupplierModalOpen = $event">

      <!-- Main content -->
      <template #default="{ formData }">
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Supplier Name</label>
              <v-select v-model="selectedSupplier" :options="suppliers" :searchable="true" :clearable="true"
                :placeholder="'Enter a supplier name'" @search="onSearch" @option:selected="onSupplierSelect"
                @search:input="onSearchInput" label="name" :taggable="true" :create-option="createOption"
                :reduce="supplier => supplier" />
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Type of Supplier</label>
              <select v-model="supplierFormData.supplier_type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" required>
                <option value="" disabled selected>Select a supplier type</option>
                <option v-for="type, id in supplier_types" :value="type" :key="`create-type-${id}`">{{ type }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Category</label>
              <select v-model="supplierFormData.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" id="type" required>
                <option value="" disabled selected>Select a category</option>
                <option v-for="cat, id in categories" :value="cat" :key="`create-category-${id}`">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Contact Name</label>
              <input type="text" v-model="supplierFormData.contact_name" placeholder="Enter contact name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Email</label>
              <input type="text" v-model="supplierFormData.email" placeholder="Enter email address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Phone</label>
              <input type="tel" v-model="supplierFormData.phone" placeholder="e.g 0801 234 5678"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Address</label>
              <input type="text" v-model="supplierFormData.address" placeholder="Enter a valid address"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">VAT Reference</label>
              <input type="text" v-model="supplierFormData.vat_reference" placeholder="Enter VAT reference number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Balance Date</label>
              <input type="date" v-model="supplierFormData.balance_date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
            <div class="relative">
              <label class="block mb-1 text-xs font-medium text-gray-700">Opening Balance</label>
              <input type="number" v-model="supplierFormData.opening_balance" step="0.5"
                placeholder="Enter the initial balance" @input="checkDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                style="padding-left: 1.5em;">

              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="absolute top-[32px] left-[5px]">
                <path
                  d="M7 18V7.052C6.99993 6.81932 7.07715 6.59322 7.21952 6.40919C7.36189 6.22515 7.56136 6.09363 7.7866 6.03526C8.01183 5.97689 8.25008 5.99499 8.46391 6.08671C8.67774 6.17843 8.85506 6.33858 8.968 6.542L15.032 17.458C15.1449 17.6614 15.3223 17.8216 15.5361 17.9133C15.7499 18.005 15.9882 18.0231 16.2134 17.9647C16.4386 17.9064 16.6381 17.7748 16.7805 17.5908C16.9229 17.4068 17.0001 17.1807 17 16.948V6M5 10H19M5 14H19"
                  stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
          </div>

          <h6 style="margin: 16px 0;">Bank Details</h6>
          <hr style="margin: 0;">

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Bank Name</label>
              <input type="text" v-model="supplierFormData.bank_name" placeholder="Enter Bank Name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Bank Code</label>
              <input type="number" v-model="supplierFormData.bank_code" placeholder="--"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Account Number</label>
              <input type="text" v-model="supplierFormData.account_number" placeholder="Enter the account number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-700">Account Holder</label>
              <input type="text" v-model="supplierFormData.account_holder" placeholder="--"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </div>
          </div>
        </div>
      </template>

      <!-- Footer buttons -->
      <template #footer="{ closeModal }">
        <div class="flex justify-end space-x-3">
          <button @click="handleShowCreateSupplierDiscardModal" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="() => editSupplierId ? editSupplier() : createSupplier()" type="button" class="approve_btn">
            {{ editSupplierId ? 'Update' : 'Create' }}
          </button>
        </div>
      </template>
    </SideBarModal>

    <!-- discard create/edit supplier warning Modal -->
    <UniversalCenteredModal :show="showDiscardSupplierWarningModal" @close="showDiscardSupplierWarningModal = false">
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
          You are about to leave the <strong>"{{ editSupplierId ? 'Edit' : 'Create New' }} Supplier"</strong> process.
          Any unsaved
          information
          will
          be lost.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="showDiscardSupplierWarningModal = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="handleDiscardSupplierModal" type="button" class="discard_btn">
            Discard Changes?
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- discard delete supplier warning Modal -->
    <UniversalCenteredModal :show="isDeleteSupplierWarningModalOpen" @close="isDeleteSupplierWarningModalOpen = false">
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
          You are about to delete this supplier <b class="capitalize">“{{ deleteSupplierFormData.name }}”</b>. This
          action will permanently remove it from the system.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="isDeleteSupplierWarningModalOpen = false" type="button" class="cancel_btn">
            Cancel
          </button>
          <button @click="deleteSupplier" type="button" class="delete_btn">
            Delete Supplier
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- delete supplier success Modal -->
    <UniversalCenteredModal :show="showDeleteSupplierSuccessModal" @close="showDeleteSupplierSuccessModal = false">
      <template #body>
        <div class="flex justify-center mb-4">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
              fill="#22A06B" />
            <path
              d="M18.7859 28.5635C18.47 28.2275 18.0341 28.0298 17.5732 28.0134C17.1122 27.997 16.6635 28.1632 16.3244 28.476C15.9854 28.7887 15.7836 29.2226 15.7628 29.6834C15.742 30.1442 15.9039 30.5945 16.2134 30.9365L22.5344 37.7947C23.4742 38.7152 24.8742 38.7152 25.7439 37.8472L26.3809 37.219C28.6813 34.9566 30.9791 32.6915 33.2742 30.4237L33.3442 30.3537C35.4891 28.2399 37.623 26.1147 39.7457 23.9785C40.0629 23.6463 40.2369 23.2028 40.23 22.7435C40.2231 22.2842 40.0359 21.8461 39.7088 21.5236C39.3817 21.2011 38.941 21.0202 38.4817 21.0198C38.0224 21.0194 37.5813 21.1996 37.2537 21.5215C35.1408 23.6466 33.0175 25.7612 30.8837 27.8652L30.8137 27.9352C28.6144 30.1093 26.4123 32.2804 24.2074 34.4487L18.7859 28.5635Z"
              fill="white" />
          </svg>
        </div>
        <h3 class="mb-3 text-center delete_success">Supplier Deleted Successfully!</h3>
        <p class="text-center">The supplier <b class="capitalize">“{{ deleteSupplierFormData.name }}”</b> has been
          successfully deleted from the system.</p>
      </template>

      <template #footer>
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <button @click="closeDeleteSupplierSuccessModal" type="button" class="approve_btn" style="color: white;">
            Done
          </button>
        </div>
      </template>
    </UniversalCenteredModal>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from "vue";
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { FilterField, FilterFields, TableColumn } from '@/types';
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import { useDataChangeTracker } from "@/views/Composables/useDataChangeTracker";
import { useToast } from "vue-toastification";
import axios from "axios";
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from "@/stores/auth";
import dayjs from "dayjs";


const emit = defineEmits(['refreshData']);

const authStore = useAuthStore();
const url = computed(() => import.meta.env.VITE_API_URL + "suppliers/all?current_branch=" + authStore.selectedBranch?.id);
const toast = useToast();
const isCreateSupplierModalOpen = ref(false);
const statusClasses = {
  Enabled: "bg-green-100 text-green-800",
  Disabled: "bg-red-100 text-red-800",
};

const childKey = ref(111);

const newColumns = ref<TableColumn[]>([
  {
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    label: 'Supplier Name',
    field: 'name',
    sortable: true,
  },
  {
    label: 'Contact Person',
    field: 'contact_name',
    sortable: false,
  },
  {
    label: 'Phone',
    field: 'phone',
    sortable: false,
  },
  {
    label: 'Category',
    field: 'category',
    sortable: false,
  },
  {
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    label: 'Actions',
    field: 'actions',
    sortable: false,
  },
])

const filterFields = ref<FilterFields<FilterField>>({
  "Category": {
    label: "Category",
    field: "category",
    type: "select",
    options: [
      { name: "All", id: "" },
      { name: "Local Supplier", id: 'Local Supplier' },
      { name: "Overseas Supplier", id: 'Overseas Supplier' },
    ]
  },
  "status": {
    label: "Status",
    field: "status",
    type: "select",
    options: [
      { name: "All", id: "" },
      { name: "Active", id: 1 },
      { name: "Inactive", id: 0 },
    ]
  },
})

const isDeleteSupplierWarningModalOpen = ref(false);
const deleteSupplierFormData = ref({
  id: 0,
  name: ''
})
const supplierFormData = ref({
  name: '',
  category: '',
  contact_name: '',
  address: '',
  phone: '',
  email: '',
  bank_name: '',
  bank_code: '',
  account_holder: '',
  account_number: '',
  supplier_type: '',
  opening_balance: 0,
  balance_date: '',
  vat_reference: '',
})
const suppliers = ref([]);
const selectedSupplier = ref(null);
const supplier_loading = ref(false);
const showDeleteSupplierSuccessModal = ref(false);
const loading = ref(false);
const showDiscardSupplierWarningModal = ref(false);
const createSupplierModal = ref(null);
const categories = ['Overseas Supplier', 'Local Supplier'];
const supplier_types = ['Sundry Supplier', 'Trade Supplier'];
const editSupplierId = ref(0);
let debounceTimeout: ReturnType<typeof setTimeout>;

const { hasChanged: supplierChanged, reset: resetSupplierChanges } = useDataChangeTracker(supplierFormData);

const handleShowCreateSupplierDiscardModal = () => {
  if (supplierChanged.value) {
    showDiscardSupplierWarningModal.value = true;
  } else {
    showDiscardSupplierWarningModal.value = false;
    createSupplierModal.value?.closeModal();
  }
}

// Replace your existing onSearch and onInput functions with these:
const onSearch = (query: string) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    if (query.length >= 3) {
      supplier_loading.value = true;
      axios.get(import.meta.env.VITE_API_URL + `admin/search_supplier_in_other_branches?search=${query}`)
        .then(res => {
          suppliers.value = res.data;
        })
        .catch(err => error(err))
        .finally(() => supplier_loading.value = false);
    } else {
      suppliers.value = [];
    }
  }, 500);
};


const createSupplier = () => {
  loading.value = true;
  axios.post(import.meta.env.VITE_API_URL + 'suppliers?current_branch=' + authStore.selectedBranch?.id, supplierFormData.value)
    .then(() => {
      handleDiscardSupplierModal()
      childKey.value++;
    }).catch(err => {
      error(err);
    }).finally(() => {
      loading.value = false;
    });
}

// This handles when user selects an option from dropdown
const onSupplierSelect = (selected) => {
  if (selected && typeof selected === 'object') {
    // Selected an existing supplier from the list
    selectedSupplier.value = selected;
    supplierFormData.value = {
      ...supplierFormData.value,
      ...selected
    };
  } else if (selected && typeof selected === 'string') {
    // User created a new supplier name
    selectedSupplier.value = null;
    supplierFormData.value.name = selected;
  } else if (!selected) {
    // Cleared selection
    selectedSupplier.value = null;
    supplierFormData.value.name = "";
  }
};

// This handles the search input (when user types)
const onSearchInput = (query: string) => {
  // Update form data with current search input
  supplierFormData.value.name = query;
};

const createOption = (option) => {
  return {
    id: null,
    name: option,
    isNew: true
  };
};

const handleDiscardSupplierModal = async () => {
  supplierFormData.value = {
    name: '',
    category: '',
    contact_name: '',
    address: '',
    phone: '',
    email: '',
    bank_name: '',
    bank_code: '',
    account_holder: '',
    account_number: '',
    supplier_type: '',
    opening_balance: 0,
    balance_date: '',
    vat_reference: '',
  }
  await nextTick(); // Wait for DOM update before closing modal
  resetSupplierChanges();
  editSupplierId.value = 0;
  createSupplierModal.value?.closeModal();
  showDiscardSupplierWarningModal.value = false;
}

const openEditModal = async (supplier) => {
  console.log('supplier', supplier)
  editSupplierId.value = supplier.id;
  supplierFormData.value = {
    name: supplier.name,
    category: supplier.category,
    contact_name: supplier.contact_name,
    address: supplier.address,
    phone: supplier.phone,
    email: supplier.email,
    bank_name: supplier.bank_details?.bank_name,
    bank_code: supplier.bank_details?.bank_code,
    account_holder: supplier.bank_details?.account_holder,
    account_number: supplier.bank_details?.account_number,
    supplier_type: '',
    opening_balance: supplier.opening_balance,
    balance_date: dayjs(supplier.balance_date).format('YYYY-MM-DD'),
    vat_reference: supplier.vat_reference,
  };
  await nextTick();
  resetSupplierChanges();
  suppliers.value = [supplier]
  selectedSupplier.value = supplier;
  isCreateSupplierModalOpen.value = true;
}

const editSupplier = () => {
  loading.value = true;
  axios.put(import.meta.env.VITE_API_URL + `suppliers/${editSupplierId.value}?current_branch=${authStore.selectedBranch?.id}`, supplierFormData.value)
    .then(() => {
      handleDiscardSupplierModal();
      childKey.value++;
    }).catch(err => {
      error(err);
    }).finally(() => {
      loading.value = false;
    });

}

const checkDate = () => {
  const today = new Date().toISOString().split("T")[0];
  if (supplierFormData.value.balance_date > today) {
    toast.error("Please select a date that is not in the future.");
    supplierFormData.value.balance_date = today;
  }
}

const openDeleteSupplierWarningModal = (supplier) => {
  deleteSupplierFormData.value = supplier;
  isDeleteSupplierWarningModalOpen.value = true;
}

const deleteSupplier = () => {
  isDeleteSupplierWarningModalOpen.value = false;
  loading.value = true;
  axios.delete(import.meta.env.VITE_API_URL + `suppliers/${deleteSupplierFormData.value.id}?current_branch=${authStore.selectedBranch?.id}`).then(response => {
    showDeleteSupplierSuccessModal.value = true;
  }).catch(err => {
    error(err)
  })
    .finally(() => loading.value = false)
}

const closeDeleteSupplierSuccessModal = () => {
  showDeleteSupplierSuccessModal.value = false;
  childKey.value++;
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
.status {
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  padding: 4px;
  border-radius: 3px;
}

.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.discard_merge_alert_footer .cancel_btn {
  background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .approve_btn {
  background: rgba(12, 102, 228, 1);
}

.discard_merge_alert_footer .delete_btn {
  background: rgb(228, 12, 12);
  color: white;
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

.delete_success {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}
</style>
