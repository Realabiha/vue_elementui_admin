<template>
  <div id="sykj" style="color: red;" @input="handleInput">
    {{msg}}
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-link to="/bar/a">bar/a</router-link>
    <router-link to="/bar/b">bar/b</router-link>
    <router-link to="/login">login</router-link>
    <router-view></router-view>
    <!-- <component :is="'input'"></component> -->
    <!-- <component :is="$options.components.Dice"></component> -->
    <!-- <button @click="onClick">{{txt}}</button> -->
    <!-- <h1 ref="h1" :class="flag ? 'showh1' : 'hideh1'">123</h1> -->
    <!-- <input type="file" @change="onChange" /> -->
    <!-- <button @click="onBtnClick">显示</button> -->
    <!-- 上传</input> -->
    <!-- <router-link to="/home/1">Home</router-link>
    <router-link to="/about/2">About</router-link>
    <h1 id="title" class="test">{{$route.params.id}}</h1>
    <router-view />-->
    <!-- <Dice /> -->
    <!-- <Dialog v-model="show" title="温馨提示" content="确认此操作吗？" /> -->
    <!-- <Dialog v-model="show" title="公告" content="不做核酸了！" /> -->
    <!-- <div class="box box1" ref="box">1</div>
    <div class="box box2" ref="box2" style="left: 150px;top: 400px">2</div>
    <div class="box box3" ref="box3" style="left: 150px; top: 80%;">3</div>
    <div class="box box4" ref="box4" style="left: 250px; top: 60%;">4</div>
    <div class="box box5" ref="box5" style="left: 350px; top: 60%;">5</div>
    <div class="box box6" ref="box6" style="left: 250px; top: 80%;">6</div>
    <div class="box box7" ref="box7" style="left: 150px; top: 70%;">7</div>
    <div class="box box7" ref="box8" style="left: 100px; top: 30%;">8</div>
    <div class="box box7" ref="box9" style="left: 450px; top: 4%;">9</div>
    <div class="box box7" ref="box10" style="left: 650px; top: 20%;">10</div>-->
  </div>
</template>
<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden;
  .box {
    position: absolute;
    left: 15px;
    top: 10px;
    // transform: translate(0, 0);
    width: 15px;
    height: 15px;
    font-size: 30px;
    color: pink;
    background: red;
    border-radius: 50%;
  }
}
.showh1 {
  display: block;
  // transform: translateX(200px);
}
.hideh1 {
  display: none;
  // transform: translateX(0);
}
h1 {
  transition: transform 1s;
}
</style>
<script>
import Dice from "./components/dice";
// import Dialog from "./components/dialog";
export default {
  name: "App",
  components: {
    Dice
    // Dialog
  },
  data() {
    return {
      show: true,
      nums: 1,
      txt: "销毁",
      flag: false,
      msg: "hello world"
    };
  },
  beforeCreate() {},
  mounted() {
    console.log(this, "this");
    // const els = Object.values(this.$refs);
    // els.forEach(el => this.move(el));
    // this.testCallback();
    // debugger;
    setTimeout(_ => (this.msg = "HELLO WORLD"));
  },
  methods: {
    handleInput(e) {
      console.log(e.target.value);
    },
    onChange(e) {
      console.log(e.target.files, "e");
    },
    onBtnClick() {
      // this.$refs.h1.style.transform = "translateX(100px)";
      this.flag = !this.flag;
      setTimeout(_ => {
        this.$refs.h1.style.transform = "translateX(200px)";
      });
    },
    onClick(e) {
      this.$destroy();
      // e.preventDefault();
      // history.pushState(null, "", e.target.getAttribute("href"));
    },
    move(el, dis = { x: this.randomDis(), y: this.randomDis() }) {
      console.log(111);
      const els = Object.values(this.$refs);
      // 触碰边界
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = el;
      if (offsetTop >= document.documentElement.clientHeight - offsetHeight) {
        dis.y *= -1;
      }
      if (offsetLeft >= document.documentElement.clientWidth - offsetWidth) {
        dis.x = -1;
      }
      if (offsetLeft <= 0) {
        dis.x *= -1;
      }
      if (offsetTop <= 0) {
        dis.y *= -1;
      }
      // 碰撞
      for (let i = 0; i < els.length; i++) {
        const _el = els[i];
        if (el === _el) continue;
        const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = _el;
        const m1 = { x: offsetLeft + 7.5, y: offsetTop + 7.5 };
        const m2 = { x: el.offsetLeft + 7.5, y: el.offsetTop + 7.5 };
        const dx = m1.x - m2.x;
        const dy = m1.y - m2.y;
        const _dis = Math.sqrt(dx * dx + dy * dy);
        console.log(_dis);
        if (_dis <= 15) {
          dis.x *= -1;
          dis.y *= -1;
        }
      }

      const x = offsetLeft + dis.x + "px";
      const y = offsetTop + dis.y + "px";
      el.style.left = x;
      el.style.top = y;

      !this._isDestroyed && requestAnimationFrame(_ => this.move(el, dis));
    },

    randomDis(min = 1, max = 5) {
      return Math.random() * (max - min) + min;
    },

    testCallback() {
      console.log("testCallback===");
      !this._isDestroyed && setTimeout(this.testCallback, 1000);
    }
  },
  destroyed() {
    console.log(this, "destroyed");
  }
};
</script>