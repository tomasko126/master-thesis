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

import BaseTool from './BaseTool.vue';

import { useGlobalStore } from '~/stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { startLoopingImages, stopLoopingImages } from '~/functions/Cornerstone.js';

export default {
  name: 'PlayPauseTool',
  components: {
    FontAwesomeIcon,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store, startLoopingImages, stopLoopingImages };
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
          startLoopingImages(); // continue looping images with updated animation settings
        }
      },
    },
  },
  methods: {
  },
};
</script>
