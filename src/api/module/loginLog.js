import axios from "axios"
import qs from "qs"
export const loginLog = {

  getAllLog(data) { //获取所有日志
    return axios({
      url: `${$baseUrl}/getAllLog`,
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(data)
    })
  },

  delLog(data) { //删除日志
    return axios({
      url: `${$baseUrl}/delLog`,
      method: "post",
      data
    })
  }
}