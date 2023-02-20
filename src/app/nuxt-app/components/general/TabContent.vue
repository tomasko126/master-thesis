<template>
  <section class="tab-content-wrapper">
    <h2>{{ title }}</h2>
    <div class="tab-content">
      <slot name="content" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 10px;

  &:not(:first-child) {
    margin-top: 20px;
  }
}
.tab-content-wrapper {
  margin: 5px;
  padding: 5px;

  .tab-content {
    margin: 5px;
    border: 2px solid #8080805e;
    border-radius: 3px;
    background-color: #80808014;
  }
}

</style>
