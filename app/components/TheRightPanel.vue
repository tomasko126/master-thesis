<template>
  <aside class="right-panel">
    <va-tabs
      v-model="tabIndex"
      grow
    >
      <template #tabs>
        <va-tab label="Image tools" />
        <va-tab label="Grid tools" />
      </template>
      <div>
        <template v-if="tabIndex === 0">
          <RightPanelImageSettings />
        </template>
        <template v-else>
          <RightPanelGridSettings />
        </template>
      </div>
    </va-tabs>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tabIndex = ref(0)
</script>

<style lang="scss" scoped>
@use 'assets/global';
.right-panel {
  border: 2px solid global.$border-color;
}
</style>
