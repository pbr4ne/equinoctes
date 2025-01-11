<template>
  <div 
    :class="[
    'bordered-background', 
    `bordered-background-${faction}`
    ]"
    :style="!building && parent === 'city' ? { border: 'none' } : {}"
  >
    <div class="header" style="padding: 20px;">
      <power 
        v-if="!building && parent === 'city'"
        :faction="faction"  
      />
      <div v-else-if="!building && parent === 'buildings'" :class="['building', `building-${faction}`]">
        <span v-if="faction === 'sun'">Choose a Wonder to build</span>
        <span v-else>Choose an Endeavour to build</span>
      </div>
      <div v-else-if="parent === 'lore'" :class="['building', `building-${faction}`]" >
        <span v-if="faction === 'sun'">Revelations from our <span style="color: #264653">RADIANT LADY</span></span>
        <span v-else>Mysterium of the <span style="color: #e9c46a">SILVER LORD</span></span>
      </div>
      <div v-else-if="parent === 'milestones'" :class="['building', `building-${faction}`]" >
        <span v-if="faction === 'sun'">Heliotropolis Milestones</span>
        <span v-else>Cynthas City Milestones</span>
      </div>
      <div v-else-if="parent === 'options'" :class="['building', `building-${faction}`]" >
        <span v-if="faction === 'sun'">Settings, may it please her <span style="color: #264653">LADY</span></span>
        <span v-else><span style="color: #e9c46a">SILVER LORD</span>'s Choices</span>
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

@media (max-height: 850px) {
  .header {
    width: 100%;
  }
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
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 2em;
}

.building-sun {
  color: #9e2a2b;
}

.building-moon {
  color: #caf0f8;
}
</style>