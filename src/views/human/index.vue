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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .el-dialog__wrapper {
  width: 100%;
  height: 83%;
  .el-dialog__body {
    width: 100%;
    height: 83%;
    .el-form {
      width: 100%;
      height: 100%;
      .el-form-item {
        .el-form-item__content {
          .el-input {
            .el-input__inner {
              height: 25px;
              line-height: 25px;
            }
          }
        }
      }
    }
    .head1 {
      width: 100%;
      height: 100%;
      display: flex;
      .right_bottom {
        width: 100%;
        height: 265px;
      }
      .el_dialog_left {
        width: 50%;
        .information {
          margin-top: -20px;
          display: block;
          font-weight: bold;
        }
      }
      .el_dialog_right {
        width: 50%;
        margin-right: 65px;
      }
    }
    .head2 {
      width: 100%;
      height: 100%;
      display: flex;
      .head2_left {
        width: 50%;
        .information {
          margin-top: -20px;
          display: block;
          font-weight: bold;
        }
      }
      .head2_right {
        width: 50%;
        margin-right: 65px;
      }
    }
    .head3 {
      width: 100%;
      height: 100%;
      margin-top: 25px;
      display: flex;
      .head3_left {
        width: 50%;
        .information {
          margin-top: -20px;
          display: block;
          font-weight: bold;
        }
      }
      .head3_right {
        width: 50%;
        margin-right: 65px;
      }
    }
  }
  .el-dialog__header {
    .el-dialog__title {
      font-weight: bold;
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
      value1: "",
      radio: "1",
      dialogVisible: false,
      imageUrl: "",
      tableData: [
        {
          supplierName: "上海一同科技", //供应商名称
          supplierOfName: "澳币哈", //姓名
          managerTelContactNumber: "17382342137", //联系人电话
          suppleStatu: "在世", //状态
          PersonnelCategory: "技术部", //人员类别
          WorkingPlace: "苏州市", //工作地点
          projectManager: "逍遥", //行方项目经理
        },
      ],
      //表单
      ruleForm: {
        name: "",
        statu: "",
        category: "",
        resource: "",
        Workingplace: "",
        bankManager: "",
        interviewTime: "",
        interviewResults: "",
        attendance: "",
        TheInterviewer: "",
      },
      //正则验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        managerTelContactNumber: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
        ],
        category: [{ required: true, message: "请选择类别", trigger: "blur" }],
        Outsourcing: [
          {
            required: true,
            message: "请选择系统",
            trigger: "blur",
          },
        ],
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        resource: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        bankManager: [
          { required: true, message: "请选择行方项目经理", trigger: "blur" },
        ],
        Workingplace: [
          { required: true, message: "请选择工作地点", trigger: "change" },
        ],
      },
    };
  },
  props: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  },
};
</script>
