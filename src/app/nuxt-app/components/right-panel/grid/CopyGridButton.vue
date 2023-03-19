<template>
  <va-popover
    :message="popoverMessage"
    prevent-overflow
    stick-to-edges
  >
    <va-button
      :disabled="!store.hasImageDefinedGrid"
      @click="showModal = !showModal"
    >
      Copy grid to all images
    </va-button>
  </va-popover>
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
import { ref, toRaw, computed } from 'vue';
import { useGlobalStore } from '~/stores';

const store = useGlobalStore();

const showModal = ref(false);

const popoverMessage = computed(() => {
  if (!store.hasImageDefinedGrid) {
    return 'To copy grid to other images, a grid must be defined first';
  }
  return 'Copies grid on current image to all images';
});

const copyGrid = () => {
  const gridTool = store?.gridState?.tool;
  const gridState = store?.gridState?.state;
  if (!gridTool || !gridState) {
    return;
  }
  gridTool.setStateForImageIds(toRaw(gridState), store.imageIds, store.gridState?.isShowingRefinementPoints() as boolean);
};
</script>
