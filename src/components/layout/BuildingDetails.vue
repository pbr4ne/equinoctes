<template>
  <span :class="['building', `building-${faction}`]">
    <span v-if="isOffTime()">
      Cannot interact during the {{ store.currentlyDay ? 'day' : 'night' }}
    </span>
    <span v-else-if="noSlots()">
      No free slots in the grid
    </span>
    <span v-else>
      <span v-html="processedDescription"></span>
      <br />
      {{ faction === 'sun' ? 'Aurum/s:' : 'Nocturne/s' }} {{ building?.power }} 
      <span 
        v-if="buildingPower !== building?.power" 
        :class="{'power-lower': buildingPower < (building?.power ?? 0), 'power-higher': buildingPower > (building?.power ?? 0)}"
      >
        ({{ buildingPower }})
      </span>
      <span v-if="parent === 'buildings'">
        <br />
        Cost: {{ building?.buildPrerequisite?.power }} {{ faction === 'sun' ? 'Aurum' : 'Nocturne' }}
      </span>
    </span>
  </span>   
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBuildings } from '../../composables/useBuildings';
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import { useStore } from '../../composables/useStore';
import type { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey, building: string, parent: string }>();
const store = useStore();

const building = store.factions[props.faction].buildings.find((b) => b.id === props.building);
const buildingMetadata = props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata;
const singleBuildingMetadata = buildingMetadata.find((b) => b.id === props.building);

const { computeBuildingPower } = useBuildings();

const buildingPower = building ? computeBuildingPower(props.faction, building) : 0;

const processedDescription = computed(() => {
  if (!singleBuildingMetadata?.description) return '';
  let desc = singleBuildingMetadata.description;
  desc = desc.replace(/RADIANT LADY/gi, '<span style="color: #264653; font-weight: bold;">RADIANT LADY</span>');
  desc = desc.replace(/\bLADY\b/gi, '<span style="color: #264653; font-weight: bold;">LADY</span>');
  return desc;
});

const isOffTime = () => {
  return store.currentlyDay ? props.faction !== 'sun' : props.faction !== 'moon';
}

const noSlots = () => {
  return props.parent === 'buildings' && !store.factions[props.faction].grid.some((slot) => slot === null);
}
</script>

<style scoped>
.building {
  font-family: "Texturina", serif;
  font-size: 1.25em;
}

.building-sun {
  color: #9e2a2b;
}

.building-moon {
  color: #caf0f8;
}

.power-lower {
  color: red;
}

.power-higher {
  color: green;
}
</style>
