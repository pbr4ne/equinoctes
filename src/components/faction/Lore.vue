<template>
  <div class="lore-container">
    <n-scrollbar class="lore-scrollbar" trigger="none">
      <span
        v-if="currentLore"
        :class="['lore', `lore-${faction}`]"
      >
        <span v-html="processedDescription(currentLore.description)"></span>
      </span>
    </n-scrollbar>

    <n-pagination
      v-if="pageCount > 1"
      class="lore-pagination"
      :page="currentPage"
      :page-count="pageCount"
      @update:page="handlePageChange"
      :page-size="1"
      :show-size-picker="false"
			:page-slot="3"
      :theme-overrides="faction === 'sun' ? sunPaginationThemeOverride : moonPaginationThemeOverride"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>();
const faction = props.faction;
const store = useStore();

const totalLore = computed(() => store.factions[faction].lore.length);
const pageCount = computed(() => totalLore.value);

const firstUnreadIndex = store.factions[faction].lore.findIndex(lore => !lore.read);

const initialPage = firstUnreadIndex !== -1 
  ? firstUnreadIndex + 1 
  : (pageCount.value > 0 ? pageCount.value : 1);

const currentPage = ref(initialPage);

const processedDescription = (desc: string) => {
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
};

const currentLore = computed(() => {
  const index = currentPage.value - 1;
  markLoreAsRead(index);
  return store.factions[faction].lore[index] || null;
});

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= pageCount.value) {
    currentPage.value = page;
  }
};

const markLoreAsRead = (index: number) => {
  const loreItem = store.factions[faction].lore[index];
  if (loreItem && !loreItem.read) {
    loreItem.read = true;
  }
};

const sunPaginationThemeOverride = {
  "itemTextColorHover": "#9e2a2b",
  "itemTextColorPressed": "#9e2a2b",
  "itemTextColorActive": "#9e2a2b",

  "itemBorderActive": "1px solid #9e2a2b",

  "itemColorDisabled": "#0000",
  "itemBorderDisabled": "#0000",
  "itemTextColorDisabled": "#0000",

  "buttonIconColor": "#9e2a2b",
  "buttonIconColorHover": "#e9c46a",
  "buttonColorPressed": "#9e2a2b",
  "buttonBorder": "1px solid #9e2a2b",
  "itemTextColor": "#9e2a2b",
}

const moonPaginationThemeOverride = {
  "itemTextColorHover": "#caf0f8",
  "itemTextColorPressed": "#caf0f8",
  "itemTextColorActive": "#caf0f8",

  "itemBorderActive": "1px solid #caf0f8",

  "itemColorDisabled": "#0000",
  "itemBorderDisabled": "#0000",
  "itemTextColorDisabled": "#0000",

  "buttonIconColor": "#caf0f8",
  "buttonIconColorHover": "#264653",
  "buttonColorPressed": "#caf0f8",
  "buttonBorder": "1px solid #caf0f8",
  "itemTextColor": "#caf0f8",
}
</script>

<style scoped>
.lore-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lore-scrollbar {
  flex: 1;
  max-height: 400px;
  margin-bottom: 16px;
}

.lore-pagination {
  align-self: center;
}

.lore {
  display: block;
  font-size: 1.25em;
  white-space: pre-wrap;
}

.lore-sun {
  color: #9e2a2b;
}

.lore-moon {
  color: #caf0f8;
}
</style>
