<template>
  <div>
    <div
      ref="fakeThumbnail"
      class="fake-thumbnail"
      :class="{ 'is-hidden': imageSrc }"
      @cornerstoneimagerendered="onCanvasImageRendered"
    />
    <img
      class="thumbnail"
      :src="imageSrc"
      alt="thumbnail"
      @click="store.displayImageInElement(store.mainImageContainer, imageId)"
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
      imageSrc: null,
    };
  },
  async mounted() {
    // Register image container
    await this.store.registerImageContainer(this.$refs['fakeThumbnail']);

    // Display image using cornerstone
    await this.store.displayImageInElement(this.$refs['fakeThumbnail'], this.imageId);
  },
  unmounted() {
    URL.revokeObjectURL(this.imageSrc);
  },
  methods: {
    convertCanvasImageToSrc() {
      return new Promise((resolve) => {
        const canvasElement = this.$refs['fakeThumbnail'].firstChild;
        canvasElement.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        });
      });
    },
    async onCanvasImageRendered() {
      // When canvas contains rendered image, convert it to src for later usage
      this.imageSrc = await this.convertCanvasImageToSrc();

      // We do not need this container anymore
      this.store.unregisterImageContainer(this.$refs['fakeThumbnail']);
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
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
  border: 1px solid global.$border-color;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  height: 100px;
  min-width: 80px;
}
</style>
