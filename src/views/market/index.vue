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
          <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="companyName"
      width="180">
      </el-table-column>
    <el-table-column
      label="联系人"
      prop="companyManager"
      width="180">
    </el-table-column>
    <el-table-column
      label="联系人电话"
      prop="managerTel"
      width="180">
    </el-table-column>
    <el-table-column
      label="联系人邮箱"
      prop="managerMail"
      width="180">
    </el-table-column>
    <el-table-column
      label="公司简介"
      prop="companyDetail"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.companyDetail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ `${scope.row.companyDetail.slice(0, 8)}......` }}</el-tag>
          </div>
        </el-popover>
      </template>

    </el-table-column>
    <el-table-column
      label="姓名"
      prop="companyManager"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

      </template>
    </SubMenu>
  </div>
</template>
<style lang="scss" scoped>
.submenu-default_wrap{
  @include flex;
  flex: 1;
  @include justify-content(space-between);
  .search{
    width: 377px;
    height: 36px;
  }
}
</style>
<script>
import SubMenu from '../../components/submenu'
export default {
  name: 'Market',
  components: {
    SubMenu
  },
  data(){
      return {
        input1: '',
        tableData: [
          {
            companyName: '上海一同科技',
            companyManager: '澳币哈',
            managerTel: '17382342137',
            managerMail: '123@163.com',
            companyDetail: '计算机通信网络技术的研发，计算机信息系统安全专用产品的研发、销售（凭许可证经……'
          }
        ]
      
      }
    },
  props: {
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>