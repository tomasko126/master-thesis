<template>
  <GeneralTabContent title="Grid algorithm settings">
    <GeneralTabSection
      label-text="Curvature coefficient:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.curvature"
        type="number"
        min="0"
        step="0.0005"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Force coefficient:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.force"
        type="number"
        min="0"
        step="0.025"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Stop time:"
      align-items="baseline"
    >
      <va-input
        v-model="store.algorithm.stopTime"
        type="number"
        min="0"
        step="0.005"
        :disabled="store.isLoopingImages || !store.imageIds.length"
        :rules="inputRules"
      />
    </GeneralTabSection>
  </GeneralTabContent>
</template>

<script>
import { useGlobalStore } from '~/stores';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  computed: {
    inputRules() {
      return [
        (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !this.store.imageIds.length || `This field is required and must be a number`,
        (value) => parseInt(value) >= 0 || !this.store.imageIds.length || `Value must be bigger or equal to 0`,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.va-input {
  max-width: 100px;
  min-width: 100px;
}
</style>
