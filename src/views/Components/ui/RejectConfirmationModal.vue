<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 999999;">
    <div class="bg-white rounded-[16px] shadow-xl w-[426px] max-w-[90vw] mx-4" :style="customWidth ? { width: customWidth, maxWidth: '90vw' } : {}">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16.4996 15.3242C16.4995 15.0124 16.3755 14.7134 16.155 14.493L13.662 12L16.155 9.507C16.2641 9.39788 16.3507 9.26832 16.4098 9.12574C16.4688 8.98316 16.4992 8.83034 16.4992 8.676C16.4992 8.52167 16.4688 8.36885 16.4098 8.22627C16.3507 8.08369 16.2641 7.95413 16.155 7.845C16.0459 7.73588 15.9163 7.64931 15.7737 7.59025C15.6312 7.53119 15.4783 7.50079 15.324 7.50079C15.1697 7.50079 15.0169 7.53119 14.8743 7.59025C14.7317 7.64931 14.6021 7.73588 14.493 7.845L12 10.338L9.506 7.845C9.28299 7.63776 8.98831 7.52507 8.68392 7.53065C8.37953 7.53622 8.08916 7.65962 7.87389 7.87489C7.65862 8.09016 7.53522 8.38053 7.52965 8.68492C7.52407 8.98931 7.63676 9.284 7.844 9.507L10.337 12L7.844 14.493C7.6235 14.7135 7.49962 15.0126 7.49962 15.3245C7.49962 15.6364 7.6235 15.9355 7.844 16.156C7.95292 16.2655 8.0824 16.3524 8.22501 16.4117C8.36763 16.471 8.52055 16.5016 8.675 16.5016C8.82945 16.5016 8.98238 16.471 9.12499 16.4117C9.26761 16.3524 9.39709 16.2655 9.506 16.156L12 13.662L14.493 16.156C14.7135 16.3764 15.0126 16.5002 15.3244 16.5001C15.6361 16.5 15.9351 16.376 16.1555 16.1555C16.3759 15.935 16.4997 15.6359 16.4996 15.3242Z" fill="#C9372C"/>
          </svg>
          <h3 class="text-lg font-[500] text-[#172B4D]">{{ title || 'Reject Stock Count' }}</h3>
        </div>
        <button @click="$emit('cancel')" class="text-[#44546F] hover:text-[#172B4D] -mr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1846 7.4L12.0006 10.585L8.81464 7.399C8.71938 7.30584 8.59127 7.25393 8.45803 7.25449C8.32478 7.25505 8.19712 7.30804 8.10264 7.402L7.40264 8.103C7.35472 8.14897 7.31652 8.20409 7.2903 8.2651C7.26408 8.3261 7.25038 8.39175 7.25001 8.45815C7.24963 8.52455 7.2626 8.59035 7.28813 8.65165C7.31366 8.71295 7.35124 8.7685 7.39864 8.815L10.5836 11.999L7.39964 15.185C7.30661 15.2804 7.25488 15.4086 7.25563 15.5418C7.25638 15.6751 7.30955 15.8027 7.40364 15.897L8.10364 16.597C8.30964 16.804 8.61964 16.797 8.81564 16.601L12.0016 13.416L15.1856 16.601C15.281 16.694 15.4092 16.7458 15.5425 16.745C15.6757 16.7443 15.8033 16.6911 15.8976 16.597L16.5986 15.897C16.6465 15.851 16.6846 15.7958 16.7108 15.7347C16.7369 15.6737 16.7505 15.608 16.7508 15.5416C16.7511 15.4752 16.738 15.4095 16.7124 15.3482C16.6868 15.2869 16.6491 15.2314 16.6016 15.185L13.4156 11.999L16.6016 8.815C16.6948 8.71974 16.7467 8.59163 16.7462 8.45838C16.7456 8.32514 16.6926 8.19748 16.5986 8.103L15.8986 7.403C15.8517 7.35497 15.7958 7.31672 15.734 7.29046C15.6722 7.2642 15.6058 7.25045 15.5386 7.25C15.4728 7.25054 15.4078 7.26407 15.3472 7.28981C15.2866 7.31555 15.2317 7.35299 15.1856 7.4H15.1846Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="px-6 py-6">
        <div>
          <p class="text-[#44546F] text-[14px] font-[400] mb-2">
            {{ message }}
          </p>
          <p class="text-[#44546F] text-[12px] font-[400]">
            {{ subMessage || 'This action will permanently delete this stock count from the system.' }}
          </p>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-6 border-t border-gray-200">
        <button 
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-[500] text-gray-700 bg-[#e5e7eb] rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')"
          class="px-4 py-2 text-sm font-[500] bg-[#C9372C] text-white rounded-md hover:bg-red-700"
        >
          {{ confirmText || 'Reject Stock Count' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  message: string;
  subMessage?: string;
  confirmText?: string;
  title?: string;
  customWidth?: string;
}>();

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
