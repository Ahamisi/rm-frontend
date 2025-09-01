<template>
  <nav class="flex items-center space-x-1 text-sm text-gray-500 mb-[12px] mt-[6px]">
    <template v-for="(item, index) in items" :key="index">
      <!-- Breadcrumb Item -->
      <div class="flex items-center">
        <!-- Link or Text -->
        <router-link 
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="hover:text-gray-700 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span 
          v-else
          :class="[
            index === items.length - 1 
              ? 'text-[#626F86] ' 
              : 'text-[#626F86]'
          ]"
        >
          {{ item.label }}
        </span>
      </div>
      
      <!-- Separator -->
      <div v-if="index < items.length - 1" class="flex items-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-1">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06L7.28 10.78a.75.75 0 01-1.06-1.06L8.94 7 6.22 4.28a.75.75 0 010-1.06z" fill="currentColor"/>
        </svg>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string | object;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
