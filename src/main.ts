import './css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import mock test system in development
if (import.meta.env.DEV) {
  import('./api/test-mock')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
