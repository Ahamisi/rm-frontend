<template>
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle :title="getTitle" />

        <div class="flex flex-wrap items-center gap-2 mb-8 md:justify-between create_grn_header_wrapper">
            <a @click.prevent="$goBack()" href="" class="flex items-center p-1 rounded hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Cancel</span>
            </a>

            <div class="flex items-center gap-2">
                <h3>Edit GRN</h3>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.91933 0.833313C2.45725 0.833313 2.0835 1.20498 2.0835 1.66248V8.33748C2.08493 8.5581 2.17366 8.76918 2.33029 8.92456C2.48692 9.07994 2.6987 9.16698 2.91933 9.16665H7.081C7.54308 9.16665 7.91683 8.7954 7.91683 8.33748V1.66248C7.91683 1.20748 7.54266 0.833313 7.081 0.833313H2.91933ZM3.75016 2.49998H6.25016C6.48028 2.49998 6.66683 2.68653 6.66683 2.91665C6.66683 3.14676 6.48028 3.33331 6.25016 3.33331H3.75016C3.52004 3.33331 3.3335 3.14676 3.3335 2.91665C3.3335 2.68653 3.52004 2.49998 3.75016 2.49998ZM6.25016 3.74998H3.75016C3.52004 3.74998 3.3335 3.93653 3.3335 4.16665C3.3335 4.39676 3.52004 4.58331 3.75016 4.58331H6.25016C6.48028 4.58331 6.66683 4.39676 6.66683 4.16665C6.66683 3.93653 6.48028 3.74998 6.25016 3.74998ZM3.75016 4.99998H4.5835C4.81362 4.99998 5.00016 5.18653 5.00016 5.41665C5.00016 5.64676 4.81362 5.83331 4.5835 5.83331H3.75016C3.52004 5.83331 3.3335 5.64676 3.3335 5.41665C3.3335 5.18653 3.52004 4.99998 3.75016 4.99998Z"
                        fill="#44546F" />
                </svg>
                <span class="font-light upper">{{ purchaseOrder?.order_no }}</span>
            </div>

            <button @click="show_confirm_update = true"
                class="flex items-center px-3 py-2 text-white gap-x-1 create_btn">
                <span class="text-xs">Update</span>
            </button>
        </div>

        <!-- supplier information -->
        <div class="p-4 mb-4 rounded-xl supplier_information">
            <h3 class="mb-4">Supplier's Information</h3>
            <div class="flex flex-wrap gap-4 md:flex-nowrap">
                <div class="w-full supplier_content">
                    <label>Purchase Order</label>
                    <v-select v-model="invoice.purchase_order_id" :options="purchaseOrders" label="order_no"
                        placeholder="Search Purchase Order..." :loading="purchase_orders_loading"
                        @update:modelValue="changeOrder" :reduce="order => order.id" />
                </div>
                <div class="w-full supplier_content">
                    <label>Due Date</label>
                    <input type="date" class="w-full form-input" v-model="invoice.due_date" />
                </div>
            </div>
        </div>

        <div class="p-4 rounded-xl items_wrapper">
            <div class="flex justify-between gap-4 mb-4">
                <h3 class="">All Items</h3>
                <!-- <button @click="openModal" class="flex items-center p-1 rounded-md add_item_btn">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                            fill="#44546F" />
                    </svg>
                    <span>Add Item</span>
                </button> -->
                <div></div>
            </div>

            <div class="overflow-hidden bg-white shadow-sm rounded-xl table_wrapper">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Item name
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Batch No.
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Warehouse Shelf
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Purchased Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Received Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Variance
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Return Qty
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Expiry Date
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Inbound Type
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Price
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Unit Cost
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Discount (%)
                                </th>
                                <th class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    Total
                                </th>
                                <th class="px-2 py-3 tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="item, index in purchaseOrder.items" :key="item.id" class="hover:bg-gray-50">
                                <td class="tracking-wider text-left w-[10%] cursor-help">
                                    <Tooltip :text="item.product_name" class="">
                                        <button class="tracking-wider text-left cursor-help">
                                            {{ truncateText(item.product_name, 25) }}
                                        </button>
                                    </Tooltip>
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.batch_no }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.warehouse_shelf?.join(', ') }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.purchased_quantity) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.quantity) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.purchased_quantity - item.quantity }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.returned) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.expiry_date }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.inbound_type }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.purchase_price) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(item.unit_cost) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ item.discount }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left w-[10%]">
                                    {{ toLocale(((item.quantity - item.returned) * item.unit_cost) - ((item.discount /
                                        100) * ((item.quantity - item.returned) * item.unit_cost))) }}
                                </td>
                                <td class="px-2 py-3 tracking-wider text-left">
                                    <div class="flex space-x-2">
                                        <button @click="editItem(item, index)"
                                            class="text-blue-600 transition-colors hover:text-blue-800" title="Edit">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M4.02026 19.23C3.98715 19.392 3.99472 19.5597 4.0423 19.718C4.08988 19.8764 4.17598 20.0205 4.29289 20.1374C4.40981 20.2543 4.55389 20.3404 4.71224 20.388C4.87059 20.4355 5.03826 20.4431 5.20026 20.41L9.01026 19.63L4.80026 15.42L4.02026 19.23ZM9.94126 16.61L7.82126 14.49L16.3063 6H16.3083L18.4293 8.121L9.94026 16.611L9.94126 16.61ZM19.8443 6.707L17.7243 4.585C17.5384 4.39908 17.3176 4.2517 17.0746 4.15131C16.8316 4.05092 16.5712 3.9995 16.3083 4C15.7963 4 15.2843 4.195 14.8933 4.585L5.13626 14.343L10.0863 19.293L19.8433 9.535C20.2182 9.15995 20.4288 8.65133 20.4288 8.121C20.4288 7.59068 20.2182 7.08206 19.8433 6.707H19.8443Z"
                                                    fill="#44546F" />
                                            </svg>
                                        </button>

                                        <button @click="deleteItem(index)"
                                            class="text-red-600 transition-colors hover:text-red-800" title="Delete">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                                                    fill="#44546F" />
                                            </svg>
                                        </button>

                                        <button @click="openItemSplit(index)"
                                            class="text-green-600 transition-colors hover:text-green-800"
                                            title="Split Item">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M16 9C16.8 9 17.6 8.7 18.1 8.1C18.7 7.5 19 6.8 19 6C19 5.2 18.7 4.4 18.1 3.9C17 2.8 15 2.8 13.9 3.9C13.3 4.4 13 5.2 13 6C13 6.8 13.3 7.5 13.8 8L12 11.1L10.2 8C10.7 7.5 11 6.8 11 6C11 5.2 10.7 4.4 10.1 3.9C9 2.7 7 2.7 5.9 3.9C5.3 4.4 5 5.2 5 6C5 6.8 5.3 7.6 5.9 8.1C6.5 8.7 7.2 9 8 9H8.4L15.1 20.5C15.3 20.8 15.6 21 16 21C16.2 21 16.3 21 16.5 20.9C17 20.6 17.1 20 16.9 19.5L13.2 13.1L15.6 8.9C15.7 9 15.9 9 16 9ZM8.7 6.7C8.3 7.1 7.7 7.1 7.3 6.7C7.1 6.5 7 6.3 7 6C7 5.7 7.1 5.5 7.3 5.3C7.5 5.1 7.7 5 8 5C8.3 5 8.5 5.1 8.7 5.3C8.9 5.5 9 5.7 9 6C9 6.3 8.9 6.5 8.7 6.7ZM15.3 5.3C15.5 5.1 15.7 5 16 5C16.3 5 16.5 5.1 16.7 5.3C16.9 5.5 17 5.7 17 6C17 6.3 16.9 6.5 16.7 6.7C16.3 7.1 15.7 7.1 15.3 6.7C15.1 6.5 15 6.3 15 6C15 5.7 15.1 5.5 15.3 5.3Z"
                                                    fill="#44546F" />
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M10.3 14.1L7.2 19.5C6.9 20 7 20.6 7.5 20.8C7.7 20.9 7.8 21 8 21C8.3 21 8.7 20.8 8.9 20.5L11.5 16.1L10.3 14.1Z"
                                                    fill="#44546F" />
                                            </svg>

                                        </button>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- add or update item -->
        <SideBarModal :title="modalTitle" :is-open="isModalOpen" width="lg" :initial-form-data="updateGrnFormData"
            ref="addItemModal" @update:is-open="isModalOpen = $event" @close="handleClose"
            @form-data-change="handleFormDataChange">
            <!-- Main content -->
            <template #default="{ formData, updateFormData, isEditItem }">
                <div class="space-y-6">
                    <!-- Item Name -->
                    <div>
                        <label class="">Item Name</label>
                        <div class="relative">
                            <v-select v-model="updateGrnFormData.product" :options="products" label="name"
                                placeholder="Type to search for product..." @search="onSearchProduct"
                                :loading="product_loading" :clearable="true" @option:selected="onProductSelect" />
                        </div>
                    </div>

                    <div>
                        <label class="">Batch Warehouse Shelf Location</label>
                        <v-select taggable multiple :options="warehouse_shelves"
                            v-model="updateGrnFormData.warehouse_shelf" required @input="onWarehouseSelect" />
                    </div>

                    <!-- Batch Number and Expiry Date -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="">Batch Number</label>
                            <input v-model="updateGrnFormData.batch_no" type="text" placeholder="Enter batch number"
                                class="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label class="">Batch Expiry Date</label>
                            <div class="relative">
                                <input v-model="updateGrnFormData.expiry_date" type="date"
                                    class="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>
                    </div>

                    <!-- Unit Cost and Price per Pack -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="">Unit Cost</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1.5 text-gray-500 text-lg">₦</span>
                                <input v-model="updateGrnFormData.unit_cost" type="number" step="0.01"
                                    placeholder="0.00"
                                    class="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent price" />
                            </div>
                        </div>
                        <div>
                            <label class="">Price per Pack</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1.5 text-gray-500 text-lg">₦</span>
                                <input v-model="updateGrnFormData.purchase_price" type="number" step="0.01"
                                    placeholder="0.00"
                                    class="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent price" />
                            </div>
                        </div>
                    </div>

                    <!-- Received Quantity and Inbound Type -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="">Received Quantity</label>
                            <input v-model="updateGrnFormData.quantity" type="number"
                                :min="updateGrnFormData.product?.min_reorder ? updateGrnFormData.product?.min_reorder : 1"
                                class="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            <p class="mt-1 text-xs text-gray-500">
                                Minimum order quantity is {{ updateGrnFormData.product?.min_reorder ?
                                    updateGrnFormData.product?.min_reorder
                                    : 1 }}
                            </p>
                        </div>
                        <div>
                            <label class="">Inbound Type</label>
                            <div class="relative">
                                <select v-model="updateGrnFormData.inbound_type"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Select a type</option>
                                    <option v-for="(type, index) in inbound_types" :key="index" :value="type">{{ type }}
                                    </option>
                                </select>
                                <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Discount and Barcode -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="">Discount (%)</label>
                            <input v-model="updateGrnFormData.discount" type="number" min="0" max="100" step="0.01"
                                placeholder="0"
                                class="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div v-if="authStore.hasBarcodeScanning">
                            <label class="">Barcode</label>
                            <div class="relative">
                                <input v-model="updateGrnFormData.barcode" type="text" placeholder="Scan barcode"
                                    :readonly="!scanning" @keypress="handlePress" id="product_barcode"
                                    class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                <button @click="scanBarcode" type="button" v-if="!scanning"
                                    class="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                        </path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </button>
                                <button @click="scanning = false" type="button" v-else
                                    class="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                                    </svg>

                                </button>
                            </div>
                            <p class="mt-1 text-xs text-gray-500">
                                Click camera icon to scan
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Footer buttons -->
            <template #footer="{ closeModal, formData }">
                <div class="flex justify-end space-x-3">
                    <button @click="closeModal" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="saveItem(formData, closeModal)" type="button" class="approve_btn">
                        {{ isEditItem ? 'Update Item' : 'Add Item' }}
                    </button>
                </div>
            </template>
        </SideBarModal>

        <!-- split item modal -->
        <UniversalCenteredModal :show="showSplitItemModal" @close="showSplitItemModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <h3 class="font-medium">Split Item</h3>
                </span>
            </template>

            <template #body>
                <p>Split this item <strong>“{{ itemToSplit.product_name }}”</strong>. into how many parts? </p>
                <input type="number" min="1" v-model="splitTimes"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <!-- <button @click="showSplitItemModal = false" type="button" class="cancel_btn ">
            Cancel
          </button> -->
                    <button @click="splitItem" type="button" class="px-4 py-2 text-sm approve_btn" style="color: white">
                        split
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- confirm update modal -->
        <UniversalCenteredModal :show="show_confirm_update" @close="show_confirm_update = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <h3 class="font-medium">Update GRN</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to update this GRN <strong>“{{ purchaseOrder?.order_no }}”</strong>. This
                    action will update it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="show_confirm_update = false" type="button" class="cancel_btn ">
                        Cancel
                    </button>
                    <button @click="updateInvoice" type="button" class="px-4 py-2 text-sm approve_btn"
                        style="color: white">
                        Update GRN
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Tooltip from "@/views/Components/Tooltip.vue";
import SideBarModal from "@/views/Components/SideBarModal.vue";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { toLocale } from "@/views/helpers/useLocale.js";
import UniversalCenteredModal from "@/views/Components/UniversalCenteredModal.vue";


const getTitle = computed(() => `Purchase Order / Approved PO / ${purchaseOrder.value?.order_no}`)


// loading purchase orders
onMounted(() => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + "invoices/" + route.params.id).then(res => {
        invoice.value = res.data.invoice;
        invoice.value.due_date = res.data.invoice.due_date_form;
        purchaseOrder.value = res.data.invoice.purchase_order;
        purchaseOrders.value.push(res.data.invoice.purchase_order)
        purchaseOrder.value.items = res.data.invoice.items;
    }).catch(err => {
        error(err);
    }).finally(() => loading.value = false)
    fetchInboundType()
    getWarehouseShelves();
});

const authStore = useAuthStore();
const route = useRoute();
const loading = ref(false);
const toast = useToast();
const showSplitItemModal = ref(false)
// Refs
const selected_purchase_order = ref<number | null>(null);
const options = ref<any[]>([]);
const purchaseOrders = ref<any[]>([]);
const purchaseOrder = ref<any>({ order_no: '', items: [] });
const products = ref<any[]>([]);
const show_confirm_update = ref(false);
const purchase_orders_loading = ref(false);
const product_loading = ref(false);
const isEditItem = ref(false);
const editItemIndex = ref(-1);
const childKey = ref(10000);
const inbound_types = ref([]);
const warehouse_shelves = ref([]);
const scanning = ref(false);

const invoice = ref({
    purchase_order_id: '',
    due_date: '',
    total: 0,
    items: [],
});

const item = ref<string>('');
const itemToEdit = ref({});

const itemToSplit = ref({
    product_name: '',
    product_id: 0,
    quantity: 0,
    purchase_price: 0,
    purchased_quantity: 0,
    discount: 0,
    unit_cost: 0,
    inbound_type: '',
    batch_no: '',
    expiry_date: '',
    warehouse_shelf: [],
    product: null,
    id: 0
});

const splitTimes = ref<number>(1);
const isModalOpen = ref(false);
const modalTitle = ref("Add Purchase Order Item");

const updateGrnFormData = ref({
    product_id: 0,
    product: null,
    product_name: '',
    batch_no: '',
    expiry_date: '',
    discount: 0,
    price_per_pack: 0,
    purchase_price: 0,
    unit_cost: 0,
    quantity: 0,
    inbound_type: '',
    warehouse_shelf: [],
    barcode: '',
    id: 0
});

const fetchInboundType = () => {
    axios.get(import.meta.env.VITE_API_URL + 'invoices/inbound_types').then(res => {
        inbound_types.value = res.data;
    }).catch(err => {
        error(err);
    });
}

const scanBarcode = () => {
    scanning.value = true;
    let input = document.getElementById('product_barcode');
    input.focus();
}

const handlePress = (e) => {
    if (scanning.value && e.key === 'Enter') {
        e.preventDefault();
        stopBarcodeScan();
    }
}

const stopBarcodeScan = () => {
    scanning.value = false;
}

const addItem = (newItem, index = -1) => {
    const items = purchaseOrder.value.items;

    if (index === -1) {
        items.push({ ...newItem });
    } else {
        console.log('index', index)
    }

    if (purchaseOrder.value.type === 'trade') {
        items.forEach((itm, i) => {
            if (itm.product_id === newItem.product_id && items[index] !== itm) {
                itm.unit_cost = newItem.unit_cost;
                itm.purchase_price = newItem.purchase_price;

                if (itm.product) {
                    itm.product.price_per_pack = newItem.purchase_price;
                    itm.product.unit_cost = newItem.unit_cost;
                }

                items[i] = { ...itm };
            }
        });
    }

    purchaseOrder.value.items = [...items];
};


const editItem = (updatedItem, index) => {
    editItemIndex.value = index;
    updateGrnFormData.value = {
        product_id: updatedItem.product.id,
        product: updatedItem.product,
        product_name: updatedItem.product.name,
        batch_no: updatedItem.batch_no,
        expiry_date: updatedItem.expiry_date,
        discount: updatedItem.discount,
        price_per_pack: updatedItem.purchase_price,
        purchase_price: updatedItem.purchase_price,
        unit_cost: updatedItem.unit_cost,
        quantity: updatedItem.quantity,
        inbound_type: updatedItem.inbound_type,
        warehouse_shelf: updatedItem.warehouse_shelf ?? [],
        barcode: updatedItem.barcode,
        id: updatedItem.id
    };
    isEditItem.value = true
    isModalOpen.value = true;
    products.value = [...products.value, updatedItem.product];
};

const updateInvoice = () => {
    show_confirm_update.value = false;
    loading.value = true;

    invoice.value.items = purchaseOrder.value.items;
    let total = 0;
    invoice.value.items.forEach(item => {
        if (purchaseOrder.value.type == 'trade') {
            if (!item.batch_no || item.batch_no === '' || !item.expiry_date || item.expiry_date === '') {
                toast.error("Batch information is required!")
                loading.value = false
                throw new Error("Batch information is required!")
            }
            total += (item.purchased_quantity * item.unit_cost) - ((item.discount / 100) *
                (item.purchased_quantity * item.unit_cost))
        } else {
            total += (item.purchased_quantity * item.purchase_price) - ((item.discount / 100) *
                (item.purchased_quantity * item.purchase_price))
        }
    });
    invoice.value.total = total;
    axios.put(import.meta.env.VITE_API_URL + `invoices/${invoice.value.id}?current_branch=${authStore.selectedBranch.id}`, invoice.value)
        .then(res => {
            let jobId = res.data.job_id;
            if (jobId != null && jobId != undefined) {
                processJobCheck(jobId);
            } else {
                toast.success('GRN updated successfully!')
            }
        }).catch(err => {
            error(err);
        }).finally(() => {
            loading.value = false;
        });
}

const processJobCheck = (jobId) => {
    if (jobCheckInterval) {
        loading.value = true;
        jobCheckInterval = setInterval(() => {
            axios.get(import.meta.env.VITE_API_V2_URL + 'verify/job/status?tag=' + jobId).then(res => {
                if (res.data.status == 'success') {
                    toast.success('GRN updated successfully!!!');
                    clearInterval(jobCheckInterval);
                    jobCheckInterval = null;
                } else {
                    toast.error(res.data.note);
                }
                loading.value = false;
            });
        }, 5000);
    }
}

const getWarehouseShelves = () => {
    axios.get(import.meta.env.VITE_API_URL + 'shelves?type=all').then(res => {
        warehouse_shelves.value = res.data.map(shelf => shelf.name);
    }).catch((err) => {
        toast.error("Error loading warehouse shelves!");
    });
}

const deleteItem = (index) => {
    if (confirm("Are you sure you want to remove this item?")) {
        purchaseOrder.value.items.splice(index, 1);
    }
};


const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

let jobCheckInterval: ReturnType<typeof setTimeout>;
let debounceTimeout: ReturnType<typeof setTimeout>;

const changeOrder = (value) => {
    axios.get(import.meta.env.VITE_API_URL + `purchase_orders/${value}?current_branch=${authStore.selectedBranch.id}`).then(res => {
        purchaseOrder.value = res.data.purchaseOrder;
        purchaseOrder.value = {
            ...purchaseOrder.value,
            items: purchaseOrder.value.items.map(item => ({ ...item, quantity: 0 }))
        };
    }).catch((err) => {
        error(err);
    })
}


const fetchProducts = async (query: string) => {
    product_loading.value = true;
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + `search_products_typeahead?q=${query}&fields=id,name,price_per_pack,unit_cost,min_reorder&current_branch=${authStore.selectedBranch.id}`
        );
        products.value = res.data;
    } catch (error) {
        error(error);
    } finally {
        product_loading.value = false;
    }
};

const onSearchProduct = (query: string) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        if (query.length >= 3) {
            fetchProducts(query);
        } else {
            options.value = [];
        }
    }, 500);
};


const openModal = () => {
    editItemIndex.value = -1;
    isModalOpen.value = true;
    updateGrnFormData.value = {
        product_id: 0,
        product: null,
        product_name: '',
        batch_no: '',
        expiry_date: '',
        discount: 0,
        price_per_pack: 0,
        purchase_price: 0,
        unit_cost: 0,
        quantity: 0,
        inbound_type: '',
        warehouse_shelf: [],
        barcode: '',
        id: 0
    };
};

const handleClose = () => {
    // Reset form data when modal closes
    updateGrnFormData.value = {
        product_id: 0,
        product: null,
        product_name: '',
        batch_no: '',
        expiry_date: '',
        discount: 0,
        price_per_pack: 0,
        purchase_price: 0,
        unit_cost: 0,
        quantity: 0,
        inbound_type: '',
        warehouse_shelf: [],
        barcode: '',
        id: 0
    };
};

const handleFormDataChange = (data: any) => {

};



const saveItem = (data: any, closeModal: () => void) => {
    if (data.unit_cost > data.purchase_price) {
        toast.error("Unit cost cannot be greater than purchase price");
        return;
    }

    if (data.quantity < 1) {
        toast.error("Minimum order quantity is 1");
        return;
    }

    if (editItemIndex.value >= 0) {
        let modifiedItems = purchaseOrder.value.items.map((product, index) => {
            if (editItemIndex.value == index) {
                return {
                    ...product,
                    ...data,
                    ...{ unit_cost: product.inbound_type == 'FOC' ? 0 : product.unit_cost, purchased_quantity: product.purchased_quantity }
                }
            }
            return product;
        });
        purchaseOrder.value.items = modifiedItems;
    } else {
        addItem({ ...data, ...{ unit_cost: data.inbound_type == 'FOC' ? 0 : data.unit_cost, purchased_quantity: data.quantity } });
    }

    closeModal();
};

const openItemSplit = (index) => {
    itemToSplit.value = purchaseOrder.value.items[index];
    showSplitItemModal.value = true;
};


const onProductSelect = (selected) => {
    updateGrnFormData.value.product_id = selected.id;
    updateGrnFormData.value.product_name = selected.name;
    updateGrnFormData.value.product = selected;
};

const splitItem = () => {
    if (splitTimes.value >= 1 && itemToSplit.value.product_name !== '') {
        for (let i = 0; i < splitTimes.value; i++) {
            addItem({
                product: itemToSplit.value.product,
                product_id: itemToSplit.value.product_id,
                product_name: itemToSplit.value.product_name,
                purchase_price: itemToSplit.value.purchase_price,
                quantity: itemToSplit.value.quantity,
                purchased_quantity: itemToSplit.value.purchased_quantity,
                discount: itemToSplit.value.discount,
                batch_no: '',
                expiry_date: '',
                warehouse_shelf: itemToSplit.value.warehouse_shelf ?? [],
                unit_cost: itemToSplit.value.unit_cost,
                barcode: '',
                inbound_type: itemToSplit.value.inbound_type
            },);
        }
    }

    // Reset
    itemToSplit.value = {
        product_name: '',
        product_id: 0,
        quantity: 0,
        purchase_price: 0,
        purchased_quantity: 0,
        discount: 0,
        unit_cost: 0,
        inbound_type: '',
        batch_no: '',
        expiry_date: '',
        warehouse_shelf: [],
        product: null,
        id: 0
    };

    splitTimes.value = 1;
    showSplitItemModal.value = false;

};

const onWarehouseSelect = (data) => {
    updateGrnFormData.value.warehouse_shelf = data
}

const error = (err) => {
    let errorMessage = '';
    if (Array.isArray(err.response.data.error)) {
        errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
    } else {
        errorMessage = err.response.data.error != undefined ? "<p>" + err.response.data.error + "</p>" : "<p>" + err.response.data.message + "</p>";
    }
    toast.error(errorMessage);
}

</script>

<style>
.create_grn_header_wrapper {
    font-size: 14px;
    font-style: normal;
    font-weight: 450;
    line-height: 16px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer button,
.create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;

}

.supplier_information,
.items_wrapper,
.items_wrapper table thead {
    background: rgb(239 239 239 / 82%);
}

.supplier_information h3,
.items_wrapper h3 {
    color: rgba(23, 43, 77, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.form-input {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
    border: 1px solid rgba(9, 30, 66, 0.14);
    border-radius: 8px;
    backdrop-filter: #fff;
    padding: 8px;
}

.vs--searchable .vs__dropdown-toggle {
    padding: 4px;
}

.erp_dashboard_wrapper .supplier_information label {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.items_wrapper .add_item_btn {
    border: 1px solid rgba(9, 30, 66, 0.14);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.items_wrapper .table_wrapper {
    border: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr,
.items_wrapper table tbody tr:not(:last-child) {
    border-bottom: 1px solid rgba(9, 30, 66, 0.14);
}

.items_wrapper table thead tr th {
    font-size: 12px;
    font-style: normal;
    font-weight: 450;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(23, 43, 77, 1);
}

.items_wrapper table tbody tr td {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
}

.discard_merge_alert_footer button,
.footer button {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(23, 43, 77, 1);
}

.discard_merge_alert_footer .cancel_btn,
.footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}


.discard_merge_alert_footer button.approve_btn,
.footer button.approve_btn,
.discard_merge_alert_footer button.create_btn,
.footer .approve_btn {
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn,
.footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
}

.discard_merge_alert_footer .discard_btn,
.footer .discard_btn {
    background: rgba(245, 205, 71, 1);
}

.body,
.discard_merge_alert_body_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: rgba(68, 84, 111, 1);
    line-height: 20px;
}
</style>
