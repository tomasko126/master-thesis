<template>
  <BaseTool
    :active="store.activeTool === 'Grid'"
    :disabled="!store.hasImageDefinedGrid"
    popover-message="Move grid/grid's point"
    tool-name="Grid"
    @click="store.activateTool('Grid', { mouseButtonMask: 1 })"
  >
    <img
      id="grid-icon"
      alt="Grid"
      src="/grid-icon.svg"
    >
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'GridTool',
  components: {
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>

<style>
#grid-icon {
  height: 16px;
  width: 16px;
}
</style>
