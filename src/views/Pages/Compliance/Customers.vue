<template>
    <div class="erp_dashboard_wrapper">
        <div class="grey_bg">
            <!-- Header -->
            <PageTitle title="More Actions / All Customers / Active Users" class="px-6" />

            <!-- tabs -->
            <Tabs :tabs="customerTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />
        </div>
        
        <!-- contents -->
        <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
            <Datatable 
                :items="customerData" 
                :filterByDate="false" 
                :filterFields="filterFields" 
                :columns="columns" 
                pageName="All Customers"
                :key="`customers-${activeTab}-${childKey}`"
            >
                <template #column="col">
                    <!-- Status Column with Pill -->
                    <span v-if="col.props?.column?.field === 'status'">
                        <Pill 
                            :type="getPillType(col.props.formattedRow[col.props.column.field])"
                            :text="col.props.formattedRow[col.props.column.field]"
                        />
                    </span>
                    <!-- Action Column with Dropdown -->
                    <span v-else-if="col.props?.column?.field === 'action'">
                        <TableActionDropdown :rowData="col.props?.formattedRow">
                            <template #default="{ selectedItem, closeDropdown }">
                                <!-- View Customer -->
                                <li @click="viewCustomer(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="#626F86"/>
                                    </svg>
                                    View Customer
                                </li>
                                
                                <!-- Make User Eligible for KYC Tier 3 -->
                                <li @click="makeEligibleForKYC(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0013 2.5C13.6587 2.5 15.2752 3.01481 16.6275 3.97328C17.9797 4.93175 19.0008 6.28655 19.5498 7.85047C20.0987 9.41439 20.1483 11.1102 19.6918 12.7035C19.2353 14.2969 18.2951 15.7091 17.0013 16.745V21.355C17.0012 21.5327 16.9582 21.7078 16.8757 21.8652C16.7933 22.0227 16.6739 22.1578 16.5279 22.259C16.3818 22.3602 16.2134 22.4246 16.0371 22.4465C15.8607 22.4685 15.6817 22.4474 15.5153 22.385L12.0013 21.069L8.48725 22.387C8.32076 22.4494 8.14163 22.4705 7.96519 22.4485C7.78876 22.4265 7.62029 22.3621 7.4742 22.2607C7.32812 22.1594 7.20879 22.0241 7.12642 21.8666C7.04405 21.709 7.0011 21.5338 7.00125 21.356V16.746C5.707 15.7102 4.76648 14.2979 4.3097 12.7044C3.85293 11.1109 3.90245 9.41479 4.45143 7.85064C5.00041 6.28648 6.02174 4.93148 7.37422 3.97297C8.72671 3.01445 10.3436 2.49974 12.0013 2.5ZM15.0013 17.919C14.0479 18.3036 13.0293 18.5009 12.0013 18.5C10.9732 18.5009 9.95463 18.3036 9.00125 17.919V20.057L11.2993 19.195C11.7519 19.0253 12.2506 19.0253 12.7033 19.195L15.0013 20.057V17.919ZM12.0013 4.5C10.41 4.5 8.88383 5.13214 7.75861 6.25736C6.63339 7.38258 6.00125 8.9087 6.00125 10.5C6.00125 12.0913 6.63339 13.6174 7.75861 14.7426C8.88383 15.8679 10.41 16.5 12.0013 16.5C13.5926 16.5 15.1187 15.8679 16.2439 14.7426C17.3691 13.6174 18.0013 12.0913 18.0013 10.5C18.0013 8.9087 17.3691 7.38258 16.2439 6.25736C15.1187 5.13214 13.5926 4.5 12.0013 4.5ZM12.0013 6.5C13.0621 6.5 14.0795 6.92143 14.8297 7.67157C15.5798 8.42172 16.0013 9.43913 16.0013 10.5C16.0013 11.5609 15.5798 12.5783 14.8297 13.3284C14.0795 14.0786 13.0621 14.5 12.0013 14.5C10.9404 14.5 9.92297 14.0786 9.17283 13.3284C8.42268 12.5783 8.00125 11.5609 8.00125 10.5C8.00125 9.43913 8.42268 8.42172 9.17283 7.67157C9.92297 6.92143 10.9404 6.5 12.0013 6.5ZM12.0013 8.5C11.4708 8.5 10.9621 8.71071 10.587 9.08579C10.212 9.46086 10.0013 9.96957 10.0013 10.5C10.0013 11.0304 10.212 11.5391 10.587 11.9142C10.9621 12.2893 11.4708 12.5 12.0013 12.5C12.5317 12.5 13.0404 12.2893 13.4155 11.9142C13.7905 11.5391 14.0013 11.0304 14.0013 10.5C14.0013 9.96957 13.7905 9.46086 13.4155 9.08579C13.0404 8.71071 12.5317 8.5 12.0013 8.5Z" fill="#626F86"/>
                                    </svg>
                                    Make User Eligible for KYC Tier 3
                                </li>
                                
                                <!-- Download Transactions -->
                                <li @click="downloadTransactions(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                                        <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                                    </svg>
                                    Download Transactions
                                </li>
                                
                                <!-- Download Partner Transactions -->
                                <li @click="downloadPartnerTransactions(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                                        <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                                    </svg>
                                    Download Partner Transactions
                                </li>
                                
                                <!-- Download Combined Transactions -->
                                <li @click="downloadCombinedTransactions(selectedItem); closeDropdown()" 
                                    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="#626F86"/>
                                        <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="#626F86"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="#626F86"/>
                                    </svg>
                                    Download Combined Transactions
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
    </div>

    <!-- Customer Details Modal -->
    <SideBarModal 
        :isOpen="isCustomerModalOpen" 
        @update:isOpen="isCustomerModalOpen = $event"
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
                        <div class=" flex items-center justify-center">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M0 6C0 2.68629 2.68629 0 6 0H38C41.3137 0 44 2.68629 44 6V38C44 41.3137 41.3137 44 38 44H6C2.68629 44 0 41.3137 0 38V6Z" fill="#DCDFE4"/>
                            <circle cx="22" cy="22" r="12" fill="url(#pattern0_11480_55637)"/>
                            <defs>
                            <pattern id="pattern0_11480_55637" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_11480_55637" transform="scale(0.0078125)"/>
                            </pattern>
                            <image id="image0_11480_55637" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAV+SURBVHgB7Z0/aBVZFMaPu4qbNLsYMSwh7sK6uzYRIhhEEQstBEURG4ld7CRgZylWgtimVRv/gYooCpFYKJoUsYiYxj9pTEhhiKKIRiudb56johZPncmc757vB48JkfB87/7uuXfu3HvOgr79h9+ZCMsvJkIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYIjAYKz0ALQ2rLYOjvarbvrP1u65Pf8Z/yuteW3/N9fz72xp89eZNe3Njn9xMbGH9qDiUmLwIKUN4T8v2K5re9ZlTX8vx8bu1kgxdj4IxsevZe0DEkKgIbfsWVDfi0DCHDm4pBNTc9YaiQlAMI6Gn7zxjVWBcOj43Z58JbNZsNFKiQzB8C43r93Vz7GV8X6nq48qhwdOJWMBEncBWCcP9DfW2njF+A9jhzcl8uQAvQRAI3f17vV5pu+3m35FcMCM9QRAOG4jsYvgARlTTTrglYAhOKiF9ZJ1fOOqqEVAI3v4YvH+oIHEX8USgGK2bgXGgtOnJNCSgG2Z/f63ti9c3O+DsEGnQDoaR7HXAwFVS1AVQmdAB57f8Hq7GETG1QCYKz1POPGaiTbbSGVAN0EPUwCVMjyrId5Z+WKv4wJuiHAO50dy4wJGgE6CXo/wN0A08ogjQBM99htEqB8vndLV51IgApgXGVjgEYA7Nhl4SnRbiEaAVLah+cJGgHm5t4YC1PTT4wFqgjwmkAC/B+ZhiuqhaAHE1PmHbZDJFQC3J94bN7BsTImqAQYIdiBqwhQIRhfPX/B6P1sdyt0G0IuDd4yrwzdvGNs0AmACOAxCmB+wniKmHJTqMcocOL0VWOEUgD0NE/h9hLxiWHagyFnL153EXKx6nd58LaxQn028PjpK7X2PLz3wLELxgy1AGiAus7q1/neZUKfH6COhkDYTyVJxK/dazcdMnLw8AWrhIsWLbR//u6wKsHkE0PPi5evLAWSSRGDVUJMDNE7cXqo7I2Z6O1o+NQyhiWXJxAZO/DCGcIyRIBY6PXXsxfTY95mSTZRZCECThMhTyCuzW4sbeQIfJj/feoJI5NOFPklOFvQyBS67KvIgBCPvXyT0zNUO3p+lhCpYgvQsFMfUsGKBkoWHRwJEBwJEBwJEBy3k0DM0pEFFEfCMWtnOhsIcCuJ7OKoP4A1BK/Lxu5uA9HwWMBJJRdvgddM464iAO7TkfSZrbc3Q5HbcODYeVd1B9zMAVJu/AJEtwP9e1xlEXEhAL4Y5NxNufEL8BkhgZcsIi4EqOLpnWcgATKLeqB2ARqz/bQmfM2Ah1MehoLaBWBMr1oWHvIe1i4AQ+6/qvCQU7B2Adjy6pWJhgDjyv5VNh4+u54FBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBEcCBKd2ARiqgVaFh89euwAM1UCrwkMa2toFGLo5alHxkLHUQQTwWQaualBmbthBJVQXk8C6a//MN/isXsrMuRAglfo7zeDts7q5DSy+mJRTtSPsexPdVc0gVOS4MTKWX/9sb0smdwBu985fuWEnz11zV3XEZapYpFa9m82Q1/V05eliWTOIMZSbcV8xpLVlcZ5MCTJ4yKnTDAj1Y+OPbGT0nvs6Q1QlYxAJkG7Vmwzo6ZN5JRKORv8cqpIxmDzNfigGBRqZxNvzK+SYr4xjs8+e52sXRX0hvFgriiVXNKooDNWWvYorhhFMKHEFS5f88c2/RcN++rlRRAoNi5/n8l4+k/3ueVLl45IrGlX0SNEcehwcHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQHAkQnPeNKiSCDjkSyAAAAABJRU5ErkJggg=="/>
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

                <!-- Modal Tabs -->
                <div class="mb-6 border-b border-gray-200">
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
            <div class="flex justify-end">
                <button 
                    @click="closeModal"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Close
                </button>
  </div>
        </template>
    </SideBarModal>

    <!-- KYC Tier 3 Confirmation Modal -->
    <WarningConfirmationModal
        :show="isKYCModalOpen"
        title="Make User Eligible for KYC Tier 3?"
        :message="kycModalMessage"
        confirmText="Confirm"
        cancelText="Cancel"
        @close="handleKYCCancel"
        @confirm="handleKYCConfirm"
    />

    <!-- Success Toast -->
    <SuccessAlertToast
        :isVisible="showSuccessToast"
        :message="successMessage"
        @close="handleToastClose"
    />
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Tabs from '@/views/Components/Tabs.vue'
import Pill from '@/views/Components/ui/Pill.vue'
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
import SideBarModal from '@/views/Components/SideBarModal.vue'
import WarningConfirmationModal from '@/views/Components/ui/WarningConfirmationModal.vue'
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Types
interface CustomerData {
    id: number
    customerName: string
    storeName: string
    customerType: string
    email: string
    phone: string
    status: string
    warningTags: string
}

interface CustomerDetails {
    id: number
    customerName: string
    phone: string
    storeName: string
    status: string
    kycTier: string
    email: string
    dateOfAccountCreation: string
    agent: string
    customerType: string
    accountNumber: string
    bank: string
}

interface StoreData {
    id: number
    storeName: string
    address: string
    quantityToReturn: number
    status: string
}

interface OrderData {
    id: number
    orderNumber: string
    date: string
    amount: number
    status: string
}

interface DiscountData {
    id: number
    discountPercent: number
    startDate: string
    endDate: string
    target: number
    status: string
    orders: number
    date: string
}

// Tab state
const activeTab = ref('Active Users')
const childKey = ref(0)

// Modal state
const isCustomerModalOpen = ref(false)
const selectedCustomer = ref<CustomerDetails | null>(null)
const customerModalTab = ref('Summary')
const customerModalKey = ref(0)

// KYC Modal state
const isKYCModalOpen = ref(false)
const kycCustomer = ref<CustomerData | null>(null)

// Success Toast state
const showSuccessToast = ref(false)
const successMessage = ref('')

// Tab configuration
const customerTabs = ref([
    { name: 'Active Users', count: 15 },
    { name: 'Deactivated Users', count: 3 }
])

// Mock customer data
const activeCustomers = ref<CustomerData[]>([
    { id: 87, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 54, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 25, customerName: "Henry Christopher", storeName: "Xela pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 30, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 51, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 21, customerName: "Henry Christopher", storeName: "Xela pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 35, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 23, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 33, customerName: "Henry Christopher", storeName: "Xela pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 88, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 81, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 80, customerName: "Henry Christopher", storeName: "Xela pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 5, customerName: "Oluwatosin Adegboye", storeName: "Emeka Pharmacy", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 55, customerName: "Janet Adeajayi", storeName: "Emma Bros Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" },
    { id: 12, customerName: "Henry Christopher", storeName: "Xela pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Enabled", warningTags: "N/A" }
])

const deactivatedCustomers = ref<CustomerData[]>([
    { id: 67, customerName: "John Doe", storeName: "Test Pharmacy", customerType: "Pharmacy", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Disabled", warningTags: "N/A" },
    { id: 89, customerName: "Jane Smith", storeName: "Demo Store", customerType: "Hospital", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Disabled", warningTags: "N/A" },
    { id: 43, customerName: "Bob Wilson", storeName: "Sample Pharmacy", customerType: "Mega distributor", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", status: "Disabled", warningTags: "N/A" }
])

// Computed customer data based on active tab
const customerData = computed(() => {
    return activeTab.value === 'Active Users' ? activeCustomers.value : deactivatedCustomers.value
})

// Table columns
const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true
    },
    {
        label: 'Customer Name',
        field: 'customerName',
        sortable: true
    },
    {
        label: 'Store Name',
        field: 'storeName',
        sortable: true
    },
    {
        label: 'Customer Type',
        field: 'customerType',
        sortable: true
    },
    {
        label: 'Email',
        field: 'email',
        sortable: true
    },
    {
        label: 'Phone',
        field: 'phone',
        sortable: true
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true
    },
    {
        label: 'Warning Tags',
        field: 'warningTags',
        sortable: true
    },
    {
        label: 'Action',
        field: 'action',
        sortable: false
    }
])

// Filter fields
const filterFields = ref<FilterFields<FilterField>>({
    customerName: {
        type: 'text',
        label: 'Customer Name',
        placeholder: 'Search by customer name'
    },
    storeName: {
        type: 'text',
        label: 'Store Name',
        placeholder: 'Search by store name'
    },
    customerType: {
        type: 'text',
        label: 'Customer Type',
        placeholder: 'Search by customer type'
    }
})

// Tab change handler
const handleTabChange = (tab: string | { name: string; count: number }, index: number) => {
    activeTab.value = typeof tab === 'string' ? tab : tab.name;
    
    // Force reactivity update for tables
    nextTick(() => {
        childKey.value += 1;
    });
};

// Get pill type for status
const getPillType = (status: string) => {
    switch (status) {
        case 'Enabled':
            return 'cash-and-carry'; // Green pill for enabled
        case 'Disabled':
            return 'controlled'; // Purple pill for disabled
        default:
            return 'hospital'; // Blue pill as default
    }
};

// Mock data for customer details
const storeData = ref<StoreData[]>([
    { id: 54, storeName: "Emeka Pharmacy", address: "11 Ademola Adentokumbo", quantityToReturn: 189, status: "Verified" }
])

const orderData = ref<OrderData[]>([
    { id: 1, orderNumber: "ORD-001", date: "16/01/2025", amount: 15000, status: "Completed" },
    { id: 2, orderNumber: "ORD-002", date: "15/01/2025", amount: 25000, status: "Pending" }
])

const discountData = ref<DiscountData[]>([
    { id: 54, discountPercent: 10, startDate: "16/01/2025", endDate: "16/01/2025", target: 3220, status: "Ongoing", orders: 1, date: "16/01/2025 10:39 AM" },
    { id: 54, discountPercent: 10, startDate: "16/01/2025", endDate: "16/01/2025", target: 3220, status: "Ongoing", orders: 2, date: "16/01/2025 10:39 AM" }
])

// Table columns for modal tabs
const storeColumns = ref<TableColumn[]>([
    { label: 'ID', field: 'id', sortable: true },
    { label: 'Store Name', field: 'storeName', sortable: true },
    { label: 'Address', field: 'address', sortable: true },
    { label: 'Quantity to Return', field: 'quantityToReturn', sortable: true },
    { label: 'Status', field: 'status', sortable: true }
])

const orderColumns = ref<TableColumn[]>([
    { label: 'ID', field: 'id', sortable: true },
    { label: 'Order Number', field: 'orderNumber', sortable: true },
    { label: 'Date', field: 'date', sortable: true },
    { label: 'Amount', field: 'amount', sortable: true },
    { label: 'Status', field: 'status', sortable: true }
])

const discountColumns = ref<TableColumn[]>([
    { label: 'ID', field: 'id', sortable: true },
    { label: 'Discount (%)', field: 'discountPercent', sortable: true },
    { label: 'Start Date', field: 'startDate', sortable: true },
    { label: 'End Date', field: 'endDate', sortable: true },
    { label: 'Target', field: 'target', sortable: true },
    { label: 'Status', field: 'status', sortable: true },
    { label: 'Orders', field: 'orders', sortable: true },
    { label: 'Date', field: 'date', sortable: true }
])

// Filter fields for modal tabs
const storeFilterFields = ref<FilterFields<FilterField>>({
    storeName: { type: 'text', label: 'Store Name', placeholder: 'Search by store name' },
    address: { type: 'text', label: 'Address', placeholder: 'Search by address' }
})

const orderFilterFields = ref<FilterFields<FilterField>>({
    orderNumber: { type: 'text', label: 'Order Number', placeholder: 'Search by order number' },
    status: { type: 'text', label: 'Status', placeholder: 'Search by status' }
})

const discountFilterFields = ref<FilterFields<FilterField>>({
    status: { type: 'text', label: 'Status', placeholder: 'Search by status' }
})

// Action handlers
const viewCustomer = (customer: CustomerData) => {
    // Create detailed customer data
    selectedCustomer.value = {
        id: customer.id,
        customerName: customer.customerName,
        phone: customer.phone,
        storeName: customer.storeName,
        status: customer.status,
        kycTier: "Tier 2",
        email: customer.email,
        dateOfAccountCreation: "13/05/2022",
        agent: "Nil",
        customerType: customer.customerType,
        accountNumber: "",
        bank: "Wema bank"
    }
    
    customerModalTab.value = 'Summary'
    isCustomerModalOpen.value = true
    customerModalKey.value++
};

const makeEligibleForKYC = (customer: CustomerData) => {
    kycCustomer.value = customer
    isKYCModalOpen.value = true
};

const handleKYCConfirm = () => {
    if (kycCustomer.value) {
        console.log('Making customer eligible for KYC Tier 3:', kycCustomer.value);
        // TODO: Implement actual KYC eligibility API call
        
        // Close modal
        isKYCModalOpen.value = false
        kycCustomer.value = null
        
        // TODO: Show success message or update customer data
    }
};

const handleKYCCancel = () => {
    isKYCModalOpen.value = false
    kycCustomer.value = null
};

const downloadTransactions = (customer: CustomerData) => {
    console.log('Download transactions for:', customer);
    successMessage.value = `Transactions for ${customer.customerName} downloaded successfully`
    showSuccessToast.value = true
};

const downloadPartnerTransactions = (customer: CustomerData) => {
    console.log('Download partner transactions for:', customer);
    successMessage.value = `Partner transactions for ${customer.customerName} downloaded successfully`
    showSuccessToast.value = true
};

const downloadCombinedTransactions = (customer: CustomerData) => {
    console.log('Download combined transactions for:', customer);
    successMessage.value = `Combined transactions for ${customer.customerName} downloaded successfully`
    showSuccessToast.value = true
};

const handleToastClose = () => {
    showSuccessToast.value = false
    successMessage.value = ''
};

// Watch for modal tab changes to trigger reactivity update
watch(customerModalTab, () => {
    nextTick(() => {
        customerModalKey.value += 1;
    });
});

// Format currency for discount target
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦')
};

// Computed property for KYC modal message
const kycModalMessage = computed(() => {
    if (!kycCustomer.value) return ''
    return `You are about to make this user "${kycCustomer.value.customerName}" eligible for KYC Tier 3? This action will allow them to access Tier 3 features.`
});
</script>

<style scoped>
.grey_bg {
    background: rgba(247, 248, 249, 1);
}

.tab_contents {
    height: calc(100vh - 190px) !important;
    overflow: hidden !important;
}
</style>
