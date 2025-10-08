<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Subject (Title) -->
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
      
      <!-- Icon -->
      <div v-if="subtitle" class="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
        <slot name="icon">
          <!-- Default icon if none provided -->
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#44546F"/>
            <path d="M8 9C5.79086 9 4 10.7909 4 13V14H12V13C12 10.7909 10.2091 9 8 9Z" fill="#44546F"/>
          </svg>
        </slot>
      </div>
      
      <!-- Subtitle -->
      <span v-if="subtitle" class="text-sm font-medium text-gray-600">{{ subtitle }}</span>
    </div>
    <slot name="actions">
      <!-- Actions slot for additional buttons or elements -->
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
