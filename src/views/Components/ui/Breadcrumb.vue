<template>
  <div :class="['px-6 py-4', backgroundClass]">
    <nav class="text-[#626F86] text-sm space-x-2">
      <template v-for="(item, index) in items" :key="index">
        <!-- Clickable breadcrumb item -->
        <router-link 
          v-if="item.to && index < items.length - 1" 
          :to="item.to" 
          class="hover:text-gray-800"
        >
          {{ item.label }}
        </router-link>
        
        <!-- Non-clickable breadcrumb item (current page) -->
        <span v-else class="">{{ item.label }}</span>
        
        <!-- Separator (not after last item) -->
        <span v-if="index < items.length - 1">/</span>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface BreadcrumbItem {
  label: string;
  to?: string | { name: string; params?: Record<string, any> };
}

const props = defineProps<{
  items: BreadcrumbItem[];
  background?: 'white' | 'gray' | 'transparent';
}>();

const backgroundClass = computed(() => {
  switch (props.background) {
    case 'white':
      return 'bg-white';
    case 'gray':
      return 'bg-[#f7f8f9]';
    case 'transparent':
      return 'bg-transparent';
    default:
      return 'bg-white'; // Default to white for backward compatibility
  }
});
</script>