// App
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// Services
import i18n from './services/i18n'
import toast from './services/toast'
// Libs
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
// Styles
import './assets/styles/main.scss'

// App
const app = createApp(App)
app.use(createPinia())
app.use(router)
// Services
app.use(i18n)
app.use(toast)
// Global properties
app.config.globalProperties.$toast = toast
// Mount
app.mount('#app')