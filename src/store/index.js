import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import dataDict from "./modules/dataDict"

Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    user,
    dataDict
  }
});

export default store;