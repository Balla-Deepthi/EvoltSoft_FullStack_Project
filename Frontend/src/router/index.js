import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/TheHome.vue'
import TheProfile from '../components/TheProfile.vue'
import Login from '../components/TheLogin.vue'
import Register from '../components/TheRegister.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresGuest: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    component: TheProfile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresGuest && token) {
    next('/profile')
  } else {
    next()
  }
})

export default router