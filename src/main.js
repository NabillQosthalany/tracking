import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './style.css'
import router from './router/main.js'
// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Tambahkan ikon ke library
library.add(fas, fab)

// Buat aplikasi Vue dan gunakan FontAwesome
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')