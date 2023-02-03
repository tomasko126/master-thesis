<template>
  <GeneralTabContent title="Animation">
    <template #content>
      <GeneralTabSection label-text="Speed:">
        <template #content>
          <input
            id="animation-speed"
            v-model="speed"
            type="range"
            min="50"
            max="250"
            step="10"
            :disabled="!store.imageIds.length"
          >
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="From image:">
        <template #content>
          <o-input
            v-model="fromIdx"
            type="number"
            :disabled="store.isLoopingImages || !store.imageIds.length"
            :min="store.imageIds ? 1 : 0"
            :max="store.imageIds ? store.imageIds.length : 1"
          />
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="To image:">
        <template #content>
          <o-input
            v-model="toIdx"
            type="number"
            :disabled="store.isLoopingImages || !store.imageIds.length"
            :min="store.imageIds ? 1 : 0"
            :max="store.imageIds ? store.imageIds.length : 1"
          />
        </template>
      </GeneralTabSection>
    </template>
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
      fromIdx: this.store.animation.fromIdx,
      toIdx: this.store.animation.toIdx,
      speed: this.convertSpeedToInputValue(this.store.animation.speed),
    };
  },
  watch: {
    'store.imageIds'(newValue) {
      this.fromIdx = 1;
      this.toIdx = newValue.length;
    },
    fromIdx(newValue) {
      this.store.animation.fromIdx = newValue - 1;
    },
    toIdx(newValue) {
      this.store.animation.toIdx = newValue - 1;
    },
    speed(newValue) {
      this.store.animation.speed = this.convertSpeedToInputValue(newValue);
    },
  },
  methods: {
    convertSpeedToInputValue(speed) {
      const MAX_SPEED_PLUS_MIN_SPEED = 300;
      return MAX_SPEED_PLUS_MIN_SPEED - speed;
    },
  },
};
</script>

<style lang="scss" scoped>
#animation-speed {
  width: 105px;
}
</style>
