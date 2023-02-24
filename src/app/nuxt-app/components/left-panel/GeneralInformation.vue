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

<script>
import { useGlobalStore } from '~/stores';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  computed: {
    modality() {
      return this.store?.dicomHeaderParser?.getModality() ?? 'N/A';
    },
    patientName() {
      return this.store?.dicomHeaderParser?.getPatientName() ?? 'N/A';
    },
    seriesNumber() {
      return this.store?.dicomHeaderParser?.getSeriesNumber() ?? 'N/A';
    },
    windowWidth() {
      return this.store?.dicomHeaderParser?.getWindowWidth() ?? 'N/A';
    },
    windowHeight() {
      return this.store?.dicomHeaderParser?.getWindowHeight() ?? 'N/A';
    },
  },
};
</script>

<style lang="scss" scoped>
.patient-name {
  text-align: right;
}
.va-divider {
  --va-divider-border-top-color: rgba(128, 128, 128, 0.36);
}
</style>
