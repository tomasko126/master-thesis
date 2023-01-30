<template>
  <GeneralTabSection title="Image">
    <template #content>
      <div class="brightness-settings">
        <span>Brightness:</span>
        <span>
          <o-button
            size="small"
            icon-pack="fas"
            icon-right="plus"
            :disabled="isButtonDisabled"
            @click="onBrightnessChange(10)"
          />
          <o-button
            size="small"
            icon-pack="fas"
            icon-right="minus"
            :disabled="isButtonDisabled"
            @click="onBrightnessChange(-10)"
          />
        </span>
      </div>
      <div class="contrast-settings">
        <span>Contrast:</span>
        <span>
          <o-button
            size="small"
            icon-pack="fas"
            icon-right="plus"
            :disabled="isButtonDisabled"
            @click="onContrastChange(-10)"
          />
          <o-button
            size="small"
            icon-pack="fas"
            icon-right="minus"
            :disabled="isButtonDisabled"
            @click="onContrastChange(10)"
          />
        </span>
      </div>
    </template>
  </GeneralTabSection>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

/* global cornerstone */

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  computed: {
    isButtonDisabled() {
      return this.store.imageIds.length === 0;
    },
  },
  methods: {
    onBrightnessChange(scalar) {
      const viewport = cornerstone.getViewport(this.store.mainImageContainer);
      viewport.voi.windowCenter -= scalar;
      cornerstone.setViewport(this.store.mainImageContainer, viewport);
    },
    onContrastChange(scalar) {
      const viewport = cornerstone.getViewport(this.store.mainImageContainer);
      viewport.voi.windowWidth -= scalar;
      cornerstone.setViewport(this.store.mainImageContainer, viewport);
    },
  },
};
</script>

<style lang="scss" scoped>
.brightness-settings, .contrast-settings {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  button {
    margin: 0 2.5px 0 2.5px;
    width: 35px;
  }
}
</style>
