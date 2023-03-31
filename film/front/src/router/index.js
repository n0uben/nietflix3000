import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FilmView from "@/views/FilmView.vue";
import CreateForm from "@/components/CreateForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/creer',
      name: 'creer',
      component: CreateForm,
    },
    {
      path: '/films/:id',
      name: 'films',
      component: FilmView,
      props: true
    }
  ]
})

export default router
