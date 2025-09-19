<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"  style="z-index: 999999; height: 100vh !important;">
    <div class="bg-white rounded-[16px] shadow-xl w-[426px] max-w-[90vw] mx-4" :style="customWidth ? { width: customWidth, maxWidth: '90vw' } : {}">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="#C9372C"/>
            </svg>
          </div>
          <h3 class="text-lg font-[500] text-[#172B4D]">Delete</h3>
        </div>
        <Button type="gray-btn" :onClick="() => $emit('cancel')" classStyle="text-[#44546F] hover:text-[#172B4D] -mr-2 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1846 7.4L12.0006 10.585L8.81464 7.399C8.71938 7.30584 8.59127 7.25393 8.45803 7.25449C8.32478 7.25505 8.19712 7.30804 8.10264 7.402L7.40264 8.103C7.35472 8.14897 7.31652 8.20409 7.2903 8.2651C7.26408 8.3261 7.25038 8.39175 7.25001 8.45815C7.24963 8.52455 7.2626 8.59035 7.28813 8.65165C7.31366 8.71295 7.35124 8.7685 7.39864 8.815L10.5836 11.999L7.39964 15.185C7.30661 15.2804 7.25488 15.4086 7.25563 15.5418C7.25638 15.6751 7.30955 15.8027 7.40364 15.897L8.10364 16.597C8.30964 16.804 8.61964 16.797 8.81564 16.601L12.0016 13.416L15.1856 16.601C15.281 16.694 15.4092 16.7458 15.5425 16.745C15.6757 16.7443 15.8033 16.6911 15.8976 16.597L16.5986 15.897C16.6465 15.851 16.6846 15.7958 16.7108 15.7347C16.7369 15.6737 16.7505 15.608 16.7508 15.5416C16.7511 15.4752 16.738 15.4095 16.7124 15.3482C16.6868 15.2869 16.6491 15.2314 16.6016 15.185L13.4156 11.999L16.6016 8.815C16.6948 8.71974 16.7467 8.59163 16.7462 8.45838C16.7456 8.32514 16.6926 8.19748 16.5986 8.103L15.8986 7.403C15.8517 7.35497 15.7958 7.31672 15.734 7.29046C15.6722 7.2642 15.6058 7.25045 15.5386 7.25C15.4728 7.25054 15.4078 7.26407 15.3472 7.28981C15.2866 7.31555 15.2317 7.35299 15.1856 7.4H15.1846Z" fill="currentColor"/>
          </svg>
        </Button>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-6">
        <p class="text-[#44546F] text-[14px] font-[400] mb-2" v-html="formatMessage(message)">
        </p>
        <p class="text-[#44546F] text-[14px] font-[400]" v-html="formatMessage(subMessage || 'This action will permanently remove it from the system.')">
        </p>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-6 border-t border-gray-200">
        <Button 
          type="gray-btn"
          :onClick="() => $emit('cancel')"
          classStyle="px-4 py-2"
        >
          Cancel
        </Button>
        <Button 
          type="red-btn"
          :onClick="() => $emit('confirm')"
          classStyle="px-4 py-2"
        >
          {{ confirmText || 'Delete' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/views/Components/ui/Button.vue'

defineProps<{
  show: boolean;
  message: string;
  subMessage?: string;
  confirmText?: string;
  customWidth?: string;
}>();

// Function to automatically bold text within quotes
const formatMessage = (text: string) => {
  // Replace text within double quotes with bold
  return text.replace(/"([^"]*)"/g, '<strong>"$1"</strong>')
             // Replace text within single quotes with bold  
             .replace(/'([^']*)'/g, '<strong>\'$1\'</strong>');
};

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped>
/* Responsive styles */
@media (max-width: 480px) {
  .bg-white {
    width: 95vw !important;
    margin: 0 10px !important;
  }
}
</style>
