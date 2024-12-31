<template>
  <div id="app">
    <FloatingSun />
    <SplitScreen />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FloatingSun from './components/FloatingSun.vue';
import SplitScreen from './components/SplitScreen.vue';

export default defineComponent({
  components: {
    FloatingSun,
    SplitScreen,
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Almendra+Display&family=Grenze+Gotisch:wght@100..900&family=Macondo+Swash+Caps&family=Zen+Tokyo+Zoo&display=swap');

#app {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
