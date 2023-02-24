<template>
  <va-button
    v-if="!store.hasImageDefinedGrid"
    :disabled="store.isLoopingImages || !store.imageIds.length"
    icon="add"
    @click="createGrid"
  >
    Create grid
  </va-button>
  <va-button
    v-else
    :disabled="store.isLoopingImages"
    color="danger"
    icon="clear"
    @click="removeGrid"
  >
    Remove grid
  </va-button>
</template>

<script>
import { useGlobalStore } from '~/stores';

import { activateTool, getGridTool, deactivateTool } from '~/functions/Cornerstone.js';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  methods: {
    createGrid() {
      activateTool('Grid', { mouseButtonMask: 1 });
      this.$vaToast.init({ message: 'Click on the image to create grid' });
    },
    removeGrid() {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      deactivateTool('Grid');
      gridTool.removeGrid();
    },
  },
};
</script>
