<template>
  <div class="market-container_wrap">
    <SubMenu>
      <div class="submenu-default_wrap">
        <!-- <el-input
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
        </div> -->
      </div>
      <template #content>
        <div class="submenu-content_wrap">
          <div class="content-item_wrap">
            <h3>损益分析</h3>
            <p>
              <el-date-picker
                format="M"
                value-format="M"
                v-model="month2"
                type="month"
                placeholder="选择月份"
              >
              </el-date-picker>
              月
            </p>
            <el-card shadow="hover" :body-style="{ padding: 0 }">
              <el-table
                :data="tableData"
                :cell-style="onCellStyle"
                :span-method="arraySpanMethod"
                border
                style="width: 100%"
              >
                <el-table-column prop="kind"> </el-table-column>
                <el-table-column prop="name"> </el-table-column>
                <el-table-column label="实际" width="180">
                  <el-table-column label="7月" prop="factVaule">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="奋斗">
                  <el-table-column label="7月" prop="struggleValue">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="差异">
                  <el-table-column prop="diffValue" label="250/1.3">
                  </el-table-column>
                </el-table-column>
                <el-table-column width="50"></el-table-column>
                <el-table-column label="实际" width="180">
                  <el-table-column label="7月" prop="factVaule">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="奋斗">
                  <el-table-column label="7月" prop="struggleValue">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="差异">
                  <el-table-column prop="diffValue" label="250/1.3">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="实际" width="180">
                  <el-table-column label="7月" prop="factVaule">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="奋斗">
                  <el-table-column label="2022全年" prop="struggleValue">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="完成"></el-table-column>
              </el-table>
            </el-card>
          </div>
        </div>
      </template>
    </SubMenu>
  </div>
</template>
<style lang="scss" scoped>
.market-container_wrap {
  .submenu-default_wrap {
    @include flex;
    flex: 1;
    @include justify-content(space-between);
    .search {
      width: 377px;
      height: 36px;
    }
  }
  .submenu-content_wrap {
    padding: 0 40px;
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
            .el-button {
              height: 25px;
              text-align: center;
              line-height: 0px;
            }
            .el-button:nth-child(1) {
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
}
</style>
<script>
import SubMenu from "../../components/submenu";
export default {
  name: "Human",
  components: {
    SubMenu,
  },
  data() {
    return {
      input1: "",
      month2: "",
      // 可以 后台提供 kind(指标)
      // name(不良率) month(月份)  diffValue(差异值)
      // factVaule(实际值) struggleValue（奋斗值）
      // 提供成这样？
      tableData: [
        {
          kind: "%日均",
          name: "不良金额（亿） - 人 口径",
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
    onCellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
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
