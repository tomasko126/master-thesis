<template>
  <section class="left-panel">
    <LeftPanelImageThumbnail
      v-for="imageId in imageIds"
      :key="imageId"
      :image-id="imageId"
    />
  </section>
</template>

<script>
import { mapState } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  computed: {
    ...mapState(useGlobalStore, {
      imageIds: 'imageIds',
    }),
  },
};
</script>

<style lang="scss" scoped>
.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
</style>
