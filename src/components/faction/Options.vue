<template>
  <n-space vertical>
    <n-space>      
      <n-button 
        :class="['buildingButton', `buildingButton-${faction}`]" 
        :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
        @click="resetRun">Reset Run
      </n-button>
    </n-space>    
    <n-card 
      title="Credits"
      :theme-overrides="faction === 'sun' ? sunCardThemeOverride : moonCardThemeOverride"
      style="font-family: Texturina, serif; border-radius: 20px;"
    >
      <p v-if="faction === 'sun'">Radiant Lady: <a href="https://github.com/pbr4ne" :class="[`link-${faction}`]" target="_blank">pbrane</a></p>
      <p v-if="faction === 'moon'">Moon Lord: pbrane</p>
      <p>Writing: <a href="https://jamesfunfer.com" :class="[`link-${faction}`]" target="_blank">James Funfer</a></p>
      <p>Music: <a href="https://www.youtube.com/user/Kitchen1066" :class="[`link-${faction}`]" target="_blank">terranaut1066</a></p>
      <p>Did Some Math: Travis</p>
      <p>Special Thanks: Cheese, Julz, Kakumeii, Sof</p>
    </n-card>
    <n-button 
        :class="['buildingButton', `buildingButton-${faction}`]" 
        :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
        @click="resetAll">Hard Reset (resets achievements)
      </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

defineProps<{ faction: FactionKey }>()

function resetAll() {
  useStore().resetAll();
}

function resetRun() {
  useStore().resetRun();
}

const sunCardThemeOverride = {
  "color": "#e9c46a",
  "textColor": "#9e2a2b",
  "titleTextColor": "#9e2a2b",
  "borderColor": "#9e2a2b",  
}

const moonCardThemeOverride = {
  "color": "#264653",
  "textColor": "#caf0f8",
  "titleTextColor": "#caf0f8",
  "borderColor": "#caf0f8",
}
</script>

<style scoped>
.buildingButton {
  font-family: "Texturina", serif;
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

.link-sun {
  color: #9e2a2b;
}

.link-moon {
  color: #caf0f8;
}
</style>
