<template>
  <nav class="flex items-center space-x-1 text-[14px] text-gray-500 mb-[12px] mt-[6px]">
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
        <span class="mx-1">/</span>
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
