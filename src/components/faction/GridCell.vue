<template>
  <div
    :class="[
      'grid-cell',
      `grid-cell-${faction}`,
      !cell.isDisabled && cell.adjacencyModifier !== null ? 'adjacency-highlight' : '',
      cell.isDimmed ? 'dim-building' : '',
      cell.isHighlightEmpty ? 'highlight-empty' : '',
      cell.isDisabled ? 'cursor-not-allowed' : cell.cursorClass,
      hovered && !cell.building ? 'hovered' : '',
      hovered && !cell.building ? (faction === 'sun' ? 'hovered-sun' : 'hovered-moon') : '',
      cell.isDisabled ? 'dim-building' : ''
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="specialColor"
  >
    <component
      v-if="cell.building"
      :is="iconComponent"
      :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
      :class="['button-icon', { 'flip-horizontal': shouldFlipIcon }]"
      @click="onClickBuilding"
    />

    <div
      v-else
      class="empty-cell"
      @click="onClickEmpty"
    ></div>

    <div
      v-if="cellHovered && cell.building && !cell.isDisabled"
      :class="['delete-icon', `delete-icon-${faction}`]"
      @click.stop="onDeleteBuilding"
    >
      &#10005;
    </div>

    <div
      v-if="cell.adjacencyModifier !== null"
      class="adj-icon"
    >
      <component
        :is="!cell.isDisabled && getArrowIcon(cell.adjacencyModifier)"
        :style="{ color: getArrowColor(cell.adjacencyModifier) }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../../composables/useStore'
import type { Building, FactionKey } from '../../utilities/types'
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import {
  ArrowBigTop, ArrowBigUpLine, ArrowBigUpLines,
  ArrowBigDown, ArrowBigDownLine, ArrowBigDownLines
} from '@vicons/tabler'
import { YinYang } from '@vicons/fa';

const props = defineProps<{
  faction: FactionKey,
  index: number,
  cell: {
    building: Building | null,
    adjacencyModifier: number | null,
    isDimmed: boolean,
    isHighlightEmpty: boolean,
    cursorClass: string,
    isDisabled: boolean,
  },
}>();

const emits = defineEmits([
  'clickBuilding',
  'clickEmpty',
  'enterBuilding',
  'leaveBuilding',
  'deleteBuilding',
  'enterCell',
  'leaveCell'
]);

const store = useStore();
const cellHovered = ref(false);
const hovered = ref(false);

const buildingMetadata = props.faction === 'sun'
  ? sunBuildingMetadata
  : moonBuildingMetadata;

const iconComponent = computed(() => {
  if (!props.cell.building) return null;
  const building = props.cell.building;
  return buildingMetadata.find((b) => b.id === building.id)?.icon;
});

function handleMouseEnter() {
  cellHovered.value = true;
  emits('enterCell', props.index, props.cell.building);

  if (props.cell.building) {
    emits('enterBuilding', props.cell.building, props.index);
  } else if (props.cell.isHighlightEmpty) {
    hovered.value = true;
  }
}

function handleMouseLeave() {
  cellHovered.value = false;
  hovered.value = false;
  emits('leaveCell');

  if (props.cell.building) {
    emits('leaveBuilding');
  }
}

function onClickBuilding() {
  if (!props.cell.building) return;
  emits('clickBuilding', props.cell.building);
}

function onClickEmpty() {
  emits('clickEmpty', props.index);
}

function onDeleteBuilding() {
  if (!props.cell.building) return;
  emits('deleteBuilding', props.cell.building, props.index);

  store.factions[props.faction].grid[props.index] = null;
  emits('leaveBuilding');
}

function getArrowIcon(modifier: number | null) {
  if (modifier === null) return null;
  if (modifier >= 0) {
    if (modifier <= 0.25) return ArrowBigTop;
    if (modifier < 0.5) return ArrowBigUpLine;
    return ArrowBigUpLines;
  } else {
    if (modifier > -0.25) return ArrowBigDown;
    if (modifier > -0.5) return ArrowBigDownLine;
    return ArrowBigDownLines;
  }
}

function getArrowColor(modifier: number | null): string {
  if (modifier === null) return '';
  return modifier >= 0 ? '#ecf39e' : '#f26a8d';
}

const shouldFlipIcon = computed(() => {
  return iconComponent.value === YinYang && props.faction === 'moon';
});

const specialColor = computed(() => {
  if (iconComponent.value === YinYang) {
    return {
      color: props.faction === 'sun' ? '#caf0f8' : '#9e2a2b'
    }
  }
});
</script>
  
<style scoped>
.grid-cell {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.grid-cell-sun {
  background: #e9c46a;
  border: 1px solid #9e2a2b;
}
.grid-cell-moon {
  background: #264653;
  border: 1px solid #caf0f8;
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

.adjacency-highlight {
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
  width: 50%;
  height: 50%;
  z-index: 700;
}

.dim-building {
  opacity: 0.5;
}

.highlight-empty {
  outline: 2px solid white;
  outline-offset: -2px;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-default {
  cursor: default;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.hovered {
  outline-offset: -3px;
}

.hovered-sun {
  outline: 3px solid #264653;
}

.hovered-moon {
  outline: 3px solid #e9c46a;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.2s ease;
  z-index: 1000;
}

.delete-icon-sun {
  color: #264653;
}

.delete-icon-moon {
  color: #e9c46a;
}

.delete-icon:hover {
  color: #ffffff;
}

.flip-horizontal {
  transform: scaleX(-1);
}
</style>
