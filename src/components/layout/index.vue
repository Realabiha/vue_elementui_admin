<template>
  <div class="sykj-layout_wrap">
    <m-header>
      <template #main>
        <div class="sykj-header_main">
          <div class="header-logo_wrap">
            <img class="header-main_logo" src="@/imgs/logo@1x.png" />
            <!-- <img class="header-main_logo" src="@/imgs/logo@1x.png" style="margin-left: 12px;"/> -->
          </div>
          <!-- <div class="header-route_wrap">
            <router-link to="/layout/out" tag="span" class="router-link_item">外包管理</router-link>
            <router-link to="/layout/app" tag="span" class="router-link_item">应用管理</router-link> 
          </div> -->
        </div>
      </template>
      <template #login>
        <div class="header-user_wrap">
          <div class="header-user_item">
            <i class="el-icon-user-solid"></i>
            <span>用户</span>
          </div>
          <div class="header-user_item">
            <i class="el-icon-back"></i>
            <span>登录</span>
          </div>
          <div class="header-user_item">
            <i class="el-icon-right"></i>
            <span>登出</span>
          </div>
        </div>
        <!-- <el-dropdown 
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
        </el-dropdown> -->
      </template>
    </m-header>
    <m-content>
      <!-- 123 -->
      <!-- <template #main> -->
          <!-- <div class="sykj-content_right"> -->
            <!-- <div class="sykj-breadcrumb_wrap">
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
            </div> -->
            <!-- <transition name="fade-transform" mode="out-in"> -->
              <!-- <router-view></router-view> -->
              <!-- <h1>hello world</h1> -->
            <!-- </transition> -->
          <!-- </div> -->
      <!-- </template> -->
    </m-content>
  </div>
</template>

<style lang="scss" scoped>
  .sykj-layout_wrap{
    position: relative;
    width: 100%;
    height: 100%;
    // overflow: hidden;
    overflow-y: scroll;
    .sykj-header_main{
      @include flex;
      .header-logo_wrap{
        padding-left: 40px;
        @include flex;
        align-items: center;
      }
      .header-route_wrap{
        margin-left: 120px;
        .router-link_item{
          display: inline-block;
          width: 161px;
          height: 80px;
          font-family: 'PingFangSC-Regular';
          font-size: 20px;
          color: #007AC3;
          letter-spacing: 2px;
          text-align: center;
          line-height: 80px;
        }
        .router-link-active{
          color: #FFFFFF;
          background: #007AC3;
        }
      }
    }
      .header-user_wrap{
        // position: absolute;
        // right: 44px;
        @include flex;
        .header-user_item{
          @include flex-column;
          align-items: center;
          margin-left: 28px;
          i{
            font-size: 24px;
          }
          span{
            font-family: 'HarmonyOS_Sans_SC_Medium';
            font-size: 14px;
            color: #666666;
            letter-spacing: 2px;
            text-align: center;
            line-height: 14px;
            margin-top: 6px;
          }
        }
      }
    .sykj-content_wrap{
      width: 100%;
      height: 100%;
      .sykj-content_right{
        width: 100%;
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
import {DEL_USERINFO_ACTION} from '@/store/userInfo/type'
import {DEL_DYNAMICROUTE_ACTION} from '@/store/route/type'
import {removeSessionStorage} from '@/utils/storage'

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