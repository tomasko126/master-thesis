<template>
  <BaseTool
    :active="isToolActive"
    :disabled="!store.imageIds.length || store.isLoopingImages || store.isComputingGrids || !store.hasImageDefinedGrid"
    popover-message="Move grid"
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
import { unref, computed } from 'vue'
import type cornerstoneTools from '@tarotoma/cornerstone-tools'
import BaseTool from './BaseTool.vue'
import { useGlobalStore } from '~/stores'
import { activateTool, deactivateTool } from '~/functions/Cornerstone'

const store = useGlobalStore()
const toolName = 'Grid'

const isToolActive = computed(() => {
  return store.activeTool === toolName
})

const onClick = (): void => {
  if (unref(isToolActive)) {
    deactivateTool(toolName)
    return
  }

  activateTool(toolName, { mouseButtonMask: 1 })
  const gridTool = store.gridState?.tool as cornerstoneTools.GridTool
  gridTool.moveOneHandleOnly = false
}
</script>

<style>
#grid-icon {
  height: 16px;
  width: 16px;
}
</style>
