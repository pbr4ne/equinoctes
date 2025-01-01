<template>
  <div id="app">
    <celestial-body />
    <game />
  </div>
</template>

<script setup lang="ts">
import CelestialBody from './components/layout/CelestialBody.vue';
import Game from './components/layout/Game.vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&display=swap');

#app {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
