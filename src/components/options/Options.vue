<template>
    <n-button @click="reset">reset</n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../composables/useStore';

export default defineComponent({
  methods: {
    reset() {
      useStore().reset();
    },
  },
});
</script>