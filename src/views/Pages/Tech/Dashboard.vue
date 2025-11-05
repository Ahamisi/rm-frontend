<template>
  <div class="erp_dashboard_wrapper grey_bg">

    <PageTitle :title="pageTitle" class="px-6" />

    <!-- White Container for all content with margin and rounded corners -->
    <div class="m-4 bg-white rounded-lg shadow-sm mb-0">
      <!-- Breadcrumbs -->

      <!-- Tabs -->
      <div class="px-6 pb-0 border-b border-gray-200">
        <NavlinkTab :links="tabLinks" :active-link="activeTab" @toggle-view="handleTabChange" />
      </div>

      <!-- Controls and Actions -->
      <div class="px-6 py-6" v-if="activeTab === 'Analytics'">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <button @click="toggleFilterDropdown"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.99999 13H17L18 11H5.99999L6.99999 13ZM3.99299 6C3.44499 6 3.20299 6.405 3.44699 6.895L3.99999 8H20L20.553 6.895C20.8 6.4 20.555 6 20.007 6H3.99299ZM10.778 17.556C10.8509 17.6861 10.9561 17.7953 11.0834 17.8731C11.2107 17.9508 11.3559 17.9945 11.505 18H12.495C12.774 18 13.1 17.8 13.222 17.556L14 16H9.99999L10.778 17.556Z"
                fill="#44546F" />
            </svg>
            Filter
          </button>
          <div class="flex items-center gap-1 text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z" fill="#626F86"/>
</svg>

            <span class="text-sm">This month: February, 2025</span>
          </div>
        </div>
      </div>

      <!-- Customer & Sales Performance Section -->
      <div class="border border-[#091E420F] p-[16px] pb-[40px] rounded-[16px]">
        <h2 class="text-md text-gray-900 mb-4">Customer & Sales Performance</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Customer Sign Ups Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Customer Sign Ups</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xl text-gray-900">300</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_signups)"/>
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_signups" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Total Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xl text-gray-900">7,697</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_customers)"/>
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_customers" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Sales Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Sales</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <p class="text-xl text-gray-900">0</p>
              </div>
            </div>
          </div>

          <!-- Delivered Sales Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Delivered Sales</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <p class="text-xl text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Operations & Processing Section -->
      <div class="border border-[#091E420F] p-[16px] pb-[40px] rounded-[16px]">
        <h2 class="text-md text-gray-900 mb-4">Operations & Processing</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Customer Orders Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Customer Orders</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xl text-gray-900">13 <span class="text-sm text-gray-600">(Unique 12)</span></p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_orders)"/>
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_orders" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Pending Stores Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Pending Stores</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xl text-gray-900">21</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_stores)"/>
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_stores" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Pending Orders Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-700">Pending Orders</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-xl text-gray-900">21</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_pending)"/>
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_pending" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- End of Analytics tab content -->
    </div>
    <!-- End of white container for Analytics -->

    <!-- Pending Stores Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Pending Stores'">
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="pendingStores"
          :columns="storeColumns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="PendingStores"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Pending Orders Tab Content -->
    <div class="m-4 bg-white rounded-lg shadow-sm mt-0" v-if="activeTab === 'Pending Orders'">
      <div class="px-6 py-6 min-h-[calc(100vh-190px)]">
        <Datatable
          :items="pendingOrders"
          :columns="orderColumns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
          pageName="PendingOrders"
        >
          <template #column="col">
            <span>
              {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import NavlinkTab from "@/views/Components/procurement/NavlinkTab.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import { ref, computed } from 'vue';
import type { TableColumn } from '@/types';

const activeTab = ref('Analytics');
const isFilterDropdownOpen = ref(false);

const tabLinks = [
  { label: 'Analytics', value: 'Analytics' },
  { label: 'Pending Stores', value: 'Pending Stores', count: 25 },
  { label: 'Pending Orders', value: 'Pending Orders', count: 25 }
];

const pageTitle = computed(() => {
  return `Dashboard / ${activeTab.value}`;
});

const handleTabChange = (value: string) => {
  activeTab.value = value;
};

const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

// Store Columns
const storeColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'State', field: 'state', sortable: true },
  { label: 'LGA', field: 'lga', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Order Columns
const orderColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Amount', field: 'amount', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Status', field: 'status', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for Pending Stores
const pendingStores = ref([
  { id: 1, store_name: 'Emeka Pharmacy', customer_name: 'Emeka Kalu', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 2, store_name: 'Emma Bros Pharmacy', customer_name: 'Emmanuel Aba', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 3, store_name: 'Xela pharmacy', customer_name: 'Nyerhovwo Omuvwie', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 4, store_name: 'Emeka Pharmacy', customer_name: 'Emeka Kalu', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' },
  { id: 5, store_name: 'Emma Bros Pharmacy', customer_name: 'Emmanuel Aba', phone: '+234 899 9999 999', state: 'Lagos', lga: 'Ikeja', date_created: '16/01/2025', action: '' }
]);

// Mock data for Pending Orders
const pendingOrders = ref([
  { id: 1, order_no: 'ORD-001', customer_name: 'Emeka Kalu', store_name: 'Emeka Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 2, order_no: 'ORD-002', customer_name: 'Emmanuel Aba', store_name: 'Emma Bros Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 3, order_no: 'ORD-003', customer_name: 'Nyerhovwo Omuvwie', store_name: 'Xela pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 4, order_no: 'ORD-004', customer_name: 'Emeka Kalu', store_name: 'Emeka Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' },
  { id: 5, order_no: 'ORD-005', customer_name: 'Emmanuel Aba', store_name: 'Emma Bros Pharmacy', amount: '₦47,400.00', order_date: '16/01/2025', status: 'Pending', action: '' }
]);
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>

