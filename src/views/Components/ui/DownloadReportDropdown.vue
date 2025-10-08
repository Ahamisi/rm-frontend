<template>
  <div v-if="isOpen" class="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50" @click.stop>
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200">
      <h3 class="text-sm font-semibold text-gray-900">Download Report</h3>
    </div>

    <!-- Content -->
    <div class="px-4 py-4 space-y-4">
      <!-- Date Range -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">From</label>
          <DateInput v-model="dateRange.from" placeholder="dd/mm/yyyy" inputClass="p-2 pr-8 text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">To</label>
          <DateInput v-model="dateRange.to" placeholder="dd/mm/yyyy" inputClass="p-2 pr-8 text-xs" />
        </div>
      </div>

      <!-- Include in report -->
      <div>
        <h4 class="text-xs font-medium text-gray-900 mb-2">Include in report</h4>
        <div class="space-y-1">
          <label v-for="status in orderStatuses" :key="status" class="flex items-center">
            <input 
              type="radio" 
              :value="status" 
              v-model="selectedStatus"
              class="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span class="ml-2 text-xs text-gray-700">{{ status }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-gray-200 flex justify-end">
      <Button type="blue-btn" :onClick="handleDownload" classStyle="px-4 py-1 text-xs">
        Download
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DateInput from '@/views/Components/ui/DateInput.vue'
import Button from '@/views/Components/ui/Button.vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  download: [data: { from: string; to: string; status: string }]
}>()

const dateRange = ref({
  from: '',
  to: ''
})

const selectedStatus = ref('')

const orderStatuses = [
  'Awaiting Shipment',
  'Shipped to Hub',
  'At Hub',
  'Shipped via Third Party',
  'Shipped to Customer'
]

const handleDownload = () => {
  emit('download', {
    from: dateRange.value.from,
    to: dateRange.value.to,
    status: selectedStatus.value
  })
  emit('close')
}
</script>
