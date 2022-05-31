// 添加帐户
<template>
<div class="sykj-addRole_wrap justify-content_center">
  <el-col :span="10" style="margin-top: 10rem">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="帐户" prop="account">
        <el-input type="password" v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色">
          <el-option label="操作员" value="shanghai"></el-option>
          <el-option label="委外律师" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</div>
</template>
<script>
  export default {
    name: 'AddRole',
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var checkRole = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择角色'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
          pass: '',
          role: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          role: [
            { validator: checkRole, trigger: 'blur', required: true }
          ],
          account: [
            { validator: checkAccount, trigger: 'blur', required: true }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              message: '添加成功!',
              type: 'success',
              duration: 800,
              onClose: this.$refs[formName].resetFields()
            })            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>