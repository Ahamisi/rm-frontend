<!--
  Universal Button Component
  
  A unified button component that provides consistent styling and behavior across the application.
  Supports regular buttons, links, router links, and form buttons.
  
  USAGE EXAMPLES:
  
  1. Basic Button (Modal Actions):
     <Button type="blue-btn" :onClick="saveData">Save</Button>
     <Button type="gray-btn" :onClick="cancel">Cancel</Button>
     <Button type="red-btn" :onClick="deleteItem">Delete</Button>
     <Button type="yellow-btn" :onClick="discard">Discard Changes</Button>
  
  2. Custom Styling:
     <Button type="blue-btn" :onClick="create" classStyle="px-6 py-3">Create Product</Button>
  
  3. With Icons:
     <Button type="blue-btn" :onClick="download">
       <svg>...</svg>
       Download Report
     </Button>
  
  4. External Links:
     <Button type="blue-btn" href="https://example.com">Visit Site</Button>
  
  5. Router Links:
     <Button type="gray-btn" :to="{ name: 'Dashboard' }">Go to Dashboard</Button>
  
  6. Form Buttons:
     <Button type="blue-btn" htmlType="submit" :onClick="submitForm">Submit</Button>
  
  7. Disabled State:
     <Button type="blue-btn" :disabled="isLoading" :onClick="save">
       {{ isLoading ? 'Saving...' : 'Save' }}
     </Button>
  
  BUTTON TYPES:
  - blue-btn: Primary actions (Save, Create, Submit)
  - gray-btn: Secondary actions (Cancel, View)
  - red-btn: Destructive actions (Delete, Remove)
  - yellow-btn: Warning actions (Discard, Reset)
  - transparent-btn: Transparent actions (Back, Close) - transparent background with gray hover
-->
<template>
  <component
    :is="componentType"
    :class="['flex items-center rounded download_btn gap-x-1', props.type, (props.classStyle ?? 'px-1 py-2')]"
    @click="handleClick"
    :disabled="props.disabled"
    :href="props.href"
    :to="props.to"
    :type="props.htmlType"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type: "gray-btn" | "blue-btn" | "yellow-btn" | "red-btn" | "transparent-btn"
  disabled?: boolean
  onClick?: () => void
  classStyle?: string
  // For links
  href?: string
  // For router links
  to?: string | object
  // For form buttons
  htmlType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  htmlType: 'button'
})

const emit = defineEmits<{
  click: [event: Event]
}>()

// Determine which component to render
const componentType = computed(() => {
  if (props.href) return 'a'
  if (props.to) return 'router-link'
  return 'button'
})

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  
  // Call the onClick prop if provided
  if (props.onClick) {
    props.onClick()
  }
  
  // Emit the click event for parent components
  emit('click', event)
}
</script>

<style scoped>
.download_btn {
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: 16px;
  letter-spacing: -0.25px;
  min-height: 32px;
  padding: 2px 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.download_btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.blue-btn {
  background: rgba(12, 102, 228, 1);
  color: white;
}

.blue-btn:hover:not(:disabled) {
  background: rgba(10, 86, 191, 1);
}

.gray-btn {
  background: rgba(9, 30, 66, 0.06);
  color: rgba(23, 43, 77, 1);
}

.gray-btn:hover:not(:disabled) {
  background: rgba(8, 25, 55, 0.16);
}

.red-btn {
  background: #C9372C;
  color: white;
}

.red-btn:hover:not(:disabled) {
  background: #A62E24;
}

.yellow-btn {
  background: rgba(245, 205, 71, 1);
  color: rgba(23, 43, 77, 1);
}

.yellow-btn:hover:not(:disabled) {
  background: rgba(206, 172, 60, 1);
}

.transparent-btn {
  background: transparent;
  color: rgba(68, 84, 111, 1);
}

.transparent-btn:hover:not(:disabled) {
  background: rgba(8, 25, 55, 0.16);
}

/* Link styling */
a.download_btn {
  text-decoration: none;
  display: inline-flex;
}

/* Router link styling */
.router-link-active.download_btn,
.router-link-exact-active.download_btn {
  /* Add active state styling if needed */
}
</style>
