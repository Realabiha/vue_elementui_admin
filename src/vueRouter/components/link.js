export default {
  props: {
    to: {
      type: String
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render(h) {
    return h(this.tag, { attrs: { href: `#${this.to}` } }, this.$slots.default)
  }
}