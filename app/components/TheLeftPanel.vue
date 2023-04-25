<template>
  <aside class="left-panel">
    <va-tabs
      v-model="tabIndex"
      grow
    >
      <template #tabs>
        <va-tab label="General" />
      </template>
    </va-tabs>
    <div class="left-panel-content">
      <LeftPanelGeneralInformation />
      <LeftPanelGridAlgorithmSettings />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tabIndex = ref(0)
</script>

<style lang="scss" scoped>
@use 'assets/global';
.left-panel {
  border: 2px solid global.$border-color;

  .left-panel-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 95%;
  }
}
</style>
