<template>
  <BaseTool
    :label="labelName"
    tool-name="PlayTool"
    @click="store.isLoopingImages ? stopLoopingImages() : startLoopingImages()"
  >
    <template #icon>
      <font-awesome-icon
        v-if="!store.isLoopingImages"
        icon="fa-solid fa-play"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-stop"
      />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { sleep } from '~/functions/utils';

export default {
  name: 'PlayPauseTool',
  components: {
    FontAwesomeIcon,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  computed: {
    labelName() {
      if (this.store.isLoopingImages) {
        return `Stop playing animation`;
      }
      return `Play animation`;
    },
  },
  methods: {
    /**
     * Start looping selected images in the main window
     * @returns {Promise<void>}
     */
    async startLoopingImages() {
      this.store.isLoopingImages = true;

      const leftImageIds = this.store.imageIds.slice(this.store.imageIds.indexOf(this.store.shownImageId), this.store.animation.toIdx + 1);
      for (const imageId of leftImageIds) {
        if (!this.store.isLoopingImages) {
          return;
        }
        this.store.shownImageId = imageId;
        if (!this.store.isLoopingImages) {
          return;
        }
        await sleep(this.store.animation.speed);
      }

      const allSelectedImages = this.store.imageIds.slice(this.store.animation.fromIdx, this.store.animation.toIdx + 1);
      while (this.store.isLoopingImages) {
        for (const imageId of allSelectedImages) {
          if (!this.store.isLoopingImages) {
            return;
          }
          this.store.shownImageId = imageId;
          if (!this.store.isLoopingImages) {
            return;
          }
          await sleep(this.store.animation.speed);
        }
      }
    },
    stopLoopingImages() {
      this.store.isLoopingImages = false;
    },
  },
};
</script>
