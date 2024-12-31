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
import Container from './Container.vue';
import Options from './Options.vue';
import DayGrid from './DayGrid.vue';
import NightGrid from './NightGrid.vue';
import { CubeOutline } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    Container,
    Options,
  },
  data() {
    return {
      dayComponents: [
        { label: 'Grid', icon: markRaw(CubeOutline), component: markRaw(DayGrid)  },
        { label: 'Options', icon: markRaw(CubeOutline), component: markRaw(Options) },
      ],
      nightComponents: [
        { label: 'Grid', icon: markRaw(CubeOutline), component: markRaw(NightGrid)  },
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
  background: linear-gradient(to bottom, #fdfbda, #ffeb88);
}

.night {
  background: linear-gradient(to bottom, #2a2b4e, #000022);
  color: white;
}
</style>

