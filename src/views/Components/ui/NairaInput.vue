<template>
  <div class="relative">
    <span class="absolute left-3 top-2.5 text-gray-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 18V7.052C6.99993 6.81932 7.07715 6.59322 7.21952 6.40919C7.36189 6.22515 7.56136 6.09363 7.7866 6.03526C8.01183 5.97689 8.25008 5.99499 8.46391 6.08671C8.67774 6.17843 8.85506 6.33858 8.968 6.542L15.032 17.458C15.1449 17.6614 15.3223 17.8216 15.5361 17.9133C15.7499 18.005 15.9882 18.0231 16.2134 17.9647C16.4386 17.9064 16.6381 17.7748 16.7805 17.5908C16.9229 17.4068 17.0001 17.1807 17 16.948V6M5 10H19M5 14H19" stroke="#44546F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="number" 
      step="0.01"
      :placeholder="placeholder"
      class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      style="padding-left: 2.5rem;"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
