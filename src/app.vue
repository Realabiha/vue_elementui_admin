<template>
  <div>
    <!-- <router-link to="/home/1">Home</router-link>
    <router-link to="/about/2">About</router-link>
    <h1 id="title" class="test">{{$route.params.id}}</h1>
    <router-view /> -->
    <Dice />
    <Dialog v-model="show" title="温馨提示" content="确认此操作吗？" />
    <Dialog v-model="show" title="公告" content="不做核酸了！" />
  </div>
</template>
<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden;
}
</style>
<script>
import Dice from './components/dice'
import Dialog from './components/dialog'
export default {
  name: 'App',
  components: {
    Dice,
    Dialog
  },
  data(){
    return {
      show: true
    }
  },
  beforeCreate(){
    
  },
  mounted(){
    // this.$refs["wrap"].classList
  },
  methods: {
    onClick(e){
      e.preventDefault();
      history.pushState(null, '', e.target.getAttribute('href'))
    }
  }
}
</script>