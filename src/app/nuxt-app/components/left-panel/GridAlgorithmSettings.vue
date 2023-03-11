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
        :disabled="store.isLoopingImages || store.imageIds.length < 2"
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
        :disabled="store.isLoopingImages || store.imageIds.length < 2"
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
        :disabled="store.isLoopingImages || store.imageIds.length < 2"
        :rules="inputRules"
      />
    </GeneralTabSection>
    <div class="start-computation">
      <va-button
        :disabled="store.isLoopingImages || store.imageIds.length < 2"
      >
        Compute grid positions
      </va-button>
    </div>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import { computed } from 'vue';

const store = useGlobalStore();

const inputRules = computed(() => {
  return [
    (value) => value && value.length !== 0 && !isNaN(parseInt(value)) || !store.imageIds.length || `This field is required and must be a number`,
    (value) => parseInt(value) >= 0 || !store.imageIds.length || `Value must be bigger or equal to 0`,
  ];
});
</script>

<style lang="scss" scoped>
.va-input {
  max-width: 100px;
  min-width: 100px;
}
.start-computation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
