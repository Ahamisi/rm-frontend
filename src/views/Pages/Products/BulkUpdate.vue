<template>
    <div v-if="disableForm" class="fixed flex items-center justify-center h-screen loading_overlay">
        <LoadingState></LoadingState>
    </div>
    <div class="erp_dashboard_wrapper">
        <!-- Header -->
        <PageTitle :title="getPageTitle" class="px-6" />

        <!-- tabs -->
        <Tabs :tabs="tabs" @tabChanged="handleTabChange"></Tabs>

        <!-- contents -->
        <div class="h-screen px-6 mt-0 bg-white tab_contents">
            <div class="" v-if="activeTab === 'Product Price Update'">
                <PriceUpdate />
            </div>
            <div class="" v-if="activeTab === 'Batch Shelf Update'">
                <ShelfUpdate />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import Tabs from "@/views/Components/Tabs.vue";
import PageTitle from "@/views/Components/header/PageTitle.vue";
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification';
import { useAuthStore } from "@/stores/auth";
import PriceUpdate from './PriceUpdate.vue';
import ShelfUpdate from './ShelfUpdate.vue';
import LoadingState from '@/views/Components/procurement/state/LoadingState.vue';





onMounted(() => {
    activeTab.value = localStorage.getItem('bulk_product_update_tab') ?? 'Product Price Update';
});

const getPageTitle = computed(() => {
    return `${title.value} / ${activeTab.value}`;
});

const authStore = useAuthStore();
const disableForm = ref(false);
const activeTab = ref('');
const tabs = ref(['Product Price Update', 'Batch Shelf Update']);
const title = ref('Products Management / Bulk Product Update');
const route = useRoute();
const toast = useToast();

const handleTabChange = (tab, index) => {
    localStorage.setItem('bulk_product_update_tab', tab);
    activeTab.value = tab;
}
</script>

<style></style>