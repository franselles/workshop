export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/open',
    name: 'open',
    component: () => import('@/views/main/Open.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/main/Detail.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/showimage',
    name: 'showimage',
    component: () => import('@/views/main/ShowImage.vue'),
    meta: { requiresAuth: true },
  },
];
