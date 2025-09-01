<template>
    <div class="flex items-center justify-center">
        <!-- Dropdown Trigger -->
        <div class="px-1 rounded hover:bg-gray-200 w-fit" data-dropdown-trigger>
            <LucideEllipsisVertical class="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800"
                @click.stop="toggleDropdown($event)" />
        </div>

        <!-- Dropdown Menu -->
        <teleport to="body">
            <div v-if="isCurrentDropdownOpen" :style="dropdownStyle"
                class="absolute z-50 bg-white border border-gray-200 rounded shadow-lg w-fit dropdown-menu min-w-48">
                <ul class="text-sm text-gray-700" :class="{ 'divide-y divide-gray-200': !props.noDividers }">
                    <slot :selectedItem="rowData" :closeDropdown="closeDropdown">
                        <!-- Default menu items if no slot content provided -->
                        <li v-for="(item, index) in menuItems" :key="index"
                            class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text"
                            @click="handleItemClick(item)" v-show="!item.condition || item.condition(rowData)">
                            <component :is="item.icon" v-if="item.icon" class="w-4 h-4" :class="item.iconClass" />
                            <img v-else-if="item.iconSrc" :src="item.iconSrc" alt="" class="w-4 h-4" />
                            {{ typeof item.label === 'function' ? item.label(rowData) : item.label }}
                        </li>
                    </slot>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, onMounted, watch, ref } from "vue";
import { LucideEllipsisVertical } from "lucide-vue-next";
import { MenuItem } from "@/types";
import { useGlobalStore } from "@/stores/global";

const props = defineProps<{
    rowData: any;
    menuItems?: MenuItem[];
    dropdownId?: string;
    noDividers?: boolean;
}>();

const emit = defineEmits<{
    menuAction: [actionId: string, item: any];
    itemSelected: [item: any];
    actionOpened;
}>();

// Global state for managing dropdowns (shared across all instances)
const globalDropdownState = (() => {
    // Use a global object to share state between component instances
    if (!window.__dropdownStore) {
        window.__dropdownStore = {
            activeDropdownId: ref<string | null>(null),
            dropdownPosition: ref({ top: 0, left: 0 }),
            anchorEl: ref<HTMLElement | null>(null)
        };
    }
    return window.__dropdownStore;
})();

const { activeDropdownId, dropdownPosition, anchorEl } = globalDropdownState;

// Generate unique ID for this dropdown
const dropdownId = computed(() =>
    props.dropdownId || `dropdown-${props.rowData?.id || Math.random().toString(36).substr(2, 9)}`
);

const globalStore = useGlobalStore();

// Check if this specific dropdown is open
const isCurrentDropdownOpen = computed(() =>
    activeDropdownId.value === dropdownId.value &&
    globalStore.openDropdownId === dropdownId.value
);

const dropdownStyle = computed(() => ({
    position: "absolute" as const,
    top: `${dropdownPosition.value.top}px`,
    left: `${dropdownPosition.value.left}px`,
    zIndex: 50,
}));

const updateDropdownPosition = () => {
    if (!anchorEl.value) return;
    
    const rect = anchorEl.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dropdownHeight = 200; // Estimated dropdown height
    const dropdownWidth = 192; // min-w-48 = 192px (12rem * 16px)
    
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = viewportWidth - rect.right;

    // Show above if there's not enough space below and there's more space above
    const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    
    // Calculate top position
    const topPosition = showAbove
        ? rect.top + window.scrollY - dropdownHeight - 7
        : rect.bottom + window.scrollY + 7;

    // Always align to the right edge of the trigger
    // If there's not enough space on the right, adjust to fit in viewport
    let leftPosition = rect.right + window.scrollX - dropdownWidth;
    
    // If dropdown would go off the left edge, adjust it
    if (leftPosition < window.scrollX + 10) {
        leftPosition = window.scrollX + 10;
    }
    
    // If dropdown would go off the right edge, align it to the right edge of viewport
    if (leftPosition + dropdownWidth > window.scrollX + viewportWidth - 10) {
        leftPosition = window.scrollX + viewportWidth - dropdownWidth - 10;
    }

    dropdownPosition.value = {
        top: topPosition,
        left: leftPosition,
    };
};

const openDropdown = (id: string, element: HTMLElement) => {
    activeDropdownId.value = id;
    anchorEl.value = element;
    updateDropdownPosition();
};

const closeDropdown = () => {
    activeDropdownId.value = null;
    anchorEl.value = null;
};

const toggleDropdown = (event: MouseEvent) => {
    emit('actionOpened');

    if (isCurrentDropdownOpen.value) {
        closeDropdown();
        globalStore.closeDropdown();
    } else {
        const target = event.currentTarget as HTMLElement;
        openDropdown(dropdownId.value, target);
        globalStore.toggleDropdown(dropdownId.value);
        emit('itemSelected', props.rowData);
    }
};

const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown-menu');
    const trigger = (event.currentTarget as HTMLElement)?.closest?.('[data-dropdown-trigger]');

    if (
        isCurrentDropdownOpen.value &&
        dropdown &&
        !dropdown.contains(target) &&
        anchorEl.value &&
        !anchorEl.value.contains(target)
    ) {
        closeDropdown();
        globalStore.closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
});

const handleItemClick = (menuItem: MenuItem) => {
    emit('menuAction', menuItem.action, props.rowData);
    closeDropdown();
};

// Watch for dropdown state changes to handle scroll listeners
watch(isCurrentDropdownOpen, (isOpen) => {
    if (isOpen) {
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition, true);
    } else {
        window.removeEventListener("scroll", updateDropdownPosition, true);
        window.removeEventListener("resize", updateDropdownPosition, true);
    }
}, { immediate: true });

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
    window.removeEventListener("scroll", updateDropdownPosition, true);
    window.removeEventListener("resize", updateDropdownPosition, true);
});

defineOptions({
    name: "TableActionDropdown"
});

// Expose methods for parent component
defineExpose({
    closeDropdown,
    isDropdownOpen: isCurrentDropdownOpen
});
</script>