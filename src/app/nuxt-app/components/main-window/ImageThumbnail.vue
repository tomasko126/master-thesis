<template>
  <div>
    <div
      ref="fakeThumbnail"
      class="fake-thumbnail"
      :class="{ 'is-hidden': pngBlobImageSource }"
    />
    <img
      class="thumbnail"
      :src="pngBlobImageSource"
      alt=""
      @click="displayImageInMainWindow(imageId)"
    >
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  props: {
    'imageId': {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pngBlobImageSource: null,
    };
  },
  async mounted() {
    await this.registerImageContainer(this.$refs['fakeThumbnail']);
    await this.displayImageInElement(this.$refs['fakeThumbnail'], this.imageId);
    setTimeout(() => {
      this.convertCanvasToBlob();
      this.unregisterImageContainer(this.$refs['fakeThumbnail']);
    }, 250);
  },
  unmounted() {
    URL.revokeObjectURL(this.pngBlobImageSource);
  },
  methods: {
    ...mapActions(useGlobalStore, {
      displayImageInElement: 'displayImageInElement',
      displayImageInMainWindow: 'displayImageInMainWindow',
      registerImageContainer: 'registerImageContainer',
      unregisterImageContainer: 'unregisterImageContainer',
    }),
    convertCanvasToBlob() {
      /** @type {HTMLCanvasElement} **/
      return new Promise((resolve) => {
        const canvasElement = this.$refs['fakeThumbnail'].firstChild;
        canvasElement.toBlob((blob) => {
          this.pngBlobImageSource = URL.createObjectURL(blob);
          resolve();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fake-thumbnail {
  width: 200px;
  height: 200px;
  margin: 20px;
  opacity: 0;

  &.is-hidden {
    display: none;
  }
}
.thumbnail {
  margin: 0 20px;
  border: 1px solid #2d47d2;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  height: 100px;
}
</style>
