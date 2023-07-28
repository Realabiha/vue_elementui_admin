/**
 * @description: 扁平化树状结构routes
 * @param {Array} routes 路由表
 * @param {Array} routeList 路由路径集合
 * @param {Object} routeMap 路由映射
 * @return {Object}
 */
export default function createRouteMap(routes, routeList = [], routeMap = Object.create(null)) {
  /**
   * @description: 
   * @param {Array} routes 路由表
   * @param {String} parentPath 父路径
   * @param {Object} routeInfo 扁平化后的路由信息
   * @return {Object}
   */
  const addRouteRecord = function (routes, parentPath = '', routeInfo = { routeList, routeMap }) {
    return routes.reduce((routeInfo, route) => {
      const { children, path, component } = route
      const record = {
        path: parentPath ? `${parentPath}/${path}` : path,
        component,
        parent: routeInfo.routeMap[parentPath]
      }
      routeInfo.routeList.push(record.path)
      routeInfo.routeMap[record.path] = record
      if (children?.length) return addRouteRecord(children, record.path, routeInfo)
      return routeInfo
    }, routeInfo)
  }
  return addRouteRecord(routes)
}