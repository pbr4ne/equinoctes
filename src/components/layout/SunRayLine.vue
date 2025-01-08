<template>
    <line
      ref="lineRef"
      :x1="x"
      y1="0"
      :x2="x"
      y2="120"
      :stroke="color"
      stroke-width="0.1"
      :transform="`rotate(${angle}, ${x}, 0)`"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { gsap } from 'gsap';
  
  const props = defineProps({
    x: {
      type: Number,
      required: true,
    },
    angle: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  });
  
  const lineRef = ref<SVGLineElement | null>(null);
  let timeline: gsap.core.Timeline;
  
  onMounted(() => {
    if (lineRef.value) {
      const totalLength = (lineRef.value as any).getTotalLength();
  
      timeline = gsap.timeline({ repeat: -1 });
  
      //initialize stroke dash properties
      timeline.set(lineRef.value, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
  
      //random delay for animation start
      const randomDelay = Math.random() * 3;
  
      //animate drawing the line
      timeline.to(lineRef.value, {
        strokeDashoffset: 0,
        duration: 5,
        delay: randomDelay,
        ease: 'power1.inOut',
      });
  
      //hold the line visible for a bit
      timeline.to(lineRef.value, {
        duration: 2,
      });
  
      //animate hiding the line
      timeline.to(lineRef.value, {
        strokeDashoffset: -totalLength,
        duration: 5,
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
  