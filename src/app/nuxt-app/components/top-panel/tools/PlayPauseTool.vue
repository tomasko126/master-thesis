<template>
  <BaseTool
    :disabled="store.imageIds.length < 2"
    :popover-message="labelName"
    @click="store.isLoopingImages ? stopLoopingImages() : startLoopingImages()"
  >
    <font-awesome-icon
      v-if="!store.isLoopingImages"
      icon="fa-solid fa-play"
    />
    <font-awesome-icon
      v-else
      icon="fa-solid fa-stop"
    />
  </BaseTool>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';
import { startLoopingImages, stopLoopingImages } from '~/functions/Cornerstone';

const store = useGlobalStore();

const labelName = computed(() => {
  if (store.isLoopingImages) {
    return 'Stop playing animation';
  }
  return 'Play animation';
});

watch(() => store.animation, () => {
  if (store.isLoopingImages) {
    startLoopingImages(); // continue looping images with updated animation settings
  }
});
</script>
