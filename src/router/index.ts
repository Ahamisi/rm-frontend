import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import routes from './routers.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // const authStore = useAuthStore();

  // // Wait for user to be fetched (important for initial load/refresh)
  // if (!authStore.user) {
  //   await authStore.fetchUser();
  // }

  // // Redirect authenticated users away from guest-only routes
  // if (!to.meta.requiresAuth && authStore.isLoggedIn) {
  //   return next("/dashboard");
  // }

  // // Redirect unauthenticated users from protected routes
  // if (to.meta.requiresAuth && !authStore.isLoggedIn) {
  //   return next("/");
  // }

  return next();
});


export default router
