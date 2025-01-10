<template>
  <div 
    :class="[
    'bordered-background', 
    `bordered-background-${faction}`
    ]"
    :style="!building && parent !== 'buildings' ? { border: 'none' } : {}"
  >
    <div class="header" style="padding: 20px;">
      <power 
        v-if="!building && parent !== 'buildings'"
        :faction="faction"  
      />
      <div v-else-if="!building && parent === 'buildings'" :class="['building', `building-${faction}`]">
        <span v-if="faction === 'sun'">Choose a Wonder</span>
        <span v-else>Choose an Endeavour</span>
      </div>
      <building-details
        v-else
        :faction="faction" 
        :building="building" 
        :parent="parent" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FactionKey } from '../../utilities/types';
import Power from './Power.vue';
import BuildingDetails from './BuildingDetails.vue';
const props = defineProps<{ faction: FactionKey, building: string | null, parent: string  }>();
</script>

<style scoped>
.header {
  width: min(550px, 50svh);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bordered-background {
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bordered-background-sun {
  border-color: #9e2a2b;
}

.bordered-background-moon {
  border-color: #caf0f8;
}

.building {
  font-size: 1.25em;
}

.building-sun {
  color: #9e2a2b;
}

.building-moon {
  color: #caf0f8;
}
</style>