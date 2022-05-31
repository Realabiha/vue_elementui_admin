<template>
  <div class="sykj-content_wrap justify-content_between">
    <m-sider></m-sider>
    <slot name="main"></slot>
  </div>
</template>
<style lang="scss" scoped>
  .sykj-content_wrap{
    width: 100%;
    height: calc(100% - 64px);
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