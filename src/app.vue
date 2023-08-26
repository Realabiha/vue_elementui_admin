<template>
  <m-provider :skin="skin">
    <router-view></router-view>
  </m-provider>
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
  height: 100vh;
  overflow: hidden;
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
import Provider from "./components/provider";
import Layout from "./components/layout";
import { SET_DYNAMICROUTE_ACTION } from "./store/route/type";
export default {
  name: "App",
  components: {
    "m-layout": Layout,
    "m-provider": Provider
  },
  data() {
    return {
      skin: "default-skin"
    };
  },
  created() {
    // 刷新页面重新获取动态路由
    // this.$store.dispatch(
    //   SET_DYNAMICROUTE_ACTION,
    //   this.$store.state.user.userInfo
    // );
  },
  mounted() {}
};
</script>