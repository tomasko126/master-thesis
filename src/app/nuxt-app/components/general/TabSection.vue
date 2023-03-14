<template>
  <div class="tab-section">
    <h3>{{ labelText }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  alignItems: {
    type: String,
    default: 'center',
    validator(value: string) {
      return ['baseline', 'center'].includes(value);
    },
  },
  labelText: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.tab-section {
  display: flex;
  justify-content: space-between;
  align-items: v-bind(alignItems);
  margin: 12px;
}
</style>
