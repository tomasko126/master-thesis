<template>
  <section class="right-panel">
    <o-tabs expanded>
      <o-tab-item
        value="1"
        label="Tools"
      >
        <RightPanelToolsImageSection />
        <RightPanelToolsAnimationSection />
      </o-tab-item>
    </o-tabs>
  </section>
</template>

<style lang="scss" scoped>
.right-panel {
  border: 2px solid #5b5bd0;
  background-color: white;
  color: black;
}
</style>
