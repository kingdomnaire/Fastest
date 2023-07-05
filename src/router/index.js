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
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PlayerScoreView,
    meta: { requiresAuth: true },
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
    redirect: '/',
    meta: { requiresAuth: true },
  },

  // catch-all route for undefined routes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const isAuthenticated = () =>{
  const storedLogin = true //localStorage.getItem('loginRequest');
  
  // Check if both email and password are present in local storage
  return JSON.parse(storedLogin || '{}');
}

router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated().email

  if (to.meta.requiresAuth && isLoggedIn) {
    next('/login')
    }else{
      next()
    }
});



export default router