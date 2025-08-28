<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen?: boolean;
  toggle?: () => void;
  alignLeft: boolean;
}>();

const triggerRef = ref<HTMLElement | null>(null);
const dropdownPosition = ref({ top: 0, left: 0 });

const dropdownStyle = computed(() => ({
  position: "absolute" as const,
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`,
  zIndex: 50,
}));


const updateDropdownPosition = () => {
  if (!triggerRef.value) return;

  const rect = triggerRef.value.getBoundingClientRect();
  const dropdownWidth = 280; // Estimated dropdown width
  
  // Find the search container to align with its left edge
  const searchContainer = triggerRef.value.closest('.flex.border-2.border-gray-300');
  const searchRect = searchContainer ? searchContainer.getBoundingClientRect() : rect;
  
  dropdownPosition.value = {
    top: rect.bottom + window.scrollY - 4, // 8px gap below
    left: props.alignLeft 
        ? searchRect.left + window.scrollX // Align with search container's left edge
        : rect.right + window.scrollX - dropdownWidth + 130 
     // aligns dropdown's right to trigger's right
  };
};

const handleToggle = () => {
  if (props.toggle) {
    props.toggle();
    if (!props.isOpen) {
      updateDropdownPosition();
    }
  }
};

// Update position when dropdown opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    updateDropdownPosition();
    window.addEventListener("scroll", updateDropdownPosition, true);
    window.addEventListener("resize", updateDropdownPosition);
  } else {
    window.removeEventListener("scroll", updateDropdownPosition, true);
    window.removeEventListener("resize", updateDropdownPosition);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateDropdownPosition, true);
  window.removeEventListener("resize", updateDropdownPosition);
});
</script>

<!-- <template>
  <div class="dropdown">
    <div @click="props.toggle" class="cursor-pointer">
      <slot name="trigger"></slot>
    </div>

    <div v-if="props.isOpen" class="absolute z-50 w-auto mt-2 bg-white rounded-lg shadow-lg">
      <slot></slot>
    </div>
  </div>
</template> -->
<template>
  <div class="relative dropdown">
    <div @click="handleToggle" class="cursor-pointer" ref="triggerRef">
      <slot name="trigger"></slot>
    </div>

    <!-- Use teleport for better positioning control -->
    <teleport to="body">
      <div
        v-if="props.isOpen"
        :style="dropdownStyle"
        class="absolute z-50 w-auto mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full"
      >
        <slot></slot>
      </div>
    </teleport>
  </div>
</template>
