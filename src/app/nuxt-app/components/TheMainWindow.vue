<template>
  <section class="main-window">
    <div
      id="dicom-image"
      ref="dicomImageContainer"
    />
    <section class="image-thumbnails">
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

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  mounted() {
    this.$refs['dicomImageContainer'].addEventListener('cornerstoneimagerendered', this.store.registerAllTools);
  },
  beforeUnmount() {
    this.$refs['dicomImageContainer'].removeEventListener('cornerstoneimagerendered', this.store.registerAllTools);
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
.main-window {
  display: grid;
  border: 2px solid #5b5bd0;
  height: calc(100vh - global.$top-panel-height);

  #dicom-image {
    height: calc(100vh - global.$top-panel-height - global.$bottom-image-thumbnails-height);
  }

  .image-thumbnails {
    display: flex;
    align-items: center;
    border-top: 2px solid #5b5bd0;
    overflow: auto;
    max-width: 100%;
    height: global.$bottom-image-thumbnails-height;
  }
}
</style>
