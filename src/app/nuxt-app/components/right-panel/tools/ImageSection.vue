<template>
  <GeneralTabSection title="Image">
    <template #content>
      <label for="brightness-setting">Brightness:</label>
      <input
        id="brightness-setting"
        type="range"
        min="0"
        max="100"
        step="10"
        @input="onBrightnessInput"
      >
      <label for="contrast-setting">Contrast:</label>
      <input
        id="contrast-setting"
        min="0"
        max="100"
        step="10"
        type="range"
        @input="onContrastInput"
      >
      <!-- TODO?
      <label for="gamma-setting">Gamma:</label>
      <input
        id="gamma-setting"
        type="range"
        @input="onGammaChange"
      >
      -->
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
  methods: {
    onBrightnessInput(event) {
      const value = 300 + Number(event.target.value) * 4 * -1;
      this.store.updateBrightness(value);
    },
    onContrastInput(event) {
      const value = 100 + Number(event.target.value) * 4;
      this.store.updateContrast(value);
    },
  },
};
</script>
