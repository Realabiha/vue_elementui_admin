// 帐单列表
<template>
  <div class="sykj-billlist_wrap">
    <div class="sykj-billlist_top justify-content_between">
      <el-col :span="24" v-for="(bill, index) in billList" :key="index" style="margin-bottom: 2rem">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>借据信息</span>
            <div>
              <el-button type="text" class="padding-0">
                <router-link tag="span" to="/layout/repayPlan" replace class="padding-0" style="font-weight: bold;">
                  还款计划 <i class="el-icon-position"></i>
                </router-link>
              </el-button>
            </div>
          </div>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="客户姓名"
              prop="customerName"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.customerName" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="借款渠道"
              prop="borrowChannel"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.borrowChannel" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="贷款余额"
              prop="remainAmount"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.remainAmount" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="还款方式"
              prop="repayMethod"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.repayMethod" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="剩余应还"
              prop="remainRepay"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.remainRepay" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="身份证号"
              prop="idCard"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.idCard" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="借据号"
              prop="billId"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.billId" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="借款余额"
              prop="remainBorrow"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.remainBorrow" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="已还总额"
              prop="paiedAmount"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.paiedAmount" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="是否核销"
              prop="isChecked"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.isChecked" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="联系方式"
              prop="phone"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.phone" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="支用日期"
              prop="time"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.time" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="执行年利率"
              prop="yearRate"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.yearRate" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="应还总额"
              prop="repayTotal"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.repayTotal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-billlist_wrap{
    width: 100%;
    height: 95%;
    box-sizing: border-box;
    overflow-y: scroll;
    .sykj-billlist_top{
      flex-wrap: wrap;
    }
  }
</style>
<script>
export default {
  name: 'BillList',
  data() {
    return {
      numberValidateForm: {
        customerName: 'abiha',
        borrowChannel: '苏银消金APP',
        remainAmount: '12313.9',
        repayMethod: '等额本息',
        remainRepay: '123.3',
        idCard: '282845919491994719',
        billId: 'ASKDJAND12211236346',
        remainBorrow: '03478.12',
        paiedAmount: '123.13',
        isChecked: '否',
        phone: '9390909231',
        time: '2022/5/10 15:41',
        yearRate: '8%',
        repayTotal: '132123.23'
      },
      billList: [1, 2, 3]
    };
  },
  methods: {
    submitForm(formName) {
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
    }
  }
}
</script>