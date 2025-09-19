<template>
    <div class="erp_dashboard_wrapper">
        <div class="grey_bg">
            <!-- Header -->
            <PageTitle title="Business Programs / Loyalty Program Progress" class="px-6" />

            <!-- tabs -->
            <Tabs :tabs="loyaltyTabs" @tab-changed="handleTabChange" :defaultTab="activeTab" />
        </div>
        
        <!-- contents -->
        <div class="px-6 mt-0 bg-white tab_contents min-h-[calc(100vh-190px)]">
            <!-- Progress Tab Content -->
            <div v-if="activeTab === 'Progress'">
                <Datatable 
                    :items="progressData" 
                    :filterByDate="false" 
                    :filterFields="progressFilterFields" 
                    :columns="progressColumns" 
                    pageName="Loyalty Progress"
                    :key="`progress-${childKey}`"
                />
            </div>

            <!-- Bonus Tab Content -->
            <div v-if="activeTab === 'Bonus'">
                <Datatable 
                    :items="bonusData" 
                    :filterByDate="false" 
                    :filterFields="bonusFilterFields" 
                    :columns="bonusColumns" 
                    pageName="Loyalty Bonus"
                    :key="`bonus-${childKey}`"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Datatable from '@/views/Components/Datatable/Datatable.vue'
import PageTitle from '@/views/Components/header/PageTitle.vue'
import Tabs from '@/views/Components/Tabs.vue'
import type { TableColumn, FilterFields, FilterField } from '@/types'

// Types
interface ProgressData {
    id: number
    customerName: string
    email: string
    phone: string
    totalPayment: number
}

interface BonusData {
    id: number
    customerName: string
    email: string
    phone: string
    totalPayment: number
    description: string
}

// Tab state
const activeTab = ref('Progress')
const childKey = ref(0)

// Tab configuration
const loyaltyTabs = ref([
    { name: 'Progress', count: 15 },
    { name: 'Bonus', count: 15 }
])

// Progress tab data
const progressData = ref<ProgressData[]>([
    { id: 87, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 54, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 25, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 30, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 51, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 21, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 35, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 23, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 33, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 88, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 81, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 80, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 5, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 },
    { id: 55, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00 }
])

// Bonus tab data
const bonusData = ref<BonusData[]>([
    { id: 87, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 54, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 25, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 30, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 51, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 21, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 35, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 23, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 33, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 88, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 81, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 80, customerName: "Nyerhovwo Omuvwie", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 5, customerName: "Emeka Kalu", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" },
    { id: 55, customerName: "Emmanuel Aba", email: "sleeknne4u1@gail.com", phone: "+234 899 9999 999", totalPayment: 2055043.00, description: "February monthly loyalty bonus for target achievement" }
])

// Progress tab columns
const progressColumns = ref<TableColumn[]>([
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
        label: 'Total Payment',
        field: 'totalPayment',
        sortable: true
    }
])

// Bonus tab columns
const bonusColumns = ref<TableColumn[]>([
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
        label: 'Total Payment',
        field: 'totalPayment',
        sortable: true
    },
    {
        label: 'Description',
        field: 'description',
        sortable: true
    }
])

// Filter fields
const progressFilterFields = ref<FilterFields<FilterField>>({
    customerName: {
        type: 'text',
        label: 'Customer Name',
        placeholder: 'Search by customer name'
    },
    email: {
        type: 'text',
        label: 'Email',
        placeholder: 'Search by email'
    },
    phone: {
        type: 'text',
        label: 'Phone',
        placeholder: 'Search by phone'
    }
})

const bonusFilterFields = ref<FilterFields<FilterField>>({
    customerName: {
        type: 'text',
        label: 'Customer Name',
        placeholder: 'Search by customer name'
    },
    email: {
        type: 'text',
        label: 'Email',
        placeholder: 'Search by email'
    },
    description: {
        type: 'text',
        label: 'Description',
        placeholder: 'Search by description'
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