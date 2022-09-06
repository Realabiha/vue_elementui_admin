<template>
  <div class="panel panel-default">
    <div class="panel-heading clearfix">
      <div class="pull-left">
        <div class="checkbox">
          <label>
            <input
              :disabled="data.length === 0"
              type="checkbox"
              @click="toggleAll()"
              :checked="selectedAllStatus"
            /><span>{{ title }}</span>
          </label>
        </div>
      </div>

      <span class="pull-right">{{ selectItemNumber }}/{{ data.length }}</span>
    </div>

    <div class="panel-body"> 
      <ul>
        <li v-for="item in data" :key="item.indicatorCode">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="item.isSelected" />
              {{ item.indicatorName }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeBox",

  props: ["title", "data"],

  computed: {
    // 选择的数量

    selectItemNumber() {
      return this.data.filter((item) => item.isSelected).length;
    },

    // 全选状态

    selectedAllStatus() {
      if (
        this.selectItemNumber === this.data.length &&
        this.selectItemNumber !== 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    // 全选及反选

    toggleAll() {
      let len = this.data.length;

      let slen = this.data.filter((item) => item.isSelected).length;

      if (len !== slen) {
        this.data.map((item) => (item.isSelected = true));
      } else {
        this.data.map((item) => (item.isSelected = false));
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;

  padding: 0;
}

.checkbox {
  margin: 0;
}
</style>
