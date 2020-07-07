import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/index",
    redirect: "/homePage",
    component: () => import("@/layout/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: '*',
    component: () => import("@/views/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
