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
  const storedDepartment = authStore.selectedDepartment || 
                           localStorage.getItem("selectedDepartment") || 
                           localStorage.getItem("selected_department");
  
  // Initialize department from auth store or localStorage
  if (!selectedDepartment.value && storedDepartment) {
    const normalized = normalizeDepartmentCode(storedDepartment);
    selectedDepartment.value = normalized;
    authStore.setActiveDepartment(normalized);
  }
  
  // If still no department, try to set a default based on available departments
  if (!selectedDepartment.value && authStore.departments && authStore.departments.length > 0) {
    const defaultDepartment = authStore.departments[0]?.code || 
                              authStore.departments[0]?.slug || 
                              authStore.departments[0]?.name?.toLowerCase();
    if (defaultDepartment) {
      const normalized = normalizeDepartmentCode(defaultDepartment);
      selectedDepartment.value = normalized;
      authStore.setActiveDepartment(normalized);
    }
  }
});

// Normalize department codes to match the navigation keys
const normalizeDepartmentCode = (dept: string): string => {
  const normalized = dept.toLowerCase().trim();
  
  // Map display names to codes
  if (normalized === "customer success") {
    return "customer-success";
  } else if (normalized === "business development" || normalized === "tech and business development") {
    return "tech-business-dev";
  } else if (normalized === "tech") {
    return "tech";
  } else if (normalized === "accounting") {
    return "accounting";
  }
  
  return normalized;
};

const updateDepartment = (department: any) => {
  console.log("updateDepartment called with:", department);
  const normalizedDepartment = normalizeDepartmentCode(department);
  
  console.log("Normalized department:", normalizedDepartment);
  selectedDepartment.value = normalizedDepartment;
  authStore.setActiveDepartment(normalizedDepartment);
  
  // Also update the inconsistent localStorage key for compatibility
  localStorage.setItem("selected_department", normalizedDepartment);
}
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  background-color: white !important;
}
</style>
