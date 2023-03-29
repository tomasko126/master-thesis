<template>
  <BaseTool
    popover-message="Zoom out"
    :disabled="!store.imageIds.length || store.animation.isComputingGrids"
    @mousedown="zoomStart"
    @mouseup="zoomEnd"
  >
    <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" />
  </BaseTool>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores';
import { setZoom } from '~/functions/Cornerstone';

const store = useGlobalStore();

const zoomIntervalId: Ref<number|undefined> = ref(undefined);
const zoomFactorChange = ref(-0.025);

const zoomEnd = () => {
  if (zoomIntervalId.value) {
    clearInterval(zoomIntervalId.value);
    zoomIntervalId.value = undefined;
  }
};

const zoomStart = () => {
  zoomIntervalId.value = window.setInterval(setZoom, 25, zoomFactorChange.value);
};
</script>
