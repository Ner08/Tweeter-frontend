import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TweeterView from '../views/TweetView.vue'
import NotFound from '@/views/NotFound.vue'
import TestView from '@/views/testView.vue'

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
    {
      path: '/test',
      name: 'test',
      component: TestView,
    }

  ]
})

export default router
