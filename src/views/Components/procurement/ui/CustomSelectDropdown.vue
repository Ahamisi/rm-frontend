<template>
  <div class="relative w-full" ref="dropdownRef">
    <div 
      class="flex items-center justify-between w-full px-3 py-2 bg-white border-2 rounded-lg cursor-pointer h-auto special-input"
      style="border-color: #091E4224;"
      @click="toggleDropdown"
    >
      <span class="text-sm text-gray-700">
        {{ selectedLabel || placeholder }}
      </span>
      <svg 
        class="w-4 h-4 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown Options -->
    <div 
      v-if="isOpen" 
      class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden"
      style="border: 2px solid #091E4224;"
    >
      <div 
        v-for="(option, index) in options" 
        :key="option.value"
        class="px-2 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
        :class="{ 'border-b-0': index < options.length - 1 }"
        style="border-color: #091E4224; padding: 8px;"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface DropdownOption {
  value: string;
  label: string;
}

const props = defineProps<{
  modelValue: string;
  options: DropdownOption[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue);
  return selected?.label || '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
/* Custom styles for the dropdown */
</style>
