import { createRouter, createWebHistory } from 'vue-router';

// Komponen yang akan digunakan sebagai halaman
import websocket from '../views/websocket.vue';
import Test from '../views/test.vue';

// Definisikan rute
const routes = [
  {
    path: '/map/JKL/:manifestId?',
    name: 'websocket',
    component: websocket
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
];

// Buat instance router dengan history mode dan rute yang telah didefinisikan
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;