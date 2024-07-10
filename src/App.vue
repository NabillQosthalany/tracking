<template>
  <div class="bg-red-500" id="app">
    <router-view/>
  </div>
</template>

<script setup>
import MapView from './components/MapView.vue';
</script>

<style>
#app {
  height: 100vh;
}
</style>