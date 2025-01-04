<template>
  <n-grid :cols="store.factions[faction].level" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(building, index) in buildingIcons"
      :key="index"
      :class="[
        'grid-cell',
        `grid-cell-${faction}`,
        store.selectedBuilding && building ? 'dim-building' : '',
        store.selectedBuilding && !building ? 'highlight-empty' : '',
        getCursorClass(building)
      ]"
    >
      <component
        v-if="building"
        :is="getIconComponent(building.icon)"
        :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
        class="button-icon"
        @click="clickBuilding(building)"
      />
      <div
        v-else
        class="empty-cell"
        @click="onClickEmptyCell(index)"
      ></div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useStore } from '../../composables/useStore';
import { Building, FactionKey, IconComponent, iconMap } from '../../utilities/types';

const props = defineProps({
  faction: {
    type: String as PropType<FactionKey>,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const store = useStore();

const getIconComponent = (iconName: string): IconComponent | null => {
    return iconMap[iconName] || null;
  };

const buildingIcons = computed(() => {
  const factionBuildings = store.factions[props.faction].grid;
  const allFactionBuildings = store.factions[props.faction].buildings;

  const buildingIcons = factionBuildings.map((buildingId) => {
    if (!buildingId) return null;
    return allFactionBuildings.find((b) => b.id === buildingId) || null;
  });

  return buildingIcons;
});

function clickBuilding(building: Building) {
  console.log(`Button ${building.id} clicked!`);
}

function onClickEmptyCell(gridIndex: number) {
  if (!store.selectedBuilding) {
    return;
  }

  store.factions[props.faction].grid[gridIndex] = store.selectedBuilding.id;
  store.selectedBuilding = null;
}

function getCursorClass(building: Building | null) {
  if (store.selectedBuilding) {
    return building ? 'cursor-default' : 'cursor-pointer';
  } else {
    return building ? 'cursor-pointer' : 'cursor-default';
  }
}
</script>

<style scoped>
.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
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

.dim-building {
  opacity: 0.5;
}

.highlight-empty {
  outline: 2px dashed #ffffffaa;
  outline-offset: -2px;
}

.button-icon {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: fill 0.3s ease;
}

.grid-cell-sun .button-icon:hover svg {
  fill: #fca311;
}

.grid-cell-moon .button-icon:hover svg {
  fill: #ade8f4;
}

.empty-cell {
  width: 80%;
  height: 80%;
}

.cursor-pointer {
  cursor: pointer;
}
.cursor-default {
  cursor: default;
}
</style>
