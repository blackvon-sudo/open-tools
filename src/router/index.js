import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/page-home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
