<template>
  <n-space justify="center" style="z-index: 500">
    <n-space justify="center" style="margin: 20px;">
      <n-popover 
        v-for="(item, index) in components" 
        :key="item.id" 
        trigger="hover"
        placement="top"
        :theme-overrides="faction === 'sun' ? sunPopoverThemeOverride : moonPopoverThemeOverride"
      >
        <template #trigger>
          <n-badge 
            v-if="item.id === 'lore'"
            :value="loreCount"
            :show="loreCount > 0"
            :color="faction === 'sun' ? '#264653' : '#e9c46a'"
            dot
            processing
          >
            <button
              @click="selectTab(index)"
              :class="['icon-button', `icon-button-${faction}`]"
              :style="getSelectedStyle(index)"
            >
              <component :is="item.icon"/>
            </button>
          </n-badge>
          <n-badge
            v-else-if="item.id === 'buildings'"
            :value="unseenBuildings"
            :show="unseenBuildings > 0"
            :color="faction === 'sun' ? '#264653' : '#e9c46a'"
            dot
            processing
          >
            <button
              @click="selectTab(index)"
              :class="['icon-button', `icon-button-${faction}`]"
              :style="getSelectedStyle(index)"
            >
              <component :is="item.icon"/>
            </button>
          </n-badge>
          <n-badge
            v-else-if="item.id === 'milestones'"
            :value="unseenAchievements"
            :show="unseenAchievements > 0"
            :color="faction === 'sun' ? '#264653' : '#e9c46a'"
            dot
            processing
          >
            <button
              @click="selectTab(index)"
              :class="['icon-button', `icon-button-${faction}`]"
              :style="getSelectedStyle(index)"
            >
              <component :is="item.icon"/>
            </button>
          </n-badge>
          <button 
            v-else
            @click="selectTab(index)"
            :class="['icon-button', `icon-button-${faction}`]"
            :style="getSelectedStyle(index)"
          >
            <component :is="item.icon"/>
          </button>
        </template>
        <span>{{ currentLabel(item) }}</span>
      </n-popover>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';
import { emitter } from '../../utilities/emitter';

const store = useStore();

interface TabComponent {
  id: string;
  sunLabel: string;
  moonLabel: string;
  icon: any;
}

const props = defineProps<{
  faction: FactionKey;
  components: TabComponent[];
  currentComponentIndex: number;
}>();

const loreCount = computed(() => {
  return store.factions[props.faction].lore.filter(lore => !lore.read).length;
});

const unseenBuildings = computed(() => {
  return store.factions[props.faction].unseenBuildings ? 1 : 0;
});

const unseenAchievements = computed(() => {
  return store.factions[props.faction].unseenAchievements ? 1 : 0;
});

const getSelectedStyle = computed(() => (index: number) => {
  return {    
    backgroundColor: props.currentComponentIndex === index ? (props.faction === 'sun' ? '#9e2a2b' : '#caf0f8') : '',
    color: props.currentComponentIndex === index ? (props.faction === 'sun' ? '#e9c46a' : '#264653') : ''
  };
});

const emit = defineEmits<{
  (e: 'tab-selected', index: number): void;
}>();

const selectTab = (index: number) => {
  emit('tab-selected', index);
};

const currentLabel = (item: TabComponent) => {
  return props.faction === 'sun' ? item.sunLabel : item.moonLabel;
};

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

emitter.on('gameReset', () => {
  emit('tab-selected', 0);
});
</script>

<style scoped>
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
  background-color: #9e2a2b;
  color: #e9c46a
}

.icon-button-moon:hover {
  background-color: #caf0f8;
  color: #264653;
}

.n-badge__content {
  font-size: 0.75em;
}
</style>
