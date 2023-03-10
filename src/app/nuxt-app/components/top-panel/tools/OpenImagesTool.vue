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
import { useGlobalStore } from '../../../stores';

import BaseTool from './BaseTool.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadImagesFromFiles } from '../../../functions/Cornerstone';
import { ref } from 'vue';
import type Ref from 'vue';

const store = useGlobalStore();
const fileInput: Ref<HTMLElement> = ref(null);

const handleFileInput = async() => {
  await loadImagesFromFiles(fileInput.value.files);
};

const openFileInput = () => {
  fileInput.value.click();
};
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
