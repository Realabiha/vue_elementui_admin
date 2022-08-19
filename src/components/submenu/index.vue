<template>
    <div class="com-container_wrap">
            <div class="router-link_wrap">
                <router-link to="/layout/out/market" tag="span" class="router-link_item">供应商管理</router-link>
                <router-link to="/layout/out/human" tag="span" class="router-link_item">外包人员管理</router-link>
                <router-link to="/layout/out/detail" tag="span" class="router-link_item">外包人力使用</router-link>
                <slot></slot>
            </div>
            <div class="main-content_wrap">
                <slot name="content"></slot>
            </div>
    </div>
</template>
<style lang="scss" scoped>
    .com-container_wrap{
        .router-link_wrap{
            align-items: center;
            width: 100%;
            height: 60px;
            margin: 4px 0;
            padding: 0 40px 0 30px;
            box-sizing: border-box;
            background-color: #fff;
            @include box-shadow();
            @include flex;
                .router-link_item{
                    line-height: 60px;
                    min-width: 100px;
                    height: 60px;
                    margin-left: 10px;
                    font-family: 'PingFangSC-Regular';
                    font-size: 14px;
                    color: #666666;
                    text-align: center;
                    &:last-of-type{
                        margin-right: 60px;
                    }
                }
                .router-link-active{
                    font-family: 'PingFangSC-Medium';
                    font-size: 14px;
                    color: #007AC3;
                    text-align: center;
                    border-bottom: 3px solid #007AC3;
                }
        }
    }
</style>
<script>
export default {
    name: 'SubMenu'
}
</script>