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
        <el-table :data="tableData" style="width: 100%; ursor: pointer">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="编号" prop="serialNumber" width="180">
          </el-table-column>
          <el-table-column label="申请事项" prop="applyMatter" width="180">
          </el-table-column>
          <el-table-column label="系统名称" prop="systemName" width="140">
          </el-table-column>
          <el-table-column label="外包人月数" prop="outsourceNum" width="130">
          </el-table-column>
          <el-table-column label="类型" prop="genre" width="100">
          </el-table-column>
          <el-table-column label="状态" prop="statu" width="100">
          </el-table-column>
          <el-table-column label="申请人" prop="proposer" width="100">
          </el-table-column>
          <el-table-column label="团队名称" prop="teamworkName" width="150">
          </el-table-column>
          <el-table-column label="关联项目" prop="keyProcess" width="180">
          </el-table-column>
          <el-table-column
            label="关联人员"
            prop="relevancePersonnel"
            width="100"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              
              <el-button size="mini" @click="outerVisible = true"
                >查看</el-button
              >
              <el-button size="mini" @click="outerVisible = true"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </SubMenu>
    <el-form ref="form" :model="form" label-width="100px">
      <el-dialog
        title=""
        :visible.sync="outerVisible"
        :close-on-click-modal="false"
        :before-close="handleClose"
        :show-close="false"
        width="83%"
      >
        <div class="el_tab_body">
          <div class="el_header">
            <div></div>
            <div></div>
            <div>
              <el-button @click="handleClose(done)">关 闭</el-button>
              <el-button type="primary" @click="outerVisible = false"
                >保 存</el-button
              >
            </div>
          </div>
          <div class="el_const">
            <div class="el_const_head">
              <div class="el_const_head_left">
                <span class="Information">基本信息</span>
                <el-form-item label="编号:">
                  <el-input v-model="form.serialNumber"></el-input>
                </el-form-item>
                <el-form-item label="类别:">
                  <el-radio-group v-model="form.className">
                    <el-radio label="A+B"></el-radio>
                    <el-radio label="A+C"></el-radio>
                    <el-radio label="A+B+C"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="外包人月数:">
                  <el-input v-model="form.outsourceNum"></el-input>
                </el-form-item>
                <el-form-item label="计划开始时间:">
                  <el-input v-model="form.DayDate"></el-input>
                </el-form-item>
              </div>
              <div class="el_const_head_right">
                <el-form-item label="人力申请事项:">
                  <el-input v-model="form.humanCost"></el-input>
                </el-form-item>
                <el-form-item label="类别:">
                  <el-radio-group v-model="form.classifier">
                    <el-radio label="计时"></el-radio>
                    <el-radio label="计件"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="申请单状态:">
                  <el-input v-model="form.applyStatus"></el-input>
                </el-form-item>
                <el-form-item label="计划结束时间:">
                  <el-input v-model="form.EndDate"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="el_const_cent">
              <el-form-item label="人员明细:">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="工作范围:">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="el_footer">
            <span class="related_Objects">关联资源</span>
            <div class="el_footer_btn">
              <el-button type="primary" @click="innerVisible = true"
                >添加</el-button
              >
              <el-button>批量删除</el-button>
            </div>
            <el-table
              :data="tableDataDetail"
              style="width: 90%"
              :header-cell-style="{
                background: 'rgb(155, 193, 250)',
                color: '#FFFFFF',
              }"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="外包人员" prop="serialNumber" width="350">
              </el-table-column>
              <el-table-column label="供应商" prop="applyMatter" width="350">
              </el-table-column>
              <el-table-column label="开始时间" prop="systemName" width="280">
              </el-table-column>
              <el-table-column label="结束时间" prop="outsourceNum" width="280">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-dialog
          width="60%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body
        >
          <!-- 123// -->
        </el-dialog>
      </el-dialog>
    </el-form>
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
::v-deep .el-form {
  .el-form-item {
    width: 100%;
    height: 28px;
    margin-bottom: 25px;
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
  .el-dialog__wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-dialog {
      width: 83%;
      height: 100%;
      overflow-y: scroll;
      .el-dialog__body {
        width: 98%;
        height: 100%;
        .el_tab_body {
          width: 100%;
          height: 100vh;
          overflow-y: "hidden";
          display: flex;
          flex-direction: column;
          .el_header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          .el_const {
            width: 100%;
            height: 400px;
            .el_const_head {
              width: 100%;
              display: flex;
              align-items: center;
              .el_const_head_left {
                width: 50%;
                .Information {
                  display: block;
                  margin-top: -50px;
                  font-weight: bold;
                  font-size: 14px;
                  margin-bottom: 30px;
                }
              }
              .el_const_head_right {
                width: 50%;
              }
            }
            .el_const_cent {
              .el-form-item {
                margin-bottom: 55px;
              }
            }
          }
          .el_footer {
            width: 100%;
            overflow-y: scroll;
            .related_Objects {
              display: block;
              font-weight: bold;
            }
            .el_footer_btn {
              width: 100%;
              height: 40px;
              margin-top: 30px;
              .el-button {
                width: 98px;
              }
            }
            .el-table {
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-table tbody tr:hover > td {
    background-color: rgb(226,244,255) !important;
}
</style>
<script>
import SubMenu from "../../components/submenu";
export default {
  name: "Detail",
  components: {
    SubMenu,
  },
  data() {
    return {
      input1: "",
      outerVisible: false,
      innerVisible: false,
      tableData: [
        {
          serialNumber: "SYKJ.20220825103PX", //编号
          applyMatter: "2022苏州市苏银凯基申请", //申请事项
          systemName: "苏银凯基", //系统名称
          outsourceNum: "24", //外包人员月数
          genre: "计时", //类型
          statu: "关闭", //状态
          proposer: "逍遥", //申请人
          teamworkName: "平底锅少女", //团队名称
          keyProcess: "ooppio", //关联项目
          relevancePersonnel: "二皇子", //关联人员
        },
      ],
      tableDataDetail: [
        {
          serialNumber: "SYKJ.20220825103PX", //编号
          applyMatter: "2022苏州市苏银凯基申请", //申请事项
          systemName: "苏银凯基", //系统名称
          outsourceNum: "24", //外包人员月数
        },
      ],
      form: {
        serialNumber: "SYKJ.20220825103PX",
        DayDate: "2022",
        outsourceNum: "2222",
        className: "A+B+C",
        humanCost: "喜茶暴柠茶",
        classifier: "计时",
        applyStatus: "状态",
        EndDate: "2022-08-02",
      },
    };
  },
  props: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.outerVisible = false;
          done();
        })
        .catch((_) => {});
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
