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
      @click="store.displayImageInMainWindow(imageId)"
    >
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  props: {
    imageId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      pngBlobImageSource: null,
    };
  },
  async mounted() {
    await this.store.registerImageContainer(this.$refs['fakeThumbnail']);
    await this.store.displayImageInElement(this.$refs['fakeThumbnail'], this.imageId);
    setTimeout(() => {
      this.convertCanvasToBlob();
      this.store.unregisterImageContainer(this.$refs['fakeThumbnail']);
    }, 250);
  },
  unmounted() {
    URL.revokeObjectURL(this.pngBlobImageSource);
  },
  methods: {
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
  padding: 5px;
  cursor: pointer;
  height: 100px;
  min-width: 80px;
}
</style>
