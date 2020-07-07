import { getUser, getMenu } from "@/utils/auth.js"
import { userAPI } from "@/api/module/user.js"
import { addRoutes, resetMenu } from "@/utils/permission.js"

const user = getUser();
const menu = getMenu();
const APP_NAME = process.env.VUE_APP_NAME;

export default {
  state: {
    userName: user && user.userName,
    userInfo: user,
    menu
  },
  getters: {
    userInfo: state => state.userInfo,
    menu: state => state.menu,
    token: state => state.token,
    userName: state => state.userName
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo;
      state.userName = userInfo.userName || "";
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      if (menu) {
        resetMenu(menu);
        addRoutes(menu);
      }

    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userAPI.login({
          userName: userInfo.userName,
          password: userInfo.password
        }).then(res => {
          if (res.data.code === 200) {
            commit("SET_USER", res.data.data.userInfo);
            commit("SET_MENU", res.data.data.menuList);
            commit("SET_TOKEN", res.data.data.userInfo.token);
            localStorage.setItem(APP_NAME, JSON.stringify(res.data.data));
          }
          resolve(res);
        }).catch(err => {
          reject(err);
          console.log(err)
        })
      })
    }
  }
}