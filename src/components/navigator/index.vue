<template>
  <div>
    <div v-for="route in routes" :key="calcPath(route.path)">
      <el-submenu 
        v-if="route.children" 
        :index="calcPath(route.path)"
      >
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span>{{route.meta.title}}</span>
        </template>
        <Navigator :routes="route.children" :prevPath="calcPath(route.path)"></Navigator>
      </el-submenu>
      <el-menu-item 
        v-else 
        class="border-box"
        :style="{display: route.meta.title ? 'inline-block' : 'none', 'min-width': '180px'}"
        :index="calcPath(route.path)"
      >
        <router-link class="full-inline_block" :to="prevPath + route.path" tag="span">
          <i :class="route.meta.icon"></i>
          <span>
            {{route.meta.title}}
          </span> 
        </router-link>
      </el-menu-item>
    </div>
  </div>
</template>
<style lang="scss" scoped>


</style>
<script>
export default {
  name: 'Navigator',
  props: {
    routes: {
      type: Array,
      required: false,
      defaults: []
    },
    prevPath: {
      type: String,
      required: false,
      defaults: ''
    }
  },
  methods: {
    calcPath(path){
      return this.prevPath + path
    }
  }
}
</script>