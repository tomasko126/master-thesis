<template>
  <BaseTool
    label="Freehand"
    tool-name="FreehandRoiTool"
    @click="activateTool('FreehandRoi', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconPen />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconPen } from '@iconify-prerendered/vue-fa6-solid';

import { mapActions } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  name: 'FreehandRoiTool',
  components: {
    BaseTool,
    IconPen,
  },
  methods: {
    ...mapActions(useGlobalStore, {
      activateTool: 'activateTool', // todo: store default options for every tool
    }),
  },
};
</script>
