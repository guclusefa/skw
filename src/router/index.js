import { createRouter, createWebHistory } from 'vue-router'
import i18n from '../services/i18n.js'

import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// for each route change document title
// change html lang to current language
router.afterEach((to) => {
  document.title = i18n.global.t(`routes.${to.name}`) + ' - ' + import.meta.env.VITE_APP_TITLE
  document.documentElement.lang = i18n.global.locale
})

export default router
