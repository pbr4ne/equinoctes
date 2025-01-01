<template>
  <n-grid :cols="2">
    <n-gi>
      <faction :components="dayComponents" side="left" class="day"/>
    </n-gi>
    <n-gi>
      <faction :components="nightComponents" side="right" class="night"/>
    </n-gi>  
  </n-grid>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
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
</script>

<style scoped>
.day {
  background: linear-gradient(to bottom, #e9c46a, #f4a261);
}

.night {
  background: linear-gradient(to bottom, #264653, #023047);
}
</style>
