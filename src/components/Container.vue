<template>
    <n-flex justify="end" vertical style="height: 100vh;">
      <n-space justify="center">
        <n-h2 class="power">
          <n-text v-if="side == 'left'" class="solar">Solar Power: </n-text>
          <n-text v-else class="lunar">Lunar Power: </n-text>
          <n-text :class="side == 'left' ? 'solar' : 'lunar'">
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="lowNum"
              :to="highNum"
              :active="true"
              :precision="2"
            />
          </n-text>
        </n-h2>          
      </n-space>      
      <n-space justify="center">
        <div :class="['bordered-background', `bordered-background-${side}`]">
          <div :class="['content', `content-${side}`]">
            <component
              :is="currentComponent.component"
              v-bind="currentComponent.props"
            />
          </div>
        </div>
      </n-space>
      <n-space justify="center">
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
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import type { NumberAnimationInst } from 'naive-ui'

export default defineComponent({
  props: {
    components: {
      type: Array as () => Array<{ component: any, props: any, icon: any }>,
      required: true,
    },
    side: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
    },
  },
  setup(props) {
    const currentComponentIndex = ref(0);
    const currentComponent = computed(() => props.components[currentComponentIndex.value] as { component: any, props: any });
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null);
    let lowNum = ref(0);
    let highNum = ref(0);

    onMounted(() => {
      setInterval(() => {        
        lowNum.value = Math.random() * 100;
        highNum.value = Math.random() * 100;
        numberAnimationInstRef.value?.play();
      }, 5000);
    });

    return {
      currentComponentIndex,
      currentComponent,
      lowNum,
      highNum,
      numberAnimationInstRef
    };
  },
});
</script>

<style scoped>
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

  .bordered-background-left {
    background: linear-gradient(to bottom, #f4a261, #e9c46a);
    border-color: #9e2a2b;
  }

  .bordered-background-right {
    background: linear-gradient(to bottom, #023047, #264653);
    border-color: #caf0f8;
  }

  .content {
    width: calc(min(50vw, 50vh) - 40px); 
    height: calc(min(50vw, 50vh) - 40px);
    padding: 20px;
    box-sizing: border-box;
  }
  
  .content-left {
    background: linear-gradient(to bottom, #f4a261, #e9c46a);
  }

  .content-right {
    background: linear-gradient(to bottom, #023047, #264653);
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

  .icon-button-left {
    background-color: #e9c46a;
    border-color: #9e2a2b;
    color:#9e2a2b;
  }

  .icon-button-right {
    background-color: #264653;
    border-color: #caf0f8;
    color:#caf0f8;
  }

  .icon-button:hover {
    background-color: #f0f0f0;
  }
</style>
