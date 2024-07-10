import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import DashboardView from '@/users/components/pages/DashboardView.vue'; 
import '@/assets/global.css';
import "@/assets/bootstrap.min.css";
import UsersView from '@/users/components/pages/UsersView.vue';

loadFonts();

import LoginView from '@/auth/components/pages/LoginView.vue';
import { TokenService } from './auth/services/TokenService';

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
})
router.beforeEach((to, from , next)=>{

  console.log('Ejecutando autenticación');
  if(!to.meta.requireAuth){
    return next();
  }

  const token  = TokenService.get();

  if(!token){
    next({name: 'login'});
  }

  next();

});
createApp(App).use(router).use(vuetify).mount('#app');
