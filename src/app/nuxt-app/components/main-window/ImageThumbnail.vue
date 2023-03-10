<template>
  <article>
    <div
      ref="fakeThumbnail"
      class="fake-thumbnail"
      :class="{ 'is-hidden': imageSrc }"
      @cornerstoneimagerendered="onCanvasImageRendered"
    />
    <div class="thumbnail-wrapper">
      <va-chip
        size="small"
        square
      >
        {{ imageIdx }}
      </va-chip>
      <img
        class="thumbnail"
        :src="imageSrc"
        alt="thumbnail"
        @click="displayImageInElement(store.mainImageContainer, imageId)"
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import { registerImageContainer, unregisterImageContainer, displayImageInElement } from '../../functions/Cornerstone';
import { onMounted, onUnmounted, ref } from 'vue';
import type Ref from 'vue';

const store = useGlobalStore();

const imageSrc: Ref<string> = ref('');
const fakeThumbnail: Ref<HTMLElement> = ref(null);

const props = defineProps({
  imageId: {
    type: String,
    required: true,
  },
  imageIdx: {
    type: Number,
    required: true,
  },
});

const convertCanvasImageToSrc = () => {
  return new Promise((resolve) => {
    const canvasElement = fakeThumbnail.value.firstChild;
    canvasElement.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    });
  });
};

const onCanvasImageRendered = async() => {
  // When canvas contains rendered image, convert it to src for later usage
  imageSrc.value = await convertCanvasImageToSrc();

  // We do not need this container anymore
  unregisterImageContainer(fakeThumbnail.value);
};

onMounted(async () => {
  // Register image container
  await registerImageContainer(fakeThumbnail.value);

  // Display image using cornerstone
  await displayImageInElement(fakeThumbnail.value, props.imageId);
});

onUnmounted(() => {
  URL.revokeObjectURL(imageSrc.value);
});
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
.thumbnail-wrapper {
  position: relative;

  .va-chip {
    position: absolute;
    left: 15px;
  }

  .thumbnail {
    margin: 0 20px;
    border: 1px solid global.$border-color;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    height: 130px;
    min-width: 80px;
  }
}
</style>
