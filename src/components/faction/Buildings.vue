<template>
  <n-scrollbar>
      <n-space vertical>
        <n-button 
          v-for="building, index in unbuiltBuildings"
          :class="['buildingButton', `buildingButton-${faction}`]" 
          :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
          @click="buyBuilding(building)"
          @mouseenter="onBuildingEnter(building, index)"
          @mouseleave="onBuildingLeave"
        >
          <n-icon>
            <component
              :is="iconMap[building.icon]"
              :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
            />
          </n-icon>
          <span style="padding-left: 10px;"> {{building.name}}</span>
        </n-button>
    </n-space>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { Building, FactionKey, iconMap } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>()
const store = useStore();
const unbuiltBuildings = store.factions[props.faction].buildings.filter((building) => !store.factions[props.faction].grid.includes(building.id));

const buyBuilding = (building: Building) => {
  store.factions[props.faction].selectedBuilding = building;
  emitter.emit('switch', { faction: props.faction });
};

function onBuildingEnter(building: Building, index: number) {
  emitter.emit('buildingEnter', { faction: props.faction, buildingId: building.id });
}

function onBuildingLeave() {
  emitter.emit('buildingLeave', { faction: props.faction });
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
