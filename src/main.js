import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueFroala from 'vue-froala-wysiwyg'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import api from './api'
import './styles/ele-ui.scss'
import '@/utils/axiosConfig'
import 'froala-editor/js/plugins.pkgd.min.js';
import'froala-editor/js/languages/zh_cn.js';
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import echarts from "echarts"


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueFroala)


Vue.prototype.$api = api
Vue.prototype.echarts = echarts;

const checkToken = (userInfo) => {
  return new Promise((resolve, reject) => {
    axios.post('/v1/checkToken', {
      userId: userInfo.userId,
      token: userInfo.token
    }).then(res => {
      if (res.data.data.status) {
        resolve(true);
      }
      else {
        localStorage.removeItem(process.env.VUE_APP_NAME);
        resolve(false);
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem(process.env.VUE_APP_NAME);
      reject();
    })
  })
}

const getMenuUrl = (menu) => {
  let url = "";
  if (!menu.menuUrl && menu.children.length) {
    url = getMenuUrl(menu.children[0]);
  } else {
    url = menu.menuUrl;
  }
  return url;
}

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem(process.env.VUE_APP_NAME));
  NProgress.start();
  if (userData) {
    if (to.path == "/") {
      checkToken(userData.userInfo).then(res => {
        if (res) {
          next(getMenuUrl(userData.menuList[0]))
        }
        else {
          ElementUI.MessageBox.confirm("请重新登录", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            next("/");
            location.reload();
          }).catch(() => {
            next("/");
            location.reload();
          })
        }
      })
    }
    else {
      next()
    }
  }
  else {
    if (to.path == "/") {
      next()
    }
    else {
      next("/")
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');