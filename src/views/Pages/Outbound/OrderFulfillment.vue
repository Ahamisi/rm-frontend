<template>
  <!-- Loading State -->
  <div 
    v-if="loading" 
    class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <LoadingState />
  </div>

  <!-- Main Content -->
  <div class="erp_dashboard_wrapper">
    <!-- Breadcrumb -->
    <div class="bg-white px-6 pt-4 pb-0">
      <nav class="text-[#626F86] text-sm space-x-2">
        <span>Order Fulfillment</span>
      </nav>
    </div>

    <!-- Header -->
    <div class="px-6 py-3 bg-white flex items-center justify-end">
      <!-- <div>
        <h5 class="text-sm font-normal text-gray-700">ORDER FULFILLMENT</h5>
      </div>
       -->
      <!-- Check In/Out Button -->
      <button 
        v-if="!isCheckedIn"
        @click="showCheckInModal = true"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="white"/>
          <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="white"/>
          <path d="M17.293 9.293C17.1975 9.38525 17.1213 9.49559 17.0689 9.6176C17.0165 9.7396 16.9889 9.87082 16.9877 10.0036C16.9866 10.1364 17.0119 10.2681 17.0622 10.391C17.1125 10.5139 17.1867 10.6255 17.2806 10.7194C17.3745 10.8133 17.4862 10.8875 17.609 10.9378C17.7319 10.9881 17.8636 11.0134 17.9964 11.0123C18.1292 11.0111 18.2604 10.9835 18.3824 10.9311C18.5044 10.8787 18.6148 10.8025 18.707 10.707L20.703 8.711C20.7972 8.61807 20.8719 8.50737 20.9229 8.38531C20.974 8.26326 21.0002 8.13229 21.0002 8C21.0002 7.86771 20.974 7.73674 20.9229 7.61469C20.8719 7.49263 20.7972 7.38193 20.703 7.289L18.707 5.293C18.5184 5.11084 18.2658 5.01005 18.0036 5.01233C17.7414 5.0146 17.4906 5.11977 17.3052 5.30518C17.1198 5.49059 17.0146 5.7414 17.0123 6.0036C17.01 6.2658 17.1108 6.5184 17.293 6.707L18.586 8L17.293 9.293Z" fill="white"/>
        </svg>
        Check In
      </button>
      
      <button 
        v-else
        @click="attemptCheckOut"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-400 text-white rounded-md hover:bg-gray-500"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="white"/>
          <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="white"/>
          <path d="M17.293 9.293C17.1975 9.38525 17.1213 9.49559 17.0689 9.6176C17.0165 9.7396 16.9889 9.87082 16.9877 10.0036C16.9866 10.1364 17.0119 10.2681 17.0622 10.391C17.1125 10.5139 17.1867 10.6255 17.2806 10.7194C17.3745 10.8133 17.4862 10.8875 17.609 10.9378C17.7319 10.9881 17.8636 11.0134 17.9964 11.0123C18.1292 11.0111 18.2604 10.9835 18.3824 10.9311C18.5044 10.8787 18.6148 10.8025 18.707 10.707L20.703 8.711C20.7972 8.61807 20.8719 8.50737 20.9229 8.38531C20.974 8.26326 21.0002 8.13229 21.0002 8C21.0002 7.86771 20.974 7.73674 20.9229 7.61469C20.8719 7.49263 20.7972 7.38193 20.703 7.289L18.707 5.293C18.5184 5.11084 18.2658 5.01005 18.0036 5.01233C17.7414 5.0146 17.4906 5.11977 17.3052 5.30518C17.1198 5.49059 17.0146 5.7414 17.0123 6.0036C17.01 6.2658 17.1108 6.5184 17.293 6.707L18.586 8L17.293 9.293Z" fill="white"/>
        </svg>
        Check Out
      </button>
    </div>

    <!-- Success Toast Modal -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />

    <!-- Warning Toast -->
    <WarningAlertToast
      message="You have a pending order that must be completed before checking out"
      :duration="3000"
      :isVisible="showWarningToast"
      @close="showWarningToast = false"
    />

    <!-- Check In Confirmation Modal -->
    <WarningConfirmationModal
      :show="showCheckInModal"
      title="Check In?"
      message="You are about to start your shift and begin receiving orders for processing. Please ensure you're ready to start processing orders."
      confirm-text="Check In"
      width="lg"
      :title-bold="true"
      @close="showCheckInModal = false"
      @confirm="checkIn"
    />

    <!-- Check Out Confirmation Modal -->
    <WarningConfirmationModal
      :show="showCheckOutModal"
      title="Check Out?"
      message="You are about to end your shift. Any pending orders will be reassigned. Make sure all your current orders are properly completed."
      confirm-text="Check Out"
      message-style="text-gray-600"
      @close="showCheckOutModal = false"
      @confirm="checkOut"
    />

    <!-- Content Area -->
    <div class="px-6 py-6 bg-[#F7F8F9] w-[97%] mx-auto rounded-[16px] flex items-center justify-center min-h-[calc(100vh-250px)]" >
      <!-- No Assigned Orders State -->
      <div v-if="!isCheckedIn" class="flex items-center justify-center h-full">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md w-full mx-4">
          <div class="flex items-center justify-center gap-3 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" fill="#1D7AFC"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">No Assigned Orders</h3>
          </div>
          <p class="text-gray-600 mb-6">
            You are currently checked out! Please check in to review new orders for processing.
          </p>
          <button 
            @click="showCheckInModal = true"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80 mx-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="white"/>
              <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="white"/>
              <path d="M17.293 9.293C17.1975 9.38525 17.1213 9.49559 17.0689 9.6176C17.0165 9.7396 16.9889 9.87082 16.9877 10.0036C16.9866 10.1364 17.0119 10.2681 17.0622 10.391C17.1125 10.5139 17.1867 10.6255 17.2806 10.7194C17.3745 10.8133 17.4862 10.8875 17.609 10.9378C17.7319 10.9881 17.8636 11.0134 17.9964 11.0123C18.1292 11.0111 18.2604 10.9835 18.3824 10.9311C18.5044 10.8787 18.6148 10.8025 18.707 10.707L20.703 8.711C20.7972 8.61807 20.8719 8.50737 20.9229 8.38531C20.974 8.26326 21.0002 8.13229 21.0002 8C21.0002 7.86771 20.974 7.73674 20.9229 7.61469C20.8719 7.49263 20.7972 7.38193 20.703 7.289L18.707 5.293C18.5184 5.11084 18.2658 5.01005 18.0036 5.01233C17.7414 5.0146 17.4906 5.11977 17.3052 5.30518C17.1198 5.49059 17.0146 5.7414 17.0123 6.0036C17.01 6.2658 17.1108 6.5184 17.293 6.707L18.586 8L17.293 9.293Z" fill="white"/>
            </svg>
            Check In
          </button>
        </div>
      </div>

      <!-- Waiting for Orders State -->
      <div v-else-if="isCheckedIn && !currentOrder" class="flex items-center justify-center h-full">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md w-full mx-4">
          <div class="flex items-center justify-center gap-3 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" fill="#1D7AFC"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">No Assigned Orders</h3>
          </div>
          <p class="text-gray-600 mb-6">
            Waiting for new orders... Please stay on this page and reload the page in 5 minutes if needed.
          </p>
          <button 
            @click="refreshOrders"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80 mx-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99955 6.003V8.998C7.99955 9.26322 8.1049 9.51757 8.29244 9.70511C8.47998 9.89264 8.73433 9.998 8.99955 9.998C9.26476 9.998 9.51912 9.89264 9.70665 9.70511C9.89419 9.51757 9.99955 9.26322 9.99955 8.998V5.102C9.99955 4.494 9.50655 4 8.89955 4H4.99955C4.73393 4 4.4792 4.10551 4.29138 4.29333C4.10356 4.48115 3.99805 4.73589 3.99805 5.0015C3.99805 5.26711 4.10356 5.52185 4.29138 5.70967C4.4792 5.89748 4.73393 6.003 4.99955 6.003H7.99955Z" fill="white"/>
              <path d="M9.42755 18.018C7.35055 16.989 5.99955 14.807 5.99955 12.37C5.99955 10.104 7.16655 8.051 9.01955 6.945C9.49955 6.659 9.66555 6.023 9.39055 5.524C9.3287 5.40677 9.24369 5.30331 9.14067 5.21991C9.03765 5.13651 8.91877 5.0749 8.79124 5.0388C8.6637 5.00271 8.53016 4.99289 8.39871 5.00994C8.26727 5.027 8.14066 5.07056 8.02655 5.138C5.55655 6.611 3.99955 9.35 3.99955 12.37C3.99955 15.618 5.80155 18.528 8.56955 19.899C9.06755 20.146 9.66455 19.925 9.90155 19.406C10.1385 18.886 9.92655 18.265 9.42755 18.018Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9995 15.002V18.898C13.9995 19.506 14.4925 20 15.0995 20H18.9995C19.2652 20 19.5199 19.8945 19.7077 19.7067C19.8955 19.5188 20.001 19.2641 20.001 18.9985C20.001 18.7329 19.8955 18.4782 19.7077 18.2903C19.5199 18.1025 19.2652 17.997 18.9995 17.997H15.9995V15.002C15.9995 14.7368 15.8942 14.4824 15.7067 14.2949C15.5191 14.1074 15.2648 14.002 14.9995 14.002C14.7343 14.002 14.48 14.1074 14.2924 14.2949C14.1049 14.4824 13.9995 14.7368 13.9995 15.002Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0965 4.596C13.8595 5.116 14.0715 5.736 14.5705 5.983C16.6475 7.012 17.9985 9.193 17.9985 11.63C17.9985 13.896 16.8315 15.95 14.9775 17.055C14.7452 17.1988 14.5771 17.4265 14.5082 17.6909C14.4393 17.9553 14.4749 18.2361 14.6075 18.475C14.8815 18.975 15.4925 19.148 15.9715 18.862C18.4415 17.389 19.9985 14.65 19.9985 11.63C19.9985 8.382 18.1965 5.472 15.4285 4.102C15.296 4.03537 15.1499 4.00045 15.0015 4C14.8094 4.00188 14.6218 4.05909 14.4613 4.16479C14.3008 4.27049 14.1742 4.4202 14.0965 4.596Z" fill="white"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Order Details (70% / 30% Layout) -->
      <div v-if="currentOrder" class="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <!-- Left Card - Order Details (70%) -->
        <div class="lg:col-span-7 bg-[#FFFFFF] rounded-lg shadow-sm border border-gray-200 p-6">
          <!-- Action Buttons at Top Right -->
          <div class="flex justify-between items-center mb-6">
            <h6 class="text-sm font-medium text-gray-900">ORDER FULFILLMENT</h6>
                          <div class="flex gap-2">
                <button 
                  @click="pickOrder"
                  class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80"
                >
                  Pick Order
                </button>
                <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Download Waybill
                </button>
                <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Download Invoice
                </button>
              </div>
          </div>
          
          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button 
                @click="activeTab = 'details'"
                :class="[
                  activeTab === 'details' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Details
              </button>
              <button 
                @click="activeTab = 'items'"
                :class="[
                  activeTab === 'items' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Order Items
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div v-if="activeTab === 'details'" class="space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full">
                <tbody>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Customer's Name</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ currentOrder.customer_name }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Customer Type</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ currentOrder.customer_type }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Order By</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ currentOrder.customer_name }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Agent Name</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ currentOrder.agent_name }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Phone</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83366 1.66667C4.91318 1.66667 4.16699 2.41286 4.16699 3.33334V16.6667C4.16699 17.5871 4.91318 18.3333 5.83366 18.3333H14.167C15.0875 18.3333 15.8337 17.5871 15.8337 16.6667V3.33334C15.8337 2.41286 15.0875 1.66667 14.167 1.66667H5.83366ZM14.167 3.33334H5.83366V14.1667H14.167V3.33334ZM11.667 15.8333H8.33366V16.6667H11.667V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                        </svg>
                        {{ currentOrder.phone }}
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Store</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                        </svg>
                        {{ currentOrder.store_name }}
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Order Amount</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ currentOrder.total_amount }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Order Date</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
                        </svg>
                        {{ currentOrder.order_date }}
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-700">Delivery Date</td>
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
                        </svg>
                        {{ currentOrder.delivery_date }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Order Items Tab -->
          <div v-else-if="activeTab === 'items'" class="space-y-4">
            <Datatable
              :data="orderItems"
              :columns="orderItemColumns"
              :searchable="false"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
            />
          </div>
        </div>

        <!-- Right Card - Order Activities (30%) -->
        <div class="lg:col-span-3 bg-[#FFFFFF] rounded-lg shadow-sm border border-gray-200 p-6">
          <h6 class="text-sm font-medium text-gray-900 mb-6">Order Activities</h6>
          <Activities :activities="orderActivities" orderRef="1656493689-254" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue'
import Activities from '@/views/Components/Activities.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import WarningAlertToast from '@/views/Components/WarningAlertToast.vue'
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'

const router = useRouter()

// Reactive state
const loading = ref(false)
const showToast = ref(false)
const showWarningToast = ref(false)
const toastMessage = ref('')
const showCheckInModal = ref(false)
const showCheckOutModal = ref(false)
const isCheckedIn = ref(false)
const currentOrder = ref<any>(null)
const activeTab = ref('details')

// Mock order data
const mockOrder = {
  id: 1,
  order_no: 'REF: 1656493689-254',
  customer_name: 'Janet Adeajayi',
  customer_type: 'Pharmacy',
  agent_name: 'Agent Oreva',
  phone: '+234 809 123 4567',
  store_name: 'Emeka Pharmacy',
  total_amount: '₦2,000,000.00',
  order_date: '5/21/2024',
  delivery_date: '5/21/2024'
}

const orderItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 20
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 10
  },
  {
    id: 3,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 1
  },
  {
    id: 4,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    quantity: 1
  },
  {
    id: 5,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    quantity: 1
  },
  {
    id: 6,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    quantity: 1
  },
  {
    id: 7,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    quantity: 1
  },
  {
    id: 8,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    quantity: 1
  }
])

const orderItemColumns = ref([
  {
    field: 'product_name',
    label: 'Product Name',
    width: '70%',
    sortable: false
  },
  {
    field: 'quantity',
    label: 'Quantity',
    width: '30%',
    sortable: false
  }
])

const orderActivities = ref([
  {
    action: 'New order assigned',
    time: 'Yesterday 10:45pm',
    description: 'REF: 1656493689-254 has been assigned to @Oreva Emamoro',
    user: 'Oreva Emamoro'
  },
  {
    action: 'New order status changed',
    time: 'Today 10:45pm',
    description: 'REF: 1656493689-254 has been updated to "Order Confirmed" by @Oreva Emamoro',
    user: 'Oreva Emamoro'
  },
  {
    action: 'Confirmed order assigned',
    time: 'Today 12:45pm',
    description: 'REF: 1656493689-254 has been assigned to @Oreva Emamoro',
    user: 'Oreva Emamoro'
  },
  {
    action: 'Confirmed order status changed',
    time: 'Today 12:45pm',
    description: 'REF: 1656493689-254 has been updated to "Being Processed" @Oreva Emamoro',
    user: 'Oreva Emamoro'
  },
  {
    action: 'Order being processed assigned',
    time: 'Today 12:45pm',
    description: 'REF: 1656493689-254 has been assigned to @Oreva Emamoro',
    user: 'Oreva Emamoro'
  }
])

// Functions
const checkIn = () => {
  loading.value = true
  showCheckInModal.value = false
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    isCheckedIn.value = true
    localStorage.setItem('isCheckedIn', 'true')
    toastMessage.value = 'Successfully checked in!'
    showToast.value = true
    
    // Simulate getting an order after check-in
    setTimeout(() => {
      currentOrder.value = mockOrder
    }, 2000)
  }, 1000)
}

const attemptCheckOut = () => {
  if (currentOrder.value) {
    showWarningToast.value = true
    return
  }
  showCheckOutModal.value = true
}

const checkOut = () => {
  loading.value = true
  showCheckOutModal.value = false
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    isCheckedIn.value = false
    localStorage.removeItem('isCheckedIn')
    currentOrder.value = null
    toastMessage.value = 'Successfully checked out!'
    showToast.value = true
  }, 1000)
}

const refreshOrders = () => {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    // Simulate getting an order
    currentOrder.value = mockOrder
  }, 1000)
}

const pickOrder = () => {
  // Navigate to picking list page
  router.push({ 
    name: 'outbound.picking-list', 
    params: { id: '1656493689-254' } 
  })
}

onMounted(() => {
  // Check if user is already checked in (from localStorage or API)
  const storedCheckInState = localStorage.getItem('isCheckedIn')
  if (storedCheckInState === 'true') {
    isCheckedIn.value = true
    // Also get current order if any
    currentOrder.value = mockOrder
  }
})
</script>