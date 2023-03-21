import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../services/i18n.js'

import HomeView from '../views/HomeView.vue'

import LoginAuth from '../components/auth/LoginAuth.vue'
import CallbackAuth from '../components/auth/CallbackAuth.vue'
import LogoutAuth from '../components/auth/LogoutAuth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ]
})

// for each route change document title
// change html lang to current language
router.afterEach((to) => {
  document.title = import.meta.env.VITE_APP_TITLE + " - " + i18n.global.t(`app.routes.${to.name}`)
  document.documentElement.lang = i18n.global.locale
})

export default router
