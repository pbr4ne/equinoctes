<template>
  <n-grid :cols="store.factions[faction].level" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(building, index) in buildingIcons"
      :key="index"
    >
      <GridCell
        :faction="faction"
        :index="index"
        :building="building"
        :adjacencyModifier="getCellAdjacencyModifier(index)"
        :isDimmed="!!store.factions[faction].selectedBuilding && !!building"
        :isHighlightEmpty="!!store.factions[faction].selectedBuilding && !building"
        :cursorClass="getCursorClass(building)"

        :clickBuilding="clickBuilding"
        :clickEmpty="onClickEmptyCell"
        :enterBuilding="onBuildingEnter"
        :leaveBuilding="onBuildingLeave"
      />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '../../composables/useStore'
import type { Building, FactionKey } from '../../utilities/types'
import GridCell from './GridCell.vue'

const props = defineProps<{ faction: FactionKey }>()
const store = useStore()

const hoveredBuilding = ref<Building | null>(null)
const hoveredIndex = ref<number | null>(null)

function onBuildingEnter(building: Building, index: number) {
  hoveredBuilding.value = building
  hoveredIndex.value = index
}
function onBuildingLeave() {
  hoveredBuilding.value = null
  hoveredIndex.value = null
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
</script>
