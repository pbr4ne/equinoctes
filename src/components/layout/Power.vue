<template>
  <n-popover 
    trigger="hover" 
    placement="top"
    :theme-overrides="faction === 'sun' ? sunPopoverThemeOverride : moonPopoverThemeOverride"
  >
    <template #trigger>
      <div>
        <n-text v-if="faction === 'sun'" class="power solar">Aurum: </n-text>
        <n-text v-else class="power lunar">Nocturne: </n-text>
        <n-text :class="['power', faction === 'sun' ? 'solar' : 'lunar']">
          {{  Intl.NumberFormat().format(Math.round(store.factions[props.faction].power)) }}
        </n-text>
      </div>
    </template>
    <span v-if="faction === 'sun'">The power of the sun.</span>
    <span v-else>The power of the moon.</span>
  </n-popover>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>()
const store = useStore();

const sunPopoverThemeOverride = {
  "color": "#9e2a2b",
  "textColor": "#e9c46a",
  "titleTextColor": "#e9c46a",
  "borderColor": "#e9c46a"
}

const moonPopoverThemeOverride = {
  "color": "#caf0f8",
  "textColor": "#264653",
  "titleTextColor": "#264653",
  "borderColor": "#264653"
}
</script>

<style scoped>
.power {
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 2.5em;
  padding-left: 5px;
}

.solar {
  color: #9e2a2b;
}

.lunar {
  color: #caf0f8;
}
</style>
