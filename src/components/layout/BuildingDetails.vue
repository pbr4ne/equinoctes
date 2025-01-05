<template>
    {{ building?.description }}
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from '../../composables/useStore';
import type { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey, building: string }>();
const store = useStore();

const building = store.factions[props.faction].buildings.find((b) => b.id === props.building);
</script>