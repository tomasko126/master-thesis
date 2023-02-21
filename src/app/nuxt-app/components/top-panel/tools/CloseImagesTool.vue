<template>
  <BaseTool
    popover-message="Remove images"
    :disabled="store.isLoopingImages || !store.imageIds.length"
    @click="removeImages"
  >
    <font-awesome-icon icon="fa-solid fa-trash-can" />
  </BaseTool>
</template>

<script>
import { useGlobalStore } from '~/stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseTool from './BaseTool.vue';

export default {
  components: {
    BaseTool,
    FontAwesomeIcon,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  methods: {
    removeImages() {
      this.store.removeImages();
    },
  },
};
</script>
