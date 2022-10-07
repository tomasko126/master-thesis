<template>
  <section class="main-window">
    <div
      id="dicom-image"
      ref="dicomImageContainer"
    />
    <section class="image-thumbnails">
      <MainWindowImageThumbnail
        v-for="imageId in imageIds"
        :key="imageId"
        :image-id="imageId"
      />
    </section>
  </section>
</template>

<script>
import { mapState } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  computed: {
    ...mapState(useGlobalStore, {
      imageIds: 'imageIds',
    }),
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
.main-window {
  display: grid;
  border: 2px solid #5b5bd0;
  border-radius: 3px;
  height: calc(100vh - global.$top-panel-height);

  .image-thumbnails {
    display: flex;
    align-items: center;
    border-top: 2px solid #5b5bd0;
    overflow: auto;
    max-width: 100%;
  }
}
</style>
