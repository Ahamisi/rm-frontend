<template>
	<TableActionDropdown :rowData="data">
		<template #default="{ selectedItem, closeDropdown }">
			<router-link :to="{ name: 'customer-success.customers.view', params: { id: selectedItem.id } }"
				@click="closeDropdown()" as="li"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideEye class="w-4 h-4" />
				View Customer
			</router-link>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideBell class="w-4 h-4" />
				Notify
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideLogIn class="w-4 h-4" />
				Login to Account
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideAlertTriangle class="w-4 h-4" />
				Add Warning Tags
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideDownloadCloud class="w-4 h-4" />
				Download Transactions
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideDownloadCloud class="w-4 h-4" />
				Download Partner Transactions
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideUnlock class="w-4 h-4" />
				Reset Password
			</li>
			<li v-if="selectedItem.activated_at" @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideXCircle class="w-4 h-4 text-red-600" />
				Deactivate Customer
			</li>
			<li v-else @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideCheckCircle class="w-4 h-4 text-green-600" />
				Activate Customer
			</li>
			<li @click="handleDelete(selectedItem); closeDropdown()"
				class="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 medium-text">
				<LucideTrash class="w-4 h-4" />
				Delete
			</li>
		</template>
	</TableActionDropdown>
</template>

<script setup lang="ts">
import TableActionDropdown from "@/views/Components/procurement/ui/TableActionDropdown.vue";
import { LucideBell, LucideEye, LucideLogIn, LucideTrash, LucideAlertTriangle, LucideDownloadCloud, LucideUnlock, LucideXCircle, LucideCheckCircle } from "lucide-vue-next";

const props = defineProps<{
	data: any;
}>();

const handleDelete = (item: any) => {
	console.log(item);
};
</script>
