<template>
    <n-button 
      :class="['buildingButton', `buildingButton-${faction}`]" 
      :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
      @click="reset">reset
    </n-button>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

defineProps<{ faction: FactionKey }>()

function reset() {
  useStore().reset();
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
