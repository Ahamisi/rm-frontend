<template>
  <div class="h-full flex flex-col">
    <!-- Loading State -->
    <div v-if="loading" class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <LoadingState />
    </div>

    <!-- Datatable -->
    <div class="flex-1 flex flex-col min-h-0">
    <Datatable 
      :url="ordersUrl" 
      :filterByDate="true" 
      :searchable="true"
      :sortable="true"
      :exportable="false"
      :printable="false"
      :columns="orderColumns" 
      pageName="OutboundPickedPackedOrders"
      :filterFields="filterFields"
      :key="datatableKey"
    >
      <template #column="col">
        <!-- Order No -->
        <span v-if="col.props.column.field === 'order_no'">
          <span class="font-medium">{{ col.props.row.order_no }}</span>
        </span>
        
        <!-- Customer Name -->
        <span v-else-if="col.props.column.field === 'customer_name'">
          <span>{{ col.props.row.customer_name }}</span>
        </span>
        
        <!-- Store Name -->
        <span v-else-if="col.props.column.field === 'store_name'">
          <span class="text-gray-700">{{ col.props.row.store_name }}</span>
        </span>
        
        <!-- State -->
        <span v-else-if="col.props.column.field === 'state'">
          <span class="text-gray-700">{{ col.props.row.state }}</span>
        </span>
        
        <!-- Payment -->
        <span v-else-if="col.props.column.field === 'payment'">
          <span class="text-gray-700">{{ col.props.row.payment }}</span>
        </span>
        
        <!-- Order Date -->
        <span v-else-if="col.props.column.field === 'order_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.order_date) }}</span>
        </span>
        
        <!-- Delivery Date -->
        <span v-else-if="col.props.column.field === 'delivery_date'">
          <span class="text-gray-700">{{ formatDate(col.props.row.delivery_date) }}</span>
        </span>
        
        <!-- Total Amount -->
        <span v-else-if="col.props.column.field === 'total_amount'">
          <span class="font-medium">{{ col.props.row.total_amount }}</span>
        </span>
        
        <!-- Tags -->
        <span v-else-if="col.props.column.field === 'tags'">
          <div class="flex flex-wrap gap-1">
            <Pill 
              v-for="tag in col.props.row.tags" 
              :key="tag"
              :type="getPillType(tag)"
              :text="tag"
            />
          </div>
        </span>
        
        <!-- Assigned -->
        <span v-else-if="col.props.column.field === 'assigned'">
          <div v-if="col.props.row.assigned !== 'Unassigned'" class="flex items-center space-x-2">
            <img :src="col.props.row.assigned_avatar" :alt="col.props.row.assigned" class="w-6 h-6 rounded-full">
            <span class="text-sm">{{ col.props.row.assigned }}</span>
          </div>
          <span v-else class="text-red-600 text-sm">{{ col.props.row.assigned }}</span>
        </span>
        
        <!-- Action -->
        <span v-else-if="col.props.column.field === 'action'">
          <TableActionDropdown :rowData="col.props.row">
            <template #default="{ selectedItem, closeDropdown }">
              <!-- View Order -->
              <li @click="viewOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                </svg>
                View Order
              </li>
              
              <!-- Unassign -->
              <li @click="unassignOrder(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.99 6C20.9909 6.12978 20.9661 6.25846 20.917 6.3786C20.8679 6.49874 20.7955 6.60798 20.704 6.7L19.371 7.969L20.655 9.269C20.7934 9.38673 20.8964 9.54055 20.9526 9.71335C21.0088 9.88614 21.0159 10.0711 20.9732 10.2477C20.9305 10.4243 20.8396 10.5856 20.7107 10.7137C20.5818 10.8417 20.4199 10.9315 20.243 10.973C20.0663 11.0152 19.8814 11.0079 19.7085 10.952C19.5357 10.8961 19.3815 10.7937 19.263 10.656L17.287 8.687C17.1034 8.50291 17.0003 8.25351 17.0003 7.9935C17.0003 7.73349 17.1034 7.48409 17.287 7.3L19.322 5.272C19.463 5.13804 19.6403 5.04858 19.8319 5.01479C20.0234 4.981 20.2207 5.00437 20.399 5.082C20.764 5.242 20.996 5.604 20.99 6ZM5 14C5 12.895 5.902 12 7.009 12H14.991C16.101 12 17 12.894 17 14.006V18.446C17 21.851 5 21.851 5 18.446V14Z" fill="#626F86"/>
                  <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z" fill="#626F86"/>
                </svg>
                Unassign
              </li>
              
              <!-- Change Status -->
              <li @click="changeStatus(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6.003V8.998C8 9.26322 8.10535 9.51757 8.29289 9.70511C8.48043 9.89264 8.73478 9.998 9 9.998C9.26521 9.998 9.51957 9.89264 9.7071 9.70511C9.89464 9.51757 10 9.26322 10 8.998V5.102C10 4.494 9.507 4 8.9 4H5C4.73438 4 4.47965 4.10551 4.29183 4.29333C4.10401 4.48115 3.9985 4.73589 3.9985 5.0015C3.9985 5.26711 4.10401 5.52185 4.29183 5.70967C4.47965 5.89748 4.73438 6.003 5 6.003H8Z" fill="#626F86"/>
                  <path d="M9.428 18.018C7.351 16.989 6 14.807 6 12.37C6 10.104 7.167 8.051 9.02 6.945C9.5 6.659 9.666 6.023 9.391 5.524C9.32915 5.40677 9.24414 5.30331 9.14112 5.21991C9.03811 5.13651 8.91922 5.0749 8.79169 5.0388C8.66415 5.00271 8.53061 4.99289 8.39916 5.00994C8.26772 5.027 8.14111 5.07056 8.027 5.138C5.557 6.611 4 9.35 4 12.37C4 15.618 5.802 18.528 8.57 19.899C9.068 20.146 9.665 19.925 9.902 19.406C10.139 18.886 9.927 18.265 9.428 18.018Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 15.002V18.898C14 19.506 14.493 20 15.1 20H19C19.2656 20 19.5203 19.8945 19.7082 19.7067C19.896 19.5188 20.0015 19.2641 20.0015 18.9985C20.0015 18.7329 19.896 18.4782 19.7082 18.2903C19.5203 18.1025 19.2656 17.997 19 17.997H16V15.002C16 14.7368 15.8946 14.4824 15.7071 14.2949C15.5196 14.1074 15.2652 14.002 15 14.002C14.7348 14.002 14.4804 14.1074 14.2929 14.2949C14.1054 14.4824 14 14.7368 14 15.002Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.097 4.596C13.86 5.116 14.072 5.736 14.571 5.983C16.648 7.012 17.999 9.193 17.999 11.63C17.999 13.896 16.832 15.95 14.978 17.055C14.7456 17.1988 14.5776 17.4265 14.5087 17.6909C14.4398 17.9553 14.4753 18.2361 14.608 18.475C14.882 18.975 15.493 19.148 15.972 18.862C18.442 17.389 19.999 14.65 19.999 11.63C19.999 8.382 18.197 5.472 15.429 4.102C15.2965 4.03537 15.1503 4.00045 15.002 4C14.8098 4.00188 14.6223 4.05909 14.4618 4.16479C14.3013 4.27049 14.1746 4.4202 14.097 4.596Z" fill="#626F86"/>
                </svg>
                Change Status
              </li>
              
              <!-- Time Tracker -->
              <li @click="openTimeTracker(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.588 4 4 7.588 4 12C4 16.412 7.588 20 12 20C16.412 20 20 16.412 20 12C20 7.588 16.412 4 12 4ZM12 18.222C10.3505 18.2199 8.76911 17.5637 7.60272 16.3973C6.43633 15.2309 5.78012 13.6495 5.778 12C5.78012 10.3505 6.43633 8.76911 7.60272 7.60272C8.76911 6.43633 10.3505 5.78012 12 5.778C13.6495 5.78012 15.2309 6.43633 16.3973 7.60272C17.5637 8.76911 18.2199 10.3505 18.222 12C18.2199 13.6495 17.5637 15.2309 16.3973 16.3973C15.2309 17.5637 13.6495 18.2199 12 18.222ZM12.889 11.632V8.448C12.889 7.959 12.489 7.559 12 7.559C11.511 7.559 11.111 7.959 11.111 8.449V12.004C11.111 12.252 11.214 12.475 11.379 12.637L13.574 14.831C13.741 14.9972 13.9669 15.0904 14.2025 15.0904C14.4381 15.0904 14.664 14.9972 14.831 14.831C14.9969 14.6641 15.0899 14.4383 15.0899 14.203C15.0899 13.9677 14.9969 13.7419 14.831 13.575L12.889 11.632Z" fill="#626F86"/>
                </svg>
                Time Tracker
              </li>
              
              <!-- Activity Log -->
              <li @click="viewOrderActivities(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z" fill="#626F86"/>
                  <path d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z" fill="#626F86"/>
                  <path d="M11 15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15Z" fill="#626F86"/>
                </svg>
                Activity Log
              </li>
              
              <!-- Download Invoice -->
              <li @click="downloadInvoice(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                  <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                </svg>
                Download Invoice
              </li>
              
              <!-- Download Waybill -->
              <li @click="downloadWaybill(selectedItem); closeDropdown()" 
                  class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                  <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                </svg>
                Download Waybill
              </li>
            </template>
          </TableActionDropdown>
        </span>
        
        <!-- Default -->
        <span v-else>
          {{ col.props.row[col.props.column.field] }}
        </span>
      </template>
      </Datatable>
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="modalActiveTab"
      @close="isOrderDetailsModalOpen = false"
    />

    <!-- Time Tracker Modal -->
    <TimeTrackerModal
      :isOpen="showTimeTrackerModal"
      :orderRef="selectedOrder?.order_no || '1656493689-254'"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />



    <!-- Change Status Modal -->
    <UniversalCenteredModal :show="showChangeStatusModal" @close="showChangeStatusModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <h3 class="font-medium">Update Order Status</h3>
        </span>
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
        <div class="flex justify-end space-x-3 discard_merge_alert_footer">
          <Button type="gray-btn" :onClick="() => showChangeStatusModal = false">Cancel</Button>
          <Button type="blue-btn" :onClick="updateStatus" :disabled="!selectedStatus">Update</Button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- Success Modal for Status Update -->
    <UniversalCenteredModal :show="showStatusSuccessModal" @close="showStatusSuccessModal = false">
      <template #header>
        <span class="flex items-center gap-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h3 class="font-medium">Status Updated</h3>
        </span>
      </template>
      <template #body>
        <p class="text-gray-600">Order status has been successfully updated.</p>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <Button type="blue-btn" :onClick="() => showStatusSuccessModal = false" classStyle="px-4 py-2">OK</Button>
        </div>
      </template>
    </UniversalCenteredModal>

    <!-- Success Toast for Unassign -->
    <SuccessAlertToast 
      :isVisible="showUnassignToast" 
      message="Order unassigned successfully" 
      @close="showUnassignToast = false" 
    />

    <!-- Success Toast for Download Invoice -->
    <SuccessAlertToast 
      :isVisible="showDownloadInvoiceToast" 
      message="Invoice downloaded successfully" 
      @close="showDownloadInvoiceToast = false" 
    />

    <!-- Success Toast for Download Waybill -->
    <SuccessAlertToast 
      :isVisible="showDownloadWaybillToast" 
      message="Waybill downloaded successfully" 
      @close="showDownloadWaybillToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import Activities from '@/views/Components/Activities.vue';
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import OrderHeader from '@/views/Components/ui/OrderHeader.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import type { TableColumn, FilterFields, FilterField, Option } from '@/types';
import Button from '@/views/Components/ui/Button.vue';

// Data URL
const ordersUrl = '/outbound/orders';

// Filter fields for the datatable
const filterFields = ref([
  {
    key: 'state',
    label: 'State',
    type: 'select',
    options: [
      { value: '', label: 'All States' },
      { value: 'Picked & Packed', label: 'Picked & Packed' },
      { value: 'Delivered', label: 'Delivered' }
    ]
  },
  {
    key: 'payment',
    label: 'Payment Type',
    type: 'select',
    options: [
      { value: '', label: 'All Payment Types' },
      { value: 'Paid', label: 'Paid' },
      { value: 'Unpaid', label: 'Unpaid' },
      { value: 'Pending', label: 'Pending' }
    ]
  }
]);

// Table columns
const orderColumns = ref([
  { field: 'order_no', label: 'Order No.', sortable: true },
  { field: 'customer_name', label: 'Customer Name', sortable: true },
  { field: 'store_name', label: 'Store Name', sortable: true },
  { field: 'state', label: 'State', sortable: true },
  { field: 'payment', label: 'Payment', sortable: true },
  { field: 'order_date', label: 'Order Date', sortable: true },
  { field: 'delivery_date', label: 'Delivery Date', sortable: true },
  { field: 'total_amount', label: 'Total Amount', sortable: true },
  { field: 'tags', label: 'Tags', sortable: false },
  { field: 'assigned', label: 'Assigned', sortable: false },
  { field: 'action', label: 'Action', sortable: false }
]);

// Modal states
const isOrderDetailsModalOpen = ref(false);
const showTimeTrackerModal = ref(false);
const showChangeStatusModal = ref(false);
const showStatusSuccessModal = ref(false);
const showUnassignToast = ref(false);
const showDownloadInvoiceToast = ref(false);
const showDownloadWaybillToast = ref(false);

// Loading state
const loading = ref(false);
const datatableKey = ref(0);

// Selected data
interface Order {
  order_no?: string;
  customer_name?: string;
  customer_type?: string;
  assigned?: string;
  phone?: string;
  store_name?: string;
  order_date?: string;
  delivery_date?: string;
  delivery_address?: string;
  delivery_instructions?: string;
  total_amount?: string;
}

const selectedOrder = ref<Order | null>(null);
const selectedStatus = ref<Option | null>(null);
const modalActiveTab = ref('details');

// Status options
const statusOptions = ref<Option[]>([
  { id: 1, name: 'Picked & Packed' },
  { id: 2, name: 'Delivered' }
]);

// Order product columns for Datatable
const orderProductColumns = ref([
  { field: 'product_name', label: 'Product', sortable: false },
  { field: 'tags', label: 'Tags', sortable: false },
  { field: 'quantity_delivered', label: 'Quantity', sortable: false },
  { field: 'unit_price', label: 'Unit Price', sortable: false },
  { field: 'price_total', label: 'Total', sortable: false }
]);

// Mock data for order details
const orderItems = ref([
  { 
    id: 1, 
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16', 
    tags: 'Controlled',
    quantity_delivered: 100, 
    unit_price: 2500.00,
    price_total: 250000.00
  },
  { 
    id: 2, 
    product_name: 'PARACETAMOL 500MG TABLETS X 20', 
    tags: 'Cash and Carry',
    quantity_delivered: 50, 
    unit_price: 1200.00,
    price_total: 60000.00
  },
  { 
    id: 3, 
    product_name: 'AMOXICILLIN 250MG CAPSULES X 21', 
    tags: 'Hospital',
    quantity_delivered: 75, 
    unit_price: 3500.00,
    price_total: 262500.00
  }
]);

const orderActivities = ref([
  {
    id: 1,
    action: 'Order assigned',
    description: 'Order assigned to John Doe',
    user: 'System',
    time: '2024-01-15 09:30:00',
    details: 'Automatic assignment based on workload'
  },
  {
    id: 2,
    action: 'Status changed',
    description: 'Status changed from Being Processed to Picked & Packed',
    user: 'John Doe',
    time: '2024-01-15 10:15:00',
    details: 'Order picked and packed successfully'
  },
  {
    id: 3,
    action: 'Order updated',
    description: 'Order details updated',
    user: 'John Doe',
    time: '2024-01-15 11:00:00',
    details: 'Updated delivery address'
  }
]);

// Time Tracker Stages - Department-based workflow (same as Dashboard)
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'Order Pending → Order Confirmed', time: '0 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Account Confirmed → Order Confirmed', time: '1 minute', color: '#0C66E4' },
  { id: 3, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#0C66E4' },
  { id: 4, department: 'Inventory', process: 'Being Processed → Awaiting Shipment', time: '2 minutes', color: '#0C66E4' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 hours', color: '#22A06B' }
]);

// Computed modal title
// Modal reference data is now handled by OrderHeader component

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

// Actions
const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

const unassignOrder = (order: any) => {
  selectedOrder.value = order;
  showUnassignToast.value = true;
};

const changeStatus = (order: any) => {
  selectedOrder.value = order;
  selectedStatus.value = null;
  showChangeStatusModal.value = true;
};

const updateStatus = () => {
  showChangeStatusModal.value = false;
  showStatusSuccessModal.value = true;
  selectedStatus.value = null;
};

// Helper function for pill types
const getPillType = (tag: string): 'hospital' | 'controlled' | 'cash-and-carry' => {
  switch (tag.toLowerCase()) {
    case 'hospital':
      return 'hospital';
    case 'controlled':
      return 'controlled';
    case 'cash and carry':
      return 'cash-and-carry';
    default:
      return 'hospital';
  }
};

const openTimeTracker = (order: any) => {
  selectedOrder.value = order;
  showTimeTrackerModal.value = true;
};

const viewOrderActivities = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'activities';
  isOrderDetailsModalOpen.value = true;
};

const downloadInvoice = (order: any) => {
  selectedOrder.value = order;
  // Simulate download action
  showDownloadInvoiceToast.value = true;
};

const downloadWaybill = (order: any) => {
  selectedOrder.value = order;
  // Simulate download action
  showDownloadWaybillToast.value = true;
};
</script>

<style scoped>
.key {
  @apply text-sm font-medium text-gray-700;
}

.value {
  @apply text-sm font-medium text-[#44546F];
}

.order-summary-table {
  @apply text-[12px] text-[#172B4D];
}

.totals-section {
  background-color: #F7F8F9;
  border-top: 1px solid #091E4224;
  border-bottom: 1px solid #091E4224;
  margin: 0;
  padding: 16px 24px;
  position: fixed;
  bottom: 60px;
  width: 100%;
  z-index: 10;
  margin-top: 24px;
}

.tab_text {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
}
</style>
