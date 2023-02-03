<template>
  <section id="main-window">
    <div
      id="dicom-image"
      ref="dicomImage"
      @cornerstonetoolsmeasurementcompleted="onMeasurementCompleted"
    />
    <section id="image-thumbnails">
      <MainWindowImageThumbnail
        v-for="imageId in store.imageIds"
        :key="imageId"
        :image-id="imageId"
      />
    </section>
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

/* global cornerstone */

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  watch: {
    'store.shownImageId'(newImageId) {
      this.displayImage(newImageId);
    },
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
    async displayImage(imageId) {
      if (!imageId) {
        return;
      }
      const image = await cornerstone.loadAndCacheImage(imageId);
      cornerstone.displayImage(this.$refs['dicomImage'], image);
    },
    onMeasurementCompleted(e) {
      console.log('measurement completed');
      console.log(e);
    },
    onNewImages() {
      this.store.registerAllTools();
    },
  }
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
#main-window {
  display: grid;
  border: 2px solid #5b5bd0;
  height: calc(100vh - global.$top-panel-height);

  #dicom-image {
    height: calc(100vh - global.$top-panel-height - global.$bottom-image-thumbnails-height);
    max-width: 100%;
    overflow: hidden;
  }

  #image-thumbnails {
    display: flex;
    align-items: center;
    border-top: 2px solid #5b5bd0;
    overflow: auto;
    max-width: 100%;
    height: global.$bottom-image-thumbnails-height;
  }
}
</style>
