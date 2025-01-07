<template>
  <div class="celestial-container" style="z-index: 9999;">
    <img :src="currentIcon" alt="sun" class="celestial" ref="celestial"/>
  </div>
</template>
  
<script setup lang="ts">
  import sunSvg from '@/assets/sun.svg';
  import moonSvg from '@/assets/moon.svg';
  import { onMounted, ref } from 'vue';
  import { gsap } from 'gsap';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  import { useStore } from '../../composables/useStore';

  gsap.registerPlugin(MotionPathPlugin);

  const store = useStore();
  const celestial = ref<HTMLImageElement | null>(null);
  const currentIcon = ref(sunSvg);
  const isMoonVisible = ref(false);
  const lastX = ref(0);
  const dayDuration = store.fullDaySeconds;

  onMounted(() => {
    const path = `
      M -100,200
      C ${window.innerWidth / 4},0,
        ${(window.innerWidth * 3) / 4},0,
        ${window.innerWidth},200
    `;

    gsap.to(celestial.value, {
      duration: dayDuration,
      repeat: -1,
      ease: 'power1.inOut',
      motionPath: {
        path: path,
        autoRotate: false,
      },
      onUpdate: () => {
        const middleX = window.innerWidth / 2;
        const celestialX = Number(gsap.getProperty(celestial.value, "x"));

        if (celestialX > middleX) {
          currentIcon.value = moonSvg;
          isMoonVisible.value = true;
        } else if (celestialX < middleX) {
          currentIcon.value = sunSvg;
          isMoonVisible.value = false;
        }

        lastX.value = celestialX;
      },
    });
  });
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
  