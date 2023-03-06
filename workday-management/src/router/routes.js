
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/manager',
        component: () => import('src/components/ManagerDashboard.vue'),
        exact: true
      },
      {
        path: '/timetable',
        component: () => import('src/components/TimetableDashboard.vue'),
        exact: true
      }
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
