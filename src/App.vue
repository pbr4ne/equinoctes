<template>
  <n-message-provider :theme-overrides="computedThemeOverrides">
    <n-dialog-provider>
      <div id="app">
        <game />
      </div>
    </n-dialog-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Game from './components/layout/Game.vue';

const computedThemeOverrides = computed(() => {
    return {
      colorWarning: '#077d7d',
      textColorWarning: '#023047',
    }
  });
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
