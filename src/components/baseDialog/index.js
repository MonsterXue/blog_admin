import components from "./src/baseAuthDialog.vue"

components.install = function(Vue) {
  Vue.component(components.name, components)
}

export default components