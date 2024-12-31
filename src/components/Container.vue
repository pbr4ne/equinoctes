<template>
    <div class="container">
      <div class="button-group">
        <button
          v-for="(item, index) in components"
          :key="index"
          @click="currentComponentIndex = index"
          class="switch-button"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="content">
        <component
          :is="currentComponent.component"
          v-bind="currentComponent.props"
        />
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
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .switch-button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
  }
  
  .switch-button:hover {
    background-color: #f0f0f0;
  }
  
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  </style>
  