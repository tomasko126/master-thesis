<template>
  <div class="tab-section">
    <label>{{ labelText }}</label>
    <slot name="content" />
  </div>
</template>

<script>
export default {
  props: {
    labelText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;

  :deep(input[type="number"]) {
    width: 80px;
  }
}
</style>
