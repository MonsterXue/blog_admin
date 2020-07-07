import axios from "axios"
import { getToken } from "@/utils/auth"
import store from "../store"

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  if (store.state.user.userInfo) {
    config.headers.common['token'] = store.state.user.userInfo.token
  }
  return config;
}, err => {
  //return Promise.reject(err);
});