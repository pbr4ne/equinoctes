<template>
  <div :class="['container', positionClass]">
    <div :class="['bordered-background', `bordered-background-${side}`]">
      <div :class="['content', `content-${side}`]">
        <component
          :is="currentComponent.component"
          v-bind="currentComponent.props"
        />
      </div>
    </div>

    <div class="button-group">
      <button
        v-for="(item, index) in components"
        :key="index"
        @click="currentComponentIndex = index"
        class="icon-button"
      >
        <component :is="item.icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  props: {
    components: {
      type: Array,
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
    const currentComponent = computed(() => props.components[currentComponentIndex.value]);

    const positionClass = computed(() => {
      return props.side === 'right' ? 'container-right' : 'container-left';
    });

    return {
      currentComponentIndex,
      currentComponent,
      positionClass,
    };
  },
});
</script>

  <style scoped>
  .container {
    position: absolute;
    bottom: 20px;

    width: min(37.5vw, 50vh);
    height: min(47.5vw, 60vh);

    overflow: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container-left {
    left: 25vw;
    transform: translateX(-50%);
  }

  .container-right {
    left: 75vw;
    transform: translateX(-50%);
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

  .bordered-background-left {
    background: linear-gradient(to bottom, #f4a261, #e9c46a);
    border-color: #023047;
  }

  .bordered-background-right {
    background: linear-gradient(to bottom, #023047, #264653);
    border-color: #f4a261;
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-left {
    background: linear-gradient(to bottom, #f4a261, #e9c46a);
  }

  .content-right {
    background: linear-gradient(to bottom, #023047, #264653);
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: center;
    position: relative;
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
    background-color: #fff;
  }

  .icon-button:hover {
    background-color: #f0f0f0;
  }

  .icon-button > * {
    font-size: 20px;
    color: #666;
  }
</style>
