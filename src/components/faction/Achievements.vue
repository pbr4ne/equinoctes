<template>
  <n-scrollbar trigger="none">
    <n-space >
      <n-card 
        v-for="achievement in achievements" 
        size="small" 
        :key="achievement.id" 
        :title="achievement.name"
        :theme-overrides="faction === 'sun' ? sunCardThemeOverride : moonCardThemeOverride"
      >
        <span v-if="achievement.met" v-html="processedDescription(achievement.description)"></span>
        <span v-else>???</span>
      </n-card>
    </n-space>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { useAchievements } from '../../composables/useAchievements';
import type { FactionKey } from '../../utilities/types';
import { useStore } from '../../composables/useStore';

const { sunAchievements, moonAchievements } = useAchievements();
const store = useStore();

const props = defineProps<{ faction: FactionKey }>();

const achievements = props.faction === 'sun' ? sunAchievements : moonAchievements;

store.factions[props.faction].unseenAchievements = false;

const processedDescription = (desc: string) => {
  if (props.faction === 'sun') {
    desc = desc.replace(/RADIANT LADY/gi, '<span style="color: #264653; font-weight: bold;">RADIANT LADY</span>');
    desc = desc.replace(/\bLADY\b/gi, '<span style="color: #264653; font-weight: bold;">LADY</span>');
    desc = desc.replace(/SILVER LORD/gi, '<span style="color: #FC8200; font-weight: bold;">SILVER LORD</span>');
    desc = desc.replace(/\bLORD\b/gi, '<span style="color: #FC8200; font-weight: bold;">LORD</span>');
  } else {
    desc = desc.replace(/RADIANT LADY/gi, '<span style="color: #0286ff; font-weight: bold;">RADIANT LADY</span>');
    desc = desc.replace(/\bLADY\b/gi, '<span style="color: #0286ff; font-weight: bold;">LADY</span>');
    desc = desc.replace(/SILVER LORD/gi, '<span style="color: #e9c46a; font-weight: bold;">SILVER LORD</span>');
    desc = desc.replace(/\bLORD\b/gi, '<span style="color: #e9c46a; font-weight: bold;">LORD</span>');
  }

  return desc;
};

const sunCardThemeOverride = {
  "color": "#e9c46a",
  "textColor": "#9e2a2b",
  "titleTextColor": "#9e2a2b",
  "borderColor": "#9e2a2b"
}

const moonCardThemeOverride = {
  "color": "#264653",
  "textColor": "#caf0f8",
  "titleTextColor": "#caf0f8",
  "borderColor": "#caf0f8"
}
</script>

<style scoped>

</style>
