<template>
  <div class="p-6">
    <div v-if="order" class="space-y-6">
      <!-- Order Header -->
      <div class="border-b border-gray-200 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ order.orderNo }}</h3>
        <p class="text-sm text-gray-600">{{ order.customerName }} - {{ order.storeName }}</p>
      </div>

      <!-- Order Details -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Order Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.orderDate }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Delivery Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.deliveryDate }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">State</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.state }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Payment</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.payment }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Total Amount</label>
          <p class="mt-1 text-sm font-semibold text-gray-900">{{ order.totalAmount }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Assigned To</label>
          <div v-if="order.assigned" class="mt-1 flex items-center gap-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                 :style="{ backgroundColor: getAvatarColor(order.assigned), color: 'white' }">
              {{ getInitials(order.assigned) }}
            </div>
            <span class="text-sm text-gray-900">{{ order.assigned }}</span>
          </div>
          <p v-else class="mt-1 text-sm text-gray-400">Unassigned</p>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="order.tags && order.tags.length > 0">
        <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in order.tags" :key="tag" 
                :class="getTagClass(tag)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Close
        </button>
        <button @click="handleOrderUpdate" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Update Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  order: any
}>()

// Emits
const emit = defineEmits<{
  'close': []
  'order-updated': []
}>()

// Methods
const handleOrderUpdate = () => {
  // Handle order update logic
  emit('order-updated')
}

const getTagClass = (tag: string) => {
  const tagClasses: { [key: string]: string } = {
    'Cash and Carry': 'bg-green-100 text-green-800',
    'Controlled': 'bg-purple-100 text-purple-800',
    'Hospital': 'bg-blue-100 text-blue-800'
  }
  return tagClasses[tag] || 'bg-gray-100 text-gray-800'
}

const getAvatarColor = (name: string) => {
  const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash % colors.length)
  return colors[index]
}

const getInitials = (name: string) => {
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}
</script>
