import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../services/i18n.js'

import HomeView from '../views/HomeView.vue'

import LoginView from '../views/auth/LoginView.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

// for each route change document title
// change html lang to current language
router.afterEach((to) => {
  document.title = i18n.global.t(`routes.${to.name}`) + ' - ' + import.meta.env.VITE_APP_TITLE
  document.documentElement.lang = i18n.global.locale
})

export default router
