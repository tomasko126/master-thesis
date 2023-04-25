<template>
  <va-popover
    :message="popoverMessage"
    prevent-overflow
    stick-to-edges
  >
    <span>
      <va-button
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        @click="showModal = !showModal"
      >
        Copy grid to all images
      </va-button>
    </span>
  </va-popover>
  <va-modal
    v-model="showModal"
    title="Copy grid to other images"
    blur
    hide-default-actions
    :no-dismiss="showLoadingState"
  >
    <template #default>
      <p>Are you sure to copy grid to all other images?</p>
      <p>This will replace all existing grids on other images!</p>

      <div class="modal-buttons">
        <va-button @click="copyGrid" :loading="showLoadingState">Yes</va-button>
        <va-button @click="hideModal">No</va-button>
      </div>
    </template>
  </va-modal>
</template>
<script setup lang="ts">
import { ref, toRaw, computed } from 'vue'
import { useGlobalStore } from '~/stores'
import { refreshGridData } from '~/functions/General'

const store = useGlobalStore()

const showModal = ref(false)
const showLoadingState = ref(false)

const popoverMessage = computed(() => {
  if (!store.hasImageDefinedGrid) {
    return 'To copy grid to other images, it must be created first'
  }
  return 'Copy grid from current image to all images'
});

const copyGrid = async (): Promise<void> => {
  const gridTool = store?.gridState?.tool
  const gridState = store?.gridState?.state

  if (!gridTool || !gridState) {
    showModal.value = false
    return
  }

  showLoadingState.value = true

  gridTool.setStateForImageIds(toRaw(gridState), store.imageIds, store.gridState?.isShowingRefinementPoints() as boolean)
  await refreshGridData()

  showModal.value = false
  showLoadingState.value = false
}

const hideModal = (): void => {
  showModal.value = false
}
</script>

<style lang="scss" scoped>
.modal-buttons {
  display: flex;
  margin-top: 20px;

  button {
    margin: 0 10px 0 0;
  }
}
</style>
