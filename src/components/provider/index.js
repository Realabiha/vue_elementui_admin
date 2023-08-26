export default {
  name: 'Provider',
  props: ['skin'],
  render(h) {
    return h('div', null, this.$slots.default)
  },
  created() {
    document.documentElement.setAttribute('data-skin', this.skin)
  }
}