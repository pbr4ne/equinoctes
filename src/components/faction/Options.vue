<template>
    <n-button @click="reset">reset</n-button>
</template>

<script setup lang="ts">
import { useStore } from '../../composables/useStore';

function reset() {
  useStore().reset();
}
</script>
