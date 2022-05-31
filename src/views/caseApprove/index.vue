// 管理员案件处理(审批)
<template>
  <div>
    <div style="margin: 1rem 0; display: flex; align-items: center">
      案件编号: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入案件编号查询"></el-input>
      客户姓名: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入客户姓名查询"></el-input>
      身份证号: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入身份证号查询"></el-input>
      联系方式: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入联系方式查询"></el-input>
    </div>
    <div style="margin: 1rem 0; display: flex; align-items: center">
      逾期金额: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入逾期金额查询"></el-input>
      逾期天数: <el-input style="width: 18%; margin-right: 1rem" placeholder="请输入逾期天数查询"></el-input>
      <el-dropdown @command="onTagChange" trigger="click">
        <el-button type="primary">
          诉讼标签<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="(item) in tags" :key="item.value" :command="item.label"><span> {{ item.label }}</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="88"
      align="center"
    >
    </el-table-column>

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

    </el-table>
    <div class="sykj-caselist_btns justify-content_between" style="margin-top: 20px; display: flex">
            
          <el-button slot="reference" type="primary" @click="outerVisible = true">审批</el-button>
          
          <el-pagination
            background
            layout="prev, pager, next, sizes"
            :total="100"
            :page-sizes="[5, 10, 20]"
            :page-size="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"  
          >
          </el-pagination>
    </div>

    <el-dialog title="提示" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="提示"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form :model="form">
          <el-form-item label="拒绝理由" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">审批同意</el-button>
      <el-button type="primary" @click="innerVisible = true">审批拒绝</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
let index = 0
export default {
  name: 'CaseApprove',
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
        search: '',
        tags: [
          {label: '习惯逾期', value: '001'}, 
          {label: '易投诉', value: '002'},
          {label: '减免', value: '003'},
          {label: '展期', value: '004'},
          {label: '停催', value: '005'},
          {label: '核销', value: '006'},
          {label: '破产', value: '007'},
          {label: '失踪', value: '008'},
          {label: '死亡', value: '009'},
          {label: '欺诈', value: '010'}, 
        ],
        outerVisible: false,
        innerVisible: false
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
          message: '案件已审批',
          type: 'success',
          duration: 800
        })
      },
      onCaseRefuse(){
        this.$notify({
          message: '案件已取消审批',
          type: 'success',
          duration: 800
        })
      },
      onSearch(){
        console.log(this.search)
      },
      onTagChange(e){
        console.log(e)
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
}
</script>