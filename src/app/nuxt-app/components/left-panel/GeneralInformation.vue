<template>
  <GeneralTabContent title="Image information">
    <GeneralTabSection label-text="Patient's name:">
      <span class="patient-name">{{ patientName }}</span>
    </GeneralTabSection>
    <GeneralTabSection label-text="Series number:">
      {{ seriesNumber }}
    </GeneralTabSection>
    <GeneralTabSection label-text="Modality:">
      {{ modality }}
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Window width:">
      {{ windowWidth }}
    </GeneralTabSection>
    <GeneralTabSection label-text="Window height:">
      {{ windowHeight }}
    </GeneralTabSection>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import { computed } from 'vue';

const store = useGlobalStore();

const modality = computed(() => {
  return store.dicomHeaderParser?.getModality() ?? 'N/A';
});

const patientName = computed(() => {
  return store.dicomHeaderParser?.getPatientName() ?? 'N/A';
});

const seriesNumber = computed(() => {
  return store.dicomHeaderParser?.getSeriesNumber() ?? 'N/A';
});

const windowWidth = computed(() => {
  return store.dicomHeaderParser?.getWindowWidth() ?? 'N/A';
});

const windowHeight = computed(() => {
  return store.dicomHeaderParser?.getWindowHeight() ?? 'N/A';
});
</script>

<style lang="scss" scoped>
.patient-name {
  text-align: right;
}
.va-divider {
  --va-divider-border-top-color: rgba(128, 128, 128, 0.36);
}
</style>
