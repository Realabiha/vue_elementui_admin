<template>
  <div class="container" @scroll="onScroll">
    <div class="wrapper" ref="wrapper">
      <div class="wrap" v-for="(item, index) in list" :key="index" ref="wrap">
        <div v-if="current.includes(index)">
          <div class="item" v-for="(data, index) in item" :key="index">{{data}}</div>
        </div>
        <div v-else :style="{height: '100vh', width: '100vw'}"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  .wrap {
    box-sizing: border-box;
    border-bottom: 1px solid red;
    background: pink;
    .item {
      width: 100%;
      height: 10vh;
      text-align: center;
      line-height: 10vh;
      font-weight: bolder;
      background: #fff;
      box-sizing: border-box;
      border-bottom: 1px solid #000;
    }
  }
}
</style>
<script>
export default {
  name: "LongList",
  data() {
    return {
      list: [],
      current: [0, 1, 2]
    };
  },
  mounted() {
    console.log(this.$refs.wrap);
    let item = [];
    for (let i = 0; i < 10; i++) {
      item.push(this.list.length);
    }
    this.list.push(item);
  },
  methods: {
    onScroll(e) {
      const { scrollTop } = e.target;
      const { clientHeight } = document.documentElement;
      const scrollBottom =
        this.$refs.wrapper.offsetHeight - scrollTop - clientHeight;

      // 滚动到底部
      if (scrollBottom <= 300) {
        let item = [];
        for (let i = 0; i < 10; i++) {
          item.push(this.list.length);
        }
        this.list.push(item);
        this.$nextTick(_ => {
          let prev = 0;
          for (let i = 0; i < this.$refs.wrap.length; i++) {
            const wrap = this.$refs.wrap[i];
            prev += wrap.offsetHeight;
            if (
              scrollTop + clientHeight >= prev - wrap.offsetHeight &&
              scrollTop + clientHeight <= prev + wrap.offsetHeight
            ) {
              console.log(i, "页");
              this.current = [i - 1, i, i + 1];
              return;
            }
          }
        });
      } else {
        let prev = 0;
        for (let i = 0; i < this.$refs.wrap.length; i++) {
          const wrap = this.$refs.wrap[i];
          prev += wrap.offsetHeight;
          if (
            scrollTop + clientHeight >= prev - wrap.offsetHeight &&
            scrollTop + clientHeight <= prev + wrap.offsetHeight
          ) {
            console.log(i, "页");
            this.current = [i - 1, i, i + 1];
            return;
          }
        }
      }
    }
  }
};
</script>