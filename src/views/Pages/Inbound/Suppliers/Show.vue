<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="bg-white erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle :title="getTitle" class="px-6" />

        <div class="flex flex-wrap items-center pl-3 pr-6 mb-2 create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Back</span>
            </a>

            <div class="flex-1 text-center">
                <h3 class="capitalize supplier_title_name">{{ supplier?.name }}</h3>

            </div>
        </div>

        <!-- supplier information -->
        <div class="px-6 py-4 supplier_information">
            <div class="flex flex-wrap gap-24 mb-6">
                <div class="info_wrapper">
                    <h6>Supplier Info</h6>
                    <p class="flex items-center mb-1 gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.66667 7.33333H4V10.6667H2.66667V7.33333ZM3.03733 2.592C3.20067 2.26533 3.63333 2 4.004 2H11.9953C12.366 2 12.7993 2.26533 12.962 2.592L14 4.66667H2L3.03733 2.592ZM2 4.66667H14V5.33333H2V4.66667ZM12 7.33333H13.3333V10.6667H12V7.33333ZM2 5.33333C2.09333 6.08533 2.72933 6.66667 3.5 6.66667C4.27067 6.66667 4.90667 6.08533 5 5.33333H2ZM5 5.33333C5.09333 6.08533 5.72933 6.66667 6.5 6.66667C7.27067 6.66667 7.90667 6.08533 8 5.33333H5ZM8 5.33333C8.09333 6.08533 8.72933 6.66667 9.5 6.66667C10.2707 6.66667 10.9067 6.08533 11 5.33333H8ZM11 5.33333C11.0933 6.08533 11.7293 6.66667 12.5 6.66667C13.2707 6.66667 13.9067 6.08533 14 5.33333H11ZM2.66667 10.6667H13.3333V12.6633C13.3342 13.0168 13.1947 13.3562 12.9454 13.6069C12.6961 13.8575 12.3575 13.9989 12.004 14H3.996C3.82089 13.9997 3.64754 13.9649 3.4859 13.8976C3.32426 13.8302 3.17749 13.7316 3.05401 13.6075C2.93052 13.4833 2.83275 13.336 2.76628 13.174C2.69982 13.012 2.66596 12.8384 2.66667 12.6633V10.6667Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>
                        <span class="capitalize info_text">{{ supplier?.name }}</span>
                    </p>
                    <p class="flex items-center gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 14C6.48 14 4 8.20933 4 6C4 4.93913 4.42143 3.92172 5.17157 3.17157C5.92172 2.42143 6.93913 2 8 2C9.06087 2 10.0783 2.42143 10.8284 3.17157C11.5786 3.92172 12 4.93913 12 6C12 8.20933 9.52 14 8 14ZM8 8C8.25494 8 8.50738 7.94979 8.74292 7.85223C8.97845 7.75466 9.19246 7.61167 9.37273 7.4314C9.553 7.25113 9.696 7.03712 9.79356 6.80158C9.89112 6.56605 9.94133 6.31361 9.94133 6.05867C9.94133 5.80373 9.89112 5.55128 9.79356 5.31575C9.696 5.08022 9.553 4.86621 9.37273 4.68594C9.19246 4.50567 8.97845 4.36267 8.74292 4.26511C8.50738 4.16755 8.25494 4.11733 8 4.11733C7.48513 4.11733 6.99134 4.32187 6.62727 4.68594C6.2632 5.05001 6.05867 5.54379 6.05867 6.05867C6.05867 6.57354 6.2632 7.06733 6.62727 7.4314C6.99134 7.79547 7.48513 8 8 8Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>

                        <span class="capitalize info_text">{{ supplier?.address }}</span>
                    </p>
                </div>
                <div class="info_wrapper">
                    <h6>Contact Info</h6>
                    <p class="flex items-center mb-1 gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.33333 4.66671V11.3334H12.6667V4.66671H3.33333ZM12.6667 3.33337C13.4 3.33337 14 3.93337 14 4.66671V11.3334C14 12.0667 13.4 12.6667 12.6667 12.6667H3.33333C2.6 12.6667 2 12.0667 2 11.3334V4.66671C2 3.93337 2.6 3.33337 3.33333 3.33337H12.6667Z"
                                fill="#091E42" fill-opacity="0.31" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.66533 4.33337H2.08267C2.182 4.62671 2.34867 4.90271 2.58267 5.13671L6.504 9.05737C6.69698 9.25052 6.92614 9.40375 7.17837 9.50829C7.4306 9.61283 7.70096 9.66664 7.974 9.66664C8.24704 9.66664 8.5174 9.61283 8.76963 9.50829C9.02186 9.40375 9.25102 9.25052 9.444 9.05737L13.3653 5.13671C13.5987 4.90271 13.7653 4.62671 13.8647 4.33337H12.2827L8.50133 8.11471C8.43206 8.18403 8.3498 8.23902 8.25926 8.27654C8.16872 8.31406 8.07167 8.33337 7.97367 8.33337C7.87566 8.33337 7.77862 8.31406 7.68808 8.27654C7.59754 8.23902 7.51528 8.18403 7.446 8.11471L3.66533 4.33337Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>
                        <span class="capitalize info_text">{{ supplier?.email ?? 'Nil' }}</span>
                    </p>
                    <p class="flex items-center gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.66536 1.33337C3.92898 1.33337 3.33203 1.93033 3.33203 2.66671V13.3334C3.33203 14.0698 3.92898 14.6667 4.66536 14.6667H11.332C12.0684 14.6667 12.6654 14.0698 12.6654 13.3334V2.66671C12.6654 1.93033 12.0684 1.33337 11.332 1.33337H4.66536ZM11.332 2.66671H4.66536V11.3334H11.332V2.66671ZM9.33203 12.6667H6.66536V13.3334H9.33203V12.6667Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>
                        <span class="capitalize info_text">{{ supplier?.phone ?? 'Nil' }}</span>
                    </p>
                </div>
                <div class="info_wrapper">
                    <h6>Bank Info</h6>
                    <p class="flex items-center mb-1 gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.66667 7.33333H4V10.6667H2.66667V7.33333ZM3.03733 2.592C3.20067 2.26533 3.63333 2 4.004 2H11.9953C12.366 2 12.7993 2.26533 12.962 2.592L14 4.66667H2L3.03733 2.592ZM2 4.66667H14V5.33333H2V4.66667ZM12 7.33333H13.3333V10.6667H12V7.33333ZM2 5.33333C2.09333 6.08533 2.72933 6.66667 3.5 6.66667C4.27067 6.66667 4.90667 6.08533 5 5.33333H2ZM5 5.33333C5.09333 6.08533 5.72933 6.66667 6.5 6.66667C7.27067 6.66667 7.90667 6.08533 8 5.33333H5ZM8 5.33333C8.09333 6.08533 8.72933 6.66667 9.5 6.66667C10.2707 6.66667 10.9067 6.08533 11 5.33333H8ZM11 5.33333C11.0933 6.08533 11.7293 6.66667 12.5 6.66667C13.2707 6.66667 13.9067 6.08533 14 5.33333H11ZM2.66667 10.6667H13.3333V12.6633C13.3342 13.0168 13.1947 13.3562 12.9454 13.6069C12.6961 13.8575 12.3575 13.9989 12.004 14H3.996C3.82089 13.9997 3.64754 13.9649 3.4859 13.8976C3.32426 13.8302 3.17749 13.7316 3.05401 13.6075C2.93052 13.4833 2.83275 13.336 2.76628 13.174C2.69982 13.012 2.66596 12.8384 2.66667 12.6633V10.6667Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>

                        <span class="capitalize info_text">{{ supplier?.bank_details?.bank_name ?? 'Nil' }}</span>
                    </p>
                    <p class="flex items-center gap-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.66536 1.33337C3.92898 1.33337 3.33203 1.93033 3.33203 2.66671V13.3334C3.33203 14.0698 3.92898 14.6667 4.66536 14.6667H11.332C12.0684 14.6667 12.6654 14.0698 12.6654 13.3334V2.66671C12.6654 1.93033 12.0684 1.33337 11.332 1.33337H4.66536ZM11.332 2.66671H4.66536V11.3334H11.332V2.66671ZM9.33203 12.6667H6.66536V13.3334H9.33203V12.6667Z"
                                fill="#091E42" fill-opacity="0.31" />
                        </svg>
                        <span class="capitalize info_text">{{ supplier?.bank_details?.account_number ?? 'Nil' }}</span>
                    </p>
                </div>
            </div>

            <!-- supplier stats -->
            <div class="flex flex-wrap gap-4 px-6 py-4 bg-white rounded supplier_stats w-fit">
                <div class="stats">
                    <p class="flex mb-4 title_count gap-x-4">
                        <span>Purchase Order</span>
                        <span class="count">{{ stats?.purchaseOrderCount }}</span>
                    </p>
                    <p class="total_amount">₦{{ toLocale(stats ? stats.purchaseOrderTotalAmount : 0) }}</p>
                </div>
                <div class="stats">
                    <p class="flex mb-4 title_count gap-x-4">
                        <span>GRNs</span>
                        <span class="count">{{ stats?.invoiceCount }}</span>
                    </p>
                    <p class="total_amount">₦{{ toLocale(stats ? stats.invoiceTotalAmount : 0) }}</p>
                </div>
                <div class="stats">
                    <p class="flex mb-4 title_count gap-x-4">
                        <span>Payments</span>
                        <span class="count">{{ stats?.paymentCount }}</span>
                    </p>
                    <p class="total_amount">₦{{ toLocale(stats ? stats.paymentTotalAmount : 0) }}</p>
                </div>
                <div class="stats">
                    <p class="flex mb-4 title_count gap-x-4">
                        <span>Purchase Qty</span>
                    </p>
                    <p class="total_amount">{{ toLocale(stats ? stats.purchaseQty : 0) }}</p>
                </div>
                <div class="stats">
                    <p class="flex mb-4 title_count gap-x-4">
                        <span>Returns</span>
                    </p>
                    <p class="total_amount">{{ toLocale(stats ? stats.returns : 0) }}</p>
                </div>
            </div>
        </div>

        <!-- tabs -->
        <Tabs :tabs="purchasingTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />

        <div class="px-6 bg-white">
            <!-- all purchase orders -->
            <Datatable v-if="activeTab == 'All Purchase Order'" :url="all_purchase_order_url" :filterByDate="true"
                :columns="allPurchaseOrderColumns" pageName="SupplierPurchaseOrders">
                <template #column="col">
                    <span v-if="col.props.column.field === 'is_invoiced'">
                        <Tooltip :text="`'${col.props.row.is_invoiced}'`">
                            <span :class="[
                                'px-2 py-1 rounded-md line-clamp-2',
                                statusClasses[
                                col.props.row.is_invoiced
                                    ? 'Enabled'
                                    : 'Disabled'
                                ] || 'bg-gray-100 text-gray-800',
                            ]">
                                {{
                                    col.props.row.is_invoiced
                                        ? "Invoiced"
                                        : "Not Invoiced"
                                }}
                            </span>
                        </Tooltip>
                    </span>
                    <span v-else-if="col.props.column.field === 'status'">
                        <Tooltip :text="`'${col.props.row.status}'`">
                            <span :class="[
                                'px-2 py-1 rounded-md line-clamp-2',
                                statusClasses[
                                col.props.row.status
                                    ? 'Enabled'
                                    : 'Disabled'
                                ] || 'bg-gray-100 text-gray-800',
                            ]">
                                {{
                                    col.props.row.status
                                        ? "Approved"
                                        : "Not Approved"
                                }}
                            </span>
                        </Tooltip>
                    </span>
                    <span v-else-if="col.props.column.field === 'assigned_to'">
                        <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
                        <span v-else class="flex items-center">
                            <img v-if="
                                col.props.row.assigned_to &&
                                col.props.row.assigned &&
                                col.props.row.assigned.picture_url
                            " :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                <defs>
                                    <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox" width="1"
                                        height="1">
                                        <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                    </pattern>
                                    <image id="image0_8145_14006" width="128" height="128" preserveAspectRatio="none"
                                        xlink:href="data:image/png;base64,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" />
                                </defs>
                            </svg>
                            <span class="ml-2">{{
                                col.props.row.assigned?.name
                            }}</span>
                        </span>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>

            <!-- unconfirmed grn -->
            <Datatable v-if="activeTab == 'Unconfirmed GRN'" :url="unconfirmed_grn_url" :filterByDate="true"
                :searchable="true" :columns="unconfirmedGrnColumns" pageName="SupplierUnconfirmedGRN">
                <template #column="col">
                    <span v-if="col.props.column.field === 'assigned_to'">
                        <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
                        <span v-else class="flex items-center">
                            <img v-if="col.props.row.assigned_to && col.props.row.assigned && col.props.row.assigned.picture_url"
                                :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                <defs>
                                    <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox" width="1"
                                        height="1">
                                        <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                    </pattern>
                                    <image id="image0_8145_14006" width="128" height="128" preserveAspectRatio="none"
                                        xlink:href="data:image/png;base64,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" />
                                </defs>
                            </svg>
                            <span class="ml-2">{{ col.props.row.assigned.name }}</span>
                        </span>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>

            <!-- confirmed grn -->
            <Datatable v-if="activeTab == 'Price Confirmation'" :url="price_confirmation_url" :filterByDate="true"
                :searchable="true" :columns="priceConfirmationColumns" pageName="SupplierPriceConfirmation">
                <template #column="col">
                    <span v-if="col.props.column.field === 'assigned_to'">
                        <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
                        <span v-else class="flex items-center">
                            <img v-if="col.props.row.assigned_to && col.props.row.assigned && col.props.row.assigned.picture_url"
                                :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                <defs>
                                    <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox" width="1"
                                        height="1">
                                        <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                    </pattern>
                                    <image id="image0_8145_14006" width="128" height="128" preserveAspectRatio="none"
                                        xlink:href="data:image/png;base64,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" />
                                </defs>
                            </svg>
                            <span class="ml-2">{{ col.props.row.assigned.name }}</span>
                        </span>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>

            <!-- completed purchase orders -->
            <Datatable v-if="activeTab == 'Completed PO'" :url="completed_purchase_order_url" :filterByDate="true"
                :searchable="true" :columns="completedPurchaseOrderColumns" pageName="SupplierCompletedPurchaseOrders">
                <template #column="col">
                    <span v-if="col.props.column.field === 'is_invoiced'">
                        <Tooltip :text="`${col.props.row.is_invoiced}`">
                            <span :class="[
                                'px-2 py-1 rounded-md line-clamp-2',
                                statusClasses[col.props.row.is_invoiced ? 'Enabled' : 'Disabled'] ||
                                'bg-gray-100 text-gray-800',
                            ]">
                                {{ col.props.row.is_invoiced ? 'Invoiced' : 'Not Invoiced' }}
                            </span>
                        </Tooltip>
                    </span>
                    <span v-else-if="col.props.column.field === 'status'">
                        <Tooltip :text="`${col.props.row.status}`">
                            <span :class="[
                                'px-2 py-1 rounded-md line-clamp-2',
                                statusClasses[col.props.row.status ? 'Enabled' : 'Disabled'] ||
                                'bg-gray-100 text-gray-800',
                            ]">
                                {{ col.props.row.status ? 'Approved' : 'Not Approved' }}
                            </span>
                        </Tooltip>
                    </span>
                    <span v-else-if="col.props.column.field === 'assigned_to'">
                        <span class="text-red-800" v-if="!col.props.row.assigned_to">Unassigned</span>
                        <span v-else class="flex items-center">
                            <img v-if="col.props.row.assigned_to && col.props.row.assigned && col.props.row.assigned.picture_url"
                                :src="col.props.row.assigned.picture_url" alt="" width="24" height="24" class="mr-2" />
                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <circle cx="8" cy="8" r="8" fill="url(#pattern0_8145_14006)" />
                                <defs>
                                    <pattern id="pattern0_8145_14006" patternContentUnits="objectBoundingBox" width="1"
                                        height="1">
                                        <use xlink:href="#image0_8145_14006" transform="scale(0.0078125)" />
                                    </pattern>
                                    <image id="image0_8145_14006" width="128" height="128" preserveAspectRatio="none"
                                        xlink:href="data:image/png;base64,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" />
                                </defs>
                            </svg>
                            <span class="ml-2">{{ col.props.row.assigned.name }}</span>
                        </span>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useToast } from 'vue-toastification';
import { toLocale } from '@/views/helpers/useLocale.js';
import PageTitle from "@/views/Components/header/PageTitle.vue";
import dayjs from 'dayjs';
import { TableColumn } from '@/types';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Tabs from "@/views/Components/Tabs.vue";
import Tooltip from '@/views/Components/Tooltip.vue';

onMounted(async () => {
    loading.value = true;
    await getSupplier();
    await getSupplierStats()
    loading.value = false
})

const statusClasses = {
    Enabled: "bg-green-100 text-green-800",
    Disabled: "bg-red-100 text-red-800",
};

const route = useRoute();


const completed_purchase_order_url = import.meta.env.VITE_API_URL + 'invoices?type=completed&supplier=' + route.params.id;

const completedPurchaseOrderColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Doc No.',
        field: 'doc_no',
        sortable: false,
    },
    {
        label: 'Supplier Name',
        field: 'purchase_order.supplier.name',
        sortable: false,
    },
    {
        label: 'Order No.',
        field: 'purchase_order.order_no',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'created_at',
        sortable: true,
        format: (value) => {
            return dayjs(value).format('DD/MM/YYYY');
        }
    },
    {
        label: 'Total',
        field: 'total',
        sortable: false,
        format: (value) => {
            return "₦" + toLocale(value);
        }
    },
    {
        label: 'Approval Status',
        field: 'status',
        sortable: false,
    }
]);


const price_confirmation_url = import.meta.env.VITE_API_URL + 'invoices?type=unconfirmed_price&supplier=' + route.params.id;
const priceConfirmationColumns = ref([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Doc No.',
        field: 'doc_no',
        sortable: false,
    },
    {
        label: 'Supplier Name',
        field: 'purchase_order.supplier.name',
        sortable: false,
    },
    {
        label: 'Order No.',
        field: 'purchase_order.order_no',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'created_at',
        sortable: true,
        formatFn: (value) => {
            return dayjs(value).format('DD/MM/YYYY');
        }
    },
    {
        label: 'Total',
        field: 'total',
        sortable: false,
        formatFn: (value) => {
            return "₦" + toLocale(value);
        }
    },
    {
        label: 'Assigned',
        field: 'assigned_to',
        sortable: false,
    }
]);


const unconfirmed_grn_url = import.meta.env.VITE_API_URL + 'invoices?type=unconfirmed&supplier=' + route.params.id;
const unconfirmedGrnColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Doc No.',
        field: 'doc_no',
        sortable: false,
    },
    {
        label: 'Supplier Name',
        field: 'purchase_order.supplier.name',
        sortable: false,
    },
    {
        label: 'Order No.',
        field: 'purchase_order.order_no',
        sortable: false,
    },
    {
        label: 'Date',
        field: 'created_at',
        sortable: true,
        format: (value) => {
            return dayjs(value).format('DD/MM/YYYY');
        }
    },
    {
        label: 'Total',
        field: 'total',
        sortable: false,
        format: (value) => {
            return "₦" + toLocale(value);
        }
    },
    {
        label: 'Assigned',
        field: 'assigned_to',
        sortable: false,
    }
]);


const all_purchase_order_url = import.meta.env.VITE_API_URL + "purchase_orders/all?supplier=" + route.params.id;
const allPurchaseOrderColumns = ref<TableColumn[]>([
    {
        label: "Order No.",
        field: "order_no",
        sortable: false,
    },
    {
        label: "Supplier Name",
        field: "supplier.name",
        sortable: false,
    },
    {
        label: "Date",
        field: "purchase_date",
        sortable: true,
        format: (value) => dayjs(value).format("DD/MM/YYYY")
    },
    {
        label: "Total",
        field: "total_amount",
        sortable: false,
        format: (value) => "₦" + toLocale(value)
    },
    {
        label: "Approval Status",
        field: "status",
        sortable: false,
    },
    {
        label: "Invoice Status",
        field: "is_invoiced",
        sortable: false,
    },
    {
        label: "Assigned",
        field: "assigned_to",
        sortable: false,
    }
]);

const supplier = ref(null);
const toast = useToast();
const stats = ref(null);
const loading = ref(false);
const activeTab = ref('All Purchase Order');
const purchasingTabs = ref([
    'All Purchase Order',
    'Unconfirmed GRN',
    // 'Confirmed GRN',
    'Price Confirmation',
    'Completed PO'
]);

const getTitle = computed(() => `More Actions / All Supplier / ${supplier.value?.name} / ${activeTab.value}`)

const handleTabChange = (tab: string, index: number) => {
    // Handle tab change logic here
    activeTab.value = tab;
};

const getSupplier = () => {
    axios.get(import.meta.env.VITE_API_URL + `suppliers/${route.params.id}`)
        .then(response => {
            supplier.value = response.data;
        })
        .catch(error => {
            toast.error("Error fetching supplier's details!!!");
        });
};

const getSupplierStats = () => {
    axios.get(import.meta.env.VITE_API_URL + `suppliers/${route.params.id}/stats`)
        .then(response => {
            stats.value = response.data;
        })
        .catch(error => {
            toast.error("Error fetching supplier's stats!!!");
        });
}
</script>

<style>
.supplier_title_name {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.supplier_information {
    background: rgba(247, 248, 249, 1);
}

.supplier_information .info_wrapper {
    min-width: 10rem;
}

.supplier_information .info_wrapper h6 {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
    margin-bottom: 0.75rem;
}

.supplier_information .info_wrapper .info_text {
    font-size: 12px;
    font-style: normal;
    font-weight: 490;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: -0.25px;
    color: rgba(68, 84, 111, 1);
}

.supplier_information .supplier_stats {
    border: 1px solid rgba(9, 30, 66, 0.14);
}

.supplier_information .supplier_stats .stats:not(:last-child) {
    border-right: 1px solid rgba(9, 30, 66, 0.14);
    padding-right: 1rem;
}

.supplier_information .supplier_stats .stats .title_count {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(98, 111, 134, 1)
}

.supplier_information .supplier_stats .stats .title_count .count {
    padding: 2px 4px;
    border-radius: 4px;
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.supplier_information .supplier_stats .stats .total_amount {
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: rgba(23, 43, 77, 1);
}
</style>