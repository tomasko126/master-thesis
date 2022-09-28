<template>
  <main>
    <TheTopPanel />
    <section class="grid-section">
      <TheLeftPanel />
      <TheMainWindow />
      <TheRightPanel />
    </section>
  </main>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  async mounted() {
    const globalStore = useGlobalStore();
    await globalStore.initLibraries();
  },
}
</script>

<style lang="scss" scoped>
@use "assets/global";
.grid-section {
  display: grid;
  grid-template-columns: minmax(250px, 20%) auto minmax(250px, 20%);
  height: calc(100vh - global.$top-panel-height);
}
</style>
