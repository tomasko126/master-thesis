<template>
  <BaseTool
    label="Play"
    tool-name="PlayTool"
    is-custom-tool
    @click="store.isLoopingImages ? store.stopLoopingImages() : store.startLoopingImages()"
  >
    <template #icon>
      <IconPlay v-if="!store.isLoopingImages" />
      <IconStop v-else />
    </template>
  </BaseTool>
</template>

<script>
import BaseTool from './BaseTool.vue';
import { IconPlay, IconStop } from '@iconify-prerendered/vue-fa6-solid';

import { useGlobalStore } from '~/stores/index';

export default {
  name: 'PlayPauseTool',
  components: {
    IconStop,
    BaseTool,
    IconPlay,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
};
</script>
