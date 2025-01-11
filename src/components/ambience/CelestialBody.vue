<template>
  <div class="celestial-container" style="z-index: 9999;">
    <img :src="currentIcon" alt="celestial body" class="celestial" ref="celestial" />
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import sunSvg from '@/assets/sun.svg';
import moonSvg from '@/assets/moon.svg';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useStore } from '../../composables/useStore';

gsap.registerPlugin(MotionPathPlugin);

const store = useStore();
const celestial = ref<HTMLImageElement | null>(null);
const currentIcon = ref(sunSvg);

const dayDuration = 15 / store.speedMultiplier;
const nightDuration = 15 / store.speedMultiplier;

let dayNightTimeline: gsap.core.Timeline | null = null;

function createMotionPath() {
  return `
    M -100,200
    C ${window.innerWidth / 4},0,
      ${(window.innerWidth * 3) / 4},0,
      ${window.innerWidth},200
  `;
}

 function animateDayNightCycle() {
  if (dayNightTimeline) {
    dayNightTimeline.kill();
    dayNightTimeline = null;
  }

  const path = createMotionPath();

  const tl = gsap.timeline();

  tl.to(celestial.value, {
    duration: dayDuration,
    motionPath: {
      path,
      start: 0,
      end: 0.5,
      autoRotate: false
    },
    ease: 'none',
    onStart: () => {
      currentIcon.value = sunSvg;
    }
  });

  tl.to(celestial.value, {
    duration: nightDuration,
    motionPath: {
      path,
      start: 0.5,
      end: 1,
      autoRotate: false
    },
    ease: 'none',
    onStart: () => {
      currentIcon.value = moonSvg;
    }
  });

  dayNightTimeline = tl;
}


onMounted(() => {
  animateDayNightCycle();

  window.addEventListener('resize', () => {
    animateDayNightCycle();
  });
});

onBeforeUnmount(() => {
  if (dayNightTimeline) {
    dayNightTimeline.kill();
    dayNightTimeline = null;
  }
  window.removeEventListener('resize', () => {});
});

watch(
  () => store.calendar.days,
  () => {
    animateDayNightCycle();
  }
);
</script>

<style scoped>
.celestial-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  z-index: 10;
}

.celestial {
  position: absolute;
  width: 64px;
  height: 64px;
}
</style>
