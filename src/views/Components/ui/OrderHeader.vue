<template>
  <div class="flex items-center gap-2">
    <span :class="titleClass">{{ title }}</span>
    <div class="flex items-center gap-2">
      <!-- Icon in gray background -->
      <div class="p-[5px] rounded-[4px]" style="background-color: #F7F8F9;">
        <slot name="icon">
          <!-- Default document icon -->
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.91921 0.833252C2.45712 0.833252 2.08337 1.20492 2.08337 1.66242V8.33742C2.08481 8.55804 2.17354 8.76912 2.33017 8.9245C2.4868 9.07988 2.69858 9.16692 2.91921 9.16659H7.08087C7.54296 9.16659 7.91671 8.79534 7.91671 8.33742V1.66242C7.91671 1.20742 7.54254 0.833252 7.08087 0.833252H2.91921ZM3.75004 2.49992H6.25004C6.48016 2.49992 6.66671 2.68647 6.66671 2.91659C6.66671 3.1467 6.48016 3.33325 6.25004 3.33325H3.75004C3.51992 3.33325 3.33337 3.1467 3.33337 2.91659C3.33337 2.68647 3.51992 2.49992 3.75004 2.49992ZM6.25004 3.74992H3.75004C3.51992 3.74992 3.33337 3.93647 3.33337 4.16659C3.33337 4.3967 3.51992 4.58325 3.75004 4.58325H6.25004C6.48016 4.58325 6.66671 4.3967 6.66671 4.16659C6.66671 3.93647 6.48016 3.74992 6.25004 3.74992ZM3.75004 4.99992H4.58337C4.81349 4.99992 5.00004 5.18647 5.00004 5.41659C5.00004 5.6467 4.81349 5.83325 4.58337 5.83325H3.75004C3.51992 5.83325 3.33337 5.6467 3.33337 5.41659C3.33337 5.18647 3.51992 4.99992 3.75004 4.99992Z" fill="#44546F"/>
          </svg>
        </slot>
      </div>
      <!-- REF text outside the gray box -->
      <span class="text-[12px] font-[500] text-[#626F86]">{{ reference }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  reference: string;
  titleSize?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: 'md'
});

const titleClass = computed(() => {
  const baseClasses = 'font-[500] text-[#172B4D]';
  
  switch (props.titleSize) {
    case 'sm':
      return `${baseClasses} text-[14px]`;
    case 'lg':
      return `${baseClasses} text-[20px]`;
    case 'md':
    default:
      return `${baseClasses} text-[16px]`;
  }
});
</script>
