<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="余额 [相对年底计]" name="first">first</el-tab-pane>
    <el-tab-pane label="余额 [相对年底计划和集中度]" name="second"
      ><el-input v-model="value2"></el-input
    ></el-tab-pane>
  </el-tabs>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: "TabPosts",
  data() {
    return {
      month1: "",
      value2: "",
      activeName: "first",
      tableData: [
        {
          kind: "营业净收入（亿） ",
          name: "实际",
          month: "7",
          diffValue: "12",
          factVaule: "234",
          struggleValue: "3.2",
        },
        {
          kind: "营业净收入（亿） ",
          name: "奋斗",
          month: "7",
          diffValue: "12",
          factVaule: "234",
          struggleValue: "3.2",
        },
        {
          kind: "哈哈哈",
          name: "实际",
          month: "7",
          diffValue: "12",
          factVaule: "234",
          struggleValue: "3.2",
        },
        {
          kind: "哈哈哈",
          name: "奋斗",
          month: "7",
          diffValue: "12",
          factVaule: "234",
          struggleValue: "3.2",
        },
      ].sort((a, b) => a.kind - b.kind),
    };
  },
  props: {},
  computed: {
    spanArr() {
      // let pos = -1
      const tableData = this.tableData;
      return tableData.reduce((prev, item, index) => {
        const { kind } = item;
        if (prev[kind] === undefined) {
          // pos = index
          prev[kind] = [index, 1, 1];
        } else {
          prev[kind][1]++;
        }
        return prev;
      }, {});
    },
  },
  activated() {
    console.log("actived");
  },
  deactivated() {},
  methods: {
    onCellStyle() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
