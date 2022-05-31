// 律师案件上传处理
<template>
  <div class="sykj-logdetail_wrap">
    <div class="sykj-logdetail_top">
            <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>案件信息</span>
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

      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>案件编辑</span>
            <div class="justify-content_between">
              <el-upload
                style="margin-left: 1rem"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button type="primary" class="" style="font-weight: bold;">
                  附件上传 <i class="el-icon-upload2"></i>
                </el-button>
              </el-upload>
            </div>
          </div>
          <el-form :model="sizeForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="当前环节"
              prop="idCard"
            >
              <el-col :span="20">
                <el-select v-model="sizeForm.idCard" placeholder="请选择">
                  <el-option
                    v-for="item in [{label: '诉前催收', value: '010'}, {label: '判决执行', value: '011'},]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item
              label="处理时间"
              prop="phone"
            >
              <el-col :span="5"> 
                <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.phone" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="5">
                <el-time-picker placeholder="选择时间" v-model="sizeForm.phone" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item
              label="处理信息记录"
              prop="precess"
            >
              <el-col :span="20">
                <el-input v-model="sizeForm.precess" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="案件动作"
            >
              <el-col :span="20">
                <el-select v-model="sizeForm.iCard" placeholder="请选择">
                  <el-option
                    v-for="item in [{label: '跟进', value: '010'}, {label: '结案', value: '011'},]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="写日志">
              <el-col :span="20">
                <el-input type="textarea" v-model="sizeForm.desc"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit">确认</el-button> -->
              <el-popconfirm
                title="确认提交嘛？"
                @confirm="onSubmit"
              >
                <el-button type="primary" slot="reference" >确认</el-button>
              </el-popconfirm>
              <el-button>取消</el-button>
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
  name: 'caseEdit',
  data() {
    return {
      numberValidateForm: {
        age: ''
      },
      sizeForm: {
        caseNo: '',
        customerName: '',
        idCard: '',
        phone: '',
        tag: Math.random(0, 1) * 4,
        precess: '',
        dealtime: '',
        record: '',
        motation: ''
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