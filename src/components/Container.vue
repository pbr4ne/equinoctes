<template>
    <n-flex justify="end" vertical style="height: 100vh;">
      <n-space justify="center">
        <n-card>hi</n-card>
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
import { defineComponent, ref, computed } from 'vue';

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

    return {
      currentComponentIndex,
      currentComponent,
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

  .bordered-background-left {
    background: linear-gradient(to bottom, #f4a261, #e9c46a);
    border-color: #023047;
  }

  .bordered-background-right {
    background: linear-gradient(to bottom, #023047, #264653);
    border-color: #f4a261;
  }

  .content {
  width: min(50vw, 50vh);
  height: min(50vw, 50vh);
  padding: max(20px, calc(min(50vw, 50vh) * 0.1));
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
    border-color: #023047;
    color:#9e2a2b;
  }

  .icon-button-right {
    background-color: #264653;
    border-color: #f4a261;
    color:#caf0f8;
  }

  .icon-button:hover {
    background-color: #f0f0f0;
  }
</style>
