<template>
  <n-grid :cols="side === 'sun' ? store.sunLevel : store.moonLevel" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(icon, index) in paddedIcons"
      :key="index"
      :class="['grid-cell', `grid-cell-${side}`]"
    >
      <n-button
        v-if="icon"
        quaternary
        :round="true"
        size="large"
        :color="side === 'sun' ? '#9e2a2b' : '#caf0f8'"
        class="grid-button"
        @click="handleButtonClick(index)"
      >
        <component :is="icon" class="button-icon" />
      </n-button>
      <div v-else class="empty-cell"></div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { useBuildings } from '../../composables/useBuildings';

const props = defineProps({
  side: {
    type: String,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const buildings = useBuildings();
const store = useStore();

const paddedIcons = computed(() => {
  const level = props.side === 'sun' ? store.sunLevel : store.moonLevel;
  const numGrids = level * level;
  const factionBuildings = props.side === 'sun' ? buildings.sunBuildings : buildings.moonBuildings;
  const buildingIcons = factionBuildings.map((building) => building.icon);
  return [...buildingIcons, ...Array(numGrids - buildingIcons.length).fill(null)].slice(0, numGrids);
});

function handleButtonClick(index: number) {
  console.log(`Button ${index} clicked!`);
}
</script>

<style scoped>
.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
}

.grid-cell-sun {
  background: #e9c46a;
  border: 1px solid #9e2a2b;
}

.grid-cell-moon {
  background: #264653;
  border: 1px solid #caf0f8;
}

.grid-button {
  width: 50%;
  height: 50%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-sizing: border-box;
}

.button-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-icon > svg {
  width: 100% !important;
  height: 100% !important;
}

.empty-cell {
  width: 100%;
  height: 100%;
}
</style>
