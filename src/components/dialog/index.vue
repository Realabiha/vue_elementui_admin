<template>
  <div class="container" v-show="show">
    <div class="wrap">
      <h1>{{msg}}</h1>
      <div @click="close">
        <button data-type="confirm">确认</button>
        <button data-type="cancel">取消</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: #000;
  background: rgba(0, 0, 0, 0.5);
  .wrap {
    padding: 1rem;
    background: #fff;
    border-radius: 5px;
  }
}
</style>
<script>
export default {
  name: "Dialog",
  data() {
    return {
      show: true,
      msg: "hello world"
    };
  },
  methods: {
    close(e) {
      const { type } = e.target.dataset;
      type === "confirm" ? this.resolve(type) : this.reject(type);
      this.show = false;
      this.$destroy();
    },
    alert(msg) {
      this.show = true;
      this.msg = msg;
    }
  },
  destroyed() {
    this.$el.parentNode.removeChild(this.$el);
  }
};
</script>