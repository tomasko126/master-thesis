<template>
  <BaseTool
    :disabled="!store.imageIds.length || store.animation.isComputingGrids"
    popover-message="Zoom in"
    @mousedown="zoomStart"
  >
    <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
  </BaseTool>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores';
import { setZoom } from '~/functions/Cornerstone';

const store = useGlobalStore();

const zoomIntervalId: Ref<number|undefined> = ref(undefined);
const zoomFactorChange = ref(0.025);

const zoomStart = (): void => {
  zoomIntervalId.value = window.setInterval(setZoom, 25, zoomFactorChange.value);

  document.addEventListener('mouseup', () => {
    zoomEnd();
  }, { once: true });
};

const zoomEnd = (): void => {
  if (zoomIntervalId.value) {
    clearInterval(zoomIntervalId.value);
    zoomIntervalId.value = undefined;
  }
};
</script>
