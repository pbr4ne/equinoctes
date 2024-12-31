<template>
  <n-grid :cols="5" :x-gap="10" :y-gap="10" class="grid-container">
    <n-grid-item
      v-for="(icon, index) in paddedIcons"
      :key="index"
      class="grid-cell"
    >
      <n-button
        v-if="icon"
        :round="true"
        size="large"
        class="grid-button"
        @click="handleButtonClick(index)"
      >
        <component :is="icon" />
      </n-button>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  props: {
    icons: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
  },
  computed: {
    paddedIcons() {
      return [...this.icons, ...Array(25 - this.icons.length).fill(null)].slice(0, 25);
    },
  },
  methods: {
    handleButtonClick(index: number) {
      console.log(`Button ${index} clicked!`);
    },
  },
});
</script>

<style scoped>
.grid-container {
  margin: 40px;
}

.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
}
</style>
