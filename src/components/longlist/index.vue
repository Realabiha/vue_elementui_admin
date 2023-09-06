<template>
  <div class="container" @scroll="calcHeight">
    <div class="wrapper" ref="wrapper">
      <div
        class="wrap"
        v-for="(item, index) in views.length ? views : list"
        :key="index"
        ref="wrap"
      >
        <div v-if="item.height" :style="{height: `${item.height}px`, width: '100%'}"></div>
        <div v-else class="item" v-for="(data, i) in item" :key="i">{{data}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  .wrapper {
    width: 100%;
    .wrap {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      background: pink;
      .item {
        width: 100%;
        height: 15vh;
        text-align: center;
        line-height: 15vh;
        font-weight: bolder;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
      }
      .placeholder {
        width: 100%;
        height: 100vh;
      }
    }
  }
}
</style>
<script>
import { debounce } from "../../utils/debounce";
export default {
  name: "LongList",
  data() {
    return {
      list: [],
      views: [],
      heights: [],
      debounce
    };
  },
  mounted() {
    const data = this.getData();
    this.list.push(data);
    this.$nextTick(_ => {
      const wraps = this.$refs.wrap;
      this.heights = wraps.map(item => item.offsetHeight);
    });
  },
  methods: {
    // onScroll(e) {
    //   const calcHeight = this.calcHeight;
    //   debounce(calcHeight)(e);
    // },
    calcHeight: debounce(function(e) {
      const { scrollTop } = e.target;
      const { clientHeight } = document.documentElement;
      const scrollBottom =
        this.$refs.wrapper.offsetHeight - scrollTop - clientHeight;

      const calc = _ => {
        const scrollHeight = scrollTop - clientHeight;
        let prevHeight = 0;
        for (let i = 0; i < this.heights.length; i++) {
          const height = this.heights[i];
          prevHeight += height;
          if (prevHeight >= scrollHeight) {
            this.views = this.list.map((item, j) => {
              if (j >= i - 2 && j <= i + 2) {
                return item;
              }
              return { height };
            });
            return;
          }
        }
      };

      // 滚动到底部
      if (scrollBottom <= 10) {
        const data = this.getData();
        this.list.push(data);
        this.$nextTick(_ => {
          this.heights.push(
            this.$refs.wrap[this.$refs.wrap.length - 1].offsetHeight
          );

          this.$nextTick(calc);
        });
        return;
      } else {
        calc();
      }
    }),
    getData() {
      let item = [];
      for (let i = 0; i < 10; i++) {
        item.push(this.list.length);
      }
      return item;
    }
  }
};
</script>
 
       