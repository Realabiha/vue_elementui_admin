<template>
  <el-empty :description="des"></el-empty>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
  name: 'PageNotFound',
  props: {
    des: {
      type: String,
      required: false,
      default: '404'
    }
  }
}
</script>