<template>
  <header class="top-panel">
    <span />
    <TheToolsPanel />
    <span />
  </header>
</template>

<script>
import TheToolsPanel from './top-panel/TheToolsPanel.vue';
export default {
  components: {
    TheToolsPanel,
  }
};
</script>

<style lang="scss" scoped>
.top-panel {
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  background-color: #080884;
}
</style>
