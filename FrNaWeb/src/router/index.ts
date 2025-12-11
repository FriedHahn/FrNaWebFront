import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AllAdsView from '@/views/AllAdsView.vue'
import CreateAdView from '@/views/CreateAdView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ads',
      name: 'ads',
      component: AllAdsView,
    },
    {
      path: '/ads/new',
      name: 'create-ad',
      component: CreateAdView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('loggedIn')
  if (!isLoggedIn && to.name !== 'login') {
    next({ name: 'login' })
  } else if (isLoggedIn && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
