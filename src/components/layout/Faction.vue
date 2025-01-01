<template>
  <div class="layout-container">
    <sun-rays v-if="side === 'sun'" />
    <moon-stars v-if="side === 'moon'" />

    <n-flex justify="end" vertical style="height: 100vh;">
      <n-space justify="center" style="z-index: 9999">
        <power :side="side" />
      </n-space>

      <n-space justify="center" style="z-index: 9999">
        <div :class="['bordered-background', `bordered-background-${side}`]">
          <div :class="['content', `content-${side}`]">
            <component :is="currentComponent.component" v-bind="currentComponent.props" />
          </div>
        </div>
      </n-space>

      <n-space justify="center" style="z-index: 9999">
        <n-space justify="center" style="margin: 20px;">
          <button
            v-for="(item, index) in components"
            :key="index"
            @click="currentComponentIndex = index"
            :class="['icon-button', `icon-button-${side}`]"
          >
            <component :is="item.icon"/>
          </button>
        </n-space>
      </n-space>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Power from './Power.vue';
import MoonStars from './MoonStars.vue';
import SunRays from './SunRays.vue';

const props = defineProps({
  components: {
    type: Array as () => Array<{ component: any; props: any; icon: any }>,
    required: true,
  },
  side: {
    type: String,
    default: 'sun',
    validator: (value: string) => ['sun', 'moon'].includes(value),
  },
});

const currentComponentIndex = ref(0);
const currentComponent = computed(() => props.components[currentComponentIndex.value]);
</script>

<style scoped>
  .layout-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .bordered-background {
    width: 100%;
    height: 100%;
    border: 2px solid;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  

  .bordered-background-sun {
    border-color: #9e2a2b;
  }

  .bordered-background-moon {
    border-color: #caf0f8;
  }

  .content {
    width: calc(min(50vw, 50vh));
    height: calc(min(50vw, 50vh));
    padding: 20px;
    box-sizing: border-box;
  }

  .icon-button {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .icon-button-sun {
    background-color: #e9c46a;
    border-color: #9e2a2b;
    color: #9e2a2b;
  }

  .icon-button-moon {
    background-color: #264653;
    border-color: #caf0f8;
    color: #caf0f8;
  }

  .icon-button-sun:hover {
    background-color: #ffb703;
  }

  .icon-button-moon:hover {
    background-color: #219ebc;
  }
</style>
