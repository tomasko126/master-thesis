<template>
  <section class="tools-panel">
    <OpenImagesTool />
    <PlayPauseTool />
    <ZoomPlusTool />
    <ZoomMinusTool />
    <PanTool />
    <GridTool />
  </section>
</template>

<script>
import GridTool from './tools/GridTool.vue';
import ZoomPlusTool from './tools/ZoomPlusTool.vue';
import ZoomMinusTool from './tools/ZoomMinusTool.vue';
import PanTool from './tools/PanTool.vue';
import PlayPauseTool from './tools/PlayPauseTool.vue';
import OpenImagesTool from './tools/OpenImagesTool.vue';

export default {
  name: 'TheToolsPanel',
  components: {
    OpenImagesTool,
    PlayPauseTool,
    PanTool,
    GridTool,
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
}
</style>
