<template>
  <span :class="['building', `building-${faction}`]">{{ building?.description }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from '../../composables/useStore';
import type { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey, building: string }>();
const store = useStore();

const building = store.factions[props.faction].buildings.find((b) => b.id === props.building);
</script>

<style scoped>
.building {
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 1.25em;
}

.building-sun {
  color: #9e2a2b;
}

.building-moon {
  color: #caf0f8;
}
</style>
