<template>
  <BaseTool
    popover-message="Upload images"
    :disabled="store.isLoopingImages"
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
import { ref, Ref } from 'vue';
import BaseTool from './BaseTool.vue';
import { useGlobalStore } from '~/stores';

import { loadImagesFromFiles } from '~/functions/Cornerstone';

const store = useGlobalStore();
const fileInput: Ref<HTMLInputElement|null> = ref(null);

const handleFileInput = () => {
  if (!fileInput.value) {
    return;
  }
  const files = Array.from(fileInput.value.files || []);
  loadImagesFromFiles(files);
};

const openFileInput = () => {
  fileInput.value?.click();
};
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
