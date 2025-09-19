<template>
  <span 
    class="pill-component inline-flex items-center px-[6px] py-[4px] rounded-[4px] text-[10px] font-medium"
    :class="tagClasses[type]"
  >
    {{ text }}
    <svg v-if="type === 'hospital' && showIcon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-1">
      <g clip-path="url(#clip0_11480_55661)">
        <path d="M4.9987 6.25008C6.60953 6.25008 7.91536 4.94425 7.91536 3.33341C7.91536 1.72258 6.60953 0.416748 4.9987 0.416748C3.38787 0.416748 2.08203 1.72258 2.08203 3.33341C2.08203 4.94425 3.38787 6.25008 4.9987 6.25008Z" stroke="#0055CC" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.42214 5.78761L2.91797 9.58345L5.0013 8.33345L7.08463 9.58345L6.58047 5.78345" stroke="#0055CC" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_11480_55661">
          <rect width="10" height="10" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  type: 'hospital' | 'controlled' | 'cash-and-carry';
  text: string;
  showIcon?: boolean;
}

const props = defineProps<Props>();

const tagClasses = {
  'hospital': 'bg-[#E9F2FF] text-[#0055CC]',
  'controlled': 'bg-[#F3F0FF] text-[#5E4DB2]',
  'cash-and-carry': 'bg-[#DCFFF1] text-[#216E4E]'
};
</script>
