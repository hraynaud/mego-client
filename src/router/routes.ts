import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('pages/ProjectsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'project/new',
        name: 'project.new',
        component: () => import('src/pages/ProjectNewPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'endorsements',
        name: 'endorsements',
        component: () => import('pages/EndorsementsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'endorsements/new',
        name: 'endorsements.new',
        component: () => import('src/pages/EndorsementNewPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/UnauthenticatedLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/SignupPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
