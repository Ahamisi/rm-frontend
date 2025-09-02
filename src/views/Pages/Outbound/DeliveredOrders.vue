<template>
  <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50" v-if="loading">
    <LoadingState />
  </div>
  
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Delivered Orders" />

    <!-- Initial Search Screen -->
    <div class="flex items-center justify-center min-h-[calc(100vh-190px)]" v-if="!hasSearched">
      <div class="intro_search_wrapper">
        <div class="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
              fill="#1D7AFC" />
          </svg>
          <h3>Let's Find Your Orders</h3>
        </div>
        <p class="my-4 text-center">Please search by Order Ref No, Customer Name or Store Name to load delivered orders</p>
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
          <button class="text-white special-input px-4 py-2 rounded-md" style="height: 38px;" @click="performSearch">Search</button>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="min-h-[calc(100vh-190px)]" v-else>
      <Datatable 
        :url="delivered_url" 
        :filterByDate="true" 
        :columns="deliveredColumns" 
        :key="childKey"
        pageName="DeliveredOrders" 
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
          
          <!-- Action -->
          <span v-else-if="col.props.column.field === 'actions'">
            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id" :noDividers="true">
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
                
                <!-- Fulfillment Details -->
                <li @click="viewFulfillmentDetails(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 10.005V19H7V5H12.99V7.49C12.99 7.88782 13.148 8.26936 13.4293 8.55066C13.7106 8.83196 14.0922 8.99 14.49 8.99H18.99V8.468C18.99 8.171 18.858 7.89 18.631 7.7L13.557 3.464C13.197 3.164 12.744 3 12.275 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10.005H17Z" fill="#626F86"/>
                    <path d="M15 12H9C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12Z" fill="#626F86"/>
                    <path d="M11 15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15Z" fill="#626F86"/>
                  </svg>
                  Fulfillment Details
                </li>
                
                <!-- Time Tracker -->
                <li @click="openTimeTracker(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
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
      :isOpen="isOrderDetailsModalOpen"
      :orderData="selectedOrder"
      :orderItems="orderItems"
      :orderActivities="orderActivities"
      :initialActiveTab="modalActiveTab"
      @close="isOrderDetailsModalOpen = false"
    />

    <!-- Time Tracker Modal -->
    <TimeTrackerModal
      :is-open="showTimeTrackerModal"
      :order-ref="selectedOrder.order_no || '1656493689-254'"
      :stages="timeTrackerStages"
      @close="showTimeTrackerModal = false"
    />



    <!-- Fulfillment Details Modal -->
    <SideBarModal 
      :is-open="showFulfillmentDetailsModal" 
      width="70%" 
      @close="showFulfillmentDetailsModal = false"
    >
      <template #header>
        <OrderHeader 
          title="Fulfillment Details" 
          :reference="selectedOrder.order_no || '1656493689-254'"
          titleSize="md"
        >
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.91921 0.833252C2.45712 0.833252 2.08337 1.20492 2.08337 1.66242V8.33742C2.08481 8.55804 2.17354 8.76912 2.33017 8.9245C2.4868 9.07988 2.69858 9.16692 2.91921 9.16659H7.08087C7.54296 9.16659 7.91671 8.79534 7.91671 8.33742V1.66242C7.91671 1.20742 7.54254 0.833252 7.08087 0.833252H2.91921ZM3.75004 2.49992H6.25004C6.48016 2.49992 6.66671 2.68647 6.66671 2.91659C6.66671 3.1467 6.48016 3.33325 6.25004 3.33325H3.75004C3.51992 3.33325 3.33337 3.1467 3.33337 2.91659C3.33337 2.68647 3.51992 2.49992 3.75004 2.49992ZM6.25004 3.74992H3.75004C3.51992 3.74992 3.33337 3.93647 3.33337 4.16659C3.33337 4.3967 3.51992 4.58325 3.75004 4.58325H6.25004C6.48016 4.58325 6.66671 4.3967 6.66671 4.16659C6.66671 3.93647 6.48016 3.74992 6.25004 3.74992ZM3.75004 4.99992H4.58337C4.81349 4.99992 5.00004 5.18647 5.00004 5.41659C5.00004 5.6467 4.81349 5.83325 4.58337 5.83325H3.75004C3.51992 5.83325 3.33337 5.6467 3.33337 5.41659C3.33337 5.18647 3.51992 4.99992 3.75004 4.99992Z" fill="#44546F"/>
            </svg>
          </template>
        </OrderHeader>
      </template>
      <div class="flex items-center justify-between p-4 rounded-lg mb-6 bg-[#F7F8F9] px-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#6B7280"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#6B7280"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ selectedOrder.customer_name || 'Janet Adeajayi' }}</h3>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66669C4.91416 1.66669 4.16797 2.41288 4.16797 3.33335V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33335C15.8346 2.41288 15.0884 1.66669 14.168 1.66669H5.83464ZM14.168 3.33335H5.83464V14.1667H14.168V3.33335ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31" />
                </svg>
                {{ selectedOrder.phone || '+234 809 123 4567' }}
              </span>
              <span class="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                {{ selectedOrder.store_name || 'Emeka Pharmacy' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Status Summary -->
        <div class="flex bg-white rounded-lg p-4 py-2">
           <div class="flex flex-col pr-6 border-r border-gray-200">
             <div class="text-[#626F86] text-sm mb-0">Total Request</div>
             <div class="bg-[#F7F8F9] rounded-lg px-3 py-2 inline-block w-fit">
               <span class="text-sm font-medium text-[#44546F]">{{ fulfillmentStats.totalRequest }}</span>
             </div>
           </div>
 
           <div class="flex flex-col pl-6">
             <div class="text-[#626F86] text-sm mb-0">Request Delivered</div>
             <div class="bg-[#F7F8F9] rounded-lg px-3 py-2 inline-block w-fit">
               <span class="text-sm font-medium text-[#44546F]">{{ fulfillmentStats.requestDelivered }}</span>
             </div>
           </div>
         </div>
      </div>

      <!-- Order Summary -->
      <div class="mt-8 px-6">

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-separate order_summary" style="border-spacing: 0">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left w-[30%]">Product Name</th>
                <th class="text-left w-[17.5%]">Requested Quantity</th>
                <th class="text-left w-[17.5%]">Quantity Delivered</th>
                <th class="text-left w-[17.5%]">Unit Price</th>
                <th class="text-left w-[17.5%]">Price Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in fulfillmentItems" :key="item.id" class="hover:bg-gray-50">
                <td class="w-[30%]">{{ item.name }}</td>
                <td class="w-[17.5%]">{{ item.requested_quantity }}</td>
                <td class="w-[17.5%]">{{ item.delivered_quantity }}</td>
                <td class="w-[17.5%]">₦{{ item.unit_price }}</td>
                <td class="w-[17.5%]">₦{{ item.total_price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Footer with Close button -->
      <template #footer>
        <div class="flex justify-end">
          <button 
            @click="showFulfillmentDetailsModal = false"
            class="px-4 py-2 text-sm font-medium bg-[#0C66E4] text-white rounded-md hover:bg-[#0C66E4]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Toast for Download Invoice -->
    <SuccessAlertToast 
      :isVisible="showDownloadInvoiceToast" 
      message="Invoice downloaded successfully" 
      @close="showDownloadInvoiceToast = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
// @ts-ignore
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import Activities from '@/views/Components/Activities.vue';
import TimeTrackerModal from '@/views/Components/TimeTrackerModal.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import CustomSelectDropdown from '@/views/Components/procurement/ui/CustomSelectDropdown.vue';
import OrderHeader from '@/views/Components/ui/OrderHeader.vue';
import OrderDetailsModal from '@/views/Components/ui/OrderDetailsModal.vue';
import { useDebounceFn } from '@vueuse/core';
import type { TableColumn } from '@/types';

const SEARCH_DEBOUNCE_DELAY = 300;

// Reactive state
const childKey = ref(111);
const search = ref('');
const hasSearched = ref(false);
const loading = ref(false);

// Modal states
const isOrderDetailsModalOpen = ref(false);
const showTimeTrackerModal = ref(false);
const showFulfillmentDetailsModal = ref(false);
const showDownloadInvoiceToast = ref(false);

// Selected data
const selectedOrder = ref<any>({});
const modalActiveTab = ref('details');

// Search By options
const searchByOptions = ref([
  { value: 'order', label: 'Order Ref No' },
  { value: 'customer', label: 'Customer Name' },
  { value: 'store', label: 'Store Name' }
]);

const selectedSearchBy = ref<string>('order');

// Fulfillment data
const fulfillmentStats = ref({
  totalRequest: 885,
  requestDelivered: 885,
  fulfillmentPercentage: 100
});

const fulfillmentItems = ref([
  { id: 1, name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16', requested_quantity: 20, delivered_quantity: 20, unit_price: '47,400.00', total_price: '47,400.00' },
  { id: 2, name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16', requested_quantity: 10, delivered_quantity: 10, unit_price: '47,400.00', total_price: '47,400.00' },
  { id: 3, name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16', requested_quantity: 1, delivered_quantity: 1, unit_price: '47,400.00', total_price: '47,400.00' },
  { id: 4, name: 'LUMAREAL TABLET 20/120 X 12 ()', requested_quantity: 1, delivered_quantity: 1, unit_price: '47,400.00', total_price: '47,400.00' },
  { id: 5, name: 'LUMAREAL TABLET 20/120 X 12 ()', requested_quantity: 1, delivered_quantity: 1, unit_price: '47,400.00', total_price: '47,400.00' }
]);

// Computed URL for delivered orders
const delivered_url = computed(() => {
  const params = new URLSearchParams({
    search_by: selectedSearchBy.value || 'order',
    search: search.value.trim(),
    filter: JSON.stringify({ state: 'Delivered' })
  });
  return `/outbound/orders?${params.toString()}`;
});

// Table columns
const deliveredColumns = ref<TableColumn[]>([
  { label: 'Order No', field: 'order_no', sortable: true },
  { label: 'Customer Name', field: 'customer_name', sortable: true },
  { label: 'Store Name', field: 'store_name', sortable: true },
  { label: 'State', field: 'state', sortable: true },
  { label: 'Payment', field: 'payment', sortable: true },
  { label: 'Order Date', field: 'order_date', sortable: true },
  { label: 'Delivery Date', field: 'delivery_date', sortable: true },
  { label: 'Total Amount', field: 'total_amount', sortable: true },
  { label: 'Action', field: 'actions', sortable: false }
]);

// Mock data for order details
const orderItems = ref([
  {
    id: 1,
    product_name: 'Paracetamol 500mg',
    tags: 'Controlled',
    quantity_delivered: 100,
    unit_price: 50.00,
    price_total: 5000.00
  },
  {
    id: 2,
    product_name: 'Ibuprofen 200mg',
    tags: 'Hospital',
    quantity_delivered: 50,
    unit_price: 70.00,
    price_total: 3500.00
  },
  {
    id: 3,
    product_name: 'Amoxicillin 250mg',
    tags: 'Cash and Carry',
    quantity_delivered: 75,
    unit_price: 116.67,
    price_total: 8750.00
  }
]);

const orderActivities = ref([
  {
    id: 1,
    action: 'New order assigned',
    description: 'Order assigned to John Doe',
    user: 'System',
    time: '2024-01-15 09:30:00',
    details: 'Automatic assignment based on workload'
  },
  {
    id: 2,
    action: 'New order status changed',
    description: 'Status changed from Picked & Packed to Delivered',
    user: 'John Doe',
    time: '2024-01-15 10:15:00',
    details: 'Order successfully delivered to customer'
  },
  {
    id: 3,
    action: 'Order delivered',
    description: 'Order delivered successfully',
    user: 'John Doe',
    time: '2024-01-15 11:00:00',
    details: 'Customer signature obtained'
  }
]);

// Time Tracker Stages - Department-based workflow (same as Dashboard)
const timeTrackerStages = ref([
  { id: 1, department: 'Accounting', process: 'Order Pending → Order Confirmed', time: '0 hours', color: '#E56910' },
  { id: 2, department: 'Inventory', process: 'Account Confirmed → Order Confirmed', time: '1 minute', color: '#1D7AFC' },
  { id: 3, department: 'Inventory', process: 'Order Confirmed → Being Processed', time: '1 minute', color: '#1D7AFC' },
  { id: 4, department: 'Inventory', process: 'Being Processed → Awaiting Shipment', time: '2 minutes', color: '#1D7AFC' },
  { id: 5, department: 'Logistics', process: 'Awaiting Shipment → Shipped for Delivery', time: '24 seconds', color: '#22A06B' },
  { id: 6, department: 'Logistics', process: 'Shipped for Delivery → Items Delivered', time: '2 hours', color: '#22A06B' }
]);

// Modal reference data is now handled by OrderHeader component

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

const viewOrder = (order: any) => {
  selectedOrder.value = order;
  modalActiveTab.value = 'details';
  isOrderDetailsModalOpen.value = true;
};

const downloadInvoice = (order: any) => {
  selectedOrder.value = order;
  // Simulate download action
  showDownloadInvoiceToast.value = true;
};

const viewFulfillmentDetails = (order: any) => {
  selectedOrder.value = order;
  showFulfillmentDetailsModal.value = true;
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
</script>

<style>
/* Reuse the same styles from Returned.vue */
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

.order_summary {
  border: 1px solid rgba(9, 30, 66, 0.14);
  border-radius: 8px;
}

.order_summary thead tr,
.order_summary thead tr th,
.order_summary tbody tr:not(:last-child),
.order_summary tbody tr:not(:last-child) td {
  border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.order_summary tbody tr td {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
  padding: 8px 12px;
}

.order_summary thead tr th {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(23, 43, 77, 1);
  padding: 8px 12px;
  background: rgba(247, 248, 249, 1);
}

.order_summary thead tr th:first-child {
  border-top-left-radius: 8px;
}

.order_summary thead tr th:last-child {
  border-top-right-radius: 8px;
}

.order_total {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
  background: rgba(247, 248, 249, 1);
  padding: 16px 0;
}

/* Fulfillment Modal Styles */
.fulfillment_summary {
  background: rgba(247, 248, 249, 1);
  border-radius: 8px;
  padding: 16px;
}

.user_detail_summary {
  align-items: flex-start;
}

.user_image {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
}

.user_contact h6 {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: rgba(23, 43, 77, 1);
}

.phone_number {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
}

.status_summary {
  border-left: 1px solid rgba(9, 30, 66, 0.14);
  padding-left: 16px;
}

.total_count h6 {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: rgba(68, 84, 111, 1);
  margin-bottom: 4px;
}

.count_value {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: rgba(23, 43, 77, 1);
}
</style>
