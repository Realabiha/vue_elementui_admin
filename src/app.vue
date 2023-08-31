<template>
  <div id="sykj">
    <LongList></LongList>
    <!-- state: {{$store.state.count}}
    getters: {{$store.getters.myCount}}
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-link to="/bar/a">bar/a</router-link>
    <router-link to="/bar/b">bar/b</router-link>
    <router-link to="/login">login</router-link>
    <button @click="syncAdd">同步修改状态</button>
    <button @click="asyncAdd">异步修改状态</button>
    <h1>{{$store.getters.myAge}}</h1>
    <h1>{{$store.state.who.old.age}}</h1>
    <h1>{{tm}}</h1>
    <Button type="success" round @click="btnClick">按钮</Button>
    <Chart :width="width" :options="options" />
    <Radio v-model="radio" :rule="rule" name="name" label="姓名">单选</Radio>-->

    <!-- <router-view></router-view> -->
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
    <!-- <Toast /> -->
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
import Dialog from "./components/dialog";
import Toast from "./components/toast";
import Button from "./components/button";
import Chart from "./components/chart";
import Radio from "./components/radio";
import LongList from "./components/longlist";
import { confirm } from "./components/dialog/index2";
import axios from "axios";

let _start = 0;

export default {
  name: "App",
  components: {
    Dice,
    Dialog,
    Toast,
    Button,
    Chart,
    Radio,
    LongList
  },
  data() {
    const options = {
      title: {
        text: "600px"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    return {
      show: true,
      nums: 1,
      txt: "销毁",
      flag: false,
      msg: "hello world",
      width: "600px",
      // 浅冻结
      options: Object.freeze(options),
      radio: "",
      rule: {
        name: {
          type: "string",
          required: true,
          validator: (rule, value) => value === "muji",
          message: "name is muji"
        }
      }
    };
  },
  beforeCreate() {},
  mounted() {
    this.nums = { a: { b: 1 } };
    console.log(this, "app this");
    // const els = Object.values(this.$refs);
    // els.forEach(el => this.move(el));
    // this.testCallback();
    // debugger;
    setTimeout(_ => (this.msg = "HELLO WORLD"));
    this.updateOptions();
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
    },
    asyncAdd() {
      this.$store.dispatch("asyncAddCount", 4);
    },
    syncAdd() {
      this.$store.commit("syncAddCount", 10);
      this.$store.commit("syncAddAge", 1);
    },
    async btnClick() {
      let res;
      try {
        res = await confirm("弹窗内容");
      } catch (error) {
        res = error;
      }

      console.log(res, "res");

      this.width = Math.random(0, 1) * 400 + 600 + "px";
    },
    async updateOptions() {
      const { data } = await axios.get(
        `/api?_start=${_start}&_end=${_start + 6}`
      );
      const options = {
        series: {
          name: "销量",
          type: "bar",
          data
        }
      };
      this.options = Object.freeze(options);
      _start++;
      if (_start >= 294) _start = 0;
      if (this.$timer) clearTimeout(this.$timer);
      this.$timer = !this._isDestroyed && setTimeout(this.updateOptions, 5000);
    }
  },
  computed: {
    tm: {
      get() {
        console.log("computed");
        return this.txt + this.msg;
      },
      set() {
        console.log(this, "set");
      }
    }
  },
  watch: {
    txt: {
      handler() {
        console.log("watch");
      },
      immediate: true,
      deep: true
    }
  },
  updated() {
    console.log("updated");
  },
  destroyed() {}
};
</script>