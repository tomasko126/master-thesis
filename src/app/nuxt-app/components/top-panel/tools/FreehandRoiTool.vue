<template>
  <BaseTool
    label="Freehand"
    tool-name="FreehandRoiTool"
    @click="store.activateTool('FreehandRoi', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconPen />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconPen } from '@iconify-prerendered/vue-fa6-solid';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'FreehandRoiTool',
  components: {
    BaseTool,
    IconPen,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>
