<template>
  <n-h2 class="power">
    <n-text v-if="faction === 'sun'" class="solar">Aurum: </n-text>
    <n-text v-else class="lunar">Nocturne: </n-text>
    <n-text :class="faction === 'sun' ? 'solar' : 'lunar'">
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
import { ref, onBeforeUnmount, onMounted, PropType } from 'vue';
import type { NumberAnimationInst } from 'naive-ui';
import { useStore } from '../../composables/useStore';
import { FactionKey } from '../../utilities/types';

const props = defineProps<{ faction: FactionKey }>()
const store = useStore();
const numberAnimationInstRef = ref<NumberAnimationInst | null>(null);

const lowNum = ref(store.factions[props.faction].power);
const highNum = ref(store.factions[props.faction].power);

const intervalId = ref<number | null>(null)

onMounted(() => {
  const offset = props.faction === 'moon' ? 2500 : 0

  setTimeout(() => {
    intervalId.value = window.setInterval(() => {
      lowNum.value = highNum.value
      highNum.value = store.factions[props.faction].power
      numberAnimationInstRef.value?.play()
    }, 5000)
  }, offset)
});

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
});
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
