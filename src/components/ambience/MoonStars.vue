<template>
  <div class="moon-stars-overlay" ref="moonStarsContainer">
    <MoonStar
      v-for="star in stars"
      :key="star.id"
      :x="star.x"
      :y="star.y"
      :size="star.size"
      :color="star.color"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from '../../composables/useStore';
import MoonStar from './MoonStar.vue';

const store = useStore();
const moonStarsContainer = ref<HTMLDivElement | null>(null);
const starCount = computed(() => {
  switch (store.factions.moon.level) {
    case 3:
      return 0;
    case 4:
      return 10;
    case 5:
      return 20;
    case 6:
      return 100;
    default:
      return 0;
  }
});

let nextId = 0;

const stars = ref<
  {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
  }[]
>([]);

const createStar = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 2 + Math.random() * 3;

  //random color
  const hue = 190 + Math.random() * 20;
  const light = 70 + Math.random() * 20;
  const color = `hsl(${hue}, 100%, ${light}%)`;

  return {
    id: nextId++,
    x,
    y,
    size,
    color,
  };
};

const initializeStars = () => {
  const count = starCount.value;
  stars.value = Array.from({ length: count }, () => createStar());
};

initializeStars();

watch(
  starCount,
  (newCount, oldCount) => {
    if (newCount > oldCount) {
      //add new stars
      const starsToAdd = newCount - oldCount;
      for (let i = 0; i < starsToAdd; i++) {
        stars.value.push(createStar());
      }
    } else if (newCount < oldCount) {
      //remove excess stars
      stars.value.splice(newCount, oldCount - newCount);
    }
  },
  { immediate: false }
);
</script>

<style scoped>
.moon-stars-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}
</style>
