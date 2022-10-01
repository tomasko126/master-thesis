<template>
  <section class="tools-panel">
    <PanTool />
    <ZoomTool />
    <FreehandRoiTool />
  </section>
</template>

<script>
import FreehandRoiTool from './tools/FreehandRoiTool.vue';
import ZoomTool from './tools/ZoomTool.vue';
import PanTool from './tools/PanTool.vue';

export default {
  name: 'TheToolsPanel',
  components: {
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
  height: global.$top-panel-height;
}
</style>
