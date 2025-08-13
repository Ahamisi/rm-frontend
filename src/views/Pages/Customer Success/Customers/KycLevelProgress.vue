<template>
    <div class="px-6 py-4 rounded-lg wrapper">

        <!-- Status Badge -->
        <div class="mb-6">
            <div
                class="inline-flex items-center gap-2 bg-blue-100 rounded-lg tier_verified_text">
                <span >Verified: Tier {{ kycLevel }}</span>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6954_188297)">
                        <path
                            d="M12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5C5 12.366 8.13401 15.5 12 15.5Z"
                            stroke="#0055CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.21 14.39L7 23.5L12 20.5L17 23.5L15.79 14.38" stroke="#0055CC" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_6954_188297">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>


            </div>
        </div>

        <!-- Progress Line -->
        <div class="relative">
            <!-- Background line -->
            <div class="absolute left-0 right-0 h-1 transform -translate-y-1/2 bg-gray-200 rounded-full top-[12px] p-1">
            </div>

            <!-- Progress line -->
            <div class="absolute left-0 h-1 transition-all duration-500 transform -translate-y-1/2 bg-blue-500 rounded-full top-[12px] p-1"
                :style="{ width: progressWidth }"></div>

            <!-- Tier circles and labels -->
            <div class="relative flex items-center justify-between">
                <div v-for="tier in tiers" :key="tier.number" class="flex flex-col items-baseline">
                    <!-- Circle -->
                    <div class="relative z-10 flex items-center justify-center w-6 h-6 text-lg font-bold text-white transition-all duration-300 rounded-full"
                        :class="[getCircleClass(tier.number), { 'self-end': tier.number == 3 }]">
                        <svg v-if="tier.number <= kycLevel" class="w-5 h-5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span v-else>{{ tier.number }}</span>
                    </div>

                    <!-- Label -->
                    <span class="mt-3 transition-colors duration-300 tier_text">
                        {{ tier.label }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Demo controls (remove in production) -->
        <!-- <div class="p-4 mt-8 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-3 text-sm font-medium text-gray-700">Demo Controls:</h3>
            <div class="flex gap-2">
                <button v-for="level in [1, 2, 3]" :key="level" @click="setKycLevel(level)"
                    class="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                    Tier {{ level }}
                </button>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Types
interface KycTier {
    number: number
    label: string
}

// Props
interface Props {
    initialKycLevel?: number
}

const props = withDefaults(defineProps<Props>(), {
    initialKycLevel: 2
})

// Reactive state
const kycLevel = ref<number>(props.initialKycLevel)

// Tier configuration
const tiers: KycTier[] = [
    { number: 1, label: 'Tier 1' },
    { number: 2, label: 'Tier 2' },
    { number: 3, label: 'Tier 3' }
]

// Computed properties
const progressWidth = computed(() => {
    const percentage = (kycLevel.value - 1) / (tiers.length - 1) * 100
    return `${percentage}%`
})

// Methods
const getCircleClass = (tierNumber: number): string => {
    if (tierNumber <= kycLevel.value) {
        return 'bg-blue-700 shadow-lg'
    } else {
        return 'tier_rounded text-gray-600'
    }
}

const getLabelClass = (tierNumber: number): string => {
    if (tierNumber <= kycLevel.value) {
        return 'text-blue-700'
    } else {
        return 'text-gray-500'
    }
}

const setKycLevel = (level: number): void => {
    kycLevel.value = level
}

// Expose methods for parent component
defineExpose({
    setKycLevel
})
</script>

<style>
.tier_text {
    font-size: 12px;
    font-style: normal;
    font-weight: 590;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
    letter-spacing: -0.25px;
}

.tier_rounded {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(98, 111, 134, 1);
    border-radius: 100%;
    border: 1px solid rgba(98, 111, 134, 1);
    background: rgba(247, 248, 249, 1);
}

.tier_verified_text {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: rgba(0, 85, 204, 1);
    background: rgba(233, 242, 255, 1);
    border: 1px solid rgba(233, 242, 255, 1);
    padding: 4px 6px;
}
.wrapper{
    border-radius: 12px;
    background: rgba(247, 248, 249, 1);
}
</style>