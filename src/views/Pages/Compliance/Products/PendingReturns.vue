<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Pending Product Return" class="px-6" />

      <!-- Tabs -->
      <Tabs :tabs="statusTabs" @tab-changed="handleTabChange" :defaultTab="activeTab">
        <!-- Action Buttons in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <Button type="gray-btn" :onClick="downloadReturnsReport" classStyle="px-4 py-2 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Download Returns Report
          </Button>
          <Button type="blue-btn" :onClick="createProductReturn" classStyle="px-4 py-2 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Create Product Return
          </Button>
        </div>
      </Tabs>
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
      <!-- Data Table -->
    <Datatable 
      :items="pendingReturnsData" 
      :filterByDate="true" 
      :columns="pendingReturnsColumns" 
      :key="`pendingreturns-${activeTab}-${childKey}`"
      pageName="PendingReturns" 
      @onSearch="updateSearch"
    >
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
        
        <!-- Reason -->
        <span v-else-if="col.props.column.field === 'reason'">
          <span class="text-gray-700">{{ col.props.row.reason }}</span>
        </span>
        
        <!-- Items -->
        <span v-else-if="col.props.column.field === 'items'">
          <span class="text-gray-700">{{ col.props.row.items }}</span>
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
          <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id" :noDividers="true">
            <template #default="{ selectedItem, closeDropdown }">
              <!-- View Product Return -->
              <li @click="viewProductReturn(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
                View Product Return
              </li>
              
              <!-- Change Status -->
              <li @click="changeStatus(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42556 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Change Status
              </li>
              
              <!-- Print Note -->
              <li @click="printNote(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Print Note
              </li>
              
              <!-- Delete -->
              <li @click="deleteReturn(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.51 17.6512 15.3342 17.7883C15.1585 17.9255 14.9419 18 14.719 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                </svg>
                Delete
              </li>
            </template>
          </TableActionDropdown>
        </span>
        
        <!-- Default -->
        <span v-else class="text-xs">
          {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
        </span>
      </template>
    </Datatable>
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="showOrderDetailsModal"
      :orderData="selectedReturn"
      :orderItems="returnItems"
      :orderActivities="returnActivities"
      :initialActiveTab="'details'"
      @close="showOrderDetailsModal = false"
    />

    <!-- Change Status Modal -->
    <UniversalCenteredModal 
      :show="showChangeStatusModal" 
      @close="showChangeStatusModal = false"
    >
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">Update Product Return Status</h3>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <SelectField
              v-model="selectedStatus"
              :options="statusOptions"
              placeholder="Select a status"
            />
          </div>
        </div>
      </template>
      
      <template #footer>
        <Button type="blue-btn" :onClick="updateStatus" classStyle="px-4 py-2">
          Update
        </Button>
      </template>
    </UniversalCenteredModal>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      :confirmText="'Delete Product Return'"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />

    <!-- Delete Success Modal -->
    <SuccessModal
      :show="showDeleteSuccessModal"
      :title="'Product Return Deleted'"
      :message="deleteSuccessMessage"
      @close="showDeleteSuccessModal = false"
    />

    <!-- Create Success Modal -->
    <SuccessModal
      :show="showCreateSuccessModal"
      :title="'Product Return Created'"
      :message="createSuccessMessage"
      @close="showCreateSuccessModal = false"
    />

    <!-- Create Product Return Modal -->
    <SideBarModal
      :isOpen="showCreateModal"
      :title="'Create Product Return'"
      :width="'large'"
      @close="showCreateModal = false"
    >
      <template #default>
        <div class="p-6 space-y-6">
          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Customer Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
              <SelectField
                v-model="createFormData.customer"
                :options="customerOptions"
                placeholder="Type to search for a customer"
                :searchable="true"
              />
            </div>

            <!-- Order Number Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
              <input
                v-model="createFormData.orderNumber"
                type="text"
                placeholder="Type or paste to search for order number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Reason for Return Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Return</label>
              <SelectField
                v-model="createFormData.reason"
                :options="reasonOptions"
                placeholder="Select a reason for your return"
              />
            </div>
          </div>

          <!-- Product Selection Table -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Products to Return</h3>
            <Datatable 
              :items="productSelectionData" 
              :columns="productSelectionColumns"
              :searchable="false"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              :showSearchBar="false"
              :showSortBar="false"
              pageName="ProductSelection"
            >
              <template #column="col">
                <!-- Checkbox Column -->
                <span v-if="col.props.column.field === 'selected'">
                  <input 
                    type="checkbox" 
                    v-model="col.props.row.selected"
                    class="rounded border-gray-300"
                  />
                </span>
                
                <!-- Product Name -->
                <span v-else-if="col.props.column.field === 'productName'">
                  <span class="text-sm">{{ col.props.row.productName }}</span>
                </span>
                
                <!-- Batch No -->
                <span v-else-if="col.props.column.field === 'batchNo'">
                  <span class="text-sm">{{ col.props.row.batchNo }}</span>
                </span>
                
                <!-- Quantity Supplied -->
                <span v-else-if="col.props.column.field === 'quantitySupplied'">
                  <span class="text-sm">{{ col.props.row.quantitySupplied }}</span>
                </span>
                
                <!-- Quantity to Return -->
                <span v-else-if="col.props.column.field === 'quantityToReturn'">
                  <span class="text-sm">{{ col.props.row.quantityToReturn || '-' }}</span>
                </span>
                
                <!-- Default -->
                <span v-else class="text-xs">
                  {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="() => showCreateModal = false"
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="handleCreateProductReturn"
            classStyle="px-4 py-2"
          >
            Create Product Return
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Print Return Note Modal -->
    <SideBarModal
      :isOpen="showPrintModal"
      :title="'Print Return Note'"
      :width="'medium'"
      @close="showPrintModal = false"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Print Return Note</span>
          <span class="text-sm text-gray-500">RTN-2024-{{ selectedReturn.order_no || '000000' }}</span>
        </div>
      </template>

      <template #default>
        <div class="p-6 space-y-6">
          <!-- Company Branding -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">RH</span>
            </div>
            <span class="text-blue-600 font-semibold text-lg">REMEDIAL HEALTH</span>
          </div>

          <!-- Document Title -->
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Product Return Note</h1>
          </div>

          <!-- Return Details -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Return ID:</span>
              <span class="font-medium">RTN-2024-{{ selectedReturn.order_no || '000000' }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Date:</span>
              <div class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 2V5" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.5 9.09H20.5" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.6947 14.7H15.7037" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.6947 17.7H15.7037" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.9955 14.7H12.0045" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.9955 17.7H12.0045" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.29431 14.7H8.30329" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.29431 17.7H8.30329" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="font-medium">{{ selectedReturn.date_created || '5/21/2024 - 11:13 AM' }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Customer's Name:</span>
              <span class="font-medium">{{ selectedReturn.customer_name || 'Emeka Kalu' }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Store Name:</span>
              <div class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="font-medium">{{ selectedReturn.store_name || 'Emeka Pharmacy' }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Reason:</span>
              <span class="font-medium">{{ selectedReturn.reason || 'Customer Error' }}</span>
            </div>
          </div>

          <!-- Product List Table -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Returned Products</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
                    <th class="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">Quantity Delivered</th>
                    <th class="border border-gray-300 px-4 py-2 text-right text-sm font-medium text-gray-700">Unit Price</th>
                    <th class="border border-gray-300 px-4 py-2 text-right text-sm font-medium text-gray-700">Price Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in returnItems" :key="item.id">
                    <td class="border border-gray-300 px-4 py-2 text-sm">{{ item.product_name }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center text-sm">{{ item.quantity_delivered }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right text-sm">₦{{ item.unit_price }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right text-sm">₦{{ item.price_total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Total Refund Amount -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900">Total Refund Amount</span>
              <span class="text-lg font-bold text-gray-900">₦187,000.00</span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <Button 
            type="gray-btn" 
            :onClick="() => showPrintModal = false"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="handlePrint"
            classStyle="px-4 py-2 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Print
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Toast -->
    <SuccessAlertToast 
      :isVisible="showSuccessToast" 
      :message="successMessage" 
      @close="handleToastClose" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import Tabs from '@/views/Components/Tabs.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue';
import SuccessModal from '@/views/Components/ui/SuccessModal.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import { useDebounceFn } from '@vueuse/core';
import type { TableColumn, Option } from '@/types';

const SEARCH_DEBOUNCE_DELAY = 300;

// Reactive state
const childKey = ref(111);
const activeTab = ref('New');

// Modal states
const showOrderDetailsModal = ref(false);
const showChangeStatusModal = ref(false);
const showDeleteModal = ref(false);
const showDeleteSuccessModal = ref(false);
const showPrintModal = ref(false);
const showCreateModal = ref(false);
const showCreateSuccessModal = ref(false);
const showSuccessToast = ref(false);
const successMessage = ref('');

// Selected data
const selectedReturn = ref<any>({});
const selectedStatus = ref<Option | null>(null);

// Create form data
const createFormData = ref({
  customer: null as Option | null,
  orderNumber: '',
  reason: null as Option | null
});

// Customer options
const customerOptions = ref([
  { id: 1, name: 'Emeka Kalu' },
  { id: 2, name: 'Emmanuel Aba' },
  { id: 3, name: 'Nyerhovwo Omuvwie' },
  { id: 4, name: 'Sarah Johnson' },
  { id: 5, name: 'Michael Brown' }
]);

// Reason options
const reasonOptions = ref([
  { id: 1, name: 'Customer Error' },
  { id: 2, name: 'Product Defect' },
  { id: 3, name: 'Wrong Item Delivered' },
  { id: 4, name: 'Damaged in Transit' },
  { id: 5, name: 'Expired Product' }
]);

// Product selection data
const productSelectionData = ref([
  {
    id: 1,
    productName: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batchNo: 'LW377|01/08/2024',
    quantitySupplied: 'PA007',
    quantityToReturn: '189',
    selected: false
  },
  {
    id: 2,
    productName: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batchNo: 'LW377|01/08/2024',
    quantitySupplied: 'PA007',
    quantityToReturn: '1189',
    selected: true
  },
  {
    id: 3,
    productName: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    batchNo: 'LW377|01/08/2024',
    quantitySupplied: 'PA007',
    quantityToReturn: '11',
    selected: false
  }
]);

// Computed properties for delete messages
const deleteMessage = computed(() => {
  if (selectedReturn.value?.order_no) {
    return `You are about to delete this product return "${selectedReturn.value.order_no}".`;
  }
  return 'You are about to delete this product return.';
});

const deleteSuccessMessage = computed(() => {
  if (selectedReturn.value?.order_no) {
    return `The product return "${selectedReturn.value.order_no}" has been successfully deleted from the system.`;
  }
  return 'The product return has been successfully deleted from the system.';
});

const createSuccessMessage = computed(() => {
  if (createFormData.value.orderNumber) {
    return `The product return "#${createFormData.value.orderNumber}" has been successfully added to the system.`;
  }
  return 'The product return has been successfully added to the system.';
});

// Status tabs
const statusTabs = ref([
  { name: 'New', count: 25 },
  { name: 'Approved', count: 25 },
  { name: 'At Warehouse', count: 25 },
  { name: 'Rejected', count: 25 }
]);

// Status options for the modal
const statusOptions = ref([
  { id: 1, name: 'New' },
  { id: 2, name: 'Approved' },
  { id: 3, name: 'At Warehouse' },
  { id: 4, name: 'Rejected' }
]);

// Mock data for pending returns
const pendingReturnsData = ref([
  {
    id: 87,
    order_no: '87',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN WATER 500ML: ₦474.00 (x100)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 54,
    order_no: '1656493689-254',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN WATER 500ML: ₦474.00 (x100)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 25,
    order_no: '25',
    warehouse: 'LOS-WH1',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN WATER 500ML: ₦474.00 (x100)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 30,
    order_no: '30',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.00 (x10)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 51,
    order_no: '51',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN WATER 500ML: ₦474.00 (x100)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 21,
    order_no: '21',
    warehouse: 'LOS-WH2',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.00 (x10)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 35,
    order_no: '35',
    warehouse: 'LOS-WH1',
    customer_name: 'Nyerhovwo Omuvwie',
    store_name: 'Xela pharmacy',
    reason: 'Customer Error',
    items: 'DR MEYERS CALCITONE TABLETS X 100: ₦460.00 (x20)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 23,
    order_no: '23',
    warehouse: 'LOS-WH2',
    customer_name: 'Emeka Kalu',
    store_name: 'Emeka Pharmacy',
    reason: 'Customer Error',
    items: 'UNIQUE 10% DEXTROSE IN WATER 500ML: ₦474.00 (x100)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 33,
    order_no: '33',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.00 (x10)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  },
  {
    id: 88,
    order_no: '88',
    warehouse: 'LOS-WH1',
    customer_name: 'Emmanuel Aba',
    store_name: 'Emma Bros Pharmacy',
    reason: 'Customer Error',
    items: 'CETIDYN L CAPLET 5MG 5 x 10: ₦813.00 (x10)',
    total_amount: '₦47,400.00',
    date_created: '16/01/2025'
  }
]);

// Mock data for return items in the modal
const returnItems = ref([
  {
    id: 1,
    product_name: 'UNIQUE 10% DEXTROSE IN WATER 500ML',
    sku: 'UNQ-001',
    tags: 'Controlled',
    quantity_delivered: 100,
    unit_price: '474.00',
    price_total: '47,400.00'
  },
  {
    id: 2,
    product_name: 'CETIDYN L CAPLET 5MG 5 x 10',
    sku: 'CET-001',
    tags: 'Hospital',
    quantity_delivered: 10,
    unit_price: '813.00',
    price_total: '8,130.00'
  },
  {
    id: 3,
    product_name: 'DR MEYERS CALCITONE TABLETS X 100',
    sku: 'DRM-001',
    tags: 'Cash and Carry',
    quantity_delivered: 20,
    unit_price: '460.00',
    price_total: '9,200.00'
  }
]);

// Mock data for return activities
const returnActivities = ref([
  {
    id: 1,
    action: 'Return Request Created',
    description: 'Return request was created by customer',
    user: 'Customer',
    time: '2024-01-16 09:30:00',
    details: 'Customer initiated return request for order items'
  },
  {
    id: 2,
    action: 'Return Under Review',
    description: 'Return request is being reviewed by compliance team',
    user: 'Compliance Team',
    time: '2024-01-16 10:15:00',
    details: 'Return request is currently under review for approval'
  }
]);

// Table columns
const pendingReturnsColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Warehouse', field: 'warehouse', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'Reason', field: 'reason', sortable: true },
  { label: 'Items', field: 'items', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Date Created', field: 'date_created', sortable: true },
  { label: 'Action', field: 'actions', sortable: false }
]);

// Product selection table columns
const productSelectionColumns = ref<TableColumn[]>([
  { label: '', field: 'selected', sortable: false },
  { label: 'Product Name', field: 'productName', sortable: true },
  { label: 'Batch No.', field: 'batchNo', sortable: true },
  { label: 'Quantity Supplied', field: 'quantitySupplied', sortable: true },
  { label: 'Quantity to Return', field: 'quantityToReturn', sortable: false }
]);

// Watch activeTab changes
watch(activeTab, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    childKey.value++;
  }
});

// Tab change handler
const handleTabChange = (tab: string | any) => {
  const tabName = typeof tab === 'string' ? tab : tab.name;
  activeTab.value = tabName;
  childKey.value++;
};

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
  childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

// Actions
const downloadReturnsReport = () => {
  successMessage.value = 'Returns report downloaded successfully'
  showSuccessToast.value = true
};

const createProductReturn = () => {
  // Reset form data
  createFormData.value = {
    customer: null,
    orderNumber: '',
    reason: null
  };
  
  // Reset product selection (only reset selected state, keep quantityToReturn values)
  productSelectionData.value.forEach(product => {
    product.selected = false;
  });
  
  showCreateModal.value = true;
};

const handleCreateProductReturn = () => {
  // Validate form
  if (!createFormData.value.customer || !createFormData.value.orderNumber || !createFormData.value.reason) {
    console.log('Please fill in all required fields');
    return;
  }
  
  // Check if at least one product is selected
  const selectedProducts = productSelectionData.value.filter(product => product.selected);
  if (selectedProducts.length === 0) {
    console.log('Please select at least one product to return');
    return;
  }
  
  console.log('Creating product return:', {
    formData: createFormData.value,
    selectedProducts: selectedProducts
  });
  
  // Close create modal
  showCreateModal.value = false;
  
  // Show success modal
  showCreateSuccessModal.value = true;
  
  // TODO: Implement actual API call here
  // After successful creation, you might want to:
  // 1. Add the new return to pendingReturnsData
  // 2. Update the tab counts
  // 3. Refresh the table
};

const viewProductReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  showOrderDetailsModal.value = true;
};

const changeStatus = (returnItem: any) => {
  selectedReturn.value = returnItem;
  selectedStatus.value = null; // Reset selected status
  showChangeStatusModal.value = true;
};

const updateStatus = () => {
  if (!selectedStatus.value) {
    return;
  }
  
  console.log('Updating status for:', selectedReturn.value, 'to:', selectedStatus.value.name);
  
  // Close modal and show success message
  showChangeStatusModal.value = false;
  successMessage.value = `Status updated to ${selectedStatus.value.name} successfully`;
  showSuccessToast.value = true;
  
  // Reset values
  selectedStatus.value = null;
  selectedReturn.value = {};
};

const printNote = (returnItem: any) => {
  selectedReturn.value = returnItem;
  showPrintModal.value = true;
};

const handlePrint = () => {
  console.log('Printing return note for:', selectedReturn.value);
  
  // Close the modal
  showPrintModal.value = false;
  
  // Show success message
  successMessage.value = `Print note for return ${selectedReturn.value.order_no} generated successfully`;
  showSuccessToast.value = true;
  
  // TODO: Implement actual print functionality here
  // You could use window.print() or a print library
};

const deleteReturn = (returnItem: any) => {
  selectedReturn.value = returnItem;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  console.log('Deleting return:', selectedReturn.value);
  
  // Close delete confirmation modal
  showDeleteModal.value = false;
  
  // Show success modal
  showDeleteSuccessModal.value = true;
  
  // TODO: Implement actual delete API call here
  // After successful deletion, you might want to:
  // 1. Remove the item from pendingReturnsData
  // 2. Update the tab counts
  // 3. Refresh the table
};

const handleToastClose = () => {
  showSuccessToast.value = false
  successMessage.value = ''
};
</script>

<style>
/* Reuse existing styles from other pages */
</style>