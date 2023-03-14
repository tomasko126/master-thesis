<template>
  <va-button
    :disabled="!store.hasImageDefinedGrid"
    @click="showModal = !showModal"
  >
    Copy grid to all images
  </va-button>
  <va-modal
    v-model="showModal"
    title="Copy grid to other images"
    message="Are you sure to copy grid to all other images? This will replace all existing grids on other images!"
    ok-text="Yes"
    cancel-text="No"
    blur
    @ok="copyGrid"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalStore } from '~/stores';

const store = useGlobalStore();

const showModal = ref(false);

const copyGrid = () => {
  const gridTool = store?.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.copyGridToAllImages();
};
</script>
