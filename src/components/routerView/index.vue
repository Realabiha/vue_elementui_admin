<template>
    <div>
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name: 'RouterView',
    mounted(){
        console.log(this.$routes)
    }
}
</script>