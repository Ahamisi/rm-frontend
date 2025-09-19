# Reusable Components & Patterns Reference

## Table Action Dropdown Component
**Location**: `@/views/Components/procurement/ui/TableActionDropdown.vue`

### Usage Pattern:
```vue
<template #column="col">
  <span v-if="col.props.column.field === 'action'">
    <TableActionDropdown :rowData="col.props.formattedRow">
      <template #default="{ selectedItem, closeDropdown }">
        <!-- Menu Item 1 -->
        <li @click="actionFunction(selectedItem); closeDropdown()" 
            class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
          <svg><!-- Icon --></svg>
          Action Name
        </li>
        
        <!-- Menu Item 2 -->

        <li @click="anotherAction(selectedItem); closeDropdown()" 
            class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
          <svg><!-- Icon --></svg>
          Another Action
        </li>
      </template>
    </TableActionDropdown>
  </span>
</template>
```

### Required Import:
```typescript
import TableActionDropdown from '@/views/Components/procurement/ui/TableActionDropdown.vue'
```

### Key Features:
- Automatic 3-dot menu button
- Dropdown positioning
- Click outside to close
- Consistent styling across all pages
- `selectedItem` contains the row data
- `closeDropdown()` function to close menu after action

---

## Modal Components

### SideBarModal
**Location**: `@/views/Components/SideBarModal.vue`
**Props**: `:isOpen`, `title`, `width`
**Events**: `@close`, `@update:isOpen`

### UniversalCenteredModal
**Location**: `@/views/Components/UniversalCenteredModal.vue`
**Props**: `:show`
**Events**: `@close`
**Slots**: `#header`, `#body`, `#footer`

### SuccessModal
**Location**: `@/views/Components/ui/SuccessModal.vue`
**Props**: `:show`, `title`, `message`
**Events**: `@close`
**Features**: Auto-bolds text in quotes

---

## Data Table Components

### Datatable
**Location**: `@/views/Components/Datatable/Datatable.vue`
**Props**: 
- `:items` (for static data)
- `:url` (for API data)
- `:columns`
- `:filterFields`
- `pageName`

### Table Columns Configuration:
```typescript
const columns = ref<TableColumn[]>([
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Title', field: 'title', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
])
```

---

## Common Patterns

### Action Menu Items Structure:
```vue
<li @click="actionFunction(selectedItem); closeDropdown()" 
    class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text border-b border-gray-200">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <!-- Icon paths -->
  </svg>
  Action Name
</li>
```

### Modal State Management:
```typescript
const isModalOpen = ref(false)
const selectedItem = ref(null)

const openModal = (item) => {
  selectedItem.value = item
  isModalOpen.value = true
}
```

### Success Message with Bolded Text:
```typescript
const successMessage = ref(`The item "${itemName}" has been successfully created.`)
// SuccessModal automatically bolds text in quotes
```

---

## Icon Library
Common SVG icons used across the project:
- **Eye Icon**: View/Analytics actions
- **Pencil Icon**: Edit actions  
- **Trash Icon**: Delete actions
- **Plus Icon**: Create/Add actions
- **Check Icon**: Success/Confirm actions

---

## Styling Classes
- `medium-text`: Standard text styling
- `border-b border-gray-200`: Bottom border for menu separators
- `hover:bg-gray-100`: Hover state for menu items
- `flex items-center gap-2`: Icon + text alignment
- `px-4 py-2`: Standard padding for menu items

---

## Custom Form Components

### SelectField
**Location**: `@/views/Components/ui/SelectField.vue`
**Props**: `v-model`, `:options`, `labelField`, `valueField`, `placeholder`

### Usage Pattern:
```vue
<SelectField
  v-model="form.product"
  :options="productOptions"
  labelField="name"
  valueField="id"
  placeholder="Select a product"
/>
```

### DateInput
**Location**: `@/views/Components/ui/DateInput.vue`
**Props**: `v-model`, `placeholder`

### Usage Pattern:
```vue
<DateInput
  v-model="form.date_damaged"
  placeholder="dd/mm/yyyy"
/>
```

### Custom Input Styling:
```vue
<input
  type="text"
  v-model="form.title"
  placeholder="Enter title"
  class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 overflow-hidden text-ellipsis"
  style="border-color: #091E4224; color: #172B4D !important;"
/>
```

### Custom Textarea Styling:
```vue
<textarea
  v-model="form.description"
  rows="4"
  placeholder="Enter description"
  class="w-full px-3 py-2 border-2 rounded-lg text-sm text-[#172B4D] focus:outline-none focus:border-blue-600 resize-none"
  style="border-color: #091E4224; color: #172B4D !important;"
></textarea>
```

### Custom Checkbox Styling:
```vue
<input
  type="checkbox"
  v-model="form.returnable"
  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
/>
```

---

## File Locations Reference
- TableActionDropdown: `src/views/Components/procurement/ui/TableActionDropdown.vue`
- SideBarModal: `src/views/Components/SideBarModal.vue`
- UniversalCenteredModal: `src/views/Components/UniversalCenteredModal.vue`
- SuccessModal: `src/views/Components/ui/SuccessModal.vue`
- Datatable: `src/views/Components/Datatable/Datatable.vue`
- SelectField: `src/views/Components/ui/SelectField.vue`
- DateInput: `src/views/Components/ui/DateInput.vue`
- Button: `src/views/Components/ui/Button.vue`
- Types: `src/types/index.ts`
Order Details Modal