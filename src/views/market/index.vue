<template>
  <div class="market-container_wrap">
    <SubMenu>
      <div class="submenu-default_wrap">
        <el-input
          class="search"
          placeholder="输入名称或者描述进行查找"
          suffix-icon="el-icon-search"
          v-model="input1"
        >
        </el-input>
        <div>
          <el-button>导入</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-plus">新建</el-button>
          <el-button type="danger">批量删除</el-button>
        </div>
      </div>
      <template #content>
         <el-date-picker
      v-model="value1"
      type="month"
      placeholder="选择日期">
    </el-date-picker>
         <el-table
      :data="tableData"
      :cell-style="onCellStyle"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
      <el-table-column
        prop="typeid"
      >

      </el-table-column>
      <el-table-column
        prop="title"
      >
        
      </el-table-column>
      <el-table-column
        label="ID"
        width="180">
        <el-table-column
          label="7月"
          prop="id">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="姓名">
        <el-table-column
          label="7月"
          prop="name"

        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="数值 1">
        <el-table-column
          prop="amount1"
          label="7月"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="数值 2">
        <el-table-column
          label="7月"
          prop="amount2"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
      </template>
    </SubMenu>
  </div>
</template>
<style lang="scss" scoped>
.submenu-default_wrap {
  @include flex;
  flex: 1;
  @include justify-content(space-between);
  .search {
    width: 377px;
    height: 36px;
  }
}
::v-deep .el-dialog__wrapper {
  width: 100%;
  height: 83%;
  overflow: hidden;
  .el-dialog {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .el-dialog__body {
      height: 100%;
      margin-right: 25px;
    }
  }
  .el-form {
    width: 100%;
    height: 100%;

    .el-form-item {
      width: 100%;
      height: 25px;
      margin-bottom: 22px;
      float: left;
      .el-form-item__content {
        width: 83.3%;
        height: 90px;
        .el-form-item__error {
          color: #f56c6c;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
          position: absolute;
          top: 35%;
          left: 0;
        }
      }
      .el-input {
        width: 80%;
        .el-input__inner {
          height: 25px;
          line-height: 25px;
        }
      }
    }
    .center_dialog {
      width: 100%;
      height: 250px;
      .el-form-item:nth-child(2) {
        padding-top: 25px;
      }
      .el-form-item:nth-child(3) {
        padding-top: 25px;
      }
      .el-form-item:nth-child(1) {
        padding-top: 25px;
      }
    }
    .header_dialog {
      width: 100%;
      display: flex;
      .header_dialog_left {
        width: 50%;
        .information {
          display: block;
          font-weight: bold;
          margin-bottom: 25px;
          margin-top: -29px;
        }
      }
      .header_dialog_right {
        width: 50%;
        .el_dialog_btn {
          float: right;
          margin-top: -25px;
          .el-button{
            height: 25px;
            text-align: center;
            line-height: 0px;
          }
          .el-button:nth-child(1){
            background: rgb(127, 127, 238);
            color: #fff;
          }
        }
        .el-form {
          width: 100%;
          height: 100%;
          margin-top: 40px;
          .el-form-item {
            width: 100%;
            height: 25px;
            margin-bottom: 12px;
            .el-input {
              width: 80%;
              .el-input__inner {
                height: 25px;
                line-height: 25px;
              }
            }
          }
        }
      }
    }
    .footer_dialog {
      width: 100%;
      span {
        font-weight: bold;
      }
      .footers {
        width: 100%;
        margin-top: 25px;
        display: flex;
        .footers_left {
          width: 50%;
        }
        .footers_right {
          width: 50%;
        }
      }
    }
  }
}
</style>
<script>
import SubMenu from "../../components/submenu";
export default {
  name: "Market",
  components: {
    SubMenu,
  },
  data() {
    return {
      value1: new Date(),
      input1: "",
      dialogVisible: false,
      tableData: [
        {
          typeid: '103',
          title: '不良金额（亿） - 人 口径',
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          typeid: '123',
          title: '不良率 - 人 口径',
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          typeid: '123',
          title: '拨备覆盖率 - 人 口径',
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          typeid: '113',
          title: '不良率 - 借条',
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          typeid: '456',
          title: '逾期率 - 借条',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '456',
          title: '拨贷比',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '46',
          title: '拨备覆盖率 - 借条',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '789',
          title: '贷款余额 （亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '7890',
          title: '不良贷款金额（亿）  - 借条',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '789',
          title: '累计核销金额（亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '7890',
          title: '逾欠息贷款余额（亿）- 借条',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '789',
          title: '拨备金额 （亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '789',
          title: '累计营业净收入（亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '012',
          title: '累计 信用减值损失（亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '012',
          title: '其中：当月拨备增额',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '012',
          title: '其中：当月核销增额',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          typeid: '012',
          title: '累计税后净利润（亿）',
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
        ].sort((a, b) => a.typeid - b.typeid),
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        serialNumber: "",
      },
      rules: {
        serialNumber: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
      },
    };
  },
  props: {},
  computed: {
    spanArr(){
      // let pos = -1
      const tableData = this.tableData
      return tableData.reduce((prev, item, index) => {
        const {typeid} = item
        if(prev[typeid] === undefined){
          // pos = index
          prev[typeid] = [index, 1, 1]
        }else{
          prev[typeid][1]++
        }
        return prev
      }, {})
    }
  },
  methods: {
    onCellStyle({row, column, rowIndex, columnIndex}){
      // console.log(row, column, rowIndex, columnIndex)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex == 0){
        const {typeid} = row        
        if(rowIndex === this.spanArr[typeid][0]){
          const result =  this.spanArr[typeid].slice(1)
          console.log(typeid, rowIndex, result)
          return result
        }
        return [0, 0]

        // if(rowIndex < 3){
        //   return [1, 1]
        // }else if(rowIndex === 3){
        //   return [4, 1]
        // }else if(rowIndex === 7){
        //   return [5, 1]
        // }else if(rowIndex === 12){
        //   return [5, 1]
        // }else{
        //   return [0, 0]
        // }
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")

        .then((_) => {
          this.dialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
