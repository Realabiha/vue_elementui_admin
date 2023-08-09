<template>
  <h1>{{content}}</h1>
</template>
<style lang="scss" scoped>
h1 {
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100px;
  transform: translateY(-50%);
  background-color: yellow;
  color: blue;
  z-index: 9999;
}
</style>
<script>
export default {
  name: "Toast",
  props: {
    content: {
      type: String,
      default: "我将在三秒后消失"
    }
  },
  mounted() {
    setTimeout(_ => this.$destroy(), 3000);
  },
  methods: {},
  destroyed() {
    this.$el.parentNode.removeChild(this.$el);
  }
};
</script>