const style = {
  "red-color": { color: "red" },
};
import "./index.scss";
export default {
  name: "TabArchive",
  data() {
    return {
      msg: "hello vue jsx!",
    };
  },
  render() {
    return (
      <h1 class="test" style={style["red-color"]}>
        {this.msg}
      </h1>
    );
  },
  mounted() {},
  methods: {},
};
