<template>
  <section class="tools-panel">
    <OpenImagesTool />
    <PanTool />
    <ZoomTool />
    <FreehandRoiTool />
    <PlayPauseTool />
  </section>
</template>

<script>
import FreehandRoiTool from './tools/FreehandRoiTool.vue';
import ZoomTool from './tools/ZoomTool.vue';
import PanTool from './tools/PanTool.vue';
import PlayPauseTool from './tools/PlayPauseTool.vue';
import OpenImagesTool from './tools/OpenImagesTool.vue';

export default {
  name: 'TheToolsPanel',
  components: {
    OpenImagesTool,
    PlayPauseTool,
    PanTool,
    FreehandRoiTool,
    ZoomTool,
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
