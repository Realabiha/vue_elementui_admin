<template>
  <div class="viewport" :style="{width:`${width}px`, height: `${height}px`}" @scroll="onScroll">
    <div class="container" :style="{height: `${scrollHeight}px`}">
      <div class="views" :style="{transform: `translateY(${translateY}px)`}">
        <div class="item" v-for="item in views" :key="item" ref="item">
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.viewport {
  overflow: auto !important;
}
</style>
<script>
import { debounce } from "../../utils/debounce";
export default {
  name: "VisualList",
  props: {
    total: {
      type: Number,
      default: 10
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: "100%"
    },
    row: {
      type: Number,
      default: 10
    },
    buffer: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      start: 0,
      itemHeights: [],
      offsetHeights: []
    };
  },
  computed: {
    views: {
      get() {
        let views = [];
        for (
          let i = Math.max(this.start - this.buffer, 0);
          i < Math.min(this.start + this.row + this.buffer, this.total);
          i++
        ) {
          views.push(i);
        }

        return views;
      },
      set() {}
    },
    translateY: {
      get() {
        // const y = this.itemHeights
        //   .slice(0, this.start)
        //   .reduce((total, item) => total + item, 0);

        const x = this.offsetHeights[this.start - this.buffer] || 0;
        return x;
      }
    },
    scrollHeight: {
      get() {
        // const h = this.itemHeights.reduce(
        //   (total, item) => total + item,
        //   this.height
        // );
        const g =
          (this.offsetHeights[this.offsetHeights.length - 1] || 0) +
          this.height;
        return g;
      },
      set() {}
    }
  },
  watch: {
    views: {
      handler() {
        this.$nextTick(_ => {
          const items = this.$refs.item.slice(
            this.itemHeights.length -
              this.start +
              (this.start > 0 ? this.row : 0)
          );
          this.itemHeights.push(...items.map(item => item.offsetHeight));
          this.offsetHeights = items.reduce((prev, item) => {
            const last = prev[prev.length - 1] || 0;
            prev.push(last + item.offsetHeight);
            return prev;
          }, this.offsetHeights);
        });
      },
      immediate: true
    }
  },
  methods: {
    onScroll: debounce(function(e) {
      const scrollTop = e.target.scrollTop;

      // 二分查找;
      let [left, right, mid, start] = [
        0,
        this.offsetHeights.length - 1,
        0,
        this.start
      ];
      while (left <= right) {
        mid = Math.floor((left + right) / 2);
        const height = this.offsetHeights[mid];
        if (height < scrollTop) {
          left = mid + 1;
        } else if (height > scrollTop) {
          right = mid - 1;
        } else {
          break;
        }
      }
      start = mid;
      if (this.total > 0 && start <= this.total - this.row) {
        this.start = start;
      }
    })
  }
};
</script>