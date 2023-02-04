<template>
  <div
    class="tool-container"
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
    toolName: {
      type: String,
      required: true,
    },
    registerTool: {
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
    if (this.registerTool) {
      this.store.toolNames.push(this.toolName);
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
