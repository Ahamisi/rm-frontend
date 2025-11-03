<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="HMO & Pharmacy / HMO Loans" />

    <!-- Initial Search Screen -->
    <div class="flex items-center justify-center min-h-[calc(100vh-190px)]" v-if="!hasSearched">
      <div class="intro_search_wrapper">
        <div class="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
              fill="#0C66E4" />
          </svg>
          <h3>Let's Find Your Customer Loans</h3>
        </div>
        <p class="my-4 text-center">Please search Customer Name or Store Name to load customer loans</p>
        <div class="relative grid items-baseline grid-cols-1 gap-2 md:grid-cols-8 search_content">
          <div class="md:col-span-3">
            <CustomSelectDropdown 
              v-model="selectedSearchBy"
              :options="searchByOptions"
              placeholder="Select search type"
            />
          </div>
          <div class="relative p-0 m-0 md:col-span-4">
            <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M14.1965 12.5708L17.4798 15.9125C17.6269 16.0715 17.7063 16.2815 17.7012 16.498C17.6961 16.7145 17.6069 16.9206 17.4525 17.0725C17.2982 17.2244 17.0907 17.3102 16.8741 17.3117C16.6575 17.3133 16.4489 17.2305 16.2923 17.0808L13.0106 13.7425C11.7444 14.6964 10.163 15.1334 8.58669 14.9652C7.01035 14.7969 5.55684 14.036 4.52048 12.8363C3.48411 11.6367 2.94234 10.0881 3.00487 8.50399C3.06739 6.91993 3.72953 5.41881 4.85722 4.3046C5.98491 3.19038 7.49388 2.54632 9.07858 2.50284C10.6633 2.45936 12.2053 3.0197 13.3924 4.07041C14.5795 5.12111 15.3229 6.58366 15.4722 8.16192C15.6215 9.74017 15.1655 11.3162 14.1965 12.5708ZM9.2498 13.3333C10.4654 13.3333 11.6312 12.8505 12.4907 11.9909C13.3502 11.1314 13.8331 9.96558 13.8331 8.75C13.8331 7.53443 13.3502 6.36864 12.4907 5.5091C11.6312 4.64956 10.4654 4.16667 9.2498 4.16667C8.03422 4.16667 6.86843 4.64956 6.00889 5.5091C5.14935 6.36864 4.66646 7.53443 4.66646 8.75C4.66646 9.96558 5.14935 11.1314 6.00889 11.9909C6.86843 12.8505 8.03422 13.3333 9.2498 13.3333Z"
                fill="#626F86" />
            </svg>
            <input type="text" v-model="search" class="w-full pr-3 pl-10 py-2 border-2 border-gray-300 rounded-md focus:outline-none special-input" style="height: 38px;">
          </div>
          <Button type="blue-btn" :onClick="performSearch" classStyle="px-4 py-2" style="height: 38px;">Search</Button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="min-h-[calc(100vh-190px)]" v-else>
      <!-- Contents -->
      <div class="px-0 mt-0 bg-white min-h-[calc(100vh-190px)]">
        <Datatable 
          :items="hmoLoans" 
          :columns="loanColumns" 
          :searchable="true" 
          :filterByDate="false" 
          :printable="false" 
          :exportable="false" 
          :showActions="false"
          pageName="HmoLoans" 
          :key="childKey"
        >
          <template #header_actions>
            <div class="flex items-center gap-3">
              <Button type="gray-btn" :onClick="repayRequestLoan" classStyle="px-3 py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0015 6.003V8.998C8.0015 9.26322 8.10686 9.51757 8.29439 9.70511C8.48193 9.89264 8.73628 9.998 9.0015 9.998C9.26672 9.998 9.52107 9.89264 9.70861 9.70511C9.89614 9.51757 10.0015 9.26322 10.0015 8.998V5.102C10.0015 4.494 9.5085 4 8.9015 4H5.0015C4.73589 4 4.48115 4.10551 4.29333 4.29333C4.10551 4.48115 4 4.73589 4 5.0015C4 5.26711 4.10551 5.52185 4.29333 5.70967C4.48115 5.89748 4.73589 6.003 5.0015 6.003H8.0015Z" fill="#44546F"/>
<path d="M9.4295 18.018C7.3525 16.989 6.0015 14.807 6.0015 12.37C6.0015 10.104 7.1685 8.051 9.0215 6.945C9.5015 6.659 9.6675 6.023 9.3925 5.524C9.33065 5.40677 9.24564 5.30331 9.14263 5.21991C9.03961 5.13651 8.92073 5.0749 8.79319 5.0388C8.66565 5.00271 8.53211 4.99289 8.40067 5.00994C8.26922 5.027 8.14261 5.07056 8.0285 5.138C5.5585 6.611 4.0015 9.35 4.0015 12.37C4.0015 15.618 5.8035 18.528 8.5715 19.899C9.0695 20.146 9.6665 19.925 9.9035 19.406C10.1405 18.886 9.9285 18.265 9.4295 18.018Z" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0015 15.002V18.898C14.0015 19.506 14.4945 20 15.1015 20H19.0015C19.2671 20 19.5219 19.8945 19.7097 19.7067C19.8975 19.5188 20.003 19.2641 20.003 18.9985C20.003 18.7329 19.8975 18.4782 19.7097 18.2903C19.5219 18.1025 19.2671 17.997 19.0015 17.997H16.0015V15.002C16.0015 14.7368 15.8961 14.4824 15.7086 14.2949C15.5211 14.1074 15.2667 14.002 15.0015 14.002C14.7363 14.002 14.4819 14.1074 14.2944 14.2949C14.1069 14.4824 14.0015 14.7368 14.0015 15.002Z" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0985 4.596C13.8615 5.116 14.0735 5.736 14.5725 5.983C16.6495 7.012 18.0005 9.193 18.0005 11.63C18.0005 13.896 16.8335 15.95 14.9795 17.055C14.7471 17.1988 14.5791 17.4265 14.5102 17.6909C14.4413 17.9553 14.4768 18.2361 14.6095 18.475C14.8835 18.975 15.4945 19.148 15.9735 18.862C18.4435 17.389 20.0005 14.65 20.0005 11.63C20.0005 8.382 18.1985 5.472 15.4305 4.102C15.298 4.03537 15.1518 4.00045 15.0035 4C14.8113 4.00188 14.6238 4.05909 14.4633 4.16479C14.3028 4.27049 14.1761 4.4202 14.0985 4.596Z" fill="#44546F"/>
</svg>

                Repay/Request HMO Loan
              </Button>
          <!-- Import Dropdown -->
          <div class="relative inline-block h-full text-left" ref="importDropdownRef">
            <!-- Dropdown Button -->
            <button @click="toggleImportDropdown"
              class="inline-flex items-center justify-between w-full h-full py-2 px-3 text-xs font-semibold focus:outline-none bg-gray-100 hover:bg-gray-200 rounded border">
              <div class="flex items-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.32L9.29 11.253C9.10405 11.4403 8.9997 11.6936 8.9997 11.9575C8.9997 12.2214 9.10405 12.4747 9.29 12.662C9.38133 12.7544 9.4901 12.8278 9.61001 12.8779C9.72991 12.928 9.85856 12.9538 9.9885 12.9538C10.1184 12.9538 10.2471 12.928 10.367 12.8779C10.4869 12.8278 10.5957 12.7544 10.687 12.662L11.977 11.361L13.313 12.708C13.4043 12.8005 13.513 12.874 13.6329 12.9241C13.7527 12.9743 13.8813 13.0002 14.0113 13.0003C14.1412 13.0004 14.2699 12.9747 14.3898 12.9247C14.5098 12.8747 14.6186 12.8014 14.71 12.709C14.8953 12.5216 14.9993 12.2687 14.9995 12.0052C14.9997 11.7417 14.896 11.4887 14.711 11.301L12.746 9.321C12.6456 9.21904 12.5259 9.13806 12.3939 9.08275C12.262 9.02744 12.1203 8.99891 11.9772 8.99881C11.8341 8.99872 11.6924 9.02707 11.5604 9.0822C11.4283 9.13734 11.3085 9.21817 11.208 9.32Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.007L11.001 19.993C11.001 20.55 11.449 21.001 12.001 21C12.554 21 13.001 20.55 13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 10.999 9.451 11 10.007Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.481C7.68114 5.43897 7.42128 5.4179 7.161 5.418C4.356 5.419 2 7.62 2 10.499C2 13.408 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.463 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.993C13.987 5.003 14.954 5.37825 15.7027 6.04875C16.4514 6.71924 16.9306 7.63919 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.666 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.021 9.075 3.901 7.938 5.481Z" fill="#44546F"/>
                </svg>
                Import
                <div class="w-px h-4 bg-gray-400 mx-0.5"></div>
              </div>
              <svg class="w-3 h-3 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Items -->
            <transition name="fade">
              <div v-if="showImportDropdown"
                class="absolute z-50 pt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-sm w-max">
                <div class="border-gray-100">
                  <a href="#" @click.prevent="openImportLoanRequest"
                    class="block hover:pl-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Import HMO Loan Request
                  </a>
                </div>
                <div class="border-gray-100 border-b">
                  <a href="#" @click.prevent="openImportManualReconciliations"
                    class="block hover:pl-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Import Manual Reconciliations
                  </a>
                </div>
              </div>
            </transition>
          </div>
              <Button type="blue-btn" :onClick="downloadReport" classStyle="px-3 py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
</svg>

                Download HMO Loan Report
              </Button>
            </div>
          </template>
          <template #column="col">
            <!-- ID -->
            <span v-if="col.props.column.field === 'id'">
              <span class="font-medium">{{ col.props.row.id }}</span>
            </span>
            
            <!-- HMO Name -->
            <span v-else-if="col.props.column.field === 'hmo_name'">
              <span>{{ col.props.row.hmo_name }}</span>
            </span>
            
            <!-- Store Name -->
            <span v-else-if="col.props.column.field === 'store_name'">
              <span class="text-gray-700">{{ col.props.row.store_name }}</span>
            </span>
            
            <!-- Requested Loan -->
            <span v-else-if="col.props.column.field === 'requested_loan'">
              <span class="font-medium">{{ col.props.row.requested_loan }}</span>
            </span>
            
            <!-- Repaid Loan -->
            <span v-else-if="col.props.column.field === 'repaid_loan'">
              <span class="font-medium">{{ col.props.row.repaid_loan }}</span>
            </span>
            
            <!-- Outstanding Loan -->
            <span v-else-if="col.props.column.field === 'outstanding_loan'">
              <span class="font-medium">{{ col.props.row.outstanding_loan }}</span>
            </span>
            
            <!-- Last 1 Mth. Orders -->
            <span v-else-if="col.props.column.field === 'last_1_mth_orders'">
              <span class="text-gray-700">{{ col.props.row.last_1_mth_orders }}</span>
            </span>
            
            <!-- Last 2 Mth. Orders -->
            <span v-else-if="col.props.column.field === 'last_2_mth_orders'">
              <span class="text-gray-700">{{ col.props.row.last_2_mth_orders }}</span>
            </span>
            
            <!-- Last 3 Mth. Orders -->
            <span v-else-if="col.props.column.field === 'last_3_mth_orders'">
              <span class="text-gray-700">{{ col.props.row.last_3_mth_orders }}</span>
            </span>
            
            <!-- Default -->
            <span v-else class="text-xs">
              {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Success Toast for Download Report -->
    <SuccessAlertToast 
      :isVisible="showDownloadReportToast" 
      message="HMO Loan Report downloaded successfully" 
      @close="showDownloadReportToast = false" 
    />

    <!-- Request/Repay HMO Loan Modal -->
    <SideBarModal 
      :is-open="showLoanModal" 
      width="small" 
      @close="closeLoanModal"
    >
      <template #header>
        <h2 class="text-lg font-medium text-[#172B4D]">Request/Repay HMO Loan</h2>
      </template>

      <div class="p-6 space-y-6">
        <!-- Customer Name -->
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">Customer Name</label>
          <SelectField
            v-model="loanForm.customerName"
            :options="customerOptions"
            placeholder="Select a customer name"
          />
        </div>

        <!-- Loan Type -->
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">Loan Type</label>
          <SelectField
            v-model="loanForm.loanType"
            :options="loanTypeOptions"
            placeholder="Select a loan type"
          />
        </div>

        <!-- Amount to Request/Repay -->
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">Amount to Request/Repay</label>
          <NairaInput
            v-model="loanForm.amount"
            placeholder="0.00"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeLoanModal" 
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="submitLoanRequest" 
            classStyle="px-4 py-2"
          >
            Request/Repay
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningModal"
      title="Request HMO Loan?"
      :message="warningMessage"
      confirmText="Request HMO Loan"
      cancelText="Cancel"
      @close="showWarningModal = false"
      @confirm="confirmLoanRequest"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      title="HMO Loan Requested"
      :message="successMessage"
      @close="closeSuccessModal"
    />

    <!-- Import HMO Loan Request Modal -->
    <SideBarModal 
      :is-open="showImportLoanRequestModal" 
      width="small" 
      @close="closeImportLoanRequestModal"
    >
      <template #header>
        <h2 class="text-lg font-medium text-[#172B4D]">Import Loan Request</h2>
      </template>

      <div class="p-6">
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">File</label>
          <div class="flex gap-2">
            <div class="flex-1 relative">
              <input 
                type="file" 
                ref="fileInputRef"
                @change="handleFileSelect"
                accept=".xls,.xlsx"
                class="hidden"
              />
              <div 
                @click="triggerFileSelect"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span v-if="selectedFile" class="text-gray-900">{{ selectedFile.name }}</span>
                <span v-else class="text-gray-500">Choose file to upload</span>
              </div>
            </div>
            <Button type="gray-btn" :onClick="uploadLoanRequest" classStyle="px-4 py-2">
              Upload
            </Button>
          </div>
          <p class="text-xs text-gray-500 mt-1">.xls max 100mb</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeImportLoanRequestModal" 
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="uploadLoanRequest" 
            classStyle="px-4 py-2"
          >
            Upload
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Import Manual Reconciliations Modal -->
    <SideBarModal 
      :is-open="showImportManualReconciliationsModal" 
      width="small" 
      @close="closeImportManualReconciliationsModal"
    >
      <template #header>
        <h2 class="text-lg font-medium text-[#172B4D]">Import Manual Reconciliations</h2>
      </template>

      <div class="p-6">
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">File</label>
          <div class="flex gap-2">
            <div class="flex-1 relative">
              <input 
                type="file" 
                ref="fileInputRef2"
                @change="handleFileSelect"
                accept=".xls,.xlsx"
                class="hidden"
              />
              <div 
                @click="triggerFileSelect2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span v-if="selectedFile" class="text-gray-900">{{ selectedFile.name }}</span>
                <span v-else class="text-gray-500">Choose file to upload</span>
              </div>
            </div>
            <Button type="gray-btn" :onClick="uploadManualReconciliations" classStyle="px-4 py-2">
              Upload
            </Button>
          </div>
          <p class="text-xs text-gray-500 mt-1">.xls max 100mb</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeImportManualReconciliationsModal" 
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="uploadManualReconciliations" 
            classStyle="px-4 py-2"
          >
            Upload
          </Button>
        </div>
      </template>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import CustomSelectDropdown from '@/views/Components/procurement/ui/CustomSelectDropdown.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import NairaInput from '@/views/Components/ui/NairaInput.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import SuccessModal from '@/views/Components/ui/SuccessModal.vue';
import { useDebounceFn } from '@vueuse/core';
import { onClickOutside } from '@vueuse/core';
import type { TableColumn, Option } from '@/types';

const SEARCH_DEBOUNCE_DELAY = 300;

// Reactive state
const childKey = ref(111);
const search = ref('');
const hasSearched = ref(false);
const loading = ref(false);
const showDownloadReportToast = ref(false);

// Modal states
const showLoanModal = ref(false);
const showWarningModal = ref(false);
const showSuccessModal = ref(false);

// Import modal states
const showImportDropdown = ref(false);
const showImportLoanRequestModal = ref(false);
const showImportManualReconciliationsModal = ref(false);
const selectedFile = ref<File | null>(null);
const importDropdownRef = ref<HTMLElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const fileInputRef2 = ref<HTMLInputElement | null>(null);

// Click outside to close dropdown
onClickOutside(importDropdownRef, () => {
  showImportDropdown.value = false;
});

// Loan form data
const loanForm = ref({
  customerName: null as Option | null,
  loanType: null as Option | null,
  amount: '0.00'
});

// Search By options
const searchByOptions = ref([
  { value: 'customer', label: 'Customer Name' },
  { value: 'store', label: 'Store Name' }
]);

const selectedSearchBy = ref<string>('customer');

// Computed messages for modals
const warningMessage = computed(() => {
  const amount = loanForm.value.amount || '0.00';
  return `You are about to request a new HMO loan of "₦${amount}". Please review and verify the information before proceeding as this action cannot be undone.`;
});

const successMessage = computed(() => {
  const amount = loanForm.value.amount || '0.00';
  return `The HMO loan request of "₦${amount}" has been successfully initiated.`;
});

// Customer options for SelectField
const customerOptions = ref<Option[]>([
  { id: 1, name: 'Reliance Health' },
  { id: 2, name: 'NEM Health' },
  { id: 3, name: 'Oluwatosin HMO' },
  { id: 4, name: 'Emma Bros HMO' },
  { id: 5, name: 'Xela HMO' },
  { id: 6, name: 'Kano HMO' },
  { id: 7, name: 'Abuja HMO' },
  { id: 8, name: 'Asaba HMO' },
  { id: 9, name: 'Lagos HMO' },
  { id: 10, name: 'Port Harcourt HMO' }
]);

// Loan type options for SelectField
const loanTypeOptions = ref<Option[]>([
  { id: 1, name: 'Emergency Loan' },
  { id: 2, name: 'Working Capital Loan' },
  { id: 3, name: 'Equipment Loan' },
  { id: 4, name: 'Inventory Loan' },
  { id: 5, name: 'Expansion Loan' }
]);

// Mock HMO Loans data
const hmoLoans = ref([
  { id: 1, hmo_name: "Reliance Health", store_name: "Emeka Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 2, hmo_name: "NEM Health", store_name: "Lagos Central Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 3, hmo_name: "Oluwatosin HMO", store_name: "Abuja Medical Store", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 4, hmo_name: "Emma Bros HMO", store_name: "Kano Health Center", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 5, hmo_name: "Xela HMO", store_name: "Port Harcourt Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 6, hmo_name: "Kano HMO", store_name: "Enugu Medical Store", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 7, hmo_name: "Abuja HMO", store_name: "Ibadan Health Center", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 8, hmo_name: "Asaba HMO", store_name: "Kaduna Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 9, hmo_name: "Lagos HMO", store_name: "Benin Medical Store", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 10, hmo_name: "Port Harcourt HMO", store_name: "Jos Health Center", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 11, hmo_name: "Enugu HMO", store_name: "Calabar Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 12, hmo_name: "Ibadan HMO", store_name: "Uyo Medical Store", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 13, hmo_name: "Kaduna HMO", store_name: "Maiduguri Health Center", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 14, hmo_name: "Benin HMO", store_name: "Akure Pharmacy", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" },
  { id: 15, hmo_name: "Jos HMO", store_name: "Bauchi Medical Store", requested_loan: "₦2,055,043.00", repaid_loan: "₦2,055,043.00", outstanding_loan: "₦2,055,043.00", last_1_mth_orders: "1,000", last_2_mth_orders: "1,000", last_3_mth_orders: "1,000" }
]);

// Table columns
const loanColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'HMO Name', field: 'hmo_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Requested Loan', field: 'requested_loan', sortable: true },
  { label: 'Repaid Loan', field: 'repaid_loan', sortable: true },
  { label: 'Outstanding Loan', field: 'outstanding_loan', sortable: true },
  { label: 'Last 1 Mth. Orders', field: 'last_1_mth_orders', sortable: true },
  { label: 'Last 2 Mth. Orders', field: 'last_2_mth_orders', sortable: true },
  { label: 'Last 3 Mth. Orders', field: 'last_3_mth_orders', sortable: true }
]);

// Watch selectedSearchBy changes
watch(selectedSearchBy, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    childKey.value++;
  }
});

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
  search.value = searchTerm;
  childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

// Actions
const performSearch = () => {
  hasSearched.value = true;
};

const repayRequestLoan = () => {
  showLoanModal.value = true;
};

const closeLoanModal = () => {
  showLoanModal.value = false;
  // Reset form
  loanForm.value = {
    customerName: null,
    loanType: null,
    amount: '0.00'
  };
};

const submitLoanRequest = () => {
  // Validate form
  if (!loanForm.value.customerName || !loanForm.value.loanType || !loanForm.value.amount || loanForm.value.amount === '0.00') {
    // Could add validation toast here
    return;
  }
  
  // Show warning confirmation
  showWarningModal.value = true;
};

const confirmLoanRequest = () => {
  showWarningModal.value = false;
  showLoanModal.value = false;
  
  // Simulate API call
  setTimeout(() => {
    showSuccessModal.value = true;
  }, 500);
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  // Reset form
  loanForm.value = {
    customerName: null,
    loanType: null,
    amount: '0.00'
  };
};

// Import functionality
const toggleImportDropdown = () => {
  showImportDropdown.value = !showImportDropdown.value;
};

const openImportLoanRequest = () => {
  showImportDropdown.value = false;
  showImportLoanRequestModal.value = true;
};

const openImportManualReconciliations = () => {
  showImportDropdown.value = false;
  showImportManualReconciliationsModal.value = true;
};

// File upload functionality
const triggerFileSelect = () => {
  fileInputRef.value?.click();
};

const triggerFileSelect2 = () => {
  fileInputRef2.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

const closeImportLoanRequestModal = () => {
  showImportLoanRequestModal.value = false;
  selectedFile.value = null;
};

const closeImportManualReconciliationsModal = () => {
  showImportManualReconciliationsModal.value = false;
  selectedFile.value = null;
};

const uploadLoanRequest = () => {
  if (!selectedFile.value) {
    alert('Please select a file first');
    return;
  }
  console.log('Uploading loan request file:', selectedFile.value.name);
  closeImportLoanRequestModal();
  // Could show success toast here
};

const uploadManualReconciliations = () => {
  if (!selectedFile.value) {
    alert('Please select a file first');
    return;
  }
  console.log('Uploading manual reconciliations file:', selectedFile.value.name);
  closeImportManualReconciliationsModal();
  // Could show success toast here
};

const downloadReport = () => {
  showDownloadReportToast.value = true;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/* Reuse the same styles from DeliveredOrders.vue */
.intro_search_wrapper {
  border-radius: 12px;
  color: rgba(98, 111, 134, 1);
  background: white;
  padding: 24px;
  width: 33em;
  box-shadow: 0px 2px 4px 0px #E5E2E9;
}

.intro_search_wrapper h3 {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.intro_search_wrapper p {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: rgba(68, 84, 111, 1);
  padding: 0 6.5em;
}

.intro_search_wrapper .search_content {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.data_table_select,
.intro_search_wrapper .search_content select,
.intro_search_wrapper .search_content input {
  border: 2px solid rgba(9, 30, 66, 0.14);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.intro_search_wrapper .search_content button {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  background: rgba(12, 102, 228, 1);
  padding: 0.825em 0.4em;
  border-radius: 6px;
}
</style>
