<template>
    <n-text v-if="faction === 'sun'" class="power solar">Aurum: </n-text>
    <n-text v-else class="power lunar">Nocturne: </n-text>
    <n-text :class="['power', faction === 'sun' ? 'solar' : 'lunar']">
      {{ Math.round(store.factions[props.faction].power) }}
    </n-text>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>()
const store = useStore();
</script>

<style scoped>
.power {
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 2em;
}

.solar {
  color: #9e2a2b;
}

.lunar {
  color: #caf0f8;
}
</style>
