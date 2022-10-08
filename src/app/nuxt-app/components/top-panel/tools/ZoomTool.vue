<template>
  <BaseTool
    label="Zoom"
    tool-name="ZoomTool"
    @click="store.activateTool('Zoom', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconMagnifyingGlassPlus />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconMagnifyingGlassPlus } from '@iconify-prerendered/vue-fa6-solid';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'ZoomTool',
  components: {
    IconMagnifyingGlassPlus,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>
