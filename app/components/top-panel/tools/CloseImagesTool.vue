w<template>
  <BaseTool
    popover-message="Remove images"
    :disabled="store.isLoopingImages || !store.imageIds.length || store.animation.isComputingGrids"
    @click="removeImages"
  >
    <font-awesome-icon icon="fa-solid fa-trash-can" />
  </BaseTool>
</template>

<script setup lang="ts">
import BaseTool from './BaseTool.vue';
import { removeImages } from '~/functions/Cornerstone';
import { useGlobalStore } from '~/stores';

const store = useGlobalStore();
</script>
