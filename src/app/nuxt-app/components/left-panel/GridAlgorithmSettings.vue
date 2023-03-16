<template>
  <GeneralTabContent>
    <GeneralTabSection label-text="Grid algorithm parameters" />
    <va-divider />
    <GeneralTabSection
      label-text="Curvature coefficient:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.curvature"
        type="number"
        min="0"
        step="0.0005"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Force coefficient:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.force"
        type="number"
        min="0"
        step="0.025"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Stop time:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.stopTime"
        type="number"
        min="0"
        step="0.005"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <div class="start-computation">
      <va-button
        :disabled="isButtonDisabled"
        @click="computeGrids"
      >
        Compute
      </va-button>
    </div>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { computed, toRaw, unref } from 'vue';
import { useFetch } from 'nuxt/app';
import Communication from '../../functions/Communication';
import { useGlobalStore } from '~/stores';
import type { GridCommunication } from '~/functions/types/GridCommunication';

const store = useGlobalStore();

const inputRules = computed(() => {
  return [
    (value: string) => (value && value.length !== 0 && !isNaN(parseInt(value))) || !store.imageIds.length || 'This field is required and must be a number',
    (value: string) => parseInt(value) >= 0 || !store.imageIds.length || 'Value must be bigger or equal to 0',
  ];
});

const isButtonDisabled = computed(() => {
  return store.isLoopingImages || !store.imageIds.length || !store.gridState?.tool.hasGridForImageIds(store.imageIds);
});

const computeGrids = async () => {
  const comm = new Communication();
  const requestBody: GridCommunication.Request.Body = await comm.buildRequestBody();

  const { data } = await useFetch('/api/grid', { method: 'post', body: requestBody });
  const responseBody = toRaw(unref(data)) as GridCommunication.Response.BodyData;

  for (const grid of responseBody.grids) {
    store.gridState?.tool.setStateForImageIds([], [grid.imageId]);
    store.gridState?.tool.setStateForImageIds(grid.primaryLines, [grid.imageId], grid.includesRefinementPoints);
  }
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
