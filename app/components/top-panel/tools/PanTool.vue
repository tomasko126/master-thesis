<template>
  <BaseTool
    :active="isToolActive"
    :disabled="!store.imageIds.length || store.isLoopingImages || store.isComputingGrids"
    popover-message="Move image"
    :tool-name="toolName"
    @click="onClick"
  >
    <font-awesome-icon icon="fa-solid fa-up-down-left-right" />
  </BaseTool>
</template>

<script setup lang="ts">
import { unref, computed } from 'vue'
import BaseTool from './BaseTool.vue'
import { useGlobalStore } from '~/stores'
import { activateTool, disableTool } from '~/functions/Cornerstone'

const store = useGlobalStore()
const toolName = 'Pan'

const isToolActive = computed(() => {
  return store.activeTool === toolName
})

const onClick = () => {
  unref(isToolActive) ? disableTool(toolName) : activateTool(toolName, { mouseButtonMask: 1 })
}
</script>
