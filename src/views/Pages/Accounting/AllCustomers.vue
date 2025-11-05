<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle :title="dynamicTitle" class="px-6" />
    </div>
    
    <!-- Tabs -->
    <div class="px-0 bg-white">
      <Tabs :tabs="tabs" @tabChanged="onTabChanged">
        <!-- Download Report Button in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <Button type="gray-btn" :onClick="downloadReport" classStyle="px-4 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download Report
          </Button>
        </div>
      </Tabs>
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="filteredCustomers"
        :columns="columns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="{}"
        pageName="AccountingAllCustomers"
        :key="childKey"
      >
        <template #column="col">
          <!-- Status Column -->
          <span v-if="col.props?.column?.field === 'status'">
            <Pill 
              type="cash-and-carry" 
              :text="col.props?.formattedRow?.status || 'Enabled'"
            />
          </span>

          <!-- Warning Tags Column -->
          <span v-else-if="col.props?.column?.field === 'warningTags'">
            <span class="text-gray-500">{{ col.props?.formattedRow?.warningTags || 'N/A' }}</span>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props?.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View Customer -->
                <li @click="viewCustomer(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                  </svg>
                  View Customer
                </li>
                
                <!-- Download Transactions -->
                <li @click="downloadTransactions(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                    <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                  </svg>
                  Download Transactions
                </li>
                
                <!-- Download Partner Transactions -->
                <li @click="downloadPartnerTransactions(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                    <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                  </svg>
                  Download Partner Transactions
                </li>
                
                <!-- Download Combined Transactions -->
                <li @click="downloadCombinedTransactions(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                    <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                  </svg>
                  Download Combined Transactions
                </li>
              </template>
            </TableActionDropdown>
          </span>

          <!-- Default Column -->
          <span v-else>
            {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Customer Details Modal -->
    <SideBarModal 
      :isOpen="isCustomerModalOpen" 
      @update:isOpen="isCustomerModalOpen = $event"
      width="large"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Customer Details</span>
          <span class="text-sm font-medium text-gray-600">{{ selectedCustomer?.customerName?.toUpperCase() }}</span>
        </div>
      </template>

      <template #default="{ closeModal }">
        <div class="p-6">
          <!-- Customer Profile Section -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div class="flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M0 6C0 2.68629 2.68629 0 6 0H38C41.3137 0 44 2.68629 44 6V38C44 41.3137 41.3137 44 38 44H6C2.68629 44 0 41.3137 0 38V6Z" fill="#DCDFE4"/>
                  <circle cx="22" cy="22" r="12" fill="url(#pattern0_11480_55637)"/>
                  <defs>
                    <pattern id="pattern0_11480_55637" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_11480_55637" transform="scale(0.0078125)"/>
                    </pattern>
                    <image id="image0_11480_55637" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
              
              <!-- Customer Info -->
              <div class="flex-1">
                <h3 class="font-semibold text-[#44546F]">{{ selectedCustomer?.customerName }}</h3>
                <div class="flex items-center gap-4 mt-1">
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedCustomer?.phone }}
                  </div>
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedCustomer?.storeName }}
                  </div>
                </div>
              </div>
              
              <!-- Status Pills -->
              <div class="flex items-left gap-2 flex-col bg-white p-3 rounded-lg w-80">
                <h3 class="text-sm text-[#44546F]">Status:</h3>
                <div class="flex items-center gap-2">
                  <Pill 
                    :type="getPillType(selectedCustomer?.status || '')"
                    :text="selectedCustomer?.status || ''"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Tabs -->
          <div class="mb-6 border-b border-gray-200">
            <div class="flex">
              <button 
                v-for="tab in ['Summary', 'Store', 'Orders', 'Discount']" 
                :key="tab" 
                @click="customerModalTab = tab"
                :class="[
                  'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
                  customerModalTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="mt-6">
            <!-- Summary Tab -->
            <div v-if="customerModalTab === 'Summary'">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <!-- Name Section -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.customerName }}</p>
                  </div>

                  <!-- Email Section -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.email }}</p>
                  </div>
                </div>

                <!-- Phone Section -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.phone }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                    <p class="text-sm text-gray-900">-</p>
                    <p class="text-sm text-gray-500">Nil</p>
                  </div>
                </div>

                <!-- Date of Account Creation -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Account Creation</label>
                  <div class="flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2H16.005C17.107 2 18 2.895 18 3.994V16.006C18 16.2679 17.9484 16.5273 17.8481 16.7693C17.7478 17.0113 17.6009 17.2312 17.4156 17.4163C17.2304 17.6015 17.0104 17.7484 16.7684 17.8485C16.5263 17.9487 16.2669 18.0001 16.005 18H1.995C1.46607 18 0.958782 17.7899 0.584675 17.416C0.210569 17.0421 0.00026513 16.5349 0 16.006V3.994C0 2.893 0.892 2 1.995 2ZM2 6V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V6H2ZM3 1C3 0.734784 3.10536 0.48043 3.29289 0.292893C3.48043 0.105357 3.73478 0 4 0C4.26522 0 4.51957 0.105357 4.70711 0.292893C4.89464 0.48043 5 0.734784 5 1V2H3V1ZM13 1C13 0.734784 13.1054 0.48043 13.2929 0.292893C13.4804 0.105357 13.7348 0 14 0C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V2H13V1ZM4 10V7.999H6V10H4ZM12 10V7.999H14V10H12ZM8 10V7.999H10.001V10H8ZM4 14V12H6V14H4ZM8 14V12H10.001V14H8ZM12 14V12H14V14H12Z" fill="#626F86"/>
                    </svg>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.dateOfAccountCreation }}</p>
                  </div>
                </div>

                <!-- Customer Type -->
                <div class="">
                  <h3 class="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-3">Customer Type</h3>
                  <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2">
                      <input type="radio" :value="selectedCustomer?.customerType" :checked="true" class="text-blue-600">
                      <span class="text-sm text-gray-900">{{ selectedCustomer?.customerType }}</span>
                    </label>
                  </div>
                </div>

                <!-- Bank Details -->
                <div class="">
                  <h3 class="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-3">Bank Details</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <p class="text-sm text-gray-900">{{ selectedCustomer?.accountNumber || '8236077021' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                      <div class="flex items-center gap-1">
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 12H14V14H16M16 8H14V10H16M18 16H10V14H12V12H10V10H12V8H10V6H18M8 4H6V2H8M8 8H6V6H8M8 12H6V10H8M8 16H6V14H8M4 4H2V2H4M4 8H2V6H4M4 12H2V10H4M4 16H2V14H4M10 4V0H0V18H20V4H10Z" fill="#44546F"/>
                        </svg>
                        <p class="text-sm text-gray-900">{{ selectedCustomer?.bank || 'Wema bank' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Store Tab -->
            <div v-if="customerModalTab === 'Store'">
              <Datatable 
                :items="storeData" 
                :filterByDate="false" 
                :filterFields="{}" 
                :columns="storeColumns" 
                pageName="Customer Stores"
                :key="`store-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Status Column with Pill -->
                  <span v-if="col.props?.column?.field === 'status'">
                    <Pill 
                      type="hospital"
                      :text="col.props.formattedRow[col.props.column.field]"
                    />
                  </span>
                  <!-- Default Column -->
                  <span v-else>
                    {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                  </span>
                </template>
              </Datatable>
            </div>

            <!-- Orders Tab -->
            <div v-if="customerModalTab === 'Orders'">
              <Datatable 
                :items="orderData" 
                :filterByDate="false" 
                :filterFields="{}" 
                :columns="orderColumns" 
                pageName="Customer Orders"
                :key="`orders-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Amount Column with Currency -->
                  <span v-if="col.props?.column?.field === 'amount'">
                    {{ formatCurrency(col.props.formattedRow[col.props.column.field]) }}
                  </span>
                  <!-- Status Column with Pill -->
                  <span v-else-if="col.props?.column?.field === 'status'">
                    <Pill 
                      :type="col.props.formattedRow[col.props.column.field] === 'Completed' ? 'cash-and-carry' : 'controlled'"
                      :text="col.props.formattedRow[col.props.column.field]"
                    />
                  </span>
                  <!-- Default Column -->
                  <span v-else>
                    {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                  </span>
                </template>
              </Datatable>
            </div>

            <!-- Discount Tab -->
            <div v-if="customerModalTab === 'Discount'">
              <Datatable 
                :items="discountData" 
                :filterByDate="false" 
                :filterFields="{}" 
                :columns="discountColumns" 
                pageName="Customer Discounts"
                :key="`discount-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Target Column with Currency -->
                  <span v-if="col.props?.column?.field === 'target'">
                    {{ formatCurrency(col.props.formattedRow[col.props.column.field]) }}
                  </span>
                  <!-- Status Column with Pill -->
                  <span v-else-if="col.props?.column?.field === 'status'">
                    <Pill 
                      type="hospital"
                      :text="col.props.formattedRow[col.props.column.field]"
                    />
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
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end">
          <Button 
            type="blue-btn"
            :onClick="closeModal"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Toast -->
    <SuccessAlertToast 
      :isVisible="showSuccessToast"
      message="Report downloaded successfully!"
      @close="showSuccessToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Tabs from '@/views/Components/Tabs.vue';
import Button from '@/views/Components/ui/Button.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);
const activeTab = ref('Active Users');
const showSuccessToast = ref(false);

// Modal state
const isCustomerModalOpen = ref(false);
const selectedCustomer = ref<any>(null);
const customerModalTab = ref('Summary');
const customerModalKey = ref(0);

// Tabs
const tabs = ref([
  { name: 'Active Users', count: 15 },
  { name: 'Deactivated Users', count: 0 }
]);

// Table columns
const columns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customerName', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Customer Type', field: 'customerType', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Warning Tags', field: 'warningTags', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
];

// Mock data for active customers
const activeCustomers = ref([
  { id: 87, customerName: 'Oluwatosin Adegboye', storeName: 'Emeka Pharmacy', customerType: 'Hospital', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 54, customerName: 'Janet Adeajayi', storeName: 'Emeka Pharmacy', customerType: 'Pharmacy', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 25, customerName: 'Henry Christopher', storeName: 'Emeka Pharmacy', customerType: 'Mega distributor', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 88, customerName: 'Oluwatosin Adegboye', storeName: 'Emma Bros Pharmacy', customerType: 'Hospital', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 55, customerName: 'Janet Adeajayi', storeName: 'Emma Bros Pharmacy', customerType: 'Pharmacy', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 26, customerName: 'Henry Christopher', storeName: 'Emma Bros Pharmacy', customerType: 'Mega distributor', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 89, customerName: 'Oluwatosin Adegboye', storeName: 'Xela pharmacy', customerType: 'Hospital', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 56, customerName: 'Janet Adeajayi', storeName: 'Xela pharmacy', customerType: 'Pharmacy', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 27, customerName: 'Henry Christopher', storeName: 'Xela pharmacy', customerType: 'Mega distributor', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 90, customerName: 'Oluwatosin Adegboye', storeName: 'Emeka Pharmacy', customerType: 'Hospital', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 57, customerName: 'Janet Adeajayi', storeName: 'Emeka Pharmacy', customerType: 'Pharmacy', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 28, customerName: 'Henry Christopher', storeName: 'Emeka Pharmacy', customerType: 'Mega distributor', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 91, customerName: 'Oluwatosin Adegboye', storeName: 'Emma Bros Pharmacy', customerType: 'Hospital', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 58, customerName: 'Janet Adeajayi', storeName: 'Emma Bros Pharmacy', customerType: 'Pharmacy', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' },
  { id: 29, customerName: 'Henry Christopher', storeName: 'Xela pharmacy', customerType: 'Mega distributor', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', status: 'Enabled', warningTags: 'N/A' }
]);

// Mock data for deactivated customers
const deactivatedCustomers = ref([]);

// Computed filtered customers based on active tab
const filteredCustomers = computed(() => {
  return activeTab.value === 'Active Users' ? activeCustomers.value : deactivatedCustomers.value;
});

// Dynamic title based on active tab
const dynamicTitle = computed(() => {
  return `All Customers / ${activeTab.value}`;
});

// Tab change handler
const onTabChanged = (tab: string | { name: string; count: number }) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.name;
  childKey.value++;
};

// Get pill type for status
const getPillType = (status: string) => {
  switch (status) {
    case 'Enabled':
      return 'cash-and-carry'; // Green pill for enabled
    case 'Disabled':
      return 'controlled'; // Red pill for disabled
    default:
      return 'hospital'; // Blue pill as default
  }
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
};

// Actions
const viewCustomer = (customer: any) => {
  // Create detailed customer data
  selectedCustomer.value = {
    id: customer.id,
    customerName: customer.customerName,
    phone: customer.phone,
    storeName: customer.storeName,
    status: customer.status,
    email: customer.email,
    dateOfAccountCreation: '13/05/2022',
    agent: 'Nil',
    customerType: customer.customerType,
    accountNumber: '8236077021',
    bank: 'Wema bank'
  };
  
  customerModalTab.value = 'Summary';
  isCustomerModalOpen.value = true;
  customerModalKey.value++;
};

const downloadTransactions = (customer: any) => {
  console.log('Download transactions for:', customer);
  showSuccessToast.value = true;
};

const downloadPartnerTransactions = (customer: any) => {
  console.log('Download partner transactions for:', customer);
  showSuccessToast.value = true;
};

const downloadCombinedTransactions = (customer: any) => {
  console.log('Download combined transactions for:', customer);
  showSuccessToast.value = true;
};

const downloadReport = () => {
  showSuccessToast.value = true;
};

// Mock data for modal tabs
const storeData = ref([
  { id: 54, storeName: 'Emeka Pharmacy', address: '11 Ademola Adentokumbo', quantityToReturn: 189, status: 'Verified' }
]);

const orderData = ref([
  { id: 1, orderNumber: 'ORD-001', date: '16/01/2025', amount: 15000, status: 'Completed' },
  { id: 2, orderNumber: 'ORD-002', date: '15/01/2025', amount: 25000, status: 'Pending' }
]);

const discountData = ref([
  { id: 54, discountPercent: 10, startDate: '16/01/2025', endDate: '16/01/2025', target: 3220, status: 'Ongoing', orders: 1, date: '16/01/2025 10:39 AM' },
  { id: 55, discountPercent: 10, startDate: '16/01/2025', endDate: '16/01/2025', target: 3220, status: 'Ongoing', orders: 2, date: '16/01/2025 10:39 AM' }
]);

// Table columns for modal tabs
const storeColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Address', field: 'address', sortable: true },
  { label: 'Quantity to Return', field: 'quantityToReturn', sortable: true },
  { label: 'Status', field: 'status', sortable: true }
];

const orderColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order Number', field: 'orderNumber', sortable: true },
  { label: 'Date', field: 'date', sortable: true },
  { label: 'Amount', field: 'amount', sortable: true },
  { label: 'Status', field: 'status', sortable: true }
];

const discountColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Discount (%)', field: 'discountPercent', sortable: true },
  { label: 'Start Date', field: 'startDate', sortable: true },
  { label: 'End Date', field: 'endDate', sortable: true },
  { label: 'Target', field: 'target', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Orders', field: 'orders', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];
</script>

