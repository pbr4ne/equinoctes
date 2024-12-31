<template>
  <div class="container">
    <div class="content">
      <component
        :is="currentComponent.component"
        v-bind="currentComponent.props"
      />
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
  },
  setup(props) {
    const currentComponentIndex = ref(0);
    const currentComponent = computed(() => props.components[currentComponentIndex.value]);

    return {
      currentComponentIndex,
      currentComponent,
    };
  },
});
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 0px;
    justify-content: center;
    position: relative;
  }

  .icon-button {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 12px;
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
