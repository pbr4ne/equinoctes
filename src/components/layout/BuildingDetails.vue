<template>
  <span :class="['building', `building-${faction}`]">
    <span v-if="store.currentlyDay && props.faction === 'sun' || !store.currentlyDay && props.faction === 'moon'">
      {{ building?.name }}
    {{ building?.description }}
    <br />
    Power: {{ building?.power }} ({{ buildingPower }})
    </span>
    <span v-else>
      Cannot interact during the {{ store.currentlyDay ? 'day' : 'night' }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useBuildings } from '../../composables/useBuildings';
import { useStore } from '../../composables/useStore';
import type { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey, building: string }>();
const store = useStore();

const building = store.factions[props.faction].buildings.find((b) => b.id === props.building);

const { computeBuildingPower } = useBuildings();

const buildingPower = building ? computeBuildingPower(props.faction, building) : 0;
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
