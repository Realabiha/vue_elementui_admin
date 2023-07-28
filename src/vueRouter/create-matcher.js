import createRouteMap from "./create-route-map"

export function createRoute(record, location) {
  let matched = []
  while (record) {
    matched.unshift(record.component)
    record = record.parent
  }
  return {
    path: location || '/',
    matched
  }

}

/**
 * @description: 创建路由匹配
 * @param {*} routes
 * @return {*}
 */
export default function createMatcher(routes) {
  // 创建初始路由映射
  const { routeList, routeMap } = createRouteMap(routes)
  console.log(routeList, routeMap)
  // 匹配路由
  const match = function (location) {
    const record = routeMap[location]
    return record ? createRoute(record, location) : createRoute(null)
  }
  // 更新路由映射
  const addRoutes = function (routes) {
    return createRouteMap(routes, routeList, routeMap)
  }
  return { match, addRoutes }
}