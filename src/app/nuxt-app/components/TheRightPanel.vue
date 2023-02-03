<template>
  <section class="right-panel">
    <o-tabs
      :animated="false"
      expanded
      tab-item-wrapper-class="tab-header"
    >
      <o-tab-item
        value="1"
        label="Image tools"
      >
        <RightPanelToolsImageSettings />
        <RightPanelToolsAnimationSettings />
      </o-tab-item>
      <o-tab-item
        value="2"
        label="Grid settings"
      >
        <RightPanelToolsGridSettings />
      </o-tab-item>
    </o-tabs>
  </section>
</template>

<style lang="scss" scoped>
.right-panel {
  border: 2px solid #5b5bd0;
  background-color: white;
  color: black;

  :deep(nav) {
    justify-content: space-evenly;
  }

  :deep(.tab-header) {
    width: 100%;
  }
}
</style>
