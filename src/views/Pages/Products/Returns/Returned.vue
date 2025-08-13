<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Product Movement / Returned Products" />

        <div class="flex items-center justify-center  min-h-[calc(100vh-190px)]" v-if="!hasSearched">
            <div class="intro_search_wrapper">
                <div class="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
                            fill="#1D7AFC" />
                    </svg>
                    <h3>Let's Find Your Returned Products</h3>
                </div>
                <p class="my-4 text-center">Please search by Order Ref No, Customer Name or Store Name to load
                    returned products</p>
                <div class="relative grid items-baseline grid-cols-1 gap-2 md:grid-cols-7 search_content">
                    <select name="" v-model="searchBy"
                        class="md:col-span-2 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                        <option value="order">Order Ref No</option>
                        <option value="customer">Customer Name</option>
                        <option value="store">Store Name</option>
                    </select>
                    <div class="relative p-0 m-0 md:col-span-4">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="absolute top-2 left-1">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.1965 12.5708L17.4798 15.9125C17.6269 16.0715 17.7063 16.2815 17.7012 16.498C17.6961 16.7145 17.6069 16.9206 17.4525 17.0725C17.2982 17.2244 17.0907 17.3102 16.8741 17.3117C16.6575 17.3133 16.4489 17.2305 16.2923 17.0808L13.0106 13.7425C11.7444 14.6964 10.163 15.1334 8.58669 14.9652C7.01035 14.7969 5.55684 14.036 4.52048 12.8363C3.48411 11.6367 2.94234 10.0881 3.00487 8.50399C3.06739 6.91993 3.72953 5.41881 4.85722 4.3046C5.98491 3.19038 7.49388 2.54632 9.07858 2.50284C10.6633 2.45936 12.2053 3.0197 13.3924 4.07041C14.5795 5.12111 15.3229 6.58366 15.4722 8.16192C15.6215 9.74017 15.1655 11.3162 14.1965 12.5708ZM9.2498 13.3333C10.4654 13.3333 11.6312 12.8505 12.4907 11.9909C13.3502 11.1314 13.8331 9.96558 13.8331 8.75C13.8331 7.53443 13.3502 6.36864 12.4907 5.5091C11.6312 4.64956 10.4654 4.16667 9.2498 4.16667C8.03422 4.16667 6.86843 4.64956 6.00889 5.5091C5.14935 6.36864 4.66646 7.53443 4.66646 8.75C4.66646 9.96558 5.14935 11.1314 6.00889 11.9909C6.86843 12.8505 8.03422 13.3333 9.2498 13.3333Z"
                                fill="#626F86" />
                        </svg>
                        <input type="text" v-model="search"
                            class="w-full pr-2 pl-7 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                    </div>
                    <button class="text-white" @click="hasSearched = true">search</button>
                </div>
            </div>
        </div>
        <div class=" min-h-[calc(100vh-190px)]" v-else>
            <Datatable :url="returned_url" :filterByDate="true" :columns="returnedColumns" :key="childKey"
                pageName="ReturnedProductReturns" @onSearch="updateSearch">
                <template #header_search>
                    <div class="flex items-center gap-2 mr-3">
                        <label for="sort_by" class="sort_by_label">Search By</label>
                        <select name="" id="sort_by" v-model="searchBy"
                            class="data_table_select px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none">
                            <option value="order">Order Ref No</option>
                            <option value="customer">Customer Name</option>
                            <option value="store">Store Name</option>
                        </select>
                    </div>
                </template>
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
                                :src="col.props.row.driver.picture_url" alt="" width="24" height="24" class="mr-2" />
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
                            <span class="ml-2 whitespace-nowrap">{{ col.props.row.driver.name }}</span>
                        </span>
                    </span>
                    <span class="text-xs" v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
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


        <!-- view images modal -->
        <div class="lightbox" v-if="isLightboxOpen" @click="closeLightbox">
            <span class="close" @click.stop="closeLightbox">&times;</span>
            <img class="lightbox-content" :src="currentImage" />
            <button class="prev" @click.stop="prevImage">❮</button>
            <button class="next" @click.stop="nextImage">❯</button>
        </div>

        <!-- view product return print note -->
        <PrintNote :productReturnId="printNoteProductReturnId" @printNoteClosed="printNoteProductReturnId = 0" />
    </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn } from '@/types';
import dayjs from 'dayjs';
import { toLocale } from '@/views/helpers/useLocale';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useDebounceFn } from '@vueuse/core';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import SideBarModal from "@/views/Components/SideBarModal.vue";
import Tooltip from '@/views/Components/procurement/ui/Tooltip.vue';
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue';
import PrintNote from './PrintNote.vue';

const SEARCH_DEBOUNCE_DELAY = 300;


onMounted(async () => {
    await Promise.all([
        getDownLoadUrl(),
        getCategories()
    ]);
});


const childKey = ref(111);
const search = ref('');
const searchBy = ref<'order' | 'customer' | 'store'>('order');
const hasSearched = ref(false);
const loading = ref(false);
const toast = useToast();
const printNoteProductReturnId = ref(0);

const returned_url = computed(() => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const params = new URLSearchParams({
        search_by: searchBy.value,
        search: search.value.trim()
    });
    return `${baseUrl}product_returns/returned?${params.toString()}`;
});

const returnedColumns = ref<TableColumn[]>([
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

watch(searchBy, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        childKey.value++;
    }
});

// Debounced search function
const updateSearch = useDebounceFn((searchTerm: string) => {
    console.log('updateSearch', searchTerm);
    search.value = searchTerm;
    childKey.value++;
}, SEARCH_DEBOUNCE_DELAY);

const isLightboxOpen = ref(false);
const isViewProductReturnDetailModalOpen = ref(false);
const download_url = ref('');

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

const viewReturnTabs = ['Details', 'Activities'];
const activeViewTab = ref('Details');

const images = ref([]);
const categories = ref([]);
const getDateTime = computed(() => {
    return (date) => {
        return date ? dayjs(date).format('LLL') : date;
    }
});
const currentImageIndex = ref(0);

const currentImage = computed(() => images.value[currentImageIndex.value]);
// const hasLogs = computed(() => productReturnFromData.value.logs.length > 0);
const hasImages = computed(() => {
    return (item) => {
        return item && item.images && item.images.length > 0;
    }
})

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

let getCategories = () => {
    axios.get(import.meta.env.VITE_API_URL + 'browse/categories').then(res => {
        categories.value = res.data
    })
}


const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

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

const viewProductReturn = (product_return) => {
    getProductReturn(product_return.id, isViewProductReturnDetailModalOpen)
}

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

const getDownLoadUrl = () => {
    axios.get(import.meta.env.VITE_API_URL + 'product_returns/url')
        .then(response => {
            download_url.value = response.data;
        })
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

const openPrintNote = (product_return_id) => {
    printNoteProductReturnId.value = product_return_id;
}
</script>

<style>
.intro_search_wrapper {
    border-radius: 12px;
    color: rgba(98, 111, 134, 1);
    background: white;
    padding: 24px;
    width: 33em;
    box-shadow: 0px 2px 4px 0px #E5E2E9;
}

.intro_search_wrapper h3 {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.intro_search_wrapper p {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(68, 84, 111, 1);
    padding: 0 6.5em;
}

.intro_search_wrapper .search_content {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.data_table_select,
.intro_search_wrapper .search_content select,
.intro_search_wrapper .search_content input {
    border: 2px solid rgba(9, 30, 66, 0.14);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.intro_search_wrapper .search_content button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    background: rgba(12, 102, 228, 1);
    padding: 0.825em 0.4em;
    border-radius: 6px;
}

.sort_by_label {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

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