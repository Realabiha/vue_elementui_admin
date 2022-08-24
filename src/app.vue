<template>
  <div>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {}
  },
  beforeCreate(){
    
  },
  mounted(){
    console.log(this.$router)
  },
  methods: {
    onClick(e){
      e.preventDefault();
      history.pushState(null, '', e.target.getAttribute('href'))
    }
  }
}
</script>