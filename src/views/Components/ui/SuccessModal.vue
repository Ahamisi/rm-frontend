<template>
  <!-- Custom Success Modal - No header, keep footer border -->
  <Transition name="modal" appear>
    <div v-if="show" class="fixed inset-0 bg-black/50 z-[99999999999999] flex items-center justify-center">
      <div class="rounded-lg bg-white w-[380px] max-w-[90vw] mx-auto shadow-lg">
        <!-- Modal Body - No header section -->
        <div class="p-8">
          <div class="text-center">
            <!-- Success Icon - Your specific SVG -->
            <div class="flex justify-center mb-6">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#22A06B"/>
                <path d="M18.7867 28.5635C18.4707 28.2275 18.0349 28.0298 17.5739 28.0134C17.113 27.997 16.6642 28.1632 16.3252 28.476C15.9861 28.7887 15.7843 29.2226 15.7635 29.6834C15.7427 30.1442 15.9047 30.5945 16.2142 30.9365L22.5352 37.7947C23.4749 38.7152 24.8749 38.7152 25.7447 37.8472L26.3817 37.219C28.6821 34.9566 30.9798 32.6915 33.2749 30.4237L33.3449 30.3537C35.4899 28.2399 37.6237 26.1147 39.7464 23.9785C40.0637 23.6463 40.2376 23.2028 40.2307 22.7435C40.2238 22.2842 40.0366 21.8461 39.7096 21.5236C39.3825 21.2011 38.9417 21.0202 38.4824 21.0198C38.0231 21.0194 37.582 21.1996 37.2544 21.5215C35.1416 23.6466 33.0182 25.7612 30.8844 27.8652L30.8144 27.9352C28.6151 30.1093 26.413 32.2804 24.2082 34.4487L18.7867 28.5635Z" fill="white"/>
              </svg>
            </div>
            
            <!-- Title -->
            <h3 class="text-[16px] font-semibold text-gray-900 mb-4">{{ title }}</h3>
            
            <!-- Message -->
            <p class="text-gray-600 text-[14px]">{{ message }}</p>
          </div>
        </div>
        
        <!-- Divider before footer -->
        <div class="border-b border-gray-200"></div>
        
        <!-- Footer with Done Button -->
        <div class="p-4">
          <div class="flex justify-end">
            <button 
              @click="$emit('close')"
              class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
  message: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
/* Modal transition styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div > div,
.modal-leave-active > div > div {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div > div,
.modal-leave-to > div > div {
  transform: scale(0.95) translateY(-20px);
}

/* Responsive styles */
@media (max-width: 480px) {
  .modal-container {
    width: 95vw !important;
    margin: 0 10px !important;
  }
}
</style>
