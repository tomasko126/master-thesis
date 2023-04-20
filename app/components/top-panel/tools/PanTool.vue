<template>
  <BaseTool
    :active="isToolActive"
    :disabled="!store.imageIds.length || store.isLoopingImages || store.animation.isComputingGrids"
    popover-message="Move image"
    :tool-name="toolName"
    @click="onClick"
  >
    <font-awesome-icon icon="fa-solid fa-up-down-left-right" />
  </BaseTool>
</template>

<script setup lang="ts">
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';
import { activateTool, deactivateTool } from '~/functions/Cornerstone';
import { unref, computed } from 'vue';

const store = useGlobalStore();
const toolName = 'Pan';

const isToolActive = computed(() => {
  return store.activeTool === toolName;
});

const onClick = () => {
  unref(isToolActive) ? deactivateTool(toolName) : activateTool(toolName, { mouseButtonMask: 1 });
};
</script>
