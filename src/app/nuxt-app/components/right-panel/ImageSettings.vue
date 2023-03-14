<template>
  <GeneralTabContent>
    <GeneralTabSection label-text="Image" />
    <va-divider />
    <GeneralTabSection label-text="Frame:">
      <va-counter
        v-model="counter"
        :disabled="!store.imageIds.length || store.isLoopingImages"
        :min="1"
        :max="store.imageIds.length"
        width="100px"
        @update:model-value="onFrameNumberChange"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Brightness:">
      <div class="brightness-settings">
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setBrightness(10)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </va-button>
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setBrightness(-10)"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </va-button>
      </div>
    </GeneralTabSection>
    <GeneralTabSection label-text="Contrast:">
      <div class="contrast-settings">
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setContrast(-10)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </va-button>
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setContrast(10)"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </va-button>
      </div>
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Animation" />
    <va-divider />
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
import { computed, ref, watch } from 'vue';
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useGlobalStore } from '~/stores';
import { setContrast, setBrightness, displayImageInElement } from '~/functions/Cornerstone';

const store = useGlobalStore();

const counter = ref(1);
const fromIdx = ref(store.animation.fromIdx + 1);
const toIdx = ref(store.animation.toIdx + 1);
const speed = ref(30);

const isButtonDisabled = computed(() => {
  return store.imageIds.length === 0;
});

watch(() => store.shownImageId, () => {
  if (!store.shownImageId) {
    counter.value = 0;
  } else {
    counter.value = store.imageIds.indexOf(store.shownImageId) + 1;
  }
});

const onFrameNumberChange = (idx: string) => {
  const number = parseInt(idx) - 1;
  if (isNaN(number) || number < 0 || number > store.imageIds.length) {
    return;
  }

  displayImageInElement(store.mainImageContainer as HTMLElement, store.imageIds[number]);
};

const areInputsDisabled = computed(() => {
  return store.imageIds.length < 2;
});

const fromImageRules = computed(() => {
  if (store.imageIds.length === 1) {
    return [
      (value: string) => parseInt(value) === 1 || 'Value must be set to 1',
    ];
  }
  return [
    (value: string) => (value && value.length !== 0 && !isNaN(parseInt(value))) || !store.imageIds.length || 'This field is required and must be a number',
    (value: string) => parseInt(value) > 0 || !store.imageIds.length || 'Value must be bigger than 0',
    (value: string) => parseInt(value) <= store.imageIds.length - 1 || !store.imageIds.length || `Value must be lower than ${store.imageIds.length - 1}`,
    (value: string) => parseFloat(value) === parseInt(value) || 'Value must not be a decimal number',
  ];
});

const toImageRules = computed(() => {
  if (store.imageIds.length === 1) {
    return [
      (value: string) => parseInt(value) === 1 || 'Value must be set to 1',
    ];
  }
  return [
    (value: string) => (value && value.length !== 0 && !isNaN(parseInt(value))) || !store.imageIds.length || 'This field is required and must be a number',
    (value: string) => (parseInt(value) > fromIdx.value && parseInt(value) > 0) || !store.imageIds.length || `Value must be bigger than ${fromIdx.value}`,
    (value: string) => parseInt(value) <= store.imageIds.length || `Value must be lower than ${store.imageIds.length + 1}`,
    (value: string) => parseFloat(value) === parseInt(value) || 'Value must not be a decimal number',
  ];
});

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
@use 'assets/global';
.brightness-settings, .contrast-settings {
  button {
    margin: 0 2.5px 0 2.5px;
    width: 35px;
  }
}
.va-counter {
  max-width: 140px;
}
.va-divider {
  padding: 0 5px;
  &:before, &:after {
    border-top-color: global.$va-divider-color;
  }
}
#animation-speed {
  width: 130px;
  margin: 5px 10px 0 0;
}
.va-input {
  max-width: 100px;
  min-width: 100px;
}
</style>
