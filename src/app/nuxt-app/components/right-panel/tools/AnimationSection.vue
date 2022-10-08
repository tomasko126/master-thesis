<template>
  <GeneralTabSection title="Animation">
    <template #content>
      <div class="input-wrapper">
        <label for="animation-speed">Speed:</label>
        <input
          id="animation-speed"
          ref="animation-speed"
          type="range"
          min="50"
          max="250"
          step="10"
          @change="onRangeInput"
        >
      </div>
      <div class="input-wrapper">
        <label for="from-image-idx">From image:</label>
        <input
          id="from-image-idx"
          ref="from-image-idx"
          class="idx-inputs"
          type="number"
          :min="store.imageIds ? 1 : 0"
          :max="store.imageIds ? store.imageIds.length : 1"
          @input="store.animation.fromIdx = $event.target.value - 1"
        >
      </div>
      <div class="input-wrapper">
        <label for="to-image-idx">To image:</label>
        <input
          id="to-image-idx"
          ref="to-image-idx"
          class="idx-inputs"
          type="number"
          :min="store.imageIds ? 1 : 0"
          :max="store.imageIds ? store.imageIds.length : 1"
          @input="store.animation.toIdx = $event.target.value - 1"
        >
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
  watch: {
    imageIds(newValue) {
      this.$refs['from-image-idx'].value = '1';
      this.$refs['to-image-idx'].value = newValue.length;
    },
  },
  mounted() {
    // Set animation speed slider value
    this.$refs['animation-speed'].value = this.normalizeSpeed(this.store.animation.speed);
  },
  methods: {
    normalizeSpeed(desiredSpeed) {
      const MAX_SPEED_PLUS_MIN_SPEED = 300;
      return MAX_SPEED_PLUS_MIN_SPEED - desiredSpeed;
    },
    onRangeInput(event) {
      this.store.animation.speed = this.normalizeSpeed(event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.idx-inputs {
  width: 100px;
}
.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>
