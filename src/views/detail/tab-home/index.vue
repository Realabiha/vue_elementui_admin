<template>
  <el-card shadow="hover">
    <div class="content-item_wrap">
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
    </div>
    <div class="content-item_wrap">
      <p>
        <el-date-picker
          v-model="value1"
          value-format="M.d"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </p>
      <el-table
        :data="tableData"
        :cell-style="onCellStyle"
        :span-method="arraySpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column label="日期"> </el-table-column>
        <el-table-column label="营业净收入（亿） ">
          <el-table-column label="实际" prop="factVaule"></el-table-column>
        </el-table-column>
        <el-table-column label="营业净收入（亿） ">
          <el-table-column label="奋斗" prop="struggleValue"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: "TabHome",
  data() {
    return {
      month1: "",
      value1: [],
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
          kind: "营业收入（亿） ",
          name: "奋斗",
          month: "7",
          diffValue: "12",
          factVaule: "234",
          struggleValue: "3.2",
        },
        {
          kind: "哈哈",
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
  computed: {},
  methods: {
    onCellStyle() {},
  },
};
</script>
