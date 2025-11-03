<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="HMO & Pharmacy / Pharmacies" />

    <!-- Datatable with Header Actions -->
    <Datatable
      :items="pharmaciesData"
      :columns="columns"
      :pageName="'pharmacies'"
      :searchable="true"
      :filterByDate="true"
      :showActions="true"
      :showPagination="true"
      @onSearch="handleSearch"
    >
      <!-- Header Actions Slot -->
      <template #header_actions>
        <div class="flex items-center gap-3">
          <Button type="gray-btn" :onClick="downloadReport" classStyle="px-3 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
            <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>

            Download Report
          </Button>
          <Button type="blue-btn" :onClick="openAddPharmacyModal" classStyle="px-3 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
</svg>

Add Pharmacies
          </Button>
        </div>
      </template>

      <!-- Column Slot for Status and Actions -->
      <template #column="{ props: slotProps }">
        <!-- Status Column -->
        <template v-if="slotProps.column.field === 'status'">
          <Pill 
            :type="slotProps.row.status === 'Approved' ? 'success' : 'grey'" 
            :text="slotProps.row.status" 
          />
        </template>
        
        <!-- Actions Column -->
        <template v-else-if="slotProps.column.field === 'actions'">
          <div class="flex items-center gap-2">
            <!-- Remove Store X Button -->
          
            <div @click="openRemoveStoreModal(slotProps.row)"
            class="cursor-pointer"
            title="Remove Store">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.5918 10.0154L7.117 11.499C7.02179 11.5915 6.94595 11.7021 6.89392 11.8242C6.84188 11.9464 6.81469 12.0776 6.81393 12.2104C6.81317 12.3432 6.83885 12.4747 6.88948 12.5975C6.9401 12.7202 7.01466 12.8316 7.10881 12.9252C7.20295 13.0189 7.31479 13.0928 7.43781 13.1427C7.56083 13.1927 7.69256 13.2176 7.82531 13.2161C7.95807 13.2146 8.0892 13.1866 8.21104 13.1339C8.33289 13.0812 8.44302 13.0047 8.535 12.909L10.0027 11.4325L11.442 12.878C11.6291 13.0661 11.8833 13.1721 12.1485 13.1727C12.4138 13.1734 12.6685 13.0686 12.8565 12.8815C13.0445 12.6944 13.1505 12.4403 13.1512 12.175C13.1519 11.9097 13.0471 11.6551 12.86 11.467L11.4127 10.0141L12.895 8.52298C13.0767 8.33388 13.1768 8.08097 13.1738 7.81874C13.1709 7.55651 13.065 7.30595 12.879 7.12104C12.6931 6.93612 12.4419 6.83166 12.1797 6.83016C11.9174 6.82865 11.6651 6.93022 11.477 7.11298L10.0015 8.59732L8.5 7.09002C8.3118 6.90742 8.05939 6.80606 7.79717 6.80776C7.53495 6.80947 7.28389 6.9141 7.09807 7.09913C6.91225 7.28416 6.80655 7.53478 6.80373 7.79699C6.80091 8.05921 6.90121 8.31204 7.083 8.50102L8.5918 10.0154Z" fill="#E56910"/>
                </svg>
            </div>

            
            <!-- Payment Card Sign -->
            <div 
              @click="openPaymentModal(slotProps.row)"
              class="cursor-pointer"
              title="View Payments"
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.013 17H19.013V11H5.013V17ZM5.013 9H19.013V7H5.013V9ZM19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5Z" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.013 15H9.013V13H7.013V15Z" fill="#44546F"/>
</svg>



</div>
          </div>
        </template>
        
        <!-- Default for other columns -->
        <template v-else>
          {{ slotProps.formattedRow[slotProps.column.field] }}
        </template>
      </template>
    </Datatable>

    <!-- Success Alert Toast -->
    <SuccessAlertToast 
      v-if="showDownloadReportToast" 
      title="Report Downloaded" 
      message="Pharmacy report has been downloaded successfully"
      @close="showDownloadReportToast = false"
    />

    <!-- Add Pharmacy Modal -->
    <SideBarModal 
      :is-open="showAddPharmacyModal" 
      width="medium" 
      @close="closeAddPharmacyModal"
    >
      <template #header>
        <h2 class="text-lg font-medium text-[#172B4D]">Add Pharmacies to HMO Benefits</h2>
      </template>

      <div class="p-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#44546F] mb-2">Store(s)</label>
            <CustomMultiSelect
              v-model="selectedStores"
              :options="storeOptions"
              placeholder="Select store(s)"
              labelField="name"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeAddPharmacyModal"
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="addPharmacy"
            classStyle="px-4 py-2"
          >
            Add
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Remove Store Warning Modal -->
    <WarningConfirmationModal
      :show="showRemoveStoreModal"
      title="Remove Store?"
      :message="removeStoreMessage"
      confirmText="Remove Store"
      confirmButtonType="yellow-btn"
      @close="closeRemoveStoreModal"
      @confirm="confirmRemoveStore"
    />

    <!-- Payment Modal -->
    <SideBarModal 
      :is-open="showPaymentModal" 
      width="large" 
      @close="closePaymentModal"
    >
      <template #header>
        <SideBarHead 
          title="Payments" 
          :subtitle="selectedPharmacy?.storeName?.toUpperCase()"
        >
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM4 4H12V6H4V4ZM4 8H12V10H4V8ZM4 12H12V12H4V12Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <div class="p-6">
        <!-- Payments Datatable -->
        <Datatable
          :items="payments"
          :columns="paymentColumns"
          :pageName="'payments'"
          :searchable="true"
          :showActions="true"
          :showPagination="false"
          @onSearch="handlePaymentSearch"
        >
          <!-- Actions Column Slot -->
          <template #column="{ props: slotProps }">
            <!-- Actions Column -->
            <template v-if="slotProps.column.field === 'actions'">
              <div class="flex items-center justify-center">
                <div 
                  @click="openPaymentDetailsModal(slotProps.row)"
                  class="cursor-pointer w-8 h-8  hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  title="View Payment Details"
                >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0013 15C6.2213 15 3.33547 11.45 3.33547 10C3.33547 8.33254 6.21797 5.00004 10.0021 5.00004C13.6488 5.00004 16.6671 8.31087 16.6671 10C16.6671 11.45 13.7821 15 10.0021 15H10.0013ZM10.0021 3.33337C5.4013 3.33337 1.66797 7.36754 1.66797 10C1.66797 12.5717 5.4813 16.6667 10.0013 16.6667C14.5205 16.6667 18.3346 12.5717 18.3346 10C18.3346 7.36754 14.6013 3.33337 10.0013 3.33337" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.98214 11.6534C9.06297 11.6534 8.31547 10.9059 8.31547 9.98671C8.31547 9.06754 9.06297 8.32004 9.98214 8.32004C10.9021 8.32004 11.6488 9.06754 11.6488 9.98671C11.6488 10.9059 10.9021 11.6534 9.98214 11.6534ZM9.98214 6.65337C8.1438 6.65337 6.6488 8.14837 6.6488 9.98671C6.6488 11.825 8.1438 13.32 9.98214 13.32C11.8213 13.32 13.3155 11.825 13.3155 9.98671C13.3155 8.14837 11.8213 6.65337 9.98214 6.65337Z" fill="#44546F"/>
</svg>

                </div>
              </div>
            </template>
            
            <!-- Default for other columns -->
            <template v-else>
              {{ slotProps.formattedRow[slotProps.column.field] }}
            </template>
          </template>
        </Datatable>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <Button 
            type="blue-btn" 
            :onClick="closePaymentModal"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Payment Details Modal -->
    <SideBarModal 
      :is-open="showPaymentDetailsModal" 
      width="medium" 
      @close="closePaymentDetailsModal"
    >
      <template #header>
        <SideBarHead 
          title="Payment Details" 
          :subtitle="selectedPayment?.transactionId"
        >
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM4 4H12V6H4V4ZM4 8H12V10H4V8ZM4 12H12V12H4V12Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <div class="p-6">
        <div class="space-y-6">
          <!-- Store Information -->
          <div class="pb-4 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Store Name</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Store Name</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-700">{{ selectedPharmacy?.storeName }} Pharmacy</span>
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">State</span>
                <span class="text-sm text-gray-700">Lagos State</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">LGA</span>
                <span class="text-sm text-gray-700">Ikeja</span>
              </div>
            </div>
          </div>

          <!-- Pharmacist Information -->
          <div class="pb-4 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Pharmacist</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Pharmacist Name</span>
                <div class="flex items-center gap-2">
                  
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.3346 9.99996C18.3346 14.6023 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6023 1.66797 9.99996C1.66797 5.39759 5.39893 1.66663 10.0013 1.66663C14.6037 1.66663 18.3346 5.39759 18.3346 9.99996ZM12.5013 7.49996C12.5013 8.88067 11.382 9.99996 10.0013 9.99996C8.62059 9.99996 7.5013 8.88067 7.5013 7.49996C7.5013 6.11925 8.62059 4.99996 10.0013 4.99996C11.382 4.99996 12.5013 6.11925 12.5013 7.49996ZM10.0013 16.6666C8.48621 16.6689 7.01593 16.1528 5.83464 15.2041V12.5C5.83464 11.5791 6.5738 10.8333 7.5013 10.8333H12.5013C13.4221 10.8333 14.168 11.5708 14.168 12.5V15.2041C13.0263 16.1191 11.578 16.6666 10.0013 16.6666Z" fill="#091E42" fill-opacity="0.31"/>
</svg>
<span class="text-sm text-gray-700">{{ selectedPharmacy?.customerName }} Emeka Kalu</span>


                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Phone</span>
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
</svg>
<span class="text-sm text-gray-700">{{ selectedPharmacy?.phone }}494384820</span>


                </div>
              </div>
            </div>
          </div>

          <!-- Created by Information -->
          <div class="pb-4 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Created by</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Name</span>
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.3346 9.99996C18.3346 14.6023 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6023 1.66797 9.99996C1.66797 5.39759 5.39893 1.66663 10.0013 1.66663C14.6037 1.66663 18.3346 5.39759 18.3346 9.99996ZM12.5013 7.49996C12.5013 8.88067 11.382 9.99996 10.0013 9.99996C8.62059 9.99996 7.5013 8.88067 7.5013 7.49996C7.5013 6.11925 8.62059 4.99996 10.0013 4.99996C11.382 4.99996 12.5013 6.11925 12.5013 7.49996ZM10.0013 16.6666C8.48621 16.6689 7.01593 16.1528 5.83464 15.2041V12.5C5.83464 11.5791 6.5738 10.8333 7.5013 10.8333H12.5013C13.4221 10.8333 14.168 11.5708 14.168 12.5V15.2041C13.0263 16.1191 11.578 16.6666 10.0013 16.6666Z" fill="#091E42" fill-opacity="0.31"/>
</svg>
<span class="text-sm text-gray-700">N/A</span>


                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Phone</span>
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
</svg>
<span class="text-sm text-gray-700">N/A</span>


                </div>
              </div>
            </div>
          </div>

          <!-- Payment Details -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Total Amount</span>
                <span class="text-sm text-gray-700">{{ selectedPayment?.amount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Date</span>
                <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
</svg>

                  <span class="text-sm text-gray-700">{{ selectedPayment?.date }}</span>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <Button 
            type="blue-btn" 
            :onClick="closePaymentDetailsModal"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import SideBarHead from '@/views/Components/ui/SideBarHead.vue';
import CustomMultiSelect from '@/views/Components/CustomMultiSelect.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import type { TableColumn } from '@/types';

// State
const loading = ref(false);
const showDownloadReportToast = ref(false);
const showAddPharmacyModal = ref(false);
const showRemoveStoreModal = ref(false);
const showPaymentModal = ref(false);
const showPaymentDetailsModal = ref(false);
const selectedPharmacy = ref<any>(null);
const selectedPayment = ref<any>(null);
const selectedStores = ref<any[]>([]);
const paymentSearch = ref('');

// Demo pharmacies data
const pharmaciesData = ref([
  {
    id: 87,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 54,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 25,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 30,
    customerName: 'Emmanuel Aba',
    storeName: 'Emma Bros Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 51,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 21,
    customerName: 'Emmanuel Aba',
    storeName: 'Emma Bros Pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 35,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 23,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 33,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 88,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 81,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  },
  {
    id: 80,
    customerName: 'Nyerhovwo Omuvwie',
    storeName: 'Xela pharmacy',
    storeAddress: '2 Saint Peter Church Street',
    phone: '+234 899 9999 999',
    status: 'Approved',
    dateCreated: '16/01/2025'
  }
]);

// Store options for multi-select
const storeOptions = ref([
  { id: 1, name: 'Emeka Pharmacy' },
  { id: 2, name: 'Emma Bros Pharmacy' },
  { id: 3, name: 'Xela Pharmacy' },
  { id: 4, name: 'MedPlus Pharmacy' },
  { id: 5, name: 'Health Plus' },
  { id: 6, name: 'Wellness Pharmacy' }
]);

// Mock payments data
const payments = ref([
  {
    id: 1,
    transactionId: 'HMO-1734092317-14080',
    description: 'Payment for 24 packs of Paracetamol',
    amount: '₦3,220.00',
    date: '16/01/2025 10:39 AM'
  },
  {
    id: 2,
    transactionId: 'HMO-1734092317-14081',
    description: 'Payment for 12 packs of Amoxicillin',
    amount: '₦2,150.00',
    date: '16/01/2025 11:15 AM'
  },
  {
    id: 3,
    transactionId: 'HMO-1734092317-14082',
    description: 'Payment for 6 packs of Vitamin C',
    amount: '₦1,800.00',
    date: '16/01/2025 12:30 PM'
  }
]);

// Computed
const removeStoreMessage = computed(() => {
  if (!selectedPharmacy.value) return '';
  return `You are about to remove this store "${selectedPharmacy.value.storeName}" from the HMO pharmacies list. You can re-add it later if needed, but this removal will take effect immediately.`;
});

const filteredPayments = computed(() => {
  if (!paymentSearch.value) return payments.value;
  return payments.value.filter(payment => 
    payment.transactionId.toLowerCase().includes(paymentSearch.value.toLowerCase()) ||
    payment.description.toLowerCase().includes(paymentSearch.value.toLowerCase())
  );
});

// Table columns
const columns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'customerName', label: 'Customer Name', sortable: true },
  { field: 'storeName', label: 'Store Name', sortable: true },
  { field: 'storeAddress', label: 'Store Address', sortable: true },
  { field: 'phone', label: 'Phone', sortable: true },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'dateCreated', label: 'Date Created', sortable: true },
  { field: 'actions', label: 'Action', sortable: false }
];

// Payment table columns
const paymentColumns: TableColumn[] = [
  { field: 'transactionId', label: 'Transaction ID', sortable: true },
  { field: 'description', label: 'Description', sortable: true },
  { field: 'amount', label: 'Total Amount', sortable: true },
  { field: 'date', label: 'Date', sortable: true },
  { field: 'actions', label: 'Action', sortable: false }
];

// Methods
const handleSearch = (searchTerm: string) => {
  console.log('Searching pharmacies:', searchTerm);
};

const handlePrint = () => {
  console.log('Printing pharmacies table');
};

const downloadReport = () => {
  showDownloadReportToast.value = true;
};

const openAddPharmacyModal = () => {
  showAddPharmacyModal.value = true;
};

const closeAddPharmacyModal = () => {
  showAddPharmacyModal.value = false;
  selectedStores.value = [];
};

const addPharmacy = () => {
  if (selectedStores.value.length === 0) {
    alert('Please select at least one store');
    return;
  }
  
  // Add each selected store as a new pharmacy
  selectedStores.value.forEach(store => {
    const newPharmacy = {
      id: Math.floor(Math.random() * 1000),
      customerName: 'New Customer', // Default values since we're not collecting this info
      storeName: store.name,
      storeAddress: '2 Saint Peter Church Street',
      phone: '+234 899 9999 999',
      status: 'Approved',
      dateCreated: new Date().toLocaleDateString('en-GB')
    };
    
    pharmaciesData.value.unshift(newPharmacy);
  });
  
  closeAddPharmacyModal();
  // Could show success toast here
};

const openRemoveStoreModal = (pharmacy: any) => {
  selectedPharmacy.value = pharmacy;
  showRemoveStoreModal.value = true;
};

const closeRemoveStoreModal = () => {
  showRemoveStoreModal.value = false;
  selectedPharmacy.value = null;
};

const confirmRemoveStore = () => {
  if (selectedPharmacy.value) {
    const index = pharmaciesData.value.findIndex(p => p.id === selectedPharmacy.value.id);
    if (index > -1) {
      pharmaciesData.value.splice(index, 1);
    }
  }
  closeRemoveStoreModal();
  // Could show success toast here
};

const openPaymentModal = (pharmacy: any) => {
  selectedPharmacy.value = pharmacy;
  showPaymentModal.value = true;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
  selectedPharmacy.value = null;
  paymentSearch.value = '';
};

const openPaymentDetailsModal = (payment: any) => {
  selectedPayment.value = payment;
  // Close the payment modal first, then open details modal
  showPaymentModal.value = false;
  setTimeout(() => {
    showPaymentDetailsModal.value = true;
  }, 100);
};

const closePaymentDetailsModal = () => {
  showPaymentDetailsModal.value = false;
  selectedPayment.value = null;
  // Reopen the payment modal when details modal is closed
  setTimeout(() => {
    showPaymentModal.value = true;
  }, 100);
};

const handlePaymentSearch = (searchTerm: string) => {
  console.log('Searching payments:', searchTerm);
};

onMounted(() => {
  // Initialize component
});
</script>

<style scoped>
/* Force custom styling for this page's datatable buttons */
:deep(table tbody td button) {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
  line-height: inherit !important;
}

/* Force the orange remove button styling */
:deep(table tbody td button[title="Remove Store"]) {
  background-color: #E56910 !important;
  color: white !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background-color 0.2s !important;
}

:deep(table tbody td button[title="Remove Store"]:hover) {
  background-color: #d45a0a !important;
}

/* Force the payment button styling */
:deep(table tbody td button[title="View Payments"]) {
  background-color: white !important;
  color: #44546F !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid #e5e7eb !important;
  transition: all 0.2s !important;
}

:deep(table tbody td button[title="View Payments"]:hover) {
  background-color: #f9fafb !important;
  border-color: #d1d5db !important;
}

/* Override any global table styling for our buttons */
:deep([id*="table-"] tbody td button),
:deep(table.w-full.table-auto tbody tr td button) {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
  line-height: inherit !important;
}

/* Ensure button SVGs are visible */
:deep(table tbody td button svg) {
  display: block !important;
  visibility: visible !important;
}
</style>
