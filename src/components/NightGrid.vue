<template>
    <IconGrid :icons="nightIcons" />
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import IconGrid from './IconGrid.vue';
import { MoonOutline, StarOutline } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    IconGrid,
  },
  data() {
    return {
      nightIcons: [
        markRaw(MoonOutline),
        markRaw(StarOutline),
      ],
    };
  },
});
</script>