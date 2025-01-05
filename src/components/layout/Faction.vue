<template>
  <div class="layout-container">
    <sun-rays v-if="faction === 'sun'" />
    <moon-stars v-if="faction === 'moon'" />

    <n-flex justify="end" vertical style="height: 100vh;">
      <n-space justify="center" style="z-index: 500">
        <div :class="['bordered-background', `bordered-background-${faction}`]">
          <div class="power" :style="{ padding: computedPadding }">
            <component :is="currentHeader" :faction="faction" />
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
          <button
            v-for="(item, index) in components"
            :key="index"
            @click="currentComponentIndex = index"
            :class="['icon-button', `icon-button-${faction}`]"
          >
            <component :is="item.icon"/>
          </button>
        </n-space>
      </n-space>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, onMounted, onBeforeUnmount, PropType } from 'vue';
import { emitter } from '../../utilities/emitter';
import { FactionKey } from '../../utilities/types';
import Power from './Power.vue';
import MoonStars from './MoonStars.vue';
import SunRays from './SunRays.vue';
import Achievements from '../faction/Achievements.vue';
import Buildings from '../faction/Buildings.vue';
import Lore from '../faction/Lore.vue';
import Options from '../faction/Options.vue';
import FactionGrid from '../faction/FactionGrid.vue';
import { Grid28Regular, Options24Regular, BuildingLighthouse20Regular } from '@vicons/fluent';
import { CrownOutlined } from '@vicons/antd';
import { Notebook } from '@vicons/carbon';

const props = defineProps<{ faction: FactionKey }>()

const components = [
  { label: 'Grid', icon: markRaw(Grid28Regular), component: markRaw(FactionGrid), props },
  { label: 'Buildings', icon: markRaw(BuildingLighthouse20Regular), component: markRaw(Buildings), props },
  { label: 'Lore', icon: markRaw(Notebook), component: markRaw(Lore), props },
  { label: 'Achievements', icon: markRaw(CrownOutlined), component: markRaw(Achievements), props },
  { label: 'Options', icon: markRaw(Options24Regular), component: markRaw(Options), props },
];

const currentComponentIndex = ref(0);
const currentComponent = computed(() => components[currentComponentIndex.value]);
const currentHeader = markRaw(Power);

// const computedPadding = 170 - (props.faction == 'sun'? store.sunLevel : store.moonLevel) * 30 + 'px';
// console.log(props.faction, computedPadding);
const computedPadding = '20px';

function handleSwitchToGrid() {
  currentComponentIndex.value = 0;
}

onMounted(() => {
  emitter.on('switch', handleSwitchToGrid);
});

onBeforeUnmount(() => {
  emitter.off('switch', handleSwitchToGrid);
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

.power {
  width: calc(min(50vw, 50vh));
  box-sizing: border-box;
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
</style>
