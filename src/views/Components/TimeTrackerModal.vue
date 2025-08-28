<template>
  <SideBarModal
    v-if="isOpen"
    :isOpen="isOpen"
    :title="`Time Tracker REF: ${orderRef}`"
    width="lg"
    @close="$emit('close')"
  >
    <div class="space-y-6">
      <h3 class="text-xs font-medium text-gray-500 mb-4">Recent</h3>
      <WorkflowActivities 
        :activities="activities" 
      />
    </div>
  </SideBarModal>
</template>

<script setup lang="ts">
import SideBarModal from '@/views/Components/SideBarModal.vue';
import WorkflowActivities from '@/views/Components/WorkflowActivities.vue';

interface Props {
  isOpen: boolean;
  orderRef: string;
  activities: Array<{
    department: string;
    statusChange: string;
    timeTaken: string;
  }>;
}

defineProps<Props>();

defineEmits<{
  close: [];
}>();
</script>
