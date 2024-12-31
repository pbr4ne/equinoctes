<template>
    <div class="sun-container">
        <img :src="sunSvg" alt="sun" class="sun"/>
    </div>
  </template>

  <script setup lang="ts">
    import sunSvg from '@/assets/sun.svg';
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
    animation: sunRiseAndSet 20s ease-in-out infinite;
  }
  
  @keyframes sunRiseAndSet {
    0% {
      top: 150px;
      left: -10%;
      transform: translate(-50%, -50%);
    }
    50% {
      top: 50px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      top: 150px;
      left: 110%;
      transform: translate(-50%, -50%);
    }
  }
  </style>
  