<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="handleBackdropClick">
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div ref="modalRef" class="relative bg-white shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden transform"
          @click.stop>
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center space-x-2">
              <h3 class="text-lg font-semibold text-gray-900 modal_title">Activities</h3>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2.91933 0.833374C2.45725 0.833374 2.0835 1.20504 2.0835 1.66254V8.33754C2.08493 8.55816 2.17366 8.76924 2.33029 8.92462C2.48692 9.08 2.6987 9.16704 2.91933 9.16671H7.081C7.54308 9.16671 7.91683 8.79546 7.91683 8.33754V1.66254C7.91683 1.20754 7.54266 0.833374 7.081 0.833374H2.91933ZM3.75016 2.50004H6.25016C6.48028 2.50004 6.66683 2.68659 6.66683 2.91671C6.66683 3.14683 6.48028 3.33337 6.25016 3.33337H3.75016C3.52004 3.33337 3.3335 3.14683 3.3335 2.91671C3.3335 2.68659 3.52004 2.50004 3.75016 2.50004ZM6.25016 3.75004H3.75016C3.52004 3.75004 3.3335 3.93659 3.3335 4.16671C3.3335 4.39683 3.52004 4.58337 3.75016 4.58337H6.25016C6.48028 4.58337 6.66683 4.39683 6.66683 4.16671C6.66683 3.93659 6.48028 3.75004 6.25016 3.75004ZM3.75016 5.00004H4.5835C4.81362 5.00004 5.00016 5.18659 5.00016 5.41671C5.00016 5.64683 4.81362 5.83337 4.5835 5.83337H3.75016C3.52004 5.83337 3.3335 5.64683 3.3335 5.41671C3.3335 5.18659 3.52004 5.00004 3.75016 5.00004Z"
                  fill="#44546F" />
              </svg>
              <span v-if="refNumber"
                class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md ref_number">
                REF: {{ refNumber }}
              </span>
            </div>
            <button @click="closeModal" class="p-1 transition-colors duration-200 rounded-lg hover:bg-gray-200">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center p-8">
              <div class="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-4 text-center">
              <p class="text-red-600">{{ error }}</p>
              <button @click="fetchActivities" class="px-4 py-2 mt-2 text-sm text-blue-600 hover:text-blue-700">
                Try Again
              </button>
            </div>

            <!-- Activities List -->
            <div v-else class="p-4">
              <h4 class="mb-4 text-sm font-medium text-gray-500">Recent</h4>

              <div v-if="activities.length === 0" class="py-8 text-center text-gray-500">
                No activities found
              </div>

              <div v-else class="space-y-4">
                <!-- Activity Item -->
                <div v-for="activity in activities" :key="activity.id"
                  class="flex items-start p-2 space-x-3 transition-colors duration-200 rounded-lg group hover:bg-gray-50">
                  <!-- Status Icon -->
                  <div class="flex-shrink-0">
                    <div :class="getStatusIconClass(activity.type)"
                      class="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full">
                      {{ getStatusIcon(activity.type) }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900 activity_title">
                        {{ activity.title }}
                      </p>
                      <span class="flex-shrink-0 ml-2 text-xs text-gray-500 activity_time">
                        {{ activity.time }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-600 activity_log">
                      {{ activity.description }}
                      <span v-if="activity.assignee" class="text-blue-600 cursor-pointer hover:text-blue-700">
                        {{ activity.assignee }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="flex justify-end">
              <button @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type ActivityType = 'created' | 'updated' | 'deleted' | 'assigned' | 'unassigned' | 'approved' | 'grn_added' | 'grn_assigned' | 'grn_confirmed' | 'other';

interface Activity {
  id: number
  type: ActivityType
  title: string
  description: string
  assignee?: string
  time: string
}

interface Props {
  isOpen: boolean
  purchaseOrderId?: number | null
}

interface Emits {
  (e: 'close'): void
  (e: 'update:isOpen', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  purchaseOrderId: null
})

const emit = defineEmits<Emits>()

const modalRef = ref<HTMLElement>()
const activities = ref<Activity[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const refNumber = ref<string>('')

const getStatusIconClass = (type: ActivityType): string => {
  const classes = {
    created: 'bg-blue-500',
    assigned: 'bg-blue-500',
    approved: 'bg-blue-500',
    grn_added: 'bg-green-500',
    grn_assigned: 'bg-green-500',
    grn_confirmed: 'bg-green-500',
    updated: 'bg-yellow-500',
    deleted: 'bg-red-500',
    unassigned: 'bg-gray-500',
    other: 'bg-gray-500'
  }
  return classes[type] || 'bg-gray-500'
}

const getStatusIcon = (type: ActivityType): string => {
  const icons = {
    created: '→',
    assigned: '→',
    approved: '✓',
    grn_added: '+',
    grn_assigned: '→',
    grn_confirmed: '✓',
    updated: '↻',
    deleted: '×',
    unassigned: '←',
    other: '•'
  }
  return icons[type] || '•'
}

const getActivityType = (action: string): ActivityType => {
  if (action.includes('created')) return 'created'
  if (action.includes('updated')) return 'updated'
  if (action.includes('deleted')) return 'deleted'
  if (action.includes('assigned') && !action.includes('unassigned')) return 'assigned'
  if (action.includes('unassigned')) return 'unassigned'
  if (action.includes('approved')) return 'approved'
  if (action.includes('GRN') && action.includes('added')) return 'grn_added'
  if (action.includes('GRN') && action.includes('assigned')) return 'grn_assigned'
  if (action.includes('GRN') && action.includes('confirmed')) return 'grn_confirmed'
  return 'other'
}

const fetchActivities = async (): Promise<void> => {
  if (!props.purchaseOrderId) return

  loading.value = true
  error.value = null

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}purchase_orders/${props.purchaseOrderId}/logs`
    )

    activities.value = response.data.data.map(activity => ({
      id: activity.id,
      type: getActivityType(activity.action.toLowerCase()),
      title: activity.action.substr(0, activity.action.indexOf(' RHPO-')),
      description: activity.action,
      assignee: activity.user ? `@${activity.user.name}` : '',
      time: dayjs(activity.created_at).fromNow()
    }))

    // Extract ref number from the first activity if available
    if (activities.value.length > 0) {
      const firstActivity = activities.value[0]
      const refMatch = firstActivity.description.match(/RHPO-[\d-]+/)
      if (refMatch) {
        refNumber.value = refMatch[0]
      }
    }
  } catch (err: any) {
    console.error('Error fetching activities:', err)
    error.value = err.response?.data?.message || 'Failed to load activities'
  } finally {
    loading.value = false
  }
}

const closeModal = (): void => {
  emit('update:isOpen', false)
  emit('close')
  // Reset state when closing
  activities.value = []
  error.value = null
  refNumber.value = ''
}

const handleBackdropClick = (): void => {
  closeModal()
}

const handleEscape = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// Watch for modal opening and purchase order ID changes
watch([() => props.isOpen, () => props.purchaseOrderId], ([newIsOpen, newPurchaseOrderId]) => {
  if (newIsOpen && newPurchaseOrderId) {
    fetchActivities()
    document.body.style.overflow = 'hidden'
  } else if (!newIsOpen) {
    document.body.style.overflow = 'auto'
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9) translateY(-20px);
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-to .relative,
.modal-leave-from .relative {
  transform: scale(1) translateY(0);
}

.modal_title {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}

.ref_number {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: rgba(98, 111, 134, 1);
}

.activity_title {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.25px;
  color: rgba(23, 43, 77, 1);
}

.activity_log {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: rgba(68, 84, 111, 1);
}

.activity_time {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  color: rgba(98, 111, 134, 1);
}
</style>