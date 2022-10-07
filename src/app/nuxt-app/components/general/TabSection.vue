<template>
  <h2>{{ header }}</h2>
  <div class="tab-content">
    <slot name="content" />
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 10px;
}
.tab-content {
  margin: 5px;
  border: 2px solid #8080805e;
  border-radius: 3px;
  background-color: #80808014;
}
</style>
