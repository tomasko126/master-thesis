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
        @click="onThumbnailClick"
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { registerImageContainer, unregisterImageContainer, displayImageInElement } from '~/functions/Cornerstone'
import { useGlobalStore } from '~/stores'

const store = useGlobalStore()

const imageSrc: Ref<string> = ref('')
const fakeThumbnail: Ref<HTMLElement|null> = ref(null)

const props = defineProps({
  imageId: {
    type: String,
    required: true,
  },
  imageIdx: {
    type: Number,
    required: true,
  },
})

const onThumbnailClick = (): void => {
  displayImageInElement(store.mainImageContainer as HTMLElement, props.imageId as string)
}

const convertCanvasImageToSrc = (): Promise<string|null> => {
  return new Promise((resolve) => {
    const canvasElement = fakeThumbnail?.value?.firstChild as HTMLCanvasElement
    canvasElement.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob))
      } else {
        resolve(null)
      }
    })
  })
}

const onCanvasImageRendered = async(): Promise<void> => {
  // When canvas contains rendered image, convert it to src for later usage
  const imageSource = await convertCanvasImageToSrc()
  if (!imageSource) {
    console.error('Thumbnails could not have been created!')
  } else {
    imageSrc.value = imageSource
  }

  // We do not need this container anymore
  unregisterImageContainer(fakeThumbnail.value as HTMLElement)
}

onMounted(async () => {
  // Register image container
  await registerImageContainer(fakeThumbnail.value as HTMLElement)

  // Display image using cornerstone
  await displayImageInElement(fakeThumbnail.value as HTMLElement, props.imageId as string)
})

onUnmounted(() => {
  URL.revokeObjectURL(imageSrc.value)
})
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
