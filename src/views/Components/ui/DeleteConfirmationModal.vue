<template>
  <UniversalCenteredModal
    :show="show"
    @close="$emit('cancel')"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#C9372C"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Delete</h3>
      </div>
    </template>

    <template #body>
      <div class="text-center py-4">
        <p class="text-gray-900 mb-2">
          {{ message }}
        </p>
        <p class="text-gray-600 text-sm">
          {{ subMessage || 'This action will permanently remove it from the system.' }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-3 p-4">
        <button 
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')"
          class="px-4 py-2 text-sm font-medium text-white text-[#44546F] rounded-md hover:bg-red-700"
        >
          {{ confirmText || 'Delete' }}
        </button>
      </div>
    </template>
  </UniversalCenteredModal>
</template>

<script setup lang="ts">
import UniversalCenteredModal from '../UniversalCenteredModal.vue';

defineProps<{
  show: boolean;
  message: string;
  subMessage?: string;
  confirmText?: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>
