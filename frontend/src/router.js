import UsersView from '@/users/components/pages/UsersView.vue';
import DashboardView from '@/users/components/pages/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/auth/components/pages/LoginView.vue';
import { verifyTokenInterceptor } from './auth/interceptors/verifyTokenInterceptor';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requireAuth: true }
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: UsersView,
        meta: { requireAuth: true }
      }
    ],
  });

  router.beforeEach(verifyTokenInterceptor);

  export {router};