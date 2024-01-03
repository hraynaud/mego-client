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
      },
      {
        path: 'person/:userId',
        name: 'person ',
        component: () => import('pages/ProfilePage.vue'),
        props: true,
      },
      {
        path: 'people',
        name: 'people',
        component: () => import('pages/PeoplePage.vue'),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('pages/ProjectsPage.vue'),
      },
      {
        path: 'projects/new',
        name: 'projects.new',
        component: () => import('pages/ProjectNewPage.vue'),
      },
      {
        path: 'endorsements',
        name: 'endorsements',
        component: () => import('pages/EndorsementsPage.vue'),
      },
      {
        path: 'endorsements/new',
        name: 'endorsements.new',
        component: () => import('pages/EndorsementNewPage.vue'),
      },
      {
        path: 'invites/new',
        name: 'invite.new',
        component: () => import('pages/InviteNewPage.vue'),
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
      {
        path: 'accept_invite',
        name: 'accept_invite',
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
