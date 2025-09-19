# Module Creation Checklist

Use this checklist when creating a new module to ensure nothing is missed.

## 🎯 New Module: {ModuleName}

### Phase 1: Basic Setup
- [ ] Create directory structure: `src/views/Pages/{ModuleName}/`
- [ ] Add department to mock API: `src/api/mock.ts` → `GET /users/departments`
- [ ] Create module icon: `src/views/Pages/procurement/redesign/{ModuleName}Icon.svg`
- [ ] Add to department routes: `src/views/Components/header/AppHeader.vue`
- [ ] Add navigation menu: `src/views/Components/header/Navigation.vue` (start with Dashboard only)
- [ ] Add routes: `src/router/routers.ts` (start with Dashboard only)
- [ ] Create Dashboard component: `src/views/Pages/{ModuleName}/Dashboard.vue`
- [ ] Test Dashboard works (no white screen, no console errors)

### Phase 2: Expand Navigation
- [ ] Add more navigation items to `Navigation.vue`
- [ ] Add corresponding routes to `routers.ts`
- [ ] Create placeholder components for each route
- [ ] Test all navigation links work

### Phase 3: Add Functionality
- [ ] Add mock API endpoints to `src/api/mock.ts`
- [ ] Build out actual functionality using existing components
- [ ] Test all features work properly

## 🚨 Common Issues to Check

- [ ] No "No match for route" errors in console
- [ ] No white screen on module pages
- [ ] All navigation links work
- [ ] Icons display properly
- [ ] Routes are properly authenticated

## 📋 Files to Modify

1. `src/api/mock.ts` - Add department and API endpoints
2. `src/views/Components/header/AppHeader.vue` - Add department route
3. `src/views/Components/header/Navigation.vue` - Add navigation menu
4. `src/router/routers.ts` - Add routes
5. `src/views/Pages/procurement/redesign/` - Add module icon
6. `src/views/Pages/{ModuleName}/` - Create components

## 🎨 Component Template

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

## 🚀 Quick Commands

```bash
# Create directory structure
mkdir -p src/views/Pages/{ModuleName}/{SubModules}

# Start dev server
npm run dev

# Check for linting errors
npm run lint
```

---

**Remember**: Start simple with just the Dashboard, then expand incrementally. Test each step before moving to the next!
