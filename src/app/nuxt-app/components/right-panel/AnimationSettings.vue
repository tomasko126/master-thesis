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
        class="number-input"
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
        class="number-input"
        type="number"
        :disabled="areInputsDisabled || store.isLoopingImages"
        :min="store.imageIds ? 1 : 0"
        :max="store.imageIds ? store.imageIds.length : 1"
        :rules="toImageRules"
      />
    </GeneralTabSection>
  </GeneralTabContent>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      fromIdx: this.store.animation.fromIdx + 1,
      toIdx: this.store.animation.toIdx + 1,
      speed: 30,
    };
  },
  computed: {
    areInputsDisabled() {
      return this.store.imageIds.length < 2;
    },
    fromImageRules() {
      if (this.store.imageIds.length === 1) {
        return [
          (value) => parseInt(value) === 1 || `Value must be set to 1`,
        ];
      }
      return [
        (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !this.store.imageIds.length || `This field is required and must be a number`,
        (value) => parseInt(value) > 0 || !this.store.imageIds.length || `Value must be bigger than 0`,
        (value) => parseInt(value) <= this.store.imageIds.length - 1 || !this.store.imageIds.length || `Value must be lower than ${this.store.imageIds.length - 1}`,
        (value) => parseFloat(value) === parseInt(value) || `Value must not be a decimal number`,
      ];
    },
    toImageRules() {
      if (this.store.imageIds.length === 1) {
        return [
          (value) => parseInt(value) === 1 || `Value must be set to 1`,
        ];
      }
      return [
        (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !this.store.imageIds.length || `This field is required and must be a number`,
        (value) => parseInt(value) > this.fromIdx && parseInt(value) > 0 || !this.store.imageIds.length || `Value must be bigger than ${this.fromIdx}`,
        (value) => parseInt(value) <= this.store.imageIds.length || `Value must be lower than ${this.store.imageIds.length + 1}`,
        (value) => parseFloat(value) === parseInt(value) || `Value must not be a decimal number`,
      ];
    },
  },
  watch: {
    'store.imageIds'(newValue) {
      this.fromIdx = newValue.length ? 1 : 0;
      this.toIdx = newValue.length;
    },
    fromIdx(newValue) {
      this.store.animation.fromIdx = newValue - 1;
    },
    toIdx(newValue) {
      this.store.animation.toIdx = newValue - 1;
    },
    speed(newValue) {
      this.store.animation.speed = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
#animation-speed {
  width: 130px;
  margin: 5px 10px 0 0;
}
.number-input {
  max-width: 100px;
  min-width: 100px;
}
</style>
