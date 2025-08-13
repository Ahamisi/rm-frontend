<template>
  <main class="px-12 py-4 space-y-6">
    <h1 class="text-[#172B4D] text-xs mt-1 font-semibold">PROFILE SETTINGS</h1>
    <div v-if="user" class="w-full px-6 pt-6 mt-4 bg-white shadow-sm rounded-xl">
      <!-- Profile Section -->
      <div class="flex items-center space-x-4">
        <div class="relative">
          <!-- Profile Image -->
          <img :src="user.picture_url || profileImg" alt="Profile Picture" class="object-cover w-16 h-16 rounded-lg" />
          <!-- Active Status Dot -->
          <span class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <!-- User Details -->
        <div class="leading-none">
          <p class="text-base font-semibold text-[#172B4D]">{{ user.name }}</p>
          <p class="text-[#44546F] text-sm">{{ user.roles?.[0]?.name }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center mt-4">
        <NavlinkTab :links="links" :active-link="activeLink" @toggle-view="toggleView" />
      </div>
    </div>

    <div v-if="user" class="mt-5">
      <ProfileTabsRole v-if="activeLink == 'roles'" />
      <ProfileTabsActivities v-else-if="activeLink == 'activities'" />
      <ProfileTabsSecurity v-else-if="activeLink == 'security'" :user="user" />
      <ProfileTabsDetails v-else-if="activeLink == 'account-details'" :user="user" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProfileTabsRole from "@/views/Components/procurement/profile/tabs/role.vue";
import ProfileTabsActivities from "@/views/Components/procurement/profile/tabs/activities.vue";
import ProfileTabsSecurity from "@/views/Components/procurement/profile/tabs/security.vue";
import ProfileTabsDetails from "@/views/Components/procurement/profile/tabs/details.vue";
import NavlinkTab from "@/views/Components/procurement/NavlinkTab.vue";
import profileImg from "@/assets/images/profileImg.png";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();
const user = store.user;

// import Role from '~/components/profile/tabs/role.vue';

const route = useRoute();
const router = useRouter();

const links = [
  { label: "Account Details", value: "account-details" },
  { label: "Security", value: "security" },
  { label: "Activities", value: "activities" },
  { label: "Roles", value: "roles" },
];

const activeLink = ref(
  (Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab) ||
  links[0].value
);

const toggleView = (value: any) => {
  if (value !== activeLink.value) {
    activeLink.value = value;
    router.push({ query: { tab: value } });
  }
};
</script>
