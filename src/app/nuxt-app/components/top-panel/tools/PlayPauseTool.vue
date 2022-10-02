<template>
  <BaseTool
    label="Play"
    tool-name="PlayTool"
    is-custom-tool
    @click="isLoopingImages ? stopLoopingImages() : startLoopingImages()"
  >
    <template #icon>
      <IconPlay v-if="!isLoopingImages" />
      <IconStop v-else />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconPlay, IconStop } from '@iconify-prerendered/vue-fa6-solid';

import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  name: 'PlayPauseTool',
  components: {
    IconStop,
    BaseTool,
    IconPlay,
  },
  computed: {
    ...mapState(useGlobalStore, {
      isLoopingImages: 'isLoopingImages',
    }),
  },
  methods: {
    ...mapActions(useGlobalStore, {
      startLoopingImages: 'startLoopingImages',
      stopLoopingImages: 'stopLoopingImages',
    }),
  },
};
</script>
