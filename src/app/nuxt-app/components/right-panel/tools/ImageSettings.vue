<template>
  <GeneralTabContent title="Image">
    <template #content>
      <GeneralTabSection label-text="Brightness:">
        <template #content>
          <div class="brightness-settings">
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
          </div>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Contrast:">
        <template #content>
          <div class="contrast-settings">
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
          </div>
        </template>
      </GeneralTabSection>
    </template>
  </GeneralTabContent>
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
  button {
    margin: 0 2.5px 0 2.5px;
    width: 35px;
  }
}
</style>
