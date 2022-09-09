<template>
  <h1>posts</h1>
  <!-- <div class="content-item_wrap">
    <h3>当月营业净收入（亿）- 扣除分润，利息成本，手续费</h3>
    <p>
      <el-date-picker
        format="yyyy"
        value-format="yyyy"
        v-model="month1"
        type="year"
        placeholder="选择年份"
      >
      </el-date-picker>
      年
    </p>
    <el-card shadow="hover" :body-style="{ padding: 0 }">
      <el-table
        :data="tableData"
        :cell-style="onCellStyle"
        :span-method="arraySpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column label="当月" prop="kind"> </el-table-column>
        <el-table-column prop="name"> </el-table-column>
        <el-table-column label="1月"> </el-table-column>
        <el-table-column label="2月"> </el-table-column>
        <el-table-column label="3月"> </el-table-column>
        <el-table-column label="4月"> </el-table-column>
        <el-table-column label="5月"> </el-table-column>
        <el-table-column label="6月"> </el-table-column>
        <el-table-column label="7月"> </el-table-column>
        <el-table-column label="8月"> </el-table-column>
        <el-table-column label="9月"> </el-table-column>
        <el-table-column label="10月"> </el-table-column>
        <el-table-column label="11月"> </el-table-column>
        <el-table-column label="12月"> </el-table-column>
      </el-table>
    </el-card>
  </div> -->
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: "TabPosts",
  data() {
    return {
      month1: "",
      value2: "",
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
  methods: {
    onCellStyle() {},
  },
};
</script>
