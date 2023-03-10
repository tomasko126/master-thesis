<template>
  <aside class="left-panel">
    <va-tabs
      v-model="tabIndex"
      grow
    >
      <template #tabs>
        <va-tab label="General" />
      </template>
      <div>
        <template v-if="tabIndex === 0">
          <LeftPanelGeneralInformation />
          <LeftPanelGridAlgorithmSettings />
        </template>
      </div>
    </va-tabs>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const tabIndex = ref(0);
</script>

<style lang="scss" scoped>
@use 'assets/global';
.left-panel {
  border: 2px solid global.$border-color;

  :deep(nav) {
    justify-content: space-evenly;
  }

  .va-tabs {
    align-items: unset;
    flex-direction: column;
  }
}
</style>
