<template>
  <celestial-body /> 
  <n-grid :cols="visiblefactions">
    <n-grid-item v-if="!isSmallWindow() || (isSmallWindow() && currentFaction === 'sun')">
      <faction faction="sun" class="day"/>
    </n-grid-item>
    <n-grid-item v-if="!isSmallWindow() || (isSmallWindow() && currentFaction === 'moon')">
      <faction faction="moon" class="night"/>
    </n-grid-item>  
  </n-grid>

  <button 
    v-if="visiblefactions === 1 && unlockedFactions > 1" 
    @click="toggleFaction"
    :class="['icon-button', `icon-button-${currentFaction}`]"
  >
      <ArrowCircleRight24Regular />
  </button>
  <MusicPlayer />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, watch } from 'vue';
import { useStore } from '../../composables/useStore';
import CelestialBody from '../ambience/CelestialBody.vue';
import Faction from './Faction.vue';
import MusicPlayer from './MusicPlayer.vue';
import { ArrowCircleRight24Regular } from '@vicons/fluent';
import { startGameLoop } from '../../composables/useGameLoop'; 

const store = useStore();

const isSmallScreen = ref(isSmallWindow());
const unlockedFactions = computed(() => (store.milestones.moon.unlocked ? 2 : 1));
const visiblefactions = ref(unlockedFactions.value);
const currentFaction = ref(store.currentlyDay ? 'sun' : 'moon');

startGameLoop();

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 730;

  if (isSmallScreen.value) {
    visiblefactions.value = 1;
  } else {
    if (unlockedFactions.value === 1) {
      visiblefactions.value = 1;
    } else {
      visiblefactions.value = 2;
    }
  }
};

const toggleFaction = () => {
  currentFaction.value = currentFaction.value === 'sun' ? 'moon' : 'sun';
};

watch(
  () => store.currentlyDay,
  (newCurrentlyDay) => {
    currentFaction.value = newCurrentlyDay ? 'sun' : 'moon';
  }
);

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

.icon-button {
  position: fixed;
  top: 50%;
  right: 20px;
}

.icon-button {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  z-index: 700;
}

.icon-button-sun {
  background-color: #e9c46a;
  border-color: #9e2a2b;
  color: #9e2a2b;
}

.icon-button-moon {
  background-color: #264653;
  border-color: #caf0f8;
  color: #caf0f8;
}

.icon-button-sun:hover {
  background-color: #ffb703;
}

.icon-button-moon:hover {
  background-color: #219ebc;
}
</style>
