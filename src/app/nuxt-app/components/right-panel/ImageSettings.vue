<template>
  <GeneralTabContent title="Image">
    <GeneralTabSection label-text="Frame:">
      <va-counter
        v-model="counter"
        :disabled="!store.imageIds.length || store.isLoopingImages"
        :min="1"
        :max="store.imageIds.length"
        width="100px"
        @update:model-value="onFrameNumberChange"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Brightness:">
      <div class="brightness-settings">
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setBrightness(10)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </va-button>
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setBrightness(-10)"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </va-button>
      </div>
    </GeneralTabSection>
    <GeneralTabSection label-text="Contrast:">
      <div class="contrast-settings">
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setContrast(-10)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </va-button>
        <va-button
          size="small"
          :disabled="isButtonDisabled"
          @click="setContrast(10)"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </va-button>
      </div>
    </GeneralTabSection>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setContrast, setBrightness, displayImageInElement } from '../../functions/Cornerstone';
import { computed, ref, watch } from 'vue';

const store = useGlobalStore();
const counter = ref(1);

const isButtonDisabled = computed(() => {
  return store.imageIds.length === 0;
});

watch(() => store.shownImageId, () => {
  counter.value = store.imageIds.indexOf(store.shownImageId) + 1;
});

const onFrameNumberChange = (idx) => {
  const number = parseInt(idx) - 1;
  if (isNaN(number) || number < 0 || number > store.imageIds.length) {
    return;
  }

  displayImageInElement(store.mainImageContainer, store.imageIds[number]);
};
</script>

<style lang="scss" scoped>
.brightness-settings, .contrast-settings {
  button {
    margin: 0 2.5px 0 2.5px;
    width: 35px;
  }
}
.va-counter {
  max-width: 140px;
}
</style>
