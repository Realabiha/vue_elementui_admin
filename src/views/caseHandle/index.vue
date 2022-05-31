// 案件处理
<template>
  <div>
    <div style="margin: 2rem 0; justify-content: space-around; display: flex; align-items: center">
      案件编号: <el-input style="width: 18%" placeholder="请输入案件编号查询" suffix-icon="el-icon-search"></el-input>
      客户姓名: <el-input style="width: 18%" placeholder="请输入客户姓名查询" suffix-icon="el-icon-search"></el-input>
      身份证号: <el-input style="width: 18%" placeholder="请输入身份证号查询" suffix-icon="el-icon-search"></el-input>
      联系方式: <el-input style="width: 18%" placeholder="请输入联系方式查询" suffix-icon="el-icon-search"></el-input>
    </div>
    <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          >
          <el-table-column
            align="center"
            label="案件编号"
          >
            <template slot-scope="scope">{{ scope.row.caseNo }}</template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式"
          >
          </el-table-column>
          <el-table-column
              prop="tag"
              label="诉讼标签"
              :filters="[{ text: '习惯逾期', value: '习惯逾期' }, { text: '破产', value: '破产' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag > 2 ? 'primary' : 'success'"
                  disable-transitions
                >
                  {{scope.row.tag > 2 ? '习惯逾期' : '破产'}}
                </el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="precess"
            label="当前环节"
            show-overflow-tooltip
            :filters="[{ text: '司法介入', value: '司法介入' }, { text: '已完成', value: '已完成' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >

          </el-table-column>
          <el-table-column
            prop="dealtime"
            label="处理时间"
            sortable
          >
          </el-table-column>
          <el-table-column label="详情展示">
            <!-- <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                suffix-icon="el-icon-search"
                @blur="onSearch"
              />
            </template> -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEditCase(scope.$index, scope.row)"
                >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleCaseDetail(scope.$index, scope.row)"
                >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
let index = 0
export default {
  name: 'CaseHandle',
  data() {
      return {
        activeName: 'first',
        tableData: [
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: Math.random(0, 1) * 4,
            precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
            dealtime: '2022/5/9 15:41'
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: Math.random(0, 1) * 4,
            precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
            dealtime: '2022/5/10 15:41'
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: Math.random(0, 1) * 4,
            precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
            dealtime: '2022/5/1 15:41'
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: Math.random(0, 1) * 4,
            precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
            dealtime: '2022/5/10 15:41'
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: Math.random(0, 1) * 4,
            precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
            dealtime: '2022/5/14 15:41'
          },
        ],
        multipleSelection: [],
        dialogFormVisible: false,
        form: {
          name: '这是一个退回理由'
        },
        formLabelWidth: '80px',
        search: ''
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleEditCase(){
        this.$router.push('/layout/caseEdit')
      },
      handleCaseDetail(index, row) {
        this.$router.push('/layout/logDetail')
      },
      onLayerApponit(){
        this.$notify({
          message: '委派成功',
          type: 'success',
          duration: 800
        })
      },
      onCaseBack(){
        this.dialogFormVisible = false
        this.$notify({
          message: '案件已退回',
          type: 'success',
          duration: 800
        })
      },
      onCaseAccept(){
        this.$notify({
          message: '案件已接受',
          type: 'success',
          duration: 800
        })
      },
      onSearch(){
        console.log(this.search)
      }
    }
}
</script>