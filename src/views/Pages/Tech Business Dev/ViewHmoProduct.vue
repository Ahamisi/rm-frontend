<template>
  <div class="erp_dashboard_wrapper bg-white">
    <!-- Header with Back Button and Breadcrumbs -->
    <div class="">
      <div class="px-6 py-4 flex items-center gap-4">
        <div class="flex items-center gap-2 text-sm text-[#626F86]">
          <span>Business Development</span>
          <span>/</span>
          <span>Products Management</span>
          <span>/</span>
          <span>All HMO Products</span>
          <span>/</span>
          <span class="text-[#172B4D] font-medium">{{ productName }}</span>
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
        <h2 class="text-xs font-medium text-[#626F86] absolute left-1/2 -translate-x-1/2">Product Dashboard</h2>
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
      <Tabs :tabs="viewTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />

      <!-- Tab Content -->
      <div class="mt-6">
        <!-- Analytics Tab -->
        <div v-if="activeTab === 'Analytics'" class="product_metrics">
          <div v-if="loading"
              class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
              <LoadingState></LoadingState>
          </div>

          <div class="px-6 py-4 bg-white">
            <DateFilter @dateFiltered="filtered" />
          </div>

          <div class="flex flex-col gap-4 p-6 xl:flex-row sm:gap-6 bg-[#f9fafb]">
            <div class="flex-wrap flex-1">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">


                  <!-- Total Pending Stores Card -->
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-[12px] text-[#626F86]">Average Daily Sales</h3>
                </div>
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">665.02</p>
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
                      <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_3)"/>
                      <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                      <defs>
                        <linearGradient id="paint0_linear_5499_252223_3" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22A06B" stop-opacity="0.2"/>
                          <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>


              

                                <!-- Total Pending Stores Card -->
                                <div class="bg-white rounded-lg shadow-sm border p-6">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-[12px] text-[#626F86]">Average Monthly Sales</h3>
                </div>
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">5,000,000.00</p>
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
                      <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_3)"/>
                      <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                      <defs>
                        <linearGradient id="paint0_linear_5499_252223_3" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22A06B" stop-opacity="0.2"/>
                          <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>


                                  <!-- Total Pending Stores Card -->
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-[12px] text-[#626F86]">Margin</h3>
                </div>
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">12.35%</p>
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
                      <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_3)"/>
                      <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                      <defs>
                        <linearGradient id="paint0_linear_5499_252223_3" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22A06B" stop-opacity="0.2"/>
                          <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>


                <!-- Cost Price -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-[12px] text-[#626F86]">Cost Price</h3>
                  </div>
                  <div class="flex items-baseline justify-between">
                    <div>
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">₦{{ product?.unit_cost || 0 }}</p>
                    </div>
                  </div>
                </div>

                <!-- Selling Price -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-[12px] text-[#626F86]">Selling Price</h3>
                  </div>
                  <div class="flex items-baseline justify-between">
                    <div>
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">₦{{ product?.price_per_pack || 0 }}</p>
                    </div>
                  </div>
                </div>

                <!-- Quantity per Roll/Pack -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-[12px] text-[#626F86]">Quantity per Roll/Pack</h3>
                  </div>
                  <div class="flex items-baseline justify-between">
                    <div>
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">{{ product?.quantity_per_roll || 0 }}</p>
                    </div>
                  </div>
                </div>

                <!-- Quantity per Carton -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-[12px] text-[#626F86]">Quantity per Carton</h3>
                  </div>
                  <div class="flex items-baseline justify-between">
                    <div>
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">{{ product?.quantity_per_carton || 0 }}</p>
                    </div>
                  </div>
                </div>

                <!-- On Hand -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-[12px] text-[#626F86]">On Hand</h3>
                  </div>
                  <div class="flex items-baseline justify-between">
                    <div>
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">{{ product?.quantity_available || 0 }}</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Last Procurement Date -->
                  <div class="bg-white rounded-lg shadow-sm border p-6">
                    <div class="flex items-start justify-between mb-4">
                      <h3 class="text-[12px] text-[#626F86]">Last Procurement Date</h3>
                    </div>
                    <div class="flex items-baseline justify-between">
                      <div>
                        <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">{{ metrics.last_procurement_date || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Last Order Date -->
                  <div class="bg-white rounded-lg shadow-sm border p-6">
                    <div class="flex items-start justify-between mb-4">
                      <h3 class="text-[12px] text-[#626F86]">Last Order Date</h3>
                    </div>
                    <div class="flex items-baseline justify-between">
                      <div>
                        <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">{{ metrics.last_ordered_date || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sales Graph Chart -->
              <div class="my-4 bg-white rounded-lg card graph">
                <div class="">
                  <div class="flex justify-between gap-4 p-4 pb-0 card-header">
                    <h3 class="mb-4">Sales Graph</h3>
                    <div class="flex items-center gap-2">
                      <label>Year: </label>
                      <select name="" id="" v-model="salesYear" @change="getSales"
                          class="w-16 px-3 py-2 text-xs border rounded h-fit">
                        <option v-for="(year, index) in rangeOfYears()" :key="`sale_year_${index}`"
                            :value="year">
                            {{ year }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="relative h-96">
                    <canvas ref="salesChart" class="w-full h-full"></canvas>
                  </div>
                </div>
              </div>

              <!-- Purchase Graph Chart -->
              <div class="my-4 bg-white rounded-lg card graph">
                <div class="">
                  <div class="flex justify-between gap-4 p-4 pb-0 card-header">
                    <h3 class="mb-4">Purchase Graph</h3>

                    <div class="flex items-center gap-2">
                      <label>Year: </label>

                      <select name="" id="" v-model="purchaseYear" @change="getPurchases"
                          class="w-16 px-3 py-2 text-xs border rounded h-fit">
                        <option v-for="(year, index) in rangeOfYears()" :key="`purchase_year_${index}`"
                            :value="year">
                            {{ year }}</option>
                      </select>

                    </div>

                  </div>
                  <div class="relative h-96">
                    <canvas ref="purchasesChart" class="w-full h-full"></canvas>
                  </div>
                </div>
              </div>

            </div>

            <!-- recent activities -->
            <div class="attention-container h-fit xl:w-[389px] w-full card bg-white rounded-lg">
              <h3 class="mb-4 title">Recent Activities</h3>
              <div class="rounded-lg invoice_stats_container border">
                <table class="w-full">
                  <thead>
                    <tr class="bg-[rgba(247,248,249,1)]">
                      <th class="px-4 py-2 text-left rounded-tl-md">Activity</th>
                      <th class="px-4 py-2 text-left">Quantity</th>
                      <th class="px-4 py-2 text-left rounded-tr-md">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Invoice</td>
                      <td>{{ toLocale(metrics.invoice.total_quantity) }}</td>
                      <td>₦{{ toLocale(metrics.invoice.total_amount) }}</td>
                    </tr>
                    <tr>
                      <td>Product Returns</td>
                      <td>{{ toLocale(metrics.product_returns.total_quantity) }}</td>
                      <td>₦{{ toLocale(metrics.product_returns.total_amount) }}</td>
                    </tr>
                    <tr>
                      <td>Supplier Returns</td>
                      <td>{{ toLocale(metrics.supplier_returns.total_quantity) }}</td>
                      <td>₦{{ toLocale(metrics.supplier_returns.total_amount) }}</td>
                    </tr>
                    <tr>
                      <td>Product Damages</td>
                      <td>{{ toLocale(metrics.product_damages.total_quantity) }}</td>
                      <td>₦{{ toLocale(metrics.product_damages.total_amount) }}</td>
                    </tr>
                    <tr>
                      <td>On Hand</td>
                      <td>{{ toLocale(product?.quantity_available || 0) }}</td>
                      <td>₦{{ toLocale((product?.quantity_available || 0) * (product?.price_per_pack || 0)) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <!-- Inventory Report Tab -->
        <div v-if="activeTab === 'Inventory Report'" class="product_overview_wrapper">
          <div v-if="inventoryLoading"
              class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
              <LoadingState></LoadingState>
          </div>

          <div class="px-6 py-4 bg-white flex items-center justify-between">
            <DateFilter @dateFiltered="filteredInventory" />
            
            <div class="flex items-center gap-3">
              <button class="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H17M7 10H17M9 15H17" stroke="#626F86" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span class="text-sm text-[#626F86]">Filter</span>
              </button>
              <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3V13M10 13L6 9M10 13L14 9M3 16H17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-sm">Download Report</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 xl:flex-row sm:gap-6 bg-[#f9fafb]">
            <div class="flex-wrap flex-1">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <!-- Overview Card -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="mb-3">
                    <h3 class="text-[16px] font-[600] leading-[20px] text-[#172B4D]">Overview</h3>
                  </div>
                  <div class="border border-[rgba(9,30,66,0.14)] rounded-lg">
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Actual Quantity</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.overview.quantity) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Expected Quantity</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(expectedQuantity) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Quantity Difference</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(expectedQuantity - inventoryReport.overview.quantity) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Orders & Transfers Card -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="mb-3">
                    <h3 class="text-[16px] font-[600] leading-[20px] text-[#172B4D]">Orders & Transfers</h3>
                  </div>
                  <div class="border border-[rgba(9,30,66,0.14)] rounded-lg">
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Orders</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.order_and_transfer.orders) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Transfer In</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.order_and_transfer.transferIn) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Transfer Out</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.order_and_transfer.transferOut) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Other Metrics Card -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="mb-3">
                    <h3 class="text-[16px] font-[600] leading-[20px] text-[#172B4D]">Other Metrics</h3>
                  </div>
                  <div class="border border-[rgba(9,30,66,0.14)] rounded-lg">
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Damages</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.other_metrics.damages) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Expired</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.other_metrics.expired) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Debts</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">0</span>
                    </div>
                  </div>
                </div>

                <!-- Returns Card -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                  <div class="mb-3">
                    <h3 class="text-[16px] font-[600] leading-[20px] text-[#172B4D]">Returns</h3>
                  </div>
                  <div class="border border-[rgba(9,30,66,0.14)] rounded-lg">
                    <div class="flex justify-between gap-x-2 px-3 py-3 border-b border-[rgba(9,30,66,0.14)]">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Product Returns</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.returns.productReturns) }}</span>
                    </div>
                    <div class="flex justify-between gap-x-2 px-3 py-3">
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F]">Supplier Returns</span>
                      <span class="text-[12px] font-[500] leading-[16px] text-[#44546F] min-w-12">{{ toLocale(inventoryReport.returns.supplierReturns) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Expected vs Actual Inventory Chart -->
                <div class="bg-white rounded-lg shadow-sm border p-6 md:col-span-3">
                  <div class="flex flex-wrap justify-between mb-3">
                    <h3 class="text-[16px] font-[600] leading-[20px] text-[#172B4D]">Expected vs Actual Inventory</h3>
                    <div class="flex items-center gap-2">
                      <label class="text-sm text-[#626F86]">Year: </label>
                      <select name="" id="" v-model="inventoryGraphYear" @change="fetchInventoryGraphData"
                          class="w-20 px-3 py-2 text-xs border rounded h-fit">
                        <option v-for="(year, index) in rangeOfYears()" :key="`inventory_year_${index}`"
                            :value="year">
                            {{ year }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="relative h-96">
                    <canvas ref="inventoryChart" class="w-full h-96"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Batches Tab -->
        <div v-if="activeTab === 'Batches'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockBatches" :filterByDate="false" :columns="batchesColumns">
            <template #column="col">
              <span v-if="col.props.column.field == 'action'">
                <button @click="viewBatchHistory(col.props.row.id)" class="hover:bg-gray-100 h-fit p-1 rounded">
                  <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12.5 4C8.088 4 4.5 7.588 4.5 12C4.5 16.412 8.088 20 12.5 20C16.912 20 20.5 16.412 20.5 12C20.5 7.588 16.912 4 12.5 4ZM12.5 18.222C10.8505 18.2199 9.26911 17.5637 8.10272 16.3973C6.93633 15.2309 6.28012 13.6495 6.278 12C6.28012 10.3505 6.93633 8.76911 8.10272 7.60272C9.26911 6.43633 10.8505 5.78012 12.5 5.778C14.1495 5.78012 15.7309 6.43633 16.8973 7.60272C18.0637 8.76911 18.7199 10.3505 18.722 12C18.7199 13.6495 18.0637 15.2309 16.8973 16.3973C15.7309 17.5637 14.1495 18.2199 12.5 18.222ZM13.389 11.632V8.448C13.389 7.959 12.989 7.559 12.5 7.559C12.011 7.559 11.611 7.959 11.611 8.449V12.004C11.611 12.252 11.714 12.475 11.879 12.637L14.074 14.831C14.241 14.9972 14.4669 15.0904 14.7025 15.0904C14.9381 15.0904 15.164 14.9972 15.331 14.831C15.4969 14.6641 15.5899 14.4383 15.5899 14.203C15.5899 13.9677 15.4969 13.7419 15.331 13.575L13.389 11.632Z"
                        fill="#44546F" />
                  </svg>
                </button>
              </span>
              <span v-else>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>

        <!-- Invoices Tab -->
        <div v-if="activeTab === 'Invoices'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockInvoices" :filterByDate="false" :columns="invoicesColumns">
            <template #column="col">
              <span v-if="col.props.column.field == 'deal_id'">
                <Pill :type="col.props.row.deal_id ? 'controlled' : 'grey'" :text="col.props.row.deal_id ? 'Deal' : 'No Deal'" />
              </span>
              <span v-else-if="col.props.column.field == 'order_group.status_text'">
                <Pill :type="getInvoiceStatusType(col.props.row.order_group?.status_text)" :text="col.props.formattedRow[col.props.column.field]" />
              </span>
              <span v-else-if="col.props.column.field == 'total_cost_on_purchase'">
                ₦{{ (col.props.row.total_cost_on_purchase / col.props.row.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </span>
              <span v-else>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>

        <!-- Returns Tab -->
        <div v-if="activeTab === 'Returns'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockReturns" :filterByDate="false" :columns="returnsColumns">
            <template #column="col">
              <span v-if="col.props.column.field == 'total'">
                ₦{{ toLocale(col.props.row.total_quantity * col.props.row.order?.price_on_purchase || 0) }}
              </span>
              <span v-else>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>

        <!-- Suppliers Invoice Tab -->
        <div v-if="activeTab === 'Suppliers Invoice'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockSupplierInvoices" :filterByDate="false" :columns="supplierInvoicesColumns">
            <template #column="col">
              <span v-if="col.props.column.field == 'actual_quantity'">
                {{ col.props.row.quantity - col.props.row.returned }}
              </span>
              <span v-else>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>

        <!-- Suppliers Returns Tab -->
        <div v-if="activeTab === 'Suppliers Returns'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockSupplierReturns" :filterByDate="false" :columns="supplierReturnsColumns">
            <template #column="col">
              <span>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>

        <!-- Damages Tab -->
        <div v-if="activeTab === 'Damages'" class="px-6 pb-4 bg-white">
          <Datatable :items="mockDamages" :filterByDate="false" :columns="damagesColumns">
            <template #column="col">
              <span>
                {{ col.props.formattedRow[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import DateFilter from '@/views/Components/Dashboards/DateFilter.vue';
import { toLocale } from '@/views/helpers/useLocale.js';
import * as Chart from 'chart.js';
import Tabs from '@/views/Components/Tabs.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import type { TableColumn } from '@/types';
import dayjs from 'dayjs';

// Register Chart.js components
Chart.Chart.register(...Chart.registerables);

const route = useRoute();
const router = useRouter();
const toast = useToast();

const productId = computed(() => parseInt(route.params.id as string));
const productName = computed(() => route.query.name as string || 'Product');

const loading = ref(false);
const dateFilter = ref({
  from_date: '',
  to_date: ''
});
const salesYear = ref(new Date().getFullYear());
const salesMonth = ref('');

const purchaseYear = ref(new Date().getFullYear());
const purchaseMonth = ref('');

const purchaseAnalytics = ref({
  purchases: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  quantity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
});

const metrics = ref({
  total_sales: 0,
  average_daily_sales: 0,
  average_monthly_sales: 0,
  average_daily_sales_percentage: 0,
  average_monthly_sales_percentage: 0,
  last_ordered_date: '',
  last_procurement_date: '',
  margin: 0,
  margin_percentage: 0,
  product_returns: {
    total_quantity: 0,
    total_amount: 0
  },
  invoice: {
    total_quantity: 0,
    total_amount: 0,
  },
  supplier_returns: {
    total_quantity: 0,
    total_amount: 0
  },
  product_damages: {
    total_quantity: 0,
    total_amount: 0
  },
});

const product = ref({
  id: 0,
  name: '',
  quantity_available: 0,
  unit_cost: 0,
  quantity_per_carton: 0,
  quantity_per_roll: 0,
  price_per_pack: 0,
  manufacturer: {
    id: 0,
    display_name: '',
  }
});

const months = ref([
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]);

const salesAnalytics = ref({
  sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  quantity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
});

const getPurchasesChartData = computed(() => {
  const data = [];
  for (let i = 0; i < months.value.length; i++) {
    data.push({
      month: months.value[i],
      purchases: parseFloat(purchaseAnalytics.value.purchases[i]),
      quantity: parseInt(purchaseAnalytics.value.quantity[i])
    });
  }
  return data;
});

const getSalesChartData = computed(() => {
  const data = [];
  for (let i = 0; i < months.value.length; i++) {
    data.push({
      month: months.value[i],
      sales: parseFloat(salesAnalytics.value.sales[i]),
      quantity: parseInt(salesAnalytics.value.quantity[i])
    });
  }
  return data;
});

watch(getSalesChartData, () => {
  createSalesChart();
});

watch(getPurchasesChartData, () => {
  createPurchasesChart();
});

const salesChart = ref(null);
let chartSalesInstance: any = null;
const purchasesChart = ref(null);
let chartPurchasesInstance: any = null;

const createSalesChart = async () => {
  if (!salesChart.value) return;

  // Destroy existing chart if it exists
  if (chartSalesInstance) {
    chartSalesInstance.destroy();
  }

  const ctx = (salesChart.value as HTMLCanvasElement).getContext('2d');
  if (!ctx) return;

  const monthlyData = getSalesChartData.value;

  chartSalesInstance = new Chart.Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyData.map(item => item.month),
      datasets: [{
        label: 'Total Sales per Month',
        data: monthlyData.map(item => item.sales),
        backgroundColor: 'rgba(108, 136, 255, 1)',
        borderColor: 'rgba(108, 136, 255, 1)',
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
          grid: {
            color: '#f3f4f6',
            drawBorder: false,
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12
            },
            callback: function (value: any) {
              return value >= 1000 ? (value / 1000) + 'k' : value;
            }
          },
          title: {
            display: true,
            text: 'Amount in Naira (₦)',
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
            title: function (context: any) {
              const dataIndex = context[0].dataIndex;
              const monthData = monthlyData[dataIndex];
              return `${monthData.month} 2025`;
            },
            label: function (context: any) {
              const dataIndex = context.dataIndex;
              const monthData = monthlyData[dataIndex];
              return [
                `Total Sales: ₦${context.parsed.y.toLocaleString()}`,
                `Quantity: ${monthData.quantity.toLocaleString()}`
              ];
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

const createPurchasesChart = async () => {
  if (!purchasesChart.value) return;

  // Destroy existing chart if it exists
  if (chartPurchasesInstance) {
    chartPurchasesInstance.destroy();
  }

  const ctx = (purchasesChart.value as HTMLCanvasElement).getContext('2d');
  if (!ctx) return;

  const monthlyData = getPurchasesChartData.value;

  chartPurchasesInstance = new Chart.Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyData.map(item => item.month),
      datasets: [{
        label: 'Total Purchases per Month',
        data: monthlyData.map(item => item.purchases),
        backgroundColor: '#fb9999',
        borderColor: '#fb9999',
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
          grid: {
            color: '#f3f4f6',
            drawBorder: false,
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12
            },
            callback: function (value: any) {
              return value >= 1000 ? (value / 1000) + 'k' : value;
            }
          },
          title: {
            display: true,
            text: 'Amount in Naira (₦)',
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
            title: function (context: any) {
              const dataIndex = context[0].dataIndex;
              const monthData = monthlyData[dataIndex];
              return `${monthData.month} 2025`;
            },
            label: function (context: any) {
              const dataIndex = context.dataIndex;
              const monthData = monthlyData[dataIndex];
              return [
                `Total Purchases: ₦${context.parsed.y.toLocaleString()}`,
                `Quantity: ${monthData.quantity.toLocaleString()}`
              ];
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

// Inventory Report State
const inventoryLoading = ref(false);
const inventoryDateFilter = ref({
  from_date: '',
  to_date: ''
});
const inventoryGraphYear = ref(new Date().getFullYear());
const inventoryChart = ref<HTMLCanvasElement | null>(null);
let inventoryChartInstance: any = null;

const inventoryReport = ref({
  overview: {
    inbound: {},
    outbound: {},
    quantity: 0
  },
  order_and_transfer: {
    orders: 0,
    transferIn: 0,
    transferOut: 0
  },
  other_metrics: {
    damages: 0,
    expired: 0
  },
  returns: {
    productReturns: 0,
    supplierReturns: 0
  },
});

const expectedInventoryQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const actualInventoryQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const diffInventoryQuantities = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const expectedQuantity = computed(() => {
  let inbound = 0;
  let outbound = 0;
  for (const [key, value] of Object.entries(inventoryReport.value.overview.inbound)) {
    inbound += value as number;
  }
  for (const [key, value] of Object.entries(inventoryReport.value.overview.outbound)) {
    outbound += value as number;
  }
  return inbound - outbound;
});

const renderInventoryChart = () => {
  if (!inventoryChart.value) return;

  if (inventoryChartInstance) {
    inventoryChartInstance.destroy();
  }

  const ctx = inventoryChart.value.getContext('2d');
  if (!ctx) return;

  inventoryChartInstance = new Chart.Chart(ctx, {
    type: 'bar',
    data: {
      labels: months.value,
      datasets: [
        {
          label: 'Expected Quantity',
          data: expectedInventoryQuantities.value,
          backgroundColor: '#e5e7eb',
          borderRadius: 8,
          barPercentage: 0.8,
          categoryPercentage: 0.6
        },
        {
          label: 'Actual Quantity',
          data: actualInventoryQuantities.value,
          backgroundColor: '#d8b4fe',
          borderRadius: 8,
          barPercentage: 0.8,
          categoryPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            title: (context: any) => `${context[0].label} ${inventoryGraphYear.value}`,
            label: (context: any) => {
              const expected = expectedInventoryQuantities.value[context.dataIndex];
              const actual = actualInventoryQuantities.value[context.dataIndex];
              const diff = diffInventoryQuantities.value[context.dataIndex];
              return [
                `Expected Quantity: ${expected.toLocaleString()}`,
                `Actual Quantity: ${actual.toLocaleString()}`,
                `Difference: ${diff.toLocaleString()}`
              ];
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            color: '#6b7280',
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6b7280'
          },
          title: {
            display: true,
            text: 'Quantity',
            color: '#374151'
          },
          grid: {
            color: '#f3f4f6'
          }
        },
        x: {
          ticks: {
            color: '#6b7280'
          },
          title: {
            display: true,
            text: 'Month',
            color: '#374151'
          },
          stacked: false,
          grid: {
            display: false
          }
        }
      }
    }
  });
};

watch([expectedInventoryQuantities, actualInventoryQuantities, diffInventoryQuantities], renderInventoryChart);

const filteredInventory = (dateRange: any) => {
  inventoryDateFilter.value = dateRange;
  fetchProductOverview();
};

const fetchProductOverview = () => {
  inventoryLoading.value = true;
  axios.get(import.meta.env.VITE_API_URL + `admin/products/${productId.value}/overview`, {
    params: {
      from_date: inventoryDateFilter.value.from_date,
      to_date: inventoryDateFilter.value.to_date
    }
  })
    .then(response => {
      inventoryReport.value = response.data;
    })
    .catch(error => {
      console.error(error);
      toast.error('Failed to fetch product overview data');
    })
    .finally(() => {
      inventoryLoading.value = false;
    });
};

const fetchInventoryGraphData = () => {
  inventoryLoading.value = true;
  axios.get(import.meta.env.VITE_API_URL + `admin/products/${productId.value}/quantity_graph?year=${inventoryGraphYear.value}`)
    .then(response => {
      expectedInventoryQuantities.value = response.data.expected;
      actualInventoryQuantities.value = response.data.actual;
      diffInventoryQuantities.value = response.data.diff;
      renderInventoryChart();
    })
    .catch(error => {
      console.error(error);
      toast.error('Failed to fetch graph data');
    })
    .finally(() => {
      inventoryLoading.value = false;
    });
};

// Cleanup chart on component unmount
onBeforeUnmount(() => {
  if (chartSalesInstance) chartSalesInstance.destroy();
  if (chartPurchasesInstance) chartPurchasesInstance.destroy();
  if (inventoryChartInstance) inventoryChartInstance.destroy();
});

const rangeOfYears = () => {
  let currentYear = new Date().getFullYear();
  return [...Array(currentYear).keys()].map(i => i + (currentYear - 5)).filter(i => i >= currentYear - 5 && i <= currentYear);
};

const getSales = () => {
  loading.value = true;
  axios.get(import.meta.env.VITE_API_URL + `admin/products/${productId.value}/sales?month=${salesMonth.value}&year=${salesYear.value}`).then((res) => {
    salesAnalytics.value = res.data;
    createSalesChart();
  }).catch(err => {
    toast.error('Error loading product metrics!');
  })
    .finally(() => loading.value = false);
};

const getPurchases = () => {
  loading.value = true;
  axios.get(import.meta.env.VITE_API_URL + `admin/products/${productId.value}/purchases?month=${purchaseMonth.value}&year=${purchaseYear.value}`).then((res) => {
    purchaseAnalytics.value = res.data;
    createPurchasesChart();
  }).catch(err => {
    toast.error('Error loading product metrics!');
  })
    .finally(() => loading.value = false);
};

const fetchProductMetrics = async () => {
  loading.value = true;

  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(dateFilter.value).filter(([_, v]) => v !== ''))
  ).toString();

  await axios.get(import.meta.env.VITE_API_URL + `admin/products/${productId.value}/stats?${queryString}`).then((res) => {
    metrics.value = res.data;
    product.value = res.data.product;
  }).catch(err => {
    toast.error('Error loading product metrics!');
  })
    .finally(() => loading.value = false);
};

const filtered = (dateRange: any) => {
  dateFilter.value = dateRange;
  fetchProductMetrics();
};

// Tabs
const activeTab = ref('Analytics');
const viewTabs = ref(['Analytics', 'Inventory Report', 'Batches', 'Invoices', 'Returns', 'Suppliers Invoice', 'Suppliers Returns', 'Damages']);

const handleTabChange = (tab: string | { name: string }, index: number) => {
  const tabName = typeof tab === 'string' ? tab : tab.name;
  activeTab.value = tabName;
};

// Back button
const goBack = () => {
  router.back();
};

// Mock Data for Datatables
const generateMockDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
  return dayjs(date).format('YYYY-MM-DD');
};

const mockBatches = ref(Array.from({ length: 13 }, (_, i) => ({
  id: [87, 54, 25, 30, 51, 21, 35, 23, 33, 87, 88, 81, 80][i] || i + 1,
  batch_no: 'AA242121Z',
  quantity: 211,
  expiry_date: '2024-05-21',
  warehouse_shelf: ['Upstairs'],
})));

const mockInvoices = ref(Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  order_group: {
    ref_no: '1726500426-15042',
    user: {
      name: 'Flores, Juanita'
    },
    store: {
      name: ['Emeka Pharmacy', 'Emma Bros Pharmacy', 'Xela pharmacy'][Math.floor(Math.random() * 3)]
    },
    payment_method: {
      display_name: ['On Delivery', 'Cheque'][Math.floor(Math.random() * 2)]
    },
    status_text: ['Picked & Packed', 'Being Processed', 'Delivered'][Math.floor(Math.random() * 3)],
    delivery_type: {
      pivot: {
        processing_date: '2024-05-21'
      }
    }
  },
  deal_id: Math.random() > 0.5 ? 1 : null,
  quantity: 211,
  total_cost_on_purchase: 96700,
  price_on_purchase: 96700,
  total_amount: 96700,
  created_at: '2024-05-21'
})));

const mockReturns = ref(Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  order: {
    order_group: {
      ref_no: '1726500426-15042',
      user: {
        name: 'Flores, Juanita'
      }
    },
    price_on_purchase: 96700
  },
  product_return: {
    reason: 'Incomplete Supply'
  },
  total_quantity: 211,
  created_at: '2024-05-21'
})));

const mockSupplierInvoices = ref(Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  invoice: {
    doc_no: '1726500426-15042',
    total: 96700,
    purchase_order: {
      supplier: {
        name: 'Flores, Juanita'
      },
      invoice: {
        confirmed_at: '2024-05-21'
      }
    }
  },
  quantity: 211,
  returned: 211,
  purchase_order: {
    invoice: {
      confirmed_at: '2024-05-21'
    }
  }
})));

const mockSupplierReturns = ref(Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  purchase_order_item: {
    purchase_order: {
      invoice: {
        doc_no: '1726500426-15042'
      },
      supplier: {
        name: 'Flores, Juanita'
      }
    }
  },
  quantity: 211,
  total_amount: 96700,
  supplier_return: {
    return_date: '2024-05-21'
  }
})));

const mockDamages = ref(Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  damage_cause: 'Incomplete Supply',
  quantity: 211,
  total: 96700
})));

// Batches Columns
const batchesColumns = ref<TableColumn[]>([
  {
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    label: 'Batch No.',
    field: 'batch_no',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'quantity',
    sortable: true,
  },
  {
    label: 'Expiry date',
    field: 'expiry_date',
    sortable: true,
    format: (value: any) => dayjs(value).format('DD/MM/YYYY')
  },
  {
    label: 'Warehouse Shelf',
    field: 'warehouse_shelf',
    sortable: false,
    format: (value: any) => Array.isArray(value) ? value.join(", ") : value
  },
  {
    label: 'Action',
    field: 'action',
    sortable: false,
  },
]);

// Invoices Columns
const invoicesColumns = ref<TableColumn[]>([
  {
    label: 'Order No.',
    field: 'order_group.ref_no',
    sortable: false,
  },
  {
    label: 'Customer Name',
    field: 'order_group.user.name',
    sortable: false,
  },
  {
    label: 'Store Name',
    field: 'order_group.store.name',
    sortable: false,
  },
  {
    label: 'Payment',
    field: 'order_group.payment_method.display_name',
    sortable: false,
  },
  {
    label: 'Deal',
    field: 'deal_id',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'quantity',
    sortable: true,
  },
  {
    label: 'Unit Cost',
    field: 'total_cost_on_purchase',
    sortable: true,
  },
  {
    label: 'Purchase Price',
    field: 'price_on_purchase',
    sortable: true,
    format: (value: any) => '₦' + value,
  },
  {
    label: 'Total Amount',
    field: 'total_amount',
    sortable: true,
    format: (value: any) => '₦' + value,
  },
  {
    label: 'Status',
    field: 'order_group.status_text',
    sortable: true,
  },
  {
    label: 'Order Date',
    field: 'created_at',
    sortable: false,
    format: (value: any) => dayjs(value).format('DD/MM/YYYY')
  },
  {
    label: 'Processing Date',
    field: 'order_group.delivery_type.pivot.processing_date',
    sortable: false,
    format: (value: any) => dayjs(value).format('DD/MM/YYYY')
  },
]);

// Returns Columns
const returnsColumns = ref<TableColumn[]>([
  {
    label: 'Order No.',
    field: 'order.order_group.ref_no',
    sortable: false,
  },
  {
    label: 'Customer Name',
    field: 'order.order_group.user.name',
    sortable: false,
  },
  {
    label: 'Reason',
    field: 'product_return.reason',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'total_quantity',
    sortable: true,
  },
  {
    label: 'Total Amount',
    field: 'total',
    sortable: false,
  },
  {
    label: 'Return Date',
    field: 'created_at',
    sortable: false,
    format: (value: any) => dayjs(value).format('DD/MM/YYYY')
  },
]);

// Supplier Invoices Columns
const supplierInvoicesColumns = ref<TableColumn[]>([
  {
    label: 'Invoice No.',
    field: 'invoice.doc_no',
    sortable: false,
  },
  {
    label: 'Supplier Name',
    field: 'invoice.purchase_order.supplier.name',
    sortable: false,
  },
  {
    label: 'Inbounded Quantity',
    field: 'quantity',
    sortable: true,
  },
  {
    label: 'Returned Quantity',
    field: 'returned',
    sortable: true,
  },
  {
    label: 'Actual Quantity',
    field: 'actual_quantity',
    sortable: true,
  },
  {
    label: 'Total Amount',
    field: 'invoice.total',
    sortable: false,
    format: (value: any) => '₦' + toLocale(value)
  },
  {
    label: 'Invoice Date',
    field: 'purchase_order.invoice.confirmed_at',
    sortable: false,
    format: (value: any) => value ? dayjs(value).format('DD/MM/YYYY') : 'Not confirmed'
  },
]);

// Supplier Returns Columns
const supplierReturnsColumns = ref<TableColumn[]>([
  {
    label: 'Invoice No.',
    field: 'purchase_order_item.purchase_order.invoice.doc_no',
    sortable: false,
  },
  {
    label: 'Supplier Name',
    field: 'purchase_order_item.purchase_order.supplier.name',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'quantity',
    sortable: true,
  },
  {
    label: 'Total Amount',
    field: 'total_amount',
    sortable: false,
  },
  {
    label: 'Return Date',
    field: 'supplier_return.return_date',
    sortable: false,
    format: (value: any) => dayjs(value).format('DD/MM/YYYY')
  },
]);

// Damages Columns
const damagesColumns = ref<TableColumn[]>([
  {
    label: 'Reason',
    field: 'damage_cause',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'quantity',
    sortable: true,
  },
  {
    label: 'Total Amount',
    field: 'total',
    sortable: false,
    format: (value: any) => '₦' + toLocale(value)
  },
]);

// Helper Functions
const viewBatchHistory = (batchId: number) => {
  console.log('View batch history:', batchId);
  // TODO: Navigate to batch history page or open modal
};

const getInvoiceStatusType = (statusText: string | undefined): 'success' | 'grey' | 'danger' => {
  if (!statusText) return 'grey';
  const status = statusText.toLowerCase();
  if (status.includes('delivered')) return 'success';
  if (status.includes('picked') || status.includes('packed') || status.includes('processed')) return 'grey';
  if (status.includes('cancelled') || status.includes('failed')) return 'danger';
  return 'grey';
};

// Initialize on mount
onMounted(() => {
  if (productId.value) {
    fetchProductMetrics();
    getSales();
    getPurchases();
    fetchProductOverview();
    fetchInventoryGraphData();
  }
  // Delay chart creation to ensure canvas is rendered
  setTimeout(() => {
    createSalesChart();
    createPurchasesChart();
    renderInventoryChart();
  }, 100);
});

</script>

<style>
.download_btn {
  min-height: 32px;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(12, 102, 228, 1);
  color: white;
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
}

.product_metrics .card.graph {
  padding: 0px;
}

.card .card-header {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(98, 111, 134, 1);
}

.card .card-description {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0px;
  color: rgba(98, 111, 134, 1);
}

.card .values {
  margin-bottom: 8px;
}

.card .values .total {
  font-size: 20px;
  font-style: normal;
  font-weight: 590;
  line-height: 24px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.card .interest-flow {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
}

.card .interest-flow.increase {
  color: rgba(33, 110, 78, 1);
}

.card .interest-flow.decrease {
  color: rgba(201, 55, 44, 1);
}

.card .interest-container {
  display: flex;
  align-items: flex-start;
}

.card .invoice_total {
  background: rgba(237, 242, 247, 1);
  color: rgba(98, 111, 134, 1);
  font-size: 11px;
  font-weight: 590;
  margin-left: 8px;
}

.attention-container {
  padding: 20px;
}

.attention-container .title {
  font-size: 14px;
  font-style: normal;
  font-weight: 590;
  line-height: 18px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.invoice_stats_container table {
  border-collapse: collapse;
}

.invoice_stats_container table thead tr th {
  font-size: 11px;
  font-style: normal;
  font-weight: 590;
  line-height: 14px;
  letter-spacing: 0px;
  color: rgba(98, 111, 134, 1);
}

.invoice_stats_container table tbody tr td {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  color: rgba(23, 43, 77, 1);
  padding: 12px 16px;
  border-bottom: 1px solid rgba(237, 242, 247, 1);
}

.invoice_stats_container table tbody tr:last-child td {
  border-bottom: none;
}
</style>
