<template>
  <aside class="left-panel">
    <va-tabs
      v-model="tabIndex"
      class="tabs"
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

<script>
export default {
  data() {
    return {
      tabIndex: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
@use 'assets/global';
.left-panel {
  border: 2px solid global.$border-color;

  :deep(nav) {
    justify-content: space-evenly;
  }

  .tabs {
    align-items: unset;
    flex-direction: column;
  }
}
</style>
