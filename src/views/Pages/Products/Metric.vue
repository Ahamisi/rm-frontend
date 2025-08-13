<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="product_metrics">
        <div class="px-6 py-4 bg-white ">
            <DateFilter @dateFiltered="filtered" />

            <!-- <button class="flex items-center gap-1 download_btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z"
                        fill="white" />
                    <path
                        d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z"
                        fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z"
                        fill="white" />
                </svg>
                <span>Download Report</span>
            </button> -->
        </div>

        <div class="flex flex-col gap-4 p-6 xl:flex-row sm:gap-6 bg-[#f9fafb]">
            <div class="flex-wrap flex-1">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <!-- Average Daily Sales -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-3 card-header">Average Daily Sales</div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ metrics.average_daily_sales }}</h3>
                                    <div class="flex items-center interest-flow"
                                        :class="{ 'increase': parseFloat(metrics.average_daily_sales_percentage) > 0, 'decrease': parseFloat(metrics.average_daily_sales_percentage) < 0 }">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            v-if="parseFloat(metrics.average_daily_sales_percentage) > 0"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.52863 3.52865L3.86197 7.19465C3.73711 7.31987 3.66699 7.48948 3.66699 7.66632C3.66699 7.84315 3.73711 8.01276 3.86197 8.13798C3.92382 8.19995 3.99729 8.2491 4.07817 8.28265C4.15905 8.31619 4.24574 8.33345 4.3333 8.33345C4.42085 8.33345 4.50755 8.31619 4.58843 8.28265C4.6693 8.2491 4.74277 8.19995 4.80463 8.13798L7.3333 5.60932V12C7.3333 12.1768 7.40354 12.3464 7.52856 12.4714C7.65358 12.5964 7.82315 12.6666 7.99997 12.6666C8.17678 12.6666 8.34635 12.5964 8.47137 12.4714C8.59639 12.3464 8.66663 12.1768 8.66663 12V5.60932L11.1953 8.13798C11.2572 8.19988 11.3308 8.24897 11.4117 8.28245C11.4926 8.31593 11.5793 8.33315 11.6669 8.33312C11.7544 8.33309 11.8411 8.31581 11.922 8.28227C12.0029 8.24873 12.0764 8.19959 12.1383 8.13765C12.2002 8.07571 12.2493 8.00218 12.2828 7.92127C12.3162 7.84036 12.3335 7.75365 12.3334 7.66608C12.3334 7.57851 12.3161 7.49181 12.2826 7.41092C12.249 7.33004 12.1999 7.25655 12.138 7.19465L8.4713 3.52865C8.40956 3.46653 8.33611 3.41728 8.25521 3.38375C8.1743 3.35022 8.08754 3.33308 7.99997 3.33332C7.91239 3.33308 7.82563 3.35022 7.74472 3.38375C7.66382 3.41728 7.59037 3.46653 7.52863 3.52865Z"
                                                fill="#216E4E" />
                                        </svg>
                                        <!-- <span v-else-if="parseFloat(metrics.average_daily_sales_percentage) < 0">-</span> -->
                                        <span>{{ metrics.average_daily_sales_percentage }}%</span>
                                    </div>
                                </div>
                                <small class="card-description">Compared to last month</small>
                            </div>

                            <div class="interest-container">
                                <svg width="41" height="29" viewBox="0 0 41 29" fill="none"
                                    v-if="parseFloat(metrics.average_daily_sales_percentage) > 0"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z"
                                        fill="url(#paint0_linear_4412_75696)" />
                                    <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75696" x1="20.5" y1="1" x2="20.5" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#22A06B" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#22A06B" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <svg v-else-if="parseFloat(metrics.average_daily_sales_percentage) < 0" width="42"
                                    height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z"
                                        fill="url(#paint0_linear_4412_75708)" />
                                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#C9372C" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75708" x1="21" y1="1" x2="21" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#C9372C" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#C9372C" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Average Monthly Sales -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-3 card-header">Average Monthly Sales</div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ metrics.average_monthly_sales }}</h3>
                                    <div class="flex items-center interest-flow"
                                        :class="{ 'increase': parseFloat(metrics.average_monthly_sales_percentage) > 0, 'decrease': parseFloat(metrics.average_daily_sales_percentage) < 0 }">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            v-if="parseFloat(metrics.average_monthly_sales_percentage) > 0"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.52863 3.52865L3.86197 7.19465C3.73711 7.31987 3.66699 7.48948 3.66699 7.66632C3.66699 7.84315 3.73711 8.01276 3.86197 8.13798C3.92382 8.19995 3.99729 8.2491 4.07817 8.28265C4.15905 8.31619 4.24574 8.33345 4.3333 8.33345C4.42085 8.33345 4.50755 8.31619 4.58843 8.28265C4.6693 8.2491 4.74277 8.19995 4.80463 8.13798L7.3333 5.60932V12C7.3333 12.1768 7.40354 12.3464 7.52856 12.4714C7.65358 12.5964 7.82315 12.6666 7.99997 12.6666C8.17678 12.6666 8.34635 12.5964 8.47137 12.4714C8.59639 12.3464 8.66663 12.1768 8.66663 12V5.60932L11.1953 8.13798C11.2572 8.19988 11.3308 8.24897 11.4117 8.28245C11.4926 8.31593 11.5793 8.33315 11.6669 8.33312C11.7544 8.33309 11.8411 8.31581 11.922 8.28227C12.0029 8.24873 12.0764 8.19959 12.1383 8.13765C12.2002 8.07571 12.2493 8.00218 12.2828 7.92127C12.3162 7.84036 12.3335 7.75365 12.3334 7.66608C12.3334 7.57851 12.3161 7.49181 12.2826 7.41092C12.249 7.33004 12.1999 7.25655 12.138 7.19465L8.4713 3.52865C8.40956 3.46653 8.33611 3.41728 8.25521 3.38375C8.1743 3.35022 8.08754 3.33308 7.99997 3.33332C7.91239 3.33308 7.82563 3.35022 7.74472 3.38375C7.66382 3.41728 7.59037 3.46653 7.52863 3.52865Z"
                                                fill="#216E4E" />
                                        </svg>
                                        <!-- <span v-else-if="parseFloat(metrics.average_monthly_sales_percentage) < 0">-</span> -->
                                        <span>{{ metrics.average_monthly_sales_percentage }}%</span>
                                    </div>
                                </div>
                                <small class="card-description">Compared to last month</small>
                            </div>

                            <div class="interest-container">
                                <svg width="41" height="29" viewBox="0 0 41 29" fill="none"
                                    v-if="parseFloat(metrics.average_monthly_sales_percentage) > 0"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z"
                                        fill="url(#paint0_linear_4412_75696)" />
                                    <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75696" x1="20.5" y1="1" x2="20.5" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#22A06B" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#22A06B" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <svg v-else-if="parseFloat(metrics.average_monthly_sales_percentage) < 0" width="42"
                                    height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z"
                                        fill="url(#paint0_linear_4412_75708)" />
                                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#C9372C" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75708" x1="21" y1="1" x2="21" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#C9372C" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#C9372C" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Margin -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-3 card-header">
                                    <span>Margin</span>
                                    <span class="p-1 rounded invoice_total">₦{{ metrics.margin }}</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ metrics.margin_percentage }}</h3>
                                    <div class="flex items-center interest-flow"
                                        :class="{ 'increase': parseFloat(metrics.margin_percentage) > 0, 'decrease': parseFloat(metrics.average_daily_sales_percentage) < 0 }">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            v-if="parseFloat(metrics.margin_percentage) > 0"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.52863 3.52865L3.86197 7.19465C3.73711 7.31987 3.66699 7.48948 3.66699 7.66632C3.66699 7.84315 3.73711 8.01276 3.86197 8.13798C3.92382 8.19995 3.99729 8.2491 4.07817 8.28265C4.15905 8.31619 4.24574 8.33345 4.3333 8.33345C4.42085 8.33345 4.50755 8.31619 4.58843 8.28265C4.6693 8.2491 4.74277 8.19995 4.80463 8.13798L7.3333 5.60932V12C7.3333 12.1768 7.40354 12.3464 7.52856 12.4714C7.65358 12.5964 7.82315 12.6666 7.99997 12.6666C8.17678 12.6666 8.34635 12.5964 8.47137 12.4714C8.59639 12.3464 8.66663 12.1768 8.66663 12V5.60932L11.1953 8.13798C11.2572 8.19988 11.3308 8.24897 11.4117 8.28245C11.4926 8.31593 11.5793 8.33315 11.6669 8.33312C11.7544 8.33309 11.8411 8.31581 11.922 8.28227C12.0029 8.24873 12.0764 8.19959 12.1383 8.13765C12.2002 8.07571 12.2493 8.00218 12.2828 7.92127C12.3162 7.84036 12.3335 7.75365 12.3334 7.66608C12.3334 7.57851 12.3161 7.49181 12.2826 7.41092C12.249 7.33004 12.1999 7.25655 12.138 7.19465L8.4713 3.52865C8.40956 3.46653 8.33611 3.41728 8.25521 3.38375C8.1743 3.35022 8.08754 3.33308 7.99997 3.33332C7.91239 3.33308 7.82563 3.35022 7.74472 3.38375C7.66382 3.41728 7.59037 3.46653 7.52863 3.52865Z"
                                                fill="#216E4E" />
                                        </svg>
                                        <span v-else-if="parseFloat(metrics.margin_percentage) < 0">-</span>
                                        <span>{{ metrics.margin_percentage }}%</span>
                                    </div>
                                </div>
                                <small class="card-description">Compared to last month</small>
                            </div>

                            <div class="interest-container">
                                <svg width="41" height="29" viewBox="0 0 41 29" fill="none"
                                    v-if="parseFloat(metrics.margin_percentage) > 0" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.2692 1L0.5 11.6144V29H40.5V1L28.1923 11.6144L19.2692 1Z"
                                        fill="url(#paint0_linear_4412_75696)" />
                                    <path d="M0.5 11.6144L19.2692 1L28.1923 11.6144L40.5 1" stroke="#22A06B" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75696" x1="20.5" y1="1" x2="20.5" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#22A06B" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#22A06B" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <svg v-else-if="parseFloat(metrics.margin_percentage) < 0" width="42" height="29"
                                    viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7692 1L1 11.6144V29H41V1L28.6923 11.6144L19.7692 1Z"
                                        fill="url(#paint0_linear_4412_75708)" />
                                    <path d="M1 11.6144L19.7692 1L28.6923 11.6144L41 1" stroke="#C9372C" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4412_75708" x1="21" y1="1" x2="21" y2="29"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#C9372C" stop-opacity="0.2" />
                                            <stop offset="1" stop-color="#C9372C" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Cost Price -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-6 card-header">
                                    <span>Cost Price</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">₦{{ product?.unit_cost }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Selling Price -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-6 card-header">
                                    <span>Selling Price</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">₦{{ product?.price_per_pack }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quantity per Roll/Pack -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-6 card-header">
                                    <span>Quantity per Roll/Pack</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ product?.quantity_per_roll }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quantity per Carton -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-6 card-header">
                                    <span>Quantity per Carton</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ product?.quantity_per_carton }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- On Hand -->
                    <div class="bg-white rounded-lg card">
                        <div class="flex items-center justify-between gap-2">
                            <div class="card-details">
                                <div class="mb-6 card-header">
                                    <span>On Hand</span>
                                </div>
                                <div class="flex items-baseline gap-x-2 values">
                                    <h3 class="total">{{ product?.quantity_available }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Last Procurement Date -->
                        <div class="bg-white rounded-lg card">
                            <div class="flex items-center justify-between gap-2">
                                <div class="card-details">
                                    <div class="mb-6 card-header">
                                        <span>Last Procurement Date</span>
                                    </div>
                                    <div class="flex items-baseline gap-x-2 values">
                                        <h3 class="total">{{ metrics.last_procurement_date }}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Last Order Date -->
                        <div class="bg-white rounded-lg card">
                            <div class="flex items-center justify-between gap-2">
                                <div class="card-details">
                                    <div class="mb-6 card-header">
                                        <span>Last Order Date</span>
                                    </div>
                                    <div class="flex items-baseline gap-x-2 values">
                                        <h3 class="total">{{ metrics.last_ordered_date }}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sales Graph Chart -->
                <div class="my-4 bg-white rounded-lg card graph">
                    <div class="">
                        <div class="flex justify-between gap-4 p-4 pb-0 card-header">
                            <h3 class="mb-4 ">Sales Graph</h3>
                            <div class="flex items-center gap-2">
                                <label>Year: </label>
                                <select name="" id="" v-model="salesYear" @change="getSales"
                                    class="w-16 px-3 py-2 text-xs border rounded h-fit">
                                    <option v-for="(year, index) in rangeOfYears()" :key="`sale_year_${index}`"
                                        :value="year">
                                        {{ year }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="relative h-96">
                            <canvas ref="salesChart" class="w-full h-full"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Purchase Graph Chart -->
                <div class="my-4 bg-white rounded-lg card graph">
                    <div class="">
                        <div class="flex justify-between gap-4 p-4 pb-0 card-header">
                            <h3 class="mb-4">Purchase Graph</h3>

                            <div class="flex items-center gap-2">
                                <label>Year: </label>

                                <select name="" id="" v-model="purchaseYear" @change="getPurchases"
                                    class="w-16 px-3 py-2 text-xs border rounded h-fit">
                                    <option v-for="(year, index) in rangeOfYears()" :key="`purchase_year_${index}`"
                                        :value="year">
                                        {{ year }}</option>
                                </select>

                            </div>

                        </div>
                        <div class="relative h-96">
                            <canvas ref="purchasesChart" class="w-full h-full"></canvas>
                        </div>
                    </div>
                </div>

            </div>


            <!-- recent activities -->
            <div class="attention-container h-fit xl:w-[389px] w-full card bg-white rounded-lg">
                <h3 class="mb-4 title">Recent Activities</h3>
                <div class="rounded-lg invoice_stats_container">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-[rgba(247,248,249,1)]">
                                <th class="px-4 py-2 text-left rounded-tl-md">Activity</th>
                                <th class="px-4 py-2 text-left">Quantity</th>
                                <th class="px-4 py-2 text-left rounded-tr-md">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Invoice</td>
                                <td>{{ toLocale(metrics.invoice.total_quantity) }}</td>
                                <td>₦{{ toLocale(metrics.invoice.total_amount) }}</td>
                            </tr>
                            <tr>
                                <td>Product Returns</td>
                                <td>{{ toLocale(metrics.product_returns.total_quantity) }}</td>
                                <td>₦{{ toLocale(metrics.product_returns.total_amount) }}</td>
                            </tr>
                            <tr>
                                <td>Supplier Returns</td>
                                <td>{{ toLocale(metrics.supplier_returns.total_quantity) }}</td>
                                <td>₦{{ toLocale(metrics.supplier_returns.total_amount) }}</td>
                            </tr>
                            <tr>
                                <td>Product Damages</td>
                                <td>{{ toLocale(metrics.product_damages.total_quantity) }}</td>
                                <td>₦{{ toLocale(metrics.product_damages.total_amount) }}</td>
                            </tr>
                            <tr>
                                <td>On Hand</td>
                                <td>{{ toLocale(product?.quantity_available) }}</td>
                                <td>₦{{ toLocale(product?.quantity_available * product?.price_per_pack) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>

</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import DateFilter from '@/views/Components/Dashboards/DateFilter.vue';
import { toLocale } from '@/views/helpers/useLocale.js';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(...Chart.registerables);

interface Props {
    productId: number
}


onMounted(() => {
    if (props.productId) {
        fetchProductMetrics()
        getSales();
        getPurchases();
    }
    createSalesChart();
    createPurchasesChart();
})


const props = defineProps<Props>();

watch(() => props.productId, (newVal) => {
    if (newVal) {
        fetchProductMetrics()
    }
}, { deep: true })

const loading = ref(false);
const toast = useToast();
const dateFilter = ref({
    from_date: '',
    to_date: ''
})
const salesYear = ref(new Date().getFullYear())
const salesMonth = ref('')

const purchaseYear = ref(new Date().getFullYear())
const purchaseMonth = ref('')
const purchaseAnalytics = ref({
    purchases: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    quantity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
})

const metrics = ref({
    total_sales: 0,
    average_daily_sales: 0,
    average_monthly_sales: 0,
    average_daily_sales_percentage: 0,
    average_monthly_sales_percentage: 0,
    last_ordered_date: '',
    last_procurement_date: '',
    margin: 0,
    margin_percentage: 0,
    product_returns: {
        total_quantity: 0,
        total_amount: 0
    },
    invoice: {
        total_quantity: 0,
        total_amount: 0,
    },
    supplier_returns: {
        total_quantity: 0,
        total_amount: 0
    },
    product_damages: {
        total_quantity: 0,
        total_amount: 0
    },
});

const product = ref({
    id: 0,
    name: '',
    quantity_available: 0,
    unit_cost: 0,
    quantity_per_carton: 0,
    quantity_per_roll: 0,
    price_per_pack: 0,
    manufacturer: {
        id: 0,
        display_name: '',
    }
})
const months = ref([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
])
const salesAnalytics = ref({
    sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    quantity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
})
const getPurchasesChartData = computed(() => {
    const data = [];
    for (let i = 0; i < months.value.length; i++) {
        data.push({
            month: months.value[i],
            purchases: parseFloat(purchaseAnalytics.value.purchases[i]),
            quantity: parseInt(purchaseAnalytics.value.quantity[i])
        });
    }
    return data;
});

const getSalesChartData = computed(() => {
    const data = [];
    for (let i = 0; i < months.value.length; i++) {
        data.push({
            month: months.value[i],
            sales: parseFloat(salesAnalytics.value.sales[i]),
            quantity: parseInt(salesAnalytics.value.quantity[i])
        });
    }
    return data;
});

watch(getSalesChartData, () => {
    createSalesChart();
});

watch(getPurchasesChartData, () => {
    createPurchasesChart();
});

const salesChart = ref(null);
let chartSalesInstance = null;
const purchasesChart = ref(null);
let chartPurchasesInstance = null;

const createSalesChart = async () => {
    if (!salesChart.value) return;

    // Destroy existing chart if it exists
    if (chartSalesInstance) {
        chartSalesInstance.destroy();
    }

    const ctx = salesChart.value.getContext('2d');

    // Sample data - replace with your actual monthly sales data
    const monthlyData = getSalesChartData.value

    chartSalesInstance = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.map(item => item.month),
            datasets: [{
                label: 'Total Sales per Month',
                data: monthlyData.map(item => item.sales),
                backgroundColor: 'rgba(108, 136, 255, 1)',
                borderColor: 'rgba(108, 136, 255, 1)',
                borderWidth: 0,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        callback: function (value) {
                            return value >= 1000 ? (value / 1000) + 'k' : value;
                        }
                    },
                    title: {
                        display: true,
                        text: 'Amount in Naira (₦)',
                        color: '#374151',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#374151',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(55, 65, 81, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#6b7280',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function (context) {
                            const dataIndex = context[0].dataIndex;
                            const monthData = monthlyData[dataIndex];
                            return `${monthData.month} 2025`;
                        },
                        label: function (context) {
                            const dataIndex = context.dataIndex;
                            const monthData = monthlyData[dataIndex];
                            return [
                                `Total Sales: ₦${context.parsed.y.toLocaleString()}`,
                                `Quantity: ${monthData.quantity.toLocaleString()}`
                            ];
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
};

const createPurchasesChart = async () => {
    if (!purchasesChart.value) return;

    // Destroy existing chart if it exists
    if (chartPurchasesInstance) {
        chartPurchasesInstance.destroy();
    }

    const ctx = purchasesChart.value.getContext('2d');

    // Sample data - replace with your actual monthly purchases data
    const monthlyData = getSalesChartData.value

    chartPurchasesInstance = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.map(item => item.month),
            datasets: [{
                label: 'Total Purchases per Month',
                data: monthlyData.map(item => item.purchases),
                backgroundColor: '#fb9999',
                borderColor: '#fb9999',
                borderWidth: 0,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        callback: function (value) {
                            return value >= 1000 ? (value / 1000) + 'k' : value;
                        }
                    },
                    title: {
                        display: true,
                        text: 'Amount in Naira (₦)',
                        color: '#374151',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#374151',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(55, 65, 81, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#6b7280',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function (context) {
                            const dataIndex = context[0].dataIndex;
                            const monthData = monthlyData[dataIndex];
                            return `${monthData.month} 2025`;
                        },
                        label: function (context) {
                            const dataIndex = context.dataIndex;
                            const monthData = monthlyData[dataIndex];
                            return [
                                `Total Purchases: ₦${context.parsed.y.toLocaleString()}`,
                                `Quantity: ${monthData.quantity.toLocaleString()}`
                            ];
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
};

// Cleanup chart on component unmount
onBeforeUnmount(() => {
    if (chartSalesInstance) chartSalesInstance.destroy();
    if (chartPurchasesInstance) chartPurchasesInstance.destroy();
});

const rangeOfYears = () => {
    let currentYear = new Date().getFullYear();
    return [...Array(currentYear).keys()].map(i => i + (currentYear - 5)).filter(i => i >= currentYear - 5 && i <= currentYear);
}

const getSales = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${props.productId}/sales?month=${salesMonth.value}&year=${salesYear.value}`).then((res) => {
        salesAnalytics.value = res.data;
    }).catch(err => {
        toast.error('Error loading product metrics!');
    })
        .finally(() => loading.value = false);
}

const getPurchases = () => {
    loading.value = true;
    axios.get(import.meta.env.VITE_API_URL + `admin/products/${props.productId}/purchases?month=${purchaseMonth.value}&year=${purchaseYear.value}`).then((res) => {
        purchaseAnalytics.value = res.data;
    }).catch(err => {
        toast.error('Error loading product metrics!');
    })
        .finally(() => loading.value = false);
}

const fetchProductMetrics = async () => {
    loading.value = true;

    const queryString = new URLSearchParams(
        Object.fromEntries(Object.entries(dateFilter.value).filter(([_, v]) => v !== ''))
    ).toString();

    await axios.get(import.meta.env.VITE_API_URL + `admin/products/${props.productId}/stats?${queryString}`).then((res) => {
        metrics.value = res.data;
        product.value = res.data.product;
    }).catch(err => {
        toast.error('Error loading product metrics!');
    })
        .finally(() => loading.value = false);
}

const filtered = (dateRange) => {
    dateFilter.value = dateRange;
    fetchProductMetrics();
}

</script>

<style>
.download_btn {
    min-height: 32px;
    padding: 2px 8px;
    border-radius: 8px;
    background: rgba(12, 102, 228, 1);
    color: white;
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
}

.product_metrics .card.graph {
    padding: 0px;
}

.card .card-header {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    letter-spacing: -0.25px;
    color: rgba(98, 111, 134, 1);
}

.product_metrics .card.graph .card-header {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
}

.product_metrics .card.attention-container {
    padding: 16px;
}

.card .total {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: rgba(23, 43, 77, 1)
}

.card .card-description {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(98, 111, 134, 1);
}

.erp_dashboard_wrapper .card-details .values .interest-flow {
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
}

.erp_dashboard_wrapper .card-details .values .interest-flow.increase {
    color: rgba(33, 110, 78, 1);
}

.card-details .values .interest-flow.decrease {
    color: rgba(174, 46, 36, 1);
}

.erp_dashboard_wrapper .card-details .card-description {
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: rgba(98, 111, 134, 1);
}

.erp_dashboard_wrapper .card-details .invoice_total {
    background: rgba(9, 30, 66, 0.06);
    color: rgba(23, 43, 77, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    margin-left: 0.5em;
}

.invoice_stats_container table thead tr,
.invoice_stats_container table tbody tr:not(:last-child) {
    border-bottom: 0.5px solid rgba(9, 30, 66, 0.14);
}
</style>