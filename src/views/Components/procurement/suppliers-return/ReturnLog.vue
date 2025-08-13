<script setup lang="ts">
import { ref, computed } from "vue";
import { LucideX, LucideCheck } from "lucide-vue-next";
import ReusableButton from "@/views/Components/procurement/ui/ReusableButton.vue";

// Props
const props = defineProps<{
  modelValue: boolean;
  activities?: {
    status: "completed" | "pending";
    title: string;
    description: string;
    time: string;
    date: string; // Added for grouping
  }[];
  reference?: string;
}>();
const emit = defineEmits(["close"]);
const copy = ref(false);

// Sample fallback activity data with full dates
const sampleActivities = [
  {
    status: "completed",
    title: "Purchase order created",
    description: "REF: 1656493689-254 has been created by @Kolade",
    time: "10:45pm",
    date: new Date().toISOString(), // Today
  },
  {
    status: "completed",
    title: "Purchase order assigned",
    description: "REF: 1656493689-254 has been assigned to @Kolade",
    time: "10:45pm",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    status: "completed",
    title: "Purchase order approved",
    description: "REF: 1656493689-254 has been approved by @Kolade",
    time: "10:45pm",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    status: "pending",
    title: "Supplier's return created",
    description: "REF: 1656493689-254 has been created by @Kolade",
    time: "10:55am",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

const formatDate = (dateString: string) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const activityDate = new Date(dateString);

  if (activityDate.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (activityDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return activityDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Group activities by date
const activityGroups = computed(() => {
  const activities = props.activities?.length
    ? props.activities
    : sampleActivities;

  const groups: { [key: string]: any[] } = {};
  activities.forEach((activity) => {
    const dateKey = formatDate(activity.date);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push({
      ...activity,
      icon:
        activity.status === "completed"
          ? "@/views/Pages/procurement/redesign/check-circle.svg"
          : "@/views/Pages/procurement/redesign/silhouette.svg", // Placeholder for pending
    });
  });

  return Object.keys(groups).map((date) => ({
    date,
    activities: groups[date],
  }));
});
</script>

<template>
  <Transition name="slide">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50"
      @click.self="$emit('close')">
      <div
        class="bg-white w-full flex flex-col md:w-[500px] h-full shadow-lg overflow-y-auto transition-transform relative">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 mb-2 border-b">
          <div class="flex items-center gap-2">
            <p class="text-sm font-semibold text-[#44546F]">Activities</p>
            <img src="@/views/Pages/procurement/redesign/copy.svg" v-if="!copy" alt="copy"
              class="w-5 h-5 cursor-pointer" @click.stop="copy = !copy" />
            <LucideCheck v-else class="w-4 h-4 text-text-subtlest" />
            <p class="text-sm text-[#626F86]">
              REF: {{ props.reference || "1656493689-254" }}
            </p>
          </div>
          <LucideX class="w-5 h-5 text-[#626F86] cursor-pointer" @click="$emit('close')" />
        </div>

        <div class="relative flex-1 p-6 pt-6 pb-20 overflow-y-auto">
          <div v-for="(group, index) in activityGroups" :key="index" class="mb-5">
            <p class="mb-4 table-norm-text text-text-subtle">
              {{ group.date }}
            </p>
            <div class="border-gray-200">
              <div v-for="(activity, idx) in group.activities" :key="idx" class="mb-6 flex items-start md:gap-[10rem]">
                <div class="flex w-3/4 space-x-3">
                  <img :src="activity.icon" alt="status" class="w-5 h-5" />
                  <div>
                    <p class="w-full table-norm-text text-text-default text-pretty">
                      {{ activity.title }}
                    </p>
                    <p class="w-full text-text-subtle table-sub-text text-nowrap">
                      {{ activity.description }}
                    </p>
                  </div>
                </div>
                <p class="text-text-subtlest table-sub-text text-nowrap">
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
          <!-- Fade Overlay -->
          <div
            class="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-white to-transparent pointer-events-none">
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end p-6 pt-4 border-t">
          <ReusableButton @click="$emit('close')" bg-color="bg-blue-600" text-color="text-white" class="medium-text">
            <span>Close</span>
          </ReusableButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
