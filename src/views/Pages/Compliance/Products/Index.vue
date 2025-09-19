<template>
  <div class="erp_dashboard_wrapper">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" background="gray" />
    
    <!-- Tabs with Download Button -->
    <div class=" bg-white">
      <Tabs :tabs="tabs" @tabChanged="onTabChanged">
        <!-- Download Button in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <GrayButton @click="downloadProductsReport">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
            </svg>
            Download
          </GrayButton>
        </div>
      </Tabs>
    </div>

    <!-- Main Content -->
    <div class="px-6 bg-[#fff] min-h-[calc(100vh-200px)]">
      <!-- Data Table -->
      <div class="mt-6">
        <Datatable
          :items="productsData"
          :columns="columns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="filterFields"
          pageName="ComplianceProducts"
        >

          <template #column="col">
            <!-- Product Image Column -->
            <span v-if="col.props?.column?.field === 'product_image'">
              <img 
                :src="(col.props?.formattedRow as any)?.product_image || '/placeholder-product.png'" 
                alt=""
                class="w-7 h-7 object-cover rounded-md flex-shrink-0"
              >
            </span>

            <!-- Shelf Location Column -->
            <div v-else-if="col.props?.column?.field === 'shelf_location'"
                 class="flex justify-center items-center">
              <div class="px-3 py-2 rounded text-sm font-medium text-center"
                   style="background-color: #091E420F; color: #172B4D;">
                {{ col.props?.formattedRow?.shelf_location }}
              </div>
            </div>

            <!-- Action Column -->
            <span v-else-if="col.props?.column?.field === 'action'">
              <TableActionDropdown :rowData="col.props?.formattedRow">
                <template #default="{ selectedItem, closeDropdown }">
                  <!-- Group 1: View Product Dashboard -->
                  <li @click="viewProductDashboard(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                    </svg>
                    View Product Dashboard
                  </li>
                  
                  <!-- Group 2: Update Quantity -->
                  <li @click="updateQuantity(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99955 6.503V9.498C7.99955 9.76322 8.1049 10.0176 8.29244 10.2051C8.47998 10.3926 8.73433 10.498 8.99955 10.498C9.26476 10.498 9.51912 10.3926 9.70665 10.2051C9.89419 10.0176 9.99955 9.76322 9.99955 9.498V5.602C9.99955 4.994 9.50655 4.5 8.89955 4.5H4.99955C4.73393 4.5 4.4792 4.60551 4.29138 4.79333C4.10356 4.98115 3.99805 5.23589 3.99805 5.5015C3.99805 5.76711 4.10356 6.02185 4.29138 6.20967C4.4792 6.39748 4.73393 6.503 4.99955 6.503H7.99955Z" fill="#626F86"/>
                      <path d="M9.42755 18.518C7.35055 17.489 5.99955 15.307 5.99955 12.87C5.99955 10.604 7.16655 8.551 9.01955 7.445C9.49955 7.159 9.66555 6.523 9.39055 6.024C9.3287 5.90677 9.24369 5.80331 9.14067 5.71991C9.03765 5.63651 8.91877 5.5749 8.79124 5.5388C8.6637 5.50271 8.53016 5.49289 8.39871 5.50994C8.26727 5.527 8.14066 5.57056 8.02655 5.638C5.55655 7.111 3.99955 9.85 3.99955 12.87C3.99955 16.118 5.80155 19.028 8.56955 20.399C9.06755 20.646 9.66455 20.425 9.90155 19.906C10.1385 19.386 9.92655 18.765 9.42755 18.518Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9995 15.502V19.398C13.9995 20.006 14.4925 20.5 15.0995 20.5H18.9995C19.2652 20.5 19.5199 20.3945 19.7077 20.2067C19.8955 20.0188 20.001 19.7641 20.001 19.4985C20.001 19.2329 19.8955 18.9782 19.7077 18.7903C19.5199 18.6025 19.2652 18.497 18.9995 18.497H15.9995V15.502C15.9995 15.2368 15.8942 14.9824 15.7067 14.7949C15.5191 14.6074 15.2648 14.502 14.9995 14.502C14.7343 14.502 14.48 14.6074 14.2924 14.7949C14.1049 14.9824 13.9995 15.2368 13.9995 15.502Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0965 5.096C13.8595 5.616 14.0715 6.236 14.5705 6.483C16.6475 7.512 17.9985 9.693 17.9985 12.13C17.9985 14.396 16.8315 16.45 14.9775 17.555C14.7452 17.6988 14.5771 17.9265 14.5082 18.1909C14.4393 18.4553 14.4749 18.7361 14.6075 18.975C14.8815 19.475 15.4925 19.648 15.9715 19.362C18.4415 17.889 19.9985 15.15 19.9985 12.13C19.9985 8.882 18.1965 5.972 15.4285 4.602C15.296 4.53537 15.1499 4.50045 15.0015 4.5C14.8094 4.50188 14.6218 4.55909 14.4613 4.66479C14.3008 4.77049 14.1742 4.9202 14.0965 5.096Z" fill="#626F86"/>
                    </svg>
                    Update Quantity
                  </li>
                  
                  <!-- Edit -->
                  <li @click="editProduct(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                    </svg>
                    Edit
                  </li>
                  
                  <!-- Group 3: View Changes -->
                  <li @click="viewChanges(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM12.889 11.632V8.448C12.889 7.959 12.489 7.559 12 7.559C11.511 7.559 11.111 7.959 11.111 8.449V12.004C11.111 12.252 11.214 12.475 11.379 12.637L13.574 14.831C13.741 14.9972 13.9669 15.0904 14.2025 15.0904C14.4381 15.0904 14.664 14.9972 14.831 14.831C14.9969 14.6641 15.0899 14.4383 15.0899 14.203C15.0899 13.9677 14.9969 13.7419 14.831 13.575L12.889 11.632Z" fill="#44546F"/>
                    </svg>
                    View Changes
                  </li>
                  
                  <!-- Dynamic Enable/Disable Product based on active tab -->
                  <li v-if="activeTab === 'Active Products'" 
                      @click="disableProduct(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text text-red-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5918 12.0154L9.117 13.499C9.02179 13.5915 8.94595 13.7021 8.89392 13.8242C8.84188 13.9464 8.81469 14.0776 8.81393 14.2104C8.81317 14.3432 8.83885 14.4747 8.88948 14.5975C8.9401 14.7202 9.01466 14.8316 9.10881 14.9252C9.20295 15.0189 9.31479 15.0928 9.43781 15.1427C9.56083 15.1927 9.69256 15.2176 9.82531 15.2161C9.95807 15.2146 10.0892 15.1866 10.211 15.1339C10.3329 15.0812 10.443 15.0047 10.535 14.909L12.0027 13.4325L13.442 14.878C13.6291 15.0661 13.8833 15.1721 14.1485 15.1727C14.4138 15.1734 14.6685 15.0686 14.8565 14.8815C15.0445 14.6944 15.1505 14.4403 15.1512 14.175C15.1519 13.9097 15.0471 13.6551 14.86 13.467L13.4127 12.0141L14.895 10.523C15.0767 10.3339 15.1768 10.081 15.1738 9.81874C15.1709 9.55651 15.065 9.30595 14.879 9.12104C14.6931 8.93612 14.4419 8.83166 14.1797 8.83016C13.9174 8.82865 13.6651 8.93022 13.477 9.11298L12.0015 10.5973L10.5 9.09002C10.3118 8.90742 10.0594 8.80606 9.79717 8.80776C9.53495 8.80947 9.28389 8.9141 9.09807 9.09913C8.91225 9.28416 8.80655 9.53478 8.80373 9.79699C8.80091 10.0592 8.90121 10.312 9.083 10.501L10.5918 12.0154Z" fill="#E56910"/>
                    </svg>
                    Disable Product
                  </li>
                  
                  <li v-else 
                      @click="enableProduct(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text text-green-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z" fill="#22A06B"/>
                    </svg>
                    Enable Product
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
    </div>

    <!-- Product Details Modal -->
    <SideBarModal
      :isOpen="isProductModalOpen"
      @update:isOpen="isProductModalOpen = $event"
      width="large"
    >
      <template #header>
        <OrderHeader 
          :title="selectedProduct?.product_name || 'Product Details'" 
          :reference="`ID: ${selectedProduct?.id || ''}`"
        >
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_11214_78293)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.16536 4.99992C9.16536 7.30111 7.29988 9.16659 4.9987 9.16659C2.69751 9.16659 0.832031 7.30111 0.832031 4.99992C0.832031 2.69873 2.69751 0.833252 4.9987 0.833252C7.29988 0.833252 9.16536 2.69873 9.16536 4.99992ZM6.2487 3.74992C6.2487 4.44027 5.68905 4.99992 4.9987 4.99992C4.30834 4.99992 3.7487 4.44027 3.7487 3.74992C3.7487 3.05956 4.30834 2.49992 4.9987 2.49992C5.68905 2.49992 6.2487 3.05956 6.2487 3.74992ZM4.9987 8.33325C4.24115 8.33439 3.50601 8.07635 2.91536 7.602V6.24992C2.91536 5.7895 3.28495 5.41659 3.7487 5.41659H6.2487C6.70911 5.41659 7.08203 5.78534 7.08203 6.24992V7.602C6.5112 8.0595 5.78703 8.33325 4.9987 8.33325Z" fill="#626F86"/>
              </g>
              <defs>
                <clipPath id="clip0_11214_78293">
                  <rect width="10" height="10" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </template>
        </OrderHeader>
      </template>

      <template #default="{ closeModal }">
        <div class="p-6">
          <div v-if="selectedProduct" class="space-y-6">
            <!-- Product Image -->
            <div class="flex items-center gap-4">
              <img 
                :src="selectedProduct.product_image || '/placeholder-product.png'" 
                alt=""
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ selectedProduct.product_name }}</h3>
                <p class="text-sm text-gray-600">{{ selectedProduct.category }}</p>
              </div>
            </div>

            <!-- Product Details Grid -->
            <div class="grid grid-cols-2 gap-4 px-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Product Information</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">ID:</span>
                    <span class="font-medium">{{ selectedProduct.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Category:</span>
                    <span class="font-medium">{{ selectedProduct.category }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Formulation:</span>
                    <span class="font-medium">{{ selectedProduct.product_formulation }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Pricing</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Selling Price:</span>
                    <span class="font-medium">{{ selectedProduct.selling_price }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Cost Price:</span>
                    <span class="font-medium">{{ selectedProduct.cost_price }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Inventory</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Available Qty:</span>
                    <span class="font-medium">{{ selectedProduct.available_qty }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">In Stock:</span>
                    <span class="font-medium">{{ selectedProduct.instock }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Sold Qty:</span>
                    <span class="font-medium">{{ selectedProduct.sold_qty }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Shelf Location:</span>
                    <span class="font-medium">{{ selectedProduct.shelf_location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Update Quantity Modal -->
    <SideBarModal 
      :isOpen="isUpdateQuantityModalOpen" 
      @update:isOpen="isUpdateQuantityModalOpen = $event"
      title="Update Product Quantity"
      width="medium"
    >
      <template #default="{ closeModal }">
        <div class="space-y-6 px-6">
          <!-- Batch Selection -->
          <div>
            <label>Batch</label>
            <SelectField
              v-model="updateQuantityFormData.batch"
              :options="batchOptions"
              placeholder="Select batch"
            />
          </div>

          <!-- Quantity Change -->
          <div>
            <label>Quantity Change</label>
            <input 
              type="text" 
              v-model="updateQuantityFormData.quantityChange"
              placeholder="e.g., +10 to increase or -5 to decrease"
              class="w-full"
            />
          </div>

          <!-- Reason -->
          <div>
            <label>Reason for Quantity Change</label>
            <textarea 
              v-model="updateQuantityFormData.reason"
              placeholder="Add additional details or notes about this quantity change"
              rows="4"
              class="w-full border-2 border-gray-200 rounded-lg p-3 resize-none"
            ></textarea>
          </div>

          <!-- Update Invoice Checkbox -->
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              v-model="updateQuantityFormData.updateInvoice"
              id="updateInvoice"
              class="w-4 h-4"
            />
            <label for="updateInvoice" class="text-sm">Update invoice?</label>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex gap-3 items-right justify-end">
          <Button type="gray-btn" :onClick="closeModal" classStyle="cancel_btn">
            Cancel
          </Button>
          <Button type="create-btn" :onClick="handleUpdateQuantitySubmit" classStyle="create_btn">
            Update
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Update Quantity Confirmation Modal -->
    <WarningConfirmationModal
      :show="isUpdateQuantityConfirmOpen"
      title="Update Product Quantity?"
      :message="`You are about to update the quantity of this product '${productToUpdate?.product_name}'. This action will update the ERP quantity of this batch!`"
      confirmText="Update Quantity"
      @close="isUpdateQuantityConfirmOpen = false"
      @confirm="handleUpdateQuantityConfirm"
    />

    <!-- Update Quantity Success Modal -->
    <SuccessModal
      :modelValue="isUpdateQuantitySuccessOpen"
      title="Product Quantity Updated"
      :message="`The product '${productToUpdate?.product_name}' has been successfully updated in the system.`"
      @update:modelValue="handleUpdateQuantitySuccess"
    />

    <!-- Edit Product Modal -->
    <SideBarModal 
      :isOpen="isEditProductModalOpen" 
      @update:isOpen="isEditProductModalOpen = $event"
      width="medium"
      :fullHeaderWidth="true"
    >
      <template #header>
        <div class="flex items-center gap-2 " >
          <span class="text-lg font-medium">Edit Product</span>
          <div class="flex items-center gap-2 text-sm text-gray-600" >
            <div class="w-6 h-6 rounded flex items-center justify-center" style="background-color: #F7F8F9;">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.61793 1.35169C4.83457 1.28216 5.06609 1.27309 5.28751 1.32544L5.38126 1.35169L8.10376 2.22502C8.18293 2.25127 8.25418 2.30044 8.30626 2.36919L8.33543 2.41294L9.48126 4.39086C9.51024 4.44082 9.52852 4.49626 9.53494 4.55366C9.54135 4.61106 9.53576 4.66917 9.51853 4.7243C9.50129 4.77943 9.47277 4.83037 9.4348 4.87389C9.39682 4.91741 9.35021 4.95256 9.29793 4.97711L9.24793 4.99669L8.39334 5.27086V7.07502C8.39328 7.23997 8.34427 7.40119 8.25252 7.53826C8.16077 7.67533 8.0304 7.7821 7.87793 7.84502L7.81459 7.86836L5.38126 8.64836C5.16461 8.71788 4.9331 8.72696 4.71168 8.67461L4.61793 8.64877L2.18459 7.86836C2.0275 7.81791 1.88891 7.72196 1.7864 7.59267C1.68389 7.46338 1.62206 7.30657 1.60876 7.14211L1.60584 7.07461V5.27086L0.75126 4.99669C0.696302 4.97905 0.645607 4.95019 0.60239 4.91193C0.559173 4.87367 0.524377 4.82685 0.500206 4.77443C0.476036 4.72202 0.463019 4.66516 0.461981 4.60745C0.460943 4.54974 0.471907 4.49244 0.494177 4.43919L0.517927 4.39086L1.66376 2.41294C1.70671 2.33883 1.77145 2.27976 1.84918 2.24377L1.89501 2.22502L4.61793 1.35169ZM5.41626 5.12711V7.76211L7.56001 7.07461V5.53836L6.27251 5.95127C6.18994 5.97776 6.10117 5.97782 6.01856 5.95145C5.93596 5.92509 5.86364 5.87361 5.81168 5.80419L5.78501 5.76336L5.41626 5.12711ZM4.58293 5.12711L4.21418 5.76336C4.16653 5.84557 4.09221 5.90904 4.00354 5.94321C3.91487 5.97739 3.81718 5.98024 3.72668 5.95127L2.43918 5.53836V7.07461L4.58293 7.76252V5.12711ZM2.21626 3.12086L1.49834 4.36127L3.66126 5.05544L4.38001 3.81502L2.21626 3.12086ZM7.78293 3.12086L5.61918 3.81502L6.33751 5.05544L8.50084 4.36127L7.78293 3.12086ZM5.12668 2.14502C5.06072 2.12396 4.99055 2.11966 4.92251 2.13252L4.87251 2.14502L3.38709 2.62169L4.99959 3.13877L6.61209 2.62169L5.12668 2.14502Z" fill="#44546F"/>
              </svg>
            </div>
            <span>{{ (productToEdit?.product_name || 'Product').length > 10 ? (productToEdit?.product_name || 'Product').substring(0, 10) + '...' : (productToEdit?.product_name || 'Product') }}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Step {{ editProductCurrentStep }} of 2</span>
          <div class="w-32 h-2 rounded-full overflow-hidden" style="background-color: #091E420F;">
            <div 
              class="h-full transition-all duration-300"
              :style="{ 
                width: `${(editProductCurrentStep / 2) * 100}%`,
                backgroundColor: editProductCurrentStep === 2 ? '#1F845A' : '#44546F'
              }"
            ></div>
          </div>
        </div>
      </template>

      <template #default="{ closeModal }">
        <div class="space-y-6 px-6">
          <!-- Step 1: Product Details -->
          <div v-if="editProductCurrentStep === 1" class="space-y-6">
            <!-- Product Details Section -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Select a pack style</label>
                  <SelectField
                    v-model="editProductFormData.packStyle"
                    :options="packStyleOptions"
                    placeholder="Select pack style"
                  />
                </div>
                <div>
                  <label>Enter generic name</label>
                  <input 
                    type="text" 
                    v-model="editProductFormData.genericName"
                    placeholder="Enter generic name"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Product Strength</label>
                  <input 
                    type="text" 
                    v-model="editProductFormData.productStrength"
                    placeholder="Enter product strength"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Manufacturer</label>
                  <SelectField
                    v-model="editProductFormData.manufacturer"
                    :options="manufacturerOptions"
                    placeholder="Select a manufacturer"
                  />
                </div>
              </div>
            </div>

            <!-- Quantity Section -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Quantity Per Pack</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.quantityPerPack"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Quantity Per Carton</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.quantityPerCarton"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Quantity Available</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.quantityAvailable"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Quantity to Warn</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.quantityToWarn"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Dispensation</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.dispensation"
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Store Information Section -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Store Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Unit Cost</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.unitCost"
                    placeholder="₦ 0.00"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Pack Size</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.packSize"
                    placeholder="0.00"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Quantity Per Roll/Box</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.quantityPerRollBox"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Product Category</label>
                  <SelectField
                    v-model="editProductFormData.productCategory"
                    :options="categoryOptions"
                    placeholder="Select a product category"
                  />
                </div>
                <div>
                  <label>Product Sub Category</label>
                  <SelectField
                    v-model="editProductFormData.productSubCategory"
                    :options="subCategoryOptions"
                    placeholder="Select a product sub category"
                  />
                </div>
                <div>
                  <label>Warehouse Location</label>
                  <SelectField
                    v-model="editProductFormData.warehouseLocation"
                    :options="warehouseOptions"
                    placeholder="Select a warehouse location"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Product Image & Sales Rules -->
          <div v-if="editProductCurrentStep === 2" class="space-y-6">
            <!-- Product Image Section -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Image</h3>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700">Upload Product Image</label>
                <div 
                  class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  @click="openFilePicker"
                  @dragover.prevent
                  @dragenter.prevent
                  @drop.prevent="handleFileDrop"
                >
                  <div class="flex flex-col items-center justify-center space-y-2">
                    <!-- Cloud Upload Icon -->
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-500">
                      <path d="M7 18C4.8 18 3 16.2 3 14C3 12.7 3.5 11.5 4.3 10.6C4.4 6.5 7.8 3 12 3C16.2 3 19.6 6.5 19.7 10.6C20.5 11.5 21 12.7 21 14C21 16.2 19.2 18 17 18H7Z" fill="currentColor"/>
                      <path d="M12 8L12 16M8 12L12 8L16 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                    <!-- "or" text -->
                    <span class="text-gray-600 text-sm">or</span>
                    
                    <!-- Browse link -->
                    <button type="button" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      browse
                    </button>
                    
                    <!-- Drag and drop instruction -->
                    <p class="text-gray-600 text-sm">Drag and drop your image here,</p>
                    
                    <!-- File format info -->
                    <p class="text-gray-500 text-xs">Supports: JPG, PNG (max 5mb)</p>
                  </div>
                  
                  <!-- Hidden file input -->
                  <input 
                    ref="fileInput"
                    type="file" 
                    accept="image/jpeg,image/png"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                </div>
              </div>
            </div>

            <!-- Sales Rules Section -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Sales Rules</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Max. Quantity per Sale</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.maxQuantityPerSale"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Max Quantity per Sale in Days</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.maxQuantityPerSaleInDays"
                    class="w-full"
                  />
                </div>
                <div>
                  <label>Min. Quantity to Reorder</label>
                  <input 
                    type="number" 
                    v-model="editProductFormData.minQuantityToReorder"
                    class="w-full"
                  />
                </div>
              </div>
              <div class="mt-4 space-y-3">
                <div class="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    v-model="editProductFormData.makeCashAndCarry"
                    id="makeCashAndCarry"
                    class="w-4 h-4"
                  />
                  <label for="makeCashAndCarry" class="text-sm">Make Cash and Carry</label>
                </div>
                <div class="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    v-model="editProductFormData.useFlatFee"
                    id="useFlatFee"
                    class="w-4 h-4"
                  />
                  <label for="useFlatFee" class="text-sm">Use Flat Fee (for Distributor)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-between">
          <Button 
            v-if="editProductCurrentStep > 1"
            type="gray-btn" 
            :onClick="handleEditProductPrevious" 
            classStyle="cancel_btn"
          >
            Previous
          </Button>
          <div v-else></div>
          
          <div class="flex gap-3">
            <Button type="gray-btn" :onClick="closeModal" classStyle="cancel_btn">
              Cancel
            </Button>
            <Button 
              v-if="editProductCurrentStep < 2"
              type="create-btn" 
              :onClick="handleEditProductNext" 
              classStyle="create_btn"
            >
              Next
            </Button>
            <Button 
              v-else
              type="create-btn" 
              :onClick="handleEditProductSubmit" 
              classStyle="create_btn"
            >
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '@/views/Components/ui/Breadcrumb.vue';
import Tabs from '@/views/Components/Tabs.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import GrayButton from '@/views/Components/ui/GrayButton.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import OrderHeader from '@/views/Components/ui/OrderHeader.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import SuccessModal from '@/views/Components/procurement/ui/SuccessModal.vue';
import FileUploader from '@/views/Components/FileUploader.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import type { TableColumn } from '@/types';

// Breadcrumb items
const breadcrumbItems = ref([
  { label: 'Products Management' },
  { label: 'All Products' },
  { label: 'Active Products' }
]);

// Tabs configuration
const tabs = ref([
  'Active Products',
  'Inactive Products', 
  'Product Stock Reports'
]);

const activeTab = ref('Active Products');

// Modal state
const isProductModalOpen = ref(false);
const selectedProduct = ref<any>(null);

// Update Quantity Modal states
const isUpdateQuantityModalOpen = ref(false);
const isUpdateQuantityConfirmOpen = ref(false);
const isUpdateQuantitySuccessOpen = ref(false);
const updateQuantityFormData = ref({
  batch: '',
  quantityChange: '',
  reason: '',
  updateInvoice: false
});
const productToUpdate = ref<any>(null);

// Edit Product Modal states
const isEditProductModalOpen = ref(false);
const editProductCurrentStep = ref(1);
const editProductFormData = ref({
  // Step 1
  packStyle: '',
  genericName: '',
  productStrength: '',
  manufacturer: '',
  quantityPerPack: 0,
  quantityPerCarton: 0,
  quantityAvailable: 0,
  quantityToWarn: 0,
  dispensation: 1,
  unitCost: 0,
  packSize: 0,
  quantityPerRollBox: 0,
  productCategory: '',
  productSubCategory: '',
  warehouseLocation: '',
  // Step 2
  productImage: null,
  maxQuantityPerSale: 0,
  maxQuantityPerSaleInDays: 0,
  minQuantityToReorder: 0,
  makeCashAndCarry: false,
  useFlatFee: false
});
const productToEdit = ref<any>(null);


// File upload ref
const fileInput = ref<HTMLInputElement | null>(null);

// Options for SelectField components
const packStyleOptions = ref([
  { id: 'bottle', name: 'Bottle' },
  { id: 'box', name: 'Box' },
  { id: 'tube', name: 'Tube' },
  { id: 'sachet', name: 'Sachet' }
]);

const manufacturerOptions = ref([
  { id: 'manufacturer1', name: 'Manufacturer 1' },
  { id: 'manufacturer2', name: 'Manufacturer 2' },
  { id: 'manufacturer3', name: 'Manufacturer 3' }
]);

const categoryOptions = ref([
  { id: 'surgicals', name: 'Surgicals' },
  { id: 'creams', name: 'Creams & Ointments' },
  { id: 'tablets', name: 'Tablets' },
  { id: 'injections', name: 'Injections' }
]);

const subCategoryOptions = ref([
  { id: 'sub1', name: 'Sub Category 1' },
  { id: 'sub2', name: 'Sub Category 2' },
  { id: 'sub3', name: 'Sub Category 3' }
]);

const warehouseOptions = ref([
  { id: 'HA001', name: 'HA001' },
  { id: 'HA002', name: 'HA002' },
  { id: 'HA006', name: 'HA006' }
]);

const batchOptions = ref([
  { id: 'batch-001', name: 'Batch 001' },
  { id: 'batch-002', name: 'Batch 002' },
  { id: 'batch-003', name: 'Batch 003' }
]);

// Table columns configuration - dynamic based on active tab
const getColumns = (): TableColumn[] => {
  if (activeTab.value === 'Product Stock Reports') {
    return [
      { label: 'ID', field: 'id', sortable: true },
      { label: 'Product Image', field: 'product_image', sortable: false },
      { label: 'Product Name', field: 'product_name', sortable: true },
      { label: 'Category', field: 'category', sortable: true },
      { label: 'Product Formulation', field: 'product_formulation', sortable: true },
      { label: 'Available Qty', field: 'available_qty', sortable: true },
      { label: 'Qty to Warn', field: 'qty_to_warn', sortable: true },
      { label: 'Shelf Location', field: 'shelf_location', sortable: true }
    ];
  } else {
    return [
      { label: 'ID', field: 'id', sortable: true },
      { label: 'Product Image', field: 'product_image', sortable: false },
      { label: 'Product Name', field: 'product_name', sortable: true },
      { label: 'Category', field: 'category', sortable: true },
      { label: 'Product Formulation', field: 'product_formulation', sortable: true },
      { label: 'Selling Price', field: 'selling_price', sortable: true },
      { label: 'Cost Price', field: 'cost_price', sortable: true },
      { label: 'Available Qty', field: 'available_qty', sortable: true },
      { label: 'Instock', field: 'instock', sortable: true },
      { label: 'Sold Qty', field: 'sold_qty', sortable: true },
      { label: 'Shelf Location', field: 'shelf_location', sortable: true },
      { label: 'Action', field: 'action', sortable: false, width: '150px' }
    ];
  }
};

const columns = computed(() => getColumns());

// Mock product data based on the image description
const productsData = ref([
  {
    id: 87,
    product_image: '/placeholder-product.png',
    product_name: 'LIFESIGN HYPOLANCE HYPODERMIC NEEDLE...',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 54,
    product_image: '/placeholder-product.png',
    product_name: 'AGARY FINE CAN HYPODERMIC NEEDLE...',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 25,
    product_image: '/placeholder-product.png',
    product_name: 'KESSINGTON KESARTEM TABLET 80...',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 30,
    product_image: '/placeholder-product.png',
    product_name: 'ABIDEC MULTIVITAMIN DROPS FOR BABIES 25...',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 51,
    product_image: '/placeholder-product.png',
    product_name: 'ABONIKI BALM 25G',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 21,
    product_image: '/placeholder-product.png',
    product_name: 'ACCU CHEK ACTIVE GLUCOMETER',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 35,
    product_image: '/placeholder-product.png',
    product_name: 'ACCU CHEK TEST STRIP X 50',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 23,
    product_image: '/placeholder-product.png',
    product_name: 'MEDIKLIN ACCU-CHEK 200 LANCET',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 33,
    product_image: '/placeholder-product.png',
    product_name: 'ACEPOL (PARACETAMOL) SUS...',
    category: 'Creams & Ointments',
    product_formulation: 'Creams & Ointments',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  },
  {
    id: 88,
    product_image: '/placeholder-product.png',
    product_name: 'ACIPRO (CIPROFLOXACIN) TAB...',
    category: 'Surgicals',
    product_formulation: 'Surgicals',
    selling_price: '₦96,700.00',
    cost_price: '₦96,700.00',
    available_qty: 32,
    instock: 32,
    sold_qty: 21,
    qty_to_warn: 21,
    shelf_location: 'HA006'
  }
]);

// Filter fields for Datatable
const filterFields = ref({
  category: {
    type: 'select',
    label: 'Category',
    options: [
      { value: '', label: 'All Categories' },
      { value: 'Surgicals', label: 'Surgicals' },
      { value: 'Creams & Ointments', label: 'Creams & Ointments' }
    ]
  },
  product_formulation: {
    type: 'select',
    label: 'Product Formulation',
    options: [
      { value: '', label: 'All Formulations' },
      { value: 'Surgicals', label: 'Surgicals' },
      { value: 'Creams & Ointments', label: 'Creams & Ointments' }
    ]
  }
});

// Functions
const onTabChanged = (tab: string, index: number) => {
  activeTab.value = tab;
  console.log('Tab changed to:', tab, 'at index:', index);
  // Add tab change logic here
};

const viewProduct = (row: any) => {
  selectedProduct.value = row;
  isProductModalOpen.value = true;
  console.log('Viewing product:', row);
};

const downloadProductsReport = () => {
  console.log('Downloading products report...');
  // Add download logic here
};

// Action menu functions
const viewProductDashboard = (product: any) => {
  console.log('Viewing product dashboard for:', product);
  // Navigate to product details page
  router.push(`/admin/products/${product.id}`);
};

const updateQuantity = (product: any) => {
  productToUpdate.value = product;
  updateQuantityFormData.value = {
    batch: '',
    quantityChange: '',
    reason: '',
    updateInvoice: false
  };
  isUpdateQuantityModalOpen.value = true;
};

const editProduct = (product: any) => {
  productToEdit.value = product;
  editProductCurrentStep.value = 1;
  editProductFormData.value = {
    // Step 1
    packStyle: '',
    genericName: product.product_name || '',
    productStrength: '',
    manufacturer: '',
    quantityPerPack: 0,
    quantityPerCarton: 0,
    quantityAvailable: product.available_qty || 0,
    quantityToWarn: product.qty_to_warn || 0,
    dispensation: 1,
    unitCost: 0,
    packSize: 0,
    quantityPerRollBox: 0,
    productCategory: product.category || '',
    productSubCategory: '',
    warehouseLocation: product.shelf_location || '',
    // Step 2
    productImage: null,
    maxQuantityPerSale: 0,
    maxQuantityPerSaleInDays: 0,
    minQuantityToReorder: 0,
    makeCashAndCarry: false,
    useFlatFee: false
  };
  isEditProductModalOpen.value = true;
};

const router = useRouter();

const viewChanges = (product: any) => {
  // Navigate to the View Changes page
  const productName = encodeURIComponent(product.product_name || 'Unknown Product');
  router.push(`/compliance/products/view-changes/${productName}`);
};

const disableProduct = (product: any) => {
  console.log('Disabling product:', product);
  // Add disable logic here
};

const enableProduct = (product: any) => {
  console.log('Enabling product:', product);
  // Add enable logic here
};

// Update Quantity Modal Handlers
const handleUpdateQuantitySubmit = () => {
  isUpdateQuantityModalOpen.value = false;
  isUpdateQuantityConfirmOpen.value = true;
};

const handleUpdateQuantityConfirm = () => {
  isUpdateQuantityConfirmOpen.value = false;
  // Simulate API call
  setTimeout(() => {
    isUpdateQuantitySuccessOpen.value = true;
  }, 500);
};

const handleUpdateQuantitySuccess = () => {
  isUpdateQuantitySuccessOpen.value = false;
  // Reset form data
  updateQuantityFormData.value = {
    batch: '',
    quantityChange: '',
    reason: '',
    updateInvoice: false
  };
  productToUpdate.value = null;
};

// Edit Product Modal Handlers
const handleEditProductNext = () => {
  if (editProductCurrentStep.value < 2) {
    editProductCurrentStep.value++;
  }
};

const handleEditProductPrevious = () => {
  if (editProductCurrentStep.value > 1) {
    editProductCurrentStep.value--;
  }
};

const handleEditProductSubmit = () => {
  // Close modal and show success
  isEditProductModalOpen.value = false;
  // Reset form data
  editProductFormData.value = {
    packStyle: '',
    genericName: '',
    productStrength: '',
    manufacturer: '',
    quantityPerPack: 0,
    quantityPerCarton: 0,
    quantityAvailable: 0,
    quantityToWarn: 0,
    dispensation: 1,
    unitCost: 0,
    packSize: 0,
    quantityPerRollBox: 0,
    productCategory: '',
    productSubCategory: '',
    warehouseLocation: '',
    productImage: null,
    maxQuantityPerSale: 0,
    maxQuantityPerSaleInDays: 0,
    minQuantityToReorder: 0,
    makeCashAndCarry: false,
    useFlatFee: false
  };
  editProductCurrentStep.value = 1;
  productToEdit.value = null;
};

const handleSelectedFiles = (files: File[]) => {
  editProductFormData.value.productImage = files[0] || null;
};

// File upload handlers
const openFilePicker = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    editProductFormData.value.productImage = file;
  }
};

const handleFileDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    // Check file type
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size <= 5 * 1024 * 1024) {
        editProductFormData.value.productImage = file;
      } else {
        alert('File size must be less than 5MB');
      }
    } else {
      alert('Please select a JPG or PNG image');
    }
  }
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f7f8f9;
}
</style>
