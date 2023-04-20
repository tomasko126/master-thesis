<template>
  <GeneralTabContent>
    <GeneralTabSection label-text="Grid algorithm parameters" />
    <va-divider />
    <GeneralTabSection
      label-text="Curvature coefficient:"
      popover-message="Describes the dependence of the grid evolution on the curvature. Higher number means higher dependence."
    >
      <va-input
        v-model="store.algorithm.curvature"
        type="number"
        min="0"
        step="0.0005"
        :disabled="isButtonDisabled"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Force coefficient:"
      popover-message="Grid forcing term dependence on the image gradient. Higher number means higher dependence."
    >
      <va-input
        v-model="store.algorithm.force"
        type="number"
        min="0"
        step="0.025"
        :disabled="isButtonDisabled"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Stop time:"
      popover-message="Time interval of the numerical computation."
    >
      <va-input
        v-model="store.algorithm.stopTime"
        type="number"
        min="0"
        step="0.005"
        :disabled="isButtonDisabled"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <div class="start-computation">
      <va-popover
        :message="popoverMessage"
        prevent-overflow
        stick-to-edges
      >
        <va-button
          v-if="!isButtonDisabled || !store.isComputingGrids"
          :disabled="isButtonDisabled"
          @click="computeGrids"
        >
          Compute
        </va-button>
        <va-button v-else-if="store.isComputingGrids"
          color="danger"
          icon="close"
          @click="abortRequest"
        >
          Cancel computation
        </va-button>
      </va-popover>
    </div>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';
import Communication from '../../functions/Communication';
import { useGlobalStore } from '~/stores';
import type { GridCommunication } from '~/functions/types/GridCommunication';
import { $fetch, FetchError } from 'ofetch';
import { GridToolOptions } from '~/functions/types/GridTool';

const store = useGlobalStore();
const abortController: Ref<AbortController|null> = ref(null);

const inputRules = computed(() => {
  return [
    (value: string) => (value && value.length !== 0 && !isNaN(parseInt(value))) || !store.imageIds.length || 'This field is required and must be a number',
    (value: string) => parseInt(value) >= 0 || !store.imageIds.length || 'Value must be bigger or equal to 0',
  ];
});

const isButtonDisabled = computed(() => {
  return store.isLoopingImages || !store.imageIds.length || !store.gridState?.tool.hasGridForImageIds(store.imageIds) || store.isComputingGrids;
});

const popoverMessage = computed(() => {
  if (isButtonDisabled.value) {
    return 'Grid must be created on every image in order to compute exact grid placements';
  }
  return 'Compute grid placement for every grid';
});

const addAdditionalDataToPrimaryLine = (primaryLine: GridToolOptions.compactPrimaryLine): GridToolOptions.primaryLine => {
  return {
    active: false,
    color: undefined,
    handles: {
      points: primaryLine.points.map((point: GridToolOptions.compactGridPoint): GridToolOptions.gridPoint => {
        return {
          x: point.x,
          y: point.y,
          isCommonPoint: point.isCommonPoint,
          highlight: false,
          active: false,
          lines: [],
        }
      }),
    },
    invalidated: false,
    uuid: primaryLine.uuid,
    visible: true,
  };

};

const computeGrids = async (): Promise<void> => {
  store.isComputingGrids = true;
  const comm = new Communication();
  const requestBody: GridCommunication.Request.Body = await comm.buildRequestBody();

  try {
    abortController.value = typeof AbortController !== 'undefined' ? new AbortController() : {} as AbortController;

    const responseData: GridCommunication.Response.BodyData = await $fetch('/api/grid', { method: 'post', body: requestBody, signal: abortController.value?.signal });

    for (const grid of responseData.grids) {
      store.gridState?.tool.setStateForImageIds([], [grid.imageId]);

      const primaryLines = grid.primaryLines.map((primaryLine) => addAdditionalDataToPrimaryLine(primaryLine));
      store.gridState?.tool.setStateForImageIds(primaryLines, [grid.imageId], grid.includesRefinementPoints);
    }
  } catch (e) {
    if (!(e instanceof FetchError)) {
      throw e;
    }
  } finally {
    store.isComputingGrids = false;
    abortController.value = null;
  }
};

const abortRequest = (): void => {
  abortController.value?.abort();
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
.va-input {
  max-width: 100px;
  min-width: 100px;
}
.start-computation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
}
.va-divider {
  padding: 0 5px;
  &:before, &:after {
    border-top-color: global.$va-divider-color;
  }
}
</style>
