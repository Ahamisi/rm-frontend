<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="erp_dashboard_wrapper">
        <!-- Success Toast Modal -->
        <SuccessAlertToast :message="toastMessage" :duration="3000" :isVisible="showToast" @close="showToast = false" />

        <!-- Header -->
        <PageTitle :title="getPageTitle" class="px-6" />

        <!-- tabs -->
        <Tabs :tabs="getTabs" @tabChanged="handleTabChange" :defaultTab="activeTab">
            <div class="flex flex-wrap items-center gap-3 mb-1 ml-auto tab_actions">
                <!-- download -->
                <button @click="isProductReturnDownloadDateFilterModalOpen = true"
                    class="flex items-center px-2 py-1 rounded gap-x-1 grey_field">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                            fill="#44546F" />
                        <path
                            d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                            fill="#44546F" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                            fill="#44546F" />
                    </svg>

                    <span>Download Return Request</span>
                </button>
                <button @click="openCreateProductReturnModal"
                    class="flex items-center px-2 py-1 text-white rounded gap-x-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                            fill="white" />
                    </svg>
                    <span>Create Product Return</span>
                </button>
            </div>
        </Tabs>

        <!-- contents -->
        <div class="min-h-[calc(100vh-190px)] px-6 mt-0 bg-white tab_contents">
            <div class="" v-if="activeTab === 'New'">
                <Datatable :url="pending_url" :filterByDate="true" :columns="newColumns" :key="childKey"
                    pageName="NewProductReturns">
                    <template #column="col">
                        <span v-if="col.props.column.field == 'actions'">
                            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                                <template #default="{ selectedItem, closeDropdown }">
                                    <li @click="viewProductReturn(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                                fill="#626F86" />
                                        </svg>
                                        View Products
                                    </li>
                                    <li @click="openUpdateReturnStatusModal(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.0015 6.503V9.498C8.0015 9.76322 8.10686 10.0176 8.29439 10.2051C8.48193 10.3926 8.73628 10.498 9.0015 10.498C9.26672 10.498 9.52107 10.3926 9.70861 10.2051C9.89614 10.0176 10.0015 9.76322 10.0015 9.498V5.602C10.0015 4.994 9.5085 4.5 8.9015 4.5H5.0015C4.73589 4.5 4.48115 4.60551 4.29333 4.79333C4.10551 4.98115 4 5.23589 4 5.5015C4 5.76711 4.10551 6.02185 4.29333 6.20967C4.48115 6.39748 4.73589 6.503 5.0015 6.503H8.0015Z"
                                                fill="#626F86" />
                                            <path
                                                d="M9.4295 18.518C7.3525 17.489 6.0015 15.307 6.0015 12.87C6.0015 10.604 7.1685 8.551 9.0215 7.445C9.5015 7.159 9.6675 6.523 9.3925 6.024C9.33065 5.90677 9.24564 5.80331 9.14263 5.71991C9.03961 5.63651 8.92073 5.5749 8.79319 5.5388C8.66565 5.50271 8.53211 5.49289 8.40067 5.50994C8.26922 5.527 8.14261 5.57056 8.0285 5.638C5.5585 7.111 4.0015 9.85 4.0015 12.87C4.0015 16.118 5.8035 19.028 8.5715 20.399C9.0695 20.646 9.6665 20.425 9.9035 19.906C10.1405 19.386 9.9285 18.765 9.4295 18.518Z"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M14.0015 15.502V19.398C14.0015 20.006 14.4945 20.5 15.1015 20.5H19.0015C19.2671 20.5 19.5219 20.3945 19.7097 20.2067C19.8975 20.0188 20.003 19.7641 20.003 19.4985C20.003 19.2329 19.8975 18.9782 19.7097 18.7903C19.5219 18.6025 19.2671 18.497 19.0015 18.497H16.0015V15.502C16.0015 15.2368 15.8961 14.9824 15.7086 14.7949C15.5211 14.6074 15.2667 14.502 15.0015 14.502C14.7363 14.502 14.4819 14.6074 14.2944 14.7949C14.1069 14.9824 14.0015 15.2368 14.0015 15.502Z"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M14.0985 5.096C13.8615 5.616 14.0735 6.236 14.5725 6.483C16.6495 7.512 18.0005 9.693 18.0005 12.13C18.0005 14.396 16.8335 16.45 14.9795 17.555C14.7471 17.6988 14.5791 17.9265 14.5102 18.1909C14.4413 18.4553 14.4768 18.7361 14.6095 18.975C14.8835 19.475 15.4945 19.648 15.9735 19.362C18.4435 17.889 20.0005 15.15 20.0005 12.13C20.0005 8.882 18.1985 5.972 15.4305 4.602C15.298 4.53537 15.1518 4.50045 15.0035 4.5C14.8113 4.50188 14.6238 4.55909 14.4633 4.66479C14.3028 4.77049 14.1761 4.9202 14.0985 5.096Z"
                                                fill="#626F86" />
                                        </svg>
                                        Change Status
                                    </li>
                                    <li @click="openPrintNote(col.props.row.id); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                                                stroke="#626F86" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        Print Note
                                    </li>
                                    <li @click="openDeleteReturnModal(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M5 5.5C4.73478 5.5 4.48043 5.60536 4.29289 5.79289C4.10536 5.98043 4 6.23478 4 6.5V7.5H20V6.5C20 6.23478 19.8946 5.98043 19.7071 5.79289C19.5196 5.60536 19.2652 5.5 19 5.5H5ZM16.15 20.5H7.845C7.60844 20.4999 7.37956 20.416 7.19904 20.2631C7.01851 20.1102 6.89803 19.8983 6.859 19.665L5 8.5H19L17.136 19.666C17.0969 19.8992 16.9764 20.111 16.7959 20.2637C16.6153 20.4165 16.3865 20.5002 16.15 20.5ZM9 5C8.99998 4.86894 9.05142 4.7431 9.14325 4.64959C9.23508 4.55608 9.35996 4.50236 9.491 4.5H14.509C14.64 4.50236 14.7649 4.55608 14.8567 4.64959C14.9486 4.7431 15 4.86894 15 5V5.5H9V5Z"
                                                fill="#626F86" />
                                        </svg>

                                        Delete
                                    </li>
                                </template>
                            </TableActionDropdown>
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'total_amount'">
                            {{ "₦" + getTotalAmount(col.props.row.items) }}
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'items'">
                            <Tooltip :text="col.props.formattedRow[col.props.column.field]">
                                {{ truncateText(col.props.formattedRow[col.props.column.field], 70) }}
                            </Tooltip>
                        </span>
                        <span class="text-xs" v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </Datatable>
            </div>
            <div class="" v-if="activeTab === 'Approved'">
                <Datatable :url="approved_url" :filterByDate="true" :columns="approvedColumns" :key="childKey"
                    pageName="ApprovedProductReturns">
                    <template #column="col">
                        <span v-if="col.props.column.field == 'actions'">
                            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                                <template #default="{ selectedItem, closeDropdown }">
                                    <li @click="viewProductReturn(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                                fill="#626F86" />
                                        </svg>
                                        View Products
                                    </li>
                                    <li @click="openPrintNote(col.props.row.id); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                                                stroke="#626F86" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        Print Note
                                    </li>
                                </template>
                            </TableActionDropdown>
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'total_amount'">
                            {{ "₦" + getTotalAmount(col.props.row.items) }}
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'items'">
                            <Tooltip :text="col.props.formattedRow[col.props.column.field]">
                                {{ truncateText(col.props.formattedRow[col.props.column.field], 70) }}
                            </Tooltip>
                        </span>
                        <span class="text-xs whitespace-nowrap transit_data"
                            v-else-if="col.props.column.field == 'transit_status_text'">
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                        <span v-else-if="col.props.column.field === 'driver.name'">
                            <span class="text-red-800" v-if="!col.props.row.driver_id">Unassigned</span>
                            <span v-else class="flex items-center">
                                <img v-if="col.props.row.driver_id && col.props.row.driver && col.props.row.driver.picture_url"
                                    :src="col.props.row.driver.picture_url" alt="" width="24" height="24"
                                    class="mr-2" />
                                <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                    <defs>
                                        <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox"
                                            width="1" height="1">
                                            <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                        </pattern>
                                        <image id="image0_8145_14006" width="128" height="128"
                                            preserveAspectRatio="none"
                                            xlink:href="data:image/png;base64,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" />
                                    </defs>
                                </svg>
                                <span class="ml-2 whitespace-nowrap">{{ col.props.row.driver.name }}</span>
                            </span>
                        </span>
                        <span class="text-xs" v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </Datatable>
            </div>
            <div class="" v-if="activeTab === 'At Warehouse'">
                <Datatable :url="at_warehouse_url" :filterByDate="true" :columns="atWarehouseColumns" :key="childKey"
                    pageName="AtWarehouseProductReturns">
                    <template #column="col">
                        <span v-if="col.props.column.field == 'actions'">
                            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                                <template #default="{ selectedItem, closeDropdown }">
                                    <li @click="viewProductReturn(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                                fill="#626F86" />
                                        </svg>
                                        View Products
                                    </li>
                                    <li @click="openConfirmProductReturnAsReturnedModal(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.35496 11.4419C7.30863 11.3942 7.25321 11.3563 7.19198 11.3304C7.13074 11.3045 7.06494 11.2912 6.99846 11.2912C6.93197 11.2912 6.86617 11.3045 6.80493 11.3304C6.7437 11.3563 6.68828 11.3942 6.64196 11.4419L5.94196 12.1429C5.89501 12.1893 5.85769 12.2444 5.83212 12.3052C5.80656 12.3661 5.79325 12.4313 5.79297 12.4973C5.79269 12.5633 5.80545 12.6286 5.8305 12.6897C5.85555 12.7507 5.89241 12.8062 5.93896 12.8529L9.64496 16.5599C9.73837 16.6532 9.86482 16.7058 9.99684 16.7064C10.1289 16.707 10.2558 16.6554 10.35 16.5629L18.062 8.85091C18.109 8.80455 18.1462 8.74922 18.1715 8.68819C18.1967 8.62716 18.2094 8.56168 18.2088 8.49565C18.2083 8.42961 18.1945 8.36436 18.1682 8.30376C18.1419 8.24317 18.1038 8.18847 18.056 8.14292L17.356 7.44291C17.3091 7.39593 17.2535 7.35865 17.1922 7.33321C17.131 7.30777 17.0653 7.29468 16.999 7.29468C16.9326 7.29468 16.8669 7.30777 16.8057 7.33321C16.7444 7.35865 16.6888 7.39593 16.642 7.44291L10.356 13.7289C10.2612 13.823 10.133 13.8758 9.99945 13.8758C9.86589 13.8758 9.73774 13.823 9.64296 13.7289L7.35496 11.4419Z"
                                                fill="#626F86" />
                                        </svg>

                                        Confirm as Returned
                                    </li>
                                    <li @click="openPrintNote(col.props.row.id); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                                                stroke="#626F86" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        Print Note
                                    </li>
                                </template>
                            </TableActionDropdown>
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'total_amount'">
                            {{ "₦" + getTotalAmount(col.props.row.items) }}
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'items'">
                            <Tooltip :text="col.props.formattedRow[col.props.column.field]">
                                {{ truncateText(col.props.formattedRow[col.props.column.field], 70) }}
                            </Tooltip>
                        </span>
                        <span class="text-xs whitespace-nowrap transit_data"
                            v-else-if="col.props.column.field == 'transit_status_text'">
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                        <span v-else-if="col.props.column.field === 'driver.name'">
                            <span class="text-red-800" v-if="!col.props.row.driver_id">Unassigned</span>
                            <span v-else class="flex items-center">
                                <img v-if="col.props.row.driver_id && col.props.row.driver && col.props.row.driver.picture_url"
                                    :src="col.props.row.driver.picture_url" alt="" width="24" height="24"
                                    class="mr-2" />
                                <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                    <defs>
                                        <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox"
                                            width="1" height="1">
                                            <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                        </pattern>
                                        <image id="image0_8145_14006" width="128" height="128"
                                            preserveAspectRatio="none"
                                            xlink:href="data:image/png;base64,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" />
                                    </defs>
                                </svg>
                                <span class="ml-2 whitespace-nowrap">{{ col.props.row.driver.name }}</span>
                            </span>
                        </span>
                        <span class="text-xs" v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </Datatable>
            </div>
            <div class="" v-if="activeTab === 'Returned'">
                <Datatable :url="returned_url" :filterByDate="true" :columns="approvedColumns" :key="childKey"
                    pageName="ReturnedProductReturns">
                    <template #column="col">
                        <span v-if="col.props.column.field == 'actions'">
                            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                                <template #default="{ selectedItem, closeDropdown }">
                                    <li @click="viewProductReturn(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                                fill="#626F86" />
                                        </svg>
                                        View Products
                                    </li>
                                    <li @click="openPrintNote(col.props.row.id); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                                                stroke="#626F86" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        Print Note
                                    </li>
                                </template>
                            </TableActionDropdown>
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'total_amount'">
                            {{ "₦" + getTotalAmount(col.props.row.items) }}
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'items'">
                            <Tooltip :text="col.props.formattedRow[col.props.column.field]">
                                {{ truncateText(col.props.formattedRow[col.props.column.field], 70) }}
                            </Tooltip>
                        </span>
                        <span class="text-xs whitespace-nowrap transit_data"
                            v-else-if="col.props.column.field == 'transit_status_text'">
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                        <span v-else-if="col.props.column.field === 'driver.name'">
                            <span class="text-red-800" v-if="!col.props.row.driver_id">Unassigned</span>
                            <span v-else class="flex items-center">
                                <img v-if="col.props.row.driver_id && col.props.row.driver && col.props.row.driver.picture_url"
                                    :src="col.props.row.driver.picture_url" alt="" width="24" height="24"
                                    class="mr-2" />
                                <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                    <defs>
                                        <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox"
                                            width="1" height="1">
                                            <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                        </pattern>
                                        <image id="image0_8145_14006" width="128" height="128"
                                            preserveAspectRatio="none"
                                            xlink:href="data:image/png;base64,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" />
                                    </defs>
                                </svg>
                                <span class="ml-2 whitespace-nowrap">{{ col.props.row.driver.name }}</span>
                            </span>
                        </span>
                        <span class="text-xs" v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </Datatable>
            </div>
            <div class="" v-if="activeTab === 'Rejected'">
                <Datatable :url="rejected_url" :filterByDate="true" :columns="cancelledColumns" :key="childKey"
                    pageName="RejectedProductReturns">
                    <template #column="col">
                        <span v-if="col.props.column.field == 'actions'">
                            <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                                <template #default="{ selectedItem, closeDropdown }">
                                    <li @click="viewProductReturn(col.props.row); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4"
                                                fill="#626F86" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z"
                                                fill="#626F86" />
                                        </svg>
                                        View Products
                                    </li>
                                    <li @click="openPrintNote(col.props.row.id); closeDropdown();"
                                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 medium-text">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 8V6.56C16.8 5.66392 16.8 5.21587 16.6256 4.87362C16.4722 4.57256 16.2274 4.32779 15.9264 4.17439C15.5841 4 15.1361 4 14.24 4H9.76C8.86392 4 8.41587 4 8.07362 4.17439C7.77256 4.32779 7.52779 4.57256 7.37439 4.87362C7.2 5.21587 7.2 5.66392 7.2 6.56V8M7.2 16.8C6.45602 16.8 6.08403 16.8 5.77883 16.7182C4.95061 16.4963 4.3037 15.8494 4.08178 15.0212C4 14.716 4 14.344 4 13.6V11.84C4 10.4959 4 9.82381 4.26158 9.31042C4.49168 8.85883 4.85883 8.49168 5.31042 8.26158C5.82381 8 6.49587 8 7.84 8H16.16C17.5041 8 18.1762 8 18.6896 8.26158C19.1412 8.49168 19.5083 8.85883 19.7384 9.31042C20 9.82381 20 10.4959 20 11.84V13.6C20 14.344 20 14.716 19.9182 15.0212C19.6963 15.8494 19.0494 16.4963 18.2212 16.7182C17.916 16.8 17.544 16.8 16.8 16.8M14.4 10.8H16.8M9.76 20H14.24C15.1361 20 15.5841 20 15.9264 19.8256C16.2274 19.6722 16.4722 19.4274 16.6256 19.1264C16.8 18.7841 16.8 18.3361 16.8 17.44V16.16C16.8 15.2639 16.8 14.8159 16.6256 14.4736C16.4722 14.1726 16.2274 13.9278 15.9264 13.7744C15.5841 13.6 15.1361 13.6 14.24 13.6H9.76C8.86392 13.6 8.41587 13.6 8.07362 13.7744C7.77256 13.9278 7.52779 14.1726 7.37439 14.4736C7.2 14.8159 7.2 15.2639 7.2 16.16V17.44C7.2 18.3361 7.2 18.7841 7.37439 19.1264C7.52779 19.4274 7.77256 19.6722 8.07362 19.8256C8.41587 20 8.86392 20 9.76 20Z"
                                                stroke="#626F86" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        Print Note
                                    </li>
                                </template>
                            </TableActionDropdown>
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'total_amount'">
                            {{ "₦" + getTotalAmount(col.props.row.items) }}
                        </span>
                        <span class="text-xs" v-else-if="col.props.column.field == 'items'">
                            <Tooltip :text="col.props.formattedRow[col.props.column.field]">
                                {{ truncateText(col.props.formattedRow[col.props.column.field], 70) }}
                            </Tooltip>
                        </span>
                        <span class="text-xs whitespace-nowrap transit_data"
                            v-else-if="col.props.column.field == 'transit_status_text'">
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                        <span class="text-xs" v-else>
                            {{ col.props.formattedRow[col.props.column.field] }}
                        </span>
                    </template>
                </Datatable>
            </div>
        </div>

        <!-- view product returns modal -->
        <SideBarModal title="Product Return Details" :is-open="isViewProductReturnDetailModalOpen" width="xl"
            @update:is-open="isViewProductReturnDetailModalOpen = $event" :initial-form-data="productReturnFromData"
            @close="isViewProductReturnDetailModalOpen = false" :extra-header="getModalExtraHeader">

            <!-- Main content -->
            <template #default>
                <div class="space-y-6">

                    <!-- Tab Navigation -->
                    <div class="mb-6 border-b border-gray-200">
                        <div class="flex gap-x-2">
                            <button v-for="view_tab in viewReturnTabs" :key="view_tab" @click="activeViewTab = view_tab"
                                :class="[
                                    'px-1 py-3 -mb-px text-sm font-medium border-b-2 transition-colors tab_text',
                                    activeViewTab === view_tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                ]">
                                {{ view_tab }}
                            </button>
                        </div>
                    </div>

                    <!-- Order Details Content -->
                    <div v-if="activeViewTab === 'Details'" class="space-y-6">
                        <!-- Order Information Grid -->

                        <div class="space-y-4">

                            <div class="flex items-center justify-between">
                                <span class="key">REF</span>
                                <span class="value">{{ productReturnFromData.order_group.ref_no }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Warehouse</span>
                                <span class="value">{{ productReturnFromData.warehouse?.name ?? 'N/A' }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Transit Status</span>
                                <span class="p-1 text-xs font-medium bg-gray-200 rounded value">{{
                                    productReturnFromData.transit_status_text }}</span>
                            </div>
                            <div class="flex items-center justify-between"
                                v-if="productReturnFromData.rejection_reason">
                                <span class="key">Reason For Rejection</span>
                                <span class="value">{{ productReturnFromData.rejection_reason }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Customer's Name</span>
                                <span class="value">{{ productReturnFromData.user.name }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Customer Type</span>
                                <span class="value">{{ productReturnFromData.user.user_type }}</span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="key">Phone</span>
                                <div class="flex items-center space-x-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z"
                                            fill="#091E42" fill-opacity="0.31" />
                                    </svg>

                                    <span class="value">{{ productReturnFromData.user.phone }}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Store Name</span>
                                <div class="flex items-center space-x-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z"
                                            fill="#091E42" fill-opacity="0.31" />
                                    </svg>

                                    <span class="value">{{ productReturnFromData.store.name }}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Reason</span>
                                <span class="value">{{ productReturnFromData.reason }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="key">Date</span>
                                <div class="flex items-center space-x-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.1625 4.16667H15.8375C16.7558 4.16667 17.5 4.9125 17.5 5.82833V15.8383C17.5 16.0566 17.457 16.2728 17.3734 16.4744C17.2899 16.6761 17.1674 16.8593 17.013 17.0136C16.8586 17.1679 16.6753 17.2903 16.4736 17.3738C16.2719 17.4572 16.0558 17.5001 15.8375 17.5H4.1625C3.72172 17.5 3.29898 17.325 2.98723 17.0134C2.67547 16.7018 2.50022 16.2791 2.5 15.8383V5.82833C2.5 4.91083 3.24333 4.16667 4.1625 4.16667ZM4.16667 7.5V15C4.16667 15.221 4.25446 15.433 4.41074 15.5893C4.56702 15.7455 4.77899 15.8333 5 15.8333H15C15.221 15.8333 15.433 15.7455 15.5893 15.5893C15.7455 15.433 15.8333 15.221 15.8333 15V7.5H4.16667ZM5 3.33333C5 3.11232 5.0878 2.90036 5.24408 2.74408C5.40036 2.5878 5.61232 2.5 5.83333 2.5C6.05435 2.5 6.26631 2.5878 6.42259 2.74408C6.57887 2.90036 6.66667 3.11232 6.66667 3.33333V4.16667H5V3.33333ZM13.3333 3.33333C13.3333 3.11232 13.4211 2.90036 13.5774 2.74408C13.7337 2.5878 13.9457 2.5 14.1667 2.5C14.3877 2.5 14.5996 2.5878 14.7559 2.74408C14.9122 2.90036 15 3.11232 15 3.33333V4.16667H13.3333V3.33333ZM5.83333 10.8333V9.16583H7.5V10.8333H5.83333ZM12.5 10.8333V9.16583H14.1667V10.8333H12.5ZM9.16667 10.8333V9.16583H10.8342V10.8333H9.16667ZM5.83333 14.1667V12.5H7.5V14.1667H5.83333ZM9.16667 14.1667V12.5H10.8342V14.1667H9.16667ZM12.5 14.1667V12.5H14.1667V14.1667H12.5Z"
                                            fill="#091E42" fill-opacity="0.31" />
                                    </svg>

                                    <span class="value">{{ getDateTime(productReturnFromData.created_at) }}</span>
                                </div>
                            </div>

                        </div>
                        <hr>
                        <!-- Order Summary -->
                        <div class="mt-8">
                            <h3 class="mb-4 text-lg font-medium text-gray-900">Order Summary</h3>

                            <!-- Table -->
                            <div class="overflow-x-auto">
                                <table class="w-full border-separate order_summary" style="border-spacing: 0">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="text-left">
                                                Product
                                            </th>
                                            <th class="text-left ">
                                                Description
                                            </th>
                                            <th class="text-left ">
                                                Quantity Returned</th>
                                            <th class="text-left ">
                                                Unit Price</th>
                                            <th class="text-left">
                                                Price Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in productReturnFromData.items" :key="index"
                                            class="hover:bg-gray-50"
                                            :class="{ 'bg-green-200': item.order.product.cash_and_carry, 'item': !item.order.product.cash_and_carry }">
                                            <td class="">
                                                <div v-if="item.order.product != null">
                                                    <p class="mb-0 ">{{ item.order.product.name }}
                                                        <span v-if="item.order.deal_id != null"
                                                            class="px-1 ml-1 uppercase border rounded border-secondary-light bg-secondary-light">Deal</span>
                                                        <span v-if="item.order.product.is_controlled"
                                                            class="px-1 ml-1 uppercase bg-blue-600 border border-blue-600 rounded">Controlled</span>
                                                    </p>
                                                    <p class="mb-0 ">
                                                        ({{
                                                            categories.find(category => category.id ==
                                                                item.order.product.category_id) ?
                                                                categories.find(category => category.id ==
                                                                    item.order.product.category_id).display_name
                                                                : 'N/A'
                                                        }})
                                                    </p>
                                                    <p v-if="hasImages(item)" class="my-3">
                                                        <button type="button" @click="openLightbox(item)"
                                                            class="p-2 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
                                                            view images
                                                        </button>
                                                    </p>
                                                </div>
                                                <div v-else>
                                                    <p class="mb-0 ">Deleted Product
                                                        <span v-if="item.order.deal_id != null"
                                                            class="px-1 ml-1 uppercase border rounded border-secondary-light bg-secondary-light">Deal</span>
                                                    </p>
                                                    <p v-if="hasImages(item)" class="my-3">
                                                        <button type="button" @click="openLightbox(item)"
                                                            class="p-2 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">view
                                                            images</button>
                                                    </p>
                                                </div>
                                            </td>
                                            <td class="">
                                                {{ item.reason ?? 'N/A' }}
                                            </td>
                                            <td class="">
                                                <div class="grid grid-cols-2 gap-x-3"
                                                    v-for="subp, index in getSubProducts(item)"
                                                    :key="'return_item_batch_' + index">
                                                    <span>{{ subp.batch_no }}</span>
                                                    <span>(x{{ subp.quantity }})</span>
                                                </div>
                                            </td>
                                            <td class="">₦{{ toLocale(item.order.price_on_purchase) }}</td>
                                            <td class="">₦{{ toLocale(getTotalItemAmount(item)) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Total -->
                            <div class="flex items-center justify-between px-6 mt-4 order_total">
                                <span class="">Total</span>
                                <span class="">₦{{
                                    toLocale(getTotalAmount(productReturnFromData.items)) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Activities Tab -->
                    <div v-else-if="activeViewTab === 'Activities'" class="space-y-6">
                        <h3 class="text-xs font-medium text-gray-500">Recent</h3>

                        <div class="space-y-4">
                            <div v-for="(activity, index) in productReturnFromData.logs" :key="index"
                                class="flex items-center mb-8 space-x-3">
                                <!-- Activity Icon -->
                                <div
                                    class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
                                            fill="#0C66E4" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12.6667 11.3333V8.66667C12.6667 8.48986 12.5964 8.32029 12.4714 8.19526C12.3464 8.07024 12.1768 8 12 8C11.8232 8 11.6536 8.07024 11.5286 8.19526C11.4036 8.32029 11.3333 8.48986 11.3333 8.66667V11.3333H8.66667C8.48986 11.3333 8.32029 11.4036 8.19526 11.5286C8.07024 11.6536 8 11.8232 8 12C8 12.1768 8.07024 12.3464 8.19526 12.4714C8.32029 12.5964 8.48986 12.6667 8.66667 12.6667H11.3333V15.3333C11.3333 15.5101 11.4036 15.6797 11.5286 15.8047C11.6536 15.9298 11.8232 16 12 16C12.1768 16 12.3464 15.9298 12.4714 15.8047C12.5964 15.6797 12.6667 15.5101 12.6667 15.3333V12.6667H15.3333C15.5101 12.6667 15.6797 12.5964 15.8047 12.4714C15.9298 12.3464 16 12.1768 16 12C16 11.8232 15.9298 11.6536 15.8047 11.5286C15.6797 11.4036 15.5101 11.3333 15.3333 11.3333H12.6667Z"
                                            fill="white" />
                                    </svg>

                                    <!-- <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg> -->
                                </div>

                                <!-- Activity Content -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <h4 class="text-sm font-semibold text-gray-900">{{ activity.action }}</h4>
                                            <p class="mt-1 text-xs text-gray-400">
                                                REF: {{ productReturnFromData.order_group.ref_no }} has {{
                                                    activity.action }} by
                                                <a v-if="activity.user" href="#"
                                                    class="text-blue-600 capitalize hover:text-blue-800">@{{
                                                        activity.user.name }}</a>
                                            </p>
                                        </div>
                                        <span class="text-xs text-gray-500 whitespace-nowrap">{{
                                            dayjs(activity.created_at).format('LLL') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData, showDiscardWarning, triggerDiscardWarning }">
                <div class="flex justify-end space-x-3">
                    <button @click="closeModal" type="button" class="approve_btn">
                        Close
                    </button>
                </div>
            </template>
        </SideBarModal>



        <!-- download product return date filter Modal -->
        <UniversalCenteredModal :show="isProductReturnDownloadDateFilterModalOpen"
            @close="isProductReturnDownloadDateFilterModalOpen = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <h3>Download Date Filter</h3>
                </span>
            </template>

            <template #body>
                <div class="grid items-baseline gap-3 grid-col-2">
                    <div>
                        <label class="block mb-1 text-xs font-medium text-gray-700">From</label>
                        <input type="date" v-model="downloadDateFilter.from_date"
                            class="w-full px-3 py-2 text-xs border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label class="block mb-1 text-xs font-medium text-gray-700">To</label>
                        <input type="date" v-model="downloadDateFilter.to_date"
                            class="w-full px-3 py-2 text-xs border border-gray-300 rounded-md" />
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-between space-x-3 discard_merge_alert_footer">
                    <button type="button" class="cancel_btn" @click="resetDownloadDateFilter">
                        Reset
                    </button>
                    <button @click="downloadReturns" type="button" class="text-white approve_btn">
                        Apply
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- change product return status Modal -->
        <UniversalCenteredModal :show="isProductReturnStatusUpdateModalOpen"
            @close="isProductReturnStatusUpdateModalOpen = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <h3>Update Product Return Status</h3>
                </span>
            </template>

            <template #body>
                <div class="mb-3">
                    <label class="block mb-1 text-xs font-medium text-gray-700">Status</label>
                    <select v-model="status" class="w-full return_status_option_dropdown" required>
                        <option disabled value="">Select Status</option>
                        <option v-for="option_status, index in statuses" :key="'option_status_' + index"
                            :value="option_status.value">
                            {{ option_status.name }}
                        </option>
                    </select>
                </div>
                <div v-if="(Number(status) == statuses.find(status => status.name == 'Approved')?.value)"
                    class="flex items-center gap-2">
                    <input type="checkbox" name="" id="confirm_as_returned" v-model="confirm_as_returned"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none">
                    <label class="block mb-0 text-xs font-medium text-gray-700" for="confirm_as_returned">Confirm as
                        returned</label>
                </div>
                <div v-if="(Number(status) == statuses.find(status => status.name == 'Approved')?.value) && confirm_as_returned"
                    class="my-3">
                    <label class="block mb-1 text-xs font-medium text-gray-700">Reason for confirming as
                        returned</label>
                    <textarea v-model="note"
                        class="w-full px-3 py-2 text-xs border border-gray-300 rounded-md resize-none"
                        placeholder="Enter reason for confirming this product return and returned"></textarea>

                </div>
                <!-- <div class="mb-3" v-if="(Number(status) == statuses.find(status => status.name == 'Approved')?.value)">
                    <label class="block mb-1 text-xs font-medium text-gray-700">Select Driver</label>
                    <v-select v-model="driver_id" :options="drivers" class="text-xs" :reduce="driver => driver.id"
                        label="name"></v-select>
                </div> -->
                <div v-if="(Number(status) == statuses.find(status => status.name == 'Rejected')?.value)">
                    <label class="block mb-1 text-xs font-medium text-gray-700">Reason</label>
                    <textarea v-model="rejection_reason"
                        class="w-full px-3 py-2 text-xs border border-gray-300 rounded-md resize-none"></textarea>

                </div>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="updateProductReturnStatus" type="button" class="text-white approve_btn">
                        Update
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- confirm products return as returned warning Modal -->
        <UniversalCenteredModal :show="showConfirmAsReturnedWarningModal"
            @close="showConfirmAsReturnedWarningModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.0606 4.96711C11.5766 3.99311 12.4186 3.98911 12.9366 4.96711L20.0606 18.4251C20.5766 19.3991 20.1056 20.1961 19.0036 20.1961H4.99361C3.89161 20.1961 3.41861 19.4031 3.93661 18.4251L11.0606 4.96711ZM11.2915 14.7072C11.479 14.8947 11.7334 15.0001 11.9986 15.0001C12.2638 15.0001 12.5182 14.8947 12.7057 14.7072C12.8933 14.5197 12.9986 14.2653 12.9986 14.0001V9.00011C12.9986 8.73489 12.8933 8.48054 12.7057 8.293C12.5182 8.10546 12.2638 8.00011 11.9986 8.00011C11.7334 8.00011 11.479 8.10546 11.2915 8.293C11.104 8.48054 10.9986 8.73489 10.9986 9.00011V14.0001C10.9986 14.2653 11.104 14.5197 11.2915 14.7072ZM11.2915 17.7072C11.479 17.8948 11.7334 18.0001 11.9986 18.0001C12.2638 18.0001 12.5182 17.8948 12.7057 17.7072C12.8933 17.5197 12.9986 17.2653 12.9986 17.0001C12.9986 16.7349 12.8933 16.4805 12.7057 16.293C12.5182 16.1055 12.2638 16.0001 11.9986 16.0001C11.7334 16.0001 11.479 16.1055 11.2915 16.293C11.104 16.4805 10.9986 16.7349 10.9986 17.0001C10.9986 17.2653 11.104 17.5197 11.2915 17.7072Z"
                            fill="#E56910" />
                    </svg>


                    <h3>Confirm Product Return?</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to confirm this product return <strong>“{{ productReturnFromData.order_group.ref_no
                    }}”</strong> as returned and add items back to inventory. This will take effect immediately.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showConfirmAsReturnedWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="confirmAsReturned" type="button" class="discard_btn">
                        Confirm Product Return
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- delete products return warning Modal -->
        <UniversalCenteredModal :show="showDeleteProductReturnWarningModal"
            @close="showDeleteProductReturnWarningModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                            fill="#C9372C" />
                    </svg>

                    <h3>Discard Changes?</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to delete this product return <strong>“{{ productReturnFromData.order_group.ref_no
                    }}”</strong>. This action will permanently remove it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDeleteProductReturnWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteReturn" type="button" class="delete_btn">
                        Delete Product Return
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- delete products return success Modal -->
        <UniversalCenteredModal :show="showDeleteProductReturnSuccessModal"
            @close="showDeleteProductReturnSuccessModal = false">

            <template #body>
                <div class="flex justify-center my-4">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
                            fill="#22A06B" />
                        <path
                            d="M18.7867 28.5635C18.4707 28.2275 18.0349 28.0298 17.5739 28.0134C17.113 27.997 16.6642 28.1632 16.3252 28.476C15.9861 28.7887 15.7843 29.2226 15.7635 29.6834C15.7427 30.1442 15.9047 30.5945 16.2142 30.9365L22.5352 37.7947C23.4749 38.7152 24.8749 38.7152 25.7447 37.8472L26.3817 37.219C28.6821 34.9566 30.9798 32.6915 33.2749 30.4237L33.3449 30.3537C35.4899 28.2399 37.6237 26.1147 39.7464 23.9785C40.0637 23.6463 40.2376 23.2028 40.2307 22.7435C40.2238 22.2842 40.0366 21.8461 39.7096 21.5236C39.3825 21.2011 38.9417 21.0202 38.4824 21.0198C38.0231 21.0194 37.582 21.1996 37.2544 21.5215C35.1416 23.6466 33.0182 25.7612 30.8844 27.8652L30.8144 27.9352C28.6151 30.1093 26.413 32.2804 24.2082 34.4487L18.7867 28.5635Z"
                            fill="white" />
                    </svg>
                </div>
                <p class="text-center discard_merge_alert_body_text">
                    The product return <strong>“{{ productReturnFromData.order_group.ref_no }}”</strong> has been
                    successfully deleted from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDeleteProductReturnSuccessModal = false" type="button" class="approve_btn">
                        Done
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- view images modal -->
        <div class="lightbox" v-if="isLightboxOpen" @click="closeLightbox">
            <span class="close" @click.stop="closeLightbox">&times;</span>
            <img class="lightbox-content" :src="currentImage" />
            <button class="prev" @click.stop="prevImage">❮</button>
            <button class="next" @click.stop="nextImage">❯</button>
        </div>

        <!-- create product return modal -->
        <Create :isOpen="isCreateProductReturnModalOpen" @created="childKey++"
            @close="isCreateProductReturnModalOpen = false" @discarded="isCreateProductReturnModalOpen = false" />

        <!-- view product return print note -->
        <PrintNote :productReturnId="printNoteProductReturnId" @printNoteClosed="printNoteProductReturnId = 0" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Tabs from "@/views/Components/Tabs.vue";
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { useRoute } from 'vue-router'
import axios from 'axios';
import dayjs from 'dayjs';
import { toLocale } from '@/views/helpers/useLocale.js';
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import SideBarModal from '@/views/Components/SideBarModal.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import { TableColumn } from '@/types';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import Create from './Create.vue';
import Tooltip from '@/views/Components/procurement/ui/Tooltip.vue';
import PrintNote from './PrintNote.vue';


onMounted(() => {
    activeTab.value = localStorage.getItem('product_returns_tab') ?? 'New';
    getTabCount();
    getDownLoadUrl();
    getCategories();
    getDrivers();
    dayjs.extend(LocalizedFormat);
})

const isCreateProductReturnModalOpen = ref(false)
const isLightboxOpen = ref(false);
const toastMessage = ref('');
const showToast = ref(false);
const showDeleteProductReturnWarningModal = ref(false);
const showDeleteProductReturnSuccessModal = ref(false);
const authStore = useAuthStore();
const activeTab = ref('');
const toast = useToast();
const download_url = ref('');
const printNoteProductReturnId = ref(0);
const tabs = ref([]);
const downloadDateFilter = ref({
    from_date: '',
    to_date: ''
})
const childKey = ref(111);
const title = ref('Products Movement / Product Returns');
const route = useRoute();
const loading = ref(false);
const isViewProductReturnDetailModalOpen = ref(false);
const isProductReturnDownloadDateFilterModalOpen = ref(false);
const showConfirmAsReturnedWarningModal = ref(false);
const isProductReturnStatusUpdateModalOpen = ref(false);
const getTabs = computed(() => tabs.value);
const viewReturnTabs = ['Details', 'Activities'];
const activeViewTab = ref('Details');
const pending_url = computed(() => import.meta.env.VITE_API_URL + 'product_returns?status=0');
const approved_url = computed(() => import.meta.env.VITE_API_URL + 'product_returns?status=1');
const at_warehouse_url = computed(() => import.meta.env.VITE_API_URL + 'product_returns?status=-2');
const returned_url = computed(() => import.meta.env.VITE_API_URL + 'product_returns?status=-1');
const rejected_url = computed(() => import.meta.env.VITE_API_URL + 'product_returns?status=2');

const productReturnFromData = ref({
    items: [],
    driver: {},
    logs: [],
    order_group: {
        ref_no: ''
    },
    store: {
        name: ''
    },
    user: {
        name: '',
        user_type: '',
        phone: '',
        email: ''
    },
    status_text: '',
    status: -1,
    transit_status: -1,
    transit_status_text: '',
    return_to_stock: 0,
    warehouse: {
        name: ''
    },
    reason: '',
    rejection_reason: '',
    created_at: ''
});

const statuses = ref([
    {
        name: 'Approved',
        value: 1
    },
    {
        name: 'Rejected',
        value: 2
    },
]);
const status = ref('');
const confirm_as_returned = ref(false);
const note = ref('');
const driver_id = ref('');
const rejection_reason = ref('');
const drivers = ref([]);

const getPageTitle = computed(() => {
    return `${title.value} / ${activeTab.value}`;
});

const currentImageIndex = ref(0);

const newColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Order No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Warehouse',
        field: 'warehouse.name',
        sortable: false,
    },
    {
        label: 'Customer Name',
        field: 'user.name',
        sortable: false,
    },
    {
        label: 'Store Name',
        field: 'store.name',
        sortable: false,
    },
    {
        label: 'Reason',
        field: 'reason',
        sortable: false,
    },
    {
        label: 'Items',
        field: 'items',
        sortable: false,
        format: (value) => getItems(value)
    },
    {
        label: 'Total Amount',
        field: 'total_amount',
        sortable: false,
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false,
    },
])

const cancelledColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Order No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Warehouse',
        field: 'warehouse.name',
        sortable: false,
    },
    {
        label: 'Customer Name',
        field: 'user.name',
        sortable: false,
    },
    {
        label: 'Store Name',
        field: 'store.name',
        sortable: false,
    },
    {
        label: 'Reason',
        field: 'reason',
        sortable: false,
    },
    {
        label: 'Rejection Reason',
        field: 'rejection_reason',
        sortable: false,
    },
    {
        label: 'Items',
        field: 'items',
        sortable: false,
        format: (value) => getItems(value)
    },
    {
        label: 'Total Amount',
        field: 'total_amount',
        sortable: false,
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false,
    },
]);

const approvedColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Order No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Warehouse',
        field: 'warehouse.name',
        sortable: false,
    },
    // {
    //     label: 'Returned To Inventory',
    //     field: 'return_to_stock',
    //     sortable: true,
    // },
    {
        label: 'Customer Name',
        field: 'user.name',
        sortable: false,
    },
    {
        label: 'Store Name',
        field: 'store.name',
        sortable: false,
    },
    {
        label: 'Driver',
        field: 'driver.name',
        sortable: true,
    },
    {
        label: 'Transit Status',
        field: 'transit_status_text',
        sortable: false,
    },
    {
        label: 'Reason',
        field: 'reason',
        sortable: false,
    },
    {
        label: 'Items',
        field: 'items',
        sortable: false,
        format: (value) => getItems(value)
    },
    {
        label: 'Total Amount',
        field: 'total_amount',
        sortable: false,
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false,
    },
]);

const atWarehouseColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Order No.',
        field: 'order_group.ref_no',
        sortable: false,
    },
    {
        label: 'Warehouse',
        field: 'warehouse.name',
        sortable: false,
    },
    // {
    //     label: 'Returned To Inventory',
    //     field: 'return_to_stock',
    //     sortable: true,
    // },
    {
        label: 'Customer Name',
        field: 'user.name',
        sortable: false,
    },
    {
        label: 'Store Name',
        field: 'store.name',
        sortable: false,
    },
    {
        label: 'Driver',
        field: 'driver.name',
        sortable: true,
    },
    {
        label: 'Reason',
        field: 'reason',
        sortable: false,
    },
    {
        label: 'Items',
        field: 'items',
        sortable: false,
        format: (value) => getItems(value)
    },
    {
        label: 'Total Amount',
        field: 'total_amount',
        sortable: false,
    },
    {
        label: 'Date Created',
        field: 'created_at',
        sortable: true,
        format: (value) => dayjs(value).format('DD/MM/YYYY')
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false,
    },
]);

const images = ref([]);
const categories = ref([]);
const getDateTime = computed(() => {
    return (date) => {
        return date ? dayjs(date).format('LLL') : date;
    }
});

const currentImage = computed(() => images.value[currentImageIndex.value]);
const hasLogs = computed(() => productReturnFromData.value.logs.length > 0);
const hasImages = computed(() => {
    return (item) => {
        return item && item.images && item.images.length > 0;
    }
})

const sortedProductReturnItems = computed(() => {
    if (productReturnFromData.value.items == undefined) return [];
    try {
        return productReturnFromData.value.items.sort((a, b) => {
            if (a.order.product == null) return 0;
            if (b.order.product == null) return -1;
            return (a.order.product.name > b.order.product.name) ? 1 : ((b.order.product.name > a.order.product.name) ? -1 : 0);
        });
    } catch (error) {
        return productReturnFromData.value.items;
    }
});
const getStatusClass = computed(() => productReturnFromData.value.status_text + '_status text-xs capitalize')
const getTransitStatusClass = computed(() => productReturnFromData.value.transit_status_text && productReturnFromData.value.transit_status_text != 'N/A' ? productReturnFromData.value.transit_status_text.split(' ')[0] + '_status text-xs' : 'unknown text-xs')

const getSubProducts = computed(() => {
    return (item) => {
        let subproducts = [];
        if (item.sub_product_id && item.quantity) {
            subproducts.push({
                batch_no: item.subproduct.batch_no,
                quantity: item.quantity
            });
        }
        item.subproducts.forEach(function (sub) {
            subproducts.push({
                batch_no: sub.batch_no,
                quantity: sub.pivot.quantity
            });
        });
        return subproducts;
    }
});

const getModalExtraHeader = computed(() => {
    return `<span class="flex items-center gap-x-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="3.75" fill="#F7F8F9" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.91786 5.83325C7.45578 5.83325 7.08203 6.20492 7.08203 6.66242V13.3374C7.08346 13.558 7.1722 13.7691 7.32883 13.9245C7.48546 14.0799 7.69724 14.1669 7.91786 14.1666H12.0795C12.5416 14.1666 12.9154 13.7953 12.9154 13.3374V6.66242C12.9154 6.20742 12.5412 5.83325 12.0795 5.83325H7.91786ZM8.7487 7.49992H11.2487C11.4788 7.49992 11.6654 7.68647 11.6654 7.91659C11.6654 8.1467 11.4788 8.33325 11.2487 8.33325H8.7487C8.51858 8.33325 8.33203 8.1467 8.33203 7.91659C8.33203 7.68647 8.51858 7.49992 8.7487 7.49992ZM11.2487 8.74992H8.7487C8.51858 8.74992 8.33203 8.93647 8.33203 9.16659C8.33203 9.3967 8.51858 9.58325 8.7487 9.58325H11.2487C11.4788 9.58325 11.6654 9.3967 11.6654 9.16659C11.6654 8.93647 11.4788 8.74992 11.2487 8.74992ZM8.7487 9.99992H9.58203C9.81215 9.99992 9.9987 10.1865 9.9987 10.4166C9.9987 10.6467 9.81215 10.8333 9.58203 10.8333H8.7487C8.51858 10.8333 8.33203 10.6467 8.33203 10.4166C8.33203 10.1865 8.51858 9.99992 8.7487 9.99992Z"
                            fill="#44546F" />
                    </svg>
                    <span class="return_ref">REF: ${productReturnFromData.value?.order_group?.ref_no}</span>
                    <span class="uppercase return_status">${productReturnFromData.value?.status_text}</span>
                </span>`
})

const handleTabChange = (tab, index) => {
    localStorage.setItem('product_returns_tab', tab.name);
    activeTab.value = tab.name;
}

const openDeleteReturnModal = (product_return) => {
    productReturnFromData.value = product_return;
    showDeleteProductReturnWarningModal.value = true;
}


const getTabCount = () => {
    axios.get(import.meta.env.VITE_API_URL + 'product_returns/counts?current_branch=' + authStore.selectedBranch.id)
        .then(response => {
            tabs.value = [
                {
                    name: 'New',
                    count: response.data.pending
                },
                {
                    name: 'Approved',
                    count: response.data.approved
                },
                {
                    name: 'At Warehouse',
                    count: response.data.at_warehouse
                },
                // {
                //     name: 'Returned',
                //     count: response.data.returned
                // },
                {
                    name: 'Rejected',
                    count: response.data.rejected
                },
            ]
        })
        .catch(err => error(err))
};

const viewProductReturn = (product_return) => {
    getProductReturn(product_return.id, isViewProductReturnDetailModalOpen)
}

const getDownLoadUrl = () => {
    axios.get(import.meta.env.VITE_API_URL + 'product_returns/url')
        .then(response => {
            download_url.value = response.data;
        })
}

const downloadReturns = () => {
    let link = download_url.value + `?from=${downloadDateFilter.value.from_date}&to=${downloadDateFilter.value.to_date}`;
    window.open(link, '_blank');
    isProductReturnDownloadDateFilterModalOpen.value = false;
    resetDownloadDateFilter();
}

const resetDownloadDateFilter = () => {
    downloadDateFilter.value = {
        from_date: '',
        to_date: ''
    }
}

const getItems = (items) => {
    let html = "";
    items.forEach((item, id) => {
        if (item.order != null) {
            if (item.order.product != undefined) {
                if (id != 0) html += " \n\r";
                html += item.order.product.name + `: ₦${item.order.price_on_purchase} (x${item.total_quantity})`;
            }
        }
    });
    return html;
}

const getProductReturn = (id, openModal = null) => {
    loading.value = true;
    axios.get(
        import.meta.env.VITE_API_URL +
        "product_returns/" +
        id + '/show'
    )
        .then(response => {
            productReturnFromData.value = response.data;
            if (openModal) openModal.value = true;
        }).catch(err => error(err))
        .finally(() => {
            loading.value = false;
        });
}

let getCategories = () => {
    axios.get(import.meta.env.VITE_API_URL + 'browse/categories').then(res => {
        categories.value = res.data
    })
}

const openCreateProductReturnModal = () => {
    isCreateProductReturnModalOpen.value = true;
}

const openConfirmProductReturnAsReturnedModal = (product_return) => {
    productReturnFromData.value = product_return;
    showConfirmAsReturnedWarningModal.value = true;
}

const confirmAsReturned = () => {
    loading.value = true;
    axios.post(import.meta.env.VITE_API_URL + `admin/product_returns/${productReturnFromData.value.id}/mark_as_return`, {
        return_to_stock: 1,
        transit_status: 2
    })
        .then(response => {
            let message = 'Product Return confirmed as returned and added to inventory successfully';
            toast.success(message);
            showConfirmAsReturnedWarningModal.value = false;
            getProductReturn(productReturnFromData.value.id);
        })
        .catch(err => error(err))
        .finally(() => {
            loading.value = false;
        });
}


const openUpdateReturnStatusModal = (product_return) => {
    productReturnFromData.value = product_return;
    isProductReturnStatusUpdateModalOpen.value = true;
}

const showSuccess = (msg: string) => {
    toastMessage.value = msg
    showToast.value = true
}

const updateProductReturnStatus = () => {
    if (!status.value) {
        toast.warning('select a status');
        return;
    }
    loading.value = true;
    axios({
        url: import.meta.env.VITE_API_URL + 'product_returns/' + productReturnFromData.value.id + '/status',
        data: {
            status: status.value,
            // driver_id: driver_id.value,
            confirm_as_returned: (Number(status.value) == statuses.value.find(status => status.name == 'Approved')?.value) ? confirm_as_returned.value : '',
            note: (Number(status.value) == statuses.value.find(status => status.name == 'Approved')?.value) && confirm_as_returned.value == true ? note.value : '',
            rejection_reason: (Number(status.value) == statuses.value.find(status => status.name == 'Rejected')?.value) ? rejection_reason.value : '',
        },
        method: 'PUT'
    })
        .then(() => {
            showSuccess('Product Return Status Updated Successfully')
            childKey.value++;
            isProductReturnStatusUpdateModalOpen.value = false;
            getTabCount()
        })
        .catch(err => {
            error(err)
        })
        .finally(() => loading.value = false)

}
const getDrivers = () => {
    axios.get(import.meta.env.VITE_API_URL + 'drivers?type=all').then(res => {
        drivers.value = res.data;
    }).catch(err => {
        toast.error('Error loading drivers!');
    })

}

const getTotalAmount = (items) => {
    let amount = 0;
    items.forEach((item, id) => {
        if (item.order != null) {
            if (item.order.product != undefined) {
                amount += item.order.price_on_purchase * item.total_quantity;
            }
        }
    });
    return amount;
}

const getTotalItemAmount = (item) => {
    return item.total_quantity * item.order.price_on_purchase;
}

const deleteReturn = () => {
    loading.value = true;
    axios.delete(import.meta.env.VITE_API_URL + "product_returns/" + productReturnFromData.value.id).then(response => {
        showDeleteProductReturnWarningModal.value = false;
        showDeleteProductReturnSuccessModal.value = true;
    })
        .catch(err => error(err))
        .finally(() => loading.value = false)
}

const openLightbox = (items) => {
    currentImageIndex.value = 0;
    isLightboxOpen.value = true;
    images.value = items.images.map(image => image.image_url);
}

const closeLightbox = () => {
    isLightboxOpen.value = false;
    images.value = [];
}

const prevImage = () => {
    currentImageIndex.value =
        (currentImageIndex.value - 1 + images.value.length) % images.value.length;
}

const nextImage = () => {
    currentImageIndex.value =
        (currentImageIndex.value + 1) % images.value.length;
}

const error = (err) => {
    let errorMessage = '';
    if (err.response.data.error != undefined) {
        if (Array.isArray(err.response.data.error)) {
            errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
        } else {
            errorMessage = "<p>" + err.response.data.error + "</p>";
        }
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const openPrintNote = (product_return_id) => {
    printNoteProductReturnId.value = product_return_id;
}
</script>

<style>
.return_ref {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    /* 133.333% */
    text-transform: uppercase;
    color: rgba(98, 111, 134, 1);
}

.return_status {
    border-radius: 4px;
    background: rgba(9, 30, 66, 0.06);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: rgba(68, 84, 111, 1);
    padding: 4px 6px;
}

.pending_status,
.approved_status,
.rejected_status,
.pending_transit_status,
.collected_transit_status,
.returned_transit_status {
    border-radius: 3px;
    padding: 1px 8px;
}

.pending_status,
.pending_transit_status {
    color: #3858CF;
    border: 1px solid #3858CF;
}

.approved_status,
.returned_transit_status {
    color: #56cf38;
    border: 1px solid #56cf38;
}

.rejected_status {
    color: #cf3838;
    border: 1px solid #cf3838;
}

.key {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.value {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}



.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.erp_dashboard_wrapper .create_grn_btn {
    padding: 4px 7px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.25px;

}

.tab_actions {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.tab_actions .grey_field {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
}

.tab_actions button:not(.grey_field) {
    background: rgba(12, 102, 228, 1);
}

.discard_merge_alert_body_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.discard_merge_alert_footer .approve_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(201, 55, 44, 1);
    color: white;
}

.bulk_products_transfer_alert {
    background: rgba(204, 224, 255, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border-radius: 8px;
}

.order_summary {
    border: 1px solid rgba(9, 30, 66, 0.14);
    /* border-bottom: 0; */
    border-radius: 8px;
    /* Remove border-radius from here */
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
    padding: 8px;
}

.order_summary thead tr th {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
    padding: 8px;
    background: rgba(247, 248, 249, 1);
}

.order_summary thead tr th:first-child {
    border-top-left-radius: 8px;
}

.order_summary thead tr th:last-child {
    border-top-right-radius: 8px;
}

.transit_data {
    background: rgba(233, 242, 255, 1);
    padding: 4px;
    border-radius: 3px;
    color: rgba(0, 85, 204, 1);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
}

.lightbox {
    display: flex;
    position: fixed;
    z-index: 99999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    max-width: 80%;
    max-height: 80%;
}

.close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    cursor: pointer;
}

.prev,
.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    padding: 10px;
    cursor: pointer;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
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

.tab_text {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
}

.return_status_option_dropdown {
    padding: 8px;
    border-radius: 8px;
    border: 2px solid rgba(9, 30, 66, 0.14);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}
</style>
