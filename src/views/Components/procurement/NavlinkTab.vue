<template>
  <div class="hidden w-full md:block">
    <div class="flex w-full items-baseline md:space-x-6">
      <!-- Loop through links and render navigation items -->
      <a
        v-for="(link, index) in links"
        :key="index"
        href="#"
        class="relative overflow-hidden py-2 text-[12px] font-semibold text-[#44546F] transition-colors duration-300"
        :class="{
          '!text-[#0C66E4] group': activeLink === link.value,
          'hover:text-[#0C66E4] group': activeLink !== link.value,
        }"
        @click.prevent="$emit('toggleView', link.value)" 
      >
        <span v-if="link.count !== undefined" class="flex items-center gap-2">
          <span>{{ link.label }}</span>
          <span class="bg-[rgba(9,30,66,0.06)] text-[#172B4D] px-2 py-0.5 rounded text-xs font-normal">
            {{ link.count }}
          </span>
        </span>
        <span v-else>{{ link.label }}</span>
        <span
          class="bg-blue-700 absolute bottom-[0px] left-0 h-[2px] w-full origin-left scale-x-0 transform transition-transform duration-300 ease-out"
          :class="{
            'scale-x-100': activeLink === link.value,
            'group-hover:scale-x-100': activeLink !== link.value,
          }"
        ></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// Define props for navigation links and currently active link
const props = defineProps<{
  links: Array<{ label: string; value: string; count?: number }>;
  activeLink: string;
}>();

// Define event to notify parent component when a link is clicked
defineEmits(["toggleView"]);
</script>
