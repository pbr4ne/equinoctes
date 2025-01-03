<template>
  <n-scrollbar>
      <n-space vertical>
        <n-button 
          v-for="building in store.buildings.sun" 
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
import { defineProps, PropType } from 'vue';
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

const buyBuilding = (building: Building) => {
  console.log(`Buying ${building.name}!`);
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
  color: #caf0f8;;
}
</style>
