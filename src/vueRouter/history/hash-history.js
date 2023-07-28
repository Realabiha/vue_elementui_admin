import History from "./history"
const getHash = function () {
  return window.location.hash.slice(1)
}
const ensureSlash = function () {
  console.log(window.location.hash, 'ensureSlash')
  if (window.location.hash) return
  window.location.hash = '/'
}
export default class HashHistory extends History {
  constructor(router) {
    super(router)
    ensureSlash()
  }
  // hash模式获取
  getCurrentLocation() {
    return getHash()
  }
  setupListener() {
    const transitionTo = () => {
      this.transitionTo(this.getCurrentLocation())
    }
    window.addEventListener('hashchange', transitionTo)
  }
}