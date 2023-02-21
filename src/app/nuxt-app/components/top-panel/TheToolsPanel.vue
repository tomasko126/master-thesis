<template>
  <section class="tools-panel">
    <OpenImagesTool />
    <CloseImagesTool />
    <va-divider
      class="divider"
      vertical
    />
    <PlayPauseTool />
    <ZoomPlusTool />
    <ZoomMinusTool />
    <va-divider
      class="divider"
      vertical
    />
    <PanTool />
    <GridTool />
  </section>
</template>

<script>
import ZoomPlusTool from './tools/ZoomPlusTool.vue';
import ZoomMinusTool from './tools/ZoomMinusTool.vue';
import PanTool from './tools/PanTool.vue';
import PlayPauseTool from './tools/PlayPauseTool.vue';
import OpenImagesTool from './tools/OpenImagesTool.vue';
import GridTool from './tools/GridTool.vue';
import CloseImagesTool from './tools/CloseImagesTool.vue';

export default {
  components: {
    CloseImagesTool,
    GridTool,
    OpenImagesTool,
    PlayPauseTool,
    PanTool,
    ZoomPlusTool,
    ZoomMinusTool,
  },
};
</script>

<style lang="scss" scoped>
@use "assets/global";
.tools-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: global.$top-panel-height;

  .divider {
    height: 25px;
  }
}
</style>
