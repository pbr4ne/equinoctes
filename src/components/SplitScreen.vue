<template>
  <div class="split-screen">
    <div class="side day">
      <IconGrid :icons="dayIcons" />
    </div>
    <div class="side night">
      <IconGrid :icons="nightIcons" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import IconGrid from './IconGrid.vue';
import { SunnyOutline, CloudOutline } from '@vicons/ionicons5';
import { MoonOutline, StarOutline } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    IconGrid,
  },
  data() {
    return {
      dayIcons: [
        markRaw(SunnyOutline),
        markRaw(CloudOutline),
      ],
      nightIcons: [
        markRaw(MoonOutline),
        markRaw(StarOutline),
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

