import { userAPI } from "@/api/module/user.js"
const dataDict = {
  state: {},
  mutations: {
    GET_ROLELIST: (state, roleList) => {
      state.roleList = roleList;
    }
  },
  actions: {
    getRoleList({ commit }) {
      return new Promise((resolve, reject) => {
        userAPI.getSysRole().then(res => {
          let arr = [];
          if (res.data.code == 200) {
            res.data.data.roleList.forEach(ele => {
              arr.push({
                label: ele.roleName,
                value: ele.roleId
              })
            })
            commit("GET_ROLELIST", arr);
          }
          resolve(arr);
        }).catch(err => {
          reject(err);
        })
      })
    }
  }
}

export default dataDict