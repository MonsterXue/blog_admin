import axios from "axios"

export const roleSys = {

  addRole(data) { //新增角色
    return axios({
      url: `${$baseUrl}/addRole`,
      method: "post",
      data
    })
  },

  updateRole(data) { //修改角色
    return axios({
      url: `${$baseUrl}/updateRole`,
      method: "post",
      data
    })
  },

  delRole(params) { //删除角色
    return axios({
      url: `${$baseUrl}/delRole`,
      method: "get",
      params
    })
  },

  updateRoleMenu(data) { //修改菜单
    return axios({
      url: `${$baseUrl}/updateRoleMenu`,
      method: "post",
      data
    })
  },

  updateUserRole(data) { //分配用户角色
    return axios({
      url: `${$baseUrl}/updateUserRole`,
      method: "post",
      data
    })
  }
}