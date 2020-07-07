
window.$baseUrl = '/v1'

function importAll(r) {
    let modules = {}
    r.keys().forEach(key => (modules[key] = r(key)))
    return modules
  }
  const modules = importAll(require.context("./module", true, /\.js$/))
  
  const api = Object.assign.apply(null, Object.values(modules))

  export default {
    ...api
  }