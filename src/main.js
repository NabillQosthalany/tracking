import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './style.css'
import router from './router/main.js'
import Vue3Lottie from 'vue3-lottie'
// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, fab)

const pinia = createPinia();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .use(Vue3Lottie)
  .mount('#app')