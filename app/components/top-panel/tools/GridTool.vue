<template>
  <BaseTool
    :active="store.activeTool === 'Grid'"
    :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
    popover-message="Move grid/grid's point"
    tool-name="Grid"
    @click="activateTool('Grid', { mouseButtonMask: 1 })"
  >
    <img
      id="grid-icon"
      alt="Grid"
      src="/grid-icon.svg"
    >
  </BaseTool>
</template>

<script setup lang="ts">
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';
import { activateTool } from '~/functions/Cornerstone';

const store = useGlobalStore();
</script>

<style>
#grid-icon {
  height: 16px;
  width: 16px;
}
</style>
