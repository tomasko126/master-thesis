<template>
  <BaseTool
    label="Pan"
    tool-name="PanTool"
    register-tool
    @click="store.activateTool('Pan', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <IconUpDownLeftRight />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool';
import { IconUpDownLeftRight } from '@iconify-prerendered/vue-fa6-solid';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'PanTool',
  components: {
    BaseTool,
    IconUpDownLeftRight,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>
