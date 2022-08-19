<template>
<div>

  <SubMenu>
      <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          v-model="input1">
      </el-input>
      <el-button></el-button>
      <template #content>
        人力管理
      </template>
    </SubMenu>
</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import SubMenu from '../../components/submenu'
export default {
  name: 'Human',
  components: {
    SubMenu
  },
  data(){
    return {
      input1: ''
    }
  },
  props: {
  }
}
</script>