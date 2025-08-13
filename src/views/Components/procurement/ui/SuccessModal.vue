<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title: string;
  message: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal">
      <div class="w-full max-w-sm p-8 text-center bg-white rounded-lg shadow-xl">
        <div class="flex justify-center mb-4">
          <img src="@/views/Pages/procurement/redesign/successimg.svg" alt="Success" />
        </div>
        <h2 class="mb-2 text-xl font-semibold text-gray-800">{{ title }}</h2>
        <p class="mb-6 text-gray-600">{{ message }}</p>
        <div class="flex justify-end">
          <button @click="closeModal"
            class="px-8 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Done
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>