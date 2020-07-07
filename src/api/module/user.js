import axios from "axios";
import md5 from "js-md5";

export const userAPI = {

  getSysUserInfo(data) { //获取用户列表
    return axios({
      url: `${$baseUrl}/getSysUser`,
      method: "post",
      data
    })
  },

  login(data) {
    return axios({
      url: `${$baseUrl}/login`,
      method: "post",
      data: {
        "userName": data.userName,
        "password": md5(data.password).toString()
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
  },

  getSysRole(params) { //获取角色列表
    return axios({
      url: `${$baseUrl}/getAllRole`,
      method: "get",
      params
    })
  },

  addSysUser(data) { //新增用户
    return axios({
      url: `${$baseUrl}/addUser`,
      method: "post",
      data
    })
  },

  initPwd(data) { //修改密码
    return axios({
      url: `${$baseUrl}/initPwd`,
      method: "post",
      data: {
        "userId": data.userId,
        "password": data.password ? md5(data.password).toString() : ""
      }
    })
  },

  updateUserInfo(data) { //更新用户信息
    return axios({
      url: `${$baseUrl}/updateUserInfo`,
      method: "post",
      data
    })
  },

  delUser(data) { //删除用户
    return axios({
      url: `${$baseUrl}/delUser`,
      method: "post",
      data
    })
  },

  getUserByRole(data) { //获取用户角色列表
    return axios({
      url: `${$baseUrl}/getUserByRole`,
      method: "post",
      data
    })
  },

  changePwd(data) {
    return axios({
      url: `${$baseUrl}/changePwd`,
      method: "post",
      data: {
        "userId": data.userId,
        "oldPwd": md5(data.oldPwd).toString(),
        "newPwd": md5(data.newPwd).toString()
      }
    })
  }
}