<template>
  <n-scrollbar trigger="none">
      <n-space vertical>
        <n-button 
          v-for="(building, index) in visibleBuildings"
          :key="index"
          :class="['buildingButton', `buildingButton-${faction}`]" 
          :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
          @click="buyBuilding(building)"
          @mouseenter="onBuildingEnter(building, index)"
          @mouseleave="onBuildingLeave"
          :disabled="!canBuyBuilding(building)"
        >
          <n-icon>
            <component
              :is="getIcon(building)"
              :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
              :class="[{ 'flip-horizontal': shouldFlipIcon(building) }]"
              :style="specialColor(building)"
            />
          </n-icon>
          <n-popover
            v-if="isOffTime || noSlots"
            trigger="hover"
            placement="top"
            :theme-overrides="faction === 'sun' ? sunPopoverThemeOverride : moonPopoverThemeOverride"
          >
            <template #trigger>
              <span style="padding-left: 10px;">{{ getBuildingMetadata(building).name }}</span>
            </template>
            <span v-if="isOffTime">
              Cannot interact during the {{ store.currentlyDay ? 'day' : 'night' }}
            </span>
            <span v-else-if="store.factions[faction].level < 5">
              No free slots in the grid. Perhaps you need more {{ faction === 'sun' ? 'Aurum' : 'Nocturne' }}...
            </span>
            <span v-else>
              No free slots in the grid. Perhaps you need to remove a{{ faction === 'sun' ? ' wonder': 'n endeavour' }}.
            </span>
          </n-popover>
          <span v-else style="padding-left: 10px;">{{ getBuildingMetadata(building).name }}</span>
        </n-button>
        <span v-if="visibleBuildings.length === 0" :class="['noBuilding', `noBuilding-${faction}`]">
          <span v-if="faction === 'sun'">No wonders available. <br><br>Be patient, as you collect Aurum our <span style="color: #264653; font-weight: bold">RADIANT LADY</span> will lay a path for you.</span>
          <span v-else>No endeavours available. <br><br>Patience, as you gather Nocturne our <span style="color: #e9c46a; font-weight: bold">SILVER LORD</span> will show you the way.</span>
        </span>
      </n-space>
      <transition name="fade">
        <div v-if="isGridVisible" class="grid-popup">
          <AdjacencyPreview
            :faction="faction"
            :hoveredBuilding="hoveredBuilding"
          />
        </div>
      </transition>
    </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { useBuildings } from '../../composables/useBuildings';
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import { Building, BuildingMetadata, FactionKey } from '../../utilities/types';
import { YinYang } from '@vicons/fa';
import { Moon2 } from '@vicons/tabler';
import { DataSunburst24Filled } from '@vicons/fluent';
import AdjacencyPreview from './AdjacencyPreview.vue';

const props = defineProps<{ faction: FactionKey }>();
const store = useStore();
const useBuildingsInstance = useBuildings();
const buildingData = props.faction === 'sun' ? useBuildingsInstance.sunBuildings : useBuildingsInstance.moonBuildings;
const buildingMetadata = props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata;
const isGridVisible = ref(false);
const hoveredBuilding = ref<Building|null>(null);

const visibleBuildings = computed(() => 
  store.factions[props.faction].buildings
    .filter((building) => 
      !store.factions[props.faction].grid.includes(building.id)
    )
    .filter((building) => 
      building.viewUnlocked
    )
    .sort((a, b) => buildingData.filter((b) => b.id === a.id)[0].power - buildingData.filter((c) => c.id === b.id)[0].power)
);

store.factions[props.faction].unseenBuildings = false;

const isOffTime = computed(() => {
  if (store.milestones[props.faction].offTimeBuilding) {
    return false;
  }
  return store.currentlyDay ? props.faction !== 'sun' : props.faction !== 'moon';
});

const getBuildingMetadata = (building: Building) => {
  
  const metaBuild = buildingMetadata.find((b) => b.id === building.id);
  if (!metaBuild) {
    console.error(`No metadata found for building ${building.id}`);
    return {} as BuildingMetadata;
  }
  return metaBuild;
}

const noSlots = computed(() => {
  return !store.factions[props.faction].grid.some((slot) => slot === null);
});

const getIcon = (building: Building) => {
  const metaBuild = getBuildingMetadata(building);
  return metaBuild?.icon;
}

const shouldFlipIcon = (building: Building) => {
  return getIcon(building) === YinYang && props.faction === 'moon';
};

const canBuyBuilding = (building: Building) => {
  if (store.currentlyDay && props.faction !== 'sun' || !store.currentlyDay && props.faction !== 'moon') {
    if (!store.milestones[props.faction].offTimeBuilding) {
      return false;
    }
  }

  if (!store.factions[props.faction].grid.some((slot) => slot === null)) {
    return false;
  }

  if (building.buildPrerequisite.power) {
    return store.factions[props.faction].power >= building.buildPrerequisite.power;
  }
  return true;
}

const specialColor = (building: Building) => {
  if (getIcon(building) === YinYang) {
    return {
      color: props.faction === 'sun' ? '#264653' : '#e9c46a'
    }
  } else if (getIcon(building) === Moon2) {
    return {
      color: '#0286ff'
    }
  } else if (getIcon(building) === DataSunburst24Filled) {
    return {
      color: '#FC8200'
    }
  }
};

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

const buyBuilding = (building: Building) => {
  store.factions[props.faction].selectedBuilding = building;
  emitter.emit('switchedToGrid', { faction: props.faction });
};

function onBuildingEnter(building: Building, index: number) {
  emitter.emit('buildingEntered', { faction: props.faction, buildingId: building.id });
  hoveredBuilding.value = building;
  isGridVisible.value = true;
}

function onBuildingLeave() {
  emitter.emit('buildingLeft', { faction: props.faction });
  hoveredBuilding.value = null;
  isGridVisible.value = false;
}
</script>

<style scoped>
.buildingButton {
  font-size: 1.25em;
  border-radius: 20px;
}

.buildingButton-sun {
  border: 1px solid #9e2a2b;
  background-color: #e9c46a;
  color: #9e2a2b;
}

.buildingButton-moon {
  border: 1px solid #caf0f8;
  background-color: #264653;
  color: #caf0f8;
}

.noBuilding {
  font-size: 1.25em;
}

.noBuilding-sun {
  color: #9e2a2b;
}

.noBuilding-moon {
  color: #caf0f8;
}

.flip-horizontal {
  transform: scaleX(-1);
}

.grid-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  height: 120px;
  padding: 10px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media ((max-width: 935px) and (min-width: 731px)), (max-height: 830px) {
  .grid-popup {
    width: 50px;
    height: 50px;
    top: 20px;
  }
}

@media (max-width: 500px), (max-height: 600px) {
  .grid-popup {
    width: 50px;
    height: 50px;
    top: 20px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
