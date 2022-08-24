<template>
    <a :href="to"></a>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name: 'RouterLink',
    props: {
        to: '/home'
    },
    methods: {
        onClick(e){
            e.preventDefault()
            console.log(this.$options.routes)
        }
    }
}
</script>