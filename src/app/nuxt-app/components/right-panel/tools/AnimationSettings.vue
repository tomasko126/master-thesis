<template>
  <GeneralTabSection title="Animation">
    <template #content>
      <div class="input-wrapper">
        <label for="animation-speed">Speed:</label>
        <input
          id="animation-speed"
          v-model="speed"
          type="range"
          min="50"
          max="250"
          step="10"
          :disabled="!store.imageIds.length"
        >
      </div>
      <div class="input-wrapper">
        <label for="from-image-idx">From image:</label>
        <o-input
          id="from-image-idx"
          v-model="fromIdx"
          type="number"
          class="idx-inputs"
          :disabled="store.isLoopingImages || !store.imageIds.length"
          :min="store.imageIds ? 1 : 0"
          :max="store.imageIds ? store.imageIds.length : 1"
        />
      </div>
      <div class="input-wrapper">
        <label for="to-image-idx">To image:</label>
        <o-input
          id="to-image-idx"
          v-model="toIdx"
          type="number"
          class="idx-inputs"
          :disabled="store.isLoopingImages || !store.imageIds.length"
          :min="store.imageIds ? 1 : 0"
          :max="store.imageIds ? store.imageIds.length : 1"
        />
      </div>
    </template>
  </GeneralTabSection>
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
.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  #animation-speed {
    width: 120px;
  }

  :deep(.idx-inputs) {
    width: 70px;
  }
}
</style>
