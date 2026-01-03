import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'system/user',
        name: 'user',
        component: () => import('@/views/main/system/user/user.vue'),
      },
      {
        path: 'system/role',
        name: 'role',
        component: () => import('@/views/main/system/role/role.vue'),
      },
      {
        path: 'system/menu',
        name: 'menu',
        component: () => import('@/views/main/system/menu/menu.vue'),
      },
      {
        path: 'system/department',
        name: 'department',
        component: () =>
          import('@/views/main/system/department/department.vue'),
      },
      {
        path: 'analysis/overview',
        name: 'overview',
        component: () => import('@/views/main/analysis/overview/overview.vue'),
      },
      {
        path: 'analysis/dashboard',
        name: 'dashboard',
        component: () =>
          import('@/views/main/analysis/dashboard/dashboard.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
