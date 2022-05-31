// 案件列表
<template>
  <div class="sykj-caselist_wrap">
    <div class="sykj-search_wrap" style="margin: 1rem 0; display: flex; align-items: center">
      案件编号： <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入案件编号查询" 
        clearable
        v-model="search.caseNo"
      ></el-input>
      客户姓名： <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入客户姓名查询" 
        clearable
        v-model="search.customerName"
      ></el-input>
      身份证号： <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入身份证号查询" 
        clearable
        v-model="search.idCard"
      ></el-input>
      联系方式： <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入联系方式查询" 
        clearable
        v-model="search.phone"
      ></el-input>
    </div>
    <div style="margin: 1rem 0; display: flex; align-items: center">
      逾期金额： 
      <el-select v-model="search.region" value="shanghai" placeholder="请选择金额区间">
        <el-option label="大于" value="shanghai"></el-option>
        <el-option label="小于" value="beijing"></el-option>
      </el-select>
      <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入逾期金额查询" 
        clearable
        v-model="search.totalOverdue"
      ></el-input>
      逾期天数： <el-input 
        style="width: 18%; margin-right: 1rem" 
        placeholder="请输入逾期天数查询" 
        clearable
        v-model="search.overdueDays"
      ></el-input>
      <el-dropdown @command="onTagChange" trigger="click" style="margin-right: 1rem">
        <el-button type="primary">
          诉讼标签<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="(item) in tags" :key="item.value" :command="item.label"><span> {{ item.label }}</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" style="margin-right: 1rem; align-self=flex-end">查询</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="onTabClick">
      <el-tab-pane label="待确认" name="first">
        <el-table
          v-loading.fullscreen="loading"
          :default-sort="{prop: 'date'}"
          ref="multipleTable"
          :data="tableData"
          :row-key="row => row.caseNo"
          tooltip-effect="dark"
          style="width: 100%"
          @select="handleSelect"
          @select-all="handleSelectAll"
        >
          <el-table-column
            type="selection"
            width="88"
            align="center"
            reserve-selection
          >
          </el-table-column>
          <el-table-column
            prop="date" 
            label="日期"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="案件编号"
          >
            <template slot-scope="scope">{{ scope.row.caseNo }}</template>
          </el-table-column>
          <el-table-column
            prop="lawyer"
            label="律师"
          >
          </el-table-column>
          <el-table-column
            prop="lawFirms"
            label="律所"
          >
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证号"
            :formatter="(row, column) => row.idCard.replace(row.idCard.slice(4, -4), '****')"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式"
          >
          </el-table-column>
          <!-- <el-table-column
              prop="tag"
              label="诉讼标签"
              :filters="[{ text: '习惯逾期', value: '2' }, { text: '破产', value: '1' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag == 2 ? 'primary' : 'success'"
                  disable-transitions
                >
                  {{scope.row.tag == 2 ? '习惯逾期' : '破产'}}
                </el-tag>
              </template>
          </el-table-column> -->
          <el-table-column
            prop="totalOverdue"
            label="逾期总额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="overdueDays"
            label="逾期天数"
          >
          </el-table-column>
          <el-table-column>
            <!-- <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @blur="onSearch"
                suffix-icon="el-icon-search"
              />
            </template> -->
            <template slot-scope="scope">
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
        <div class="sykj-caselist_btns justify-content_between" style="margin-top: 20px; display: flex">
          <div>
            <el-checkbox v-model="selectAll">选择全部</el-checkbox>
            <el-button type="danger" @click="dialogFormVisible = true">退回</el-button>
            <el-popconfirm
              title="确认此操作吗？"
              @confirm="onCaseAccept"
            >
              <el-button slot="reference" type="primary">接受</el-button>
            </el-popconfirm>
            <el-dropdown 
              split-button 
              type="warning" 
              @command="onLayerChoose"
              @click="onLayerApponit"
            >
              委派 {{lawyer}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  v-for="(item) in layers" :key="item.value" :command="item.label"><span> {{ item.label }}</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-pagination
            background
            layout="prev, pager, next, sizes"
            :total="tableData.length"
            :page-sizes="[5, 10, 20]"
            :page-size="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"  
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已接受" name="second">
        <el-empty description="暂无数据"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="已委外" name="third">
        <el-empty description="暂无数据"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="已退回" name="fourth">
        <el-empty description="暂无数据"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="已结案" name="five">
        <el-empty description="暂无数据"></el-empty>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogFormVisible">
      <div slot="title">
        <i class="el-icon-warning-outline"></i>
        <span>退回理由</span>
      </div>
      <el-form :model="form">
        <el-form-item label="原因" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCaseBack">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2">
      <div slot="title">
        <i class="el-icon-warning-outline"></i>
        <span>委派律师{{lawyer}}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="onCaseBack2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.sykj-caselist_wrap{
  @include flex-column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .sykj-caselist_btns{
    align-items: center;
    width: 100%;
    padding: .5rem 1rem;
    box-sizing: border-box;
  }
}
</style>
<script>
let index = 0
  export default {
    name: 'CaseList',
    data() {
      return {
        activeName: 'first',
        tableData: [
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: 2,
            totalOverdue: Math.random(0, 1) * 1086112 + 666,
            overdueDays: Math.random(0, 1) * 30,
            lawyer: '',
            lawFirm: '',
            date: '2016-06-02',
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: 1,
            totalOverdue: Math.random(0, 1) * 1086112 + 666,
            overdueDays: Math.random(0, 1) * 30,
            lawyer: '',
            lawFirm: '',
            date: '2017-05-02',
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: 2,
            totalOverdue: Math.random(0, 1) * 1086112 + 666,
            overdueDays: Math.random(0, 1) * 30,
            lawyer: '',
            lawFirm: '',
            date: '2016-05-12',
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: 2,
            totalOverdue: Math.random(0, 1) * 1086112 + 666,
            overdueDays: Math.random(0, 1) * 30,
            lawyer: '',
            lawFirm: '',
            date: '2016-06-02',
          },
          {
            caseNo: ++index,
            customerName: 'abiha',
            idCard: '27298475810948742',
            phone: '16397162076',
            tag: 1,
            totalOverdue: Math.random(0, 1) * 1086112 + 666,
            overdueDays: Math.random(0, 1) * 30,
            lawyer: '吉米',
            lawFirm: '吉米律所',
            date: '2016-05-02',
          }
        ],
        multipleSelection: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          name: ''
        },
        formLabelWidth: '80px',
        search: {
          caseNo: '',
          customerName: '',
          idCard: '',
          totalOverdue: '',
          tag: '',
          region: 'shanghai'
        },
        lawyer: '',
        layers: [
          {value: '0', label: '吉米'},
          {value: '1', label: '半藏'},
          {value: '2', label: '阿尔萨斯'},
          {value: '3', label: '张三'}
        ],
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
        loading: false,
        selectAll: false,
        allData: []
      }
    },
    methods: {
      handleSelect(_, row){
        if(this.selectAll){
          this.$confirm('已选择全部案件, 是否取消选择?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            // setTimeout(_ => this.selectAll = false)
            this.selectAll = false
          })
          .catch(() => {
            this.$refs.multipleTable.toggleRowSelection(row, true)

            // 修改selectAll的值页面未更新
            // this.$nextTick(_ => {
            //   this.selectAll = true
            // })
            // setTimeout(_ => {
            //   this.selectAll = true
            // })

            // this.selectAll = Math.random()
          });
        }
      },
      handleSelectAll(val){
        if(this.selectAll){
          this.$confirm('已选择全部案件, 是否取消选择?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.selectAll = false
          })
          .catch(() => {
            this.tableData.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            })
          });
        }
      },
      onTabClick(tab, event) {
        console.log(tab, event);
      },
      filterTag(value, row) {
        return row.tag >= value;
      },
      handleCaseDetail(index, row) {
        this.$router.push(`/layout/caseDetail/${index}`)
      },
      onLayerChoose(lawyer){
        this.lawyer = lawyer
      },
      onLayerApponit(){
        if(!this.lawyer) return this.$notify({message: '请先选择委派律师', type: 'warning', duration: 800})
        this.dialogFormVisible2 = true
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
        // this.lawyer = ''
      },
      onCaseBack2(){
        this.dialogFormVisible2 = false
        this.$notify({
          message: '委派成功',
          type: 'success',
          duration: 800
        })
      },
      onTagChange(e){
        this.search.tag = e
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
    watch: {
      async selectAll(n, o){
        // 全选
        if(n){
          // 获取全部数据
          await 1
          this.multipleSelection = this.tableData
          // 遍历数据并更新表格选中ui
          this.tableData.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        // 取消全选
        }else{
          this.$refs.multipleTable.clearSelection()
          this.multipleSelection = []
        }
      }
    }
  }
</script>