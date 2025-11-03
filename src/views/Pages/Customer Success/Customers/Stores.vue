<template>
    <div class="erp_dashboard_wrapper">
        <div class="grey_bg">
            <!-- Header -->
            <PageTitle :title="dynamicTitle" class="px-6" />

            <!-- tabs -->
            <Tabs :tabs="storeTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />
        </div>
        
        <!-- contents -->
        <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
            <Datatable 
                :items="storeData" 
                :filterByDate="false" 
                :filterFields="filterFields" 
                :columns="columns" 
                pageName="Stores"
                :key="`stores-${activeTab}-${childKey}`"
            >
                <template #column="col">
                    <!-- Status Column with Pill -->
                    <span v-if="col.props?.column?.field === 'status'">
                        <Pill 
                            :type="getPillType(col.props.formattedRow[col.props.column.field])"
                            :text="col.props.formattedRow[col.props.column.field]"
                        />
                    </span>
                    <!-- Action Column -->
                    <span v-else-if="col.props?.column?.field === 'action'">
                        <!-- Rejected tab: Only eye icon -->
                        <button v-if="activeTab === 'Rejected'" 
                            @click="viewStore(col.props?.row)"
                            class="p-2 hover:bg-gray-100 rounded">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                            </svg>
                        </button>
                        <!-- Pending and Approved tabs: Dropdown menu -->
                        <TableActionDropdown v-else :rowData="col.props?.row" :wide="true">
                            <template #default="{ selectedItem, closeDropdown }">
                                <!-- View Store -->
                                <li @click="viewStore(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                                    </svg>
                                    View Store
                                </li>
                                
                                <!-- Edit (only for Pending and Approved) -->
                                <li @click="selectedItem && editStore(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#626F86"/>
                                    </svg>

                                    Edit
                                </li>
                                
                                <!-- Approve (only for Pending) -->
                                <li v-if="activeTab === 'Pending'" 
                                    @click="approveStore(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z" fill="#216E4E"/>
                                    </svg>

                                    Approve
                                </li>
                                
                                <!-- Reject (only for Pending) -->
                                <li v-if="activeTab === 'Pending'" 
                                    @click="rejectStore(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5918 12.0154L9.117 13.499C9.02179 13.5915 8.94595 13.7021 8.89392 13.8242C8.84188 13.9464 8.81469 14.0776 8.81393 14.2104C8.81317 14.3432 8.83885 14.4747 8.88948 14.5975C8.9401 14.7202 9.01466 14.8316 9.10881 14.9252C9.20295 15.0189 9.31479 15.0928 9.43781 15.1427C9.56083 15.1927 9.69256 15.2176 9.82531 15.2161C9.95807 15.2146 10.0892 15.1866 10.211 15.1339C10.3329 15.0812 10.443 15.0047 10.535 14.909L12.0027 13.4325L13.442 14.878C13.6291 15.0661 13.8833 15.1721 14.1485 15.1727C14.4138 15.1734 14.6685 15.0686 14.8565 14.8815C15.0445 14.6944 15.1505 14.4403 15.1512 14.175C15.1519 13.9097 15.0471 13.6551 14.86 13.467L13.4127 12.0141L14.895 10.523C15.0767 10.3339 15.1768 10.081 15.1738 9.81874C15.1709 9.55651 15.065 9.30595 14.879 9.12104C14.6931 8.93612 14.4419 8.83166 14.1797 8.83016C13.9174 8.82865 13.6651 8.93022 13.477 9.11298L12.0015 10.5973L10.5 9.09002C10.3118 8.90742 10.0594 8.80606 9.79717 8.80776C9.53495 8.80947 9.28389 8.9141 9.09807 9.09913C8.91225 9.28416 8.80655 9.53478 8.80373 9.79699C8.80091 10.0592 8.90121 10.312 9.083 10.501L10.5918 12.0154Z" fill="#C9372C"/>
                                    </svg>

                                    Reject
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

    <!-- Edit Store Modal -->
    <SideBarModal 
        :isOpen="isEditStoreModalOpen" 
        @update:isOpen="isEditStoreModalOpen = $event"
        width="medium"
    >
        <template #header>
            <div class="flex items-center gap-2">
                <span>Edit Store</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#44546F"/>
                </svg>
                <span class="text-sm font-medium text-gray-600">{{ editStoreForm.storeName?.toUpperCase() || 'STORE' }}</span>
            </div>
        </template>

        <template #default="{ closeModal }">
            <div class="bg-gray-50 p-6 m-4 space-y-6">
                <!-- Store Information Section -->
                <div>
                    <div class="border-b border-gray-300 pb-2 mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Store Information</h3>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                            <input 
                                v-model="editStoreForm.storeName"
                                type="text" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter a store name"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                            <input 
                                v-model="editStoreForm.storeAddress"
                                type="text" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter a store address"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <SelectField
                                v-model="editStoreForm.state"
                                :options="stateOptions"
                                placeholder="Select a state"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">LGA</label>
                            <SelectField
                                v-model="editStoreForm.lga"
                                :options="lgaOptions"
                                placeholder="Select a LGA"
                            />
                        </div>
                    </div>
                </div>

                <!-- Store Images and Licenses Section (2x2 Grid) -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Store Images Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Store Images</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center items-center justify-center flex flex-col aspect-square bg-white">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1772 12.6208L12.5799 15.2384C12.3281 15.4921 12.1868 15.835 12.1868 16.1924C12.1868 16.5499 12.3281 16.8928 12.5799 17.1465C12.7036 17.2716 12.8509 17.371 13.0132 17.4388C13.1756 17.5066 13.3498 17.5416 13.5258 17.5416C13.7017 17.5416 13.8759 17.5066 14.0383 17.4388C14.2007 17.371 14.348 17.2716 14.4717 17.1465L16.2185 15.3847L18.0277 17.2088C18.1513 17.334 18.2985 17.4335 18.4608 17.5014C18.6231 17.5694 18.7973 17.6044 18.9733 17.6045C19.1493 17.6047 19.3235 17.5699 19.4859 17.5022C19.6483 17.4344 19.7957 17.3352 19.9195 17.2101C20.1704 16.9563 20.3112 16.6139 20.3115 16.257C20.3117 15.9002 20.1714 15.5576 19.9208 15.3034L17.2599 12.6222C17.1239 12.4841 16.9619 12.3745 16.7831 12.2996C16.6044 12.2247 16.4126 12.186 16.2188 12.1859C16.025 12.1858 15.8332 12.2242 15.6543 12.2988C15.4755 12.3735 15.3133 12.4829 15.1772 12.6208Z" fill="#44546F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8955 13.5511L14.8969 27.0739C14.8969 27.8281 15.5035 28.4389 16.251 28.4375C16.9999 28.4375 17.6052 27.8281 17.6052 27.0739L17.6038 13.5498C17.6038 12.7982 16.9972 12.1875 16.2497 12.1875C15.5022 12.1875 14.8942 12.7982 14.8955 13.5511Z" fill="#44546F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7491 7.42219C10.4012 7.36527 10.0493 7.33674 9.69686 7.33688C5.89842 7.33823 2.70801 10.3187 2.70801 14.2174C2.70801 18.1567 5.9377 21.6667 9.61426 21.6667H13.5156V18.9678H9.61426C7.3704 18.9678 5.39603 16.7158 5.39603 14.2174C5.39603 11.8097 7.3853 10.0371 9.59936 10.0371H9.61561C10.1424 10.0371 10.5446 10.1061 10.9292 10.2402L11.1594 10.3255C11.9786 10.6614 12.3443 9.9924 12.3443 9.9924L12.5474 9.63083C13.5359 7.80677 15.5279 6.7925 17.5795 6.76135C18.9404 6.7749 20.2499 7.28305 21.2638 8.19101C22.2776 9.09897 22.9266 10.3447 23.0896 11.6959L23.1519 12.1564C23.1519 12.1564 23.248 12.8673 24.0524 12.8673C24.07 12.8673 24.0686 12.8741 24.0835 12.8741H24.4275C25.9658 12.8741 27.1033 14.1727 27.1033 15.7964C27.1033 17.4308 25.7668 18.9678 24.3002 18.9678H18.9323V21.6667H24.3002C27.2252 21.6667 29.7913 18.8974 29.7913 15.7964C29.7913 13.0894 28.0147 10.836 25.542 10.2795C24.5846 6.61375 21.4077 4.11531 17.5713 4.0625C14.8969 4.09094 12.2887 5.2826 10.7491 7.42219Z" fill="#44546F"/>
                            </svg>
                            <p class="text-sm text-gray-500 mt-2">or <span class="text-blue-600 cursor-pointer" @click="triggerImageFileInput">browse</span></p>
                            <p class="text-xs text-gray-400 mt-1">Drag and drop your image here, Supports: JPG, PNG (max 5mb)</p>
                        </div>
                        <input 
                            ref="imageFileInput"
                            type="file" 
                            accept="image/*" 
                            multiple
                            class="hidden" 
                            @change="handleImageFileSelect"
                        />
                        <!-- Uploaded Images List -->
                        <div v-if="editStoreForm.storeImages.length > 0" class="mt-4 space-y-2">
                            <div 
                                v-for="(image, index) in editStoreForm.storeImages" 
                                :key="index"
                                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <img :src="image.thumbnail || image.url" alt="Preview" class="w-12 h-12 object-cover rounded" />
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">{{ image.name }}</p>
                                    <p class="text-xs text-gray-500">JPEG Image</p>
                                </div>
                                <button 
                                    @click="removeStoreImage(index)"
                                    class="p-1 hover:bg-gray-200 rounded"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="#626F86" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Store Licenses Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Store Licenses</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center items-center justify-center flex flex-col aspect-square bg-white">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1772 12.6208L12.5799 15.2384C12.3281 15.4921 12.1868 15.835 12.1868 16.1924C12.1868 16.5499 12.3281 16.8928 12.5799 17.1465C12.7036 17.2716 12.8509 17.371 13.0132 17.4388C13.1756 17.5066 13.3498 17.5416 13.5258 17.5416C13.7017 17.5416 13.8759 17.5066 14.0383 17.4388C14.2007 17.371 14.348 17.2716 14.4717 17.1465L16.2185 15.3847L18.0277 17.2088C18.1513 17.334 18.2985 17.4335 18.4608 17.5014C18.6231 17.5694 18.7973 17.6044 18.9733 17.6045C19.1493 17.6047 19.3235 17.5699 19.4859 17.5022C19.6483 17.4344 19.7957 17.3352 19.9195 17.2101C20.1704 16.9563 20.3112 16.6139 20.3115 16.257C20.3117 15.9002 20.1714 15.5576 19.9208 15.3034L17.2599 12.6222C17.1239 12.4841 16.9619 12.3745 16.7831 12.2996C16.6044 12.2247 16.4126 12.186 16.2188 12.1859C16.025 12.1858 15.8332 12.2242 15.6543 12.2988C15.4755 12.3735 15.3133 12.4829 15.1772 12.6208Z" fill="#44546F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8955 13.5511L14.8969 27.0739C14.8969 27.8281 15.5035 28.4389 16.251 28.4375C16.9999 28.4375 17.6052 27.8281 17.6052 27.0739L17.6038 13.5498C17.6038 12.7982 16.9972 12.1875 16.2497 12.1875C15.5022 12.1875 14.8942 12.7982 14.8955 13.5511Z" fill="#44546F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7491 7.42219C10.4012 7.36527 10.0493 7.33674 9.69686 7.33688C5.89842 7.33823 2.70801 10.3187 2.70801 14.2174C2.70801 18.1567 5.9377 21.6667 9.61426 21.6667H13.5156V18.9678H9.61426C7.3704 18.9678 5.39603 16.7158 5.39603 14.2174C5.39603 11.8097 7.3853 10.0371 9.59936 10.0371H9.61561C10.1424 10.0371 10.5446 10.1061 10.9292 10.2402L11.1594 10.3255C11.9786 10.6614 12.3443 9.9924 12.3443 9.9924L12.5474 9.63083C13.5359 7.80677 15.5279 6.7925 17.5795 6.76135C18.9404 6.7749 20.2499 7.28305 21.2638 8.19101C22.2776 9.09897 22.9266 10.3447 23.0896 11.6959L23.1519 12.1564C23.1519 12.1564 23.248 12.8673 24.0524 12.8673C24.07 12.8673 24.0686 12.8741 24.0835 12.8741H24.4275C25.9658 12.8741 27.1033 14.1727 27.1033 15.7964C27.1033 17.4308 25.7668 18.9678 24.3002 18.9678H18.9323V21.6667H24.3002C27.2252 21.6667 29.7913 18.8974 29.7913 15.7964C29.7913 13.0894 28.0147 10.836 25.542 10.2795C24.5846 6.61375 21.4077 4.11531 17.5713 4.0625C14.8969 4.09094 12.2887 5.2826 10.7491 7.42219Z" fill="#44546F"/>
                            </svg>
                            <p class="text-sm text-gray-500 mt-2">or <span class="text-blue-600 cursor-pointer" @click="triggerLicenseFileInput">browse</span></p>
                            <p class="text-xs text-gray-400 mt-1">Drag and drop your image here, Supports: JPG, PNG (max 5mb)</p>
                        </div>
                        <input 
                            ref="licenseFileInput"
                            type="file" 
                            accept="image/*" 
                            multiple
                            class="hidden" 
                            @change="handleLicenseFileSelect"
                        />
                        <!-- Uploaded Licenses List -->
                        <div v-if="editStoreForm.storeLicenses.length > 0" class="mt-4 space-y-2">
                            <div 
                                v-for="(license, index) in editStoreForm.storeLicenses" 
                                :key="index"
                                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <img :src="license.thumbnail || license.url" alt="Preview" class="w-12 h-12 object-cover rounded" />
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-900">{{ license.name }}</p>
                                    <p class="text-xs text-gray-500">JPEG Image</p>
                                </div>
                                <button 
                                    @click="removeStoreLicense(index)"
                                    class="p-1 hover:bg-gray-200 rounded"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="#626F86" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer="{ closeModal }">
            <div class="flex justify-end gap-3">
                <Button type="gray-btn" :onClick="closeEditStoreModal" classStyle="px-4 py-2">
                    Cancel
                </Button>
                <Button type="blue-btn" :onClick="updateStore" classStyle="px-4 py-2">
                    Update
                </Button>
            </div>
        </template>
    </SideBarModal>

    <!-- Store Details Modal -->
    <SideBarModal 
        :isOpen="isStoreModalOpen" 
        @update:isOpen="isStoreModalOpen = $event"
        width="large"
    >
        <template #header>
            <div class="flex items-center gap-2">
                <span>Store Details -</span>
                <span class="text-sm font-medium text-gray-600">{{ selectedStore?.storeName?.toUpperCase() }}</span>
            </div>
        </template>

        <template #default="{ closeModal }">
            <div class="p-6">
                <!-- Store Profile Section -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <div class="flex items-center gap-4">
                        <!-- Store Icon -->
                        <div class="flex items-center justify-center bg-[#DCDFE4] p-2 w-12 h-12">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11H6V16H4V11ZM4.556 3.888C4.801 3.398 5.45 3 6.006 3H17.993C18.549 3 19.199 3.398 19.443 3.888L21 7H3L4.556 3.888ZM3 7H21V8H3V7ZM18 11H20V16H18V11ZM3 8C3.14 9.128 4.094 10 5.25 10C6.406 10 7.36 9.128 7.5 8H3ZM7.5 8C7.64 9.128 8.594 10 9.75 10C10.906 10 11.86 9.128 12 8H7.5ZM12 8C12.14 9.128 13.094 10 14.25 10C15.406 10 16.36 9.128 16.5 8H12ZM16.5 8C16.64 9.128 17.594 10 18.75 10C19.906 10 20.86 9.128 21 8H16.5ZM4 16H20V18.995C20.0013 19.5253 19.792 20.0343 19.4181 20.4103C19.0442 20.7863 18.5363 20.9984 18.006 21H5.994C5.73133 20.9996 5.47131 20.9474 5.22885 20.8464C4.98639 20.7453 4.76624 20.5975 4.58101 20.4112C4.39579 20.225 4.24912 20.004 4.14943 19.761C4.04973 19.518 3.99895 19.2577 4 18.995V16Z" fill="#44546F"/>
                        </svg>

                        </div>
                        
                        <!-- Store Info -->
                        <div class="flex-1">
                            <h3 class="font-normal text-[#44546F]">{{ selectedStore?.storeName }}</h3>
                            <div class="flex items-center gap-4 mt-1">
                                <div class="flex items-center gap-1 text-sm text-gray-600">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.83268 1.66663C4.91221 1.66663 4.16602 2.41282 4.16602 3.33329V16.6666C4.16602 17.5871 4.91221 18.3333 5.83268 18.3333H14.166C15.0865 18.3333 15.8327 17.5871 15.8327 16.6666V3.33329C15.8327 2.41282 15.0865 1.66663 14.166 1.66663H5.83268ZM14.166 3.33329H5.83268V14.1666H14.166V3.33329ZM11.666 15.8333H8.33268V16.6666H11.666V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
</svg>


                                    {{ selectedStore?.phone }}
                                </div>
                                <div class="flex items-center gap-1 text-sm text-gray-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <rect x="1" y="1" width="22" height="22" rx="11" stroke="white" stroke-width="2"/>
                                            <circle cx="12" cy="12" r="10" fill="url(#pattern0_13296_101878)"/>
                                            <defs>
                                            <pattern id="pattern0_13296_101878" patternContentUnits="objectBoundingBox" width="1" height="1">
                                            <use xlink:href="#image0_13296_101878" transform="scale(0.0078125)"/>
                                            </pattern>
                                            <image id="image0_13296_101878" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAV+SURBVHgB7Z0/aBVZFMaPu4qbNLsYMSwh7sK6uzYRIhhEEQstBEURG4ld7CRgZylWgtimVRv/gYooCpFYKJoUsYiYxj9pTEhhiKKIRiudb56johZPncmc757vB48JkfB87/7uuXfu3HvOgr79h9+ZCMsvJkIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYKz0ALQ2rLYOjvarbvrP1u65Pf8Z/yuteW3/N9fz72xp89eZNe3Njn9xMbGH9qDiUmLwIKUN4T8v2K5re9ZlTX8vx8bu1kgxdj4IxsevZe0DEkKgIbfsWVDfi0DCHDm4pBNTc9YaiQlAMI6Gn7zxjVWBcOj43Z58JbNZsNFKiQzB8C43r93Vz7GV8X6nq48qhwdOJWMBEncBWCcP9DfW2njF+A9jhzcl8uQAvQRAI3f17vV5pu+3m35FcMCM9QRAOG4jsYvgARlTTTrglYAhOKiF9ZJ1fOOqqEVAI3v4YvH+oIHEX8USgGK2bgXGgtOnJNCSgG2Z/f63ti9c3O+DsEGnQDoaR7HXAwFVS1AVQmdAB57f8Hq7GETG1QCYKz1POPGaiTbbSGVAN0EPUwCVMjyrId5Z+WKv4wJuiHAO50dy4wJGgE6CXo/wN0A08ogjQBM99htEqB8vndLV51IgApgXGVjgEYA7Nhl4SnRbiEaAVLah+cJGgHm5t4YC1PTT4wFqgjwmkAC/B+ZhiuqhaAHE1PmHbZDJFQC3J94bN7BsTImqAQYIdiBqwhQIRhfPX/B6P1sdyt0G0IuDd4yrwzdvGNs0AmACOAxCmB+wniKmHJTqMcocOL0VWOEUgD0NE/h9hLxiWHagyFnL153EXKx6nd58LaxQn028PjpK7X2PLz3wLELxgy1AGiAus7q1/neZUKfH6COhkDYTyVJxK/dazcdMnLw8AWrhIsWLbR//u6wKsHkE0PPi5evLAWSSRGDVUJMDNE7cXqo7I2Z6O1o+NQyhiWXJxAZO/DCGcIyRIBY6PXXsxfTY95mSTZRZCECThMhTyCuzW4sbeQIfJj/feoJI5NOFPklOFvQyBS67KvIgBCPvXyT0zNUO3p+lhCpYgvQsFMfUsGKBkoWHRwJEBwJEBwJEBy3k0DM0pEFFEfCMWtnOhsIcCuJ7OKoP4A1BK/Lxu5uA9HwWMBJJRdvgddM464iAO7TkfSZrbc3Q5HbcODYeVd1B9zMAVJu/AJEtwP9e1xlEXEhAL4Y5NxNufEL8BkhgZcsIi4EqOLpnWcgATKLeqB2ARqz/bQmfM2Ah1MehoLaBWBMr1oWHvIe1i4AQ+6/qvCQU7B2Adjy6pWJhgDjyv5VNh4+u54FBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBKd2ARiqgVaFh89euwAM1UCrwkMa2toFGLo5alHxkLHUQQTwWQaualBmbthBJVQXk8C6a//MN/isXsrMuRAglfo7zeDts7q5DSy+mJRTtSPsexPdVc0gVOS4MTKWX/9sb0smdwBu985fuWEnz11zV3XEZapYpFa9m82Q1/V05eliWTOIMZSbcV8xpLVlcZ5MCTJ4yKnTDAj1Y+OPbGT0nvs6Q1QlYxAJkG7Vmwzo6ZN5JRKORv8cqpIxmDzNfigGBRqZxNvzK+SYr4xjs8+e52sXRX0hvFgriiVXNKooDNWWvYorhhFMKHEFS5f88c2/RcN++rlRRAoNi5/n8l4+k/3ueVLl45IrGlX0SNEcehwcHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQnPeNKiSCDjkSyAAAAABJRU5ErkJggg=="/>
                                            </defs>
                                    </svg>

                                    {{ selectedStore?.customerName }}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Status Pills -->
                        <div class="flex items-left gap-2 flex-col bg-white p-3 rounded-lg w-auto">
                            <h3 class="text-xs text-[#44546F]">Status:</h3>
                            <div class="flex items-center gap-2">
                                <Pill 
                                    :type="getPillType(selectedStore?.status || '')"
                                    :text="selectedStore?.status || ''"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Tabs with Edit Details Button -->
                <div class="mb-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex">
                            <button 
                                v-for="tab in ['Summary', 'Orders', 'Store Images & Licenses']" 
                                :key="tab" 
                                @click="storeModalTab = tab"
                                :class="[
                                    'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
                                    storeModalTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                ]"
                            >
                                {{ tab }}
                            </button>
                        </div>
                        <button 
                            @click="selectedStore && editStore(selectedStore)"
                            class="flex items-center gap-2 px-4 py-2 grey_btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                                </svg>
                            Edit Details
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="mt-6">
                    <!-- Summary Tab -->
                    <div v-if="storeModalTab === 'Summary'">
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <!-- Name Section -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <p class="text-sm text-gray-900">{{ selectedStore?.customerName }}</p>
                                </div>

                                <!-- Email Section -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p class="text-sm text-gray-900">{{ selectedStore?.email || '-' }}</p>
                                </div>
                            </div>

                            <!-- Phone Section -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <p class="text-sm text-gray-900">{{ selectedStore?.phone }}</p>
                                </div>
                            </div>

                            <!-- Store Information -->
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="text-sm font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">Store Information</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                                        <p class="text-sm text-gray-900">{{ selectedStore?.storeName }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                                        <p class="text-sm text-gray-900">{{ selectedStore?.storeAddress }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <p class="text-sm text-gray-900">{{ selectedStore?.state || 'Lagos State' }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">LGA</label>
                                        <p class="text-sm text-gray-900">{{ selectedStore?.lga || 'Badagry' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orders Tab -->
                    <div v-if="storeModalTab === 'Orders'">
                        <Datatable 
                            :items="orderData" 
                            :filterByDate="false" 
                            :columns="orderColumns" 
                            pageName="Store Orders"
                            :key="`store-orders-${storeModalKey}`"
                        >
                            <template #column="col">
                                <!-- Status Column with Pill -->
                                <span v-if="col.props?.column?.field === 'status'">
                                    <Pill 
                                        :type="getOrderStatusType(col.props.formattedRow[col.props.column.field])"
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

                    <!-- Store Images & Licenses Tab -->
                    <div v-if="storeModalTab === 'Store Images & Licenses'" class="flex gap-4 h-[600px]">
                        <!-- Left Side - Document Categories -->
                        <div class="w-1/3 flex flex-col border-r border-gray-200 pr-4">
                            <div class="space-y-1 overflow-y-auto flex-1">
                                <div v-for="category in documentCategories" :key="category.id">
                                    <!-- Category Header -->
                                    <div 
                                        class="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                        @click="toggleCategory(category.id)"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <!-- Closed Caret (collapsed state) -->
                                                <svg 
                                                    v-if="!category.expanded"
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="w-6 h-6"
                                                >
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2943 9.69805C10.2011 9.60614 10.1271 9.49661 10.0765 9.37584C10.026 9.25507 10 9.12546 10 8.99455C10 8.86364 10.026 8.73403 10.0765 8.61327C10.1271 8.4925 10.2011 8.38297 10.2943 8.29105C10.4833 8.10449 10.7382 7.99988 11.0038 7.99988C11.2694 7.99988 11.5243 8.10449 11.7133 8.29105L14.6783 11.2311C14.7805 11.3324 14.8616 11.453 14.917 11.5858C14.9723 11.7186 15.0008 11.8611 15.0008 12.0051C15.0008 12.149 14.9723 12.2915 14.917 12.4243C14.8616 12.5572 14.7805 12.6777 14.6783 12.7791L11.7233 15.7091C11.5342 15.8959 11.2791 16.0007 11.0133 16.0007C10.7475 16.0007 10.4924 15.8959 10.3033 15.7091C10.2101 15.6171 10.1361 15.5076 10.0855 15.3868C10.035 15.2661 10.009 15.1365 10.009 15.0056C10.009 14.8746 10.035 14.745 10.0855 14.6243C10.1361 14.5035 10.2101 14.394 10.3033 14.3021L12.6213 12.0051L10.2943 9.69805Z" fill="#44546F"/>
                                                </svg>
                                                
                                                <!-- Opened Caret (expanded state) -->
                                                <svg 
                                                    v-else
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="w-6 h-6"
                                                >
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29158 10.2929C8.10477 10.4818 8 10.7368 8 11.0024C8 11.2681 8.10477 11.523 8.29158 11.7119L11.2306 14.6769C11.4486 14.8919 11.7306 14.9989 12.0096 14.9989C12.2886 14.9989 12.5656 14.8919 12.7786 14.6769L15.7086 11.7219C15.8951 11.5329 15.9998 11.278 15.9998 11.0124C15.9998 10.7469 15.8951 10.492 15.7086 10.3029C15.6167 10.2098 15.5073 10.1358 15.3866 10.0853C15.2659 10.0347 15.1364 10.0087 15.0056 10.0087C14.8748 10.0087 14.7452 10.0347 14.6245 10.0853C14.5039 10.1358 14.3944 10.2098 14.3026 10.3029L12.0046 12.6199L9.69758 10.2929C9.60554 10.2001 9.49604 10.1264 9.37538 10.0762C9.25472 10.0259 9.1253 10 8.99458 10C8.86386 10 8.73444 10.0259 8.61378 10.0762C8.49312 10.1264 8.38362 10.2001 8.29158 10.2929Z" fill="#44546F"/>
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

                                        <div class="flex">
                                            <div class="flex items-center gap-2">
                                                <button type="button" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.4993 2C12.0952 1.99989 13.659 2.44911 15.0116 3.29623C16.3642 4.14336 17.4509 5.35417 18.1475 6.79009C18.8441 8.22602 19.1223 9.82905 18.9504 11.4157C18.7784 13.0024 18.1633 14.5086 17.1753 15.762L20.8273 19.414C21.0094 19.6026 21.1102 19.8552 21.108 20.1174C21.1057 20.3796 21.0005 20.6304 20.8151 20.8158C20.6297 21.0012 20.3789 21.1064 20.1167 21.1087C19.8545 21.111 19.6019 21.0102 19.4133 20.828L15.7613 17.176C14.6967 18.015 13.447 18.5872 12.1163 18.8449C10.7856 19.1026 9.4126 19.0384 8.11179 18.6576C6.81098 18.2768 5.6201 17.5904 4.63851 16.6557C3.65692 15.7211 2.91308 14.5652 2.46906 13.2846C2.02503 12.004 1.89368 10.6357 2.08599 9.29404C2.27829 7.95235 2.78866 6.67609 3.57451 5.57175C4.36037 4.46742 5.39893 3.56702 6.60353 2.94569C7.80814 2.32436 9.14387 2.00012 10.4993 2ZM10.4993 4C8.77537 4 7.12207 4.68482 5.90308 5.90381C4.6841 7.12279 3.99928 8.77609 3.99928 10.5C3.99928 12.2239 4.6841 13.8772 5.90308 15.0962C7.12207 16.3152 8.77537 17 10.4993 17C12.2232 17 13.8765 16.3152 15.0955 15.0962C16.3145 13.8772 16.9993 12.2239 16.9993 10.5C16.9993 8.77609 16.3145 7.12279 15.0955 5.90381C13.8765 4.68482 12.2232 4 10.4993 4ZM13.9993 9.5C14.2645 9.5 14.5188 9.60536 14.7064 9.79289C14.8939 9.98043 14.9993 10.2348 14.9993 10.5C14.9993 10.7652 14.8939 11.0196 14.7064 11.2071C14.5188 11.3946 14.2645 11.5 13.9993 11.5H6.99928C6.73406 11.5 6.47971 11.3946 6.29217 11.2071C6.10463 11.0196 5.99928 10.7652 5.99928 10.5C5.99928 10.2348 6.10463 9.98043 6.29217 9.79289C6.47971 9.60536 6.73406 9.5 6.99928 9.5H13.9993Z" fill="#44546F"/>
                                                    </svg>
                                                </button>
                                                <span class="text-xs text-gray-600">100%</span>
                                                <button type="button" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">
                                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.49928 2.06021e-08C10.0675 -0.000109149 11.6052 0.433645 12.9423 1.25327C14.2793 2.07289 15.3635 3.24643 16.0749 4.64403C16.7864 6.04163 17.0973 7.6088 16.9733 9.17214C16.8492 10.7355 16.2951 12.234 15.3723 13.502L15.1753 13.762L18.8273 17.414C19.0085 17.5935 19.1143 17.8356 19.123 18.0905C19.1316 18.3455 19.0425 18.5942 18.8738 18.7856C18.7051 18.977 18.4697 19.0967 18.2157 19.1202C17.9616 19.1437 17.7082 19.0692 17.5073 18.912L17.4133 18.828L13.7613 15.176C12.6967 16.015 11.447 16.5872 10.1163 16.8449C8.78562 17.1026 7.4126 17.0384 6.11179 16.6576C4.81098 16.2768 3.6201 15.5904 2.63851 14.6557C1.65692 13.7211 0.913084 12.5652 0.469055 11.2846C0.0250263 10.004 -0.106316 8.63574 0.0859852 7.29404C0.278287 5.95235 0.788656 4.67609 1.57451 3.57175C2.36037 2.46742 3.39893 1.56702 4.60353 0.945694C5.80814 0.324364 7.14387 0.000115493 8.49928 2.06021e-08ZM8.49928 2C6.77537 2 5.12207 2.68482 3.90308 3.90381C2.6841 5.12279 1.99928 6.77609 1.99928 8.5C1.99928 10.2239 2.6841 11.8772 3.90308 13.0962C5.12207 14.3152 6.77537 15 8.49928 15C10.2232 15 11.8765 14.3152 13.0955 13.0962C14.3145 11.8772 14.9993 10.2239 14.9993 8.5C14.9993 6.77609 14.3145 5.12279 13.0955 3.90381C11.8765 2.68482 10.2232 2 8.49928 2ZM8.49928 4C8.74421 4.00003 8.98061 4.08996 9.16365 4.25272C9.34668 4.41547 9.46362 4.63975 9.49228 4.883L9.49928 5V7.5H11.9993C12.2542 7.50028 12.4993 7.59788 12.6846 7.77285C12.87 7.94782 12.9815 8.18695 12.9964 8.44139C13.0114 8.69584 12.9286 8.94638 12.765 9.14183C12.6014 9.33729 12.3694 9.4629 12.1163 9.493L11.9993 9.5H9.49928V12C9.49899 12.2549 9.4014 12.5 9.22643 12.6854C9.05146 12.8707 8.81232 12.9822 8.55788 12.9972C8.30344 13.0121 8.0529 12.9293 7.85744 12.7657C7.66199 12.6021 7.53638 12.3701 7.50628 12.117L7.49928 12V9.5H4.99928C4.7444 9.49972 4.49924 9.40212 4.31391 9.22715C4.12857 9.05218 4.01704 8.81305 4.00211 8.55861C3.98717 8.30416 4.06995 8.05362 4.23354 7.85817C4.39713 7.66271 4.62918 7.5371 4.88228 7.507L4.99928 7.5H7.49928V5C7.49928 4.73478 7.60463 4.48043 7.79217 4.29289C7.97971 4.10536 8.23406 4 8.49928 4Z" fill="#44546F"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <button type="button" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded ml-2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                                                    <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                                                </svg>
                                            </button>
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
                </div>
            </div>
        </template>

        <template #footer="{ closeModal }">
            <div class="flex justify-end">
                <button 
                    @click="closeModal"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Close
                </button>
            </div>
        </template>
    </SideBarModal>

    <!-- Approve Store Confirmation Modal -->
    <WarningConfirmationModal
        :show="showApproveModal"
        title="Approve Store?"
        :message="approveModalMessage"
        confirmText="Approve Store"
        cancelText="Cancel"
        confirmButtonType="yellow-btn"
        @close="handleApproveCancel"
        @confirm="handleApproveConfirm"
    >
        <template #body>
            <p class="text-[#44546F] text-[14px] font-[400] mb-4">
                {{ approveModalMessage }}
            </p>
            <p class="text-[#44546F] text-[14px] font-[400]">
                Are you sure you want to proceed?
            </p>
        </template>
    </WarningConfirmationModal>

    <!-- Reject Store Confirmation Modal -->
    <WarningConfirmationModal
        :show="showRejectModal"
        title="Reject Store?"
        :message="rejectModalMessage"
        confirmText="Reject Store"
        cancelText="Cancel"
        confirmButtonType="yellow-btn"
        @close="handleRejectCancel"
        @confirm="handleRejectConfirm"
    >
        <template #body>
            <p class="text-[#44546F] text-[14px] font-[400] mb-4">
                {{ rejectModalMessage }}
            </p>
            <div class="mt-4">
                <label class="block text-sm font-medium text-[#172B4D] mb-2">Reason for rejection</label>
                <SelectField
                    v-model="rejectionReason"
                    :options="rejectionReasonOptions"
                    placeholder="Select a reason for rejecting..."
                />
            </div>
        </template>
    </WarningConfirmationModal>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Tabs from '@/views/Components/Tabs.vue'
import Pill from '@/views/Components/ui/Pill.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import Button from '@/views/Components/ui/Button.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import type { TableColumn, FilterFields, FilterField, Option } from '@/types'

// Types
interface StoreData {
    id: number
    customerName: string
    storeName: string
    phone: string
    storeAddress: string
    createdDate: string
    status: string
    email?: string
    state?: string
    lga?: string
}

interface StoreDetails extends StoreData {
    email: string
    state: string
    lga: string
}

// Tab state
const activeTab = ref('Pending')
const childKey = ref(0)

// Dynamic title based on active tab
const dynamicTitle = computed(() => {
    return `Customers / Stores / ${activeTab.value}`
})

// Modal state
const isStoreModalOpen = ref(false)
const isEditStoreModalOpen = ref(false)
const selectedStore = ref<StoreDetails | null>(null)
const storeModalTab = ref('Summary')
const storeModalKey = ref(0)
const selectedDocument = ref<any>(null)

// Edit Store Form
const editStoreForm = ref<{
    storeName: string
    storeAddress: string
    state: Option | null
    lga: Option | null
    storeImages: Array<{ name: string; url: string; thumbnail?: string }>
    storeLicenses: Array<{ name: string; url: string; thumbnail?: string }>
}>({
    storeName: '',
    storeAddress: '',
    state: null,
    lga: null,
    storeImages: [],
    storeLicenses: []
})

// File input refs
const imageFileInput = ref<HTMLInputElement | null>(null)
const licenseFileInput = ref<HTMLInputElement | null>(null)

// State and LGA options (SelectField expects { id: number, name: string } format)
const stateOptions = ref([
    { id: 1, name: 'Lagos State' },
    { id: 2, name: 'Abuja' },
    { id: 3, name: 'Kano' },
    { id: 4, name: 'Rivers' },
    { id: 5, name: 'Oyo' },
    { id: 6, name: 'Kaduna' }
])

const lgaOptions = ref([
    { id: 1, name: 'Badagry' },
    { id: 2, name: 'Ikeja' },
    { id: 3, name: 'Surulere' },
    { id: 4, name: 'Lagos Island' },
    { id: 5, name: 'Alimosho' },
    { id: 6, name: 'Lekki' }
])

// Document categories for Store Images & Licenses
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
])

// Tab configuration
const storeTabs = ref(['Pending', 'Approved', 'Rejected'])

// Mock store data
const pendingStores = ref<StoreData[]>([
    { id: 87, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 54, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 25, customerName: "Henry Christopher", storeName: "Xela pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 30, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 51, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 21, customerName: "Henry Christopher", storeName: "Xela pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 35, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 23, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 33, customerName: "Henry Christopher", storeName: "Xela pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 88, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 81, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 80, customerName: "Henry Christopher", storeName: "Xela pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
    { id: 5, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", phone: "+234 899 9999 999", storeAddress: "11 Ademola Adentokumbo", createdDate: "16/01/2025 10:39 AM", status: "Pending" },
])

const approvedStores = ref<StoreData[]>(pendingStores.value.map(store => ({ ...store, status: "Approved" })))
const rejectedStores = ref<StoreData[]>(pendingStores.value.map(store => ({ ...store, status: "Rejected" })))

// Computed store data based on active tab
const storeData = computed(() => {
    if (activeTab.value === 'Pending') return pendingStores.value
    if (activeTab.value === 'Approved') return approvedStores.value
    if (activeTab.value === 'Rejected') return rejectedStores.value
    return []
})

// Table columns
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Customer Name',
        field: 'customerName',
        sortable: true
    },
    {
        label: 'Store Name',
        field: 'storeName',
        sortable: true
    },
    {
        label: 'Phone',
        field: 'phone',
        sortable: true
    },
    {
        label: 'Store Address',
        field: 'storeAddress',
        sortable: true
    },
    {
        label: 'Created Date',
        field: 'createdDate',
        sortable: true
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false
    }
])

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
    customerName: {
        type: 'text',
        field: 'customerName',
        label: 'Customer Name',
        placeholder: 'Search by customer name'
    },
    storeName: {
        type: 'text',
        field: 'storeName',
        label: 'Store Name',
        placeholder: 'Search by store name'
    }
})

// Tab change handler
const handleTabChange = (tab: string | { name: string }, index: number) => {
    activeTab.value = typeof tab === 'string' ? tab : tab.name;
    
    // Force reactivity update for tables
    nextTick(() => {
        childKey.value += 1;
    });
};

// Get pill type for status
const getPillType = (status: string): 'success' | 'grey' | 'danger' => {
    switch (status) {
        case 'Approved':
            return 'success';
        case 'Pending':
            return 'grey';
        case 'Rejected':
            return 'danger';
        default:
            return 'grey';
    }
};

// Get pill type for order status
const getOrderStatusType = (status: string): 'success' | 'grey' | 'danger' => {
    switch (status?.toLowerCase()) {
        case 'delivered':
        case 'completed':
            return 'success';
        case 'pending':
        case 'being processed':
        case 'picked & packed':
            return 'grey';
        case 'cancelled':
        case 'rejected':
            return 'danger';
        default:
            return 'grey';
    }
};

// Mock order data for store orders
const orderData = ref([
    { id: 1, customerName: 'Janet Adeajayi', storeName: 'Emeka Pharmacy', payment: 'On Delivery', orderDate: '16/01/2025', status: 'Delivered' },
    { id: 2, customerName: 'Janet Adeajayi', storeName: 'Emeka Pharmacy', payment: 'Cheque', orderDate: '15/01/2025', status: 'Being Processed' },
    { id: 3, customerName: 'Janet Adeajayi', storeName: 'Emeka Pharmacy', payment: 'On Delivery', orderDate: '14/01/2025', status: 'Picked & Packed' },
])

// Order columns for Orders tab
const orderColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Customer Name',
        field: 'customerName',
        sortable: true
    },
    {
        label: 'Store Name',
        field: 'storeName',
        sortable: true
    },
    {
        label: 'Payment',
        field: 'payment',
        sortable: true
    },
    {
        label: 'Order Date',
        field: 'orderDate',
        sortable: true
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false
    }
])

// Action handlers
const viewStore = (store: StoreData | Record<string, any>) => {
    const storeData = store as StoreData;
    selectedStore.value = {
        ...storeData,
        email: storeData.email || 'sleeknne4u1@gmail.com',
        state: storeData.state || 'Lagos State',
        lga: storeData.lga || 'Badagry'
    };
    
    storeModalTab.value = 'Summary';
    isStoreModalOpen.value = true;
    storeModalKey.value++;
};

const editStore = (store: StoreData | Record<string, any>) => {
    const storeData = store as StoreData;
    // Find matching state and LGA options
    const stateValue = storeData.state || 'Lagos State';
    const lgaValue = storeData.lga || 'Badagry';
    
    const selectedState = stateOptions.value.find(s => s.name === stateValue) || stateOptions.value[0];
    const selectedLGA = lgaOptions.value.find(l => l.name === lgaValue) || lgaOptions.value[0];
    
    // Populate form with store data
    editStoreForm.value = {
        storeName: storeData.storeName || '',
        storeAddress: storeData.storeAddress || '',
        state: selectedState,
        lga: selectedLGA,
        storeImages: [
            { name: 'Emeka_store_1.jpg', url: '/path/to/store1.jpg', thumbnail: '/path/to/thumbnail1.jpg' },
            { name: 'Emeka_store_2.jpg', url: '/path/to/store2.jpg', thumbnail: '/path/to/thumbnail2.jpg' }
        ],
        storeLicenses: [
            { name: 'Operational_license.jpg', url: '/path/to/license1.jpg', thumbnail: '/path/to/license-thumb1.jpg' },
            { name: 'CAC_certificate.jpg', url: '/path/to/license2.jpg', thumbnail: '/path/to/license-thumb2.jpg' }
        ]
    };
    isEditStoreModalOpen.value = true;
};

const closeEditStoreModal = () => {
    isEditStoreModalOpen.value = false;
    // Reset form
    editStoreForm.value = {
        storeName: '',
        storeAddress: '',
        state: null,
        lga: null,
        storeImages: [],
        storeLicenses: []
    };
};

const updateStore = () => {
    console.log('Updating store:', editStoreForm.value);
    // TODO: Implement update functionality
    closeEditStoreModal();
};

const triggerImageFileInput = () => {
    imageFileInput.value?.click();
};

const triggerLicenseFileInput = () => {
    licenseFileInput.value?.click();
};

const handleImageFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target?.result as string;
                editStoreForm.value.storeImages.push({
                    name: file.name,
                    url: url,
                    thumbnail: url
                });
            };
            reader.readAsDataURL(file);
        });
    }
    // Reset input
    target.value = '';
};

const handleLicenseFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target?.result as string;
                editStoreForm.value.storeLicenses.push({
                    name: file.name,
                    url: url,
                    thumbnail: url
                });
            };
            reader.readAsDataURL(file);
        });
    }
    // Reset input
    target.value = '';
};

const removeStoreImage = (index: number) => {
    editStoreForm.value.storeImages.splice(index, 1);
};

const removeStoreLicense = (index: number) => {
    editStoreForm.value.storeLicenses.splice(index, 1);
};

// Approval/Rejection modal state
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const storeToApproveReject = ref<StoreData | null>(null)
const rejectionReason = ref<Option | null>(null)

const approveStore = (store: StoreData | Record<string, any>) => {
    const storeData = store as StoreData;
    storeToApproveReject.value = storeData;
    showApproveModal.value = true;
};

const rejectStore = (store: StoreData | Record<string, any>) => {
    const storeData = store as StoreData;
    storeToApproveReject.value = storeData;
    showRejectModal.value = true;
};

const handleApproveConfirm = () => {
    if (storeToApproveReject.value) {
        console.log('Approving store:', storeToApproveReject.value);
        // TODO: Implement approve functionality
        // Update the store status in the data
        const index = pendingStores.value.findIndex(s => s.id === storeToApproveReject.value!.id);
        if (index !== -1) {
            const approvedStore = { ...pendingStores.value[index], status: 'Approved' };
            pendingStores.value.splice(index, 1);
            approvedStores.value.push(approvedStore);
        }
    }
    showApproveModal.value = false;
    storeToApproveReject.value = null;
};

const handleApproveCancel = () => {
    showApproveModal.value = false;
    storeToApproveReject.value = null;
};

const handleRejectConfirm = () => {
    if (!rejectionReason.value) {
        // Don't proceed if no reason is selected
        return;
    }
    if (storeToApproveReject.value) {
        console.log('Rejecting store:', storeToApproveReject.value, 'Reason:', rejectionReason.value);
        // TODO: Implement reject functionality
        // Update the store status in the data
        const index = pendingStores.value.findIndex(s => s.id === storeToApproveReject.value!.id);
        if (index !== -1) {
            const rejectedStore = { ...pendingStores.value[index], status: 'Rejected' };
            pendingStores.value.splice(index, 1);
            rejectedStores.value.push(rejectedStore);
        }
    }
    showRejectModal.value = false;
    storeToApproveReject.value = null;
    rejectionReason.value = null;
};

const handleRejectCancel = () => {
    showRejectModal.value = false;
    storeToApproveReject.value = null;
    rejectionReason.value = null;
};

// Rejection reason options
const rejectionReasonOptions = ref([
    { id: 1, name: 'Incomplete information' },
    { id: 2, name: 'Invalid documents' },
    { id: 3, name: 'Expired documents' },
    { id: 4, name: 'Unclear documents' },
    { id: 5, name: 'Information mismatch' },
    { id: 6, name: 'Failed verification' },
    { id: 7, name: 'Other reason' }
])

// Modal messages
const approveModalMessage = computed(() => {
    if (!storeToApproveReject.value) {
        return 'You are about to approve this store. Once approved, the store will become active and eligible for operations according to your platform\'s rules (e.g., receive orders, appear in listings).';
    }
    return `You are about to approve this store "${storeToApproveReject.value.storeName}". Once approved, the store will become active and eligible for operations according to your platform's rules (e.g., receive orders, appear in listings).`;
});

const rejectModalMessage = computed(() => {
    if (!storeToApproveReject.value) {
        return 'You are about to reject this store.';
    }
    return `You're about to reject this store "${storeToApproveReject.value.storeName}". Once rejected, the store will not be activated and will remain in the rejected state. The customer needs to be notified.`;
});

// Watch for modal tab changes to trigger reactivity update
watch(storeModalTab, () => {
    nextTick(() => {
        storeModalKey.value += 1;
        // Set default document when switching to Store Images & Licenses tab
        if (storeModalTab.value === 'Store Images & Licenses' && documentCategories.value[0].documents.length > 0) {
            selectedDocument.value = documentCategories.value[0].documents[0];
        }
    });
});

// Document selection functions
const selectDocument = (document: any) => {
    selectedDocument.value = document;
};

const toggleCategory = (categoryId: string) => {
    const category = documentCategories.value.find(cat => cat.id === categoryId);
    if (category) {
        category.expanded = !category.expanded;
    }
};
</script>

<style scoped>
.grey_bg {
    background: rgba(247, 248, 249, 1);
}

.tab_contents {
    height: calc(100vh - 190px) !important;
    overflow: hidden !important;
}
</style>
