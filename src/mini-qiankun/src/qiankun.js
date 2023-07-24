import importHTML from 'import-html-entry';

let appConfig = null
let activeApp = null

// 挂载
const mount = function (app) {
  console.log(`${app.name} mount`)
}
// 卸载
const unMount = function (app) {
  if (app)
    console.log(`${app.name} unMount`)
}

// 加载应用
const loadMicroApp = async function (app) {
  try {
    const res = await importHTML(app.entry)
    document.querySelector(app.container).innerHTML = res.template
    await res.execScripts()
    mount(app)
  } catch (error) {
    console.log(error, 'error')
  }
}

export const registerMicroApps = function (config = []) {
  appConfig = config
}
export const start = function () {

  const listener = _ => {
    const hash = location.hash.slice(1)
    const app = appConfig.find(app => app.activeRule === hash)
    if (app) {
      activeApp = app
      loadMicroApp(app)
    }
    // else {
    //   unMount(activeApp)
    // }
  }

  window.addEventListener('hashchange', listener)
  window.addEventListener('load', listener)
}