<template>
    <n-scrollbar>
        <span :class="['lore', `lore-${faction}`]" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </span>
    </n-scrollbar>
</template>

<script setup lang="ts">
import { FactionKey } from '../../utilities/types';
const props = defineProps<{ faction: FactionKey }>()
</script>

<style scoped>
.lore {
    font-family: "Grenze Gotisch", serif;
    font-weight: 300;
    font-size: 1.25em;
    border-radius: 20px;
}

.lore-sun {
  color: #9e2a2b;
}

.lore-moon {
  color: #caf0f8;
}
</style>
