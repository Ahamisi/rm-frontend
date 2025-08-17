<template>
  <div class="erp_dashboard_wrapper">
    <!-- Breadcrumb -->
    <div class="bg-white px-6 py-4">
      <nav class="text-[#626F86] text-sm space-x-2">
        <router-link :to="{ name: 'outbound.order-fulfillment' }" class="hover:text-gray-800">Order Fulfillment</router-link>
        <span>/</span>
        <span class="">Picking List - REF: {{ orderRef }}</span>
      </nav>
    </div>

    <!-- Header -->
    <div class="px-6 py-4 bg-white flex items-center justify-between">
      <!-- Back Button (Far Left) -->
      <button @click="goBack" class="text-gray-600 hover:text-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z" fill="#44546F"/>
        </svg>
      </button>
      
      <!-- Center Title -->
      <div class="flex items-center gap-3">
        <h1 class="text-sm text-gray-900">Picking List</h1>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>REF: {{ orderRef }}</span>
        </div>
      </div>
      
      <!-- Confirm Buttons (Far Right) -->
      <div class="flex items-center gap-3">
        <button 
          @click="startConfirmFlow(false)"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Confirm Picking List
        </button>
        <button 
          @click="startConfirmFlow(true)"
          class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80"
        >
          Confirm Picking List & CheckOut
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 bg-white min-h-screen">
      <!-- Info Sections -->
      <div class="grid grid-cols-12 gap-6 mb-6 bg-[#F7F8F9] rounded-xl w-[100%] mx-auto p-6">

        <!-- Seller Info (2 columns) -->
        <div class="col-span-2">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Seller</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="font-medium text-gray-900">Remedial Health</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83366 1.66667C4.91318 1.66667 4.16699 2.41286 4.16699 3.33334V16.6667C4.16699 17.5871 4.91318 18.3333 5.83366 18.3333H14.167C15.0875 18.3333 15.8337 17.5871 15.8337 16.6667V3.33334C15.8337 2.41286 15.0875 1.66667 14.167 1.66667H5.83366ZM14.167 3.33334H5.83366V14.1667H14.167V3.33334ZM11.667 15.8333H8.33366V16.6667H11.667V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>+234 801 234 5678</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>info@remedialhealth.com</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>4, Road 56, Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <!-- Buyer Info (2 columns) -->
        <div class="col-span-2">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Buyer</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="font-medium text-gray-900">Janet Adeajayi</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83366 1.66667C4.91318 1.66667 4.16699 2.41286 4.16699 3.33334V16.6667C4.16699 17.5871 4.91318 18.3333 5.83366 18.3333H14.167C15.0875 18.3333 15.8337 17.5871 15.8337 16.6667V3.33334C15.8337 2.41286 15.0875 1.66667 14.167 1.66667H5.83366ZM14.167 3.33334H5.83366V14.1667H14.167V3.33334ZM11.667 15.8333H8.33366V16.6667H11.667V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>+234 801 234 5678</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>Emeka Pharmacy</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>4, Road 56, Lagos, Nigeria</span>
            </div>
            <div class="text-sm text-gray-600">Lagos State</div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>email@example.com</span>
            </div>
          </div>
        </div>

        <!-- Order Info (2 columns) -->
        <div class="col-span-2">
          <h3 class="text-sm font-medium text-gray-900 mb-4">Order</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span class="font-medium text-gray-900">REF: {{ orderRef }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>5/21/2024</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Agent Oreva</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83366 1.66667C4.91318 1.66667 4.16699 2.41286 4.16699 3.33334V16.6667C4.16699 17.5871 4.91318 18.3333 5.83366 18.3333H14.167C15.0875 18.3333 15.8337 17.5871 15.8337 16.6667V3.33334C15.8337 2.41286 15.0875 1.66667 14.167 1.66667H5.83366ZM14.167 3.33334H5.83366V14.1667H14.167V3.33334ZM11.667 15.8333H8.33366V16.6667H11.667V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>+234 801 234 5678</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items Section -->
      <div class="bg-[#F7F8F9] rounded-xl w-[100%] mx-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Order Items</h3>
          <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Scanner
          </button>
        </div>
        
        <Datatable
          :data="pickingItems"
          :columns="pickingColumns"
          :searchable="false"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="{}"
        >
          <template #column="col">
            <!-- Checkbox for S/N -->
            <span v-if="col.props.column.field === 'checkbox'">
              <input 
                type="checkbox" 
                :checked="selectedItems.includes(col.props.row.id)"
                @change="toggleItemSelection(col.props.row.id)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </span>
            
            <!-- S/N -->
            <span v-else-if="col.props.column.field === 'sn'">
              {{ col.props.row.sn }}
            </span>
            
            <!-- Scan column -->
            <span v-else-if="col.props.column.field === 'scan'">
              <button class="text-blue-600 hover:text-blue-800 text-sm">
                {{ col.props.row.scan }}
              </button>
            </span>
            
            <!-- Default -->
            <span v-else>
              {{ col.props.formattedRow[col.props.column.field] }}
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Packaging Modal -->
    <div v-if="showPackagingModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl w-[500px] mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">How was this packaged?</h3>
          <button @click="showPackagingModal = false" class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6">
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <p class="text-sm text-blue-800">
              Please enter the number of cartons or nylons used to package this order.
            </p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No. of Cartons</label>
              <input 
                v-model="cartonCount"
                type="number" 
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No of Nylons</label>
              <input 
                v-model="nylonCount"
                type="number" 
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <!-- Modal Footer -->
        <div class="flex justify-end p-6 border-t border-gray-200">
          <button 
            @click="proceedToConfirm"
            class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Picking List Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl w-[500px] mx-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0616 4.96699C11.5776 3.99299 12.4196 3.98899 12.9376 4.96699L20.0616 18.425C20.5776 19.399 20.1066 20.196 19.0046 20.196H4.99458C3.89258 20.196 3.41958 19.403 3.93758 18.425L11.0616 4.96699ZM11.2925 14.7071C11.48 14.8946 11.7344 15 11.9996 15C12.2648 15 12.5192 14.8946 12.7067 14.7071C12.8942 14.5196 12.9996 14.2652 12.9996 14V8.99998C12.9996 8.73477 12.8942 8.48041 12.7067 8.29288C12.5192 8.10534 12.2648 7.99998 11.9996 7.99998C11.7344 7.99998 11.48 8.10534 11.2925 8.29288C11.1049 8.48041 10.9996 8.73477 10.9996 8.99998V14C10.9996 14.2652 11.1049 14.5196 11.2925 14.7071ZM11.2925 17.7071C11.48 17.8946 11.7344 18 11.9996 18C12.2648 18 12.5192 17.8946 12.7067 17.7071C12.8942 17.5196 12.9996 17.2652 12.9996 17C12.9996 16.7348 12.8942 16.4804 12.7067 16.2929C12.5192 16.1053 12.2648 16 11.9996 16C11.7344 16 11.48 16.1053 11.2925 16.2929C11.1049 16.4804 10.9996 16.7348 10.9996 17C10.9996 17.2652 11.1049 17.5196 11.2925 17.7071Z" fill="#E56910"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Confirm Picking List</h3>
          </div>
          <button @click="showConfirmModal = false" class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-gray-600">
            You are about to confirm the picking list for order <strong>#REF: {{ orderRef }}</strong>. Please ensure all items have been properly scanned and verified.
          </p>
        </div>
        
        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button 
            @click="showConfirmModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            @click="confirmPickingList"
            class="px-4 py-2 text-sm font-medium bg-[#F5CD47] text-[#172B4D] rounded-md hover:bg-[#F5CD47]/80"
          >
            Confirm
          </button>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'

const router = useRouter()
const route = useRoute()

// Reactive state
const showToast = ref(false)
const toastMessage = ref('')
const selectedItems = ref<number[]>([])
const orderRef = ref('1656493689-254')
const showPackagingModal = ref(false)
const showConfirmModal = ref(false)
const cartonCount = ref(0)
const nylonCount = ref(0)
const shouldCheckOut = ref(false)

// Picking items data
const pickingItems = ref([
  {
    id: 1,
    sn: 1,
    description: 'These lozenges are suitable for adults and children over 12 years old.',
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 71,
    batch_no: '4C452012',
    expiry_date: '5/21/2024',
    warehouse_shelf: '4C452012',
    scan: 'Scan shelf for 4C452012'
  },
  {
    id: 2,
    sn: 2,
    description: 'These lozenges are suitable for adults and children over 12 years old.',
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 59,
    batch_no: '4C452012',
    expiry_date: '5/21/2024',
    warehouse_shelf: '4C452012',
    scan: 'Scan shelf for 4C452012'
  },
  {
    id: 3,
    sn: 3,
    description: 'These lozenges are suitable for adults and children over 12 years old.',
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 70,
    batch_no: '4C452012',
    expiry_date: '5/21/2024',
    warehouse_shelf: '4C452012',
    scan: 'Scan shelf for 4C452012'
  }
])

// Column definitions
const pickingColumns = ref([
  {
    field: 'checkbox',
    label: '',
    width: '5%',
    sortable: false
  },
  {
    field: 'sn',
    label: 'S/N',
    width: '8%',
    sortable: false
  },
  {
    field: 'description',
    label: 'Description',
    width: '20%',
    sortable: false
  },
  {
    field: 'product_name',
    label: 'Product Name',
    width: '20%',
    sortable: false
  },
  {
    field: 'quantity',
    label: 'Quantity',
    width: '10%',
    sortable: false
  },
  {
    field: 'batch_no',
    label: 'Batch No.',
    width: '10%',
    sortable: false
  },
  {
    field: 'expiry_date',
    label: 'Expiry Date',
    width: '10%',
    sortable: false
  },
  {
    field: 'warehouse_shelf',
    label: 'Warehouse Shelf',
    width: '12%',
    sortable: false
  },
  {
    field: 'scan',
    label: 'Scan',
    width: '15%',
    sortable: false
  }
])

// Functions
const goBack = () => {
  router.push({ name: 'outbound.order-fulfillment' })
}

const toggleItemSelection = (itemId: number) => {
  const index = selectedItems.value.indexOf(itemId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(itemId)
  }
}

const startConfirmFlow = (checkOut: boolean) => {
  shouldCheckOut.value = checkOut
  showPackagingModal.value = true
}

const proceedToConfirm = () => {
  showPackagingModal.value = false
  showConfirmModal.value = true
}

const confirmPickingList = () => {
  showConfirmModal.value = false
  
  if (shouldCheckOut.value) {
    toastMessage.value = 'Picking list confirmed and checked out successfully!'
  } else {
    toastMessage.value = 'Picking list confirmed successfully!'
  }
  
  showToast.value = true
  
  // Navigate back after a delay
  setTimeout(() => {
    goBack()
  }, 2000)
}

onMounted(() => {
  // Get order ref from route params if available
  if (route.params.id) {
    orderRef.value = route.params.id as string
  }
})
</script>
