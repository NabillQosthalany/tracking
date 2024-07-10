import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css' // Tambahkan baris ini
import router from './router/main.js'

createApp(App).use(router).mount('#app')