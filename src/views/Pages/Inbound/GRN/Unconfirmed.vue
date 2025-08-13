<template>
    <div class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        v-if="loading">
        <LoadingState />
    </div>
    <div>
        <!-- <div class="flex justify-end pt-3">
           
        </div> -->
        <Datatable :url="unconfirmed_grn_url" :filterByDate="true" :searchable="true" :columns="unconfirmedGrnColumns"
            pageName="UnconfirmedGRN" :key="childKey" :filterFields="filterField">
            <template #header_actions>
                <RouterLink :to="{ name: 'inbound.grn.create' }"
                    class="flex items-center text-white create_btn create_grn_btn gap-x-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13 11V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13Z"
                            fill="white" />
                    </svg>
                    <span>Create GRN</span>
                </RouterLink>
            </template>
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
                <span v-else-if="col.props.column.field === 'actions'">
                    <TableActionDropdown :rowData="col.props.row" :key="col.props.row.id">
                        <template #default="{ selectedItem, closeDropdown }">
                            <router-link :to="{ name: 'inbound.grn.show', params: { id: selectedItem.id } }"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <LucideEye class="w-4 h-4" />
                                View GRN
                            </router-link>
                            <router-link
                                :to="{ name: 'inbound.purchase_orders.show', params: { id: selectedItem.purchase_order_id } }"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <LucideEye class="w-4 h-4" />
                                View Purchase Order
                            </router-link>

                            <li v-if="col.props.row.assigned_to == null"
                                @click="assign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 6.5C20 5.94772 19.5523 5.5 19 5.5C18.4477 5.5 18 5.94772 18 6.5V10.5C18 11.0523 18.4477 11.5 19 11.5C19.5523 11.5 20 11.0523 20 10.5V6.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M21 7.5H17C16.4477 7.5 16 7.94772 16 8.5C16 9.05228 16.4477 9.5 17 9.5H21C21.5523 9.5 22 9.05228 22 8.5C22 7.94772 21.5523 7.5 21 7.5Z"
                                        fill="#626F86" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                                        fill="#626F86" />
                                </svg>
                                Assign to me
                            </li>
                            <li v-if="col.props.row.assigned_to != null"
                                @click="unassign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer hover:bg-gray-100 medium-text border-y">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M20.99 6.5C20.9909 6.62978 20.9661 6.75846 20.917 6.8786C20.8679 6.99874 20.7955 7.10798 20.704 7.2L19.371 8.469L20.655 9.769C20.7934 9.88673 20.8964 10.0406 20.9526 10.2133C21.0088 10.3861 21.0159 10.5711 20.9732 10.7477C20.9305 10.9243 20.8396 11.0856 20.7107 11.2137C20.5818 11.3417 20.4199 11.4315 20.243 11.473C20.0663 11.5152 19.8814 11.5079 19.7085 11.452C19.5357 11.3961 19.3815 11.2937 19.263 11.156L17.287 9.187C17.1034 9.00291 17.0003 8.75351 17.0003 8.4935C17.0003 8.23349 17.1034 7.98409 17.287 7.8L19.322 5.772C19.463 5.63804 19.6403 5.54858 19.8319 5.51479C20.0234 5.481 20.2207 5.50437 20.399 5.582C20.764 5.742 20.996 6.104 20.99 6.5ZM5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                                        fill="#626F86" />
                                </svg>
                                Unassign
                            </li>
                            <router-link :to="{ name: 'inbound.grn.edit', params: { id: selectedItem.id } }"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.01977 19.73C3.98666 19.892 3.99423 20.0597 4.04181 20.218C4.08939 20.3764 4.17549 20.5205 4.29241 20.6374C4.40932 20.7543 4.5534 20.8404 4.71175 20.888C4.8701 20.9355 5.03777 20.9431 5.19977 20.91L9.00977 20.13L4.79977 15.92L4.01977 19.73ZM9.94077 17.11L7.82077 14.99L16.3058 6.5H16.3078L18.4288 8.621L9.93977 17.111L9.94077 17.11ZM19.8438 7.207L17.7238 5.085C17.5379 4.89908 17.3171 4.7517 17.0741 4.65131C16.8311 4.55092 16.5707 4.4995 16.3078 4.5C15.7958 4.5 15.2838 4.695 14.8928 5.085L5.13577 14.843L10.0858 19.793L19.8428 10.035C20.2177 9.65995 20.4283 9.15133 20.4283 8.621C20.4283 8.09068 20.2177 7.58206 19.8428 7.207H19.8438Z"
                                        fill="#626F86" />
                                </svg>
                                Edit
                            </router-link>
                            <a :href="selectedItem.download_url" target="__blank" @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                                        fill="#626F86" />
                                    <path
                                        d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                                        fill="#626F86" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                                        fill="#626F86" />
                                </svg>

                                Download GRN
                            </a>
                            <a :href="selectedItem.purchase_order?.download_url" target="__blank"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                                        fill="#626F86" />
                                    <path
                                        d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                                        fill="#626F86" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                                        fill="#626F86" />
                                </svg>

                                Download Purchase Order
                            </a>
                            <li @click="showDeleteWarning(selectedItem); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                                        fill="#626F86" />
                                </svg>

                                Delete
                            </li>
                            <!-- <router-link
                                :to="{ name: 'admin.invoices.approve', params: { id: selectedItem.id }, query: { approve: 1 } }"
                                v-if="selectedItem.confirmed_at == null" @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.73488 12.822C6.55434 12.63 6.30529 12.5171 6.04189 12.5077C5.77849 12.4983 5.52205 12.5933 5.32832 12.772C5.13459 12.9507 5.01924 13.1987 5.00736 13.462C4.99549 13.7253 5.08803 13.9826 5.26488 14.178L8.87688 18.097C9.41388 18.623 10.2139 18.623 10.7109 18.127L11.0749 17.768C12.3894 16.4753 13.7024 15.1809 15.0139 13.885L15.0539 13.845C16.2796 12.6371 17.4989 11.4228 18.7119 10.202C18.8932 10.0122 18.9926 9.75878 18.9886 9.49634C18.9847 9.23391 18.8777 8.98354 18.6908 8.79926C18.5039 8.61499 18.2521 8.51158 17.9896 8.51135C17.7271 8.51113 17.4751 8.6141 17.2879 8.79805C16.0805 10.0124 14.8672 11.2207 13.6479 12.423L13.6079 12.463C12.3512 13.7053 11.0928 14.946 9.83288 16.185L6.73488 12.822Z"
                                        fill="#626F86" />
                                </svg>

                                Confirm
                            </router-link> -->
                            <!-- <router-link
                                :to="{ name: 'inbound.purchase_orders.edit', params: { id: selectedItem.id }, query: { approve: 1 } }"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <LucideCheck class="w-4 h-4" />
                                Confirm
                            </router-link>
                            <router-link
                                :to="{ name: 'inbound.purchase_orders.edit', params: { id: selectedItem.id }, query: { approve: 1 } }"
                                @click="closeDropdown()" as="li"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <LucideCheck class="w-4 h-4" />
                                Process Return
                            </router-link>
                            <li @click="deleteInvoice(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <LucideTrash class="w-4 h-4" />
                                Delete
                            </li>
                            <li v-if="col.props.row.assigned_to == null"
                                @click="assign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer border-y hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 6.5C20 5.94772 19.5523 5.5 19 5.5C18.4477 5.5 18 5.94772 18 6.5V10.5C18 11.0523 18.4477 11.5 19 11.5C19.5523 11.5 20 11.0523 20 10.5V6.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M21 7.5H17C16.4477 7.5 16 7.94772 16 8.5C16 9.05228 16.4477 9.5 17 9.5H21C21.5523 9.5 22 9.05228 22 8.5C22 7.94772 21.5523 7.5 21 7.5Z"
                                        fill="#626F86" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                                        fill="#626F86" />
                                </svg>
                                Assign to me
                            </li>
                            <li v-if="col.props.row.assigned_to != null"
                                @click="assign(col.props.row.id); closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 border-gray-400 cursor-pointer hover:bg-gray-100 medium-text border-y">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M20.99 6.5C20.9909 6.62978 20.9661 6.75846 20.917 6.8786C20.8679 6.99874 20.7955 7.10798 20.704 7.2L19.371 8.469L20.655 9.769C20.7934 9.88673 20.8964 10.0406 20.9526 10.2133C21.0088 10.3861 21.0159 10.5711 20.9732 10.7477C20.9305 10.9243 20.8396 11.0856 20.7107 11.2137C20.5818 11.3417 20.4199 11.4315 20.243 11.473C20.0663 11.5152 19.8814 11.5079 19.7085 11.452C19.5357 11.3961 19.3815 11.2937 19.263 11.156L17.287 9.187C17.1034 9.00291 17.0003 8.75351 17.0003 8.4935C17.0003 8.23349 17.1034 7.98409 17.287 7.8L19.322 5.772C19.463 5.63804 19.6403 5.54858 19.8319 5.51479C20.0234 5.481 20.2207 5.50437 20.399 5.582C20.764 5.742 20.996 6.104 20.99 6.5ZM5 14.5C5 13.395 5.902 12.5 7.009 12.5H14.991C16.101 12.5 17 13.394 17 14.506V18.946C17 22.351 5 22.351 5 18.946V14.5Z"
                                        fill="#626F86" />
                                    <path
                                        d="M11 11.5C13.2091 11.5 15 9.70914 15 7.5C15 5.29086 13.2091 3.5 11 3.5C8.79086 3.5 7 5.29086 7 7.5C7 9.70914 8.79086 11.5 11 11.5Z"
                                        fill="#626F86" />
                                </svg>
                                Unassign
                            </li> -->
                            <!-- <a :href="col.props.row.download_url" target="__blank" @click="closeDropdown()"
                                class="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 medium-text">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.687 17.792C10.5956 17.6997 10.4868 17.6264 10.3669 17.5764C10.247 17.5264 10.1184 17.5007 9.9885 17.5007C9.8586 17.5007 9.72998 17.5264 9.61009 17.5764C9.49019 17.6264 9.3814 17.6997 9.29 17.792C9.10466 17.9792 9.0007 18.232 9.0007 18.4955C9.0007 18.759 9.10466 19.0118 9.29 19.199L11.254 21.179C11.3546 21.2807 11.4744 21.3613 11.6064 21.4164C11.7384 21.4715 11.88 21.4998 12.023 21.4998C12.166 21.4998 12.3076 21.4715 12.4396 21.4164C12.5716 21.3613 12.6914 21.2807 12.792 21.179L14.711 19.246C14.8966 19.0587 15.0008 18.8057 15.0008 18.542C15.0008 18.2783 14.8966 18.0253 14.711 17.838C14.6196 17.7455 14.5107 17.6721 14.3907 17.622C14.2708 17.5719 14.142 17.5462 14.012 17.5462C13.882 17.5462 13.7532 17.5719 13.6333 17.622C13.5133 17.6721 13.4044 17.7455 13.313 17.838L12.023 19.138L10.687 17.792Z"
                                        fill="#626F86" />
                                    <path
                                        d="M13.001 20.493L13 10.506C13 9.951 12.552 9.5 12 9.5C11.448 9.5 11 9.95 11 10.507L11.001 20.494C11.001 21.049 11.449 21.5 12.001 21.5C12.553 21.5 13.001 21.05 13.001 20.493Z"
                                        fill="#626F86" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.938 5.98C7.68111 5.9383 7.42125 5.91757 7.161 5.918C4.356 5.918 2 8.12 2 10.998C2 13.909 4.385 16.5 7.1 16.5H9.981V14.507H7.1C5.443 14.507 3.985 12.844 3.985 10.999C3.985 9.221 5.454 7.912 7.089 7.912H7.101C7.49 7.912 7.787 7.962 8.071 8.062L8.241 8.125C8.846 8.373 9.116 7.879 9.116 7.879L9.266 7.612C9.996 6.265 11.467 5.516 12.982 5.492C13.9871 5.50203 14.9543 5.87742 15.703 6.54812C16.4517 7.21882 16.9309 8.13901 17.051 9.137L17.097 9.477C17.097 9.477 17.168 10.002 17.762 10.002C17.775 10.002 17.774 10.007 17.785 10.007H18.039C19.175 10.007 20.015 10.966 20.015 12.165C20.015 13.372 19.028 14.507 17.945 14.507H13.981V16.5H17.945C20.105 16.5 22 14.455 22 12.165C22 10.165 20.688 8.502 18.862 8.091C18.155 5.384 15.809 3.539 12.976 3.5C11.001 3.52 9.075 4.4 7.938 5.98Z"
                                        fill="#626F86" />
                                </svg>
                                Download Purchase Order
                            </a> -->
                        </template>
                    </TableActionDropdown>
                </span>
                <span v-else-if="col.props.column.field === 'purchase_order.order_no'">
                    <router-link :to="{ name: 'inbound.purchase_orders.show', params: { id: col.props.row.id } }">
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </router-link>
                </span>
                <span v-else>
                    {{ col.props.formattedRow[col.props.column.field] }}
                </span>
            </template>
        </Datatable>

        <!-- discard delete unconfirmed grn modal -->
        <UniversalCenteredModal :show="showDiscardDeleteGrnWarningModal"
            @close="showDiscardDeleteGrnWarningModal = false">
            <template #header>
                <span class="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z"
                            fill="#C9372C" />
                    </svg>

                    <h3>Delete</h3>
                </span>
            </template>

            <template #body>
                <p class="discard_merge_alert_body_text">
                    You are about to delete this GRN <strong>“{{ grnDeleteFormData?.doc_no }}”</strong>. This
                    action will permanently remove it from the system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">
                    <button @click="showDiscardDeleteGrnWarningModal = false" type="button" class="cancel_btn">
                        Cancel
                    </button>
                    <button @click="deleteInvoice" type="button" class="text-white delete_btn">
                        Delete GRN
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>

        <!-- deleted grn success message modal -->
        <UniversalCenteredModal :show="showDeletedGrnSuccessModal" @close="discardDeleteGrn">
            <template #body>
                <div class="flex justify-center my-6">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
                            fill="#22A06B" />
                        <path
                            d="M18.7827 28.5635C18.4668 28.2275 18.031 28.0298 17.57 28.0134C17.1091 27.997 16.6603 28.1632 16.3213 28.476C15.9822 28.7887 15.7804 29.2226 15.7596 29.6834C15.7388 30.1442 15.9008 30.5945 16.2102 30.9365L22.5312 37.7947C23.471 38.7152 24.871 38.7152 25.7407 37.8472L26.3777 37.219C28.6782 34.9566 30.9759 32.6915 33.271 30.4237L33.341 30.3537C35.486 28.2399 37.6198 26.1147 39.7425 23.9785C40.0597 23.6463 40.2337 23.2028 40.2268 22.7435C40.2199 22.2842 40.0327 21.8461 39.7056 21.5236C39.3786 21.2011 38.9378 21.0202 38.4785 21.0198C38.0192 21.0194 37.5781 21.1996 37.2505 21.5215C35.1377 23.6466 33.0143 25.7612 30.8805 27.8652L30.8105 27.9352C28.6112 30.1093 26.4091 32.2804 24.2042 34.4487L18.7827 28.5635Z"
                            fill="white" />
                    </svg>
                </div>
                <h3 class="text-center">GRN Deleted</h3>
                <p class="text-center discard_merge_alert_body_text">
                    The GRN <strong>“{{ grnDeleteFormData?.doc_no }}”</strong> has been successfully deleted from the
                    system.
                </p>
            </template>

            <template #footer>
                <div class="flex justify-end space-x-3 discard_merge_alert_footer">

                    <button @click="discardDeleteGrn" type="button" class="text-white approve_btn">
                        Done
                    </button>
                </div>
            </template>
        </UniversalCenteredModal>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import { RouterLink } from 'vue-router';
import { toLocale } from '@/views/helpers/useLocale.js';
import { TableColumn, FilterField, FilterFields } from "@/types";
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import axios from 'axios';
import { useToast } from "vue-toastification";
import { LucideEye } from 'lucide-vue-next'
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import UniversalCenteredModal from '@/views/Components/UniversalCenteredModal.vue';
import { useAuthStore } from '@/stores/auth';

onMounted(() => {
    fetchInboundType()
})


const unconfirmed_grn_url = import.meta.env.VITE_API_URL + 'invoices?type=unconfirmed';
const unconfirmedGrnColumns = ref<TableColumn[]>([
    {
        label: 'Order No.',
        field: 'purchase_order.order_no',
        sortable: false,
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
        label: 'Type',
        field: 'purchase_order.type',
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
    },
    {
        label: 'Action',
        field: 'actions',
        sortable: false,
    },
]);
const showDiscardDeleteGrnWarningModal = ref(false);
const inbound_types = ref([]);
const getTypes = computed(() => inbound_types.value)

const filterField = ref<FilterFields<FilterField>>({
    "type": {
        label: "Type",
        field: "type",
        type: "select",
        get options() {
            return getTypes.value
        }
    },
})

const statusClasses = {
    Enabled: "bg-green-100 text-green-800",
    Disabled: "bg-red-100 text-red-800",
};
const grnDeleteFormData = ref(null);
const showDeletedGrnSuccessModal = ref(false);
const loading = ref(false);
const assigning = ref(false);
const childKey = ref(1111);
const toast = useToast();
const authStore = useAuthStore();


const showDeleteWarning = (grn) => {
    grnDeleteFormData.value = grn;
    showDiscardDeleteGrnWarningModal.value = true;
}
const discardDeleteGrn = () => {
    grnDeleteFormData.value = null;
    showDiscardDeleteGrnWarningModal.value = false;
}


const assign = (id) => {
    if (assigning.value) return;
    assigning.value = true;
    axios.post(import.meta.env.VITE_API_URL + `invoices/${id}/assign?current_branch=${authStore.selectedBranch?.id}`).then(res => {
        toast.success("GRN assigned to you successfully!");
        childKey.value++;
    }).catch(err => {
        error(err);
    }).finally(() => assigning.value = false);
}
const unassign = (id) => {
    if (assigning.value) return;
    assigning.value = true;
    axios.post(import.meta.env.VITE_API_URL + `invoices/${id}/unassign?current_branch=${authStore.selectedBranch?.id}`).then(res => {
        toast.success("GRN unassigned successfully!");
        childKey.value++;
    }).catch(err => {
        error(err);
    }).finally(() => assigning.value = false);
}

const deleteInvoice = () => {
    if (grnDeleteFormData.value) {
        toast.error('No GRN Selected!');
        return;
    }
    loading.value = true;
    showDiscardDeleteGrnWarningModal.value = false;
    axios.delete(import.meta.env.VITE_API_URL + "invoices/" + grnDeleteFormData.value.id).then(response => {
        toast.success("GRN Deleted Successfully");
        childKey.value++;
        showDeletedGrnSuccessModal.value = true;
    }).catch(err => {
        let errorMessage = "";
        if (err.response.data.error != undefined) {
            errorMessage = "<p>" + err.response.data.error.join("</p><p>") + "</p>";
        } else errorMessage = "Error deleting GRN!"
        toast.error(errorMessage);
    })
        .finally(() => loading.value = false);
}


const fetchInboundType = () => {
    axios.get(import.meta.env.VITE_API_URL + 'invoices/inbound_types').then(res => {
        inbound_types.value = res.data;
    }).catch(err => {
        toast.error("Error loading inbound types!");
    });
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
.erp_dashboard_wrapper .create_btn {
    background: rgba(12, 102, 228, 1);
    border-radius: 6px;
}

.discard_merge_alert_footer .cancel_btn {
    background: rgba(9, 30, 66, 0.06);
}

.discard_merge_alert_footer .approve_btn {
    background: rgba(12, 102, 228, 1);
    color: white;
}

.discard_merge_alert_footer .delete_btn {
    background: rgba(201, 55, 44, 1);
    color: white;
}

.discard_merge_alert_footer .discard_btn {
    background: rgba(245, 205, 71, 1);
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
</style>