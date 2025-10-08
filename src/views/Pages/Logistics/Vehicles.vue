<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg bg-[#f9fafb]">
      <!-- Header -->
      <PageTitle title="Vehicles" class="px-6" />
      
      <!-- Content -->
      <div class="px-6 pb-6">
        <!-- Vehicles Datatable -->
        <Datatable 
          :items="vehicles" 
          :columns="vehicleColumns" 
          :searchable="true"
          :filterByDate="false"
          :printable="true"
          :exportable="true"
          :showActions="false"
          :showPagination="true"
          pageName="Vehicles"
          @onPrint="handlePrint"
        >
          <template #header_actions>
            <div class="flex items-center gap-3">
              <!-- Download Report Button -->
              <Button 
                type="gray-btn"
                :onClick="downloadReport"
                classStyle="flex items-center gap-2 px-4 py-2"
              >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
              </svg>

                Download Report
              </Button>

              <!-- Log Service Button -->
              <Button 
                type="yellow-btn"
                :onClick="openLogServiceModal"
                classStyle="flex items-center gap-2 px-4 py-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.376 6.455L10.624 3.351C11.416 2.882 12.587 2.884 13.376 3.351L18.624 6.455C19.416 6.923 20 7.962 20 8.895V15.105C20 16.041 19.413 17.078 18.624 17.545L13.376 20.649C12.584 21.118 11.413 21.116 10.624 20.649L5.376 17.545C4.584 17.077 4 16.038 4 15.105V8.895C4 7.959 4.587 6.922 5.376 6.455ZM12.366 5.141C12.201 5.043 11.8 5.043 11.633 5.141L6.385 8.245C6.219 8.343 6.018 8.699 6.018 8.895V15.105C6.018 15.3 6.218 15.656 6.385 15.755L11.633 18.859C11.799 18.957 12.2 18.957 12.367 18.859L17.615 15.755C17.781 15.657 17.982 15.301 17.982 15.105V8.895C17.982 8.7 17.782 8.344 17.615 8.245L12.366 5.141Z" fill="#172B4D"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#172B4D"/>
                </svg>

                Log Service
              </Button>

              <!-- Add Vehicle Button -->
              <Button 
                type="blue-btn"
                :onClick="openAddVehicleModal"
                classStyle="flex items-center gap-2 px-4 py-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
                </svg>

                Add Vehicle
              </Button>
        </div>
          </template>
          <template #column="col">
            <!-- Status Column -->
            <span v-if="col.props.column.field === 'status'">
              <Pill 
                :type="col.props.row.status === 'Active' ? 'cash-and-carry' : 'pending-tier'"
                :text="col.props.row.status"
              />
            </span>
            <!-- Action Column -->
            <span v-else-if="col.props.column.field === 'action'">
              <TableActionDropdown :rowData="col.props.formattedRow">
                <template #default="{ selectedItem, closeDropdown }">
                  <!-- View Vehicle -->
                  <li @click="viewVehicle(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                      </svg>

                    View Vehicle
                  </li>
                  
                  <!-- Edit Vehicle -->
                  <li @click="editVehicle(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.73C3.98715 19.892 3.99472 20.0597 4.0423 20.218C4.08988 20.3764 4.17598 20.5205 4.29289 20.6374C4.40981 20.7543 4.55389 20.8404 4.71224 20.888C4.87059 20.9355 5.03826 20.9431 5.20026 20.91L9.01026 20.13L4.80026 15.92L4.02026 19.73ZM9.94126 17.11L7.82126 14.99L16.3063 6.5H16.3083L18.4293 8.621L9.94026 17.111L9.94126 17.11ZM19.8443 7.207L17.7243 5.085C17.5384 4.89908 17.3176 4.7517 17.0746 4.65131C16.8316 4.55092 16.5712 4.4995 16.3083 4.5C15.7963 4.5 15.2843 4.695 14.8933 5.085L5.13626 14.843L10.0863 19.793L19.8433 10.035C20.2182 9.65995 20.4288 9.15133 20.4288 8.621C20.4288 8.09068 20.2182 7.58206 19.8433 7.207H19.8443Z" fill="#626F86"/>
                    </svg>

                    Edit Vehicle
                  </li>
                  
                  <!-- Log Service Entry -->
                  <li @click="logServiceEntry(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.376 6.455L10.624 3.351C11.416 2.882 12.587 2.884 13.376 3.351L18.624 6.455C19.416 6.923 20 7.962 20 8.895V15.105C20 16.041 19.413 17.078 18.624 17.545L13.376 20.649C12.584 21.118 11.413 21.116 10.624 20.649L5.376 17.545C4.584 17.077 4 16.038 4 15.105V8.895C4 7.959 4.587 6.922 5.376 6.455ZM12.366 5.141C12.201 5.043 11.8 5.043 11.633 5.141L6.385 8.245C6.219 8.343 6.018 8.699 6.018 8.895V15.105C6.018 15.3 6.218 15.656 6.385 15.755L11.633 18.859C11.799 18.957 12.2 18.957 12.367 18.859L17.615 15.755C17.781 15.657 17.982 15.301 17.982 15.105V8.895C17.982 8.7 17.782 8.344 17.615 8.245L12.366 5.141Z" fill="#626F86"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#626F86"/>
                      </svg>

                    Log Service Entry
                  </li>
                  
                  <!-- Delete Vehicle -->
                  <li @click="deleteVehicle(selectedItem); closeDropdown()" 
                      class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z" fill="#626F86"/>
                    </svg>

                    Delete Vehicle
                  </li>
                </template>
              </TableActionDropdown>
            </span>
          </template>
        </Datatable>
      </div>
    </div>

    <!-- Add Vehicle Modal -->
    <SideBarModal :isOpen="showAddVehicleModal" @close="closeAddVehicleModal" width="small">
      <template #header>
        <SideBarHead title="Add Vehicle">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <template #default="slotProps">
        <div class="p-6 space-y-6">
          <!-- Basic Vehicle Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Vehicle Information</h3>
            
            <div class="space-y-4">
              <div>
                <label>Plate Number</label>
                <input 
                  v-model="newVehicle.plateNumber"
                  type="text" 
                  placeholder="Enter a plate number"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>Manufacturer</label>
                <SelectField 
                  v-model="newVehicle.manufacturer"
                  :options="manufacturerOptions"
                  placeholder="Select a vehicle manufacturer"
                />
              </div>
              
              <div>
                <label>Model</label>
                <SelectField 
                  v-model="newVehicle.model"
                  :options="modelOptions"
                  placeholder="Select a vehicle model"
                />
              </div>
              
              <div>
                <label>Type</label>
                <SelectField 
                  v-model="newVehicle.vehicleType"
                  :options="vehicleTypeOptions"
                  placeholder="Select a vehicle type"
                />
              </div>
              
              <div>
                <label>Year</label>
                <input 
                  v-model="newVehicle.year"
                  type="number" 
                  placeholder="Enter the year of manufacture"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>VIN (Vehicle Identification Number)</label>
                <input 
                  v-model="newVehicle.vin"
                  type="text" 
                  placeholder="Enter 17-digit VIN"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>Purchase Date (Optional)</label>
                <DateInput 
                  v-model="newVehicle.purchaseDate"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>

          <!-- Vehicle Documents Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Vehicle Documents</h3>
            
            <!-- Vehicle License Certificate -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Vehicle License Certificate</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Vehicle License document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Proof of Vehicle Ownership Certificate -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Proof of Vehicle Ownership Certificate</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Vehicle Ownership Certificate document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- MOT License (for motorbike only) -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">MOT License (for motorbike only)</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the MOT License document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Certificate of Roadworthiness -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Certificate of Roadworthiness</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Roadworthiness document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Hackney Permit -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Hackney Permit</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Hackney Permit document of the vehicle issues by the Motor Vehicle Administration Agency</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer="slotProps">
        <div class="flex items-center justify-end gap-3">
          <Button 
            type="gray-btn"
            :onClick="closeAddVehicleModal"
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn"
            :onClick="createVehicle"
            classStyle="px-4 py-2"
          >
            Add
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Vehicle Modal -->
    <SideBarModal :isOpen="showEditVehicleModal" @close="closeEditVehicleModal" width="small">
      <template #header>
        <SideBarHead title="Edit Vehicle">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <template #default="slotProps">
        <div class="p-6 space-y-6">
          <!-- Vehicle Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">{{ editingVehicle?.plateNumber }} - {{ editingVehicle?.model?.name?.toUpperCase() }}</h3>
            
            <div class="space-y-4">
              <div>
                <label>Plate Number</label>
                <input 
                  v-model="editingVehicle.plateNumber"
                  type="text" 
                  placeholder="Enter a plate number"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>Manufacturer</label>
                <SelectField 
                  v-model="editingVehicle.manufacturer"
                  :options="manufacturerOptions"
                  placeholder="Select a vehicle manufacturer"
                />
              </div>
              
              <div>
                <label>Model</label>
                <SelectField 
                  v-model="editingVehicle.model"
                  :options="modelOptions"
                  placeholder="Select a vehicle model"
                />
              </div>
              
              <div>
                <label>Type</label>
                <SelectField 
                  v-model="editingVehicle.vehicleType"
                  :options="vehicleTypeOptions"
                  placeholder="Select a vehicle type"
                />
              </div>
              
              <div>
                <label>Year</label>
                <input 
                  v-model="editingVehicle.year"
                  type="number" 
                  placeholder="Enter the year of manufacture"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>VIN (Vehicle Identification Number)</label>
                <input 
                  v-model="editingVehicle.vin"
                  type="text" 
                  placeholder="Enter 17-digit VIN"
                  class="w-full"
                />
              </div>
              
              <div>
                <label>Purchase Date (Optional)</label>
                <DateInput 
                  v-model="editingVehicle.purchaseDate"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>
          </div>

          <!-- Vehicle Documents Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Vehicle Documents</h3>
            
            <!-- Vehicle License Certificate -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Vehicle License Certificate</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Vehicle License document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Proof of Vehicle Ownership Certificate -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Proof of Vehicle Ownership Certificate</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Vehicle Ownership Certificate document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- MOT License (for motorbike only) -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">MOT License (for motorbike only)</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the MOT License document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Certificate of Roadworthiness -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Certificate of Roadworthiness</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Roadworthiness document of the vehicle</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>

            <!-- Hackney Permit -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Hackney Permit</h4>
              <p class="text-sm text-gray-600 mb-4">Upload the Hackney Permit document of the vehicle issues by the Motor Vehicle Administration Agency</p>
              
              <div class="space-y-3">
                <div>
                  <label>Expiry Date</label>
                  <DateInput 
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                
                <Button type="blue-btn" classStyle="flex items-center gap-2">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.208 9.82L9.29 11.753C9.10405 11.9403 8.9997 12.1936 8.9997 12.4575C8.9997 12.7214 9.10405 12.9747 9.29 13.162C9.38133 13.2544 9.4901 13.3278 9.61001 13.3779C9.72991 13.428 9.85856 13.4538 9.9885 13.4538C10.1184 13.4538 10.2471 13.428 10.367 13.3779C10.4869 13.3278 10.5957 13.2544 10.687 13.162L11.977 11.861L13.313 13.208C13.4043 13.3005 13.513 13.374 13.6329 13.4241C13.7527 13.4743 13.8813 13.5002 14.0113 13.5003C14.1412 13.5004 14.2699 13.4747 14.3898 13.4247C14.5098 13.3747 14.6186 13.3014 14.71 13.209C14.8953 13.0216 14.9993 12.7687 14.9995 12.5052C14.9997 12.2417 14.896 11.9887 14.711 11.801L12.746 9.821C12.6456 9.71904 12.5259 9.63806 12.3939 9.58275C12.262 9.52744 12.1203 9.49891 11.9772 9.49881C11.8341 9.49872 11.6924 9.52707 11.5604 9.5822C11.4283 9.63734 11.3085 9.71817 11.208 9.82Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 10.507L11.001 20.493C11.001 21.05 11.449 21.501 12.001 21.5C12.554 21.5 13.001 21.05 13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 10.999 9.951 11 10.507Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.981C7.68114 5.93897 7.42128 5.9179 7.161 5.918C4.356 5.919 2 8.12 2 10.999C2 13.908 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.963 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.493C13.987 5.503 14.954 5.87825 15.7027 6.54875C16.4514 7.21924 16.9306 8.13919 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.166 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.521 9.075 4.401 7.938 5.981Z" fill="white"/>
                  </svg>
                  Upload file
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <!-- Delete Button -->
          <Button 
            type="red-btn"
            :onClick="deleteFromEditModal"
            classStyle="w-10 h-10 p-0 flex items-center justify-center"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C17.8946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 17.8946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.7072 10.1324 17.2539 10.1922C17.8007 10.2521 17.8332 10.3218 17.8489 10.3961C17.8647 10.4704 17.8634 10.5473 17.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7H10.5C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="white"/>
            </svg>
          </Button>

          <div class="flex items-center gap-3">
            <Button 
              type="gray-btn"
              :onClick="closeEditVehicleModal"
              classStyle="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="blue-btn"
              :onClick="updateVehicle"
              classStyle="px-4 py-2"
            >
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- View Vehicle Modal -->
    <SideBarModal :isOpen="showViewVehicleModal" @close="closeViewVehicleModal" width="large">
      <template #header>
        <SideBarHead title="Vehicle Details">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <template #default="slotProps">
        <!-- Vehicle Header -->
        <div class="bg-gray-50 p-6 border-b border-gray-200">
          <div class="flex items-center gap-4">
            <!-- Vehicle Icon -->
            <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 0C13.5304 0 14.0391 0.210714 14.4142 0.585786C14.7893 0.960859 15 1.46957 15 2V3H16.52C16.8198 3.00004 17.1157 3.06746 17.3859 3.19728C17.6561 3.3271 17.8936 3.51599 18.081 3.75L19.561 5.601C19.8451 5.95569 19.9999 6.39656 20 6.851V11C20 11.5304 19.7893 12.0391 19.4142 12.4142C19.0391 12.7893 18.5304 13 18 13C18 13.7956 17.6839 14.5587 17.1213 15.1213C16.5587 15.6839 15.7956 16 15 16C14.2044 16 13.4413 15.6839 12.8787 15.1213C12.3161 14.5587 12 13.7956 12 13H8C8 13.394 7.9224 13.7841 7.77164 14.148C7.62087 14.512 7.3999 14.8427 7.12132 15.1213C6.84274 15.3999 6.51203 15.6209 6.14805 15.7716C5.78407 15.9224 5.39397 16 5 16C4.60603 16 4.21593 15.9224 3.85195 15.7716C3.48797 15.6209 3.15726 15.3999 2.87868 15.1213C2.6001 14.8427 2.37913 14.512 2.22836 14.148C2.0776 13.7841 2 13.394 2 13C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H13ZM5 12C4.73478 12 4.48043 12.1054 4.29289 12.2929C4.10536 12.4804 4 12.7348 4 13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14C5.26522 14 5.51957 13.8946 5.70711 13.7071C5.89464 13.5196 6 13.2652 6 13C6 12.7348 5.89464 12.4804 5.70711 12.2929C5.51957 12.1054 5.26522 12 5 12ZM15 12C14.7348 12 14.4804 12.1054 14.2929 12.2929C14.1054 12.4804 14 12.7348 14 13C14 13.2652 14.1054 13.5196 14.2929 13.7071C14.4804 13.8946 14.7348 14 15 14C15.2652 14 15.5196 13.8946 15.7071 13.7071C15.8946 13.5196 16 13.2652 16 13C16 12.7348 15.8946 12.4804 15.7071 12.2929C15.5196 12.1054 15.2652 12 15 12ZM13 2H2V11H2.764C3.03445 10.6969 3.3637 10.452 3.73173 10.2801C4.09976 10.1082 4.4989 10.0128 4.9049 9.99994C5.3109 9.98704 5.71529 10.0568 6.0935 10.205C6.4717 10.3532 6.81584 10.5767 7.105 10.862L7.236 11H12.764L12.879 10.879L13 10.764V2ZM16.52 5H15V10C15.82 10 16.563 10.33 17.105 10.862L17.236 11H18V6.85L16.52 5Z" fill="#44546F"/>
              </svg>

            </div>
            
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-[#44546F]">{{ viewingVehicle?.plateNumber }} - {{ viewingVehicle?.model }}</h3>
              <div class="flex items-center gap-4 mt-2">
                <div class="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8333 5.83333C16.7542 5.83583 17.5 6.5825 17.5 7.505V15.8283C17.5001 16.0479 17.4569 16.2653 17.373 16.4682C17.289 16.671 17.1659 16.8554 17.0106 17.0106C16.8554 17.1659 16.671 17.289 16.4682 17.373C16.2653 17.4569 16.0479 17.5001 15.8283 17.5H7.505C7.06244 17.5002 6.63788 17.3249 6.32448 17.0124C6.01107 16.6999 5.83444 16.2759 5.83333 15.8333H15C15.4625 15.8333 15.8333 15.46 15.8333 15V5.83333ZM2.5 4.17167C2.5 3.24833 3.2475 2.5 4.17167 2.5H12.495C13.4183 2.5 14.1667 3.2475 14.1667 4.17167V12.495C14.1668 12.7146 14.1236 12.932 14.0396 13.1348C13.9557 13.3377 13.8325 13.522 13.6773 13.6773C13.522 13.8325 13.3377 13.9557 13.1348 14.0396C12.932 14.1236 12.7146 14.1668 12.495 14.1667H4.17167C3.95211 14.1668 3.73468 14.1236 3.53182 14.0396C3.32895 13.9557 3.14463 13.8325 2.98938 13.6773C2.83413 13.522 2.711 13.3377 2.62703 13.1348C2.54305 12.932 2.49989 12.7146 2.5 12.495V4.17167ZM4.16667 4.16667V12.5H12.5V4.16667H4.16667Z" fill="#091E42" fill-opacity="0.31"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.98083 5.64167L7.3025 7.09417L5.74667 7.33333C5.67596 7.3452 5.60982 7.37612 5.55538 7.42278C5.50094 7.46944 5.46026 7.53006 5.43771 7.59813C5.41517 7.66619 5.41161 7.73911 5.42743 7.80905C5.44326 7.87898 5.47785 7.94327 5.5275 7.995L6.665 9.16583L6.40083 10.795C6.38789 10.8674 6.39579 10.9419 6.42361 11.0099C6.45144 11.0779 6.49803 11.1367 6.55796 11.1792C6.6179 11.2218 6.68869 11.2464 6.76209 11.2502C6.83549 11.254 6.90847 11.2369 6.9725 11.2008L8.33333 10.4458L9.69417 11.2008C9.7582 11.2369 9.83117 11.254 9.90457 11.2502C9.97797 11.2464 10.0488 11.2218 10.1087 11.1792C10.1686 11.1367 10.2152 11.0779 10.2431 11.0099C10.2709 10.9419 10.2788 10.8674 10.2658 10.795L10.0017 9.16583L11.1383 7.995C11.1889 7.94362 11.2242 7.87931 11.2406 7.80912C11.2569 7.73894 11.2535 7.66561 11.2309 7.59721C11.2082 7.52881 11.1671 7.46798 11.1121 7.42142C11.0571 7.37487 10.9904 7.34439 10.9192 7.33333L9.36417 7.09417L8.685 5.64167C8.65373 5.57469 8.60407 5.51798 8.54181 5.47815C8.47955 5.43831 8.40725 5.41699 8.33333 5.41667C8.1875 5.41667 8.0475 5.5 7.98083 5.64167Z" fill="#091E42" fill-opacity="0.31"/>
                  </svg>

                  <span class="text-xs text-gray-600">VIN: {{ viewingVehicle?.vin }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.166 8.3375V15.8333H5.83268V4.16667H10.8243V6.24167C10.8243 6.57319 10.956 6.89113 11.1905 7.12555C11.4249 7.35997 11.7428 7.49167 12.0743 7.49167H15.8243V7.05667C15.8243 6.80917 15.7143 6.575 15.5252 6.41667L11.2968 2.88667C10.9968 2.63667 10.6193 2.5 10.2285 2.5H5.83268C5.39065 2.5 4.96673 2.67559 4.65417 2.98816C4.34161 3.30072 4.16602 3.72464 4.16602 4.16667V15.8333C4.16602 16.2754 4.34161 16.6993 4.65417 17.0118C4.96673 17.3244 5.39065 17.5 5.83268 17.5H14.166C14.608 17.5 15.032 17.3244 15.3445 17.0118C15.6571 16.6993 15.8327 16.2754 15.8327 15.8333V8.3375H14.166Z" fill="#091E42" fill-opacity="0.31"/>
<path d="M12.4993 10H7.49935C7.03911 10 6.66602 10.3731 6.66602 10.8333C6.66602 11.2936 7.03911 11.6667 7.49935 11.6667H12.4993C12.9596 11.6667 13.3327 11.2936 13.3327 10.8333C13.3327 10.3731 12.9596 10 12.4993 10Z" fill="#091E42" fill-opacity="0.31"/>
<path d="M9.16602 12.5H7.49935C7.03911 12.5 6.66602 12.8731 6.66602 13.3333C6.66602 13.7936 7.03911 14.1667 7.49935 14.1667H9.16602C9.62625 14.1667 9.99935 13.7936 9.99935 13.3333C9.99935 12.8731 9.62625 12.5 9.16602 12.5Z" fill="#091E42" fill-opacity="0.31"/>
</svg>

                  <span class="text-xs text-gray-600">Orders Completed: {{ viewingVehicle?.ordersCompleted }}</span>
                </div>
              </div>
            </div>
            
              <div class="flex items-center gap-3">
                <div class="bg-white rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">Status</div>
                  <div class="flex items-center gap-4">
                    <Pill 
                      :type="viewingVehicle?.status === 'Active' ? 'cash-and-carry' : 'pending-tier'"
                      :text="viewingVehicle?.status || 'Unknown'"
                    />
                    <div class="w-px h-4 bg-gray-300"></div>
                    <Pill 
                      type="pending-tier"
                      :text="'Next Due: ' + (viewingVehicle?.nextDue || 'N/A')"
                    />
                  </div>
                </div>
              </div>
          </div>
          
        </div>

        <!-- Tab Navigation -->
        <div class="bg-white border-b border-gray-200 px-6 pt-5">
          <div class="flex items-center justify-between">
            <div class="flex space-x-8">
              <button 
                v-for="tab in vehicleTabs" 
                :key="tab.id"
                @click="activeVehicleTab = tab.id"
                :class="[
                  'pb-2 text-sm font-medium border-b-2 transition-colors',
                  activeVehicleTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center gap-3 pb-1">
              <Button 
                type="yellow-btn"
                :onClick="logServiceFromViewModal"
                classStyle="flex items-center gap-2 px-3 py-1 text-sm"
              >
                <!-- Gear Icon -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.376 6.455L10.624 3.351C11.416 2.882 12.587 2.884 13.376 3.351L18.624 6.455C19.416 6.923 20 7.962 20 8.895V15.105C20 16.041 19.413 17.078 18.624 17.545L13.376 20.649C12.584 21.118 11.413 21.116 10.624 20.649L5.376 17.545C4.584 17.077 4 16.038 4 15.105V8.895C4 7.959 4.587 6.922 5.376 6.455ZM12.366 5.141C12.201 5.043 11.8 5.043 11.633 5.141L6.385 8.245C6.219 8.343 6.018 8.699 6.018 8.895V15.105C6.018 15.3 6.218 15.656 6.385 15.755L11.633 18.859C11.799 18.957 12.2 18.957 12.367 18.859L17.615 15.755C17.781 15.657 17.982 15.301 17.982 15.105V8.895C17.982 8.7 17.782 8.344 17.615 8.245L12.366 5.141Z" fill="#172B4D"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#172B4D"/>
                </svg>

                Log Service
              </Button>
              <Button 
                type="gray-btn"
                :onClick="editFromViewModal"
                classStyle="flex items-center gap-2 px-3 py-1 text-sm"
              >
                <!-- Pencil Icon -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                </svg>

                Edit Details
              </Button>
            </div>
          </div>
        </div>

        <!-- Simple Content -->
        <div class="flex-1 overflow-y-auto min-h-0 px-6 py-6 pb-0">
          <!-- Summary Tab -->
          <div v-if="activeVehicleTab === 'summary'" class="space-y-6 pb-6">
            <!-- Summary Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Summary</h3>
              <div class="grid grid-cols-2 gap-6">
                <!-- Left Column -->
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Manufacturer:</label>
                    <p class="text-sm text-gray-900">{{ viewingVehicle?.manufacturer || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">VIN:</label>
                    <p class="text-sm text-gray-900">{{ viewingVehicle?.vin || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Year:</label>
                    <p class="text-sm text-gray-900">{{ viewingVehicle?.year || 'N/A' }}</p>
                  </div>
                </div>
                
                <!-- Right Column -->
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Model:</label>
                    <p class="text-sm text-gray-900">{{ viewingVehicle?.model || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Vehicle Type:</label>
                    <p class="text-sm text-gray-900">{{ viewingVehicle?.vehicleType || 'N/A' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Purchase Date:</label>
                    <p class="text-sm text-gray-900 flex items-center gap-1">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2H16.005C17.107 2 18 2.895 18 3.994V16.006C18 16.2679 17.9484 16.5273 17.8481 16.7693C17.7478 17.0113 17.6009 17.2312 17.4156 17.4163C17.2304 17.6015 17.0104 17.7484 16.7684 17.8485C16.5263 17.9487 16.2669 18.0001 16.005 18H1.995C1.46607 18 0.958782 17.7899 0.584675 17.416C0.210569 17.0421 0.00026513 16.5349 0 16.006V3.994C0 2.893 0.892 2 1.995 2ZM2 6V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V6H2ZM3 1C3 0.734784 3.10536 0.48043 3.29289 0.292893C3.48043 0.105357 3.73478 0 4 0C4.26522 0 4.51957 0.105357 4.70711 0.292893C4.89464 0.48043 5 0.734784 5 1V2H3V1ZM13 1C13 0.734784 13.1054 0.48043 13.2929 0.292893C13.4804 0.105357 13.7348 0 14 0C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V2H13V1ZM4 10V7.999H6V10H4ZM12 10V7.999H14V10H12ZM8 10V7.999H10.001V10H8ZM4 14V12H6V14H4ZM8 14V12H10.001V14H8ZM12 14V12H14V14H12Z" fill="#626F86"/>
                      </svg>

                      {{ viewingVehicle?.purchaseDate || 'N/A' }}

                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Service Details Section -->
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Service Details</h3>
                <div class="border-b border-gray-200 mt-2"></div>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="text-sm font-medium text-gray-500">Last Serviced Date:</label>
                  <p class="text-sm text-[#626F86] flex items-center gap-1 mt-1">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2.5H16.005C17.107 2.5 18 3.395 18 4.494V16.506C18 16.7679 17.9484 17.0273 17.8481 17.2693C17.7478 17.5113 17.6009 17.7312 17.4156 17.9163C17.2304 18.1015 17.0104 18.2484 16.7684 18.3485C16.5263 18.4487 16.2669 18.5001 16.005 18.5H1.995C1.46607 18.5 0.958782 18.2899 0.584675 17.916C0.210569 17.5421 0.00026513 17.0349 0 16.506V4.494C0 3.393 0.892 2.5 1.995 2.5ZM2 6.5V15.5C2 15.7652 2.10536 16.0196 2.29289 16.2071C2.48043 16.3946 2.73478 16.5 3 16.5H15C15.2652 16.5 15.5196 16.3946 15.7071 16.2071C15.8946 16.0196 16 15.7652 16 15.5V6.5H2ZM3 1.5C3 1.23478 3.10536 0.98043 3.29289 0.792893C3.48043 0.605357 3.73478 0.5 4 0.5C4.26522 0.5 4.51957 0.605357 4.70711 0.792893C4.89464 0.98043 5 1.23478 5 1.5V2.5H3V1.5ZM13 1.5C13 1.23478 13.1054 0.98043 13.2929 0.792893C13.4804 0.605357 13.7348 0.5 14 0.5C14.2652 0.5 14.5196 0.605357 14.7071 0.792893C14.8946 0.98043 15 1.23478 15 1.5V2.5H13V1.5ZM4 10.5V8.499H6V10.5H4ZM12 10.5V8.499H14V10.5H12ZM8 10.5V8.499H10.001V10.5H8ZM4 14.5V12.5H6V14.5H4ZM8 14.5V12.5H10.001V14.5H8ZM12 14.5V12.5H14V14.5H12Z" fill="#626F86"/>
                    </svg>
                    {{ viewingVehicle?.lastServiced || 'N/A' }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Next Due:</label>
                  <p class="text-sm text-[#626F86] flex items-center gap-1 mt-1">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2.5H16.005C17.107 2.5 18 3.395 18 4.494V16.506C18 16.7679 17.9484 17.0273 17.8481 17.2693C17.7478 17.5113 17.6009 17.7312 17.4156 17.9163C17.2304 18.1015 17.0104 18.2484 16.7684 18.3485C16.5263 18.4487 16.2669 18.5001 16.005 18.5H1.995C1.46607 18.5 0.958782 18.2899 0.584675 17.916C0.210569 17.5421 0.00026513 17.0349 0 16.506V4.494C0 3.393 0.892 2.5 1.995 2.5ZM2 6.5V15.5C2 15.7652 2.10536 16.0196 2.29289 16.2071C2.48043 16.3946 2.73478 16.5 3 16.5H15C15.2652 16.5 15.5196 16.3946 15.7071 16.2071C15.8946 16.0196 16 15.7652 16 15.5V6.5H2ZM3 1.5C3 1.23478 3.10536 0.98043 3.29289 0.792893C3.48043 0.605357 3.73478 0.5 4 0.5C4.26522 0.5 4.51957 0.605357 4.70711 0.792893C4.89464 0.98043 5 1.23478 5 1.5V2.5H3V1.5ZM13 1.5C13 1.23478 13.1054 0.98043 13.2929 0.792893C13.4804 0.605357 13.7348 0.5 14 0.5C14.2652 0.5 14.5196 0.605357 14.7071 0.792893C14.8946 0.98043 15 1.23478 15 1.5V2.5H13V1.5ZM4 10.5V8.499H6V10.5H4ZM12 10.5V8.499H14V10.5H12ZM8 10.5V8.499H10.001V10.5H8ZM4 14.5V12.5H6V14.5H4ZM8 14.5V12.5H10.001V14.5H8ZM12 14.5V12.5H14V14.5H12Z" fill="#626F86"/>
                    </svg>
                    {{ viewingVehicle?.nextDue || 'N/A' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Service History Tab -->
          <div v-else-if="activeVehicleTab === 'service-history'" class="space-y-6 pb-6">
            <Datatable
              :items="serviceHistoryData"
              :columns="serviceHistoryColumns"
              :searchable="true"
              :printable="true"
              :exportable="true"
              pageName="Service History"
            >
              <template #column="col">
                <div v-if="col.props.column.field === 'action'">
                  <TableActionDropdown :rowData="col.props?.formattedRow">
                    <template #default="{ selectedItem, closeDropdown }">
                      <!-- Edit Log Entry -->
                      <li @click="editServiceEntry(selectedItem); closeDropdown()" 
                          class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354L12.427 2.487zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064L11.189 6.25z" fill="currentColor"/>
                        </svg>
                        Edit Log Entry
                      </li>
                      
                      <!-- Delete -->
                      <li @click="deleteServiceEntry(selectedItem); closeDropdown()" 
                          class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text text-red-600">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C17.8946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 17.8946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.7072 10.1324 17.2539 10.1922C17.8007 10.2521 17.8332 10.3218 17.8489 10.3961C17.8647 10.4704 17.8634 10.5473 17.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7C14.5 7.26522 14.3946 7.51957 14.2071 7.70711C14.0196 7.89464 13.7652 8 13.5 8H11.5C11.2348 8 10.9804 7.89464 10.7929 7.70711C10.6054 7.51957 10.5 7.26522 10.5 7C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="currentColor"/>
                        </svg>
                        Delete
                      </li>
                    </template>
                  </TableActionDropdown>
                </div>
              </template>
            </Datatable>
          </div>

          <!-- Order History Tab -->
          <div v-else-if="activeVehicleTab === 'order-history'" class="space-y-6 pb-6">
            <!-- Search and Filter Bar -->
            <div class="flex items-center justify-between py-4">
              <div class="flex border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm w-[281px] h-[34px]">
                <!-- Search Input -->
                <div class="flex items-center w-full gap-2 px-4 py-2 bg-gray-50">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search"
                    class="bg-transparent outline-none w-full text-[12px] font-[400] text-[#172B4D] text-medium dataTableSearch"
                  />
                </div>

                <!-- Filter Dropdown -->
                <div class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50" title="Filter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99951 13H16.9995L17.9995 11H5.99951L6.99951 13ZM3.99251 6C3.44451 6 3.20251 6.405 3.44651 6.895L3.99951 8H19.9995L20.5525 6.895C20.7995 6.4 20.5545 6 20.0065 6H3.99251ZM10.7775 17.556C10.8505 17.6861 10.9556 17.7953 11.0829 17.8731C11.2103 17.9508 11.3554 17.9945 11.5045 18H12.4945C12.7735 18 13.0995 17.8 13.2215 17.556L13.9995 16H9.99951L10.7775 17.556Z" fill="#44546F"/>
                  </svg>
                </div>

                <!-- Sort Dropdown -->
                <div class="flex items-center px-4 py-2 border-l-2 border-gray-300 bg-gray-50" title="Sort">
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 1V14M4.25 14L1 10.75M4.25 14L7.5 10.75M12.375 14V1M12.375 1L9.125 4.25M12.375 1L15.625 4.25" stroke="#44546F" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Route Accordions -->
            <div class="space-y-4">
              <!-- Route 1 - Expanded -->
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <!-- Route Header -->
                <div class="bg-white p-4 border-gray-200 cursor-pointer hover:bg-gray-50" @click="toggleRoute(1)">
                  <div class="flex items-center justify-between">
                    <div class="flex items-start gap-3">
                      <div class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97594 3.97917H13.0241C13.7358 3.97917 14.3125 4.55719 14.3125 5.26696V13.0247C14.3125 13.1939 14.2792 13.3614 14.2144 13.5177C14.1497 13.674 14.0547 13.816 13.9351 13.9355C13.8154 14.0551 13.6734 14.15 13.5171 14.2147C13.3608 14.2793 13.1932 14.3126 13.0241 14.3125H3.97594C3.63433 14.3125 3.30671 14.1768 3.0651 13.9354C2.82349 13.6939 2.68767 13.3663 2.6875 13.0247V5.26696C2.6875 4.5559 3.26358 3.97917 3.97594 3.97917ZM3.97917 6.5625V12.375C3.97917 12.5463 4.04721 12.7106 4.16833 12.8317C4.28944 12.9528 4.45371 13.0208 4.625 13.0208H12.375C12.5463 13.0208 12.7106 12.9528 12.8317 12.8317C12.9528 12.7106 13.0208 12.5463 13.0208 12.375V6.5625H3.97917ZM4.625 3.33333C4.625 3.16205 4.69304 2.99778 4.81416 2.87666C4.93528 2.75554 5.09955 2.6875 5.27083 2.6875C5.44212 2.6875 5.60639 2.75554 5.72751 2.87666C5.84862 2.99778 5.91667 3.16205 5.91667 3.33333V3.97917H4.625V3.33333ZM11.0833 3.33333C11.0833 3.16205 11.1514 2.99778 11.2725 2.87666C11.3936 2.75554 11.5579 2.6875 11.7292 2.6875C11.9005 2.6875 12.0647 2.75554 12.1858 2.87666C12.307 2.99778 12.375 3.16205 12.375 3.33333V3.97917H11.0833V3.33333ZM5.27083 9.14583V7.85352H6.5625V9.14583H5.27083ZM10.4375 9.14583V7.85352H11.7292V9.14583H10.4375ZM7.85417 9.14583V7.85352H9.14648V9.14583H7.85417ZM5.27083 11.7292V10.4375H6.5625V11.7292H5.27083ZM7.85417 11.7292V10.4375H9.14648V11.7292H7.85417ZM10.4375 11.7292V10.4375H11.7292V11.7292H10.4375Z" fill="#44546F"/>
                        </svg>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900">16/01/2025</div>
                        <div class="text-sm text-gray-600">Route: Ikeja Central → Yaba → Surulere → Apapa Port</div>
                        <!-- Driver, Total Orders, Total Value on new line -->
                        <div class="flex items-center gap-4 mt-2">
                          <div class="flex items-left flex-col">
                            <span class="text-xs text-gray-600">Driver:</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">Michael Okpala</span>
                          </div>
                          <div class="w-px h-8 bg-gray-300"></div>
                            <div class="flex items-left flex-col">
                              <span class="text-xs text-gray-600">Total Orders:</span>
                              <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm w-fit">2</span>
                            </div>
                          <div class="w-px h-8 bg-gray-300"></div>
                          <div class="flex items-left flex-col">
                            <span class="text-xs text-gray-600">Total Value:</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">₦4,110,086.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="expandedRoutes.includes(1)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <!-- Expanded Content - Orders Datatable -->
                <div v-if="expandedRoutes.includes(1)" class="bg-gray-50 pt-0">
                  <Datatable
                    :items="route1Orders"
                    :columns="orderHistoryColumns"
                    :searchable="false"
                    :printable="false"
                    :exportable="false"
                    :showActions="false"
                    :showPagination="false"
                    :showHeader="false"
                    pageName="Route Orders"
                  >
                    <template #column="col">
                      <span v-if="col.props.column.field === 'status'">
                        <Pill 
                          type="cash-and-carry"
                          text="Delivered"
                        />
                      </span>
                    </template>
                  </Datatable>
                </div>
              </div>

              <!-- Route 2 - Collapsed -->
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <!-- Route Header -->
                <div class="bg-white p-4 border-gray-200 cursor-pointer hover:bg-gray-50" @click="toggleRoute(2)">
                  <div class="flex items-center justify-between">
                    <div class="flex items-start gap-3">
                      <div class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97594 3.97917H13.0241C13.7358 3.97917 14.3125 4.55719 14.3125 5.26696V13.0247C14.3125 13.1939 14.2792 13.3614 14.2144 13.5177C14.1497 13.674 14.0547 13.816 13.9351 13.9355C13.8154 14.0551 13.6734 14.15 13.5171 14.2147C13.3608 14.2793 13.1932 14.3126 13.0241 14.3125H3.97594C3.63433 14.3125 3.30671 14.1768 3.0651 13.9354C2.82349 13.6939 2.68767 13.3663 2.6875 13.0247V5.26696C2.6875 4.5559 3.26358 3.97917 3.97594 3.97917ZM3.97917 6.5625V12.375C3.97917 12.5463 4.04721 12.7106 4.16833 12.8317C4.28944 12.9528 4.45371 13.0208 4.625 13.0208H12.375C12.5463 13.0208 12.7106 12.9528 12.8317 12.8317C12.9528 12.7106 13.0208 12.5463 13.0208 12.375V6.5625H3.97917ZM4.625 3.33333C4.625 3.16205 4.69304 2.99778 4.81416 2.87666C4.93528 2.75554 5.09955 2.6875 5.27083 2.6875C5.44212 2.6875 5.60639 2.75554 5.72751 2.87666C5.84862 2.99778 5.91667 3.16205 5.91667 3.33333V3.97917H4.625V3.33333ZM11.0833 3.33333C11.0833 3.16205 11.1514 2.99778 11.2725 2.87666C11.3936 2.75554 11.5579 2.6875 11.7292 2.6875C11.9005 2.6875 12.0647 2.75554 12.1858 2.87666C12.307 2.99778 12.375 3.16205 12.375 3.33333V3.97917H11.0833V3.33333ZM5.27083 9.14583V7.85352H6.5625V9.14583H5.27083ZM10.4375 9.14583V7.85352H11.7292V9.14583H10.4375ZM7.85417 9.14583V7.85352H9.14648V9.14583H7.85417ZM5.27083 11.7292V10.4375H6.5625V11.7292H5.27083ZM7.85417 11.7292V10.4375H9.14648V11.7292H7.85417ZM10.4375 11.7292V10.4375H11.7292V11.7292H10.4375Z" fill="#44546F"/>
                        </svg>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900">16/01/2025</div>
                        <div class="text-sm text-gray-600">Route: Ikeja Central → VI → Lekki Phase 1</div>
                        <!-- Driver, Total Orders, Total Value on new line -->
                        <div class="flex items-center gap-4 mt-2">
                          <div class="flex items-left flex-col">
                            <span class="text-xs text-gray-600">Driver:</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">Henry Christopher</span>
                          </div>
                          <div class="w-px h-8 bg-gray-300"></div>
                          <div class="flex items-left flex-col">
                            <span class="text-xs text-gray-600">Total Orders:</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm w-fit">2</span>
                          </div>
                          <div class="w-px h-8 bg-gray-300"></div>
                          <div class="flex items-left flex-col">
                            <span class="text-xs text-gray-600">Total Value:</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">₦4,110,086.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="expandedRoutes.includes(2)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <!-- Expanded Content - Orders Datatable -->
                <div v-if="expandedRoutes.includes(2)" class="bg-gray-50 pt-0">
                  <Datatable
                    :items="route1Orders"
                    :columns="orderHistoryColumns"
                    :searchable="false"
                    :printable="false"
                    :exportable="false"
                    :showActions="false"
                    :showPagination="false"
                    :showHeader="false"
                    pageName="Route Orders"
                  >
                    <template #column="col">
                      <span v-if="col.props.column.field === 'status'">
                        <Pill 
                          type="cash-and-carry"
                          text="Delivered"
                        />
                      </span>
                    </template>
                  </Datatable>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents Tab -->
          <div v-else-if="activeVehicleTab === 'documents'" class="h-full flex flex-col">
            <div class="flex gap-6 flex-1 min-h-0">
              <!-- Left Panel - Document List -->
              <div class="w-1/3 rounded-lg overflow-hidden" style="background-color: #fff;">
                <div class="flex-1 overflow-y-auto">
                  <!-- Document List -->
                  <div class="space-y-1">
                    <div 
                      v-for="document in allVehicleDocuments" 
                      :key="document.id"
                      class="flex items-center gap-2 cursor-pointer transition-colors"
                      :class="selectedVehicleDocument && selectedVehicleDocument.id === document.id ? 'bg-[#F1F2F4]' : 'bg-white'"
                      style="padding: 18px 16px;"
                      @click="selectVehicleDocument(document)"
                    >
                      <div class="w-6 h-6 rounded flex items-center justify-center" :class="document.iconBg">
                        <svg class="w-3 h-3" :class="document.iconColor" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      <span class="text-xs font-medium" style="color: #172B4D;">{{ document.name }}</span>
                      <!-- Alert icon for Hackney Permit -->
                      <svg v-if="document.name === 'Hackney Permit'" class="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" fill="#C9372C"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Panel - Document Preview -->
              <div class="flex-1 bg-white rounded-lg overflow-hidden" style="background-color: #F7F8F9;">
                <div v-if="selectedVehicleDocument" class="h-full flex flex-col">
                  <!-- Document Header -->
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-sm font-medium" style="color: #172B4D;">{{ selectedVehicleDocument?.name }}</h3>
                        <p class="text-xs text-gray-500 mt-1">{{ selectedVehicleDocument?.filename }}</p>
                      </div>
                      
                      <!-- Document Controls -->
                      <div class="flex items-center gap-2">
                        <!-- Zoom Controls -->
                        <button class="p-1 hover:bg-gray-100 rounded">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49928 1.91687e-08C10.0952 -0.000107143 11.659 0.449106 13.0116 1.29623C14.3642 2.14336 15.4509 3.35417 16.1475 4.79009C16.8441 6.22602 17.1223 7.82905 16.9504 9.41573C16.7784 11.0024 16.1633 12.5086 15.1753 13.762L18.8273 17.414C19.0094 17.6026 19.1102 17.8552 19.108 18.1174C19.1057 18.3796 19.0005 18.6304 18.8151 18.8158C18.6297 19.0012 18.3789 19.1064 18.1167 19.1087C17.8545 19.111 17.6019 19.0102 17.4133 18.828L13.7613 15.176C12.6967 16.015 11.447 16.5872 10.1163 16.8449C8.78562 17.1026 7.4126 17.0384 6.11179 16.6576C4.81098 16.2768 3.6201 15.5904 2.63851 14.6557C1.65692 13.7211 0.913084 12.5652 0.469055 11.2846C0.0250263 10.004 -0.106316 8.63574 0.0859852 7.29404C0.278287 5.95235 0.788656 4.67609 1.57451 3.57175C2.36037 2.46742 3.39893 1.56702 4.60353 0.945694C5.80814 0.324364 7.14387 0.000115492 8.49928 1.91687e-08ZM8.49928 2C6.77537 2 5.12207 2.68482 3.90308 3.90381C2.6841 5.12279 1.99928 6.77609 1.99928 8.5C1.99928 10.2239 2.6841 11.8772 3.90308 13.0962C5.12207 14.3152 6.77537 15 8.49928 15C10.2232 15 11.8765 14.3152 13.0955 13.0962C14.3145 11.8772 14.9993 10.2239 14.9993 8.5C14.9993 6.77609 14.3145 5.12279 13.0955 3.90381C11.8765 2.68482 10.2232 2 8.49928 2ZM11.9993 7.5C12.2645 7.5 12.5188 7.60536 12.7064 7.79289C12.8939 7.98043 12.9993 8.23478 12.9993 8.5C12.9993 8.76522 12.8939 9.01957 12.7064 9.20711C12.5188 9.39464 12.2645 9.5 11.9993 9.5H4.99928C4.73406 9.5 4.47971 9.39464 4.29217 9.20711C4.10463 9.01957 3.99928 8.76522 3.99928 8.5C3.99928 8.23478 4.10463 7.98043 4.29217 7.79289C4.47971 7.60536 4.73406 7.5 4.99928 7.5H11.9993Z" fill="#44546F"/>
                          </svg>
                        </button>
                        <span class="text-xs text-gray-600 px-2">100%</span>
                        <button class="p-1 hover:bg-gray-100 rounded">
                          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49928 2.06021e-08C10.0675 -0.000109149 11.6052 0.433645 12.9423 1.25327C14.2793 2.07289 15.3635 3.24643 16.0749 4.64403C16.7864 6.04163 17.0973 7.6088 16.9733 9.17214C16.8492 10.7355 16.2951 12.234 15.3723 13.502L15.1753 13.762L18.8273 17.414C19.0085 17.5935 19.1143 17.8356 19.123 18.0905C19.1316 18.3455 19.0425 18.5942 18.8738 18.7856C18.7051 18.977 18.4697 19.0967 18.2157 19.1202C17.9616 19.1437 17.7082 19.0692 17.5073 18.912L17.4133 18.828L13.7613 15.176C12.6967 16.015 11.447 16.5872 10.1163 16.8449C8.78562 17.1026 7.4126 17.0384 6.11179 16.6576C4.81098 16.2768 3.6201 15.5904 2.63851 14.6557C1.65692 13.7211 0.913084 12.5652 0.469055 11.2846C0.0250263 10.004 -0.106316 8.63574 0.0859852 7.29404C0.278287 5.95235 0.788656 4.67609 1.57451 3.57175C2.36037 2.46742 3.39893 1.56702 4.60353 0.945694C5.80814 0.324364 7.14387 0.000115493 8.49928 2.06021e-08ZM8.49928 2C6.77537 2 5.12207 2.68482 3.90308 3.90381C2.6841 5.12279 1.99928 6.77609 1.99928 8.5C1.99928 10.2239 2.6841 11.8772 3.90308 13.0962C5.12207 14.3152 6.77537 15 8.49928 15C10.2232 15 11.8765 14.3152 13.0955 13.0962C14.3145 11.8772 14.9993 10.2239 14.9993 8.5C14.9993 6.77609 14.3145 5.12279 13.0955 3.90381C11.8765 2.68482 10.2232 2 8.49928 2ZM8.49928 4C8.74421 4.00003 8.98061 4.08996 9.16365 4.25272C9.34668 4.41547 9.46362 4.63975 9.49228 4.883L9.49928 5V7.5H11.9993C12.2542 7.50028 12.4993 7.59788 12.6846 7.77285C12.87 7.94782 12.9815 8.18695 12.9964 8.44139C13.0114 8.69584 12.9286 8.94638 12.765 9.14183C12.6014 9.33729 12.3694 9.4629 12.1163 9.493L11.9993 9.5H9.49928V12C9.49899 12.2549 9.4014 12.5 9.22643 12.6854C9.05146 12.8707 8.81232 12.9822 8.55788 12.9972C8.30344 13.0121 8.0529 12.9293 7.85744 12.7657C7.66199 12.6021 7.53638 12.3701 7.50628 12.117L7.49928 12V9.5H4.99928C4.7444 9.49972 4.49924 9.40212 4.31391 9.22715C4.12857 9.05218 4.01704 8.81305 4.00211 8.55861C3.98717 8.30416 4.06995 8.05362 4.23354 7.85817C4.39713 7.66271 4.62918 7.5371 4.88228 7.507L4.99928 7.5H7.49928V5C7.49928 4.73478 7.60463 4.48043 7.79217 4.29289C7.97971 4.10536 8.23406 4 8.49928 4Z" fill="#44546F"/>
                          </svg>
                        </button>
                        
                        <!-- Download Button -->
                        <button class="p-1 hover:bg-gray-100 rounded">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
                            <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Document Preview -->
                  <div class="flex-1 p-4 bg-gray-50 flex items-center justify-center overflow-y-auto">
                    <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm max-w-md w-full">
                      <!-- Mock Vehicle License Document -->
                      <div class="text-center space-y-4">
                        <div class="text-lg font-bold text-blue-600">LAGOS STATE VEHICLE LICENSE</div>
                        <div class="text-sm text-gray-600">PRIVATE CAR</div>
                        
                        <div class="space-y-2 text-left">
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">PIN:</span>
                            <span class="text-xs font-medium">8512875202052997743</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Reg. Number:</span>
                            <span class="text-xs font-medium">{{ viewingVehicle?.plateNumber || 'KJA-123BC' }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Engine Number:</span>
                            <span class="text-xs font-medium">1ZZ8690840</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Chassis Number:</span>
                            <span class="text-xs font-medium">2T1BR32E57C834029</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Vehicle Make:</span>
                            <span class="text-xs font-medium">{{ (viewingVehicle?.manufacturer as any)?.name || 'Toyota' }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Vehicle Model:</span>
                            <span class="text-xs font-medium">{{ (viewingVehicle?.model as any)?.name || 'Corolla' }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Color:</span>
                            <span class="text-xs font-medium">Custom</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Engine Capacity:</span>
                            <span class="text-xs font-medium">1.6-2.0</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Transaction Date:</span>
                            <span class="text-xs font-medium">29/May/2020</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Date Issued:</span>
                            <span class="text-xs font-medium">20/05/2020</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">Expiry Date:</span>
                            <span class="text-xs font-medium">20/05/2021</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-xs text-gray-600">SMS Fee:</span>
                            <span class="text-xs font-medium">200</span>
                          </div>
                        </div>
                        
                        <div class="text-xs text-gray-500 mt-4 p-2 bg-yellow-50 rounded">
                          You have paid #500 fee for Radio License for this year.
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Document Footer -->
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <div class="text-xs text-gray-500">
                        Expires: 13/05/2022
                      </div>
                     <div class="flex gap-2">
                       <Button 
                         type="blue-btn"
                         :onClick="updateDocument"
                         classStyle="px-3 py-1 text-xs"
                       >
                         Update Document
                       </Button>
                       <Button 
                         type="red-btn"
                         :onClick="deleteDocument"
                         classStyle="px-3 py-1 text-xs"
                       >
                         Delete Document
                       </Button>
                     </div>
                    </div>
                  </div>
                </div>
                
                <!-- No Document Selected State -->
                <div v-else class="h-full flex items-center justify-center">
                  <div class="text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-sm">Select a document to view</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <!-- Delete Button -->
          <Button 
            type="red-btn"
            :onClick="deleteFromViewModal"
            classStyle="w-10 h-10 p-0 flex items-center justify-center"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C17.8946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 17.8946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.7072 10.1324 17.2539 10.1922C17.8007 10.2521 17.8332 10.3218 17.8489 10.3961C17.8647 10.4704 17.8634 10.5473 17.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7C14.5 7.26522 14.3946 7.51957 14.2071 7.70711C14.0196 7.89464 13.7652 8 13.5 8H11.5C11.2348 8 10.9804 7.89464 10.7929 7.70711C10.6054 7.51957 10.5 7.26522 10.5 7C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="white"/>
            </svg>
          </Button>
          
          <!-- Close Button -->
          <Button 
            type="blue-btn"
            :onClick="closeViewVehicleModal"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Log Service Entry Modal -->
    <SideBarModal :isOpen="showLogServiceModal" @close="closeLogServiceModal" width="small">
      <template #header>
        <SideBarHead title="Log Service Entry">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <template #default="slotProps">
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div>
              <label>Vehicle</label>
              <SelectField 
                v-model="logServiceData.vehicle"
                :options="vehicles.map(v => ({ id: v.id, name: v.plateNumber }))"
                placeholder="Select a vehicle"
              />
            </div>
            
            <div>
              <label>Service Date</label>
              <DateInput 
                v-model="logServiceData.serviceDate"
                placeholder="dd/mm/yyyy"
              />
            </div>
            
            <div>
              <label>Service Type</label>
              <SelectField 
                v-model="logServiceData.serviceType"
                :options="serviceTypeOptions"
                placeholder="Select a service type"
              />
              <p class="text-xs text-gray-500 mt-1">Choose all applicable options.</p>
            </div>
            
            <div>
              <label>Description</label>
              <textarea 
                v-model="logServiceData.description"
                placeholder="Add additional details or notes about the service performed"
                class="w-full h-24 resize-none border-2 border-gray-300 rounded-lg p-2"
  
              ></textarea>
            </div>
            
            <div>
              <label>Amount</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                <input 
                  v-model="logServiceData.amount"
                  type="number" 
                  placeholder="--"
                  class="w-full pl-8"
                />
              </div>
            </div>
            
            <div>
              <label>Service Provider</label>
              <input 
                v-model="logServiceData.serviceProvider"
                type="text" 
                placeholder="Enter a service provider name"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </template>
      
      <template #footer="slotProps">
        <div class="flex items-center justify-end gap-3">
          <Button 
            type="gray-btn"
            :onClick="closeLogServiceModal"
            classStyle="px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            type="blue-btn"
            :onClick="saveLogServiceEntry"
            classStyle="px-4 py-2"
          >
            Save
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Edit Service Entry Modal -->
    <SideBarModal :isOpen="showEditServiceEntryModal" @close="closeEditServiceEntryModal" width="small">
      <template #header>
        <SideBarHead :title="'Edit Service Entry - ' + (viewingVehicle?.plateNumber || '') + ' - ' + (viewingVehicle?.model || '')">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
      <template #default="slotProps">
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div>
              <label>Vehicle</label>
              <SelectField 
                v-model="serviceEntryForm.vehicle"
                :options="vehicleOptions"
                placeholder="Select a vehicle"
                :disabled="true"
              />
            </div>
            
            <div>
              <label>Service Date</label>
              <DateInput 
                v-model="serviceEntryForm.serviceDate"
                placeholder="dd/mm/yyyy"
              />
            </div>
            
            <div>
              <label>Service Type</label>
              <SelectField 
                v-model="serviceEntryForm.serviceType"
                :options="serviceTypeOptions"
                placeholder="Select a service type"
              />
            </div>
            
            <div>
              <label>Description</label>
              <textarea 
                v-model="serviceEntryForm.description"
                placeholder="Add additional details or notes about the service performed"
                class="w-full h-24 resize-none border-2 border-gray-300 rounded-lg p-2"
              ></textarea>
            </div>
            
            <div>
              <label>Amount</label>
              <NairaInput 
                v-model="serviceEntryForm.amount"
                placeholder="--"
              />
            </div>
            
            <div>
              <label>Service Provider</label>
              <input 
                v-model="serviceEntryForm.serviceProvider"
                type="text" 
                placeholder="Enter a service provider name"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </template>
      
      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <!-- Delete Button -->
          <Button 
            type="red-btn"
            :onClick="openDeleteServiceEntryModal"
            classStyle="w-10 h-10 p-0 flex items-center justify-center"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 7H17.5C17.7652 7 18.0196 7.10536 18.2071 7.29289C17.8946 7.48043 18.5 7.73478 18.5 8C18.5 8.26522 17.8946 8.51957 18.2071 8.70711C18.0196 8.89464 17.7652 9 17.5 9H7.5C7.23478 9 6.98043 8.89464 6.79289 8.70711C6.60536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7.5 7ZM10.28 18C10.0571 18 9.84054 17.9255 9.66479 17.7883C9.48905 17.6512 9.36417 17.4592 9.31 17.243L7.656 10.62C7.63782 10.5465 7.63659 10.4697 7.65239 10.3957C7.6682 10.3216 7.70064 10.252 7.74726 10.1923C7.79387 10.1326 7.85345 10.0843 7.92149 10.0509C7.98953 10.0176 8.06424 10.0002 8.14 10H16.86C16.9359 10 17.0109 10.0173 17.0791 10.0507C17.1474 10.084 17.7072 10.1324 17.2539 10.1922C17.8007 10.2521 17.8332 10.3218 17.8489 10.3961C17.8647 10.4704 17.8634 10.5473 17.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11.5 6H13.5C13.7652 6 14.0196 6.10536 14.2071 6.29289C14.3946 6.48043 14.5 6.73478 14.5 7C14.5 7.26522 14.3946 7.51957 14.2071 7.70711C14.0196 7.89464 13.7652 8 13.5 8H11.5C11.2348 8 10.9804 7.89464 10.7929 7.70711C10.6054 7.51957 10.5 7.26522 10.5 7C10.5 6.73478 10.6054 6.48043 10.7929 6.29289C10.9804 6.10536 11.2348 6 11.5 6Z" fill="white"/>
            </svg>
          </Button>

          <div class="flex items-center gap-3">
            <Button 
              type="gray-btn"
              :onClick="closeEditServiceEntryModal"
              classStyle="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="blue-btn"
              :onClick="updateServiceEntry"
              classStyle="px-4 py-2"
            >
              Update
            </Button>
          </div>
        </div>
      </template>
    </SideBarModal>

    <!-- Delete Service Entry Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteServiceEntryModal"
      :message="'Are you sure you want to delete this service entry?'"
      confirmText="Delete"
      @confirm="confirmDeleteServiceEntry"
      @cancel="closeDeleteServiceEntryModal"
    />

    <!-- Warning Service Entry Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningServiceEntryModal"
      title="Discard Changes"
      message=""
      :processName="warningProcessName"
      confirmText="Discard Changes"
      @confirm="confirmDiscardServiceEntry"
      @close="closeWarningServiceEntryModal"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="'Are you sure you want to delete vehicle \'' + (vehicleToDelete?.plateNumber || '') + '\'?'"
      confirmText="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningModal"
      title="Discard Changes"
      message=""
      :processName="warningProcessName"
      confirmText="Discard Changes"
      @confirm="confirmDiscard"
      @close="closeWarningModal"
    />

    <!-- Success Toast -->
    <SuccessAlertToast
      :isVisible="showSuccessToast"
      :message="successMessage"
      @close="showSuccessToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import Pill from '@/views/Components/ui/Pill.vue'
import Button from '@/views/Components/ui/Button.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import SideBarHead from '@/views/Components/ui/SideBarHead.vue'
import SelectField from '@/views/Components/ui/SelectField.vue'
import DateInput from '@/views/Components/ui/DateInput.vue'
import NairaInput from '@/views/Components/ui/NairaInput.vue'
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import type { TableColumn } from '@/types'

// Types
interface Vehicle {
  id: number
  plateNumber: string
  model: string
  vehicleType: string
  status: 'Active' | 'Maintenance'
  ordersCompleted: number
  orderAmount: string
  lastServiced: string
  nextDue: string
  currentlyAssigned: string
  manufacturer?: string
  year?: string
  vin?: string
  purchaseDate?: string
}

interface Option {
  id: number
  name: string
}

interface NewVehicle {
  plateNumber: string
  manufacturer: Option | null
  model: Option | null
  vehicleType: Option | null
  year: string
  vin: string
  purchaseDate: string
}

interface LogServiceEntry {
  vehicle: Option | null
  serviceDate: string
  serviceType: Option | null
  description: string
  amount: string
  serviceProvider: string
}

// Reactive state

// Modal states
const showAddVehicleModal = ref(false)
const showEditVehicleModal = ref(false)
const showViewVehicleModal = ref(false)
const showLogServiceModal = ref(false)
const showDeleteModal = ref(false)
const showWarningModal = ref(false)
const showEditServiceEntryModal = ref(false)
const showDeleteServiceEntryModal = ref(false)
const showWarningServiceEntryModal = ref(false)

// Form data
const newVehicle = ref<NewVehicle>({
  plateNumber: '',
  manufacturer: null,
  model: null,
  vehicleType: null,
  year: '',
  vin: '',
  purchaseDate: ''
})

const editingVehicle = ref<NewVehicle>({
  plateNumber: '',
  manufacturer: null,
  model: null,
  vehicleType: null,
  year: '',
  vin: '',
  purchaseDate: ''
})
const logServiceData = ref<LogServiceEntry>({
  vehicle: null,
  serviceDate: '',
  serviceType: null,
  description: '',
  amount: '',
  serviceProvider: ''
})

const vehicleToDelete = ref<Vehicle | null>(null)
const viewingVehicle = ref<Vehicle | null>(null)
const warningProcessName = ref('')

// Service Entry form data
const editingServiceEntry = ref<any>(null)
const serviceEntryForm = ref<LogServiceEntry>({
  vehicle: null,
  serviceDate: '',
  serviceType: null,
  description: '',
  amount: '',
  serviceProvider: ''
})
const originalServiceEntryData = ref<LogServiceEntry | null>(null)
const serviceEntryToDelete = ref<any>(null)

// Vehicle tabs
const activeVehicleTab = ref('summary')
const vehicleTabs = [
  { id: 'summary', label: 'Summary' },
  { id: 'service-history', label: 'Service History' },
  { id: 'order-history', label: 'Order History' },
  { id: 'documents', label: 'Documents' }
]

// Service History Data
const serviceHistoryData = ref([
  {
    id: 1,
    type: 'Oil Change',
    serviceProvider: 'AutoCare Center',
    amount: '₦2,055,043.00',
    notes: 'Regular maintenance',
    date: '16/01/2025'
  },
  {
    id: 2,
    type: 'Tire Rotation',
    serviceProvider: 'AutoCare Center',
    amount: '₦2,055,043.00',
    notes: 'Front tires moved to back',
    date: '16/01/2025'
  },
  {
    id: 3,
    type: 'Brake Inspection',
    serviceProvider: 'AutoCare Center',
    amount: '₦2,055,043.00',
    notes: 'Full brake system check',
    date: '16/01/2025'
  }
])

// Service History Columns
const serviceHistoryColumns = ref([
  { field: 'type', label: 'Type', sortable: true },
  { field: 'serviceProvider', label: 'Service Provider', sortable: true },
  { field: 'amount', label: 'Amount', sortable: true },
  { field: 'notes', label: 'Notes', sortable: true },
  { field: 'date', label: 'Date', sortable: true },
  { field: 'action', label: 'Action', sortable: false }
])

// Order History Data
const route1Orders = ref([
  {
    id: 1,
    orderNo: 'RHPO-1651244214',
    storeName: 'Emeka Pharmacy',
    address: '11 Ademola Adentokumbo',
    orderAmount: '₦2,055,043.00',
    status: 'Delivered',
    deliveryDate: '16/01/2025'
  },
  {
    id: 2,
    orderNo: 'RHPO-1651244214',
    storeName: 'Xela Pharmacy',
    address: '11 Ademola Adentokumbo',
    orderAmount: '₦2,055,043.00',
    status: 'Delivered',
    deliveryDate: '16/01/2025'
  }
])

const orderHistoryColumns = ref([
  { field: 'orderNo', label: 'Order No.', sortable: true },
  { field: 'storeName', label: 'Store Name', sortable: true },
  { field: 'address', label: 'Address', sortable: false },
  { field: 'orderAmount', label: 'Order Amount', sortable: true },
  { field: 'status', label: 'Status', sortable: true },
  { field: 'deliveryDate', label: 'Delivery Date', sortable: true }
])

// Route accordion state
const expandedRoutes = ref([1]) // Route 1 is expanded by default

// Success toast
const showSuccessToast = ref(false)
const successMessage = ref('')

// Original form data for change tracking
const originalNewVehicle = ref<NewVehicle | null>(null)
const originalEditingVehicle = ref<NewVehicle | null>(null)
const originalLogServiceData = ref<LogServiceEntry | null>(null)

// Vehicle data
const vehicles = ref<Vehicle[]>([
  { id: 1, plateNumber: 'FST-819GA', model: 'IVM 500', vehicleType: 'Car', status: 'Active', ordersCompleted: 87, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Unassigned' },
  { id: 2, plateNumber: 'KJA-123BC', model: 'Toyota HiAce', vehicleType: 'Van', status: 'Active', ordersCompleted: 54, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Michael Okpala' },
  { id: 3, plateNumber: 'GGE-789FG', model: 'Ford Transit', vehicleType: 'Car', status: 'Maintenance', ordersCompleted: 30, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Unassigned' },
  { id: 4, plateNumber: 'APP-456DE', model: 'Isuzu N-Series', vehicleType: 'Truck', status: 'Active', ordersCompleted: 87, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Oluwatosin Adegboye' },
  { id: 5, plateNumber: 'LAG-321HI', model: 'Mitsubishi Fuso Canter', vehicleType: 'Truck', status: 'Active', ordersCompleted: 51, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Henry Christopher' },
  { id: 6, plateNumber: 'ABJ-654JK', model: 'Honda CB125F', vehicleType: 'Motorcycle', status: 'Active', ordersCompleted: 21, orderAmount: '₦2,055,043.00', lastServiced: '5/21/2024', nextDue: '5/21/2024', currentlyAssigned: 'Josh Michael' }
])

// Vehicle documents data (flat list)
const allVehicleDocuments = ref([
  {
    id: 1,
    name: 'Vehicle License Certificate',
    filename: 'Vehicle_License_Certificate.pdf',
    type: 'license',
    url: '/path/to/vehicle-license.pdf',
    thumbnail: '/path/to/thumbnail.jpg',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    name: 'Proof of Vehicle Ownership',
    filename: 'Proof_of_Vehicle_Ownership.pdf',
    type: 'ownership',
    url: '/path/to/ownership-proof.pdf',
    thumbnail: '/path/to/thumbnail.jpg',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 3,
    name: 'Certificate of Roadworthiness',
    filename: 'Certificate_of_Roadworthiness.pdf',
    type: 'roadworthiness',
    url: '/path/to/roadworthiness.pdf',
    thumbnail: '/path/to/thumbnail.jpg',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 4,
    name: 'Hackney Permit',
    filename: 'Hackney_Permit.pdf',
    type: 'permit',
    url: '/path/to/hackney-permit.pdf',
    thumbnail: '/path/to/thumbnail.jpg',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
])

// Selected vehicle document
const selectedVehicleDocument = ref<any>(null)

// Table columns
const vehicleColumns = ref<TableColumn[]>([
  { label: 'Plate Number', field: 'plateNumber', sortable: true },
  { label: 'Model', field: 'model', sortable: true },
  { label: 'Vehicle Type', field: 'vehicleType', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Orders Completed', field: 'ordersCompleted', sortable: true },
  { label: 'Order Amount', field: 'orderAmount', sortable: true },
  { label: 'Last Serviced', field: 'lastServiced', sortable: true },
  { label: 'Next Due', field: 'nextDue', sortable: true },
  { label: 'Currently Assigned', field: 'currentlyAssigned', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])

// Dropdown options
const manufacturerOptions = ref([
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Ford' },
  { id: 3, name: 'Honda' },
  { id: 4, name: 'Isuzu' },
  { id: 5, name: 'Mitsubishi' },
  { id: 6, name: 'IVM' }
])

const modelOptions = ref([
  { id: 1, name: 'IVM 500' },
  { id: 2, name: 'Toyota HiAce' },
  { id: 3, name: 'Ford Transit' },
  { id: 4, name: 'Isuzu N-Series' },
  { id: 5, name: 'Mitsubishi Fuso Canter' },
  { id: 6, name: 'Honda CB125F' }
])

const vehicleTypeOptions = ref([
  { id: 1, name: 'Car' },
  { id: 2, name: 'Van' },
  { id: 3, name: 'Truck' },
  { id: 4, name: 'Motorcycle' }
])

const serviceTypeOptions = ref([
  { id: 1, name: 'Oil Change' },
  { id: 2, name: 'Brake Service' },
  { id: 3, name: 'Engine Repair' },
  { id: 4, name: 'Tire Replacement' },
  { id: 5, name: 'General Maintenance' }
])

// Computed property for vehicle options
const vehicleOptions = computed(() => {
  return vehicles.value.map(v => ({ id: v.id, name: v.plateNumber }))
})

// Actions
const viewVehicle = (vehicle: any) => {
  viewingVehicle.value = vehicle
  showViewVehicleModal.value = true
}

const editVehicle = (vehicle: any) => {
  editingVehicle.value = {
    plateNumber: vehicle.plateNumber,
    manufacturer: { id: 1, name: vehicle.manufacturer || 'Toyota' },
    model: { id: 1, name: vehicle.model || 'HiAce' },
    vehicleType: { id: 1, name: vehicle.vehicleType || 'Van' },
    year: vehicle.year || '2021',
    vin: vehicle.vin || 'ABC123XYZ7891234',
    purchaseDate: vehicle.purchaseDate || '13/05/2022'
  }
  originalEditingVehicle.value = { ...editingVehicle.value }
  showEditVehicleModal.value = true
}

const logServiceEntry = (vehicle: any) => {
  logServiceData.value.vehicle = { id: vehicle.id, name: vehicle.plateNumber }
  originalLogServiceData.value = { ...logServiceData.value }
  showLogServiceModal.value = true
}

const deleteVehicle = (vehicle: any) => {
  vehicleToDelete.value = vehicle
  showDeleteModal.value = true
}

const openAddVehicleModal = () => {
  resetNewVehicle()
  originalNewVehicle.value = { ...newVehicle.value }
  showAddVehicleModal.value = true
}

const openLogServiceModal = () => {
  resetLogServiceData()
  originalLogServiceData.value = { ...logServiceData.value }
  showLogServiceModal.value = true
}

const downloadReport = () => {
  successMessage.value = 'Vehicle report downloaded successfully'
  showSuccessToast.value = true
}

const handlePrint = () => {
  successMessage.value = 'Vehicle data printed successfully'
  showSuccessToast.value = true
}

// Document functions
const selectVehicleDocument = (document: any) => {
  selectedVehicleDocument.value = document
}

const updateDocument = () => {
  // TODO: Implement update document functionality
  console.log('Update document:', selectedVehicleDocument.value?.name)
}

const deleteDocument = () => {
  // TODO: Implement delete document functionality
  console.log('Delete document:', selectedVehicleDocument.value?.name)
}

// Modal functions
const closeAddVehicleModal = () => {
  if (hasUnsavedChanges(newVehicle.value, originalNewVehicle.value)) {
    warningProcessName.value = 'Add Vehicle'
    showWarningModal.value = true
  } else {
    showAddVehicleModal.value = false
  }
}

const closeEditVehicleModal = () => {
  if (hasUnsavedChanges(editingVehicle.value, originalEditingVehicle.value)) {
    warningProcessName.value = 'Edit Vehicle'
    showWarningModal.value = true
  } else {
    showEditVehicleModal.value = false
  }
}

const closeViewVehicleModal = () => {
  showViewVehicleModal.value = false
  viewingVehicle.value = null
}

// Service History Actions
const editServiceEntry = (serviceEntry: any) => {
  editingServiceEntry.value = serviceEntry
  
  // Populate form with existing data
  serviceEntryForm.value = {
    vehicle: { id: viewingVehicle.value?.id || 1, name: viewingVehicle.value?.plateNumber || '' },
    serviceDate: serviceEntry.date || '',
    serviceType: serviceTypeOptions.value.find(option => option.name === serviceEntry.type) || null,
    description: serviceEntry.notes || '',
    amount: serviceEntry.amount || '',
    serviceProvider: serviceEntry.serviceProvider || ''
  }
  
  originalServiceEntryData.value = { ...serviceEntryForm.value }
  showEditServiceEntryModal.value = true
}

const deleteServiceEntry = (serviceEntry: any) => {
  serviceEntryToDelete.value = serviceEntry
  showDeleteServiceEntryModal.value = true
}

const updateVehicle = () => {
  // TODO: Implement API call to update vehicle
  console.log('Update vehicle:', editingVehicle.value)
  successMessage.value = 'Vehicle updated successfully'
  showSuccessToast.value = true
  showEditVehicleModal.value = false
}

const closeLogServiceModal = () => {
  if (hasUnsavedChanges(logServiceData.value, originalLogServiceData.value)) {
    warningProcessName.value = 'Log Service Entry'
    showWarningModal.value = true
  } else {
    showLogServiceModal.value = false
  }
}

const confirmDiscard = () => {
  showWarningModal.value = false
  showAddVehicleModal.value = false
  showEditVehicleModal.value = false
  showLogServiceModal.value = false
}

const closeWarningModal = () => {
  showWarningModal.value = false
}

const confirmDelete = () => {
  if (vehicleToDelete.value) {
    const index = vehicles.value.findIndex(v => v.id === vehicleToDelete.value!.id)
    if (index > -1) {
      vehicles.value.splice(index, 1)
      successMessage.value = 'Vehicle deleted successfully'
      showSuccessToast.value = true
    }
  }
  showDeleteModal.value = false
  vehicleToDelete.value = null
}

const cancelDelete = () => {
  showDeleteModal.value = false
  vehicleToDelete.value = null
}

// Helper functions
const hasUnsavedChanges = (current: any, original: any) => {
  if (!original) return false
  return JSON.stringify(current) !== JSON.stringify(original)
}

const resetNewVehicle = () => {
  newVehicle.value = {
    plateNumber: '',
    manufacturer: null,
    model: null,
    vehicleType: null,
    year: '',
    vin: '',
    purchaseDate: ''
  }
}

const resetLogServiceData = () => {
  logServiceData.value = {
    vehicle: null,
    serviceDate: '',
    serviceType: null,
    description: '',
    amount: '',
    serviceProvider: ''
  }
}

const createVehicle = () => {
  const newId = Math.max(...vehicles.value.map(v => v.id)) + 1
  const vehicle: Vehicle = {
    id: newId,
    plateNumber: newVehicle.value.plateNumber,
    model: newVehicle.value.model?.name || '',
    vehicleType: newVehicle.value.vehicleType?.name || '',
    status: 'Active',
    ordersCompleted: 0,
    orderAmount: '₦0.00',
    lastServiced: '',
    nextDue: '',
    currentlyAssigned: 'Unassigned',
    manufacturer: newVehicle.value.manufacturer?.name,
    year: newVehicle.value.year,
    vin: newVehicle.value.vin,
    purchaseDate: newVehicle.value.purchaseDate
  }
  
  vehicles.value.push(vehicle)
  successMessage.value = 'Vehicle added successfully'
  showSuccessToast.value = true
  showAddVehicleModal.value = false
}


const saveLogServiceEntry = () => {
  successMessage.value = 'Service entry logged successfully'
  showSuccessToast.value = true
  showLogServiceModal.value = false
}

// View Modal Action Handlers
const deleteFromViewModal = () => {
  showViewVehicleModal.value = false
  deleteVehicle(viewingVehicle.value)
}

const logServiceFromViewModal = () => {
  showViewVehicleModal.value = false
  logServiceEntry(viewingVehicle.value)
}

const editFromViewModal = () => {
  showViewVehicleModal.value = false
  editVehicle(viewingVehicle.value)
}

const deleteFromEditModal = () => {
  showEditVehicleModal.value = false
  deleteVehicle(editingVehicle.value)
}

// Service Entry Modal Functions
const updateServiceEntry = () => {
  // Update the service entry in the data
  const index = serviceHistoryData.value.findIndex(entry => entry.id === editingServiceEntry.value.id)
  if (index > -1) {
    serviceHistoryData.value[index] = {
      ...serviceHistoryData.value[index],
      type: serviceEntryForm.value.serviceType?.name || '',
      serviceProvider: serviceEntryForm.value.serviceProvider,
      amount: serviceEntryForm.value.amount,
      notes: serviceEntryForm.value.description,
      date: serviceEntryForm.value.serviceDate
    }
  }
  
  successMessage.value = 'Service entry updated successfully'
  showSuccessToast.value = true
  showEditServiceEntryModal.value = false
}

const confirmDeleteServiceEntry = () => {
  if (serviceEntryToDelete.value) {
    const index = serviceHistoryData.value.findIndex(entry => entry.id === serviceEntryToDelete.value.id)
    if (index > -1) {
      serviceHistoryData.value.splice(index, 1)
      successMessage.value = 'Service entry deleted successfully'
      showSuccessToast.value = true
    }
  }
  showDeleteServiceEntryModal.value = false
  serviceEntryToDelete.value = null
}

const closeEditServiceEntryModal = () => {
  if (hasUnsavedServiceEntryChanges()) {
    warningProcessName.value = 'Edit Service Entry'
    showWarningServiceEntryModal.value = true
  } else {
    showEditServiceEntryModal.value = false
  }
}

const hasUnsavedServiceEntryChanges = () => {
  if (!originalServiceEntryData.value) return false
  return JSON.stringify(serviceEntryForm.value) !== JSON.stringify(originalServiceEntryData.value)
}

const confirmDiscardServiceEntry = () => {
  showWarningServiceEntryModal.value = false
  showEditServiceEntryModal.value = false
}

const closeWarningServiceEntryModal = () => {
  showWarningServiceEntryModal.value = false
}

const closeDeleteServiceEntryModal = () => {
  showDeleteServiceEntryModal.value = false
  serviceEntryToDelete.value = null
}

const openDeleteServiceEntryModal = () => {
  showEditServiceEntryModal.value = false
  showDeleteServiceEntryModal.value = true
}

// Route Accordion Functions
const toggleRoute = (routeId: number) => {
  const index = expandedRoutes.value.indexOf(routeId)
  if (index > -1) {
    expandedRoutes.value.splice(index, 1)
  } else {
    expandedRoutes.value.push(routeId)
  }
}

</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
}

.grey_bg {
  min-height: 100vh;
}

.tab_text {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
}
</style>
