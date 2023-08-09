<template>
  <div>
    <div ref="chart" :style="{width, height}"></div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  props: {
    width: {
      type: String,
      default: "600px"
    },
    height: {
      type: String,
      default: "400px"
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this, "chart this");
    this.render();
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.$echart = echarts.init(this.$refs.chart);
    },
    render() {
      !this.$echart && this.init();
      // 绘制图表
      this.$echart?.setOption(this.options);
    },
    resize() {
      this.$echart?.resize();
    }
  },
  watch: {
    options() {
      this.render();
      this.resize();
    }
  },
  destroyed() {
    this.$echart?.dispose();
  }
};
</script>