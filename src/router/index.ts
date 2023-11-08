import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TweeterView from '../views/TweetView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tweet/:id',
      name: 'tweet',
      component: TweeterView,
      props: true
    }, 
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    }, 
  ]
})

export default router
