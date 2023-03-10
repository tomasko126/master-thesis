<template>
  <BaseTool
    popover-message="Remove images"
    :disabled="store.isLoopingImages || !store.imageIds.length"
    @click="removeImages"
  >
    <font-awesome-icon icon="fa-solid fa-trash-can" />
  </BaseTool>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../../stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { removeImages } from '../../../functions/Cornerstone';
import BaseTool from './BaseTool.vue';

const store = useGlobalStore();
</script>
