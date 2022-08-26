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
    </SubMenu>
    <el-dialog
      :visible.sync="dialogVisible"
      width="83.3%"
      :before-close="handleClose"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <div class="header_dialog">
          <div class="header_dialog_left">
            <span class="information">基本信息</span>

            <el-form-item label="编号:">
              <el-input v-model="form.serialNumber"></el-input>
            </el-form-item>

            <el-form-item label="类别:">
              <el-radio-group v-model="form.resource">
                <el-radio label="A+B"></el-radio>
                <el-radio label="A+C"></el-radio>
                <el-radio label="A+B+C"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="外包人月数:">
              <el-input v-model="form.outsourceNum"></el-input>
            </el-form-item>
            <el-form-item label="计划开始时间:">
              <el-input v-model="form.outsourceNum"></el-input>
            </el-form-item>
          </div>
          <div class="header_dialog_right">
            <div class="el_dialog_btn">
              <el-button>保存</el-button>
              <el-button @click="handleClose(done)">关闭</el-button>
            </div>
            <el-form-item label="人员申请事项:">
              <el-input v-model="form.serialNumber"></el-input>
            </el-form-item>
            <el-form-item label="类别:">
              <el-radio-group v-model="form.resource">
                <el-radio label="计时"></el-radio>
                <el-radio label="计件"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="申请单状态:">
              <el-input v-model="form.statu"></el-input>
            </el-form-item>
            <el-form-item label="计划结束时间:">
              <el-input v-model="form.statu"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="center_dialog">
          <el-form-item label="人月明细:">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="工作范围:">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </div>
        <div class="footer_dialog">
          <span class="spans">关联资源</span>
          <div class="footer_btn">
            <el-button>添加</el-button>
            <el-button>批量删除</el-button>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{
              background: 'rgb(155, 193, 250)',
              color: '#FFFFFF',
            }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="外包人员" prop="serialNumber" width="180">
            </el-table-column>
            <el-table-column label="供应商" prop="applyMatter" width="180">
            </el-table-column>
            <el-table-column label="开始时间" prop="systemName" width="180">
            </el-table-column>
            <el-table-column label="外包人月数" prop="outsourceNum" width="180">
            </el-table-column>
            <el-table-column label="结束时间" prop="genre" width="220">
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
      </el-form>
    </el-dialog>
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
      height: 150px;
      .el-form-item:nth-child(2) {
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
      overflow-y: scroll;
      .spans {
        display: block;
        font-weight: bold;
      }
      .footer_btn {
        margin-top: 30px;
        .el-button {
          height: 32px;
          text-align: center;
          line-height: 0px;
        }
      }
      .el-table {
        margin-top: 30px;
      }
    }
  }
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
      dialogVisible: false,
      tableData: [
        {
          serialNumber: "SYKJ.20220825103PX", //编号
          applyMatter: "2022苏州市苏银凯基申请", //申请事项
          systemName: "苏银凯基", //系统名称
          outsourceNum: "24", //外包人员月数
          genre: "计时", //类型
          statu: "关闭", //状态
          proposer: "逍遥", //申请人
          teamworkName: "火箭少女", //团队名称
          keyProcess: "ooppio", //关联项目
          relevancePersonnel: "二皇子", //关联人员
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
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
  onSubmit() {
    console.log("submit!");
  },
};
</script>
