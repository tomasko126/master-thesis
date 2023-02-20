<template>
  <va-popover
    :message="popoverMessage"
    placement="bottom"
  >
    <va-popover
      :message="popoverMessage"
      placement="bottom"
    >
      <!-- hack: this fixes weird behaviour of popover display -->
      <va-button
        :class="{ 'tool-button': true, 'disabled': disabled, 'active': active }"
        :inert="disabled"
        @click="$emit('click')"
      >
        <slot />
      </va-button>
    </va-popover>
  </va-popover>
</template>

<script>
import { useGlobalStore } from '~/stores/index';

export default {
  name: 'BaseTool',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    popoverMessage: {
      type: String,
      required: true,
    },
    toolName: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup() {
    const store = useGlobalStore();
    return { store };
  },
  mounted() {
    if (this.toolName) {
      this.store.tools.push(this.toolName);
    }
  },
};
</script>

<style lang="scss" scoped>
.tool-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;

  &.disabled {
    filter: opacity(0.25);
    pointer-events: none;
    user-select: none;
  }

  &.active {
    &::before {
      background-color: #0A0CA4;
    }
  }
}
</style>
