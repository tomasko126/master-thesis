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

/* global cornerstone */

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
    zoom() {
      const viewport = cornerstone.getViewport(this.store.mainImageContainer);

      const pow = 1.7;
      const oldFactor = Math.log(viewport.scale) / Math.log(pow);
      const factor = oldFactor + this.zoomFactorChange;

      viewport.scale = Math.pow(pow, factor);

      cornerstone.setViewport(this.store.mainImageContainer, viewport);
    },

    zoomStart() {
      this.zoomIntervalId = setInterval(this.zoom, 25);
    },

    zoomEnd() {
      clearInterval(this.zoomIntervalId);
      this.zoomIntervalId = null;
    },
  },
};
</script>
