<template>
  <section class="right-panel">
    <va-tabs
      v-model="tabIndex"
      class="tabs"
      grow
    >
      <template #tabs>
        <va-tab label="Image tools" />
        <va-tab label="Grid settings" />
      </template>
      <div>
        <template v-if="tabIndex === 0">
          <RightPanelToolsImageSettings />
          <RightPanelToolsAnimationSettings />
        </template>
        <template v-else>
          <RightPanelToolsGridSettings />
        </template>
      </div>
    </va-tabs>
  </section>
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
.right-panel {
  border: 2px solid global.$border-color;
  background-color: white;
  color: black;

  :deep(nav) {
    justify-content: space-evenly;
  }

  .tabs {
    align-items: unset;
    flex-direction: column;
  }
}
</style>
