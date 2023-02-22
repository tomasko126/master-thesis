<template>
  <GeneralTabContent title="Grid">
    <GeneralTabSection label-text="Move:">
      <va-button-toggle
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="moveMode"
        :options="[
          { label: 'Grid', value: 'grid' },
          { label: 'Point', value: 'point' },
        ]"
        @update:model-value="setMoveMode"
      />
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Angle:">
      <va-input
        type="number"
        class="number-input"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="angle"
        min="0"
        max="90"
        @update:model-value="setAngle"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Spacing:">
      <va-input
        type="number"
        class="number-input"
        min="1"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="spacing"
        @update:model-value="setSpacing"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="X offset:">
      <va-input
        type="number"
        class="number-input"
        min="0"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetX"
        @update:model-value="setXOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Y offset:">
      <va-input
        type="number"
        class="number-input"
        min="0"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetY"
        @update:model-value="setYOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by height:">
      <va-input
        type="number"
        class="number-input"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfPrimaryLines"
        @update:model-value="setNoOfPrimaryLines"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by width:">
      <va-input
        type="number"
        class="number-input"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfSecondaryLines"
        @update:model-value="setNoOfSecondaryLines"
      />
    </GeneralTabSection>
    <div class="grid-button">
      <RightPanelGridCallToActionButton />
    </div>
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
  computed: {
    moveMode() {
      return this.store.measurementData?.getMoveMode() ?? null;
    },
    angle() {
      return this.store.measurementData?.getAngle() ?? null;
    },
    spacing() {
      return this.store.measurementData?.getGridSpacing() ?? null;
    },
    offsetX() {
      return this.store.measurementData?.getGridOffsetX()?.toFixed(2) ?? null;
    },
    offsetY() {
      return this.store.measurementData?.getGridOffsetY()?.toFixed(2) ?? null;
    },
    noOfPrimaryLines() {
      return this.store.measurementData?.getNoOfGridPrimaryLines() ?? null;
    },
    noOfSecondaryLines() {
      return this.store.measurementData?.getNoOfGridSecondaryLines() ?? null;
    },
  },
  methods: {
    getGridTool() {
      return cornerstoneTools.getToolForElement(this.store.mainImageContainer, 'Grid') ?? null;
    },
    setMoveMode(input) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.moveOneHandleOnly = input === 'point';
    },
    setAngle(input) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.angle = parseInt(input);
    },
    setSpacing(input) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.spacing = parseInt(input);
    },
    setXOffset(input) {
      this.setOffset({ x: parseFloat(input), y: parseFloat(this.offsetY) });
    },
    setYOffset(input) {
      this.setOffset({ x: parseFloat(this.offsetX), y: parseFloat(input) });
    },
    setOffset(coordinates) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.setOffset(coordinates, false);
    },
    setNoOfPrimaryLines(input) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.noOfPrimaryLines = parseInt(input);
    },
    setNoOfSecondaryLines(input) {
      const gridTool = this.getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.noOfSecondaryLines = parseInt(input);
    },
  },
};
</script>

<style lang="scss" scoped>
.number-input {
  max-width: 100px;
  min-width: 100px;
}
.grid-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.va-divider {
  --va-divider-border-top-color: rgba(128, 128, 128, 0.36);
}
</style>
