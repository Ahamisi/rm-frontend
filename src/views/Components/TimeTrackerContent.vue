<template>
  <div class="space-y-0" :class="{ 'px-6 py-6': !props.noPadding }">
    <div v-for="(stage, index) in stages" :key="stage.id" 
         class="relative" 
         :style="{ marginBottom: index < stages.length - 1 ? '70px' : '0' }">
      <!-- Vertical connecting line (except for last item) - with 8px gap from icons -->
      <div v-if="index < stages.length - 1" 
           class="absolute left-4 w-px bg-gray-300 z-0"
           :style="{ top: '40px', height: '54px' }"></div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- Department Icon -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center z-10 relative" 
               :style="{ backgroundColor: stage.color }">
            <div v-html="getDepartmentIcon(stage.department)" class="w-4 h-4"></div>
          </div>
          <div>
            <div class="text-[12px] font-medium text-gray-800">{{ stage.department }}</div>
            <div class="text-[11px] text-gray-500">{{ stage.process }}</div>
          </div>
        </div>
        <div class="text-[11px] font-semibold text-gray-700">{{ stage.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimeTrackerStage {
  id: number;
  department: string;
  process: string;
  time: string;
  color: string;
}

interface Props {
  stages: TimeTrackerStage[];
  noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  noPadding: false
});

const getDepartmentIcon = (department: string) => {
  const icons: Record<string, string> = {
    'Accounting': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.342 11.3334H12.6753V7.33337H3.342V11.3334ZM3.342 6.00004H12.6753V4.66671H3.342V6.00004ZM12.6667 3.33337H3.33333C2.6 3.33337 2 3.93337 2 4.66671V11.3334C2 12.0667 2.6 12.6667 3.33333 12.6667H12.6667C13.4 12.6667 14 12.0667 14 11.3334V4.66671C14 3.93337 13.4 3.33337 12.6667 3.33337Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67533 10H6.00867V8.66671H4.67533V10Z" fill="white"/>
    </svg>`,
    'Inventory': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.342 11.3334H12.6753V7.33337H3.342V11.3334ZM3.342 6.00004H12.6753V4.66671H3.342V6.00004ZM12.6667 3.33337H3.33333C2.6 3.33337 2 3.93337 2 4.66671V11.3334C2 12.0667 2.6 12.6667 3.33333 12.6667H12.6667C13.4 12.6667 14 12.0667 14 11.3334V4.66671C14 3.93337 13.4 3.33337 12.6667 3.33337Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.67533 10H6.00867V8.66671H4.67533V10Z" fill="white"/>
    </svg>`,
    'Logistics': `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.38937 0.16268C7.736 0.0514369 8.10642 0.036915 8.4607 0.12068L8.6107 0.16268L12.9667 1.56001C13.0934 1.60201 13.2074 1.68068 13.2907 1.79068L13.3374 1.86068L15.1707 5.02535C15.2171 5.10528 15.2463 5.19399 15.2566 5.28584C15.2669 5.37768 15.2579 5.47065 15.2303 5.55886C15.2027 5.64706 15.1571 5.72857 15.0964 5.7982C15.0356 5.86783 14.961 5.92407 14.8774 5.96335L14.7974 5.99468L13.43 6.43335V9.32001C13.4299 9.58393 13.3515 9.84188 13.2047 10.0612C13.0579 10.2805 12.8493 10.4513 12.6054 10.552L12.504 10.5893L8.6107 11.8373C8.26407 11.9486 7.89364 11.9631 7.53937 11.8793L7.38937 11.838L3.49603 10.5893C3.24468 10.5086 3.02294 10.3551 2.85892 10.1482C2.6949 9.94138 2.59598 9.69049 2.5747 9.42735L2.57003 9.31935V6.43335L1.2027 5.99468C1.11477 5.96646 1.03365 5.92028 0.964508 5.85906C0.895361 5.79785 0.839686 5.72293 0.801014 5.63907C0.762341 5.55521 0.741515 5.46422 0.739854 5.37189C0.738193 5.27955 0.755735 5.18788 0.791366 5.10268L0.829366 5.02535L2.6627 1.86068C2.73142 1.74211 2.83501 1.6476 2.95937 1.59001L3.0327 1.56001L7.38937 0.16268ZM8.6667 6.20335V10.4193L12.0967 9.31935V6.86135L10.0367 7.52201C9.90459 7.56439 9.76255 7.56449 9.63039 7.5223C9.49822 7.48012 9.3825 7.39775 9.29937 7.28668L9.2567 7.22135L8.6667 6.20335ZM7.33337 6.20335L6.74337 7.22135C6.66713 7.3529 6.54821 7.45443 6.40635 7.50912C6.26448 7.56381 6.10818 7.56836 5.96337 7.52201L3.90337 6.86135V9.31935L7.33337 10.42V6.20335ZM3.5467 2.99335L2.39803 4.97801L5.8587 6.08868L7.0087 4.10401L3.5467 2.99335ZM12.4534 2.99335L8.99137 4.10401L10.1407 6.08868L13.602 4.97801L12.4534 2.99335ZM8.20337 1.43201C8.09783 1.39831 7.98556 1.39143 7.8767 1.41201L7.7967 1.43201L5.42003 2.19468L8.00003 3.02201L10.58 2.19468L8.20337 1.43201Z" fill="white"/>
    </svg>`
  };
  
  return icons[department] || icons['Inventory']; // Default to inventory icon
};
</script>
