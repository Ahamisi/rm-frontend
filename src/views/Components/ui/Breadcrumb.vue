<template>
  <div class="bg-white px-6 py-4">
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
interface BreadcrumbItem {
  label: string;
  to?: string | { name: string; params?: Record<string, any> };
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>