<template>
	<n-scrollbar>
		<span v-for="lore in store.factions[faction].lore" :class="['lore', `lore-${faction}`]" >
			{{ lore.description }}
		</span>
	</n-scrollbar>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';
defineProps<{ faction: FactionKey }>();
const store = useStore();
</script>

<style scoped>
.lore {
	font-family: "Grenze Gotisch", serif;
	font-weight: 300;
	font-size: 1.25em;
	border-radius: 20px;
}

.lore-sun {
  color: #9e2a2b;
}

.lore-moon {
  color: #caf0f8;
}
</style>
