<template>
  <BaseTool
    popover-message="Upload images"
    :disabled="store.isLoopingImages || store.isComputingGrids"
    @click="openFileInput"
  >
    <font-awesome-icon icon="fa-solid fa-folder" />
  </BaseTool>
  <input
    ref="fileInput"
    class="file-input"
    type="file"
    multiple
    @change="handleFileInput"
  >
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';

import { loadImagesFromFiles } from '~/functions/Cornerstone';
import { useToast } from 'vuestic-ui';

const store = useGlobalStore();
const fileInput: Ref<HTMLInputElement|null> = ref(null);

const handleFileInput = async (): Promise<void> => {
  if (!fileInput.value) {
    return;
  }
  const files = Array.from(fileInput.value?.files || []);
  const loadedAllImages = await loadImagesFromFiles(files);
  if (loadedAllImages === false) {
    const { init } = useToast();
    init({ message: 'Some images could not be imported!', color: 'warning' });
  }
};

const openFileInput = (): void => {
  fileInput.value?.click();
};
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
