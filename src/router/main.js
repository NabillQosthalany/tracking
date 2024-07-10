import { createRouter, createWebHistory } from 'vue-router';

// Komponen yang akan digunakan sebagai halaman
import webscoket from '../views/websocket.vue';
import Test from '../views/test.vue';

// Definisikan rute
const routes = [
  {
    path: '/webscoket',
    name: 'webscoket',
    component: webscoket
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