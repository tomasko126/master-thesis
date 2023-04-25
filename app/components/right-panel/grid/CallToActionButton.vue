<template>
  <va-button
    v-if="!store.hasImageDefinedGrid"
    :disabled="store.isLoopingImages || store.isComputingGrids || !store.imageIds.length"
    icon="add"
    @click="createGrid"
  >
    Create grid
  </va-button>
  <va-button
    v-else
    :disabled="store.isLoopingImages || store.isComputingGrids"
    color="danger"
    icon="clear"
    @click="removeGrid"
  >
    Remove grid
  </va-button>
</template>

<script setup lang="ts">
import { useToast } from 'vuestic-ui'
import { useGlobalStore } from '~/stores'
import { activateTool, deactivateTool } from '~/functions/Cornerstone'

const store = useGlobalStore()

const createGrid = (): void => {
  activateTool('Grid', { mouseButtonMask: 1 })

  const { init } = useToast()
  init({ message: 'Click on the image to create grid' })
}

const removeGrid = (): void => {
  const gridTool = store.gridState?.tool
  if (!gridTool) {
    return
  }
  deactivateTool('Grid')
  gridTool.removeGrid()
}
</script>
