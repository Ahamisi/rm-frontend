<template>
  <div v-if="loading"
    class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <LoadingState></LoadingState>
  </div>
  <div class="px-6 erp_dashboard_wrapper grey_bg">
    <!-- Header -->
    <PageTitle title="Dashboard" />

    <!-- Top Controls -->
    <div class="mb-4 filter">
      <DateFilter @dateFiltered="filtered" />
    </div>

    <!-- metrics -->
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 overflow-x-auto">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- total suppliers -->
          <div class="bg-white rounded-lg card">
            <div class="flex items-center justify-between gap-2">
              <div class="card-details">
                <div class="mb-3 card-header">Total Suppliers</div>
                <div class="flex items-baseline gap-x-2 values">
                  <h3 class="total">{{ stats.total_suppliers.total }}</h3>
                  <div class="flex items-center interest-flow"
                    :class="{ 'increase': (stats.total_suppliers.percentage > 0), 'decrease': (stats.total_suppliers.percentage < 0) }">
                    <svg v-if="stats.total_suppliers.percentage > 0" width="16" height="16" viewBox="0 0 16 16"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.52863 3.52865L3.86197 7.19465C3.73711 7.31987 3.66699 7.48948 3.66699 7.66632C3.66699 7.84315 3.73711 8.01276 3.86197 8.13798C3.92382 8.19995 3.99729 8.2491 4.07817 8.28265C4.15905 8.31619 4.24574 8.33345 4.3333 8.33345C4.42085 8.33345 4.50755 8.31619 4.58843 8.28265C4.6693 8.2491 4.74277 8.19995 4.80463 8.13798L7.3333 5.60932V12C7.3333 12.1768 7.40354 12.3464 7.52856 12.4714C7.65358 12.5964 7.82315 12.6666 7.99997 12.6666C8.17678 12.6666 8.34635 12.5964 8.47137 12.4714C8.59639 12.3464 8.66663 12.1768 8.66663 12V5.60932L11.1953 8.13798C11.2572 8.19988 11.3308 8.24897 11.4117 8.28245C11.4926 8.31593 11.5793 8.33315 11.6669 8.33312C11.7544 8.33309 11.8411 8.31581 11.922 8.28227C12.0029 8.24873 12.0764 8.19959 12.1383 8.13765C12.2002 8.07571 12.2493 8.00218 12.2828 7.92127C12.3162 7.84036 12.3335 7.75365 12.3334 7.66608C12.3334 7.57851 12.3161 7.49181 12.2826 7.41092C12.249 7.33004 12.1999 7.25655 12.138 7.19465L8.4713 3.52865C8.40956 3.46653 8.33611 3.41728 8.25521 3.38375C8.1743 3.35022 8.08754 3.33308 7.99997 3.33332C7.91239 3.33308 7.82563 3.35022 7.74472 3.38375C7.66382 3.41728 7.59037 3.46653 7.52863 3.52865Z"
                        fill="#216E4E" />
                    </svg>
                    <!-- <span v-else-if="stats.total_suppliers.percentage < 0">-</span> -->
                    <span>{{ stats.total_suppliers.percentage }}%</span>
                  </div>
                </div>
                <small class="card-description">Compared to last month</small>
              </div>

              <div class="interest-container">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg"
                  v-if="stats.total_suppliers.percentage > 0">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z"
                    fill="url(#paint0_linear_4412_75696)" />
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B" />
                  <defs>
                    <linearGradient id="paint0_linear_4412_75696" x1="20.5" y1="1" x2="20.5" y2="29"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg"
                  v-else-if="stats.total_suppliers.percentage < 0">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z"
                    fill="url(#paint0_linear_4412_75708)" />
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#C9372C" />
                  <defs>
                    <linearGradient id="paint0_linear_4412_75708" x1="21" y1="1" x2="21" y2="29"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#C9372C" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#C9372C" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- total sku's received -->
          <div class="bg-white rounded-lg card">
            <div class="flex items-center justify-between gap-2">
              <div class="card-details">
                <div class="mb-3 card-header">Total SKU's Received</div>
                <div class="flex items-baseline gap-x-2 values">
                  <h3 class="total">{{ stats.total_sku.total }}</h3>
                  <div class="flex items-center interest-flow"
                    :class="{ 'increase': (stats.total_sku.percentage > 0), 'decrease': (stats.total_sku.percentage < 0) }">
                    <svg v-if="stats.total_sku.percentage > 0" width="16" height="16" viewBox="0 0 16 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.52863 3.52865L3.86197 7.19465C3.73711 7.31987 3.66699 7.48948 3.66699 7.66632C3.66699 7.84315 3.73711 8.01276 3.86197 8.13798C3.92382 8.19995 3.99729 8.2491 4.07817 8.28265C4.15905 8.31619 4.24574 8.33345 4.3333 8.33345C4.42085 8.33345 4.50755 8.31619 4.58843 8.28265C4.6693 8.2491 4.74277 8.19995 4.80463 8.13798L7.3333 5.60932V12C7.3333 12.1768 7.40354 12.3464 7.52856 12.4714C7.65358 12.5964 7.82315 12.6666 7.99997 12.6666C8.17678 12.6666 8.34635 12.5964 8.47137 12.4714C8.59639 12.3464 8.66663 12.1768 8.66663 12V5.60932L11.1953 8.13798C11.2572 8.19988 11.3308 8.24897 11.4117 8.28245C11.4926 8.31593 11.5793 8.33315 11.6669 8.33312C11.7544 8.33309 11.8411 8.31581 11.922 8.28227C12.0029 8.24873 12.0764 8.19959 12.1383 8.13765C12.2002 8.07571 12.2493 8.00218 12.2828 7.92127C12.3162 7.84036 12.3335 7.75365 12.3334 7.66608C12.3334 7.57851 12.3161 7.49181 12.2826 7.41092C12.249 7.33004 12.1999 7.25655 12.138 7.19465L8.4713 3.52865C8.40956 3.46653 8.33611 3.41728 8.25521 3.38375C8.1743 3.35022 8.08754 3.33308 7.99997 3.33332C7.91239 3.33308 7.82563 3.35022 7.74472 3.38375C7.66382 3.41728 7.59037 3.46653 7.52863 3.52865Z"
                        fill="#216E4E" />
                    </svg>
                    <!-- <span v-else-if="stats.total_sku.percentage < 0">-</span> -->
                    <span>{{ stats.total_sku.percentage }}%</span>
                  </div>
                </div>
                <small class="card-description">Compared to last month</small>
              </div>

              <div class="interest-container">
                <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg"
                  v-if="stats.total_sku.percentage > 0">
                  <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z"
                    fill="url(#paint0_linear_4412_75696)" />
                  <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B" />
                  <defs>
                    <linearGradient id="paint0_linear_4412_75696" x1="20.5" y1="1" x2="20.5" y2="29"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#22A06B" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#22A06B" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg"
                  v-else-if="stats.total_sku.percentage < 0">
                  <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z"
                    fill="url(#paint0_linear_4412_75708)" />
                  <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#C9372C" />
                  <defs>
                    <linearGradient id="paint0_linear_4412_75708" x1="21" y1="1" x2="21" y2="29"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#C9372C" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#C9372C" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- no of received supplier -->
          <div class="bg-white rounded-lg card">
            <div class="flex items-center justify-between gap-2">
              <div class="card-details">
                <div class="mb-6 card-header">
                  <span>No of Received Supplies</span>
                  <span class="p-1 rounded invoice_total">{{ stats.received_supplies.count }} invoices</span>
                </div>
                <div class="flex items-baseline gap-x-2 values">
                  <h3 class="total">₦{{ toLocale(stats.received_supplies.total) }}</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- no of supplier cost -->
          <div class="bg-white rounded-lg card">
            <div class="flex items-center justify-between gap-2">
              <div class="card-details">
                <div class="mb-6 card-header">
                  <span>Total Supply Cost</span>
                </div>
                <div class="flex items-baseline gap-x-2 values">
                  <h3 class="total">₦{{ toLocale(stats.total_supply_cost.total) }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action required with tabs -->
        <div class="p-4 my-4 bg-white rounded-lg card attention">

          <div class="card-details">

            <div class="mb-2 card-header action_table_title">Action Required</div>

            <!-- Tabs -->
            <div class="">
              <div class="border-b border-gray-200">
                <nav class="flex space-x-8" aria-label="Tabs">
                  <button v-for="(actionTab, index) in actionRequiredTabs" :key="'stock_value_' + index"
                    @click="activeActionRequiredTab = actionTab" :class="[
                      activeActionRequiredTab === actionTab
                        ? 'active'
                        : '',
                    ]">
                    {{ actionTab }}
                  </button>
                </nav>
              </div>
            </div>

            <!-- Table -->
            <div class="w-full mt-4 overflow-hidden overflow-x-auto bg-white rounded-lg">
              <!-- incomplete supplies -->
              <Datatable v-if="activeActionRequiredTab == 'Incomplete Suppliers & Supplies'"
                :url="incompleteSuppliesUrl" :filterByDate="false" :searchable="false"
                :columns="incompleteSuppliesColumn" pageName="inboundIncompleteSuppliesDashboard">
              </Datatable>
              <!-- short dated supplies -->
              <Datatable v-else-if="activeActionRequiredTab == 'Short dated'" :url="shortDatedUrl" :filterByDate="false"
                :searchable="false" :columns="shortDatedSuppliesColumn" pageName="inboundShortDatedSuppliesDashboard">
              </Datatable>
              <!-- <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="uppercase">
                      PO Number
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Supplier Name
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Product Name
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Supplied Quantity
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Difference
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-001</td>
                    <td class="">Fidson Healthcare</td>
                    <td class="">Vitamin C 1000mg</td>
                    <td class="">150</td>
                    <td class="">10</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-002</td>
                    <td class="">Emzor Pharmaceutical</td>
                    <td class="">Vitamin C 1000mg</td>
                    <td class="">12</td>
                    <td class="">5</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-003</td>
                    <td class="">May & Baker Nigeria Plc</td>
                    <td class="">Paracetamol</td>
                    <td class="">123</td>
                    <td class="">10</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-004</td>
                    <td class="">Fidson Healthcare</td>
                    <td class="">Panadol</td>
                    <td class="">122</td>
                    <td class="">6</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-0015</td>
                    <td class="">Swiss Pharma Nigeria Ltd.</td>
                    <td class="">Ibuprofen</td>
                    <td class="">15</td>
                    <td class="">2</td>
                  </tr>
                </tbody>
              </table> -->
            </div>
          </div>

          <!-- Header -->
        </div>

        <!-- Stock Value with tabs -->
        <div class="w-full p-4 my-4 bg-white rounded-lg card attention">

          <div class="card-details">

            <div class="mb-2 card-header action_table_title">Stock Value</div>

            <!-- Tabs -->
            <div class="">
              <div class="border-b border-gray-200">
                <nav class="flex space-x-8" aria-label="Tabs">
                  <button v-for="(stockTab, index) in stockValueTabs" :key="'stock_value_' + index"
                    @click="activeStockTab = stockTab" :class="[
                      activeStockTab === stockTab
                        ? 'active'
                        : '',
                    ]">
                    {{ stockTab }}
                  </button>
                </nav>
              </div>
            </div>

            <!-- Table -->
            <div class="mt-4 overflow-hidden overflow-x-auto bg-white rounded-lg">
              <Datatable :key="activeStockTab" :url="stockValueUrl" :filterByDate="false" :searchable="false"
                :columns="incompleteSuppliesColumn" :pageName="currentPageName" />
              <!-- <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="uppercase">
                      PO Number
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Supplier Name
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Product Name
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Supplied Quantity
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                    <th scope="col" class="uppercase">
                      <div class="flex items-center">
                        Difference
                        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.19995 9H2.19995L5.19995 12L8.19995 9Z" fill="#091E42" fill-opacity="0.31" />
                          <path d="M8.19995 7H2.19995L5.19995 4L8.19995 7Z" fill="#091E42" fill-opacity="0.31" />
                        </svg>

                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-001</td>
                    <td class="">Fidson Healthcare</td>
                    <td class="">Vitamin C 1000mg</td>
                    <td class="">150</td>
                    <td class="">10</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-002</td>
                    <td class="">Emzor Pharmaceutical</td>
                    <td class="">Vitamin C 1000mg</td>
                    <td class="">12</td>
                    <td class="">5</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-003</td>
                    <td class="">May & Baker Nigeria Plc</td>
                    <td class="">Paracetamol</td>
                    <td class="">123</td>
                    <td class="">10</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-004</td>
                    <td class="">Fidson Healthcare</td>
                    <td class="">Panadol</td>
                    <td class="">122</td>
                    <td class="">6</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="">POC-FOC-0015</td>
                    <td class="">Swiss Pharma Nigeria Ltd.</td>
                    <td class="">Ibuprofen</td>
                    <td class="">15</td>
                    <td class="">2</td>
                  </tr>
                </tbody>
              </table> -->
            </div>
          </div>

          <!-- Header -->
        </div>



      </div>

      <!-- attention required -->
      <div class="bg-white rounded-lg card attention-container h-fit md:w-[389px] w-full">
        <h3 class="mb-4 title">Attention Required</h3>

        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="flex items-center flex-1 gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 19C11.0807 19 10.1705 18.8189 9.32122 18.4672C8.47194 18.1154 7.70026 17.5998 7.05025 16.9497C6.40024 16.2997 5.88463 15.5281 5.53284 14.6788C5.18106 13.8295 5 12.9193 5 12C5 11.0807 5.18106 10.1705 5.53284 9.32122C5.88463 8.47194 6.40024 7.70026 7.05025 7.05025C7.70026 6.40024 8.47194 5.88463 9.32122 5.53284C10.1705 5.18106 11.0807 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19ZM12 17.5C13.4587 17.5 14.8576 16.9205 15.8891 15.8891C16.9205 14.8576 17.5 13.4587 17.5 12C17.5 10.5413 16.9205 9.14236 15.8891 8.11091C14.8576 7.07946 13.4587 6.5 12 6.5C10.5413 6.5 9.14236 7.07946 8.11091 8.11091C7.07946 9.14236 6.5 10.5413 6.5 12C6.5 13.4587 7.07946 14.8576 8.11091 15.8891C9.14236 16.9205 10.5413 17.5 12 17.5ZM12 11.5C12.2652 11.5 12.5196 11.6054 12.7071 11.7929C12.8946 11.9804 13 12.2348 13 12.5V14.5C13 14.7652 12.8946 15.0196 12.7071 15.2071C12.5196 15.3946 12.2652 15.5 12 15.5C11.7348 15.5 11.4804 15.3946 11.2929 15.2071C11.1054 15.0196 11 14.7652 11 14.5V12.5C11 12.2348 11.1054 11.9804 11.2929 11.7929C11.4804 11.6054 11.7348 11.5 12 11.5ZM12 8.5C12.2652 8.5 12.5196 8.60536 12.7071 8.79289C12.8946 8.98043 13 9.23478 13 9.5C13 9.76522 12.8946 10.0196 12.7071 10.2071C12.5196 10.3946 12.2652 10.5 12 10.5C11.7348 10.5 11.4804 10.3946 11.2929 10.2071C11.1054 10.0196 11 9.76522 11 9.5C11 9.23478 11.1054 8.98043 11.2929 8.79289C11.4804 8.60536 11.7348 8.5 12 8.5Z"
                fill="#E56910" />
            </svg>
            <span class="notice_text">{{ stats.pending.suppliers_pending }} Suppliers pending</span>
          </div>
          <a href="">View</a>
        </div>

        <div class="flex items-center justify-center gap-4 pb-6 last_attention_view">
          <div class="flex items-center flex-1 gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 19C11.0807 19 10.1705 18.8189 9.32122 18.4672C8.47194 18.1154 7.70026 17.5998 7.05025 16.9497C6.40024 16.2997 5.88463 15.5281 5.53284 14.6788C5.18106 13.8295 5 12.9193 5 12C5 11.0807 5.18106 10.1705 5.53284 9.32122C5.88463 8.47194 6.40024 7.70026 7.05025 7.05025C7.70026 6.40024 8.47194 5.88463 9.32122 5.53284C10.1705 5.18106 11.0807 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19ZM12 17.5C13.4587 17.5 14.8576 16.9205 15.8891 15.8891C16.9205 14.8576 17.5 13.4587 17.5 12C17.5 10.5413 16.9205 9.14236 15.8891 8.11091C14.8576 7.07946 13.4587 6.5 12 6.5C10.5413 6.5 9.14236 7.07946 8.11091 8.11091C7.07946 9.14236 6.5 10.5413 6.5 12C6.5 13.4587 7.07946 14.8576 8.11091 15.8891C9.14236 16.9205 10.5413 17.5 12 17.5ZM12 11.5C12.2652 11.5 12.5196 11.6054 12.7071 11.7929C12.8946 11.9804 13 12.2348 13 12.5V14.5C13 14.7652 12.8946 15.0196 12.7071 15.2071C12.5196 15.3946 12.2652 15.5 12 15.5C11.7348 15.5 11.4804 15.3946 11.2929 15.2071C11.1054 15.0196 11 14.7652 11 14.5V12.5C11 12.2348 11.1054 11.9804 11.2929 11.7929C11.4804 11.6054 11.7348 11.5 12 11.5ZM12 8.5C12.2652 8.5 12.5196 8.60536 12.7071 8.79289C12.8946 8.98043 13 9.23478 13 9.5C13 9.76522 12.8946 10.0196 12.7071 10.2071C12.5196 10.3946 12.2652 10.5 12 10.5C11.7348 10.5 11.4804 10.3946 11.2929 10.2071C11.1054 10.0196 11 9.76522 11 9.5C11 9.23478 11.1054 8.98043 11.2929 8.79289C11.4804 8.60536 11.7348 8.5 12 8.5Z"
                fill="#E56910" />
            </svg>
            <span class="notice_text">{{ stats.pending.products_pending }} Products pending</span>
          </div>
          <a href="">View</a>
        </div>

        <h3 class="my-4 invoice_stats_title">Invoice Statistics</h3>

        <div class="rounded-lg invoice_stats_container">
          <p class="flex justify-between px-2 py-3 invoice_stat">
            <span>Total Invoice</span>
            <span>{{ stats.pending.products_pending }}</span>
          </p>
          <p class="flex justify-between px-2 py-3 invoice_stat">
            <span>Split Invoices</span>
            <span>342</span>
          </p>
          <p class="flex justify-between px-2 py-3 invoice_stat">
            <span>Previous Supply Balance Description</span>
            <span>₦4,520,000</span>
          </p>
          <p class="flex justify-between px-2 py-3 invoice_stat">
            <span>New SKU Value Description</span>
            <span>₦4,520,000</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import DateFilter from "@/views/Components/Dashboards/DateFilter.vue";
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { toLocale } from '@/views/helpers/useLocale.js'
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn } from '@/types';
import * as dayjs from 'dayjs';


onMounted(() => {
  fetchInboundDashboardStats();
})

const loading = ref(false);
const activeActionRequiredTab = ref('Incomplete Suppliers & Supplies');
const actionRequiredTabs = ref(['Incomplete Suppliers & Supplies', 'Short dated']);
const dateFilter = ref({
  from_date: '',
  to_date: ''
})
const authStore = useAuthStore();
const toast = useToast();


const incompleteSuppliesUrl = computed(() => import.meta.env.VITE_API_URL + `supplies/incomplete?current_branch=${authStore.selectedBranch?.id}`);
const shortDatedUrl = computed(() => import.meta.env.VITE_API_URL + `supplies/short_dated?current_branch=${authStore.selectedBranch?.id}`);

const incompleteSuppliesColumn = ref<TableColumn[]>([
  {
    label: 'PO Number',
    field: 'po_number',
    sortable: false
  },
  {
    label: 'Supplier Name',
    field: 'supplier_name',
    sortable: false
  },
  {
    label: 'Product Name',
    field: 'product_name',
    sortable: false
  },
  {
    label: 'Supplied Quantity',
    field: 'quantity_supplied',
    sortable: false
  },
  {
    label: 'Difference',
    field: 'quantity_diff',
    sortable: false
  },
])

const shortDatedSuppliesColumn = ref<TableColumn[]>([
  {
    label: 'PO Number',
    field: 'po_number',
    sortable: false
  },
  {
    label: 'Supplier Name',
    field: 'supplier_name',
    sortable: false
  },
  {
    label: 'Product Name',
    field: 'product_name',
    sortable: false
  },
  {
    label: 'Expiry Date',
    field: 'expiry_date',
    sortable: false,
    format: (value) => value ? dayjs(value).format('DD/MM/YYYY') : 'N/A'

  },
  {
    label: 'Date Supplied',
    field: 'date_supplied',
    sortable: false,
    format: (value) => value ? dayjs(value).format('DD/MM/YYYY') : 'N/A'
  },
])

const stats = ref({
  total_suppliers: {
    total: 0,
    percentage: 0,
  },
  total_sku: {
    total: 0,
    percentage: 0,
  },
  received_supplies: {
    count: 0,
    total: 0,
  },
  total_supply_cost: {
    total: 0,
  },
  pending: {
    suppliers_pending: 0,
    products_pending: 0,
  }
})

const incompleteSupplies = ref([
  {
    poNumber: 'POC-FOC-001',
    supplierName: 'Fidson Healthcare',
    productName: 'Vitamin C 1000mg',
    suppliedQuantity: 150,
    difference: 10
  },
  {
    poNumber: 'POC-FOC-002',
    supplierName: 'Emzor Pharmaceutical',
    productName: 'Vitamin C 1000mg',
    suppliedQuantity: 12,
    difference: 5
  },
  {
    poNumber: 'POC-FOC-003',
    supplierName: 'May & Baker Nigeria Plc',
    productName: 'Paracetamol',
    suppliedQuantity: 123,
    difference: 10
  },
  {
    poNumber: 'POC-FOC-004',
    supplierName: 'Fidson Healthcare',
    productName: 'Panadol',
    suppliedQuantity: 122,
    difference: 6
  },
  {
    poNumber: 'POC-FOC-0015',
    supplierName: 'Swiss Pharma Nigeria Ltd.',
    productName: 'Ibuprofen',
    suppliedQuantity: 15,
    difference: 2
  },
  {
    poNumber: 'POC-FOC-006',
    supplierName: 'GlaxoSmithKline Nigeria',
    productName: 'Amoxicillin 500mg',
    suppliedQuantity: 200,
    difference: 25
  },
  {
    poNumber: 'POC-FOC-007',
    supplierName: 'Chi Pharmaceuticals',
    productName: 'Metformin 850mg',
    suppliedQuantity: 300,
    difference: 50
  },
  {
    poNumber: 'POC-FOC-008',
    supplierName: 'Ranbaxy Nigeria Ltd.',
    productName: 'Omeprazole 20mg',
    suppliedQuantity: 80,
    difference: 8
  },
  {
    poNumber: 'POC-FOC-009',
    supplierName: 'Pfizer Nigeria Ltd.',
    productName: 'Azithromycin 250mg',
    suppliedQuantity: 60,
    difference: 12
  },
  {
    poNumber: 'POC-FOC-010',
    supplierName: 'Micro Nova Pharmaceuticals',
    productName: 'Ciprofloxacin 500mg',
    suppliedQuantity: 90,
    difference: 7
  },
  {
    poNumber: 'POC-FOC-011',
    supplierName: 'Emzor Pharmaceutical',
    productName: 'Multivitamins',
    suppliedQuantity: 180,
    difference: 20
  },
  {
    poNumber: 'POC-FOC-012',
    supplierName: 'Dana Pharmaceuticals',
    productName: 'Amlodipine 5mg',
    suppliedQuantity: 110,
    difference: 15
  }
]);

const shortDatedItems = ref([
  {
    productCode: 'VIT-C-001',
    productName: 'Vitamin C 1000mg',
    expiryDate: '25/02/2025',
    quantity: 45,
    daysToExpiry: 35
  },
  {
    productCode: 'PAR-500',
    productName: 'Paracetamol 500mg',
    expiryDate: '18/02/2025',
    quantity: 120,
    daysToExpiry: 28
  },
  {
    productCode: 'IBU-400',
    productName: 'Ibuprofen 400mg',
    expiryDate: '10/02/2025',
    quantity: 67,
    daysToExpiry: 20
  },
  {
    productCode: 'ASP-100',
    productName: 'Aspirin 100mg',
    expiryDate: '05/02/2025',
    quantity: 89,
    daysToExpiry: 15
  },
  {
    productCode: 'AMX-500',
    productName: 'Amoxicillin 500mg',
    expiryDate: '28/01/2025',
    quantity: 234,
    daysToExpiry: 7
  },
  {
    productCode: 'MET-850',
    productName: 'Metformin 850mg',
    expiryDate: '31/01/2025',
    quantity: 156,
    daysToExpiry: 10
  },
  {
    productCode: 'OMP-20',
    productName: 'Omeprazole 20mg',
    expiryDate: '02/02/2025',
    quantity: 78,
    daysToExpiry: 12
  },
  {
    productCode: 'AZI-250',
    productName: 'Azithromycin 250mg',
    expiryDate: '22/01/2025',
    quantity: 45,
    daysToExpiry: 1
  },
  {
    productCode: 'CIP-500',
    productName: 'Ciprofloxacin 500mg',
    expiryDate: '15/02/2025',
    quantity: 123,
    daysToExpiry: 25
  },
  {
    productCode: 'MLT-VIT',
    productName: 'Multivitamins',
    expiryDate: '08/02/2025',
    quantity: 267,
    daysToExpiry: 18
  },
  {
    productCode: 'AML-5',
    productName: 'Amlodipine 5mg',
    expiryDate: '03/02/2025',
    quantity: 89,
    daysToExpiry: 13
  },
  {
    productCode: 'DIC-50',
    productName: 'Diclofenac 50mg',
    expiryDate: '26/01/2025',
    quantity: 167,
    daysToExpiry: 5
  },
  {
    productCode: 'LOS-50',
    productName: 'Losartan 50mg',
    expiryDate: '12/02/2025',
    quantity: 98,
    daysToExpiry: 22
  },
  {
    productCode: 'SIM-20',
    productName: 'Simvastatin 20mg',
    expiryDate: '29/01/2025',
    quantity: 134,
    daysToExpiry: 8
  },
  {
    productCode: 'PRE-40',
    productName: 'Prednisolone 40mg',
    expiryDate: '06/02/2025',
    quantity: 76,
    daysToExpiry: 16
  }
]);

const stockValueTabs = ref([
  'FOC Stock',
  'SOR Stock',
  'Indemnity',
  'Replacement'
])

const activeStockTab = ref('FOC Stock');

const stockType = computed(() => {
  const types = {
    'FOC Stock': 'FOC',
    'SOR Stock': 'SOR',
    'Indemnity': 'INDEMNITY COVERED'
  };
  return types[activeStockTab.value] || '';
});

const stockValueUrl = computed(() =>
  `${import.meta.env.VITE_API_URL}supplies/incomplete?current_branch=${authStore.selectedBranch?.id}&type=${stockType.value}`
);

const currentPageName = computed(() => {
  const names = {
    'FOC Stock': 'inboundFocSuppliesDashboard',
    'SOR Stock': 'inboundSorSuppliesDashboard',
    'Indemnity': 'inboundIndemnitySuppliesDashboard'
  };
  return names[activeStockTab.value];
});

const fetchInboundDashboardStats = () => {
  loading.value = true;

  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(dateFilter.value).filter(([_, v]) => v !== ''))
  ).toString();

  axios.get(import.meta.env.VITE_API_URL + `inbound/dashboard/stats?${queryString}&current_branch=${authStore.selectedBranch?.id}`)
    .then((res) => {
      // metrics.value = res.data;
      // product.value = res.data.product;
      stats.value = res.data
    }).catch(err => {
      toast.error('Error loading dashboard stats!');
    })
    .finally(() => loading.value = false)
};

const filtered = (dateRange) => {
  dateFilter.value = dateRange;
  fetchInboundDashboardStats();
}
</script>

<style>
.erp_dashboard_wrapper .card {
  border: 1px solid rgba(9, 30, 66, 0.06);
  padding: 16px 24px;
}

.erp_dashboard_wrapper .card .card-details .card-header {
  color: rgba(98, 111, 134, 1);
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
}

.erp_dashboard_wrapper .card .card-details .total {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: rgba(23, 43, 77, 1);
}

.erp_dashboard_wrapper .card-details .values .interest-flow {
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
}

.erp_dashboard_wrapper .card-details .values .interest-flow.increase {
  color: rgba(33, 110, 78, 1);
}

.card-details .values .interest-flow.decrease {
  color: rgba(174, 46, 36, 1);
}

.erp_dashboard_wrapper .card-details .card-description {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: rgba(98, 111, 134, 1);
}

.erp_dashboard_wrapper .card-details .invoice_total {
  background: rgba(9, 30, 66, 0.06);
  color: rgba(23, 43, 77, 1);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  margin-left: 0.5em;
}

.erp_dashboard_wrapper .attention-container .title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}

.erp_dashboard_wrapper .attention-container .notice_text {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(68, 84, 111, 1);
}

.erp_dashboard_wrapper .attention-container a {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(12, 102, 228, 1);
}

.erp_dashboard_wrapper .attention-container .last_attention_view {
  border-bottom: 1px solid rgba(9, 30, 66, 0.085);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container {
  border: 1px solid rgba(9, 30, 66, 0.14);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container .invoice_stat {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
}

.erp_dashboard_wrapper .attention-container .invoice_stats_container .invoice_stat:not(:last-child) {
  border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.card .card-details .card-header.action_table_title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.card .card-details nav button {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  /* 133.333% */
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
  padding: 12px 8px;
}

.card .card-details nav button.active {
  color: rgba(12, 102, 228, 1);
  border-bottom: 2px solid rgba(12, 102, 228, 1);
}

.erp_dashboard_wrapper .card.attention {
  padding: 16px;
}

table thead tr th {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(23, 43, 77, 1)
}

table thead tr th,
table tbody tr td {
  height: 40px;
  padding: 4px 8px;
  text-align: left;
}

table tbody {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
}
</style>
