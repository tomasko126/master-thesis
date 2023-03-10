<template>
  <GeneralTabContent title="Animation">
    <GeneralTabSection label-text="Speed:">
      <va-slider
        id="animation-speed"
        v-model="speed"
        :disabled="areInputsDisabled"
        track-label-visible
        :min="1"
        :max="30"
      >
        <template #trackLabel="slotProps">
          {{ `${slotProps.value} FPS` }}
        </template>
      </va-slider>
    </GeneralTabSection>
    <GeneralTabSection
      label-text="From image:"
      align-items="baseline"
    >
      <va-input
        v-model="fromIdx"
        type="number"
        :disabled="areInputsDisabled || store.isLoopingImages"
        :min="store.imageIds ? 1 : 0"
        :max="store.imageIds ? store.imageIds.length - 1 : 1"
        :rules="fromImageRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="To image:"
      align-items="baseline"
    >
      <va-input
        v-model="toIdx"
        type="number"
        :disabled="areInputsDisabled || store.isLoopingImages"
        :min="store.imageIds ? 1 : 0"
        :max="store.imageIds ? store.imageIds.length : 1"
        :rules="toImageRules"
      />
    </GeneralTabSection>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import {computed, ref, watch} from 'vue';

const store = useGlobalStore();

const fromIdx = ref(store.animation.fromIdx + 1);
const toIdx = ref(store.animation.toIdx + 1);
const speed = ref(30);

const areInputsDisabled = computed(() => {
  return store.imageIds.length < 2;
});

const fromImageRules = computed(() => {
  if (store.imageIds.length === 1) {
    return [
      (value) => parseInt(value) === 1 || `Value must be set to 1`,
    ];
  }
  return [
    (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !store.imageIds.length || `This field is required and must be a number`,
    (value) => parseInt(value) > 0 || !store.imageIds.length || `Value must be bigger than 0`,
    (value) => parseInt(value) <= store.imageIds.length - 1 || !store.imageIds.length || `Value must be lower than ${store.imageIds.length - 1}`,
    (value) => parseFloat(value) === parseInt(value) || `Value must not be a decimal number`,
  ];
});

const toImageRules = () => {
  if (store.imageIds.length === 1) {
    return [
      (value) => parseInt(value) === 1 || `Value must be set to 1`,
    ];
  }
  return [
    (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !store.imageIds.length || `This field is required and must be a number`,
    (value) => parseInt(value) > fromIdx.value && parseInt(value) > 0 || !store.imageIds.length || `Value must be bigger than ${fromIdx.value}`,
    (value) => parseInt(value) <= store.imageIds.length || `Value must be lower than ${store.imageIds.length + 1}`,
    (value) => parseFloat(value) === parseInt(value) || `Value must not be a decimal number`,
  ];
};

watch(fromIdx, (value) => {
  store.animation.fromIdx = value - 1;
});

watch(toIdx, (value) => {
  store.animation.toIdx = value - 1;
});

watch(speed, (value) => {
  store.animation.speed = value;
});

watch(() => store.imageIds, (value) => {
  fromIdx.value = value.length ? 1 : 0;
  toIdx.value = value.length;
});
</script>

<style lang="scss" scoped>
#animation-speed {
  width: 130px;
  margin: 5px 10px 0 0;
}
.va-input {
  max-width: 100px;
  min-width: 100px;
}
</style>
