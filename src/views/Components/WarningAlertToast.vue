<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex justify-center pointer-events-none">
      <Transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="transform -translate-y-full opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-out" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-full opacity-0" @after-leave="onAfterLeave">
        <div v-if="showToast" class="mt-8 pointer-events-auto">
          <div class="flex items-center px-6 py-4 space-x-3 bg-[#FFF7E6] text-[#172B4D] rounded-full shadow-lg alert_wrapper min-w-max">
            <!-- Warning Icon -->
            <div class="flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0616 4.96699C11.5776 3.99299 12.4196 3.98899 12.9376 4.96699L20.0616 18.425C20.5776 19.399 20.1066 20.196 19.0046 20.196H4.99458C3.89258 20.196 3.41958 19.403 3.93758 18.425L11.0616 4.96699ZM11.2925 14.7071C11.48 14.8946 11.7344 15 11.9996 15C12.2648 15 12.5192 14.8946 12.7067 14.7071C12.8942 14.5196 12.9996 14.2652 12.9996 14V8.99998C12.9996 8.73477 12.8942 8.48041 12.7067 8.29288C12.5192 8.10534 12.2648 7.99998 11.9996 7.99998C11.7344 7.99998 11.48 8.10534 11.2925 8.29288C11.1049 8.48041 10.9996 8.73477 10.9996 8.99998V14C10.9996 14.2652 11.1049 14.5196 11.2925 14.7071ZM11.2925 17.7071C11.48 17.8946 11.7344 18 11.9996 18C12.2648 18 12.5192 17.8946 12.7067 17.7071C12.8942 17.5196 12.9996 17.2652 12.9996 17C12.9996 16.7348 12.8942 16.4804 12.7067 16.2929C12.5192 16.1053 12.2648 16 11.9996 16C11.7344 16 11.48 16.1053 11.2925 16.2929C11.1049 16.4804 10.9996 16.7348 10.9996 17C10.9996 17.2652 11.1049 17.5196 11.2925 17.7071Z" fill="#E56910"/>
              </svg>
            </div>

            <!-- Message -->
            <span class="text-sm font-medium">
              {{ message }}
            </span>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// Props
const props = defineProps({
  message: {
    type: String,
    default: "Warning"
  },
  duration: {
    type: Number,
    default: 3000
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// Reactive state
const showToast = ref(false)

// Watch for prop changes
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    showToast.value = true

    // Auto close after duration
    setTimeout(() => {
      closeToast()
    }, props.duration)
  } else {
    showToast.value = false
  }
})

const closeToast = () => {
  showToast.value = false
}

const onAfterLeave = () => {
  emit('close')
}

// For demo purposes - show toast on mount if isVisible is true
onMounted(() => {
  if (props.isVisible) {
    showToast.value = true

    setTimeout(() => {
      closeToast()
    }, props.duration)
  }
})
</script>
