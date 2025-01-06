<template>
  <div class="lore-container">
    <n-scrollbar class="lore-scrollbar">
      <span
        v-if="currentLore"
        :class="['lore', `lore-${faction}`]"
      >
        {{ currentLore.description }}
      </span>
    </n-scrollbar>

    <n-pagination
      class="lore-pagination"
      :page="currentPage"
      :page-count="pageCount"
      @update:page="handlePageChange"
      :page-size="1"
      :show-size-picker="false"
			:page-slot="3"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

const props = defineProps<{faction: FactionKey}>();
const faction = props.faction;
const store = useStore();

const currentPage = ref(1);
const totalLore = computed(() => store.factions[faction].lore.length);
const pageCount = computed(() => totalLore.value);

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
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
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
