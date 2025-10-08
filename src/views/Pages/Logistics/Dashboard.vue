<template>
  <div class="erp_dashboard_wrapper">
    <!-- Page Title -->
    <PageTitle :title="dynamicTitle" class="px-6" :style="{ backgroundColor: '#f7f8f9' }" />
    
    <!-- Main Content -->
    <div class="px-6 py-4 bg-[#f7f8f9] min-h-[calc(100vh-120px)]">
      <!-- White Card Container -->
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Modal-style Tabs -->
        <div class="sticky top-0 bg-white z-20 flex border-b border-gray-200 mb-6 px-6">
          <button
            v-for="tab in logisticsTabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-[#172B4D] hover:border-gray-300'
            ]"
          >
            {{ tab }}
          </button>
        </div>
        
        <!-- Filter Row -->
        <div class="px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <Button type="gray-btn" classStyle="px-3 py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99999 13H17L18 11H5.99999L6.99999 13ZM3.99299 6C3.44499 6 3.20299 6.405 3.44699 6.895L3.99999 8H20L20.553 6.895C20.8 6.4 20.555 6 20.007 6H3.99299ZM10.778 17.556C10.8509 17.6861 10.9561 17.7953 11.0834 17.8731C11.2107 17.9508 11.3559 17.9945 11.505 18H12.495C12.774 18 13.1 17.8 13.222 17.556L14 16H9.99999L10.778 17.556Z" fill="#44546F"/>
                </svg>
                Filter
              </Button>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z" fill="#626F86"/>
                </svg>
                This month: February, 2025
              </div>
            </div>
            
            <!-- Assign Vehicle Button (only for Driver Management tab) -->
            <Button 
              v-if="activeTab === 'Driver Management'" 
              type="blue-btn" 
              classStyle="px-4 py-2"
              @click="showAssignVehicleModal = true"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
              </svg>
              Assign Vehicle
            </Button>
          </div>
        </div>

        <!-- KPI Cards Row (only for Orders tab) -->
        <div v-if="activeTab === 'Orders'" class="px-6 py-6">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Average Delivery Time Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Average Delivery Time</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[14px] font-[500] leading-[24px] text-[#172B4D]">06d | 14h | 53m</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-[#216E4E]">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Percentage of On-time Delivery Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Percentage of On-time Delivery</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[14px] font-[500] leading-[24px] text-[#172B4D]">98%</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-[#216E4E]">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_2)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_2" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
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

        <!-- Tab Content -->
        <div class="px-6 pb-6">
          <!-- Orders Tab Content -->
          <div v-if="activeTab === 'Orders'">
            <div class="bg-white rounded-2xl border p-4" style="border-color: #091E420F;">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Volume by Region</h3>
              <Datatable 
                :items="orderVolumeData" 
                :columns="orderVolumeColumns"
                :searchable="false"
                :printable="false"
                :exportable="false"
              />
            </div>
          </div>

          <!-- Driver Management Tab Content -->
          <div v-else-if="activeTab === 'Driver Management'">
            <div class="bg-white rounded-2xl border p-4 mt-[16px]" style="border-color: #091E420F;">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Driver - Vehicle Assignments</h3>
              <Datatable 
                :items="driverVehicleData" 
                :columns="driverVehicleColumns"
                :searchable="false"
                :printable="false"
                :exportable="false"
              >
                <template #column="col">
                  <span v-if="col.props.column.field === 'driver'">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#0C66E4"/>
                          <path d="M8 9C5.79086 9 4 10.7909 4 13V14H12V13C12 10.7909 10.2091 9 8 9Z" fill="#0C66E4"/>
                        </svg>
                      </div>
                      <span>{{ col.props.row.driver }}</span>
                    </div>
                  </span>
                  <span v-else-if="col.props.column.field === 'status'">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ col.props.row.status }}
                    </span>
                  </span>
                  <span v-else-if="col.props.column.field === 'action'">
                    <button 
                      class="text-gray-400 hover:text-gray-600"
                      @click="editVehicleAssignment(col.props.row)"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34989 16.025C3.3223 16.16 3.32861 16.2997 3.36826 16.4317C3.40791 16.5636 3.47966 16.6837 3.57709 16.7811C3.67451 16.8785 3.79458 16.9503 3.92654 16.9899C4.0585 17.0296 4.19823 17.0359 4.33322 17.0083L7.50822 16.3583L3.99989 12.85L3.34989 16.025ZM8.28405 13.8417L6.51739 12.075L13.5882 4.99998H13.5899L15.3574 6.76748L8.28322 13.8425L8.28405 13.8417ZM16.5366 5.58915L14.7699 3.82082C14.615 3.66588 14.431 3.54306 14.2285 3.4594C14.026 3.37575 13.809 3.3329 13.5899 3.33332C13.1632 3.33332 12.7366 3.49582 12.4107 3.82082L4.27989 11.9525L8.40489 16.0775L16.5357 7.94582C16.8482 7.63327 17.0237 7.20942 17.0237 6.76748C17.0237 6.32554 16.8482 5.9017 16.5357 5.58915H16.5366Z" fill="#44546F"/>
                      </svg>
                    </button>
                  </span>
                  <span v-else>
                    {{ col.props.row[col.props.column.field] }}
                  </span>
                </template>
              </Datatable>
            </div>
          </div>

          <!-- Vehicles Tab Content -->
          <div v-else-if="activeTab === 'Vehicles'">
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 mt-[16px]">
              <!-- Total Active Vehicles Card -->
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-[12px] text-[#626F86]">Total Active Vehicles</h3>
                </div>
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">120</p>
                      <div class="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                        </svg>
                        <span class="text-sm font-medium text-[#216E4E]">12.95%</span>
                      </div>
                    </div>
                    <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                  </div>
                  <div class="w-10 h-7">
                    <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223)"/>
                      <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                      <defs>
                        <linearGradient id="paint0_linear_5499_252223" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22A06B" stop-opacity="0.2"/>
                          <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Total Inactive Vehicles Card -->
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-[12px] text-[#626F86]">Total Inactive Vehicles</h3>
                </div>
                <div class="flex items-baseline justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">30</p>
                      <div class="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                        </svg>
                        <span class="text-sm font-medium text-[#216E4E]">12.95%</span>
                      </div>
                    </div>
                    <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                  </div>
                  <div class="w-10 h-7">
                    <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223)"/>
                      <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                      <defs>
                        <linearGradient id="paint0_linear_5499_252223" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#22A06B" stop-opacity="0.2"/>
                          <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Due Maintenance Table -->
            <div class="bg-white rounded-2xl border p-4" style="border-color: #091E420F;">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Due Maintenance</h3>
              <Datatable 
                :items="dueMaintenanceData" 
                :columns="dueMaintenanceColumns"
                :searchable="false"
                :printable="false"
                :exportable="false"
              >
                <template #column="col">
                  <span v-if="col.props.column.field === 'action'">
                    <button 
                      class="text-gray-400 hover:text-gray-600"
                      @click="logServiceEntry(col.props.row)"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.876 6.455L11.124 3.351C11.916 2.882 13.087 2.884 13.876 3.351L19.124 6.455C19.916 6.923 20.5 7.962 20.5 8.895V15.105C20.5 16.041 19.913 17.078 19.124 17.545L13.876 20.649C13.084 21.118 11.913 21.116 11.124 20.649L5.876 17.545C5.084 17.077 4.5 16.038 4.5 15.105V8.895C4.5 7.959 5.087 6.922 5.876 6.455ZM12.866 5.141C12.701 5.043 12.3 5.043 12.133 5.141L6.885 8.245C6.719 8.343 6.518 8.699 6.518 8.895V15.105C6.518 15.3 6.718 15.656 6.885 15.755L12.133 18.859C12.299 18.957 12.7 18.957 12.867 18.859L18.115 15.755C18.281 15.657 18.482 15.301 18.482 15.105V8.895C18.482 8.7 18.282 8.344 18.115 8.245L12.866 5.141Z" fill="#44546F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 16C11.4391 16 10.4217 15.5786 9.67157 14.8284C8.92143 14.0783 8.5 13.0609 8.5 12C8.5 10.9391 8.92143 9.92172 9.67157 9.17157C10.4217 8.42143 11.4391 8 12.5 8C13.5609 8 14.5783 8.42143 15.3284 9.17157C16.0786 9.92172 16.5 10.9391 16.5 12C16.5 13.0609 16.0786 14.0783 15.3284 14.8284C14.5783 15.5786 13.5609 16 12.5 16ZM12.5 14C13.0304 14 13.5391 13.7893 13.9142 13.4142C14.2893 13.0391 14.5 12.5304 14.5 12C14.5 11.4696 14.2893 10.9609 13.9142 10.5858C13.5391 10.2107 13.0304 10 12.5 10C11.9696 10 11.4609 10.2107 11.0858 10.5858C10.7107 10.9609 10.5 11.4696 10.5 12C10.5 12.5304 10.7107 13.0391 11.0858 13.4142C11.4609 13.7893 11.9696 14 12.5 14Z" fill="#44546F"/>
                      </svg>
                    </button>
                  </span>
                  <span v-else>
                    {{ col.props.row[col.props.column.field] }}
                  </span>
                </template>
              </Datatable>
            </div>
          </div>

          <!-- Trip Expenses Tab Content -->
          <div v-else-if="activeTab === 'Trip Expenses'">
            <div class="bg-white rounded-2xl border p-4 mt-[16px]" style="border-color: #091E420F;">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">All Trips Overview</h3>
              <Datatable 
                :items="tripExpensesData" 
                :columns="tripExpensesColumns"
                :searchable="true"
                :printable="false"
                :exportable="false"
                :sortable="true"
                :filterByDate="true"
                :filterFields="tripExpensesFilterFields"
              >
                <template #header_actions>
                  <Button type="blue-btn" @click="downloadReport">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                      <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
                      <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
                    </svg>
                    Download Report
                  </Button>
                </template>
                <template #column="col">
                  <span v-if="col.props.column.field === 'driver'">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#0C66E4"/>
                          <path d="M8 9C5.79086 9 4 10.7909 4 13V14H12V13C12 10.7909 10.2091 9 8 9Z" fill="#0C66E4"/>
                        </svg>
                      </div>
                      <span>{{ col.props.row.driver }}</span>
                    </div>
                  </span>
                  <span v-else-if="col.props.column.field === 'status'">
                    <Pill 
                      :type="getStatusType(col.props.row.status)" 
                      :text="col.props.row.status"
                    />
                  </span>
                  <span v-else-if="col.props.column.field === 'order_amount'">
                    {{ col.props.row.order_amount }}
                  </span>
                  <span v-else-if="col.props.column.field === 'total_expenses'">
                    {{ col.props.row.total_expenses }}
                  </span>
                  <span v-else-if="col.props.column.field === 'action'">
                    <Button type="gray-btn" @click="openPostTripExpense(col.props.row)">
                      Manage
                    </Button>
                  </span>
                  <span v-else>
                    {{ col.props.row[col.props.column.field] }}
                  </span>
                </template>
              </Datatable>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign/Edit Vehicle Modal -->
    <SideBarModal
      :isOpen="showAssignVehicleModal"
      width="small"
      @close="closeModal"
    >
      <template #header>
        <SideBarHead 
          :title="isEditMode ? 'Edit Vehicle Assignment' : 'Assign Vehicle'"
          :subtitle="isEditMode && selectedAssignment ? selectedAssignment.driver : undefined"
        >
          <template #icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="20" rx="3.75" fill="#F7F8F9"/>
              <g clip-path="url(#clip0_12020_46644)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 10C14.1667 12.3012 12.3012 14.1667 10 14.1667C7.69885 14.1667 5.83337 12.3012 5.83337 10C5.83337 7.69885 7.69885 5.83337 10 5.83337C12.3012 5.83337 14.1667 7.69885 14.1667 10ZM11.25 8.75004C11.25 9.4404 10.6904 10 10 10C9.30968 10 8.75004 9.4404 8.75004 8.75004C8.75004 8.05968 9.30968 7.50004 10 7.50004C10.6904 7.50004 11.25 8.05968 11.25 8.75004ZM10 13.3334C9.2425 13.3345 8.50736 13.0765 7.91671 12.6021V11.25C7.91671 10.7896 8.28629 10.4167 8.75004 10.4167H11.25C11.7105 10.4167 12.0834 10.7855 12.0834 11.25V12.6021C11.5125 13.0596 10.7884 13.3334 10 13.3334Z" fill="#44546F"/>
              </g>
              <defs>
                <clipPath id="clip0_12020_46644">
                  <rect width="10" height="10" fill="white" transform="translate(5 5)"/>
                </clipPath>
              </defs>
            </svg>
          </template>
        </SideBarHead>
      </template>
      <div class="px-6 py-4 space-y-6">
        <!-- Driver Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Driver</label>
          <SelectField
            v-model="assignForm.driver"
            :options="driverOptions"
            placeholder="Select a driver"
          />
        </div>

        <!-- Vehicle Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
          <SelectField
            v-model="assignForm.vehicle"
            :options="vehicleOptions"
            placeholder="Search available vehicle by plate number or name..."
          />
        </div>

        <!-- Assignment Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Assignment Date</label>
          <DateInput
            v-model="assignForm.assignmentDate"
            placeholder="dd/mm/yyyy"
          />
          <p class="text-xs text-gray-500 mt-1">Leave end date empty for indefinite assignment</p>
        </div>

        <!-- Route Planning Section -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="mb-4">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">Route Planning</h4>
            <p class="text-xs text-gray-600">Plan and assign optimal routes efficiently for seamless vehicle management.</p>
          </div>
          
          <!-- Origin -->
          <div class="flex items-center gap-3 mb-3">
            <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200">
              <span class="text-sm text-gray-700">Lagos State (Origin)</span>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9Z" fill="#44546F"/>
                <path d="M14 9C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9Z" fill="#44546F"/>
                <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="#44546F"/>
                <path d="M14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17Z" fill="#44546F"/>
                <path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="#44546F"/>
                <path d="M14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z" fill="#44546F"/>
              </svg>
            </button>
          </div>

          <!-- Destination -->
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
            <div class="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200">
              <input
                v-model="assignForm.destination"
                type="text"
                placeholder="Enter destination"
                class="w-full text-sm text-gray-700 outline-none"
              />
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9Z" fill="#44546F"/>
                <path d="M14 9C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9Z" fill="#44546F"/>
                <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="#44546F"/>
                <path d="M14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17Z" fill="#44546F"/>
                <path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="#44546F"/>
                <path d="M14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z" fill="#44546F"/>
              </svg>
            </button>
            <button class="text-blue-600 hover:text-blue-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V14M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Fuel Estimation -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Fuel in Litres</label>
            <input
              v-model="assignForm.estimatedFuel"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fuel Price per Litre</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-700 text-sm font-semibold">₦</span>
              </div>
              <input
                v-model="assignForm.fuelPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                style="padding-left: 2rem;"
              />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" @click="closeModal">
            Cancel
          </Button>
          <Button type="blue-btn" @click="isEditMode ? updateVehicleAssignment() : assignVehicle()">
            {{ isEditMode ? 'Update' : 'Assign' }}
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Log Service Entry Modal -->
    <SideBarModal
      :isOpen="showLogServiceModal"
      width="small"
      @close="closeLogServiceModal"
    >
      <template #header>
        <SideBarHead 
          title="Log Service Entry"
          :subtitle="selectedVehicle ? `${selectedVehicle.plate_number} - ${selectedVehicle.model}` : undefined"
        >
          <template #icon>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.876 6.455L11.124 3.351C11.916 2.882 13.087 2.884 13.876 3.351L19.124 6.455C19.916 6.923 20.5 7.962 20.5 8.895V15.105C20.5 16.041 19.913 17.078 19.124 17.545L13.876 20.649C13.084 21.118 11.913 21.116 11.124 20.649L5.876 17.545C5.084 17.077 4.5 16.038 4.5 15.105V8.895C4.5 7.959 5.087 6.922 5.876 6.455ZM12.866 5.141C12.701 5.043 12.3 5.043 12.133 5.141L6.885 8.245C6.719 8.343 6.518 8.699 6.518 8.895V15.105C6.518 15.3 6.718 15.656 6.885 15.755L12.133 18.859C12.299 18.957 12.7 18.957 12.867 18.859L18.115 15.755C18.281 15.657 18.482 15.301 18.482 15.105V8.895C18.482 8.7 18.282 8.344 18.115 8.245L12.866 5.141Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 16C11.4391 16 10.4217 15.5786 9.67157 14.8284C8.92143 14.0783 8.5 13.0609 8.5 12C8.5 10.9391 8.92143 9.92172 9.67157 9.17157C10.4217 8.42143 11.4391 8 12.5 8C13.5609 8 14.5783 8.42143 15.3284 9.17157C16.0786 9.92172 16.5 10.9391 16.5 12C16.5 13.0609 16.0786 14.0783 15.3284 14.8284C14.5783 15.5786 13.5609 16 12.5 16ZM12.5 14C13.0304 14 13.5391 13.7893 13.9142 13.4142C14.2893 13.0391 14.5 12.5304 14.5 12C14.5 11.4696 14.2893 10.9609 13.9142 10.5858C13.5391 10.2107 13.0304 10 12.5 10C11.9696 10 11.4609 10.2107 11.0858 10.5858C10.7107 10.9609 10.5 11.4696 10.5 12C10.5 12.5304 10.7107 13.0391 11.0858 13.4142C11.4609 13.7893 11.9696 14 12.5 14Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <div class="px-6 py-4 space-y-6">
        <!-- Vehicle -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
          <SelectField
            v-model="serviceForm.vehicle"
            :options="vehicleOptions"
            placeholder="Select vehicle"
          />
        </div>

        <!-- Service Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Date</label>
          <DateInput
            v-model="serviceForm.serviceDate"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <!-- Service Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <SelectField
            v-model="serviceForm.serviceType"
            :options="serviceTypeOptions"
            placeholder="Select a service type"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="serviceForm.description"
            placeholder="Add additional details or notes about the service performed."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          ></textarea>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold pointer-events-none">₦</span>
            <input
              v-model="serviceForm.amount"
              type="text"
              placeholder="--"
              class="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style="padding-left: 2rem;"
            />
          </div>
        </div>

        <!-- Service Provider -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Provider</label>
          <input
            v-model="serviceForm.serviceProvider"
            type="text"
            placeholder="Enter a service provider name"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" @click="closeLogServiceModal">
            Cancel
          </Button>
          <Button type="blue-btn" @click="saveServiceEntry">
            Save
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Post-Trip Expense Modal -->
    <SideBarModal
      :isOpen="showPostTripExpenseModal"
      width="xl"
      @close="closePostTripExpenseModal"
    >
      <template #header>
        <SideBarHead 
          title="Post-Trip Expense"
          :subtitle="selectedTrip ? `TRIP-${String(selectedTrip.id).padStart(3, '0')}` : undefined"
        >
          <template #icon>
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.24992 0.666687C6.47093 0.666687 6.68289 0.754484 6.83917 0.910765C6.99545 1.06704 7.08325 1.27901 7.08325 1.50002V1.91669H7.71659C7.84149 1.9167 7.96479 1.94479 8.07737 1.99889C8.18996 2.05298 8.28894 2.13168 8.367 2.22919L8.98367 3.00044C9.10204 3.14822 9.16656 3.33192 9.16659 3.52127V5.25002C9.16659 5.47103 9.07879 5.683 8.92251 5.83928C8.76623 5.99556 8.55427 6.08335 8.33325 6.08335C8.33325 6.41487 8.20156 6.73282 7.96714 6.96724C7.73272 7.20166 7.41477 7.33335 7.08325 7.33335C6.75173 7.33335 6.43379 7.20166 6.19937 6.96724C5.96495 6.73282 5.83325 6.41487 5.83325 6.08335H4.16659C4.16659 6.24751 4.13425 6.41005 4.07143 6.56171C4.00862 6.71336 3.91654 6.85116 3.80047 6.96724C3.6844 7.08331 3.5466 7.17538 3.39494 7.2382C3.24328 7.30102 3.08074 7.33335 2.91659 7.33335C2.75243 7.33335 2.58989 7.30102 2.43823 7.2382C2.28657 7.17538 2.14878 7.08331 2.0327 6.96724C1.91663 6.85116 1.82455 6.71336 1.76174 6.56171C1.69892 6.41005 1.66659 6.24751 1.66659 6.08335C1.44557 6.08335 1.23361 5.99556 1.07733 5.83928C0.921049 5.683 0.833252 5.47103 0.833252 5.25002V1.50002C0.833252 1.27901 0.921049 1.06704 1.07733 0.910765C1.23361 0.754484 1.44557 0.666687 1.66659 0.666687H6.24992ZM2.91659 5.66669C2.80608 5.66669 2.7001 5.71058 2.62196 5.78873C2.54382 5.86687 2.49992 5.97285 2.49992 6.08335C2.49992 6.19386 2.54382 6.29984 2.62196 6.37798C2.7001 6.45612 2.80608 6.50002 2.91659 6.50002C3.02709 6.50002 3.13307 6.45612 3.21121 6.37798C3.28935 6.29984 3.33325 6.19386 3.33325 6.08335C3.33325 5.97285 3.28935 5.86687 3.21121 5.78873C3.13307 5.71058 3.02709 5.66669 2.91659 5.66669ZM7.08325 5.66669C6.97275 5.66669 6.86676 5.71058 6.78862 5.78873C6.71048 5.86687 6.66659 5.97285 6.66659 6.08335C6.66659 6.19386 6.71048 6.29984 6.78862 6.37798C6.86676 6.45612 6.97275 6.50002 7.08325 6.50002C7.19376 6.50002 7.29974 6.45612 7.37788 6.37798C7.45602 6.29984 7.49992 6.19386 7.49992 6.08335C7.49992 5.97285 7.45602 5.86687 7.37788 5.78873C7.29974 5.71058 7.19376 5.66669 7.08325 5.66669ZM6.24992 1.50002H1.66659V5.25002H1.98492C2.09761 5.12374 2.23479 5.02168 2.38814 4.95005C2.54149 4.87842 2.70779 4.83871 2.87696 4.83333C3.04613 4.82795 3.21462 4.85702 3.37221 4.91877C3.5298 4.98051 3.67319 5.07365 3.79367 5.19252L3.84825 5.25002H6.15159L6.1995 5.1996L6.24992 5.15169V1.50002ZM7.71659 2.75002H7.08325V4.83335C7.42492 4.83335 7.7345 4.97085 7.96034 5.19252L8.01492 5.25002H8.33325V3.52085L7.71659 2.75002Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="space-y-4">
          <!-- Driver Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Driver</label>
            <SelectField
              v-model="postTripForm.driver"
              :options="driverOptions"
              placeholder="Select driver"
              :disabled="true"
            />
          </div>

          <!-- Vehicle Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Vehicle</label>
            <SelectField
              v-model="postTripForm.vehicle"
              :options="vehicleOptions"
              placeholder="Select vehicle"
              :disabled="true"
            />
          </div>

          <!-- Expense Input Fields -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Fuel Bought in Litres</label>
                <input
                  v-model="postTripForm.fuelLitres"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Fuel Price per Litre</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-700 text-sm font-semibold">₦</span>
                  </div>
                  <input
                    v-model="postTripForm.fuelPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    style="padding-left: 2rem;"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Maintenance Cost</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-700 text-sm font-semibold">₦</span>
                  </div>
                  <input
                    v-model="postTripForm.maintenanceCost"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    style="padding-left: 2rem;"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Fines</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-700 text-sm font-semibold">₦</span>
                  </div>
                  <input
                    v-model="postTripForm.fines"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    style="padding-left: 2rem;"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-end gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-3">Hotel Allowance</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-700 text-sm font-semibold">₦</span>
                  </div>
                  <input
                    v-model="postTripForm.hotelAllowance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    style="padding-left: 2rem;"
                  />
                </div>
              </div>
              <Button type="blue-btn" class="px-6 py-3 h-12">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.32L9.29 11.253C9.10405 11.4403 8.9997 11.6936 8.9997 11.9575C8.9997 12.2214 9.10405 12.4747 9.29 12.662C9.38133 12.7544 9.4901 12.8278 9.61001 12.8779C9.72991 12.928 9.85856 12.9538 9.9885 12.9538C10.1184 12.9538 10.2471 12.928 10.367 12.8779C10.4869 12.8278 10.5957 12.7544 10.687 12.662L11.977 11.361L13.313 12.708C13.4043 12.8005 13.513 12.874 13.6329 12.9241C13.7527 12.9743 13.8813 13.0002 14.0113 13.0003C14.1412 13.0004 14.2699 12.9747 14.3898 12.9247C14.5098 12.8747 14.6186 12.8014 14.71 12.709C14.8953 12.5216 14.9993 12.2687 14.9995 12.0052C14.9997 11.7417 14.896 11.4887 14.711 11.301L12.746 9.321C12.6456 9.21904 12.5259 9.13806 12.3939 9.08275C12.262 9.02744 12.1203 8.99891 11.9772 8.99881C11.8341 8.99872 11.6924 9.02707 11.5604 9.0822C11.4283 9.13734 11.3085 9.21817 11.208 9.32Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.007L11.001 19.993C11.001 20.55 11.449 21.001 12.001 21C12.554 21 13.001 20.55 13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 10.999 9.451 11 10.007Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.481C7.68114 5.43897 7.42128 5.4179 7.161 5.418C4.356 5.419 2 7.62 2 10.499C2 13.408 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.463 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.993C13.987 5.003 14.954 5.37825 15.7027 6.04875C16.4514 6.71924 16.9306 7.63919 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.666 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.021 9.075 3.901 7.938 5.481Z" fill="white"/>
                </svg>
 
                Upload Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <template #footer="{ closeModal }">
        <!-- Trip Financial Summary -->
        <div class="bg-[#F7F8F9] border-t border-gray-200 px-6 py-6 mb-4 -m-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-[#44546F]">Trip Financial Summary</h3>
            
            <div class="flex justify-between items-center">
              <span class="text-[12px] text-[#44546F]">Total Order Amount:</span>
              <span class="text-[12px] text-[#44546F]">{{ selectedTrip?.order_amount || '₦0.00' }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-[12px] text-[#44546F]">Total Pre-Trip Expenses:</span>
              <span class="text-[12px] text-[#44546F]">₦70,000.00</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-[12px] text-[#44546F]">Total Post-Trip Expenses:</span>
              <span class="text-[12px] text-[#44546F]">₦{{ calculatePostTripExpenses() }}</span>
            </div>
            
            <div class="flex justify-between items-center pt-3 border-t border-gray-200">
              <span class="text-[16px] font-medium text-[#44546F]">Grand Total Expenses:</span>
              <span class="text-[16px] font-medium text-[#44546F]">{{ selectedTrip?.total_expenses || '₦0.00' }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <Button type="gray-btn" @click="closeModal">
            Cancel
          </Button>
          <Button type="blue-btn" @click="updatePostTripExpense">
            Update
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Alert Toast -->
    <SuccessAlertToast 
      :isVisible="showSuccessToast"
      :message="successMessage"
      @close="showSuccessToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Button from '@/views/Components/ui/Button.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import DateInput from '@/views/Components/ui/DateInput.vue';
import SideBarHead from '@/views/Components/ui/SideBarHead.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import type { TableColumn, Option } from "@/types";

// Tab management
const activeTab = ref('Orders');
const logisticsTabs = ref(['Orders', 'Driver Management', 'Vehicles', 'Trip Expenses']);

// Dynamic title based on active tab
const dynamicTitle = computed(() => {
  return `Dashboard / ${activeTab.value}`;
});

// Modal state
const showAssignVehicleModal = ref(false);
const isEditMode = ref(false);
const selectedAssignment = ref(null);

// Log Service Modal state
const showLogServiceModal = ref(false);
const selectedVehicle = ref(null);

// Success Toast state
const showSuccessToast = ref(false);
const successMessage = ref('');
const showPostTripExpenseModal = ref(false);
const selectedTrip = ref(null);
const postTripForm = ref({
  driver: '',
  vehicle: '',
  fuelLitres: '',
  fuelPrice: '',
  maintenanceCost: '',
  fines: '',
  hotelAllowance: ''
});

// Assign Vehicle Form
const assignForm = ref({
  driver: null as Option | null,
  vehicle: null as Option | null,
  assignmentDate: '',
  destination: '',
  estimatedFuel: '',
  fuelPrice: ''
});

// Service Entry Form
const serviceForm = ref({
  vehicle: null as Option | null,
  serviceDate: '',
  serviceType: null as Option | null,
  description: '',
  amount: '',
  serviceProvider: ''
});

// Driver options
const driverOptions = ref<Option[]>([
  { id: 1, name: 'Michael Okpala' },
  { id: 2, name: 'Oluwatosin Adegboye' },
  { id: 3, name: 'Henry Christopher' },
  { id: 4, name: 'Sarah Johnson' },
  { id: 5, name: 'David Wilson' }
]);

// Vehicle options
const vehicleOptions = ref<Option[]>([
  { id: 1, name: 'FST-819GA (IVM 500)' },
  { id: 2, name: 'KJA-123BC (Toyota HiAce)' },
  { id: 3, name: 'GGE-789FG (Ford Transit)' },
  { id: 4, name: 'ABC-456DE (Mercedes Sprinter)' },
  { id: 5, name: 'XYZ-789GH (Nissan Urvan)' }
]);

// Order Volume by Region Data
const orderVolumeData = ref([
  { region: 'All North', quantity: 3689, total_amount: '₦231,706,365.00' },
  { region: 'South East', quantity: 0, total_amount: '₦0.00' },
  { region: 'South South', quantity: 0, total_amount: '₦3,826,820.00' },
  { region: 'South West', quantity: 0, total_amount: '₦0.00' },
  { region: 'Lagos Team', quantity: 0, total_amount: '₦0.00' },
  // { region: 'Edo', quantity: 117250, total_amount: '₦3,826,820.00' }
]);

// Driver-Vehicle Assignments Data
const driverVehicleData = ref([
  { 
    driver: 'Michael Okpala', 
    current_vehicle: 'FST-819GA (IVM 500)', 
    vehicle_type: 'Car', 
    route: 'Lagos → Osun → Ekiti', 
    assigned_since: '5/21/2024', 
    status: 'Active' 
  },
  { 
    driver: 'Oluwatosin Adegboye', 
    current_vehicle: 'KJA-123BC (Toyota HiAce)', 
    vehicle_type: 'Van', 
    route: 'Lagos → Osun → Ekiti', 
    assigned_since: '5/21/2024', 
    status: 'Active' 
  },
  { 
    driver: 'Henry Christopher', 
    current_vehicle: 'GGE-789FG (Ford Transit)', 
    vehicle_type: 'Truck', 
    route: 'Lagos → Osun → Ekiti', 
    assigned_since: '5/21/2024', 
    status: 'Active' 
  }
]);

// Due Maintenance Data
const dueMaintenanceData = ref([
  { plate_number: 'FST-819GA', model: 'IVM 500', type: 'Oil Change', due_date: '5/21/2024' },
  { plate_number: 'KJA-123BC', model: 'Toyota HiAce', type: 'Tire Rotation', due_date: '5/21/2024' },
  { plate_number: 'FST-819GA', model: 'IVM 500', type: 'Oil Change', due_date: '5/21/2024' },
  { plate_number: 'GGE-789FG', model: 'Ford Transit', type: 'Inspection', due_date: '5/21/2024' },
  { plate_number: 'FST-819GA', model: 'IVM 500', type: 'Oil Change', due_date: '5/21/2024' },
  { plate_number: 'APP-456DE', model: 'Isuzu N-Series', type: 'Oil Change', due_date: '5/21/2024' }
]);

// Service type options
const serviceTypeOptions = ref<Option[]>([
  { id: 1, name: 'Oil Change' },
  { id: 2, name: 'Tire Rotation' },
  { id: 3, name: 'Inspection' },
  { id: 4, name: 'Brake Service' },
  { id: 5, name: 'Engine Tune-up' },
  { id: 6, name: 'Transmission Service' }
]);

// Trip Expenses Data
const tripExpensesData = ref([
  { 
    trip_id: 'TRIP-001', 
    driver: 'Michael Okpala', 
    vehicle: 'FST-819GA (IVM 500)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'Returned - Pending Expenses', 
    due_date: '5/21/2024' 
  },
  { 
    trip_id: 'TRIP-002', 
    driver: 'Oluwatosin Adegboye', 
    vehicle: 'KJA-123BC (Toyota HiAce)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'In Transit', 
    due_date: '5/21/2024' 
  },
  { 
    trip_id: 'TRIP-003', 
    driver: 'Henry Christopher', 
    vehicle: 'GGE-789FG (Ford Transit)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'Completed', 
    due_date: '5/21/2024' 
  },
  { 
    trip_id: 'TRIP-004', 
    driver: 'Oluwatosin Adegboye', 
    vehicle: 'SMK-012H1 (Mitsubishi Fuso Canter)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'Completed', 
    due_date: '5/21/2024' 
  },
  { 
    trip_id: 'TRIP-005', 
    driver: 'Henry Christopher', 
    vehicle: 'FST-819GA (IVM 500)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'Completed', 
    due_date: '5/21/2024' 
  },
  { 
    trip_id: 'TRIP-006', 
    driver: 'Oluwatosin Adegboye', 
    vehicle: 'APP-456DE (Isuzu N-Series)', 
    route: 'Lagos → Osun → Ekiti', 
    order_amount: '₦187,000.00', 
    total_expenses: '₦100,000.00', 
    status: 'Completed', 
    due_date: '5/21/2024' 
  }
]);

// Trip Expenses filter fields
const tripExpensesFilterFields = ref({
  status: {
    type: 'select',
    label: 'Status',
    options: [
      { value: 'Returned - Pending Expenses', label: 'Returned - Pending Expenses' },
      { value: 'In Transit', label: 'In Transit' },
      { value: 'Completed', label: 'Completed' }
    ]
  },
  driver: {
    type: 'select',
    label: 'Driver',
    options: [
      { value: 'Michael Okpala', label: 'Michael Okpala' },
      { value: 'Oluwatosin Adegboye', label: 'Oluwatosin Adegboye' },
      { value: 'Henry Christopher', label: 'Henry Christopher' }
    ]
  }
});

// Table columns for Order Volume by Region
const orderVolumeColumns = ref<TableColumn[]>([
  {
    label: "Region",
    field: "region",
    sortable: false,
  },
  {
    label: "Quantity",
    field: "quantity",
    sortable: false,
  },
  {
    label: "Total Amount",
    field: "total_amount",
    sortable: false,
  },
]);

// Table columns for Driver-Vehicle Assignments
const driverVehicleColumns = ref<TableColumn[]>([
  {
    label: "Driver",
    field: "driver",
    sortable: false,
  },
  {
    label: "Current Vehicle",
    field: "current_vehicle",
    sortable: false,
  },
  {
    label: "Vehicle Type",
    field: "vehicle_type",
    sortable: false,
  },
  {
    label: "Route",
    field: "route",
    sortable: false,
  },
  {
    label: "Assigned Since",
    field: "assigned_since",
    sortable: false,
  },
  {
    label: "Status",
    field: "status",
    sortable: false,
  },
  {
    label: "Action",
    field: "action",
    sortable: false,
  },
]);

// Table columns for Due Maintenance
const dueMaintenanceColumns = ref<TableColumn[]>([
  {
    label: "Plate Number",
    field: "plate_number",
    sortable: false,
  },
  {
    label: "Model",
    field: "model",
    sortable: false,
  },
  {
    label: "Type",
    field: "type",
    sortable: false,
  },
  {
    label: "Due Date",
    field: "due_date",
    sortable: false,
  },
  {
    label: "Action",
    field: "action",
    sortable: false,
  },
]);

// Table columns for Trip Expenses
const tripExpensesColumns = ref<TableColumn[]>([
  {
    label: "Trip ID",
    field: "trip_id",
    sortable: true,
  },
  {
    label: "Driver",
    field: "driver",
    sortable: true,
  },
  {
    label: "Vehicle",
    field: "vehicle",
    sortable: true,
  },
  {
    label: "Route",
    field: "route",
    sortable: true,
  },
  {
    label: "Order Amount",
    field: "order_amount",
    sortable: true,
  },
  {
    label: "Total Expenses",
    field: "total_expenses",
    sortable: true,
  },
  {
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    label: "Due Date",
    field: "due_date",
    sortable: true,
  },
  {
    label: "Action",
    field: "action",
    sortable: false,
  },
]);

// Functions
const editVehicleAssignment = (assignment: any) => {
  selectedAssignment.value = assignment;
  isEditMode.value = true;
  
  // Pre-fill form with existing data
  assignForm.value = {
    driver: driverOptions.value.find(d => d.name === assignment.driver) || null,
    vehicle: vehicleOptions.value.find(v => v.name === assignment.current_vehicle) || null,
    assignmentDate: assignment.assigned_since,
    destination: assignment.route.split(' → ')[1] || '', // Extract destination from route
    estimatedFuel: '41', // Mock data
    fuelPrice: '890.00' // Mock data
  };
  
  showAssignVehicleModal.value = true;
};

const assignVehicle = () => {
  console.log('Assigning vehicle:', assignForm.value);
  // TODO: Implement actual assignment logic
  closeModal();
};

const updateVehicleAssignment = () => {
  console.log('Updating vehicle assignment:', assignForm.value);
  // TODO: Implement actual update logic
  closeModal();
};

const closeModal = () => {
  showAssignVehicleModal.value = false;
  isEditMode.value = false;
  selectedAssignment.value = null;
  // Reset form
  assignForm.value = {
    driver: null,
    vehicle: null,
    assignmentDate: '',
    destination: '',
    estimatedFuel: '',
    fuelPrice: ''
  };
};

// Log Service Entry Functions
const logServiceEntry = (vehicle: any) => {
  selectedVehicle.value = vehicle;
  
  // Pre-fill form with vehicle data
  serviceForm.value = {
    vehicle: vehicleOptions.value.find(v => v.name === `${vehicle.plate_number} (${vehicle.model})`) || null,
    serviceDate: '',
    serviceType: null,
    description: '',
    amount: '',
    serviceProvider: ''
  };
  
  showLogServiceModal.value = true;
};

const saveServiceEntry = () => {
  console.log('Saving service entry:', serviceForm.value);
  // TODO: Implement actual save logic
  closeLogServiceModal();
};

const closeLogServiceModal = () => {
  showLogServiceModal.value = false;
  selectedVehicle.value = null;
  // Reset form
  serviceForm.value = {
    vehicle: null,
    serviceDate: '',
    serviceType: null,
    description: '',
    amount: '',
    serviceProvider: ''
  };
};

// Trip Expenses Functions
const downloadReport = () => {
  successMessage.value = 'Trip expenses report downloaded successfully!';
  showSuccessToast.value = true;
};

const manageTrip = (trip: any) => {
  console.log('Managing trip:', trip);
  // TODO: Implement manage trip functionality
};

const getStatusType = (status: string) => {
  switch (status) {
    case 'Returned - Pending Expenses':
      return 'danger';
    case 'In Transit':
      return 'hospital';
    case 'Completed':
      return 'cash-and-carry';
    default:
      return 'controlled';
  }
};

// Post-Trip Expense functions
const openPostTripExpense = (trip: any) => {
  selectedTrip.value = trip;
  postTripForm.value = {
    driver: trip.driver,
    vehicle: trip.vehicle,
    fuelLitres: '',
    fuelPrice: '',
    maintenanceCost: '',
    fines: '',
    hotelAllowance: ''
  };
  showPostTripExpenseModal.value = true;
};

const closePostTripExpenseModal = () => {
  showPostTripExpenseModal.value = false;
  selectedTrip.value = null;
  postTripForm.value = {
    driver: '',
    vehicle: '',
    fuelLitres: '',
    fuelPrice: '',
    maintenanceCost: '',
    fines: '',
    hotelAllowance: ''
  };
};

const calculatePostTripExpenses = () => {
  const fuelLitres = parseFloat(postTripForm.value.fuelLitres) || 0;
  const fuelPrice = parseFloat(postTripForm.value.fuelPrice) || 0;
  const maintenanceCost = parseFloat(postTripForm.value.maintenanceCost) || 0;
  const fines = parseFloat(postTripForm.value.fines) || 0;
  const hotelAllowance = parseFloat(postTripForm.value.hotelAllowance) || 0;
  
  const total = (fuelLitres * fuelPrice) + maintenanceCost + fines + hotelAllowance;
  return total.toFixed(2);
};

const updatePostTripExpense = () => {
  // TODO: Implement update logic
  console.log('Updating post-trip expense:', postTripForm.value);
  closePostTripExpenseModal();
  successMessage.value = 'Post-trip expenses updated successfully!';
  showSuccessToast.value = true;
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f7f8f9;
}
</style>