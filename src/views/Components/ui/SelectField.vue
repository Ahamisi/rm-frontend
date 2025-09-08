<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- Select Field -->
    <div 
      class="flex items-center justify-between w-full px-2 py-2 bg-white border-2 rounded-lg cursor-pointer h-auto"
      style="border-color: #091E4224;"
      :class="isFocused ? 'border-blue-600' : ''"
    >
      <!-- Input/Display Area -->
      <div class="flex-1 h-[20px] flex items-center">
        <div class="flex items-center gap-2 w-full">
          <img v-if="displayImage" :src="displayImage" alt="Profile Image" class="w-6 h-6 object-contain" />
          <component v-else-if="displayIcon" :is="displayIcon" class="w-5 h-5 text-[#172B4D]" />
          <input 
            :placeholder="placeholder"
            class="w-full appearance-none outline-none bg-transparent text-sm text-[#172B4D] border-none p-0 m-0 h-[20px] leading-[20px]"
            style="box-shadow: none; border: none; color: #172B4D !important; padding: 0 !important;"
            v-model="searchTerm"
            @focus="handleFocus" 
            @blur="handleBlur"
          />
        </div>
      </div>
      
      <!-- Dropdown Icons -->
      <div class="flex items-center">
        <button 
          class="text-[#172B4D] hover:text-[#172B4D] outline-none focus:outline-none"
          @click="toggleDropdown"
        >
          <LucideX v-if="!!searchTerm" @click="selectOption()" class="w-4 h-4" />
          <svg v-else class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen && filteredOptions.length"
      class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
      style="border: 2px solid #091E4224;"
    >
      <div v-for="option in filteredOptions" :key="option.id"
        class="px-3 py-3 text-sm text-[#172B4D] cursor-pointer hover:bg-gray-50 flex items-center justify-between"
        @click="selectOption(option)"
      >
        <span>{{ option.name }}</span>
        <svg v-if="isOptionSelected(option)" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="#0C66E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { LucideChevronDown, LucideChevronUp, LucideX } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";
import { Option } from "@/types";
import type { Component } from "vue";

const props = defineProps<{
  modelValue: Option | null;
  options: Option[];
  placeholder: string;
  displayIcon?: Component;
  displayImage?: string;
  reduce?: (option: Option) => any;
}>();

const emit = defineEmits(["update:modelValue"]);

const searchTerm = ref("");
const isOpen = ref(false);
const isFocused = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Watch for changes in modelValue to update the searchTerm
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      if(typeof newValue === "object" && "name" in newValue) {
        searchTerm.value = newValue.name;
      } else {
        searchTerm.value = props.options.find(opt => opt.id == newValue)?.name || "";
      }
    } else {
      searchTerm.value = "";
    }
  },
  { immediate: true }
);

// Computed: Filters options based on search
const filteredOptions = computed(() => {
  if (!searchTerm.value || !props.modelValue) return props.options;
  return props.options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option?: Option) => {
  const valueToEmit = props.reduce && option ? props.reduce(option) : option;
  emit("update:modelValue", valueToEmit);
  isOpen.value = false;
  if (option) {
    searchTerm.value = option.name;
  } else {
    searchTerm.value = "";
  }
};

const isOptionSelected = (option: Option) => {
  return props.modelValue?.id === option.id;
};

const handleFocus = () => {
  isFocused.value = true;
  if (props.modelValue) {
    searchTerm.value = "";
  }
  isOpen.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false;
    if (props.modelValue) {
      searchTerm.value = props.modelValue.name;
    }
  }, 150);
};

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script lang="ts">
export default {
  name: "SelectField",
};
</script>
