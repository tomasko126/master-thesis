<template>
  <BaseTool
    popover-message="Zoom out"
    :disabled="!store.imageIds.length"
    @mousedown="zoomStart"
    @mouseup="zoomEnd"
  >
    <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" />
  </BaseTool>
</template>

<script setup lang="ts">
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '../../../stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setZoom } from '../../../functions/Cornerstone';
import { ref } from "vue";
import type Ref from 'vue';

const store = useGlobalStore();

const zoomIntervalId: ReturnType<typeof setInterval>|Ref<null> = ref(null);
const zoomFactorChange = ref(-0.025);

const zoomEnd = () => {
  clearInterval(zoomIntervalId.value);
  zoomIntervalId.value = null;
};

const zoomStart = () => {
  zoomIntervalId.value = setInterval(setZoom, 25, zoomFactorChange.value);
};
</script>
