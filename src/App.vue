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
/* Global styles */
</style>
