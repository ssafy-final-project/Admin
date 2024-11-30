import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
      {
        path: 'announce',
        component: () => import('@/views/AnnounceView.vue'),
        children: [
          {
            path: '',
            name: 'announceList',
            component: () => import('@/components/announces/AnnounceList.vue'),
          },
          {
            path: 'write',
            name: 'announceWrite',
            component: () => import('@/components/announces/AnnounceWrite.vue'),
          },
          {
            path: ':noticeNo',
            name: 'announceDetail',
            component: () => import('@/components/announces/AnnounceDetail.vue'),
          },
        ],
      },
      {
        path: 'qna',
        name: 'qna',
        component: () => import('@/views/QnaView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
