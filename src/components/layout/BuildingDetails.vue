<template>
  <span :class="['details', `details-${faction}`]">
    <span v-if="isOffTime">
      Cannot interact during the {{ store.currentlyDay ? 'day' : 'night' }}
    </span>
    <span v-else-if="noSlots">
      No free slots in the grid
    </span>
    <span v-else-if="store.factions[faction].selectedBuilding">
      Place a{{ faction === 'sun' ? ' wonder': 'n endeavour' }}. Navigate to another tab to cancel.
    </span>
    <span v-else>
      <span><b>{{ singleBuildingMetadata?.name }}</b></span><br />
      <span v-html="processedDescription"></span>
      <br />
      <b>{{ faction === 'sun' ? 'Aurum:' : 'Nocturne' }}</b> {{ building?.power }} per second 
      <span 
        v-if="buildingPower !== building?.power || store.factions[faction].boost?.building === building?.id" 
        :class="{
          'power-lower': buildingPower * (store.factions[faction].boost?.building === building?.id ? 2 : 1) < (building?.power ?? 0), 
          'power-higher': buildingPower * (store.factions[faction].boost?.building === building?.id ? 2 : 1) > (building?.power ?? 0)}"
      >
        ({{ buildingPower * (store.factions[faction].boost?.building === building?.id ? 2 : 1) }})
      </span>
      <span v-if="store.factions[faction].boost?.building === building?.id">
        <i>boosting</i>
      </span>
      <span v-if="parent === 'buildings'">
        <br />
        <b>Cost:</b> {{ Intl.NumberFormat().format(building?.buildPrerequisite?.power) }} {{ faction === 'sun' ? 'Aurum' : 'Nocturne' }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useBuildings } from '../../composables/useBuildings';
import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata';
import { useStore } from '../../composables/useStore';
import type { FactionKey } from '../../utilities/types';

const props = defineProps<{ 
  faction: FactionKey, 
  building: string | null, 
  parent: string 
}>();

const store = useStore();
const { computeBuildingPower } = useBuildings();

const building = computed(() => {
  if (!props.building) return null;
  return store.factions[props.faction].buildings.find((b) => b.id === props.building) || null;
});

const buildingMetadata = computed(() => {
  return props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata;
});

const singleBuildingMetadata = computed(() => {
  if (!props.building) return null;
  return buildingMetadata.value.find((b) => b.id === props.building) || null;
});

const buildingPower = computed(() => {
  return building.value ? computeBuildingPower(props.faction, building.value) : 0;
});

const processedDescription = computed(() => {
  if (!singleBuildingMetadata.value?.description) return '';
  let desc = singleBuildingMetadata.value.description;
  if (props.faction === 'sun') {
    desc = desc.replace(/RADIANT LADY/gi, '<span style="color: #264653; font-weight: bold;">RADIANT LADY</span>');
    desc = desc.replace(/\bLADY\b/gi, '<span style="color: #264653; font-weight: bold;">LADY</span>');
    desc = desc.replace(/SILVER LORD/gi, '<span style="color: #FC8200; font-weight: bold;">SILVER LORD</span>');
    desc = desc.replace(/\bLORD\b/gi, '<span style="color: #FC8200; font-weight: bold;">LORD</span>');
  } else {
    desc = desc.replace(/RADIANT LADY/gi, '<span style="color: #0286ff; font-weight: bold;">RADIANT LADY</span>');
    desc = desc.replace(/\bLADY\b/gi, '<span style="color: #0286ff; font-weight: bold;">LADY</span>');
    desc = desc.replace(/SILVER LORD/gi, '<span style="color: #9e2a2b; font-weight: bold;">SILVER LORD</span>');
    desc = desc.replace(/\bLORD\b/gi, '<span style="color: #9e2a2b; font-weight: bold;">LORD</span>');
  }

  return desc;
});

const isOffTime = computed(() => {
  if (store.milestones[props.faction].offTimeBuilding) {
    return false;
  }
  return store.currentlyDay ? props.faction !== 'sun' : props.faction !== 'moon';
});

const noSlots = computed(() => {
  return props.parent === 'buildings' && !store.factions[props.faction].grid.some((slot) => slot === null);
});
</script>

<style scoped>
.details {
  font-size: 1.25em;
}

.details-sun {
  color: #9e2a2b;
}

.details-moon {
  color: #caf0f8;
}

.power-lower {
  color: red;
}

.power-higher {
  color: green;
}
</style>
