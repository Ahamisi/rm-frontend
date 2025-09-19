<!-- resources/vue3/App.vue -->
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/views/layouts/default.vue";
import AuthLayout from "@/views/layouts/guest.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  if (authStore.isLoggedIn && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }
});



const layout = computed(() => {
  return route.meta.layout === "guest" ? AuthLayout : DefaultLayout;
});
</script>

<style>
/* Global styles - Allow vertical scrolling */
html, body {
  overflow-y: auto;
}

/* Ensure the app container takes full height */
#app {
  height: 100vh;
  overflow: hidden;
}

/* Universal datatable scrolling fix */
.datatable-container {
  max-height: calc(100vh - 300px) !important;
  overflow-y: auto !important;
}

/* Ensure tables have proper scrolling */
.overflow-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Ensure table content is fully visible */
table {
  min-height: auto !important;
}

.modal{
  height: 100vh !important;
  overflow: hidden;
}

/* Fix for pages with tabs */
.tab_contents {
  height: calc(100vh - 190px) !important;
  overflow: hidden !important;
}

/* Fix for pages without tabs */
.erp_dashboard_wrapper > div:last-child {
  height: calc(100vh - 190px) !important;
  overflow: hidden !important;
}


</style>
