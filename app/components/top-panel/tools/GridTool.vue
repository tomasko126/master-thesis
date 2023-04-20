<template>
  <BaseTool
    :active="isToolActive"
    :disabled="!store.imageIds.length || store.isLoopingImages || store.animation.isComputingGrids || !store.hasImageDefinedGrid"
    popover-message="Move with grid/grid's point"
    :tool-name="toolName"
    @click="onClick"
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
import { activateTool, deactivateTool } from '~/functions/Cornerstone';
import { unref } from 'vue';

const store = useGlobalStore();
const toolName = 'Grid';

const isToolActive = computed(() => {
  return store.activeTool === toolName;
});

const onClick = () => {
  unref(isToolActive) ? deactivateTool(toolName) : activateTool(toolName, { mouseButtonMask: 1 });
};
</script>

<style>
#grid-icon {
  height: 16px;
  width: 16px;
}
</style>
