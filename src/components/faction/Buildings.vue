<template>
  <n-scrollbar trigger="none">
      <n-space vertical>
        <n-button 
          v-for="building, index in visibleBuildings"
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
              :class="[{ 'flip-horizontal': shouldFlipIcon }]"
              :style="specialColor(building)"
            />
          </n-icon>
          <span style="padding-left: 10px;"> {{getBuildingMetadata(building).name}}</span>
        </n-button>
        <span v-if="visibleBuildings.length === 0" :class="['noBuilding', `noBuilding-${faction}`]">
          <span v-if="faction === 'sun'">No wonders available. <br><br>Be patient, as you collect Aurum our <span style="color: #264653; font-weight: bold">RADIANT LADY</span> will lay a path for you.</span>
          <span v-else>No endeavours available. <br><br>Patience, as you gather Nocturne our <span style="color: #e9c46a; font-weight: bold">SILVER LORD</span> will show you the way.</span>
        </span>
    </n-space>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { useBuildings } from '../../composables/useBuildings';
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import { Building, BuildingMetadata, FactionKey } from '../../utilities/types';
import { YinYang } from '@vicons/fa';
import { Moon2 } from '@vicons/tabler';
import { Sunny } from '@vicons/carbon';
import { DataSunburst24Filled } from '@vicons/fluent';

const props = defineProps<{ faction: FactionKey }>();
const store = useStore();
const useBuildingsInstance = useBuildings();
const buildingData = props.faction === 'sun' ? useBuildingsInstance.sunBuildings : useBuildingsInstance.moonBuildings;
const buildingMetadata = props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata;
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

const getBuildingMetadata = (building: Building) => {
  
  const metaBuild = buildingMetadata.find((b) => b.id === building.id);
  if (!metaBuild) {
    console.error(`No metadata found for building ${building.id}`);
    return {} as BuildingMetadata;
  }
  return metaBuild;
}

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

const buyBuilding = (building: Building) => {
  store.factions[props.faction].selectedBuilding = building;
  emitter.emit('switchedToGrid', { faction: props.faction });
};

function onBuildingEnter(building: Building, index: number) {
  emitter.emit('buildingEntered', { faction: props.faction, buildingId: building.id });
}

function onBuildingLeave() {
  emitter.emit('buildingLeft', { faction: props.faction });
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
</style>
