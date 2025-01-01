<template>
  <celestial-body /> 
  <n-grid :cols="visibleSides">
    <n-grid-item>
      <faction :components="dayComponents" side="sun" class="day"/>
    </n-grid-item>
    <n-grid-item>
      <faction :components="nightComponents" side="moon" class="night"/>
    </n-grid-item>  
  </n-grid>
</template>

<script setup lang="ts">
import { markRaw, ref, watchEffect } from 'vue';
import CelestialBody from './CelestialBody.vue';
import Achievements from '../achievements/Achievements.vue';
import Buildings from '../buildings/Buildings.vue';
import Faction from './Faction.vue';
import Lore from '../lore/Lore.vue';
import Options from '../options/Options.vue';
import DayGrid from '../grid/DayGrid.vue';
import NightGrid from '../grid/NightGrid.vue';
import { Grid28Regular, Options24Regular, BuildingLighthouse20Regular } from '@vicons/fluent';
import { CrownOutlined } from '@vicons/antd';
import { Notebook } from '@vicons/carbon';

const dayComponents = [
  { label: 'Grid', icon: markRaw(Grid28Regular), component: markRaw(DayGrid), props: {} },
  { label: 'Buildings', icon: markRaw(BuildingLighthouse20Regular), component: markRaw(Buildings), props: {} },
  { label: 'Lore', icon: markRaw(Notebook), component: markRaw(Lore), props: {} },
  { label: 'Achievements', icon: markRaw(CrownOutlined), component: markRaw(Achievements), props: {} },
  { label: 'Options', icon: markRaw(Options24Regular), component: markRaw(Options), props: {} },
];

const nightComponents = [
  { label: 'Grid', icon: markRaw(Grid28Regular), component: markRaw(NightGrid), props: {} },
  { label: 'Buildings', icon: markRaw(BuildingLighthouse20Regular), component: markRaw(Buildings), props: {} },
  { label: 'Lore', icon: markRaw(Notebook), component: markRaw(Lore), props: {} },
  { label: 'Achievements', icon: markRaw(CrownOutlined), component: markRaw(Achievements), props: {} },
  { label: 'Options', icon: markRaw(Options24Regular), component: markRaw(Options), props: {} },
];

const isSmallScreen = ref(isSmallWindow());
const visibleSides = ref(2);

const updateScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 730;
    
    if (isSmallScreen.value) {
      visibleSides.value = 1;
    } else if (!isSmallScreen.value) {
      visibleSides.value = 2;
    }
  };

  function isSmallWindow() {
    return window.innerWidth < 730;
  }

  window.addEventListener('resize', updateScreenSize);

  watchEffect(() => {
    updateScreenSize();
  })
</script>

<style scoped>
.day {
  background: linear-gradient(to bottom, #e9c46a, #f4a261);
}

.night {
  background: linear-gradient(to bottom, #264653, #023047);
}
</style>
