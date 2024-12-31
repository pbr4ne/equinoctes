<template>
  <div class="split-screen">
    <div class="side day">
      <container :components="dayComponents" side="left"/>
    </div>
    <div class="side night">
      <container :components="nightComponents" side="right"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import Achievements from './Achievements.vue';
import Buildings from './Buildings.vue';
import Container from './Container.vue';
import Lore from './Lore.vue';
import Options from './Options.vue';
import DayGrid from './DayGrid.vue';
import NightGrid from './NightGrid.vue';
import { CubeOutline } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    Buildings,
    Container,
    Achievements,
    Lore,
    Options,
  },
  data() {
    return {
      dayComponents: [
        { label: 'Grid', icon: markRaw(CubeOutline), component: markRaw(DayGrid)  },
        { label: 'Buildings', icon: markRaw(CubeOutline), component: markRaw(Buildings) },
        { label: 'Lore', icon: markRaw(CubeOutline), component: markRaw(Lore) },
        { label: 'Achievements', icon: markRaw(CubeOutline), component: markRaw(Achievements) },
        { label: 'Options', icon: markRaw(CubeOutline), component: markRaw(Options) },
      ],
      nightComponents: [
        { label: 'Grid', icon: markRaw(CubeOutline), component: markRaw(NightGrid)  },
        { label: 'Buildings', icon: markRaw(CubeOutline), component: markRaw(Buildings) },
        { label: 'Lore', icon: markRaw(CubeOutline), component: markRaw(Lore) },
        { label: 'Achievements', icon: markRaw(CubeOutline), component: markRaw(Achievements) },
        { label: 'Options', icon: markRaw(CubeOutline), component: markRaw(Options) },
      ],
    };
  },
});
</script>

<style scoped>
.split-screen {
  display: flex;
  height: 100vh;
}

.side {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.day {
  background: linear-gradient(to bottom, #e9c46a, #f4a261);
}

.night {
  background: linear-gradient(to bottom, #264653, #023047);
  color: white;
}
</style>

