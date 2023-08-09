<template>
  <el-button
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :nativeType="nativeType"
    @click.native="handler"
  >
    <slot></slot>
  </el-button>
</template>
<style lang="sass" scoped>
</style>
<script>
import { Button } from "element-ui";
export default {
  name: "Button",
  props: {
    size: {
      type: String
    },
    type: {
      type: String
    },
    plain: {
      type: Boolean
    },
    round: {
      type: Boolean
    },
    circle: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    icon: {
      type: String
    },
    autofocus: {
      type: Boolean
    },
    nativeType: {
      type: String,
      default: "button"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  components: {
    ElButton: Button
  },
  methods: {
    async handler() {
      this.loading = true;
      try {
        await this.$listeners.click();
      } catch (error) {
        console.log(error, "error");
      }
      this.loading = false;
    }
  }
};
</script>