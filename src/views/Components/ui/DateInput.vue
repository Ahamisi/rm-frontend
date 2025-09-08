<!--
  Custom DateInput Component
  
  Replaces default browser date inputs with consistent styling and calendar icon.
  
  Usage:
    <DateInput v-model="dateValue" placeholder="dd/mm/yyyy" />
  
  Features:
  - Consistent styling across all browsers
  - Custom calendar icon on the right
  - Native date picker functionality
  - Placeholder text color: #626F86
  - Selected text color: #172B4D
-->
<template>
  <div class="relative">
    <input 
      type="date" 
      v-model="inputValue"
      :class="['w-full text-sm border border-gray-300 rounded-md', (props.inputClass ?? 'p-2 pr-10')]"
      ref="dateInput" 
      @focus="handleFocus"
      @change="$emit('update:modelValue', inputValue)"
      :placeholder="placeholder"
      />
    <div 
      class="absolute text-gray-500 cursor-pointer right-3 top-2" 
      @click="handleCalendarClick"
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M5.32825 5H19.3383C20.4403 5 21.3333 5.895 21.3333 6.994V19.006C21.3333 19.2679 21.2816 19.5273 21.1814 19.7693C21.0811 20.0113 20.9341 20.2312 20.7489 20.4163C20.5636 20.6015 20.3437 20.7484 20.1016 20.8485C19.8596 20.9487 19.6002 21.0001 19.3383 21H5.32825C4.79932 21 4.29203 20.7899 3.91793 20.416C3.54382 20.0421 3.33352 19.5349 3.33325 19.006V6.994C3.33325 5.893 4.22525 5 5.32825 5ZM5.33325 9V18C5.33325 18.2652 5.43861 18.5196 5.62615 18.7071C5.81368 18.8946 6.06804 19 6.33325 19H18.3333C18.5985 19 18.8528 18.8946 19.0404 18.7071C19.2279 18.5196 19.3333 18.2652 19.3333 18V9H5.33325ZM6.33325 4C6.33325 3.73478 6.43861 3.48043 6.62615 3.29289C6.81368 3.10536 7.06804 3 7.33325 3C7.59847 3 7.85282 3.10536 8.04036 3.29289C8.22789 3.48043 8.33325 3.73478 8.33325 4V5H6.33325V4ZM16.3333 4C16.3333 3.73478 16.4386 3.48043 16.6261 3.29289C16.8137 3.10536 17.068 3 17.3333 3C17.5985 3 17.8528 3.10536 18.0404 3.29289C18.2279 3.48043 18.3333 3.73478 18.3333 4V5H16.3333V4ZM7.33325 13V10.999H9.33325V13H7.33325ZM15.3333 13V10.999H17.3333V13H15.3333ZM11.3333 13V10.999H13.3343V13H11.3333ZM7.33325 17V15H9.33325V17H7.33325ZM11.3333 17V15H13.3343V17H11.3333ZM15.3333 17V15H17.3333V17H15.3333Z"
          fill="#44546F" 
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Props {
  modelValue?: string;
  inputClass?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'dd/mm/yyyy'
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

// Each component instance will have its own dateInput ref
const dateInput = ref<HTMLInputElement | null>(null);

// Local reactive value
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Handle calendar icon click - only affects THIS component's input
const handleCalendarClick = () => {
  if (dateInput.value) {
    // Try showPicker first (modern browsers), fallback to focus
    if (dateInput.value.showPicker) {
      dateInput.value.showPicker();
    } else {
      dateInput.value.focus();
    }
  }
};

// Handle input focus
const handleFocus = () => {
  if (dateInput.value?.showPicker) {
    dateInput.value.showPicker();
  }
};
</script>

<style scoped>
input[type="date"]{
    width: 100%;
    border: 2px solid rgba(9, 30, 66, 0.14);
	border-radius: 8px;
	background: white;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 14px;
	font-style: normal;
	font-weight: 300;
	line-height: 20px;
    color: rgba(23, 43, 77, 1);
    padding: 8px 40px 8px 12px;
}

input::placeholder{
	color: rgba(98, 111, 134, 1);
}

input[type="date"]:focus:not(.vs__search):not(.dataTableSearch){
    border: 2px solid rgba(56, 139, 255, 1);
}

input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
}
</style>