import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Generate from '../views/Generate.vue'
import Admin from '../views/Admin'
import AdminLogin from '../views/AdminLogin'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Generate',
    name: 'Generate',
    component: Generate
  },
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Information',
    name: 'Information',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Information.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
