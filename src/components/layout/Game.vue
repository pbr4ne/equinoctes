<template>
  <celestial-body /> 
  <n-grid :cols="visibleSides">
    <n-grid-item>
      <faction side="sun" class="day"/>
    </n-grid-item>
    <n-grid-item>
      <faction side="moon" class="night"/>
    </n-grid-item>  
  </n-grid>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import CelestialBody from './CelestialBody.vue';
import Faction from './Faction.vue';

const isSmallScreen = ref(isSmallWindow());
const visibleSides = ref(2);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 730;
  
  if (isSmallScreen.value) {
    visibleSides.value = 1;
  } else {
    visibleSides.value = 2;
  }
};

function isSmallWindow() {
  return window.innerWidth < 730;
}

window.addEventListener('resize', updateScreenSize);

watchEffect(() => {
  updateScreenSize();
});
</script>

<style scoped>
.day {
  background: linear-gradient(to bottom, #e9c46a, #f4a261);
}

.night {
  background: linear-gradient(to bottom, #264653, #023047);
}
</style>
