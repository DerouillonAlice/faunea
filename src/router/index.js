import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import InteractiveMap from '../views/InteractiveMap.vue';
import QuizPage from '../views/QuizPage.vue';
import ExternalLinks from '../views/ExternalLinks.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/map',
    name: 'InteractiveMap',
    component: InteractiveMap
  },
  {
    path: '/quiz',
    name: 'QuizPage',
    component: QuizPage
  },
  {
    path: '/links',
    name: 'ExternalLinks',
    component: ExternalLinks
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
