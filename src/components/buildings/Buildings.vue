<template>
  <n-scrollbar>
      <n-space vertical>
        <n-button 
          v-for="building in unbuiltBuildings"
          :class="['buildingButton', `buildingButton-${faction}`]" 
          :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
          @click="buyBuilding(building)"
        >
          <span>{{building.name}}</span>
        </n-button>
    </n-space>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { emitter } from '../../utilities/emitter';
import { useStore } from '../../composables/useStore';
import { Building, FactionKey } from '../../utilities/types';

const props = defineProps({
  faction: {
    type: String as PropType<FactionKey>,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const store = useStore();

const unbuiltBuildings = store.factions[props.faction].buildings.filter((building) => !store.factions[props.faction].grid.includes(building.id));

const buyBuilding = (building: Building) => {
  store.selectedBuilding = building;
  emitter.emit('switch', { faction: props.faction });
};
</script>

<style scoped>
.buildingButton {
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 2em;
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
