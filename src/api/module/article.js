import axios from "axios"
import qs from "qs"
export const articleAPI = {

  getArticle(data) { //获取所有文章
    return axios({
      url: `${$baseUrl}/getArticle`,
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(data)
    })
  },

  insertArticle(data) { //新增文章
    return axios({
      url: `${$baseUrl}/insertArticle`,
      method: "post",
      data
    })
  },

  updateArticle(data) { //更新文章
    return axios({
      url: `${$baseUrl}/updateArticle`,
      method: "post",
      data
    })
  },

  delArticle(params) { //删除文章
    return axios({
      url: `${$baseUrl}/delArticle`,
      method: "get",
      params
    })
  },

  queryArticleById(params) {
    return axios({
      url: `${$baseUrl}/queryArticleById`,
      method: "get",
      params
    })
  }
}