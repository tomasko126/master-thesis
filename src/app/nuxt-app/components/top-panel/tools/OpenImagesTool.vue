<template>
  <BaseTool
    label="Open images"
    tool-name="Open images"
    @click="openFileInput"
  >
    <template #icon>
      <IconFolderOpen />
    </template>
  </BaseTool>
  <input
    ref="fileInput"
    class="file-input"
    type="file"
    multiple
    @change="handleFileInput"
  >
</template>

<script>
import { useGlobalStore } from '~/stores/index';

import BaseTool from './BaseTool.vue';
import { IconFolderOpen } from '@iconify-prerendered/vue-fa6-solid';

export default {
  components: {
    IconFolderOpen,
    BaseTool,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  methods: {
    async handleFileInput() {
      await this.store.loadImagesFromFiles(this.$refs['fileInput'].files);
    },
    openFileInput() {
      this.$refs['fileInput'].click();
    },
  },
};
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
