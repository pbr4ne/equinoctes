<template>
  <div id="app">
    <game />
  </div>
</template>

<script setup lang="ts">
import Game from './components/layout/Game.vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&Texturina:ital,opsz,wght@0,12..72,100..900;1,12..72,100..900&display=swap');

#app {
  width: 100%;
  height: 100svh;
  position: relative;
  overflow: hidden;
}
</style>
