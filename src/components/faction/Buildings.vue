<template>
  <n-scrollbar>
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
            />
          </n-icon>
          <span style="padding-left: 10px;"> {{getBuildingMetadata(building).name}}</span>
        </n-button>
    </n-space>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import { Building, BuildingMetadata, FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>();
const store = useStore();
const buildingMetadata = props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata;
const visibleBuildings = computed(() => 
  store.factions[props.faction].buildings.filter((building) => 
    !store.factions[props.faction].grid.includes(building.id)).filter((building) => 
      building.viewUnlocked
    )
  );

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

const canBuyBuilding = (building: Building) => {
  if (store.currentlyDay && props.faction !== 'sun' || !store.currentlyDay && props.faction !== 'moon') {
    return false;
  }

  if (!store.factions[props.faction].grid.slice(0, store.factions[props.faction].level * store.factions[props.faction].level).some((slot) => slot === null)) {
    return false;
  }

  if (building.buildPrerequisite.power) {
    return store.factions[props.faction].power >= building.buildPrerequisite.power;
  }
  return true;
}

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
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 1.5em;
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
</style>
