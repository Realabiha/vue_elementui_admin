import { createRoute } from "../create-matcher"
export default class History {
  constructor(router) {
    this.router = router
    // current
    this.current = createRoute(null)
  }
  transitionTo(location, onComplete) {
    const route = this.router.match(location)
    // if (route.path === this.current.path) return
    this.updateRoute(route)
    onComplete && onComplete()
  }
  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }
  listen(updateRoot_Route) {
    this.cb = updateRoot_Route
  }
}