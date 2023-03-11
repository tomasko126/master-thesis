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
    message="Are you sure to copy grid to all other images? This will delete all existing grids declared on other images!"
    ok-text="Yes"
    cancel-text="No"
    blur
    @ok="copyGrid"
  />
</template>
<script setup lang="ts">
import { useGlobalStore } from '../../../stores';
import { getGridTool } from '../../../functions/Cornerstone';
import { ref } from 'vue';

const store = useGlobalStore();

const showModal = ref(false);

const copyGrid = () => {
  const gridTool = getGridTool();
  if (!gridTool) {
    return;
  }
  gridTool.copyGridToAllImages();
};
</script>
