<template>
  <span 
    class="inline-flex items-center px-[6px] py-[4px] rounded-[8px] text-[10px] font-medium"
    :class="tagClasses[type]"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  type: 'hospital' | 'controlled' | 'cash-and-carry';
  text: string;
}

const props = defineProps<Props>();

const tagClasses = {
  'hospital': 'bg-[#E9F2FF] text-[#0055CC]',
  'controlled': 'bg-[#F3F0FF] text-[#5E4DB2]',
  'cash-and-carry': 'bg-[#DCFFF1] text-[#216E4E]'
};
</script>
