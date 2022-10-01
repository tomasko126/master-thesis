<template>
  <BaseTool
    label="Zoom"
    tool-name="ZoomTool"
    @click="activateTool('Zoom', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconMagnifyingGlassPlus />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconMagnifyingGlassPlus } from '@iconify-prerendered/vue-fa6-solid';

import { mapActions } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  name: 'ZoomTool',
  components: {
    IconMagnifyingGlassPlus,
    BaseTool,
  },
  methods: {
    ...mapActions(useGlobalStore, {
      activateTool: 'activateTool', // todo: store default options for every tool
    }),
  },
};
</script>
