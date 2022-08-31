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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="名称" prop="companyName" width="180">
          </el-table-column>
          <el-table-column label="联系人" prop="companyManager" width="180">
          </el-table-column>
          <el-table-column label="联系人电话" prop="managerTel" width="180">
          </el-table-column>
          <el-table-column label="联系人邮箱" prop="managerMail" width="180">
          </el-table-column>
          <el-table-column label="公司简介" prop="companyDetail" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.companyDetail }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{
                    `${scope.row.companyDetail.slice(0, 8)}......`
                  }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="companyManager" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true"
                >查看</el-button
              >
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
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
      <el-dialog
        :visible.sync="dialogVisible"
        width="83.3%"
        :before-close="handleClose"
        :show-close="false"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <div class="header_dialog">
            <div class="header_dialog_left">
              <span class="information">基本信息</span>

              <el-form-item label="编号:">
                <el-input v-model="ruleForm.serialNumber"></el-input>
              </el-form-item>

              <el-form-item label="年审状态:">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="通过"></el-radio>
                  <el-radio label="未通过"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系人电话:">
                <el-input v-model="ruleForm.outsourceNum"></el-input>
              </el-form-item>
            </div>
            <div class="header_dialog_right">
              <div class="el_dialog_btn">
                <el-button>保存</el-button>
                <el-button @click="handleClose(done)">关闭</el-button>
              </div>
              <el-form-item label="供应商名称:" prop="serialNumber">
                <el-input v-model="ruleForm.serialNumber"></el-input>
              </el-form-item>

              <el-form-item label="联系人:">
                <el-input v-model="ruleForm.statu"></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱:">
                <el-input v-model="ruleForm.statu"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="center_dialog">
            <el-form-item label="公司简介:">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="以往合作情况:">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="合作项目实施效果:">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </div>
          <div class="footer_dialog">
            <span class="spans">系统信息</span>
            <div class="footers">
              <div class="footers_left">
                <el-form-item label="归属部门" prop="region">
                  <el-select v-model="ruleForm.region">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="最后更新者" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </div>
              <div class="footers_right">
                <el-form-item label="最后更新时间" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </el-dialog>
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
        margin-top: 15px;
        .el_dialog_btn {
          float: right;

          top: -25px;
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
      input1: "",
      dialogVisible: false,
      tableData: [
        {
          companyName: "上海一同科技",
          companyManager: "澳币哈",
          managerTel: "17382342137",
          managerMail: "123@163.com",
          companyDetail:
            "计算机通信网络技术的研发，计算机信息系统安全专用产品的研发、销售（凭许可证经……",
        },
      ],
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
  methods: {
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
