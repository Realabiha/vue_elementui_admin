<template>
    <h1 v-show="show" @click="close">{{msg}}</h1>
</template>
<style lang="scss" scoped>
h1{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    line-height: 100vh;
    color: black;
    background: rgba(0, 0, 0, .3);
}
</style>
<script>
export default {
    name: 'Dialog',
    data(){
        return {
            show: false,
            msg: 'hello world'
        }
    },
    methods: {
        close(){
            this.show = false
        },
        alert(msg){
            this.show = true
            this.msg = msg
        }
    }    
}
</script>