<template>
  <BaseTool
    label="Create grid"
    tool-name="FreehandRoiTool"
    register-tool
    @click="store.activateTool('FreehandRoi', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <img
        id="grid-icon"
        alt="Grid"
        src="/grid-icon.svg"
      >
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'FreehandRoiTool',
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
