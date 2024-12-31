<template>
  <div id="app">
    <SplitScreen />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SplitScreen from './components/SplitScreen.vue'

export default defineComponent({
  name: 'App',
  components: {
    SplitScreen,
  },
})
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>