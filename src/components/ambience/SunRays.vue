<template>
  <div class="sun-rays-overlay" ref="sunRayContainer">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <g>
        <SunRayLine
          v-for="(line, index) in lines"
          :key="line.id"
          :x="line.x"
          :angle="line.angle"
          :color="line.color"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from '../../composables/useStore';
import SunRayLine from './SunRayLine.vue';

const store = useStore();
const sunRayContainer = ref<HTMLElement | null>(null);
const angleSpread = 90;
let nextId = 0;

const lineCount = computed(() => {
  switch (store.factions.sun.level) {
    case 3:
      return 6;
    case 4:
      return 10;
    case 5:
      return 30;
    default:
      return 0;
  }
});

const lines = ref<
  {
    id: number;
    x: number;
    angle: number;
    color: string;
  }[]
>([]);

const createLine = (i: number, currentLineCount: number) => {
  const x = (i * 100) / (currentLineCount - 1);

  const centerIndex = (currentLineCount - 1) / 2;
  const angleOffset = centerIndex - i;
  
  const angle = (angleOffset * angleSpread) / (currentLineCount - 1);

  const randomHue = 55 + (Math.random() - 0.5) * 20;
  const color = `hsl(${randomHue}, 100%, 50%)`;

  return {
    id: nextId++,
    x,
    angle,
    color,
  };
};

const initializeLines = () => {
  const count = lineCount.value;
  lines.value = Array.from({ length: count }, (_, i) => createLine(i, count));
};

initializeLines();

//watch for changes in the line count and adjust the lines array accordingly
watch(
  lineCount,
  (newCount, oldCount) => {
    if (newCount > oldCount) {
      //add new lines
      for (let i = oldCount; i < newCount; i++) {
        lines.value.push(createLine(i, newCount));
      }
    } else if (newCount < oldCount) {
      //remove excess lines
      lines.value.splice(newCount, oldCount - newCount);
    }
  },
  { immediate: false }
);
</script>

<style scoped>
.sun-rays-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
