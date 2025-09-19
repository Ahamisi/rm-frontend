<template>
  <div class="erp_dashboard_wrapper">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" background="gray" />
    


    <Tabs :tabs="tabs" @tabChanged="onTabChanged" />


    <!-- Main Content -->
    <div class="px-6 bg-[#fff] min-h-[calc(100vh-200px)]">
      <!-- Tabs -->
      
      <!-- Data Table -->
      <div class="mt-6">
        <Datatable
          :items="kycData"
          :columns="columns"
          :searchable="true"
          :filterByDate="false"
          :printable="false"
          :exportable="false"
          :filterFields="filterFields"
          pageName="KYCVerification"
        >
          <template #column="col">
            <!-- Action Column -->
            <span v-if="col.props?.column?.field === 'action'">
              <Button 
                type="gray-btn" 
                :onClick="() => viewDocument(col.props?.formattedRow)"
                classStyle="px-3 py-1 text-sm"
              >
                View Document
              </Button>
            </span>

            <!-- Status Column -->
            <span v-else-if="col.props?.column?.field === 'status'">
              <Pill 
                type="cash-and-carry" 
                :text="col.props?.formattedRow?.status"
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

    <!-- Document Viewer Modal -->
    <SideBarModal
      :isOpen="isDocumentModalOpen"
      @update:isOpen="isDocumentModalOpen = $event"
      width="large"
    >
      <template #header>
        <OrderHeader 
          :title="selectedCustomer?.customerName || 'Customer'" 
          :reference="selectedCustomer?.storeName || 'Store'"
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
        <div class="flex h-full">
          <!-- Left Side - Document Categories -->
          <div class="w-1/3 p-4 overflow-y-auto">
            <!-- Customer Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <!-- Top Section: Icon + Contact Info -->
              <div class="flex items-start gap-3 mb-3">
                <!-- Icon Container -->
                <div class="w-8 h-8 rounded flex items-center justify-center" style="background-color: #DCDFE4;">
                  <img src="@/views/Pages/procurement/redesign/silhouette.svg" class="w-5 h-5" />
                </div>
                
                <!-- Contact Details -->
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900 mb-1">{{ selectedCustomer?.customerName }}</h3>
                  <div class="flex items-center gap-2 mb-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    <p class="text-xs text-gray-600">{{ selectedCustomer?.phone }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    <p class="text-xs text-gray-600">{{ selectedCustomer?.storeName }}</p>
                  </div>

                    <!-- Status Section -->
              <div class="mt-3 py-1 px-2 bg-white rounded-lg">
                <div class="flex items-center gap-2 mb-0">
                  <span class="text-sm font-semibold text-[#626F86]">Status</span>
                </div>
                <div class="flex items-center gap-2">
                  <Pill type="cash-and-carry" :text="selectedCustomer?.status" />
                  <div class="w-px h-4 bg-gray-300"></div>
                  <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending: Tier 1 &nbsp;
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                      <g clip-path="url(#clip0_7099_291582)">
                        <path d="M4.9987 6.24996C6.60953 6.24996 7.91536 4.94412 7.91536 3.33329C7.91536 1.72246 6.60953 0.416626 4.9987 0.416626C3.38787 0.416626 2.08203 1.72246 2.08203 3.33329C2.08203 4.94412 3.38787 6.24996 4.9987 6.24996Z" stroke="#A54800" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.42214 5.78749L2.91797 9.58332L5.0013 8.33332L7.08463 9.58332L6.58047 5.78333" stroke="#A54800" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_7099_291582">
                          <rect width="10" height="10" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

                </div>
              </div>
              
            

            </div>

            <!-- Document Categories -->
            <div class="space-y-1">
              <div v-for="category in documentCategories" :key="category.id">
                <!-- Category Header -->
                <div 
                  class="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  @click="toggleCategory(category.id)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <svg 
                        class="w-4 h-4 text-gray-500 transition-transform"
                        :class="{ 'rotate-180': category.expanded }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                      <h4 class="text-sm font-medium" style="color: #44546F;">{{ category.title }}</h4>
                    </div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {{ category.count }}
                    </span>
                  </div>
                </div>

                <!-- Category Content -->
                <div v-if="category.expanded" class="pl-3">
                  <div v-if="category.documents.length > 0" class="space-y-1">
                    <div 
                      v-for="document in category.documents" 
                      :key="document.id"
                      class="flex items-center gap-2 p-2 rounded cursor-pointer transition-colors"
                      :class="selectedDocument?.id === document.id ? 'bg-[#F1F2F4]' : 'hover:bg-gray-50'"
                      @click="selectDocument(document)"
                    >
                      <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      <span class="text-xs font-medium" style="color: #172B4D;">{{ document.name }}</span>
                    </div>
                  </div>
                  <div v-else class="p-3 text-center text-gray-500 text-xs">
                    No documents uploaded
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Document Preview -->
          <div class="flex-1 flex flex-col">
            <!-- Document Header -->
            

            <!-- Document Preview Area -->
            <div class="flex-1 p-4 flex flex-col items-center justify-center bg-white">
              <div v-if="selectedDocument" class="w-full h-full flex flex-col">
                <!-- Zoom Controls -->
                <div class="flex items-center justify-between mb-4">
                  <div>
                   
                    <h3 class="text-sm font-medium text-[#172B4D]">
                      <span class="text-[#626F86]">License Images:</span>&nbsp;
                      <span>{{ selectedDocument?.name || 'Select a document' }}</span>
                    </h3>
                  </div>

                  <div class="flex ">
                  <div class="flex items-center gap-2">
                    <Button type="" classStyle="px-2 py-1 text-xs">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4993 2C12.0952 1.99989 13.659 2.44911 15.0116 3.29623C16.3642 4.14336 17.4509 5.35417 18.1475 6.79009C18.8441 8.22602 19.1223 9.82905 18.9504 11.4157C18.7784 13.0024 18.1633 14.5086 17.1753 15.762L20.8273 19.414C21.0094 19.6026 21.1102 19.8552 21.108 20.1174C21.1057 20.3796 21.0005 20.6304 20.8151 20.8158C20.6297 21.0012 20.3789 21.1064 20.1167 21.1087C19.8545 21.111 19.6019 21.0102 19.4133 20.828L15.7613 17.176C14.6967 18.015 13.447 18.5872 12.1163 18.8449C10.7856 19.1026 9.4126 19.0384 8.11179 18.6576C6.81098 18.2768 5.6201 17.5904 4.63851 16.6557C3.65692 15.7211 2.91308 14.5652 2.46906 13.2846C2.02503 12.004 1.89368 10.6357 2.08599 9.29404C2.27829 7.95235 2.78866 6.67609 3.57451 5.57175C4.36037 4.46742 5.39893 3.56702 6.60353 2.94569C7.80814 2.32436 9.14387 2.00012 10.4993 2ZM10.4993 4C8.77537 4 7.12207 4.68482 5.90308 5.90381C4.6841 7.12279 3.99928 8.77609 3.99928 10.5C3.99928 12.2239 4.6841 13.8772 5.90308 15.0962C7.12207 16.3152 8.77537 17 10.4993 17C12.2232 17 13.8765 16.3152 15.0955 15.0962C16.3145 13.8772 16.9993 12.2239 16.9993 10.5C16.9993 8.77609 16.3145 7.12279 15.0955 5.90381C13.8765 4.68482 12.2232 4 10.4993 4ZM13.9993 9.5C14.2645 9.5 14.5188 9.60536 14.7064 9.79289C14.8939 9.98043 14.9993 10.2348 14.9993 10.5C14.9993 10.7652 14.8939 11.0196 14.7064 11.2071C14.5188 11.3946 14.2645 11.5 13.9993 11.5H6.99928C6.73406 11.5 6.47971 11.3946 6.29217 11.2071C6.10463 11.0196 5.99928 10.7652 5.99928 10.5C5.99928 10.2348 6.10463 9.98043 6.29217 9.79289C6.47971 9.60536 6.73406 9.5 6.99928 9.5H13.9993Z" fill="#44546F"/>
                      </svg>
                    </Button>
                    <span class="text-xs text-gray-600">100%</span>
                    <Button type="" classStyle="px-2 py-1 text-xs">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.49928 2.06021e-08C10.0675 -0.000109149 11.6052 0.433645 12.9423 1.25327C14.2793 2.07289 15.3635 3.24643 16.0749 4.64403C16.7864 6.04163 17.0973 7.6088 16.9733 9.17214C16.8492 10.7355 16.2951 12.234 15.3723 13.502L15.1753 13.762L18.8273 17.414C19.0085 17.5935 19.1143 17.8356 19.123 18.0905C19.1316 18.3455 19.0425 18.5942 18.8738 18.7856C18.7051 18.977 18.4697 19.0967 18.2157 19.1202C17.9616 19.1437 17.7082 19.0692 17.5073 18.912L17.4133 18.828L13.7613 15.176C12.6967 16.015 11.447 16.5872 10.1163 16.8449C8.78562 17.1026 7.4126 17.0384 6.11179 16.6576C4.81098 16.2768 3.6201 15.5904 2.63851 14.6557C1.65692 13.7211 0.913084 12.5652 0.469055 11.2846C0.0250263 10.004 -0.106316 8.63574 0.0859852 7.29404C0.278287 5.95235 0.788656 4.67609 1.57451 3.57175C2.36037 2.46742 3.39893 1.56702 4.60353 0.945694C5.80814 0.324364 7.14387 0.000115493 8.49928 2.06021e-08ZM8.49928 2C6.77537 2 5.12207 2.68482 3.90308 3.90381C2.6841 5.12279 1.99928 6.77609 1.99928 8.5C1.99928 10.2239 2.6841 11.8772 3.90308 13.0962C5.12207 14.3152 6.77537 15 8.49928 15C10.2232 15 11.8765 14.3152 13.0955 13.0962C14.3145 11.8772 14.9993 10.2239 14.9993 8.5C14.9993 6.77609 14.3145 5.12279 13.0955 3.90381C11.8765 2.68482 10.2232 2 8.49928 2ZM8.49928 4C8.74421 4.00003 8.98061 4.08996 9.16365 4.25272C9.34668 4.41547 9.46362 4.63975 9.49228 4.883L9.49928 5V7.5H11.9993C12.2542 7.50028 12.4993 7.59788 12.6846 7.77285C12.87 7.94782 12.9815 8.18695 12.9964 8.44139C13.0114 8.69584 12.9286 8.94638 12.765 9.14183C12.6014 9.33729 12.3694 9.4629 12.1163 9.493L11.9993 9.5H9.49928V12C9.49899 12.2549 9.4014 12.5 9.22643 12.6854C9.05146 12.8707 8.81232 12.9822 8.55788 12.9972C8.30344 13.0121 8.0529 12.9293 7.85744 12.7657C7.66199 12.6021 7.53638 12.3701 7.50628 12.117L7.49928 12V9.5H4.99928C4.7444 9.49972 4.49924 9.40212 4.31391 9.22715C4.12857 9.05218 4.01704 8.81305 4.00211 8.55861C3.98717 8.30416 4.06995 8.05362 4.23354 7.85817C4.39713 7.66271 4.62918 7.5371 4.88228 7.507L4.99928 7.5H7.49928V5C7.49928 4.73478 7.60463 4.48043 7.79217 4.29289C7.97971 4.10536 8.23406 4 8.49928 4Z" fill="#44546F"/>
                      </svg>
                    </Button>
                  </div>
                  <Button type="" classStyle="px-2 py-1 text-xs">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                      <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                    </svg>
                  </Button>
                  </div>
                </div>

                <!-- Document Image/Preview -->
                <div class="flex-1 bg-[#F7F8F9] rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-sm text-gray-500">{{ selectedDocument.name }}</p>
                    <p class="text-xs text-gray-400 mt-1">Document preview will appear here</p>
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-sm text-gray-500">Select a document to preview</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="red-btn" :onClick="() => handleReject(selectedCustomer)" classStyle="px-4 py-2">
            Reject
          </Button>
          <Button type="blue-btn" :onClick="() => handleApprove(selectedCustomer)" classStyle="px-4 py-2">
            Approve
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Rejection Modal -->
    <WarningConfirmationModal
      :show="showRejectionModal"
      title="Reject KYC Verification?"
      confirmText="Reject Verification"
      cancelText="Cancel"
      @close="closeRejectionModal"
      @confirm="confirmRejection"
      customWidth="500px"
    >
      <template #body>
        <div class="space-y-4">
          <p class="text-[#44546F] text-[14px] font-[400] mb-6">
            You're about to reject KYC verification for <strong>&quot;{{ selectedCustomer?.customerName || 'this customer' }}&quot;</strong>. This customer will be notified to provide updated information.
          </p>
          
          <!-- Reason for Rejection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason for rejection</label>
            <div class="relative w-full" ref="rejectionDropdownRef">
              <!-- Select Field -->
              <div 
                class="flex items-center justify-between w-full px-2 py-2 bg-white border-2 rounded-lg cursor-pointer h-auto"
                style="border-color: #091E4224;"
                :class="isRejectionDropdownOpen ? 'border-blue-600' : ''"
                @click="toggleRejectionDropdown"
              >
                <!-- Input/Display Area -->
                <div class="flex-1 h-[20px] flex items-center">
                  <input 
                    :placeholder="'Select a reason for rejecting...'"
                    class="w-full appearance-none outline-none bg-transparent text-sm text-[#172B4D] border-none p-0 m-0 h-[20px] leading-[20px]"
                    style="box-shadow: none; border: none; color: #172B4D !important; padding: 0 !important;"
                    :value="selectedRejectionReason?.name || ''"
                    readonly
                  />
                </div>
                
                <!-- Dropdown Icon -->
                <div class="flex items-center">
                  <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isRejectionDropdownOpen }" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Dropdown Menu -->
              <div
                v-if="isRejectionDropdownOpen"
                class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                style="border: 2px solid #091E4224;"
              >
                <div v-for="option in rejectionReasons" :key="option.id">
                  <!-- Separator -->
                  <div v-if="option.isSeparator" class="border-t border-gray-200 my-1"></div>
                  <!-- Option -->
                  <div v-else
                    class="px-3 py-3 text-sm text-[#172B4D] cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                    @click="selectRejectionReason(option)"
                  >
                    <span>{{ option.name }}</span>
                    <svg v-if="selectedRejectionReason?.id === option.id" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#0C66E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Details (only show if "Other reason" is selected) -->
          <div v-if="selectedRejectionReason?.name === 'Other reason'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional details</label>
            <textarea 
              v-model="additionalDetails"
              placeholder="Add specific details about the rejection reason..."
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>
      </template>
    </WarningConfirmationModal>

    <!-- Approval Modal -->
    <WarningConfirmationModal
      :show="showApprovalModal"
      title="Approve KYC Verification?"
      :message="`You're about to approve KYC verification for &quot;${selectedCustomer?.customerName || 'this customer'}&quot;. This customer will be verified and able to place orders immediately.`"
      confirmText="Approve Verification"
      @close="closeApprovalModal"
      @confirm="confirmApproval"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Breadcrumb from '@/views/Components/ui/Breadcrumb.vue';
import Tabs from '@/views/Components/Tabs.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import OrderHeader from '@/views/Components/ui/OrderHeader.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import type { TableColumn } from '@/types';

// Breadcrumb items
const breadcrumbItems = ref([
  { label: 'KYC Verification' }
]);

// Tabs configuration
const tabs = ref([
  'Pending Tier 1',
  'Pending Tier 2', 
  'Pending Tier 3'
]);

const activeTab = ref('Pending Tier 1');

// Modal state
const isDocumentModalOpen = ref(false);
const selectedCustomer = ref<any>(null);
const selectedDocument = ref<any>(null);

// Rejection/Approval modal state
const showRejectionModal = ref(false);
const showApprovalModal = ref(false);
const rejectionReason = ref('');
const additionalDetails = ref('');

// Rejection reasons
const rejectionReasons = ref([
  { id: 1, name: 'Incomplete information' },
  { id: 2, name: 'Invalid documents' },
  { id: 3, name: 'Expired documents' },
  { id: 4, name: 'Unclear documents' },
  { id: 5, name: 'Information mismatch' },
  { id: 'separator', name: 'separator', isSeparator: true },
  { id: 6, name: 'Other reason' }
]);

const selectedRejectionReason = ref(null);
const isRejectionDropdownOpen = ref(false);
const rejectionDropdownRef = ref(null);

// Document categories data
const documentCategories = ref([
  {
    id: 'license',
    title: 'License Images',
    count: 2,
    expanded: true,
    documents: [
      {
        id: 1,
        name: 'Operational License',
        type: 'license',
        url: '/path/to/operational-license.pdf',
        thumbnail: '/path/to/thumbnail.jpg'
      },
      {
        id: 2,
        name: 'CAC Certificate',
        type: 'license',
        url: '/path/to/cac-certificate.pdf',
        thumbnail: '/path/to/thumbnail.jpg'
      }
    ]
  },
  {
    id: 'address',
    title: 'Proof of Address',
    count: 0,
    expanded: false,
    documents: []
  },
  {
    id: 'store',
    title: 'Store Images',
    count: 0,
    expanded: false,
    documents: []
  }
]);

// Table columns configuration
const columns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customerName', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Customer Type', field: 'customerType', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Action', field: 'action', sortable: false, width: '150px' }
]);

// Mock KYC data
const kycData = ref([
  {
    id: 87,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    customerType: 'Hospital',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    action: 'View Document'
  },
  {
    id: 54,
    customerName: 'Emeka Kalu',
    storeName: 'Emeka Pharmacy',
    customerType: 'Pharmacy',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    action: 'View Document'
  },
  {
    id: 30,
    customerName: 'Emmanuel Aba',
    storeName: 'Emma Bros Pharmacy',
    customerType: 'Mega distributor',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    action: 'View Document'
  },
  {
    id: 25,
    customerName: 'Sarah Johnson',
    storeName: 'Health Plus Clinic',
    customerType: 'Hospital',
    email: 'sarah.j@healthplus.com',
    phone: '+234 801 234 5678',
    status: 'Pending',
    action: 'View Document'
  },
  {
    id: 18,
    customerName: 'Michael Brown',
    storeName: 'Brown Medical Center',
    customerType: 'Hospital',
    email: 'michael.brown@brownmedical.com',
    phone: '+234 802 345 6789',
    status: 'Enabled',
    action: 'View Document'
  },
  {
    id: 12,
    customerName: 'Grace Williams',
    storeName: 'Grace Pharmacy',
    customerType: 'Pharmacy',
    email: 'grace.w@gracepharmacy.com',
    phone: '+234 803 456 7890',
    status: 'Pending',
    action: 'View Document'
  },
  {
    id: 8,
    customerName: 'David Smith',
    storeName: 'Smith Distributors',
    customerType: 'Mega distributor',
    email: 'david.smith@smithdist.com',
    phone: '+234 804 567 8901',
    status: 'Enabled',
    action: 'View Document'
  },
  {
    id: 5,
    customerName: 'Jennifer Davis',
    storeName: 'Davis Medical',
    customerType: 'Hospital',
    email: 'jennifer.d@davismedical.com',
    phone: '+234 805 678 9012',
    status: 'Pending',
    action: 'View Document'
  }
]);

// Filter fields for Datatable
const filterFields = ref({
  customerType: {
    type: 'select',
    label: 'Customer Type',
    options: [
      { value: '', label: 'All Types' },
      { value: 'Hospital', label: 'Hospital' },
      { value: 'Pharmacy', label: 'Pharmacy' },
      { value: 'Mega distributor', label: 'Mega distributor' }
    ]
  },
  status: {
    type: 'select',
    label: 'Status',
    options: [
      { value: '', label: 'All Status' },
      { value: 'Enabled', label: 'Enabled' },
      { value: 'Pending', label: 'Pending' }
    ]
  }
});

// Functions
const onTabChanged = (tab: string, index: number) => {
  activeTab.value = tab;
  console.log('Tab changed to:', tab, 'at index:', index);
  // Add tab change logic here
};

const viewDocument = (row: any) => {
  selectedCustomer.value = row;
  selectedDocument.value = documentCategories.value[0].documents[0]; // Default to first document
  isDocumentModalOpen.value = true;
  console.log('Viewing document for:', row);
};

const selectDocument = (document: any) => {
  selectedDocument.value = document;
};

const toggleCategory = (categoryId: string) => {
  const category = documentCategories.value.find(cat => cat.id === categoryId);
  if (category) {
    category.expanded = !category.expanded;
  }
};

// Rejection/Approval functions
const handleReject = (customer: any) => {
  selectedCustomer.value = customer;
  isDocumentModalOpen.value = false; // Close the document modal
  showRejectionModal.value = true;
  selectedRejectionReason.value = null;
  additionalDetails.value = '';
};

const handleApprove = (customer: any) => {
  selectedCustomer.value = customer;
  isDocumentModalOpen.value = false; // Close the document modal
  showApprovalModal.value = true;
};

const confirmRejection = () => {
  // Handle rejection logic here
  console.log('Rejecting KYC for:', selectedCustomer.value?.customerName);
  console.log('Reason:', selectedRejectionReason.value?.name);
  console.log('Additional details:', additionalDetails.value);
  
  // Close modal and reset
  showRejectionModal.value = false;
  selectedCustomer.value = null;
  selectedRejectionReason.value = null;
  additionalDetails.value = '';
};

const confirmApproval = () => {
  // Handle approval logic here
  console.log('Approving KYC for:', selectedCustomer.value?.customerName);
  
  // Close modal and reset
  showApprovalModal.value = false;
  selectedCustomer.value = null;
};

const closeRejectionModal = () => {
  showRejectionModal.value = false;
  selectedCustomer.value = null;
  selectedRejectionReason.value = null;
  additionalDetails.value = '';
};

const closeApprovalModal = () => {
  showApprovalModal.value = false;
  selectedCustomer.value = null;
};

// Custom dropdown functions
const toggleRejectionDropdown = () => {
  isRejectionDropdownOpen.value = !isRejectionDropdownOpen.value;
};

const selectRejectionReason = (option: any) => {
  selectedRejectionReason.value = option;
  isRejectionDropdownOpen.value = false;
};

// Close dropdown when clicking outside
onClickOutside(rejectionDropdownRef, () => {
  isRejectionDropdownOpen.value = false;
});
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f7f8f9;
}
</style>