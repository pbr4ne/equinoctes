<template>
  <n-grid :cols="store.factions[faction].level" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(icon, index) in buildingIcons"
      :key="index"
      :class="['grid-cell', `grid-cell-${faction}`]"
    >
      <n-button
        v-if="icon"
        quaternary
        :round="true"
        size="large"
        :color="faction === 'sun' ? '#9e2a2b' : '#caf0f8'"
        class="grid-button"
        @click="handleButtonClick(index)"
      >
        <component :is="getIconComponent(icon)" class="button-icon" />
      </n-button>
      <div v-else class="empty-cell"></div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { defineProps, computed, PropType } from 'vue';
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';
import { IconComponent, iconMap } from '../../utilities/types';

const props = defineProps({
  faction: {
    type: String as PropType<FactionKey>,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const store = useStore();

const getIconComponent = (iconName: string): IconComponent | null => {
    return iconMap[iconName] || null;
  };

const buildingIcons = computed(() => {
  const factionBuildings = store.factions[props.faction].grid;

  const allFactionBuildings = store.buildings[props.faction];

  const buildingIcons = factionBuildings.map((buildingId) => {
    if (!buildingId) return null;
    return allFactionBuildings.find((b) => b.id === buildingId)?.icon || null;
  });

  return buildingIcons;
});

function handleButtonClick(index: number) {
  console.log(`Button ${index} clicked!`);
}
</script>

<style scoped>
.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
}

.grid-cell-sun {
  background: #e9c46a;
  border: 1px solid #9e2a2b;
}

.grid-cell-moon {
  background: #264653;
  border: 1px solid #caf0f8;
}

.grid-button {
  width: 50%;
  height: 50%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-sizing: border-box;
}

.button-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-icon > svg {
  width: 100% !important;
  height: 100% !important;
}

.empty-cell {
  width: 100%;
  height: 100%;
}
</style>
