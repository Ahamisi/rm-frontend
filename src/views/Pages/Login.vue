<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from "lucide-vue-next";
import { formatPhone } from "@/views/helpers/formatPhone";
import LoadingState from "@/views/Components/procurement/state/LoadingState.vue";

const auth = useAuthStore();

const phone = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
    const telephone = "234" + formatPhone(phone.value);
    loading.value = true;
    await auth.login({
        phone: telephone, // assuming 'phone' is sent as 'email'
        password: password.value,
        remember: rememberMe.value,
    });
    loading.value = false
};
</script>

<template>
    <div v-if="loading"
        class="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <LoadingState></LoadingState>
    </div>
    <div class="flex flex-col items-center h-screen px-4 py-12 bg-gradient-to-b from-white to-blue-100">
        <div class="flex justify-center gap-1 mb-20 xl:mb-32 gap-x-[11px]">
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.375 7.5625L15.5 0L30.625 7.5625L15.5 15.125L0.375 7.5625Z" fill="#3354CC" />
                <path d="M29.5068 7.5625L15.5 14.5654L1.49316 7.5625L15.5 0.558594L29.5068 7.5625Z" stroke="black"
                    stroke-opacity="0.1" />
                <path d="M0.375 7.5625L15.5 15.125V30.25L0.375 22.6875V7.5625Z" fill="#A3F94E" />
                <path d="M15 15.4336V29.4404L0.875 22.3779V8.37109L15 15.4336Z" stroke="black" stroke-opacity="0.1" />
                <path d="M15.5 15.125L30.625 7.5625V22.6875L15.5 30.25V15.125Z" fill="#4260D0" />
                <path d="M30.125 22.3779L16 29.4404V15.4336L30.125 8.37109V22.3779Z" stroke="black"
                    stroke-opacity="0.1" />
            </svg>

            <p class="page_title">Remedial ERP</p>
        </div>
        <div class="w-full max-w-[386px] bg-white shadow-lg rounded-2xl p-8">
            <h2 class="mb-6 login_card_title">Sign in to your account</h2>
            <p v-if="auth.error" class="mb-2 text-sm text-red-500">
                {{ auth.error }}
            </p>
            <form @submit.prevent="onSubmit">
                <!-- phone input -->
                <div class="mb-4">
                    <label class="block mb-1 text-sm text-gray-600">Phone</label>
                    <div class="relative">
                        <div class="absolute flex items-center gap-2 left-3 top-[10px]">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_9728_109012)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H16V12H0V0Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M10.665 0H16V12H10.665V0ZM0 0H5.3325V12H0V0Z" fill="#008753" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_9728_109012">
                                        <rect width="16" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span class="text-sm text-gray-600">+234</span>
                        </div>
                        <input type="text" v-model="phone" placeholder="8010202020" pattern="\d{10}" maxlength="10"
                            class="w-full p-2 text-sm bg-white rounded-lg pl-[72px]" />
                    </div>
                </div>
                <!-- password input -->
                <div class="mb-4">
                    <label class="block mb-1 text-sm text-gray-600">Password</label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="************"
                            pattern="\d{4}" class="w-full p-2 pr-8 text-sm bg-white rounded-lg" />
                        <div class="absolute cursor-pointer right-3 top-[10px]" @click="togglePassword">
                            <Eye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
                            <EyeOff v-else class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <!-- remember me -->
                <div class="flex items-center gap-2 bg-white">
                    <input type="checkbox" v-model="rememberMe"
                        class="rounded border border-gray-300 ring focus:ring-blue-500 px-1.5 appearance-none checked:appearance-auto py-1.5 bg-white outline-blue-500 m-2"
                        id="remember_me" />
                    <label for="remember_me" class="text-sm text-gray-600 bg-white remember_me_label">
                        Keep me signed in
                    </label>
                </div>
                <button type="submit"
                    class="w-full px-3 py-1 my-6 text-center text-white transition rounded-md hover:bg-blue-700 min-h-8">
                    Proceed
                </button>
            </form>

            <div class="text-center bottom_text">
                <router-link :to="{ name: 'forgotPassword' }">
                    <span class="hover:text-blue-600">Forgot Password?</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page_title {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    color: rgba(23, 43, 77, 1)
}

.login_card_title {
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
}

label {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
}

.remember_me_label {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: rgba(68, 84, 111, 1);
}

input {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(23, 43, 77, 1);
    border: 2px solid rgba(9, 30, 66, 0.14);
}

input:focus {
    border-color: rgba(56, 139, 255, 1);
    outline: none;
}

button {
    background: rgba(12, 102, 228, 1);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    color: #fff;
}

form {
    border-bottom: 2px solid rgba(9, 30, 66, 0.14);
    margin-bottom: 24px;
}

.bottom_text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 84, 111, 1);
}
</style>
