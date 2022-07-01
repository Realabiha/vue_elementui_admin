<!-- BEM -->
<template>
  <div class="sykj-header_wrap">
    <slot name="main"></slot>
    <slot name="login"></slot>
  </div>
</template>
<style scoped lang="scss">
  .sykj-header_wrap{
    @include flex;
    @include justify-content(flex-end);
    @include box-shadow();
    width: 100%;
    height: 64px;
    background-color: #fff;
    background-image: url("@/imgs/logo.svg");
    background-position: 10px center;
    background-repeat: no-repeat;
    background-size: 104px 50px;
  }
</style>
<script>
export default {
  name: 'Header'  
}
</script>