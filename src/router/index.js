import { createRouter, createWebHistory } from 'vue-router'
import QuickGameViewVue from '../views/QuickGameView.vue'



const routes = [
  {
    path: '/',
    name: 'QuickGame',
    component: QuickGameViewVue,
  },

  // redirect
  {
    path: '/home',
    redirect: '/'
  },

  // catch-all route for undefined routes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router