<template>
  <h1>About Page</h1>
</template>
<style lang="scss" scoped>
h1 {
  color: Blue;
}
</style>
<script>
export default {
  name: "About",
  props: ["test"],
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
};
</script>
