<template>
   <div class="adjacency-bonus-container">
    <div :class="['adjacency-bonus-title', `adjacency-bonus-title-${props.faction}`]">Proximity Effects</div>
  <div class="preview-grid">
    <div
      v-for="(cell, index) in 25"
      :key="index"
      :class="['preview-cell', `preview-cell-${props.faction}`]"
    >
      <component
        v-if="index === centerIndex && buildingIcon"
        :is="buildingIcon"
        :class="['preview-building-icon', `preview-building-icon-${props.faction}`]"
        :style="buildingIconStyle"
      />

      <component
        v-else-if="arrowMap[index]"
        :is="arrowMap[index].icon"
        class="preview-arrow-icon"
        :style="{ color: arrowMap[index].color }"
      />
    </div>
  </div>
</div>
</template>

  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue'
  import type { Building, FactionKey } from '../../utilities/types'
  import {
    ArrowBigTop, ArrowBigUpLine, ArrowBigUpLines,
    ArrowBigDown, ArrowBigDownLine, ArrowBigDownLines
  } from '@vicons/tabler'
  import { YinYang } from '@vicons/fa'
  import { Moon2 } from '@vicons/tabler'
  import { DataSunburst24Filled } from '@vicons/fluent'
  import { sunBuildingMetadata, moonBuildingMetadata } from '../../composables/useBuildingMetadata'
  
  const props = defineProps<{
    faction: FactionKey,
    hoveredBuilding: Building | null
  }>()
  
  const centerIndex = 12
  
  const buildingMetadata = computed(() => {
    return props.faction === 'sun' ? sunBuildingMetadata : moonBuildingMetadata
  })
  
  const buildingIcon = computed(() => {
    if (!props.hoveredBuilding) return null
    const meta = buildingMetadata.value.find(
      (m) => m.id === props.hoveredBuilding?.id
    )
    return meta?.icon || null
  })
  

  const buildingIconStyle = computed(() => {
    if (!buildingIcon.value) return {}
    
    if (buildingIcon.value === YinYang) {
      return {
        color: props.faction === 'sun' ? '#264653' : '#e9c46a'
      }
    } else if (buildingIcon.value === Moon2) {
      return {
        color: '#0286ff'
      }
    } else if (buildingIcon.value === DataSunburst24Filled) {
      return {
        color: '#FC8200'
      }
    }
  
    return {}
  })
  
  function getArrowIcon(modifier: number) {
    if (modifier >= 0) {
      if (modifier <= 0.25) return ArrowBigTop
      if (modifier < 0.5)  return ArrowBigUpLine
      return ArrowBigUpLines
    } else {
      if (modifier > -0.25) return ArrowBigDown
      if (modifier > -0.5)  return ArrowBigDownLine
      return ArrowBigDownLines
    }
  }
  
  function getArrowColor(modifier: number): string {
    return modifier >= 0 ? '#ecf39e' : '#f26a8d'
  }
  
  const arrowMap = computed(() => {
    const map = new Array(25).fill(null)
  
    if (!props.hoveredBuilding) return map
  
    const adjacency = props.hoveredBuilding.adjacency || []
  
    adjacency.forEach(({ dx, dy, modifier }) => {
      const row = 2 + dy
      const col = 2 + dx
      if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        const cellIndex = row * 5 + col
        map[cellIndex] = {
          icon: getArrowIcon(modifier),
          color: getArrowColor(modifier),
        }
      }
    })
  
    return map
  })
  </script>
  
  <style scoped>

.preview-grid {
  display: grid;
  grid-template-columns: repeat(5, 32px);
  grid-template-rows: repeat(5, 32px);
  gap: 0;
  width: fit-content; 
}

@media ((max-width: 935px) and (min-width: 731px)), (max-height: 830px) {
  .preview-grid {
    grid-template-columns: repeat(5, 15px);
    grid-template-rows: repeat(5, 15px);
  }
}

@media (max-width: 500px), (max-height: 600px) {
  .preview-grid {
    grid-template-columns: repeat(5, 15px);
    grid-template-rows: repeat(5, 15px);
  }
}

.preview-cell-sun {
  background: #e9c46a;
  border-top: 1px solid #9e2a2b;
  border-left: 1px solid #9e2a2b;

  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-cell-sun:nth-child(5n) {
  border-right: 1px solid #9e2a2b;
}

.preview-cell-sun:nth-child(n+21) {
  border-bottom: 1px solid #9e2a2b;
}

.preview-cell-sun:nth-child(1) {
  border-top-left-radius: 6px;
}
.preview-cell-sun:nth-child(5) {
  border-top-right-radius: 6px;
}
.preview-cell-sun:nth-child(21) {
  border-bottom-left-radius: 6px;
}
.preview-cell-sun:nth-child(25) {
  border-bottom-right-radius: 6px;
}

.preview-cell-moon {
  background: #264653;
  border-top: 1px solid #caf0f8;
  border-left: 1px solid #caf0f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-cell-moon:nth-child(5n) {
  border-right: 1px solid #caf0f8;
}
.preview-cell-moon:nth-child(n+21) {
  border-bottom: 1px solid #caf0f8;
}

.preview-cell-moon:nth-child(1) {
  border-top-left-radius: 6px;
}
.preview-cell-moon:nth-child(5) {
  border-top-right-radius: 6px;
}
.preview-cell-moon:nth-child(21) {
  border-bottom-left-radius: 6px;
}
.preview-cell-moon:nth-child(25) {
  border-bottom-right-radius: 6px;
}

.preview-building-icon {
  width: 80%;
  height: 80%;
}

.preview-building-icon-sun {
  color: #9e2a2b;
}
.preview-building-icon-moon {
  color: #caf0f8;
}

.preview-arrow-icon svg {
  width: 80%;
  height: 80%;
}

.adjacency-bonus-container {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.adjacency-bonus-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.adjacency-bonus-title-sun {
  color: #9e2a2b;
}

.adjacency-bonus-title-moon {
  color: #caf0f8;
}
</style>
