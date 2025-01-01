<template>
  <n-h2 class="power">
    <n-text v-if="side === 'sun'" class="solar">Aurum: </n-text>
    <n-text v-else class="lunar">Nocturne: </n-text>
    <n-text :class="side === 'sun' ? 'solar' : 'lunar'">
      <n-number-animation
        ref="numberAnimationInstRef"
        :from="lowNum"
        :to="highNum"
        :active="true"
        :precision="0"
      />
    </n-text>
  </n-h2>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { NumberAnimationInst } from 'naive-ui';

defineProps({
  side: {
    type: String,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null);
const lowNum = ref(0);
const highNum = ref(0);

// onMounted(() => {
//   setInterval(() => {
//     lowNum.value = Math.random() * 100;
//     highNum.value = Math.random() * 100;
//     numberAnimationInstRef.value?.play();
//   }, 5000);
// });
</script>

<style scoped>
.power {
  font-family: "Grenze Gotisch", serif;
  font-weight: 300;
  font-size: 2.5em;
}

.solar {
  color: #9e2a2b;
}

.lunar {
  color: #caf0f8;
}
</style>
