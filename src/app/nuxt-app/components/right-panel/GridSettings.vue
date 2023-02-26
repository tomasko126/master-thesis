<template>
  <GeneralTabContent title="Grid">
    <GeneralTabSection label-text="Move:">
      <va-button-toggle
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="moveMode"
        :options="[
          { label: 'Grid', value: MOVING_MODE.GRID },
          { label: 'Point', value: MOVING_MODE.POINT },
        ]"
        @update:model-value="setMoveMode"
      />
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Angle:">
      <va-input
        type="number"
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
        min="1"
        step="0.1"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="spacing"
        @update:model-value="setSpacing"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="X offset:">
      <va-input
        type="number"
        min="0"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetX"
        @update:model-value="setXOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Y offset:">
      <va-input
        type="number"
        min="0"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetY"
        @update:model-value="setYOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by height:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfPrimaryLines"
        @update:model-value="setNoOfPrimaryLines"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by width:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfSecondaryLines"
        @update:model-value="setNoOfSecondaryLines"
      />
    </GeneralTabSection>
    <va-checkbox
      label="Show refinement points"
      :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
      :model-value="isShowingRefinementPoints"
      @update:model-value="setShowingRefinementPoints"
    />
    <div class="grid-button">
      <RightPanelGridCallToActionButton />
    </div>
  </GeneralTabContent>
</template>

<script>
import { useGlobalStore } from '~/stores';
import { MOVING_MODE } from '~/functions/enums/GridEnums.js';
import { getGridTool } from '~/functions/Cornerstone.js';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  data() {
    return {
      MOVING_MODE,
    };
  },
  computed: {
    moveMode() {
      return this.store.gridState?.getMovingMode() ?? null;
    },
    angle() {
      return this.store.gridState?.getAngle() ?? null;
    },
    spacing() {
      return this.store.gridState?.getSpacing() ?? null;
    },
    offsetX() {
      return this.store.gridState?.getOffsetX()?.toFixed(2) ?? null;
    },
    offsetY() {
      return this.store.gridState?.getOffsetY()?.toFixed(2) ?? null;
    },
    noOfPrimaryLines() {
      return this.store.gridState?.getNoOfPrimaryLines() ?? null;
    },
    noOfSecondaryLines() {
      return this.store.gridState?.getNoOfSecondaryLines() ?? null;
    },
    isShowingRefinementPoints() {
      return this.store.gridState?.isShowingRefinementPoints() ?? null;
    },
  },
  methods: {
    setMoveMode(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.moveOneHandleOnly = input === MOVING_MODE.POINT;
    },
    setAngle(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.angle = parseInt(input);
    },
    setSpacing(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.spacing = parseFloat(input);
    },
    setXOffset(input) {
      this.setOffset({ x: parseFloat(input), y: parseFloat(this.offsetY) });
    },
    setYOffset(input) {
      this.setOffset({ x: parseFloat(this.offsetX), y: parseFloat(input) });
    },
    setOffset(coordinates) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.setOffset(coordinates, false);
    },
    setNoOfPrimaryLines(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.noOfPrimaryLines = parseInt(input);
    },
    setNoOfSecondaryLines(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.noOfSecondaryLines = parseInt(input);
    },
    setShowingRefinementPoints(input) {
      const gridTool = getGridTool();
      if (!gridTool) {
        return;
      }
      gridTool.showRefinementPoints = input;
    }
  },
};
</script>

<style lang="scss" scoped>
.va-input {
  max-width: 100px;
  min-width: 100px;
}
.grid-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.va-divider {
  --va-divider-border-top-color: rgba(128, 128, 128, 0.36);
}
.va-checkbox {
  margin: 12px;
}
</style>
