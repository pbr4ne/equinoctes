<template>
  <div class="split-screen">
    <div class="side day">
      <DayGrid />
    </div>
    <div class="side night">
      <NightGrid />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DayGrid from './DayGrid.vue';
import NightGrid from './NightGrid.vue';

export default defineComponent({
  components: {
    DayGrid,
    NightGrid,
  }
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

