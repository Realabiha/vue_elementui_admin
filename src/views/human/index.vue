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
          <el-table-column label="供应商名称" prop="supplierName" width="180">
          </el-table-column>
          <el-table-column label="姓名" prop="supplierOfName" width="180">
          </el-table-column>
          <el-table-column
            label="联系人电话"
            prop="managerTelContactNumber"
            width="180"
          >
          </el-table-column>
          <el-table-column label="状态" prop="suppleStatu" width="180">
          </el-table-column>
          <el-table-column
            label="人员类别"
            prop="PersonnelCategory"
            width="180"
          >
          </el-table-column>
          <el-table-column label="工作地点" prop="WorkingPlace" width="180">
          </el-table-column>
          <el-table-column
            label="行方项目经理"
            prop="projectManager"
            width="180"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                class="btn1"
                >查看</el-button
              >
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                class="btn1"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                class="btn1"
                >删除</el-button
              >
              <el-button type="text" @click="dialogVisible = true"
                >点击打开 Dialog</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </SubMenu>
    <!-- 弹窗 -->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="83.3%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="head1">
          <div class="el_dialog_left">
            <span class="information"> 基本信息 </span>

            <el-form-item label="姓名:" prop="name">
              <el-input v-model="ruleForm.name" class="el_input_c"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="statu">
              <el-input v-model="ruleForm.name" class="el_input_c"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话:" prop="managerTelContactNumber">
              <el-input
                v-model="ruleForm.managerTelContactNumber"
                class="el_input_c"
              ></el-input>
            </el-form-item>
            <el-form-item label="最高学历" prop="region" class="input_D">
              <el-select v-model="ruleForm.region" placeholder="请选择学历">
                <el-option label="本科" value="shanghai"></el-option>
                <el-option label="研究生" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="姓名:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item> -->
            <el-form-item label="参加工作时间:" prop="time" class="input_D">
              <el-input v-model="ruleForm.name" class="el_input_c"></el-input>
            </el-form-item>
            <el-form-item label="类别:" prop="category" class="input_D">
              <el-select v-model="ruleForm.category" placeholder="请选择类别">
                <el-option label="项目人力" value="shanghai"></el-option>
                <el-option label="外包人力" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外包系统:" prop="Outsourcing" class="input_D">
              <el-select
                v-model="ruleForm.Outsourcing"
                placeholder="请选择类别:"
              >
                <el-option label="项目人力" value="shanghai"></el-option>
                <el-option label="外包人力" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el_dialog_right">
            <el-form-item label="供应商名称:" prop="supplierName">
              <el-input v-model="ruleForm.supplierName"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系人邮箱:" prop="contactEmail">
              <el-input v-model="ruleForm.contactEmail"></el-input>
            </el-form-item>
            <el-form-item
              label="技术方向:"
              prop="Technicaldirection"
              class="input_D"
            >
              <el-select v-model="ruleForm.Technicaldirection">
                <el-option label="本科" value="shanghai"></el-option>
                <el-option label="研究生" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="人员角色:" prop="Therole" class="input_D">
              <el-select v-model="ruleForm.Therole">
                <el-option label="本科" value="shanghai"></el-option>
                <el-option label="研究生" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行方项目经理:" prop="bankManager">
              <el-select
                v-model="ruleForm.bankManager"
                placeholder="请选择行方项目经理"
              >
                <el-option label="优酸乳" value="shanghai"></el-option>
                <el-option label="蒙牛" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作地点:" prop="Workingplace">
              <el-radio-group v-model="ruleForm.Workingplace">
                <el-radio label="徐庄"></el-radio>
                <el-radio label="总部"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="right_bottom">
          <el-tooltip
            class="item"
            effect="dark"
            :content="tag.name"
            placement="top-start"
            v-for="(tag, index) in fileList"
            :key="index"
          >
            <el-tag
              style="margin-right: 10px; display: flex"
              :disable-transitions="false"
              @close="handleClose(index)"
              closable
              @click="downloadFile(tag)"
              ><i class="el-icon-paperclip"></i
              ><span class="tagtext">{{ tag.name }}</span></el-tag
            >
          </el-tooltip>
          <el-upload
            class="upload-demo"
            action
            :http-request="uploadFile"
            ref="upload"
            :limit="fileLimit"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :headers="headers"
          >
            <!-- action="/api/file/fileUpload" -->
            <el-button class="btn"
              ><i class="el-icon-paperclip"></i>上传附件</el-button
            >
          </el-upload>
          <div class="uploads">
            <span>身份证扫描件及简历:</span>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibles">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
        <div class="head2">
          <div class="head2_left">
            <span class="information"> 资源信息 </span>

            <el-form-item label="是否被纳入考勤:" prop="attendance">
              <el-radio-group v-model="ruleForm.attendance">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="面试人员:"
              prop="TheInterviewer"
              class="input_D"
            >
              <el-select v-model="ruleForm.TheInterviewer">
                <el-option label="前端组长" value="shanghai"></el-option>
                <el-option label="技术经理" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="head2_right">
            <el-form-item label="面试时间:" prop="interviewTime">
              <el-input v-model="ruleForm.interviewTime"></el-input>
            </el-form-item>
            <el-form-item label="面试结果:" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="通过" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="待定" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="head3">
          <div class="head3_left">
            <span class="information"> 系统信息 </span>

            <el-form-item label="归属部门:" prop="AttributionDepartment">
              <el-select v-model="ruleForm.AttributionDepartment">
                <el-option label="综合管理部" value="shanghai"></el-option>
                <el-option label="信息科技部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最后更新者:" prop="LastUpdate">
              <el-input v-model="ruleForm.LastUpdate"></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-input v-model="ruleForm.status"></el-input>
            </el-form-item>
          </div>
          <div class="head3_right">
            <el-form-item label="最后更新时间:" prop="update">
              <el-input v-model="ruleForm.update"></el-input>
            </el-form-item>
            <el-form-item label="类别:" prop="category">
              <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="创建者:" prop="TheCreator">
              <el-input v-model="ruleForm.TheCreator"></el-input>
            </el-form-item>
          </div>
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
    .right_bottom {
      margin-left: 35px;
      .uploads {
        display: flex;
        align-items: center;
      }
    }
  }
  .el-dialog__header {
    .el-dialog__title {
      font-weight: bold;
    }
  }
}
::v-deep .el-table tbody tr:hover > td {
  background-color: rgb(226, 244, 255) !important;
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
      dialogImageUrl: "",
      dialogVisibles: false,
      dialogVisible:false,
      //上传后的文件列表
      fileList: [],
      // 允许的文件类型
      fileType: [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "txt",
        "png",
        "jpg",
        "bmp",
        "jpeg",
      ],
      // 运行上传文件大小，单位 M
      fileSize: 50,
      // 附件数量限制
      fileLimit: 5,
      //请求头
      headers: { "Content-Type": "multipart/form-data" },
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
    beforeUpload(file) {
      if (file.type != "" || file.type != null || file.type != undefined) {
        //截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
        //如果大于50M
        if (!isLt5M) {
          this.$showMessage("上传文件大小不能超过 50MB!");
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },
    //上传了的文件给移除的事件，由于我没有用到默认的展示，所以没有用到
    handleRemove() {},
    //这是我自定义的移除事件
    handleClose(i) {
      this.fileList.splice(i, 1); //删除上传的文件
      if (this.fileList.length == 0) {
        //如果删完了
        this.fileflag = true; //显示url必填的标识
        this.$set(this.rules.url, 0, {
          required: true,
          validator: this.validatorUrl,
          trigger: "blur",
        }); //然后动态的添加本地方法的校验规则
      }
    },
    //超出文件个数的回调
    handleExceed() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    //上传文件的事件
    uploadFile(item) {
      this.$showMessage("文件上传中........");
      //上传文件的需要formdata类型;所以要转
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      this.$axios({
        method: "post",
        url: "/file/fileUpload",
        headers: this.headers,
        timeout: 30000,
        data: FormDatas,
      }).then((res) => {
        if (res.data.id != "" || res.data.id != null) {
          this.fileList.push(item.file); //成功过后手动将文件添加到展示列表里
          let i = this.fileList.indexOf(item.file);
          this.fileList[i].id = res.data.id; //id也添加进去，最后整个大表单提交的时候需要的
          if (this.fileList.length > 0) {
            //如果上传了附件就把校验规则给干掉
            this.fileflag = false;
            this.$set(this.rules.url, 0, "");
          }
          //this.handleSuccess();
        }
      });
    },
    //上传成功后的回调
    handleSuccess() {},
    //弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  //正则
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
  handleRemove(file, fileList) {
    console.log(file, fileList);
  },
  //照片上传
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisibles = true;
  },
};
</script>
