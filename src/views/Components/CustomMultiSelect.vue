<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- Select Field (without pills inside) -->
    <div 
      class="flex items-center justify-between w-full px-3 py-2 bg-white border-2 rounded-lg cursor-pointer"
      style="border-color: #091E4224;"
      @click="toggleDropdown"
    >
      <!-- Placeholder or search input -->
      <div class="flex-1">
        <input
          v-if="isOpen"
          v-model="searchTerm"
          :placeholder="placeholder"
          class="w-full appearance-none outline-none bg-transparent text-sm text-gray-700"
          @blur="handleBlur"
          ref="searchInput"
        />
        <span v-else class="text-sm text-gray-700">
          {{ placeholder }}
        </span>
      </div>
      
      <!-- Dropdown arrow -->
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

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
      style="border: 2px solid #091E4224;"
    >
      <div v-if="filteredOptions.length === 0" class="p-3 text-sm text-gray-500">
        {{ searchTerm.length > 0 ? 'No results found' : 'No options available' }}
      </div>
      <div v-for="(option, index) in filteredOptions" :key="option.id">
        <div
          class="px-2 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
          :class="{ 'border-b-2': index < filteredOptions.length - 1 }"
          style="border-color: #091E4224; padding: 8px;"
          @click="selectOption(option)"
        >
          <span>{{ option[labelField] }}</span>
          <svg v-if="isSelected(option)" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#0C66E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Selected Pills (Below the select field, only when dropdown is closed) -->
    <div v-if="selectedItems.length > 0 && !isOpen" class="flex flex-wrap gap-2 mt-2">
      <div v-for="item in selectedItems" :key="item.id" 
           class="flex items-center gap-2 py-[6px] rounded-lg px-2 w-fit multi_select_item">
        <span>{{ item[labelField] }}</span>
        <button @click="removeItem(item)" class="hover:bg-gray-200 rounded p-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00027 7.05739L4.4716 3.52872C4.34587 3.40728 4.17747 3.34009 4.00267 3.3416C3.82787 3.34312 3.66066 3.41324 3.53706 3.53684C3.41345 3.66045 3.34334 3.82766 3.34182 4.00245C3.3403 4.17725 3.4075 4.34565 3.52894 4.47139L7.05761 8.00005L3.52894 11.5287C3.4075 11.6545 3.3403 11.8229 3.34182 11.9977C3.34334 12.1725 3.41345 12.3397 3.53706 12.4633C3.66066 12.5869 3.82787 12.657 4.00267 12.6585C4.17747 12.66 4.34587 12.5928 4.4716 12.4714L8.00027 8.94272L11.5289 12.4714C11.6547 12.5928 11.8231 12.66 11.9979 12.6585C12.1727 12.657 12.3399 12.5869 12.4635 12.4633C12.5871 12.3397 12.6572 12.1725 12.6587 11.9977C12.6602 11.8229 12.593 11.6545 12.4716 11.5287L8.94294 8.00005L12.4716 4.47139C12.5353 4.40989 12.5861 4.33633 12.621 4.25499C12.6559 4.17365 12.6743 4.08617 12.6751 3.99766C12.6759 3.90914 12.659 3.82135 12.6255 3.73942C12.592 3.65749 12.5425 3.58305 12.4799 3.52046C12.4173 3.45786 12.3428 3.40836 12.2609 3.37484C12.179 3.34132 12.0912 3.32445 12.0027 3.32522C11.9142 3.32599 11.8267 3.34438 11.7453 3.37932C11.664 3.41426 11.5904 3.46505 11.5289 3.52872L8.00027 7.05739Z" fill="#44546F" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Option {
  id: number
  [key: string]: any
}

interface Props {
  modelValue: Option[]
  options: Option[]
  placeholder: string
  labelField: string
}

const props = withDefaults(defineProps<Props>(), {
  labelField: 'name'
})

const emit = defineEmits<{
  'update:modelValue': [value: Option[]]
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchTerm = ref('')
const selectedItems = ref<Option[]>([])

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue && Array.isArray(newValue)) {
    selectedItems.value = [...newValue]
  } else {
    selectedItems.value = []
  }
}, { immediate: true })

// Filtered options based on search and excluding selected items
const filteredOptions = computed(() => {
  let filtered = props.options.filter(option => 
    !selectedItems.value.some(selected => selected.id === option.id)
  )
  
  if (searchTerm.value) {
    filtered = filtered.filter(option =>
      option[props.labelField].toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  
  return filtered
})

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const selectOption = (option: Option) => {
  if (!isSelected(option)) {
    const newSelected = [...selectedItems.value, option]
    selectedItems.value = newSelected
    emit('update:modelValue', newSelected)
  }
  searchTerm.value = ''
}

const removeItem = (item: Option) => {
  const newSelected = selectedItems.value.filter(selected => selected.id !== item.id)
  selectedItems.value = newSelected
  emit('update:modelValue', newSelected)
}

const isSelected = (option: Option) => {
  return selectedItems.value.some(selected => selected.id === option.id)
}

const handleBlur = () => {
  // Small delay to allow click events on dropdown items
  setTimeout(() => {
    isOpen.value = false
    searchTerm.value = ''
  }, 150)
}

onClickOutside(dropdownRef, () => {
  isOpen.value = false
  searchTerm.value = ''
})
</script>

<style scoped>
.multi_select_item {
  border: 2px solid rgba(9, 30, 66, 0.14);
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  color: rgba(98, 111, 134, 1);
  background: rgba(247, 248, 249, 1);
}
</style>
