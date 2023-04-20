<template>
  <GeneralTabContent>
    <GeneralTabSection label-text="Global grid settings" />
    <va-divider />
    <GeneralTabSection label-text="Move:">
      <va-button-toggle
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="moveMode"
        :options="[
          { label: 'Grid', value: MOVING_MODE.GRID },
          { label: 'Point', value: MOVING_MODE.POINT },
        ]"
        @update:model-value="setMoveMode"
      />
    </GeneralTabSection>
    <GeneralTabSection
      label-text="Show refinement points:"
      popover-message="When this option is enabled, refinement points will get rendered on the grid. They are being used for better grid placement and can be moved independently"
    >
      <va-switch
        size="small"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="isShowingRefinementPoints"
        @update:model-value="setShowingRefinementPoints"
      />
    </GeneralTabSection>
    <GeneralTabSection>
      <RightPanelGridCopyGridButton />
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Local grid settings" />
    <va-divider />
    <GeneralTabSection label-text="Angle:">
      <va-input
        type="number"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
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
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="spacing"
        @update:model-value="setSpacing"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="X offset:">
      <va-input
        type="number"
        min="0"
        step="0.25"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="offsetX"
        @update:model-value="setXOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Y offset:">
      <va-input
        type="number"
        min="0"
        step="0.25"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="offsetY"
        @update:model-value="setYOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by width:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="noOfPrimaryLines"
        @update:model-value="setNoOfPrimaryLines"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by height:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages || store.isComputingGrids"
        :model-value="noOfSecondaryLines"
        @update:model-value="setNoOfSecondaryLines"
      />
    </GeneralTabSection>
    <div class="grid-buttons">
      <RightPanelGridCallToActionButton />
    </div>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '~/stores';
import { MOVING_MODE } from '~/functions/enums/GridEnums';
import { activateTool } from '~/functions/Cornerstone';

const store = useGlobalStore();

const moveMode = computed(() => {
  return store.gridState?.getMovingMode() ?? null;
});

const angle = computed(() => {
  return store.gridState?.tool.angle ?? null;
});

const spacing = computed(() => {
  return store.gridState?.tool.spacing ?? null;
});

const offsetX = computed(() => {
  return store.gridState?.getOffsetX() ?? null;
});

const offsetY = computed(() => {
  return store.gridState?.getOffsetY() ?? null;
});

const noOfPrimaryLines = computed(() => {
  return store.gridState?.tool.noOfPrimaryLines ?? null;
});

const noOfSecondaryLines = computed(() => {
  return store.gridState?.tool.noOfSecondaryLines ?? null;
});

const isShowingRefinementPoints = computed(() => {
  return store.gridState?.isShowingRefinementPoints() ?? null;
});

const setMoveMode = (input: string): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.moveOneHandleOnly = input === MOVING_MODE.POINT;

  // Automatically activate Grid tool
  activateTool('Grid', { mouseButtonMask: 1 });
};

const setAngle = (input: string): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.angle = parseInt(input);
};

const setSpacing = (input: string): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.spacing = parseFloat(input);
};

const setOffset = (coordinates:{ x: number|null, y: number|null }): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.setOffset(coordinates, false);
};

const setXOffset = (input: string): void => {
  setOffset({ x: parseFloat(input), y: offsetY.value });
};

const setYOffset = (input: string): void => {
  setOffset({ x: offsetX.value, y: parseFloat(input) });
};

const setNoOfPrimaryLines = (input: string): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.noOfPrimaryLines = parseInt(input);
};

const setNoOfSecondaryLines = (input: string): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.noOfSecondaryLines = parseInt(input);
};

const setShowingRefinementPoints = (input: boolean): void => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.showRefinementPoints = input;
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
.va-input {
  max-width: 100px;
  min-width: 100px;
}
.grid-buttons {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
}
.va-checkbox {
  margin: 16px 12px;
}
.va-divider {
  padding: 0 5px;
  &:before, &:after {
    border-top-color: global.$va-divider-color;
  }
}
</style>
