<template>
  <router-view></router-view>
</template>
<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotete(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  // min-width: 1280px;
  height: 100vh;
  overflow-x: scroll;
  box-sizing: border-box;
  background: #fff;
  ::-webkit-scrollbar {
    width: 1px;
  }
  .justify-content_between {
    @include justify-content(space-between);
  }
  .justify-content_center {
    @include justify-content(center);
  }
  .padding-0 {
    padding: 0;
  }
  .rotating {
    animation: rotate 1000ms ease infinite;
  }
  .full-inline_block {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .border-box {
    box-sizing: border-box;
  }
}
</style>
<script>
import Layout from "./components/layout";
export default {
  name: "App",
  components: {
    "m-layout": Layout,
  },
  data() {
    return {};
  },
  beforeCreate() {},
  mounted() {},
};
</script>
