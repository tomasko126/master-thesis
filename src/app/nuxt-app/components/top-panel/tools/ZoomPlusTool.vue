<template>
  <BaseTool
    :disabled="!store.imageIds.length"
    popover-message="Zoom in"
    @mousedown="zoomStart"
    @mouseup="zoomEnd"
  >
    <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setZoom } from '~/functions/Cornerstone.js';

export default {
  name: 'ZoomPlusTool',
  components: {
    FontAwesomeIcon,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      zoomIntervalId: null,
      zoomFactorChange: 0.025,
    };
  },
  methods: {
    zoomStart() {
      this.zoomIntervalId = setInterval(setZoom, 25, this.zoomFactorChange);
    },

    zoomEnd() {
      clearInterval(this.zoomIntervalId);
      this.zoomIntervalId = null;
    },
  },
};
</script>
