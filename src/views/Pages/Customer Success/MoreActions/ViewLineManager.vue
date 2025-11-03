<template>
  <div class="erp_dashboard_wrapper">
    <!-- Header with Back Button and Breadcrumbs -->
    <div class="">
      <div class="px-6 py-4 flex items-center gap-4">
        
        
        <div class="flex items-center gap-2 text-sm text-[#626F86]">
          <span>More Actions</span>
          <span>/</span>
          <span>Line Managers</span>
          <span>/</span>
          <span class="text-[#172B4D] font-medium">{{ lineManagerName }}</span>
          <span>/</span>
          <span class="text-[#172B4D] font-medium">{{ activeTab }}</span>
        </div>
      </div>
      
      <!-- Title -->
      <div class="px-6 pb-4 flex items-center justify-between relative mt-3">
        <button @click="goBack" class="flex items-center gap-2 text-sm text-[#626F86] hover:text-[#172B4D] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <h2 class="text-xs font-medium text-[#626F86] absolute left-1/2 -translate-x-1/2">View Line Manager</h2>
        <div class="invisible flex items-center gap-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Back</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-0 py-4 pt-0 bg-white">
      <!-- Tabs -->
      <Tabs :tabs="viewTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <template #default>
          <div class="flex items-center gap-3 ml-auto mb-1">
            
            <!-- <Button 
              type="blue-btn" 
              :onClick="downloadReport"
              classStyle="px-4 py-2 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V10M8 10L5 7M8 10L11 7M2 13H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Download Report
            </Button> -->
          </div>
        </template>
      </Tabs>

      <!-- Tab Content -->
      <div class="mt-6 px-6">
        <!-- Analytics Tab - 4 columns per row -->
        <div v-if="activeTab === 'Analytics'" class="grid grid-cols-4 gap-6">
          <!-- Sales Card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Sales</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">N665.02</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_sales)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_sales" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Orders Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Orders</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_orders)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_orders" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Active Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Active Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_active_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_active_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <!-- Inactive Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Inactive Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_inactive_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_inactive_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Dormant Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Dormant Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_dormant_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_dormant_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Deactivated Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Deactivated Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_deactivated_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_deactivated_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Pending Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Pending Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_pending_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_pending_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 3 -->
          <!-- Visits Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Visits</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_visits)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_visits" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Calls Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Calls</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_calls)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_calls" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Average Check in Time Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Average Check in Time</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_checkin)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_checkin" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Active Days Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Active Days</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_active_days)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_active_days" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Row 4 -->
          <!-- Buying Customers Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Buying Customers</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_buying_customers)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_buying_customers" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Payment Received Card -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-[12px] text-[#626F86]">Payment Received</h3>
            </div>
            <div class="flex items-baseline justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">N665.02</p>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                    </svg>
                    <span class="text-sm font-medium text-green-600">12.95%</span>
                  </div>
                </div>
                <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
              </div>
              <div class="w-10 h-7">
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_payment_received)"/>
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                  <defs>
                    <linearGradient id="paint0_linear_payment_received" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2"/>
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Performance Tab -->
        <div v-else-if="activeTab === 'Performance'" class="space-y-6">
          <!-- Orders Graph -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-[#172B4D] mb-4">Orders Graph</h3>
            <div class="relative h-96">
              <canvas ref="ordersChart" class="w-full h-full"></canvas>
            </div>
          </div>

          <!-- Sales Graph -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-[#172B4D] mb-4">Sales Graph</h3>
            <div class="relative h-96">
              <canvas ref="salesChart" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>
        
        <!-- Customers Tab -->
        <div v-else-if="activeTab === 'Customers'">
          <Datatable
            :items="customers"
            :columns="customerColumns"
            :searchable="true"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :filterFields="{}"
            pageName="LineManagerCustomers"
          />
        </div>
        
        <!-- Customer Sales Tab -->
        <div v-else-if="activeTab === 'Customer Sales'">
          <Datatable
            :items="customerSales"
            :columns="customerSalesColumns"
            :searchable="true"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :filterFields="{}"
            pageName="LineManagerCustomerSales"
          />
        </div>
        
        <!-- Sales Tab -->
        <div v-else-if="activeTab === 'Sales'">
          <Datatable
            :items="sales"
            :columns="salesColumns"
            :searchable="true"
            :filterByDate="false"
            :printable="false"
            :exportable="false"
            :filterFields="{}"
            pageName="LineManagerSales"
          >
            <template #column="col">
              <!-- Status Column -->
              <span v-if="col.props?.column?.field === 'status'">
                <Pill
                  :type="getStatusType(col.props?.row?.status)"
                  :text="col.props?.row?.status"
                />
              </span>
              
              <!-- Default Column -->
              <span v-else>
                {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
              </span>
            </template>
          </Datatable>
        </div>
        
        <!-- Visits Playback Tab -->
        <div v-else-if="activeTab === 'Visits Playback'">
          <!-- Custom Nested Tabs for Visits Playback -->
          <div class="px-0 border-b border-gray-200">
            <div class="flex items-center gap-1">
              <button
                v-for="(tab, index) in visitsPlaybackTabs"
                :key="index"
                @click="handleVisitsTabChange(tab, index)"
                class="px-3 py-2 text-sm font-medium transition-colors relative"
                :class="activeVisitsTab === (typeof tab === 'string' ? tab : tab.name)
                  ? 'text-[#0C66E4]'
                  : 'text-gray-600 hover:text-gray-800'"
              >
                {{ typeof tab === 'string' ? tab : tab.name }}
                <span
                  v-if="activeVisitsTab === (typeof tab === 'string' ? tab : tab.name)"
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0C66E4]"
                ></span>
              </button>
            </div>
          </div>
          
          <!-- Visits Map Tab -->
          <div v-if="activeVisitsTab === 'Visits Map'" class="flex gap-4 mt-4">
            <!-- Left Panel - Recent Visits List -->
            <div class="w-1/3 bg-white rounded-lg shadow-sm border p-4 flex flex-col">
              <!-- Search Bar -->
              <div class="mb-4 relative">
                <div class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm w-full h-[34px]">
                  <div class="flex items-center justify-center px-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#626F86" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 14L11.1 11.1" stroke="#626F86" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <input
                    v-model="visitSearchTerm"
                    type="text"
                    placeholder="Search visits"
                    class="flex-1 px-2 py-2 text-sm outline-none"
                  />
                  <button @click="toggleVisitFilter" class="px-3 py-1 hover:bg-gray-100">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66667 4H13.3333" stroke="#626F86" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M4 8H12" stroke="#626F86" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M6 12H10" stroke="#626F86" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </button>
                  <div class="w-px h-4 bg-gray-300 mx-1"></div>
                  <button @click="toggleVisitSort" class="px-3 py-1 hover:bg-gray-100">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33333 10.6667L8 8L10.6667 10.6667" stroke="#626F86" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.33333 5.33333L8 8L10.6667 5.33333" stroke="#626F86" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Recent Visits Header -->
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-[#172B4D]">Recent Visits</h3>
                <span class="text-xs text-gray-500">({{ paginatedVisits.length }} of {{ recentVisits.length }})</span>
              </div>
              
              <!-- Visit Entries List -->
              <div class="flex-1 overflow-y-auto space-y-3">
                <div
                  v-for="visit in paginatedVisits"
                  :key="visit.id"
                  @click="selectVisit(visit)"
                  class="p-3 rounded-lg cursor-pointer transition-all border"
                  :class="selectedVisit?.id === visit.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="font-medium text-sm text-[#172B4D] mb-1">{{ visit.business_name }}</div>
                  <div class="text-xs text-gray-600 mb-2">{{ visit.address }}</div>
                  <div class="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <span>→</span>
                    <span>Checked In: {{ visit.check_in }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <span>←</span>
                    <span>Checked Out: {{ visit.check_out }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mb-1">Store is {{ visit.distance }} away</div>
                  <div class="text-xs text-blue-600 mt-1">{{ visit.status }}</div>
                </div>
              </div>
              
              <!-- Pagination -->
              <div class="mt-4 flex items-center justify-center gap-2">
                <button
                  @click="goToVisitPage(visitCurrentPage - 1)"
                  :disabled="visitCurrentPage === 1"
                  class="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                <div class="flex gap-1">
                  <button
                    v-for="page in visibleVisitPages"
                    :key="page"
                    @click="goToVisitPage(page)"
                    class="px-3 py-1 text-sm border rounded"
                    :class="visitCurrentPage === page ? 'bg-blue-500 text-white border-blue-500' : ''"
                  >
                    {{ page }}
                  </button>
                  <span v-if="visitTotalPages > 7" class="px-2 py-1 text-sm">...</span>
                  <button
                    v-if="visitTotalPages > 7"
                    @click="goToVisitPage(visitTotalPages)"
                    class="px-3 py-1 text-sm border rounded"
                    :class="visitCurrentPage === visitTotalPages ? 'bg-blue-500 text-white border-blue-500' : ''"
                  >
                    {{ visitTotalPages }}
                  </button>
                </div>
                <button
                  @click="goToVisitPage(visitCurrentPage + 1)"
                  :disabled="visitCurrentPage === visitTotalPages"
                  class="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </div>
            
            <!-- Right Panel - Map View -->
            <div class="w-2/3 bg-white rounded-lg shadow-sm border p-4 relative">
              <!-- Map Controls -->
              <div class="absolute top-6 left-6 z-10 flex flex-col gap-1">
                <button class="w-8 h-8 bg-white border rounded shadow flex items-center justify-center hover:bg-gray-50">
                  <span class="text-lg font-semibold">+</span>
                </button>
                <button class="w-8 h-8 bg-white border rounded shadow flex items-center justify-center hover:bg-gray-50">
                  <span class="text-lg font-semibold">-</span>
                </button>
              </div>
              
              <!-- Map Container -->
              <div class="w-full h-full min-h-[600px] bg-gray-100 rounded-lg relative overflow-hidden">
                <!-- Placeholder Map - Replace with actual map component -->
                <div class="w-full h-full flex items-center justify-center bg-gray-200">
                  <div v-if="selectedVisit" class="text-center">
                    <div class="mb-4">
                      <div class="w-64 h-48 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <div class="text-2xl font-bold text-green-700">{{ selectedVisit.business_name.substring(0, 2) }}</div>
                      </div>
                      <div class="font-medium text-lg">{{ selectedVisit.business_name }}</div>
                      <div class="text-sm text-gray-600">{{ selectedVisit.address }}</div>
                    </div>
                    <!-- Map Marker -->
                    <div class="relative inline-block">
                      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
                        <path d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 32 12 32C12 32 24 19.5 24 12C24 5.373 18.627 0 12 0ZM12 16C10.343 16 9 14.657 9 13C9 11.343 10.343 10 12 10C13.657 10 15 11.343 15 13C15 14.657 13.657 16 12 16Z" fill="#0C66E4"/>
                        <circle cx="12" cy="13" r="3" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div v-else class="text-gray-500">Select a visit to view on map</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Check Ins Tab -->
          <div v-else-if="activeVisitsTab === 'Check Ins'" class="mt-4 px-6">
            <Datatable
              :items="checkIns"
              :columns="checkInColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
              pageName="CheckIns"
            />
          </div>
          
          <!-- Call Logs Tab -->
          <div v-else-if="activeVisitsTab === 'Call Logs'" class="mt-4 px-6">
            <Datatable
              :items="callLogs"
              :columns="callLogColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
              pageName="CallLogs"
            />
          </div>
          
          <!-- Prospective Stores Tab -->
          <div v-else-if="activeVisitsTab === 'Prospective Stores'" class="mt-4 px-6">
            <Datatable
              :items="prospectiveStores"
              :columns="prospectiveStoreColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
              pageName="ProspectiveStores"
            />
          </div>
          
          <!-- Manager Notes Tab -->
          <div v-else-if="activeVisitsTab === 'Manager Notes'" class="mt-4 px-6">
            <Datatable
              :items="managerNotes"
              :columns="managerNoteColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
              pageName="ManagerNotes"
            />
          </div>
        </div>
        
        <!-- Agents Tab -->
        <div v-else-if="activeTab === 'Agents'" class="space-y-4">
          <!-- Agents Datatable -->
          <div class="bg-white rounded-lg shadow-sm border">
            <Datatable
              :items="agents"
              :columns="agentColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :filterFields="{}"
              pageName="LineManagerAgents"
            >
              <template #header_actions>
                <!-- Managerial HighOps Section -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                      <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                    </svg>
                    <span class="text-sm font-medium text-[#172B4D]">Managerial HighOps:</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                          <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-medium text-[#172B4D]">Ukeme Ekpo</div>
                        <div class="text-xs text-gray-500">National Manager</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                          <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-medium text-[#172B4D]">Ajenifuja Timi</div>
                        <div class="text-xs text-gray-500">Area Sales Manager</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                          <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-medium text-[#172B4D]">Olamide Lawal</div>
                        <div class="text-xs text-gray-500">Account Manager</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                          <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-medium text-[#172B4D]">Esther Joel</div>
                        <div class="text-xs text-gray-500">Sales Canvasser</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #column="col">
                <!-- Agent Name Column with Icon -->
                <span v-if="col.props?.column?.field === 'agent_name'" class="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86058 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86058 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" fill="#626F86"/>
                    <path d="M8.00016 9.33333C5.42016 9.33333 3.3335 11.0933 3.3335 13.3333C3.3335 13.7015 3.63198 14 4.00016 14H12.0002C12.3683 14 12.6668 13.7015 12.6668 13.3333C12.6668 11.0933 10.5802 9.33333 8.00016 9.33333Z" fill="#626F86"/>
                  </svg>
                  <span>{{ col.props?.row?.agent_name || '' }}</span>
                </span>

                <!-- Status Column with Pill -->
                <span v-else-if="col.props?.column?.field === 'status'">
                  <Pill
                    :type="getAgentStatusType(col.props?.row?.status)"
                    :text="col.props?.row?.status"
                  />
                </span>

                <!-- Action Column with Eye Icon -->
                <span v-else-if="col.props?.column?.field === 'action'">
                  <button
                    @click="viewAgent(col.props?.row)"
                    class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                    title="View Agent"
                  >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9974 15C6.2174 15 3.33156 11.45 3.33156 10C3.33156 8.33254 6.21406 5.00004 9.99823 5.00004C13.6449 5.00004 16.6632 8.31087 16.6632 10C16.6632 11.45 13.7782 15 9.99823 15H9.9974ZM9.99823 3.33337C5.3974 3.33337 1.66406 7.36754 1.66406 10C1.66406 12.5717 5.4774 16.6667 9.9974 16.6667C14.5166 16.6667 18.3307 12.5717 18.3307 10C18.3307 7.36754 14.5974 3.33337 9.9974 3.33337" fill="#44546F"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97823 11.6534C9.05906 11.6534 8.31156 10.9059 8.31156 9.98671C8.31156 9.06754 9.05906 8.32004 9.97823 8.32004C10.8982 8.32004 11.6449 9.06754 11.6449 9.98671C11.6449 10.9059 10.8982 11.6534 9.97823 11.6534ZM9.97823 6.65337C8.1399 6.65337 6.6449 8.14837 6.6449 9.98671C6.6449 11.825 8.1399 13.32 9.97823 13.32C11.8174 13.32 13.3116 11.825 13.3116 9.98671C13.3116 8.14837 11.8174 6.65337 9.97823 6.65337Z" fill="#44546F"/>
                  </svg>

                  </button>
                </span>

                <!-- Default Column -->
                <span v-else>
                  {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <SuccessAlertToast 
      :message="toastMessage" 
      :duration="3000" 
      :isVisible="showToast" 
      @close="showToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Chart from 'chart.js/auto';
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Tabs from "@/views/Components/Tabs.vue";
import Button from "@/views/Components/ui/Button.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import type { TableColumn } from '@/types';

const route = useRoute();
const router = useRouter();

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Active tab
const activeTab = ref('Analytics');

// Line Manager Name from route params
const lineManagerName = computed(() => {
  return route.params.name ? (route.params.name as string).replace(/-/g, ' ').toUpperCase() : 'ESTHER JOEL';
});

// Tabs for View Line Manager
const viewTabs = ref([
  { name: 'Analytics', count: null },
  { name: 'Performance', count: null },
  { name: 'Customers', count: null },
  { name: 'Customer Sales', count: null },
  { name: 'Sales', count: null },
  { name: 'Visits Playback', count: null },
  { name: 'Agents', count: null }
]);

// Go back
const goBack = () => {
  router.push({ name: 'customer-success.more-actions.line-managers' });
};

// Handle Tab Change
const handleTabChange = (tab: string | { name: string; count: number | null }, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
  // Update route query if needed
  router.replace({ 
    name: route.name,
    params: route.params,
    query: { ...route.query, tab: activeTab.value }
  });
};

// Download Report
const downloadReport = () => {
  toastMessage.value = 'Download Report Successful';
  showToast.value = true;
};

// Chart refs
const ordersChart = shallowRef<HTMLCanvasElement | null>(null);
const salesChart = shallowRef<HTMLCanvasElement | null>(null);
let ordersChartInstance: Chart | null = null;
let salesChartInstance: Chart | null = null;

// Chart data
const ordersChartData = ref([
  { month: 'Jan', orders: 230 },
  { month: 'Feb', orders: 280 },
  { month: 'Mar', orders: 220 },
  { month: 'Apr', orders: 260 },
  { month: 'May', orders: 220 },
  { month: 'Jun', orders: 290 },
  { month: 'Jul', orders: 250 },
  { month: 'Aug', orders: 260 },
  { month: 'Sep', orders: 250 },
  { month: 'Oct', orders: 270 },
  { month: 'Nov', orders: 300 },
  { month: 'Dec', orders: 250 }
]);

const salesChartData = ref([
  { month: 'Jan', sales: 80000 },
  { month: 'Feb', sales: 95000 },
  { month: 'Mar', sales: 85000 },
  { month: 'Apr', sales: 92000 },
  { month: 'May', sales: 88000 },
  { month: 'Jun', sales: 100000 },
  { month: 'Jul', sales: 92000 },
  { month: 'Aug', sales: 95000 },
  { month: 'Sep', sales: 90000 },
  { month: 'Oct', sales: 98000 },
  { month: 'Nov', sales: 105000 },
  { month: 'Dec', sales: 95000 }
]);

// Create Orders Chart
const createOrdersChart = () => {
  if (!ordersChart.value) return;

  if (ordersChartInstance) {
    ordersChartInstance.destroy();
  }

  const ctx = ordersChart.value.getContext('2d');
  if (!ctx) return;

  ordersChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ordersChartData.value.map(item => item.month),
      datasets: [{
        label: 'Total Orders per Month',
        data: ordersChartData.value.map(item => item.orders),
        backgroundColor: '#0C66E4',
        borderColor: '#0C66E4',
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 300,
          ticks: {
            stepSize: 50,
            color: '#6b7280',
            font: {
              size: 12
            }
          },
          grid: {
            color: '#f3f4f6',
            drawBorder: false,
          },
          title: {
            display: true,
            text: 'Total Orders',
            color: '#374151',
            font: {
              size: 14,
              weight: '500'
            }
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: 'Month',
            color: '#374151',
            font: {
              size: 14,
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#6b7280',
            font: {
              size: 12
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(55, 65, 81, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#6b7280',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return `${context[0].label} 2025`;
            },
            label: function (context) {
              return `Total Orders: ${context.parsed.y}`;
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
};

// Create Sales Chart
const createSalesChart = () => {
  if (!salesChart.value) return;

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  const ctx = salesChart.value.getContext('2d');
  if (!ctx) return;

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesChartData.value.map(item => item.month),
      datasets: [{
        label: 'Total Sales per Month',
        data: salesChartData.value.map(item => item.sales),
        borderColor: '#0C66E4',
        backgroundColor: 'rgba(12, 102, 228, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#0C66E4',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6b7280',
            font: {
              size: 12
            },
            callback: function (value: any) {
              return '₦' + value.toLocaleString();
            }
          },
          grid: {
            color: '#f3f4f6',
            drawBorder: false,
          },
          title: {
            display: true,
            text: 'Sales Amount',
            color: '#374151',
            font: {
              size: 14,
              weight: '500'
            }
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12
            }
          },
          title: {
            display: true,
            text: 'Month',
            color: '#374151',
            font: {
              size: 14,
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#6b7280',
            font: {
              size: 12
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(55, 65, 81, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#6b7280',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return `${context[0].label} 2025`;
            },
            label: function (context) {
              return `Total Sales: ₦${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
};

// Customer Columns
const customerColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Customer Type', field: 'customer_type', sortable: true },
  { label: 'Outstanding Loan', field: 'outstanding_loan', sortable: true }
];

// Customer Sales Columns
const customerSalesColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'No. of Orders', field: 'num_orders', sortable: true },
  { label: 'Total Sales Amount', field: 'total_sales_amount', sortable: true }
];

// Sales Columns
const salesColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'Payment Method', field: 'payment_method', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Total Sales Amount', field: 'total_sales_amount', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true }
];

// Mock Data
const customers = ref([
  {
    id: 87,
    customer_name: 'Oluwatosin Adegboye',
    customer_type: 'Hospital',
    outstanding_loan: '₦2,055,043.00'
  },
  {
    id: 54,
    customer_name: 'Janet Adeajayi',
    customer_type: 'Pharmacy',
    outstanding_loan: '₦2,055,043.00'
  },
  {
    id: 25,
    customer_name: 'Henry Christopher',
    customer_type: 'Hospital',
    outstanding_loan: '₦2,055,043.00'
  },
  {
    id: 30,
    customer_name: 'Oluwatosin Adegboye',
    customer_type: 'Mega distributor',
    outstanding_loan: '₦2,055,043.00'
  },
  {
    id: 51,
    customer_name: 'Janet Adeajayi',
    customer_type: 'Hospital',
    outstanding_loan: '₦2,055,043.00'
  }
]);

const customerSales = ref([
  {
    id: 87,
    customer_name: 'Oluwatosin Adegboye',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 54,
    customer_name: 'Janet Adeajayi',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 25,
    customer_name: 'Henry Christopher',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 30,
    customer_name: 'Oluwatosin Adegboye',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 51,
    customer_name: 'Janet Adeajayi',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 21,
    customer_name: 'Femi Babalola',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 35,
    customer_name: 'Sarah Badmus',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 23,
    customer_name: 'Daniel Makinde',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 33,
    customer_name: 'Esther Joel',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 87,
    customer_name: 'Oluwatosin Adegboye',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 88,
    customer_name: 'Janet Adeajayi',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 81,
    customer_name: 'Henry Christopher',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  },
  {
    id: 80,
    customer_name: 'Oluwatosin Adegboye',
    num_orders: 21,
    total_sales_amount: '₦2,055,043.00'
  }
]);

const sales = ref([
  {
    id: 87,
    customer_name: 'Oluwatosin Adegboye',
    store_name: 'Emeka Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'Cheque',
    status: 'Delivered',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  },
  {
    id: 54,
    customer_name: 'Janet Adeajayi',
    store_name: 'Emeka Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'Cheque',
    status: 'Delivered',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  },
  {
    id: 25,
    customer_name: 'Henry Christopher',
    store_name: 'Emeka Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'Cheque',
    status: 'Delivered',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  },
  {
    id: 30,
    customer_name: 'Oluwatosin Adegboye',
    store_name: 'Emma Bros Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'On Delivery',
    status: 'Delivered',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  },
  {
    id: 51,
    customer_name: 'Janet Adeajayi',
    store_name: 'Emeka Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'Cheque',
    status: 'Ongoing',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  },
  {
    id: 87,
    customer_name: 'Oluwatosin Adegboye',
    store_name: 'Emeka Pharmacy',
    phone: '+234 899 9999 999',
    payment_method: 'Cheque',
    status: 'Cancelled',
    total_sales_amount: '₦2,055,043.00',
    date_created: '5/21/2024'
  }
]);

// Get Status Type for Pill
const getStatusType = (status: string): 'success' | 'danger' | 'pending-tier' => {
  if (status === 'Delivered') return 'success';
  if (status === 'Cancelled') return 'danger';
  return 'pending-tier'; // For Ongoing
};

// Watch activeTab to create charts when Performance tab is selected
watch(activeTab, async (newTab) => {
  if (newTab === 'Performance') {
    await nextTick();
    createOrdersChart();
    createSalesChart();
  }
});

// Initialize active tab from route query
onMounted(() => {
  const tabFromQuery = route.query.tab as string;
  if (tabFromQuery && viewTabs.value.some(t => (typeof t === 'object' ? t.name : t) === tabFromQuery)) {
    activeTab.value = tabFromQuery;
  }
  
  // Create charts if Performance tab is active
  if (activeTab.value === 'Performance') {
    nextTick(() => {
      createOrdersChart();
      createSalesChart();
    });
  }
});

// Cleanup charts on unmount
onUnmounted(() => {
  if (ordersChartInstance) {
    ordersChartInstance.destroy();
  }
  if (salesChartInstance) {
    salesChartInstance.destroy();
  }
});

// Visits Playback Tab State
const activeVisitsTab = ref('Visits Map');

// Visits Playback Tabs
const visitsPlaybackTabs = ref([
  'Visits Map',
  'Check Ins',
  'Call Logs',
  'Prospective Stores',
  'Manager Notes'
]);

// Handle Visits Tab Change
const handleVisitsTabChange = (tab: string | { name: string }, index: number) => {
  const tabName = typeof tab === 'string' ? tab : tab.name;
  activeVisitsTab.value = tabName;
};

// Recent Visits Data
interface Visit {
  id: number;
  business_name: string;
  address: string;
  check_in: string;
  check_out: string;
  distance: string;
  status: string;
}

const recentVisits = ref<Visit[]>([
  {
    id: 1,
    business_name: 'Bid pearlz Rx',
    address: '63 miyaki, oworonshoki',
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would get back'
  },
  {
    id: 2,
    business_name: 'Dona, bonitas pharmacy',
    address: '437 Ikorodu road, Ikosi Ketu bustop',
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would make payment'
  },
  {
    id: 3,
    business_name: 'ASON MEDICAL CENTER',
    address: '18 DEMUREN ST, PAKO B/STOP KETU',
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would make payment'
  },
  {
    id: 4,
    business_name: 'MEDICEYO PHARMACY',
    address: '43/ Ikoroau road, Ikosi ketu pustop',
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would make payment'
  },
  {
    id: 5,
    business_name: 'Emeka Pharmacy',
    address: '11 Ademola Adentokumbo',
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would make payment'
  }
]);

// Generate more visits for pagination
for (let i = 6; i <= 109; i++) {
  recentVisits.value.push({
    id: i,
    business_name: `Pharmacy ${i}`,
    address: `${i} Test Street, Lagos`,
    check_in: '9/01/2025 04:43 PM',
    check_out: '9/01/2025 08:31 PM',
    distance: '0 meters',
    status: 'Customer would make payment'
  });
}

// Visit Search and Filters
const visitSearchTerm = ref('');

// Visit Pagination
const visitCurrentPage = ref(1);
const visitsPerPage = 5;
const visitTotalPages = computed(() => Math.ceil(recentVisits.value.length / visitsPerPage));
const paginatedVisits = computed(() => {
  const start = (visitCurrentPage.value - 1) * visitsPerPage;
  const end = start + visitsPerPage;
  return recentVisits.value.slice(start, end);
});

// Selected Visit
const selectedVisit = ref<Visit | null>(null);

// Initialize selected visit when paginated visits change
watch(paginatedVisits, (newVisits) => {
  if (newVisits.length > 0) {
    // If no visit is selected or the selected visit is not in the current page, select the first one
    if (!selectedVisit.value || !newVisits.find(v => v.id === selectedVisit.value?.id)) {
      selectedVisit.value = newVisits[0];
    }
  }
}, { immediate: true });

const visibleVisitPages = computed(() => {
  const total = visitTotalPages.value;
  const current = visitCurrentPage.value;
  const pages: number[] = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (current >= total - 3) {
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i);
      }
    }
  }
  
  return pages;
});

const goToVisitPage = (page: number) => {
  if (page >= 1 && page <= visitTotalPages.value) {
    visitCurrentPage.value = page;
    // Select first visit on the new page
    if (paginatedVisits.value.length > 0) {
      selectedVisit.value = paginatedVisits.value[0];
    }
  }
};

const selectVisit = (visit: Visit) => {
  selectedVisit.value = visit;
};

const toggleVisitFilter = () => {
  // Filter logic here
  console.log('Filter visits');
};

const toggleVisitSort = () => {
  // Sort logic here
  console.log('Sort visits');
};

// Check Ins Columns and Data
const checkInColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Check In Time', field: 'check_in_time', sortable: true },
  { label: 'Check Out Time', field: 'check_out_time', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];

const checkIns = ref([
  { id: 87, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 54, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 25, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 30, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 51, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 21, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 35, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 23, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 33, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 87, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' },
  { id: 88, check_in_time: '04:43 PM', check_out_time: '04:43 PM', date: '5/21/2024' }
]);

// Call Logs Columns and Data
const callLogColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Call Time', field: 'call_time', sortable: true },
  { label: 'Duration', field: 'duration', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];

const callLogs = ref([
  { id: 87, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 54, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 25, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 30, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 51, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 21, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 35, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 23, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 33, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 87, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' },
  { id: 88, call_time: '04:43 PM', duration: '5 mins', date: '5/21/2024' }
]);

// Prospective Stores Columns and Data
const prospectiveStoreColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Store Address', field: 'store_address', sortable: false },
  { label: 'Visit Date', field: 'visit_date', sortable: true },
  { label: 'Note', field: 'note', sortable: false }
];

const prospectiveStores = ref([
  { id: 87, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: "Didn't meet the Procurement Manager and was asked to check back." },
  { id: 54, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 25, store_name: 'Emma Bros Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 30, store_name: 'Xela pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 51, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 21, store_name: 'Emma Bros Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 35, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 23, store_name: 'Emma Bros Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 33, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 87, store_name: 'Emma Bros Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' },
  { id: 88, store_name: 'Emeka Pharmacy', store_address: '11 Ademola Adentokumbo', visit_date: '5/21/2024', note: '-' }
]);

// Manager Notes Columns and Data
const managerNoteColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Note Date', field: 'note_date', sortable: true },
  { label: 'Note', field: 'note', sortable: false }
];

const managerNotes = ref([
  { id: 87, note_date: '5/21/2024', note: "Didn't meet the Procurement Manager and was asked to check back." },
  { id: 54, note_date: '5/21/2024', note: '-' },
  { id: 25, note_date: '5/21/2024', note: '-' },
  { id: 30, note_date: '5/21/2024', note: '-' },
  { id: 51, note_date: '5/21/2024', note: '-' },
  { id: 21, note_date: '5/21/2024', note: '-' },
  { id: 35, note_date: '5/21/2024', note: '-' },
  { id: 23, note_date: '5/21/2024', note: '-' },
  { id: 33, note_date: '5/21/2024', note: '-' },
  { id: 87, note_date: '5/21/2024', note: '-' },
  { id: 88, note_date: '5/21/2024', note: '-' }
]);

// Agents Columns and Data
const agentColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Agent Name', field: 'agent_name', sortable: true },
  { label: 'Phone', field: 'phone', sortable: false },
  { label: 'Agent Type', field: 'agent_type', sortable: true },
  { label: 'No. of Orders', field: 'num_orders', sortable: true },
  { label: 'No. of Customers', field: 'num_customers', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

const agents = ref([
  { id: 87, agent_name: 'Babajide Raji', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 54, agent_name: 'Daniel Makinde', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 25, agent_name: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 30, agent_name: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 51, agent_name: 'Esther Joel', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 21, agent_name: 'Femi Babalola', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', num_orders: 21, num_customers: 21, status: 'Disabled' },
  { id: 35, agent_name: 'Femi Babalola', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 23, agent_name: 'Sarah Badmus', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 33, agent_name: 'Sarah Badmus', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 87, agent_name: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 88, agent_name: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 81, agent_name: 'Josh Michael', phone: '+234 899 9999 999', agent_type: 'Sales Canvasser', num_orders: 21, num_customers: 21, status: 'Enabled' },
  { id: 80, agent_name: 'Femi Babalola', phone: '+234 899 9999 999', agent_type: 'Area Sales Manager', num_orders: 21, num_customers: 21, status: 'Enabled' }
]);

// Get Agent Status Type for Pill
const getAgentStatusType = (status: string): 'success' | 'danger' => {
  if (status === 'Enabled') return 'success';
  return 'danger'; // Disabled
};

// View Agent
const viewAgent = (agent: any) => {
  console.log('View agent:', agent);
  // TODO: Navigate to agent detail page or open modal
};

</script>

<style>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}
</style>
