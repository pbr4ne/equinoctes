<template>
  <div id="app">
    <celestial-body />
    <split-screen />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CelestialBody from './components/layout/CelestialBody.vue';
import SplitScreen from './components/layout/SplitScreen.vue';

export default defineComponent({
  components: {
    CelestialBody,
    SplitScreen,
  },
});
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
