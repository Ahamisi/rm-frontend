<template>
  <div class="erp_dashboard_wrapper">
    <div class="">
      <!-- Header -->
      <PageTitle title="HMO & Pharmacy / All HMOs" class="px-6" />
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="hmoData"
        :columns="hmoColumns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="filterFields"
        pageName="AllHmos"
        :key="childKey"
      >
        <template #header_actions>
          <Button 
            type="blue-btn"
            :onClick="createHmo"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                fill="white" />
            </svg>
            Create HMO
          </Button>
        </template>

        <template #column="col">
          <!-- Status Column (Pill) -->
          <span v-if="col.props?.column?.field === 'status'">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ (col.props?.formattedRow as any)?.status || 'Enabled' }}
            </span>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props.formattedRow">
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View HMO -->
                <li @click="viewHmo(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                  </svg>
                  View HMO
                </li>
                
                <!-- Edit HMO -->
                <li @click="editHmo(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                  </svg>
                  Edit HMO
                </li>
                
                <!-- Disable HMO -->
                <li @click="disableHmoFromAction(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5918 12.0154L9.117 13.499C9.02179 13.5915 8.94595 13.7021 8.89392 13.8242C8.84188 13.9464 8.81469 14.0776 8.81393 14.2104C8.81317 14.3432 8.83885 14.4747 8.88948 14.5975C8.9401 14.7202 9.01466 14.8316 9.10881 14.9252C9.20295 15.0189 9.31479 15.0928 9.43781 15.1427C9.56083 15.1927 9.69256 15.2176 9.82531 15.2161C9.95807 15.2146 10.0892 15.1866 10.211 15.1339C10.3329 15.0812 10.443 15.0047 10.535 14.909L12.0027 13.4325L13.442 14.878C13.6291 15.0661 13.8833 15.1721 14.1485 15.1727C14.4138 15.1734 14.6685 15.0686 14.8565 14.8815C15.0445 14.6944 15.1505 14.4403 15.1512 14.175C15.1519 13.9097 15.0471 13.6551 14.86 13.467L13.4127 12.0141L14.895 10.523C15.0767 10.3339 15.1768 10.081 15.1738 9.81874C15.1709 9.55651 15.065 9.30595 14.879 9.12104C14.6931 8.93612 14.4419 8.83166 14.1797 8.83016C13.9174 8.82865 13.6651 8.93022 13.477 9.11298L12.0015 10.5973L10.5 9.09002C10.3118 8.90742 10.0594 8.80606 9.79717 8.80776C9.53495 8.80947 9.28389 8.9141 9.09807 9.09913C8.91225 9.28416 8.80655 9.53478 8.80373 9.79699C8.80091 10.0592 8.90121 10.312 9.083 10.501L10.5918 12.0154Z" fill="#E56910"/>
                      </svg>
                  Disable HMO
                </li>

                <!-- Delete HMO -->
                <li @click="deleteHmoFromAction(selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#626F86"/>
                    </svg>
                  Delete
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

    <!-- View HMO Modal -->
    <SideBarModal
      :isOpen="showViewModal"
      title="HMO Details"
      width="65vw"
      @update:isOpen="showViewModal = $event"
      @close="closeViewModal"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0C66E4"/>
            <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#0C66E4"/>
          </svg>
          <span>{{ selectedHmo?.hmo_name }}</span>
        </div>
      </template>

      <template #default>
        <!-- HMO Info Card -->
        <div class="rounded-lg p-4 mx-6 mt-4 mb-6 bg-[#F7F8F9]">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4 flex-1">
              <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0C66E4"/>
                  <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#0C66E4"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-sm text-gray-900 mb-2">{{ selectedHmo?.hmo_name }}</h3>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66663C4.91416 1.66663 4.16797 2.41282 4.16797 3.33329V16.6666C4.16797 17.5871 4.91416 18.3333 5.83464 18.3333H14.168C15.0884 18.3333 15.8346 17.5871 15.8346 16.6666V3.33329C15.8346 2.41282 15.0884 1.66663 14.168 1.66663H5.83464ZM14.168 3.33329H5.83464V14.1666H14.168V3.33329ZM11.668 15.8333H8.33464V16.6666H11.668V15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                      </svg>
                    {{ selectedHmo?.phone }}
                  </div>
                  <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.16667 5.83329V14.1666H15.8333V5.83329H4.16667ZM15.8333 4.16663C16.75 4.16663 17.5 4.91663 17.5 5.83329V14.1666C17.5 15.0833 16.75 15.8333 15.8333 15.8333H4.16667C3.25 15.8333 2.5 15.0833 2.5 14.1666V5.83329C2.5 4.91663 3.25 4.16663 4.16667 4.16663H15.8333Z" fill="#091E42" fill-opacity="0.31"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58167 5.41663H2.60333C2.7275 5.78329 2.93583 6.12829 3.22833 6.42079L8.13 11.3216C8.37123 11.5631 8.65767 11.7546 8.97296 11.8853C9.28825 12.0159 9.6262 12.0832 9.9675 12.0832C10.3088 12.0832 10.6467 12.0159 10.962 11.8853C11.2773 11.7546 11.5638 11.5631 11.805 11.3216L16.7067 6.42079C16.9983 6.12829 17.2067 5.78329 17.3308 5.41663H15.3533L10.6267 10.1433C10.5401 10.2299 10.4372 10.2987 10.3241 10.3456C10.2109 10.3925 10.0896 10.4166 9.96708 10.4166C9.84458 10.4166 9.72327 10.3925 9.6101 10.3456C9.49692 10.2987 9.3941 10.2299 9.3075 10.1433L4.58167 5.41663Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedHmo?.email }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-start gap-2 bg-white p-4 rounded-lg">
              <label class="text-xs text-gray-600">Status:</label>
              <div class="flex items-center gap-2">
                <Pill :type="'success'" :text="selectedHmo?.status || 'Enabled'" />
                <Pill :type="'verified-tier'" :text="'Verified: Tier 2'" />
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs and Action Buttons -->
        <div class="flex items-center justify-between mb-6 border-b border-gray-200 px-6">
          <div class="flex">
            <button 
              v-for="tab in hmoTabs" 
              :key="tab" 
              @click="hmoModalTab = tab"
              :class="[
                'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
                hmoModalTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab }}
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative" data-dropdown-trigger>
              <button @click="toggleViewHmoDropdown" class="p-2 hover:bg-gray-100 rounded">
                <svg width="3" height="12" viewBox="0 0 3 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 6.19698 2.9612 6.39204 2.88582 6.57403C2.81044 6.75601 2.69995 6.92137 2.56066 7.06066C2.42137 7.19995 2.25601 7.31044 2.07402 7.38582C1.89204 7.4612 1.69698 7.5 1.5 7.5C1.30302 7.5 1.10796 7.4612 0.925975 7.38582C0.743986 7.31044 0.578627 7.19995 0.439339 7.06066C0.300052 6.92137 0.189562 6.75601 0.11418 6.57403C0.0387983 6.39204 -2.59528e-07 6.19698 -2.62268e-07 6C-2.67802e-07 5.60218 0.158035 5.22064 0.439339 4.93934C0.720644 4.65804 1.10217 4.5 1.5 4.5C1.89782 4.5 2.27936 4.65804 2.56066 4.93934C2.84196 5.22064 3 5.60218 3 6ZM3 10.5C3 10.697 2.9612 10.892 2.88582 11.074C2.81044 11.256 2.69995 11.4214 2.56066 11.5607C2.42137 11.6999 2.25601 11.8104 2.07403 11.8858C1.89204 11.9612 1.69698 12 1.5 12C1.30302 12 1.10796 11.9612 0.925975 11.8858C0.743986 11.8104 0.578628 11.6999 0.43934 11.5607C0.300052 11.4214 0.189563 11.256 0.114181 11.074C0.0387985 10.892 -6.28272e-08 10.697 -6.55671e-08 10.5C-7.11005e-08 10.1022 0.158035 9.72064 0.43934 9.43934C0.720644 9.15804 1.10218 9 1.5 9C1.89782 9 2.27936 9.15803 2.56066 9.43934C2.84196 9.72064 3 10.1022 3 10.5ZM3 1.5C3 1.69698 2.9612 1.89204 2.88582 2.07403C2.81044 2.25601 2.69995 2.42137 2.56066 2.56066C2.42137 2.69995 2.25601 2.81044 2.07402 2.88582C1.89204 2.9612 1.69698 3 1.5 3C1.30302 3 1.10796 2.9612 0.925974 2.88582C0.743986 2.81044 0.578627 2.69995 0.439339 2.56066C0.300051 2.42137 0.189562 2.25601 0.11418 2.07403C0.0387981 1.89204 -4.5623e-07 1.69698 -4.5897e-07 1.5C-4.64503e-07 1.10218 0.158035 0.720645 0.439339 0.439341C0.720644 0.158036 1.10217 -4.81776e-08 1.5 -6.55671e-08C1.89782 -8.29566e-08 2.27936 0.158036 2.56066 0.43934C2.84196 0.720645 3 1.10218 3 1.5Z" fill="#44546F"/>
                </svg>
              </button>
              <!-- Dropdown Menu -->
              <teleport to="body">
                <div v-if="showViewHmoDropdown" 
                     class="fixed bg-white border border-gray-200 rounded shadow-lg min-w-48"
                     :style="{ ...viewHmoDropdownStyle, zIndex: '9999999' }"
                     @click.stop>
                  <ul class="text-sm text-gray-700 divide-y divide-gray-200">
                    <!-- Edit HMO -->
                    <li @click="editHmoFromView(); closeViewHmoDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                      </svg>
                      Edit HMO
                    </li>
                    
                    <!-- Disable HMO -->
                    <li @click="disableHmo(selectedHmo); closeViewHmoDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#E56910" fill-opacity="0.2"/>
                        <path d="M12 8V12M12 16H12.01" stroke="#E56910" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="12" cy="12" r="9" stroke="#E56910" stroke-width="2"/>
                      </svg>
                      Disable HMO
                    </li>
                    
                    <!-- Delete -->
                    <li @click="deleteHmoFromView(); closeViewHmoDropdown()" 
                        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C18.3946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 18.3946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6.5 8.26522 6.5 8C6.5 7.73478 6.60536 7.48043 6.79289 7.29289C6.98043 7.10536 7.23478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.2072 10.1324 17.2539 10.1922C17.3007 10.2521 17.3332 10.3218 17.3489 10.3961C17.3647 10.4704 17.3634 10.5473 17.345 10.621L15.689 17.243C15.6348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H10.281H10.28ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="#44546F"/>
                      </svg>
                      Delete
                    </li>
                  </ul>
                </div>
              </teleport>
            </div>
            <Button type="gray-btn" :onClick="viewTransactions" classStyle="px-3 py-1 text-sm">
              View Transactions
            </Button>
            <Button type="blue-btn" :onClick="createContact" classStyle="px-3 py-1 text-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Create Contact
            </Button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="mt-6 px-6">
          <!-- Summary Tab -->
          <div v-if="hmoModalTab === 'Summary'">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p class="text-sm text-gray-900">{{ selectedHmo?.hmo_name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p class="text-sm text-gray-900">{{ selectedHmo?.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p class="text-sm text-gray-900">{{ selectedHmo?.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">HMO Markup (%)</label>
                <p class="text-sm text-gray-900">50%</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">HMO Shipping Fee</label>
                <p class="text-sm text-gray-900">₦2,500.00</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date of Account Creation</label>
                <p class="text-sm text-gray-900 flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M4.995 5H19.005C20.107 5 21 5.895 21 6.994V19.006C21 19.2679 20.9484 19.5273 20.8481 19.7693C20.7478 20.0113 20.6009 20.2312 20.4156 20.4163C20.2304 20.6015 20.0104 20.7484 19.7684 20.8485C19.5263 20.9487 19.2669 21.0001 19.005 21H4.995C4.46607 21 3.95878 20.7899 3.58468 20.416C3.21057 20.0421 3.00027 19.5349 3 19.006V6.994C3 5.893 3.892 5 4.995 5ZM5 9V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V9H5ZM6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V5H6V4ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V5H16V4ZM7 13V10.999H9V13H7ZM15 13V10.999H17V13H15ZM11 13V10.999H13.001V13H11ZM7 17V15H9V17H7ZM11 17V15H13.001V17H11ZM15 17V15H17V17H15Z" fill="#626F86"/>
                  </svg>

                  13/05/2022
                </p>
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
              <label class="flex items-center gap-2">
                <input type="radio" :checked="true" class="text-blue-600" />
                <span class="text-sm text-gray-900">HMO</span>
              </label>
            </div>
          </div>

          <!-- Orders Tab -->
          <div v-if="hmoModalTab === 'Orders'">
            <Datatable
              :items="orderData"
              :columns="orderColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              pageName="HMO Orders"
            >
              <template #column="col">
                <span v-if="col.props?.column?.field === 'status'">
                  <Pill 
                    :type="col.props.formattedRow.status === 'Delivered' ? 'success' : 'danger'"
                    :text="col.props.formattedRow.status"
                  />
                </span>
                <span v-else>
                  {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                </span>
              </template>
            </Datatable>
          </div>

          <!-- Contacts Tab -->
          <div v-if="hmoModalTab === 'Contacts'">
            <Datatable
              :items="contactData"
              :columns="contactColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              pageName="HMO Contacts"
            >
              <template #column="col">
                <span v-if="col.props?.column?.field === 'action'">
                  <div class="flex items-center gap-2">
                    <button @click="editContact(col.props.formattedRow)" class="p-1 hover:bg-gray-100 rounded">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                      </svg>
                    </button>
                    <button @click="deleteContact(col.props.formattedRow)" class="p-1 hover:bg-gray-100 rounded">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#44546F"/>
                      </svg>
                    </button>
                  </div>
                </span>
                <span v-else>
                  {{ (col.props?.formattedRow as any)?.[col.props?.column?.field || ''] || '' }}
                </span>
              </template>
            </Datatable>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button @click="deleteHmoFromView" class="flex items-center gap-2 bg-[#C9372C] p-2 rounded-[8px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
            </svg>
          </button>
          <Button type="blue-btn" :onClick="closeViewModal" classStyle="px-4 py-2">
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Create HMO Modal -->
    <SideBarModal
      :isOpen="showCreateModal"
      title="Create HMO"
      width="45vw"
      @update:isOpen="showCreateModal = $event"
      @close="closeCreateModal"
    >
      <template #default>
        <div class="space-y-6 px-4">
          <!-- HMO Logo Section -->
          <div class="flex items-center gap-4 mb-6">
            <div class="relative w-20 h-20 flex items-center justify-center">
              <img 
                v-if="createLogoImage" 
                :src="createLogoImage" 
                alt="HMO Logo" 
                class="w-20 h-20 object-cover rounded"
              />
              <div v-else class="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="#0C66E4" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <!-- Camera Icon at bottom right -->
              <button 
                @click="triggerCreateLogoUpload"
                class="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.994C2 5.893 2.898 5 3.99 5H20.01C21.108 5 22 5.895 22 6.994V19.006C21.9992 19.5339 21.7894 20.04 21.4165 20.4137C21.0436 20.7873 20.5379 20.9981 20.01 21H3.99C3.46185 20.9989 2.9557 20.7884 2.58261 20.4146C2.20953 20.0407 2 19.5341 2 19.006V6.994ZM12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17ZM17 9C17 9.556 17.448 10 18 10C18.556 10 19 9.552 19 9C19 8.444 18.552 8 18 8C17.444 8 17 8.448 17 9ZM8 4C8 3.448 8.453 3 8.997 3H15.003C15.553 3 16 3.444 16 4V5H8V4Z" fill="#44546F"/>
                  <path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" fill="#44546F"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-600">Add a logo image for this HMO</p>
          </div>

          <!-- HMO Details Section -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input 
                  v-model="createForm.hmo_name" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a company name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  v-model="createForm.phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a phone number"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  v-model="createForm.email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          <!-- Contact Profile Section -->
          <div class="space-y-4 pt-6">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-sm font-semibold text-gray-900">Contact Profile</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input 
                  v-model="createForm.contact_name" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact's name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone Number</label>
                <input 
                  v-model="createForm.contact_phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact's phone number"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input 
                  v-model="createForm.contact_email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact's email address"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden file input for logo upload -->
        <input 
          ref="createLogoFileInput"
          type="file" 
          accept="image/*" 
          class="hidden"
          @change="handleCreateLogoUpload"
        />
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3 w-full">
          <Button type="gray-btn" :onClick="closeCreateModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button type="blue-btn" :onClick="submitCreateHmo" classStyle="px-4 py-2">
            Create
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit HMO Modal -->
    <SideBarModal
      :isOpen="showEditModal"
      title="Edit HMO"
      width="45vw"
      @update:isOpen="showEditModal = $event"
      @close="closeEditModal"
    >
      <template #default>
        <div class="space-y-6 px-4">
          <!-- HMO Logo Section -->
          <div class="flex items-center gap-4 mb-6">
            <div class="relative w-20 h-20 flex items-center justify-center">
              <img 
                v-if="logoImage" 
                :src="logoImage" 
                alt="HMO Logo" 
                class="w-20 h-20 object-cover rounded"
              />
              <svg v-else width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0C66E4"/>
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#0C66E4"/>
              </svg>
              <!-- Camera Icon at bottom right -->
              <button 
                @click="triggerLogoUpload"
                class="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center"
              >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.994C2 5.893 2.898 5 3.99 5H20.01C21.108 5 22 5.895 22 6.994V19.006C21.9992 19.5339 21.7894 20.04 21.4165 20.4137C21.0436 20.7873 20.5379 20.9981 20.01 21H3.99C3.46185 20.9989 2.9557 20.7884 2.58261 20.4146C2.20953 20.0407 2 19.5341 2 19.006V6.994ZM12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17ZM17 9C17 9.556 17.448 10 18 10C18.556 10 19 9.552 19 9C19 8.444 18.552 8 18 8C17.444 8 17 8.448 17 9ZM8 4C8 3.448 8.453 3 8.997 3H15.003C15.553 3 16 3.444 16 4V5H8V4Z" fill="#44546F"/>
<path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" fill="#44546F"/>
</svg>

              </button>
            </div>
            <p class="text-sm text-gray-600">Change logo image for this HMO</p>
          </div>

          <!-- HMO Details Section -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input 
                  v-model="editForm.hmo_name" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  v-model="editForm.phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  v-model="editForm.email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>

          <!-- Contact Profile Section -->
          <div class="space-y-4 pt-6">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-sm font-semibold text-gray-900">Contact Profile</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input 
                  v-model="editForm.contact_name" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone Number</label>
                <input 
                  v-model="editForm.contact_phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact phone"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input 
                  v-model="editForm.contact_email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact email"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden file input for logo upload -->
        <input 
          ref="logoFileInput"
          type="file" 
          accept="image/*" 
          class="hidden"
          @change="handleLogoUpload"
        />
      </template>

      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button @click="deleteHmoFromEdit" class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
            </svg>
          </button>
          <div class="flex items-center gap-3">
            <Button type="gray-btn" :onClick="closeEditModal" classStyle="px-4 py-2">
              Cancel
            </Button>
            <Button type="blue-btn" :onClick="updateHmo" classStyle="px-4 py-2">
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Contact Modal -->
    <SideBarModal
      :isOpen="showEditContactModal"
      width="45vw"
      :fullHeaderWidth="true"
      @update:isOpen="showEditContactModal = $event"
      @close="closeEditContactModal"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <button @click="closeEditContactModal" class="p-1 hover:bg-gray-100 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <span class="text-lg font-[450] text-[#172B4D]">Edit HMO Contact</span>
          </div>
          <div class="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#0C66E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-base font-medium text-[#172B4D]">{{ selectedContact?.name?.toUpperCase() || 'CONTACT' }}</span>
          </div>
        </div>
      </template>

      <template #default>
        <div class="space-y-6 px-4">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input 
                v-model="editContactForm.name" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone Number *</label>
              <input 
                v-model="editContactForm.phone" 
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact phone number"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input 
                v-model="editContactForm.email" 
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact email address"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button @click="deleteContactFromEdit" class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11 6Z" fill="white"/>
            </svg>
          </button>
          <div class="flex items-center gap-3">
            <Button type="gray-btn" :onClick="closeEditContactModal" classStyle="px-4 py-2">
              Cancel
            </Button>
            <Button type="blue-btn" :onClick="updateContact" classStyle="px-4 py-2">
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Contact Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteContactModal"
      :message="deleteContactModalMessage"
      confirmText="Delete HMO Contact"
      @confirm="handleDeleteContactConfirm"
      @cancel="handleDeleteContactCancel"
    />

    <!-- Disable HMO Confirmation Modal -->
    <WarningConfirmationModal
      :show="showDisableModal"
      title="Disable HMO?"
      :message="disableModalMessage"
      confirmText="Disable HMO"
      confirmButtonType="yellow-btn"
      @confirm="handleDisableConfirm"
      @close="handleDisableCancel"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteModalMessage"
      confirmText="Delete HMO"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />

    <!-- View Transactions Modal -->
    <SideBarModal
      :isOpen="showViewTransactionsModal"
      width="65vw"
      :fullHeaderWidth="true"
      @update:isOpen="showViewTransactionsModal = $event"
      @close="closeViewTransactionsModal"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <button @click="closeViewTransactionsModal" class="p-1 hover:bg-gray-100 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="text-lg font-[450] text-[#172B4D]">HMO Details</span>
          <span class="text-lg font-[450] text-[#0C66E4]">{{ selectedHmo?.hmo_name }}</span>
        </div>
      </template>

      <template #default>
        <!-- Balance Cards -->
        <div class="grid grid-cols-2 gap-4 mb-6 px-4">
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Loan Balance</label>
            <p class="text-2xl font-bold text-gray-900">₦0</p>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Wallet Balance</label>
            <p class="text-2xl font-bold text-gray-900">₦0</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 mb-6 px-4">This user has a balance of ₦0</p>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 px-4">
          <button 
            v-for="tab in transactionTabs" 
            :key="tab" 
            @click="transactionTab = tab"
            :class="[
              'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
              transactionTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="mt-6 px-4">
          <!-- Loan Transactions Tab -->
          <div v-if="transactionTab === 'Loan Transactions'">
            <Datatable
              :items="loanTransactionData"
              :columns="transactionColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              pageName="Loan Transactions"
            />
          </div>

          <!-- Wallet Transactions Tab -->
          <div v-if="transactionTab === 'Wallet Transactions'">
            <Datatable
              :items="walletTransactionData"
              :columns="transactionColumns"
              :searchable="true"
              :filterByDate="false"
              :printable="false"
              :exportable="false"
              pageName="Wallet Transactions"
            />
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Create Contact Modal -->
    <SideBarModal
      :isOpen="showCreateContactModal"
      width="45vw"
      :fullHeaderWidth="true"
      @update:isOpen="showCreateContactModal = $event"
      @close="closeCreateContactModal"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <button @click="closeCreateContactModal" class="p-1 hover:bg-gray-100 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="text-lg font-[450] text-[#172B4D]">Create HMO Contact</span>
        </div>
      </template>

      <template #default>
        <div class="space-y-6 px-4">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input 
                v-model="createContactForm.name" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact's name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone Number *</label>
              <input 
                v-model="createContactForm.phone" 
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact's phone number"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input 
                v-model="createContactForm.email" 
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact's email address"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-3 w-full">
          <Button type="gray-btn" :onClick="closeCreateContactModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button type="blue-btn" :onClick="submitCreateContact" classStyle="px-4 py-2">
            Create
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      :title="successModalTitle"
      :message="successModalMessage"
      @close="closeSuccessModal"
    />

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
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import SuccessAlertToast from "@/views/Components/SuccessAlertToast.vue";
import Button from "@/views/Components/ui/Button.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import SelectField from "@/views/Components/ui/SelectField.vue";
import DeleteConfirmationModal from "@/views/Components/ui/DeleteConfirmationModal.vue";
import WarningConfirmationModal from "@/views/Components/ui/WarningConfirmationModal.vue";
import SuccessModal from "@/views/Components/ui/SuccessModal.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { TableColumn, FilterFields, FilterField, Option } from '@/types';

// Reactive variables
const childKey = ref(0);
const showToast = ref(false);
const toastMessage = ref('');
const showViewModal = ref(false);
const showEditModal = ref(false);
const showCreateModal = ref(false);
const selectedHmo = ref<any>(null);
const hmoModalTab = ref('Summary');
const hmoTabs = ['Summary', 'Orders', 'Contacts'];
const showDeleteModal = ref(false);
const showDisableModal = ref(false);
const showSuccessModal = ref(false);
const successModalTitle = ref('');
const successModalMessage = ref('');
const showViewHmoDropdown = ref(false);
const viewHmoDropdownStyle = ref<{ top: string; left: string; position: 'fixed' }>({ top: '0px', left: '0px', position: 'fixed' });
const showEditContactModal = ref(false);
const showDeleteContactModal = ref(false);
const selectedContact = ref<any>(null);
const editContactForm = ref({
  name: '',
  phone: '',
  email: ''
});
const wasViewModalOpen = ref(false);
const previousSelectedHmo = ref<any>(null);
const showViewTransactionsModal = ref(false);
const showCreateContactModal = ref(false);
const transactionTab = ref('Loan Transactions');
const transactionTabs = ['Loan Transactions', 'Wallet Transactions'];
const createContactForm = ref({
  name: '',
  phone: '',
  email: ''
});

// Edit form
const editForm = ref({
  hmo_name: '',
  hmo_id: '',
  email: '',
  phone: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  status: null as Option | null
});

// Create form
const createForm = ref({
  hmo_name: '',
  email: '',
  phone: '',
  contact_name: '',
  contact_phone: '',
  contact_email: ''
});

// Logo upload
const logoFileInput = ref<HTMLInputElement | null>(null);
const logoImage = ref<string | null>(null);
const createLogoFileInput = ref<HTMLInputElement | null>(null);
const createLogoImage = ref<string | null>(null);

const triggerLogoUpload = () => {
  logoFileInput.value?.click();
};

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      logoImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const triggerCreateLogoUpload = () => {
  createLogoFileInput.value?.click();
};

const handleCreateLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      createLogoImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Status options
const statusOptions = ref<Option[]>([
  { id: 1, name: 'Enabled' },
  { id: 2, name: 'Disabled' }
]);

// Order columns
const orderColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Item(s)', field: 'items', sortable: true },
  { label: 'Reference', field: 'reference', sortable: true },
  { label: 'Date', field: 'date', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Total Amount', field: 'totalAmount', sortable: true }
]);

// Mock order data
const orderData = ref([
  { id: 54, storeName: 'Emeka Pharmacy', items: 1, reference: '1652521159-360', date: '16/01/2025 10:39 AM', status: 'Delivered', totalAmount: '₦3,220.00' },
  { id: 54, storeName: 'Emeka Pharmacy', items: 2, reference: '1652521159-360', date: '16/01/2025 10:39 AM', status: 'Cancelled', totalAmount: '₦3,220.00' }
]);

// Contact columns
const contactColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Contact Name', field: 'name', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Created Date', field: 'createdDate', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Mock contact data
const contactData = ref([
  { id: 54, name: 'Emeka Eze', email: 'sleeknne4u1@gail.com', phone: '+234 899 9999 999', createdDate: '16/01/2025 10:39 AM' },
  { id: 55, name: 'David Ejiro', email: 'david@example.com', phone: '+234 899 9999 998', createdDate: '16/01/2025 10:40 AM' }
]);

// Transaction columns
const transactionColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Transaction Type', field: 'transactionType', sortable: true },
  { label: 'Reference', field: 'reference', sortable: true },
  { label: 'Orders', field: 'orders', sortable: true },
  { label: 'Description', field: 'description', sortable: true },
  { label: 'Total Amount', field: 'totalAmount', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
]);

// Mock transaction data
const loanTransactionData = ref([
  { id: 54, transactionType: 'Nil', reference: 'Nil', orders: 1, description: 'Nil', totalAmount: '₦3,220.00', date: '16/01/2025 10:39 AM' }
]);

const walletTransactionData = ref([
  { id: 55, transactionType: 'Deposit', reference: 'REF-12345', orders: 2, description: 'Wallet top-up', totalAmount: '₦5,000.00', date: '15/01/2025 09:15 AM' }
]);

// Column definitions
const hmoColumns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'HMO Name', field: 'hmo_name', sortable: true },
  { label: 'Customer Type', field: 'customer_type', sortable: true },
  { label: 'HMO ID', field: 'hmo_id', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
]);

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
  customer_type: {
    field: 'customer_type',
    label: 'Customer Type',
    type: 'select',
    options: [
      { id: 'all', name: 'All Types' },
      { id: 'HMO', name: 'HMO' }
    ],
    placeholder: 'All Types'
  },
  status: {
    field: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { id: 'all', name: 'All Status' },
      { id: 'Enabled', name: 'Enabled' },
      { id: 'Disabled', name: 'Disabled' }
    ],
    placeholder: 'All Status'
  }
});

// Mock HMO data
const hmoData = ref([
  {
    id: 87,
    hmo_name: 'Oluwatosin HMO',
    customer_type: 'HMO',
    hmo_id: 'HMO-87',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 54,
    hmo_name: 'Reliance Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-54',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 25,
    hmo_name: 'NEM Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-25',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 30,
    hmo_name: 'Oluwatosin Adegboye',
    customer_type: 'HMO',
    hmo_id: 'HMO-30',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 51,
    hmo_name: 'Reliance Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-51',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 21,
    hmo_name: 'NEM Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-21',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 35,
    hmo_name: 'Oluwatosin HMO',
    customer_type: 'HMO',
    hmo_id: 'HMO-35',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 23,
    hmo_name: 'Reliance Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-23',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 33,
    hmo_name: 'NEM Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-33',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 88,
    hmo_name: 'Oluwatosin Adegboye',
    customer_type: 'HMO',
    hmo_id: 'HMO-88',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 81,
    hmo_name: 'Reliance Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-81',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 80,
    hmo_name: 'NEM Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-80',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 5,
    hmo_name: 'Oluwatosin HMO',
    customer_type: 'HMO',
    hmo_id: 'HMO-05',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  },
  {
    id: 55,
    hmo_name: 'Reliance Health',
    customer_type: 'HMO',
    hmo_id: 'HMO-55',
    email: 'sleeknne4u1@gail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled'
  }
]);

// Action functions
const createHmo = () => {
  createForm.value = {
    hmo_name: '',
    email: '',
    phone: '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  };
  createLogoImage.value = null;
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
  createForm.value = {
    hmo_name: '',
    email: '',
    phone: '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  };
  createLogoImage.value = null;
};

const submitCreateHmo = () => {
  if (!createForm.value.hmo_name || !createForm.value.email || !createForm.value.phone) {
    toastMessage.value = 'Please fill in all required fields';
    showToast.value = true;
    return;
  }

  // Generate a new ID (get the max ID and add 1)
  const maxId = Math.max(...hmoData.value.map(h => h.id), 0);
  const newId = maxId + 1;

  // Create new HMO
  const newHmo = {
    id: newId,
    hmo_name: createForm.value.hmo_name,
    customer_type: 'HMO',
    hmo_id: `HMO-${newId.toString().padStart(2, '0')}`,
    email: createForm.value.email,
    phone: createForm.value.phone,
    status: 'Enabled'
  };

  // Add to data array
  hmoData.value.push(newHmo);

  // Show success modal
  successModalTitle.value = 'HMO Created';
  successModalMessage.value = `The HMO "${createForm.value.hmo_name}" has been successfully added to the system.`;
  showSuccessModal.value = true;

  // Close create modal
  closeCreateModal();
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  successModalTitle.value = '';
  successModalMessage.value = '';
};

const viewHmo = (hmo: any) => {
  selectedHmo.value = hmo;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedHmo.value = null;
  hmoModalTab.value = 'Summary';
  showViewHmoDropdown.value = false;
};

const editHmo = (hmo: any) => {
  selectedHmo.value = hmo;
  editForm.value = {
    hmo_name: hmo.hmo_name || '',
    hmo_id: hmo.hmo_id || '',
    email: hmo.email || '',
    phone: hmo.phone || '',
    contact_name: 'Emeka Eze',
    contact_phone: '+234 899 9999 999',
    contact_email: 'sleeknne4u1@gmail.com',
    status: statusOptions.value.find(s => s.name === hmo.status) || null
  };
  logoImage.value = null;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedHmo.value = null;
  logoImage.value = null;
  editForm.value = {
    hmo_name: '',
    hmo_id: '',
    email: '',
    phone: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    status: null
  };
};

const updateHmo = () => {
  if (selectedHmo.value) {
    // Update the HMO in the data array
    const index = hmoData.value.findIndex(h => h.id === selectedHmo.value.id);
    if (index !== -1) {
      hmoData.value[index] = {
        ...hmoData.value[index],
        hmo_name: editForm.value.hmo_name,
        email: editForm.value.email,
        phone: editForm.value.phone,
        status: editForm.value.status?.name || 'Enabled'
      };
    }
    toastMessage.value = `HMO "${editForm.value.hmo_name}" updated successfully`;
    showToast.value = true;
    closeEditModal();
  }
};

const viewTransactions = () => {
  // Store if View HMO modal was open and which HMO was selected
  wasViewModalOpen.value = showViewModal.value;
  if (showViewModal.value && selectedHmo.value) {
    previousSelectedHmo.value = { ...selectedHmo.value };
  }
  
  // Close View HMO modal before opening View Transactions modal
  if (showViewModal.value) {
    showViewModal.value = false;
  }
  
  // Small delay to ensure View HMO modal closes before opening View Transactions modal
  setTimeout(() => {
    showViewTransactionsModal.value = true;
  }, 100);
};

const closeViewTransactionsModal = () => {
  showViewTransactionsModal.value = false;
  transactionTab.value = 'Loan Transactions';
  
  // Reopen View HMO modal if it was open before
  if (wasViewModalOpen.value && previousSelectedHmo.value) {
    setTimeout(() => {
      selectedHmo.value = previousSelectedHmo.value;
      showViewModal.value = true;
      wasViewModalOpen.value = false;
      previousSelectedHmo.value = null;
    }, 100);
  }
};

const createContact = () => {
  // Store if View HMO modal was open and which HMO was selected
  wasViewModalOpen.value = showViewModal.value;
  if (showViewModal.value && selectedHmo.value) {
    previousSelectedHmo.value = { ...selectedHmo.value };
  }
  
  // Reset form
  createContactForm.value = {
    name: '',
    phone: '',
    email: ''
  };
  
  // Close View HMO modal before opening Create Contact modal
  if (showViewModal.value) {
    showViewModal.value = false;
  }
  
  // Small delay to ensure View HMO modal closes before opening Create Contact modal
  setTimeout(() => {
    showCreateContactModal.value = true;
  }, 100);
};

const closeCreateContactModal = () => {
  showCreateContactModal.value = false;
  createContactForm.value = {
    name: '',
    phone: '',
    email: ''
  };
  
  // Reopen View HMO modal if it was open before
  if (wasViewModalOpen.value && previousSelectedHmo.value) {
    setTimeout(() => {
      selectedHmo.value = previousSelectedHmo.value;
      showViewModal.value = true;
      wasViewModalOpen.value = false;
      previousSelectedHmo.value = null;
    }, 100);
  }
};

const submitCreateContact = () => {
  if (!createContactForm.value.name || !createContactForm.value.phone || !createContactForm.value.email) {
    toastMessage.value = 'Please fill in all required fields';
    showToast.value = true;
    return;
  }

  // Generate a new ID for the contact
  const newId = contactData.value.length > 0 
    ? Math.max(...contactData.value.map(c => c.id)) + 1 
    : 1;

  // Create new contact
  const newContact = {
    id: newId,
    name: createContactForm.value.name,
    phone: createContactForm.value.phone,
    email: createContactForm.value.email,
    createdDate: new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '')
  };

  contactData.value.push(newContact);
  
  successModalTitle.value = 'Contact Created';
  successModalMessage.value = `Contact "${createContactForm.value.name}" has been created successfully.`;
  showSuccessModal.value = true;
  
  closeCreateContactModal();
};

const editContact = (contact: any) => {
  selectedContact.value = contact;
  editContactForm.value = {
    name: contact.name || '',
    phone: contact.phone || '',
    email: contact.email || ''
  };
  
  // Store if View HMO modal was open and which HMO was selected
  wasViewModalOpen.value = showViewModal.value;
  if (showViewModal.value && selectedHmo.value) {
    previousSelectedHmo.value = { ...selectedHmo.value };
  }
  
  // Close View HMO modal before opening Edit Contact modal
  if (showViewModal.value) {
    showViewModal.value = false;
  }
  
  // Small delay to ensure View HMO modal closes before opening Edit Contact modal
  setTimeout(() => {
    showEditContactModal.value = true;
  }, 100);
};

const closeEditContactModal = () => {
  showEditContactModal.value = false;
  selectedContact.value = null;
  editContactForm.value = {
    name: '',
    phone: '',
    email: ''
  };
  
  // Reopen View HMO modal if it was open before
  if (wasViewModalOpen.value && previousSelectedHmo.value) {
    setTimeout(() => {
      selectedHmo.value = previousSelectedHmo.value;
      showViewModal.value = true;
      wasViewModalOpen.value = false;
      previousSelectedHmo.value = null;
    }, 100);
  }
};

const updateContact = () => {
  if (!selectedContact.value) return;
  
  if (!editContactForm.value.name || !editContactForm.value.phone || !editContactForm.value.email) {
    toastMessage.value = 'Please fill in all required fields';
    showToast.value = true;
    return;
  }

  const index = contactData.value.findIndex(c => c.id === selectedContact.value.id);
  if (index !== -1) {
    contactData.value[index] = {
      ...contactData.value[index],
      name: editContactForm.value.name,
      phone: editContactForm.value.phone,
      email: editContactForm.value.email
    };
    toastMessage.value = `Contact "${editContactForm.value.name}" updated successfully`;
    showToast.value = true;
    
    // Close Edit Contact modal
    showEditContactModal.value = false;
    selectedContact.value = null;
    editContactForm.value = {
      name: '',
      phone: '',
      email: ''
    };
    
    // Reopen View HMO modal if it was open before
    if (wasViewModalOpen.value && previousSelectedHmo.value) {
      setTimeout(() => {
        selectedHmo.value = previousSelectedHmo.value;
        showViewModal.value = true;
        wasViewModalOpen.value = false;
        previousSelectedHmo.value = null;
      }, 100);
    }
  }
};

const deleteContactFromEdit = () => {
  if (selectedContact.value) {
    showDeleteContactModal.value = true;
  }
};

const deleteContact = (contact: any) => {
  selectedContact.value = contact;
  showDeleteContactModal.value = true;
};

const handleDeleteContactConfirm = () => {
  if (selectedContact.value) {
    const index = contactData.value.findIndex(c => c.id === selectedContact.value.id);
    if (index !== -1) {
      contactData.value.splice(index, 1);
      toastMessage.value = `Contact "${selectedContact.value.name}" deleted successfully`;
      showToast.value = true;
    }
    // Close Edit Contact modal if open
    if (showEditContactModal.value) {
      showEditContactModal.value = false;
      selectedContact.value = null;
      editContactForm.value = {
        name: '',
        phone: '',
        email: ''
      };
      
      // Reopen View HMO modal if it was open before
      if (wasViewModalOpen.value && previousSelectedHmo.value) {
        setTimeout(() => {
          selectedHmo.value = previousSelectedHmo.value;
          showViewModal.value = true;
          wasViewModalOpen.value = false;
          previousSelectedHmo.value = null;
        }, 100);
      }
    }
  }
  showDeleteContactModal.value = false;
  if (!showEditContactModal.value) {
    selectedContact.value = null;
  }
};

const handleDeleteContactCancel = () => {
  showDeleteContactModal.value = false;
  // Don't clear selectedContact if edit modal is still open
  if (!showEditContactModal.value) {
    selectedContact.value = null;
  }
};

const deleteContactModalMessage = computed(() => {
  if (!selectedContact.value) {
    return 'You are about to delete this HMO contact. This action will permanently remove them from the system. This action cannot be undone.';
  }
  return `You are about to delete this HMO contact "${selectedContact.value.name}". This action will permanently remove them from the system. This action cannot be undone.`;
});

const deleteHmoFromView = () => {
  showDeleteModal.value = true;
};

const disableHmoFromAction = (hmo: any) => {
  selectedHmo.value = hmo;
  showDisableModal.value = true;
};

const deleteHmoFromAction = (hmo: any) => {
  selectedHmo.value = hmo;
  showDeleteModal.value = true;
};

const deleteHmoFromEdit = () => {
  showDeleteModal.value = true;
};

const handleDeleteConfirm = () => {
  if (selectedHmo.value) {
    const index = hmoData.value.findIndex(h => h.id === selectedHmo.value.id);
    if (index !== -1) {
      hmoData.value.splice(index, 1);
      toastMessage.value = `HMO "${selectedHmo.value.hmo_name}" deleted successfully`;
      showToast.value = true;
      // Close the appropriate modal
      if (showEditModal.value) {
        closeEditModal();
      } else if (showViewModal.value) {
        closeViewModal();
      }
    }
  }
  showDeleteModal.value = false;
};

const handleDeleteCancel = () => {
  showDeleteModal.value = false;
};

const deleteModalMessage = computed(() => {
  if (!selectedHmo.value) {
    return 'You are about to delete this HMO.';
  }
  return `You are about to delete the HMO "${selectedHmo.value.hmo_name}". This action will permanently remove it from the system. This action cannot be undone.`;
});

const toggleViewHmoDropdown = (event: MouseEvent) => {
  event.stopPropagation();
  if (showViewHmoDropdown.value) {
    showViewHmoDropdown.value = false;
  } else {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    viewHmoDropdownStyle.value = {
      top: `${rect.bottom + window.scrollY + 5}px`,
      left: `${rect.left + window.scrollX}px`,
      position: 'fixed'
    };
    showViewHmoDropdown.value = true;
  }
};

const closeViewHmoDropdown = () => {
  showViewHmoDropdown.value = false;
};

const editHmoFromView = () => {
  if (selectedHmo.value) {
    // Save reference before closing modal
    const hmoToEdit = { ...selectedHmo.value };
    closeViewModal();
    // Use nextTick to ensure modal is closed before opening edit modal
    setTimeout(() => {
      editHmo(hmoToEdit);
    }, 100);
  }
};

const handleDisableConfirm = () => {
  if (selectedHmo.value) {
    const index = hmoData.value.findIndex(h => h.id === selectedHmo.value.id);
    if (index !== -1) {
      hmoData.value[index].status = hmoData.value[index].status === 'Enabled' ? 'Disabled' : 'Enabled';
      toastMessage.value = `HMO "${selectedHmo.value.hmo_name}" ${hmoData.value[index].status === 'Disabled' ? 'disabled' : 'enabled'} successfully`;
      showToast.value = true;
      // Update selectedHmo if viewing it
      if (selectedHmo.value && selectedHmo.value.id === selectedHmo.value.id) {
        selectedHmo.value.status = hmoData.value[index].status;
      }
    }
  }
  showDisableModal.value = false;
  // Don't clear selectedHmo if view modal is open
  if (!showViewModal.value && !showEditModal.value) {
    selectedHmo.value = null;
  }
};

const handleDisableCancel = () => {
  showDisableModal.value = false;
  // Don't clear selectedHmo if view modal is open
  if (!showViewModal.value && !showEditModal.value) {
    selectedHmo.value = null;
  }
};

const disableHmo = (hmo: any) => {
  selectedHmo.value = hmo;
  showDisableModal.value = true;
};

const disableModalMessage = computed(() => {
  if (!selectedHmo.value) {
    return 'You are about to disable this HMO. This action will prevent users from selecting this HMO.';
  }
  return `You are about to disable this HMO "${selectedHmo.value.hmo_name}". This action will prevent users from selecting this HMO.`;
});

// Close dropdown when clicking outside
const handleViewHmoDropdownClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const dropdown = target.closest('.min-w-48');
  const trigger = target.closest('[data-dropdown-trigger]') || target.closest('button');
  if (!dropdown && !trigger && showViewHmoDropdown.value) {
    closeViewHmoDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleViewHmoDropdownClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleViewHmoDropdownClick);
});
</script>

<style>
.erp_dashboard_wrapper .create_btn {
  background: rgba(12, 102, 228, 1);
  border-radius: 6px;
}
</style>
