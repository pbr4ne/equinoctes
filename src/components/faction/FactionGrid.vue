<template>
  <n-grid :cols="store.factions[faction].level" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(building, index) in buildingIcons"
      :key="index"
      :class="[
        'grid-cell',
        `grid-cell-${faction}`,
        getCellAdjacencyModifier(index) !== null ? 'adjacency-highlight' : '',
        store.factions[props.faction].selectedBuilding && building ? 'dim-building' : '',
        store.factions[props.faction].selectedBuilding && !building ? 'highlight-empty' : '',
        getCursorClass(building)
      ]"
    >
      <n-popover 
        v-if="building"
        trigger="hover"
        :style="{ backgroundColor: faction == 'sun' ? '#9e2a2b' : '#caf0f8', color: faction == 'sun' ? '#e9c46a': '#264653', border: '1px solid black', borderRadius: '12px', padding: '8px' }"
        :arrow-style="{ backgroundColor: faction == 'sun' ? '#9e2a2b' : '#caf0f8', border: '1px solid black' }"
        @update:show="(val: boolean) => onPopoverShow(val, building, index)"
      >
        <template #trigger>
          <component
            :is="getIconComponent(building.icon)"
            :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
            class="button-icon"
            @click="clickBuilding(building)"
          />
        </template>
        <span style="border-radius: 25px;">{{building?.description}}</span>
      </n-popover>
      <div
        v-else
        class="empty-cell"
        @click="onClickEmptyCell(index)"
      ></div>
      <div
        v-if="getCellAdjacencyModifier(index) !== null"
        class="adj-icon"
      >
        <component
          :is="getArrowIcon(getCellAdjacencyModifier(index))"
          :style="{ color: getArrowColor(getCellAdjacencyModifier(index)) }"
        />
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { useStore } from '../../composables/useStore';
import { Building, FactionKey, IconComponent, iconMap } from '../../utilities/types';
import { ArrowBigTop, ArrowBigUpLine, ArrowBigUpLines, ArrowBigDown, ArrowBigDownLine, ArrowBigDownLines } from '@vicons/tabler';

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

const hoveredBuilding = ref<Building | null>(null)
const hoveredIndex = ref<number | null>(null)

function onPopoverShow(showing: boolean, building: Building, index: number) {
  if (showing) {
    hoveredBuilding.value = building
    hoveredIndex.value = index
  } else {
    hoveredBuilding.value = null
    hoveredIndex.value = null
  }
}

function getCellAdjacencyModifier(cellIndex: number): number | null {
  if (!hoveredBuilding.value || hoveredIndex.value == null) return null
  if (!hoveredBuilding.value.adjacency) return null

  const factionData = store.factions[props.faction]
  const { level } = factionData

  const { x: hx, y: hy } = getXY(hoveredIndex.value, level)
  const { x: cx, y: cy } = getXY(cellIndex, level)

  const dx = cx - hx
  const dy = cy - hy

  const offset = hoveredBuilding.value.adjacency.find(o => o.dx === dx && o.dy === dy)

  return offset ? offset.modifier : null
}

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
  const selectedBuilding = store.factions[props.faction].selectedBuilding;

  if (!selectedBuilding) {
    return;
  }
  
  store.factions[props.faction].grid[gridIndex] = selectedBuilding.id;
  store.factions[props.faction].selectedBuilding = null;
}

function getCursorClass(building: Building | null) {
  if (store.factions[props.faction].selectedBuilding) {
    return building ? 'cursor-default' : 'cursor-pointer';
  } else {
    return building ? 'cursor-pointer' : 'cursor-default';
  }
}

function getXY(index: number, cols: number) {
  const x = index % cols
  const y = Math.floor(index / cols)
  return { x, y }
}

function getArrowIcon(modifier: number | null): IconComponent | null {
  if (modifier === null) {
    return null
  }

  if (modifier >= 0) {
    if (modifier <= 0.25) {
      return ArrowBigTop
    } else if (modifier < 0.5) {
      return ArrowBigUpLine
    } else {
      return ArrowBigUpLines
    }
  }

  if (modifier > -0.25) {
    return ArrowBigDown
  } else if (modifier > -0.5) {
    return ArrowBigDownLine
  } else {
    return ArrowBigDownLines
  }
}

function getArrowColor(modifier: number | null): string {
  if (modifier === null) {
    return ''
  }
  return modifier >= 0 ? '#ecf39e' : '#f26a8d'
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
  outline: 2px solid white;
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


.adjacency-highlight {
  position: relative;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.3) 0px,
    rgba(255, 255, 255, 0.3) 4px,
    transparent 4px,
    transparent 8px
  );
}

.adj-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adj-icon svg {
  color: #fff;
  width: 50%;
  height: 50%;
}
</style>
