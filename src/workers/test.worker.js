// importScripts('/test.script.js')
import { splitFileChunks } from './test.script.js'
self.onmessage = function (e) {
  const file = e.data
  splitFileChunks(file)
}
// self.postMessage(test)