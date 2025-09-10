<template>
  <div class="h-screen font-sans bg-bg-sunken flex flex-col">
    <AppHeader @changeDepartment="updateDepartment" />
    <div class="flex flex-col flex-1 min-h-0">
      <Navigation :department="selectedDepartment" />

      <main class="flex-1 bg-white min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/views/Components/header/AppHeader.vue";
// import { useNotifications } from '@/views/Composables/useNotifications';
import Navigation from "@/views/Components/header/Navigation.vue";
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";
// color: black !important;

const authStore = useAuthStore();
const selectedDepartment = ref(authStore.selectedDepartment || "");

onMounted(() => {
  // Check both localStorage keys for department (handle inconsistency)
  const storedDepartment = authStore.selectedDepartment || localStorage.getItem("selected_department");
  
  // Initialize department from auth store or localStorage
  if (!selectedDepartment.value && storedDepartment) {
    selectedDepartment.value = storedDepartment.toLowerCase();
    authStore.setActiveDepartment(storedDepartment.toLowerCase());
  }
  
  // If still no department, try to set a default based on available departments
  if (!selectedDepartment.value && authStore.departments && authStore.departments.length > 0) {
    const defaultDepartment = authStore.departments[0]?.slug || authStore.departments[0]?.name?.toLowerCase();
    if (defaultDepartment) {
      selectedDepartment.value = defaultDepartment;
      authStore.setActiveDepartment(defaultDepartment);
    }
  }
});

const updateDepartment = (department: any) => {
  const normalizedDepartment = department.toLowerCase();
  selectedDepartment.value = normalizedDepartment;
  authStore.setActiveDepartment(normalizedDepartment);
}
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  background-color: white !important;
}
</style>
