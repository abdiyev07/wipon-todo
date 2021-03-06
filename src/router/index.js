import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: () => import(/* webpackChunkName: "AddTodo" */ '@/views/AddTodo.vue'),
  },
  {
    path: '/edit/:id',
    name: 'EditTodo',
    component: () => import(/* webpackChunkName: "EditTodo" */ '@/views/EditTodo.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
