<template>
  <div
    class="tool-container"
    :title="label"
    @click="$emit('click')"
  >
    <slot name="icon" />
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  name: 'BaseTool',
  props: {
    label: {
      type: String,
      required: true,
    },
    toolName: {
      type: String,
      required: true,
    },
    isCustomTool: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['click'],
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  mounted() {
    if (!this.isCustomTool) {
      this.store.addTool(this.toolName);
    }
  },
};
</script>

<style lang="scss" scoped>
.tool-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
