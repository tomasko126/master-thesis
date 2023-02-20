<template>
  <section id="main-window">
    <div
      id="dicom-image"
      ref="dicomImage"
      @cornerstonenewimage="onImageShown"
      @cornerstonetoolsmeasurementcompleted="onMeasurementCompleted"
      @cornerstonetoolsmeasurementremoved="onGridRemoved"
    />
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
/* global cornerstoneTools */

import { useGlobalStore } from '~/stores/index';
import MeasurementData from '~/functions/MeasurementData.js';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
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
    this.store.registerImageContainer(this.$refs['dicomImage'], true);
    this.store.registerAllTools();
  },
  unmounted() {
    this.store.unregisterImageContainer(this.$refs['dicomImage'], true);
    this.store.unregisterAllTools();
  },
  methods: {
    onGridRemoved() {
      this.store.measurementData = null;
    },
    onImageShown(e) {
      this.store.shownImageId = e.detail.image.imageId;
      const tool = cornerstoneTools.getToolForElement(this.store.mainImageContainer, 'Grid');
      if (tool) {
        this.store.measurementData = new MeasurementData(tool);
      }
    },
    onMeasurementCompleted() {
      const tool = cornerstoneTools.getToolForElement(this.store.mainImageContainer, 'Grid');
      if (tool) {
        this.store.measurementData = new MeasurementData(tool);
      }
    },
    onNewImages() {
      this.store.displayImageInElement(this.store.mainImageContainer, this.store.imageIds[0]);
      this.store.registerAllTools();
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
#main-window {
  display: grid;
  border: 2px solid global.$border-color;
  height: calc(100vh - global.$top-panel-height);

  #dicom-image {
    height: calc(100vh - global.$top-panel-height - global.$bottom-image-thumbnails-height);
    max-width: 100%;
    overflow: hidden;
  }

  #image-thumbnails {
    display: flex;
    align-items: center;
    border-top: 2px solid global.$border-color;
    overflow: auto;
    max-width: 100%;
    height: global.$bottom-image-thumbnails-height;
    background-color: #081021;
  }
}
</style>
