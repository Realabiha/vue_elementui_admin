<template>
  <div class="market-container_wrap">
    <SubMenu>
      <div class="submenu-default_wrap">
        <!-- <el-input
          class="search"
          placeholder="输入名称或者描述进行查找"
          suffix-icon="el-icon-search"
          v-model="input1"
        >
        </el-input>
        <div>
          <el-button>导入</el-button>
          <el-button type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button type="primary" icon="el-icon-plus">新建</el-button>
          <el-button type="danger">批量删除</el-button>
        </div> -->
      </div>
      <template #content>
        <div class="tabs">
          <el-col :span="4" class="left">
            <span
              v-for="tab in tabs"
              :key="tab"
              :class="['tab-button', { active: currentTab === tab }]"
              @click="(_) => onTabClick(tab)"
            >
              {{ tab }}
            </span>
          </el-col>
          <el-col :span="20" class="right">
            <keep-alive>
              <component
                v-bind:is="currentTabComponent"
                class="tab"
              ></component>
            </keep-alive>
          </el-col>
        </div>
      </template>
    </SubMenu>
  </div>
</template>
<style lang="scss" scoped>
.market-container_wrap {
  .submenu-default_wrap {
    @include flex;
    flex: 1;
    @include justify-content(space-between);
    .search {
      width: 377px;
      height: 36px;
    }
  }
  .tabs {
    .left {
      @include flex-column;
      span {
        height: 40px;
        line-height: 40px;
        text-align: center;
        &.active {
          color: skyblue;
        }
      }
      .test {
        font-size: 30px;
      }
    }
  }
}
</style>
<script>
import SubMenu from "@/components/submenu";
import tabHome from "./tab-home";
import Alert from "@/components/alert";
export default {
  name: "Detail",
  components: {
    SubMenu,
    tabHome,
    Alert,
  },
  data() {
    return {
      currentTab: "Home",
      tabs: ["Home", "Posts", "Archive"],
      currentTabComponent: tabHome,
    };
  },
  computed: {},
  methods: {
    onTabClick(tab) {
      this.currentTab = tab;
      import("./tab-" + tab.toLowerCase()).then((res) => {
        this.currentTabComponent = res.default;
      });
      // import("@/components/alert").then((res) => {
      //   if (!window.dialog) {
      //     const ins = new res.default().$mount();
      //     document.body.appendChild(ins.$el);
      //     window.dialog = true;
      //   }
      // });
    },
  },
};
</script>
