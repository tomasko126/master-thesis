<template>
  <section id="main-window">
    <div
      id="dicom-image"
      ref="dicomImage"
      @cornerstonenewimage="onImageShown"
      @cornerstonetoolsmeasurementcompleted="onMeasurementCompleted"
      @cornerstonetoolsmeasurementremoved="onGridRemoved"
      @cornerstonetoolsclipstopped="onClipStopped"
    >
      <va-file-upload
        v-if="!store.imageIds.length"
        v-model="files"
        dropzone
        hide-file-list
        drop-zone-text="Drag in or"
        upload-button-text="Upload DICOM images"
        :disabled="store.imageIds.length > 0"
        @file-added="onFileAdded"
      />
    </div>
    <section id="image-thumbnails" :class="{ 'is-image-shown': !!store.shownImageId }">
      <MainWindowImageThumbnail
        v-for="(imageId, idx) in store.imageIds"
        :key="imageId"
        :image-id="imageId"
        :image-idx="idx + 1"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, Ref } from 'vue';
import { VaFile } from 'vuestic-ui';
import GridState from '../functions/GridState';
import DicomHeaderParser from '../functions/DicomHeaderParser';
import { registerImageContainer, registerAllTools, unregisterImageContainer, unregisterAllTools, loadImagesFromFiles, getGridTool, displayImageInElement } from '../functions/Cornerstone';
import { useGlobalStore } from '~/stores';

const store = useGlobalStore();

const files: Ref<VaFile[]> = ref([]);
const dicomImage: Ref<HTMLElement|null> = ref(null);

const onFileAdded = () => {
  if (files.value) {
    loadImagesFromFiles(files.value);
    files.value = [];
  }
};

const onGridRemoved = () => {
  store.gridState = null;
};

const onClipStopped = () => {
  store.isLoopingImages = false;
};

const onImageShown = (e: CustomEvent) => {
  store.shownImageId = e.detail.image.imageId;
  const tool = getGridTool();
  if (tool) {
    store.gridState = new GridState(tool);
  }
  store.dicomHeaderParser = new DicomHeaderParser();
};

const onMeasurementCompleted = () => {
  const tool = getGridTool();
  if (tool) {
    store.gridState = new GridState(tool);
  }
};

const onNewImages = () => {
  displayImageInElement(store.mainImageContainer as HTMLElement, store.imageIds[0]);
  registerAllTools();
};

watch(() => store.imageIds, () => {
  onNewImages();
});

onMounted(() => {
  registerImageContainer(dicomImage.value as HTMLElement, true);
  registerAllTools();

  store.dicomHeaderParser = new DicomHeaderParser();
});

onUnmounted(() => {
  unregisterImageContainer(dicomImage.value as HTMLElement, true);
  unregisterAllTools();
});
</script>

<style lang="scss" scoped>
@use 'assets/global';
#main-window {
  display: grid;
  border-top: 2px solid global.$border-color;
  height: calc(100vh - global.$top-panel-height);

  #dicom-image {
    background: black;
    height: calc(100vh - global.$top-panel-height - global.$bottom-image-thumbnails-height - 2px);
    max-width: 100%;
    overflow: hidden;

    .va-file-upload {
      height: 100%;
      background-color: black !important;

      :deep(.va-file-upload__field) {
        height: inherit;
      }
    }
  }

  #image-thumbnails {
    display: flex;
    align-items: center;
    background: black;
    overflow: auto;
    max-width: 100%;
    height: global.$bottom-image-thumbnails-height;
    border-bottom: 2px solid global.$border-color;

    &.is-image-shown {
      border-top: 2px solid global.$border-color;
    }
  }
}
</style>
