<template>
  <div class="erp_dashboard_wrapper">
    <div class="grey_bg">
      <!-- Header -->
      <PageTitle title="Customers / All Customers" class="px-6" />
    </div>
    
    <!-- Tabs with Action Buttons -->
    <div class="px-0 bg-white">
      <Tabs :tabs="tabs" @tabChanged="onTabChanged">
        <!-- Action Buttons in tabs line -->
        <div class="flex items-center gap-3 ml-auto mb-1">
          <Button type="gray-btn" :onClick="downloadReport" classStyle="px-4 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
</svg>

            Download Report
          </Button>
          <Button type="gray-btn" :onClick="openMergeModal" classStyle="px-4 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#44546F"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#44546F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#44546F"/>
</svg>

            Merge Customers
          </Button>
          <Button 
            type="blue-btn"
            :onClick="openCreateModal"
            classStyle="px-4 py-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z" fill="white"/>
            </svg>
             Create Customer
          </Button>
        </div>
      </Tabs>
    </div>
    
    <!-- Contents -->
    <div class="px-6 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable
        :items="filteredCustomers"
        :columns="columns"
        :searchable="true"
        :filterByDate="false"
        :printable="false"
        :exportable="false"
        :filterFields="filterFields"
        pageName="AllCustomers"
        :key="childKey"
      >

        <template #column="col">
          <!-- Status Column -->
          <span v-if="col.props?.column?.field === 'status'">
            <Pill 
              type="cash-and-carry" 
              :text="col.props?.formattedRow?.status"
            />
          </span>

          <!-- Warning Tags Column -->
          <span v-else-if="col.props?.column?.field === 'warningTags'">
            <span class="text-gray-500">{{ col.props?.formattedRow?.warningTags || 'N/A' }}</span>
          </span>

          <!-- Action Column -->
          <span v-else-if="col.props?.column?.field === 'action'">
            <TableActionDropdown :rowData="col.props?.formattedRow" wide>
              <template #default="{ selectedItem, closeDropdown }">
                <!-- View Customer -->
                <li @click="handleAction('view', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                    </svg>

                  View Customer
                </li>
                
                <!-- Notify -->
                <li @click="handleAction('notify', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.58597 17.829C6.7717 18.0148 6.99221 18.1622 7.23492 18.2628C7.47762 18.3633 7.73776 18.4151 8.00047 18.4151C8.26318 18.4151 8.52332 18.3633 8.76602 18.2628C9.00873 18.1622 9.22924 18.0148 9.41497 17.829L6.58497 15C6.39917 15.1857 6.25178 15.4062 6.15122 15.6489C6.05065 15.8917 5.9989 16.1518 5.9989 16.4145C5.9989 16.6772 6.05065 16.9374 6.15122 17.1801C6.25178 17.4228 6.39917 17.6433 6.58497 17.829H6.58597ZM11.384 5.478C11.8524 5.00875 12.4089 4.63663 13.0216 4.383C13.6342 4.12937 14.2909 3.99921 14.954 4C15.926 4 16.899 4.28 17.742 4.839C17.762 4.813 17.785 4.789 17.808 4.765C17.9043 4.66644 18.0197 4.58862 18.1472 4.53633C18.2747 4.48405 18.4116 4.45841 18.5493 4.46099C18.6871 4.46357 18.8229 4.49432 18.9484 4.55134C19.0738 4.60837 19.1863 4.69046 19.2788 4.79256C19.3713 4.89467 19.442 5.01463 19.4864 5.14507C19.5309 5.27551 19.5482 5.41366 19.5372 5.55103C19.5263 5.68839 19.4873 5.82206 19.4228 5.94382C19.3583 6.06558 19.2695 6.17284 19.162 6.259C19.8046 7.22976 20.0919 8.3928 19.9752 9.55112C19.8586 10.7094 19.3452 11.7918 18.522 12.615L17.797 13.34C17.015 14.123 15.984 15.55 15.485 16.547L13.976 19.563C13.727 20.063 13.203 20.147 12.805 19.75L4.24897 11.195C3.85197 10.798 3.94097 10.271 4.43597 10.023L7.45297 8.515C8.44197 8.021 9.87297 6.989 10.659 6.203L11.384 5.478ZM14.123 15.108C14.64 14.133 15.691 12.712 16.477 11.926L17.202 11.2C17.6984 10.7032 18.0081 10.0502 18.0786 9.35144C18.1491 8.65266 17.9762 7.95096 17.589 7.365C17.399 7.079 16.871 6.599 16.73 6.505C16.2308 6.17484 15.6454 5.99918 15.047 6C14.6466 5.99937 14.25 6.07785 13.88 6.23093C13.51 6.384 13.1739 6.60866 12.891 6.892L11.941 7.843C11.157 8.628 9.72197 9.663 8.73997 10.154L6.99997 11.024L13.07 17.093L14.123 15.108Z" fill="#626F86"/>
                    </svg>

                  Notify
                </li>
                
                <!-- Login to Account -->
                <li @click="handleAction('login', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 3V5H19.0001V19H12.0001V21H19.0061C20.1061 21 21.0001 20.107 21.0001 19.005V4.995C21.0003 4.73302 20.9489 4.47357 20.8488 4.23147C20.7487 3.98937 20.6019 3.76938 20.4167 3.58409C20.2315 3.3988 20.0116 3.25184 19.7695 3.15161C19.5275 3.05139 19.268 2.99987 19.0061 3H12.0001Z" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97706 11C3.71484 11.0034 3.46469 11.1108 3.28152 11.2984C3.09835 11.4861 2.99713 11.7388 3.00006 12.001C3.00006 12.552 3.43706 13 3.97706 13H15.0241C15.2859 12.9968 15.5358 12.8898 15.7188 12.7025C15.9018 12.5152 16.003 12.2629 16.0001 12.001C16.003 11.7389 15.9019 11.4864 15.719 11.2988C15.536 11.1111 15.2861 11.0037 15.0241 11H3.97706Z" fill="#626F86"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3031 8.305C12.109 8.502 12.0002 8.76745 12.0002 9.044C12.0002 9.32055 12.109 9.586 12.3031 9.783L14.5001 12L12.3031 14.217C12.1089 14.4135 12 14.6787 12 14.955C12 15.2313 12.1089 15.4965 12.3031 15.693C12.7071 16.102 13.3631 16.102 13.7681 15.693L16.6981 12.738C16.8914 12.5408 16.9996 12.2756 16.9996 11.9995C16.9996 11.7234 16.8914 11.4582 16.6981 11.261L13.7681 8.305C13.672 8.20858 13.5578 8.13207 13.4321 8.07987C13.3064 8.02767 13.1717 8.00079 13.0356 8.00079C12.8995 8.00079 12.7647 8.02767 12.639 8.07987C12.5133 8.13207 12.3991 8.20858 12.3031 8.305Z" fill="#626F86"/>
                    </svg>

                  Login to Account
                </li>
                
                <!-- Add Warning Tags -->
                <li @click="handleAction('warning-tags', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0616 4.96699C11.5776 3.99299 12.4196 3.98899 12.9376 4.96699L20.0616 18.425C20.5776 19.399 20.1066 20.196 19.0046 20.196H4.99458C3.89258 20.196 3.41958 19.403 3.93758 18.425L11.0616 4.96699ZM11.2925 14.7071C11.48 14.8946 11.7344 15 11.9996 15C12.2648 15 12.5192 14.8946 12.7067 14.7071C12.8942 14.5196 12.9996 14.2652 12.9996 14V8.99998C12.9996 8.73477 12.8942 8.48041 12.7067 8.29288C12.5192 8.10534 12.2648 7.99998 11.9996 7.99998C11.7344 7.99998 11.48 8.10534 11.2925 8.29288C11.1049 8.48041 10.9996 8.73477 10.9996 8.99998V14C10.9996 14.2652 11.1049 14.5196 11.2925 14.7071ZM11.2925 17.7071C11.48 17.8946 11.7344 18 11.9996 18C12.2648 18 12.5192 17.8946 12.7067 17.7071C12.8942 17.5196 12.9996 17.2652 12.9996 17C12.9996 16.7348 12.8942 16.4804 12.7067 16.2929C12.5192 16.1053 12.2648 16 11.9996 16C11.7344 16 11.48 16.1053 11.2925 16.2929C11.1049 16.4804 10.9996 16.7348 10.9996 17C10.9996 17.2652 11.1049 17.5196 11.2925 17.7071Z" fill="#44546F"/>
                    </svg>

                  Add Warning Tags
                </li>

                <!-- Separator -->
                <div class="border-t border-gray-200 my-1"></div>
                
                <!-- Download Transactions -->
                <li @click="handleAction('download-transactions', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
</svg>

                  Download Transactions
                </li>
                
                <!-- Download Partner Transactions -->
                <li @click="handleAction('download-partner', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
</svg>

                  Download Partner Transactions
                </li>
                
                <!-- Download Combined Transactions -->
                <li @click="handleAction('download-combined', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
</svg>

                  Download Combined Transactions
                </li>

                <!-- Separator -->
                <div class="border-t border-gray-200 my-1"></div>
                
                <!-- Reset Password -->
                <li @click="handleAction('reset-password', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 11.009C5 9.899 5.897 9 7.006 9H16.994C17.5262 9.00106 18.0363 9.21316 18.4123 9.58977C18.7884 9.96639 18.9997 10.4768 19 11.009V18.991C19 20.101 18.103 21 16.994 21H7.006C6.4737 20.9992 5.96347 20.7872 5.58736 20.4105C5.21125 20.0338 5 19.5233 5 18.991V11.009ZM7 11V19H17V11H7Z" fill="#626F86"/>
<path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" fill="#626F86"/>
<path d="M8 6.002C8.00053 4.94111 8.42206 3.9238 9.17204 3.17345C9.92201 2.4231 10.9391 2.00106 12 2C12.5255 2 13.0458 2.10353 13.5312 2.30467C14.0166 2.50582 14.4577 2.80063 14.8291 3.17228C15.2006 3.54393 15.4952 3.98512 15.6961 4.47065C15.897 4.95619 16.0003 5.47654 16 6.002V6.5H14V6.002C14.0001 5.73922 13.9485 5.479 13.8481 5.23617C13.7476 4.99335 13.6003 4.77269 13.4146 4.58679C13.2289 4.40088 13.0084 4.25338 12.7657 4.1527C12.523 4.05202 12.2628 4.00013 12 4C10.898 4 10 4.898 10 6.002V11H8V6.002ZM14 6.5H16C16 6.76522 15.8946 7.01957 15.7071 7.20711C15.5196 7.39464 15.2652 7.5 15 7.5C14.7348 7.5 14.4804 7.39464 14.2929 7.20711C14.1054 7.01957 14 6.76522 14 6.5Z" fill="#626F86"/>
</svg>

                  Reset Password
                </li>
                
                <!-- Deactivate Customer -->
                <li @click="handleAction('deactivate', selectedItem); closeDropdown()" 
                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5918 12.0154L9.117 13.499C9.02179 13.5915 8.94595 13.7021 8.89392 13.8242C8.84188 13.9464 8.81469 14.0776 8.81393 14.2104C8.81317 14.3432 8.83885 14.4747 8.88948 14.5975C8.9401 14.7202 9.01466 14.8316 9.10881 14.9252C9.20295 15.0189 9.31479 15.0928 9.43781 15.1427C9.56083 15.1927 9.69256 15.2176 9.82531 15.2161C9.95807 15.2146 10.0892 15.1866 10.211 15.1339C10.3329 15.0812 10.443 15.0047 10.535 14.909L12.0027 13.4325L13.442 14.878C13.6291 15.0661 13.8833 15.1721 14.1485 15.1727C14.4138 15.1734 14.6685 15.0686 14.8565 14.8815C15.0445 14.6944 15.1505 14.4403 15.1512 14.175C15.1519 13.9097 15.0471 13.6551 14.86 13.467L13.4127 12.0141L14.895 10.523C15.0767 10.3339 15.1768 10.081 15.1738 9.81874C15.1709 9.55651 15.065 9.30595 14.879 9.12104C14.6931 8.93612 14.4419 8.83166 14.1797 8.83016C13.9174 8.82865 13.6651 8.93022 13.477 9.11298L12.0015 10.5973L10.5 9.09002C10.3118 8.90742 10.0594 8.80606 9.79717 8.80776C9.53495 8.80947 9.28389 8.9141 9.09807 9.09913C8.91225 9.28416 8.80655 9.53478 8.80373 9.79699C8.80091 10.0592 8.90121 10.312 9.083 10.501L10.5918 12.0154Z" fill="#E56910"/>
</svg>

                  Deactivate Customer
                </li>
                
                <!-- Delete -->
                <li @click="handleAction('delete', selectedItem); closeDropdown()" 
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

    <!-- Success Toast -->
    <SuccessAlertToast 
      :isVisible="showSuccessToast"
      message="Report downloaded successfully!"
      @close="showSuccessToast = false"
    />

    <!-- Merge Customers Modal -->
    <SideBarModal
      :isOpen="showMergeModal"
      @update:isOpen="showMergeModal = $event"
      title="Merge Customers"
      width="small"
    >
      <template #default="{ closeModal }">
        <div class="p-6 space-y-6">
          <!-- Primary Customer -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Primary Customer</label>
            <CustomMultiSelect
              v-model="primaryCustomer"
              :options="filteredCustomers"
              placeholder="Select a primary customer"
              labelField="customerName"
            />
            <p class="text-xs text-gray-500 mt-1">Other customers will be merged into this</p>
          </div>

          <!-- Other Customers -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Other Customer(s)</label>
            <CustomMultiSelect
              v-model="otherCustomers"
              :options="filteredCustomers"
              placeholder="Select other customer(s) to merge"
              labelField="customerName"
            />
            <p class="text-xs text-gray-500 mt-1">You can select up to 3 customers</p>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" :onClick="closeMergeModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button 
            type="blue-btn" 
            :onClick="handleMergeSubmit" 
            classStyle="px-4 py-2"
            :disabled="!primaryCustomer || otherCustomers.length === 0"
          >
            Merge
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Create Customer Modal -->
    <SideBarModal
      :isOpen="showCreateModal"
      @update:isOpen="showCreateModal = $event"
      title="Create Customer"
      width="large"
    >
      <template #default="{ closeModal }">
        <div class="p-6 space-y-6">
          <!-- Profile Image Section -->
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center relative cursor-pointer" @click="triggerFileSelect">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <circle cx="12" cy="12" r="12" fill="url(#pattern0_12688_223754)"/>
                  <defs>
                  <pattern id="pattern0_12688_223754" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_12688_223754" transform="scale(0.0078125)"/>
                  </pattern>
                  <image id="image0_12688_223754" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-white p-[3px] rounded-full flex items-center justify-center">
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.994C0 2.893 0.898 2 1.99 2H18.01C19.108 2 20 2.895 20 3.994V16.006C19.9992 16.5339 19.7894 17.04 19.4165 17.4137C19.0436 17.7873 18.5379 17.9981 18.01 18H1.99C1.46185 17.9989 0.955697 17.7884 0.582614 17.4146C0.209531 17.0407 -1.06266e-06 16.5341 0 16.006V3.994ZM10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14ZM15 6C15 6.556 15.448 7 16 7C16.556 7 17 6.552 17 6C17 5.444 16.552 5 16 5C15.444 5 15 5.448 15 6ZM6 1C6 0.448 6.453 0 6.997 0H13.003C13.553 0 14 0.444 14 1V2H6V1Z" fill="#44546F"/>
                <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" fill="#44546F"/>
                </svg>

              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">Add a profile image for this customer</p>
            </div>
            <input 
              ref="fileInput"
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleFileSelect"
            />
          </div>

          <!-- Customer Details Section -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input 
                v-model="createCustomerForm.customerName"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a customer name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                v-model="createCustomerForm.phoneNumber"
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a phone number"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="createCustomerForm.email"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
              <SelectField
                v-model="createCustomerForm.customerType"
                :options="customerTypeOptions"
                placeholder="Select a customer type"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                v-model="createCustomerForm.password"
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <div class="flex items-center">
                <input 
                  v-model="createCustomerForm.isExternalUser"
                  type="checkbox" 
                  id="externalUser"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label for="externalUser" class="ml-2 text-sm font-medium text-gray-700">External User</label>
              </div>
            </div>
          </div>

          <!-- Store Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="border-b border-gray-300 pb-2 mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Store Information</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input 
                  v-model="createCustomerForm.storeName"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a store name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                <input 
                  v-model="createCustomerForm.storeAddress"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a store address"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
                <SelectField
                  v-model="createCustomerForm.state"
                  :options="stateOptions"
                  placeholder="Select a state"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">LGA</label>
                <SelectField
                  v-model="createCustomerForm.lga"
                  :options="lgaOptions"
                  placeholder="Select a LGA"
                />
              </div>
            </div>
            
            <!-- Store Images and Licenses inside Store Information -->
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store Images</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center items-center justify-center flex flex-col">
                      <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1772 12.6208L12.5799 15.2384C12.3281 15.4921 12.1868 15.835 12.1868 16.1924C12.1868 16.5499 12.3281 16.8928 12.5799 17.1465C12.7036 17.2716 12.8509 17.371 13.0132 17.4388C13.1756 17.5066 13.3498 17.5416 13.5258 17.5416C13.7017 17.5416 13.8759 17.5066 14.0383 17.4388C14.2007 17.371 14.348 17.2716 14.4717 17.1465L16.2185 15.3847L18.0277 17.2088C18.1513 17.334 18.2985 17.4335 18.4608 17.5014C18.6231 17.5694 18.7973 17.6044 18.9733 17.6045C19.1493 17.6047 19.3235 17.5699 19.4859 17.5022C19.6483 17.4344 19.7957 17.3352 19.9195 17.2101C20.1704 16.9563 20.3112 16.6139 20.3115 16.257C20.3117 15.9002 20.1714 15.5576 19.9208 15.3034L17.2599 12.6222C17.1239 12.4841 16.9619 12.3745 16.7831 12.2996C16.6044 12.2247 16.4126 12.186 16.2188 12.1859C16.025 12.1858 15.8332 12.2242 15.6543 12.2988C15.4755 12.3735 15.3133 12.4829 15.1772 12.6208Z" fill="#44546F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8955 13.5511L14.8969 27.0739C14.8969 27.8281 15.5035 28.4389 16.251 28.4375C16.9999 28.4375 17.6052 27.8281 17.6052 27.0739L17.6038 13.5498C17.6038 12.7982 16.9972 12.1875 16.2497 12.1875C15.5022 12.1875 14.8942 12.7982 14.8955 13.5511Z" fill="#44546F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7491 7.42219C10.4012 7.36527 10.0493 7.33674 9.69686 7.33688C5.89842 7.33823 2.70801 10.3187 2.70801 14.2174C2.70801 18.1567 5.9377 21.6667 9.61426 21.6667H13.5156V18.9678H9.61426C7.3704 18.9678 5.39603 16.7158 5.39603 14.2174C5.39603 11.8097 7.3853 10.0371 9.59936 10.0371H9.61561C10.1424 10.0371 10.5446 10.1061 10.9292 10.2402L11.1594 10.3255C11.9786 10.6614 12.3443 9.9924 12.3443 9.9924L12.5474 9.63083C13.5359 7.80677 15.5279 6.7925 17.5795 6.76135C18.9404 6.7749 20.2499 7.28305 21.2638 8.19101C22.2776 9.09897 22.9266 10.3447 23.0896 11.6959L23.1519 12.1564C23.1519 12.1564 23.248 12.8673 24.0524 12.8673C24.07 12.8673 24.0686 12.8741 24.0835 12.8741H24.4275C25.9658 12.8741 27.1033 14.1727 27.1033 15.7964C27.1033 17.4308 25.7668 18.9678 24.3002 18.9678H18.9323V21.6667H24.3002C27.2252 21.6667 29.7913 18.8974 29.7913 15.7964C29.7913 13.0894 28.0147 10.836 25.542 10.2795C24.5846 6.61375 21.4077 4.11531 17.5713 4.0625C14.8969 4.09094 12.2887 5.2826 10.7491 7.42219Z" fill="#44546F"/>
                      </svg>
                  <p class="text-sm text-gray-500">Drag and drop your image here</p>
                  <p class="text-xs text-gray-400 mt-1">Supports: JPG, PNG (max 5mb)</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store Licenses</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center items-center justify-center flex flex-col">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1772 12.6208L12.5799 15.2384C12.3281 15.4921 12.1868 15.835 12.1868 16.1924C12.1868 16.5499 12.3281 16.8928 12.5799 17.1465C12.7036 17.2716 12.8509 17.371 13.0132 17.4388C13.1756 17.5066 13.3498 17.5416 13.5258 17.5416C13.7017 17.5416 13.8759 17.5066 14.0383 17.4388C14.2007 17.371 14.348 17.2716 14.4717 17.1465L16.2185 15.3847L18.0277 17.2088C18.1513 17.334 18.2985 17.4335 18.4608 17.5014C18.6231 17.5694 18.7973 17.6044 18.9733 17.6045C19.1493 17.6047 19.3235 17.5699 19.4859 17.5022C19.6483 17.4344 19.7957 17.3352 19.9195 17.2101C20.1704 16.9563 20.3112 16.6139 20.3115 16.257C20.3117 15.9002 20.1714 15.5576 19.9208 15.3034L17.2599 12.6222C17.1239 12.4841 16.9619 12.3745 16.7831 12.2996C16.6044 12.2247 16.4126 12.186 16.2188 12.1859C16.025 12.1858 15.8332 12.2242 15.6543 12.2988C15.4755 12.3735 15.3133 12.4829 15.1772 12.6208Z" fill="#44546F"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8955 13.5511L14.8969 27.0739C14.8969 27.8281 15.5035 28.4389 16.251 28.4375C16.9999 28.4375 17.6052 27.8281 17.6052 27.0739L17.6038 13.5498C17.6038 12.7982 16.9972 12.1875 16.2497 12.1875C15.5022 12.1875 14.8942 12.7982 14.8955 13.5511Z" fill="#44546F"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7491 7.42219C10.4012 7.36527 10.0493 7.33674 9.69686 7.33688C5.89842 7.33823 2.70801 10.3187 2.70801 14.2174C2.70801 18.1567 5.9377 21.6667 9.61426 21.6667H13.5156V18.9678H9.61426C7.3704 18.9678 5.39603 16.7158 5.39603 14.2174C5.39603 11.8097 7.3853 10.0371 9.59936 10.0371H9.61561C10.1424 10.0371 10.5446 10.1061 10.9292 10.2402L11.1594 10.3255C11.9786 10.6614 12.3443 9.9924 12.3443 9.9924L12.5474 9.63083C13.5359 7.80677 15.5279 6.7925 17.5795 6.76135C18.9404 6.7749 20.2499 7.28305 21.2638 8.19101C22.2776 9.09897 22.9266 10.3447 23.0896 11.6959L23.1519 12.1564C23.1519 12.1564 23.248 12.8673 24.0524 12.8673C24.07 12.8673 24.0686 12.8741 24.0835 12.8741H24.4275C25.9658 12.8741 27.1033 14.1727 27.1033 15.7964C27.1033 17.4308 25.7668 18.9678 24.3002 18.9678H18.9323V21.6667H24.3002C27.2252 21.6667 29.7913 18.8974 29.7913 15.7964C29.7913 13.0894 28.0147 10.836 25.542 10.2795C24.5846 6.61375 21.4077 4.11531 17.5713 4.0625C14.8969 4.09094 12.2887 5.2826 10.7491 7.42219Z" fill="#44546F"/>
                  </svg>

                  <p class="text-sm text-gray-500">Drag and drop your license here</p>
                  <p class="text-xs text-gray-400 mt-1">Supports: JPG, PNG (max 5mb)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Agent Information Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="border-b border-gray-300 pb-2 mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Agent Information</h3>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Agent</label>
              <SelectField
                v-model="createCustomerForm.agent"
                :options="agentOptions"
                placeholder="Select an Agent"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" :onClick="closeCreateModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button type="blue-btn" classStyle="px-4 py-2">
            Create
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showWarningModal"
      title="Merge Customers?"
      message="You are about to merge the selected customers. This action cannot be undone. Are you sure you want to continue?"
      confirmText="Merge Customers"
      cancelText="Cancel"
      @close="cancelMerge"
      @confirm="confirmMerge"
    />

    <!-- Notify Customer Modal -->
    <SideBarModal
      :isOpen="showNotifyModal"
      @update:isOpen="showNotifyModal = $event"
      title="Notify Customer"
      width="medium"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#626F86"/>
              <path d="M8 10C5.79086 10 4 11.7909 4 14V16H12V14C12 11.7909 10.2091 10 8 10Z" fill="#626F86"/>
            </svg>
          </div>
          <span class="font-medium">{{ selectedCustomer?.customerName || 'Customer' }}</span>
        </div>
      </template>

      <template #default>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input 
              v-model="notifyForm.title"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a title for your notification"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Body</label>
            <textarea 
              v-model="notifyForm.body"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add additional details or notes about the notification"
            ></textarea>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" :onClick="closeNotifyModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button type="blue-btn" :onClick="sendNotification" classStyle="px-4 py-2">
            Send
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Add/Update Warning Tags Modal -->
    <SideBarModal
      :isOpen="showWarningTagsModal"
      @update:isOpen="showWarningTagsModal = $event"
      title="Add/Update Warning Tags"
      width="medium"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#626F86"/>
              <path d="M8 10C5.79086 10 4 11.7909 4 14V16H12V14C12 11.7909 10.2091 10 8 10Z" fill="#626F86"/>
            </svg>
          </div>
          <span class="font-medium">{{ selectedCustomer?.customerName || 'Customer' }}</span>
        </div>
      </template>

      <template #default>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warning Tag(s)</label>
            <CustomMultiSelect
              v-model="warningTagsForm.tags"
              :options="warningTagOptions"
              placeholder="Enter a name for your warning tag"
              labelField="name"
            />
            <p class="text-xs text-gray-500 mt-1">press Enter or , on your keyboard to add tag</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button type="gray-btn" :onClick="closeWarningTagsModal" classStyle="px-4 py-2">
            Cancel
          </Button>
          <Button type="blue-btn" :onClick="saveWarningTags" classStyle="px-4 py-2">
            Save
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Action Warning Confirmation Modal -->
    <WarningConfirmationModal
      :show="showActionWarningModal"
      :title="currentAction === 'reset-password' ? 'Reset Password?' : 'Deactivate Customer?'"
      :message="currentAction === 'reset-password' ? `You are about to reset password for this customer ${selectedCustomer?.customerName}. This will invalidate their current password, and they will be required to create a new one.` : `You are about to deactivate this customer profile ${selectedCustomer?.customerName}. Once deactivated, they will no longer have access to their account or any associated services.`"
      :confirmText="currentAction === 'reset-password' ? 'Reset Password' : 'Deactivate Customer'"
      @confirm="confirmActionWarning"
      @close="closeActionWarningModal"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="`You are about to delete this customer ${selectedCustomer?.customerName}.`"
      confirmText="Delete Customer"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- View Customer Modal -->
    <SideBarModal 
      :isOpen="showViewCustomerModal" 
      @update:isOpen="showViewCustomerModal = $event"
      width="large"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Customer Details</span>
          <span class="text-sm font-medium text-gray-600">{{ selectedCustomer?.customerName?.toUpperCase() }}</span>
        </div>
      </template>

      <template #default="{ closeModal }">
        <div class="p-6">
          <!-- Customer Profile Section -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div class="flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M0 6C0 2.68629 2.68629 0 6 0H38C41.3137 0 44 2.68629 44 6V38C44 41.3137 41.3137 44 38 44H6C2.68629 44 0 41.3137 0 38V6Z" fill="#DCDFE4"/>
                  <circle cx="22" cy="22" r="12" fill="url(#pattern0_11480_55637)"/>
                  <defs>
                    <pattern id="pattern0_11480_55637" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_11480_55637" transform="scale(0.0078125)"/>
                    </pattern>
                    <image id="image0_11480_55637" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
              
              <!-- Customer Info -->
              <div class="flex-1">
                <h3 class="font-semibold text-[#44546F]">{{ selectedCustomer?.customerName }}</h3>
                <div class="flex items-center gap-4 mt-1">
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedCustomer?.phone }}
                  </div>
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedCustomer?.storeName }}
                  </div>
                </div>
              </div>
              
              <!-- Status Pills -->
              <div class="flex items-left gap-2 flex-col bg-white p-3 rounded-lg w-80">
                <h3 class="text-sm text-[#44546F]">Status:</h3>
                <div class="flex items-center gap-2">
                  <Pill 
                    :type="getPillType(selectedCustomer?.status || '')"
                    :text="selectedCustomer?.status || ''"
                  />
                  <Pill 
                    type="hospital"
                    :text="`Verified: ${selectedCustomer?.kycTier}`"
                    :showIcon="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Tabs and Action Buttons -->
          <div class="mb-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <!-- Tabs -->
              <div class="flex">
                <button 
                  v-for="tab in ['Summary', 'Store', 'Orders', 'Discount']" 
                  :key="tab" 
                  @click="customerModalTab = tab"
                  :class="[
                    'px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors',
                    customerModalTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ tab }}
                </button>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center gap-3">
                <Button 
                  type="gray-btn" 
                  :onClick="editCustomerDetails" 
                  classStyle="px-3 py-1 text-sm flex items-center gap-2"
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z" fill="#44546F"/>
                </svg>

                  Edit Details
                </Button>
             
                <Button 
                  type="gray-btn" 
                  :onClick="deactivateCustomerFromModal" 
                  classStyle="px-3 py-1 text-sm flex items-center gap-2"
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5918 12.0154L9.117 13.499C9.02179 13.5915 8.94595 13.7021 8.89392 13.8242C8.84188 13.9464 8.81469 14.0776 8.81393 14.2104C8.81317 14.3432 8.83885 14.4747 8.88948 14.5975C8.9401 14.7202 9.01466 14.8316 9.10881 14.9252C9.20295 15.0189 9.31479 15.0928 9.43781 15.1427C9.56083 15.1927 9.69256 15.2176 9.82531 15.2161C9.95807 15.2146 10.0892 15.1866 10.211 15.1339C10.3329 15.0812 10.443 15.0047 10.535 14.909L12.0027 13.4325L13.442 14.878C13.6291 15.0661 13.8833 15.1721 14.1485 15.1727C14.4138 15.1734 14.6685 15.0686 14.8565 14.8815C15.0445 14.6944 15.1505 14.4403 15.1512 14.175C15.1519 13.9097 15.0471 13.6551 14.86 13.467L13.4127 12.0141L14.895 10.523C15.0767 10.3339 15.1768 10.081 15.1738 9.81874C15.1709 9.55651 15.065 9.30595 14.879 9.12104C14.6931 8.93612 14.4419 8.83166 14.1797 8.83016C13.9174 8.82865 13.6651 8.93022 13.477 9.11298L12.0015 10.5973L10.5 9.09002C10.3118 8.90742 10.0594 8.80606 9.79717 8.80776C9.53495 8.80947 9.28389 8.9141 9.09807 9.09913C8.91225 9.28416 8.80655 9.53478 8.80373 9.79699C8.80091 10.0592 8.90121 10.312 9.083 10.501L10.5918 12.0154Z" fill="#E56910"/>
                </svg>

                  Deactivate
                </Button>

                <Button 
                  type="gray-btn" 
                  :onClick="viewTransactions" 
                  classStyle="px-3 py-1 text-sm"
                >
                  View Transactions
                </Button>
              </div>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="mt-6">
            <!-- Summary Tab -->
            <div v-if="customerModalTab === 'Summary'">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <!-- Name Section -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.customerName }}</p>
                  </div>

                  <!-- Email Section -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.email }}</p>
                  </div>
                </div>

                <!-- Phone Section -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.phone }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                    <p class="text-sm text-gray-900">-</p>
                    <p class="text-sm text-gray-500">Nil</p>
                  </div>
                </div>

                <!-- Date of Account Creation -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Account Creation</label>
                  <div class="flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.995 2H16.005C17.107 2 18 2.895 18 3.994V16.006C18 16.2679 17.9484 16.5273 17.8481 16.7693C17.7478 17.0113 17.6009 17.2312 17.4156 17.4163C17.2304 17.6015 17.0104 17.7484 16.7684 17.8485C16.5263 17.9487 16.2669 18.0001 16.005 18H1.995C1.46607 18 0.958782 17.7899 0.584675 17.416C0.210569 17.0421 0.00026513 16.5349 0 16.006V3.994C0 2.893 0.892 2 1.995 2ZM2 6V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V6H2ZM3 1C3 0.734784 3.10536 0.48043 3.29289 0.292893C3.48043 0.105357 3.73478 0 4 0C4.26522 0 4.51957 0.105357 4.70711 0.292893C4.89464 0.48043 5 0.734784 5 1V2H3V1ZM13 1C13 0.734784 13.1054 0.48043 13.2929 0.292893C13.4804 0.105357 13.7348 0 14 0C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V2H13V1ZM4 10V7.999H6V10H4ZM12 10V7.999H14V10H12ZM8 10V7.999H10.001V10H8ZM4 14V12H6V14H4ZM8 14V12H10.001V14H8ZM12 14V12H14V14H12Z" fill="#626F86"/>
                    </svg>
                    <p class="text-sm text-gray-900">{{ selectedCustomer?.dateOfAccountCreation }}</p>
                  </div>
                </div>

                <!-- Customer Type -->
                <div class="">
                  <h3 class="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-3">Customer Type</h3>
                  <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2">
                      <input type="radio" :value="selectedCustomer?.customerType" :checked="true" class="text-blue-600">
                      <span class="text-sm text-gray-900">{{ selectedCustomer?.customerType }}</span>
                    </label>
                  </div>
                </div>

                <!-- Bank Details -->
                <div class="">
                  <h3 class="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-3">Bank Details</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <p class="text-sm text-gray-900">{{ selectedCustomer?.accountNumber }} 8236077021</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                      <div class="flex items-center gap-1">
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 12H14V14H16M16 8H14V10H16M18 16H10V14H12V12H10V10H12V8H10V6H18M8 4H6V2H8M8 8H6V6H8M8 12H6V10H8M8 16H6V14H8M4 4H2V2H4M4 8H2V6H4M4 12H2V10H4M4 16H2V14H4M10 4V0H0V18H20V4H10Z" fill="#44546F"/>
                        </svg>
                        <p class="text-sm text-gray-900">{{ selectedCustomer?.bank }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- KYC Verification -->
                <div class="">
                  <h3 class="text-sm font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-3">KYC Verification</h3>
                  <div class="bg-[#F7F8F9] rounded-lg p-6">
                    <!-- Pill -->
                    <div class="mb-6">
                      <Pill 
                        type="hospital"
                        :text="`Verified: ${selectedCustomer?.kycTier}`"
                        :showIcon="true"
                      />
                    </div>
                    
                    <!-- Progress Tracker -->
                    <div class="relative">
                      <!-- Progress Bar Background -->
                      <div class="absolute left-0 top-4 w-full h-2 bg-gray-200 rounded-full"></div>
                      <!-- Progress Bar Foreground -->
                      <div class="absolute left-0 top-4 h-2 bg-blue-600 rounded-full" style="width: 66.66%;"></div>
                      
                      <!-- Tiers -->
                      <div class="relative flex justify-between items-start">
                        <!-- Tier 1 -->
                        <div class="flex flex-col items-left text-center">
                          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center z-10">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.5 4L6.5 11L2.5 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-900 mt-2 text-left">Tier 1</span>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6Z" fill="currentColor"/><path d="M6 7C4.34315 7 3 8.34315 3 10V11H9V10C9 8.34315 7.65685 7 6 7Z" fill="currentColor"/></svg>
                            <span>System Admin</span>
                          </div>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" fill="currentColor"/></svg>
                            <span>10/05/2025</span>
                          </div>
                        </div>
                        
                        <!-- Tier 2 -->
                        <div class="flex flex-col items-left text-center">
                          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center z-10">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.5 4L6.5 11L2.5 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                          <span class="text-sm font-medium text-gray-900 mt-2 text-left">Tier 2</span>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6Z" fill="currentColor"/><path d="M6 7C4.34315 7 3 8.34315 3 10V11H9V10C9 8.34315 7.65685 7 6 7Z" fill="currentColor"/></svg>
                            <span>System Admin</span>
                          </div>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" fill="currentColor"/></svg>
                            <span>10/05/2025</span>
                          </div>
                        </div>
                        
                        <!-- Tier 3 -->
                        <div class="flex flex-col items-left text-center">
                          <div class="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center z-10">
                            <span class="text-sm font-medium text-gray-600">3</span>
                          </div>
                          <span class="text-sm font-medium text-gray-900 mt-2 text-left">Tier 3</span>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6Z" fill="currentColor"/><path d="M6 7C4.34315 7 3 8.34315 3 10V11H9V10C9 8.34315 7.65685 7 6 7Z" fill="currentColor"/></svg>
                            <span>--</span>
                          </div>
                          <div class="flex items-center gap-1 mt-1 text-xs text-gray-600">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h6V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" fill="currentColor"/></svg>
                            <span>--</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Store Tab -->
            <div v-if="customerModalTab === 'Store'">
              <Datatable 
                :items="storeData" 
                :filterByDate="false" 
                :filterFields="storeFilterFields" 
                :columns="storeColumns" 
                pageName="Customer Stores"
                :key="`store-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Status Column with Pill -->
                  <span v-if="col.props?.column?.field === 'status'">
                    <Pill 
                      type="hospital"
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

            <!-- Orders Tab -->
            <div v-if="customerModalTab === 'Orders'">
              <Datatable 
                :items="orderData" 
                :filterByDate="false" 
                :filterFields="orderFilterFields" 
                :columns="orderColumns" 
                pageName="Customer Orders"
                :key="`orders-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Amount Column with Currency -->
                  <span v-if="col.props?.column?.field === 'amount'">
                    {{ formatCurrency(col.props.formattedRow[col.props.column.field]) }}
                  </span>
                  <!-- Status Column with Pill -->
                  <span v-else-if="col.props?.column?.field === 'status'">
                    <Pill 
                      :type="col.props.formattedRow[col.props.column.field] === 'Completed' ? 'cash-and-carry' : 'controlled'"
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

            <!-- Discount Tab -->
            <div v-if="customerModalTab === 'Discount'">
              <Datatable 
                :items="discountData" 
                :filterByDate="false" 
                :filterFields="discountFilterFields" 
                :columns="discountColumns" 
                pageName="Customer Discounts"
                :key="`discount-${customerModalKey}`"
              >
                <template #column="col">
                  <!-- Target Column with Currency -->
                  <span v-if="col.props?.column?.field === 'target'">
                    {{ formatCurrency(col.props.formattedRow[col.props.column.field]) }}
                  </span>
                  <!-- Status Column with Pill -->
                  <span v-else-if="col.props?.column?.field === 'status'">
                    <Pill 
                      type="hospital"
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
          </div>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-between">
          <Button 
            type="red-btn" 
            :onClick="deleteCustomerFromModal" 
            classStyle="px-4 py-2 flex items-center gap-2"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H17C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9H7C6.73478 9 6.48043 8.89464 6.29289 8.70711C6.10536 8.51957 6 8.26522 6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7ZM9.78 18C9.55707 18 9.34054 17.9255 9.16479 17.7883C8.98905 17.6512 8.86417 17.4592 8.81 17.243L7.156 10.62C7.13782 10.5465 7.13659 10.4697 7.15239 10.3957C7.1682 10.3216 7.20064 10.252 7.24726 10.1923C7.29387 10.1326 7.35345 10.0843 7.42149 10.0509C7.48953 10.0176 7.56424 10.0002 7.64 10H16.36C16.4359 10 16.5109 10.0173 16.5791 10.0507C16.6474 10.084 16.7072 10.1324 16.7539 10.1922C16.8007 10.2521 16.8332 10.3218 16.8489 10.3961C16.8647 10.4704 16.8634 10.5473 16.845 10.621L15.189 17.243C15.1348 17.4592 15.01 17.6512 14.8342 17.7883C14.6585 17.9255 14.4419 18 14.219 18H9.781H9.78ZM11 6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7H10C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6Z" fill="white"/>
</svg>

          </Button>
          <Button 
            type="blue-btn" 
            :onClick="closeModal" 
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>

    <!-- Success Alert Toast -->
    <SuccessAlertToast
      :isVisible="showSuccessToast"
      :message="successMessage"
      @close="closeSuccessToast"
    />
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Tabs from "@/views/Components/Tabs.vue";
import Datatable from "@/views/Components/Datatable/Datatable.vue";
import Button from "@/views/Components/ui/Button.vue";
import Pill from "@/views/Components/ui/Pill.vue";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import CustomMultiSelect from '@/views/Components/CustomMultiSelect.vue';
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue';
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue';
import SelectField from '@/views/Components/ui/SelectField.vue';
import { ref, computed } from 'vue';
import type { TableColumn } from '@/types';


// Tabs configuration
const tabs = ref([
  'Active Users',
  'Deactivated Users'
]);

const activeTab = ref('Active Users');

// Reactive variables
const childKey = ref(0);

// Modal states
const showMergeModal = ref(false);
const showCreateModal = ref(false);
const showWarningModal = ref(false);

// Merge customers state
const primaryCustomer = ref<any>(null);
const otherCustomers = ref([]);
const mergeFormData = ref({
  primaryCustomer: null,
  otherCustomers: []
});

// Create customer form data
const createCustomerForm = ref({
  customerName: '',
  phoneNumber: '',
  email: '',
  customerType: null,
  password: '',
  isExternalUser: false,
  storeName: '',
  storeAddress: '',
  state: null,
  lga: null,
  storeImages: [],
  storeLicenses: [],
  agent: null
});

// Form options
const customerTypeOptions = ref([
  { id: 1, name: 'Hospital' },
  { id: 2, name: 'Pharmacy' },
  { id: 3, name: 'Mega distributor' },
  { id: 4, name: 'Individual' }
]);

const stateOptions = ref([
  { id: 1, name: 'Lagos' },
  { id: 2, name: 'Abuja' },
  { id: 3, name: 'Kano' },
  { id: 4, name: 'Rivers' },
  { id: 5, name: 'Ogun' }
]);

const lgaOptions = ref([
  { id: 1, name: 'Ikeja' },
  { id: 2, name: 'Victoria Island' },
  { id: 3, name: 'Ikoyi' },
  { id: 4, name: 'Lekki' },
  { id: 5, name: 'Surulere' }
]);

const agentOptions = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'Sarah Wilson' }
]);

// Warning tag options
const warningTagOptions = ref([
  { id: 1, name: 'High Risk' },
  { id: 2, name: 'Payment Issues' },
  { id: 3, name: 'Compliance Violation' },
  { id: 4, name: 'Fraud Suspected' },
  { id: 5, name: 'Account Suspended' }
]);

// Table columns configuration
const columns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customerName', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Customer Type', field: 'customerType', sortable: true },
  { label: 'Email', field: 'email', sortable: true },
  { label: 'Phone', field: 'phone', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Warning Tags', field: 'warningTags', sortable: false },
  { label: 'Action', field: 'action', sortable: false }
]);

// Filter fields for Datatable
const filterFields = ref({
  customerType: {
    field: 'customerType',
    type: 'select' as const,
    label: 'Customer Type',
    options: [
      { id: 1, name: 'All Types' },
      { id: 2, name: 'Hospital' },
      { id: 3, name: 'Pharmacy' },
      { id: 4, name: 'Mega distributor' }
    ]
  },
  status: {
    field: 'status',
    type: 'select' as const,
    label: 'Status',
    options: [
      { id: 1, name: 'All Status' },
      { id: 2, name: 'Enabled' },
      { id: 3, name: 'Disabled' }
    ]
  }
});

// Mock customer data
const customers = ref([
  {
    id: 87,
    customerName: 'Oluwatosin Adegboye',
    storeName: 'Emeka Pharmacy',
    customerType: 'Hospital',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    warningTags: 'N/A'
  },
  {
    id: 54,
    customerName: 'Janet Adeajayi',
    storeName: 'Emeka Pharmacy',
    customerType: 'Pharmacy',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    warningTags: 'N/A'
  },
  {
    id: 25,
    customerName: 'Henry Christopher',
    storeName: 'Emeka Pharmacy',
    customerType: 'Hospital',
    email: 'sleeknne4u1@gmail.com',
    phone: '+234 899 9999 999',
    status: 'Enabled',
    warningTags: 'N/A'
  },
  {
    id: 18,
    customerName: 'Michael Brown',
    storeName: 'Brown Medical Center',
    customerType: 'Hospital',
    email: 'michael.brown@brownmedical.com',
    phone: '+234 802 345 6789',
    status: 'Enabled',
    warningTags: 'N/A'
  },
  {
    id: 12,
    customerName: 'Grace Williams',
    storeName: 'Grace Pharmacy',
    customerType: 'Pharmacy',
    email: 'grace.w@gracepharmacy.com',
    phone: '+234 803 456 7890',
    status: 'Disabled',
    warningTags: 'N/A'
  },
  {
    id: 8,
    customerName: 'David Smith',
    storeName: 'Smith Distributors',
    customerType: 'Mega distributor',
    email: 'david.smith@smithdist.com',
    phone: '+234 804 567 8901',
    status: 'Enabled',
    warningTags: 'N/A'
  },
  {
    id: 5,
    customerName: 'Jennifer Davis',
    storeName: 'Davis Medical',
    customerType: 'Hospital',
    email: 'jennifer.d@davismedical.com',
    phone: '+234 805 678 9012',
    status: 'Disabled',
    warningTags: 'N/A'
  }
]);

// Computed filtered customers based on active tab
const filteredCustomers = computed(() => {
  let filtered = customers.value;

  // Filter by tab (Active/Deactivated)
  if (activeTab.value === 'Active Users') {
    filtered = filtered.filter(customer => customer.status === 'Enabled');
  } else if (activeTab.value === 'Deactivated Users') {
    filtered = filtered.filter(customer => customer.status === 'Disabled');
  }

  return filtered;
});

// Functions
const onTabChanged = (tab: string | any, index: number) => {
  activeTab.value = typeof tab === 'string' ? tab : tab.label;
  console.log('Tab changed to:', tab, 'at index:', index);
};


// Action handlers
const viewCustomer = (customer: any) => {
  console.log('View customer:', customer);
};

const notifyCustomer = (customer: any) => {
  console.log('Notify customer:', customer);
};

const loginToAccount = (customer: any) => {
  console.log('Login to account:', customer);
};

const addWarningTags = (customer: any) => {
  console.log('Add warning tags:', customer);
};

const downloadTransactions = (customer: any) => {
  console.log('Download transactions:', customer);
};

const downloadPartnerTransactions = (customer: any) => {
  console.log('Download partner transactions:', customer);
};

const downloadCombinedTransactions = (customer: any) => {
  console.log('Download combined transactions:', customer);
};

const resetPassword = (customer: any) => {
  console.log('Reset password:', customer);
};

const deactivateCustomer = (customer: any) => {
  console.log('Deactivate customer:', customer);
};

const deleteCustomer = (customer: any) => {
  console.log('Delete customer:', customer);
};

// Download Report function
const downloadReport = () => {
  showSuccessToast.value = true;
};

// Merge Customers functions
const openMergeModal = () => {
  showMergeModal.value = true;
};

const closeMergeModal = () => {
  showMergeModal.value = false;
  primaryCustomer.value = null;
  otherCustomers.value = [];
  mergeFormData.value = {
    primaryCustomer: null,
    otherCustomers: []
  };
};

const handleMergeSubmit = () => {
  if (!primaryCustomer.value || otherCustomers.value.length === 0) {
    return;
  }
  
  // Show warning confirmation
  showWarningModal.value = true;
};

const confirmMerge = () => {
  console.log('Merging customers:', {
    primary: primaryCustomer.value,
    others: otherCustomers.value
  });
  
  // Close modals
  showWarningModal.value = false;
  showMergeModal.value = false;
  
  // Reset form
  primaryCustomer.value = null;
  otherCustomers.value = [];
  mergeFormData.value = {
    primaryCustomer: null,
    otherCustomers: []
  };
};

const cancelMerge = () => {
  showWarningModal.value = false;
};

// Create Customer functions
const openCreateModal = () => {
  showCreateModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

// File input functions
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    console.log('Selected file:', file);
    // Handle file upload logic here
  }
};

// Action button modals and states
const showNotifyModal = ref(false);
const showWarningTagsModal = ref(false);
const showActionWarningModal = ref(false);
const showDeleteModal = ref(false);
const showViewCustomerModal = ref(false);

// Customer modal tab state
const customerModalTab = ref('Summary');
const customerModalKey = ref(0);
const showSuccessToast = ref(false);
const successMessage = ref('');
const currentAction = ref('');

// Mock data for customer modal tabs
const storeData = ref([
  {
    id: 1,
    storeName: 'Emeka Pharmacy',
    address: '123 Main Street, Lagos',
    status: 'Active',
    registrationDate: '2023-01-15'
  },
  {
    id: 2,
    storeName: 'Health Plus Store',
    address: '456 Victoria Island, Lagos',
    status: 'Active',
    registrationDate: '2023-03-20'
  }
]);

const orderData = ref([
  {
    id: 1,
    orderNumber: 'ORD-001',
    date: '2024-01-15',
    amount: 150000,
    status: 'Completed'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    date: '2024-01-20',
    amount: 75000,
    status: 'Pending'
  }
]);

const discountData = ref([
  {
    id: 1,
    discountType: 'Volume Discount',
    percentage: 10,
    target: 500000,
    status: 'Active'
  },
  {
    id: 2,
    discountType: 'Loyalty Discount',
    percentage: 5,
    target: 200000,
    status: 'Active'
  }
]);

// Store tab columns and filters
const storeColumns = ref<TableColumn[]>([
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Address', field: 'address', sortable: true },
  { label: 'Status', field: 'status', sortable: true },
  { label: 'Registration Date', field: 'registrationDate', sortable: true }
]);

const storeFilterFields = ref({
  status: {
    field: 'status',
    type: 'select' as const,
    label: 'Status',
    options: [
      { id: 1, name: 'All Status' },
      { id: 2, name: 'Active' },
      { id: 3, name: 'Inactive' }
    ]
  }
});

// Orders tab columns and filters
const orderColumns = ref<TableColumn[]>([
  { label: 'Order Number', field: 'orderNumber', sortable: true },
  { label: 'Date', field: 'date', sortable: true },
  { label: 'Amount', field: 'amount', sortable: true },
  { label: 'Status', field: 'status', sortable: true }
]);

const orderFilterFields = ref({
  status: {
    field: 'status',
    type: 'select' as const,
    label: 'Status',
    options: [
      { id: 1, name: 'All Status' },
      { id: 2, name: 'Completed' },
      { id: 3, name: 'Pending' },
      { id: 4, name: 'Cancelled' }
    ]
  }
});

// Discount tab columns and filters
const discountColumns = ref<TableColumn[]>([
  { label: 'Discount Type', field: 'discountType', sortable: true },
  { label: 'Percentage', field: 'percentage', sortable: true },
  { label: 'Target', field: 'target', sortable: true },
  { label: 'Status', field: 'status', sortable: true }
]);

const discountFilterFields = ref({
  status: {
    field: 'status',
    type: 'select' as const,
    label: 'Status',
    options: [
      { id: 1, name: 'All Status' },
      { id: 2, name: 'Active' },
      { id: 3, name: 'Inactive' }
    ]
  }
});

// Notify modal form
const notifyForm = ref({
  title: '',
  body: ''
});

// Warning tags form
const warningTagsForm = ref({
  tags: [] as any[]
});

// Selected customer for actions
const selectedCustomer = ref<any>(null);

// Action handlers
const handleAction = (action: string, customer: any) => {
  selectedCustomer.value = customer;
  currentAction.value = action;
  
  switch (action) {
    case 'notify':
      showNotifyModal.value = true;
      break;
    case 'warning-tags':
      showWarningTagsModal.value = true;
      break;
    case 'reset-password':
      showActionWarningModal.value = true;
      break;
    case 'deactivate':
      showActionWarningModal.value = true;
      break;
    case 'delete':
      showDeleteModal.value = true;
      break;
    case 'view':
      showViewCustomerModal.value = true;
      break;
    default:
      showSuccessToast.value = true;
      successMessage.value = `${action} action completed successfully`;
  }
};

// Notify modal handlers
const sendNotification = () => {
  showActionWarningModal.value = true;
};

const confirmNotification = () => {
  showNotifyModal.value = false;
  showActionWarningModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'Notification sent successfully';
  // Reset form
  notifyForm.value = { title: '', body: '' };
};

// Warning tags handlers
const saveWarningTags = () => {
  showWarningTagsModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'Warning tags updated successfully';
  // Reset form
  warningTagsForm.value = { tags: [] };
};

// Action warning modal handlers
const confirmActionWarning = () => {
  showActionWarningModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'Action completed successfully';
};

const closeActionWarningModal = () => {
  showActionWarningModal.value = false;
};

// Delete modal handlers
const confirmDelete = () => {
  showDeleteModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'Customer deleted successfully';
};

// Close modals
const closeNotifyModal = () => {
  showNotifyModal.value = false;
  notifyForm.value = { title: '', body: '' };
};

const closeWarningTagsModal = () => {
  showWarningTagsModal.value = false;
  warningTagsForm.value = { tags: [] };
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const closeSuccessToast = () => {
  showSuccessToast.value = false;
};

// View Customer modal action functions
const editCustomerDetails = () => {
  showViewCustomerModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'Edit Customer Details action completed successfully';
};

const viewTransactions = () => {
  showViewCustomerModal.value = false;
  showSuccessToast.value = true;
  successMessage.value = 'View Transactions action completed successfully';
};

const deactivateCustomerFromModal = () => {
  showViewCustomerModal.value = false;
  showActionWarningModal.value = true;
};

const deleteCustomerFromModal = () => {
  showViewCustomerModal.value = false;
  showDeleteModal.value = true;
};

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};

const getPillType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'enabled':
      return 'hospital';
    case 'disabled':
      return 'controlled';
    default:
      return 'hospital';
  }
};
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}
.grey_bg {
  background-color: #f7f8f9 !important;
}
</style>
