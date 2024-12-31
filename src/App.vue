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

<style>
#app {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
