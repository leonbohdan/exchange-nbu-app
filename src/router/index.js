import { createRouter, createWebHistory } from 'vue-router';
import { PAGE_NAME } from '@/constants/pages.constants.js';
import HomeView from '@/views/HomeView.vue';
import ChangedView from '@/views/ChangedView.vue';
import SearchView from '@/views/SearchView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PAGE_NAME.Home,
      component: HomeView,
    }, {
      path: `/${PAGE_NAME.Changed}`,
      name: PAGE_NAME.Changed,
      component: ChangedView,
    }, {
      path: `/${PAGE_NAME.Search}`,
      name: PAGE_NAME.Search,
      component: SearchView,
    },
  ],
});

export default router;
