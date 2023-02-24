<template>
  <section id="main-window">
    <div
      id="dicom-image"
      ref="dicomImage"
      @cornerstonenewimage="onImageShown"
      @cornerstonetoolsmeasurementcompleted="onMeasurementCompleted"
      @cornerstonetoolsmeasurementremoved="onGridRemoved"
    >
      <va-file-upload
        v-if="!store.imageIds.length"
        v-model="files"
        class="file-upload"
        dropzone
        hide-file-list
        drop-zone-text="Drag in or"
        upload-button-text="Upload images"
        :disabled="store.imageIds.length > 0"
        @file-added="onFileAdded"
      />
    </div>
    <section id="image-thumbnails">
      <MainWindowImageThumbnail
        v-for="(imageId, idx) in store.imageIds"
        :key="imageId"
        :image-id="imageId"
        :image-idx="idx + 1"
      />
    </section>
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores';
import GridState from '~/functions/GridState.js';
import DicomHeaderParser from '~/functions/DicomHeaderParser.js';
import { registerImageContainer, registerAllTools, unregisterImageContainer, unregisterAllTools, loadImagesFromFiles, getGridTool, displayImageInElement } from '~/functions/Cornerstone.js';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      files: [],
    };
  },
  watch: {
    'store.imageIds': {
      deep: true,
      handler() {
        this.onNewImages();
      },
    },
  },
  mounted() {
    registerImageContainer(this.$refs['dicomImage'], true);
    registerAllTools();

    this.store.dicomHeaderParser = new DicomHeaderParser();
  },
  unmounted() {
    unregisterImageContainer(this.$refs['dicomImage'], true);
    unregisterAllTools();
  },
  methods: {
    onFileAdded() {
      loadImagesFromFiles(this.files);
      this.files = [];
    },
    onGridRemoved() {
      this.store.gridState = null;
    },
    onImageShown(e) {
      this.store.shownImageId = e.detail.image.imageId;
      const tool = getGridTool();
      if (tool) {
        this.store.gridState = new GridState(tool);
      }
      this.store.dicomHeaderParser = new DicomHeaderParser();
    },
    onMeasurementCompleted() {
      const tool = getGridTool();
      if (tool) {
        this.store.gridState = new GridState(tool);
      }
    },
    onNewImages() {
      displayImageInElement(this.store.mainImageContainer, this.store.imageIds[0]);
      registerAllTools();
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
#main-window {
  display: grid;
  border-top: 2px solid global.$border-color;
  height: calc(100vh - global.$top-panel-height);

  #dicom-image {
    background: black;
    height: calc(100vh - global.$top-panel-height - global.$bottom-image-thumbnails-height);
    max-width: 100%;
    overflow: hidden;

    .file-upload {
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
  }
}
</style>
