<template>
  <div class="tab-section">
    <label>{{ labelText }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    labelText: {
      type: String,
      required: true,
    },
    alignItems: {
      type: String,
      default: 'center',
      validator(value) {
        return ['baseline', 'center'].includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-section {
  display: flex;
  justify-content: space-between;
  align-items: v-bind(alignItems);
  margin: 12px;
}
</style>
