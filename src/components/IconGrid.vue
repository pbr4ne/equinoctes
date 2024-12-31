<template>
  <n-grid :cols="5" :x-gap="10" :y-gap="10">
    <n-grid-item
      v-for="(icon, index) in paddedIcons"
      :key="index"
      :class="['grid-cell', `grid-cell-${side}`]"
    >
      <n-button
        v-if="icon"
        quaternary
        :round="true"
        size="large"
        :color="side === 'left' ? '#9e2a2b' : '#caf0f8'"
        class="grid-button"
        @click="handleButtonClick(index)"
      >
        <template #icon>
          <component :is="icon"/>
        </template>
      </n-button>
      <div v-else class="empty-cell"></div>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    icons: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    side: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
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
.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.grid-cell-left {
  background: #e9c46a;
  border: 1px solid #9e2a2b;
}

.grid-cell-right {
  background: #264653;
  border: 1px solid #caf0f8;
}
</style>
