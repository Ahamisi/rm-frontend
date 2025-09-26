<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="More Actions / Returned Products" />

    <!-- Initial Search Screen -->
    <div class="flex items-center justify-center min-h-[calc(100vh-190px)]" v-if="!hasSearched">
      <div class="intro_search_wrapper">
        <div class="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
              fill="#0C66E4" />
          </svg>
          <h3>Let's Find Your Returned Products</h3>
        </div>
        <p class="my-4 text-center">Please search by Order Ref No, Customer Name or Store Name to load returned products</p>
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
      <Datatable 
        :items="returnedData" 
        :filterByDate="true" 
        :columns="returnedColumns" 
        :key="childKey"
        pageName="ReturnedProducts" 
        @onSearch="updateSearch"
      >
        <template #header_search>
          <div class="flex items-center gap-2 mr-3">
            <label for="sort_by" class="sort_by_label">Search By</label>
            <div class="w-40 h-[34px]">
              <CustomSelectDropdown 
                v-model="selectedSearchBy"
                :options="searchByOptions"
                placeholder="Select search type"
                customHeight="34px"
              />
            </div>
          </div>
        </template>
        
        <template #column="col">
          <!-- ID -->
          <span v-if="col.props.column.field === 'id'">
            <span class="font-medium">{{ col.props.row.id }}</span>
          </span>
          
          <!-- Order No -->
          <span v-else-if="col.props.column.field === 'order_no'">
            <span class="font-medium">{{ col.props.row.order_no }}</span>
          </span>
          
          <!-- Warehouse -->
          <span v-else-if="col.props.column.field === 'warehouse'">
            <span class="text-gray-700">{{ col.props.row.warehouse }}</span>
          </span>
          
          <!-- Customer Name -->
          <span v-else-if="col.props.column.field === 'customer_name'">
            <span>{{ col.props.row.customer_name }}</span>
          </span>
          
          <!-- Store Name -->
          <span v-else-if="col.props.column.field === 'store_name'">
            <span class="text-gray-700">{{ col.props.row.store_name }}</span>
          </span>
          
          <!-- Driver -->
          <span v-else-if="col.props.column.field === 'driver'">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6B7280"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#6B7280"/>
                </svg>
              </div>
              <span class="text-gray-700">{{ col.props.row.driver }}</span>
            </div>
          </span>
          
          <!-- Reason -->
          <span v-else-if="col.props.column.field === 'reason'">
            <span class="text-gray-700">{{ col.props.row.reason }}</span>
          </span>
          
          <!-- Items -->
          <span v-else-if="col.props.column.field === 'items'">
            <span class="text-gray-700">{{ col.props.row.items }}</span>
          </span>
          
          <!-- Transit Status -->
          <span v-else-if="col.props.column.field === 'transit_status'">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ col.props.row.transit_status }}
            </span>
          </span>
          
          <!-- Total Amount -->
          <span v-else-if="col.props.column.field === 'total_amount'">
            <span class="font-medium">{{ col.props.row.total_amount }}</span>
          </span>
          
          <!-- Date Created -->
          <span v-else-if="col.props.column.field === 'date_created'">
            <span class="text-gray-700">{{ col.props.row.date_created }}</span>
          </span>
          
          <!-- Action -->
          <span v-else-if="col.props.column.field === 'actions'">
            <div class="flex items-center gap-2">
              <!-- View Return -->
              <button @click="viewReturn(col.props.row)" 
                      class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      title="View Return">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
              </button>
              
              <!-- Print Return -->
              <button @click="printReturn(col.props.row)" 
                      class="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      title="Print Return">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </span>
          
          <!-- Default -->
          <span v-else class="text-xs">
            {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Product Return Details Modal -->
    <SideBarModal 
      :isOpen="showReturnDetailsModal" 
      @update:isOpen="showReturnDetailsModal = $event"
      width="xl"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Product Return Details</span>
          <span class="text-sm font-medium text-gray-600">REF: {{ selectedReturn?.order_no }}</span>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        </div>
      </template>

      <!-- Fixed Tab Navigation -->
      <div class="sticky top-0 z-20 bg-white border-b border-gray-200 flex-shrink-0">
        <div class="flex gap-x-2 px-6">
          <button 
            v-for="tab in returnTabs" 
            :key="tab.id" 
            @click="returnDetailsTab = tab.id"
            :class="[
              'px-1 py-3 -mb-px text-sm font-medium border-b-2 transition-colors tab_text',
              returnDetailsTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Scrollable Tab Content -->
      <div class="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <!-- Details Tab -->
        <div v-if="returnDetailsTab === 'details'" class="space-y-6 pb-6">
          <!-- Return Information Grid -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="key">REF</span>
              <span class="value">{{ selectedReturn?.order_no }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Warehouse</span>
              <span class="value">{{ selectedReturn?.warehouse }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Transit Status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ selectedReturn?.transit_status }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Customer's Name</span>
              <span class="value">{{ selectedReturn?.customer_name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Customer Type</span>
              <span class="value">Pharmacy</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Phone</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">+234 809 123 4567</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Store Name</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">{{ selectedReturn?.store_name }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Reason</span>
              <span class="value">{{ selectedReturn?.reason }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="key">Date</span>
              <div class="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                <span class="value">5/21/2024 - 11:13 AM</span>
              </div>
            </div>
          </div>

          <hr class="border-gray-200">

          <!-- Order Summary -->
          <div class="mt-8">
            <h3 class="mb-4 text-lg font-medium text-[#44546F]">Order Summary</h3>

            <!-- Datatable -->
            <div class="order-summary-table">
              <Datatable 
                :items="returnItems" 
                :columns="returnProductColumns"
                :searchable="false"
                :sortable="false"
                :filterByDate="false"
                :exportable="false"
                :printable="false"
                :showPagination="false"
                pageName="ReturnSummary"
              >
                <template #column="col">
                  <span v-if="col.props.column.field === 'product_name'">
                    <div class="font-medium">{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}</div>
                    <div class="text-xs text-gray-500">SKU: {{ (col.props.formattedRow as any)['sku'] || '' }}</div>
                  </span>
                  <span v-else-if="col.props.column.field === 'tags'">
                    <div class="flex flex-wrap gap-1">
                      <Pill 
                        v-if="typeof (col.props.formattedRow as any)[col.props.column.field || ''] === 'string'"
                        :type="getPillType((col.props.formattedRow as any)[col.props.column.field || ''])"
                        :text="(col.props.formattedRow as any)[col.props.column.field || '']"
                      />
                      <Pill 
                        v-else
                        v-for="tag in (col.props.formattedRow as any)[col.props.column.field || '']" 
                        :key="tag"
                        :type="getPillType(tag)"
                        :text="tag"
                      />
                    </div>
                  </span>
                  <span v-else-if="col.props.column.field === 'unit_price'">
                    ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                  </span>
                  <span v-else-if="col.props.column.field === 'price_total'">
                    ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                  </span>
                  <span v-else>{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}</span>
                </template>
              </Datatable>
            </div>
          </div>
        </div>

        <!-- Activities Tab -->
        <div v-else-if="returnDetailsTab === 'activities'" class="py-0">
          <Activities :activities="returnActivities" :order-ref="selectedReturn?.order_no || ''" />
        </div>
      </div>

      <!-- Fixed Totals Section - Only show on Details tab -->
      <div v-if="returnDetailsTab === 'details'" class="sticky bottom-0 z-20 bg-[#F7F8F9] border-t border-gray-200 flex-shrink-0 px-6 py-4">
        <div class="space-y-2">
          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
            <span class="text-[16px] font-medium text-[#44546F]">Total:</span>
            <span class="text-[16px] font-medium text-[#44546F]">₦187,000.00</span>
          </div>
        </div>
      </div>

      <!-- Footer buttons -->
      <template #footer="{ closeModal }">
        <div class="flex justify-end space-x-3">
          <Button type="blue-btn" :onClick="closeModal" classStyle="px-4 py-2">
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Print Return Note Modal -->
    <SideBarModal 
      :isOpen="showPrintNoteModal" 
      @update:isOpen="showPrintNoteModal = $event"
      width="medium"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Print Return Note</span>
          <span class="text-sm font-medium text-gray-600">RTN-2024-{{ selectedReturn?.order_no }}</span>
        </div>
      </template>

      <template #default="{ closeModal }">
        <div class="pt-6 pb-2 px-2 bg-[#F7F8F9] mt-2 mx-4 rounded-[16px]">
          <!-- Company Logo and Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <!-- Company Logo -->
              <svg width="273" height="61" viewBox="0 0 273 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.2493 55.459C44.1715 55.459 55.4577 44.1728 55.4577 30.2506C55.4577 16.3285 44.1715 5.0423 30.2493 5.0423C16.3272 5.0423 5.04102 16.3285 5.04102 30.2506C5.04102 44.1728 16.3272 55.459 30.2493 55.459Z" fill="#3858CF"/>
<path d="M38.4643 33.9386V37.7627C38.4643 38.0148 38.4643 38.2896 38.4291 38.5467C38.2318 40.6634 37.2528 42.6305 35.6833 44.0644C34.1139 45.4982 32.0664 46.2958 29.9406 46.3014C27.8148 46.3071 25.7631 45.5205 24.186 44.095C22.6089 42.6696 21.6195 40.7076 21.4109 38.5921C19.5018 38.1777 17.7923 37.122 16.5669 35.6007C15.3414 34.0794 14.674 32.1842 14.6758 30.2307C14.6776 28.2772 15.3484 26.3832 16.5766 24.8641C17.8048 23.345 19.5162 22.2923 21.426 21.8815C22.0149 21.7523 22.6155 21.6848 23.2183 21.6798H24.746C24.6769 22.0242 24.6423 22.3747 24.6426 22.726V26.6206C24.6426 27.0552 24.47 27.472 24.1627 27.7793C23.8554 28.0866 23.4386 28.2592 23.0041 28.2592C22.5695 28.2592 22.1527 28.0866 21.8455 27.7793C21.5382 27.472 21.3655 27.0552 21.3655 26.6206V25.2871C20.3595 25.664 19.4924 26.339 18.8803 27.2219C18.2682 28.1049 17.9402 29.1536 17.9402 30.228C17.9402 31.3023 18.2682 32.351 18.8803 33.234C19.4924 34.1169 20.3595 34.7919 21.3655 35.1688C21.9562 35.3912 22.5822 35.5048 23.2133 35.5041H25.7341C26.1687 35.5041 26.5855 35.6767 26.8928 35.984C27.2001 36.2913 27.3727 36.708 27.3727 37.1426C27.3727 37.5772 27.2001 37.9939 26.8928 38.3012C26.5855 38.6085 26.1687 38.7811 25.7341 38.7811H24.7409C24.9985 40.0637 25.7232 41.205 26.7744 41.9836C27.8257 42.7622 29.1286 43.1228 30.4306 42.9953C31.7325 42.8679 32.9408 42.2615 33.8211 41.2937C34.7013 40.326 35.1909 39.0659 35.1948 37.7577V33.9386C35.1948 33.5041 35.3675 33.0873 35.6747 32.78C35.982 32.4727 36.3988 32.3001 36.8334 32.3001C37.2679 32.3001 37.6847 32.4727 37.992 32.78C38.2993 33.0873 38.4719 33.5041 38.4719 33.9386H38.4643Z" fill="white"/>
<path d="M38.466 22.7362V25.3705C37.8217 25.0975 37.129 24.9569 36.4292 24.9571H33.8454C33.4108 24.9571 32.994 24.7844 32.6867 24.4771C32.3794 24.1699 32.2068 23.7531 32.2068 23.3185C32.2068 22.884 32.3794 22.4672 32.6867 22.1599C32.994 21.8526 33.4108 21.68 33.8454 21.68H35.0906C34.8457 20.4904 34.1978 19.4217 33.2564 18.6543C32.3149 17.8869 31.1375 17.4679 29.9229 17.4679C28.7084 17.4679 27.531 17.8869 26.5895 18.6543C25.648 19.4217 25.0002 20.4904 24.7552 21.68H23.22C22.6172 21.6849 22.0166 21.7525 21.4277 21.8816C21.6423 19.7712 22.6339 17.8159 24.2099 16.3959C25.7858 14.9758 27.8335 14.1925 29.9548 14.1982C32.0762 14.2038 34.1196 14.998 35.688 16.4265C37.2563 17.8549 38.2375 19.8154 38.4408 21.927C38.4576 22.1942 38.466 22.464 38.466 22.7362Z" fill="#7CCF24"/>
<path d="M44.9766 30.2505C44.974 32.1709 44.3266 34.0348 43.1381 35.5433C41.9496 37.0518 40.2889 38.1174 38.4224 38.5692C38.4476 38.3172 38.4577 38.0499 38.4577 37.7853V35.1031C39.417 34.7013 40.236 34.025 40.8121 33.1592C41.3882 32.2934 41.6955 31.2766 41.6955 30.2366C41.6955 29.1967 41.3882 28.1799 40.8121 27.314C40.236 26.4482 39.417 25.7719 38.4577 25.3702V22.7359C38.4577 22.4636 38.4451 22.1939 38.4199 21.9267C40.2877 22.3783 41.9496 23.4444 43.1387 24.954C44.3277 26.4635 44.975 28.3289 44.9766 30.2505Z" fill="#7CCF24"/>
<path d="M72.6696 32.9426C73.3802 33.5041 73.9687 34.205 74.3989 35.0021C74.9432 36.0616 75.2242 37.2367 75.2181 38.4279V38.8943H72.5108V38.4279C72.5121 37.8522 72.3997 37.2819 72.18 36.7497C71.9603 36.2176 71.6376 35.7341 71.2305 35.327C70.8234 34.9199 70.3399 34.5972 69.8077 34.3775C69.2756 34.1578 68.7053 34.0454 68.1296 34.0467H65.581V38.8943H62.8711V21.6644H69.0723C70.7143 21.6677 72.2881 22.3207 73.4501 23.4808C74.612 24.6408 75.2676 26.2136 75.2736 27.8555C75.2761 28.992 74.9618 30.1068 74.3661 31.0746C73.7737 32.0149 73.209 32.6376 72.6696 32.9426ZM65.581 24.3717V31.3368H69.0723C69.5376 31.3493 70.0006 31.2685 70.434 31.0991C70.8675 30.9297 71.2626 30.6752 71.5961 30.3506C71.9296 30.026 72.1946 29.6378 72.3756 29.2091C72.5566 28.7803 72.6498 28.3197 72.6498 27.8543C72.6498 27.3889 72.5566 26.9282 72.3756 26.4995C72.1946 26.0707 71.9296 25.6826 71.5961 25.358C71.2626 25.0333 70.8675 24.7788 70.434 24.6094C70.0006 24.44 69.5376 24.3592 69.0723 24.3717H65.581Z" fill="#3858CF"/>
<path d="M88.8065 36.1745V38.8819H78.166V21.652H88.8065V24.3619H80.8734V28.8666H87.2687V31.5765H80.8734V36.1745H88.8065Z" fill="#3858CF"/>
<path d="M110.223 38.8818H107.425L105.091 29.1514L100.574 40.2431L96.1243 29.169L93.8026 38.8768H91.002L95.4966 20.2478L100.581 32.9881L105.739 20.2856L110.223 38.8818Z" fill="#3858CF"/>
<path d="M123.711 36.1745V38.8819H113.07V21.652H123.711V24.3619H115.778V28.8666H122.176V31.5765H115.778V36.1745H123.711Z" fill="#3858CF"/>
<path d="M126.27 38.8819V21.652H132.199C133.353 21.6489 134.495 21.8814 135.556 22.3352C137.616 23.2113 139.255 24.8511 140.132 26.9105C140.685 28.2202 140.906 29.6467 140.775 31.0626C140.643 32.4785 140.163 33.8398 139.378 35.0252C138.592 36.2106 137.526 37.1831 136.273 37.856C135.02 38.529 133.621 38.8814 132.199 38.8819H126.27ZM132.211 36.1745C133.378 36.1723 134.519 35.8242 135.488 35.1743C136.458 34.5244 137.213 33.6017 137.659 32.5228C138.104 31.4439 138.22 30.2572 137.992 29.1125C137.764 27.9678 137.201 26.9165 136.376 26.0912C135.837 25.5335 135.189 25.0924 134.473 24.7949C133.756 24.4975 132.987 24.3501 132.211 24.3619H128.876V36.1745H132.211Z" fill="#3858CF"/>
<path d="M143.412 38.8819V21.652H146.122V38.8819H143.412Z" fill="#3858CF"/>
<path d="M162.847 38.8819H159.936L158.718 35.8569H152.436L151.219 38.8819H148.305L155.577 20.8781L162.847 38.8819ZM157.624 33.1697L155.575 28.1053L153.52 33.1697H157.624Z" fill="#3858CF"/>
<path d="M167.752 36.1745H176.139V38.8819H165.047V21.652H167.757L167.752 36.1745Z" fill="#3858CF"/>
<path d="M196.171 21.652V38.8819H193.461V31.6118H185.586V38.8819H182.879V21.652H185.586V28.9019H193.461V21.652H196.171Z" fill="#3858CF"/>
<path d="M210.09 36.1745V38.8819H199.449V21.652H210.09V24.3619H202.172V28.8666H208.567V31.5765H202.172V36.1745H210.09Z" fill="#3858CF"/>
<path d="M226.099 38.8819H223.185L221.968 35.8569H215.686L214.468 38.8819H211.557L218.827 20.8781L226.099 38.8819ZM220.876 33.1697L218.827 28.1053L216.79 33.1697H220.876Z" fill="#3858CF"/>
<path d="M231.006 36.1745H239.392V38.8819H228.301V21.652H231.011L231.006 36.1745Z" fill="#3858CF"/>
<path d="M251.686 21.652V24.3619H245.906V38.8819H243.196V24.3619H237.348V21.652H251.686Z" fill="#3858CF"/>
<path d="M267.209 21.652V38.8819H264.502V31.6118H256.621V38.8819H253.914V21.652H256.621V28.9019H264.499V21.652H267.209Z" fill="#3858CF"/>
</svg>

            </div>
            <!-- Return ID and Date positioned like recipient side of a letter -->
            <div class="text-right">
              <p class="text-[12px] font-medium text-gray-700">Return ID</p>
              <p class="text-[12px] text-[#44546F]">RTN-2024-{{ selectedReturn?.order_no }}</p>
              <div class="flex mt-1 flex-col">
                
                <p class="text-[12px] font-medium text-gray-700">Date</p>
                <div class="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                <p class="text-[12px] text-[#44546F]">5/21/2024 - 11:13 AM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Information - All in same line -->
          <div class="mb-6">
            <div class="flex items-center gap-6 justify-between md:w-[80%]">
              <div>
                <p class="text-[12px] font-medium text-gray-700">Customer's Name</p>
                <p class="text-[12px] text-[#44546F]">{{ selectedReturn?.customer_name }}</p>
              </div>
              <div>
                <p class="text-[12px] font-medium text-gray-700">Store Name</p>
                <div class="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                  </svg>
                  <p class="text-[12px] text-[#44546F]">{{ selectedReturn?.store_name }}</p>
                </div>
              </div>
              <div>
                <p class="text-[12px] font-medium text-gray-700">Reason</p>
                <p class="text-[12px] text-[#44546F]">{{ selectedReturn?.reason }}</p>

              </div>
            </div>
          </div>

          <!-- Product List Table using Datatable -->
          <div class="mb-6">
            <Datatable 
              :items="returnItems" 
              :columns="printReturnColumns"
              :searchable="false"
              :sortable="false"
              :filterByDate="false"
              :exportable="false"
              :printable="false"
              :showPagination="false"
              pageName="PrintReturnSummary"
            >
              <template #column="col">
                <span v-if="col.props.column.field === 'product_name'">
                  {{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                </span>
                <span v-else-if="col.props.column.field === 'quantity_delivered'">
                  {{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                </span>
                <span v-else-if="col.props.column.field === 'unit_price'">
                  ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                </span>
                <span v-else-if="col.props.column.field === 'price_total'">
                  ₦{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}
                </span>
                <span v-else>{{ (col.props.formattedRow as any)[col.props.column.field || ''] || '' }}</span>
              </template>
            </Datatable>
            
            <!-- Total Refund Amount -->
            <div class="mt-4 flex">
              <div class="bg-gray-50 px-0 py-2 rounded flex justify-between w-full">
                <span class="text-sm font-bold text-gray-700">Total Refund Amount: </span>
                <span class="text-sm font-bold text-gray-900">₦187,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <button 
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button 
            @click="handlePrint"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Print
          </button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Toast for Print Return -->
    <SuccessAlertToast 
      :isVisible="showDownloadReturnToast" 
      message="Return document printed successfully" 
      @close="showDownloadReturnToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import CustomSelectDropdown from '@/views/Components/procurement/ui/CustomSelectDropdown.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import Activities from '@/views/Components/Activities.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import { useDebounceFn } from '@vueuse/core';
import type { TableColumn } from '@/types';

const SEARCH_DEBOUNCE_DELAY = 300;

// Reactive state
const childKey = ref(111);
const search = ref('');
const hasSearched = ref(false);
const loading = ref(false);

// Modal states
const showDownloadReturnToast = ref(false);
const showReturnDetailsModal = ref(false);
const showPrintNoteModal = ref(false);

// Selected data
const selectedReturn = ref<any>({});
const returnDetailsTab = ref('details');

// Return tabs
const returnTabs = [
  { id: 'details', label: 'Details' },
  { id: 'activities', label: 'Activities' }
];

// Return product columns
const returnProductColumns = ref([
  { field: 'product_name', label: 'Product Name', sortable: false },
  { field: 'tags', label: 'Tags', sortable: false },
  { field: 'quantity_delivered', label: 'Quantity Delivered', sortable: false },
  { field: 'unit_price', label: 'Unit Price', sortable: false },
  { field: 'price_total', label: 'Price Total', sortable: false }
]);

// Print return columns (without tags for cleaner print layout)
const printReturnColumns = ref([
  { field: 'product_name', label: 'Product Name', sortable: false },
  { field: 'quantity_delivered', label: 'Quantity Delivered', sortable: false },
  { field: 'unit_price', label: 'Unit Price', sortable: false },
  { field: 'price_total', label: 'Price Total', sortable: false }
]);

// Search By options
const searchByOptions = ref([
  { value: 'order', label: 'Order Ref No' },
  { value: 'customer', label: 'Customer Name' },
  { value: 'store', label: 'Store Name' }
]);

const selectedSearchBy = ref<string>('order');

// Computed URL for returned products
const returned_url = computed(() => {
  const params = new URLSearchParams({
    search_by: selectedSearchBy.value || 'order',
    search: search.value.trim(),
    filter: JSON.stringify({ state: 'Returned' })
  });
  return `/compliance/products/returned?${params.toString()}`;
});

// Mock data for returned products
const returnedData = ref([
  {
    id: 87,
    order_no: '87',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Dave Free',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 54,
    order_no: '1656493689-254',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Michael Raymond',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 25,
    order_no: '25',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 30,
    order_no: '30',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 51,
    order_no: '51',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 21,
    order_no: '21',
    warehouse: 'LOS-WH2',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 35,
    order_no: '35',
    warehouse: 'LOS-WH1',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 23,
    order_no: '23',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Sarah Badmus',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 33,
    order_no: '33',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Sarah Badmus',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 87,
    order_no: '87',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 88,
    order_no: '88',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 81,
    order_no: '81',
    warehouse: 'LOS-WH2',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Josh Michael',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 80,
    order_no: '80',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 5,
    order_no: '05',
    warehouse: 'LOS-WH1',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    driver: 'Esther Joel',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TAB...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 55,
    order_no: '55',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    driver: 'Femi Babalola',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN W...',
    transit_status: 'Returned',
    total_amount: 'N47,400.00',
    date_created: '16/01/2025'
  }
]);

// Mock data for return items in the modal
const returnItems = ref([
  {
    id: 1,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-001',
    tags: 'Controlled',
    quantity_delivered: 20,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 2,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-002',
    tags: 'Controlled',
    quantity_delivered: 10,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 3,
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    sku: 'STR-003',
    tags: 'Controlled',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 4,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    sku: 'LUM-001',
    tags: 'Hospital',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  },
  {
    id: 5,
    product_name: 'LUMAREAL TABLET 20/120 X 12 ()',
    sku: 'LUM-002',
    tags: 'Hospital',
    quantity_delivered: 1,
    unit_price: '47,400.00',
    price_total: '47,400.00'
  }
]);

// Mock data for return activities
const returnActivities = ref([
  {
    id: 1,
    action: 'Return Request Created',
    description: 'Return request was created by customer',
    user: 'Customer',
    time: '2024-05-21 11:13:00',
    details: 'Customer initiated return request for order items'
  },
  {
    id: 2,
    action: 'Return Approved',
    description: 'Return was approved by compliance team',
    user: 'Compliance Team',
    time: '2024-05-21 11:45:00',
    details: 'Return request reviewed and approved for processing'
  },
  {
    id: 3,
    action: 'Return Processed',
    description: 'Return items have been processed and restocked',
    user: 'Warehouse Team',
    time: '2024-05-21 12:30:00',
    details: 'Items received, inspected, and restocked in inventory'
  }
]);

// Table columns
const returnedColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Warehouse', field: 'warehouse', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Driver', field: 'driver', sortable: true },
  { label: 'Reason', field: 'reason', sortable: true },
  { label: 'Items', field: 'items', sortable: true },
  { label: 'Transit Status', field: 'transit_status', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'actions', sortable: false }
]);

// Watch selectedSearchBy changes
watch(selectedSearchBy, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    childKey.value++;
  }
});

// Helper function
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
  search.value = searchTerm;
  childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

// Actions
const performSearch = () => {
  hasSearched.value = true;
};

const viewReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  returnDetailsTab.value = 'details';
  showReturnDetailsModal.value = true;
};

const printReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  showPrintNoteModal.value = true;
};

const handlePrint = () => {
  // Close the modal first
  showPrintNoteModal.value = false;
  // Show success toast
  showDownloadReturnToast.value = true;
  // TODO: Implement actual print functionality
  console.log('Printing return note for:', selectedReturn.value);
};

// Utility functions
const getPillType = (tag: string) => {
  switch (tag) {
    case 'Cash and Carry':
      return 'cash-and-carry';
    case 'Controlled':
      return 'controlled';
    case 'Hospital':
      return 'hospital';
    default:
      return 'hospital';
  }
};

// Prevent body scroll when component is mounted
onMounted(() => {
  document.body.style.overflowY = 'hidden';
});

// Restore body scroll when component is unmounted
onUnmounted(() => {
  document.body.style.overflowY = 'auto';
});
</script>

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

.sort_by_label {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}

/* Modal styles */
.key {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.value {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
}

.order-summary-table {
  font-size: 12px;
  color: #172B4D;
}

.order-summary-table table {
  font-size: 12px;
}

.order-summary-table th,
.order-summary-table td {
  font-size: 12px !important;
  color: #172B4D !important;
}

.order-summary-table .bg-gray-100 {
  background-color: #f8f9fa !important;
}

.tab_text {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
}

</style>
