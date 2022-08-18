import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'homepage',
        component: () => import('pages/HomePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/project/new',
        name: 'project.new',
        component: () => import('pages/ProjectFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/project/',
        name: 'project',
        component: () => import('pages/ProjectFormPage.vue'),
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
