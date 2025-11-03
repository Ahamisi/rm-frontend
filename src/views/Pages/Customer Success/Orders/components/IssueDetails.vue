<template>
  <div class="p-6">
    <div v-if="issue" class="space-y-6">
      <!-- Issue Header -->
      <div class="border-b border-gray-200 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">Issue #{{ issue.id }}</h3>
        <p class="text-sm text-gray-600">Order: {{ issue.orderNumber }}</p>
      </div>

      <!-- Issue Details -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Issue Type</label>
          <p class="mt-1 text-sm text-gray-900">{{ issue.issueType }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Priority</label>
          <span :class="getPriorityClass(issue.priority)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ issue.priority }}
          </span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <span :class="getStatusClass(issue.status)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {{ issue.status }}
          </span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Created Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ issue.createdDate }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Assigned To</label>
          <div v-if="issue.assigned" class="mt-1 flex items-center gap-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                 :style="{ backgroundColor: getAvatarColor(issue.assigned), color: 'white' }">
              {{ getInitials(issue.assigned) }}
            </div>
            <span class="text-sm text-gray-900">{{ issue.assigned }}</span>
          </div>
          <p v-else class="mt-1 text-sm text-gray-400">Unassigned</p>
        </div>
      </div>

      <!-- Description -->
      <div v-if="issue.description">
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <p class="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{{ issue.description }}</p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Close
        </button>
        <button @click="handleIssueUpdate" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Update Issue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  issue: any
}>()

// Emits
const emit = defineEmits<{
  'close': []
  'issue-updated': []
}>()

// Methods
const handleIssueUpdate = () => {
  // Handle issue update logic
  emit('issue-updated')
}

const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    'Open': 'bg-red-100 text-red-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority: string) => {
  const priorityClasses: { [key: string]: string } = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
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
