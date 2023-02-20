<template>
  <BaseTool
    popover-message="Open images"
    :disabled="store.isLoopingImages"
    @click="openFileInput"
  >
    <template #icon>
      <font-awesome-icon icon="fa-solid fa-folder" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
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
