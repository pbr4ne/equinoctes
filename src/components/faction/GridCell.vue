<template>
  <div
    :class="[
      'grid-cell',
      `grid-cell-${faction}`,
      cell.adjacencyModifier !== null ? 'adjacency-highlight' : '',
      cell.isDimmed ? 'dim-building' : '',
      cell.isHighlightEmpty ? 'highlight-empty' : '',
      cell.cursorClass,
      hovered && !cell.building ? 'hovered' : ''
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <component
      v-if="cell.building"
      :is="iconComponent"
      :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
      class="button-icon"
      @click="onClickBuilding"
    />

    <div
      v-else
      class="empty-cell"
      @click="onClickEmpty"
    ></div>

    <div
      v-if="cell.adjacencyModifier !== null"
      class="adj-icon"
    >
      <component
        :is="getArrowIcon(cell.adjacencyModifier)"
        :style="{ color: getArrowColor(cell.adjacencyModifier) }"
      />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Building, FactionKey } from '../../utilities/types'
import { ArrowBigTop, ArrowBigUpLine, ArrowBigUpLines, ArrowBigDown, ArrowBigDownLine, ArrowBigDownLines } from '@vicons/tabler'
import { iconMap } from '../../utilities/types'

const props = defineProps<{
  faction: FactionKey,
  index: number,
  cell: {
    building: Building | null,
    adjacencyModifier: number | null,
    isDimmed: boolean,
    isHighlightEmpty: boolean,
    cursorClass: string
  },
}>();

const emits = defineEmits(['clickBuilding', 'clickEmpty', 'enterBuilding', 'leaveBuilding']);

const hovered = ref(false);

const iconComponent = computed(() => {
  if (!props.cell.building) return null
  return iconMap[props.cell.building.icon] || null
});

function handleMouseEnter() {
  if (props.cell.building) {
    emits('enterBuilding', props.cell.building, props.index)
  } else if (props.cell.isHighlightEmpty) {
    hovered.value = true
  }
}

function handleMouseLeave() {
  hovered.value = false
  if (props.cell.building) {
    emits('leaveBuilding')
  }
}

function onClickBuilding() {
  if (!props.cell.building) return;
  emits('clickBuilding', props.cell.building);
}

function onClickEmpty() {
  emits('clickEmpty', props.index);
}

function getArrowIcon(modifier: number | null) {
  if (modifier === null) return null;
  if (modifier >= 0) {
    if (modifier <= 0.25) return ArrowBigTop;
    else if (modifier < 0.5) return ArrowBigUpLine;
    else return ArrowBigUpLines;
  }
  if (modifier > -0.25) return ArrowBigDown;
  else if (modifier > -0.5) return ArrowBigDownLine;
  else return ArrowBigDownLines;
}

function getArrowColor(modifier: number | null): string {
  if (modifier === null) return '';
  return modifier >= 0 ? '#ecf39e' : '#f26a8d';
}
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

.hovered {
  outline: 3px solid yellow;
  outline-offset: -3px;
}
</style>
  