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
        <el-tabs tab-position="left" style="height: calc(100vh - 140px);">
          <el-tab-pane label="用户管理">
            <h1>用户管理</h1>
            
          </el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
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
