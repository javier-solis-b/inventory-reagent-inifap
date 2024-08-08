import { createRouter, createWebHistory } from 'vue-router';
import { verifyTokenMiddleware } from  './auth/middlewares/verifyTokenMiddleware.js'

import UsersView from '@/users/components/pages/UsersView.vue';
import CreateUsersView from '@/users/components/pages/CreateUsersView.vue';
import EditUsersView from '@/users/components/pages/EditUsersView.vue';
import DashboardView from '@/users/components/pages/DashboardView.vue';
import LoginView from '@/auth/components/pages/LoginView.vue';
import UnAuthorizedPage from '@/auth/components/pages/UnAuthorizedPage.vue';

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
        path: '/usuarios',
        name: 'usuarios',
        component: UsersView,
        meta: { requireAuth: true }
      },
      {
        path: '/usuarios/crear',
        name: 'usuarios.create',
        component: CreateUsersView,
        meta: { requireAuth: true }
      },
      {
        path: '/usuarios/:id/editar',
        name: 'usuarios.edit',
        component: EditUsersView,
        meta: { requireAuth: true }
      },  
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/403',
        name: '403',
        component: UnAuthorizedPage
      }
    ],
  });

  router.beforeEach(verifyTokenMiddleware);

  export {router};