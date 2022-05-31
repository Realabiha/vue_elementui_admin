// 还款计划
<template>
  <div class="sykj-repayplan_wrap">
    <div class="sykj-repayplan_top justify-content_between">
      <el-col :span="24" v-for="(bill, index) in billList" :key="index" style="margin-bottom: 2rem">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>还款计划</span>
          </div>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="期数"
              prop="nper"
            >
              <el-col :span="20">
                <el-input disabled v-model="numberValidateForm.nper" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="当期总额"
              prop="nowTotal"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.nowTotal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="当期未还"
              prop="nowRemain"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.nowRemain" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="利息"
              prop="interset"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.interset" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="费用"
              prop="fee"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.fee" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.status" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="还款日"
              prop="repayDay"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.repayDay" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="当期已还"
              prop="nowPaied"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.nowPaied" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="本金"
              prop="principal"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.principal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="罚息"
              prop="Punishment"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.Punishment" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="逾期天数"
              prop="overdueDays"
            >
              <el-col :span="20">
                <el-input disabled v-model.number="numberValidateForm.overdueDays" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-repayplan_wrap{
    width: 100%;
    height: 95%;
    box-sizing: border-box;
    overflow-y: scroll;
    .sykj-repayplan_top{
      flex-wrap: wrap;
    }
  }
</style>
<script>
export default {
  name: 'RepayPlan',
  data() {
    return {
      numberValidateForm: {
        nper: 12,
        nowTotal: '12.41',
        nowRemain: '12.5',
        interset: '1.2',
        fee: '4.5',
        status: '待还款',
        repayDay: '2022/5/10 15:41',
        nowPaied: '12.3',
        principal: '500.00',
        Punishment: '1.4',
        overdueDays: 0
      },
      billList: [1]
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