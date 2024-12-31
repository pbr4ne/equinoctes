<template>
  <div id="app">
    <FloatingSun />
    <SplitScreen />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FloatingSun from './components/layout/FloatingSun.vue';
import SplitScreen from './components/layout/SplitScreen.vue';

export default defineComponent({
  components: {
    FloatingSun,
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
