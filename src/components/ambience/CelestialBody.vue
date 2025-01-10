<template>
  <div class="celestial-container" style="z-index: 9999;">
    <img :src="currentIcon" alt="celestial body" class="celestial" ref="celestial" />
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import sunSvg from '@/assets/sun.svg';
import moonSvg from '@/assets/moon.svg';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useStore } from '../../composables/useStore';
import { emitter } from '../../utilities/emitter';

gsap.registerPlugin(MotionPathPlugin);

const store = useStore();
const celestial = ref<HTMLImageElement | null>(null);
const currentIcon = ref(sunSvg);
const isMoonVisible = ref(false);
const lastX = ref(0);
const dayDuration = ref(store.fullDaySeconds / store.speedMultiplier);

let animation: gsap.core.Tween | null = null;

const screenResized = ref(false);

const createMotionPath = () => {
  return `
    M -100,200
    C ${window.innerWidth / 4},0,
      ${(window.innerWidth * 3) / 4},0,
      ${window.innerWidth},200
  `;
};

const startAnimation = () => {
  const path = createMotionPath();

  animation = gsap.to(celestial.value, {
    duration: dayDuration.value,
    repeat: -1,
    ease: 'power1.inOut',
    motionPath: {
      path: path,
      autoRotate: false,
    },
    onUpdate: () => {
      const celestialX = Number(gsap.getProperty(celestial.value, 'x'));

      if (store.currentlyDay) {
        currentIcon.value = sunSvg;
        isMoonVisible.value = false;
      } else {
        currentIcon.value = moonSvg;
        isMoonVisible.value = true;
      }

      lastX.value = celestialX;
    },
  });
};

const handleResize = () => {
  screenResized.value = true;
};

onMounted(() => {
  startAnimation();

  window.addEventListener('resize', handleResize);
});

emitter.on('gameReset', () => {
  if (animation) {
    animation.kill();
  }

  startAnimation();
});

watch(
  () => store.currentlyDay,
  (newVal, oldVal) => {
    if (screenResized.value && celestial.value && animation) {
      animation.kill();

      dayDuration.value = store.fullDaySeconds / store.speedMultiplier;

      const newPath = createMotionPath();

      animation = gsap.to(celestial.value, {
        duration: dayDuration.value,
        repeat: -1,
        ease: 'power1.inOut',
        motionPath: {
          path: newPath,
          autoRotate: false,
        },
        onUpdate: () => {
          const celestialX = Number(gsap.getProperty(celestial.value, 'x'));

          if (store.currentlyDay) {
            currentIcon.value = sunSvg;
            isMoonVisible.value = false;
          } else {
            currentIcon.value = moonSvg;
            isMoonVisible.value = true;
          }

          lastX.value = celestialX;
        },
      });

      screenResized.value = false;
    }
  }
);

onBeforeUnmount(() => {
  //cleanup
  if (animation) {
    animation.kill();
  }

  window.removeEventListener('resize', handleResize);
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
