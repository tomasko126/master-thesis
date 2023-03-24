<template>
  <BaseTool
    :active="store.activeTool === 'Pan'"
    :disabled="!store.imageIds.length"
    popover-message="Move with image"
    tool-name="Pan"
    @click="activateTool('Pan', { mouseButtonMask: 1 })"
  >
    <font-awesome-icon icon="fa-solid fa-up-down-left-right" />
  </BaseTool>
</template>

<script setup lang="ts">
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';
import { activateTool } from '~/functions/Cornerstone';

const store = useGlobalStore();
</script>
