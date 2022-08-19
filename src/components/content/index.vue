<template>
  <div class="sykj-content_wrap">
    <!-- <m-sider></m-sider> -->
    <!-- <slot name="main"></slot> -->

    <!-- <slot>
    </slot> -->
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-content_wrap{
    width: 100%;
    height: 100%;
  }
</style>
<script>
import Sider from '../sider'
export default {
  name: 'Content',
  components: {
    'm-sider': Sider
  }  
}
</script>