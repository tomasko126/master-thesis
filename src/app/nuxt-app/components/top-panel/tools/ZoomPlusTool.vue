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

<script setup lang="ts">
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '../../../stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setZoom } from '../../../functions/Cornerstone';
import { ref } from 'vue';
import type Ref from 'vue';

const store = useGlobalStore();

const zoomIntervalId: ReturnType<typeof setInterval>|Ref<null> = ref(null);
const zoomFactorChange = ref(0.025);

const zoomStart = () => {
  zoomIntervalId.value = setInterval(setZoom, 25, zoomFactorChange.value);
};

const zoomEnd = () => {
  clearInterval(zoomIntervalId.value);
  zoomIntervalId.value = null;
};
</script>
