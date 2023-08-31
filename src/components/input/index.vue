<template>
  <label for role="text">
    <p>
      <span>{{label}}</span>
      <input :value="value" @input="onChange" :name="name" />
    </p>
    <p v-show="message">{{message}}</p>
  </label>
</template>
<style lang="scss" scoped>
</style>
<script>
import Schema from "async-validator";
export default {
  name: "Radio",
  props: ["label", "value", "name", "rule"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    onChange(e) {
      const schema = new Schema(this.rule);
      schema.validate({ [this.name]: e.target.value }, (errors, fields) => {
        console.log(fields, "fields");
        if (errors) {
          console.log(errors);
          this.message = errors[0].message;
        } else {
          console.log("success");
          this.message = "";
        }
      });
      // 触发input事件
      this.$emit("input", e.target.value);
    }
  }
};
</script>