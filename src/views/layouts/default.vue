<template>
  <div class="min-h-screen font-sans bg-bg-sunken">
    <AppHeader @changeDepartment="updateDepartment" />
    <div class="flex flex-col overflow-hidden min-h-[calc(100vh-64px)]">
      <Navigation :department="selectedDepartment" />

      <main class="flex-1 overflow-y-auto bg-white">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/views/Components/header/AppHeader.vue";
import { useNotifications } from '@/views/Composables/useNotifications';
import Navigation from "@/views/Components/header/Navigation.vue";
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth";
// color: black !important;

let selectedDepartment: string = ref("");
const authStore = useAuthStore();

const updateDepartment = (department) => {
  selectedDepartment.value = department;
  authStore.setActiveDepartment(department)
}
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  background-color: white !important;
}
</style>
