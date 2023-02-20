<template>
  <va-button
    v-if="!store.hasImageDefinedGrid"
    :disabled="store.isLoopingImages || !store.imageIds.length"
    @click="activateTool"
  >
    Create grid
  </va-button>
  <va-button
    v-else
    :disabled="store.isLoopingImages"
    color="danger"
    @click="removeGrid"
  >
    Remove grid
  </va-button>
</template>

<script>
import { useGlobalStore } from '~/stores';

/* global cornerstoneTools */

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  methods: {
    activateTool() {
      this.store.activateTool('Grid', { mouseButtonMask: 1 });
      this.$vaToast.init({ message: 'Click on the image to create a grid' });
    },
    getGridTool() {
      return cornerstoneTools.getToolForElement(this.store.mainImageContainer, 'Grid') ?? null;
    },
    removeGrid() {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      this.store.deactivateTool('Grid');
      gridTool.removeGrid();
    },
  },
};
</script>
