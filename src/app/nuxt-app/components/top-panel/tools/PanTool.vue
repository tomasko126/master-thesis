<template>
  <BaseTool
    label="Pan"
    tool-name="PanTool"
    @click="activateTool('Pan', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconUpDownLeftRight />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool';
import { IconUpDownLeftRight } from '@iconify-prerendered/vue-fa6-solid';

import { mapActions } from 'pinia';
import { useGlobalStore } from '~/stores/index';


export default {
  name: 'PanTool',
  components: {
    BaseTool,
    IconUpDownLeftRight,
  },
  methods: {
    ...mapActions(useGlobalStore, {
      activateTool: 'activateTool',
    }),
  },
};
</script>
