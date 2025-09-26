<template>
  <button 
    :class="buttonClasses"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Click handler
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

// Computed classes based on size - matching Button.vue gray-btn styling
const buttonClasses = computed(() => {
  const baseClasses = 'flex items-center rounded download_btn gap-x-1 gray-btn';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2', 
    lg: 'px-6 py-3'
  };

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return `${baseClasses} ${sizeClasses[props.size]} ${disabledClasses}`;
});

// Remove custom background style - let CSS handle it
const buttonStyle = computed(() => ({}));

// Remove custom mouse event handlers - let CSS handle hover states
</script>

<style scoped>
.download_btn {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  min-height: 32px;
  padding: 2px 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.download_btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gray-btn {
  background: rgba(9, 30, 66, 0.06);
  color: rgba(23, 43, 77, 1);
}

.gray-btn:hover:not(:disabled) {
  background: rgba(8, 25, 55, 0.16);
}
</style>
