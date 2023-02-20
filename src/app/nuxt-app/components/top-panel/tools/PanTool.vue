<template>
  <BaseTool
    :active="store.activeTool === 'Pan'"
    :disabled="!store.imageIds.length"
    popover-message="Move image"
    tool-name="Pan"
    @click="store.activateTool('Pan', { mouseButtonMask: 1 })"
  >
    <template #icon>
      <font-awesome-icon icon="fa-solid fa-up-down-left-right" />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool';

import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'PanTool',
  components: {
    FontAwesomeIcon,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>
