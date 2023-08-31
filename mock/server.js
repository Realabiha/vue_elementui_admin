// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mock/user/db.json')
const middlewares = jsonServer.defaults({})
const nocache = require('nocache')
console.log(jsonServer.defaults().pop())
server.use(middlewares)
server.use(nocache())
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})