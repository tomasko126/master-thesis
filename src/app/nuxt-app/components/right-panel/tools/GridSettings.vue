<template>
  <GeneralTabContent title="Grid">
    <template #content>
      <GeneralTabSection label-text="Angle:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Spacing:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="X offset:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Y offset:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Points by height:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
      <GeneralTabSection label-text="Points by width:">
        <template #content>
          <o-input type="number"></o-input>
        </template>
      </GeneralTabSection>
    </template>
  </GeneralTabContent>
</template>

<script>

/* global cornerstoneTools */
import { useGlobalStore } from '~/stores';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  watch: {
    'store.imageIds': {
      deep: true,
      handler() {
        this.getGridSettingsForCurrentImage(); // on image load
      },
    },
    'store.shownImageId': {
      handler() {
        this.getGridSettingsForCurrentImage(); // on image switch
      },
    },
  },
  methods: {
    getGridSettingsForCurrentImage() {
      const { config, state } = cornerstoneTools.getToolForElement(this.store.mainImageContainer, 'Grid').getToolsStateAndConfig();
      console.log('config: ', config);
      console.log('state: ', state);
    },
  },
};
</script>
