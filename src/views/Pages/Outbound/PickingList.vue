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
      <button @click="goBack" class="text-[#44546F] hover:text-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z" fill="#44546F"/>
        </svg>
      </button>
      
      <!-- Center Title -->
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        <h1 class="text-sm text-[#172B4D]">Picking List</h1>
        <div class="flex items-center gap-2 text-sm text-[#44546F]">
          <div class="p-[5px] bg-[#F7F8F9] rounded-[4px]">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41884 0.833336C2.95676 0.833336 2.58301 1.205 2.58301 1.6625V8.3375C2.58444 8.55812 2.67317 8.7692 2.8298 8.92458C2.98643 9.07996 3.19821 9.167 3.41884 9.16667H7.58051C8.04259 9.16667 8.41634 8.79542 8.41634 8.3375V1.6625C8.41634 1.2075 8.04217 0.833336 7.58051 0.833336H3.41884ZM4.24967 2.5H6.74967C6.97979 2.5 7.16634 2.68655 7.16634 2.91667C7.16634 3.14679 6.97979 3.33334 6.74967 3.33334H4.24967C4.01956 3.33334 3.83301 3.14679 3.83301 2.91667C3.83301 2.68655 4.01956 2.5 4.24967 2.5ZM6.74967 3.75H4.24967C4.01956 3.75 3.83301 3.93655 3.83301 4.16667C3.83301 4.39679 4.01956 4.58334 4.24967 4.58334H6.74967C6.97979 4.58334 7.16634 4.39679 7.16634 4.16667C7.16634 3.93655 6.97979 3.75 6.74967 3.75ZM4.24967 5H5.08301C5.31313 5 5.49967 5.18655 5.49967 5.41667C5.49967 5.64679 5.31313 5.83334 5.08301 5.83334H4.24967C4.01956 5.83334 3.83301 5.64679 3.83301 5.41667C3.83301 5.18655 4.01956 5 4.24967 5Z" fill="#44546F"/>
            </svg>
          </div>
          <span>REF: {{ orderRef }}</span>
        </div>
      </div>
      
      <!-- Confirm Buttons (Far Right) -->
      <div class="flex items-center gap-3">
        <button 
          @click="confirmPickingList"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Confirm Picking List
        </button>
        <button 
          @click="confirmPickingListAndCheckOut"
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
          <h3 class="text-sm font-medium text-[#44546F] mb-4">Seller</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9997 8H9.66634V9.33333H10.9997M10.9997 5.33333H9.66634V6.66667H10.9997M12.333 10.6667H6.99967V9.33333H8.33301V8H6.99967V6.66667H8.33301V5.33333H6.99967V4H12.333M5.66634 2.66667H4.33301V1.33333H5.66634M5.66634 5.33333H4.33301V4H5.66634M5.66634 8H4.33301V6.66667H5.66634M5.66634 10.6667H4.33301V9.33333H5.66634M2.99967 2.66667H1.66634V1.33333H2.99967M2.99967 5.33333H1.66634V4H2.99967M2.99967 8H1.66634V6.66667H2.99967M2.99967 10.6667H1.66634V9.33333H2.99967M6.99967 2.66667V0H0.333008V12H13.6663V2.66667H6.99967Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span class="">Remedial Health</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66634 1.33333C3.92996 1.33333 3.33301 1.93029 3.33301 2.66667V13.3333C3.33301 14.0697 3.92996 14.6667 4.66634 14.6667H11.333C12.0694 14.6667 12.6663 14.0697 12.6663 13.3333V2.66667C12.6663 1.93029 12.0694 1.33333 11.333 1.33333H4.66634ZM11.333 2.66667H4.66634V11.3333H11.333V2.66667ZM9.33301 12.6667H6.66634V13.3333H9.33301V12.6667Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>+234 801 234 5678</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 4.66667V11.3333H12.6667V4.66667H3.33333ZM12.6667 3.33333C13.4 3.33333 14 3.93333 14 4.66667V11.3333C14 12.0667 13.4 12.6667 12.6667 12.6667H3.33333C2.6 12.6667 2 12.0667 2 11.3333V4.66667C2 3.93333 2.6 3.33333 3.33333 3.33333H12.6667Z" fill="#091E42" fill-opacity="0.31"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66533 4.33333H2.08267C2.182 4.62667 2.34867 4.90267 2.58267 5.13667L6.504 9.05733C6.69698 9.25048 6.92614 9.40371 7.17837 9.50825C7.4306 9.61279 7.70096 9.6666 7.974 9.6666C8.24704 9.6666 8.5174 9.61279 8.76963 9.50825C9.02186 9.40371 9.25102 9.25048 9.444 9.05733L13.3653 5.13667C13.5987 4.90267 13.7653 4.62667 13.8647 4.33333H12.2827L8.50133 8.11467C8.43206 8.18399 8.3498 8.23898 8.25926 8.2765C8.16872 8.31402 8.07167 8.33333 7.97367 8.33333C7.87566 8.33333 7.77862 8.31402 7.68808 8.2765C7.59754 8.23898 7.51528 8.18399 7.446 8.11467L3.66533 4.33333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>info@remedialhealth.com</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C6.48 14 4 8.20933 4 6C4 4.93913 4.42143 3.92172 5.17157 3.17157C5.92172 2.42143 6.93913 2 8 2C9.06087 2 10.0783 2.42143 10.8284 3.17157C11.5786 3.92172 12 4.93913 12 6C12 8.20933 9.52 14 8 14ZM8 8C8.25494 8 8.50738 7.94979 8.74292 7.85223C8.97845 7.75466 9.19246 7.61167 9.37273 7.4314C9.553 7.25113 9.696 7.03712 9.79356 6.80158C9.89112 6.56605 9.94133 6.31361 9.94133 6.05867C9.94133 5.80373 9.89112 5.55128 9.79356 5.31575C9.696 5.08022 9.553 4.86621 9.37273 4.68594C9.19246 4.50567 8.97845 4.36267 8.74292 4.26511C8.50738 4.16755 8.25494 4.11733 8 4.11733C7.48513 4.11733 6.99134 4.32187 6.62727 4.68594C6.2632 5.05001 6.05867 5.54379 6.05867 6.05867C6.05867 6.57354 6.2632 7.06733 6.62727 7.4314C6.99134 7.79547 7.48513 8 8 8Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>

              <span>4, Road 56, Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <!-- Buyer Info (2 columns) -->
        <div class="col-span-2">
          <h3 class="text-sm font-medium text-[#44546F] mb-4">Buyer</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6663 8C14.6663 11.6819 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.6819 1.33301 8C1.33301 4.3181 4.31778 1.33333 7.99967 1.33333C11.6816 1.33333 14.6663 4.3181 14.6663 8ZM9.99967 6C9.99967 7.10457 9.10424 8 7.99967 8C6.8951 8 5.99967 7.10457 5.99967 6C5.99967 4.89543 6.8951 4 7.99967 4C9.10424 4 9.99967 4.89543 9.99967 6ZM7.99967 13.3333C6.7876 13.3352 5.61138 12.9223 4.66634 12.1633V10C4.66634 9.26333 5.25767 8.66667 5.99967 8.66667H9.99967C10.7363 8.66667 11.333 9.25667 11.333 10V12.1633C10.4197 12.8953 9.26101 13.3333 7.99967 13.3333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>

              <span class=" text-[#44546F]">Janet Adeajayi</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66634 1.33333C3.92996 1.33333 3.33301 1.93029 3.33301 2.66667V13.3333C3.33301 14.0697 3.92996 14.6667 4.66634 14.6667H11.333C12.0694 14.6667 12.6663 14.0697 12.6663 13.3333V2.66667C12.6663 1.93029 12.0694 1.33333 11.333 1.33333H4.66634ZM11.333 2.66667H4.66634V11.3333H11.333V2.66667ZM9.33301 12.6667H6.66634V13.3333H9.33301V12.6667Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
              <span>+234 801 234 5678</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66667 7.33333H4V10.6667H2.66667V7.33333ZM3.03733 2.592C3.20067 2.26533 3.63333 2 4.004 2H11.9953C12.366 2 12.7993 2.26533 12.962 2.592L14 4.66667H2L3.03733 2.592ZM2 4.66667H14V5.33333H2V4.66667ZM12 7.33333H13.3333V10.6667H12V7.33333ZM2 5.33333C2.09333 6.08533 2.72933 6.66667 3.5 6.66667C4.27067 6.66667 4.90667 6.08533 5 5.33333H2ZM5 5.33333C5.09333 6.08533 5.72933 6.66667 6.5 6.66667C7.27067 6.66667 7.90667 6.08533 8 5.33333H5ZM8 5.33333C8.09333 6.08533 8.72933 6.66667 9.5 6.66667C10.2707 6.66667 10.9067 6.08533 11 5.33333H8ZM11 5.33333C11.0933 6.08533 11.7293 6.66667 12.5 6.66667C13.2707 6.66667 13.9067 6.08533 14 5.33333H11ZM2.66667 10.6667H13.3333V12.6633C13.3342 13.0168 13.1947 13.3562 12.9454 13.6069C12.6961 13.8575 12.3575 13.9989 12.004 14H3.996C3.82089 13.9997 3.64754 13.9649 3.4859 13.8976C3.32426 13.8302 3.17749 13.7316 3.05401 13.6075C2.93052 13.4833 2.83275 13.336 2.76628 13.174C2.69982 13.012 2.66596 12.8384 2.66667 12.6633V10.6667Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>Emeka Pharmacy</span>
            </div>
            <div class="flex items-start gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C6.48 14 4 8.20933 4 6C4 4.93913 4.42143 3.92172 5.17157 3.17157C5.92172 2.42143 6.93913 2 8 2C9.06087 2 10.0783 2.42143 10.8284 3.17157C11.5786 3.92172 12 4.93913 12 6C12 8.20933 9.52 14 8 14ZM8 8C8.25494 8 8.50738 7.94979 8.74292 7.85223C8.97845 7.75466 9.19246 7.61167 9.37273 7.4314C9.553 7.25113 9.696 7.03712 9.79356 6.80158C9.89112 6.56605 9.94133 6.31361 9.94133 6.05867C9.94133 5.80373 9.89112 5.55128 9.79356 5.31575C9.696 5.08022 9.553 4.86621 9.37273 4.68594C9.19246 4.50567 8.97845 4.36267 8.74292 4.26511C8.50738 4.16755 8.25494 4.11733 8 4.11733C7.48513 4.11733 6.99134 4.32187 6.62727 4.68594C6.2632 5.05001 6.05867 5.54379 6.05867 6.05867C6.05867 6.57354 6.2632 7.06733 6.62727 7.4314C6.99134 7.79547 7.48513 8 8 8Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>4, Road 56, Lagos, Nigeria</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 4.66667V11.3333H12.6667V4.66667H3.33333ZM12.6667 3.33334C13.4 3.33334 14 3.93334 14 4.66667V11.3333C14 12.0667 13.4 12.6667 12.6667 12.6667H3.33333C2.6 12.6667 2 12.0667 2 11.3333V4.66667C2 3.93334 2.6 3.33334 3.33333 3.33334H12.6667Z" fill="#091E42" fill-opacity="0.31"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66533 4.33334H2.08267C2.182 4.62667 2.34867 4.90267 2.58267 5.13667L6.504 9.05734C6.69698 9.25049 6.92614 9.40371 7.17837 9.50825C7.4306 9.61279 7.70096 9.6666 7.974 9.6666C8.24704 9.6666 8.5174 9.61279 8.76963 9.50825C9.02186 9.40371 9.25102 9.25049 9.444 9.05734L13.3653 5.13667C13.5987 4.90267 13.7653 4.62667 13.8647 4.33334H12.2827L8.50133 8.11467C8.43206 8.18399 8.3498 8.23898 8.25926 8.2765C8.16872 8.31402 8.07167 8.33333 7.97367 8.33333C7.87566 8.33333 7.77862 8.31402 7.68808 8.2765C7.59754 8.23898 7.51528 8.18399 7.446 8.11467L3.66533 4.33334Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>email@example.com</span>
            </div>
          </div>
        </div>

        <!-- Order Info (2 columns) -->
        <div class="col-span-2">
          <h3 class="text-sm font-medium text-[#44546F] mb-4">Order</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67034 1.33333C3.93101 1.33333 3.33301 1.928 3.33301 2.66V13.34C3.3353 13.693 3.47727 14.0307 3.72788 14.2793C3.97849 14.5279 4.31734 14.6672 4.67034 14.6667H11.329C12.0683 14.6667 12.6663 14.0727 12.6663 13.34V2.66C12.6663 1.932 12.0677 1.33333 11.329 1.33333H4.67034ZM5.99967 4H9.99967C10.3679 4 10.6663 4.29848 10.6663 4.66667C10.6663 5.03486 10.3679 5.33333 9.99967 5.33333H5.99967C5.63148 5.33333 5.33301 5.03486 5.33301 4.66667C5.33301 4.29848 5.63148 4 5.99967 4ZM9.99967 6H5.99967C5.63148 6 5.33301 6.29848 5.33301 6.66667C5.33301 7.03486 5.63148 7.33333 5.99967 7.33333H9.99967C10.3679 7.33333 10.6663 7.03486 10.6663 6.66667C10.6663 6.29848 10.3679 6 9.99967 6ZM5.99967 8H7.33301C7.7012 8 7.99967 8.29848 7.99967 8.66667C7.99967 9.03486 7.7012 9.33333 7.33301 9.33333H5.99967C5.63148 9.33333 5.33301 9.03486 5.33301 8.66667C5.33301 8.29848 5.63148 8 5.99967 8Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>

              <span class="">REF: {{ orderRef }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33 3.33333H12.67C13.4047 3.33333 14 3.93 14 4.66267V12.6707C14 12.8453 13.9656 13.0182 13.8987 13.1795C13.8319 13.3409 13.7339 13.4874 13.6104 13.6109C13.4869 13.7343 13.3403 13.8322 13.1789 13.899C13.0176 13.9658 12.8446 14.0001 12.67 14H3.33C2.97738 14 2.63919 13.86 2.38978 13.6107C2.14038 13.3614 2.00018 13.0233 2 12.6707V4.66267C2 3.92867 2.59467 3.33333 3.33 3.33333ZM3.33333 6V12C3.33333 12.1768 3.40357 12.3464 3.5286 12.4714C3.65362 12.5964 3.82319 12.6667 4 12.6667H12C12.1768 12.6667 12.3464 12.5964 12.4714 12.4714C12.5964 12.3464 12.6667 12.1768 12.6667 12V6H3.33333ZM4 2.66667C4 2.48986 4.07024 2.32029 4.19526 2.19526C4.32029 2.07024 4.48986 2 4.66667 2C4.84348 2 5.01305 2.07024 5.13807 2.19526C5.2631 2.32029 5.33333 2.48986 5.33333 2.66667V3.33333H4V2.66667ZM10.6667 2.66667C10.6667 2.48986 10.7369 2.32029 10.8619 2.19526C10.987 2.07024 11.1565 2 11.3333 2C11.5101 2 11.6797 2.07024 11.8047 2.19526C11.9298 2.32029 12 2.48986 12 2.66667V3.33333H10.6667V2.66667ZM4.66667 8.66667V7.33267H6V8.66667H4.66667ZM10 8.66667V7.33267H11.3333V8.66667H10ZM7.33333 8.66667V7.33267H8.66733V8.66667H7.33333ZM4.66667 11.3333V10H6V11.3333H4.66667ZM7.33333 11.3333V10H8.66733V11.3333H7.33333ZM10 11.3333V10H11.3333V11.3333H10Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>5/21/2024</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6663 8C14.6663 11.6819 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.6819 1.33301 8C1.33301 4.3181 4.31778 1.33333 7.99967 1.33333C11.6816 1.33333 14.6663 4.3181 14.6663 8ZM9.99967 6C9.99967 7.10457 9.10424 8 7.99967 8C6.8951 8 5.99967 7.10457 5.99967 6C5.99967 4.89543 6.8951 4 7.99967 4C9.10424 4 9.99967 4.89543 9.99967 6ZM7.99967 13.3333C6.7876 13.3352 5.61138 12.9223 4.66634 12.1633V10C4.66634 9.26333 5.25767 8.66667 5.99967 8.66667H9.99967C10.7363 8.66667 11.333 9.25667 11.333 10V12.1633C10.4197 12.8953 9.26101 13.3333 7.99967 13.3333Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>Agent Oreva</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-[#44546F]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66634 1.33333C3.92996 1.33333 3.33301 1.93029 3.33301 2.66667V13.3333C3.33301 14.0697 3.92996 14.6667 4.66634 14.6667H11.333C12.0694 14.6667 12.6663 14.0697 12.6663 13.3333V2.66667C12.6663 1.93029 12.0694 1.33333 11.333 1.33333H4.66634ZM11.333 2.66667H4.66634V11.3333H11.333V2.66667ZM9.33301 12.6667H6.66634V13.3333H9.33301V12.6667Z" fill="#091E42" fill-opacity="0.31"/>
              </svg>
              <span>+234 801 234 5678</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items Section -->
      <div class="bg-[#F7F8F9] rounded-xl w-[100%] mx-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-[#44546F]">Order Items</h3>
          <input 
            type="text" 
            placeholder="Scanner" 
            disabled 
            class="px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
          />
        </div>
        
        <Datatable
          :items="pickingItems"
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
              <button class="px-3 py-1 text-sm font-medium bg-[#091E420F] rounded-md text-[#172B4D]">
                 scan shelf for {{ col.props.row.id }}
              </button>
            </span>
            
            <!-- Default -->
            <span v-else>
              {{ col.props.row[col.props.column.field] }}
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
          <h3 class="text-lg font-medium text-[#44546F]">How was this packaged?</h3>
          <button @click="showPackagingModal = false" class="text-gray-400 hover:text-[#44546F]">
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
            <h3 class="text-lg font-medium text-[#44546F]">Confirm Picking List</h3>
          </div>
          <button @click="showConfirmModal = false" class="text-gray-400 hover:text-[#44546F]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-[#44546F]">
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
            @click="handleConfirmation"
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

// Picking items data - Enhanced mock data
const pickingItems = ref([
  {
    id: 1,
    sn: 1,
    description: 'These lozenges are suitable for adults and children over 12 years old.',
    product_name: 'STREPSILS INTENSIVE HONEY & LEMON LOZENGES X 16',
    quantity: 71,
    batch_no: '4C452012',
    expiry_date: '5/21/2024',
    warehouse_shelf: 'A1-B2-C3',
    scan: 'Scan'
  },
  {
    id: 2,
    sn: 2,
    description: 'Pain relief tablets for headaches and fever.',
    product_name: 'PARACETAMOL 500MG TABLETS X 20',
    quantity: 45,
    batch_no: 'PAR2024001',
    expiry_date: '12/25/2025',
    warehouse_shelf: 'A2-C1-D2',
    scan: 'Scan'
  },
  {
    id: 3,
    sn: 3,
    description: 'Antibiotic capsules for bacterial infections.',
    product_name: 'AMOXICILLIN 250MG CAPSULES X 21',
    quantity: 30,
    batch_no: 'AMX2024002',
    expiry_date: '8/15/2025',
    warehouse_shelf: 'B1-A3-E1',
    scan: 'Scan'
  },
  {
    id: 4,
    sn: 4,
    description: 'Anti-inflammatory tablets for pain and swelling.',
    product_name: 'IBUPROFEN 400MG TABLETS X 30',
    quantity: 25,
    batch_no: 'IBU2024003',
    expiry_date: '10/30/2025',
    warehouse_shelf: 'C2-B4-F2',
    scan: 'Scan'
  },
  {
    id: 5,
    sn: 5,
    description: 'Cough syrup for dry and productive cough.',
    product_name: 'BENYLIN COUGH SYRUP 100ML',
    quantity: 18,
    batch_no: 'BEN2024004',
    expiry_date: '6/20/2025',
    warehouse_shelf: 'D1-C2-A4',
    scan: 'Scan'
  },
  {
    id: 6,
    sn: 6,
    description: 'Vitamin C tablets for immune system support.',
    product_name: 'VITAMIN C 1000MG TABLETS X 30',
    quantity: 60,
    batch_no: 'VTC2024005',
    expiry_date: '4/10/2026',
    warehouse_shelf: 'E2-D3-B1',
    scan: 'Scan'
  },
  {
    id: 7,
    sn: 7,
    description: 'Antacid tablets for heartburn and indigestion.',
    product_name: 'GAVISCON TABLETS X 24',
    quantity: 35,
    batch_no: 'GAV2024006',
    expiry_date: '9/15/2025',
    warehouse_shelf: 'F1-E2-C3',
    scan: 'Scan'
  },
  {
    id: 8,
    sn: 8,
    description: 'Antiseptic cream for cuts and wounds.',
    product_name: 'SAVLON ANTISEPTIC CREAM 30G',
    quantity: 22,
    batch_no: 'SAV2024007',
    expiry_date: '11/28/2025',
    warehouse_shelf: 'G2-F1-D4',
    scan: 'Scan'
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
  // Just confirm picking list and return to order fulfillment
  showPackagingModal.value = true
}

const confirmPickingListAndCheckOut = () => {
  // Confirm picking list and check out
  shouldCheckOut.value = true
  showPackagingModal.value = true
}

const handleConfirmation = () => {
  showConfirmModal.value = false
  
  if (shouldCheckOut.value) {
    toastMessage.value = 'Picking list confirmed and checked out successfully!'
    // Clear check-in state and navigate back
    localStorage.removeItem('isCheckedIn')
    router.push({ name: 'outbound.order-fulfillment' })
  } else {
    toastMessage.value = 'Picking list confirmed successfully!'
    // Maintain check-in state and navigate back
    localStorage.setItem('isCheckedIn', 'true')
    router.push({ name: 'outbound.order-fulfillment' })
  }
  
  showToast.value = true
}

onMounted(() => {
  // Get order ref from route params if available
  if (route.params.id) {
    orderRef.value = route.params.id as string
  }
  
  // Debug: Log the picking items
  console.log('🔧 PickingList mounted - pickingItems length:', pickingItems.value.length);
})
</script>
