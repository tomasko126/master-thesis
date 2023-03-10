<template>
  <main>
    <TheTopPanel class="top-panel" />
    <TheLeftPanel class="left-panel" />
    <TheMainWindow class="main-window" />
    <TheRightPanel class="right-panel" />
  </main>
</template>

<script setup lang="ts">
import { initLibraries } from '../functions/Cornerstone';
import { onMounted } from 'vue';

onMounted(async () => {
  await initLibraries();
});
</script>

<style lang="scss" scoped>
main {
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
