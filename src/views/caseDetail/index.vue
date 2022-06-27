// 案件详情
<template>
  <div>
    <h3>详情</h3>
    <ul ref="wrap">
      <li 
        v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" 
        :key="index" 
        style="width: 100vw; height: 4rem;border-bottom: 1px solid"
        draggable
        @dragstart="dragStart"
        @dragend="dragEnd"

        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover="dragOver"
        @drop="onDrop"
      >
        {{item}}
      </li>
    </ul>
    <div 
      style="width: 100vw; height: 10rem; background: pink; border: 1px solid"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
      @dragover="dragOver"
      @drop="onDrop1"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  name: 'CaseDetail',
  drag: null,
  data(){
    return {
    }
  },
  methods: {
    // 被拖拽对象
    dragStart(e){
      this.$options.drag = e.target
      e.target.style.background = 'yellow'
    },
    dragEnd(e){
      e.target.style.background = 'red'
    },

    // 拖拽目标区域
    dragEnter(e){
      e.preventDefault()
      console.log(e, 'enter')
    },
    dragLeave(e){
      console.log(e, 'leave')
    },
    dragOver(e){
      e.preventDefault()
      // 拖拽时鼠标样式
      // e.dataTransfer.dropEffect = 'move'
    },
    onDrop(e){
      e.preventDefault()
      this.$refs.wrap.insertBefore(this.$options.drag, e.target)
      this.$options.drag = null
    },
    onDrop1(e){
      e.preventDefault()
      console.log(e.dataTransfer.files)
      const {files} = e.dataTransfer

      Object.values(files).forEach(file => {
        const h1 = document.createElement('h1')
        h1.innerText = `file: ${file.name} \n size: ${file.size}kb`
        e.target.append(h1)
      })
    }
  }
}
</script>