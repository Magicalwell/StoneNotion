import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Home/notes',
    children: [
      {
        path: '/Home/notes',
        name: 'notes',
        component: () => import('../views/notes.vue')
      },
      {
        path: '/Home/planner',
        name: 'planner',
        component: () => import('../views/planner.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(
    window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
  ),
  routes
})

export default router
