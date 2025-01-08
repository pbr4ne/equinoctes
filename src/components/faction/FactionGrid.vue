<template>
  <n-grid :cols="store.factions[faction].level" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(cell, cellIndex) in cells"
      :key="cellIndex"
    >
      <GridCell
        :faction="faction"
        :index="cellIndex"
        :cell="cell"
        @clickBuilding="clickBuilding"
        @clickEmpty="onClickEmptyCell"
        @enterBuilding="onEnterBuilding"
        @leaveBuilding="onLeaveBuilding"
      />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';
import type { Building, FactionKey } from '../../utilities/types';
import GridCell from './GridCell.vue';

const props = defineProps<{ faction: FactionKey }>();
const store = useStore();

const hoveredBuilding = ref<Building | null>(null);
const hoveredIndex = ref<number | null>(null);

function onEnterBuilding(building: Building, index: number) {
  hoveredBuilding.value = building;
  hoveredIndex.value = index;
  emitter.emit('buildingEntered', { faction: props.faction, buildingId: building.id });
}

function onLeaveBuilding() {
  hoveredBuilding.value = null;
  hoveredIndex.value = null;
  emitter.emit('buildingLeft', { faction: props.faction });
}

function getCellAdjacencyModifier(cellIndex: number): number | null {
  if (!hoveredBuilding.value || hoveredIndex.value == null) return null;
  if (!hoveredBuilding.value.adjacency) return null;

  const { level } = store.factions[props.faction];
  const { x: hx, y: hy } = getXY(hoveredIndex.value, level);
  const { x: cx, y: cy } = getXY(cellIndex, level);

  const dx = cx - hx;
  const dy = cy - hy;
  const offset = hoveredBuilding.value.adjacency.find(o => o.dx === dx && o.dy === dy);

  return offset ? offset.modifier : null;
}

const buildingIcons = computed<(Building | null)[]>(() => {
  const factionBuildings = store.factions[props.faction].grid;
  const allFactionBuildings = store.factions[props.faction].buildings;

  return factionBuildings.map((buildingId) => {
    if (!buildingId) return null;
    return allFactionBuildings.find((b) => b.id === buildingId) || null;
  });
});

const cells = computed(() => {
  const selectedBuilding = store.factions[props.faction].selectedBuilding;

  return buildingIcons.value.map((building, index) => {
    const adjacencyModifier = getCellAdjacencyModifier(index);

    const hasSelected = !!selectedBuilding;
    const isOccupied = !!building;
    const isDimmed = hasSelected && isOccupied;
    const isHighlightEmpty = hasSelected && !isOccupied;
    const cursorClass = getCursorClass(building);
    const isDisabled = store.currentlyDay && props.faction === 'moon' || !store.currentlyDay && props.faction === 'sun';

    return {
      building,
      adjacencyModifier,
      isDimmed,
      isHighlightEmpty,
      cursorClass,
      isDisabled,
    };
  });
});

function clickBuilding(building: Building) {
  console.log(`Button ${building.id} clicked!`);
}

function onClickEmptyCell(gridIndex: number) {
  const selectedBuilding = store.factions[props.faction].selectedBuilding;
  if (!selectedBuilding) return;

  store.factions[props.faction].grid[gridIndex] = selectedBuilding.id;
  //pay for building
  if (selectedBuilding.buildPrerequisite.power) {
    store.factions[props.faction].power -= selectedBuilding.buildPrerequisite.power;
  }
  selectedBuilding.index = gridIndex;
  store.factions[props.faction].selectedBuilding = null;
}

function getCursorClass(building: Building | null) {
  const selected = !!store.factions[props.faction].selectedBuilding;
  if (selected) {
    return building ? 'cursor-default' : 'cursor-pointer';
  } else {
    return building ? 'cursor-pointer' : 'cursor-default';
  }
}

function getXY(index: number, cols: number) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  return { x, y };
}
</script>
