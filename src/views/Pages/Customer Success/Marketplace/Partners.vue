<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="Marketplace / Partners" class="px-6" />
    </div>
    
    <!-- contents -->
    <div class="px-6 mt-0 bg-white tab_contents h-[calc(100vh-190px)] flex flex-col">
      <Datatable
        :items="partnersData"
        :columns="columns"
        :pageName="'marketplace-partners'"
        :searchable="true"
        :filterByDate="true"
        :showActions="true"
        :showPagination="true"
        @onSearch="handleSearch"
      >
        <!-- Header Actions Slot -->
        <template #header_actions>
          <!-- No header actions needed for now -->
        </template>

        <!-- Actions Column Slot -->
        <template #column="col">
          <!-- Action Column -->
          <span v-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props?.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View Partner -->
                <li @click="viewPartner(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
</svg>

                  View Partner
                </li>
                
                <!-- Download Loan Report -->
                <li @click="downloadLoanReport(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
</svg>

                  Download Loan Report
                </li>
                
                <!-- Download Due Loan Report -->
                <li @click="downloadDueLoanReport(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
</svg>

                  Download Due Loan Report
                </li>
              </template>
            </TableActionDropdown>
          </span>
          
          <!-- Status Column -->
          <span v-else-if="col.props?.column?.field === 'status'">
            <Pill :type="getPillType(col.props?.formattedRow?.status)" :text="col.props?.formattedRow?.status" />
          </span>
          
          <!-- Default for other columns -->
          <span v-else>
            {{ col.props?.formattedRow[col.props?.column?.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- View Partner Modal -->
    <SideBarModal
      v-if="showViewPartnerModal"
      :isOpen="showViewPartnerModal"
      width="large"
      @close="closeViewPartnerModal"
    >
      <template #header>
        <SideBarHead 
          title="Partner Details" 
          subtitle="DAVE DISTRO"
        >
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12938_88999)">
                <path d="M6.66927 1.25004C6.66927 1.13953 6.62537 1.03355 6.54723 0.955413C6.46909 0.877273 6.36311 0.833374 6.2526 0.833374H3.7526C3.6421 0.833374 3.53612 0.877273 3.45798 0.955413C3.37984 1.03355 3.33594 1.13953 3.33594 1.25004V3.33337H1.2526C1.1421 3.33337 1.03612 3.37727 0.957976 3.45541C0.879836 3.53355 0.835938 3.63953 0.835938 3.75004V6.25004C0.835938 6.36055 0.879836 6.46653 0.957976 6.54467C1.03612 6.62281 1.1421 6.66671 1.2526 6.66671H3.33594V8.75004C3.33594 8.86055 3.37984 8.96653 3.45798 9.04467C3.53612 9.12281 3.6421 9.16671 3.7526 9.16671H6.2526C6.36311 9.16671 6.46909 9.12281 6.54723 9.04467C6.62537 8.96653 6.66927 8.86055 6.66927 8.75004V6.66671H8.7526C8.86311 6.66671 8.96909 6.62281 9.04723 6.54467C9.12537 6.46653 9.16927 6.36055 9.16927 6.25004V3.75004C9.16927 3.63953 9.12537 3.53355 9.04723 3.45541C8.96909 3.37727 8.86311 3.33337 8.7526 3.33337H6.66927V1.25004Z" stroke="#44546F" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_12938_88999">
                  <rect width="10" height="10" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </template>
        </SideBarHead>
      </template>

      <!-- Partner Info Section -->
      <div class="bg-[#F7F8F9] rounded-lg  p-6 mb-6 mx-[24px] my-[16px]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <!-- Placeholder profile photo -->
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#626F86"/>
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#626F86"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-[#172B4D]">{{ selectedPartner?.partner_name }}</h3>
              <div class="flex items-center gap-1 text-sm text-[#44546F] mt-1">
                <!-- Placeholder location icon -->
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 17.5C8.1 17.5 5 10.2617 5 7.5C5 6.17392 5.52678 4.90215 6.46447 3.96447C7.40215 3.02678 8.67392 2.5 10 2.5C11.3261 2.5 12.5979 3.02678 13.5355 3.96447C14.4732 4.90215 15 6.17392 15 7.5C15 10.2617 11.9 17.5 10 17.5ZM10 10C10.3187 10 10.6342 9.93723 10.9286 9.81528C11.2231 9.69333 11.4906 9.51458 11.7159 9.28925C11.9412 9.06391 12.12 8.7964 12.2419 8.50198C12.3639 8.20756 12.4267 7.89201 12.4267 7.57333C12.4267 7.25466 12.3639 6.9391 12.2419 6.64469C12.12 6.35027 11.9412 6.08276 11.7159 5.85742C11.4906 5.63208 11.2231 5.45334 10.9286 5.33139C10.6342 5.20943 10.3187 5.14667 10 5.14667C9.35641 5.14667 8.73918 5.40233 8.28409 5.85742C7.829 6.31251 7.57333 6.92974 7.57333 7.57333C7.57333 8.21693 7.829 8.83416 8.28409 9.28925C8.73918 9.74433 9.35641 10 10 10Z" fill="#091E42" fill-opacity="0.31"/>
</svg>

                <span>{{ selectedPartner?.address || 'Chemist Road, Ajegunle Lagos, State' }}</span>
              </div>
            </div>
          </div>
          <div class="text-right bg-white px-[12px] py-[3px]">
            <p class="text-sm text-[#44546F] mb-1">Status</p>
            <Pill :type="getPillType(selectedPartner?.status)" :text="selectedPartner?.status" />
          </div>
        </div>
      </div>

      <!-- Tabs and Add User Button -->
      <div class="flex items-center justify-between mb-2 mx-[24px] border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in partnerTabs"
            :key="tab.name"
            @click="activePartnerTab = tab.name"
            :class="[
              activePartnerTab === tab.name
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
        <Button 
          type="gray-btn" 
          :onClick="openAddUserModal"
          classStyle="px-4 py-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Add User
        </Button>
      </div>

      <!-- Tab Content with Grey Background -->
      <div class="rounded-lg mx-[24px]">
        <!-- Summary Tab -->
        <div v-if="activePartnerTab === 'Summary'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Partner Name:</label>
                <p class="text-sm text-[#172B4D]">{{ selectedPartner?.partner_name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Address:</label>
                <p class="text-sm text-[#172B4D]">{{ selectedPartner?.address || 'Chemist Road, Ajegunle' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Remedial Profit Percentage (%):</label>
                <p class="text-sm text-[#172B4D]">5%</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Customer Type:</label>
                <div class="flex items-center gap-4 mt-1">
                  <label class="flex items-center">
                    <input type="radio" name="customerType" value="HMO" checked class="mr-2" />
                    <span class="text-sm text-[#172B4D]">HMO</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="customerType" value="Cash" class="mr-2" />
                    <span class="text-sm text-[#172B4D]">Cash</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Partner Type:</label>
                <p class="text-sm text-[#172B4D]">{{ selectedPartner?.partner_type }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">State:</label>
                <p class="text-sm text-[#172B4D]">{{ selectedPartner?.state }} State</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#44546F] mb-1">Date of Account Creation:</label>
                <div class="flex items-center gap-2">
                  <!-- Placeholder calendar icon -->
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2H16.005C17.107 2 18 2.895 18 3.994V16.006C18 16.2679 17.9484 16.5273 17.8481 16.7693C17.7478 17.0113 17.6009 17.2312 17.4156 17.4163C17.2304 17.6015 17.0104 17.7484 16.7684 17.8485C16.5263 17.9487 16.2669 18.0001 16.005 18H1.995C1.46607 18 0.958782 17.7899 0.584675 17.416C0.210569 17.0421 0.00026513 16.5349 0 16.006V3.994C0 2.893 0.892 2 1.995 2ZM2 6V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V6H2ZM3 1C3 0.734784 3.10536 0.48043 3.29289 0.292893C3.48043 0.105357 3.73478 0 4 0C4.26522 0 4.51957 0.105357 4.70711 0.292893C4.89464 0.48043 5 0.734784 5 1V2H3V1ZM13 1C13 0.734784 13.1054 0.48043 13.2929 0.292893C13.4804 0.105357 13.7348 0 14 0C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V2H13V1ZM4 10V7.999H6V10H4ZM12 10V7.999H14V10H12ZM8 10V7.999H10.001V10H8ZM4 14V12H6V14H4ZM8 14V12H10.001V14H8ZM12 14V12H14V14H12Z" fill="#626F86"/>
                  </svg>
                  
                  <p class="text-sm text-[#172B4D]">13/05/2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Tab -->
        <div v-else-if="activePartnerTab === 'Dashboard'" class="space-y-6">
          <!-- Filter and Report Controls -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
              <Button type="gray-btn" classStyle="px-4 py-2 border border-[#094224]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99951 13H16.9995L17.9995 11H5.99951L6.99951 13ZM3.99251 6C3.44451 6 3.20251 6.405 3.44651 6.895L3.99951 8H19.9995L20.5525 6.895C20.7995 6.4 20.5545 6 20.0065 6H3.99251ZM10.7775 17.556C10.8505 17.6861 10.9556 17.7953 11.0829 17.8731C11.2103 17.9508 11.3554 17.9945 11.5045 18H12.4945C12.7735 18 13.0995 17.8 13.2215 17.556L13.9995 16H9.99951L10.7775 17.556Z" fill="#44546F"/>
                </svg>

                Filter
              </Button>
              <div class="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z" fill="#626F86"/>
</svg>

                <span class="text-sm text-[#44546F]">This month: February, 2025</span>
              </div>
            </div>
            <Button type="gray-btn" classStyle="px-4 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Download In-Stock Report
            </Button>
          </div>

          <!-- Dashboard Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Total Batch Update Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Total Batch Update</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">2,847</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Products Added Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Total Products Added</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">1,892</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_2)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_2" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Last Batch Updated Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Last Batch Updated</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">1,456</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_3)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_3" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Order (Total Received) Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Order (Total Received)</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">46</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_4)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_4" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Order (Total Delivered) Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Order (Total Delivered)</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">20</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_5)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_5" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Order (Percentage Fulfilled) Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Order (Percentage Fulfilled)</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">21%</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_6)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_6" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Cancelled Orders Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Total Cancelled Orders</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">0</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_7)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_7" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22A06B" stop-opacity="0.2"/>
                        <stop offset="1" stop-color="#22A06B" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Cancelled Orders Value Card -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-[12px] text-[#626F86]">Total Cancelled Orders Value</h3>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-[20px] font-[500] leading-[24px] text-[#172B4D]">₦0.00</p>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52863 3.52871L3.86197 7.19471C3.73711 7.31993 3.66699 7.48955 3.66699 7.66638C3.66699 7.84321 3.73711 8.01282 3.86197 8.13804C3.92382 8.20001 3.99729 8.24917 4.07817 8.28271C4.15905 8.31625 4.24574 8.33351 4.3333 8.33351C4.42085 8.33351 4.50755 8.31625 4.58843 8.28271C4.6693 8.24917 4.74277 8.20001 4.80463 8.13804L7.3333 5.60938V12C7.3333 12.1769 7.40354 12.3464 7.52856 12.4714C7.65358 12.5965 7.82315 12.6667 7.99997 12.6667C8.17678 12.6667 8.34635 12.5965 8.47137 12.4714C8.59639 12.3464 8.66663 12.1769 8.66663 12V5.60938L11.1953 8.13804C11.2572 8.19994 11.3308 8.24903 11.4117 8.28251C11.4926 8.31599 11.5793 8.33321 11.6669 8.33318C11.7544 8.33315 11.8411 8.31587 11.922 8.28233C12.0029 8.24879 12.0764 8.19965 12.1383 8.13771C12.2002 8.07577 12.2493 8.00224 12.2828 7.92133C12.3162 7.84042 12.3335 7.75371 12.3334 7.66614C12.3334 7.57858 12.3161 7.49187 12.2826 7.41098C12.249 7.3301 12.1999 7.25661 12.138 7.19471L8.4713 3.52871C8.40956 3.46659 8.33611 3.41734 8.25521 3.38381C8.1743 3.35028 8.08754 3.33314 7.99997 3.33338C7.91239 3.33314 7.82563 3.35028 7.74472 3.38381C7.66382 3.41734 7.59037 3.46659 7.52863 3.52871Z" fill="#216E4E"/>
                      </svg>
                      <span class="text-sm font-medium text-green-600">12.95%</span>
                    </div>
                  </div>
                  <p class="text-[11px] text-[#626F86] mt-1">Compared to last month</p>
                </div>
                <div class="w-10 h-7">
                  <svg width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z" fill="url(#paint0_linear_5499_252223_8)"/>
                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#22A06B"/>
                    <defs>
                      <linearGradient id="paint0_linear_5499_252223_8" x1="21" y1="1" x2="21" y2="29" gradientUnits="userSpaceOnUse">
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

        <!-- Products Tab -->
        <div v-else-if="activePartnerTab === 'Products'" class="space-y-6">
          <Datatable
            :items="productsData"
            :columns="productsColumns"
            pageName="Partner Products"
            :searchable="true"
            :printable="false"
            :exportable="false"
            :showActions="false"
            @onSearch="handleProductsSearch"
          >
            <template #column="{ props: { row, column, formattedRow } }">
              <div v-if="column.field === 'actions'" class="flex items-center gap-2">
                <!-- Edit Button -->
                <button 
                  @click="editProduct(row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Edit Product"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                  </svg>
                </button>
                <!-- Delete Button -->
                <button 
                  @click="deleteProduct(row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Delete Product"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#44546F"/>
                  </svg>
                </button>
              </div>
              <span v-else>{{ formattedRow[column.field] }}</span>
            </template>
          </Datatable>
        </div>

        <!-- Orders Tab -->
        <div v-else-if="activePartnerTab === 'Orders'" class="space-y-6">
          <Datatable
            :items="ordersData"
            :columns="ordersColumns"
            pageName="Partner Orders"
            :searchable="true"
            :printable="false"
            :exportable="false"
            :showActions="false"
            @onSearch="handleOrdersSearch"
          >
            <template #column="{ props: { row, column, formattedRow } }">
              <div v-if="column.field === 'status'">
                <Pill 
                  :text="formattedRow[column.field]" 
                  :type="formattedRow[column.field] === 'Delivered' ? 'success' : formattedRow[column.field] === 'Cancelled' ? 'danger' : 'pending-tier'"
                />
              </div>
              <div v-else-if="column.field === 'assigned'" class="flex items-center gap-2">
                <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span class="text-sm">{{ formattedRow[column.field] }}</span>
              </div>
              <div v-else-if="column.field === 'actions'" class="flex items-center gap-2">
                <!-- Edit Button -->
                <button 
                  @click="editOrder(row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Edit Order"
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
</svg>

                </button>
                <!-- Delete Button -->
                <button 
                  @click="deleteOrder(row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Delete Order"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#44546F"/>
                  </svg>
                </button>
              </div>
              <span v-else>{{ formattedRow[column.field] }}</span>
            </template>
          </Datatable>
        </div>

        <!-- Users Tab -->
        <div v-else-if="activePartnerTab === 'Users'" class="space-y-6">
          <Datatable
            :items="usersData"
            :columns="usersColumns"
            pageName="Partner Users"
            :searchable="true"
            :printable="false"
            :exportable="false"
            :showActions="false"
            @onSearch="handleUsersSearch"
          >
            <template #column="{ props: { row, column, formattedRow } }">
              <div v-if="column.field === 'status'">
                <Pill 
                  :text="formattedRow[column.field]" 
                  :type="formattedRow[column.field] === 'Active' ? 'success' : 'danger'"
                />
              </div>
              <div v-else-if="column.field === 'actions'" class="flex items-center gap-2">
                <!-- Edit Button -->
                <button 
                  @click="editUser(row)"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Edit User"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                  </svg>
                </button>
              </div>
              <span v-else>{{ formattedRow[column.field] }}</span>
            </template>
          </Datatable>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <Button 
            type="blue-btn" 
            :onClick="closeViewPartnerModal"
            classStyle="px-6 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Add User Modal -->
    <SideBarModal
      v-if="showAddUserModal"
      :isOpen="showAddUserModal"
      width="small"
      @close="closeAddUserModal"
    >
      <template #header>
        <SideBarHead :title="isEditMode ? 'Edit User' : 'Add User'" />
      </template>

      <div class="space-y-4 px-6 mt-4">
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">User Name</label>
          <input 
            type="text" 
            v-model="newUser.name"
            placeholder="Enter user's name"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">Users Phone Number</label>
          <input 
            type="tel" 
            v-model="newUser.phone"
            placeholder="Enter user's phone number"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#44546F] mb-2">User Email</label>
          <input 
            type="email" 
            v-model="newUser.email"
            placeholder="Enter user's email address"
            class="w-full"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button 
            type="gray-btn" 
            :onClick="closeAddUserModal"
            classStyle="px-6 py-2"
          >
            Cancel
          </Button>
                 <Button 
                   type="blue-btn" 
                   :onClick="addUser"
                   classStyle="px-6 py-2"
                 >
                   {{ isEditMode ? 'Update' : 'Add' }}
                 </Button>
        </div>
      </template>
    </SideBarModal>

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
import { ref } from 'vue';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import SideBarHead from "@/views/Components/ui/SideBarHead.vue";
import Button from "@/views/Components/ui/Button.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import type { TableColumn } from '@/types';

// Table columns
const columns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'reference', label: 'Reference', sortable: false },
  { field: 'partner_name', label: 'Partner Name', sortable: true },
  { field: 'partner_type', label: 'Partner Type', sortable: true },
  { field: 'state', label: 'State', sortable: true },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
];

// Products tab columns
const productsColumns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'product_name', label: 'Product Name', sortable: true },
  { field: 'batch_no', label: 'Batch No', sortable: true },
  { field: 'quantity', label: 'Quantity', sortable: true },
  { field: 'created_date', label: 'Created Date', sortable: true },
  { field: 'price_per_pack', label: 'Price per Pack', sortable: true },
  { field: 'actions', label: 'Action', sortable: false }
];

// Orders tab columns
const ordersColumns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'reference', label: 'Reference', sortable: true },
  { field: 'customer', label: 'Customer', sortable: true },
  { field: 'total_amount', label: 'Total Amount', sortable: true },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'linked_order_id', label: 'Linked Order ID', sortable: true },
  { field: 'assigned', label: 'Assigned', sortable: true },
  { field: 'actions', label: 'Action', sortable: false }
];

// Users tab columns
const usersColumns: TableColumn[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'user_name', label: 'User Name', sortable: true },
  { field: 'email', label: 'Email', sortable: true },
  { field: 'phone', label: 'Phone', sortable: true },
  { field: 'created_date', label: 'Created Date', sortable: true },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'actions', label: 'Action', sortable: false }
];

// Mock data for partners
const partnersData = ref([
  {
    id: 87,
    reference: 'PR-86567892',
    partner_name: 'Remedial Partner',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 54,
    reference: 'PR-86567892',
    partner_name: 'Dave Distro',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 25,
    reference: 'PR-86567892',
    partner_name: 'Accupill Pharmacy',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 30,
    reference: 'PR-86567892',
    partner_name: 'Medplus Global',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 51,
    reference: 'PR-86567892',
    partner_name: 'Health Plus',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 21,
    reference: 'PR-86567892',
    partner_name: 'Wellness Pharmacy',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 35,
    reference: 'PR-86567892',
    partner_name: 'MedCare Solutions',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 23,
    reference: 'PR-86567892',
    partner_name: 'PharmaLink',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 33,
    reference: 'PR-86567892',
    partner_name: 'CareFirst',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 88,
    reference: 'PR-86567892',
    partner_name: 'MediCore',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 81,
    reference: 'PR-86567892',
    partner_name: 'HealthBridge',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 80,
    reference: 'PR-86567892',
    partner_name: 'PharmaCore',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 5,
    reference: 'PR-86567892',
    partner_name: 'MediLink',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  },
  {
    id: 55,
    reference: 'PR-86567892',
    partner_name: 'CareCore',
    partner_type: 'Distributor',
    state: 'Lagos',
    status: 'Active'
  }
]);

// Products tab data
const productsData = ref([
  {
    id: 54,
    product_name: 'LIFESIGN HYPOLANCE HYP...',
    batch_no: '1652521159-360',
    quantity: 2,
    created_date: '16/01/2025 10:39 AM',
    price_per_pack: '₦300.00'
  },
  {
    id: 54,
    product_name: 'LIFESIGN HYPOLANCE HYP...',
    batch_no: '1652521159-360',
    quantity: 2,
    created_date: '16/01/2025 10:39 AM',
    price_per_pack: '₦320.00'
  }
]);

// Orders tab data
const ordersData = ref([
  {
    id: 54,
    reference: '1652521159-360',
    customer: 'Sam Ogabaro',
    total_amount: '₦3,220.00',
    status: 'Delivered',
    linked_order_id: '1652521159-360',
    assigned: 'Esther Joel'
  },
  {
    id: 54,
    reference: '1652521159-360',
    customer: 'Kunle Ara',
    total_amount: '₦3,220.00',
    status: 'Cancelled',
    linked_order_id: '1652521159-360',
    assigned: 'Femi Babalola'
  }
]);

// Users tab data
const usersData = ref([
  {
    id: 54,
    user_name: 'Frank Rivers',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    created_date: '16/01/2025 10:39 AM',
    status: 'Active'
  },
  {
    id: 54,
    user_name: 'Khalifa Jonathan',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    created_date: '16/01/2025 10:39 AM',
    status: 'Inactive'
  }
]);

// View Partner Modal
const showViewPartnerModal = ref(false);
const selectedPartner = ref<any>(null);
const activePartnerTab = ref('Summary');

// Partner tabs
const partnerTabs = ref([
  { name: 'Summary' },
  { name: 'Dashboard' },
  { name: 'Products' },
  { name: 'Orders' },
  { name: 'Users' }
]);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');

// Add User form state
const showAddUserModal = ref(false);
const isEditMode = ref(false);
const newUser = ref({
  name: '',
  phone: '',
  email: ''
});

const handleSearch = (searchTerm: string) => {
  console.log('Searching partners:', searchTerm);
};

const getPillType = (status: string) => {
  switch (status) {
    case 'Active':
      return 'hospital';
    case 'Inactive':
      return 'controlled';
    case 'Pending':
      return 'cash-and-carry';
    default:
      return 'hospital';
  }
};

// View Partner handlers
const openViewPartnerModal = (partner: any) => {
  selectedPartner.value = partner;
  activePartnerTab.value = 'Summary';
  showViewPartnerModal.value = true;
};

const closeViewPartnerModal = () => {
  showViewPartnerModal.value = false;
  selectedPartner.value = null;
};

const openAddUserModal = () => {
  console.log('Opening Add User modal for partner:', selectedPartner.value?.partner_name);
  
  // Set add mode
  isEditMode.value = false;
  
  // Reset form
  newUser.value = {
    name: '',
    phone: '',
    email: ''
  };
  
  showAddUserModal.value = true;
};

const closeAddUserModal = () => {
  showAddUserModal.value = false;
  isEditMode.value = false;
  // Reset form
  newUser.value = {
    name: '',
    phone: '',
    email: ''
  };
};

const addUser = () => {
  if (!newUser.value.name || !newUser.value.phone || !newUser.value.email) {
    toastMessage.value = 'Please fill in all required fields';
    showToast.value = true;
    return;
  }
  
  if (isEditMode.value) {
    console.log('Updating user:', newUser.value);
    toastMessage.value = `User ${newUser.value.name} updated successfully`;
  } else {
    console.log('Adding user:', newUser.value);
    toastMessage.value = `User ${newUser.value.name} added successfully to ${selectedPartner.value?.partner_name}`;
  }
  
  showToast.value = true;
  closeAddUserModal();
};

// Products tab handlers
const handleProductsSearch = (searchTerm: string) => {
  console.log('Searching products:', searchTerm);
};

const editProduct = (product: any) => {
  console.log('Editing product:', product);
  toastMessage.value = `Edit product: ${product.product_name}`;
  showToast.value = true;
};

const deleteProduct = (product: any) => {
  console.log('Deleting product:', product);
  toastMessage.value = `Delete product: ${product.product_name}`;
  showToast.value = true;
};

// Orders tab handlers
const handleOrdersSearch = (searchTerm: string) => {
  console.log('Searching orders:', searchTerm);
};

const editOrder = (order: any) => {
  console.log('Editing order:', order);
  toastMessage.value = `Edit order: ${order.reference}`;
  showToast.value = true;
};

const deleteOrder = (order: any) => {
  console.log('Deleting order:', order);
  toastMessage.value = `Delete order: ${order.reference}`;
  showToast.value = true;
};

// Users tab handlers
const handleUsersSearch = (searchTerm: string) => {
  console.log('Searching users:', searchTerm);
};

const editUser = (user: any) => {
  console.log('Editing user:', user);
  
  // Set edit mode
  isEditMode.value = true;
  
  // Prefill the form with user data
  newUser.value = {
    name: user.user_name || '',
    phone: user.phone || '',
    email: user.email || ''
  };
  
  // Open the Add User modal (which will now show as Edit User)
  showAddUserModal.value = true;
  
  toastMessage.value = `Edit user: ${user.user_name}`;
  showToast.value = true;
};

const deleteUser = (user: any) => {
  console.log('Deleting user:', user);
  toastMessage.value = `Delete user: ${user.user_name}`;
  showToast.value = true;
};

// Action handlers
const viewPartner = (partner: any) => {
  openViewPartnerModal(partner);
};

const downloadLoanReport = (partner: any) => {
  console.log('Downloading loan report for:', partner);
  toastMessage.value = `Loan report for ${partner.partner_name} downloaded successfully`;
  showToast.value = true;
};

const downloadDueLoanReport = (partner: any) => {
  console.log('Downloading due loan report for:', partner);
  toastMessage.value = `Due loan report for ${partner.partner_name} downloaded successfully`;
  showToast.value = true;
};
</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}

.grey_bg {
  background: rgba(247, 248, 249, 1);
}

.bg-gray-light {
  background-color: #091E420F;
}

.key {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(68, 84, 111, 1);
}

.value {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}
</style>
