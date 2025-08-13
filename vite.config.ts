// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     css: {
  //       // Injects @reference globally so scoped CSS can @apply Tailwind utilities
  //       additionalData: `@reference "${path.resolve(__dirname, 'src/styles/tailwind.css')}";`
  //     }
  //   }
  // }
})
