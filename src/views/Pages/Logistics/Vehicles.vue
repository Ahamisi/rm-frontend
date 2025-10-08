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
            <span v-if="col.props.column.field === 'action'">
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
            :onClick="() => { showEditVehicleModal = false; deleteVehicle(editingVehicle) }"
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
        <SideBarHead title="View Vehicle">
          <template #icon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.75C4.05 8.75 2.5 5.13083 2.5 3.75C2.5 3.08696 2.76339 2.45107 3.23223 1.98223C3.70107 1.51339 4.33696 1.25 5 1.25C5.66304 1.25 6.29893 1.51339 6.76777 1.98223C7.23661 2.45107 7.5 3.08696 7.5 3.75C7.5 5.13083 5.95 8.75 5 8.75ZM5 5C5.15934 5 5.31711 4.96862 5.46432 4.90764C5.61153 4.84666 5.74529 4.75729 5.85796 4.64462C5.97062 4.53195 6.06 4.3982 6.12097 4.25099C6.18195 4.10378 6.21333 3.946 6.21333 3.78667C6.21333 3.62733 6.18195 3.46955 6.12097 3.32234C6.06 3.17514 5.97062 3.04138 5.85796 2.92871C5.74529 2.81604 5.61153 2.72667 5.46432 2.66569C5.31711 2.60472 5.15934 2.57333 5 2.57333C4.6782 2.57333 4.36959 2.70117 4.14204 2.92871C3.9145 3.15625 3.78667 3.46487 3.78667 3.78667C3.78667 4.10846 3.9145 4.41708 4.14204 4.64462C4.36959 4.87217 4.6782 5 5 5Z" fill="#44546F"/>
            </svg>
          </template>
        </SideBarHead>
      </template>
      
        <template #default="slotProps">
          <!-- Vehicle Overview Section -->
          <div class="bg-white border-b border-gray-200 p-6">
            <div class="flex items-center gap-4">
              <!-- Large Vehicle Icon -->
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8C5 6.89543 5.89543 6 7 6H25C26.1046 6 27 6.89543 27 8V22C27 23.1046 26.1046 24 25 24H7C5.89543 24 5 23.1046 5 22V8ZM7 8H25V22H7V8ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H23C23.5523 13 24 12.5523 24 12C24 11.4477 23.5523 11 23 11H9ZM9 15C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H9Z" fill="#44546F"/>
                </svg>
              </div>
              
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">{{ viewingVehicle?.plateNumber }} - {{ viewingVehicle?.model }}</h3>
                <div class="flex items-center gap-4 mt-2">
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 2.5C10.7614 2.5 13 4.73858 13 7.5C13 10.2614 10.7614 12.5 8 12.5C5.23858 12.5 3 10.2614 3 7.5C3 4.73858 5.23858 2.5 8 2.5ZM8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4Z" fill="#44546F"/>
                    </svg>
                    <span class="text-sm text-gray-600">VIN: {{ viewingVehicle?.vin }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3ZM3 3H13V13H3V3ZM4 4C4 3.44772 4.44772 3 5 3H11C11.5523 3 12 3.44772 12 4C12 4.55228 11.5523 5 11 5H5C4.44772 5 4 4.55228 4 4ZM4 6C4 5.44772 4.44772 5 5 5H11C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7H5C4.44772 7 4 6.55228 4 6ZM4 8C4 7.44772 4.44772 7 5 7H11C11.5523 7 12 7.44772 12 8C12 8.55228 11.5523 9 11 9H5C4.44772 9 4 8.55228 4 8Z" fill="#44546F"/>
                    </svg>
                    <span class="text-sm text-gray-600">Orders Completed: {{ viewingVehicle?.ordersCompleted }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm text-gray-600">Status:</span>
                    <Pill 
                      :type="viewingVehicle?.status === 'Active' ? 'cash-and-carry' : 'pending-tier'"
                      :text="viewingVehicle?.status || 'Unknown'"
                    />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Next Due:</span>
                    <Pill 
                      type="pending-tier"
                      :text="viewingVehicle?.nextDue || 'N/A'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fixed Tab Navigation -->
          <div class="sticky top-0 z-20 bg-white border-b border-gray-200 flex-shrink-0">
            <div class="flex gap-x-2 px-6">
              <button 
                v-for="tab in vehicleTabs" 
                :key="tab.id" 
                @click="activeVehicleTab = tab.id"
                :class="[
                  'px-1 py-3 -mb-px text-sm font-medium border-b-2 transition-colors tab_text',
                  activeVehicleTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-3 px-6 py-3 bg-gray-50 border-b border-gray-200">
            <Button 
              type="yellow-btn"
              :onClick="() => { showViewVehicleModal = false; logServiceEntry(viewingVehicle) }"
              classStyle="flex items-center gap-2 px-3 py-1 text-sm"
            >
              <!-- Gear Icon -->
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 3.5C10.4853 3.5 12.5 5.51472 12.5 8C12.5 10.4853 10.4853 12.5 8 12.5C5.51472 12.5 3.5 10.4853 3.5 8C3.5 5.51472 5.51472 3.5 8 3.5ZM8 6C8.41421 6 8.75 6.33579 8.75 6.75V7.25H9.25C9.66421 7.25 10 7.58579 10 8C10 8.41421 9.66421 8.75 9.25 8.75H8.75V9.25C8.75 9.66421 8.41421 10 8 10C7.58579 10 7.25 9.66421 7.25 9.25V8.75H6.75C6.33579 8.75 6 8.41421 6 8C6 7.58579 6.33579 7.25 6.75 7.25H7.25V6.75C7.25 6.33579 7.58579 6 8 6Z" fill="white"/>
              </svg>
              Log Service
            </Button>
            <Button 
              type="gray-btn"
              :onClick="() => { showViewVehicleModal = false; editVehicle(viewingVehicle) }"
              classStyle="flex items-center gap-2 px-3 py-1 text-sm"
            >
              <!-- Pencil Icon -->
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354L12.427 2.487zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064L11.189 6.25z" fill="currentColor"/>
              </svg>
              Edit Details
            </Button>
          </div>

          <!-- Scrollable Tab Content -->
          <div class="flex-1 overflow-y-auto min-h-0 px-6 py-6">
            <!-- Summary Tab -->
            <div v-if="activeVehicleTab === 'summary'" class="space-y-6 pb-6">
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-semibold text-gray-900">{{ viewingVehicle?.plateNumber }} - {{ viewingVehicle?.model?.toUpperCase() }}</h3>
                  <Pill 
                    :type="viewingVehicle?.status === 'Active' ? 'cash-and-carry' : 'pending-tier'"
                    :text="viewingVehicle?.status || 'Unknown'"
                  />
                </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Vehicle Type</h4>
                <p class="text-lg font-semibold text-gray-900">{{ viewingVehicle?.vehicleType }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Manufacturer</h4>
                <p class="text-lg font-semibold text-gray-900">{{ viewingVehicle?.manufacturer }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Year</h4>
                <p class="text-lg font-semibold text-gray-900">{{ viewingVehicle?.year }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">VIN</h4>
                <p class="text-lg font-semibold text-gray-900 font-mono">{{ viewingVehicle?.vin }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Purchase Date</h4>
                <p class="text-lg font-semibold text-gray-900">{{ viewingVehicle?.purchaseDate }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Currently Assigned</h4>
                <p class="text-lg font-semibold text-gray-900">{{ viewingVehicle?.currentlyAssigned }}</p>
              </div>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg text-center">
                <h4 class="text-sm font-medium text-blue-600 mb-1">Orders Completed</h4>
                <p class="text-2xl font-bold text-blue-900">{{ viewingVehicle?.ordersCompleted }}</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg text-center">
                <h4 class="text-sm font-medium text-green-600 mb-1">Total Revenue</h4>
                <p class="text-2xl font-bold text-green-900">{{ viewingVehicle?.orderAmount }}</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg text-center">
                <h4 class="text-sm font-medium text-purple-600 mb-1">Efficiency Rating</h4>
                <p class="text-2xl font-bold text-purple-900">{{ (viewingVehicle?.ordersCompleted || 0) > 50 ? 'High' : (viewingVehicle?.ordersCompleted || 0) > 25 ? 'Medium' : 'Low' }}</p>
              </div>
            </div>
          </div>

          <!-- Service History -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Service History</h3>
              <Button 
                type="blue-btn"
                :onClick="() => { showViewVehicleModal = false; logServiceEntry(viewingVehicle) }"
                classStyle="px-3 py-1 text-sm"
              >
                Log New Service
              </Button>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Last Service</h4>
                  <p class="text-sm text-gray-600">General Maintenance</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">{{ viewingVehicle?.lastServiced }}</p>
                  <p class="text-sm text-gray-600">₦15,000</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Next Due</h4>
                  <p class="text-sm text-gray-600">Scheduled Maintenance</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">{{ viewingVehicle?.nextDue }}</p>
                  <p class="text-sm text-gray-600">Estimated ₦20,000</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Oil Change</h4>
                  <p class="text-sm text-gray-600">Regular Service</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">15/04/2024</p>
                  <p class="text-sm text-gray-600">₦8,500</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Tire Replacement</h4>
                  <p class="text-sm text-gray-600">Emergency Service</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">02/03/2024</p>
                  <p class="text-sm text-gray-600">₦45,000</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Vehicle Documents -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Vehicle Documents</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">Vehicle License</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Valid</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">Expires: 15/12/2025</p>
                <Button type="gray-btn" classStyle="text-xs px-2 py-1">View Document</Button>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">Insurance Certificate</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Valid</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">Expires: 20/08/2025</p>
                <Button type="gray-btn" classStyle="text-xs px-2 py-1">View Document</Button>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">Roadworthiness</h4>
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Expiring Soon</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">Expires: 30/06/2024</p>
                <Button type="gray-btn" classStyle="text-xs px-2 py-1">View Document</Button>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">Hackney Permit</h4>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Valid</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">Expires: 10/11/2025</p>
                <Button type="gray-btn" classStyle="text-xs px-2 py-1">View Document</Button>
              </div>
            </div>
          </div>

          <!-- Assignment History -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Assignment History</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">{{ viewingVehicle?.currentlyAssigned }}</h4>
                  <p class="text-sm text-gray-600">Current Assignment</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">Active</p>
                  <p class="text-sm text-gray-600">Since 15/05/2024</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">John Smith</h4>
                  <p class="text-sm text-gray-600">Previous Assignment</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">Completed</p>
                  <p class="text-sm text-gray-600">01/05/2024 - 14/05/2024</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Sarah Johnson</h4>
                  <p class="text-sm text-gray-600">Previous Assignment</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">Completed</p>
                  <p class="text-sm text-gray-600">10/04/2024 - 30/04/2024</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Maintenance Alerts -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div class="flex-1">
                  <h4 class="font-medium text-yellow-900">Roadworthiness Expiring</h4>
                  <p class="text-sm text-yellow-700">Expires in 15 days - Schedule renewal</p>
                </div>
                <Button type="yellow-btn" classStyle="text-xs px-2 py-1">Schedule</Button>
              </div>
              
              <div class="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div class="flex-1">
                  <h4 class="font-medium text-blue-900">Regular Service Due</h4>
                  <p class="text-sm text-blue-700">Next service due in 30 days</p>
                </div>
                <Button type="blue-btn" classStyle="text-xs px-2 py-1">Schedule</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Service History Tab -->
        <div v-else-if="activeVehicleTab === 'service-history'" class="space-y-6 pb-6">
          <!-- Search and Filter -->
          <div class="flex items-center gap-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search service records..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
            </button>
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
          </div>

          <!-- Service History Table -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Provider</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Oil Change</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">AutoCare Center</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₦2,055,043.00</td>
                  <td class="px-4 py-4 text-sm text-gray-500">Regular maintenance</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">16/01/2025</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="p-1 hover:bg-gray-100 rounded">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tire Rotation</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">AutoCare Center</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₦2,055,043.00</td>
                  <td class="px-4 py-4 text-sm text-gray-500">Front tires moved to back</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">16/01/2025</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="p-1 hover:bg-gray-100 rounded">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Order History Tab -->
        <div v-else-if="activeVehicleTab === 'order-history'" class="space-y-6 pb-6">
          <!-- Search and Filter -->
          <div class="flex items-center gap-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search orders..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
            </button>
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
          </div>

          <!-- Order History Cards -->
          <div class="space-y-4">
            <!-- Order Card 1 - Expanded -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div class="p-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <span class="text-sm font-medium text-gray-900">16/01/2025</span>
                    <span class="text-sm text-gray-600">Ikeja Central → Yaba → Surulere → Apapa Port</span>
                  </div>
                  <button class="p-1 hover:bg-gray-100 rounded">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-4 mt-2">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Michael Okpala</span>
                  <span class="text-sm text-gray-600">Total Orders: 2</span>
                  <span class="text-sm text-gray-600">Total Value: ₦4,110,086.00</span>
                </div>
              </div>
              
              <!-- Expanded Order Details -->
              <div class="p-4 bg-gray-50">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left text-gray-500">
                      <th class="pb-2">Order No.</th>
                      <th class="pb-2">Store Name</th>
                      <th class="pb-2">Address</th>
                      <th class="pb-2">Order Amount</th>
                      <th class="pb-2">Status</th>
                      <th class="pb-2">Delivery Date</th>
                    </tr>
                  </thead>
                  <tbody class="space-y-2">
                    <tr>
                      <td class="py-1 text-gray-900">RHPO-1651244214</td>
                      <td class="py-1 text-gray-900">Emeka Pharmacy</td>
                      <td class="py-1 text-gray-900">11 Ademola Adentokumbo</td>
                      <td class="py-1 text-gray-900">₦2,055,043.00</td>
                      <td class="py-1">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>
                      </td>
                      <td class="py-1 text-gray-900">16/01/2025</td>
                    </tr>
                    <tr>
                      <td class="py-1 text-gray-900">RHPO-1651244214</td>
                      <td class="py-1 text-gray-900">Xela Pharmacy</td>
                      <td class="py-1 text-gray-900">11 Ademola Adentokumbo</td>
                      <td class="py-1 text-gray-900">₦2,055,043.00</td>
                      <td class="py-1">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>
                      </td>
                      <td class="py-1 text-gray-900">16/01/2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Order Card 2 - Collapsed -->
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <span class="text-sm font-medium text-gray-900">16/01/2025</span>
                    <span class="text-sm text-gray-600">Ikeja Central → VI → Lekki Phase 1</span>
                  </div>
                  <button class="p-1 hover:bg-gray-100 rounded">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-4 mt-2">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Henry Christopher</span>
                  <span class="text-sm text-gray-600">Total Orders: 2</span>
                  <span class="text-sm text-gray-600">Total Value: ₦4,110,086.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Documents Tab -->
        <div v-else-if="activeVehicleTab === 'documents'" class="space-y-6 pb-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Document List -->
            <div class="lg:col-span-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Vehicle Documents</h3>
              <div class="space-y-3">
                <!-- Vehicle License Certificate - Selected -->
                <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Vehicle License Certificate</span>
                  </div>
                </div>

                <!-- Proof of Vehicle Ownership -->
                <div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Proof of Vehicle Ownership</span>
                  </div>
                </div>

                <!-- Certificate of Roadworthiness -->
                <div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Certificate of Roadworthiness</span>
                  </div>
                </div>

                <!-- Hackney Permit -->
                <div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Hackney Permit</span>
                    <svg class="w-4 h-4 text-red-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Document Viewer -->
            <div class="lg:col-span-2">
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">Vehicle License Certificate</h4>
                    <p class="text-sm text-gray-600">Vehicle_License_Certificate.pdf</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0l-4-4m4 4l-4 4"></path>
                      </svg>
                    </button>
                    <span class="text-sm text-gray-600">100%</span>
                    <button class="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                    <button class="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Document Preview Placeholder -->
                <div class="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center mb-4">
                  <div class="text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-lg font-medium">Vehicle License Certificate</p>
                    <p class="text-sm text-gray-400">Document preview would be displayed here</p>
                  </div>
                </div>

                <!-- Document Actions -->
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-600">
                    <span class="font-medium">Expires:</span> 13/05/2022
                  </div>
                  <div class="flex gap-2">
                    <Button type="gray-btn" classStyle="px-3 py-1 text-sm">Update Document</Button>
                    <Button type="red-btn" classStyle="px-3 py-1 text-sm">Delete Document</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </template>
      
      <template #footer="slotProps">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Button 
              type="gray-btn"
              :onClick="() => { showViewVehicleModal = false; editVehicle(viewingVehicle) }"
              classStyle="px-4 py-2"
            >
              Edit Vehicle
            </Button>
            <Button 
              type="blue-btn"
              :onClick="() => { showViewVehicleModal = false; logServiceEntry(viewingVehicle) }"
              classStyle="px-4 py-2"
            >
              Log Service
            </Button>
          </div>
          
          <Button 
            type="gray-btn"
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

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="`Are you sure you want to delete vehicle '${vehicleToDelete?.plateNumber}'?`"
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

// Vehicle tabs
const activeVehicleTab = ref('summary')
const vehicleTabs = [
  { id: 'summary', label: 'Summary' },
  { id: 'service-history', label: 'Service History' },
  { id: 'order-history', label: 'Order History' },
  { id: 'documents', label: 'Documents' }
]

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
