<template>
  <div class="tab-section">
    <va-popover
      v-if="props.popoverMessage"
      :message="props.popoverMessage"
      prevent-overflow
      stick-to-edges
    >
      <template #body>
        <p v-for="(sentence, idx) in popoverMessageSentences" :key="idx">{{ sentence }}</p>
      </template>
      <h3>{{ labelText }}</h3>
    </va-popover>
    <h3 v-else >{{ labelText }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  alignItems: {
    type: String,
    default: 'center',
    validator(value: string) {
      return ['baseline', 'center'].includes(value);
    },
  },
  labelText: {
    type: String,
    default: '',
  },
  popoverMessage: {
    type: String,
    default: '',
  },
});

const popoverMessageSentences = computed(() => {
  if (!props.popoverMessage) {
    return '';
  }
  return props.popoverMessage.split('.');
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
