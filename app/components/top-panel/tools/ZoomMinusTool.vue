<template>
  <BaseTool
    popover-message="Zoom out"
    :disabled="!store.imageIds.length || store.isComputingGrids"
    @click="onClick"
    @mousedown="zoomStart"
  >
    <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" />
  </BaseTool>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores';
import { setZoom } from '~/functions/Cornerstone';

const store = useGlobalStore();

const zoomIntervalId: Ref<number|undefined> = ref(undefined);
const zoomFactorChange = ref(-0.025);

const zoomEnd = (): void => {
  if (zoomIntervalId.value) {
    clearInterval(zoomIntervalId.value);
    zoomIntervalId.value = undefined;
  }
};

const zoomStart = (): void => {
  zoomIntervalId.value = window.setInterval(setZoom, 25, zoomFactorChange.value);

  document.addEventListener('mouseup', () => {
    zoomEnd();
  }, { once: true });
};

const onClick = () => {
  setZoom(zoomFactorChange.value);
};
</script>
