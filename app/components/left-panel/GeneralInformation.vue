<template>
  <GeneralTabContent>
    <GeneralTabSection label-text="Image information" />
    <va-divider />
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
import { computed } from 'vue'
import { useGlobalStore } from '~/stores'

const store = useGlobalStore()

const modality = computed(() => {
  return store.dicomHeaderParser?.getModality() ?? 'N/A'
})

const patientName = computed(() => {
  return store.dicomHeaderParser?.getPatientName() ?? 'N/A'
})

const seriesNumber = computed(() => {
  return store.dicomHeaderParser?.getSeriesNumber() ?? 'N/A'
})

const windowWidth = computed(() => {
  return store.dicomHeaderParser?.getWindowWidth() ?? 'N/A'
})

const windowHeight = computed(() => {
  return store.dicomHeaderParser?.getWindowHeight() ?? 'N/A'
})
</script>

<style lang="scss" scoped>
@use 'assets/global';
.patient-name {
  text-align: right;
}
.va-divider {
  padding: 0 5px;
  &:before, &:after {
    border-top-color: global.$va-divider-color;
  }
}
</style>
