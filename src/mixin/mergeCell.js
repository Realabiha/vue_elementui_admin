import Vue from "vue";
Vue.mixin({
  computed: {
    spanArr() {
      console.log(this.$options.name);
      const tableData = this.tableData;
      return tableData.reduce((prev, item, index) => {
        const { kind } = item;
        if (prev[kind] === undefined) {
          prev[kind] = [index, 1, 1];
        } else {
          prev[kind][1]++;
        }
        return prev;
      }, {});
    },
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        const { kind } = row;
        if (rowIndex === this.spanArr[kind][0]) {
          const result = this.spanArr[kind].slice(1);
          return result;
        }
        return [0, 0];

        // if(rowIndex < 3){
        //   return [1, 1]
        // }else if(rowIndex === 3){
        //   return [4, 1]
        // }else if(rowIndex === 7){
        //   return [5, 1]
        // }else if(rowIndex === 12){
        //   return [5, 1]
        // }else{
        //   return [0, 0]
        // }
      }
    },
  },
});
