<template>
  <SideBarModal
    v-if="isOpen"
    :isOpen="isOpen"
    width="lg"
    @close="$emit('close')"
  >
    <template #header>
      <OrderHeader 
        title="Time Tracker" 
        :reference="`REF: ${orderRef}`"
        titleSize="md"
      />
    </template>
    <div class="space-y-6">
      <TimeTrackerContent :stages="stages" />
    </div>
  </SideBarModal>
</template>

<script setup lang="ts">
import SideBarModal from '@/views/Components/SideBarModal.vue';
import TimeTrackerContent from '@/views/Components/TimeTrackerContent.vue';
import OrderHeader from '@/views/Components/ui/OrderHeader.vue';

interface Props {
  isOpen: boolean;
  orderRef: string;
  stages: Array<{
    id: number;
    department: string;
    process: string;
    time: string;
    color: string;
  }>;
}

defineProps<Props>();

defineEmits<{
  close: [];
}>();
</script>
