<template>
  <div class="layout-container">
    <sun-rays v-if="faction === 'sun'" />
    <moon-stars v-if="faction === 'moon'" />

    <n-flex justify="end" vertical style="height: 100svh;">
      <n-space justify="center" style="z-index: 500">
        <faction-header :faction="faction" :building="currentBuilding" :parent="components[currentComponentIndex].id" />
      </n-space>

      <n-space justify="center" style="z-index: 500">
        <div :class="['bordered-background', `bordered-background-${faction}`]">
          <div class="content" :style="{ padding: computedPadding }">
            <component 
              :is="currentComponent.component" 
              v-bind="currentComponent.props"
            />
          </div>
        </div>
      </n-space>

      <Tabs 
        :faction="faction" 
        :components="components"
        :currentComponentIndex="currentComponentIndex"
        @tab-selected="handleTabSelected"
      />
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, onMounted, onBeforeUnmount, shallowRef } from 'vue';
import { emitter } from '../../utilities/emitter';
import { FactionKey } from '../../utilities/types';
import { useStore } from '../../composables/useStore';
import FactionHeader from './FactionHeader.vue';
import MoonStars from '../ambience/MoonStars.vue';
import SunRays from '../ambience/SunRays.vue';
import Achievements from '../faction/Achievements.vue';
import Buildings from '../faction/Buildings.vue';
import Lore from '../faction/Lore.vue';
import Options from '../faction/Options.vue';
import FactionGrid from '../faction/FactionGrid.vue';
import Tabs from './Tabs.vue';
import { Grid28Regular, Options24Regular, BuildingLighthouse20Regular } from '@vicons/fluent';
import { CrownOutlined } from '@vicons/antd';
import { Notebook } from '@vicons/carbon';

const props = defineProps<{ faction: FactionKey }>();

const store = useStore();

const components = [
  { id: 'city', sunLabel: 'Heliotropolis', moonLabel: 'Cynthas City', icon: markRaw(Grid28Regular) },
  { id: 'buildings', sunLabel: 'Wonders', moonLabel: 'Endeavours', icon: markRaw(BuildingLighthouse20Regular) },
  { id: 'lore', sunLabel: 'Revelations', moonLabel: 'Mysterium', icon: markRaw(Notebook) },
  { id: 'milestones', sunLabel: 'Milestones', moonLabel: 'Milestones', icon: markRaw(CrownOutlined) },
  { id: 'options', sunLabel: 'Options', moonLabel: 'Options', icon: markRaw(Options24Regular) },
];

const currentComponentIndex = ref(0);

const componentMap: { [key: string]: any } = {
  city: markRaw(FactionGrid),
  buildings: markRaw(Buildings),
  lore: markRaw(Lore),
  milestones: markRaw(Achievements),
  options: markRaw(Options),
};

const currentComponent = computed(() => {
  const selectedTab = components[currentComponentIndex.value];
  const componentToRender = componentMap[selectedTab.id];
  if (!componentToRender) {
    console.warn(`No component found for tab id: ${selectedTab.id}`);
    return { component: null, props: {} };
  }
  return {
    component: componentToRender,
    props: { faction: props.faction },
  };
});

const currentBuilding = ref<string | null>(null);
const computedPadding = '20px';

function handleSwitchToGrid() {
  currentComponentIndex.value = 0;
}

function handleSwitchToBuilding({ faction, buildingId }: { faction: FactionKey; buildingId: string }) {
  if (faction !== props.faction) return;
  currentBuilding.value = buildingId;
}

function handleSwitchToPower({ faction }: { faction: FactionKey }) {
  if (faction !== props.faction) return;
  
  if (store.factions[faction].selectedBuilding) {
    return; 
  }

  currentBuilding.value = null;
}

const handleTabSelected = (index: number) => {
  if (index < 0 || index >= components.length) {
    console.warn(`Tab index ${index} is out of bounds.`);
    return;
  }
  if (index > 0) {
    store.factions[props.faction].selectedBuilding = null;
  }
  currentComponentIndex.value = index;
};

onMounted(() => {
  emitter.on('switchedToGrid', handleSwitchToGrid);
  emitter.on('buildingEntered', ({ faction, buildingId }) => handleSwitchToBuilding({ faction, buildingId }));
  emitter.on('buildingLeft', ({ faction }) => handleSwitchToPower({ faction }));
});

onBeforeUnmount(() => {
  emitter.off('switchedToGrid', handleSwitchToGrid);
  emitter.off('buildingEntered', handleSwitchToBuilding);
  emitter.off('buildingLeft', handleSwitchToPower);
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.layout-container {
  position: relative;
  box-sizing: border-box;
  padding: 0 30px;
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

.content {
  width: min(550px, 50svh);
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
}
</style>
