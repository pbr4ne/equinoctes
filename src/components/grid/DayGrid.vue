<template>
    <icon-grid :icons="dayIcons" side="sun"/>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import IconGrid from './IconGrid.vue';
import { SunnyOutline, CloudOutline } from '@vicons/ionicons5';

const dayIcons = [
  markRaw(SunnyOutline),
  markRaw(CloudOutline),
];
</script>