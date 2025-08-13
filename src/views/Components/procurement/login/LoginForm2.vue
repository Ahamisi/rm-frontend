<script setup lang="ts">
import { ref } from "vue";

const phone = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
import { Eye, EyeOff } from "lucide-vue-next";

const togglePassword = () => {
	showPassword.value = !showPassword.value;
};

const onSubmit = () => {
	console.log({
		phone: phone.value,
		password: password.value,
		rememberMe: rememberMe.value,
	});
};
</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-blue-100">
		<!-- <div class="flex justify-center mb-12">
      <img src="@/views/Pages/procurement/redesign/logo.svg" alt="Logo" class="w-12 h-12" />
    </div> -->

		<div class="flex items-center justify-center gap-1 mb-12">
			<img src="@/views/Pages/procurement/redesign/logo.svg" alt="Logo" class="w-12 h-12" />
			<p class="text-lg font-semibold text-gray-700">Remedial ERP</p>
		</div>

		<div class="w-full max-w-[386px] bg-white shadow-lg rounded-2xl p-10">
			<!-- <h3 class="mb-2 text-sm text-left text-gray-500">PROCUREMENT</h3> -->
			<h2 class="mb-6 text-2xl font-semibold text-left text-gray-800">
				Sign in to your account
			</h2>

			<form @submit.prevent="onSubmit">
				<div class="mb-4">
					<label class="block mb-2 text-sm text-gray-600">Phone</label>
					<div class="relative">
						<div class="absolute left-3 top-3.5 flex items-center gap-2">
							<img src="https://flagsapi.com/NG/flat/64.png" alt="Nigeria Flag"
								class="w-6 h-6 rounded-full" />
							<span class="text-sm text-gray-600">+234</span>
						</div>
						<input type="text" v-model="phone" placeholder="801020202020"
							class="pl-20 w-full border bg-white border-gray-300 rounded-lg py-[13px] focus:ring-blue-500 focus:border-blue-500" />
					</div>
				</div>

				<div class="mb-4">
					<label class="block mb-2 text-sm text-gray-600">Password</label>
					<div class="relative">
						<input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="************"
							class="w-full p-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
						<div class="absolute cursor-pointer right-3 top-4" @click="togglePassword">
							<Eye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
							<EyeOff v-else class="w-5 h-5 text-gray-400" />
						</div>
					</div>
				</div>

				<div class="flex items-center gap-2 mb-6 bg-white">
					<input type="checkbox" v-model="rememberMe"
						class="rounded border border-gray-300 ring focus:ring-blue-500 px-1.5 appearance-none checked:appearance-auto py-1.5 bg-white outline-blue-500" />
					<label class="text-sm text-gray-600 bg-white">Keep me signed in</label>
				</div>

				<router-link to="/dashboard">
					<button type="button"
						class="w-full px-3 py-1 text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
						Proceed
					</button>
				</router-link>
			</form>
			<div class="my-6 border border-t border-gray-300"></div>

			<div class="text-sm text-center text-gray-500">
				<router-link to="/passwords/forgot">
					<span class="hover:text-blue-600">Forgot Password?</span>
				</router-link>
			</div>
		</div>
	</div>
</template>
