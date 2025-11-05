<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Customers Inventory POS" class="px-6" />

    <div class="px-6 py-6">
      <!-- POS Datatable -->
      <Datatable
        :items="posList"
        :columns="columns"
        :searchable="true"
        :filterByDate="true"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="POS"
      >
        <template #header_actions>
          <div class="flex items-center gap-3">
            <Button type="gray-btn" :onClick="handleDownloadReport">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                </svg>

              Download POS Report
            </Button>
            <Button type="gray-btn" :onClick="handleReverseTransaction">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99955 6.003V8.998C7.99955 9.26322 8.1049 9.51757 8.29244 9.70511C8.47998 9.89264 8.73433 9.998 8.99955 9.998C9.26476 9.998 9.51912 9.89264 9.70665 9.70511C9.89419 9.51757 9.99955 9.26322 9.99955 8.998V5.102C9.99955 4.494 9.50655 4 8.89955 4H4.99955C4.73393 4 4.4792 4.10551 4.29138 4.29333C4.10356 4.48115 3.99805 4.73589 3.99805 5.0015C3.99805 5.26711 4.10356 5.52185 4.29138 5.70967C4.4792 5.89748 4.73393 6.003 4.99955 6.003H7.99955Z" fill="#44546F"/>
              <path d="M9.42755 18.018C7.35055 16.989 5.99955 14.807 5.99955 12.37C5.99955 10.104 7.16655 8.051 9.01955 6.945C9.49955 6.659 9.66555 6.023 9.39055 5.524C9.3287 5.40677 9.24369 5.30331 9.14067 5.21991C9.03765 5.13651 8.91877 5.0749 8.79124 5.0388C8.6637 5.00271 8.53016 4.99289 8.39871 5.00994C8.26727 5.027 8.14066 5.07056 8.02655 5.138C5.55655 6.611 3.99955 9.35 3.99955 12.37C3.99955 15.618 5.80155 18.528 8.56955 19.899C9.06755 20.146 9.66455 19.925 9.90155 19.406C10.1385 18.886 9.92655 18.265 9.42755 18.018Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9995 15.002V18.898C13.9995 19.506 14.4925 20 15.0995 20H18.9995C19.2652 20 19.5199 19.8945 19.7077 19.7067C19.8955 19.5188 20.001 19.2641 20.001 18.9985C20.001 18.7329 19.8955 18.4782 19.7077 18.2903C19.5199 18.1025 19.2652 17.997 18.9995 17.997H15.9995V15.002C15.9995 14.7368 15.8942 14.4824 15.7067 14.2949C15.5191 14.1074 15.2648 14.002 14.9995 14.002C14.7343 14.002 14.48 14.1074 14.2924 14.2949C14.1049 14.4824 13.9995 14.7368 13.9995 15.002Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0965 4.596C13.8595 5.116 14.0715 5.736 14.5705 5.983C16.6475 7.012 17.9985 9.193 17.9985 11.63C17.9985 13.896 16.8315 15.95 14.9775 17.055C14.7452 17.1988 14.5771 17.4265 14.5082 17.6909C14.4393 17.9553 14.4749 18.2361 14.6075 18.475C14.8815 18.975 15.4925 19.148 15.9715 18.862C18.4415 17.389 19.9985 14.65 19.9985 11.63C19.9985 8.382 18.1965 5.472 15.4285 4.102C15.296 4.03537 15.1499 4.00045 15.0015 4C14.8094 4.00188 14.6218 4.05909 14.4613 4.16479C14.3008 4.27049 14.1742 4.4202 14.0965 4.596Z" fill="#44546F"/>
              </svg>

              Reverse Transaction
            </Button>
            <Button type="blue-btn" :onClick="handleLinkPOS">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6532 8.76404C12.491 8.91817 12.275 9.00284 12.0512 8.99998C11.8275 8.99713 11.6137 8.90698 11.4555 8.74875C11.2973 8.59053 11.2071 8.37675 11.2043 8.153C11.2014 7.92926 11.2861 7.71325 11.4402 7.55104L12.6542 6.33704C12.9994 5.99183 13.4092 5.71799 13.8602 5.53116C14.3112 5.34433 14.7945 5.24817 15.2827 5.24817C15.7709 5.24817 16.2543 5.34433 16.7053 5.53116C17.1563 5.71799 17.566 5.99183 17.9112 6.33704C18.257 6.68195 18.5314 7.09168 18.7186 7.54276C18.9058 7.99385 19.0022 8.47743 19.0023 8.96583C19.0024 9.45423 18.9062 9.93785 18.7191 10.389C18.5321 10.8402 18.2579 11.25 17.9122 11.595L16.6982 12.809L15.8942 13.613C15.5491 13.9591 15.1391 14.2338 14.6878 14.4214C14.2364 14.6089 13.7525 14.7057 13.2637 14.7062C12.775 14.7066 12.2909 14.6108 11.8392 14.4241C11.3875 14.2374 10.977 13.9635 10.6312 13.618C10.4702 13.4571 10.3798 13.2387 10.3798 13.011C10.3798 12.7834 10.4702 12.565 10.6312 12.404C10.7922 12.2431 11.0105 12.1526 11.2382 12.1526C11.4659 12.1526 11.6842 12.2431 11.8452 12.404C12.6262 13.186 13.8952 13.184 14.6812 12.399L15.4852 11.596L16.6992 10.382C16.8855 10.1963 17.0333 9.97569 17.1341 9.73275C17.2349 9.48981 17.2867 9.22935 17.2866 8.96633C17.2865 8.70331 17.2345 8.44289 17.1335 8.20002C17.0325 7.95715 16.8846 7.7366 16.6982 7.55104C16.5125 7.36508 16.2919 7.21757 16.0491 7.11692C15.8063 7.01627 15.546 6.96446 15.2832 6.96446C15.0204 6.96446 14.7601 7.01627 14.5173 7.11692C14.2745 7.21757 14.054 7.36508 13.8682 7.55104L12.6532 8.76404ZM11.8452 15.236C12.0074 15.0819 12.2234 14.9972 12.4472 15.0001C12.6709 15.0029 12.8847 15.0931 13.0429 15.2513C13.2011 15.4095 13.2913 15.6233 13.2942 15.8471C13.297 16.0708 13.2123 16.2868 13.0582 16.449L11.8442 17.663C11.499 18.0082 11.0893 18.2821 10.6383 18.4689C10.1873 18.6557 9.70388 18.7519 9.21571 18.7519C8.72754 18.7519 8.24415 18.6557 7.79315 18.4689C7.34215 18.2821 6.93237 18.0082 6.58721 17.663C6.24142 17.3181 5.96706 16.9084 5.77984 16.4573C5.59261 16.0062 5.49619 15.5226 5.49609 15.0342C5.496 14.5458 5.59224 14.0622 5.77929 13.6111C5.96635 13.1599 6.24056 12.7501 6.58621 12.405L7.80021 11.191L8.60421 10.387C8.94935 10.041 9.35931 9.76628 9.81066 9.57872C10.262 9.39116 10.7459 9.29438 11.2347 9.29391C11.7234 9.29345 12.2075 9.38931 12.6592 9.57601C13.1109 9.76272 13.5214 10.0366 13.8672 10.382C14.0282 10.543 14.1186 10.7614 14.1186 10.989C14.1186 11.2167 14.0282 11.4351 13.8672 11.596C13.7062 11.757 13.4879 11.8475 13.2602 11.8475C13.0325 11.8475 12.8142 11.757 12.6532 11.596C12.4667 11.4101 12.2454 11.2627 12.0019 11.1624C11.7584 11.062 11.4975 11.0106 11.2342 11.011C10.9708 11.0115 10.7101 11.0638 10.467 11.1651C10.2239 11.2663 10.0031 11.4145 9.81721 11.601L9.01321 12.404L7.79921 13.618C7.61293 13.8037 7.46515 14.0244 7.36435 14.2673C7.26355 14.5103 7.21171 14.7707 7.2118 15.0337C7.21189 15.2968 7.26392 15.5572 7.36489 15.8001C7.46587 16.0429 7.6138 16.2635 7.80021 16.449C7.98595 16.635 8.20653 16.7825 8.44933 16.8832C8.69212 16.9838 8.95238 17.0356 9.21521 17.0356C9.47804 17.0356 9.73829 16.9838 9.98109 16.8832C10.2239 16.7825 10.4445 16.635 10.6302 16.449L11.8452 15.236Z" fill="white"/>
                </svg>

              Link POS
            </Button>
          </div>
        </template>
        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <TableActionDropdown
              :rowData="col.props?.row"
              :menuItems="actionMenuItems"
              @menuAction="handleMenuAction"
            />
          </span>
          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- View Purchase Payments Modal -->
    <SideBarModal
      :title="`Purchase Payments #${selectedPOS?.pos_serial_no || ''}`"
      :is-open="showPurchasePaymentsModal"
      @update:isOpen="showPurchasePaymentsModal = $event"
      @close="handleClosePurchasePaymentsModal"
      width="large"
    >
      <template #default="{ formData, updateFormData }">
        <div class="px-6">
          <!-- Purchase Payments Datatable -->
          <Datatable
            :items="purchasePayments"
            :columns="paymentColumns"
            :searchable="true"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :filterFields="{}"
            pageName="Purchase Payments"
          >
            <template #column="col">
              <!-- Status Column -->
              <span v-if="col.props?.column?.field === 'status'">
                <Pill :type="getStatusPillType((col.props?.row as any)?.status)" :text="(col.props?.row as any)?.status" />
              </span>
              <!-- Default Column -->
              <span v-else>
                {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
              </span>
            </template>
          </Datatable>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end">
          <Button type="blue-btn" :onClick="handleClosePurchasePaymentsModal">Close</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit POS Modal -->
    <SideBarModal
      :title="`Update POS Details #${selectedPOS?.pos_serial_no || ''}`"
      :is-open="showEditModal"
      @update:isOpen="showEditModal = $event"
      @close="handleCloseEditModal"
      width="medium"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h2>Update POS Details</h2>
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="font-medium text-gray-700">#{{ selectedPOS?.pos_serial_no || '' }}</span>
          </div>
        </div>
      </template>

      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Serial No. -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Serial No.</label>
            <input 
              v-model="editForm.serialNo"
              type="text" 
              placeholder="Enter serial number"
              class="w-full"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseEditModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleUpdatePOS">Update</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Add Payment Modal -->
    <SideBarModal
      :title="`Add Payment to POS #${selectedPOS?.pos_serial_no || ''}`"
      :is-open="showAddPaymentModal"
      @update:isOpen="showAddPaymentModal = $event"
      @close="handleCloseAddPaymentModal"
      width="medium"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h2>Add Payment to POS</h2>
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7M3 7H21M7 13H17" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="font-medium text-gray-700">#{{ selectedPOS?.pos_serial_no || '' }}</span>
          </div>
        </div>
      </template>

      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Transaction Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
            <SelectField
              v-model="paymentForm.transactionType"
              :options="transactionTypeOptions"
              placeholder="Select a transaction type"
            />
          </div>

          <!-- Amount Paid -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Amount Paid</label>
            <NairaInput
              v-model="paymentForm.amountPaid"
              placeholder="0.00"
            />
          </div>

          <!-- Transaction Date (optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Transaction Date (optional)</label>
            <DateInput
              v-model="paymentForm.transactionDate"
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseAddPaymentModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleAddPayment">Add Payment</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Update Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showUpdateWarningModal"
      title="Update POS Details?"
      :message="updateWarningMessage"
      confirm-text="Update POS Details"
      confirm-button-type="yellow-btn"
      @close="showUpdateWarningModal = false"
      @confirm="confirmUpdatePOS"
    />

    <!-- Unlink Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showUnlinkWarningModal"
      title="Unlink POS?"
      :message="unlinkWarningMessage"
      confirm-text="Unlink POS"
      confirm-button-type="yellow-btn"
      @close="showUnlinkWarningModal = false"
      @confirm="confirmUnlinkPOS"
    />

    <!-- Reverse Transaction Modal -->
    <SideBarModal
      title="Reverse Business Wallet Transaction"
      :is-open="showReverseTransactionModal"
      @update:isOpen="showReverseTransactionModal = $event"
      @close="handleCloseReverseTransactionModal"
      width="medium"
    >
      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Store -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Store</label>
            <SelectField
              v-model="reverseTransactionForm.store"
              :options="storeOptions"
              placeholder="Select a store"
            />
          </div>

          <!-- Charge ID -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Charge ID</label>
            <input 
              v-model="reverseTransactionForm.chargeId"
              type="text" 
              placeholder="Enter transaction charge id"
              class="w-full"
            />
          </div>

          <!-- Is POS Purchase Payment Charge -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="reverseTransactionForm.isPOSPurchasePaymentCharge"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm font-medium text-gray-700">Is POS Purchase Payment Charge</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseReverseTransactionModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleReverseTransactionSubmit">Reverse</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Link POS Modal -->
    <SideBarModal
      title="Link POS to Store"
      :is-open="showLinkPOSModal"
      @update:isOpen="showLinkPOSModal = $event"
      @close="handleCloseLinkPOSModal"
      width="medium"
    >
      <template #default="{ formData, updateFormData }">
        <div class="space-y-6 px-6 mt-4">
          <!-- Store -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Store</label>
            <SelectField
              v-model="linkPOSForm.store"
              :options="storeOptions"
              placeholder="Select a store"
            />
          </div>

          <!-- Serial No. -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Serial No.</label>
            <input 
              v-model="linkPOSForm.serialNo"
              type="text" 
              placeholder="Enter POS serial number"
              class="w-full"
            />
          </div>

          <!-- Purchase Plan (Optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Purchase Plan (Optional)</label>
            <SelectField
              v-model="linkPOSForm.purchasePlan"
              :options="purchasePlanOptions"
              placeholder="Select a purchase plan"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
          <Button type="gray-btn" :onClick="handleCloseLinkPOSModal">Cancel</Button>
          <Button type="blue-btn" :onClick="handleLinkPOSSubmit">Link</Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Reverse Transaction Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showReverseWarningModal"
      title="Reverse Business Wallet Transaction?"
      :message="reverseWarningMessage"
      confirm-text="Reverse Transaction"
      confirm-button-type="yellow-btn"
      @close="showReverseWarningModal = false"
      @confirm="confirmReverseTransaction"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="successModalTitle"
      :message="successModalMessage"
      @close="showSuccessModal = false"
    />

    <!-- Success Toast -->
    <SuccessAlertToast
      :message="toastMessage"
      :duration="3000"
      :isVisible="showSuccessToast"
      @close="showSuccessToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import Button from "@/views/Components/ui/Button.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import NairaInput from "@/views/Components/ui/NairaInput.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import DateInput from "@/views/Components/ui/DateInput.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import { ref, h } from 'vue';
import type { TableColumn, MenuItem, Option } from '@/types';

// Icon components using h() function
const ViewIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4',
    fill: '#626F86'
  }),
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z',
    fill: '#626F86'
  })
]);

const EditIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z',
    fill: '#626F86'
  })
]);

const UnlinkIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M13.721 14.43C13.5394 14.2486 13.2934 14.1464 13.0368 14.1456C12.7801 14.1449 12.5336 14.2457 12.351 14.426L10.263 16.485C10.0834 16.6655 9.86989 16.8085 9.63475 16.906C9.39961 17.0035 9.1475 17.0535 8.89295 17.053C8.30495 17.053 7.75795 16.793 7.36795 16.315C6.73395 15.538 6.86295 14.382 7.57095 13.672L8.89195 12.35L8.89395 12.351L9.58195 11.665C9.76448 11.4824 9.86701 11.2347 9.86701 10.9765C9.86701 10.7183 9.76448 10.4707 9.58195 10.288L9.57995 10.285C9.48969 10.1947 9.38251 10.1231 9.26455 10.0742C9.14658 10.0253 9.02014 10.0001 8.89245 10.0001C8.76476 10.0001 8.63832 10.0253 8.52036 10.0742C8.40239 10.1231 8.29522 10.1947 8.20495 10.285L6.13695 12.355C5.40924 13.0846 5.00057 14.0731 5.00057 15.1035C5.00057 16.134 5.40924 17.1224 6.13695 17.852L6.14595 17.862C6.50607 18.2233 6.93407 18.5099 7.40534 18.7052C7.8766 18.9005 8.38182 19.0007 8.89195 19C9.40215 19.0006 9.90742 18.9002 10.3787 18.7047C10.8499 18.5092 11.2779 18.2225 11.638 17.861L13.721 15.776C13.8093 15.6877 13.8793 15.5829 13.9271 15.4675C13.9749 15.3521 13.9995 15.2284 13.9995 15.1035C13.9995 14.9786 13.9749 14.855 13.9271 14.7396C13.8793 14.6242 13.8093 14.5193 13.721 14.431V14.43ZM10.279 9.57003C10.4605 9.75144 10.7065 9.85367 10.9631 9.85442C11.2198 9.85517 11.4663 9.75438 11.649 9.57403L13.737 7.51603C14.103 7.14903 14.59 6.94603 15.107 6.94603C15.695 6.94603 16.242 7.20603 16.632 7.68503C17.266 8.46203 17.137 9.61803 16.429 10.328L15.108 11.65L15.106 11.649L14.418 12.335C14.2354 12.5177 14.1329 12.7653 14.1329 13.0235C14.1329 13.2817 14.2354 13.5294 14.418 13.712L14.42 13.715C14.8 14.095 15.415 14.095 15.795 13.715L17.863 11.645C18.5907 10.9154 18.9993 9.92701 18.9993 8.89653C18.9993 7.86605 18.5907 6.87763 17.863 6.14803L17.854 6.13803C17.4938 5.77672 17.0658 5.49018 16.5946 5.29487C16.1233 5.09957 15.6181 4.99937 15.108 5.00003C14.5978 4.9995 14.0925 5.09986 13.6212 5.29534C13.15 5.49081 12.722 5.77754 12.362 6.13903L10.279 8.22403C10.1906 8.31234 10.1206 8.41718 10.0728 8.53257C10.025 8.64796 10.0004 8.77163 10.0004 8.89653C10.0004 9.02143 10.025 9.1451 10.0728 9.26049C10.1206 9.37588 10.1906 9.48072 10.279 9.56903V9.57003ZM8.92395 4.61803L9.32495 5.58603C9.37518 5.70737 9.40102 5.83742 9.40099 5.96875C9.40096 6.10007 9.37507 6.23011 9.32479 6.35143C9.2745 6.47275 9.20082 6.58298 9.10793 6.67582C9.01505 6.76866 8.90479 6.8423 8.78345 6.89253C8.66211 6.94276 8.53206 6.9686 8.40074 6.96857C8.26941 6.96854 8.13937 6.94265 8.01805 6.89236C7.89673 6.84208 7.78651 6.7684 7.69366 6.67551C7.60082 6.58263 7.52718 6.47237 7.47695 6.35103L7.07695 5.38303C7.02672 5.26169 7.00088 5.13164 7.00091 5.00031C7.00094 4.86899 7.02683 4.73895 7.07712 4.61763C7.17867 4.37262 7.37339 4.17797 7.61845 4.07653C7.86351 3.97508 8.13883 3.97514 8.38385 4.07669C8.62887 4.17825 8.82351 4.37297 8.92495 4.61803H8.92395ZM5.38295 7.07603L6.35095 7.47703C6.58587 7.58537 6.76972 7.78045 6.86396 8.02137C6.9582 8.26229 6.95551 8.53034 6.85646 8.76932C6.7574 9.0083 6.56967 9.19965 6.33262 9.30325C6.09558 9.40685 5.82763 9.41465 5.58495 9.32503L4.61695 8.92503C4.38203 8.81669 4.19818 8.62161 4.10394 8.38069C4.0097 8.13977 4.01239 7.87172 4.11145 7.63274C4.21051 7.39376 4.39824 7.20241 4.63528 7.09881C4.87233 6.99521 5.14028 6.9874 5.38295 7.07703V7.07603ZM15.315 17.49C15.0702 17.592 14.8758 17.7867 14.7742 18.0317C14.6726 18.2766 14.6722 18.5518 14.773 18.797L15.175 19.765C15.2252 19.8864 15.2988 19.9966 15.3917 20.0895C15.4845 20.1824 15.5947 20.2561 15.7161 20.3064C15.8374 20.3566 15.9674 20.3825 16.0987 20.3826C16.2301 20.3826 16.3601 20.3568 16.4815 20.3065C16.6028 20.2563 16.7131 20.1827 16.8059 20.0898C16.8988 19.997 16.9725 19.8867 17.0228 19.7654C17.0731 19.6441 17.099 19.5141 17.099 19.3827C17.099 19.2514 17.0732 19.1214 17.023 19L16.622 18.033C16.5718 17.9116 16.4982 17.8012 16.4053 17.7082C16.3124 17.6153 16.2022 17.5415 16.0808 17.4911C15.9594 17.4408 15.8293 17.4149 15.6979 17.4149C15.5665 17.4149 15.4363 17.4407 15.315 17.491V17.49ZM17.491 15.316C17.3896 15.5608 17.3895 15.8359 17.4907 16.0808C17.592 16.3256 17.7863 16.5203 18.031 16.622L19 17.023C19.2426 17.1127 19.5106 17.1048 19.7476 17.0012C19.9847 16.8976 20.1724 16.7063 20.2715 16.4673C20.3705 16.2283 20.3732 15.9603 20.279 15.7194C20.1847 15.4784 20.0009 15.2834 19.766 15.175L18.797 14.775C18.5519 14.6738 18.2766 14.674 18.0317 14.7756C17.7868 14.8772 17.5923 15.072 17.491 15.317V15.316Z',
    fill: '#626F86'
  })
]);

const AddPaymentIcon = () => h('svg', {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M5.013 17H19.013V11H5.013V17ZM5.013 9H19.013V7H5.013V9ZM19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5Z',
    fill: '#626F86'
  }),
  h('path', {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M7.013 15H9.013V13H7.013V15Z',
    fill: '#626F86'
  })
]);

const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'POS Serial No.', field: 'pos_serial_no', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Purchase Plan', field: 'purchase_plan', sortable: false },
  { label: 'Price', field: 'price', sortable: true },
  { label: 'Amount Paid', field: 'amount_paid', sortable: true },
  { label: 'Delivery Date', field: 'delivery_date', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

const paymentColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Amount', field: 'amount', sortable: true },
  { label: 'Transaction Reference', field: 'transaction_reference', sortable: true },
  { label: 'Transaction Type', field: 'transaction_type', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];

const posList = ref([
  { id: 87, pos_serial_no: 'POS123456879', store_name: 'Emeka Pharmacy', purchase_plan: 'Lease to own from NGN 1000 per day for 230 days', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 54, pos_serial_no: 'POS908763546', store_name: 'Emeka Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 25, pos_serial_no: 'POS123456879', store_name: 'Emeka Pharmacy', purchase_plan: '70k outright and 25k for 6 months', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 30, pos_serial_no: 'POS908763546', store_name: 'Emma Bros Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 51, pos_serial_no: 'POS123456879', store_name: 'Emeka Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 21, pos_serial_no: 'POS908763546', store_name: 'Emma Bros Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 35, pos_serial_no: 'POS123456879', store_name: 'Xela pharmacy', purchase_plan: 'Lease to own from NGN 1000 per day for 230 days', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 23, pos_serial_no: 'POS908763546', store_name: 'Emeka Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 33, pos_serial_no: 'POS123456879', store_name: 'Emma Bros Pharmacy', purchase_plan: 'Lease to own from NGN 1000 per day for 230 days', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 87, pos_serial_no: 'POS908763546', store_name: 'Emeka Pharmacy', purchase_plan: '70k outright and 25k for 6 months', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 88, pos_serial_no: 'POS123456879', store_name: 'Emma Bros Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 81, pos_serial_no: 'POS908763546', store_name: 'Xela pharmacy', purchase_plan: '70k outright and 25k for 6 months', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 80, pos_serial_no: 'POS123456879', store_name: 'Emeka Pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 5, pos_serial_no: 'POS908763546', store_name: 'Xela pharmacy', purchase_plan: 'One-off payment of 209k (5% off)', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' },
  { id: 55, pos_serial_no: 'POS123456879', store_name: 'Emeka Pharmacy', purchase_plan: '70k outright and 25k for 6 months', price: '₦47,400.00', amount_paid: '₦47,400.00', delivery_date: '5/21/2024' }
]);

const purchasePayments = ref([
  { id: 87, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 54, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 25, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 30, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 51, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 21, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 35, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 23, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 33, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 87, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 88, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 81, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 80, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 5, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' },
  { id: 55, amount: '₦47,400.00', transaction_reference: '5780712A41A2', transaction_type: 'Debit', status: 'Success', date: '5/21/2024' }
]);

const showPurchasePaymentsModal = ref(false);
const showEditModal = ref(false);
const showAddPaymentModal = ref(false);
const showReverseTransactionModal = ref(false);
const showLinkPOSModal = ref(false);
const showSuccessModal = ref(false);
const showUpdateWarningModal = ref(false);
const showUnlinkWarningModal = ref(false);
const showReverseWarningModal = ref(false);
const showSuccessToast = ref(false);
const toastMessage = ref('');
const selectedPOS = ref<any>(null);
const successModalTitle = ref('');
const successModalMessage = ref('');
const updateWarningMessage = ref('');
const unlinkWarningMessage = ref('');
const reverseWarningMessage = ref('');

const editForm = ref({
  serialNo: ''
});

const paymentForm = ref({
  transactionType: null as any,
  amountPaid: '',
  transactionDate: ''
});

const reverseTransactionForm = ref({
  store: null as any,
  chargeId: '',
  isPOSPurchasePaymentCharge: false
});

const linkPOSForm = ref({
  store: null as any,
  serialNo: '',
  purchasePlan: null as any
});

const transactionTypeOptions: Option[] = [
  { id: 1, name: 'Debit' },
  { id: 2, name: 'Credit' },
  { id: 3, name: 'Refund' }
];

const storeOptions: Option[] = [
  { id: 1, name: 'Emeka Pharmacy' },
  { id: 2, name: 'Emma Bros Pharmacy' },
  { id: 3, name: 'Xela pharmacy' }
];

const purchasePlanOptions: Option[] = [
  { id: 1, name: 'Lease to own from NGN 1000 per day for 230 days' },
  { id: 2, name: 'One-off payment of 209k (5% off)' },
  { id: 3, name: '70k outright and 25k for 6 months' }
];

const actionMenuItems: MenuItem[] = [
  { 
    id: 'view-payments',
    label: 'View Purchase Payments', 
    action: 'view-payments', 
    icon: ViewIcon,
    iconClass: ''
  },
  { 
    id: 'edit',
    label: 'Edit', 
    action: 'edit', 
    icon: EditIcon,
    iconClass: ''
  },
  { 
    id: 'unlink',
    label: 'Unlink POS', 
    action: 'unlink', 
    icon: UnlinkIcon,
    iconClass: ''
  },
  { 
    id: 'add-payment',
    label: 'Add Custom Payment', 
    action: 'add-payment', 
    icon: AddPaymentIcon,
    iconClass: ''
  }
];

const getStatusPillType = (status: string): 'success' | 'grey' | 'danger' | 'hospital' => {
  switch (status) {
    case 'Success':
      return 'success'; // Green background
    case 'Pending':
      return 'grey'; // Grey background
    case 'Failed':
      return 'danger'; // Red background
    default:
      return 'grey';
  }
};

const handleMenuAction = (action: string, row: any) => {
  selectedPOS.value = row;
  
  if (action === 'view-payments') {
    showPurchasePaymentsModal.value = true;
  } else if (action === 'edit') {
    editForm.value.serialNo = row.pos_serial_no;
    showEditModal.value = true;
  } else if (action === 'unlink') {
    unlinkWarningMessage.value = `You are about to unlink the POS Terminal: "${row.pos_serial_no}". This will remove its connection to the current store/user, stopping transactions under that link. You may be able to re-link it later.`;
    showUnlinkWarningModal.value = true;
  } else if (action === 'add-payment') {
    paymentForm.value = {
      transactionType: null,
      amountPaid: '',
      transactionDate: ''
    };
    showAddPaymentModal.value = true;
  }
};

const handleUpdatePOS = () => {
  if (selectedPOS.value && editForm.value.serialNo !== selectedPOS.value.pos_serial_no) {
    updateWarningMessage.value = `You are about to update the serial number for POS Terminal: '${selectedPOS.value.pos_serial_no}'. The new serial number will be: '${editForm.value.serialNo}' Please verify the new serial number before proceeding. This change will take effect immediately. Are you sure you want to save these changes?`;
    showEditModal.value = false;
    showUpdateWarningModal.value = true;
  } else {
    showEditModal.value = false;
  }
};

const confirmUpdatePOS = () => {
  // TODO: Implement API call
  if (selectedPOS.value) {
    const oldSerialNo = selectedPOS.value.pos_serial_no;
    selectedPOS.value.pos_serial_no = editForm.value.serialNo;
    successModalTitle.value = 'POS Updated';
    successModalMessage.value = `POS serial number has been updated from '${oldSerialNo}' to '${editForm.value.serialNo}'.`;
    showUpdateWarningModal.value = false;
    showSuccessModal.value = true;
    selectedPOS.value = null;
  }
};

const confirmUnlinkPOS = () => {
  // TODO: Implement API call
  if (selectedPOS.value) {
    successModalTitle.value = 'POS Unlinked';
    successModalMessage.value = `POS Terminal '${selectedPOS.value.pos_serial_no}' has been successfully unlinked.`;
    showUnlinkWarningModal.value = false;
    showSuccessModal.value = true;
    selectedPOS.value = null;
  }
};

const handleAddPayment = () => {
  // TODO: Implement API call
  if (selectedPOS.value && paymentForm.value.amountPaid) {
    const formattedAmount = `₦${parseFloat(paymentForm.value.amountPaid).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    successModalTitle.value = 'Add Payment Successful';
    successModalMessage.value = `Your payment of "${formattedAmount}" has been added to the records.`;
    showAddPaymentModal.value = false;
    showSuccessModal.value = true;
    selectedPOS.value = null;
    paymentForm.value = {
      transactionType: null,
      amountPaid: '',
      transactionDate: ''
    };
  }
};

const handleCloseEditModal = () => {
  showEditModal.value = false;
  selectedPOS.value = null;
  editForm.value.serialNo = '';
};

const handleCloseAddPaymentModal = () => {
  showAddPaymentModal.value = false;
  selectedPOS.value = null;
  paymentForm.value = {
    transactionType: null,
    amountPaid: '',
    transactionDate: ''
  };
};

const handleClosePurchasePaymentsModal = () => {
  showPurchasePaymentsModal.value = false;
  selectedPOS.value = null;
};

const handleDownloadReport = () => {
  // TODO: Implement download report
  toastMessage.value = 'POS report has been downloaded successfully.';
  showSuccessToast.value = true;
};

const handleReverseTransaction = () => {
  reverseTransactionForm.value = {
    store: null,
    chargeId: '',
    isPOSPurchasePaymentCharge: false
  };
  showReverseTransactionModal.value = true;
};

const handleLinkPOS = () => {
  linkPOSForm.value = {
    store: null,
    serialNo: '',
    purchasePlan: null
  };
  showLinkPOSModal.value = true;
};

const handleReverseTransactionSubmit = () => {
  if (reverseTransactionForm.value.store && reverseTransactionForm.value.chargeId) {
    // Show warning modal with transaction details
    reverseWarningMessage.value = `You are about to reverse the following business wallet transaction. This action is critical and may be irreversible.<br><br><div style="background: #E9F2FF; padding: 12px; border-radius: 8px; margin: 12px 0;"><strong>Transaction Charge ID:</strong> ${reverseTransactionForm.value.chargeId}<br><strong>Amount:</strong> ₦15,000.00<br><strong>Date:</strong> 5/21/2024<br><strong>Store:</strong> ${reverseTransactionForm.value.store.name}</div><br>Reversing this transaction will attempt to debit the recipient and credit the source wallet. Ensure all details are correct before proceeding.`;
    showReverseTransactionModal.value = false;
    showReverseWarningModal.value = true;
  }
};

const confirmReverseTransaction = () => {
  // TODO: Implement API call
  successModalTitle.value = 'Transaction Reversed';
  successModalMessage.value = 'Business wallet transaction has been reversed successfully.';
  showReverseWarningModal.value = false;
  showSuccessModal.value = true;
  reverseTransactionForm.value = {
    store: null,
    chargeId: '',
    isPOSPurchasePaymentCharge: false
  };
};

const handleLinkPOSSubmit = () => {
  // TODO: Implement API call
  if (linkPOSForm.value.store && linkPOSForm.value.serialNo) {
    successModalTitle.value = 'POS Linked';
    successModalMessage.value = `POS ${linkPOSForm.value.serialNo} has been successfully linked to ${linkPOSForm.value.store.name}.`;
    showLinkPOSModal.value = false;
    showSuccessModal.value = true;
    linkPOSForm.value = {
      store: null,
      serialNo: '',
      purchasePlan: null
    };
  }
};

const handleCloseReverseTransactionModal = () => {
  showReverseTransactionModal.value = false;
  reverseTransactionForm.value = {
    store: null,
    chargeId: '',
    isPOSPurchasePaymentCharge: false
  };
};

const handleCloseLinkPOSModal = () => {
  showLinkPOSModal.value = false;
  linkPOSForm.value = {
    store: null,
    serialNo: '',
    purchasePlan: null
  };
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>
