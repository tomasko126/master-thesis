<template>
  <section class="main-window">
    <input
      type="file"
      multiple
      @change="handleFileInput"
    >
    <div
      ref="dicomImage"
      class="dicom-image"
    />
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import { useGlobalStore } from '../stores/index'

export default {
  methods: {
    ...mapActions(useGlobalStore, {
      loadImagesFromFiles: 'loadImagesFromFiles',
    }),
    async handleFileInput(event) {
      await this.loadImagesFromFiles(event.target.files, this.$refs['dicomImage']);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "assets/global";
.main-window {
  border: 2px solid global.$color-active;
  border-radius: 8px;

  .dicom-image {
    height: calc(100vh - global.$top-panel-height)
  }
}
</style>
