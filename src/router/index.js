import { createRouter, createWebHistory } from 'vue-router'
// Store
import { useAuthStore } from '../stores/auth.js';
// Services
import i18n from '../services/i18n.js'
import toast from '../services/toast.js'
// Base Views
import HomeView from '../views/HomeView.vue'
// Auth Views
import LoginAuth from '../components/auth/LoginAuth.vue'
import CallbackAuth from '../components/auth/CallbackAuth.vue'
import LogoutAuth from '../components/auth/LogoutAuth.vue'
// User Views
import MeView from '../views/user/MeView.vue'

const checkAuth = (to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.isFullyLoggedIn) {
    next()
  } else {
    toast.error("You need to be logged in to access this page")
    next({ name: 'home' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tracks/:id',
      name: 'track',
      component: () => import('../views/track/TrackView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginAuth
    },
    {
      path: '/auth/callback',
      name: 'callback',
      component: CallbackAuth
    },
    {
      path: '/auth/logout',
      name: 'logout',
      component: LogoutAuth
    },
    {
      path: '/me',
      name: 'me',
      component: MeView,
      beforeEnter: checkAuth
    },
  ]
})

// For each route change document title
// Change html lang to current language
router.afterEach((to) => {
  document.title = import.meta.env.VITE_APP_TITLE + " - " + i18n.global.t(`app.routes.${to.name}`)
  document.documentElement.lang = i18n.global.locale
})

export default router
