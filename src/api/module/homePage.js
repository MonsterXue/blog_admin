import axios from "axios"

export const homePageAPI = {

  getCardData() { //获取卡片内容
    return axios({
      url: `${$baseUrl}/getCardData`,
      method: "get"
    })
  },

  getWebVisitNum(params) { //获取本月网站访问量
    return axios({
      url: `${$baseUrl}/getWebVisitNum`,
      method: "get",
      params
    })
  },

  getSourceVisit(params) { //获取访问来源数据
    return axios({
      url: `${$baseUrl}/getSourceVisit`,
      method: "get",
      params
    })
  },

  getActiveUser(params) { //获取活跃用户
    return axios({
      url: `${$baseUrl}/getActiveUser`,
      method: "get",
      params
    })
  }
}