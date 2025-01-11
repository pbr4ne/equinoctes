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

  >
    <component
      v-if="cell.building"
      :is="iconComponent"
      :color="getIconColour()"
      :class="['button-icon', { 'flip-horizontal': shouldFlipIcon }]"
      @click="onClickBuilding"
      :style="specialColor"
    />

    <div
      v-else
      class="empty-cell"
      @click="onClickEmpty"
    ></div>

    <div class="particle-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        :id="`particle-${particle.id}`" 
        :class="['particle', `particle-${faction}`]" 
        :style="{ left: particle.x + 'px', top: particle.y + 'px' }"
      ></div>
    </div>

    <n-popover 
        v-if="cellHovered && cell.building && !cell.isDisabled"
        trigger="hover"
        placement="top"
        :theme-overrides="faction === 'sun' ? sunPopoverThemeOverride : moonPopoverThemeOverride"
      >
      <template #trigger>
        <div
          
          :class="['delete-icon', `delete-icon-${faction}`]"
          @click.stop="onDeleteBuilding"
        >
          &#10005;
        </div>
      </template>
      Deletes this building with no refund.<br />You can rebuild later.
    </n-popover>

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
import { ref, computed, nextTick } from 'vue'
import { gsap } from 'gsap';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../composables/useStore'
import type { Building, FactionKey } from '../../utilities/types'
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import {
  ArrowBigTop, ArrowBigUpLine, ArrowBigUpLines,
  ArrowBigDown, ArrowBigDownLine, ArrowBigDownLines
} from '@vicons/tabler'
import { YinYang } from '@vicons/fa';
import { Moon2 } from '@vicons/tabler';
import { Sunny } from '@vicons/carbon';
import { DataSunburst24Filled } from '@vicons/fluent';

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
const particles = ref<Array<{ id: string; x: number; y: number }>>([]);

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

function getIconColour() {
  if (props.faction === 'sun') {
    if (cellHovered.value && !props.cell.isDisabled && !props.cell.isDimmed) {
      return '#264653';
    } else {
      return '#9e2a2b';
    }
  } else {
    if (cellHovered.value && !props.cell.isDisabled && !props.cell.isDimmed) {
      return '#f4a261';
    } else {
      return '#caf0f8';
    }
  }
}

function onClickBuilding() {
  if (!props.cell.building || props.cell.isDisabled) return;
  
  if(store.factions[props.faction].boost?.building) {
    return;
  }

  store.factions[props.faction].boost = {
    building: props.cell.building.id,
    start: new Date().getTime(),
  }
  
  startParticleBurst();
}

function startParticleBurst() {
  triggerParticles();

  const intervalId = setInterval(() => {
    triggerParticles();
  }, 500);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}

function generateParticlePosition(): { x: number; y: number } {
  const gridCellWidth = 100;
  const gridCellHeight = 100;

  const x = gridCellWidth / 2;
  const y = gridCellHeight / 2;

  return { x, y };
}

function generateParticleMovement(): { x: number; y: number } {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 50 + 50;

  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return { x, y };
}

async function triggerParticles() {
  const numberOfParticles = 10;
  const newParticles: Array<{ id: string; x: number; y: number }> = [];

  for (let i = 0; i < numberOfParticles; i++) {
    const id = uuidv4();
    const position = generateParticlePosition();
    newParticles.push({ id, x: position.x, y: position.y });
  }

  particles.value.push(...newParticles);

  await nextTick();

  newParticles.forEach(particle => {
    const movement = generateParticleMovement();
    const particleElement = document.getElementById(`particle-${particle.id}`);
    if (particleElement) {
      if (props.faction === 'sun') {
        gsap.to(particleElement, {
          x: movement.x,
          y: movement.y,
          opacity: 0,
          duration: 1,
          ease: 'power1.out',
          onComplete: () => {
            particles.value = particles.value.filter(p => p.id !== particle.id);
          }
        });
      } else if (props.faction === 'moon') {
        gsap.to(particleElement, {
          x: movement.x,
          y: movement.y,
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: 'power1.out',
          onComplete: () => {
            particles.value = particles.value.filter(p => p.id !== particle.id);
          }
        });
      }
    }
  });
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

const sunPopoverThemeOverride = {
  "color": "#9e2a2b",
  "textColor": "#e9c46a",
  "titleTextColor": "#e9c46a",
  "borderColor": "#e9c46a"
}

const moonPopoverThemeOverride = {
  "color": "#caf0f8",
  "textColor": "#264653",
  "titleTextColor": "#264653",
  "borderColor": "#264653"
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
      color: props.faction === 'sun' ? '#264653' : '#e9c46a'
    }
  } else if (iconComponent.value === Moon2) {
    return {
      color: '#0286ff'
    }
  } else if (iconComponent.value === DataSunburst24Filled) {
    return {
      color: '#FC8200'
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

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none;
}

/*circles*/
.particle-sun {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 2px solid #FFD700;
  border-radius: 50%;
}

/*crosses*/
.particle-moon {
  width: 10px;
  height: 10px;
  background: transparent;
}

.particle-moon::before,
.particle-moon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #87ceeb;
}

.particle-moon::before {
  transform: translateX(-50%) rotate(0deg);
}

.particle-moon::after {
  transform: translateX(-50%) rotate(90deg);
}

.grid-cell-sun .particle-sun {
  border-color: #9e2a2b;
}

.grid-cell-moon .particle-moon::before,
.grid-cell-moon .particle-moon::after {
  background-color: #87ceeb;
}
</style>
