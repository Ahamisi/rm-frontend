<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <!-- Breadcrumbs -->
    <PageTitle title="Dashboard / Overview" class="px-6" />

    <!-- Controls and Actions -->
    <div class="px-6 py-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <button @click="toggleFilterDropdown"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.99999 13H17L18 11H5.99999L6.99999 13ZM3.99299 6C3.44499 6 3.20299 6.405 3.44699 6.895L3.99999 8H20L20.553 6.895C20.8 6.4 20.555 6 20.007 6H3.99299ZM10.778 17.556C10.8509 17.6861 10.9561 17.7953 11.0834 17.8731C11.2107 17.9508 11.3559 17.9945 11.505 18H12.495C12.774 18 13.1 17.8 13.222 17.556L14 16H9.99999L10.778 17.556Z"
                fill="#44546F" />
            </svg>
            Filter
          </button>
          <div class="flex items-center gap-1 text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5Z"
                fill="#626F86" />
            </svg>
            <span class="text-sm">This month: February, 2025</span>
          </div>
        </div>
        <Button type="blue-btn" @click="downloadProductList" classStyle="px-4 py-2">
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
              <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
            </svg>
            <span>Download Product List</span>
          </div>
        </Button>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total HMO Orders Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Total HMO Orders</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-xl text-gray-900">1,468</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.33330 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.66930 8.24917 4.74277 8.20001 4.80463 8.13804L7.33330 5.60938V12C7.33330 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.9220 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.2490 7.3301 12.1999 7.25661 12.1380 7.19471L8.47130 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.17430 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_orders)"/>
                <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_orders" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A06B" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total HMO's Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Total HMO's</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <p class="text-xl text-gray-900 mb-3">350</p>
              <div class="space-y-1 flex gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Active: 310</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Inactive: 40</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Pharmacies Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Total Pharmacies</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <p class="text-xl text-gray-900 mb-3">1,892</p>
              <div class="space-y-1 flex gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Active: 1,750</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Inactive: 142</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Average Order Lead Time Card -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-700">Average Order Lead Time</h3>
          </div>
          <div class="flex items-baseline justify-between">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-xl text-gray-900">2.5 days</p>
                <div class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.33330 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.66930 8.24917 4.74277 8.20001 4.80463 8.13804L7.33330 5.60938V12C7.33330 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.9220 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.2490 7.3301 12.1999 7.25661 12.1380 7.19471L8.47130 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.17430 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                  </svg>
                  <span class="text-sm font-medium text-green-600">12.95%</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-1">Compared to last month</p>
            </div>
            <div class="w-10 h-7">
              <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z" fill="url(#paint0_linear_leadtime)"/>
                <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B"/>
                <defs>
                  <linearGradient id="paint0_linear_leadtime" x1="20.5" y1="1" x2="20.5" y2="29" gradientUnits="userSpaceOnUse">
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
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Button from "@/views/Components/ui/Button.vue";
import { ref } from 'vue';

const isFilterDropdownOpen = ref(false);

const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

const downloadProductList = () => {
  console.log('Download product list');
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}
</style>
