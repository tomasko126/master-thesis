<template>
  <main>
    <section class="grid-section">
      <TheTopPanel class="top-panel" />
      <TheLeftPanel class="left-panel" />
      <TheMainWindow class="main-window" />
      <TheRightPanel class="right-panel" />
    </section>
  </main>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  async mounted() {
    await this.store.initLibraries();
  },
}
</script>

<style lang="scss" scoped>
@use "assets/global";
.grid-section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .top-panel {
    grid-column: 1 / 6;
    grid-row: 1;
  }

  .left-panel {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  .main-window {
    grid-column: 2 / 5;
    grid-row: 2 / 4;
  }

  .right-panel {
    grid-column: 5;
    grid-row: 2 / 4;
  }
}
</style>
