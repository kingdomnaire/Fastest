import { createRouter, createWebHistory } from 'vue-router'
import QuickGameView from '../views/QuickGameView.vue'
import PlayerScoreView from '@/views/dashboard/PlayerScoreView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'



const routes = [
  {
    path: '/',
    name: 'QuickGame',
    component: QuickGameView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PlayerScoreView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
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