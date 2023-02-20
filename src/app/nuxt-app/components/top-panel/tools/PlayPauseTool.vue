<template>
  <BaseTool
    :disabled="store.imageIds.length < 2"
    :popover-message="labelName"
    @click="store.isLoopingImages ? stopLoopingImages() : startLoopingImages()"
  >
    <font-awesome-icon
      v-if="!store.isLoopingImages"
      icon="fa-solid fa-play"
    />
    <font-awesome-icon
      v-else
      icon="fa-solid fa-stop"
    />
  </BaseTool>
</template>

<script>

/* global cornerstoneTools */
import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
  watch: {
    'store.animation': {
      deep: true,
      handler() {
        if (this.store.isLoopingImages) {
          this.startLoopingImages(); // continue looping images with updated animation settings
        }
      },
    },
  },
  methods: {
    /**
     * Start looping selected images in the main window
     * @returns {Promise<void>}
     */
    async startLoopingImages() {
      this.store.isLoopingImages = true;
      cornerstoneTools.playClip(this.store.mainImageContainer, this.store.animation.speed, { fromIdx: this.store.animation.fromIdx, toIdx: this.store.animation.toIdx });
    },
    stopLoopingImages() {
      cornerstoneTools.stopClip(this.store.mainImageContainer);
      this.store.isLoopingImages = false;
    },
  },
};
</script>
