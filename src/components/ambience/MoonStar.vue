<template>
    <div
      ref="starRef"
      class="star"
      :style="{
        left: x + '%',
        top: y + '%',
        width: size + 'px',
        height: size + 'px',
        backgroundColor: color
      }"
    ></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { gsap } from 'gsap';
  
  const props = defineProps({
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  });
  
  const starRef = ref<HTMLDivElement | null>(null);
  let timeline: gsap.core.Timeline;
  
  onMounted(() => {
    if (starRef.value) {
      timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  
      //initialize opacity
      timeline.set(starRef.value, { opacity: 0 });
  
      //random delay for animation start
      const randomDelay = Math.random() * 5;
  
      //fade in
      timeline.to(starRef.value, {
        opacity: 1,
        duration: 2,
        delay: randomDelay,
        ease: 'power1.inOut',
      });
  
      //keep visible
      timeline.to(starRef.value, {
        duration: 3,
        ease: 'linear',
      });
  
      //fade out
      timeline.to(starRef.value, {
        opacity: 0,
        duration: 2,
        ease: 'power1.inOut',
      });
    }
  });
  
  //cleanup
  onBeforeUnmount(() => {
    if (timeline) {
      timeline.kill();
    }
  });
  </script>
  
  <style scoped>
  .star {
    position: absolute;
    border-radius: 50%;
  }
  </style>
  