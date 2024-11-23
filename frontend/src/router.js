import { createRouter, createWebHistory } from 'vue-router';
import { verifyTokenMiddleware } from './auth/middlewares/verifyTokenMiddleware.js';

import UsersView from '@/users/components/pages/VistasUsuarios/UsersView.vue';

import CreateUsersView from '@/users/components/pages/VistasUsuarios/CreateUsersView.vue';
import RecursosCrear from '@/users/components/pages/VistasRecursos/RecursosCrear.vue';

import EditUsersView from '@/users/components/pages/VistasUsuarios/EditUsersView.vue';
import EditRecursosView from '@/users/components/pages/VistasRecursos/EditRecursosView.vue'

import DashboardView from '@/users/components/pages/DashboardView.vue';
import LoginView from '@/auth/components/pages/LoginView.vue';
import UnAuthorizedPage from '@/auth/components/pages/UnAuthorizedPage.vue';
import NoPermisos from '@/auth/components/pages/NoPermisos.vue'
import AuthLayout from '@/auth/components/layouts/AuthLayout.vue';
import RecursosView from '@/users/components/pages/VistasRecursos/RecursosView.vue'
import AlmacenesView from '@/users/components/pages/VistasAlmacenes/AlmacenesView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      
      path: '/',
      component: AuthLayout,
      
      children: [
        
        {
          
          path: '/usuarios',
          name: 'usuarios',
          component: UsersView,
          meta: { requireAuth: true, requireAdmin: true }
        },
        {
          path: '/usuarios/crear',
          name: 'usuarios.create',
          component: CreateUsersView,
          meta: { requireAuth: true, requireAdmin: true }
        },
        {
          path: '/usuarios/:id/editar',
          name: 'usuarios.edit',
          component: EditUsersView,
          meta: { requireAuth: true, requireAdmin: true }
        },
        {
          path: '/recursos',
          name: 'recursos',
          component: RecursosView,
          meta: { requireAuth: true}
        },
        {
          path: '/recursos/crear',
          name: 'recursos.create',
          component: RecursosCrear,
          meta: { requireAuth: true, requireAdmin: true }
        },
        {
          path: '/recursos/:id/editar',
          name: 'recursos.edit',
          component: EditRecursosView,
          meta: { requireAuth: true, requireAdmin: true }
        },
        {
          path: '/almacenes',
          name: 'almacenes',
          component: AlmacenesView,
          meta: { requireAuth: true}
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: { requireAuth: true }
        },
      ]
    },
    
    {
      path: '/403',
      name: '403',
      component: UnAuthorizedPage
    },
    {
      path: '/NoPermisos',
      name: 'NoPermisos',
      component: NoPermisos
    }
  ],
});

router.beforeEach(verifyTokenMiddleware);

export { router };
