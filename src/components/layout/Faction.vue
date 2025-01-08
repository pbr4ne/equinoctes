<template>
  <div class="layout-container">
    <sun-rays v-if="faction === 'sun'" />
    <moon-stars v-if="faction === 'moon'" />

    <n-flex justify="end" vertical style="height: 100vh;">
      <n-space justify="center" style="z-index: 500">
        <div 
          :class="[
            'bordered-background', 
            `bordered-background-${faction}`
          ]"
          :style="currentHeader === Power ? { border: 'none' } : {}"
        >
          <div class="header" :style="{ padding: computedPadding }">
            <component 
              :is="currentHeader" 
              v-bind="headerProps"
            />
          </div>
        </div>
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

      <n-space justify="center" style="z-index: 500">
        <n-space justify="center" style="margin: 20px;">
          <n-popover 
            v-for="(item, index) in components" 
            :key="index" 
            trigger="hover"
            placement="top"
          >
            <template #trigger>
              <n-badge 
                v-if="item.sunLabel === 'Revelations'"
                :value="loreCount"
                :show="loreCount > 0"
                color="red"
                dot
                processing
              >
                <button
                  @click="currentComponentIndex = index"
                  :class="['icon-button', `icon-button-${faction}`]"
                >
                  <component :is="item.icon"/>
                </button>
              </n-badge>
              <button 
                v-else
                @click="currentComponentIndex = index"
                :class="['icon-button', `icon-button-${faction}`]"
              >
                <component :is="item.icon"/>
              </button>
            </template>
            <span>{{ faction == 'sun' ? item.sunLabel : item.moonLabel }}</span>
          </n-popover>
        </n-space>
      </n-space>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, onMounted, onBeforeUnmount, shallowRef } from 'vue';
import { emitter } from '../../utilities/emitter';
import { FactionKey } from '../../utilities/types';
import { useStore } from '../../composables/useStore';
import BuildingDetails from './BuildingDetails.vue';
import Power from './Power.vue';
import MoonStars from '../ambience/MoonStars.vue';
import SunRays from '../ambience/SunRays.vue';
import Achievements from '../faction/Achievements.vue';
import Buildings from '../faction/Buildings.vue';
import Lore from '../faction/Lore.vue';
import Options from '../faction/Options.vue';
import FactionGrid from '../faction/FactionGrid.vue';
import { Grid28Regular, Options24Regular, BuildingLighthouse20Regular } from '@vicons/fluent';
import { CrownOutlined } from '@vicons/antd';
import { Notebook } from '@vicons/carbon';

const props = defineProps<{ faction: FactionKey }>();
const store = useStore();

const loreCount = computed(() => {
  return store.factions[props.faction].lore.filter(lore => !lore.read).length;
});

const components = [
  { id: 'city', sunLabel: 'Heliotropolis', moonLabel: 'Cynthas City', icon: markRaw(Grid28Regular), component: markRaw(FactionGrid), props },
  { id: 'buildings', sunLabel: 'Wonders', moonLabel: 'Endeavours', icon: markRaw(BuildingLighthouse20Regular), component: markRaw(Buildings), props },
  { id: 'lore', sunLabel: 'Revelations', moonLabel: 'Mysterium', icon: markRaw(Notebook), component: markRaw(Lore), props },
  { id: 'milestones', sunLabel: 'Milestones', moonLabel: 'Milestones', icon: markRaw(CrownOutlined), component: markRaw(Achievements), props },
  { id: 'options', sunLabel: 'Options', moonLabel: 'Options', icon: markRaw(Options24Regular), component: markRaw(Options), props },
];

const currentComponentIndex = ref(0);
const currentComponent = computed(() => components[currentComponentIndex.value]);
const currentHeader = shallowRef(Power);
const currentBuilding = ref<string | null>(null);

const headerProps = computed(() => {
  if (currentHeader.value === Power) {
    return { faction: props.faction };
  } else if (currentHeader.value === BuildingDetails) {
    return { faction: props.faction, building: currentBuilding.value, parent: currentComponent.value.id };
  } else {
    return { faction: props.faction };
  }
});

// const computedPadding = 170 - (props.faction == 'sun'? store.sunLevel : store.moonLevel) * 30 + 'px';
// console.log(props.faction, computedPadding);
const computedPadding = '20px';

function handleSwitchToGrid() {
  currentComponentIndex.value = 0;
}
function handleSwitchToBuilding({ faction, buildingId }: { faction: FactionKey; buildingId: string }) {
  if (faction !== props.faction) return;
  currentBuilding.value = buildingId;
  currentHeader.value = markRaw(BuildingDetails);
}
function handleSwitchToPower({ faction }: { faction: FactionKey; }) {
  if (faction !== props.faction) return;
  currentBuilding.value = null;
  currentHeader.value = markRaw(Power);
}

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
.layout-container {
  position: relative;
  width: 100%;
  height: 100%;
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

.header {
  width: calc(min(50vw, 50vh));
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: calc(min(50vw, 50vh));
  height: calc(min(50vw, 50vh));
  box-sizing: border-box;
}

.icon-button {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.icon-button-sun {
  background-color: #e9c46a;
  border-color: #9e2a2b;
  color: #9e2a2b;
}

.icon-button-moon {
  background-color: #264653;
  border-color: #caf0f8;
  color: #caf0f8;
}

.icon-button-sun:hover {
  background-color: #ffb703;
}

.icon-button-moon:hover {
  background-color: #219ebc;
}

.n-badge__content {
  font-size: 0.75em;
}
</style>

