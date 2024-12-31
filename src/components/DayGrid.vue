<template>
    <IconGrid :icons="dayIcons" />
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import IconGrid from './IconGrid.vue';
import { SunnyOutline, CloudOutline } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    IconGrid,
  },
  data() {
    return {
      dayIcons: [
        markRaw(SunnyOutline),
        markRaw(CloudOutline),
      ],
    };
  },
});
</script>