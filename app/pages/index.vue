<template>
  <main>
    <TheTopPanel class="top-panel" />
    <TheLeftPanel class="left-panel" />
    <TheMainWindow class="main-window" />
    <TheRightPanel class="right-panel" />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initLibraries } from '~/functions/Cornerstone';

onMounted(async () => {
  await initLibraries();
});
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #121d2f;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
}
</style>

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
