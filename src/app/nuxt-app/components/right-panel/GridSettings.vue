<template>
  <GeneralTabContent title="Grid">
    <GeneralTabSection label-text="Global settings:" />
    <va-divider />
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
    <GeneralTabSection label-text="Show refinement points:">
      <va-switch
        size="small"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="isShowingRefinementPoints"
        @update:model-value="setShowingRefinementPoints"
      />
    </GeneralTabSection>
    <va-divider />
    <GeneralTabSection label-text="Local settings:" />
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
        step="0.25"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetX"
        @update:model-value="setXOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Y offset:">
      <va-input
        type="number"
        min="0"
        step="0.25"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="offsetY"
        @update:model-value="setYOffset"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by width:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfPrimaryLines"
        @update:model-value="setNoOfPrimaryLines"
      />
    </GeneralTabSection>
    <GeneralTabSection label-text="Points by height:">
      <va-input
        type="number"
        min="2"
        :disabled="!store.hasImageDefinedGrid || store.isLoopingImages"
        :model-value="noOfSecondaryLines"
        @update:model-value="setNoOfSecondaryLines"
      />
    </GeneralTabSection>
    <div class="grid-buttons">
      <RightPanelGridCallToActionButton />
      <RightPanelGridCopyGridButton />
    </div>
  </GeneralTabContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../../stores';
import { MOVING_MODE } from '../../functions/enums/GridEnums';
import { computed } from 'vue';

const store = useGlobalStore();

const moveMode = computed(() => {
  return store.gridState?.getMovingMode() ?? null;
});

const angle = computed(() => {
  return store.gridState?.getAngle() ?? null;
});

const spacing = computed(() => {
  return store.gridState?.getSpacing() ?? null;
});

const offsetX = computed(() => {
  return store.gridState?.getOffsetX()?.toFixed(2) ?? null;
});

const offsetY = computed(() => {
  return store.gridState?.getOffsetY()?.toFixed(2) ?? null;
});

const noOfPrimaryLines = computed(() => {
  return store.gridState?.getNoOfPrimaryLines() ?? null;
});

const noOfSecondaryLines = computed(() => {
  return store.gridState?.getNoOfSecondaryLines() ?? null;
});

const isShowingRefinementPoints = computed(() => {
  return store.gridState?.isShowingRefinementPoints() ?? null;
});

const setMoveMode = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.moveOneHandleOnly = input === MOVING_MODE.POINT;
};

const setAngle = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.angle = parseInt(input);
};

const setSpacing = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.spacing = parseFloat(input);
};

const setOffset = (coordinates) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.setOffset(coordinates, false);
};

const setXOffset = (input) => {
  setOffset({ x: parseFloat(input), y: parseFloat(offsetY.value) });
};

const setYOffset = (input) => {
  setOffset({ x: parseFloat(offsetX.value), y: parseFloat(input) });
};

const setNoOfPrimaryLines = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.noOfPrimaryLines = parseInt(input);
};

const setNoOfSecondaryLines = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.noOfSecondaryLines = parseInt(input);
};

const setShowingRefinementPoints = (input) => {
  const gridTool = store.gridState?.tool;
  if (!gridTool) {
    return;
  }
  gridTool.showRefinementPoints = input;
};
</script>

<style lang="scss" scoped>
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

  button:first-child {
    margin-bottom: 15px;
  }
}
.va-divider {
  --va-divider-border-top-color: rgba(128, 128, 128, 0.36);
}
.va-checkbox {
  margin: 12px;
}
</style>
