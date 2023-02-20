<template>
  <GeneralTabContent title="Image">
    <template #content>
      <GeneralTabSection label-text="Brightness:">
        <template #content>
          <div class="brightness-settings">
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onBrightnessChange(10)"
            >
              <template #default>
                <font-awesome-icon icon="fa-solid fa-plus" />
              </template>
            </va-button>
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onBrightnessChange(-10)"
            >
              <template #default>
                <font-awesome-icon icon="fa-solid fa-minus" />
              </template>
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
              <template #default>
                <font-awesome-icon icon="fa-solid fa-plus" />
              </template>
            </va-button>
            <va-button
              size="small"
              :disabled="isButtonDisabled"
              @click="onContrastChange(10)"
            >
              <template #default>
                <font-awesome-icon icon="fa-solid fa-minus" />
              </template>
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
