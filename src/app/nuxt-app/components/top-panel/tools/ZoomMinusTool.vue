<template>
  <va-popover
    message="Zoom out"
    placement="bottom"
  >
    <BaseTool
      tool-name="ZoomMinusTool"
      @mousedown="zoomStart"
      @mouseup="zoomEnd"
    >
      <template #icon>
        <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" />
      </template>
    </BaseTool>
  </va-popover>
</template>

<script>
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* global cornerstone */

export default {
  name: 'ZoomTool',
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
      zoomFactorChange: -0.025,
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
