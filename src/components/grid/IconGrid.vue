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
        :color="side === 'sun' ? '#9e2a2b' : '#caf0f8'"
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

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  icons: {
    type: Array as () => Array<any>,
    required: true,
  },
  side: {
    type: String,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const paddedIcons = computed(() => {
  return [...props.icons, ...Array(25 - props.icons.length).fill(null)].slice(0, 25);
});

function handleButtonClick(index: number) {
  console.log(`Button ${index} clicked!`);
}
</script>

<style scoped>
.grid-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.grid-cell-sun {
  background: #e9c46a;
  border: 1px solid #9e2a2b;
}

.grid-cell-moon {
  background: #264653;
  border: 1px solid #caf0f8;
}
</style>
