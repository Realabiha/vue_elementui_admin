// 案件详情
<template>
  <div class="sykj-casedetail_wrap">
    <div class="sykj-casedetail_top justify-content_between">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>客户信息</span>
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
              label="户籍地址"
              prop="bornAddress"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.bornAddress" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="单位名称"
              prop="companyName"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.companyName" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="婚姻状态"
              prop="married"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.married" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="联系人地址"
              prop="contactAddress"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.contactAddress" autocomplete="off"></el-input>
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
              label="联系方式"
              prop="phone"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.phone" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="居住地址"
              prop="liveAddress"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.liveAddress" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="单位地址"
              prop="companyAddress"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.companyAddress" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="联系人姓名"
              prop="contactName"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.contactName" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="财产信息"
              prop="propertyInfo"
            >
              <el-col :span="20">
                <el-input disabled v-model="sizeForm.propertyInfo" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix justify-content_between">
            <span>案件信息</span>
            <div>
              <el-button type="text" class="padding-0">
                <router-link tag="span" to="/layout/billList" replace class="padding-0" style="font-weight: bold;">
                  借据信息 <i class="el-icon-position"></i>
                </router-link>
              </el-button>
              <el-button type="text" class="padding-0" @click="onDownload" style="font-weight: bold;">案件资料下载 <i class="el-icon-download"></i></el-button>
            </div>
          </div>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="逾期总额"
              prop="totalOverdue"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.totalOverdue" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="逾期次数"
              prop="overdueTimes"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.overdueTimes" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="预警信息"
              prop="warnInfo"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.warnInfo" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="案件状态"
              prop="warnInfo"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.warnInfo" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="委外律师"
              prop="appointLayer"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.appointLayer" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="逾期天数"
              prop="overdueDays"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.overdueDays" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="已还金额"
              prop="repayAmount"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.repayAmount" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="诉讼标签"
              prop="tag"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.tag" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="原因"
              prop="reason"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.reason" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="委派处理"
              prop="appointDeal"
            >
              <el-col :span="20">
                <el-input disabled  v-model="numberValidateForm.appointDeal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
            >
              <el-col :span="20">
                <el-input style="opacity: 0" disabled  v-model="numberValidateForm.appointDeal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
            >
              <el-col :span="20">
                <el-input style="opacity: 0" disabled  v-model="numberValidateForm.appointDeal" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </div>
    <div class="sykj-casedetail-middle" style="position: relative">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :beforeLeave="handleLeave">
        <el-tab-pane label="放还款流水信息" name="first">
          <el-table
            :data="showFlag ? tableData : tableData.slice(0, 2)"
            style="width: 100%">
            <el-table-column
              prop="prop"
              label="属性"
              width="180">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="access"
              label="资金通道">
            </el-table-column>
            <el-table-column
              prop="account"
              label="账号">
            </el-table-column>
          </el-table>
          <el-col :span="24" style="text-align: center" v-if="!showFlag">
            <el-button plain type="text" style="border: none" @click="showMore"><i class="el-icon-more rotating"></i> 更多</el-button> 
          </el-col>
        </el-tab-pane>
        <!-- <el-tab-pane label="还款流水信息" name="second">
          <el-empty description="暂无数据"></el-empty>
        </el-tab-pane> -->
      </el-tabs>
      <el-button type="text" style="position: absolute; top: 0; right: 1rem; font-weight: bold;" @click="onDownload">催收流水下载 <i class="el-icon-download"></i></el-button>
    </div>
    <div class="sykj-casedetail-bottom">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>案件操作流水信息展示</span>
          </div>
            <el-table
            :data="showFlag ? tableData : tableData.slice(0, 2)"
            style="width: 100%">
            <el-table-column
              prop="prop"
              label="属性"
            >
            </el-table-column>
            <el-table-column
              prop="time"
              label="处理时间"
            >
            </el-table-column>
            <el-table-column
              prop="account"
              label="处理结果"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-casedetail_wrap{
    width: 100%;
    height: 95%;
    box-sizing: border-box;
    overflow-y: scroll;
    .sykj-casedetail_top{
      margin-bottom: 2rem;
    }
    .sykj-casedetail-middle{
      margin-bottom: 2rem;
      background-color: #fff;
    }
    .sykj-casedetail-bottom{
      margin-bottom: 2rem;
    }
  }
</style>
<script>
export default {
  name: 'CaseDetail',
  data() {
    return {
      numberValidateForm: {
        totalOverdue: '120931023.123',
        overdueTimes: 1,
        warnInfo: '很严重呀',
        caseStatus: '已接受',
        appointLayer: '吉米',
        overdueDays: 12,
        repayAmount: '1213.21',
        tag: '破产',
        reason: '很行',
        appointDeal: '-',
        dealTime: '2022/5/10 15:41',
        dealResult: '一处列阿萨大',
        caseDeal: '爱神的箭阿三第'
      },
      sizeForm: {
        caseNo: '010',
        idCard: '293891923934719',
        bornAddress: '爱神的箭阿三的接口哈桑不带',
        companyName: '看到爸爸',
        married: '否',
        contactAddress: '爱康科技京东卡就是大佬设备五月',
        customerName: '澳币哈',
        phone: '192883718237',
        liveAddress: '爱神的箭阿三第',
        companyAddress: '阿三倒萨看大盘送到啊科技时代那里是',
        contactName: '按时打卡',     
        propertyInfo: '-'   
      },
      activeName: 'first',
      tableData: [
        {
          prop: 'XP122205091250922',
          amount: '1213.21',
          time: '2022/5/10 15:41',
          access: '这里是一段只读状态的文字信息内容，',
          account: '450098450098450098'
        },
        {
          prop: 'XP122205091250912',
          amount: '1213.21',
          time: '2022/5/10 15:41',
          access: '这里是一段只读状态的文字信息内容，',
          account: '120098450098450098'
        },
        {
          prop: 'XP122205091250912',
          amount: '1213.21',
          time: '2022/5/10 15:41',
          access: '这里是一段只读状态的文字信息内容，',
          account: '120098450098450098'
        },
        {
          prop: 'XP122205091250912',
          amount: '1213.21',
          time: '2022/5/10 15:41',
          access: '这里是一段只读状态的文字信息内容，',
          account: '120098450098450098'
        },
      ],
      showFlag: false
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
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleLeave(next, last){
      if(next == 'third') return false
      console.log(next, last)
    },
    showMore(){
      this.showFlag = true
    },
    async onDownload(){
      // const res = await fetch('1.xlsx')
      // const blob = await res.blob()
      // console.log(res)
      // // const blob = new Blob([res])
      // console.log(blob)
      // const url = URL.createObjectURL(blob)
      // console.log(url)
      const a = document.createElement('a')
      a.href = '../../public/1.xlsx'
      a.download = '1.xlsx'
      document.body.appendChild(a)
      a.click()
      setTimeout(_ => document.body.removeChild(a))
    }
  }
}
</script>