<template>
  <div class="moon-stars-overlay" ref="moonStarsContainer">
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star"
      :style="{
        left: star.x + '%',
        top: star.y + '%',
        width: star.size + 'px',
        height: star.size + 'px',
        backgroundColor: star.color
      }"
    ></div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useStore } from '../../composables/useStore';

const store = useStore();

const moonStarsContainer = ref<HTMLDivElement | null>(null);

const starCount = store.moonLevel * 20 - 40;

const stars = Array.from({ length: starCount }, () => {
  //random size & spot
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 2 + Math.random() * 3;

  //random colour
  const hue = 190 + Math.random() * 20;
  const light = 70 + Math.random() * 20;
  const color = `hsl(${hue}, 100%, ${light}%)`;
  return { x, y, size, color };
});

onMounted(() => {
  if (!moonStarsContainer.value) return;

  const starEls = moonStarsContainer.value.querySelectorAll('.star');
  starEls.forEach((starEl) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.set(starEl, { opacity: 0 });

    const randomDelay = Math.random() * 5;

    //fade in
    tl.to(starEl, {
      opacity: 1,
      duration: 2,
      delay: randomDelay,
      ease: 'power1.inOut',
    });

    //keep visible
    tl.to(starEl, {
      duration: 3,
      ease: 'linear',
    });

    //fade out
    tl.to(starEl, {
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
    });
  });
});
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

.star {
    position: absolute;
    border-radius: 50%;
}
</style>
