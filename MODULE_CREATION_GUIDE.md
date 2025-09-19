# Module Creation Guide

This guide documents the step-by-step process for creating new modules in the RM Frontend application, based on the successful Compliance module implementation.

## 🎯 Overview

When creating a new module (e.g., "Compliance", "Finance", "HR"), follow this exact process to avoid common pitfalls and ensure consistency.

## 📋 Step-by-Step Process

### 1. **Create Directory Structure**
```bash
mkdir -p src/views/Pages/{ModuleName}/{SubModules}
```

**Example:**
```bash
mkdir -p src/views/Pages/Compliance/{Products,Orders,Programs,Reports}
```

### 2. **Add to Mock API Departments**
**File:** `src/api/mock.ts`

Add the new department to the departments list:
```javascript
'GET /users/departments': async () => {
  return createMockResponse([
    { id: 1, name: 'Procurement', code: 'procurement', icon: '@/views/Pages/procurement/redesign/ProcurementIcon.svg' },
    { id: 2, name: 'Inventory', code: 'inventory', icon: '@/views/Pages/procurement/redesign/ProcurementIcon.svg' },
    { id: 3, name: 'Sales', code: 'sales', icon: '@/views/Pages/procurement/redesign/CustomerSuccessIcon.svg' },
    { id: 4, name: 'Inbound', code: 'inbound', icon: '@/views/Pages/procurement/redesign/InboundIcon.svg' },
    { id: 5, name: 'Outbound', code: 'outbound', icon: '@/views/Pages/procurement/redesign/OutboundIcon.svg' },
    { id: 6, name: 'Compliance', code: 'compliance', icon: '@/views/Pages/procurement/redesign/ComplianceIcon.svg' },
    // Add new department here
    { id: 7, name: 'NewModule', code: 'newmodule', icon: '@/views/Pages/procurement/redesign/NewModuleIcon.svg' },
  ]);
},
```

### 3. **Create Module Icon**
**File:** `src/views/Pages/procurement/redesign/{ModuleName}Icon.svg`

Create a professional SVG icon following the existing pattern (22x20 viewBox, #3353CB primary color).

### 4. **Add to Department Routes**
**File:** `src/views/Components/header/AppHeader.vue`

Add the new department to the `department_base_routes` array:
```javascript
const department_base_routes = [
  { name: "inbound", route: "inbound.dashboard" },
  { name: "procurement", route: "dashboard" },
  { name: "inventory", route: "admin.products" },
  { name: "sales", route: "customer-success" },
  { name: "outbound", route: "outbound.dashboard" },
  { name: "logistics", route: "dashboard" },
  { name: "compliance", route: "compliance.dashboard" },
  // Add new department here
  { name: "newmodule", route: "newmodule.dashboard" },
];
```

### 5. **Add Navigation Menu**
**File:** `src/views/Components/header/Navigation.vue`

Add the navigation structure to the `navigation` object:
```javascript
const navigation: Record<string, any[]> = {
  // ... existing modules
  newmodule: [
    { label: "Dashboard", url: { name: "newmodule.dashboard" }, icon: LayoutDashboard },
    { label: "Feature 1", url: { name: "newmodule.feature1" }, icon: FileText },
    { 
      label: "Feature Group", 
      icon: PackageSearch,
      dropdown: [
        { title: "Sub Feature 1", route: { name: "newmodule.subfeature1" } },
        { title: "Sub Feature 2", route: { name: "newmodule.subfeature2" } }
      ]
    },
  ],
}
```

### 6. **Add Routes**
**File:** `src/router/routers.ts`

Add routes for all pages:
```javascript
/** newmodule routes begin here */
{
  path: "/newmodule/dashboard",
  name: "newmodule.dashboard",
  component: () => import("@/views/Pages/NewModule/Dashboard.vue"),
  meta: { layout: "default", requiresAuth: true },
},
{
  path: "/newmodule/feature1",
  name: "newmodule.feature1",
  component: () => import("@/views/Pages/NewModule/Feature1.vue"),
  meta: { layout: "default", requiresAuth: true },
},
// Add more routes as needed
/** newmodule routes end here */
```

### 7. **Create Placeholder Components**
Create simple placeholder components for each route:

**Template:**
```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">{Page Title} - {Module Name}</h1>
    <p class="text-gray-600">This page will handle {description}.</p>
    <div class="mt-4 p-4 bg-{color}-50 border border-{color}-200 rounded-lg">
      <p class="text-{color}-800 text-sm">🚧 Placeholder - This page will be built out as we progress</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// {Page Title} - {Module Name} placeholder
</script>
```

### 8. **Add Mock API Endpoints (Optional)**
**File:** `src/api/mock.ts`

Add any specific API endpoints the module needs:
```javascript
// NewModule Dashboard
'GET /newmodule/dashboard/stats': async () => {
  return createMockResponse({
    // Mock data here
  });
},
```

## ⚠️ Common Pitfalls to Avoid

### 1. **Don't Add Non-Existent Routes to Navigation**
- Only add navigation items for routes that actually exist
- Create routes first, then add to navigation
- This prevents the "No match for route" error

### 2. **Don't Forget the Icon**
- Every department needs an icon in the mock API
- Icons should be 22x20 SVG with consistent styling

### 3. **Don't Skip Directory Structure**
- Create proper folder hierarchy from the start
- Use consistent naming conventions

### 4. **Don't Forget Authentication**
- All routes should have `meta: { layout: "default", requiresAuth: true }`

## 🎨 Design Patterns to Follow

### 1. **Reuse Existing Components**
- Use Datatable, PageTitle, SideBarModal, etc.
- Follow the same patterns as Outbound module
- Don't create custom components unless absolutely necessary

### 2. **Consistent Styling**
- Use Tailwind CSS classes
- Follow the existing color scheme
- Use the same layout patterns

### 3. **Placeholder Strategy**
- Create simple placeholders first
- Mark them clearly with 🚧 emoji
- Build functionality incrementally

## 📁 File Structure Template

```
src/views/Pages/{ModuleName}/
├── Dashboard.vue
├── {Feature1}.vue
├── {Feature2}.vue
├── {SubModule1}/
│   ├── Index.vue
│   ├── {SubFeature1}.vue
│   └── {SubFeature2}.vue
├── {SubModule2}/
│   ├── Index.vue
│   └── {SubFeature}.vue
└── components/
    └── (reusable components)
```

## 🚀 Quick Start Checklist

- [ ] Create directory structure
- [ ] Add to mock API departments
- [ ] Create module icon
- [ ] Add to department routes
- [ ] Add navigation menu (start with just Dashboard)
- [ ] Add routes (start with just Dashboard)
- [ ] Create Dashboard component
- [ ] Test that Dashboard works
- [ ] Add more navigation items and routes incrementally
- [ ] Create placeholder components
- [ ] Add mock API endpoints as needed

## 📝 Notes

- **Start Simple**: Begin with just the Dashboard, then add features incrementally
- **Test Frequently**: Check that each step works before moving to the next
- **Use Placeholders**: Create simple placeholders first, build functionality later
- **Follow Patterns**: Reuse existing components and patterns from Outbound/Procurement modules
- **Document Changes**: Update this guide if you discover new patterns or requirements

## 🔄 Future Updates

When creating new modules, reference this guide and update it with any new patterns or requirements discovered during development.
