<template>
  <div class="sykj-layout_wrap">
    <m-header>
      <template #main>
        <div class="sykj-header_main">
        </div>
      </template>
      <template #login>
        <el-dropdown 
          :hide-on-click="false" 
          style="padding-right: 1rem"
          @command="onExit"
        >
          <span class="el-dropdown-link">
            <span style="color: #409EFF; font-size: 1.3rem">{{userInfo.role}}</span>
            <i class="el-icon-arrow-down el-icon--right" style="font-size: 1.3rem"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </m-header>
    <m-content>
      <template #main>
          <div class="sykj-content_right">
            <div class="sykj-breadcrumb_wrap">
              <div @click="$router.back()">
                <i class="el-icon-back"></i>
                <span style="font-weight: 600">返回&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              </div>
              <el-breadcrumb style="font-size: 16px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item 
                  v-for="route in breadList.slice(1)" 
                  :key="route.path"
                  replace 
                  :to="{path: route.path}"
                >
                  {{route.meta.title}}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
      </template>
    </m-content>
  </div>
</template>

<style lang="scss" scoped>
  .sykj-layout_wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .sykj-content_wrap{
      width: 100%;
      height: calc(100% - 64px);
      .sykj-content_right{
        width: 90%;
        height: 100%;      
        .sykj-breadcrumb_wrap{
          @include justify-content();
          font-size: 16px;
          height: 3rem;
          > div:hover{
            color: $color-primary_element;
          }
        }
      }
    }
  }
</style>


<script>
import Header from '../header'
import Content from '../content'
import {DEL_USERINFO_ACTION} from '@store/userInfo/type'
import {DEL_DYNAMICROUTE_ACTION} from '@store/route/type'
import {removeSessionStorage} from '@utils/storage'

export default {
  name: 'Layout',
  data(){
    return {
      breadList: this.$route.matched
    }
  },
  components: {
    'm-content': Content,
    'm-header': Header
  },
  mounted(){
    // console.log(this.$store)
  },
  computed:{
    userInfo(){
      return this.$store.state.user.userInfo
    }
  },
  watch:{
    $route(route){
      this.breadList = route.matched
    }
  },
  methods: {
    // goBack(){
    //   // this.$router.go(-1)
    //   this.$router.back()
    // },
    onExit(){
      this.$store.dispatch(DEL_USERINFO_ACTION, null)
      // this.$store.dispatch(DEL_DYNAMICROUTE_ACTION, [])
      removeSessionStorage()
      this.$router.push({name: 'Login', replace: true})
      location.reload()
    }
  }
}
</script>