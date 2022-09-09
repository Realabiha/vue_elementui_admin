import Vue from "vue";
import "./index.scss";
const config = {
  name: "Alert",
  data() {
    return {};
  },
  props: {
    title: {
      required: false,
      default: "这是一个弹窗的标题",
    },
    content: {
      required: false,
      default: "这是一段很长的弹窗文本描述！！！！",
    },
  },
  mounted() {
    console.log(this.$parent);
  },
  render() {
    return (
      <div class="dialog_wrap">
        <div class="dialog_header">{this.title}</div>
        <div class="dialog_body">
          <div>{this.content}</div>
        </div>
        <div>
          <button vOn:click={this.onClose}>确认</button>
        </div>
      </div>
    );
  },
  methods: {
    onClose() {
      this.$emit("close");
      this.remove();
    },
    remove() {
      setTimeout((_) => {
        document.body.removeChild(this.$el);
        window.dialog = false;
      });
    },
  },
};
export default Vue.extend(config);
