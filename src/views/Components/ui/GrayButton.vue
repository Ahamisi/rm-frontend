<template>
  <button 
    :class="buttonClasses"
    :style="buttonStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
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

// Computed classes based on size
const buttonClasses = computed(() => {
  const baseClasses = 'flex items-center gap-2 text-sm font-medium text-gray-700 rounded-md transition-colors';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return `${baseClasses} ${sizeClasses[props.size]} ${disabledClasses}`;
});

// Default background style
const buttonStyle = computed(() => ({
  backgroundColor: 'rgba(9, 30, 66, 0.06)'
}));

// Event handlers for interactive states
const handleMouseEnter = (event: MouseEvent) => {
  if (!props.disabled) {
    (event.target as HTMLElement).style.backgroundColor = 'rgba(9, 30, 66, 0.14)';
  }
};

const handleMouseLeave = (event: MouseEvent) => {
  if (!props.disabled) {
    (event.target as HTMLElement).style.backgroundColor = 'rgba(9, 30, 66, 0.06)';
  }
};

const handleMouseDown = (event: MouseEvent) => {
  if (!props.disabled) {
    (event.target as HTMLElement).style.backgroundColor = 'rgba(9, 30, 66, 0.31)';
  }
};

const handleMouseUp = (event: MouseEvent) => {
  if (!props.disabled) {
    (event.target as HTMLElement).style.backgroundColor = 'rgba(9, 30, 66, 0.14)';
  }
};
</script>
