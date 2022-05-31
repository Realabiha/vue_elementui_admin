<template>
  <el-row class="tac sykj-sider_wrap">
    <div class="sykj-sider_title">
      <i class="el-icon-menu" style="margin-right: 10px; font-size: 1.5rem"></i>
      <span>导航菜单</span>
    </div>
    <el-menu
      style="width: 100%; border: none;"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :default-active="defaultActive"
    >
      <m-navigator :routes="routes" prevPath="/layout/"></m-navigator>        
    </el-menu>
  </el-row>
</template>
<style lang="scss" scoped>
  .sykj-sider_wrap{
    @include box-shadow();
    width: 180px;
    height: 100%;
    margin-right: 1rem;
    overflow-y: scroll;
    background-color: #fff;
    // transition: width 300ms;
    .sykj-sider_title{
      @include justify-content(center);
      width: 100%;
      padding: 1rem 0;
      // background-color: rgb(236, 245, 255);
      font-weight: 600;
    }
  }
</style>
<script>
import Navigator from '../navigator'
import {formatGetSessionStorage, formatSetSessionStorage} from '@utils/storage'

export default {
  name: 'Sider',
  data(){
    return {
      userInfo: this.$store.state.user.userInfo,
      defaultActive: formatGetSessionStorage('defaultActiveRoute') || '/layout/caseList'
    }
  },
  components: {
    'm-navigator': Navigator,
  },
  computed: {
    routes(){
      const {dynamicRoute} = this.$store.getters
      return dynamicRoute[0].children.filter(route => route.meta.title)
    }
  },
  watch: {
    $route({path}){
      formatSetSessionStorage('defaultActiveRoute', path)
      this.defaultActive = path
    }
  },
  mounted(){
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>