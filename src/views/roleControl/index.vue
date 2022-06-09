// 帐户列表
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="账号"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="角色"
      :filters="[
        { text: '管理员', value: 'admin' },
        { text: '操作员', value: 'user' }, 
        { text: '委外律师', value: 'lawyer' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.name === 'admin' ? 'primary' : (scope.row.name === 'user' ? 'success': 'info')"
          disable-transitions>{{scope.row.address}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          :disabled="scope.row.name == 'admin'"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="primary">
        <router-link to="/layout/role/addRole" tag="span">新增</router-link>
      </el-button>
    </div>
    <router-view></router-view>
  </div>
  </template>

  <script>
    export default {
      name: 'RoleControl',
      data() {
        return {
          tableData: [
            {
              date: '2016-05-02',
              name: 'admin',
              address: '管理员'
            }, 
            {
              date: '2016-05-04',
              name: 'user',
              address: '操作员'
            }, 
            {
              date: '2016-05-01',
              name: 'lawyer',
              address: '委外律师'
            }
          ]
        }
      },
      methods: {
        handleDelete(index, row) {
          this.tableData.splice(index, 1)
        },
        filterTag(value, row){
          return row.name == value
        }
      },
      beforeRouteLeave(to, from, next){
        if(to.path !== from.path) next()
      }
    }
  </script>