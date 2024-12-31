<template>
    <div class="sun-container">
      <img :src="sunSvg" alt="sun" class="sun" ref="sun"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import sunSvg from '@/assets/sun.svg';
  import { onMounted, ref } from 'vue';
  import { gsap } from 'gsap';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  
  gsap.registerPlugin(MotionPathPlugin);
  
  const sun = ref<HTMLImageElement | null>(null);
  
  onMounted(() => { 
    const path = `
      M -100,200
      C ${window.innerWidth / 4},0,
        ${(window.innerWidth * 3) / 4},0,
        ${window.innerWidth},200
    `;
  
    gsap.to(sun.value, {
      duration: 8,
      repeat: -1,
      ease: 'power1.inOut',
      motionPath: {
        path: path,
        autoRotate: false,
      },
    });
  });
  </script>
  
  <style scoped>
  .sun-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    z-index: 10;
  }
  
  .sun {
    position: absolute;
    width: 64px;
    height: 64px;
  }
  </style>
  