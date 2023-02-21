<template>
  <GeneralTabContent title="Image">
    <template #content>
      <GeneralTabSection label-text="Frame:">
        <template #content>
          <va-counter
            v-model="counter"
            class="counter"
            :disabled="!store.imageIds.length || store.isLoopingImages"
            :min="1"
            :max="store.imageIds.length"
            width="100px"
            @update:model-value="onFrameNumberChange"
          />
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Brightness:">
        <template #content>
          <div class="brightness-settings">
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onBrightnessChange(10)"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
            </va-button>
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onBrightnessChange(-10)"
            >
              <font-awesome-icon icon="fa-solid fa-minus" />
            </va-button>
          </div>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Contrast:">
        <template #content>
          <div class="contrast-settings">
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onContrastChange(-10)"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
            </va-button>
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onContrastChange(10)"
            >
              <font-awesome-icon icon="fa-solid fa-minus" />
            </va-button>
          </div>
        </template>
      </GeneralTabSection>
    </template>
  </GeneralTabContent>
</template>

<script>
import { useGlobalStore } from '~/stores/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* global cornerstone */

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      counter: 1,
    };
  },
  computed: {
    isButtonDisabled() {
      return this.store.imageIds.length === 0;
    },
  },
  watch: {
    'store.shownImageId': {
      handler() {
        this.counter = this.store.imageIds.indexOf(this.store.shownImageId) + 1;
      },
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
    onFrameNumberChange(idx) {
      const number = parseInt(idx) - 1;
      if (isNaN(number) || number < 0 || number > this.store.imageIds.length) {
        return;
      }

      this.store.displayImageInElement(this.store.mainImageContainer, this.store.imageIds[number]);
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
.counter {
  max-width: 140px;
}
</style>
