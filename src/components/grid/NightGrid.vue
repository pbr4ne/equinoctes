<template>
    <icon-grid :icons="nightIcons" side="moon"/>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import IconGrid from './IconGrid.vue';
import { MoonOutline, StarOutline } from '@vicons/ionicons5';

const nightIcons = [
  markRaw(MoonOutline),
  markRaw(StarOutline),
];
</script>
