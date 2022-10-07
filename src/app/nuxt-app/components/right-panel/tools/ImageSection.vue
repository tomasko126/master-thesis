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
import { mapActions } from 'pinia';
import { useGlobalStore } from '~/stores/index';

export default {
  methods: {
    ...mapActions(useGlobalStore, {
      updateBrightness: 'updateBrightness',
      updateContrast: 'updateContrast',
    }),
    onBrightnessInput(event) {
      const value = 300 + Number(event.target.value) * 4 * -1;
      this.updateBrightness(value);
    },
    onContrastInput(event) {
      const value = 100 + Number(event.target.value) * 4;
      this.updateContrast(value);
    }
  },
};
</script>
