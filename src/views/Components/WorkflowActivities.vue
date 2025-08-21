<template>
  <div class="space-y-0">
    <div 
      v-for="(activity, index) in activities" 
      :key="index" 
      class="flex items-start relative"
      :style="{ marginBottom: index < activities.length - 1 ? '36px' : '0' }"
    >
      <!-- Vertical Line (except for last item) -->
      <div 
        v-if="index < activities.length - 1"
        class="absolute w-0.5 bg-gray-200 z-0"
        :style="{ 
          left: '15px', 
          top: '45px', 
          height: '36px'
        }"
      ></div>

      <!-- Activity Icon -->
      <div 
        class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full z-10 relative"
        :style="{ backgroundColor: getDepartmentIcon(activity.department).bgColor }"
      >
        <div v-html="getDepartmentIcon(activity.department).svg"></div>
      </div>

      <!-- Activity Content -->
      <div class="flex-1 min-w-0 ml-3">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="text-sm font-semibold" style="color: #626F86;">{{ activity.department }}</h4>
            <p class="mt-1 text-xs" style="color: #626F86;">
              {{ activity.statusChange }}
            </p>
          </div>
          <div class="text-right">
            <span class="text-xs whitespace-nowrap block" style="color: #626F86;">Time Taken: {{ activity.timeTaken }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WorkflowActivity {
  department: string;
  statusChange: string;
  timeTaken: string;
}

interface Props {
  activities: WorkflowActivity[];
}

defineProps<Props>();

// Department icon component
const getDepartmentIcon = (department: string) => {
  const iconMap: Record<string, { svg: string; bgColor: string }> = {
    'Accounting': {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" fill="white"/>
        <path d="M4 6H12V7H4V6Z" fill="#E56910"/>
        <path d="M4 8H12V9H4V8Z" fill="#E56910"/>
        <path d="M4 10H8V11H4V10Z" fill="#E56910"/>
      </svg>`,
      bgColor: '#E56910'
    },
    'Inventory': {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L11 2H3Z" fill="white"/>
        <path d="M11 2V5H14" stroke="#0C66E4" stroke-width="1" fill="none"/>
        <path d="M4 7H10V8H4V7Z" fill="#0C66E4"/>
        <path d="M4 9H10V10H4V9Z" fill="#0C66E4"/>
        <path d="M4 11H7V12H4V11Z" fill="#0C66E4"/>
      </svg>`,
      bgColor: '#0C66E4'
    },
    'Logistics': {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4C2 3.44772 2.44772 3 3 3H9V5H11L13 7V11H12C12 12.1046 11.1046 13 10 13C8.89543 13 8 12.1046 8 11H6C6 12.1046 5.10457 13 4 13C2.89543 13 2 12.1046 2 11V4Z" fill="white"/>
        <circle cx="4" cy="11" r="1" fill="#22C55E"/>
        <circle cx="10" cy="11" r="1" fill="#22C55E"/>
        <path d="M9 5H11L13 7H9V5Z" fill="#22C55E"/>
      </svg>`,
      bgColor: '#22C55E'
    },
    'Quality Control': {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2L10.5 4.5L14 4L13.5 7.5L16 8L13.5 8.5L14 12L10.5 11.5L8 14L5.5 11.5L2 12L2.5 8.5L0 8L2.5 7.5L2 4L5.5 4.5L8 2Z" fill="white"/>
        <path d="M6 8L7 9L10 6" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      bgColor: '#8B5CF6'
    },
    'Dispatch': {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3C1 2.44772 1.44772 2 2 2H14C14.5523 2 15 2.44772 15 3V11C15 11.5523 14.5523 12 14 12H2C1.44772 12 1 11.5523 1 11V3Z" fill="white"/>
        <path d="M1 3L8 8L15 3" stroke="#F59E0B" stroke-width="1" fill="none"/>
        <path d="M3 14H13" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
      </svg>`,
      bgColor: '#F59E0B'
    }
  };

  // Default to blue icon for other departments
  return iconMap[department] || {
    svg: iconMap['Inventory'].svg,
    bgColor: '#0C66E4'
  };
};
</script>
