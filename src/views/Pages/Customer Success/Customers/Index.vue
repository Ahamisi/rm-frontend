<template>
	<main>
		<div class="pb-4">
			<div class="bg-[#F7F8F9] border-b border-[#091E4224] px-3 relative hidden lg:block">
				<!-- Breadcrumb -->
				<div class="text-[#626F86] crumb-text mb-5 space-x-2 px-3">
					<router-link to="/customer-success/customers" class="hover:underline">
						<span>Customers</span>
					</router-link>
					<span>/</span>
					<router-link to="/customer-success/customers" class="hover:underline">
						<span>All Customers</span>
					</router-link>
					<span>/</span>
					<span class="cursor-pointer crumb-text hover:underline">{{
						activeLink.label
					}}</span>
				</div>

				<!-- Navigation Tabs -->
				<div class="flex items-baseline w-full px-3">
					<a v-for="(link, index) in links" :key="index" href="#"
						class="py-3 px-4 navigation-text text-[#44546F] transition-colors duration-300 rounded-t-md relative"
						:class="{
							'bg-white text-[#172B4D] font-medium border border-[#091E4224] border-b-0':
								activeLink.value === link.value,
							'hover:text-[#172B4D] font-semibold text-[#44546F]':
								activeLink.value !== link.value,
							'after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[1px] after:bg-white':
								activeLink.value === link.value,
						}" @click.prevent="toggleView(link)">
						{{ link.label }}
					</a>
				</div>
			</div>
			<!-- Mobile Navigation (visible on mobile only) -->
			<div class="bg-[#F7F8F9] border-b border-[#091E4224] px-4 py-3 relative lg:hidden">
				<!-- Breadcrumb -->
				<div class="text-[#626F86] text-sm mb-3 flex items-center space-x-1">
					<router-link to="/purchase" class="hover:underline">
						<span>Purchase Order</span>
					</router-link>
					<span>/</span>
					<span class="cursor-pointer hover:underline">{{
						activeLink.label
					}}</span>
				</div>

				<!-- Icon-based Tabs -->
				<div class="flex items-center justify-around">
					<button v-for="(link, index) in links" :key="index" @click.prevent="toggleView(link)"
						class="flex flex-col items-center justify-center p-2 transition-colors duration-200 rounded-lg"
						:class="{
							'bg-white text-blue-600 border border-[#091E4224]':
								activeLink.value === link.value,
							'text-[#44546F] hover:text-blue-600':
								activeLink.value !== link.value,
						}">
					</button>
				</div>
			</div>

			<section class="p-6 bg-white">
				<ActiveUsers v-if="activeLink.value == 'active_users'" @createCustomer="showCreateCustomer" />
				<DeactivatedUsers v-if="activeLink.value == 'deactivated_users'" @createCustomer="showCreateCustomer" />
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
	FileClock,
	FileCheck2,
	ClipboardX,
	ClipboardCheck,
	BadgeCheck,
	CheckCircle2,
} from "lucide-vue-next";
import ActiveUsers from "@/views/Pages/Customer Success/Customers/ActiveUsers.vue";
import DeactivatedUsers from "@/views/Pages/Customer Success/Customers/DeactivatedUsers.vue";

const route = useRoute();
const router = useRouter();
const isCreatingCustomer = ref(route.query.create === "true");
// Define the navigation links

const links = [
	{ label: "Active Users", value: "active_users" },
	{ label: "Deactivated Users", value: "deactivated_users" },
];

// Helper function to find link by value
const findLinkByValue = (value: string) =>
	links.find((link) => link.value === value) || links[0];

// Get active tab from query or default to first link
const activeLink = ref(findLinkByValue(route.query.tab as string));

// Function to switch tabs
const toggleView = (link: { label: string; value: string }) => {
	if (link.value !== activeLink.value.value) {
		activeLink.value = link;
		router.push({ query: { tab: link.value } });
	}
};

// Show CreateCustomer component
const showCreateCustomer = () => {
	router.push({ query: { ...route.query, create: "true" } });
};

const closeCustomer = () => {
	const newQuery = { ...route.query };
	delete newQuery.create;
	router.push({ query: newQuery });
	setTimeout(() => {
		selectedCustomer.value = null;
	}, 1000);
};
const selectedCustomer = ref(null);

// Watch for route changes and update `activeLink` & `isCreatingCustomer`
watch(
	() => route.query,
	async (query) => {
		if (route.query.id) {
			// selectedCustomer.value = await fetchPurchaseOrder(route.query.id);
		}
		activeLink.value =
			links.find((link) => link.value === query.tab) || links[0];
		isCreatingCustomer.value = query.create === "true";
	}
);
</script>
