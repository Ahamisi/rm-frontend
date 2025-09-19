<template>
    <div class="px-6 erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle title="Business Programs / Loans" />

        <div class="min-h-[calc(100vh-190px)]">
            <Datatable 
                :items="mockLoans" 
                :filterByDate="false" 
                :filterFields="filterFields" 
                :columns="columns" 
                pageName="Loans"
                :key="childKey"
            >
                <template #column="col">
                    <span v-if="col.props.column.field === 'creditLimit' || col.props.column.field === 'loyaltyMonthlyTarget'">
                        <div class="inline-flex items-center gap-1 px-2 py-1 rounded border" style="border-color: #091E4224;">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 13V2.052C2.99993 1.81932 3.07715 1.59322 3.21952 1.40919C3.36189 1.22515 3.56136 1.09363 3.7866 1.03526C4.01183 0.976888 4.25008 0.994986 4.46391 1.08671C4.67774 1.17843 4.85506 1.33858 4.968 1.542L11.032 12.458C11.1449 12.6614 11.3223 12.8216 11.5361 12.9133C11.7499 13.005 11.9882 13.0231 12.2134 12.9647C12.4386 12.9064 12.6381 12.7748 12.7805 12.5908C12.9229 12.4068 13.0001 12.1807 13 11.948V1M1 5H15M1 9H15" stroke="#626F86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {{ formatNumber(col.props.formattedRow[col.props.column.field]) }}
                        </div>
                    </span>
                    <span v-else-if="col.props.column.field === 'requestedLoan' || col.props.column.field === 'repaidLoan' || col.props.column.field === 'outstandingLoan'">
                        {{ formatCurrency(col.props.formattedRow[col.props.column.field]) }}
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
                <template v-slot:header_actions>
                    <Button type="blue-btn" :onClick="downloadLoanReport" classStyle="px-3 py-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
<path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
</svg>

                        Download Loan Report
                    </Button>
                </template>
            </Datatable>
        </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Button from '@/views/Components/ui/Button.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Types
interface Loan {
    id: number
    customerName: string
    storeName: string
    requestedLoan: number
    repaidLoan: number
    outstandingLoan: number
    last1MthOrders: number
    last2MthOrders: number
    last3MthOrders: number
    creditLimit: number
    loyaltyMonthlyTarget: number
}

// Mock data for demonstration
const mockLoans = ref<Loan[]>([
    {
        id: 87,
        customerName: "Emeka Kalu",
        storeName: "Emeka Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 54,
        customerName: "Emmanuel Aba",
        storeName: "Emma Bros Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 25,
        customerName: "Nyerhovwo Omuvwie",
        storeName: "Xela pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 30,
        customerName: "Emeka Kalu",
        storeName: "Emeka Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 51,
        customerName: "Emmanuel Aba",
        storeName: "Emma Bros Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 21,
        customerName: "Nyerhovwo Omuvwie",
        storeName: "Xela pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 35,
        customerName: "Emeka Kalu",
        storeName: "Emeka Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 23,
        customerName: "Emmanuel Aba",
        storeName: "Emma Bros Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 33,
        customerName: "Nyerhovwo Omuvwie",
        storeName: "Xela pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 88,
        customerName: "Emeka Kalu",
        storeName: "Emeka Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 81,
        customerName: "Emmanuel Aba",
        storeName: "Emma Bros Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 80,
        customerName: "Nyerhovwo Omuvwie",
        storeName: "Xela pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 5,
        customerName: "Emeka Kalu",
        storeName: "Emeka Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    },
    {
        id: 55,
        customerName: "Emmanuel Aba",
        storeName: "Emma Bros Pharmacy",
        requestedLoan: 2055043.00,
        repaidLoan: 2055043.00,
        outstandingLoan: 2055043.00,
        last1MthOrders: 1000,
        last2MthOrders: 1000,
        last3MthOrders: 1000,
        creditLimit: 2000000,
        loyaltyMonthlyTarget: 2000000
    }
])

// Table configuration
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
        label: 'Requested Loan',
        field: 'requestedLoan',
        sortable: true
    },
    {
        label: 'Repaid Loan',
        field: 'repaidLoan',
        sortable: true
    },
    {
        label: 'Outstanding Loan',
        field: 'outstandingLoan',
        sortable: true
    },
    {
        label: 'Last 1 Mth. Orders',
        field: 'last1MthOrders',
        sortable: true
    },
    {
        label: 'Last 2 Mth. Orders',
        field: 'last2MthOrders',
        sortable: true
    },
    {
        label: 'Last 3 Mth. Orders',
        field: 'last3MthOrders',
        sortable: true
    },
    {
        label: 'Credit Limit',
        field: 'creditLimit',
        sortable: true
    },
    {
        label: 'Loyalty Monthly Target',
        field: 'loyaltyMonthlyTarget',
        sortable: true
    }
])

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
    creditLimit: {
        type: 'number',
        label: 'Credit Limit',
        placeholder: 'Filter by credit limit'
    },
    loyaltyMonthlyTarget: {
        type: 'number',
        label: 'Loyalty Target',
        placeholder: 'Filter by loyalty target'
    }
})
const childKey = ref(111)

// Functions
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('NGN', '₦')
}

const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

const downloadLoanReport = () => {
    // TODO: Implement loan report download
    console.log('Downloading loan report...')
}
</script>
