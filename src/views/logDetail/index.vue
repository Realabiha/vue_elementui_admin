// 律师案件详情
<template>
  <div class="sykj-logdetail_wrap">
    <div class="sykj-logdetail_top justify-content_between">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>案件详情</span>
            <div class="justify-content_between">
            </div>
          </div>
          <el-form :model="sizeForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="案例编号"
              prop="caseNo"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.caseNo" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="身份证号"
              prop="idCard"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.idCard" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="联系方式"
              prop="phone"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.phone" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="当前环节"
              prop="precess"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.precess" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="联系人姓名"
              prop="customerName"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.customerName" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="处理时间"
              prop="dealtime"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.dealtime" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="处理信息记录"
              prop="record"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.record" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="案件动作"
              prop="motation"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.motation" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="日志记录">
              <el-col :span="20">
                <el-input disabled type="textarea" v-model="sizeForm.desc"></el-input>
              </el-col>
            </el-form-item>

          </el-form>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-logdetail_wrap{
    width: 100%;
    height: 95%;
    box-sizing: border-box;
    overflow-y: scroll;
  }
</style>
<script>
let index = 0
export default {
  name: 'LogDetail',
  data() {
    return {
      numberValidateForm: {
        age: ''
      },
      sizeForm: {
        caseNo: ++index,
        customerName: 'abiha',
        idCard: '27298475810948742',
        phone: '16397162076',
        tag: Math.random(0, 1) * 4,
        precess: Math.random(0, 1) > .5 ? '司法介入' : '已完成',
        dealtime: '2022/5/10 15:41',
        record: '案件记录信息',
        motation: '案件动作',
        desc: '日志记录阿达'
      },
      fileList: []
    };
  },
  methods: {
    onSubmit(formName) {
      this.$notify({
        message: '提交成功',
        type: 'success',
        duration: 500
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
  }
}
</script>